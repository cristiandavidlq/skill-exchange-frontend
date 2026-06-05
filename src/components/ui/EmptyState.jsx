"use client";
import { Inbox } from "lucide-react";

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center border border-dashed border-slate-200 rounded-2xl bg-slate-50/50 max-w-md mx-auto my-6">
      <Inbox className="w-8 h-8 text-slate-300 mb-2" />
      <h3 className="text-xs font-semibold text-slate-700">
        No se encontraron resultados
      </h3>
      <p className="text-[11px] text-slate-400 mt-1">
        Prueba cambiando los criterios de búsqueda o limpiando los filtros
        actuales.
      </p>
    </div>
  );
}
