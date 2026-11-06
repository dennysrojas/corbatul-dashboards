'use client';

import React from 'react';
import { SimulationDataset } from '../../types/corbatul';

interface OperationsInventoryViewProps {
  dataset: SimulationDataset;
  selectedPeriod: number;
}

export const OperationsInventoryView: React.FC<OperationsInventoryViewProps> = ({
  dataset,
  selectedPeriod
}) => {
  const ourFirmId = dataset.meta.primaryFirmId;
  const currentOps = dataset.operations.find(o => o.firmId === ourFirmId && o.period === selectedPeriod);
  const currentDec = dataset.decisions.find(d => d.firmId === ourFirmId && d.period === selectedPeriod);
  const prevOps = dataset.operations.find(o => o.firmId === ourFirmId && o.period === selectedPeriod - 1);

  const formatUnits = (val?: number) => (val !== undefined ? `${Math.round(val).toLocaleString()} uds` : '-');
  const formatCurrency = (val?: number) => (val !== undefined ? `${val.toFixed(2)} €` : '-');
  const formatPercent = (val?: number) => (val !== undefined ? `${val.toFixed(1)}%` : '-');

  if (!currentOps || !currentDec) return null;

  return (
    <div className="space-y-6 w-full">
      {/* Header */}
      <div className="bg-white border border-zinc-200 rounded-xl p-6 shadow-sm w-full">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-denim" />
              <span className="text-xs uppercase font-mono font-bold text-zinc-600 tracking-widest">
                Telares, Confección y Cadena de Suministro • ROURA 1940
              </span>
            </div>
            <h2 className="text-2xl font-serif font-black text-zinc-950 mt-1">
              Taller, Capacidad de Planta e Inventarios
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600 mt-0.5">
              Control de capacidad fabril en Corbatas, Bufandas y Calcetines, turnos de confección y nivel de servicio.
            </p>
          </div>
          <div className="flex items-center gap-2.5">
            <span className="px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold bg-zinc-100 text-zinc-900 border border-zinc-300">
              Periodo: P{selectedPeriod} ({2025 + selectedPeriod})
            </span>
            <span className="px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold bg-zinc-100 text-zinc-900 border border-zinc-300">
              Régimen: {currentDec.plantShifts} {currentDec.plantShifts === 1 ? 'Turno' : 'Turnos'}
            </span>
            {currentDec.plantExpansionUnits > 0 && (
              <span className="px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold bg-tweed-light text-tweed-dark border border-tweed/40">
                Ampliación: +{currentDec.plantExpansionUnits.toLocaleString()} Uds
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Operational KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
        {/* Utilización de Capacidad */}
        <div className="bg-white border border-zinc-200 rounded-xl p-5 shadow-sm">
          <div className="text-xs font-mono font-bold text-zinc-600 uppercase tracking-wider">
            Utilización de Telares
          </div>
          <div className="text-2xl sm:text-3xl font-serif font-bold text-zinc-950 mt-2 tabular-nums">
            {formatPercent(currentOps.capacityUtilizationRate * 100)}
          </div>
          <div className="text-xs text-zinc-600 mt-1.5">
            Producción: <strong className="text-zinc-950 font-mono tabular-nums">{formatUnits(currentOps.effectiveProductionUnits)}</strong>
          </div>
        </div>

        {/* Costo Unitario de Producción */}
        <div className="bg-white border border-zinc-200 rounded-xl p-5 shadow-sm">
          <div className="text-xs font-mono font-bold text-zinc-600 uppercase tracking-wider">
            Costo Unitario Medio de Confección
          </div>
          <div className="text-2xl sm:text-3xl font-serif font-bold text-denim mt-2 tabular-nums">
            {formatCurrency(currentOps.unitProductionCost)}
          </div>
          <div className="text-xs text-zinc-600 mt-1.5">
            Previo: <span className="tabular-nums font-mono">{formatCurrency(prevOps?.unitProductionCost)}</span> (Δ <span className="tabular-nums font-mono font-semibold">{prevOps ? (((currentOps.unitProductionCost - prevOps.unitProductionCost) / prevOps.unitProductionCost) * 100).toFixed(1) : 0}%</span>)
          </div>
        </div>

        {/* Horas Extras / Sobrecarga Laboral */}
        <div className="bg-white border border-zinc-200 rounded-xl p-5 shadow-sm">
          <div className="text-xs font-mono font-bold text-zinc-600 uppercase tracking-wider">
            Horas Extras / Fatiga
          </div>
          <div className={`text-2xl sm:text-3xl font-serif font-bold mt-2 tabular-nums ${currentOps.overtimeHoursPercent > 10 ? 'text-rust' : 'text-zinc-950'}`}>
            {formatPercent(currentOps.overtimeHoursPercent)}
          </div>
          <div className="text-xs text-zinc-600 mt-1.5">
            {currentOps.overtimeHoursPercent > 10 ? 'Sobrecosto laboral por recargo nocturno' : 'Régimen óptimo de turno regular'}
          </div>
        </div>

        {/* Quiebre de Stock */}
        <div className="bg-white border border-zinc-200 rounded-xl p-5 shadow-sm">
          <div className="text-xs font-mono font-bold text-zinc-600 uppercase tracking-wider">
            Quiebre de Stock (Stockout)
          </div>
          <div className={`text-2xl sm:text-3xl font-serif font-bold mt-2 tabular-nums ${currentOps.stockoutUnits > 0 ? 'text-rust' : 'text-tweed-dark'}`}>
            {currentOps.stockoutUnits > 0 ? formatUnits(currentOps.stockoutUnits) : '0 uds (100% Surtido)'}
          </div>
          <div className="text-xs text-zinc-600 mt-1.5">
            Tasa insatisfecha: <span className="tabular-nums font-mono font-semibold">{formatPercent(currentOps.stockoutRate * 100)}</span>
          </div>
        </div>
      </div>

      {/* Production Balance & Quality Audit */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
        {/* Balance de Inventarios */}
        <div className="bg-white border border-zinc-200 rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-zinc-200">
            <span className="w-2.5 h-2.5 rounded-full bg-denim" />
            <h3 className="font-serif font-bold text-base text-zinc-950">
              Balance Físico Consolidado de Existencias (Corbatas, Bufandas & Calcetines)
            </h3>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between py-2 border-b border-zinc-100">
              <span className="text-zinc-700">Inventario Inicial</span>
              <span className="font-mono font-semibold text-zinc-950 tabular-nums">{formatUnits(currentOps.inventoryBeginning)}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-zinc-100">
              <span className="text-zinc-700">(+) Unidades Producidas Efectivas</span>
              <span className="font-mono font-semibold text-tweed-dark tabular-nums">+{formatUnits(currentOps.effectiveProductionUnits)}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-zinc-100">
              <span className="text-zinc-700">(=) Disponibilidad Total para Despacho</span>
              <span className="font-mono font-bold text-zinc-950 tabular-nums">{formatUnits(currentOps.inventoryBeginning + currentOps.effectiveProductionUnits)}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-zinc-100">
              <span className="text-zinc-700">(-) Demanda Comercial Despachada</span>
              <span className="font-mono font-semibold text-rust tabular-nums">-{formatUnits(currentOps.unitsSold)}</span>
            </div>
            <div className="flex justify-between py-2.5 font-bold bg-zinc-50 px-3.5 rounded-lg border border-zinc-200">
              <span className="font-serif text-zinc-950 text-sm">(=) Inventario Final Resultante</span>
              <span className="font-mono text-denim text-sm tabular-nums">{formatUnits(currentOps.inventoryEnding)}</span>
            </div>
          </div>
        </div>

        {/* Auditoría de Calidad y Mantenimiento */}
        <div className="bg-white border border-zinc-200 rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-zinc-200">
            <span className="w-2.5 h-2.5 rounded-full bg-brass-DEFAULT" />
            <h3 className="font-serif font-bold text-base text-zinc-950">
              Confiabilidad de Telares y Aseguramiento de Calidad
            </h3>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <div className="flex justify-between text-zinc-800 mb-1.5">
                <span className="font-medium">Tasa de Falla / Paradas de Telar:</span>
                <span className="font-mono font-bold tabular-nums">{formatPercent(currentOps.machineBreakdownRate)}</span>
              </div>
              <div className="w-full bg-zinc-100 rounded-full h-2.5 border border-zinc-200">
                <div
                  className={`h-full rounded-full ${currentOps.machineBreakdownRate > 3 ? 'bg-rust' : 'bg-tweed'}`}
                  style={{ width: `${Math.min(100, currentOps.machineBreakdownRate * 15)}%` }}
                />
              </div>
              <span className="text-xs font-mono text-zinc-600 mt-1 block font-medium">
                Presupuesto asignado a Mantenimiento: <strong className="text-zinc-900">{currentDec.maintenanceBudget.toLocaleString()} €</strong>
              </span>
            </div>

            <div>
              <div className="flex justify-between text-zinc-800 mb-1.5">
                <span className="font-medium">Tasa de Descarte y Defectos de Costura:</span>
                <span className="font-mono font-bold tabular-nums">{formatPercent(currentOps.qualityDefectRate)}</span>
              </div>
              <div className="w-full bg-zinc-100 rounded-full h-2.5 border border-zinc-200">
                <div
                  className={`h-full rounded-full ${currentOps.qualityDefectRate > 2.5 ? 'bg-brass-DEFAULT' : 'bg-denim'}`}
                  style={{ width: `${Math.min(100, currentOps.qualityDefectRate * 20)}%` }}
                />
              </div>
              <span className="text-xs font-mono text-zinc-600 mt-1 block font-medium">
                Presupuesto asignado a Diseño e I+D: <strong className="text-zinc-900">{currentDec.qualityControlBudget.toLocaleString()} €</strong>
              </span>
            </div>

            <div className="p-3.5 bg-zinc-50 rounded-lg border border-zinc-200">
              <span className="text-xs font-mono uppercase tracking-wider font-bold text-zinc-800 block">
                Dictamen Técnico del Maestro Sastre:
              </span>
              <p className="text-xs text-zinc-700 mt-1 leading-relaxed">
                {currentOps.stockoutUnits > 0
                  ? 'Se produjo rotura de existencias por exceso de demanda tras la campaña de mercadeo. Es prioritario expandir capacidad o activar segundo turno.'
                  : 'Nivel óptimo de amortiguación de existencias. La relación entre mantenimiento preventivo y descarte de confección se ubica en el rango superior de la industria.'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Matriz Operativa por Producto: Corbatas, Bufandas, Calcetines */}
      <div className="bg-white border border-zinc-200 rounded-xl p-6 shadow-sm w-full">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-zinc-200">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-denim" />
              <h3 className="font-serif font-bold text-base text-zinc-950">
                Desglose Operativo por Línea de Producto (Periodo {selectedPeriod} · {2025 + selectedPeriod})
              </h3>
            </div>
            <p className="text-xs text-zinc-600 mt-0.5">
              Auditoría fabril detallada de capacidad, confección efectiva, amplitud de catálogo y stock remanente para Corbatas, Bufandas y Calcetines.
            </p>
          </div>
          <span className="text-xs font-mono uppercase bg-zinc-100 px-3 py-1.5 rounded border border-zinc-300 font-semibold text-zinc-800">
            Fábrica Roura 1940
          </span>
        </div>

        <div className="overflow-x-auto mt-4 w-full">
          <table className="w-full text-xs text-left">
            <thead className="bg-zinc-100 text-zinc-800 uppercase font-mono text-[11px] border-b border-zinc-200 font-semibold">
              <tr>
                <th className="py-3 px-3">Línea de Confección</th>
                <th className="py-3 px-3 text-right">Capacidad</th>
                <th className="py-3 px-3 text-right">Producción Efectiva</th>
                <th className="py-3 px-3 text-right">% Ocupación</th>
                <th className="py-3 px-3 text-center">Gama (Modelos)</th>
                <th className="py-3 px-3 text-right">Unidades Vendidas</th>
                <th className="py-3 px-3 text-right">Stock Final</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 font-mono">
              {dataset.productMetrics?.[selectedPeriod] ? (
                <>
                  <tr className="hover:bg-zinc-50 transition-colors">
                    <td className="py-3 px-3 font-serif font-bold text-zinc-950 font-sans flex items-center gap-2">
                      <span>👔</span> Corbatas (Core)
                    </td>
                    <td className="py-3 px-3 text-right tabular-nums text-zinc-800">
                      {dataset.productMetrics[selectedPeriod].corbatas.capacity?.toLocaleString()} uds
                    </td>
                    <td className="py-3 px-3 text-right tabular-nums font-bold text-zinc-950">
                      {dataset.productMetrics[selectedPeriod].corbatas.produced.toLocaleString()} uds
                    </td>
                    <td className="py-3 px-3 text-right tabular-nums text-tweed-dark font-bold">
                      {((dataset.productMetrics[selectedPeriod].corbatas.occupancyPct || 0) * 100).toFixed(1)}%
                    </td>
                    <td className="py-3 px-3 text-center tabular-nums text-zinc-800">
                      {dataset.productMetrics[selectedPeriod].corbatas.catalogWidth} modelos
                    </td>
                    <td className="py-3 px-3 text-right tabular-nums text-zinc-900">
                      {dataset.productMetrics[selectedPeriod].corbatas.sold.toLocaleString()} uds
                    </td>
                    <td className="py-3 px-3 text-right tabular-nums text-denim font-bold">
                      {dataset.productMetrics[selectedPeriod].corbatas.endingStockUnits.toLocaleString()} uds
                    </td>
                  </tr>
                  <tr className="hover:bg-zinc-50 transition-colors">
                    <td className="py-3 px-3 font-serif font-bold text-zinc-950 font-sans flex items-center gap-2">
                      <span>🧣</span> Bufandas (Premium)
                    </td>
                    <td className="py-3 px-3 text-right tabular-nums text-zinc-800">
                      {dataset.productMetrics[selectedPeriod].bufandas.capacity?.toLocaleString()} uds
                    </td>
                    <td className="py-3 px-3 text-right tabular-nums font-bold text-zinc-950">
                      {dataset.productMetrics[selectedPeriod].bufandas.produced.toLocaleString()} uds
                    </td>
                    <td className="py-3 px-3 text-right tabular-nums text-tweed-dark font-bold">
                      {((dataset.productMetrics[selectedPeriod].bufandas.occupancyPct || 0) * 100).toFixed(1)}%
                    </td>
                    <td className="py-3 px-3 text-center tabular-nums text-zinc-800">
                      {dataset.productMetrics[selectedPeriod].bufandas.catalogWidth} modelos
                    </td>
                    <td className="py-3 px-3 text-right tabular-nums text-zinc-900">
                      {dataset.productMetrics[selectedPeriod].bufandas.sold.toLocaleString()} uds
                    </td>
                    <td className="py-3 px-3 text-right tabular-nums text-denim font-bold">
                      {dataset.productMetrics[selectedPeriod].bufandas.endingStockUnits.toLocaleString()} uds
                    </td>
                  </tr>
                  <tr className="hover:bg-zinc-50 transition-colors bg-amber-50/30">
                    <td className="py-3 px-3 font-serif font-bold text-zinc-950 font-sans flex items-center gap-2">
                      <span>🧦</span> Calcetines (Complemento)
                    </td>
                    <td className="py-3 px-3 text-right tabular-nums text-zinc-800">
                      {dataset.productMetrics[selectedPeriod].calcetines.capacity?.toLocaleString()} uds
                    </td>
                    <td className="py-3 px-3 text-right tabular-nums font-bold text-zinc-950">
                      {dataset.productMetrics[selectedPeriod].calcetines.produced.toLocaleString()} uds
                    </td>
                    <td className="py-3 px-3 text-right tabular-nums text-tweed-dark font-bold">
                      {((dataset.productMetrics[selectedPeriod].calcetines.occupancyPct || 0) * 100).toFixed(1)}%
                    </td>
                    <td className="py-3 px-3 text-center tabular-nums text-zinc-800">
                      {dataset.productMetrics[selectedPeriod].calcetines.catalogWidth} modelos
                    </td>
                    <td className="py-3 px-3 text-right tabular-nums text-zinc-900">
                      {dataset.productMetrics[selectedPeriod].calcetines.sold.toLocaleString()} uds
                    </td>
                    <td className="py-3 px-3 text-right tabular-nums text-denim font-bold">
                      {dataset.productMetrics[selectedPeriod].calcetines.endingStockUnits.toLocaleString()} uds
                    </td>
                  </tr>
                </>
              ) : (
                <tr>
                  <td colSpan={7} className="py-4 text-center text-zinc-500 font-sans">
                    Cargando métricas de producto...
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
