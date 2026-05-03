import { AlertCircle } from "lucide-react";
import { useTranslation } from "react-i18next";

export function ErrorState({ onRetry }: { onRetry: () => void }) {
  const { t } = useTranslation();
  return (
    <section className="flex min-h-[calc(100vh-80px)] items-center justify-center p-9">
      <div className="w-full max-w-md rounded-3xl border border-red-200 bg-white p-8 text-center shadow-lg">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-red-500">
          <AlertCircle size={32} />
        </div>

        <h2 className="text-lg font-bold text-[#071a3d]">
          {t("Failed to load data")}
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          {t("An error occurred while fetching incident data. Please try again.")}
        </p>

        <button
          type="button"
          onClick={onRetry}
          className="mt-6 rounded-xl bg-[#002b66] px-5 py-3 font-semibold text-white hover:bg-[#001f4d]"
        >
          {t("Retry")}
        </button>
      </div>
    </section>
  );
}