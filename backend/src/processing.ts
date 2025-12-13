import sharp from "sharp";
import { sharpFormats } from "./types";

export async function processImage(image: Buffer): Promise<Buffer> {
    const metadata = await sharp(image).metadata();

    if (!sharpFormats.includes(metadata.format || '')) {
        throw new Error('Unsupported image format');
    }

    console.log("Processing image with format:", metadata.format);

    return await sharp(image)
        .normalize()
        .grayscale()
        .resize(1000)
        .linear(1.1, -(0.01 * 255))
        .png({ effort: 1 })
        .toBuffer();
}
