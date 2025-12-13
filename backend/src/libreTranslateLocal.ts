import type { typeDetectResponse } from "./types";

const LIBRETRANSLATE_URL = "http://localhost:5050";

export async function translateText(
  text: string,
  targetLang: string = "fr",
  sourceLang: string = "auto",
  alternative: number = 2
): Promise<typeDetectResponse> {
  try {
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

    return await response.json() as typeDetectResponse;
  } catch (error) {
    console.error("[LibreTranslate Local] Error:", error);
    throw error;
  }
}
