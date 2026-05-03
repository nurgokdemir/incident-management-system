import {
  ArrowLeft,
  CalendarClock,
  RefreshCw,
  Save,
  Server,
  ShieldAlert,
  Trash2,
  Type,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { api } from "@/lib/axios";

import { useIncident } from "../hooks/useIncidents";
import { IncidentSeverityBadge } from "./IncidentSeverityBadge";
import { IncidentStatusBadge } from "./IncidentStatusBadge";
import { DeleteIncidentModal } from "./detail/DeleteIncidentModal";
import { DetailInfoCard } from "./detail/DetailInfoCard";
import { DetailTextField } from "./detail/DetailTextField";
import { DetailSelectField } from "./detail/DetailSelectField";
import type { Severity, Status } from "../types/incident.types";

const DESCRIPTION_MAX_LENGTH = 250;

export const formatDate = (date: string) => {
  return new Intl.DateTimeFormat("tr-TR", {
    timeZone: "Europe/Istanbul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
};

export default function IncidentDetailPage() {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: incident, isLoading, refetch } = useIncident(id);

  const [title, setTitle] = useState("");
  const [service, setService] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<Status>("open");
  const [severity, setSeverity] = useState<Severity>("medium");
  const [isSaving, setIsSaving] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!incident) return;

    setTitle(incident.title);
    setService(incident.service);
    setDescription(incident.description ?? "");
    setStatus(incident.status);
    setSeverity(incident.severity);
  }, [incident]);

  if (isLoading) {
    return (
      <section className="p-9 text-slate-500">
        {t("Incident yükleniyor...")}
      </section>
    );
  }

  if (!incident) {
    return (
      <section className="p-9">
        <button
          type="button"
          onClick={() => navigate("/")}
          className="mb-6 flex items-center gap-2 font-semibold text-[#002b66]"
        >
          <ArrowLeft size={16} />
          {t("Dashboard")}
        </button>
        <div className="rounded-2xl border bg-white p-8 text-red-500">
          {t("Incident bulunamadı.")}
        </div>
      </section>
    );
  }

  const hasChanges =
    title !== incident.title ||
    service !== incident.service ||
    description !== (incident.description ?? "") ||
    status !== incident.status ||
    severity !== incident.severity;

  const isFormValid =
    title.trim() !== "" &&
    service.trim() !== "" &&
    description.length <= DESCRIPTION_MAX_LENGTH;

  const handleSave = async () => {
    if (!hasChanges || !isFormValid) return;

    setIsSaving(true);

    try {
      await api.patch(`/incidents/${incident.id}`, {
        title: title.trim(),
        service: service.trim(),
        description: description.trim(),
        status,
        severity,
      });

      await refetch();
      toast.success(t("Incident başarıyla güncellendi."));
    } catch {
      toast.error(t("Incident güncellenirken bir hata oluştu."));
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);

    try {
      await api.delete(`/incidents/${incident.id}`);
      toast.success(t("Incident başarıyla silindi."));

      setTimeout(() => {
        navigate("/");
      }, 600);
    } catch {
      toast.error(t("Incident silinirken bir hata oluştu."));
    } finally {
      setIsDeleting(false);
      setDeleteModalOpen(false);
    }
  };

  return (
    <section className="p-9">
      <button
        type="button"
        onClick={() => navigate("/")}
        className="mb-6 flex items-center gap-2 text-sm font-semibold text-[#002b66] transition hover:text-orange-500"
      >
        <ArrowLeft size={16} />
        {t("Dashboard")}
      </button>

      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="mb-8 flex items-start justify-between">
          <div>
            <p className="mb-2 text-sm font-semibold text-orange-500">
              {t("Incident Detail")}
            </p>

            <h1 className="text-3xl font-bold text-[#071a3d]">
              {title || incident.title}
            </h1>

            <p className="mt-2 text-sm text-slate-500">ID: {incident.id}</p>
          </div>

          <div className="flex gap-2">
            <IncidentSeverityBadge severity={severity} />
            <IncidentStatusBadge status={status} />
          </div>
        </div>

        <div className="mb-8 grid gap-5 md:grid-cols-3">
          <DetailInfoCard
            icon={<Server size={18} />}
            label={t("Service")}
            value={service || "-"}
          />

          <DetailInfoCard
            icon={<CalendarClock size={18} />}
            label={t("Created At")}
            value={formatDate(incident.createdAt)}
          />

          <DetailInfoCard
            icon={<RefreshCw size={18} />}
            label={t("Updated At")}
            value={formatDate(incident.updatedAt)}
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <ShieldAlert size={18} className="text-orange-500" />
                <h2 className="text-lg font-bold text-[#071a3d]">
                  {t("Description")}
                </h2>
              </div>

              <span
                className={`text-xs font-medium ${
                  description.length >= DESCRIPTION_MAX_LENGTH
                    ? "text-red-500"
                    : description.length > DESCRIPTION_MAX_LENGTH * 0.8
                    ? "text-orange-500"
                    : "text-slate-500"
                }`}
              >
                {description.length} / {DESCRIPTION_MAX_LENGTH}
              </span>
            </div>

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              maxLength={DESCRIPTION_MAX_LENGTH}
              rows={12}
              placeholder={t("Enter description...")}
              className="w-full resize-none rounded-2xl border border-slate-200 bg-white p-4 leading-7 text-slate-700 outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10"
            />
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="mb-5 text-lg font-bold text-[#071a3d]">
              {t("Edit Incident")}
            </h2>

            <div className="space-y-5">
              <DetailTextField
                label={t("Title")}
                icon={<Type size={15} className="text-orange-500" />}
                value={title}
                onChange={setTitle}
                placeholder={t("Incident başlığı")}
                error={
                  title.trim() === "" ? t("Title cannot be empty.") : undefined
                }
              />

              <DetailTextField
                label={t("Service")}
                icon={<Server size={15} className="text-orange-500" />}
                value={service}
                onChange={setService}
                placeholder={t("Payment API")}
                error={
                  service.trim() === ""
                    ? t("Service cannot be empty.")
                    : undefined
                }
              />

              <DetailSelectField
                label={t("Status")}
                value={status}
                onChange={(value) => setStatus(value as Status)}
                options={[
                  ["open", t("Open")],
                  ["investigating", t("Investigating")],
                  ["resolved", t("Resolved")],
                ]}
              />

              <DetailSelectField
                label={t("Severity")}
                value={severity}
                onChange={(value) => setSeverity(value as Severity)}
                options={[
                  ["low", t("Low")],
                  ["medium", t("Medium")],
                  ["high", t("High")],
                  ["critical", t("Critical")],
                ]}
              />

              <button
                type="button"
                onClick={handleSave}
                disabled={!hasChanges || !isFormValid || isSaving}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#002b66] px-5 py-3 font-semibold text-white shadow-lg shadow-blue-900/20 transition hover:bg-[#001f4d] disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Save size={17} />
                {isSaving ? t("Saving...") : t("Save Changes")}
              </button>

              <button
                type="button"
                onClick={() => setDeleteModalOpen(true)}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-500 px-5 py-3 font-semibold text-white shadow-lg shadow-red-500/20 transition hover:bg-red-600"
              >
                <Trash2 size={17} />
                {t("Delete")}
              </button>
            </div>
          </div>
        </div>
      </div>
      <DeleteIncidentModal
        open={deleteModalOpen}
        title={incident.title}
        isDeleting={isDeleting}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDelete}
      />
    </section>
  );
}