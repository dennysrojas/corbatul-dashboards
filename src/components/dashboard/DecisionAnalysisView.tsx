'use client';

import React, { useState, useEffect } from 'react';
import { SimulationDataset, RoundDecisionStory } from '../../types/corbatul';

interface DecisionAnalysisViewProps {
  dataset: SimulationDataset;
  selectedPeriod: number;
  onSelectPeriod: (period: number) => void;
}

type SimulationState = 'diagnosis' | 'simulating' | 'executed';

export const DecisionAnalysisView: React.FC<DecisionAnalysisViewProps> = ({
  dataset,
  selectedPeriod,
  onSelectPeriod
}) => {
  const [viewMode, setViewMode] = useState<'simulation' | 'matrix'>('simulation');
  const [simulationState, setSimulationState] = useState<SimulationState>('diagnosis');
  const [simStepText, setSimStepText] = useState<string>('Cargando hoja de decisiones...');
  const [simProgress, setSimProgress] = useState<number>(0);

  // When changing period, reset to diagnosis screen
  useEffect(() => {
    setSimulationState('diagnosis');
    setSimProgress(0);
  }, [selectedPeriod]);

  const currentStory: RoundDecisionStory | undefined = dataset.decisionStories?.find(
    s => s.period === selectedPeriod
  );

  const formatCurrency = (val: number) => `${Math.round(val).toLocaleString()} €`;
  const formatPercent = (val: number) => `${val.toFixed(1)}%`;

  if (!currentStory) return null;

  const handleExecuteSimulation = () => {
    setSimulationState('simulating');
    setSimProgress(15);
    setSimStepText('Cargando parámetros de corte, confección y precios...');

    const timer1 = setTimeout(() => {
      setSimProgress(50);
      setSimStepText('Simulando absorción de mercado textil y reacciones de competidores...');
    }, 450);

    const timer2 = setTimeout(() => {
      setSimProgress(85);
      setSimStepText('Calculando costos fabriles, balance de inventarios y P&L...');
    }, 900);

    const timer3 = setTimeout(() => {
      setSimProgress(100);
      setSimStepText('Consolidando cotización de acción y cuota de mercado...');
    }, 1250);

    const timerFinal = setTimeout(() => {
      setSimulationState('executed');
    }, 1500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timerFinal);
    };
  };

  const hasNextPeriod = selectedPeriod < dataset.periods.length;

  return (
    <div className="space-y-6 w-full">
      {/* Top Banner: Round Header & Stepper */}
      <div className="bg-gradient-to-r from-vintage-950 via-vintage-900 to-vintage-950 border border-vintage-800 rounded-xl p-6 text-vintage-100 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brass-dark via-brass-DEFAULT to-brass-dark" />

        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 relative z-10">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full text-xs font-mono tracking-widest uppercase font-bold bg-brass-dark/40 text-brass-DEFAULT border border-brass-DEFAULT/40">
                Simulador Dinámico Corbatul
              </span>
              <span className="px-2.5 py-1 rounded text-xs font-mono font-semibold bg-vintage-800 text-vintage-200 border border-vintage-700">
                Ronda {selectedPeriod} de {dataset.periods.length}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-black tracking-tight text-vintage-50">
              Periodo {selectedPeriod}: {currentStory.roundTitle}
            </h2>
            <p className="text-sm sm:text-base text-brass-DEFAULT font-serif italic mt-1">
              &ldquo;{currentStory.strategicTheme}&rdquo;
            </p>
          </div>

          {/* Mode Switcher */}
          <div className="flex items-center gap-1.5 bg-roura-navy-deep/80 p-1.5 rounded-xl border border-white/20 shadow-inner">
            <button
              onClick={() => { setViewMode('simulation'); setSimulationState('diagnosis'); }}
              className={`px-3.5 py-1.5 text-xs font-serif font-black rounded-lg transition-all ${
                viewMode === 'simulation'
                  ? 'bg-white text-roura-navy shadow-md ring-1 ring-white/50'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              Simulación Ejecutiva
            </button>
            <button
              onClick={() => setViewMode('matrix')}
              className={`px-3.5 py-1.5 text-xs font-serif font-black rounded-lg transition-all ${
                viewMode === 'matrix'
                  ? 'bg-white text-roura-navy shadow-md ring-1 ring-white/50'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              Matriz Tabular (2026-2029)
            </button>
          </div>
        </div>

        {/* Strategic Timeline Stepper */}
        <div className="mt-6 pt-4 border-t border-vintage-800/80 grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {dataset.periods.map(p => {
            const isCurrent = p === selectedPeriod;
            const isPast = p < selectedPeriod;
            return (
              <button
                key={p}
                onClick={() => onSelectPeriod(p)}
                className={`py-2 px-1 text-center rounded-lg transition-all flex flex-col items-center justify-center border ${
                  isCurrent
                    ? 'bg-vintage-100 text-vintage-950 border-brass-DEFAULT shadow-md ring-2 ring-brass-DEFAULT/50'
                    : isPast
                    ? 'bg-vintage-900 text-vintage-200 border-vintage-800 hover:bg-vintage-800'
                    : 'bg-vintage-950/60 text-vintage-500 border-vintage-900 hover:bg-vintage-900'
                }`}
              >
                <span className="text-xs font-mono uppercase tracking-wider font-semibold">
                  P{p} ({2025 + p})
                </span>
                <span className={`text-[10px] font-serif font-bold truncate max-w-full px-1 ${isCurrent ? 'text-vintage-950 font-black' : ''}`}>
                  {p === 1 ? 'Shock Inicial' : p === 2 ? 'Plan Choque' : p === 3 ? 'Turnaround' : 'Consolidación'}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {viewMode === 'simulation' ? (
        <div className="w-full">
          {/* ========================================================================= */}
          {/* ESTADO 1: PANTALLA COMPLETA DE DIAGNÓSTICO INICIAL (PRE-EJECUCIÓN)         */}
          {/* ========================================================================= */}
          {simulationState === 'diagnosis' && (
            <div className="bg-white border-2 border-zinc-200 rounded-2xl p-6 sm:p-10 shadow-md space-y-8 animate-fadeIn w-full">
              {/* Header de la Pantalla de Diagnóstico */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-zinc-200">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-3 h-3 rounded-full bg-zinc-900" />
                    <span className="text-xs uppercase font-mono font-bold text-zinc-600 tracking-widest">
                      Etapa 1: Punto de Partida & Diagnóstico Heredado
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-serif font-black text-zinc-950">
                    Situación al Iniciar el Periodo {selectedPeriod} ({2025 + selectedPeriod})
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-600 mt-1 max-w-3xl">
                    Estado operativo, financiero y competitivo recibido para la toma de decisiones estratégicas.
                  </p>
                </div>

                <div className="px-4 py-2 bg-zinc-100 rounded-xl border border-zinc-200 text-right">
                  <span className="text-xs font-mono text-zinc-500 uppercase block">Firma en Simulación</span>
                  <span className="text-sm font-serif font-bold text-zinc-900">Roura1940 (FINFORCE · ACBSP)</span>
                </div>
              </div>

              {/* Métricas Heredadas en 4 Grandes Paneles Ejecutivos */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                <div className="p-5 rounded-xl bg-zinc-50 border border-zinc-200 shadow-sm">
                  <div className="flex justify-between items-center text-xs font-mono font-semibold text-zinc-600 uppercase mb-2">
                    <span>Caja en Tesorería</span>
                    <span className="w-2 h-2 rounded-full bg-tweed" />
                  </div>
                  <div className="text-3xl font-serif font-black text-zinc-950 tabular-nums">
                    {formatCurrency(currentStory.initialState.cashStarting)}
                  </div>
                  <p className="text-xs text-zinc-500 mt-2">Liquidez líquida disponible sin préstamos</p>
                </div>

                <div className="p-5 rounded-xl bg-zinc-50 border border-zinc-200 shadow-sm">
                  <div className="flex justify-between items-center text-xs font-mono font-semibold text-zinc-600 uppercase mb-2">
                    <span>Stock en Bodega</span>
                    <span className="w-2 h-2 rounded-full bg-denim" />
                  </div>
                  <div className="text-3xl font-serif font-black text-denim tabular-nums">
                    {currentStory.initialState.inventoryStartingUnits.toLocaleString()} uds
                  </div>
                  <p className="text-xs text-zinc-500 mt-2">Corbatas terminadas remanentes del periodo previo</p>
                </div>

                <div className="p-5 rounded-xl bg-zinc-50 border border-zinc-200 shadow-sm">
                  <div className="flex justify-between items-center text-xs font-mono font-semibold text-zinc-600 uppercase mb-2">
                    <span>Capacidad Telares</span>
                    <span className="w-2 h-2 rounded-full bg-zinc-700" />
                  </div>
                  <div className="text-3xl font-serif font-black text-zinc-950 tabular-nums">
                    {currentStory.initialState.nominalCapacity.toLocaleString()} uds
                  </div>
                  <p className="text-xs text-zinc-500 mt-2">Capacidad nominal instalada en planta</p>
                </div>

                <div className="p-5 rounded-xl bg-zinc-50 border border-zinc-200 shadow-sm">
                  <div className="flex justify-between items-center text-xs font-mono font-semibold text-zinc-600 uppercase mb-2">
                    <span>Valor Compañía</span>
                    <span className="w-2 h-2 rounded-full bg-brass-DEFAULT" />
                  </div>
                  <div className="text-3xl font-serif font-black text-brass-dark tabular-nums">
                    {currentStory.initialState.inheritedSharePrice.toFixed(1)} <span className="text-sm font-sans font-normal text-zinc-500">pts</span>
                  </div>
                  <p className="text-xs text-zinc-600 font-semibold mt-2">Posición #{currentStory.initialState.inheritedRank} de 7 firmas</p>
                </div>
              </div>

              {/* Contexto Estratégico y Desafío Crítico */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="p-6 rounded-xl bg-zinc-50 border border-zinc-200 space-y-2">
                  <span className="text-xs font-mono uppercase tracking-widest font-bold text-zinc-700 block">
                    Contexto del Mercado Textil:
                  </span>
                  <p className="text-xs sm:text-sm text-zinc-800 leading-relaxed font-sans">
                    {currentStory.initialState.diagnosticContext}
                  </p>
                </div>

                <div className="p-6 rounded-xl bg-amber-50/80 border-2 border-brass-DEFAULT/60 space-y-2">
                  <span className="text-xs font-mono uppercase tracking-widest font-bold text-amber-950 block">
                    Desafío Crítico a Resolver en Esta Ronda:
                  </span>
                  <p className="text-xs sm:text-sm text-zinc-950 font-serif font-bold leading-relaxed">
                    {currentStory.initialState.criticalChallenge}
                  </p>
                </div>
              </div>

              {/* BOTÓN DE ALTO IMPACTO: EJECUTAR SIMULACIÓN */}
              <div className="pt-6 border-t border-zinc-200 flex flex-col items-center justify-center space-y-3">
                <button
                  onClick={handleExecuteSimulation}
                  className="w-full sm:w-auto px-10 py-5 rounded-xl bg-gradient-to-r from-brass-DEFAULT via-amber-500 to-amber-600 text-vintage-950 font-serif font-black text-base sm:text-lg hover:brightness-110 active:scale-98 transition-all shadow-xl ring-4 ring-brass-light flex items-center justify-center gap-3 cursor-pointer group"
                >
                  <span className="text-xl group-hover:scale-125 transition-transform">▶</span>
                  <span className="tracking-wide">EJECUTAR SIMULACIÓN CON DECISIONES</span>
                  <span className="font-sans text-xl group-hover:translate-x-1 transition-transform">➔</span>
                </button>
                <p className="text-xs font-mono text-zinc-500 text-center">
                  Procesa la hoja de decisiones de corte, telares y precios contra los algoritmos del simulador Corbatul
                </p>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* ESTADO 2: ANIMACIÓN CINEMÁTICA DE EJECUCIÓN                                */}
          {/* ========================================================================= */}
          {simulationState === 'simulating' && (
            <div className="bg-gradient-to-b from-vintage-950 via-vintage-900 to-vintage-950 border border-vintage-800 rounded-2xl p-12 sm:p-20 shadow-2xl flex flex-col items-center justify-center text-center space-y-8 min-h-[460px] animate-pulse">
              {/* Spinner / Radar de Simulación */}
              <div className="relative w-24 h-24 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-4 border-brass-DEFAULT/20" />
                <div className="absolute inset-0 rounded-full border-4 border-brass-DEFAULT border-t-transparent animate-spin" />
                <span className="font-serif font-black text-brass-DEFAULT text-xl">C</span>
              </div>

              {/* Mensajes de Simulación */}
              <div className="space-y-2 max-w-md">
                <span className="px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest font-bold bg-brass-dark/40 text-brass-DEFAULT border border-brass-DEFAULT/40">
                  Simulando Periodo {selectedPeriod}
                </span>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-white transition-all">
                  {simStepText}
                </h3>
                <p className="text-xs text-vintage-300 font-mono">
                  Calculando interacciones de 5 firmas textiles en el mercado Corbatul...
                </p>
              </div>

              {/* Barra de Progreso */}
              <div className="w-full max-w-md bg-vintage-850 rounded-full h-3 overflow-hidden border border-vintage-700/80">
                <div
                  className="bg-gradient-to-r from-brass-DEFAULT to-amber-500 h-full rounded-full transition-all duration-300"
                  style={{ width: `${simProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* ESTADO 3: PANTALLA DIVIDIDA (DECISIONES A LA IZQUIERDA vs RESULTADOS DER.)  */}
          {/* ========================================================================= */}
          {simulationState === 'executed' && (
            <div className="space-y-6 animate-fadeIn w-full">
              {/* Barra de Control Post-Simulación */}
              <div className="bg-white border border-zinc-200 rounded-xl p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-tweed" />
                  <div>
                    <span className="text-xs uppercase font-mono font-bold text-zinc-500 block">
                      Simulación Completada con Éxito
                    </span>
                    <h4 className="font-serif font-bold text-base text-zinc-950">
                      Balance Causal Periodo {selectedPeriod}: Decisiones vs. Resultados
                    </h4>
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                  <button
                    onClick={() => setSimulationState('diagnosis')}
                    className="px-4 py-2 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-800 font-mono text-xs font-bold transition-all border border-zinc-300 flex items-center gap-1.5"
                  >
                    <span>↺</span>
                    <span>Ver Diagnóstico de Nuevo</span>
                  </button>

                  {hasNextPeriod && (
                    <button
                      onClick={() => onSelectPeriod(selectedPeriod + 1)}
                      className="px-5 py-2.5 rounded-lg bg-zinc-900 text-white font-serif font-bold text-xs hover:bg-zinc-800 transition-all shadow-md flex items-center gap-2"
                    >
                      <span>Avanzar al Periodo {selectedPeriod + 1}</span>
                      <span className="font-sans text-sm">➔</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Grid 50% - 50%: Decisiones a la Izquierda | Resultados a la Derecha */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch w-full">
                
                {/* ------------------------------------------------------------- */}
                {/* COLUMNA IZQUIERDA: LAS DECISIONES QUE SE TOMARON              */}
                {/* ------------------------------------------------------------- */}
                <div className="bg-white border-2 border-brass-DEFAULT rounded-2xl shadow-md p-6 flex flex-col justify-between space-y-6 ring-1 ring-brass-light/40">
                  <div>
                    {/* Header Columna Izquierda */}
                    <div className="pb-4 border-b border-zinc-200 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <span className="w-7 h-7 rounded-full bg-brass-dark text-white flex items-center justify-center text-xs font-serif font-black shadow-sm">
                          D
                        </span>
                        <div>
                          <h3 className="font-serif font-black text-lg text-zinc-950 uppercase tracking-wide">
                            Decisiones Tomadas
                          </h3>
                          <span className="text-xs text-zinc-500 font-mono">Hoja Enviada en Periodo {selectedPeriod}</span>
                        </div>
                      </div>
                      <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-brass-DEFAULT/20 text-zinc-950 border border-brass-DEFAULT/40">
                        {currentStory.decisions.production.plantShifts} {currentStory.decisions.production.plantShifts === 1 ? 'Turno' : 'Turnos'}
                      </span>
                    </div>

                    <div className="mt-5 space-y-5 text-xs">
                      {/* Eje 1: Comercial & Precios */}
                      <div className="p-4 bg-zinc-50 rounded-xl border border-zinc-200">
                        <div className="flex items-center justify-between mb-2.5">
                          <span className="font-serif font-bold text-zinc-950 text-sm">1. Comercial & Precios</span>
                          <span className="font-mono text-xs text-zinc-700 font-bold">{currentStory.decisions.commercial.salesForceCount} Vendedores</span>
                        </div>
                        <div className="grid grid-cols-3 gap-2.5 text-center mb-2.5 font-mono">
                          <div className="bg-white p-2.5 rounded-lg border border-zinc-200">
                            <span className="text-xs text-zinc-500 block font-sans">Corbatas</span>
                            <span className="font-bold text-zinc-950 text-base tabular-nums">{currentStory.decisions.commercial.priceStandard.toFixed(2)} €</span>
                          </div>
                          <div className="bg-white p-2.5 rounded-lg border border-zinc-200">
                            <span className="text-xs text-zinc-500 block font-sans">Bufandas</span>
                            <span className="font-bold text-zinc-950 text-base tabular-nums">{currentStory.decisions.commercial.pricePremium.toFixed(2)} €</span>
                          </div>
                          <div className="bg-white p-2.5 rounded-lg border border-zinc-200">
                            <span className="text-xs text-zinc-500 block font-sans">Promoción</span>
                            <span className="font-bold text-zinc-950 text-base tabular-nums">{(currentStory.decisions.commercial.marketingBudget / 1000).toFixed(0)}k €</span>
                          </div>
                        </div>
                        <p className="text-xs text-zinc-700 italic">
                          &ldquo;{currentStory.decisions.commercial.commercialRationale}&rdquo;
                        </p>
                      </div>

                      {/* Eje 2: Confección & Capacidad */}
                      <div className="p-4 bg-zinc-50 rounded-xl border border-zinc-200">
                        <div className="flex items-center justify-between mb-2.5">
                          <span className="font-serif font-bold text-zinc-950 text-sm">2. Confección & Telares</span>
                          <span className="text-xs font-mono text-zinc-700">Mantenim: ${(currentStory.decisions.production.maintenanceBudget / 1000).toFixed(0)}k</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2.5 text-center mb-2.5 font-mono">
                          <div className="bg-white p-2.5 rounded-lg border border-zinc-200">
                            <span className="text-xs text-zinc-500 block font-sans">Corbatas</span>
                            <span className="font-bold text-zinc-950 text-base tabular-nums">{currentStory.decisions.production.ordersStandard.toLocaleString()} uds</span>
                          </div>
                          <div className="bg-white p-2.5 rounded-lg border border-zinc-200">
                            <span className="text-xs text-zinc-500 block font-sans">Bufandas</span>
                            <span className="font-bold text-zinc-950 text-base tabular-nums">{currentStory.decisions.production.ordersPremium.toLocaleString()} uds</span>
                          </div>
                        </div>
                        {currentStory.decisions.production.plantExpansionUnits > 0 && (
                          <div className="mb-2 p-2 bg-emerald-50 border border-emerald-400 rounded-lg text-center text-emerald-950 font-mono font-bold text-xs">
                            AMPLIACIÓN CAPACIDAD: +{currentStory.decisions.production.plantExpansionUnits.toLocaleString()} uds (CAPEX)
                          </div>
                        )}
                        <p className="text-xs text-zinc-700 italic">
                          &ldquo;{currentStory.decisions.production.productionRationale}&rdquo;
                        </p>
                      </div>

                      {/* Eje 3 & 4: Abastecimiento y Finanzas */}
                      <div className="grid grid-cols-2 gap-3">
                        <div className="p-3 bg-zinc-50 rounded-lg border border-zinc-200">
                          <span className="font-serif font-bold text-zinc-950 block text-xs mb-1">3. Abastecimiento</span>
                          <div className="text-xs font-mono text-zinc-800">
                            Corbatas: {currentStory.decisions.sourcing.rawMaterialStandard.toLocaleString()} uds<br />
                            Bufandas: {currentStory.decisions.sourcing.rawMaterialPremium.toLocaleString()} uds
                          </div>
                        </div>
                        <div className="p-3 bg-zinc-50 rounded-lg border border-zinc-200">
                          <span className="font-serif font-bold text-zinc-950 block text-xs mb-1">4. Tesorería</span>
                          <div className="text-xs font-mono text-zinc-800">
                            Préstamo: {currentStory.decisions.finance.shortTermLoan.toLocaleString()} €<br />
                            Dividendo: {(currentStory.decisions.finance.dividendPayout * 100).toFixed(0)}%
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Hipótesis Estratégica del Equipo */}
                  <div className="p-4 bg-amber-50/90 border-2 border-brass-DEFAULT rounded-xl shadow-sm">
                    <span className="text-xs uppercase font-mono font-bold text-amber-950 block mb-1">
                      Hipótesis Estratégica Formulada:
                    </span>
                    <p className="text-xs sm:text-sm text-zinc-950 font-serif font-bold leading-relaxed">
                      &ldquo;{currentStory.decisions.strategicHypothesis}&rdquo;
                    </p>
                  </div>
                </div>

                {/* ------------------------------------------------------------- */}
                {/* COLUMNA DERECHA: LOS RESULTADOS & IMPACTO CAUSAL              */}
                {/* ------------------------------------------------------------- */}
                <div className="bg-white border-2 border-tweed rounded-2xl shadow-md p-6 flex flex-col justify-between space-y-6 ring-1 ring-tweed-light">
                  <div>
                    {/* Header Columna Derecha */}
                    <div className="pb-4 border-b border-zinc-200 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <span className="w-7 h-7 rounded-full bg-tweed text-white flex items-center justify-center text-xs font-serif font-black shadow-sm">
                          R
                        </span>
                        <div>
                          <h3 className="font-serif font-black text-lg text-zinc-950 uppercase tracking-wide">
                            Resultados Obtenidos
                          </h3>
                          <span className="text-xs text-tweed-dark font-mono font-bold">Consecuencias de Mercado & P&L</span>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold ${
                        currentStory.consequences.operationalImpact.stockoutOccurred
                          ? 'bg-rust-light text-rust border border-rust/40'
                          : 'bg-tweed-light text-tweed-dark border border-tweed/40'
                      }`}>
                        {currentStory.consequences.operationalImpact.stockoutOccurred
                          ? `Quiebre: ${currentStory.consequences.operationalImpact.stockoutUnits.toLocaleString()} uds`
                          : '100% Surtido'}
                      </span>
                    </div>

                    <div className="mt-5 space-y-5 text-xs">
                      {/* Resumen Hero de Valor y Cuota */}
                      <div className="p-4 bg-zinc-950 text-white rounded-xl border border-zinc-800 shadow-md flex items-center justify-between">
                        <div>
                          <span className="text-xs uppercase font-mono text-zinc-400 block">Valor Compañía</span>
                          <div className="text-3xl font-serif font-black text-brass-DEFAULT tabular-nums">
                            {currentStory.consequences.competitiveImpact.endingSharePrice.toFixed(1)} <span className="text-xs font-sans text-zinc-400">pts</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-xs uppercase font-mono text-zinc-400 block">Variación Ronda</span>
                          <span className="text-lg font-serif font-bold text-tweed-light tabular-nums">
                            {currentStory.consequences.competitiveImpact.sharePriceDelta >= 0 ? '+' : ''}{currentStory.consequences.competitiveImpact.sharePriceDelta.toFixed(1)} pts
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-xs uppercase font-mono text-zinc-400 block">Cuota Mercado</span>
                          <span className="text-lg font-serif font-bold text-zinc-100 tabular-nums">
                            {(currentStory.consequences.competitiveImpact.marketShare * 100).toFixed(1)}%
                          </span>
                        </div>
                      </div>

                      {/* Veredicto Operativo */}
                      <div className="p-4 bg-zinc-50 rounded-xl border border-zinc-200">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-serif font-bold text-zinc-950 text-sm">Veredicto Operativo</span>
                          <span className="font-mono text-xs text-zinc-600">
                            Uso Telar: <strong className="text-zinc-900">{currentStory.consequences.operationalImpact.utilizationRate}%</strong>
                          </span>
                        </div>
                        <p className="text-xs text-zinc-800 leading-relaxed font-sans">
                          {currentStory.consequences.operationalImpact.operationalVerdict}
                        </p>
                      </div>

                      {/* Veredicto Financiero (P&L) */}
                      <div className="p-4 bg-zinc-50 rounded-xl border border-zinc-200">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-serif font-bold text-zinc-950 text-sm">Veredicto Financiero (P&L)</span>
                          <span className="font-mono text-sm font-bold text-tweed-dark tabular-nums">
                            Utilidad: {formatCurrency(currentStory.consequences.financialImpact.netIncome)}
                          </span>
                        </div>
                        <p className="text-xs text-zinc-800 leading-relaxed font-sans">
                          {currentStory.consequences.financialImpact.financialVerdict}
                        </p>
                        <div className="mt-3 pt-2.5 border-t border-zinc-200 text-xs font-mono text-zinc-700 flex justify-between tabular-nums">
                          <span>Margen Bruto: <strong>{formatPercent(currentStory.consequences.financialImpact.grossMargin)}</strong></span>
                          <span>Caja Final: <strong>{formatCurrency(currentStory.consequences.financialImpact.endingCash)}</strong></span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Lección Aprendida para la Siguiente Ronda */}
                  <div className="p-4 bg-zinc-100 rounded-xl border-l-4 border-zinc-900">
                    <span className="text-xs uppercase font-mono font-bold text-zinc-900 block mb-1">
                      Lección para la Siguiente Ronda:
                    </span>
                    <p className="text-xs sm:text-sm text-zinc-900 leading-relaxed font-sans">
                      {currentStory.consequences.lessonsLearned}
                    </p>
                  </div>
                </div>

              </div>
            </div>
          )}
        </div>
      ) : (
        /* Matrix View: All 8 Periods Decision Table */
        <div className="bg-white border border-zinc-200 rounded-xl shadow-sm overflow-hidden w-full">
          <div className="p-4 bg-zinc-50 border-b border-zinc-200 flex justify-between items-center">
            <div>
              <h3 className="font-serif font-bold text-sm text-zinc-950">
                Matriz Comparativa de Decisiones Corbatul (Periodo 1 al 8)
              </h3>
              <p className="text-xs text-zinc-600">
                Historial completo de parámetros enviados en cada ronda de la simulación.
              </p>
            </div>
            <span className="text-xs font-mono uppercase bg-zinc-100 px-3 py-1 rounded border border-zinc-200 text-zinc-800 font-bold">
              Firma 3 - Sideral Textil
            </span>
          </div>

          <div className="overflow-x-auto w-full">
            <table className="w-full text-xs text-left">
              <thead className="bg-zinc-100 text-zinc-800 uppercase font-mono text-[11px] border-b border-zinc-200 font-semibold">
                <tr>
                  <th className="py-3 px-3">Periodo / Año</th>
                  <th className="py-3 px-3">Tema Estratégico</th>
                  <th className="py-3 px-3 text-right">Precio Corbatas</th>
                  <th className="py-3 px-3 text-right">Precio Bufandas</th>
                  <th className="py-3 px-3 text-center">Turnos</th>
                  <th className="py-3 px-3 text-right">Promoción</th>
                  <th className="py-3 px-3 text-right">Diseño & I+D</th>
                  <th className="py-3 px-3 text-center">Ampliación</th>
                  <th className="py-3 px-3 text-right">Resultado Neto</th>
                  <th className="py-3 px-3 text-right">Valor Compañía</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200">
                {dataset.decisionStories?.map(s => {
                  const isSelected = s.period === selectedPeriod;
                  return (
                    <tr
                      key={s.period}
                      onClick={() => onSelectPeriod(s.period)}
                      className={`cursor-pointer transition-colors hover:bg-zinc-50 ${
                        isSelected ? 'bg-amber-50/70 font-semibold border-l-4 border-brass-DEFAULT' : ''
                      }`}
                    >
                      <td className="py-3 px-3 font-serif font-bold text-zinc-950 text-sm">
                        P{s.period} ({2025 + s.period})
                      </td>
                      <td className="py-3 px-3 font-sans text-zinc-900 max-w-xs truncate">
                        {s.roundTitle}
                      </td>
                      <td className="py-3 px-3 text-right font-mono text-zinc-900 tabular-nums">{s.decisions.commercial.priceStandard.toFixed(2)} €</td>
                      <td className="py-3 px-3 text-right font-mono text-zinc-900 tabular-nums">{s.decisions.commercial.pricePremium.toFixed(2)} €</td>
                      <td className="py-3 px-3 text-center">
                        <span className="px-2 py-0.5 rounded text-xs font-mono bg-zinc-200 font-bold text-zinc-900">
                          {s.decisions.production.plantShifts}T
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right font-mono text-zinc-900 tabular-nums">{(s.decisions.commercial.marketingBudget / 1000).toFixed(0)}k €</td>
                      <td className="py-3 px-3 text-right font-mono text-zinc-900 tabular-nums">{(s.decisions.production.qualityControlBudget / 1000).toFixed(0)}k €</td>
                      <td className="py-3 px-3 text-center">
                        {s.decisions.production.plantExpansionUnits > 0 ? (
                          <span className="px-2 py-0.5 rounded text-xs bg-emerald-100 text-emerald-950 font-bold font-mono">
                            +CAPEX
                          </span>
                        ) : (
                          <span className="text-zinc-400">-</span>
                        )}
                      </td>
                      <td className="py-3 px-3 text-right font-mono text-tweed-dark font-bold tabular-nums">
                        {formatCurrency(s.consequences.financialImpact.netIncome)}
                      </td>
                      <td className="py-3 px-3 text-right font-serif font-black text-zinc-950 text-sm tabular-nums">
                        {s.consequences.competitiveImpact.endingSharePrice.toFixed(1)} pts
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
