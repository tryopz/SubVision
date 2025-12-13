import sharp from "sharp";
import { sharpFormats } from "./types";

export async function processImage(image: Buffer): Promise<Buffer> {
    console.info("[Image processing] Starting image processing...");
    const metadata = await sharp(image).metadata();

    if (!sharpFormats.includes(metadata.format || '')) {
        throw new Error('[Image processing] Unsupported image format');
    }

    console.log("[Image processing] Processing image with format:", metadata.format);

    try {
        const result = await sharp(image)
            .normalize()
            .grayscale()
            .resize(1000)
            .linear(1.1, -(0.01 * 255))
            .png({ effort: 1 })
            .toBuffer();

        console.info("[Image processing] Image processing completed.");
        return result;
    } catch (error) {
        console.error("[Image processing] Error during image processing:", error);
        throw error;
    }
}
