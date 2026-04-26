"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import AnswerSummary from "@/components/AnswerSummary";
import DropdownQuestion from "@/components/DropdownQuestion";
import ProgressBar from "@/components/ProgressBar";
import QuestionCard from "@/components/QuestionCard";
import { Language, RegistrationAnswer, StateElectionData, YesNo } from "@/lib/types";
import { t } from "@/lib/translations";
import { useQuestionFlow, AnswersState } from "@/hooks/useQuestionFlow";
import { useRef } from "react";

interface QuestionFlowProps {
  language: Language;
  stateData?: StateElectionData;
}

export default function QuestionFlow({ language, stateData }: QuestionFlowProps) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const {
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
  } = useQuestionFlow(language);

  useEffect(() => {
    headingRef.current?.focus();
  }, [currentStep]);

  const handleAgeContinue = () => {
    if (answers.age === null) {
      setError(t("invalid_age", language));
      return;
    }
    goToNextQuestion();
  };

  const handleCitizenshipSelect = (value: YesNo) => {
    setAnswers((prev) => ({ ...prev, citizenship: value }));
    setTimeout(goToNextQuestion, 100);
  };

  const handleRegisteredSelect = (value: RegistrationAnswer) => {
    setAnswers((prev) => ({ ...prev, registered: value }));
    setTimeout(goToNextQuestion, 100);
  };

  const handleMovedSelect = (value: YesNo) => {
    const nextAnswers: AnswersState = {
      ...answers,
      moved: value
    };
    setAnswers(nextAnswers);
    setError("");
    setIsSubmitting(true);
    setTimeout(() => {
      submitAnswers(nextAnswers);
    }, 100);
  };

  const renderCurrentQuestion = () => {
    if (currentStep === 0) {
      return (
        <DropdownQuestion
          headingRef={headingRef}
          question={t("age_label", language)}
          selectedValue={answers.age}
          options={ageOptions}
          placeholder={t("age_select_placeholder", language)}
          continueLabel={t("continue_button", language)}
          onChange={(value) => {
            setAnswers((prev) => ({ ...prev, age: value }));
            setError("");
          }}
          onContinue={handleAgeContinue}
        />
      );
    }

    if (currentStep === 1) {
      return (
        <QuestionCard
          headingRef={headingRef}
          question={t("citizenship_label", language)}
          options={[
            { value: "yes", label: t("yes", language) },
            { value: "no", label: t("no", language) }
          ]}
          selectedValue={answers.citizenship}
          onSelect={(value) => handleCitizenshipSelect(value as YesNo)}
        />
      );
    }

    if (currentStep === 2) {
      return (
        <QuestionCard
          headingRef={headingRef}
          question={t("registered_label", language)}
          options={[
            { value: "yes", label: t("yes", language) },
            { value: "no", label: t("no", language) },
            { value: "not_sure", label: t("not_sure", language) }
          ]}
          selectedValue={answers.registered}
          onSelect={(value) => handleRegisteredSelect(value as RegistrationAnswer)}
        />
      );
    }

    return (
      <QuestionCard
        headingRef={headingRef}
        question={t("moved_label", language)}
        options={[
          { value: "yes", label: t("yes", language) },
          { value: "no", label: t("no", language) }
        ]}
        selectedValue={answers.moved}
        onSelect={(value) => handleMovedSelect(value as YesNo)}
      />
    );
  };

  const summaryAnswers = {
    age: answers.age !== null ? String(answers.age) : undefined,
    citizen: answers.citizenship ? t(answers.citizenship, language) : undefined,
    registered: answers.registered ? t(answers.registered, language) : undefined,
    moved: answers.moved ? t(answers.moved, language) : undefined
  };

  const summaryLabels = {
    age: t("summary_age", language),
    citizen: t("summary_citizen", language),
    registered: t("summary_registered", language),
    moved: t("summary_moved", language)
  };

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-[var(--outline-variant)]">
        <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--primary)] mb-4">
          {stateData?.name} Eligibility Check
        </h3>
        <ProgressBar currentStep={currentStep} totalSteps={totalSteps} language={language} />
      </div>

      <AnswerSummary
        answers={summaryAnswers}
        labels={summaryLabels}
        onChipClick={jumpToQuestion}
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          {renderCurrentQuestion()}
        </motion.div>
      </AnimatePresence>

      {error && (
        <div aria-live="assertive" role="alert">
          <p className="rounded-md border border-[var(--error)] bg-[var(--error-container)] px-3 py-2 text-sm text-[var(--on-error-container)]">
            {error}
          </p>
        </div>
      )}

      <div className="flex items-center justify-between gap-2 pt-2 border-t border-[var(--outline-variant)] mt-4">
        <motion.button
          type="button"
          whileTap={{ scale: 0.98 }}
          onClick={goToPreviousQuestion}
          disabled={currentStep === 0}
          className="min-h-12 rounded-md border border-[var(--outline)] bg-[var(--surface-container-low)] px-4 text-sm font-semibold text-[var(--on-surface)] transition-colors hover:border-[var(--primary)] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {t("back", language)}
        </motion.button>

        {isSubmitting && (
          <p className="text-sm font-medium text-[var(--primary)]">
            {t("preparing_result", language)}
          </p>
        )}
      </div>
    </div>
  );
}
