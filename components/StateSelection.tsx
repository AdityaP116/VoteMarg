"use client";

import { useEffect, useState } from "react";
import { Language } from "@/lib/types";
import { t } from "@/lib/translations";
import { STATE_STORAGE_KEY } from "./OnboardingFlow";

interface StateSelectionProps {
  language: Language;
  onSelect: (state: string) => void;
  onBack: () => void;
}

const POPULAR_STATES = [
  "Maharashtra",
  "Uttar Pradesh",
  "Bihar",
  "Karnataka",
  "Tamil Nadu",
];

const ALL_STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal"
];

export default function StateSelection({ language, onSelect, onBack }: StateSelectionProps) {
  const [savedState, setSavedState] = useState<string | null>("Maharashtra");

  useEffect(() => {
    const stored = localStorage.getItem(STATE_STORAGE_KEY);
    if (stored) {
      setSavedState(stored);
    }
  }, []);

  return (
    <div className="flex h-full flex-col animate-fade-in-left">
      <div className="mb-6 flex items-center gap-3">
        <button
          onClick={onBack}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--surface-container-lowest)] text-[var(--on-surface)] shadow-sm transition-all hover:bg-[var(--surface-container)] active:scale-95"
          aria-label="Go back"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>
        <div>
          <h1 className="text-3xl font-black tracking-tight text-[var(--primary)]">
            VoteMarg
          </h1>
          <p className="text-sm font-semibold text-[var(--on-surface-variant)] opacity-80">
            {t("state_subtitle", language)}
          </p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-6 space-y-6">
        <div>
          <h3 className="mb-3 px-1 text-xs font-semibold uppercase tracking-wider text-[var(--on-surface-variant)]">
            {language === "en" ? "Popular States" : language === "hi" ? "लोकप्रिय राज्य" : "लोकप्रिय राज्ये"}
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {POPULAR_STATES.map((state) => (
              <button
                key={state}
                onClick={() => onSelect(state)}
                className={`flex min-h-[48px] items-center justify-center rounded-xl border px-3 py-2 text-sm font-semibold shadow-sm transition-all hover:border-[var(--primary)] hover:bg-[var(--primary-container)] hover:text-[var(--on-primary-container)] active:scale-95 ${
                  state === savedState
                    ? "border-[var(--primary)] bg-[var(--primary-container)] text-[var(--on-primary-container)] ring-2 ring-[var(--primary)] ring-offset-2 ring-offset-[var(--surface-container)]"
                    : "border-[var(--outline-variant)] bg-[var(--surface-container-lowest)] text-[var(--on-surface)]"
                }`}
              >
                {state}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-3 px-1 text-xs font-semibold uppercase tracking-wider text-[var(--on-surface-variant)]">
            {language === "en" ? "All States" : language === "hi" ? "सभी राज्य" : "सर्व राज्ये"}
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {ALL_STATES.map((state) => (
              <button
                key={state}
                onClick={() => onSelect(state)}
                className={`flex min-h-[44px] items-center justify-start rounded-lg px-4 py-2 text-sm transition-all hover:bg-[var(--surface-container)] active:scale-95 ${
                  state === savedState
                    ? "bg-[var(--primary-container)] text-[var(--on-primary-container)] font-semibold"
                    : "bg-[var(--surface-container-lowest)] text-[var(--on-surface)]"
                }`}
              >
                {state}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
