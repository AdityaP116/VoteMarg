"use client";

interface LanguageSelectionProps {
  onSelect: (lang: string) => void;
}

const TOP_LANGUAGES = [
  { code: "en", name: "English" },
  { code: "hi", name: "हिंदी" },
];

const OTHER_LANGUAGES = [
  { code: "mr", name: "मराठी (Marathi)" },
  { code: "gu", name: "ગુજરાતી (Gujarati)" },
  { code: "ta", name: "தமிழ் (Tamil)" },
  { code: "te", name: "తెలుగు (Telugu)" },
  { code: "kn", name: "ಕನ್ನಡ (Kannada)" },
  { code: "bn", name: "বাংলা (Bengali)" },
];

export default function LanguageSelection({ onSelect }: LanguageSelectionProps) {
  return (
    <div className="flex h-full flex-col justify-center animate-fade-in-up">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-[var(--on-surface)]">
          Select Language
        </h2>
        <p className="mt-2 text-sm text-[var(--on-surface-variant)]">
          Choose your preferred language to continue
        </p>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          {TOP_LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => onSelect(lang.code)}
              className="flex min-h-[56px] items-center justify-center rounded-2xl border-2 border-[var(--outline-variant)] bg-[var(--surface-container-lowest)] p-4 text-base font-semibold text-[var(--on-surface)] shadow-sm transition-all hover:border-[var(--primary)] hover:bg-[var(--primary-container)] hover:text-[var(--on-primary-container)] active:scale-95"
            >
              {lang.name}
            </button>
          ))}
        </div>

        <div className="pt-6">
          <h3 className="mb-3 px-1 text-xs font-semibold uppercase tracking-wider text-[var(--on-surface-variant)]">
            Other Languages
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {OTHER_LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => onSelect(lang.code)}
                className="flex min-h-[48px] items-center justify-center rounded-xl border border-[var(--outline-variant)] bg-[var(--surface-container-lowest)] px-3 py-2 text-sm font-medium text-[var(--on-surface)] transition-all hover:bg-[var(--surface-container)] active:scale-95"
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
