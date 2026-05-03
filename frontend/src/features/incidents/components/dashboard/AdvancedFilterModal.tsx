import { t } from "i18next";
import type { IncidentFilters, SortOrder } from "../../types/filter.types";
import type { Severity, Status } from "../../types/incident.types";


type Props = {
  open: boolean;
  draftFilters: IncidentFilters;
  onDraftChange: <K extends keyof IncidentFilters>(
    key: K,
    value: IncidentFilters[K]
  ) => void;
  onClearDraft: () => void;
  onApply: () => void;
  onClose: () => void;
};

export function AdvancedFilterModal({
  open,
  draftFilters,
  onDraftChange,
  onClearDraft,
  onApply,
  onClose,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 px-4 backdrop-blur-sm">
      <div className="w-full max-w-xl rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl">
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h2 className="text-xl font-bold text-[#071a3d]">
             {t("Advanced Filters")}
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              {t("Search, status, severity, service and date range filters.")}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
          >
            ✕
          </button>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <FilterInput
            label={t("Search")}
            value={draftFilters.search}
            onChange={(value) => onDraftChange("search", value)}
            placeholder={t("Title, description, service or ID")}
            fullWidth
          />

          <FilterSelect
            label={t("Status")}
            value={draftFilters.status}
            onChange={(value) => onDraftChange("status", value as Status | "")}
            options={[
              ["", t("Status: All")],
              ["open", t("Open")],
              ["investigating", t("Investigating")],
              ["resolved", t("Resolved")],
            ]}
          />

          <FilterSelect
            label={t("Severity")}
            value={draftFilters.severity}
            onChange={(value) =>
              onDraftChange("severity", value as Severity | "")
            }
            options={[
              ["", t("Severity: All")],
              ["critical", t("Critical")],
              ["high", t("High")],
              ["medium", t("Medium")],
              ["low", t("Low")],
            ]}
          />

          <FilterInput
            label={t("Service")}
            value={draftFilters.service}
            onChange={(value) => onDraftChange("service", value)}
            placeholder={t("Payment API")}
          />

          <FilterSelect
            label={t("Sort by created date")}
            value={draftFilters.sortOrder}
            onChange={(value) =>
              onDraftChange("sortOrder", value as SortOrder)
            }
            options={[
              ["DESC", t("Newest first")],
              ["ASC", t("Oldest first")],
            ]}
          />

          <FilterInput
            label={t("Created from")}
            type="date"
            value={draftFilters.createdFrom}
            onChange={(value) => onDraftChange("createdFrom", value)}
          />

          <FilterInput
            label={t("Created to")}
            type="date"
            value={draftFilters.createdTo}
            onChange={(value) => onDraftChange("createdTo", value)}
          />
        </div>

        <div className="mt-7 flex gap-3">
          <button
            type="button"
            onClick={onClearDraft}
            className="flex-1 rounded-xl border border-slate-200 bg-white px-5 py-3 font-semibold text-slate-700 hover:bg-slate-50"
          >
            {t("Clear")}
          </button>

          <button
            type="button"
            onClick={onApply}
            className="flex-1 rounded-xl bg-[#002b66] px-5 py-3 font-semibold text-white hover:bg-[#001f4d]"
          >
            {t("Apply filters")}
          </button>
        </div>
      </div>
    </div>
  );
}

function FilterInput({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  fullWidth,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  fullWidth?: boolean;
}) {
  return (
    <div className={fullWidth ? "md:col-span-2" : ""}>
      <label className="mb-2 block text-sm font-semibold text-slate-700">
        {label}
      </label>

      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-orange-500"
      />
    </div>
  );
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: [string, string][];
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-slate-700">
        {label}
      </label>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-orange-500"
      >
        {options.map(([optionValue, label]) => (
          <option key={optionValue} value={optionValue}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
}