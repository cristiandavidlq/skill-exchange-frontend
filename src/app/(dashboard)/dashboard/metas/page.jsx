"use client";

import { useEffect, useState } from "react";
import { Trophy, Calendar, Loader2 } from "lucide-react";
import { cargarDatos, api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import Pagination from "@/components/ui/Pagination"; // Importamos el componente reutilizable

export default function MetasPage() {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Estados para controlar la paginación de la API
  const [paginaActual, setPaginaActual] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const pageSize = 6; // Ajusta según el backend

  async function fetchGoals(page = 1) {
    try {
      setLoading(true);
      // Pasamos la página actual por Query Params a la API
      const data = await cargarDatos(`/goals/?page=${page}`);

      if (data && data.results) {
        setGoals(data.results);
        setTotalCount(data.count);
      } else {
        setGoals(data || []);
        setTotalCount(data?.length || 0);
      }
    } catch (err) {
      setError("Error al conectar con el servidor de Metas.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchGoals(paginaActual);
  }, [paginaActual]);

  const handleAchieve = async (goalId) => {
    const updatedGoals = goals.map((goal) => {
      if (goal.id === goalId) {
        const current = Number(goal.current) || 0;
        const total = Number(goal.total) || 1;
        const newCurrent = Math.min(current + 1, total);
        return {
          ...goal,
          current: newCurrent,
          is_completed: newCurrent >= total,
        };
      }
      return goal;
    });
    setGoals(updatedGoals);

    try {
      await api.post(`/goals/${goalId}/achieve/`);
    } catch (err) {
      console.warn("Error silencioso en la API:", err);
    }
  };

  return (
    <div className="space-y-6 p-6 max-w-7xl mx-auto text-left">
      <div className="flex items-center justify-between border-b border-slate-100 pb-5">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Metas de Aprendizaje
          </h1>
          <p className="text-sm text-slate-500">
            Establece objetivos de estudio y mide tu progreso.
          </p>
        </div>
        <Trophy className="h-5 w-5 text-blue-600" />
      </div>

      {loading && (
        <div className="text-center py-10">
          <Loader2 className="animate-spin h-6 w-6 mx-auto text-blue-600" />
        </div>
      )}
      {error && <div className="text-red-500 text-sm">{error}</div>}

      {!loading && !error && (
        <>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {goals.map((goal) => {
              const current = Number(goal.current) || 0;
              const total = Number(goal.total) || 1;
              const percentage = Math.min(
                Math.round((current / total) * 100),
                100,
              );
              const isReached = goal.is_completed || percentage >= 100;

              return (
                <div
                  key={goal.id}
                  className="rounded-xl border border-slate-200 bg-white p-5 space-y-4 shadow-sm"
                >
                  <div className="flex items-start justify-between">
                    <h3 className="font-semibold text-slate-800">
                      {goal.title}
                    </h3>
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium border ${
                        isReached
                          ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                          : "bg-amber-50 text-amber-700 border-amber-100"
                      }`}
                    >
                      {isReached ? "Alcanzada" : "En progreso"}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">
                    Skill:{" "}
                    <span className="text-slate-800 font-semibold">
                      {goal.skill_name || "General"}
                    </span>
                  </p>

                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-semibold text-slate-600">
                      <span>Progreso</span>
                      <span>
                        {current} / {total} ({percentage}%)
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                      <div
                        className="h-2 rounded-full bg-emerald-600"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-50">
                    <div className="flex items-center gap-1 text-xs text-slate-400">
                      <Calendar className="h-3.5 w-3.5" />
                      <span>Límite: {goal.deadline || "Sin límite"}</span>
                    </div>
                    <Button
                      size="sm"
                      disabled={isReached}
                      onClick={() => handleAchieve(goal.id)}
                      className={`h-7 px-3 text-xs font-semibold rounded-lg ${isReached ? "bg-slate-100 text-slate-400" : "bg-blue-600 text-white"}`}
                    >
                      {isReached ? "Completada" : "Alcanzar"}
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>

          <Pagination
            count={totalCount}
            page={paginaActual}
            pageSize={pageSize}
            onPageChange={(nuevaPagina) => setPaginaActual(nuevaPagina)}
          />
        </>
      )}
    </div>
  );
}
