'use client';

import React from 'react';
import { Award, Users, Target, Compass, TrendingUp, AlertTriangle, CheckCircle2, ShieldCheck, Factory, DollarSign, Sparkles } from 'lucide-react';

export const TeamIdentityPlanView: React.FC = () => {
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
        </div>
      </section>

      {/* 2. Presentación del Equipo & Foto Oficial */}
      <section className="bg-white dark:bg-roura-navy rounded-2xl border border-roura-beige-dark dark:border-roura-navy-light shadow-sm p-6 sm:p-8">
        <div className="flex items-center gap-2.5 mb-6 pb-4 border-b border-roura-beige-dark dark:border-roura-navy-light">
          <div className="w-9 h-9 rounded-lg bg-roura-teal/15 dark:bg-roura-teal/30 text-roura-teal dark:text-roura-sky flex items-center justify-center font-bold">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-serif font-black text-roura-navy dark:text-white">
              Equipo de Gestión Directiva: FINFORCE
            </h2>
            <p className="text-xs text-roura-navy/60 dark:text-roura-sky/70 font-sans">
              Integrantes, distribución de responsabilidades ejecutivas y foto de presentación oficial
            </p>
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
                    <p className="text-xs font-mono uppercase tracking-widest text-roura-sky">Equipo FINFORCE</p>
                    <p className="text-sm font-serif font-bold text-white">Carrera de Finanzas &bull; ESPOCH</p>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-1 rounded bg-roura-teal text-white uppercase font-bold tracking-wider">
                    Certificación Oficial
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Tarjetas de Presentación de las 3 Integrantes */}
          <div className="lg:col-span-5 space-y-3.5">
            {/* 1. Líder */}
            <div className="p-4 rounded-xl bg-roura-beige-light dark:bg-roura-navy-dark border border-roura-beige-deep dark:border-roura-navy-light relative overflow-hidden">
              <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
                <span className="inline-block px-3 py-1 bg-roura-teal text-white font-mono text-[10px] uppercase font-bold tracking-wider rounded-bl-lg shadow-sm">
                  Líder de Equipo
                </span>
              </div>
              <h3 className="font-serif font-black text-base text-roura-navy dark:text-white">
                Àgata Elisabeth Pazmiño Andrades
              </h3>
              <p className="text-xs font-mono text-roura-teal dark:text-roura-sky font-semibold mb-2">
                Dirección Financiera, Tesorería & Cierre Metodológico
              </p>
              <p className="text-xs text-roura-navy/70 dark:text-roura-sky/80 font-sans leading-relaxed">
                Responsable del análisis de balance, estructura de deuda y liquidez, gestión de la matriz común de decisiones y formulación de las 5 lecciones de aprendizaje gerencial.
              </p>
            </div>

            {/* 2. Ingrid */}
            <div className="p-4 rounded-xl bg-white dark:bg-roura-navy-deep border border-roura-beige-dark dark:border-roura-navy-light shadow-sm">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-serif font-black text-base text-roura-navy dark:text-white">
                  Ingrid Daniela Correa Jiménez
                </h3>
                <span className="text-[10px] font-mono font-bold text-roura-teal dark:text-roura-sky px-2 py-0.5 rounded bg-roura-beige dark:bg-roura-navy">
                  Presentadora
                </span>
              </div>
              <p className="text-xs font-mono text-roura-teal dark:text-roura-sky font-semibold mb-2">
                Diagnóstico Estratégico, Plan de Actuación & Creación de Valor
              </p>
              <p className="text-xs text-roura-navy/70 dark:text-roura-sky/80 font-sans leading-relaxed">
                Conducción del diagnóstico de partida 2024-2025, establecimiento de las metas del plan de choque y seguimiento a la evolución integral del valor de Roura 1940.
              </p>
            </div>

            {/* 3. Andrea */}
            <div className="p-4 rounded-xl bg-white dark:bg-roura-navy-deep border border-roura-beige-dark dark:border-roura-navy-light shadow-sm">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-serif font-black text-base text-roura-navy dark:text-white">
                  Andrea Mishell Quispillo Becerra
                </h3>
                <span className="text-[10px] font-mono font-bold text-roura-teal dark:text-roura-sky px-2 py-0.5 rounded bg-roura-beige dark:bg-roura-navy">
                  Presentadora
                </span>
              </div>
              <p className="text-xs font-mono text-roura-teal dark:text-roura-sky font-semibold mb-2">
                Visión Competitiva, Dinámica Comercial & Cascada P&L
              </p>
              <p className="text-xs text-roura-navy/70 dark:text-roura-sky/80 font-sans leading-relaxed">
                Análisis de cuota de mercado frente a competidores, evolución de precios e ingresos en corbatas, bufandas y calcetines, y causalidad operativa del P&L.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Misión y Visión de Roura 1940 */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Misión / Propuesta de Valor */}
        <div className="bg-white dark:bg-roura-navy rounded-2xl border border-roura-beige-dark dark:border-roura-navy-light shadow-sm p-6 sm:p-7 relative overflow-hidden">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-8 h-8 rounded-lg bg-roura-teal/15 dark:bg-roura-teal/30 text-roura-teal dark:text-roura-sky flex items-center justify-center">
              <Compass className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-roura-teal dark:text-roura-sky font-bold block">
                Identidad Corporativa
              </span>
              <h3 className="text-lg font-serif font-black text-roura-navy dark:text-white">
                Misión & Propuesta de Valor
              </h3>
            </div>
          </div>
          <blockquote className="font-serif italic text-sm text-roura-navy/90 dark:text-roura-beige-light leading-relaxed border-l-4 border-roura-teal pl-4 py-1 bg-roura-beige-light dark:bg-roura-navy-dark rounded-r-lg">
            «Confeccionar corbatas, bufandas y calcetines para hombre con un cuidado equilibrio entre diseño artesanal y calidad confiable a un precio justo, respaldados por más de 45 años de tradición textil en España. No buscamos ser la opción más barata del mercado, sino entregar la mayor relación valor-precio mediante materias primas seleccionadas, acabados superiores y una sólida presencia en canales multimarca y online.»
          </blockquote>
          <div className="mt-4 pt-3 border-t border-roura-beige-dark dark:border-roura-navy-light text-xs text-roura-navy/60 dark:text-roura-sky/70 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-roura-teal shrink-0" />
            <span>Posicionamiento de marca: Elegancia accesible, calidad garantizada y diferenciación de producto.</span>
          </div>
        </div>

        {/* Visión / Propósito Estratégico */}
        <div className="bg-white dark:bg-roura-navy rounded-2xl border border-roura-beige-dark dark:border-roura-navy-light shadow-sm p-6 sm:p-7 relative overflow-hidden">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-8 h-8 rounded-lg bg-roura-teal/15 dark:bg-roura-teal/30 text-roura-teal dark:text-roura-sky flex items-center justify-center">
              <Target className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-roura-teal dark:text-roura-sky font-bold block">
                Horizonte Directivo
              </span>
              <h3 className="text-lg font-serif font-black text-roura-navy dark:text-white">
                Visión & Propósito de Gestión
              </h3>
            </div>
          </div>
          <blockquote className="font-serif italic text-sm text-roura-navy/90 dark:text-roura-beige-light leading-relaxed border-l-4 border-roura-navy dark:border-roura-sky pl-4 py-1 bg-roura-beige-light dark:bg-roura-navy-dark rounded-r-lg">
            «Recuperar la rentabilidad antes de buscar crecer. Durante la gestión de FINFORCE, Roura 1940 asume el compromiso de sanear las líneas operativas deficitarias (especialmente el margen negativo de calcetines), aprovechar al máximo la capacidad fabril de telares, cuidar la tesorería disponible y consolidar a la compañía en el podio de mayor valor y solvencia de la industria textil española.»
          </blockquote>
          <div className="mt-4 pt-3 border-t border-roura-beige-dark dark:border-roura-navy-light text-xs text-roura-navy/60 dark:text-roura-sky/70 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-roura-teal shrink-0" />
            <span>Horizonte de llegada: Superar el suelo de crisis y convertir la operación en beneficio neto genuino.</span>
          </div>
        </div>
      </section>

      {/* 4. Punto de Partida: Situación Heredada en 2025 */}
      <section className="bg-white dark:bg-roura-navy rounded-2xl border border-roura-beige-dark dark:border-roura-navy-light shadow-sm p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-roura-beige-dark dark:border-roura-navy-light">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-roura-navy/10 dark:bg-roura-sky/20 text-roura-navy dark:text-white flex items-center justify-center font-bold">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-serif font-black text-roura-navy dark:text-white">
                Punto de Partida: Balance & Valores Históricos de 2025
              </h2>
              <p className="text-xs text-roura-navy/60 dark:text-roura-sky/70 font-sans">
                Fotografía exacta antes de ingresar la 1ª decisión del equipo FINFORCE (Año Base)
              </p>
            </div>
          </div>
          <span className="font-mono text-xs px-3 py-1.5 rounded-lg bg-roura-beige dark:bg-roura-navy-dark border border-roura-beige-deep dark:border-roura-navy-light font-bold text-roura-navy dark:text-roura-sky self-start sm:self-auto">
            Año Base Auditado: 2025
          </span>
        </div>

        {/* Grid de Métricas Exactas de 2025 */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5 mb-6">
          {/* 1. Ingresos */}
          <div className="p-3.5 rounded-xl bg-roura-beige-light dark:bg-roura-navy-dark border border-roura-beige-deep dark:border-roura-navy-light text-center">
            <span className="text-[10px] font-mono uppercase text-roura-navy/60 dark:text-roura-sky/70 font-semibold block">
              Ingresos Totales
            </span>
            <span className="text-base sm:text-lg font-serif font-black text-roura-navy dark:text-white block mt-0.5">
              3.346.747 €
            </span>
            <span className="text-[10px] text-tweed font-mono font-medium block">
              +2,2% vs 2024
            </span>
          </div>

          {/* 2. Margen Bruto */}
          <div className="p-3.5 rounded-xl bg-roura-beige-light dark:bg-roura-navy-dark border border-roura-beige-deep dark:border-roura-navy-light text-center">
            <span className="text-[10px] font-mono uppercase text-roura-navy/60 dark:text-roura-sky/70 font-semibold block">
              Margen Bruto
            </span>
            <span className="text-base sm:text-lg font-serif font-black text-roura-navy dark:text-white block mt-0.5">
              32,5%
            </span>
            <span className="text-[10px] text-rust font-mono font-medium block">
              1.088.267 € (↓ de 35,0%)
            </span>
          </div>

          {/* 3. Resultado Bruto */}
          <div className="p-3.5 rounded-xl bg-roura-beige-light dark:bg-roura-navy-dark border border-roura-beige-deep dark:border-roura-navy-light text-center">
            <span className="text-[10px] font-mono uppercase text-roura-navy/60 dark:text-roura-sky/70 font-semibold block">
              Resultado Bruto
            </span>
            <span className="text-base sm:text-lg font-serif font-black text-rust block mt-0.5">
              -186.798 €
            </span>
            <span className="text-[10px] text-rust font-mono font-medium block">
              Pérdida operativa
            </span>
          </div>

          {/* 4. Resultado Neto */}
          <div className="p-3.5 rounded-xl bg-roura-beige-light dark:bg-roura-navy-dark border border-roura-beige-deep dark:border-roura-navy-light text-center">
            <span className="text-[10px] font-mono uppercase text-roura-navy/60 dark:text-roura-sky/70 font-semibold block">
              Resultado Neto
            </span>
            <span className="text-base sm:text-lg font-serif font-black text-rust block mt-0.5">
              -243.110 €
            </span>
            <span className="text-[10px] text-rust font-mono font-medium block">
              ROE: -2,6%
            </span>
          </div>

          {/* 5. Efectivo en Caja */}
          <div className="p-3.5 rounded-xl bg-roura-beige-light dark:bg-roura-navy-dark border border-roura-beige-deep dark:border-roura-navy-light text-center">
            <span className="text-[10px] font-mono uppercase text-roura-navy/60 dark:text-roura-sky/70 font-semibold block">
              Efectivo en Caja
            </span>
            <span className="text-base sm:text-lg font-serif font-black text-tweed block mt-0.5">
              1.916.796 €
            </span>
            <span className="text-[10px] text-roura-teal dark:text-roura-sky font-mono font-medium block">
              Liquidez: 495,1%
            </span>
          </div>

          {/* 6. Valor Compañía */}
          <div className="p-3.5 rounded-xl bg-roura-beige-light dark:bg-roura-navy-dark border border-roura-beige-deep dark:border-roura-navy-light text-center">
            <span className="text-[10px] font-mono uppercase text-roura-navy/60 dark:text-roura-sky/70 font-semibold block">
              Valor Compañía
            </span>
            <span className="text-base sm:text-lg font-serif font-black text-roura-navy dark:text-white block mt-0.5">
              2.329,3 pts
            </span>
            <span className="text-[10px] text-roura-navy/60 dark:text-roura-sky/70 font-mono font-medium block">
              Base inicial
            </span>
          </div>
        </div>

        {/* Diagnóstico Cualitativo de la Situación Heredada */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-rust/5 border border-rust/20 flex gap-3">
            <AlertTriangle className="w-5 h-5 text-rust shrink-0 mt-0.5" />
            <div className="text-xs space-y-1">
              <strong className="text-rust font-serif block text-sm">
                Ineficiencia Crítica: Destrucción de Margen en Calcetines (-53,31%)
              </strong>
              <p className="text-roura-navy/80 dark:text-roura-beige-light leading-relaxed font-sans">
                El precio unitario de venta ($2,65) no cubría el coste unitario de fabricación ni los costes directos de distribución. Cada par de calcetines vendido erosionaba la rentabilidad de las corbatas y bufandas.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-tweed/5 border border-tweed/20 flex gap-3">
            <CheckCircle2 className="w-5 h-5 text-tweed shrink-0 mt-0.5" />
            <div className="text-xs space-y-1">
              <strong className="text-tweed font-serif block text-sm">
                Oportunidad: Sólida Liquidez & Cobertura de Fondo de Maniobra
              </strong>
              <p className="text-roura-navy/80 dark:text-roura-beige-light leading-relaxed font-sans">
                Con 1.916.796 € en efectivo y un ratio de liquidez del 495,1%, la empresa gozaba de solvencia patrimonial sin deuda extraordinaria al 50%. El reto estratégico era poner a rendir este capital ocioso para financiar la modernización de fábrica.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Plan de Actuación: Metas del Periodo 3 & Directrices */}
      <section className="bg-white dark:bg-roura-navy rounded-2xl border border-roura-beige-dark dark:border-roura-navy-light shadow-sm p-6 sm:p-8">
        <div className="flex items-center gap-2.5 mb-6 pb-4 border-b border-roura-beige-dark dark:border-roura-navy-light">
          <div className="w-9 h-9 rounded-lg bg-roura-teal/15 dark:bg-roura-teal/30 text-roura-teal dark:text-roura-sky flex items-center justify-center font-bold">
            <Target className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-serif font-black text-roura-navy dark:text-white">
              Plan de Actuación: 5 Metas Cuantitativas (Periodo 3) & Cierre Real
            </h2>
            <p className="text-xs text-roura-navy/60 dark:text-roura-sky/70 font-sans">
              Compromisos formales suscritos por FINFORCE en el Plan de Actuación ACBSP vs. Resultados consolidados
            </p>
          </div>
        </div>

        {/* Tabla Comparativa de Indicadores Clave del Plan */}
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
                <th className="py-3 px-3 text-center bg-tweed/10 text-tweed font-bold">
                  Resultado Real 2029 (Cierre)
                </th>
                <th className="py-3 px-4 text-center">Evaluación Directiva</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-roura-beige-dark dark:divide-roura-navy-light/40 text-roura-navy dark:text-roura-beige-light">
              <tr>
                <td className="py-3 px-4 font-semibold flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-roura-teal" />
                  % Margen sobre Ingresos
                </td>
                <td className="py-3 px-3 text-center font-mono">32,5%</td>
                <td className="py-3 px-3 text-center font-mono">35,0%</td>
                <td className="py-3 px-3 text-center font-mono">37,5%</td>
                <td className="py-3 px-3 text-center font-mono font-bold text-roura-teal dark:text-roura-sky bg-roura-teal/10">
                  40,0%
                </td>
                <td className="py-3 px-3 text-center font-mono font-black text-tweed bg-tweed/5 text-sm">
                  49,3%
                </td>
                <td className="py-3 px-4 text-center">
                  <span className="px-2 py-0.5 rounded-full bg-tweed/15 text-tweed font-mono text-[10px] font-bold">
                    ✓ Superada (+9,3 p.p.)
                  </span>
                </td>
              </tr>

              <tr>
                <td className="py-3 px-4 font-semibold flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-roura-teal" />
                  Resultado Bruto Operativo (€)
                </td>
                <td className="py-3 px-3 text-center font-mono text-rust">-186.798 €</td>
                <td className="py-3 px-3 text-center font-mono">50.000 €</td>
                <td className="py-3 px-3 text-center font-mono">180.000 €</td>
                <td className="py-3 px-3 text-center font-mono font-bold text-roura-teal dark:text-roura-sky bg-roura-teal/10">
                  320.000 €
                </td>
                <td className="py-3 px-3 text-center font-mono font-black text-tweed bg-tweed/5 text-sm">
                  232.335 € <span className="text-[10px] font-normal block text-roura-navy/60 dark:text-roura-sky/70">(Neto: 365.700 €)</span>
                </td>
                <td className="py-3 px-4 text-center">
                  <span className="px-2 py-0.5 rounded-full bg-tweed/15 text-tweed font-mono text-[10px] font-bold">
                    ✓ Retorno a Beneficios
                  </span>
                </td>
              </tr>

              <tr>
                <td className="py-3 px-4 font-semibold flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-roura-teal" />
                  % Rentabilidad / Patrimonio (ROE)
                </td>
                <td className="py-3 px-3 text-center font-mono text-rust">-2,6%</td>
                <td className="py-3 px-3 text-center font-mono">2,5%</td>
                <td className="py-3 px-3 text-center font-mono">6,0%</td>
                <td className="py-3 px-3 text-center font-mono font-bold text-roura-teal dark:text-roura-sky bg-roura-teal/10">
                  9,5%
                </td>
                <td className="py-3 px-3 text-center font-mono font-black text-tweed bg-tweed/5 text-sm">
                  11,8%
                </td>
                <td className="py-3 px-4 text-center">
                  <span className="px-2 py-0.5 rounded-full bg-tweed/15 text-tweed font-mono text-[10px] font-bold">
                    ✓ Superada (+2,3 p.p.)
                  </span>
                </td>
              </tr>

              <tr>
                <td className="py-3 px-4 font-semibold flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-roura-teal" />
                  Ratio de Liquidez
                </td>
                <td className="py-3 px-3 text-center font-mono">495,1%</td>
                <td className="py-3 px-3 text-center font-mono">280,0%</td>
                <td className="py-3 px-3 text-center font-mono">200,0%</td>
                <td className="py-3 px-3 text-center font-mono font-bold text-roura-teal dark:text-roura-sky bg-roura-teal/10">
                  150,0%
                </td>
                <td className="py-3 px-3 text-center font-mono font-black text-roura-navy dark:text-white bg-tweed/5 text-sm">
                  49,6% <span className="text-[10px] font-normal block text-rust">Tesorería ajustada</span>
                </td>
                <td className="py-3 px-4 text-center">
                  <span className="px-2 py-0.5 rounded-full bg-roura-teal/15 text-roura-teal dark:text-roura-sky font-mono text-[10px] font-bold">
                    ✓ Capital Movilizado
                  </span>
                </td>
              </tr>

              <tr>
                <td className="py-3 px-4 font-semibold flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-roura-teal" />
                  Costes de No Calidad (€)
                </td>
                <td className="py-3 px-3 text-center font-mono text-rust">64.600 €</td>
                <td className="py-3 px-3 text-center font-mono">35.000 €</td>
                <td className="py-3 px-3 text-center font-mono">20.000 €</td>
                <td className="py-3 px-3 text-center font-mono font-bold text-roura-teal dark:text-roura-sky bg-roura-teal/10">
                  12.000 €
                </td>
                <td className="py-3 px-3 text-center font-mono font-black text-tweed bg-tweed/5 text-sm">
                  &lt; 15.000 €
                </td>
                <td className="py-3 px-4 text-center">
                  <span className="px-2 py-0.5 rounded-full bg-tweed/15 text-tweed font-mono text-[10px] font-bold">
                    ✓ Control Preventivo
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* 4 Pilares de Actuación Ejecutiva */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-roura-beige-light dark:bg-roura-navy-dark border border-roura-beige-deep dark:border-roura-navy-light">
            <div className="flex items-center gap-2 mb-2 text-roura-teal dark:text-roura-sky">
              <DollarSign className="w-4 h-4" />
              <h4 className="font-serif font-black text-xs uppercase tracking-wider">1. Precios & Calcetines</h4>
            </div>
            <p className="text-xs text-roura-navy/70 dark:text-roura-sky/80 leading-relaxed font-sans">
              Subida escalonada del precio de calcetines de 2,65€ iniciales a 2,99€ $\rightarrow$ 3,40€ $\rightarrow$ 3,50€. Se revirtió el margen de -52,7% a +24,0% positivo.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-roura-beige-light dark:bg-roura-navy-dark border border-roura-beige-deep dark:border-roura-navy-light">
            <div className="flex items-center gap-2 mb-2 text-roura-teal dark:text-roura-sky">
              <Award className="w-4 h-4" />
              <h4 className="font-serif font-black text-xs uppercase tracking-wider">2. Promoción & Marca</h4>
            </div>
            <p className="text-xs text-roura-navy/70 dark:text-roura-sky/80 leading-relaxed font-sans">
              Incremento del 10% en presupuesto de promoción en P1 y P2, supeditado a ganar mínimo 2 puntos de valor de marca, focalizando en bufandas y canal multimarca.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-roura-beige-light dark:bg-roura-navy-dark border border-roura-beige-deep dark:border-roura-navy-light">
            <div className="flex items-center gap-2 mb-2 text-roura-teal dark:text-roura-sky">
              <Factory className="w-4 h-4" />
              <h4 className="font-serif font-black text-xs uppercase tracking-wider">3. Ocupación & Capacidad</h4>
            </div>
            <p className="text-xs text-roura-navy/70 dark:text-roura-sky/80 leading-relaxed font-sans">
              Ocupación de telares superior al 87% (94,9% final) para diluir costes fijos. Ampliación de capacidad en bufandas de 30k a 38k uds y compras con 15% de descuento.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-roura-beige-light dark:bg-roura-navy-dark border border-roura-beige-deep dark:border-roura-navy-light">
            <div className="flex items-center gap-2 mb-2 text-roura-teal dark:text-roura-sky">
              <ShieldCheck className="w-4 h-4" />
              <h4 className="font-serif font-black text-xs uppercase tracking-wider">4. Disciplina de Caja</h4>
            </div>
            <p className="text-xs text-roura-navy/70 dark:text-roura-sky/80 leading-relaxed font-sans">
              Movilización del excedente de tesorería para amortizar pasivo y financiar mantenimiento (3,5% activo fijo), sin dividendos en pérdidas ni recurrir a crédito extraordinario (50%).
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
