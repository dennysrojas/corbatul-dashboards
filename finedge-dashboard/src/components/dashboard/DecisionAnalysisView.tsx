'use client';

import React, { useState, useEffect } from 'react';
import { SimulationDataset, RoundDecisionStory } from '../../types/corbatul';
import { 
  Play, 
  RotateCcw, 
  ArrowRight, 
  Compass, 
  Layers, 
  TrendingUp, 
  CheckCircle2, 
  AlertTriangle,
  Lightbulb,
  Zap,
  Sliders,
  DollarSign,
  Factory,
  Landmark,
  ShieldAlert,
  Calendar,
  Sparkles,
  BarChart3,
  ChevronRight
} from 'lucide-react';

interface DecisionAnalysisViewProps {
  dataset: SimulationDataset;
  selectedPeriod: number;
  onSelectPeriod: (period: number) => void;
}

type ImpactTab = 'operations' | 'finance' | 'market' | 'lessons';

export const DecisionAnalysisView: React.FC<DecisionAnalysisViewProps> = ({
  dataset,
  selectedPeriod,
  onSelectPeriod
}) => {
  const [viewMode, setViewMode] = useState<'canvas' | 'timeline'>('canvas');
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simStep, setSimStep] = useState<number>(0);
  const [isExecuted, setIsExecuted] = useState<boolean>(false); // Starts HIDDEN until user executes
  const [activeImpactTab, setActiveImpactTab] = useState<ImpactTab>('operations');

  useEffect(() => {
    // When switching period, reset executed state so user must click Execute to see Phase 3
    setIsSimulating(false);
    setSimStep(0);
    setIsExecuted(false);
  }, [selectedPeriod]);

  const currentStory: RoundDecisionStory | undefined = dataset.decisionStories?.find(
    s => s.period === selectedPeriod
  );

  const formatCurrency = (val: number) => `${Math.round(val).toLocaleString()} €`;
  const formatPercent = (val: number) => `${val.toFixed(1)}%`;

  if (!currentStory) return null;

  const handleRunSimulation = () => {
    setIsSimulating(true);
    setIsExecuted(false);
    setSimStep(1);

    const s1 = setTimeout(() => setSimStep(2), 350);
    const s2 = setTimeout(() => setSimStep(3), 700);
    const s3 = setTimeout(() => setSimStep(4), 1050);
    const sDone = setTimeout(() => {
      setIsSimulating(false);
      setIsExecuted(true);
    }, 1350);

    return () => {
      clearTimeout(s1);
      clearTimeout(s2);
      clearTimeout(s3);
      clearTimeout(sDone);
    };
  };

  const hasNextPeriod = selectedPeriod < dataset.periods.length;
  const hasPrevPeriod = selectedPeriod > 1;

  const simSteps = [
    { num: 1, label: 'Parámetros Comerciales' },
    { num: 2, label: 'Absorción de Mercado' },
    { num: 3, label: 'Cálculo Fabril & P&L' },
    { num: 4, label: 'Valor de Empresa' },
  ];

  return (
    <div className="space-y-6 w-full">
      {/* 1. TOP STRATEGIC DOSSIER HEADER */}
      <div className="bg-white border border-mineral/40 rounded-2xl p-6 sm:p-7 shadow-minimal">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-5">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded text-[11px] font-mono tracking-wider uppercase font-semibold bg-blush/30 text-rosewood-dark border border-blush/50">
                PuntoOne · FINEDGE
              </span>
              <span className="px-2.5 py-0.5 rounded text-xs font-mono font-medium bg-mineral-100 text-slate-steel">
                Ronda {selectedPeriod} de {dataset.periods.length} ({2025 + selectedPeriod})
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-sans font-bold tracking-tight text-slate-steel">
              {currentStory.roundTitle}
            </h2>
            <div className="flex items-center gap-2 text-xs font-mono text-slate-steel/70 pt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-rosewood shrink-0" />
              <span>Eje Estratégico: &ldquo;{currentStory.strategicTheme}&rdquo;</span>
            </div>
          </div>

          {/* View Mode Toggle: Interactive Canvas vs 4-Year Timeline */}
          <div className="flex items-center gap-1 bg-mineral-100/70 p-1 rounded-xl border border-mineral/40">
            <button
              onClick={() => setViewMode('canvas')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center gap-1.5 ${
                viewMode === 'canvas'
                  ? 'bg-white text-slate-steel font-bold shadow-sm'
                  : 'text-slate-steel/60 hover:text-slate-steel'
              }`}
            >
              <Sliders className="w-3.5 h-3.5 text-rosewood" />
              <span>Lienzo Causal Activo</span>
            </button>
            <button
              onClick={() => setViewMode('timeline')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center gap-1.5 ${
                viewMode === 'timeline'
                  ? 'bg-white text-slate-steel font-bold shadow-sm'
                  : 'text-slate-steel/60 hover:text-slate-steel'
              }`}
            >
              <Calendar className="w-3.5 h-3.5 text-slate-steel" />
              <span>Auditoría Histórica 2026-2029</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. ALTERNATIVE VIEW: 4-YEAR ACCORDION TIMELINE */}
      {viewMode === 'timeline' ? (
        <div className="space-y-4">
          <div className="flex justify-between items-center px-1">
            <h3 className="text-sm font-mono uppercase tracking-wider font-bold text-slate-steel">
              Trayectoria Estratégica Completa (2026 a 2029)
            </h3>
            <span className="text-xs font-mono text-slate-steel/60">4 Rondas Simuladas</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {dataset.periods.map(p => {
              const story = dataset.decisionStories?.find(s => s.period === p);
              const fin = dataset.financials.find(f => f.period === p && f.firmId === 'puntoone');
              const comp = dataset.competitors.find(c => c.period === p && c.firmId === 'puntoone');
              const isCurrent = p === selectedPeriod;

              if (!story || !fin || !comp) return null;

              return (
                <div 
                  key={p}
                  onClick={() => { onSelectPeriod(p); setViewMode('canvas'); }}
                  className={`bg-white border rounded-2xl p-5 shadow-minimal cursor-pointer transition-all hover:border-slate-steel/40 flex flex-col justify-between ${
                    isCurrent ? 'border-rosewood ring-2 ring-rosewood/20' : 'border-mineral/40'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex justify-between items-center border-b border-mineral/30 pb-2">
                      <span className="text-xs font-mono font-bold text-slate-steel">
                        P{p} · {2025 + p}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-blush/30 text-rosewood-dark">
                        #{comp.rankBySharePrice} de 7
                      </span>
                    </div>

                    <h4 className="text-sm font-sans font-bold text-slate-steel leading-snug">
                      {story.roundTitle}
                    </h4>

                    <p className="text-[11px] text-slate-steel/70 font-sans line-clamp-2">
                      {story.strategicTheme}
                    </p>

                    <div className="pt-2 border-t border-mineral/30 space-y-1.5 text-xs font-mono">
                      <div className="flex justify-between text-slate-steel/70">
                        <span>Ingresos:</span>
                        <strong className="text-slate-steel">{formatCurrency(fin.totalRevenue)}</strong>
                      </div>
                      <div className="flex justify-between text-slate-steel/70">
                        <span>Margen Bruto:</span>
                        <strong className="text-slate-steel">{formatPercent(fin.grossMargin * 100)}</strong>
                      </div>
                      <div className="flex justify-between text-slate-steel/70">
                        <span>Resultado Neto:</span>
                        <strong className={fin.netIncome >= 0 ? 'text-rosewood font-bold' : 'text-slate-steel/60'}>
                          {formatCurrency(fin.netIncome)}
                        </strong>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-mineral/30 flex items-center justify-between">
                    <div>
                      <span className="text-[9px] uppercase font-mono text-slate-steel/50 block">Valor Firma</span>
                      <span className="text-base font-mono font-bold text-rosewood">{comp.sharePrice.toFixed(1)} pts</span>
                    </div>
                    <span className="text-xs font-mono text-slate-steel/70 flex items-center gap-1 hover:text-slate-steel">
                      <span>Ver lienzo</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* 3. ACTIVE STRATEGIC CANVAS */
        <div className="space-y-6">
          {/* TIER 1: EL MANDATO & CONTEXTO HEREDADO */}
          <div className="bg-white border border-mineral/40 rounded-2xl p-6 shadow-minimal space-y-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 border-b border-mineral/30 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-slate-steel" />
                <h3 className="text-xs font-mono uppercase tracking-wider font-bold text-slate-steel">
                  Fase 1: Diagnóstico de Situación & Mandato de la Ronda
                </h3>
              </div>
              <div className="flex items-center gap-3 text-xs font-mono">
                <span className="text-slate-steel/60">Caja: <strong className="text-slate-steel">{formatCurrency(currentStory.initialState.cashStarting)}</strong></span>
                <span className="text-slate-steel/40">•</span>
                <span className="text-slate-steel/60">Capacidad: <strong className="text-slate-steel">{currentStory.initialState.nominalCapacity.toLocaleString()} uds</strong></span>
                <span className="text-slate-steel/40">•</span>
                <span className="text-slate-steel/60">Valor Base: <strong className="text-rosewood">{currentStory.initialState.inheritedSharePrice.toFixed(1)} pts</strong></span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-mineral-50/60 border border-mineral/30">
                <div className="text-[10px] uppercase font-mono tracking-wider font-semibold text-slate-steel/60 mb-1">
                  Contexto Heredado del Mercado
                </div>
                <p className="text-xs text-slate-steel/80 leading-relaxed font-sans">
                  {currentStory.initialState.diagnosticContext}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-blush/20 border border-blush/40">
                <div className="text-[10px] uppercase font-mono tracking-wider font-bold text-rosewood mb-1 flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-rosewood" />
                  <span>Desafío Crítico a Resolver</span>
                </div>
                <p className="text-xs text-slate-steel/90 leading-relaxed font-sans">
                  {currentStory.initialState.criticalChallenge}
                </p>
              </div>
            </div>
          </div>

          {/* TIER 2: LAS 3 PALANCAS ESTRATÉGICAS (3 HORIZONTAL CARDS) */}
          <div className="space-y-3">
            <div className="flex justify-between items-center px-1">
              <h3 className="text-xs font-mono uppercase tracking-wider font-bold text-slate-steel flex items-center gap-2">
                <Sliders className="w-3.5 h-3.5 text-slate-steel" />
                <span>Fase 2: Las 3 Palancas de Decisión Adoptadas</span>
              </h3>
              <span className="text-[11px] font-mono text-slate-steel/60">
                Configuración Paramétrica Oficial
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Palanca 1: Comercial & Precios */}
              <div className="bg-white border border-mineral/40 rounded-2xl p-5 shadow-minimal space-y-3 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-mineral/30 pb-2">
                    <span className="text-xs font-mono font-bold text-slate-steel flex items-center gap-1.5">
                      <DollarSign className="w-3.5 h-3.5 text-rosewood" />
                      <span>Palanca Comercial</span>
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-mineral-100 text-slate-steel font-medium">
                      Mkt: {formatCurrency(currentStory.decisions.commercial.marketingBudget)}
                    </span>
                  </div>

                  <div className="space-y-2 text-xs font-mono">
                    <div className="p-2 rounded-lg bg-mineral-50/70 border border-mineral/30 flex justify-between items-center">
                      <span className="text-slate-steel/70">👔 Corbatas</span>
                      <strong className="text-slate-steel">{currentStory.decisions.commercial.priceStandard.toFixed(2)} €</strong>
                    </div>
                    <div className="p-2 rounded-lg bg-mineral-50/70 border border-mineral/30 flex justify-between items-center">
                      <span className="text-slate-steel/70">🧣 Bufandas</span>
                      <strong className="text-rosewood font-bold">{currentStory.decisions.commercial.pricePremium.toFixed(2)} €</strong>
                    </div>
                    <div className="p-2 rounded-lg bg-mineral-50/70 border border-mineral/30 flex justify-between items-center">
                      <span className="text-slate-steel/70">🧦 Calcetines</span>
                      <strong className="text-slate-steel">{currentStory.decisions.commercial.priceSocks?.toFixed(2) || '2.76'} €</strong>
                    </div>
                  </div>
                </div>

                <p className="text-[11px] text-slate-steel/70 font-sans leading-relaxed pt-2 border-t border-mineral/30">
                  {currentStory.decisions.commercial.commercialRationale}
                </p>
              </div>

              {/* Palanca 2: Industrial & Capacidad */}
              <div className="bg-white border border-mineral/40 rounded-2xl p-5 shadow-minimal space-y-3 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-mineral/30 pb-2">
                    <span className="text-xs font-mono font-bold text-slate-steel flex items-center gap-1.5">
                      <Factory className="w-3.5 h-3.5 text-slate-steel" />
                      <span>Palanca Fabril</span>
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-mineral-100 text-slate-steel font-medium">
                      {currentStory.decisions.production.plantShifts} Turnos
                    </span>
                  </div>

                  <div className="space-y-2 text-xs font-mono">
                    <div className="p-2 rounded-lg bg-mineral-50/70 border border-mineral/30 flex justify-between items-center">
                      <span className="text-slate-steel/70">Órdenes Corbatas</span>
                      <strong className="text-slate-steel">{currentStory.decisions.production.ordersStandard.toLocaleString()}</strong>
                    </div>
                    <div className="p-2 rounded-lg bg-mineral-50/70 border border-mineral/30 flex justify-between items-center">
                      <span className="text-slate-steel/70">Órdenes Bufandas</span>
                      <strong className="text-rosewood font-bold">{currentStory.decisions.production.ordersPremium.toLocaleString()}</strong>
                    </div>
                    <div className="p-2 rounded-lg bg-mineral-50/70 border border-mineral/30 flex justify-between items-center">
                      <span className="text-slate-steel/70">Órdenes Calcetines</span>
                      <strong className="text-slate-steel">{currentStory.decisions.production.ordersSocks?.toLocaleString() || '33,000'}</strong>
                    </div>
                  </div>
                </div>

                <p className="text-[11px] text-slate-steel/70 font-sans leading-relaxed pt-2 border-t border-mineral/30">
                  {currentStory.decisions.production.productionRationale}
                </p>
              </div>

              {/* Palanca 3: Solvencia & Tesorería */}
              <div className="bg-white border border-mineral/40 rounded-2xl p-5 shadow-minimal space-y-3 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-mineral/30 pb-2">
                    <span className="text-xs font-mono font-bold text-slate-steel flex items-center gap-1.5">
                      <Landmark className="w-3.5 h-3.5 text-slate-steel" />
                      <span>Palanca Financiera</span>
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-mineral-100 text-rosewood-dark font-medium">
                      Deuda: 0 €
                    </span>
                  </div>

                  <div className="space-y-2 text-xs font-mono">
                    <div className="p-2 rounded-lg bg-mineral-50/70 border border-mineral/30 flex justify-between items-center">
                      <span className="text-slate-steel/70">Amortización LP</span>
                      <strong className="text-rosewood font-bold">{formatCurrency(currentStory.decisions.finance.debtRepayment)}</strong>
                    </div>
                    <div className="p-2 rounded-lg bg-mineral-50/70 border border-mineral/30 flex justify-between items-center">
                      <span className="text-slate-steel/70">Préstamos Nuevos</span>
                      <strong className="text-slate-steel">0 € (Autofinanciado)</strong>
                    </div>
                    <div className="p-2 rounded-lg bg-mineral-50/70 border border-mineral/30 flex justify-between items-center">
                      <span className="text-slate-steel/70">Dividendos</span>
                      <strong className="text-slate-steel">0% (Reinversión 100%)</strong>
                    </div>
                  </div>
                </div>

                <p className="text-[11px] text-slate-steel/70 font-sans leading-relaxed pt-2 border-t border-mineral/30">
                  {currentStory.decisions.finance.financeRationale}
                </p>
              </div>
            </div>

            {/* Strategic Hypothesis Banner */}
            <div className="p-4 rounded-xl bg-blush/20 border border-blush/40 flex items-center gap-3">
              <Lightbulb className="w-5 h-5 text-rosewood shrink-0" />
              <div className="text-xs font-sans text-slate-steel/90 leading-relaxed">
                <strong className="font-mono text-rosewood-dark block text-[11px] uppercase tracking-wider">
                  Hipótesis Estratégica Formulada para la Ronda
                </strong>
                &ldquo;{currentStory.decisions.strategicHypothesis}&rdquo;
              </div>
            </div>
          </div>

          {/* TIER 3: SIMULATION EXECUTION PIPELINE */}
          <div className="bg-white border border-mineral/40 rounded-2xl p-5 shadow-minimal">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 w-full md:w-auto">
                <button
                  onClick={handleRunSimulation}
                  disabled={isSimulating}
                  className={`w-full md:w-auto px-6 py-3 rounded-xl font-mono font-bold text-xs tracking-wider uppercase transition-all shadow-sm flex items-center justify-center gap-2 ${
                    isSimulating
                      ? 'bg-mineral-200 text-slate-steel cursor-wait'
                      : isExecuted
                      ? 'bg-mineral-100 hover:bg-mineral-200 text-slate-steel border border-mineral/40'
                      : 'bg-slate-steel hover:bg-slate-steel-dark text-white ring-2 ring-slate-steel/20 shadow-md animate-pulse'
                  }`}
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>
                    {isSimulating 
                      ? 'Simulando Algoritmos...' 
                      : isExecuted 
                      ? 'Reejecutar Simulación ➔' 
                      : '▶ EJECUTAR IMPACTO CAUSAL'}
                  </span>
                </button>
                {isExecuted && (
                  <button
                    onClick={() => setIsExecuted(false)}
                    className="px-3.5 py-3 rounded-xl bg-mineral-50 hover:bg-mineral-100 text-slate-steel/70 hover:text-slate-steel font-mono text-xs transition-colors border border-mineral/30 flex items-center gap-1.5"
                    title="Ocultar Fase 3"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Ocultar Fase 3</span>
                  </button>
                )}
              </div>

              {/* Progress Pipeline Ribbon */}
              <div className="flex items-center gap-1.5 sm:gap-3 overflow-x-auto w-full md:w-auto">
                {simSteps.map(step => {
                  const isActive = isSimulating ? simStep >= step.num : isExecuted;
                  return (
                    <div 
                      key={step.num}
                      className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[10px] font-mono transition-all whitespace-nowrap ${
                        isActive
                          ? 'bg-blush/30 text-rosewood-dark font-bold border border-blush/50'
                          : 'bg-mineral-50 text-slate-steel/40 border border-mineral/20'
                      }`}
                    >
                      <span className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[9px] ${
                        isActive ? 'bg-rosewood text-white' : 'bg-mineral-300 text-white'
                      }`}>
                        {step.num}
                      </span>
                      <span>{step.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* PLACEHOLDER WHEN FASE 3 IS NOT YET EXECUTED */}
          {!isExecuted && !isSimulating && (
            <div className="bg-mineral-50/70 border border-dashed border-mineral/60 rounded-2xl p-8 text-center space-y-3">
              <div className="w-10 h-10 rounded-full bg-mineral-100 border border-mineral/40 mx-auto flex items-center justify-center text-slate-steel/60">
                <Play className="w-4 h-4 fill-slate-steel/40 ml-0.5" />
              </div>
              <div className="max-w-md mx-auto space-y-1">
                <h4 className="text-sm font-sans font-bold text-slate-steel">
                  Fase 3: Cascada de Consecuencias e Impacto
                </h4>
                <p className="text-xs text-slate-steel/70 font-sans leading-relaxed">
                  Las decisiones de la Ronda {selectedPeriod} están formuladas. Haz clic en <strong className="text-slate-steel font-mono">&ldquo;EJECUTAR IMPACTO CAUSAL&rdquo;</strong> arriba para procesar las órdenes y desplegar los resultados de mercado, P&L y valoración.
                </p>
              </div>
            </div>
          )}

          {/* TIER 4: CASCADA DE CONSECUENCIAS (THE IMPACT WATERFALL - ONLY VISIBLE UPON EXECUTION) */}
          {isExecuted && (
            <div className="bg-white border border-mineral/40 rounded-2xl p-6 sm:p-7 shadow-minimal space-y-6 transition-all duration-500 animate-in fade-in">
              {/* Hero Results Ribbon */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-xs font-mono uppercase tracking-wider font-bold text-slate-steel flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-rosewood" />
                    <span>Fase 3: Cascada de Impacto en Resultados de Gestión</span>
                  </h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blush/30 text-rosewood-dark font-bold">
                    Auditoría Finalizada
                  </span>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-5 rounded-xl bg-mineral-50/70 border border-mineral/30">
                  <div>
                    <span className="text-[10px] uppercase font-mono text-slate-steel/60 font-medium block">Valor Compañía</span>
                    <div className="text-2xl font-mono font-bold text-rosewood mt-0.5 tabular-nums">
                      {currentStory.consequences.competitiveImpact.endingSharePrice.toFixed(1)} <span className="text-xs text-slate-steel/50 font-normal">pts</span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-steel/60">
                      Variación: <strong className="text-slate-steel">{currentStory.consequences.competitiveImpact.sharePriceDelta > 0 ? '+' : ''}{currentStory.consequences.competitiveImpact.sharePriceDelta.toFixed(1)} pts</strong>
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase font-mono text-slate-steel/60 font-medium block">Facturación</span>
                    <div className="text-2xl font-mono font-bold text-slate-steel mt-0.5 tabular-nums">
                      {formatCurrency(currentStory.consequences.financialImpact.totalRevenue)}
                    </div>
                    <span className="text-[10px] font-mono text-slate-steel/60">
                      Margen Bruto: <strong className="text-slate-steel">{formatPercent(currentStory.consequences.financialImpact.grossMargin * 100)}</strong>
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase font-mono text-slate-steel/60 font-medium block">Resultado Neto</span>
                    <div className={`text-2xl font-mono font-bold mt-0.5 tabular-nums ${
                      currentStory.consequences.financialImpact.netIncome >= 0 ? 'text-rosewood' : 'text-slate-steel/60'
                    }`}>
                      {formatCurrency(currentStory.consequences.financialImpact.netIncome)}
                    </div>
                    <span className="text-[10px] font-mono text-slate-steel/60">
                      Margen Neto: <strong className="text-slate-steel">{formatPercent(currentStory.consequences.financialImpact.netMargin * 100)}</strong>
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase font-mono text-slate-steel/60 font-medium block">Posición Mercado</span>
                    <div className="text-2xl font-mono font-bold text-slate-steel mt-0.5 tabular-nums">
                      #{currentStory.consequences.competitiveImpact.marketRank} <span className="text-xs text-slate-steel/50 font-normal">de 7</span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-steel/60">
                      Cuota: <strong className="text-slate-steel">{formatPercent(currentStory.consequences.competitiveImpact.marketShare * 100)}</strong>
                    </span>
                  </div>
                </div>
              </div>

              {/* Tabbed Impact Dossier Explorer */}
              <div className="space-y-4">
                <div className="flex border-b border-mineral/30 gap-2 overflow-x-auto text-xs font-mono">
                  <button
                    onClick={() => setActiveImpactTab('operations')}
                    className={`pb-2.5 px-3 border-b-2 font-medium transition-all ${
                      activeImpactTab === 'operations'
                        ? 'border-rosewood text-rosewood-dark font-bold'
                        : 'border-transparent text-slate-steel/60 hover:text-slate-steel'
                    }`}
                  >
                    1. Veredicto Fabril & Planta
                  </button>
                  <button
                    onClick={() => setActiveImpactTab('finance')}
                    className={`pb-2.5 px-3 border-b-2 font-medium transition-all ${
                      activeImpactTab === 'finance'
                        ? 'border-rosewood text-rosewood-dark font-bold'
                        : 'border-transparent text-slate-steel/60 hover:text-slate-steel'
                    }`}
                  >
                    2. Veredicto Financiero (P&L)
                  </button>
                  <button
                    onClick={() => setActiveImpactTab('market')}
                    className={`pb-2.5 px-3 border-b-2 font-medium transition-all ${
                      activeImpactTab === 'market'
                        ? 'border-rosewood text-rosewood-dark font-bold'
                        : 'border-transparent text-slate-steel/60 hover:text-slate-steel'
                    }`}
                  >
                    3. Dinámica Competitiva
                  </button>
                  <button
                    onClick={() => setActiveImpactTab('lessons')}
                    className={`pb-2.5 px-3 border-b-2 font-medium transition-all ${
                      activeImpactTab === 'lessons'
                        ? 'border-rosewood text-rosewood-dark font-bold'
                        : 'border-transparent text-slate-steel/60 hover:text-slate-steel'
                    }`}
                  >
                    4. Lecciones para la Dirección
                  </button>
                </div>

                {/* Tab 1: Operations */}
                {activeImpactTab === 'operations' && (
                  <div className="p-4 rounded-xl bg-mineral-50/50 border border-mineral/30 space-y-3 text-xs font-mono">
                    <div className="flex justify-between items-center text-slate-steel">
                      <span className="font-bold">Ocupación Fabril Consolidada:</span>
                      <strong className="text-slate-steel text-sm">{currentStory.consequences.operationalImpact.utilizationRate.toFixed(1)}%</strong>
                    </div>
                    <p className="text-xs text-slate-steel/80 font-sans leading-relaxed">
                      {currentStory.consequences.operationalImpact.operationalVerdict}
                    </p>
                    <div className="pt-2 border-t border-mineral/30 flex gap-4 text-[11px] text-slate-steel/70">
                      <span>• Incidencia Horas Extras: <strong>{currentStory.consequences.operationalImpact.overtimeIncidence}</strong></span>
                      <span>• Roturas de Stock: <strong>0 unidades (0.0%)</strong></span>
                    </div>
                  </div>
                )}

                {/* Tab 2: Finance */}
                {activeImpactTab === 'finance' && (
                  <div className="p-4 rounded-xl bg-mineral-50/50 border border-mineral/30 space-y-3 text-xs font-mono">
                    <div className="flex justify-between items-center text-slate-steel">
                      <span className="font-bold">Coste de Ventas (COGS):</span>
                      <strong className="text-slate-steel text-sm">{currentStory.consequences.financialImpact.cogsSummary}</strong>
                    </div>
                    <p className="text-xs text-slate-steel/80 font-sans leading-relaxed">
                      {currentStory.consequences.financialImpact.financialVerdict}
                    </p>
                    <div className="pt-2 border-t border-mineral/30 flex justify-between text-[11px] text-slate-steel/70">
                      <span>Caja al cierre: <strong>{formatCurrency(currentStory.consequences.financialImpact.endingCash)}</strong></span>
                      <span>Margen Bruto: <strong>{formatPercent(currentStory.consequences.financialImpact.grossMargin * 100)}</strong></span>
                    </div>
                  </div>
                )}

                {/* Tab 3: Market */}
                {activeImpactTab === 'market' && (
                  <div className="p-4 rounded-xl bg-mineral-50/50 border border-mineral/30 space-y-3 text-xs font-mono">
                    <div className="flex justify-between items-center text-slate-steel">
                      <span className="font-bold">Respuesta del Ecosistema de 7 Firmas:</span>
                      <strong className="text-rosewood text-sm">Puesto #{currentStory.consequences.competitiveImpact.marketRank}</strong>
                    </div>
                    <p className="text-xs text-slate-steel/80 font-sans leading-relaxed">
                      {currentStory.consequences.competitiveImpact.competitorMovements}
                    </p>
                  </div>
                )}

                {/* Tab 4: Lessons */}
                {activeImpactTab === 'lessons' && (
                  <div className="p-4 rounded-xl bg-blush/20 border border-blush/40 space-y-2">
                    <div className="text-xs font-mono font-bold text-rosewood-dark flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-rosewood" />
                      <span>Conclusión Ejecutiva y Aprendizaje para la Siguiente Ronda</span>
                    </div>
                    <p className="text-xs text-slate-steel/90 font-sans leading-relaxed">
                      {currentStory.consequences.lessonsLearned}
                    </p>
                  </div>
                )}
              </div>

              {/* Bottom Pagination Stepper */}
              <div className="pt-4 border-t border-mineral/30 flex justify-between items-center">
                {hasPrevPeriod ? (
                  <button
                    onClick={() => onSelectPeriod(selectedPeriod - 1)}
                    className="px-3.5 py-1.5 rounded-lg bg-mineral-50 hover:bg-mineral-100 text-slate-steel text-xs font-mono transition-colors border border-mineral/40"
                  >
                    ← Periodo {selectedPeriod - 1} ({2024 + selectedPeriod})
                  </button>
                ) : <div />}

                {hasNextPeriod && (
                  <button
                    onClick={() => onSelectPeriod(selectedPeriod + 1)}
                    className="px-4 py-2 rounded-lg bg-slate-steel hover:bg-slate-steel-dark text-white text-xs font-mono font-semibold transition-colors flex items-center gap-1.5 shadow-sm"
                  >
                    <span>Avanzar al Periodo {selectedPeriod + 1} ({2026 + selectedPeriod})</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
