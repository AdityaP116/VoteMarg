import { Language } from "@/lib/types";
import { t } from "@/lib/translations";
import electionData from "@/data/maharashtraElection.json";

interface TrustSectionProps {
  language: Language;
}

export default function TrustSection({ language }: TrustSectionProps) {
  return (
    <footer className="mb-4 mt-6 rounded-xl border border-[var(--outline-variant)] bg-[var(--surface-container-low)] p-4 text-sm text-[var(--on-surface)]">
      <div className="space-y-3">
        <p className="flex items-start gap-2">
          <span aria-hidden="true" className="text-base leading-tight">📊</span>
          <span className="leading-tight">{t("trust_source", language)}</span>
        </p>
        <p className="flex items-start gap-2">
          <span aria-hidden="true" className="text-base leading-tight">🕒</span>
          <span className="leading-tight">
            {t("last_updated", language)}: {electionData.lastUpdated || t("not_announced", language)}
          </span>
        </p>
        <p className="flex items-start gap-2">
          <span aria-hidden="true" className="text-base leading-tight">📞</span>
          <span className="leading-tight">{t("help_label", language)}</span>
        </p>
        <p className="flex items-start gap-2 text-[var(--on-surface-variant)]">
          <span aria-hidden="true" className="text-base leading-tight">⚠️</span>
          <span className="leading-tight text-xs">{t("disclaimer", language)}</span>
        </p>
      </div>

      {/* Dynamic copyright — year auto-updates, no hardcoding */}
      <p className="mt-4 border-t border-[var(--outline-variant)] pt-3 text-center text-xs text-[var(--on-surface-variant)]">
        © {new Date().getFullYear()} Maharashtra Election Assistant. All rights reserved.
      </p>
    </footer>
  );
}
