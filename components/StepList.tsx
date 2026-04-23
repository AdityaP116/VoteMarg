interface StepListProps {
  items: string[];
}

export default function StepList({ items }: StepListProps) {
  return (
    <ol className="space-y-3">
      {items.map((item, index) => (
        <li key={`${item}-${index}`} className="flex items-start gap-3">
          <span className="mt-0.5 inline-flex h-6 w-6 flex-none items-center justify-center rounded-full bg-[var(--primary)] text-xs font-semibold text-[var(--on-primary)]">
            {index + 1}
          </span>
          <span className="text-sm leading-6 text-[var(--on-surface)]">{item}</span>
        </li>
      ))}
    </ol>
  );
}
