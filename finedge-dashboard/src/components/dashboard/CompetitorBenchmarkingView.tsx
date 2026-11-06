'use client';

import React from 'react';
import { SimulationDataset } from '../../types/corbatul';
import { calculateBenchmarkingMetrics } from '../../lib/analytics';
import { Target, Award, BarChart3, Star } from 'lucide-react';

interface CompetitorBenchmarkingViewProps {
  dataset: SimulationDataset;
  selectedPeriod: number;
}

export const CompetitorBenchmarkingView: React.FC<CompetitorBenchmarkingViewProps> = ({
  dataset,
  selectedPeriod
}) => {
  const benchmarking = calculateBenchmarkingMetrics(dataset.competitors, selectedPeriod);
  const ourFirmId = dataset.meta.primaryFirmId;

  const formatCurrency = (val: number) => `${Math.round(val).toLocaleString()} €`;
  const formatPercent = (val: number) => `${val.toFixed(1)}%`;

  const maxSharePrice = Math.max(...benchmarking.map(c => c.sharePrice), 3300);
  const maxMarketShare = Math.max(...benchmarking.map(c => c.marketShareUnits * 100), 30);

  return (
    <div className="space-y-6 w-full">
      {/* Top Banner */}
      <div className="bg-white border border-mineral/40 rounded-2xl p-6 shadow-minimal w-full">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-slate-steel" />
              <span className="text-[11px] uppercase font-mono font-semibold text-slate-steel/70 tracking-widest">
                Inteligencia de Mercado · Ecosistema de 7 Firmas
              </span>
            </div>
            <h2 className="text-2xl font-sans font-bold text-slate-steel">
              Radar de Competidores y Benchmarking Sectorial
            </h2>
            <p className="text-xs text-slate-steel/70 mt-0.5 font-normal">
              Comparativa de desempeño de PuntoOne frente a SmartOne, Spain10, RealMan, FashionClub, Roura1940 y Stuart20.
            </p>
          </div>
          <span className="text-xs font-mono uppercase tracking-wider text-slate-steel bg-mineral-100 px-3.5 py-1.5 rounded-lg border border-mineral/40 font-semibold">
            Periodo P{selectedPeriod} ({2025 + selectedPeriod}) · 7 Firmas
          </span>
        </div>
      </div>

      {/* Visual Data-Viz: Horizontal Bars */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
        {/* Chart 1: Company Value */}
        <div className="bg-white border border-mineral/40 rounded-2xl p-6 shadow-minimal">
          <div className="flex items-center justify-between pb-3 border-b border-mineral/30 mb-4">
            <div>
              <h3 className="font-mono font-bold text-xs uppercase tracking-wider text-slate-steel flex items-center gap-2">
                <Award className="w-4 h-4 text-rosewood" />
                <span>Valor de la Compañía (Puntos)</span>
              </h3>
              <p className="text-[11px] text-slate-steel/60 font-sans">Métrica agregada de evaluación directiva</p>
            </div>
            <span className="text-[10px] font-mono text-slate-steel/50">Escala: {maxSharePrice.toFixed(0)} pts</span>
          </div>

          <div className="space-y-3">
            {benchmarking.map((comp) => {
              const isOurFirm = comp.firmId === ourFirmId;
              const widthPct = Math.min(100, (comp.sharePrice / maxSharePrice) * 100);

              return (
                <div key={comp.firmId} className="space-y-1">
                  <div className="flex justify-between items-center text-xs font-mono">
                    <div className="flex items-center gap-2">
                      <span className={`w-4 h-4 rounded flex items-center justify-center text-[10px] font-bold ${
                        isOurFirm ? 'bg-rosewood text-white' : 'bg-mineral-200 text-slate-steel'
                      }`}>
                        #{comp.rankBySharePrice}
                      </span>
                      <span className={`font-medium ${isOurFirm ? 'text-rosewood font-bold flex items-center gap-1' : 'text-slate-steel'}`}>
                        {comp.firmName} {isOurFirm && <Star className="w-3 h-3 fill-rosewood text-rosewood" />}
                      </span>
                    </div>
                    <div className="text-right">
                      <strong className={`tabular-nums ${isOurFirm ? 'text-rosewood font-bold' : 'text-slate-steel'}`}>
                        {comp.sharePrice.toFixed(1)} pts
                      </strong>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full bg-mineral-100 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-2 rounded-full transition-all duration-500 ${
                        isOurFirm ? 'bg-rosewood' : 'bg-slate-steel/40'
                      }`}
                      style={{ width: `${widthPct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Chart 2: Market Share Units */}
        <div className="bg-white border border-mineral/40 rounded-2xl p-6 shadow-minimal">
          <div className="flex items-center justify-between pb-3 border-b border-mineral/30 mb-4">
            <div>
              <h3 className="font-mono font-bold text-xs uppercase tracking-wider text-slate-steel flex items-center gap-2">
                <Target className="w-4 h-4 text-slate-steel" />
                <span>Cuota de Mercado en Unidades (%)</span>
              </h3>
              <p className="text-[11px] text-slate-steel/60 font-sans">Volumen de prendas textiles vendidas</p>
            </div>
            <span className="text-[10px] font-mono text-slate-steel/50">Escala: {maxMarketShare.toFixed(0)}%</span>
          </div>

          <div className="space-y-3">
            {benchmarking.map((comp) => {
              const isOurFirm = comp.firmId === ourFirmId;
              const sharePct = comp.marketShareUnits * 100;
              const widthPct = Math.min(100, (sharePct / maxMarketShare) * 100);

              return (
                <div key={comp.firmId} className="space-y-1">
                  <div className="flex justify-between items-center text-xs font-mono">
                    <div className="flex items-center gap-2">
                      <span className={`w-4 h-4 rounded flex items-center justify-center text-[10px] font-bold ${
                        isOurFirm ? 'bg-slate-steel text-white' : 'bg-mineral-200 text-slate-steel'
                      }`}>
                        #{comp.rankByMarketShare}
                      </span>
                      <span className={`font-medium ${isOurFirm ? 'text-slate-steel font-bold flex items-center gap-1' : 'text-slate-steel'}`}>
                        {comp.firmName}
                      </span>
                    </div>
                    <div className="text-right">
                      <strong className={`tabular-nums ${isOurFirm ? 'text-slate-steel font-bold' : 'text-slate-steel/80'}`}>
                        {formatPercent(sharePct)}
                      </strong>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full bg-mineral-100 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-2 rounded-full transition-all duration-500 ${
                        isOurFirm ? 'bg-slate-steel' : 'bg-mineral-400'
                      }`}
                      style={{ width: `${widthPct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Industry Table */}
      <div className="bg-white border border-mineral/40 rounded-2xl p-6 shadow-minimal overflow-x-auto">
        <h3 className="text-sm font-mono uppercase tracking-wider font-bold text-slate-steel mb-4 flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-slate-steel" />
          <span>Tabla Consolidada del Sector (Periodo {selectedPeriod})</span>
        </h3>

        <table className="w-full text-left border-collapse text-xs font-mono">
          <thead>
            <tr className="border-b border-mineral/40 text-slate-steel/60 bg-mineral-50/60">
              <th className="py-2.5 px-4 font-semibold">Firma</th>
              <th className="py-2.5 px-4 font-semibold text-center">Rank</th>
              <th className="py-2.5 px-4 font-semibold text-right">Valor Compañía</th>
              <th className="py-2.5 px-4 font-semibold text-right">Cuota Unidades</th>
              <th className="py-2.5 px-4 font-semibold text-right">Facturación (€)</th>
              <th className="py-2.5 px-4 font-semibold text-right">Resultado Neto (€)</th>
              <th className="py-2.5 px-4 font-semibold text-center">Calidad Percibida</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-mineral/30 text-slate-steel">
            {benchmarking.map((comp) => {
              const isOurFirm = comp.firmId === ourFirmId;
              const firmColor = isOurFirm ? '#d17279' : '#3f6078';
              return (
                <tr 
                  key={comp.firmId}
                  className={isOurFirm ? 'bg-blush/20 font-bold text-slate-steel' : 'hover:bg-mineral-50/60'}
                >
                  <td className="py-2.5 px-4 flex items-center gap-2">
                    <span 
                      className="w-2 h-2 rounded-full shrink-0" 
                      style={{ backgroundColor: firmColor }} 
                    />
                    <span className={isOurFirm ? 'text-rosewood font-bold' : 'text-slate-steel'}>
                      {comp.firmName}
                    </span>
                  </td>
                  <td className="py-2.5 px-4 text-center">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                      isOurFirm ? 'bg-rosewood text-white' : 'bg-mineral-100 text-slate-steel'
                    }`}>
                      #{comp.rankBySharePrice}
                    </span>
                  </td>
                  <td className={`py-2.5 px-4 text-right tabular-nums ${isOurFirm ? 'text-rosewood font-bold text-sm' : 'text-slate-steel'}`}>
                    {comp.sharePrice.toFixed(1)} pts
                  </td>
                  <td className="py-2.5 px-4 text-right tabular-nums text-slate-steel">
                    {formatPercent(comp.marketShareUnits * 100)}
                  </td>
                  <td className="py-2.5 px-4 text-right tabular-nums text-slate-steel">
                    {formatCurrency(comp.totalRevenue)}
                  </td>
                  <td className={`py-2.5 px-4 text-right tabular-nums ${comp.netIncome >= 0 ? 'text-slate-steel font-semibold' : 'text-slate-steel/50'}`}>
                    {formatCurrency(comp.netIncome)}
                  </td>
                  <td className="py-2.5 px-4 text-center tabular-nums">
                    <span className="px-2 py-0.5 rounded text-[11px] bg-mineral-100 text-slate-steel">
                      {comp.qualityPerceptionScore.toFixed(1)} / 10
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
