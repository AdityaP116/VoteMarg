"use client";

import { useState, useEffect } from "react";
import LanguageSelection from "./LanguageSelection";
import StateSelection from "./StateSelection";
import { LANGUAGE_STORAGE_KEY } from "@/lib/translations";

interface OnboardingFlowProps {
  onComplete: () => void;
}

export const STATE_STORAGE_KEY = "mea_state";

export default function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const [step, setStep] = useState<"language" | "state">("language");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // If both are already set, skip onboarding
    const savedLang = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    const savedState = localStorage.getItem(STATE_STORAGE_KEY);
    if (savedLang && savedState) {
      onComplete();
    } else if (savedLang && !savedState) {
      setStep("state");
    }
  }, [onComplete]);

  if (!isMounted) return null;

  const handleLanguageSelect = (lang: string) => {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
    setStep("state");
  };

  const handleStateSelect = (state: string) => {
    localStorage.setItem(STATE_STORAGE_KEY, state);
    onComplete();
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[var(--surface)] p-4 sm:p-6 sm:items-center sm:justify-center">
      <div className="w-full max-w-md flex-1 sm:flex-none sm:rounded-2xl sm:border sm:border-[var(--outline-variant)] sm:bg-[var(--surface-container)] sm:p-6 sm:shadow-lg sm:h-[600px] flex flex-col pt-8 sm:pt-6">
        {step === "language" ? (
          <LanguageSelection onSelect={handleLanguageSelect} />
        ) : (
          <StateSelection 
            onSelect={handleStateSelect} 
            onBack={() => setStep("language")} 
          />
        )}
      </div>
    </div>
  );
}
