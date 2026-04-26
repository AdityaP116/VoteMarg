"use client";

import { motion } from "framer-motion";

interface DropdownQuestionProps {
  question: string;
  selectedValue: number | null;
  options: number[];
  placeholder: string;
  continueLabel: string;
  onChange: (value: number | null) => void;
  onContinue: () => void;
  disabled?: boolean;
  headingRef?: React.RefObject<HTMLHeadingElement | null>;
}

export default function DropdownQuestion({
  question,
  selectedValue,
  options,
  placeholder,
  continueLabel,
  onChange,
  onContinue,
  disabled = false,
  headingRef
}: DropdownQuestionProps) {
  return (
    <section className="rounded-xl border border-[var(--outline-variant)] bg-[var(--surface-container-low)] p-4">
      <h3 
        ref={headingRef}
        tabIndex={-1}
        className="text-base font-semibold leading-6 text-[var(--on-surface)] outline-none"
      >
        {question}
      </h3>

      <div className="mt-4">
        <label htmlFor="age-select" className="sr-only">
          {question}
        </label>
        <select
          id="age-select"
          name="age"
          value={selectedValue ?? ""}
          onChange={(event) => {
            const value = event.target.value;
            onChange(value ? Number(value) : null);
          }}
          className="min-h-12 w-full rounded-md border border-[var(--outline)] bg-[var(--surface-container-lowest)] px-3 text-base text-[var(--on-surface)] outline-none focus:border-2 focus:border-[var(--primary)]"
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <motion.button
        type="button"
        whileTap={{ scale: 0.98 }}
        onClick={onContinue}
        disabled={disabled}
        className="mt-4 min-h-12 w-full rounded-md bg-[var(--primary-container)] px-4 text-base font-semibold text-[var(--on-primary)] transition-colors hover:bg-[var(--primary)] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {continueLabel}
      </motion.button>
    </section>
  );
}
