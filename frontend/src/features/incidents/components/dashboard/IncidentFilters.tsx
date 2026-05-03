import { Search, SlidersHorizontal } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { IncidentFilters, SortOrder } from "../../types/filter.types";
import type { Severity, Status } from "../../types/incident.types";

type Props = {
  filters: IncidentFilters;
  onChange: <K extends keyof IncidentFilters>(
    key: K,
    value: IncidentFilters[K]
  ) => void;
  onOpenAdvanced: () => void;
  onClear: () => void;
};

export function IncidentFilters({
  filters,
  onChange,
  onOpenAdvanced,
  onClear,
}: Props) {
  const { t } = useTranslation();

  return (
    <div className="mb-4 flex flex-wrap items-center gap-3">
      <div className="relative w-72">
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          value={filters.search}
          onChange={(e) => onChange("search", e.target.value)}
          placeholder={t("Search incidents...")}
          className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-3 outline-none focus:border-orange-500"
        />
      </div>

      <select
        value={filters.status}
        onChange={(e) => onChange("status", e.target.value as Status | "")}
        className="rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-orange-500"
      >
        <option value="">{t("Status: All")}</option>
        <option value="open">{t("open")}</option>
        <option value="investigating">{t("investigating")}</option>
        <option value="resolved">{t("resolved")}</option>
      </select>

      <select
        value={filters.severity}
        onChange={(e) => onChange("severity", e.target.value as Severity | "")}
        className="rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-orange-500"
      >
        <option value="">{t("Severity: All")}</option>
        <option value="critical">{t("critical")}</option>
        <option value="high">{t("high")}</option>
        <option value="medium">{t("medium")}</option>
        <option value="low">{t("low")}</option>
      </select>

      <input
        value={filters.service}
        onChange={(e) => onChange("service", e.target.value)}
        placeholder={t("Service")}
        className="rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-orange-500"
      />

      <select
        value={filters.sortOrder}
        onChange={(e) => onChange("sortOrder", e.target.value as SortOrder)}
        className="rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-orange-500"
      >
        <option value="DESC">{t("Newest first")}</option>
        <option value="ASC">{t("Oldest first")}</option>
      </select>

      <button
        type="button"
        onClick={onOpenAdvanced}
        className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 font-semibold text-slate-700 hover:bg-slate-50"
      >
        <SlidersHorizontal size={16} />
        {t("Filters")}
      </button>

      <button
        type="button"
        onClick={onClear}
        className="rounded-xl bg-slate-100 px-5 py-3 font-semibold text-slate-700 hover:bg-slate-200"
      >
        {t("Clear")}
      </button>
    </div>
  );
}