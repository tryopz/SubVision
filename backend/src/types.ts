import type { OriginalText, Translation } from "@prisma/client";

export const sharpFormats: string[] = ['jpeg', 'png', 'webp', 'tiff', 'avif', 'gif', 'svg', 'tiff'];

export interface InputUpload {
    image: File;
    sourceLang: string;
    targetLang: string;
    alternative: number;
}

export interface OutputUpload {
    originalText: OriginalText;
    translatedText: Translation;
    alternatives: Translation[];
}

export interface LibreTranslateTranslateResponse {
    alternatives: string[];
    translatedText: string;
}

export interface LibreTranslateDetectResponse {
    detections: DetectResponse[];
}

export interface DetectResponse {
    confidence: number;
    language: string;
}
