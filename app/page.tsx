"use client";

import { useEffect, useState } from "react";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import QuestionFlow from "@/components/QuestionFlow";
import TrustSection from "@/components/TrustSection";
import OnboardingFlow, { STATE_STORAGE_KEY } from "@/components/OnboardingFlow";
import { Language } from "@/lib/types";
import {
  DEFAULT_LANGUAGE,
  LANGUAGE_STORAGE_KEY,
  resolveLanguage,
  t
} from "@/lib/translations";

export default function HomePage() {
  const [language, setLanguage] = useState<Language>(DEFAULT_LANGUAGE);
  const [showOnboarding, setShowOnboarding] = useState<boolean>(true);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
    const savedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    const savedState = localStorage.getItem(STATE_STORAGE_KEY);
    
    if (savedLanguage && savedState) {
      setShowOnboarding(false);
      setLanguage(resolveLanguage(savedLanguage));
    }
  }, []);

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
    setLanguage(resolveLanguage(localStorage.getItem(LANGUAGE_STORAGE_KEY)));
  };

  if (!isMounted) {
    return null; // Or a loading spinner
  }

  if (showOnboarding) {
    return <OnboardingFlow onComplete={handleOnboardingComplete} />;
  }

  return (
    <main className="mx-auto min-h-screen w-full max-w-3xl px-4 py-4 sm:px-6">
      <header className="rounded-xl border border-[var(--outline-variant)] bg-[var(--surface-container-lowest)] p-5 shadow-sm">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-3">
            <h1 className="text-3xl font-extrabold tracking-tight text-[var(--primary)]">
              VoteMarg
            </h1>
            <p className="max-w-sm text-sm leading-relaxed text-[var(--on-surface-variant)]">
              Welcome! Let’s quickly check your voting eligibility and guide your next steps.
            </p>
            <div className="pt-2">
              <a
                href="#eligibility-form"
                className="inline-flex min-h-[48px] items-center justify-center rounded-md bg-[var(--primary-container)] px-6 text-sm font-semibold text-[var(--on-primary)] shadow-sm transition-transform hover:bg-[var(--primary)] active:scale-95"
              >
                {t("start_check", language)}
              </a>
              <p className="mt-2 text-[11px] text-[var(--outline)]">
                Based on official election guidelines
              </p>
            </div>
          </div>
          <LanguageSwitcher language={language} onChange={setLanguage} />
        </div>
      </header>

      <section className="mt-4 rounded-xl bg-[var(--surface-container)] p-4">
        <h2 className="text-lg font-semibold text-[var(--on-surface)]">
          {t("quick_eligibility", language)}
        </h2>
        <ul className="mt-3 space-y-2 text-sm text-[var(--on-surface)]">
          <li className="flex items-start gap-3 rounded-md bg-[var(--surface-container-lowest)] px-3 py-2">
            <span aria-hidden="true" className="text-base text-[var(--secondary)]">✔</span>
            <span className="leading-tight">{t("quick_rule_age", language)}</span>
          </li>
          <li className="flex items-start gap-3 rounded-md bg-[var(--surface-container-lowest)] px-3 py-2">
            <span aria-hidden="true" className="text-base text-[var(--secondary)]">✔</span>
            <span className="leading-tight">{t("quick_rule_citizen", language)}</span>
          </li>
          <li className="flex items-start gap-3 rounded-md bg-[var(--surface-container-lowest)] px-3 py-2">
            <span aria-hidden="true" className="text-base text-[var(--tertiary)]">⚠️</span>
            <span className="leading-tight">{t("quick_rule_registered", language)}</span>
          </li>
        </ul>
      </section>

      <section id="eligibility-form" className="mt-4 space-y-3">
        <h2 className="text-xl font-bold text-[var(--on-surface)]">
          {t("eligibility_check", language)}
        </h2>
        <QuestionFlow language={language} />
      </section>

      <TrustSection language={language} />
    </main>
  );
}
