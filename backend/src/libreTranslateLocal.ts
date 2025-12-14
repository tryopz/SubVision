import type { typeDetectResponse } from "./types";

const LIBRETRANSLATE_URL = "http://localhost:5050";

export async function translateText(
  text: string,
  targetLang: string = "fr",
  sourceLang: string = "auto",
  alternative: number = 2
): Promise<typeDetectResponse> {
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

    const data = await response.json() as typeDetectResponse;
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
