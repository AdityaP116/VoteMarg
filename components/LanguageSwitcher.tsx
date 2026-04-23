"use client";

import { Language } from "@/lib/types";
import { LANGUAGE_STORAGE_KEY, t } from "@/lib/translations";

interface LanguageSwitcherProps {
  language: Language;
  onChange: (language: Language) => void;
}

const languageOptions: Array<{ code: Language; label: string }> = [
  { code: "en", label: "EN" },
  { code: "hi", label: "HI" },
  { code: "mr", label: "MR" }
];

export default function LanguageSwitcher({
  language,
  onChange
}: LanguageSwitcherProps) {
  const selectLanguage = (nextLanguage: Language) => {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, nextLanguage);
    onChange(nextLanguage);
  };

  return (
    <div
      className="inline-flex items-center gap-2 rounded-full border border-[var(--outline-variant)] bg-[var(--surface-container-lowest)] p-1"
      role="group"
      aria-label={t("language_switcher_label", language)}
    >
      {languageOptions.map((option) => {
        const isActive = option.code === language;
        return (
          <button
            key={option.code}
            type="button"
            onClick={() => selectLanguage(option.code)}
            className={`min-h-10 min-w-12 rounded-full px-3 text-sm font-semibold transition-colors ${
              isActive
                ? "bg-[var(--primary)] text-[var(--on-primary)]"
                : "text-[var(--on-surface)] hover:bg-[var(--surface-container)]"
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
