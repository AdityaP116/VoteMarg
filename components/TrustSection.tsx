import { Language } from "@/lib/types";
import { t } from "@/lib/translations";
import { statesData } from "@/data/statesData";

interface TrustSectionProps {
  language: Language;
  selectedState: string;
}

export default function TrustSection({ language, selectedState }: TrustSectionProps) {
  const stateData = statesData[selectedState.toLowerCase()];
  
  return (
    <div className="rounded-xl border border-[var(--outline-variant)] bg-[var(--surface-container-low)] p-4 text-sm text-[var(--on-surface)] shadow-sm">
      <div className="space-y-3">
        <p className="flex items-start gap-3">
          <span aria-hidden="true" className="text-base leading-none mt-[2px]">📊</span>
          <span className="leading-tight text-[var(--on-surface-variant)]">{t("trust_source", language)}</span>
        </p>
        <p className="flex items-start gap-3">
          <span aria-hidden="true" className="text-base leading-none mt-[2px]">🕒</span>
          <span className="leading-tight text-[var(--on-surface-variant)]">
            {t("last_updated", language)}: <span className="font-medium text-[var(--on-surface)]">{stateData?.lastUpdated || t("not_announced", language)}</span>
          </span>
        </p>
      </div>
      <div className="mt-4 pt-4 border-t border-[var(--outline-variant)]">
        <p className="flex items-start gap-3 text-xs">
          <span aria-hidden="true" className="text-sm leading-none mt-[1px]">⚠️</span>
          <span className="leading-relaxed text-[var(--on-surface-variant)]">{t("disclaimer", language)}</span>
        </p>
      </div>
    </div>
  );
}
