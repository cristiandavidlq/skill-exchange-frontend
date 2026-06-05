"use client";

import Link from "next/link";

export default function SkillCard({ skill }) {
  if (!skill) return null;

  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4">
      <div className="space-y-2 text-left">
        <div className="flex items-center justify-between">
          <span className="px-2 py-0.5 text-[10px] font-bold text-blue-600 bg-blue-50 border border-blue-100 rounded-md uppercase tracking-wide">
            {skill.category}
          </span>
          <span className="px-2 py-0.5 text-[10px] font-semibold text-slate-500 bg-slate-50 border border-slate-100 rounded-full">
            {skill.level}
          </span>
        </div>

        <h3 className="text-sm font-bold text-slate-800 line-clamp-1">
          {skill.name}
        </h3>

        <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
          {skill.description || "Sin descripción disponible."}
        </p>
      </div>

      <div className="pt-2 border-t border-slate-50 flex items-center justify-between">
        <span className="text-[10px] text-slate-400 font-medium">
          ID: #{skill.id}
        </span>
        <Link
          href={`/dashboard/skills/${skill.id}`}
          className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors"
        >
          Ver Ficha Técnica →
        </Link>
      </div>
    </div>
  );
}
