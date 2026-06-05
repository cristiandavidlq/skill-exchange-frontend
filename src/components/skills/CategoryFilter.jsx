"use client";

const CATEGORIES = [
  { id: "technical", label: "Technical" },
  { id: "creative", label: "Creative" },
  { id: "communication", label: "Communication" },
  { id: "leadership", label: "Leadership" },
  { id: "business", label: "Business" },
  { id: "personal_development", label: "Personal Dev." },
  { id: "other", label: "Other" },
];

export default function CategoryFilter({ active, onChange }) {
  return (
    <div className="flex flex-wrap gap-1.5 items-center">
      <button
        onClick={() => onChange("")}
        className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors border ${
          !active
            ? "bg-slate-900 text-white border-slate-900"
            : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
        }`}
      >
        Todos
      </button>
      {CATEGORIES.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onChange(cat.id)}
          className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors border ${
            active === cat.id
              ? "bg-blue-600 text-white border-blue-600"
              : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
          }`}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}
