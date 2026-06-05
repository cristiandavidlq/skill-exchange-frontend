import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({
  count,
  page,
  pageSize = 10,
  onPageChange,
}) {
  const totalPages = Math.ceil(count / pageSize) || 1;

  if (totalPages <= 1) return null; // No se muestra si solo hay 1 página

  return (
    <div className="flex items-center justify-between border-t border-slate-100 bg-white px-4 py-3 sm:px-6 mt-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <Button
          variant="outline"
          disabled={page === 1}
          onClick={() => onPageChange(page - 1)}
          className="text-xs"
        >
          Anterior
        </Button>
        <Button
          variant="outline"
          disabled={page === totalPages}
          onClick={() => onPageChange(page + 1)}
          className="text-xs"
        >
          Siguiente
        </Button>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-xs text-slate-500">
            Mostrando resultados del{" "}
            <span className="font-semibold text-slate-800">
              {(page - 1) * pageSize + 1}
            </span>{" "}
            al{" "}
            <span className="font-semibold text-slate-800">
              {Math.min(page * pageSize, count)}
            </span>{" "}
            de <span className="font-semibold text-slate-800">{count}</span>{" "}
            totales
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            disabled={page === 1}
            onClick={() => onPageChange(page - 1)}
            className="h-8 w-8 rounded-lg border-slate-200"
          >
            <ChevronLeft className="h-4 w-4 text-slate-600" />
          </Button>
          <span className="text-xs font-semibold text-slate-700 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
            Página {page} de {totalPages}
          </span>
          <Button
            variant="outline"
            size="icon"
            disabled={page === totalPages}
            onClick={() => onPageChange(page + 1)}
            className="h-8 w-8 rounded-lg border-slate-200"
          >
            <ChevronRight className="h-4 w-4 text-slate-600" />
          </Button>
        </div>
      </div>
    </div>
  );
}
