import { Hono } from 'hono'
import { translateText } from './libreTranslateLocal'
import { detectLanguage } from './linguaDetector'
import { ocrExtractText } from './ocr'
import { processImage } from './processing'
import { runStartupTasks } from './startup'
import type { inputUpload } from './types'

export const app = new Hono()

app.get('/ping', (c) => c.text('pong'))

app.post('/upload', async (c) => {
    const formData = await c.req.formData()

    const input: inputUpload = {
        image: formData.get("image") as File,
        sourceLang: formData.get("sourceLang") as string,
        targetLang: formData.get("targetLang") as string,
        alternative: formData.get("alternative") ? Number(formData.get("alternative")) : 2,
    }

    let sourceLang: string = input.sourceLang;

    const imageBuffer = Buffer.from(await input.image.arrayBuffer());

    /* Image Processing */
    const processedImage = await processImage(imageBuffer);

    /* OCR extraction */
    const extractedText = await ocrExtractText(processedImage);

    /* Language detection */
    if (input.sourceLang === '') {
        sourceLang = await detectLanguage(extractedText) || '';
    }

    /* Translate text */
    const translatedText = await translateText(extractedText, input.targetLang, sourceLang, input.alternative);

    /* Store both in database */


    /* Return translated text */
    return c.json({
        translatedText: translatedText.translatedText,
        alternatives: translatedText.alternatives,
        sourceLang: sourceLang,
        targetLang: input.targetLang,
        originalText: extractedText
    });
})

async function startServer() {
    await runStartupTasks();
}

startServer().catch(console.error);

export default {
    port: 3000,
    fetch: app.fetch,
}