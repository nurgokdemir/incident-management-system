import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useCreateIncident } from "@/features/incidents/hooks/useIncidents";
import type { Severity } from "@/features/incidents/types/incident.types";
import { toast } from "sonner";
import { Sparkles } from "lucide-react";
import { analyzeIncident } from "../services/incident.api";


interface Props {
  open: boolean;
  onClose: () => void;
}

export function IncidentFormDrawer({ open, onClose }: Props) {
  const { t } = useTranslation();
  const createMutation = useCreateIncident();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [service, setService] = useState("");
  const [severity, setSeverity] = useState<Severity>("medium");

  const [isAnalyzing, setIsAnalyzing] = useState(false);

const handleSubmit = async () => {
  if (!title.trim() || !service.trim() || !severity) {
    toast.error(t("Title, service and severity fields are required."));
    return;
  }

  if (description.length > 250) {
  toast.error(t("Description can be up to 250 characters."));
  return;
}

  try {
    await createMutation.mutateAsync({
      title: title.trim(),
      description: description.trim(),
      service: service.trim(),
      severity,
    });

    toast.success(t("Incident created successfully."));

    setTitle("");
    setDescription("");
    setService("");
    setSeverity("medium");
    onClose();
  } catch {
    toast.error(t("An error occurred while creating incident."));
  }
};

const handleAnalyze = async () => {
  if (!title.trim() || !description.trim()) {
    toast.error(t("AI analysis requires title and description."));
    return;
  }

  setIsAnalyzing(true);

  try {
    const result = await analyzeIncident({
      title: title.trim(),
      description: description.trim(),
    });

    setSeverity(result.severity);
    setService(result.service);

    toast.success(t("AI suggestions were applied to the form."));
  } catch {
    toast.error(t("AI analysis failed."));
  } finally {
    setIsAnalyzing(false);
  }
};

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-40 bg-slate-950/20 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.aside
            className="fixed right-0 top-0 z-50 h-full w-[420px] border-l border-slate-200 bg-white p-7 shadow-2xl"
            initial={{ x: 450 }}
            animate={{ x: 0 }}
            exit={{ x: 450 }}
            transition={{ type: "spring", damping: 28, stiffness: 260 }}
          >
            <div className="mb-8 flex items-start justify-between">
              <div>
                <h2 className="text-xl font-bold text-[#071a3d]">
                  {t("New Incident")}
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  {t("Create a new incident record.")}
                </p>
              </div>

              <button
                onClick={onClose}
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  {t("Title *")}
                </label>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder={t("Enter incident title")}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-orange-500"
                />
              </div>

            <div>
  <div className="mb-2 flex items-center justify-between">
    <label className="text-sm font-semibold text-slate-700">
      {t("Description")}
    </label>

    <span className="text-xs text-slate-500">
      {description.length} / 250
    </span>
  </div>

  <textarea
    value={description}
    onChange={(e) => {
      if (e.target.value.length <= 250) {
        setDescription(e.target.value);
      }
    }}
    maxLength={250}
    placeholder={t("Enter incident description...")}
    rows={5}
    className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-orange-500"
  />
  <button
  type="button"
  onClick={handleAnalyze}
  disabled={isAnalyzing}
  className="mt-3 flex items-center justify-center gap-2 rounded-xl bg-[#002b66] px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-900/20 transition hover:bg-[#001f4d] disabled:cursor-not-allowed disabled:opacity-60"
>
  <Sparkles size={16} />
  {isAnalyzing ? t("AI analyzing...") : t("Suggest service/severity with AI")}
</button>
</div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  {t("Service *")}
                </label>
                <input
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  placeholder={t("Payment API")}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  {t("Severity *")}
                </label>
                <select
                  value={severity}
                  onChange={(e) => setSeverity(e.target.value as Severity)}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-orange-500"
                >
                  <option value="low">{t("Low")}</option>
                  <option value="medium">{t("Medium")}</option>
                  <option value="high">{t("High")}</option>
                  <option value="critical">{t("Critical")}</option>
                </select>
              </div>
            </div>

            <div className="absolute bottom-7 left-7 right-7 flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 rounded-xl border border-slate-200 py-3 font-semibold text-slate-700 hover:bg-slate-50"
              >
                {t("Cancel")}
              </button>

              <button
                onClick={handleSubmit}
                disabled={createMutation.isPending}
                className="flex-1 rounded-xl bg-[#002b66] py-3 font-semibold text-white shadow-lg shadow-blue-900/20 hover:bg-[#001f4d]"
              >
                {createMutation.isPending ? t("Creating...") : t("Create")}
              </button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}