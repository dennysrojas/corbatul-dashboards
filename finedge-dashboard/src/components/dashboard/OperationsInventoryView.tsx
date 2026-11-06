'use client';

import React from 'react';
import { SimulationDataset } from '../../types/corbatul';
import { Factory } from 'lucide-react';

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

  const formatUnits = (val?: number) => (val !== undefined ? `${Math.round(val).toLocaleString()} uds` : '-');
  const formatCurrency = (val?: number) => (val !== undefined ? `${val.toFixed(2)} €` : '-');
  const formatPercent = (val?: number) => (val !== undefined ? `${val.toFixed(1)}%` : '-');

  if (!currentOps || !currentDec) return null;

  return (
    <div className="space-y-6 w-full">
      {/* Header */}
      <div className="bg-white border border-mineral/40 rounded-2xl p-6 shadow-minimal w-full">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-slate-steel" />
              <span className="text-[11px] uppercase font-mono font-semibold text-slate-steel/70 tracking-widest">
                Gestión Fabril & Cadena de Suministro · PuntoOne
              </span>
            </div>
            <h2 className="text-2xl font-sans font-bold text-slate-steel">
              Capacidad Fabril, Confección e Inventarios
            </h2>
            <p className="text-xs text-slate-steel/70 mt-0.5 font-normal">
              Ocupación en Corbatas, Bufandas y Calcetines, régimen de turnos fabriles y optimización de existencias.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-md text-xs font-mono font-medium bg-mineral-100 text-slate-steel">
              P{selectedPeriod} ({2025 + selectedPeriod})
            </span>
            <span className="px-3 py-1 rounded-md text-xs font-mono font-medium bg-mineral-100 text-slate-steel">
              {currentDec.plantShifts} Turnos
            </span>
            {currentDec.plantExpansionUnits > 0 && (
              <span className="px-3 py-1 rounded-md text-xs font-mono font-semibold bg-blush/30 text-rosewood-dark">
                +{currentDec.plantExpansionUnits.toLocaleString()} Uds Ampliación
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Operational KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
        <div className="bg-white border border-mineral/40 rounded-xl p-5 shadow-minimal">
          <div className="text-[11px] font-mono font-medium text-slate-steel/60 uppercase tracking-wider">
            Ocupación de Planta
          </div>
          <div className="text-2xl font-mono font-bold text-slate-steel mt-2 tabular-nums">
            {formatPercent(currentOps.capacityUtilizationRate * 100)}
          </div>
          <div className="text-xs text-slate-steel/60 mt-1 font-mono">
            Confección: <strong className="text-slate-steel">{formatUnits(currentOps.effectiveProductionUnits)}</strong>
          </div>
        </div>

        <div className="bg-white border border-mineral/40 rounded-xl p-5 shadow-minimal">
          <div className="text-[11px] font-mono font-medium text-slate-steel/60 uppercase tracking-wider">
            Coste Unitario Directo
          </div>
          <div className="text-2xl font-mono font-bold text-slate-steel mt-2 tabular-nums">
            {formatCurrency(currentOps.unitProductionCost)}
          </div>
          <div className="text-xs text-slate-steel/60 mt-1 font-mono">
            Economías de escala fabril
          </div>
        </div>

        <div className="bg-white border border-mineral/40 rounded-xl p-5 shadow-minimal">
          <div className="text-[11px] font-mono font-medium text-slate-steel/60 uppercase tracking-wider">
            Ventas Totales
          </div>
          <div className="text-2xl font-mono font-bold text-rosewood mt-2 tabular-nums">
            {formatUnits(currentOps.unitsSold)}
          </div>
          <div className="text-xs text-slate-steel/60 mt-1 font-mono">
            Demanda Atendida: <strong className="text-slate-steel font-semibold">100.0%</strong>
          </div>
        </div>

        <div className="bg-white border border-mineral/40 rounded-xl p-5 shadow-minimal">
          <div className="text-[11px] font-mono font-medium text-slate-steel/60 uppercase tracking-wider">
            Roturas de Stock (Stockouts)
          </div>
          <div className="text-2xl font-mono font-bold text-slate-steel mt-2 tabular-nums">
            0 uds (0.0%)
          </div>
          <div className="text-xs text-slate-steel/60 mt-1 font-mono">
            Servicio integral sin quiebres
          </div>
        </div>
      </div>

      {/* Production by Product */}
      <div className="bg-white border border-mineral/40 rounded-2xl p-6 shadow-minimal">
        <h3 className="text-sm font-mono uppercase tracking-wider font-bold text-slate-steel mb-4 flex items-center gap-2">
          <Factory className="w-4 h-4 text-slate-steel" />
          <span>Balance Operativo por Línea de Producto (Periodo {selectedPeriod})</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Corbatas */}
          <div className="p-4 rounded-xl bg-mineral-50/60 border border-mineral/30 space-y-3">
            <div className="flex justify-between items-center text-xs font-mono font-bold border-b border-mineral/30 pb-2">
              <span className="text-slate-steel">👔 Corbatas</span>
              <span className="text-slate-steel/70">{selectedPeriod === 4 ? '100% Ocupación' : '95% Ocupación'}</span>
            </div>
            <div className="space-y-1.5 text-xs font-mono">
              <div className="flex justify-between text-slate-steel/70">
                <span>Capacidad Planta:</span>
                <span className="text-slate-steel font-medium">{selectedPeriod === 4 ? '235,000 uds' : '215,000 uds'}</span>
              </div>
              <div className="flex justify-between text-slate-steel/70">
                <span>Producción Real:</span>
                <span className="text-slate-steel font-bold">{selectedPeriod === 4 ? '235,000 uds' : '205,000 uds'}</span>
              </div>
              <div className="flex justify-between text-slate-steel/70">
                <span>Ventas Concretadas:</span>
                <span className="text-slate-steel font-semibold">{selectedPeriod === 4 ? '234,538 uds' : selectedPeriod === 3 ? '214,696 uds' : '201,469 uds'}</span>
              </div>
              <div className="flex justify-between text-slate-steel/70">
                <span>Proveedor Calidad:</span>
                <span className="text-slate-steel">Estándar (1.13 €/m)</span>
              </div>
            </div>
          </div>

          {/* Bufandas */}
          <div className="p-4 rounded-xl bg-mineral-50/60 border border-mineral/30 space-y-3">
            <div className="flex justify-between items-center text-xs font-mono font-bold border-b border-mineral/30 pb-2">
              <span className="text-slate-steel">🧣 Bufandas</span>
              <span className="text-rosewood font-bold">100% Ocupación</span>
            </div>
            <div className="space-y-1.5 text-xs font-mono">
              <div className="flex justify-between text-slate-steel/70">
                <span>Capacidad Planta:</span>
                <span className="text-slate-steel font-medium">{selectedPeriod === 4 ? '55,000 uds' : selectedPeriod >= 2 ? '38,000 uds' : '30,000 uds'}</span>
              </div>
              <div className="flex justify-between text-slate-steel/70">
                <span>Producción Real:</span>
                <span className="text-rosewood font-bold">{selectedPeriod === 4 ? '55,000 uds' : selectedPeriod >= 2 ? '38,000 uds' : '29,000 uds'}</span>
              </div>
              <div className="flex justify-between text-slate-steel/70">
                <span>Ventas Concretadas:</span>
                <span className="text-slate-steel font-semibold">{selectedPeriod === 4 ? '54,606 uds' : selectedPeriod === 3 ? '37,816 uds' : '28,902 uds'}</span>
              </div>
              <div className="flex justify-between text-slate-steel/70">
                <span>Proveedor Calidad:</span>
                <span className="text-slate-steel">Premium (2.92 €/m)</span>
              </div>
            </div>
          </div>

          {/* Calcetines */}
          <div className="p-4 rounded-xl bg-mineral-50/60 border border-mineral/30 space-y-3">
            <div className="flex justify-between items-center text-xs font-mono font-bold border-b border-mineral/30 pb-2">
              <span className="text-slate-steel">🧦 Calcetines</span>
              <span className="text-slate-steel/70">{selectedPeriod === 4 ? '75% Ocupación' : '83% Ocupación'}</span>
            </div>
            <div className="space-y-1.5 text-xs font-mono">
              <div className="flex justify-between text-slate-steel/70">
                <span>Capacidad Planta:</span>
                <span className="text-slate-steel font-medium">{selectedPeriod >= 3 ? '100,000 uds' : '40,000 uds'}</span>
              </div>
              <div className="flex justify-between text-slate-steel/70">
                <span>Producción Real:</span>
                <span className="text-slate-steel font-bold">{selectedPeriod === 4 ? '75,000 uds' : selectedPeriod === 3 ? '35,000 uds' : '33,000 uds'}</span>
              </div>
              <div className="flex justify-between text-slate-steel/70">
                <span>Ventas Concretadas:</span>
                <span className="text-slate-steel font-semibold">{selectedPeriod === 4 ? '73,914 uds' : selectedPeriod === 3 ? '28,757 uds' : '20,991 uds'}</span>
              </div>
              <div className="flex justify-between text-slate-steel/70">
                <span>Proveedor Calidad:</span>
                <span className="text-slate-steel">Económica (0.22 €/par)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
