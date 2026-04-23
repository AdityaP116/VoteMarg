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
  columns?: 2 | 3;
}

function getButtonClass(isActive: boolean): string {
  return `min-h-12 rounded-md border-2 px-3 py-2 text-sm font-semibold transition-colors ${
    isActive
      ? "border-[var(--primary)] bg-[var(--surface-container)] text-[var(--primary)]"
      : "border-[var(--outline)] bg-[var(--surface-container-lowest)] text-[var(--on-surface)] hover:border-[var(--primary)]"
  }`;
}

export default function QuestionCard({
  question,
  options,
  selectedValue,
  onSelect,
  columns = 2
}: QuestionCardProps) {
  return (
    <section className="rounded-xl border border-[var(--outline-variant)] bg-[var(--surface-container-low)] p-4">
      <h3 className="text-base font-semibold leading-6 text-[var(--on-surface)]">
        {question}
      </h3>
      <div className={`mt-4 grid gap-2 ${columns === 3 ? "grid-cols-3" : "grid-cols-2"}`}>
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
