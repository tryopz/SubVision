import type { DetectResponse, LibreTranslateDetectResponse, LibreTranslateTranslateResponse } from "./types";

const LIBRETRANSLATE_URL = "http://localhost:5050";

export async function translateTextWithLibreTranslate(
  text: string,
  targetLang: string = "fr",
  sourceLang: string = "auto",
  alternative: number = 2
): Promise<LibreTranslateTranslateResponse> {
  console.info("[LibreTranslate Local] Translating text:", { text, targetLang, sourceLang, alternative });
  try {
    console.info("[LibreTranslate Local] Sending translation request to LibreTranslate server");
    const response = await fetch(`${LIBRETRANSLATE_URL}/translate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        q: text,
        source: sourceLang,
        target: targetLang,
        format: "text",
        alternatives: alternative
      }),
    });

    const data = await response.json() as LibreTranslateTranslateResponse;
    console.info("[LibreTranslate Local] Translation response received:", data.translatedText);
    data.alternatives.forEach((alt, index) => {
      console.info(`[LibreTranslate Local] Alternative ${index + 1}:`, alt);
    });
    return data;
  } catch (error) {
    console.error("[LibreTranslate Local] Error:", error);
    throw error;
  }
}

export async function detectLanguageWithLibreTranslate(text: string): Promise<DetectResponse | null> {
  console.info("[LibreTranslate Local] Detecting language for text:", text);
  try {
    console.info("[LibreTranslate Local] Sending language detection request to LibreTranslate server");
    const response = await fetch(`${LIBRETRANSLATE_URL}/detect`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        q: text
      }),
    });

    const data = await response.json() as LibreTranslateDetectResponse;
    if (!Array.isArray(data) || data.length === 0) {
      console.warn("Invalid response from LibreTranslate detect endpoint");
      return null;
    }
    console.info("[LibreTranslate Local] Language detection response received:", data);
    return data[0];
  } catch (error) {
    console.error("[LibreTranslate Local] Error:", error);
    throw error;
  }
}