"use client";

type SummaryAnswers = {
  age?: string;
  citizen?: string;
  registered?: string;
  moved?: string;
};

type SummaryField = keyof SummaryAnswers;

interface AnswerSummaryProps {
  answers: SummaryAnswers;
  labels?: Partial<Record<SummaryField, string>>;
  onChipClick?: (field: SummaryField) => void;
}

const fields: SummaryField[] = ["age", "citizen", "registered", "moved"];

const fallbackLabels: Record<SummaryField, string> = {
  age: "Age",
  citizen: "Citizen",
  registered: "Registered",
  moved: "Moved"
};

export default function AnswerSummary({
  answers,
  labels,
  onChipClick
}: AnswerSummaryProps) {
  const visibleFields = fields.filter((field) => Boolean(answers[field]));

  if (visibleFields.length === 0) {
    return null;
  }

  return (
    <section className="py-1">
      <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
        {visibleFields.map((field) => {
          const label = labels?.[field] ?? fallbackLabels[field];
          const value = answers[field];
          const text = `${label}: ${value}`;

          if (!onChipClick) {
            return (
              <span
                key={field}
                className="whitespace-nowrap rounded-full bg-[var(--surface-container-low)] px-3 py-1.5 text-xs font-medium text-[var(--on-surface)]"
              >
                {text}
              </span>
            );
          }

          return (
            <button
              key={field}
              type="button"
              onClick={() => onChipClick(field)}
              className="whitespace-nowrap rounded-full bg-[var(--surface-container-low)] px-3 py-1.5 text-xs font-medium text-[var(--on-surface)] transition-colors hover:bg-[var(--surface-container-high)]"
            >
              {text}
            </button>
          );
        })}
      </div>
    </section>
  );
}
