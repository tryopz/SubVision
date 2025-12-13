// src/languageDetector.ts
import init, { LanguageDetectorBuilder } from './lingua-wasm/pkg/lingua';

let detector: any = null;

export async function initLanguageDetector(): Promise<void> {
    try {
        await init();
        detector = LanguageDetectorBuilder.fromAllLanguages().build();
        console.log('[LanguageDetector] Initialization successful with languages');
    } catch (error) {
        console.error('[LanguageDetector] Initialization failed', error);
        throw error;
    }
}

export async function detectLanguage(text: string): Promise<string | null> {
    if (!detector) {
        throw new Error('[LanguageDetector] Detector not initialized');
    }

    if (text === '') {
        console.warn('[LanguageDetector] Empty text provided for language detection');
        return null;
    }

    try {
        return detector.computeLanguageConfidenceValues(text);
    } catch (error) {
        console.error('[LanguageDetector] Detection arror :', error);
        return null;
    }
}
