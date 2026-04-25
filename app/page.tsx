"use client";

import { useEffect, useState } from "react";
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
import StandardLayout from "@/components/StandardLayout";
import { statesData } from "@/data/statesData";

export default function HomePage() {
  const [language, setLanguage] = useState<Language>(DEFAULT_LANGUAGE);
  const [showOnboarding, setShowOnboarding] = useState<boolean>(true);
  const [forceStep, setForceStep] = useState<"language" | "state" | undefined>();
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [checkStarted, setCheckStarted] = useState<boolean>(false);
  const [selectedState, setSelectedState] = useState<string>("maharashtra");

  useEffect(() => {
    setIsMounted(true);
    const savedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (savedLanguage) {
      setLanguage(resolveLanguage(savedLanguage));
    }
    
    const savedState = localStorage.getItem(STATE_STORAGE_KEY);
    if (savedState) {
      setSelectedState(savedState.toLowerCase());
    }
  }, []);

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
    setForceStep(undefined);
    setLanguage(resolveLanguage(localStorage.getItem(LANGUAGE_STORAGE_KEY)));
    setSelectedState((localStorage.getItem(STATE_STORAGE_KEY) || "maharashtra").toLowerCase());
  };

  const handleChangeState = () => {
    setForceStep("state");
    setShowOnboarding(true);
    setCheckStarted(false);
  };

  if (!isMounted) {
    return null;
  }

  if (showOnboarding) {
    return <OnboardingFlow onComplete={handleOnboardingComplete} forceStep={forceStep} />;
  }

  const stateData = statesData[selectedState];
  const hasData = !!stateData;

  const headerContent = (
    <button
      onClick={checkStarted ? () => setCheckStarted(false) : handleChangeState}
      className="text-xs font-bold uppercase tracking-widest text-[var(--primary)] hover:underline"
    >
      ← {checkStarted ? t("home_nav", language) : t("change_state", language)}
    </button>
  );

  const footerContent = (
    <div className="space-y-6">
      <TrustSection language={language} selectedState={selectedState} />
      <div className="text-center text-[10px] font-bold uppercase tracking-widest text-[var(--on-surface-variant)] opacity-50">
        © {new Date().getFullYear()} VoteMarg • {t("help_label", language)}
      </div>
    </div>
  );

  if (!checkStarted) {
    return (
      <StandardLayout headerContent={headerContent} footerContent={footerContent}>
        <div className="flex flex-col justify-center py-8">
          <div className="space-y-6 text-center">
            <h2 className="text-3xl font-bold leading-tight text-[var(--on-surface)]">
              {t("home_headline", language)}
            </h2>
            <div className="py-2">
              <span className="inline-block px-3 py-1 rounded-full bg-[var(--primary-container)] text-[var(--on-primary-container)] text-xs font-bold uppercase tracking-wider">
                {hasData ? stateData.name : selectedState}
              </span>
            </div>
            <p className="text-sm font-medium text-[var(--on-surface-variant)] opacity-70">
              {t("home_trust_line", language)}
            </p>
            <button
              onClick={() => setCheckStarted(true)}
              className="mt-4 flex min-h-[64px] w-full items-center justify-center rounded-2xl bg-[var(--primary)] px-8 py-4 text-xl font-bold text-[var(--on-primary)] shadow-lg shadow-blue-900/20 transition-all hover:opacity-90 active:scale-95"
            >
              {t("start_check", language)}
            </button>
          </div>
        </div>
      </StandardLayout>
    );
  }

  return (
    <StandardLayout headerContent={headerContent} footerContent={footerContent}>
      {hasData ? (
        <QuestionFlow language={language} stateData={stateData} />
      ) : (
        <div className="py-12 text-center space-y-4">
          <div className="text-4xl">🚧</div>
          <p className="text-lg font-bold text-[var(--on-surface)]">
            Information coming soon for {selectedState}
          </p>
          <button 
            onClick={handleChangeState}
            className="text-[var(--primary)] font-bold hover:underline"
          >
            Select another state
          </button>
        </div>
      )}
    </StandardLayout>
  );
}
