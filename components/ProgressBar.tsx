"use client";

import { motion } from "framer-motion";
import { Language } from "@/lib/types";
import { t } from "@/lib/translations";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  language: Language;
}

export default function ProgressBar({
  currentStep,
  totalSteps,
  language
}: ProgressBarProps) {
  const stepNumber = currentStep + 1;
  const progress = Math.round((stepNumber / totalSteps) * 100);

  return (
    <div className="rounded-lg border border-[var(--outline-variant)] bg-[var(--surface-container-low)] p-3">
      <div className="mb-2 flex items-center justify-between text-xs font-semibold text-[var(--on-surface-variant)]">
        <span>
          {t("step_counter", language)} {stepNumber} {t("of", language)} {totalSteps}
        </span>
        <span>{progress}%</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-[var(--surface-container-high)]">
        <motion.div
          className="h-2 rounded-full bg-[var(--primary)]"
          initial={false}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}
