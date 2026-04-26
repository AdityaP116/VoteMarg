import { Language } from "@/lib/types";
import en from "./locales/en.json";
import hi from "./locales/hi.json";
import mr from "./locales/mr.json";

export const DEFAULT_LANGUAGE: Language = "en";
export const LANGUAGE_STORAGE_KEY = "mea_language";

export const translations = {
  ...Object.keys(en).reduce((acc, key) => {
    acc[key as keyof typeof en] = {
      en: en[key as keyof typeof en] as string,
      hi: (hi as Record<string, string>)[key] || (en as Record<string, string>)[key],
      mr: (mr as Record<string, string>)[key] || (en as Record<string, string>)[key],
    };
    return acc;
  }, {} as Record<string, Record<Language, string>>)
} as const;

export type TranslationKey = keyof typeof en;

export function resolveLanguage(value: string | null | undefined): Language {
  if (value === "hi" || value === "mr" || value === "en") {
    return value;
  }
  return DEFAULT_LANGUAGE;
}

/**
 * Enhanced translation helper with fallback logic
 */
export function t(key: TranslationKey, language: Language): string {
  try {
    const entry = translations[key as keyof typeof translations];
    if (!entry) {
      return key as string;
    }
    return entry[language] ?? entry[DEFAULT_LANGUAGE] ?? key as string;
  } catch {
    return key as string;
  }
}
