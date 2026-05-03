import { Plus } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useIncidentSocket } from "../hooks/useSocket";
import { useIncidents } from "../hooks/useIncidents";
import { IncidentFormDrawer } from "./IncidentFormDrawer";

import {
  EMPTY_FILTERS,
  type IncidentFilters as IncidentFiltersType,
} from "../types/filter.types";
import { DashboardStats } from "./dashboard/DashboardStats";
import { DistributionPanels } from "./dashboard/DistributionPanels";
import { IncidentFilters } from "./dashboard/IncidentFilters";
import { AdvancedFilterModal } from "./dashboard/AdvancedFilterModal";
import { EmptyState } from "./dashboard/EmptyState";
import { IncidentTable } from "./IncidentTable";
import { LoadingState } from "./dashboard/LoadingState";
import { ErrorState } from "./dashboard/ErrorState";

const PAGE_SIZE = 8;

const EMPTY_STATS = {
  total: 0,
  open: 0,
  investigating: 0,
  resolved: 0,
};

const EMPTY_SEVERITY_STATS = {
  critical: 0,
  high: 0,
  medium: 0,
  low: 0,
};

export default function IncidentDashboard() {
  const { t } = useTranslation();
  useIncidentSocket();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [page, setPage] = useState(1);

  const [filters, setFilters] =
    useState<IncidentFiltersType>(EMPTY_FILTERS);
  const [draftFilters, setDraftFilters] =
    useState<IncidentFiltersType>(EMPTY_FILTERS);

  const { data, isLoading, isError, refetch } = useIncidents({
    page,
    limit: PAGE_SIZE,
    ...filters,
  });

  const incidents = data?.data ?? [];
  const stats = data?.stats ?? EMPTY_STATS;
  const severityStats = data?.severityStats ?? EMPTY_SEVERITY_STATS;

  const updateFilter = <K extends keyof IncidentFiltersType>(
    key: K,
    value: IncidentFiltersType[K]
  ) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPage(1);
  };

  const updateDraftFilter = <K extends keyof IncidentFiltersType>(
    key: K,
    value: IncidentFiltersType[K]
  ) => {
    setDraftFilters((prev) => ({ ...prev, [key]: value }));
  };

  const openFilterModal = () => {
    setDraftFilters(filters);
    setFilterModalOpen(true);
  };

  const applyFilters = () => {
    setFilters(draftFilters);
    setPage(1);
    setFilterModalOpen(false);
  };

  const clearActiveFilters = () => {
    setFilters(EMPTY_FILTERS);
    setDraftFilters(EMPTY_FILTERS);
    setPage(1);
  };

  if (isLoading) return <LoadingState />;
  if (isError) return <ErrorState onRetry={() => refetch()} />;

  return (
    <section className="p-9">
      <div className="mb-7 flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#071a3d]">{t("Dashboard")}</h1>
          <p className="mt-1 text-slate-500">
            {t("Track and manage all incidents in real-time.")}
          </p>
        </div>

        <button
          type="button"
          onClick={() => setDrawerOpen(true)}
          className="flex items-center gap-2 rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white shadow-lg shadow-orange-500/25 transition hover:bg-orange-600"
        >
          <Plus size={18} />
          {t("New Incident")}
        </button>
      </div>

      <DashboardStats stats={stats} />

      <DistributionPanels stats={stats} severityStats={severityStats} />

      <IncidentFilters
        filters={filters}
        onChange={updateFilter}
        onOpenAdvanced={openFilterModal}
        onClear={clearActiveFilters}
      />

      {incidents.length === 0 ? (
        <EmptyState onCreate={() => setDrawerOpen(true)} />
      ) : (
        <IncidentTable incidents={incidents} />
      )}

      <div className="mt-5 flex items-center justify-between text-sm text-slate-500">
        <p>
          <p>
            {data?.meta.total === 0
              ? `0 ${t("results")}`
              : `${(page - 1) * PAGE_SIZE + 1} - ${Math.min(
                  page * PAGE_SIZE,
                  data?.meta.total ?? 0
                )} / ${data?.meta.total ?? 0} ${t("results")}`}
          </p>
        </p>

        <div className="flex gap-2">
          <button
            type="button"
            disabled={!data?.meta.hasPreviousPage}
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            className="h-10 rounded-xl border bg-white px-4 font-semibold text-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {t("Previous")}
          </button>

          {Array.from({ length: data?.meta.totalPages ?? 1 }).map(
            (_, index) => {
              const pageNumber = index + 1;

              return (
                <button
                  key={pageNumber}
                  type="button"
                  onClick={() => setPage(pageNumber)}
                  className={`h-10 w-10 rounded-xl border font-semibold ${
                    page === pageNumber
                      ? "bg-[#002b66] text-white"
                      : "bg-white text-slate-700"
                  }`}
                >
                  {pageNumber}
                </button>
              );
            }
          )}

          <button
            type="button"
            disabled={!data?.meta.hasNextPage}
            onClick={() => setPage((prev) => prev + 1)}
            className="h-10 rounded-xl border bg-white px-4 font-semibold text-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
           {t("Next")}
          </button>
        </div>
      </div>

      <AdvancedFilterModal
        open={filterModalOpen}
        draftFilters={draftFilters}
        onDraftChange={updateDraftFilter}
        onClearDraft={() => setDraftFilters(EMPTY_FILTERS)}
        onApply={applyFilters}
        onClose={() => setFilterModalOpen(false)}
      />

      <IncidentFormDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
    </section>
  );
}