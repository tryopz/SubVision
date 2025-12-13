const { createWorker } = require('tesseract.js');

export async function ocrExtractText(imageBuffer: Buffer): Promise<string> {
    console.info("[OCR] Starting OCR extraction...");
    const worker = await createWorker('eng');
    try {
        console.info("[OCR] OCR processing...");
        const { data: { text } } = await worker.recognize(imageBuffer);
        console.info("[OCR] Extracted text", text);
        return text;
    } catch (error) {
        console.error("[OCR] OCR extraction error", error);
        throw error;
    } finally {
        await worker.terminate();
        console.info("[OCR] Tesseract worker terminated.");
    }
}
