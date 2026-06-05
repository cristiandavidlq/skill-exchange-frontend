"use client";

export default function OrderSelector({ value, onChange }) {
  return (
    <div className="flex items-center space-x-2">
      <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider whitespace-nowrap">
        Ordenar por:
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-white border border-slate-200 text-xs rounded-lg px-2.5 py-2 font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
      >
        <option value="">Por defecto</option>
        <option value="name">Nombre (A-Z)</option>
        <option value="-name">Nombre (Z-A)</option>
        <option value="created_at">Más antiguos</option>
        <option value="-created_at">Más recientes</option>
      </select>
    </div>
  );
}
