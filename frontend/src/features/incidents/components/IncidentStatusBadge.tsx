import { useTranslation } from "react-i18next";
import type { Status } from "@/features/incidents/types/incident.types";


const styles: Record<Status, string> = {
  open: "bg-red-50 text-red-600 border-red-200",
  investigating: "bg-orange-50 text-orange-600 border-orange-200",
  resolved: "bg-green-50 text-green-700 border-green-200",
};

export function IncidentStatusBadge({ status }: { status: Status }) {
  const { t } = useTranslation();

  return (
    <span
      className={`rounded-md border px-2.5 py-1 text-xs font-semibold capitalize ${styles[status]}`}
    >
      {t(status)}
    </span>
  );
}