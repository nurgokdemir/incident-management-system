import { BarChart3, FileText, LayoutDashboard, Settings } from "lucide-react";
import { NavLink } from "react-router-dom";
import adlLogo from "@/assets/adl-logo.png";
import { useTranslation } from "react-i18next";

export default function Sidebar() {
  const { t } = useTranslation();

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-72 flex-col justify-between bg-[#061933] text-white">
      <div>
<div className="border-b border-white/10 px-5 py-6">
  <div className="bg-white rounded-xl p-3 border border-slate-200 shadow-sm">
    <img
      src={adlLogo}
      alt="ADL"
      className="w-full h-auto object-contain"
    />
  </div>

  <p className="mt-4 text-[10px] tracking-[0.25em] text-slate-300 text-center">
    ANALYZE • DEVELOP • LAUNCH
  </p>
</div>

        <nav className="mt-6 space-y-2 px-4">
          <MenuItem to="/" icon={<LayoutDashboard size={18} />} label= {t("Dashboard")}/>
          <MenuItem to="/analytics" icon={<BarChart3 size={18} />} label={t("Analytics")} />
          <MenuItem to="/reports" icon={<FileText size={18} />} label={t("Reports")} />
          <MenuItem to="/settings" icon={<Settings size={18} />} label={t("Settings")} />
        </nav>
      </div>

      <div className="p-5">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-orange-500 font-bold">
              AD
            </div>
            <div>
              <p className="text-sm font-semibold">{t("Admin")}</p>
              <p className="text-xs text-slate-300">admin@adl.com.tr</p>
            </div>
          </div>
        </div>

     
      </div>
    </aside>
  );
}

function MenuItem({
  to,
  icon,
  label,
}: {
  to: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${
          isActive
            ? "bg-orange-500 text-white shadow-lg shadow-orange-500/20"
            : "text-slate-200 hover:bg-white/10"
        }`
      }
    >
      {icon}
      {label}
    </NavLink>
  );
}