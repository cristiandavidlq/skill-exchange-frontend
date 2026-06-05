"use client";
import { Loader2 } from "lucide-react";

export default function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center p-12 min-h-[40vh] space-y-2">
      <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
      <span className="text-xs text-slate-400 font-medium">
        Cargando información...
      </span>
    </div>
  );
}
