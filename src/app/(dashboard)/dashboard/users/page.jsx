"use client";

import { useState, useEffect } from "react";
import { Search, Loader2, AlertCircle } from "lucide-react";
import { userService } from "@/lib/userService";
import Pagination from "@/components/ui/Pagination"; // Importamos el componente reutilizable

export default function UsuariosPage() {
  const [usuarios, setUsuarios] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [loading, setLoading] = useState(true);
  const [errorApi, setErrorApi] = useState(null);

  const [paginaActual, setPaginaActual] = useState(1);
  const usuariosPorPagina = 7;

  useEffect(() => {
    userService
      .getUsers()
      .then(setUsuarios)
      .catch((error) =>
        setErrorApi(error.message || "Error al conectar con el servidor."),
      )
      .finally(() => setLoading(false));
  }, []);

  const usuariosFiltrados = usuarios.filter(
    (u) =>
      u.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      u.email.toLowerCase().includes(busqueda.toLowerCase()),
  );

  const usuariosPaginaActual = usuariosFiltrados.slice(
    (paginaActual - 1) * usuariosPorPagina,
    paginaActual * usuariosPorPagina,
  );

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6 bg-white min-h-screen text-left">
      <h1 className="text-xl font-bold tracking-tight text-slate-900">
        Usuarios
      </h1>

      <div className="relative max-w-xs">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <input
          type="text"
          placeholder="Buscar por nombre o email..."
          value={busqueda}
          onChange={(e) => {
            setBusqueda(e.target.value);
            setPaginaActual(1);
          }}
          disabled={loading || errorApi}
          className="w-full pl-9 pr-4 py-1.5 text-xs bg-white border border-slate-200 rounded-lg text-slate-900 focus:outline-none"
        />
      </div>

      {errorApi ? (
        <div className="flex items-center space-x-2 p-4 text-sm text-red-700 bg-red-50 border border-red-100 rounded-xl">
          <AlertCircle className="w-4 h-4 text-red-600" />{" "}
          <span>{errorApi}</span>
        </div>
      ) : (
        <div className="bg-white border border-slate-100 rounded-xl overflow-hidden shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F8FAFC] border-b border-slate-100">
                <th className="p-3 text-xs font-semibold text-slate-500">
                  Usuario
                </th>
                <th className="p-3 text-xs font-semibold text-slate-500">
                  Email
                </th>
                <th className="p-3 text-xs font-semibold text-slate-500">
                  Fecha de Ingreso
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading ? (
                <tr>
                  <td
                    colSpan="3"
                    className="p-12 text-center text-xs text-slate-400"
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                      <span>
                        Consultando API de estudiantes en tiempo real...
                      </span>
                    </div>
                  </td>
                </tr>
              ) : usuariosFiltrados.length === 0 ? (
                <tr>
                  <td
                    colSpan="3"
                    className="p-8 text-center text-xs text-slate-400"
                  >
                    No hay registros.
                  </td>
                </tr>
              ) : (
                usuariosPaginaActual.map((user) => (
                  <tr
                    key={user.id}
                    className="hover:bg-slate-50/50 transition-colors"
                  >
                    <td className="p-3 flex items-center space-x-3">
                      <div className="w-7 h-7 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-[10px] font-bold">
                        {user.iniciales}
                      </div>
                      <span className="text-xs font-semibold text-slate-800">
                        {user.nombre}
                      </span>
                    </td>
                    <td className="p-3 text-xs text-blue-600">{user.email}</td>
                    <td className="p-3 text-xs text-slate-500">
                      {user.fechaIngreso}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          <div className="bg-white border-t border-slate-100 p-2">
            <Pagination
              count={usuariosFiltrados.length}
              page={paginaActual}
              pageSize={usuariosPorPagina}
              onPageChange={(nuevaPagina) => setPaginaActual(nuevaPagina)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
