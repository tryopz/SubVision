import init, { LanguageDetectorBuilder } from './lingua-wasm/pkg/lingua';
import { ISO_TO_LINGUA } from './types';

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

        return getIsoCode(detector.detectLanguageOf(text));
    } catch (error) {
        console.error('[LanguageDetector] Detection arror :', error);
        return null;
    }
}

function getIsoCode(languageName: string): string {
    const code = ISO_TO_LINGUA[languageName];
    console.log('[LanguageDetector] Detected language:', languageName);
    if (code) return code;

    console.warn('[LanguageDetector] No ISO code found for language:', languageName);
    return 'auto';
}
