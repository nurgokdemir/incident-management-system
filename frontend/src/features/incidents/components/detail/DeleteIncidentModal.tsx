import { AlertTriangle, X } from "lucide-react";
import { useTranslation } from "react-i18next";

export function DeleteIncidentModal({
  open,
  title,
  isDeleting,
  onClose,
  onConfirm,
}: {
  open: boolean;
  title: string;
  isDeleting: boolean;
  onClose: () => void;
  onConfirm: () => void;
}) {
  const { t } = useTranslation();

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 px-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl">
        <div className="mb-5 flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-red-500">
              <AlertTriangle size={24} />
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#071a3d]">
                {t("Are you sure you want to delete this incident?")}
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                {t(
                  "This action cannot be undone. The selected incident record will be deleted from the system."
                )}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
          >
            <X size={18} />
          </button>
        </div>


        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-xl border border-slate-200 bg-white px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            {t("Cancel")}
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={isDeleting}
            className="flex-1 rounded-xl bg-red-500 px-5 py-3 font-semibold text-white shadow-lg shadow-red-500/20 transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isDeleting ? t("Deleting...") : t("Delete")}
          </button>
        </div>
      </div>
    </div>
  );
}