import { Activity, AlertCircle, CheckCircle2, Clock3 } from "lucide-react";
import { motion } from "framer-motion";
import { t } from "i18next";

type Stats = {
  total: number;
  open: number;
  investigating: number;
  resolved: number;
};

export function DashboardStats({ stats }: { stats: Stats }) {
  return (
    <div className="mb-6 grid grid-cols-4 gap-5">
      <TotalIncidentCard value={stats.total} />

      <StatusCard
        title={t("Open")}
        value={stats.open}
        icon={<AlertCircle size={20} />}
        color="red"
      />

      <StatusCard
        title={t("Investigating")}
        value={stats.investigating}
        icon={<Clock3 size={20} />}
        color="orange"
      />

      <StatusCard
        title={t("Resolved")}
        value={stats.resolved}
        icon={<CheckCircle2 size={20} />}
        color="green"
      />
    </div>
  );
}

function TotalIncidentCard({ value }: { value: number }) {
  const MAX = 1000;
  const widthPct = Math.min((value / MAX) * 100, 100);

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="rounded-2xl border border-[#002b66] bg-[#002b66] p-6 text-white shadow-sm"
    >
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-orange-400">
          <Activity size={22} />
        </div>
        <p className="text-sm font-semibold text-blue-100">{t("Total Incidents")}</p>
      </div>

      <p className="text-4xl font-bold">{value}</p>

      <div className="mt-5 h-3 overflow-hidden rounded-full bg-white/15">
        <div
          className="h-full rounded-full bg-gradient-to-r from-orange-400 to-orange-500 transition-all duration-700"
          style={{ width: `${widthPct}%` }}
        />
      </div>
    </motion.div>
  );
}

function StatusCard({
  title,
  value,
  icon,
  color,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: "red" | "orange" | "green";
}) {
  const styles = {
    red: {
      card: "bg-red-50/60 border-red-100",
      iconBox: "bg-red-100 text-red-600",
      bar: "bg-red-500",
    },
    orange: {
      card: "bg-orange-50/70 border-orange-100",
      iconBox: "bg-orange-100 text-orange-600",
      bar: "bg-orange-500",
    },
    green: {
      card: "bg-green-50/70 border-green-100",
      iconBox: "bg-green-100 text-green-600",
      bar: "bg-green-500",
    },
  }[color];

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className={`rounded-2xl border p-6 shadow-sm transition hover:shadow-lg ${styles.card}`}
    >
      <div className="mb-5 flex items-center gap-3">
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl ${styles.iconBox}`}
        >
          {icon}
        </div>

        <p className="text-sm font-semibold text-[#071a3d]">{title}</p>
      </div>

      <p className="text-4xl font-bold text-[#071a3d]">{value}</p>

      <div className="mt-5 h-3 overflow-hidden rounded-full bg-white/70">
        <div
          className={`h-full rounded-full ${styles.bar}`}
          style={{ width: `${Math.min(value * 8, 100)}%` }}
        />
      </div>
    </motion.div>
  );
}