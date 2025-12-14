import type { OriginalText, Translation } from "@prisma/client";

export const sharpFormats: string[] = ['jpeg', 'png', 'webp', 'tiff', 'avif', 'gif', 'svg', 'tiff'];

export interface inputUpload {
    image: File;
    sourceLang: string;
    targetLang: string;
    alternative: number;
}

export interface outputUpload {
    originalText: OriginalText;
    translatedText: Translation;
    alternatives: Translation[];
}

export const LINGUA_LANGUAGES: Record<string, string> = {
    "Afrikaans": "af",
    "Albanian": "sq",
    "Arabic": "ar",
    "Armenian": "hy",
    "Azerbaijani": "az",
    "Basque": "eu",
    "Belarusian": "be",
    "Bengali": "bn",
    "Bokmal": "nb",
    "Bosnian": "bs",
    "Bulgarian": "bg",
    "Catalan": "ca",
    "Chinese": "zh",
    "Croatian": "hr",
    "Czech": "cs",
    "Danish": "da",
    "Dutch": "nl",
    "English": "en",
    "Esperanto": "eo",
    "Estonian": "et",
    "Finnish": "fi",
    "French": "fr",
    "Ganda": "lg",
    "Georgian": "ka",
    "German": "de",
    "Greek": "el",
    "Gujarati": "gu",
    "Hebrew": "he",
    "Hindi": "hi",
    "Hungarian": "hu",
    "Icelandic": "is",
    "Indonesian": "id",
    "Irish": "ga",
    "Italian": "it",
    "Japanese": "ja",
    "Kazakh": "kk",
    "Korean": "ko",
    "Latin": "la",
    "Latvian": "lv",
    "Lithuanian": "lt",
    "Macedonian": "mk",
    "Malay": "ms",
    "Maori": "mi",
    "Marathi": "mr",
    "Mongolian": "mn",
    "Nynorsk": "nn",
    "Persian": "fa",
    "Polish": "pl",
    "Portuguese": "pt",
    "Punjabi": "pa",
    "Romanian": "ro",
    "Russian": "ru",
    "Serbian": "sr",
    "Shona": "sn",
    "Slovak": "sk",
    "Slovene": "sl",
    "Somali": "so",
    "Sotho": "st",
    "Spanish": "es",
    "Swahili": "sw",
    "Swedish": "sv",
    "Tagalog": "tl",
    "Tamil": "ta",
    "Telugu": "te",
    "Thai": "th",
    "Tsonga": "ts",
    "Tswana": "tn",
    "Turkish": "tr",
    "Ukrainian": "uk",
    "Urdu": "ur",
    "Vietnamese": "vi",
    "Welsh": "cy",
    "Xhosa": "xh",
    "Yoruba": "yo",
    "Zulu": "zu",
};

export const ISO_TO_LINGUA: Record<string, string> = Object.fromEntries(
    Object.entries(LINGUA_LANGUAGES).map(([name, code]) => [code, name])
);


export interface typeDetectResponse {
    alternatives: string[];
    translatedText: string;
}

export const LIBRE_TRANSLATE_LANGUAGES: Record<string, string> = {
    "en": "English",
    "sq": "Albanian",
    "ar": "Arabic",
    "az": "Azerbaijani",
    "eu": "Basque",
    "bn": "Bengali",
    "bg": "Bulgarian",
    "ca": "Catalan",
    "zh": "Chinese",
    "zh-Hans": "Chinese (Simplified)",
    "zh-Hant": "Chinese (Traditional)",
    "cs": "Czech",
    "da": "Danish",
    "nl": "Dutch",
    "eo": "Esperanto",
    "et": "Estonian",
    "fi": "Finnish",
    "fr": "French",
    "gl": "Galician",
    "de": "German",
    "el": "Greek",
    "he": "Hebrew",
    "hi": "Hindi",
    "hu": "Hungarian",
    "id": "Indonesian",
    "ga": "Irish",
    "it": "Italian",
    "ja": "Japanese",
    "ko": "Korean",
    "ky": "Kyrgyz",
    "lv": "Latvian",
    "lt": "Lithuanian",
    "ms": "Malay",
    "nb": "Norwegian Bokmål",
    "fa": "Persian",
    "pl": "Polish",
    "pt": "Portuguese",
    "pt-BR": "Portuguese (Brazil)",
    "ro": "Romanian",
    "ru": "Russian",
    "sr": "Serbian",
    "sk": "Slovak",
    "sl": "Slovenian",
    "es": "Spanish",
    "sv": "Swedish",
    "tl": "Tagalog",
    "th": "Thai",
    "tr": "Turkish",
    "uk": "Ukrainian",
    "ur": "Urdu",
    "vi": "Vietnamese",
};

export const LANGUAGE_NAME_TO_CODE: Record<string, string> = Object.fromEntries(
    Object.entries(LIBRE_TRANSLATE_LANGUAGES).map(([code, name]) => [name, code])
);
