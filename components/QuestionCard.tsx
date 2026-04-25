"use client";

import { motion } from "framer-motion";

interface QuestionOption {
  value: string;
  label: string;
}

interface QuestionCardProps {
  question: string;
  options: QuestionOption[];
  selectedValue: string | null;
  onSelect: (value: string) => void;
}

function getButtonClass(isActive: boolean): string {
  return `min-h-[48px] w-full text-left flex items-center justify-center rounded-md border-2 px-4 py-2 text-sm font-semibold transition-colors ${
    isActive
      ? "border-[var(--primary)] bg-[var(--surface-container)] text-[var(--primary)] shadow-sm"
      : "border-[var(--outline-variant)] bg-[var(--surface-container-lowest)] text-[var(--on-surface)] hover:border-[var(--primary)] hover:bg-[var(--surface-container-low)]"
  }`;
}

export default function QuestionCard({
  question,
  options,
  selectedValue,
  onSelect
}: QuestionCardProps) {
  return (
    <section className="rounded-xl border border-[var(--outline-variant)] bg-[var(--surface-container-low)] p-4 shadow-sm">
      <h3 className="text-base font-semibold leading-6 text-[var(--on-surface)]">
        {question}
      </h3>
      <div className="mt-4 flex flex-col gap-3">
        {options.map((option) => {
          const isActive = selectedValue === option.value;
          return (
            <motion.button
              key={option.value}
              type="button"
              whileTap={{ scale: 0.97 }}
              onClick={() => onSelect(option.value)}
              className={getButtonClass(isActive)}
            >
              {option.label}
            </motion.button>
          );
        })}
      </div>
    </section>
  );
}
