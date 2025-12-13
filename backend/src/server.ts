import { Hono } from 'hono'
import { ocrExtractText } from './ocr'
import { processImage } from './processing'
import { detectLanguage } from './langageDetector'

const app = new Hono()

app.get('/ping', (c) => c.text('pong'))

app.post('/upload', async (c) => {
    const body = await c.req.parseBody()

    const imageFile = body["image"] as File;
    if (!imageFile) {
        return c.json({ error: "Aucune image envoyée" }, 400);
    }

    const imageBuffer = Buffer.from(await imageFile.arrayBuffer());

    /* Image Processing */
    const processedImage = await processImage(imageBuffer);

    /* OCR extraction */
    const extractedText = await ocrExtractText(processedImage);

    /* Language detection */
    const langageDetected = await detectLanguage(extractedText);

    /* Translate text */


    /* Store both in database */


    /* Return translated text */
})

export default {
    port: 3000,
    fetch: app.fetch,
}