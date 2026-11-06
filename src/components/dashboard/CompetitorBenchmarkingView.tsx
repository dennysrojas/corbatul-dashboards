'use client';

import React from 'react';
import { SimulationDataset } from '../../types/corbatul';
import { calculateBenchmarkingMetrics } from '../../lib/analytics';

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

  // Maximum metrics for visual scaling
  const maxSharePrice = Math.max(...benchmarking.map(c => c.sharePrice), 3500);
  const maxMarketShare = Math.max(...benchmarking.map(c => c.marketShareUnits * 100), 25);

  return (
    <div className="space-y-6 w-full">
      {/* Header */}
      <div className="bg-white border border-zinc-200 rounded-xl p-6 shadow-sm w-full">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-brass-DEFAULT" />
              <span className="text-xs uppercase font-mono font-bold text-zinc-600 tracking-widest">
                Inteligencia Competitiva de Mercado • ROURA 1940
              </span>
            </div>
            <h2 className="text-2xl font-serif font-black text-zinc-950 mt-1">
              Radar Competitivo y Benchmarking de la Industria
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600 mt-0.5">
              Comparativa de desempeño frente a los 6 rivales en valor de compañía, cuota de mercado y rentabilidad neta (ROS).
            </p>
          </div>
          <span className="text-xs font-mono uppercase tracking-wider text-zinc-800 bg-zinc-100 px-3.5 py-1.5 rounded-lg border border-zinc-300 font-bold">
            7 Firmas en Simulación • Periodo {selectedPeriod} ({2025 + selectedPeriod})
          </span>
        </div>
      </div>

      {/* Visual Data-Viz: Horizontal Bullet Charts for Fast Executive Scan (< 2 sec) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
        {/* Chart 1: Cotización de Acción (Share Price) */}
        <div className="bg-white border border-zinc-200 rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-200 mb-4">
            <div>
              <h3 className="font-serif font-bold text-base text-zinc-950">
                Valor de la Compañía (Puntos)
              </h3>
              <p className="text-xs text-zinc-500">Métrica global de evaluación ACBSP / CompanyGame</p>
            </div>
            <span className="text-xs font-mono text-zinc-500">Escala máx: {maxSharePrice.toFixed(0)} pts</span>
          </div>

          <div className="space-y-3.5">
            {benchmarking.map((comp) => {
              const isOurFirm = comp.firmId === ourFirmId;
              const widthPct = Math.min(100, (comp.sharePrice / maxSharePrice) * 100);

              return (
                <div key={comp.firmId} className="space-y-1">
                  <div className="flex justify-between items-center text-xs">
                    <div className="flex items-center gap-2">
                      <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-serif font-black ${
                        isOurFirm
                          ? 'bg-brass-dark text-white'
                          : 'bg-zinc-200 text-zinc-700'
                      }`}>
                        #{comp.rankBySharePrice}
                      </span>
                      <span className={`font-serif text-sm ${isOurFirm ? 'font-black text-zinc-950' : 'font-medium text-zinc-700'}`}>
                        {comp.firmName} {isOurFirm && '(FINFORCE)'}
                      </span>
                    </div>
                    <span className={`font-mono text-sm tabular-nums ${isOurFirm ? 'font-black text-brass-dark text-base' : 'font-semibold text-zinc-600'}`}>
                      {comp.sharePrice.toFixed(1)} pts
                    </span>
                  </div>

                  {/* Horizontal Bar */}
                  <div className="w-full bg-zinc-100 rounded-full h-4 overflow-hidden border border-zinc-200/80">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        isOurFirm
                          ? 'bg-gradient-to-r from-brass-DEFAULT to-amber-600 shadow-sm'
                          : 'bg-zinc-300'
                      }`}
                      style={{ width: `${widthPct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Chart 2: Cuota de Mercado (% Unidades Vendidas) */}
        <div className="bg-white border border-zinc-200 rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-200 mb-4">
            <div>
              <h3 className="font-serif font-bold text-base text-zinc-950">
                Participación de Mercado (% Cuota)
              </h3>
              <p className="text-xs text-zinc-500">Volumen absorbido frente a la demanda total</p>
            </div>
            <span className="text-xs font-mono text-zinc-500">Escala máx: {maxMarketShare.toFixed(0)}%</span>
          </div>

          <div className="space-y-3.5">
            {benchmarking.map((comp) => {
              const isOurFirm = comp.firmId === ourFirmId;
              const sharePct = comp.marketShareUnits * 100;
              const widthPct = Math.min(100, (sharePct / maxMarketShare) * 100);

              return (
                <div key={comp.firmId} className="space-y-1">
                  <div className="flex justify-between items-center text-xs">
                    <div className="flex items-center gap-2">
                      <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-serif font-black ${
                        isOurFirm
                          ? 'bg-denim text-white'
                          : 'bg-zinc-200 text-zinc-700'
                      }`}>
                        #{comp.rankByMarketShare}
                      </span>
                      <span className={`font-serif text-sm ${isOurFirm ? 'font-black text-zinc-950' : 'font-medium text-zinc-700'}`}>
                        {comp.firmName} {isOurFirm && '(Nuestra)'}
                      </span>
                    </div>
                    <span className={`font-mono text-sm tabular-nums ${isOurFirm ? 'font-black text-denim text-base' : 'font-semibold text-zinc-600'}`}>
                      {sharePct.toFixed(1)}%
                    </span>
                  </div>

                  {/* Horizontal Bar */}
                  <div className="w-full bg-zinc-100 rounded-full h-4 overflow-hidden border border-zinc-200/80">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        isOurFirm
                          ? 'bg-gradient-to-r from-denim to-blue-700 shadow-sm'
                          : 'bg-zinc-300'
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

      {/* Detailed Benchmarking Comparison Table with High Contrast & Tabular Alignment */}
      <div className="bg-white border border-zinc-200 rounded-xl shadow-sm overflow-hidden w-full">
        <div className="p-4 bg-zinc-50 border-b border-zinc-200 flex justify-between items-center">
          <h3 className="font-serif font-bold text-sm text-zinc-950">
            Cuadro de Mando de la Industria Textil (Periodo {selectedPeriod})
          </h3>
          <span className="text-xs font-mono text-zinc-600 uppercase tracking-wider font-semibold">
            Ordenado por Precio de Acción (Share Price)
          </span>
        </div>

        <div className="overflow-x-auto w-full">
          <table className="w-full text-xs text-left">
            <thead className="bg-zinc-100 text-zinc-800 uppercase font-mono text-[11px] border-b border-zinc-200 font-semibold">
              <tr>
                <th className="py-3 px-4">Posición</th>
                <th className="py-3 px-4">Empresa / Firma</th>
                <th className="py-3 px-4 text-right">Precio Acción</th>
                <th className="py-3 px-4 text-right">Brecha vs Líder</th>
                <th className="py-3 px-4 text-right">Cuota Mercado (Uds)</th>
                <th className="py-3 px-4 text-right">Ingresos Totales</th>
                <th className="py-3 px-4 text-right">Utilidad Neta</th>
                <th className="py-3 px-4 text-right">Margen Neto (ROS)</th>
                <th className="py-3 px-4 text-right">Utilidad Acumulada</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 font-sans">
              {benchmarking.map((comp) => {
                const isOurFirm = comp.firmId === ourFirmId;

                return (
                  <tr
                    key={comp.firmId}
                    className={`transition-colors hover:bg-zinc-50 ${
                      isOurFirm ? 'bg-amber-50/70 font-bold border-l-4 border-brass-DEFAULT' : ''
                    }`}
                  >
                    <td className="py-3.5 px-4">
                      <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-serif font-bold ${
                        comp.rankBySharePrice === 1
                          ? 'bg-brass-DEFAULT text-zinc-950 shadow-sm font-black'
                          : isOurFirm
                          ? 'bg-zinc-900 text-white'
                          : 'bg-zinc-200 text-zinc-800'
                      }`}>
                        #{comp.rankBySharePrice}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <span className={`font-serif text-sm ${isOurFirm ? 'font-black text-zinc-950' : 'text-zinc-800'}`}>
                          {comp.firmName} {isOurFirm && '(Nuestra Firma)'}
                        </span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-right font-serif font-black text-sm text-zinc-950 tabular-nums">
                      {comp.sharePrice.toFixed(1)} pts
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono tabular-nums">
                      {comp.gapToLeaderSharePricePct === 0 ? (
                        <span className="text-brass-dark font-bold font-serif">Líder Absoluto</span>
                      ) : (
                        <span className="text-rust font-semibold">
                          {comp.gapToLeaderSharePricePct.toFixed(1)}%
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono text-zinc-800 tabular-nums">
                      {formatPercent(comp.marketShareUnits * 100)}
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono text-zinc-800 tabular-nums">
                      {formatCurrency(comp.totalRevenue)}
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono text-tweed-dark font-bold tabular-nums">
                      {formatCurrency(comp.netIncome)}
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono text-zinc-800 tabular-nums">
                      {formatPercent(comp.returnOnSales)}
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono font-bold text-zinc-950 tabular-nums">
                      {formatCurrency(comp.accumulatedNetIncome)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Strategic Positioning Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        {/* Maniobras de Competidores */}
        <div className="bg-white border border-zinc-200 rounded-xl p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-3 pb-2 border-b border-zinc-200">
            <span className="w-2.5 h-2.5 rounded-full bg-brass-DEFAULT" />
            <h3 className="font-serif font-bold text-sm text-zinc-900">
              Análisis Táctico de los Rivales
            </h3>
          </div>
          <div className="space-y-3 text-xs text-zinc-700">
            <div className="p-3.5 bg-zinc-50 rounded-lg border-l-4 border-brass-DEFAULT">
              <strong className="text-zinc-950 font-serif block text-xs">Líderes de Precios (SmartOne & Spain10):</strong>
              Mantuvieron valoraciones altas apalancadas en mayores precios promedio y amplia cobertura, aunque Roura1940 cerró la brecha hasta situarse en 2.879 puntos en 2029.
            </div>
            <div className="p-3.5 bg-zinc-50 rounded-lg border-l-4 border-rust">
              <strong className="text-zinc-950 font-serif block text-xs">Caída Financiera (RealMan & FashionClub):</strong>
              Sufrieron caídas drásticas de valor (hasta 1.410 - 1.540 pts) por costes descontrolados y penalizaciones por préstamos de emergencia y sobrecapacidad ociosa.
            </div>
            <div className="p-3.5 bg-zinc-50 rounded-lg border-l-4 border-tweed">
              <strong className="text-zinc-950 font-serif block text-xs">Roura1940 (FINFORCE) - Escalada y Turnaround:</strong>
              Del puesto 6 en 2026 al puesto 3 en 2028-2029 (+1.046 puntos de recuperación), corrigiendo el agujero de costes en calcetines y logrando 4.59M€ de facturación récord.
            </div>
          </div>
        </div>

        {/* Dictamen para la Junta */}
        <div className="bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 text-white border border-zinc-800 rounded-xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <span className="text-xs uppercase font-mono tracking-widest text-brass-DEFAULT font-bold block mb-1">
              Conclusión para el Comité Evaluador (ACBSP)
            </span>
            <h3 className="text-lg font-serif font-bold text-zinc-50">
              Creación de Valor y Recuperación Sostenible
            </h3>
            <p className="text-xs text-zinc-300 mt-2 leading-relaxed">
              El equipo FINFORCE demostró maestría en la toma de decisiones: sobrepuso a Roura1940 a un shock inicial adverso, expandió la producción de 174k a 278k unidades con plena ocupación de telares (94.9%), mejoró el margen bruto al 49.3% y culminó el ejercicio con 365.700 € de beneficio neto.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-zinc-800">
            <div className="bg-zinc-900 p-3 rounded-lg border border-zinc-800">
              <span className="text-xs text-zinc-400 uppercase tracking-widest font-mono block">Margen Bruto Final</span>
              <div className="text-xl font-serif font-bold text-tweed-light tabular-nums">49.3%</div>
            </div>
            <div className="bg-zinc-900 p-3 rounded-lg border border-zinc-800">
              <span className="text-xs text-zinc-400 uppercase tracking-widest font-mono block">Valor Compañía Final</span>
              <div className="text-xl font-serif font-bold text-brass-DEFAULT">2.879 pts</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
