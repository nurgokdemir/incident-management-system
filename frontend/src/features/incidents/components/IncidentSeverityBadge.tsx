import { useTranslation } from "react-i18next";
import type { Severity } from "../types/incident.types";


const styles: Record<Severity, string> = {
  critical: "bg-red-50 text-red-600 border-red-200",
  high: "bg-orange-50 text-orange-600 border-orange-200",
  medium: "bg-blue-50 text-blue-700 border-blue-200",
  low: "bg-green-50 text-green-700 border-green-200",
};

export function IncidentSeverityBadge({ severity }: { severity: Severity }) {
  const { t } = useTranslation();

  return (
    <span
      className={`rounded-md border px-2.5 py-1 text-xs font-semibold capitalize ${styles[severity]}`}
    >
      {t(severity)}
    </span>
  );
}