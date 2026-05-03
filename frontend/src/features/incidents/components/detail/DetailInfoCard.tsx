export function DetailInfoCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
        {icon}
      </div>

      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-1 break-words font-semibold text-[#071a3d]">{value}</p>
    </div>
  );
}