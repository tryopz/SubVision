import init, { LanguageDetectorBuilder } from './lingua-wasm/pkg/lingua';
import { ISO_TO_LINGUA } from './types';

let detector: any = null;

export async function initLanguageDetector(): Promise<void> {
    console.info('[LanguageDetector] Initializing...');
    try {
        await init();
        console.info('[LanguageDetector] WASM module loaded');
        detector = LanguageDetectorBuilder.fromAllLanguages().build();
        console.info('[LanguageDetector] Initialization successful with languages');
    } catch (error) {
        console.error('[LanguageDetector] Initialization failed', error);
        throw error;
    }
}

export async function detectLanguage(text: string): Promise<string | null> {
    console.info('[LanguageDetector] Detecting language for text:', text);
    if (!detector) {
        throw new Error('[LanguageDetector] Detector not initialized');
    }

    if (text === '') {
        console.warn('[LanguageDetector] Empty text provided for language detection');
        return null;
    }

    try {
        const languageName = detector.detectLanguageOf(text)
        console.info('[LanguageDetector] Detected language name:', languageName);
        return getIsoCode(languageName);
    } catch (error) {
        console.error('[LanguageDetector] Detection arror :', error);
        return null;
    }
}

function getIsoCode(languageName: string): string {
    const code = ISO_TO_LINGUA[languageName];
    console.info('[LanguageDetector] ISO code:', code);
    if (code) return code;

    console.warn('[LanguageDetector] No ISO code found for language, returning auto');
    return 'auto';
}
