import { AlertCircle } from "lucide-react";
import { useTranslation } from "react-i18next";

export function EmptyState({ onCreate }: { onCreate: () => void }) {
  const { t } = useTranslation();

  return (
    <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center shadow-sm">
      <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-50 text-orange-500">
        <AlertCircle size={30} />
      </div>

      <h3 className="text-xl font-bold text-[#071a3d]">
        {t("empty_title")}
      </h3>

      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
        {t("empty_description")}
      </p>

      <button
        type="button"
        onClick={onCreate}
        className="mt-6 rounded-xl bg-orange-500 px-5 py-3 font-semibold text-white shadow-lg shadow-orange-500/20 hover:bg-orange-600"
      >
        {t("create_incident")}
      </button>
    </div>
  );
}