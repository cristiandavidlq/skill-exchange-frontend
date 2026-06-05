"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import {
  BookOpen,
  Users,
  Trophy,
  LogOut,
  Menu,
  X,
  LayoutDashboard,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();

  const [isAuthorized, setIsAuthorized] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // 1. Protección de ruta mediante Token JWT (Unificado a 'access_token')
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      router.replace("/login");
    } else {
      setIsAuthorized(true);
    }
  }, [router]);

  // Cierre de sesión (Unificado a 'access_token')
  const handleLogout = () => {
    localStorage.removeItem("access_token");
    router.replace("/login");
  };

  // Enlaces de navegación de la plataforma
  const navigationLinks = [
    { name: "Inicio", href: "/dashboard", icon: LayoutDashboard },
    { name: "Skills", href: "/dashboard/skills", icon: BookOpen },
    { name: "Usuarios", href: "/dashboard/users", icon: Users },
    { name: "Metas", href: "/dashboard/metas", icon: Trophy },
  ];

  // Cerrar el menú mobile automáticamente cuando se cambia de página
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  if (!isAuthorized) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen space-y-3 bg-slate-50">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        <p className="text-xs font-medium text-slate-500">
          Verificando credenciales JWT...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col font-sans antialiased">
      {/* Navbar Principal */}
      <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
              SE
            </div>
            <span className="font-bold text-slate-900 text-sm tracking-tight hidden sm:block">
              Skills Exchange
            </span>
          </div>

          {/* Navegación Desktop */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigationLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                    isActive
                      ? "bg-blue-50 text-blue-600"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Botón Logout  */}
          <div className="hidden md:flex items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="text-xs font-semibold text-red-600 hover:bg-red-50 hover:text-red-700 h-9 gap-1.5"
            >
              <LogOut className="h-3.5 w-3.5" />
              Salir
            </Button>
          </div>

          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="inline-flex items-center justify-center rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700 focus:outline-none"
            >
              <span className="sr-only">Abrir menú</span>
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Menú Desplegable */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-16 z-30 bg-white border-b border-slate-200 shadow-lg">
          <div className="space-y-1 px-4 py-3 bg-white">
            {navigationLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-blue-50 text-blue-600"
                      : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {link.name}
                </Link>
              );
            })}
            <hr className="my-2 border-slate-100" />
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 text-left"
            >
              <LogOut className="h-4 w-4" />
              Cerrar sesión
            </button>
          </div>
        </div>
      )}

      <main className="flex-1">{children}</main>
    </div>
  );
}
