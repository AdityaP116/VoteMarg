import StepList from "@/components/StepList";
import { DecisionResult, Language } from "@/lib/types";
import { t, TranslationKey } from "@/lib/translations";

interface ResultCardProps {
  result: DecisionResult;
  language: Language;
}

const statusClassMap: Record<DecisionResult["status"], string> = {
  not_eligible: "border-[var(--error)] bg-[var(--error-container)]",
  not_registered: "border-[var(--tertiary)] bg-[#ffe9dc]",
  update_required: "border-[var(--tertiary)] bg-[#ffe9dc]",
  registered: "border-[var(--secondary)] bg-[#e9ffef]",
  unknown: "border-[var(--primary)] bg-[var(--surface-container)]"
};

const statusLabelKeyMap: Record<DecisionResult["status"], TranslationKey> = {
  not_eligible: "status_not_eligible",
  not_registered: "status_not_registered",
  update_required: "status_update_required",
  registered: "status_registered",
  unknown: "status_unknown"
};

export default function ResultCard({ result, language }: ResultCardProps) {
  const translateKey = (key: string) => t(key as TranslationKey, language);
  const translatedSteps = result.steps.map((step) => translateKey(step));
  const translatedDocuments = result.documents.map((document) => translateKey(document));

  return (
    <article className="space-y-5 rounded-xl border border-[var(--outline-variant)] bg-[var(--surface-container-lowest)] p-4">
      <div className={`rounded-lg border-l-4 p-4 ${statusClassMap[result.status]}`}>
        <p className="text-xs font-semibold uppercase tracking-wide text-[var(--on-surface-variant)]">
          {t("status_label", language)}: {t(statusLabelKeyMap[result.status], language)}
        </p>
        <h2 className="mt-2 text-xl font-bold leading-7 text-[var(--on-surface)]">
          {translateKey(result.title)}
        </h2>
      </div>

      {result.action && (
        <div className="rounded-lg border border-[var(--outline-variant)] bg-[var(--surface-container-low)] px-3 py-2 text-sm">
          <span className="font-semibold">{t("action_label", language)}: </span>
          <span>{translateKey(result.action)}</span>
        </div>
      )}

      <section className="space-y-3">
        <h3 className="text-base font-semibold text-[var(--on-surface)]">
          {t("steps_label", language)}
        </h3>
        <StepList items={translatedSteps} />
      </section>

      <section className="space-y-3">
        <h3 className="text-base font-semibold text-[var(--on-surface)]">
          {t("documents_label", language)}
        </h3>
        <ul className="space-y-2 text-sm text-[var(--on-surface)]">
          {translatedDocuments.map((document) => (
            <li
              key={document}
              className="rounded-md border border-[var(--outline-variant)] bg-[var(--surface-container-low)] px-3 py-2"
            >
              {document}
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-3">
        <h3 className="text-base font-semibold text-[var(--on-surface)]">
          {t("links_label", language)}
        </h3>
        <div className="grid gap-2">
          {result.links.map((link) => (
            <a
              key={`${link.url}-${link.label}`}
              href={link.url}
              target={link.url.startsWith("http") ? "_blank" : undefined}
              rel={link.url.startsWith("http") ? "noreferrer" : undefined}
              className="min-h-12 rounded-md border border-[var(--primary)] px-3 py-3 text-sm font-semibold text-[var(--primary)] transition-colors hover:bg-[var(--surface-container)]"
            >
              {translateKey(link.label)}
            </a>
          ))}
        </div>
      </section>
    </article>
  );
}
