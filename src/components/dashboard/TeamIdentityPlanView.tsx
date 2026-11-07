'use client';

import React, { useState } from 'react';
import {
  Award,
  Users,
  Target,
  Compass,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  ShieldCheck,
  Factory,
  DollarSign,
  Sparkles,
  ArrowRight,
  TrendingDown,
  Layers,
  BookOpen,
  HelpCircle,
  Clock,
  Briefcase
} from 'lucide-react';

interface TeamIdentityPlanViewProps {
  currency?: '$' | '€';
}

export const TeamIdentityPlanView: React.FC<TeamIdentityPlanViewProps> = ({ currency = '€' }) => {
  const [selectedMember, setSelectedMember] = useState<'all' | 'agata' | 'ingrid' | 'andrea'>('all');

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12 animate-fadeIn">
      {/* 1. Header / Torneo & Institución Oficial */}
      <section className="bg-white dark:bg-roura-navy rounded-2xl border border-roura-beige-dark dark:border-roura-navy-light shadow-sm overflow-hidden">
        <div className="bg-gradient-to-r from-roura-navy-dark via-roura-navy to-roura-navy-light p-6 sm:p-8 text-white relative">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="space-y-3 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur border border-white/20 text-xs font-mono uppercase tracking-wider text-roura-sky">
                <Award className="w-3.5 h-3.5 text-roura-sky" />
                <span>8vo. Torneo Internacional de Simulación de Negocios</span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-black tracking-tight text-white">
                ROURA 1940 <span className="text-roura-sky font-sans font-light">&bull;</span> Simulación Corbatul
              </h1>
              <p className="text-sm sm:text-base text-roura-sky-light/90 max-w-2xl font-sans">
                Acreditación Internacional <strong>ACBSP Global Business Accreditation</strong> & <strong>CompanyGame</strong>.
                Defensa de resultados y plan de actuación ejecutado por el equipo <strong>FINFORCE</strong>.
              </p>
            </div>

            {/* Badges / Logos de Torneo */}
            <div className="flex items-center gap-4 bg-white/95 p-3 rounded-xl shadow-lg border border-white/30 shrink-0">
              <img
                src="/images/banner_torneo_acbsp.jpeg"
                alt="Banner 8vo Torneo ACBSP CompanyGame"
                className="h-14 sm:h-16 w-auto object-contain rounded-md"
              />
              <div className="h-12 w-[1px] bg-slate-300" />
              <img
                src="/images/logo_acbsp_companygame_badges.jpeg"
                alt="Logo ACBSP y CompanyGame"
                className="h-14 sm:h-16 w-auto object-contain rounded-md"
              />
            </div>
          </div>
        </div>

        {/* Sub-bar institucional */}
        <div className="bg-roura-beige-light dark:bg-roura-navy-deep px-6 py-3 border-t border-roura-beige-dark dark:border-roura-navy-light/40 flex flex-wrap items-center justify-between gap-3 text-xs font-serif text-roura-navy/80 dark:text-roura-sky/80">
          <div className="flex items-center gap-2">
            <span className="font-bold text-roura-teal dark:text-roura-sky uppercase font-mono tracking-wider">Institución:</span>
            <span>Escuela Superior Politécnica de Chimborazo (ESPOCH) — FADE</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-roura-teal dark:text-roura-sky uppercase font-mono tracking-wider">Carrera:</span>
            <span>Finanzas</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-roura-teal dark:text-roura-sky uppercase font-mono tracking-wider">Equipo:</span>
            <span className="font-mono font-bold px-2 py-0.5 rounded bg-roura-teal text-white text-[11px]">FINFORCE</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-roura-teal dark:text-roura-sky uppercase font-mono tracking-wider">Convención:</span>
            <span className="font-mono font-semibold text-[11px] bg-roura-beige dark:bg-roura-navy px-2 py-0.5 rounded border border-roura-beige-deep dark:border-roura-navy-light">
              Moneda: {currency} (Euros • España)
            </span>
          </div>
        </div>
      </section>

      {/* 2. Presentación del Equipo & Foto Oficial (Clip 01) */}
      <section className="bg-white dark:bg-roura-navy rounded-2xl border border-roura-beige-dark dark:border-roura-navy-light shadow-sm p-6 sm:p-8">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-roura-beige-dark dark:border-roura-navy-light">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-roura-teal/15 dark:bg-roura-teal/30 text-roura-teal dark:text-roura-sky flex items-center justify-center font-bold">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-serif font-black text-roura-navy dark:text-white">
                  Equipo de Gestión Directiva: FINFORCE
                </h2>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-roura-teal text-white uppercase">
                  Clip 01
                </span>
              </div>
              <p className="text-xs text-roura-navy/60 dark:text-roura-sky/70 font-sans">
                Integrantes oficiales, filiación académica y distribución de roles para la grabación y defensa
              </p>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 bg-roura-beige-light dark:bg-roura-navy-dark p-1 rounded-lg border border-roura-beige-deep dark:border-roura-navy-light text-xs font-mono">
            <button
              onClick={() => setSelectedMember('all')}
              className={`px-2.5 py-1 rounded-md transition-all ${selectedMember === 'all' ? 'bg-roura-teal text-white font-bold' : 'text-roura-navy/70 dark:text-roura-sky hover:text-roura-teal'}`}
            >
              Todas
            </button>
            <button
              onClick={() => setSelectedMember('ingrid')}
              className={`px-2.5 py-1 rounded-md transition-all ${selectedMember === 'ingrid' ? 'bg-roura-teal text-white font-bold' : 'text-roura-navy/70 dark:text-roura-sky hover:text-roura-teal'}`}
            >
              Ingrid (01-04)
            </button>
            <button
              onClick={() => setSelectedMember('andrea')}
              className={`px-2.5 py-1 rounded-md transition-all ${selectedMember === 'andrea' ? 'bg-roura-teal text-white font-bold' : 'text-roura-navy/70 dark:text-roura-sky hover:text-roura-teal'}`}
            >
              Andrea (05-08)
            </button>
            <button
              onClick={() => setSelectedMember('agata')}
              className={`px-2.5 py-1 rounded-md transition-all ${selectedMember === 'agata' ? 'bg-roura-teal text-white font-bold' : 'text-roura-navy/70 dark:text-roura-sky hover:text-roura-teal'}`}
            >
              Ágata (09-12)
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Foto Oficial del Equipo en HD */}
          <div className="lg:col-span-7">
            <div className="relative group overflow-hidden rounded-xl border-2 border-roura-beige-deep dark:border-roura-navy-light shadow-md bg-roura-navy-deep">
              <img
                src="/images/team_finforce.jpeg"
                alt="Equipo FINFORCE - ESPOCH FADE Finanzas"
                className="w-full h-auto object-cover transform transition-transform duration-500 hover:scale-[1.01]"
              />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-roura-navy-deep/95 via-roura-navy-deep/80 to-transparent p-4 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-mono uppercase tracking-widest text-roura-sky font-bold">Equipo FINFORCE &bull; Carrera de Finanzas</p>
                    <p className="text-sm font-serif font-bold text-white">Escuela Superior Politécnica de Chimborazo (ESPOCH)</p>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-1 rounded bg-roura-teal text-white uppercase font-bold tracking-wider">
                    Certificación ACBSP
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Tarjetas de Presentación de las 3 Integrantes */}
          <div className="lg:col-span-5 space-y-3.5">
            {/* 1. Líder: Ágata Pazmiño */}
            <div
              className={`p-4 rounded-xl border transition-all duration-300 relative overflow-hidden ${
                selectedMember === 'agata' || selectedMember === 'all'
                  ? 'bg-roura-beige-light dark:bg-roura-navy-dark border-roura-teal/70 shadow-sm ring-1 ring-roura-teal/30'
                  : 'bg-white/50 dark:bg-roura-navy/50 border-roura-beige-dark dark:border-roura-navy-light opacity-60'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-roura-teal" />
                  <h3 className="font-serif font-black text-base text-roura-navy dark:text-white">
                    Àgata Elisabeth Pazmiño Andrades
                  </h3>
                </div>
                <span className="inline-block px-2.5 py-0.5 bg-roura-teal text-white font-mono text-[10px] uppercase font-bold tracking-wider rounded-md">
                  Líder de Equipo
                </span>
              </div>
              <p className="text-xs font-mono text-roura-teal dark:text-roura-sky font-semibold mb-2">
                Clips 09 a 12: Balance, Alcance Productivo, Metodología (5/5), Lecciones (10/10) & Cierre
              </p>
              <p className="text-xs text-roura-navy/70 dark:text-roura-sky/80 font-sans leading-relaxed">
                Dirección financiera del proyecto. Conduce la explicación del balance de situación, el crédito extraordinario, la expansión fabril en bufandas y las conclusiones metodológicas.
              </p>
            </div>

            {/* 2. Ingrid Correa */}
            <div
              className={`p-4 rounded-xl border transition-all duration-300 relative overflow-hidden ${
                selectedMember === 'ingrid' || selectedMember === 'all'
                  ? 'bg-roura-beige-light dark:bg-roura-navy-dark border-roura-teal/70 shadow-sm ring-1 ring-roura-teal/30'
                  : 'bg-white/50 dark:bg-roura-navy/50 border-roura-beige-dark dark:border-roura-navy-light opacity-60'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-roura-teal" />
                  <h3 className="font-serif font-black text-base text-roura-navy dark:text-white">
                    Ingrid Daniela Correa Jiménez
                  </h3>
                </div>
                <span className="text-[10px] font-mono font-bold text-roura-teal dark:text-roura-sky px-2 py-0.5 rounded bg-roura-beige dark:bg-roura-navy border border-roura-beige-deep dark:border-roura-navy-light">
                  Presentadora
                </span>
              </div>
              <p className="text-xs font-mono text-roura-teal dark:text-roura-sky font-semibold mb-2">
                Clips 01 a 04: Presentación, Diagnóstico Inicial (2025), Plan de Actuación & Evolución Global
              </p>
              <p className="text-xs text-roura-navy/70 dark:text-roura-sky/80 font-sans leading-relaxed">
                Apertura oficial del informe. Presenta la fotografía del punto de partida, las directrices del plan y la trayectoria del valor de la empresa (+23,6% vs. 2025).
              </p>
            </div>

            {/* 3. Andrea Quispillo */}
            <div
              className={`p-4 rounded-xl border transition-all duration-300 relative overflow-hidden ${
                selectedMember === 'andrea' || selectedMember === 'all'
                  ? 'bg-roura-beige-light dark:bg-roura-navy-dark border-roura-teal/70 shadow-sm ring-1 ring-roura-teal/30'
                  : 'bg-white/50 dark:bg-roura-navy/50 border-roura-beige-dark dark:border-roura-navy-light opacity-60'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-roura-teal" />
                  <h3 className="font-serif font-black text-base text-roura-navy dark:text-white">
                    Andrea Mishell Quispillo Becerra
                  </h3>
                </div>
                <span className="text-[10px] font-mono font-bold text-roura-teal dark:text-roura-sky px-2 py-0.5 rounded bg-roura-beige dark:bg-roura-navy border border-roura-beige-deep dark:border-roura-navy-light">
                  Presentadora
                </span>
              </div>
              <p className="text-xs font-mono text-roura-teal dark:text-roura-sky font-semibold mb-2">
                Clips 05 a 08: Visión Competitiva, Metas Alcanzadas/Pendientes, P&L Causal & Balance
              </p>
              <p className="text-xs text-roura-navy/70 dark:text-roura-sky/80 font-sans leading-relaxed">
                Análisis competitivo y de ventas. Explica la cuota de mercado, las metas superadas vs pendientes, el puente operativo de utilidades y la composición de los ingresos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Punto de Partida: Comparativo 2024 → 2025 (Clip 02) */}
      <section className="bg-white dark:bg-roura-navy rounded-2xl border border-roura-beige-dark dark:border-roura-navy-light shadow-sm p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-roura-beige-dark dark:border-roura-navy-light">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-roura-navy/10 dark:bg-roura-sky/20 text-roura-navy dark:text-white flex items-center justify-center font-bold">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-serif font-black text-roura-navy dark:text-white">
                  Punto de Partida: Balance & Valores Históricos de 2025
                </h2>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-roura-teal text-white uppercase">
                  Clip 02
                </span>
              </div>
              <p className="text-xs text-roura-navy/60 dark:text-roura-sky/70 font-sans">
                Comparativo oficial 2024 → 2025: Mayor facturación pero menor retención de margen y ampliación de pérdida operativa
              </p>
            </div>
          </div>
          <span className="font-mono text-xs px-3 py-1.5 rounded-lg bg-roura-beige dark:bg-roura-navy-dark border border-roura-beige-deep dark:border-roura-navy-light font-bold text-roura-navy dark:text-roura-sky self-start sm:self-auto">
            Base Inicial Auditada: 2025
          </span>
        </div>

        {/* Tarjetas Comparativas 2024 -> 2025 requeridas por el guion */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* 1. Ingresos */}
          <div className="p-4 rounded-xl bg-roura-beige-light dark:bg-roura-navy-dark border border-roura-beige-deep dark:border-roura-navy-light">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-roura-navy/60 dark:text-roura-sky/70 font-bold">
                Ingresos Totales
              </span>
              <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-tweed/10 text-tweed">
                +2,2%
              </span>
            </div>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-xs font-mono text-roura-navy/50 dark:text-roura-sky/60 line-through">
                {currency}3.274.513
              </span>
              <span className="text-xs text-roura-teal font-bold">&rarr;</span>
              <span className="text-lg font-serif font-black text-roura-navy dark:text-white">
                {currency}3.346.747
              </span>
            </div>
            <p className="text-[11px] text-roura-navy/70 dark:text-roura-sky/80 mt-1.5 font-sans">
              La empresa facturó más que en 2024, pero con menor rendimiento unitario.
            </p>
          </div>

          {/* 2. Margen Bruto */}
          <div className="p-4 rounded-xl bg-roura-beige-light dark:bg-roura-navy-dark border border-roura-beige-deep dark:border-roura-navy-light">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-roura-navy/60 dark:text-roura-sky/70 font-bold">
                Margen Bruto
              </span>
              <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-rust/10 text-rust">
                -2,5 p.p.
              </span>
            </div>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-xs font-mono text-roura-navy/50 dark:text-roura-sky/60">
                35,0%
              </span>
              <span className="text-xs text-rust font-bold">&rarr;</span>
              <span className="text-lg font-serif font-black text-rust">
                32,5%
              </span>
              <span className="text-xs font-mono text-roura-navy/60 dark:text-roura-sky/70">
                ({currency}1.088.267)
              </span>
            </div>
            <p className="text-[11px] text-roura-navy/70 dark:text-roura-sky/80 mt-1.5 font-sans">
              Retuvo menos margen por cada dólar vendido debido al aumento de costes fabriles.
            </p>
          </div>

          {/* 3. Pérdida Operativa */}
          <div className="p-4 rounded-xl bg-roura-beige-light dark:bg-roura-navy-dark border border-roura-beige-deep dark:border-roura-navy-light">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-roura-navy/60 dark:text-roura-sky/70 font-bold">
                Resultado Bruto / Operativo
              </span>
              <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-rust/10 text-rust">
                Pérdida ampliada
              </span>
            </div>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-xs font-mono text-roura-navy/50 dark:text-roura-sky/60">
                -{currency}134.174
              </span>
              <span className="text-xs text-rust font-bold">&rarr;</span>
              <span className="text-lg font-serif font-black text-rust">
                -{currency}186.798
              </span>
            </div>
            <p className="text-[11px] text-roura-navy/70 dark:text-roura-sky/80 mt-1.5 font-sans">
              La actividad operativa arrojaba pérdidas crecientes antes de la intervención.
            </p>
          </div>

          {/* 4. Efectivo en Caja & Liquidez */}
          <div className="p-4 rounded-xl bg-roura-beige-light dark:bg-roura-navy-dark border border-roura-beige-deep dark:border-roura-navy-light">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-roura-navy/60 dark:text-roura-sky/70 font-bold">
                Efectivo en Caja (2025)
              </span>
              <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-tweed/10 text-tweed">
                Holgura
              </span>
            </div>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-lg font-serif font-black text-tweed">
                {currency}1.916.796
              </span>
              <span className="text-xs font-mono text-roura-teal dark:text-roura-sky font-semibold">
                (495,1% Liq.)
              </span>
            </div>
            <p className="text-[11px] text-roura-navy/70 dark:text-roura-sky/80 mt-1.5 font-sans">
              Casi dos millones en efectivo: capital ocioso disponible para financiar el turnaround.
            </p>
          </div>
        </div>

        {/* Detalle complementario: Resultado Neto del informe y Diagnóstico DAFO */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-sans">
          <div className="p-3.5 rounded-xl bg-roura-beige/60 dark:bg-roura-navy-deep border border-roura-beige-deep dark:border-roura-navy-light/40">
            <span className="text-[10px] font-mono uppercase text-roura-navy/60 dark:text-roura-sky/70 font-bold block mb-1">
              Resultado Neto 2025 (Convención Informe)
            </span>
            <div className="text-base font-serif font-black text-rust">
              -{currency}105.110
            </div>
            <span className="text-[10px] text-roura-navy/50 dark:text-roura-sky/60 font-mono block mt-0.5">
              (ROE inicial: -2,6% &bull; Valor de compañía: 2.329,3 pts)
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-rust/5 border border-rust/20 flex gap-2.5">
            <AlertTriangle className="w-4 h-4 text-rust shrink-0 mt-0.5" />
            <div>
              <strong className="text-rust font-serif block text-xs">
                Ineficiencia Crítica en Calcetines (-53,31%)
              </strong>
              <p className="text-[11px] text-roura-navy/80 dark:text-roura-beige-light leading-relaxed mt-0.5">
                Costos de fabricación desproporcionados frente a un precio de lista de {currency}2,65 que destruía valor en cada unidad vendida.
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-tweed/5 border border-tweed/20 flex gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-tweed shrink-0 mt-0.5" />
            <div>
              <strong className="text-tweed font-serif block text-xs">
                Estructura Financiera Sin Deuda Extraordinaria
              </strong>
              <p className="text-[11px] text-roura-navy/80 dark:text-roura-beige-light leading-relaxed mt-0.5">
                En 2025 no se requirió Crédito Extraordinario (evitando el 50% de tasa punitiva). Patrimonio neto financiaba el 68,5% del activo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Misión, Visión y las 3 Palancas Estratégicas (Clip 03) */}
      <section className="bg-white dark:bg-roura-navy rounded-2xl border border-roura-beige-dark dark:border-roura-navy-light shadow-sm p-6 sm:p-8">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-roura-beige-dark dark:border-roura-navy-light">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-roura-teal/15 dark:bg-roura-teal/30 text-roura-teal dark:text-roura-sky flex items-center justify-center font-bold">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-serif font-black text-roura-navy dark:text-white">
                  Identidad Corporativa, Horizonte Directivo & 3 Palancas
                </h2>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-roura-teal text-white uppercase">
                  Clip 03
                </span>
              </div>
              <p className="text-xs text-roura-navy/60 dark:text-roura-sky/70 font-sans">
                Propósito de gestión: Recuperar rentabilidad antes de crecer a través de tres palancas operativas
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Misión */}
          <div className="p-5 rounded-xl bg-roura-beige-light dark:bg-roura-navy-dark border border-roura-beige-deep dark:border-roura-navy-light">
            <span className="text-[10px] font-mono uppercase tracking-wider text-roura-teal dark:text-roura-sky font-bold block mb-2">
              Misión &bull; Propuesta de Valor Textil
            </span>
            <blockquote className="font-serif italic text-xs text-roura-navy/90 dark:text-roura-beige-light leading-relaxed border-l-2 border-roura-teal pl-3 py-0.5">
              «Confeccionar corbatas, bufandas y calcetines para hombre con diseño cuidado y calidad confiable a un precio justo, respaldados por más de 45 años de historia. No ser la opción más barata, sino dar el mayor valor por euro invertido: mejor diseño, materia prima de calidad y mayor presencia física y online.»
            </blockquote>
          </div>

          {/* Visión */}
          <div className="p-5 rounded-xl bg-roura-beige-light dark:bg-roura-navy-dark border border-roura-beige-deep dark:border-roura-navy-light">
            <span className="text-[10px] font-mono uppercase tracking-wider text-roura-teal dark:text-roura-sky font-bold block mb-2">
              Visión &bull; Propósito Estratégico de Gestión FINFORCE
            </span>
            <blockquote className="font-serif italic text-xs text-roura-navy/90 dark:text-roura-beige-light leading-relaxed border-l-2 border-roura-navy dark:border-roura-sky pl-3 py-0.5">
              «Recuperar la rentabilidad antes de buscar crecer. Durante los periodos de gestión, la empresa mantendrá precios cerca del mercado, bajará costos, saneará la línea de calcetines y cuidará la tesorería disponible para volver a generar excedentes operativos y maximizar el valor patrimonial.»
            </blockquote>
          </div>
        </div>

        {/* Las 3 Palancas Operativas Directas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-white dark:bg-roura-navy-deep border border-roura-beige-dark dark:border-roura-navy-light shadow-sm">
            <div className="flex items-center gap-2 mb-2 text-roura-teal dark:text-roura-sky">
              <DollarSign className="w-4 h-4" />
              <h4 className="font-serif font-black text-xs uppercase tracking-wider">Palanca 1: Precios</h4>
            </div>
            <p className="text-xs text-roura-navy/70 dark:text-roura-sky/80 leading-relaxed font-sans">
              Mantener precios competitivos en corbatas y bufandas, e implementar una subida disciplinada en calcetines ({currency}2,65 &rarr; {currency}2,99 &rarr; {currency}3,40 &rarr; {currency}3,50) para eliminar la pérdida operativa.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white dark:bg-roura-navy-deep border border-roura-beige-dark dark:border-roura-navy-light shadow-sm">
            <div className="flex items-center gap-2 mb-2 text-roura-teal dark:text-roura-sky">
              <Layers className="w-4 h-4" />
              <h4 className="font-serif font-black text-xs uppercase tracking-wider">Palanca 2: Costos</h4>
            </div>
            <p className="text-xs text-roura-navy/70 dark:text-roura-sky/80 leading-relaxed font-sans">
              Compras de materia prima a gran escala para capturar descuentos del 15% (compras superiores a 200k en corbatas y 25k en bufandas), reduciendo errores de calidad e inventarios ociosos.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white dark:bg-roura-navy-deep border border-roura-beige-dark dark:border-roura-navy-light shadow-sm">
            <div className="flex items-center gap-2 mb-2 text-roura-teal dark:text-roura-sky">
              <Factory className="w-4 h-4" />
              <h4 className="font-serif font-black text-xs uppercase tracking-wider">Palanca 3: Capacidad</h4>
            </div>
            <p className="text-xs text-roura-navy/70 dark:text-roura-sky/80 leading-relaxed font-sans">
              Elevar la ocupación fabril de telares por encima del 87% para diluir costes fijos de estructura, y ampliar selectivamente la capacidad de bufandas de 30.000 a 38.000 unidades en la última ronda.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Plan de Actuación: Las 5 Metas Cuantitativas (Clip 06) */}
      <section className="bg-white dark:bg-roura-navy rounded-2xl border border-roura-beige-dark dark:border-roura-navy-light shadow-sm p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-roura-beige-dark dark:border-roura-navy-light">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-roura-teal/15 dark:bg-roura-teal/30 text-roura-teal dark:text-roura-sky flex items-center justify-center font-bold">
              <Target className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-serif font-black text-roura-navy dark:text-white">
                  Plan de Actuación: 5 Metas Cuantitativas & Evaluación al Cierre
                </h2>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-roura-teal text-white uppercase">
                  Clip 06
                </span>
              </div>
              <p className="text-xs text-roura-navy/60 dark:text-roura-sky/70 font-sans">
                Balance de cumplimiento: 2 metas superadas (Margen y ROE) &bull; 3 metas pendientes (Bruto, Liquidez y No Calidad)
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-md bg-tweed/10 text-tweed font-mono text-xs font-bold border border-tweed/20">
              2 Superadas
            </span>
            <span className="px-2.5 py-1 rounded-md bg-rust/10 text-rust font-mono text-xs font-bold border border-rust/20">
              3 Pendientes
            </span>
          </div>
        </div>

        {/* Tabla Oficial de Metas del Guión */}
        <div className="overflow-x-auto rounded-xl border border-roura-beige-deep dark:border-roura-navy-light mb-6">
          <table className="w-full text-xs font-sans text-left">
            <thead className="bg-roura-beige dark:bg-roura-navy-dark text-roura-navy dark:text-white font-serif font-black border-b border-roura-beige-deep dark:border-roura-navy-light">
              <tr>
                <th className="py-3 px-4">Indicador Clave de Gestión</th>
                <th className="py-3 px-3 text-center">Valor Inicial (2025)</th>
                <th className="py-3 px-3 text-center">Meta P1</th>
                <th className="py-3 px-3 text-center">Meta P2</th>
                <th className="py-3 px-3 text-center bg-roura-teal/15 dark:bg-roura-teal/25 text-roura-teal dark:text-roura-sky font-bold">
                  Meta Plan P3
                </th>
                <th className="py-3 px-3 text-center bg-roura-beige-light dark:bg-roura-navy-deep font-bold">
                  Cierre Real 2029 (Vídeo)
                </th>
                <th className="py-3 px-4 text-center">Estado Oficial</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-roura-beige-dark dark:divide-roura-navy-light/40 text-roura-navy dark:text-roura-beige-light">
              {/* 1. Margen */}
              <tr className="bg-tweed/[0.02]">
                <td className="py-3.5 px-4 font-semibold flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-tweed" />
                  % Margen sobre Ingresos
                </td>
                <td className="py-3 px-3 text-center font-mono">32,5%</td>
                <td className="py-3 px-3 text-center font-mono">35,0%</td>
                <td className="py-3 px-3 text-center font-mono">37,5%</td>
                <td className="py-3 px-3 text-center font-mono font-bold text-roura-teal dark:text-roura-sky bg-roura-teal/10">
                  40,0%
                </td>
                <td className="py-3 px-3 text-center font-mono font-black text-tweed text-sm">
                  49,3%
                </td>
                <td className="py-3 px-4 text-center">
                  <span className="px-2.5 py-0.5 rounded-full bg-tweed/15 text-tweed font-mono text-[10px] font-bold">
                    ✓ Superada (+9,3 p.p.)
                  </span>
                </td>
              </tr>

              {/* 2. ROE */}
              <tr className="bg-tweed/[0.02]">
                <td className="py-3.5 px-4 font-semibold flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-tweed" />
                  % Rentabilidad / Patrimonio (ROE)
                </td>
                <td className="py-3 px-3 text-center font-mono text-rust">-2,6%</td>
                <td className="py-3 px-3 text-center font-mono">2,5%</td>
                <td className="py-3 px-3 text-center font-mono">6,0%</td>
                <td className="py-3 px-3 text-center font-mono font-bold text-roura-teal dark:text-roura-sky bg-roura-teal/10">
                  9,5%
                </td>
                <td className="py-3 px-3 text-center font-mono font-black text-tweed text-sm">
                  13,7%
                </td>
                <td className="py-3 px-4 text-center">
                  <span className="px-2.5 py-0.5 rounded-full bg-tweed/15 text-tweed font-mono text-[10px] font-bold">
                    ✓ Superada (+4,2 p.p.)
                  </span>
                </td>
              </tr>

              {/* 3. Resultado Bruto */}
              <tr>
                <td className="py-3.5 px-4 font-semibold flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  Resultado Bruto Operativo ({currency})
                </td>
                <td className="py-3 px-3 text-center font-mono text-rust">-{currency}186.798</td>
                <td className="py-3 px-3 text-center font-mono">{currency}50.000</td>
                <td className="py-3 px-3 text-center font-mono">{currency}180.000</td>
                <td className="py-3 px-3 text-center font-mono font-bold text-roura-teal dark:text-roura-sky bg-roura-teal/10">
                  {currency}320.000
                </td>
                <td className="py-3 px-3 text-center font-mono font-bold text-roura-navy dark:text-white text-sm">
                  {currency}232.335
                </td>
                <td className="py-3 px-4 text-center">
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-700 dark:text-amber-400 font-mono text-[10px] font-bold">
                    Pendiente (En positivo)
                  </span>
                </td>
              </tr>

              {/* 4. Liquidez */}
              <tr>
                <td className="py-3.5 px-4 font-semibold flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-rust" />
                  Ratio de Liquidez
                </td>
                <td className="py-3 px-3 text-center font-mono">495,1%</td>
                <td className="py-3 px-3 text-center font-mono">280,0%</td>
                <td className="py-3 px-3 text-center font-mono">200,0%</td>
                <td className="py-3 px-3 text-center font-mono font-bold text-roura-teal dark:text-roura-sky bg-roura-teal/10">
                  150,0%
                </td>
                <td className="py-3 px-3 text-center font-mono font-bold text-rust text-sm">
                  49,6%
                </td>
                <td className="py-3 px-4 text-center">
                  <span className="px-2.5 py-0.5 rounded-full bg-rust/15 text-rust font-mono text-[10px] font-bold">
                    Pendiente (No alcanzada)
                  </span>
                </td>
              </tr>

              {/* 5. Costes de No Calidad */}
              <tr>
                <td className="py-3.5 px-4 font-semibold flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-rust" />
                  Costes de No Calidad ({currency})
                </td>
                <td className="py-3 px-3 text-center font-mono text-rust">{currency}64.600</td>
                <td className="py-3 px-3 text-center font-mono">{currency}35.000</td>
                <td className="py-3 px-3 text-center font-mono">{currency}20.000</td>
                <td className="py-3 px-3 text-center font-mono font-bold text-roura-teal dark:text-roura-sky bg-roura-teal/10">
                  {currency}12.000
                </td>
                <td className="py-3 px-3 text-center font-mono font-bold text-rust text-sm">
                  {currency}69.729
                </td>
                <td className="py-3 px-4 text-center">
                  <span className="px-2.5 py-0.5 rounded-full bg-rust/15 text-rust font-mono text-[10px] font-bold">
                    Pendiente (No alcanzada)
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Cita textual del guión de Andrea */}
        <div className="p-4 rounded-xl bg-roura-beige-light dark:bg-roura-navy-dark border border-roura-beige-deep dark:border-roura-navy-light text-xs font-serif italic text-roura-navy/80 dark:text-roura-sky/90">
          «Superamos dos de las cinco metas finales del plan: el margen (49,3%) y el ROE (13,7%). El resultado bruto pasó a terreno positivo ({currency}232.335), aunque por debajo de la meta de {currency}320.000. Quedaron pendientes la liquidez y los costos de no calidad como prioridades de gestión futura.»
        </div>
      </section>

      {/* 6. Bloques de Apoyo a los Clips 07, 08 y 09 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Clip 07: P&L Causal & Puente Operativo */}
        <div className="p-5 rounded-2xl bg-white dark:bg-roura-navy border border-roura-beige-dark dark:border-roura-navy-light shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-roura-teal dark:text-roura-sky">
              Clip 07 &bull; Ventas & Cascada
            </span>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-roura-beige dark:bg-roura-navy">
              P3 &rarr; P4
            </span>
          </div>
          <h3 className="font-serif font-black text-sm text-roura-navy dark:text-white mb-2">
            Puente Operativo en {currency} (2029)
          </h3>
          <div className="space-y-1.5 font-mono text-xs">
            <div className="flex justify-between text-rust">
              <span>Op. 2028:</span>
              <span>-{currency}110.481</span>
            </div>
            <div className="flex justify-between text-tweed font-bold">
              <span>+ Margen adicional:</span>
              <span>+{currency}360.014</span>
            </div>
            <div className="flex justify-between text-rust">
              <span>- Aumento gastos:</span>
              <span>-{currency}17.198</span>
            </div>
            <div className="pt-1.5 border-t border-roura-beige-dark dark:border-roura-navy-light flex justify-between font-black text-tweed text-sm">
              <span>= Resultado Operativo:</span>
              <span>+{currency}232.335</span>
            </div>
            <div className="pt-1 text-[11px] text-roura-navy/60 dark:text-roura-sky/70 flex justify-between">
              <span>Extraordinarios:</span>
              <span>+{currency}213.000</span>
            </div>
            <div className="flex justify-between font-bold text-roura-navy dark:text-white text-xs">
              <span>Resultado Neto:</span>
              <span>+{currency}365.700</span>
            </div>
          </div>
          <p className="text-[11px] text-roura-navy/70 dark:text-roura-sky/80 mt-3 pt-2 border-t border-roura-beige-dark dark:border-roura-navy-light font-sans">
            Crecimiento unidades 2029: Corbatas +6,6%, Bufandas +21,8%, Calcetines +24,3%.
          </p>
        </div>

        {/* Clip 08: Balance & Crédito Extraordinario */}
        <div className="p-5 rounded-2xl bg-white dark:bg-roura-navy border border-roura-beige-dark dark:border-roura-navy-light shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-roura-teal dark:text-roura-sky">
              Clip 08 &bull; Balance & Deuda
            </span>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-rust/10 text-rust">
              Tensión de Caja
            </span>
          </div>
          <h3 className="font-serif font-black text-sm text-roura-navy dark:text-white mb-2">
            Composición Patrimonial (2029)
          </h3>
          <div className="space-y-1.5 font-mono text-xs">
            <div className="flex justify-between">
              <span className="text-roura-navy/60 dark:text-roura-sky/70">Activo no corriente:</span>
              <span className="font-bold">{currency}3.556.625</span>
            </div>
            <div className="flex justify-between text-rust">
              <span>Efectivo al cierre:</span>
              <span className="font-bold">{currency}0</span>
            </div>
            <div className="flex justify-between text-tweed">
              <span>Deuda L/P (reducida):</span>
              <span className="font-bold">{currency}784.750</span>
            </div>
            <div className="flex justify-between text-rust font-bold pt-1 border-t border-roura-beige-dark dark:border-roura-navy-light">
              <span>Crédito Extraordinario:</span>
              <span>{currency}102.332</span>
            </div>
            <div className="flex justify-between text-rust">
              <span>Reservas acumuladas:</span>
              <span>-{currency}740.133</span>
            </div>
            <div className="flex justify-between text-tweed">
              <span>Gastos Financieros:</span>
              <span>{currency}79.636 (↓ de 101k)</span>
            </div>
          </div>
          <p className="text-[11px] text-roura-navy/70 dark:text-roura-sky/80 mt-3 pt-2 border-t border-roura-beige-dark dark:border-roura-navy-light font-sans">
            La mejora operativa fue real; el reto fue convertirla en capacidad de pago y liquidez.
          </p>
        </div>

        {/* Clip 09: Alcance Productivo de Bufandas */}
        <div className="p-5 rounded-2xl bg-white dark:bg-roura-navy border border-roura-beige-dark dark:border-roura-navy-light shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-roura-teal dark:text-roura-sky">
              Clip 09 &bull; Producción
            </span>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-roura-teal/15 text-roura-teal dark:text-roura-sky">
              Capacidad
            </span>
          </div>
          <h3 className="font-serif font-black text-sm text-roura-navy dark:text-white mb-2">
            Ampliación Fabril de Bufandas
          </h3>
          <div className="space-y-2 text-xs font-sans">
            <div className="p-2.5 rounded-lg bg-roura-beige dark:bg-roura-navy-dark border border-roura-beige-deep dark:border-roura-navy-light font-mono text-[11px]">
              <span className="text-roura-navy/60 dark:text-roura-sky/70 block">Declaración Directiva:</span>
              <strong className="text-roura-navy dark:text-white">
                «Sin nuevas entradas internacionales acreditadas ni fábricas en el exterior»
              </strong>
            </div>

            <div className="space-y-1 font-mono text-[11px]">
              <div className="flex justify-between">
                <span>Capacidad anterior:</span>
                <span>30.000 uds</span>
              </div>
              <div className="flex justify-between text-roura-teal font-bold">
                <span>Nueva capacidad P4:</span>
                <span>38.000 uds (+8k)</span>
              </div>
              <div className="flex justify-between text-tweed font-black">
                <span>Producción realizada:</span>
                <span>35.500 uds</span>
              </div>
            </div>
            <p className="text-[11px] text-roura-navy/70 dark:text-roura-sky/80 pt-1 font-sans">
              La producción superó en 5.500 unidades el límite anterior, demostrando que la capacidad ampliada se utilizó con éxito.
            </p>
          </div>
        </div>
      </div>

      {/* 7. Metodología de Trabajo en Equipo (Clip 10) & Las 5 Lecciones (Clip 11) */}
      <section className="bg-white dark:bg-roura-navy rounded-2xl border border-roura-beige-dark dark:border-roura-navy-light shadow-sm p-6 sm:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Metodología (Clip 10) */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-roura-teal/15 dark:bg-roura-teal/30 text-roura-teal dark:text-roura-sky flex items-center justify-center font-bold">
                <Briefcase className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-serif font-black text-roura-navy dark:text-white">
                    Metodología de Trabajo en Equipo
                  </h3>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-roura-teal text-white uppercase">
                    Clip 10
                  </span>
                </div>
                <p className="text-xs text-roura-navy/60 dark:text-roura-sky/70 font-sans">
                  Autoevaluación de contribución del equipo: <strong className="text-tweed">5 / 5</strong>
                </p>
              </div>
            </div>

            {/* Diagrama de flujo */}
            <div className="p-3.5 rounded-xl bg-roura-beige-light dark:bg-roura-navy-dark border border-roura-beige-deep dark:border-roura-navy-light">
              <span className="text-[10px] font-mono uppercase tracking-wider text-roura-teal dark:text-roura-sky font-bold block mb-2">
                Pipeline de Decisión Directiva
              </span>
              <div className="grid grid-cols-4 gap-1.5 text-center font-mono text-[10px]">
                <div className="p-2 rounded bg-white dark:bg-roura-navy border border-roura-beige-dark dark:border-roura-navy-light font-bold">
                  1. Precios por Producto
                </div>
                <div className="p-2 rounded bg-white dark:bg-roura-navy border border-roura-beige-dark dark:border-roura-navy-light font-bold">
                  2. Estimación Ingresos & Costes
                </div>
                <div className="p-2 rounded bg-white dark:bg-roura-navy border border-roura-beige-dark dark:border-roura-navy-light font-bold">
                  3. Comparación Alternativas
                </div>
                <div className="p-2 rounded bg-roura-teal text-white font-bold">
                  4. Acuerdo Consensuado
                </div>
              </div>
            </div>

            {/* 3 Tarjetas de Trabajo */}
            <div className="grid grid-cols-3 gap-2.5 text-xs font-sans">
              <div className="p-3 rounded-lg bg-white dark:bg-roura-navy-deep border border-roura-beige-dark dark:border-roura-navy-light text-center">
                <span className="font-serif font-bold block text-roura-navy dark:text-white">Reparto Equitativo</span>
                <span className="text-[10px] text-roura-navy/60 dark:text-roura-sky/70">Participación 33% c/u</span>
              </div>
              <div className="p-3 rounded-lg bg-white dark:bg-roura-navy-deep border border-roura-beige-dark dark:border-roura-navy-light text-center">
                <span className="font-serif font-bold block text-roura-navy dark:text-white">Matriz Común</span>
                <span className="text-[10px] text-roura-navy/60 dark:text-roura-sky/70">Misma base de datos</span>
              </div>
              <div className="p-3 rounded-lg bg-white dark:bg-roura-navy-deep border border-roura-beige-dark dark:border-roura-navy-light text-center">
                <span className="font-serif font-bold block text-roura-navy dark:text-white">Decisión Conjunta</span>
                <span className="text-[10px] text-roura-navy/60 dark:text-roura-sky/70">Consenso unánime</span>
              </div>
            </div>

            <p className="text-xs text-roura-navy/70 dark:text-roura-sky/80 font-sans italic">
              «Mejora a incorporar en futuras gestiones: Presupuesto de caja por fechas para conciliar cobros y pagos antes de autorizar planes sobre el papel.»
            </p>
          </div>

          {/* 5 Lecciones Aprendidas (Clip 11) */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-roura-teal/15 dark:bg-roura-teal/30 text-roura-teal dark:text-roura-sky flex items-center justify-center font-bold">
                <BookOpen className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-serif font-black text-roura-navy dark:text-white">
                    Cinco Lecciones Directivas
                  </h3>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-roura-teal text-white uppercase">
                    Clip 11
                  </span>
                </div>
                <p className="text-xs text-roura-navy/60 dark:text-roura-sky/70 font-sans">
                  Autoevaluación del aprendizaje gerencial: <strong className="text-tweed">10 / 10</strong>
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="p-2.5 rounded-lg bg-roura-beige-light dark:bg-roura-navy-dark border border-roura-beige-deep dark:border-roura-navy-light flex items-start gap-2.5 text-xs">
                <span className="w-5 h-5 rounded-full bg-roura-teal text-white flex items-center justify-center font-mono font-bold text-[10px] shrink-0 mt-0.5">1</span>
                <div>
                  <strong className="text-roura-navy dark:text-white font-serif">Utilidad y Caja:</strong>
                  <span className="text-roura-navy/70 dark:text-roura-sky/80 ml-1 font-sans">Una utilidad contable positiva no garantiza liquidez ni capacidad de pago inmediata.</span>
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-roura-beige-light dark:bg-roura-navy-dark border border-roura-beige-deep dark:border-roura-navy-light flex items-start gap-2.5 text-xs">
                <span className="w-5 h-5 rounded-full bg-roura-teal text-white flex items-center justify-center font-mono font-bold text-[10px] shrink-0 mt-0.5">2</span>
                <div>
                  <strong className="text-roura-navy dark:text-white font-serif">Capacidad e Inventario:</strong>
                  <span className="text-roura-navy/70 dark:text-roura-sky/80 ml-1 font-sans">La capacidad debe evaluarse junto con la demanda esperada, el stock remanente y la financiación.</span>
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-roura-beige-light dark:bg-roura-navy-dark border border-roura-beige-deep dark:border-roura-navy-light flex items-start gap-2.5 text-xs">
                <span className="w-5 h-5 rounded-full bg-roura-teal text-white flex items-center justify-center font-mono font-bold text-[10px] shrink-0 mt-0.5">3</span>
                <div>
                  <strong className="text-roura-navy dark:text-white font-serif">Eficacia Comercial:</strong>
                  <span className="text-roura-navy/70 dark:text-roura-sky/80 ml-1 font-sans">El gasto en marketing y marca debe juzgarse estrictamente por sus resultados en volumen y valor percibido.</span>
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-roura-beige-light dark:bg-roura-navy-dark border border-roura-beige-deep dark:border-roura-navy-light flex items-start gap-2.5 text-xs">
                <span className="w-5 h-5 rounded-full bg-roura-teal text-white flex items-center justify-center font-mono font-bold text-[10px] shrink-0 mt-0.5">4</span>
                <div>
                  <strong className="text-roura-navy dark:text-white font-serif">Metas Claras:</strong>
                  <span className="text-roura-navy/70 dark:text-roura-sky/80 ml-1 font-sans">Cada objetivo estratégico requiere un indicador comparable para medir avances y reconocer brechas.</span>
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-roura-beige-light dark:bg-roura-navy-dark border border-roura-beige-deep dark:border-roura-navy-light flex items-start gap-2.5 text-xs">
                <span className="w-5 h-5 rounded-full bg-roura-teal text-white flex items-center justify-center font-mono font-bold text-[10px] shrink-0 mt-0.5">5</span>
                <div>
                  <strong className="text-roura-navy dark:text-white font-serif">Revisión en Equipo:</strong>
                  <span className="text-roura-navy/70 dark:text-roura-sky/80 ml-1 font-sans">El consenso del equipo debe respaldarse con datos de mercado y evaluación rigurosa de riesgos.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Evaluación Global & Cierre (Clip 12) */}
      <section className="bg-gradient-to-r from-roura-navy-deep via-roura-navy to-roura-navy-dark text-white rounded-2xl border border-roura-navy-light p-6 sm:p-8 shadow-lg">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-roura-sky text-xs font-mono font-bold uppercase">
              <span>Clip 12 &bull; Evaluación Global & Cierre</span>
            </div>
            <h3 className="text-2xl font-serif font-black text-white">
              Recuperación Medible: +550 Puntos de Valor
            </h3>
            <p className="text-sm text-roura-sky-light/80 max-w-xl font-sans">
              Roura 1940 cerró en <strong>2.879 puntos</strong> (+23,6% vs base 2025) y generó un excedente operativo de <strong>{currency}232.335</strong>.
              Recomendación general de la experiencia en CompanyGame: <strong className="text-roura-sky font-mono">10 / 10</strong>.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
            <div className="bg-white/10 backdrop-blur px-5 py-3 rounded-xl border border-white/20 text-center">
              <span className="text-[10px] font-mono uppercase tracking-wider text-roura-sky block font-semibold">Valor Base &rarr; Cierre</span>
              <span className="text-2xl font-serif font-black text-white block mt-0.5">2.329 &rarr; 2.879</span>
              <span className="text-[10px] text-tweed font-mono font-bold">+550 pts (+23,6%)</span>
            </div>

            <div className="bg-roura-teal px-5 py-3 rounded-xl text-center shadow-md">
              <span className="text-[10px] font-mono uppercase tracking-wider text-white/80 block font-semibold">Equipo Directivo</span>
              <span className="text-lg font-serif font-black text-white block mt-0.5">FINFORCE</span>
              <span className="text-[10px] text-white/90 font-mono">¡Muchas Gracias!</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
