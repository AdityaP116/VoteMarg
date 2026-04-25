"use client";

interface StateSelectionProps {
  onSelect: (state: string) => void;
  onBack: () => void;
}

const POPULAR_STATES = [
  "Maharashtra",
  "Uttar Pradesh",
  "Bihar",
  "Karnataka",
  "Tamil Nadu",
];

const ALL_STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal"
];

export default function StateSelection({ onSelect, onBack }: StateSelectionProps) {
  return (
    <div className="flex h-full flex-col animate-fade-in-left">
      <div className="mb-6 flex items-center gap-3">
        <button
          onClick={onBack}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--surface-container-lowest)] text-[var(--on-surface)] shadow-sm transition-all hover:bg-[var(--surface-container)] active:scale-95"
          aria-label="Go back"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>
        <div>
          <h2 className="text-xl font-bold text-[var(--on-surface)]">
            Select State
          </h2>
          <p className="text-xs text-[var(--on-surface-variant)]">
            Where are you registered to vote?
          </p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-6 space-y-6">
        <div>
          <h3 className="mb-3 px-1 text-xs font-semibold uppercase tracking-wider text-[var(--on-surface-variant)]">
            Popular States
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {POPULAR_STATES.map((state) => (
              <button
                key={state}
                onClick={() => onSelect(state)}
                className="flex min-h-[48px] items-center justify-center rounded-xl border border-[var(--outline-variant)] bg-[var(--surface-container-lowest)] px-3 py-2 text-sm font-semibold text-[var(--on-surface)] shadow-sm transition-all hover:border-[var(--primary)] hover:bg-[var(--primary-container)] hover:text-[var(--on-primary-container)] active:scale-95"
              >
                {state}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-3 px-1 text-xs font-semibold uppercase tracking-wider text-[var(--on-surface-variant)]">
            All States
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {ALL_STATES.map((state) => (
              <button
                key={state}
                onClick={() => onSelect(state)}
                className="flex min-h-[44px] items-center justify-start rounded-lg bg-[var(--surface-container-lowest)] px-4 py-2 text-sm text-[var(--on-surface)] transition-all hover:bg-[var(--surface-container)] active:scale-95"
              >
                {state}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
