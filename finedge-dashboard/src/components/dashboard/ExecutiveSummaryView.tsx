'use client';

import React from 'react';
import { SimulationDataset } from '../../types/corbatul';
import { getExecutiveScorecard } from '../../lib/analytics';
import { 
  TrendingUp, 
  TrendingDown, 
  ArrowUpRight, 
  ArrowDownRight,
  Activity,
  Zap,
  Award
} from 'lucide-react';

interface ExecutiveSummaryViewProps {
  dataset: SimulationDataset;
  selectedPeriod: number;
}

export const ExecutiveSummaryView: React.FC<ExecutiveSummaryViewProps> = ({
  dataset,
  selectedPeriod
}) => {
  const scorecard = getExecutiveScorecard(dataset, selectedPeriod);
  const variance = dataset.variances.find(v => v.period === selectedPeriod);
  const currentFin = dataset.financials.find(f => f.period === selectedPeriod && f.firmId === dataset.meta.primaryFirmId);

  const formatCurrency = (val: number) => `${Math.round(val).toLocaleString()} €`;
  const formatPercent = (val: number) => `${val.toFixed(1)}%`;
  const formatDelta = (val: number, isPercent = true) => {
    const sign = val > 0 ? '+' : '';
    return `${sign}${val.toFixed(1)}${isPercent ? '%' : ''}`;
  };

  return (
    <div className="space-y-6 w-full">
      {/* Top Banner / Minimalist Executive Card */}
      <div className="bg-white border border-mineral/40 rounded-2xl p-6 sm:p-7 shadow-minimal relative overflow-hidden">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded text-[11px] font-mono tracking-wider uppercase font-semibold bg-blush/30 text-rosewood-dark border border-blush/50">
                PuntoOne · FINEDGE
              </span>
              <span className="text-xs text-slate-steel/60 font-mono">
                Ejercicio P{selectedPeriod} ({2025 + selectedPeriod})
              </span>
              <span className="text-xs px-2 py-0.5 rounded bg-slate-steel/10 text-slate-steel font-mono">
                ACBSP
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-sans font-bold tracking-tight text-slate-steel">
              Cuadro de Mando Ejecutivo & Creación de Valor
            </h2>
            <p className="text-xs sm:text-sm text-slate-steel/70 mt-1 max-w-3xl font-normal leading-relaxed">
              Auditoría y balance directivo de la firma PuntoOne frente a los 6 competidores en la simulación Corbatul.
            </p>
          </div>

          <div className="flex items-center gap-5 bg-mineral-50/80 px-5 py-4 rounded-xl border border-mineral/40">
            <div className="text-right">
              <div className="text-[10px] text-slate-steel/60 uppercase tracking-wider font-mono font-medium">Valor Firma</div>
              <div className="text-2xl sm:text-3xl font-mono font-bold text-rosewood tabular-nums">
                {scorecard.sharePrice.toFixed(1)} <span className="text-xs text-slate-steel/50 font-normal">pts</span>
              </div>
            </div>
            <div className="h-9 w-px bg-mineral/50" />
            <div className="text-left">
              <div className="text-[10px] text-slate-steel/60 uppercase tracking-wider font-mono font-medium">Posición</div>
              <div className="text-2xl sm:text-3xl font-mono font-bold text-slate-steel tabular-nums">
                #{scorecard.rankBySharePrice} <span className="text-xs text-slate-steel/50 font-normal">de 7</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
        {/* KPI 1: Ingresos */}
        <div className="bg-white border border-mineral/40 rounded-xl p-5 shadow-minimal hover:border-slate-steel/30 transition-all">
          <div className="flex items-center justify-between text-xs text-slate-steel/60 font-medium">
            <span className="uppercase tracking-wider font-mono text-[11px]">Ingresos Totales</span>
            <span className={`px-2 py-0.5 rounded text-[11px] font-mono font-semibold tabular-nums flex items-center gap-0.5 ${
              scorecard.revenueGrowth >= 0 ? 'bg-mineral-100 text-slate-steel' : 'bg-blush/40 text-rosewood'
            }`}>
              {scorecard.revenueGrowth >= 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
              {formatDelta(scorecard.revenueGrowth)}
            </span>
          </div>
          <div className="text-2xl font-mono font-bold text-slate-steel mt-2 tabular-nums">
            {formatCurrency(scorecard.totalRevenue)}
          </div>
          <div className="mt-3 text-[11px] text-slate-steel/60 flex items-center justify-between border-t border-mineral/30 pt-2 font-mono">
            <span>Cuota Facturación:</span>
            <strong className="text-slate-steel font-semibold">{formatPercent(scorecard.marketShare)}</strong>
          </div>
        </div>

        {/* KPI 2: Margen Bruto */}
        <div className="bg-white border border-mineral/40 rounded-xl p-5 shadow-minimal hover:border-slate-steel/30 transition-all">
          <div className="flex items-center justify-between text-xs text-slate-steel/60 font-medium">
            <span className="uppercase tracking-wider font-mono text-[11px]">Margen Bruto</span>
            <span className="px-2 py-0.5 rounded text-[11px] font-mono font-semibold bg-blush/40 text-rosewood-dark tabular-nums">
              {formatPercent(scorecard.grossMargin)}
            </span>
          </div>
          <div className="text-2xl font-mono font-bold text-slate-steel mt-2 tabular-nums">
            {formatCurrency(currentFin?.grossProfit || 0)}
          </div>
          <div className="mt-3 text-[11px] text-slate-steel/60 flex items-center justify-between border-t border-mineral/30 pt-2 font-mono">
            <span>Margen Operativo:</span>
            <strong className="text-slate-steel font-semibold">{formatPercent(scorecard.operatingMargin)}</strong>
          </div>
        </div>

        {/* KPI 3: Resultado Neto */}
        <div className="bg-white border border-mineral/40 rounded-xl p-5 shadow-minimal hover:border-slate-steel/30 transition-all">
          <div className="flex items-center justify-between text-xs text-slate-steel/60 font-medium">
            <span className="uppercase tracking-wider font-mono text-[11px]">Resultado Neto</span>
            <span className={`px-2 py-0.5 rounded text-[11px] font-mono font-semibold tabular-nums ${
              scorecard.netIncome >= 0 ? 'bg-mineral-100 text-slate-steel' : 'bg-blush/40 text-rosewood'
            }`}>
              {formatPercent(scorecard.netMargin)}
            </span>
          </div>
          <div className={`text-2xl font-mono font-bold mt-2 tabular-nums ${
            scorecard.netIncome >= 0 ? 'text-rosewood' : 'text-slate-steel/60'
          }`}>
            {formatCurrency(scorecard.netIncome)}
          </div>
          <div className="mt-3 text-[11px] text-slate-steel/60 flex items-center justify-between border-t border-mineral/30 pt-2 font-mono">
            <span>Rentabilidad s/ PN (ROE):</span>
            <strong className="text-slate-steel font-semibold">
              {selectedPeriod === 4 ? '19.0%' : selectedPeriod === 3 ? '15.4%' : 'N/A'}
            </strong>
          </div>
        </div>

        {/* KPI 4: Solvencia & Tesorería */}
        <div className="bg-white border border-mineral/40 rounded-xl p-5 shadow-minimal hover:border-slate-steel/30 transition-all">
          <div className="flex items-center justify-between text-xs text-slate-steel/60 font-medium">
            <span className="uppercase tracking-wider font-mono text-[11px]">Caja & Equivalentes</span>
            <span className="px-2 py-0.5 rounded text-[11px] font-mono font-semibold bg-mineral-100 text-slate-steel tabular-nums">
              Deuda: {selectedPeriod === 4 ? '0 €' : formatCurrency(currentFin?.balanceSheet.longTermDebt || 0)}
            </span>
          </div>
          <div className="text-2xl font-mono font-bold text-slate-steel mt-2 tabular-nums">
            {formatCurrency(scorecard.cashPosition)}
          </div>
          <div className="mt-3 text-[11px] text-slate-steel/60 flex items-center justify-between border-t border-mineral/30 pt-2 font-mono">
            <span>Patrimonio Neto:</span>
            <strong className="text-slate-steel font-semibold">{formatCurrency(currentFin?.balanceSheet.shareholdersEquity || 0)}</strong>
          </div>
        </div>
      </div>

      {/* Strategic Synthesis & Product Portfolio */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Factors */}
        <div className="lg:col-span-2 bg-white border border-mineral/40 rounded-2xl p-6 shadow-minimal space-y-4">
          <h3 className="text-sm font-mono uppercase tracking-wider font-bold text-slate-steel flex items-center gap-2">
            <Zap className="w-4 h-4 text-rosewood" />
            <span>Factores Clave de Decisión ({2025 + selectedPeriod})</span>
          </h3>

          <div className="space-y-3">
            {variance?.highlights.map((h, i) => (
              <div 
                key={i}
                className="p-3.5 rounded-xl bg-mineral-50/60 border border-mineral/30 flex items-start gap-3"
              >
                <div className={`mt-0.5 p-1 rounded-md shrink-0 ${
                  h.semantic === 'FAVORABLE' ? 'bg-mineral-200 text-slate-steel' : 'bg-blush/50 text-rosewood'
                }`}>
                  {h.semantic === 'FAVORABLE' ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between text-xs font-mono mb-1">
                    <span className="font-semibold text-slate-steel">{h.metric}</span>
                    <span className={`font-semibold ${h.semantic === 'FAVORABLE' ? 'text-slate-steel' : 'text-rosewood'}`}>
                      {h.deltaPercent > 0 ? `+${h.deltaPercent.toFixed(1)}%` : `${h.deltaPercent.toFixed(1)}%`}
                    </span>
                  </div>
                  <p className="text-xs text-slate-steel/70 leading-relaxed font-sans">
                    {h.commentary}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Col: Portfolio */}
        <div className="bg-white border border-mineral/40 rounded-2xl p-6 shadow-minimal flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-mono uppercase tracking-wider font-bold text-slate-steel mb-4 flex items-center gap-2">
              <Activity className="w-4 h-4 text-slate-steel" />
              <span>Desglose por Producto</span>
            </h3>

            <div className="space-y-4">
              {/* Corbatas */}
              <div className="p-3 rounded-xl bg-mineral-50/50 border border-mineral/30">
                <div className="flex justify-between items-center text-xs font-mono mb-1">
                  <span className="text-slate-steel font-semibold">👔 Corbatas</span>
                  <span className="text-slate-steel font-bold">
                    {formatCurrency(currentFin?.revenueStandard || 0)}
                  </span>
                </div>
                <div className="w-full bg-mineral-200 rounded-full h-1.5 overflow-hidden">
                  <div 
                    className="bg-slate-steel h-1.5 rounded-full" 
                    style={{ width: `${((currentFin?.revenueStandard || 1) / (currentFin?.totalRevenue || 1)) * 100}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-slate-steel/60 font-mono mt-1">
                  <span>Precio: 17.50 €</span>
                  <span>Margen: {selectedPeriod === 4 ? '50.3%' : selectedPeriod === 3 ? '44.8%' : '37.1%'}</span>
                </div>
              </div>

              {/* Bufandas */}
              <div className="p-3 rounded-xl bg-mineral-50/50 border border-mineral/30">
                <div className="flex justify-between items-center text-xs font-mono mb-1">
                  <span className="text-slate-steel font-semibold">🧣 Bufandas</span>
                  <span className="text-rosewood font-bold">
                    {formatCurrency(currentFin?.revenuePremium || 0)}
                  </span>
                </div>
                <div className="w-full bg-mineral-200 rounded-full h-1.5 overflow-hidden">
                  <div 
                    className="bg-rosewood h-1.5 rounded-full" 
                    style={{ width: `${((currentFin?.revenuePremium || 1) / (currentFin?.totalRevenue || 1)) * 100}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-slate-steel/60 font-mono mt-1">
                  <span>Precio: 29.20 €</span>
                  <span>Margen: {selectedPeriod === 4 ? '55.8%' : selectedPeriod === 3 ? '51.0%' : '43.5%'}</span>
                </div>
              </div>

              {/* Calcetines */}
              <div className="p-3 rounded-xl bg-mineral-50/50 border border-mineral/30">
                <div className="flex justify-between items-center text-xs font-mono mb-1">
                  <span className="text-slate-steel font-semibold">🧦 Calcetines</span>
                  <span className="text-slate-steel/80 font-bold">
                    {formatCurrency(currentFin?.revenueSocks || 0)}
                  </span>
                </div>
                <div className="w-full bg-mineral-200 rounded-full h-1.5 overflow-hidden">
                  <div 
                    className="bg-blush-dark h-1.5 rounded-full" 
                    style={{ width: `${((currentFin?.revenueSocks || 1) / (currentFin?.totalRevenue || 1)) * 100}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-slate-steel/60 font-mono mt-1">
                  <span>Precio: {selectedPeriod === 4 ? '3.40 €' : selectedPeriod === 3 ? '3.00 €' : '2.65 €'}</span>
                  <span className={selectedPeriod === 4 ? 'text-rosewood font-semibold' : 'text-slate-steel/60'}>
                    Margen: {selectedPeriod === 4 ? '+31.1%' : selectedPeriod === 3 ? '-44.6%' : '-56.8%'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-mineral/30 text-center">
            <span className="text-[11px] font-mono text-slate-steel/70">
              Valor de Producto: <strong className="text-rosewood font-bold">9.1 / 10</strong>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
