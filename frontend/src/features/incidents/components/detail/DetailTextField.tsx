export function DetailTextField({
  label,
  icon,
  value,
  onChange,
  placeholder,
  error,
}: {
  label: string;
  icon: React.ReactNode;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
}) {
  return (
    <div>
      <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-600">
        {icon}
        {label}
      </label>

      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 font-medium outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10"
      />

      {error && <p className="mt-2 text-xs font-medium text-red-500">{error}</p>}
    </div>
  );
}