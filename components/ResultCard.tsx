import StepList from "@/components/StepList";
import { DecisionResult, Language } from "@/lib/types";
import { t, TranslationKey } from "@/lib/translations";

interface ResultCardProps {
  result: DecisionResult;
  language: Language;
}

const statusClassMap: Record<DecisionResult["status"], string> = {
  not_eligible: "border-[var(--error)] bg-[var(--error-container)] text-[var(--on-error-container)]",
  not_registered: "border-[#b93815] bg-[#ffe9dc] text-[#7d3600]",
  update_required: "border-[#b93815] bg-[#ffe9dc] text-[#7d3600]",
  registered: "border-[var(--secondary)] bg-[#e9ffef] text-[#006d30]",
  unknown: "border-[var(--primary)] bg-[var(--surface-container)] text-[var(--on-surface)]"
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
        <p className="text-xs font-bold uppercase tracking-wide opacity-80">
          {t("status_label", language)}: {t(statusLabelKeyMap[result.status], language)}
        </p>
        <h2 className="mt-1 text-xl font-bold leading-7">
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
              className="flex items-start gap-3 rounded-md border border-[var(--outline-variant)] bg-[var(--surface-container-lowest)] px-3 py-2"
            >
              <span aria-hidden="true" className="text-base text-[var(--primary)] leading-tight">📄</span>
              <span className="leading-tight">{document}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-3">
        <h3 className="text-base font-semibold text-[var(--on-surface)]">
          {t("links_label", language)}
        </h3>
        <div className="flex flex-col gap-3">
          {result.links.map((link, index) => (
            <a
              key={`${link.url}-${link.label}`}
              href={link.url}
              target={link.url.startsWith("http") ? "_blank" : undefined}
              rel={link.url.startsWith("http") ? "noreferrer" : undefined}
              className={`flex min-h-[48px] items-center justify-center rounded-md px-4 py-3 text-sm font-semibold transition-transform active:scale-95 ${
                index === 0
                  ? "bg-[var(--primary)] text-[var(--on-primary)] shadow-md hover:bg-[var(--primary-container)]"
                  : "border-2 border-[var(--primary)] bg-transparent text-[var(--primary)] hover:bg-[var(--surface-container-low)]"
              }`}
            >
              {translateKey(link.label)}
            </a>
          ))}
        </div>
      </section>
    </article>
  );
}
