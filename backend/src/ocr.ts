const { createWorker } = require('tesseract.js');

export async function ocrExtractText(imageBuffer: Buffer): Promise<string> {
    const worker = await createWorker('eng');
    try {
        console.log("OCR processing...");
        const { data: { text } } = await worker.recognize(imageBuffer);
        console.log("Extracted text", text);
        return text;
    } catch (error) {
        console.error("OCR extraction error", error);
        throw error;
    } finally {
        await worker.terminate();
        console.log("Tesseract worker terminated.");
    }
}
