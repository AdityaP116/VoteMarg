"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useState } from "react";
import StandardLayout from "@/components/StandardLayout";
import ResultCard from "@/components/ResultCard";
import FeedbackForm from "@/components/FeedbackForm";
import TrustSection from "@/components/TrustSection";
import { statesData } from "@/data/statesData";
import { STATE_STORAGE_KEY } from "@/components/OnboardingFlow";
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
  const [selectedState, setSelectedState] = useState<string>("maharashtra");

  useEffect(() => {
    const savedLanguage = resolveLanguage(localStorage.getItem(LANGUAGE_STORAGE_KEY));
    setLanguage(savedLanguage);
    
    const savedState = localStorage.getItem(STATE_STORAGE_KEY);
    if (savedState) {
      setSelectedState(savedState.toLowerCase());
    }
  }, []);

  const stateData = statesData[selectedState];
  const hasData = !!stateData;

  const answers = useMemo<UserAnswers>(() => {
    const ageValue = Number(searchParams.get("age"));
    return {
      age: Number.isFinite(ageValue) ? ageValue : 0,
      citizenship: parseYesNo(searchParams.get("citizenship")),
      registered: parseRegistered(searchParams.get("registered")),
      moved: parseYesNo(searchParams.get("moved"))
    };
  }, [searchParams]);

  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchDecision() {
      if (answers.age === 0) return; // Wait for valid params

      try {
        let userId = 'anonymous';
        try {
          const { auth } = await import("@/lib/firebase");
          if (auth) {
            const { signInAnonymously } = await import("firebase/auth");
            const userCredential = await signInAnonymously(auth);
            userId = userCredential.user.uid;
          }
        } catch (authError) {
          // Firebase Auth not configured or enabled; gracefully fallback to anonymous string
        }

        const response = await fetch('/api/check', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            ...answers,
            state: selectedState,
            language: language,
            userId: userId
          })
        });

        if (!response.ok) {
          throw new Error('Failed to fetch decision');
        }

        const data = await response.json();
        setResult(data.decision);
      } catch (err) {
        console.error(err);
        setError('An error occurred while checking eligibility.');
      }
    }

    fetchDecision();
  }, [answers, selectedState, language]);

  const headerContent = (
    <Link
      href="/"
      className="text-xs font-bold uppercase tracking-widest text-[var(--primary)] hover:underline"
    >
      ← {t("back_home", language)}
    </Link>
  );

  const footerContent = (
    <div className="space-y-6">
      <TrustSection language={language} selectedState={selectedState} />
      <div className="text-center text-[10px] font-bold uppercase tracking-widest text-[var(--on-surface-variant)] opacity-50">
        © {new Date().getFullYear()} VoteMarg • {t("help_label", language)}
      </div>
    </div>
  );

  return (
    <StandardLayout headerContent={headerContent} footerContent={footerContent}>
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-[var(--primary)]">
          {t("result_header", language)}
        </h2>
        
        {error ? (
          <div className="rounded-xl border border-[var(--error)] bg-[var(--error-container)] p-4 text-[var(--on-error-container)]">
            <p className="font-bold">{error}</p>
          </div>
        ) : !result ? (
          <div className="rounded-xl border border-[var(--outline-variant)] bg-[var(--surface-container-lowest)] p-4 text-sm text-[var(--on-surface)]">
            Analyzing your eligibility securely...
          </div>
        ) : (
          <ResultCard result={result} language={language} />
        )}

        <div className="rounded-xl border border-[var(--outline-variant)] bg-[var(--surface-container-low)] p-5 shadow-sm">
          <div className="border-b border-[var(--outline-variant)] pb-3 mb-4 flex items-center justify-between">
            <h2 className="text-lg font-bold text-[var(--on-surface)]">
              {t("state_label", language)}: {hasData ? stateData.name : selectedState}
            </h2>
            {!hasData && (
              <span className="text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                Soon
              </span>
            )}
          </div>

          {hasData ? (
            <div className="space-y-4">
              {stateData.elections.map((election, index) => (
                <article
                  key={`${election.type}-${index}`}
                  className="text-sm text-[var(--on-surface)]"
                >
                  <h3 className="font-bold text-base uppercase text-[var(--primary)] mb-2">{election.type}</h3>
                  <ul className="space-y-2">
                    <li className="flex justify-between items-center bg-[var(--surface-container-lowest)] p-2 rounded-md">
                      <span className="font-semibold text-[var(--on-surface-variant)]">{t("registration_deadline_label", language)}</span>
                      <span>{election.registrationDeadline || t("not_announced", language)}</span>
                    </li>
                    <li className="flex justify-between items-center bg-[var(--surface-container-lowest)] p-2 rounded-md">
                      <span className="font-semibold text-[var(--on-surface-variant)]">{t("phases_label", language)}</span>
                      <span>{election.phases.length > 0 ? election.phases.join(", ") : t("not_announced", language)}</span>
                    </li>
                    <li className="flex justify-between items-center bg-[var(--surface-container-lowest)] p-2 rounded-md">
                      <span className="font-semibold text-[var(--on-surface-variant)]">{t("result_date_label", language)}</span>
                      <span>{election.resultDate || t("not_announced", language)}</span>
                    </li>
                  </ul>
                </article>
              ))}
            </div>
          ) : (
            <p className="text-sm italic text-[var(--on-surface-variant)]">
              Information coming soon for this state.
            </p>
          )}
        </div>

        <FeedbackForm language={language} />
      </div>
    </StandardLayout>
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
