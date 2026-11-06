'use client';

import React from 'react';
import { SimulationDataset } from '../../types/corbatul';
import { getExecutiveScorecard } from '../../lib/analytics';

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
  const ourFirm = dataset.meta.firms.find(f => f.id === dataset.meta.primaryFirmId);
  const currentFin = dataset.financials.find(f => f.firmId === dataset.meta.primaryFirmId && f.period === selectedPeriod);
  const currentDec = dataset.decisions.find(d => d.firmId === dataset.meta.primaryFirmId && d.period === selectedPeriod);
  const currentProductMetrics = dataset.productMetrics?.[selectedPeriod];

  const formatCurrency = (val: number) => `${Math.round(val).toLocaleString()} €`;
  const formatPercent = (val: number) => `${val.toFixed(1)}%`;
  const formatDelta = (val: number, isPercent = true) => {
    const sign = val > 0 ? '+' : '';
    return `${sign}${val.toFixed(1)}${isPercent ? '%' : ''}`;
  };

  return (
    <div className="space-y-6 w-full">
      {/* Top Banner / Heritage Executive Card */}
      <div className="bg-white dark:bg-roura-navy-dark border border-roura-beige-dark dark:border-roura-navy rounded-xl p-6 text-roura-navy dark:text-white shadow-sm relative overflow-hidden transition-colors">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-roura-teal via-roura-sky to-roura-teal" />

        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-3 py-1 rounded-full text-xs font-mono tracking-widest uppercase font-bold bg-roura-sky/40 dark:bg-roura-teal/30 text-roura-teal-dark dark:text-roura-sky border border-roura-teal/30">
                {ourFirm?.name}
              </span>
              <span className="text-xs text-roura-navy/60 dark:text-roura-sky/70 font-serif font-medium">
                Ejercicio Estratégico: Periodo {selectedPeriod} de {dataset.periods.length}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-black tracking-tight text-roura-navy dark:text-white">
              Sala de Juntas: Creación de Valor y Retorno
            </h2>
            <p className="text-xs sm:text-sm text-roura-navy/70 dark:text-roura-sky/80 mt-1 font-sans max-w-3xl">
              Evaluación directiva de precios, margen por producto (Corbatas, Bufandas, Calcetines) y rentabilidad neta para el Comité de Certificación ACBSP.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-roura-beige dark:bg-roura-navy-deep p-4 rounded-xl border border-roura-beige-dark dark:border-roura-navy-light/40 shadow-inner">
            <div className="text-right">
              <div className="text-xs text-roura-navy/60 dark:text-roura-sky/70 uppercase tracking-widest font-mono font-semibold">Valor Compañía</div>
              <div className="text-2xl sm:text-3xl font-serif font-black text-roura-teal dark:text-white tabular-nums">
                {scorecard.sharePrice.toFixed(1)} <span className="text-xs text-roura-navy/50 dark:text-roura-sky/60 font-sans">pts</span>
              </div>
            </div>
            <div className="h-10 w-px bg-roura-beige-deep dark:bg-roura-navy-light/40" />
            <div className="text-left">
              <div className="text-xs text-roura-navy/60 dark:text-roura-sky/70 uppercase tracking-widest font-mono font-semibold">Posición Mercado</div>
              <div className="text-2xl sm:text-3xl font-serif font-black text-roura-navy dark:text-roura-sky tabular-nums">
                #{scorecard.rankBySharePrice} de 7
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
        {/* KPI 1: Ingresos Totales */}
        <div className="bg-white border border-zinc-200 rounded-xl p-5 shadow-sm hover:border-zinc-300 transition-all">
          <div className="flex items-center justify-between text-xs text-zinc-600 font-medium">
            <span className="uppercase tracking-wider font-mono text-xs font-semibold">Ingresos del Periodo</span>
            <span className={`px-2.5 py-0.5 rounded text-xs font-mono font-bold tabular-nums ${
              scorecard.revenueGrowth >= 0 ? 'bg-tweed-light text-tweed-dark' : 'bg-rust-light text-rust'
            }`}>
              {formatDelta(scorecard.revenueGrowth)}
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-serif font-bold text-zinc-950 mt-2 tabular-nums">
            {formatCurrency(scorecard.totalRevenue)}
          </div>
          <div className="text-xs text-zinc-600 mt-1.5">
            Volumen combinado: Corbatas, Bufandas & Calcetines
          </div>
        </div>

        {/* KPI 2: Utilidad Neta y Acumulada */}
        <div className="bg-white border border-zinc-200 rounded-xl p-5 shadow-sm hover:border-zinc-300 transition-all">
          <div className="flex items-center justify-between text-xs text-zinc-600 font-medium">
            <span className="uppercase tracking-wider font-mono text-xs font-semibold">Utilidad Neta Periodo</span>
            <span className={`px-2.5 py-0.5 rounded text-xs font-mono font-bold tabular-nums ${
              scorecard.netIncomeGrowth >= 0 ? 'bg-tweed-light text-tweed-dark' : 'bg-rust-light text-rust'
            }`}>
              {formatDelta(scorecard.netIncomeGrowth)}
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-serif font-bold text-tweed-dark mt-2 tabular-nums">
            {formatCurrency(scorecard.netIncome)}
          </div>
          <div className="text-xs text-zinc-600 mt-1.5">
            Acumulada: <strong className="text-zinc-950 font-mono tabular-nums">{formatCurrency(scorecard.accumulatedNetIncome)}</strong>
          </div>
        </div>

        {/* KPI 3: Margen Neto (ROS) */}
        <div className="bg-white border border-zinc-200 rounded-xl p-5 shadow-sm hover:border-zinc-300 transition-all">
          <div className="flex items-center justify-between text-xs text-zinc-600 font-medium">
            <span className="uppercase tracking-wider font-mono text-xs font-semibold">Margen Neto (ROS)</span>
            <span className="text-xs font-serif font-bold text-denim tabular-nums">
              Bruto: {formatPercent(scorecard.grossMargin)}
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-serif font-bold text-zinc-950 mt-2 tabular-nums">
            {formatPercent(scorecard.netMargin)}
          </div>
          <div className="text-xs text-zinc-600 mt-1.5">
            Margen Operativo: <strong className="text-zinc-950 font-mono tabular-nums">{formatPercent(scorecard.operatingMargin)}</strong>
          </div>
        </div>

        {/* KPI 4: Cuota de Mercado */}
        <div className="bg-white border border-zinc-200 rounded-xl p-5 shadow-sm hover:border-zinc-300 transition-all">
          <div className="flex items-center justify-between text-xs text-zinc-600 font-medium">
            <span className="uppercase tracking-wider font-mono text-xs font-semibold">Cuota de Mercado</span>
            <span className="px-2 py-0.5 rounded text-xs font-bold bg-brass-light text-brass-dark">
              {scorecard.marketShare >= 25 ? 'Líder Textil' : 'En Crecimiento'}
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-serif font-bold text-denim mt-2 tabular-nums">
            {formatPercent(scorecard.marketShare)}
          </div>
          <div className="text-xs text-zinc-600 mt-1.5">
            Utilización Planta: <strong className="text-zinc-950 font-mono tabular-nums">{formatPercent(scorecard.capacityUtilization)}</strong>
          </div>
        </div>
      </div>

      {/* Portfolio de Productos (Corbatas, Bufandas, Calcetines) */}
      <div className="bg-white border border-zinc-200 rounded-xl p-6 shadow-sm w-full">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-zinc-200">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-roura-teal" />
              <h3 className="text-lg font-serif font-bold text-zinc-950">
                Portfolio de Productos Textil (Periodo {selectedPeriod} · {2025 + selectedPeriod})
              </h3>
            </div>
            <p className="text-xs text-zinc-600 mt-0.5">
              Desglose directivo por línea de producto: Corbatas (Core), Bufandas (Premium) y Calcetines (Complementario).
            </p>
          </div>
          <span className="text-xs font-mono uppercase tracking-wider text-zinc-800 bg-zinc-100 px-3 py-1.5 rounded border border-zinc-300 font-semibold">
            3 Líneas Activas • Roura 1940
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
          {/* 1. Corbatas */}
          <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-4 hover:border-zinc-300 transition-all">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-lg">👔</span>
                <div>
                  <h4 className="font-serif font-bold text-sm text-zinc-950">Corbatas</h4>
                  <span className="text-[10px] uppercase font-mono tracking-wider text-zinc-500">Línea Core / Masivo</span>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-tweed-light text-tweed-dark border border-tweed/30">
                Margen {currentProductMetrics ? formatPercent(currentProductMetrics.corbatas.grossMarginPct * 100) : '46.7%'}
              </span>
            </div>

            <div className="mt-4 space-y-2 text-xs font-mono">
              <div className="flex justify-between py-1 border-b border-zinc-200/60">
                <span className="font-sans text-zinc-600">Precio de Venta:</span>
                <strong className="text-zinc-950 tabular-nums">
                  {(currentProductMetrics?.corbatas.price ?? currentDec?.priceStandard ?? 17).toFixed(2)} €
                </strong>
              </div>
              <div className="flex justify-between py-1 border-b border-zinc-200/60">
                <span className="font-sans text-zinc-600">Ingresos Totales:</span>
                <strong className="text-zinc-950 tabular-nums">
                  {formatCurrency(currentProductMetrics?.corbatas.revenue ?? currentFin?.revenueStandard ?? 0)}
                </strong>
              </div>
              <div className="flex justify-between py-1 border-b border-zinc-200/60">
                <span className="font-sans text-zinc-600">Unidades Vendidas:</span>
                <span className="text-zinc-800 tabular-nums">
                  {(currentProductMetrics?.corbatas.sold ?? 0).toLocaleString()} uds
                </span>
              </div>
              <div className="flex justify-between py-1">
                <span className="font-sans text-zinc-600">Stock Final de Telar:</span>
                <span className="text-zinc-800 tabular-nums">
                  {(currentProductMetrics?.corbatas.endingStockUnits ?? 0).toLocaleString()} uds
                </span>
              </div>
            </div>
          </div>

          {/* 2. Bufandas */}
          <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-4 hover:border-zinc-300 transition-all">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-lg">🧣</span>
                <div>
                  <h4 className="font-serif font-bold text-sm text-zinc-950">Bufandas</h4>
                  <span className="text-[10px] uppercase font-mono tracking-wider text-zinc-500">Línea Premium / Seda</span>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-tweed-light text-tweed-dark border border-tweed/30">
                Margen {currentProductMetrics ? formatPercent(currentProductMetrics.bufandas.grossMarginPct * 100) : '49.4%'}
              </span>
            </div>

            <div className="mt-4 space-y-2 text-xs font-mono">
              <div className="flex justify-between py-1 border-b border-zinc-200/60">
                <span className="font-sans text-zinc-600">Precio de Venta:</span>
                <strong className="text-zinc-950 tabular-nums">
                  {(currentProductMetrics?.bufandas.price ?? currentDec?.pricePremium ?? 27.9).toFixed(2)} €
                </strong>
              </div>
              <div className="flex justify-between py-1 border-b border-zinc-200/60">
                <span className="font-sans text-zinc-600">Ingresos Totales:</span>
                <strong className="text-zinc-950 tabular-nums">
                  {formatCurrency(currentProductMetrics?.bufandas.revenue ?? currentFin?.revenuePremium ?? 0)}
                </strong>
              </div>
              <div className="flex justify-between py-1 border-b border-zinc-200/60">
                <span className="font-sans text-zinc-600">Unidades Vendidas:</span>
                <span className="text-zinc-800 tabular-nums">
                  {(currentProductMetrics?.bufandas.sold ?? 0).toLocaleString()} uds
                </span>
              </div>
              <div className="flex justify-between py-1">
                <span className="font-sans text-zinc-600">Stock Final de Telar:</span>
                <span className="text-zinc-800 tabular-nums">
                  {(currentProductMetrics?.bufandas.endingStockUnits ?? 0).toLocaleString()} uds
                </span>
              </div>
            </div>
          </div>

          {/* 3. Calcetines */}
          <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-4 hover:border-zinc-300 transition-all">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-lg">🧦</span>
                <div>
                  <h4 className="font-serif font-bold text-sm text-zinc-950">Calcetines</h4>
                  <span className="text-[10px] uppercase font-mono tracking-wider text-zinc-500">Línea Complementaria</span>
                </div>
              </div>
              <span className={`px-2 py-0.5 rounded text-[11px] font-mono font-bold border ${
                (currentProductMetrics?.calcetines.grossMarginPct ?? 0) >= 0
                  ? 'bg-tweed-light text-tweed-dark border-tweed/30'
                  : 'bg-rust-light text-rust-dark border-rust/30'
              }`}>
                Margen {currentProductMetrics ? formatPercent(currentProductMetrics.calcetines.grossMarginPct * 100) : '+24.0%'}
              </span>
            </div>

            <div className="mt-4 space-y-2 text-xs font-mono">
              <div className="flex justify-between py-1 border-b border-zinc-200/60">
                <span className="font-sans text-zinc-600">Precio de Venta:</span>
                <strong className="text-zinc-950 tabular-nums">
                  {(currentProductMetrics?.calcetines.price ?? currentDec?.priceSocks ?? 2.99).toFixed(2)} €
                </strong>
              </div>
              <div className="flex justify-between py-1 border-b border-zinc-200/60">
                <span className="font-sans text-zinc-600">Ingresos Totales:</span>
                <strong className="text-zinc-950 tabular-nums">
                  {formatCurrency(currentProductMetrics?.calcetines.revenue ?? currentFin?.revenueSocks ?? 0)}
                </strong>
              </div>
              <div className="flex justify-between py-1 border-b border-zinc-200/60">
                <span className="font-sans text-zinc-600">Unidades Vendidas:</span>
                <span className="text-zinc-800 tabular-nums">
                  {(currentProductMetrics?.calcetines.sold ?? 0).toLocaleString()} uds
                </span>
              </div>
              <div className="flex justify-between py-1">
                <span className="font-sans text-zinc-600">Stock Final de Telar:</span>
                <span className="text-zinc-800 tabular-nums">
                  {(currentProductMetrics?.calcetines.endingStockUnits ?? 0).toLocaleString()} uds
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Historical Multivariable Trend Table */}
      <div className="bg-white border border-zinc-200 rounded-xl p-6 shadow-sm w-full">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-zinc-200">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-brass-DEFAULT" />
              <h3 className="text-lg font-serif font-bold text-zinc-950">
                Trayectoria Multivariable: Decisiones vs. Resultados
              </h3>
            </div>
            <p className="text-xs text-zinc-600 mt-0.5">
              Consolidación histórica de las 4 rondas simuladas (2026-2029) para {ourFirm?.name}.
            </p>
          </div>
          <span className="text-xs font-mono uppercase tracking-wider text-zinc-800 bg-zinc-100 px-3 py-1.5 rounded border border-zinc-300 font-semibold">
            Valores en Euros (€) • Auditoría ACBSP
          </span>
        </div>

        <div className="overflow-x-auto mt-4 w-full">
          <table className="w-full text-xs text-left">
            <thead className="bg-zinc-100 text-zinc-800 uppercase font-mono text-[11px] border-b border-zinc-200 font-semibold">
              <tr>
                <th className="py-3 px-3">Periodo / Año</th>
                <th className="py-3 px-3">Precio Prom.</th>
                <th className="py-3 px-3">Turnos</th>
                <th className="py-3 px-3 text-right">Ingresos</th>
                <th className="py-3 px-3 text-right">Costo Unit.</th>
                <th className="py-3 px-3 text-right">Margen Bruto</th>
                <th className="py-3 px-3 text-right">Resultado Neto</th>
                <th className="py-3 px-3 text-right">Cuota Mkt</th>
                <th className="py-3 px-3 text-right">Valor Cía</th>
                <th className="py-3 px-3 text-center">Rank</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 font-sans">
              {dataset.periods.map(p => {
                const fin = dataset.financials.find(f => f.firmId === dataset.meta.primaryFirmId && f.period === p);
                const ops = dataset.operations.find(o => o.firmId === dataset.meta.primaryFirmId && o.period === p);
                const comp = dataset.competitors.find(c => c.firmId === dataset.meta.primaryFirmId && c.period === p);
                const dec = dataset.decisions.find(d => d.firmId === dataset.meta.primaryFirmId && d.period === p);
                const isSelected = p === selectedPeriod;

                return (
                  <tr
                    key={p}
                    className={`transition-colors hover:bg-zinc-50 ${
                      isSelected ? 'bg-amber-50/70 font-semibold border-l-4 border-brass-DEFAULT' : ''
                    }`}
                  >
                    <td className="py-3 px-3 font-serif font-bold text-zinc-950 text-sm">
                      P{p} ({2025 + p}) {isSelected && <span className="ml-1 text-xs bg-zinc-900 text-white px-2 py-0.5 rounded font-mono">Activo</span>}
                    </td>
                    <td className="py-3 px-3 font-mono text-zinc-800 tabular-nums">{comp?.averagePrice.toFixed(2)} €</td>
                    <td className="py-3 px-3 text-zinc-800">{dec?.plantShifts} turnos</td>
                    <td className="py-3 px-3 text-right font-mono text-zinc-800 tabular-nums">{formatCurrency(fin?.totalRevenue || 0)}</td>
                    <td className="py-3 px-3 text-right font-mono text-zinc-800 tabular-nums">{ops?.unitProductionCost.toFixed(2)} €</td>
                    <td className="py-3 px-3 text-right font-mono text-zinc-800 tabular-nums">{formatPercent((fin?.grossMargin || 0) * 100)}</td>
                    <td className="py-3 px-3 text-right font-mono text-tweed-dark font-bold tabular-nums">
                      {formatCurrency(fin?.netIncome || 0)}
                    </td>
                    <td className="py-3 px-3 text-right font-mono text-zinc-800 tabular-nums">{formatPercent((comp?.marketShareUnits || 0) * 100)}</td>
                    <td className="py-3 px-3 text-right font-serif font-black text-zinc-950 text-sm tabular-nums">
                      {comp?.sharePrice.toFixed(1)} pts
                    </td>
                    <td className="py-3 px-3 text-center">
                      <span className={`px-2 py-0.5 rounded text-xs font-bold font-mono ${
                        comp?.rankBySharePrice === 1 ? 'bg-brass-light text-brass-dark border border-brass-DEFAULT/40' : 'bg-zinc-100 text-zinc-800'
                      }`}>
                        #{comp?.rankBySharePrice} de 7
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Root-Cause & Executive Variance Panel */}
      <div className="bg-white border border-zinc-200 rounded-xl p-6 shadow-sm w-full">
        <div className="flex items-center justify-between mb-3 pb-3 border-b border-zinc-200">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-brass-DEFAULT" />
            <h3 className="text-sm sm:text-base font-serif font-bold text-zinc-950">
              Análisis Causa-Efecto (Post-Mortem Periodo {selectedPeriod})
            </h3>
          </div>
          <span className="text-xs text-zinc-600 font-mono font-medium">
            {variance ? `Comparado vs. Periodo ${variance.previousPeriod}` : 'Periodo Base Inicial'}
          </span>
        </div>

        {variance && variance.primaryRootCauses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 w-full">
            {variance.primaryRootCauses.map((cause, idx) => {
              const badgeColors = {
                FAVORABLE: 'bg-tweed-light text-tweed-dark border-tweed/40',
                UNFAVORABLE: 'bg-rust-light text-rust-dark border-rust/40',
                NEUTRAL: 'bg-denim-light text-denim-dark border-denim/40',
              };

              return (
                <div
                  key={idx}
                  className="bg-zinc-50 border border-zinc-200 rounded-lg p-4 shadow-sm hover:border-zinc-300 transition-all"
                >
                  <div className="flex items-center justify-between text-xs font-semibold mb-2">
                    <span className="px-2.5 py-0.5 rounded text-xs font-mono tracking-widest uppercase bg-white text-zinc-800 border border-zinc-200 font-bold">
                      {cause.category}
                    </span>
                    <span className={`px-2.5 py-0.5 rounded text-xs font-mono font-bold border tabular-nums ${badgeColors[cause.type]}`}>
                      Impacto: {cause.financialImpact >= 0 ? '+' : ''}{Math.round(cause.financialImpact).toLocaleString()} €
                    </span>
                  </div>
                  <p className="text-xs text-zinc-800 leading-relaxed font-sans">
                    {cause.description}
                  </p>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-xs text-zinc-700 italic">
            El Periodo 1 corresponde al punto de partida balanceado de la industria textil en Corbatul. Todas las firmas comenzaron con parámetros homogéneos de inventario y capacidad.
          </p>
        )}
      </div>
    </div>
  );
};
