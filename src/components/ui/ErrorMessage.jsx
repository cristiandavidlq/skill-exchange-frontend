"use client";
import { AlertCircle } from "lucide-react";

export default function ErrorMessage({ message }) {
  return (
    <div className="flex items-center space-x-2 p-4 text-xs text-red-700 bg-red-50 border border-red-100 rounded-xl max-w-2xl mx-auto my-4">
      <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
      <span>{message || "Ha ocurrido un error al procesar la solicitud."}</span>
    </div>
  );
}
