import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Language, RegistrationAnswer, YesNo } from "@/lib/types";
import { t } from "@/lib/translations";
import { trackStep, trackDecision } from "@/lib/analytics";
import { getDecision } from "@/lib/decisionEngine";

export interface AnswersState {
  age: number | null;
  citizenship: YesNo | null;
  registered: RegistrationAnswer | null;
  moved: YesNo | null;
}

export function useQuestionFlow(language: Language) {
  const router = useRouter();
  const totalSteps = 4;
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string>("");
  const [answers, setAnswers] = useState<AnswersState>({
    age: null,
    citizenship: null,
    registered: null,
    moved: null
  });

  const ageOptions = useMemo(() => {
    return Array.from({ length: 85 }, (_, index) => index + 16);
  }, []);

  const goToPreviousQuestion = () => {
    setError("");
    setIsSubmitting(false);
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const goToNextQuestion = () => {
    setError("");
    setIsSubmitting(false);
    const nextStep = Math.min(currentStep + 1, totalSteps - 1);
    setCurrentStep(nextStep);
    trackStep(`step_${nextStep}`, nextStep);
  };

  const jumpToQuestion = (field: keyof AnswersState | "citizen") => {
    const fieldKey = field === "citizen" ? "citizenship" : field;
    const stepMap: Record<string, number> = {
      age: 0,
      citizenship: 1,
      registered: 2,
      moved: 3
    };

    setError("");
    setIsSubmitting(false);
    setCurrentStep(stepMap[fieldKey]);
  };

  const submitAnswers = (nextAnswers: AnswersState) => {
    if (nextAnswers.age === null || Number.isNaN(nextAnswers.age)) {
      setError(t("invalid_age", language));
      setIsSubmitting(false);
      return;
    }

    if (
      nextAnswers.citizenship === null ||
      nextAnswers.registered === null ||
      nextAnswers.moved === null
    ) {
      setError(t("field_required", language));
      setIsSubmitting(false);
      return;
    }

    const decision = getDecision({
        age: nextAnswers.age,
        citizenship: nextAnswers.citizenship,
        registered: nextAnswers.registered,
        moved: nextAnswers.moved
    });

    const query = new URLSearchParams({
      age: String(nextAnswers.age),
      citizenship: nextAnswers.citizenship,
      registered: nextAnswers.registered,
      moved: nextAnswers.moved
    });

    setError("");
    trackDecision(decision.status);
    router.push(`/result?${query.toString()}`);
  };

  return {
    currentStep,
    totalSteps,
    answers,
    setAnswers,
    error,
    setError,
    isSubmitting,
    setIsSubmitting,
    ageOptions,
    goToPreviousQuestion,
    goToNextQuestion,
    jumpToQuestion,
    submitAnswers
  };
}
