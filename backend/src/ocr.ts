const { createWorker } = require('tesseract.js');

export async function ocrExtractText(imageBuffer: Buffer): Promise<string> {
    const worker = await createWorker('eng');
    try {
        console.log("Début de la reconnaissance OCR...");
        const { data: { text } } = await worker.recognize(imageBuffer);
        console.log("Texte extrait:", text);
        return text;
    } catch (error) {
        console.error("Erreur lors de l'OCR:", error);
        throw error;
    } finally {
        await worker.terminate();
        console.log("Worker Tesseract terminé.");
    }
}
