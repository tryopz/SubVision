import { Hono } from 'hono'
import type { Translation } from '../generated/prisma/client'
import { detectLanguageWithLibreTranslate, translateTextWithLibreTranslate } from './libreTranslateLocal'
import { ocrExtractText } from './ocr'
import { processImage } from './processing'
import { createOriginalText, getOriginalTextByText } from './services/original-text-service'
import { createTranslation, getAlternativesTranslation, getTranslationByOriginalTextId } from './services/translation'
import { runStartupTasks } from './startup'
import type { InputUpload, OutputUpload } from './types'

export const app = new Hono()

app.get('/ping', async (c) => {
    console.info('Received ping request');
    return c.text('pong');
})

app.post('/upload', async (c) => {
    console.info('Received upload request');
    const formData = await c.req.formData();

    const input: InputUpload = {
        image: formData.get("image") as File,
        sourceLang: formData.get("sourceLang") as string,
        targetLang: formData.get("targetLang") as string,
        alternative: formData.get("alternative") ? Number(formData.get("alternative")) : 2,
    }

    let sourceLang: string = input.sourceLang;
    let output: OutputUpload;
    let alternativesTranslation: Translation[] = [];

    const imageBuffer = Buffer.from(await input.image.arrayBuffer());

    /* Image Processing */
    const processedImage = await processImage(imageBuffer);

    /* OCR extraction */
    const extractedText = await ocrExtractText(processedImage);

    /* Language detection */
    if (input.sourceLang === '') {
        const detectLanguage = await detectLanguageWithLibreTranslate(extractedText);
        if (!detectLanguage || typeof detectLanguage === 'string') {
            throw new Error('Language detection failed');
        } else {
            sourceLang = detectLanguage.language;
        }
    }

    /* Check if text is already translate */
    const existingText = await getOriginalTextByText(extractedText, sourceLang);

    /* If text exists, return existing translations */
    if (existingText) {
        console.info(`[Server] Text already exists in database with ID: ${existingText.id}`);
        output = {
            originalText: existingText,
            translatedText: await getTranslationByOriginalTextId(existingText.id),
            alternatives: await getAlternativesTranslation(existingText.id),
        };
        return c.json(output);
    }

    /* Translate text */
    const translatedText = await translateTextWithLibreTranslate(extractedText, input.targetLang, sourceLang, input.alternative);

    /* Store original text in database */
    const originalTextStored = await createOriginalText(extractedText, sourceLang);

    /* Store original translation marked with alternative=false */
    const translation = await createTranslation(translatedText.translatedText, false, input.targetLang, originalTextStored.id);
    /* Store alternative translations marked with alternative=true */
    for (let i = 0; i < input.alternative; i++) {
        const alternative = await createTranslation(translatedText.translatedText, true, input.targetLang, originalTextStored.id);
        alternativesTranslation.push(alternative);
    }

    /* Return translated text */
    output = {
        originalText: originalTextStored,
        translatedText: translation,
        alternatives: alternativesTranslation,
    };
    return c.json(output);
})

async function startServer() {
    await runStartupTasks();
}

startServer().catch(console.error);

export default {
    port: 3000,
    fetch: app.fetch,
}