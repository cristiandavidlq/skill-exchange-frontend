"use client";

import Link from "next/link";
import { Layers, BookOpen, Users, ArrowRight } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans antialiased flex flex-col justify-between text-left">
      {/* 1. NAVBAR DE LA LANDING */}
      <header className="border-b border-slate-100 bg-white sticky top-0 z-50">
        <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-xs">
              SE
            </div>
            <span className="font-bold text-slate-900 text-sm tracking-tight">
              Skill Exchange
            </span>
          </div>

          <Link href="/login">
            <button className="bg-slate-950 text-white text-xs font-semibold px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors">
              Iniciar sesión
            </button>
          </Link>
        </div>
      </header>

      {/* 2. HERO SECTION */}
      <main className="flex-1 flex flex-col justify-center items-center px-6 py-20 text-center max-w-4xl mx-auto space-y-8">
        {/* Badge superior */}
        <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-[11px] font-semibold text-blue-600 border border-blue-100">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-pulse" />
          Plataforma académica · Open API
        </span>

        {/* Título Principal */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-[1.15]">
          Descubre y comparte <br />
          <span className="underline decoration-blue-600 decoration-4 underline-offset-4">
            habilidades
          </span>
        </h1>

        {/* Descripción de la plataforma */}
        <p className="text-slate-500 text-sm sm:text-base max-w-xl mx-auto font-normal leading-relaxed">
          Skills Exchange es la plataforma donde el conocimiento se convierte en
          conexión. Explora cientos de habilidades, filtra por categoría y
          encuentra lo que necesitas.
        </p>

        {/* Botones de acción */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link href="/login">
            <button className="bg-slate-950 text-white text-xs font-semibold h-10 px-5 rounded-lg flex items-center gap-2 hover:bg-slate-800 transition-all shadow-sm">
              Empezar ahora
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </Link>

          <Link href="/login">
            <button className="bg-white text-slate-700 border border-slate-200 text-xs font-semibold h-10 px-5 rounded-lg hover:bg-slate-50 transition-all">
              Ver skills
            </button>
          </Link>
        </div>
      </main>

      {/* 3. CARACTERÍSTICAS (SECCIÓN INFERIOR) */}
      <section className="bg-slate-50/50 border-t border-slate-100 py-16">
        <div className="mx-auto max-w-7xl px-6 space-y-10">
          <h2 className="text-center text-xs font-bold uppercase tracking-widest text-slate-400">
            Todo lo que necesitas en un solo lugar
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="bg-white border border-slate-200 p-6 rounded-xl space-y-3 shadow-sm">
              <div className="p-2 w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                <Layers className="h-4 w-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">
                Categorías organizadas
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Técnicas, creativas de comunicación y más. Filtra
                instantáneamente lo que buscas.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white border border-slate-200 p-6 rounded-xl space-y-3 shadow-sm">
              <div className="p-2 w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                <BookOpen className="h-4 w-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">
                Detalle de cada skill
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Nivel, descripción, tags y objetivos claros para guiar tu
                aprendizaje efectivo.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white border border-slate-200 p-6 rounded-xl space-y-3 shadow-sm">
              <div className="p-2 w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                <Users className="h-4 w-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">
                Comunidad activa
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Explora los perfiles de otros usuarios, conecta y comparte tus
                conocimientos técnicos.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
