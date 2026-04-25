"use client";

import { Language } from "@/lib/types";
import { t } from "@/lib/translations";

interface LanguageSelectionProps {
  language: Language;
  onSelect: (lang: string) => void;
}

const TOP_LANGUAGES = [
  { code: "en", name: "English" },
  { code: "hi", name: "हिंदी" },
  { code: "mr", name: "मराठी" },
];

const OTHER_LANGUAGES = [
  { code: "gu", name: "ગુજરાતી (Gujarati)" },
  { code: "ta", name: "தமிழ் (Tamil)" },
  { code: "te", name: "తెలుగు (Telugu)" },
  { code: "kn", name: "ಕನ್ನಡ (Kannada)" },
  { code: "bn", name: "বাংলা (Bengali)" },
];

export default function LanguageSelection({ language, onSelect }: LanguageSelectionProps) {
  return (
    <div className="flex h-full flex-col justify-center animate-fade-in-up">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-black tracking-tight text-[var(--primary)]">
          VoteMarg
        </h1>
        <p className="mt-3 text-lg font-medium text-[var(--on-surface-variant)]">
          {t("language_subtitle", language)}
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex flex-col gap-4">
          {TOP_LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => onSelect(lang.code)}
              className="flex min-h-[64px] w-full items-center justify-center rounded-2xl border-2 border-[var(--outline-variant)] bg-[var(--surface-container-lowest)] p-4 text-xl font-bold text-[var(--on-surface)] shadow-sm transition-all hover:border-[var(--primary)] hover:bg-[var(--primary-container)] hover:text-[var(--on-primary-container)] active:scale-95"
            >
              {lang.name}
            </button>
          ))}
        </div>

        <div className="pt-8">
          <h3 className="mb-4 px-1 text-sm font-bold uppercase tracking-widest text-[var(--on-surface-variant)] opacity-70 text-center">
            {language === "en" ? "Other Languages" : language === "hi" ? "अन्य भाषाएं" : "इतर भाषा"}
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {OTHER_LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => onSelect(lang.code)}
                className="flex min-h-[52px] items-center justify-center rounded-xl border border-[var(--outline-variant)] bg-[var(--surface-container-lowest)] px-3 py-2 text-sm font-semibold text-[var(--on-surface)] transition-all hover:bg-[var(--surface-container)] active:scale-95"
              >
                {lang.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
