import React, { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  ExternalLink,
  ServerCrash,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { IncidentSeverityBadge } from "./IncidentSeverityBadge";
import { IncidentStatusBadge } from "./IncidentStatusBadge";
import type { Incident } from "../types/incident.types";

interface Props {
  incidents: Incident[];
}

export function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleString('tr-TR', {
    timeZone: 'Europe/Istanbul',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function IncidentTable({ incidents }: Props) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="w-full overflow-x-auto rounded-2xl border border-slate-200 bg-white">
      <table className="min-w-[1200px] w-full text-sm">
        <thead>
          <tr className="border-b bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
            <th className="w-[140px] px-5 py-4">{t("ID")}</th>
            <th className="w-[260px] px-5 py-4">{t("Title")}</th>
            <th className="w-[360px] px-5 py-4">{t("Description")}</th>
            <th className="w-[220px] px-5 py-4">{t("Service")}</th>
            <th className="w-[140px] px-5 py-4">{t("Severity")}</th>
            <th className="w-[160px] px-5 py-4">{t("Status")}</th>
            <th className="w-[160px] px-5 py-4">{t("Created")}</th>
            <th className="w-16 px-5 py-4" />
          </tr>
        </thead>

        <tbody>
          {incidents.map((incident, index) => {
            const isExpanded = expandedId === incident.id;

            return (
              <React.Fragment key={incident.id}>
                <motion.tr
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.02 }}
                  className="border-b hover:bg-slate-50"
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500 text-white">
                        <ServerCrash size={14} />
                      </div>
                      <span className="font-semibold text-[#002b66]">
                        {incident.id.slice(0, 8)}
                      </span>
                    </div>
                  </td>

                  <td className="px-5 py-4 font-semibold text-slate-900">
                    {incident.title}
                  </td>

                  <td className="px-5 py-4">
                    <p
                      title={incident.description || t("No description")}
                      className="max-w-[320px] truncate text-slate-700"
                    >
                      {incident.description || t("No description")}
                    </p>
                  </td>

                  <td className="px-5 py-4 text-slate-700">
                    {incident.service}
                  </td>

                  <td className="px-5 py-4">
                    <IncidentSeverityBadge severity={incident.severity} />
                  </td>

                  <td className="px-5 py-4">
                    <IncidentStatusBadge status={incident.status} />
                  </td>

                  <td className="px-5 py-4 text-slate-500">
                    {formatDate(incident.createdAt)}
                  </td>

                  <td className="w-16 px-5 py-4 text-right">
                    <button
                      type="button"
                      onClick={() => toggleExpand(incident.id)}
                      className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-[#002b66]"
                    >
                      {isExpanded ? (
                        <ChevronDown size={18} />
                      ) : (
                        <ChevronRight size={18} />
                      )}
                    </button>
                  </td>
                </motion.tr>

                <AnimatePresence>
                  {isExpanded && (
                    <tr>
                      <td
                        colSpan={8}
                        className="border-b bg-slate-50 px-5 py-0"
                      >
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="grid gap-5 py-5 md:grid-cols-[1.4fr_1fr]">
                            <div className="rounded-2xl border border-slate-200 bg-white p-5">
                              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
                                {t("Description")}
                              </p>

                              <p className="leading-7 text-slate-700">
                                {incident.description ||
                                  t("No description provided.")}
                              </p>
                            </div>

                            <div className="rounded-2xl border border-slate-200 bg-white p-5">
                              <p className="mb-4 text-xs font-semibold uppercase tracking-wide text-slate-400">
                                {t("Incident Information")}
                              </p>

                              <div className="space-y-3 text-sm">
                                <InfoRow label={t("ID")} value={incident.id} />
                                <InfoRow
                                  label={t("Service")}
                                  value={incident.service}
                                />
                                <InfoRow
                                  label={t("Created")}
                                  value={formatDate(incident.createdAt)}
                                />
                                <InfoRow
                                  label={t("Updated")}
                                  value={formatDate(incident.updatedAt)}
                                />
                              </div>

                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  navigate(`/incidents/${incident.id}`);
                                }}
                                className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#002b66] px-4 py-3 font-semibold text-white hover:bg-[#001f4d]"
                              >
                                {t("Go to detail page")}
                                <ExternalLink size={16} />
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      </td>
                    </tr>
                  )}
                </AnimatePresence>
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 border-b border-slate-100 pb-2 last:border-b-0">
      <span className="text-slate-500">{label}</span>
      <span className="text-right font-semibold text-slate-800">{value}</span>
    </div>
  );
}