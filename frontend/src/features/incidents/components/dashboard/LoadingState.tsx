import { useTranslation } from "react-i18next";

export function LoadingState() {
  const { t } = useTranslation();
  return (
    <section className="flex min-h-[calc(100vh-80px)] items-center justify-center p-9">
      <div className="flex flex-col items-center gap-5">
        <div className="relative h-20 w-20">
          <div className="absolute inset-0 rounded-full border-4 border-slate-200" />
          <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-r-[#002b66] border-t-orange-500" />
          <div className="absolute inset-4 rounded-full bg-white shadow-inner" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-sm font-bold text-[#002b66]">ADL</span>
          </div>
        </div>

        <div className="text-center">
          <p className="text-sm font-semibold text-[#071a3d]">
            {t("Loading incident data")}
          </p>
          <p className="mt-1 text-xs text-slate-500">
            {t("Preparing real-time dashboard")}
          </p>
        </div>
      </div>
    </section>
  );
}