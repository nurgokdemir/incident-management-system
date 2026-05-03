import { useTranslation } from "react-i18next";

type Stats = {
  total: number;
  open: number;
  investigating: number;
  resolved: number;
};

type SeverityStats = {
  critical: number;
  high: number;
  medium: number;
  low: number;
};

export function DistributionPanels({
  stats,
  severityStats,
}: {
  stats: Stats;
  severityStats: SeverityStats;
}) {
  const { t } = useTranslation();
  return (
    <div className="mb-7 grid grid-cols-2 gap-5">
      <Panel title={t("Status Distribution")}>
        <div className="flex items-center gap-10">
          <div className="flex h-36 w-36 items-center justify-center rounded-full border-[22px] border-green-500 border-r-orange-500 border-t-red-500">
            <div className="text-center">
              <p className="text-2xl font-bold text-[#071a3d]">
                {stats.total}
              </p>
              <p className="text-sm text-slate-500">{t("Total")}</p>
            </div>
          </div>

          <div className="space-y-4 text-sm">
            <Legend color="bg-red-500" label={t("Open")} value={stats.open} />
            <Legend
              color="bg-orange-500"
              label={t("Investigating")}
              value={stats.investigating}
            />
            <Legend
              color="bg-green-500"
              label={t("Resolved")}
              value={stats.resolved}
            />
          </div>
        </div>
      </Panel>

      <Panel title={t("Severity Distribution")}>
        <div className="flex h-44 items-end gap-8 px-6">
          <Bar label={t("Critical")} value={severityStats.critical} color="bg-red-500" />
          <Bar label={t("High")} value={severityStats.high} color="bg-orange-500" />
          <Bar label={t("Medium")} value={severityStats.medium} color="bg-[#002b66]" />
          <Bar label={t("Low")} value={severityStats.low} color="bg-blue-400" />
        </div>
      </Panel>
    </div>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="mb-5 font-bold text-[#071a3d]">{title}</h3>
      {children}
    </div>
  );
}

function Legend({
  color,
  label,
  value,
}: {
  color: string;
  label: string;
  value: number;
}) {
  return (
    <div className="flex w-72 items-center justify-between">
      <div className="flex items-center gap-3">
        <span className={`h-3 w-3 rounded-full ${color}`} />
        <span className="text-slate-700">{label}</span>
      </div>
      <span className="font-semibold text-[#071a3d]">{value}</span>
    </div>
  );
}

function Bar({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) {
  const height = Math.max(value * 18, 16);

  return (
    <div className="flex flex-1 flex-col items-center justify-end">
      <p className="mb-2 font-bold text-[#071a3d]">{value}</p>
      <div
        className={`w-full rounded-t-xl ${color}`}
        style={{ height: `${Math.min(height, 128)}px` }}
      />
      <p className="mt-2 text-sm text-slate-500">{label}</p>
    </div>
  );
}