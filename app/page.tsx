"use client";

import { useEffect, useState } from "react";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import QuestionFlow from "@/components/QuestionFlow";
import electionData from "@/data/maharashtraElection.json";
import { Language } from "@/lib/types";
import {
  DEFAULT_LANGUAGE,
  LANGUAGE_STORAGE_KEY,
  resolveLanguage,
  t
} from "@/lib/translations";

export default function HomePage() {
  const [language, setLanguage] = useState<Language>(DEFAULT_LANGUAGE);

  useEffect(() => {
    const savedLanguage = resolveLanguage(localStorage.getItem(LANGUAGE_STORAGE_KEY));
    setLanguage(savedLanguage);
  }, []);

  return (
    <main className="mx-auto min-h-screen w-full max-w-3xl px-4 py-4 sm:px-6">
      <header className="rounded-xl bg-[var(--surface-container-lowest)] p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold leading-8 text-[var(--primary)]">
              {t("app_title", language)}
            </h1>
            <p className="text-sm leading-6 text-[var(--on-surface-variant)]">
              {t("app_subtitle", language)}
            </p>
            <a
              href="#eligibility-form"
              className="mt-1 inline-flex min-h-12 items-center rounded-md bg-[var(--primary-container)] px-4 text-sm font-semibold text-[var(--on-primary)] transition-colors hover:bg-[var(--primary)]"
            >
              {t("start_check", language)}
            </a>
          </div>
          <LanguageSwitcher language={language} onChange={setLanguage} />
        </div>
      </header>

      <section className="mt-4 rounded-xl bg-[var(--surface-container)] p-4">
        <h2 className="text-lg font-semibold text-[var(--on-surface)]">
          {t("quick_eligibility", language)}
        </h2>
        <ul className="mt-3 space-y-2 text-sm text-[var(--on-surface)]">
          <li className="rounded-md bg-[var(--surface-container-lowest)] px-3 py-2">
            {t("quick_rule_age", language)}
          </li>
          <li className="rounded-md bg-[var(--surface-container-lowest)] px-3 py-2">
            {t("quick_rule_citizen", language)}
          </li>
          <li className="rounded-md bg-[var(--surface-container-lowest)] px-3 py-2">
            {t("quick_rule_registered", language)}
          </li>
        </ul>
      </section>

      <section id="eligibility-form" className="mt-4 space-y-3">
        <h2 className="text-xl font-bold text-[var(--on-surface)]">
          {t("eligibility_check", language)}
        </h2>
        <QuestionFlow language={language} />
      </section>

      <footer className="mb-4 mt-6 rounded-xl border border-[var(--outline-variant)] bg-[var(--surface-container-low)] p-4 text-sm text-[var(--on-surface)]">
        <p>{t("trust_source", language)}</p>
        <p className="mt-2">
          {t("last_updated", language)}: {electionData.lastUpdated || t("not_announced", language)}
        </p>
        <p className="mt-2">{t("disclaimer", language)}</p>
      </footer>
    </main>
  );
}
