"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2, AlertCircle } from "lucide-react";
import { skillService } from "../../../../../lib/skillService";

export default function DetalleSkillPage({ params: paramsPromise }) {
  const params = use(paramsPromise);
  const router = useRouter();
  const { id } = params;

  const [skill, setSkill] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    skillService
      .getSkillById(id)
      .then(setSkill)
      .catch(() => setError("No se pudo cargar la información detallada."))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="p-8 flex flex-col items-center justify-center min-h-[40vh] space-y-2">
        <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
        <span className="text-xs text-slate-400">
          Consultando ficha técnica...
        </span>
      </div>
    );
  }

  if (error || !skill) {
    return (
      <div className="p-8 max-w-2xl mx-auto space-y-4">
        <button
          onClick={() => router.push("/dashboard/skills")}
          className="flex items-center space-x-1.5 text-xs text-slate-500"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> <span>Volver a Skills</span>
        </button>
        <div className="flex items-center space-x-2 p-4 text-xs text-red-700 bg-red-50 border border-red-100 rounded-xl">
          <AlertCircle className="w-4 h-4 text-red-600" />{" "}
          <span>{error || "Habilidad no encontrada."}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6 bg-white min-h-screen text-left">
      <h1 className="text-xl font-bold tracking-tight text-slate-900 uppercase">
        5. FICHA TÉCNICA
      </h1>

      <button
        onClick={() => router.push("/dashboard/skills")}
        className="flex items-center space-x-1.5 text-xs font-medium text-blue-600"
      >
        <ArrowLeft className="w-3.5 h-3.5" /> <span>Volver a Skills</span>
      </button>

      <div className="max-w-2xl bg-white border border-slate-100 rounded-2xl p-6 shadow-sm space-y-6">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-slate-900">{skill.name}</h2>
            <p className="text-xs font-medium text-blue-500 uppercase tracking-wider">
              {skill.category}
            </p>
          </div>
          <span className="px-2.5 py-0.5 text-xs font-semibold text-green-600 bg-green-50 border border-green-100 rounded-full">
            {skill.level}
          </span>
        </div>

        <div className="text-xs leading-relaxed text-slate-600 border-b border-slate-50 pb-6">
          {skill.description}
        </div>

        <div className="grid grid-cols-3 gap-6 pt-2">
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-semibold">
              ID
            </span>
            <p className="text-xs font-bold text-slate-800">#{skill.id}</p>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-semibold">
              Categoría
            </span>
            <p className="text-xs font-bold text-slate-800">{skill.category}</p>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-semibold">
              Nivel
            </span>
            <p className="text-xs font-bold text-slate-800">{skill.level}</p>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-semibold">
              Creada
            </span>
            <p className="text-xs text-slate-600">{skill.createdAt}</p>
          </div>
          <div className="col-span-2">
            <span className="text-[10px] text-slate-400 uppercase font-semibold">
              Actualizada
            </span>
            <p className="text-xs text-slate-600">{skill.updatedAt}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
