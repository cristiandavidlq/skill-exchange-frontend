"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardInicioPage() {
  const [usuario, setUsuario] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      router.push("/login");
      return;
    }

    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const payload = JSON.parse(window.atob(base64));

      setUsuario({
        nombre: payload.nombre || "Usuario",
        email: payload.email || localStorage.getItem("userEmail"),
      });
    } catch (error) {
      console.error("Error al leer los datos del token:", error);
      router.push("/login");
    }
  }, [router]);

  if (!usuario) {
    return <div className="p-10 text-center">Cargando perfil...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        Bienvenido, {usuario.nombre.split(" ")[0]}
      </h1>
      <div className="border border-blue-200 bg-blue-50 p-6 rounded-xl shadow-sm max-w-md">
        <p className="mb-2">
          <span className="font-bold">Nombre: </span>
          {usuario.nombre}
        </p>
        <p>
          <span className="font-bold">Email: </span>
          {usuario.email}
        </p>
      </div>

      <button
        onClick={() => {
          localStorage.clear();
          router.push("/login");
        }}
        className="mt-6 text-red-600 underline text-sm"
      >
        Cerrar sesión
      </button>
    </div>
  );
}
