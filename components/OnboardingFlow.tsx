"use client";

import { useState } from "react";
import LanguageSelection from "./LanguageSelection";
import StateSelection from "./StateSelection";
import { LANGUAGE_STORAGE_KEY, DEFAULT_LANGUAGE, resolveLanguage } from "@/lib/translations";
import { Language } from "@/lib/types";

interface OnboardingFlowProps {
  onComplete: () => void;
  forceStep?: "language" | "state";
}

export const STATE_STORAGE_KEY = "mea_state";

export default function OnboardingFlow({ onComplete, forceStep }: OnboardingFlowProps) {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window !== "undefined") {
      return resolveLanguage(localStorage.getItem(LANGUAGE_STORAGE_KEY));
    }
    return DEFAULT_LANGUAGE;
  });

  const [step, setStep] = useState<"language" | "state">(() => {
    if (forceStep) return forceStep;
    return "language";
  });

  const handleLanguageSelect = (lang: string) => {
    const resolved = resolveLanguage(lang);
    localStorage.setItem(LANGUAGE_STORAGE_KEY, resolved);
    setLanguage(resolved);
    setStep("state");
  };

  const handleStateSelect = (state: string) => {
    localStorage.setItem(STATE_STORAGE_KEY, state);
    onComplete();
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[var(--surface)] p-6 overflow-y-auto">
      <div className="mx-auto w-full max-w-md flex-1 flex flex-col justify-center">
        {step === "language" ? (
          <LanguageSelection language={language} onSelect={handleLanguageSelect} />
        ) : (
          <StateSelection 
            language={language}
            onSelect={handleStateSelect} 
            onBack={() => setStep("language")} 
          />
        )}
      </div>
    </div>
  );
}
