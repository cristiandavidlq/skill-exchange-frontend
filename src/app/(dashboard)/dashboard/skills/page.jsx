"use client";

import { useState, useEffect } from "react";
import { cargarDatos } from "../../../../lib/api";

// Componentes de Skills (4 niveles - Correcto)
import SkillCard from "../../../../components/skills/SkillCard";
import CategoryFilter from "../../../../components/skills/CategoryFilter";
import OrderSelector from "../../../../components/skills/OrderSelector";

// Componentes UI (4 niveles - Correcto)
import Pagination from "../../../../components/ui/Pagination";
import LoadingState from "../../../../components/ui/LoadingState";
import ErrorMessage from "../../../../components/ui/ErrorMessage";
import EmptyState from "../../../../components/ui/EmptyState";

export default function SkillsPage() {
  const [skills, setSkills] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Estados de filtros basados en tu tabla oficial
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState("");
  const [level, setLevel] = useState("");
  const [ordering, setOrdering] = useState("");
  const [search, setSearch] = useState("");

  const PAGE_SIZE = 10;

  useEffect(() => {
    const fetchAPI = async () => {
      setLoading(true);
      setError(null);
      try {
        const filtros = {
          page,
          ...(category && { category }),
          ...(level && { level }),
          ...(ordering && { ordering }),
          ...(search && { search }),
        };

        const data = await cargarDatos("/skills/", filtros);
        setSkills(data.results || []);
        setCount(data.count || 0);
      } catch (err) {
        setError("Error al conectar con el servidor de Skills.");
      } finally {
        setLoading(false);
      }
    };

    fetchAPI();
  }, [page, category, level, ordering, search]);

  if (loading) return <LoadingState />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <input
          type="text"
          placeholder="Buscar por nombre o descripción..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="border border-slate-200 rounded-lg px-3 py-2 text-xs w-full md:max-w-xs"
        />
        <OrderSelector
          value={ordering}
          onChange={(val) => {
            setOrdering(val);
            setPage(1);
          }}
        />
      </div>

      <CategoryFilter
        active={category}
        onChange={(cat) => {
          setCategory(cat);
          setPage(1);
        }}
      />

      {skills.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {skills.map((skill) => (
            <SkillCard key={skill.id} skill={skill} />
          ))}
        </div>
      )}

      <Pagination
        count={count}
        page={page}
        pageSize={PAGE_SIZE}
        onPageChange={setPage}
      />
    </div>
  );
}
