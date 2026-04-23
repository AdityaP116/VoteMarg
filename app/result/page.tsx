"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useState } from "react";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import ResultCard from "@/components/ResultCard";
import electionData from "@/data/maharashtraElection.json";
import { getDecision } from "@/lib/decisionEngine";
import { Language, RegistrationAnswer, UserAnswers, YesNo } from "@/lib/types";
import {
  DEFAULT_LANGUAGE,
  LANGUAGE_STORAGE_KEY,
  resolveLanguage,
  t
} from "@/lib/translations";

function parseYesNo(value: string | null): YesNo {
  return value === "yes" ? "yes" : "no";
}

function parseRegistered(value: string | null): RegistrationAnswer {
  if (value === "yes" || value === "no" || value === "not_sure") {
    return value;
  }
  return "not_sure";
}

function ResultPageContent() {
  const searchParams = useSearchParams();
  const [language, setLanguage] = useState<Language>(DEFAULT_LANGUAGE);

  useEffect(() => {
    const savedLanguage = resolveLanguage(localStorage.getItem(LANGUAGE_STORAGE_KEY));
    setLanguage(savedLanguage);
  }, []);

  const answers = useMemo<UserAnswers>(() => {
    const ageValue = Number(searchParams.get("age"));
    return {
      age: Number.isFinite(ageValue) ? ageValue : 0,
      citizenship: parseYesNo(searchParams.get("citizenship")),
      registered: parseRegistered(searchParams.get("registered")),
      moved: parseYesNo(searchParams.get("moved"))
    };
  }, [searchParams]);

  const result = useMemo(() => getDecision(answers), [answers]);

  return (
    <main className="mx-auto min-h-screen w-full max-w-3xl px-4 py-4 sm:px-6">
      <header className="rounded-xl bg-[var(--surface-container-lowest)] p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-[var(--primary)]">
              {t("result_header", language)}
            </h1>
            <Link
              href="/"
              className="inline-block text-sm font-semibold text-[var(--primary)] underline"
            >
              {t("back_home", language)}
            </Link>
          </div>
          <LanguageSwitcher language={language} onChange={setLanguage} />
        </div>
      </header>

      <section className="mt-4">
        <ResultCard result={result} language={language} />
      </section>

      <section className="mt-4 rounded-xl border border-[var(--outline-variant)] bg-[var(--surface-container-low)] p-4">
        <h2 className="text-lg font-semibold text-[var(--on-surface)]">
          {t("state_label", language)}: {electionData.state}
        </h2>
        <p className="mt-2 text-sm text-[var(--on-surface-variant)]">
          {t("last_updated", language)}: {electionData.lastUpdated || t("not_announced", language)}
        </p>

        <div className="mt-3 space-y-3">
          {electionData.elections.map((election, index) => (
            <article
              key={`${election.type}-${index}`}
              className="rounded-lg border border-[var(--outline-variant)] bg-[var(--surface-container-lowest)] p-3 text-sm text-[var(--on-surface)]"
            >
              <p>
                <span className="font-semibold">{t("election_type_label", language)}: </span>
                <span className="uppercase">{election.type}</span>
              </p>
              <p className="mt-1">
                <span className="font-semibold">
                  {t("registration_deadline_label", language)}:{" "}
                </span>
                {election.registrationDeadline || t("not_announced", language)}
              </p>
              <p className="mt-1">
                <span className="font-semibold">{t("phases_label", language)}: </span>
                {election.phases.length > 0
                  ? election.phases.join(", ")
                  : t("not_announced", language)}
              </p>
              <p className="mt-1">
                <span className="font-semibold">{t("result_date_label", language)}: </span>
                {election.resultDate || t("not_announced", language)}
              </p>
            </article>
          ))}
        </div>
      </section>

      <footer className="mb-4 mt-4 rounded-xl border border-[var(--outline-variant)] bg-[var(--surface-container-low)] p-4 text-sm text-[var(--on-surface)]">
        <p>{t("trust_source", language)}</p>
        <p className="mt-2">{t("help_label", language)}</p>
        <p className="mt-2">{t("disclaimer", language)}</p>
      </footer>
    </main>
  );
}

export default function ResultPage() {
  return (
    <Suspense
      fallback={
        <main className="mx-auto min-h-screen w-full max-w-3xl px-4 py-4 sm:px-6">
          <section className="rounded-xl border border-[var(--outline-variant)] bg-[var(--surface-container-lowest)] p-4 text-sm text-[var(--on-surface)]">
            Loading result...
          </section>
        </main>
      }
    >
      <ResultPageContent />
    </Suspense>
  );
}
