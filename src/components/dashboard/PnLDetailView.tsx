'use client';

import React, { useState } from 'react';
import { SimulationDataset } from '../../types/corbatul';
import balanceSheetData from '../../../data/processed/roura1940_balance_sheet.json';
import {
  FileText,
  Landmark,
  Layers,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle2,
  DollarSign,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';

interface PnLDetailViewProps {
  dataset: SimulationDataset;
  selectedPeriod: number;
  currency?: '$' | '€';
}

type Polarity = 'revenue' | 'expense';

export const PnLDetailView: React.FC<PnLDetailViewProps> = ({
  dataset,
  selectedPeriod,
  currency = '€'
}) => {
  const [viewMode, setViewMode] = useState<'both' | 'pnl' | 'balance'>('both');
  const [balanceSubView, setBalanceSubView] = useState<'historical' | 'comparison'>('historical');

  const ourFirmId = dataset.meta.primaryFirmId;
  const currentFin = dataset.financials.find(f => f.firmId === ourFirmId && f.period === selectedPeriod);
  const prevFin = dataset.financials.find(f => f.firmId === ourFirmId && f.period === selectedPeriod - 1);

  const selectedYear = 2025 + selectedPeriod;

  const formatCurrency = (val?: number) => (val !== undefined ? `${Math.round(val).toLocaleString()} ${currency}` : '-');
  const formatPercent = (val?: number) => (val !== undefined ? `${(val * 100).toFixed(1)}%` : '-');

  // Accounting Polarity-aware Variance Formatter
  const renderVariance = (curr?: number, prev?: number, polarity: Polarity = 'revenue') => {
    if (curr === undefined || prev === undefined || prev === 0) {
      return <span className="text-zinc-400 font-mono text-xs tabular-nums">-</span>;
    }
    const delta = ((curr - prev) / Math.abs(prev)) * 100;

    // Neutral zone: within ±0.05%, show neutral gray
    if (Math.abs(delta) < 0.05) {
      return (
        <span className="text-xs font-mono tabular-nums font-semibold text-zinc-500">
          0.0%
        </span>
      );
    }

    // Revenue: increase is favorable (+). Expense: decrease is favorable (-)
    const isFavorable = polarity === 'revenue' ? delta > 0 : delta < 0;

    return (
      <span
        className={`text-xs font-mono tabular-nums font-bold ${
          isFavorable ? 'text-tweed-dark dark:text-tweed' : 'text-rust'
        }`}
      >
        {delta > 0 ? '+' : ''}{delta.toFixed(1)}%
      </span>
    );
  };

  if (!currentFin) return null;

  return (
    <div className="space-y-8 w-full max-w-7xl mx-auto pb-12 animate-fadeIn">
      {/* Header with High Projection Contrast & View Mode Switcher */}
      <div className="bg-white dark:bg-roura-navy border border-roura-beige-dark dark:border-roura-navy-light rounded-xl p-6 shadow-sm w-full">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-roura-teal" />
              <span className="text-xs uppercase font-mono font-bold text-roura-teal dark:text-roura-sky tracking-widest">
                Rigor Contable Textil &bull; ROURA 1940 (Equipo FINFORCE &bull; ACBSP)
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-black text-roura-navy dark:text-white mt-1">
              Estado de Resultados (P&L) y Balance de Situación
            </h2>
            <p className="text-xs sm:text-sm text-roura-navy/70 dark:text-roura-sky/80 mt-0.5 font-sans">
              Auditoría financiera oficial del Cuadro de Mando 2029: cascada de costes, márgenes y estructura patrimonial en {currency === '€' ? 'Euros (€)' : 'Dólares ($)'}.
            </p>
          </div>

          {/* Sub-view Switcher: P&L vs Balance vs Ambos */}
          <div className="flex flex-wrap items-center gap-2 bg-roura-beige-light dark:bg-roura-navy-dark p-1.5 rounded-xl border border-roura-beige-deep dark:border-roura-navy-light/60 text-xs font-mono">
            <button
              onClick={() => setViewMode('both')}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                viewMode === 'both'
                  ? 'bg-roura-teal text-white font-bold shadow-sm'
                  : 'text-roura-navy/70 dark:text-roura-sky hover:text-roura-teal'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Vista Completa (Ambos)</span>
            </button>
            <button
              onClick={() => setViewMode('pnl')}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                viewMode === 'pnl'
                  ? 'bg-roura-teal text-white font-bold shadow-sm'
                  : 'text-roura-navy/70 dark:text-roura-sky hover:text-roura-teal'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Estado de Resultados (P&L)</span>
            </button>
            <button
              onClick={() => setViewMode('balance')}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                viewMode === 'balance'
                  ? 'bg-roura-teal text-white font-bold shadow-sm'
                  : 'text-roura-navy/70 dark:text-roura-sky hover:text-roura-teal'
              }`}
            >
              <Landmark className="w-3.5 h-3.5" />
              <span>Balance de Situación (Excel)</span>
            </button>
          </div>
        </div>
      </div>

      {/* SECCIÓN 1: ESTADO DE RESULTADOS (P&L) */}
      {(viewMode === 'both' || viewMode === 'pnl') && (
        <section className="space-y-6">
          {/* Waterfall Breakdown Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
            <div className="bg-white dark:bg-roura-navy border border-roura-beige-dark dark:border-roura-navy-light rounded-xl p-5 shadow-sm">
              <div className="text-xs font-mono uppercase font-bold text-roura-teal dark:text-roura-sky tracking-wider">
                1. Ingresos Totales
              </div>
              <div className="text-2xl sm:text-3xl font-serif font-bold text-roura-navy dark:text-white mt-1 tabular-nums">
                {formatCurrency(currentFin.totalRevenue)}
              </div>
              <div className="text-xs text-roura-navy/70 dark:text-roura-sky/80 mt-2 font-medium">
                Corbatas: <span className="tabular-nums font-mono font-bold text-roura-navy dark:text-white">{formatCurrency(currentFin.revenueStandard)}</span> | Bufandas: <span className="tabular-nums font-mono font-bold text-roura-navy dark:text-white">{formatCurrency(currentFin.revenuePremium)}</span> | Calcetines: <span className="tabular-nums font-mono font-bold text-roura-navy dark:text-white">{formatCurrency(currentFin.revenueSocks ?? 0)}</span>
              </div>
            </div>

            <div className="bg-white dark:bg-roura-navy border-2 border-rust/40 rounded-xl p-5 shadow-sm">
              <div className="text-xs font-mono uppercase font-bold text-rust tracking-wider">
                2. Costo de Ventas (COGS)
              </div>
              <div className="text-2xl sm:text-3xl font-serif font-bold text-rust mt-1 tabular-nums">
                -{formatCurrency(currentFin.costOfGoodsSold.totalCOGS)}
              </div>
              <div className="text-xs text-roura-navy/70 dark:text-roura-sky/80 mt-2 font-semibold">
                Representa el <span className="tabular-nums font-mono font-bold text-rust">{((currentFin.costOfGoodsSold.totalCOGS / currentFin.totalRevenue) * 100).toFixed(1)}%</span> de las ventas
              </div>
            </div>

            <div className="bg-white dark:bg-roura-navy border border-roura-beige-deep dark:border-roura-navy-light rounded-xl p-5 shadow-sm">
              <div className="text-xs font-mono uppercase font-bold text-roura-navy/70 dark:text-roura-sky tracking-wider">
                3. Gastos Operativos (OPEX)
              </div>
              <div className="text-2xl sm:text-3xl font-serif font-bold text-roura-navy dark:text-white mt-1 tabular-nums">
                -{formatCurrency(currentFin.operatingExpenses.totalOPEX)}
              </div>
              <div className="text-xs text-roura-navy/70 dark:text-roura-sky/80 mt-2 font-medium">
                Comercial, Administración, Mantenimiento y Calidad
              </div>
            </div>

            <div className="bg-white dark:bg-roura-navy border-2 border-tweed/50 rounded-xl p-5 shadow-sm">
              <div className="text-xs font-mono uppercase font-bold text-tweed tracking-wider">
                4. Utilidad Neta Final
              </div>
              <div className="text-2xl sm:text-3xl font-serif font-black text-tweed mt-1 tabular-nums">
                {formatCurrency(currentFin.netIncome)}
              </div>
              <div className="text-xs text-roura-navy/80 dark:text-roura-sky mt-2 font-bold">
                Margen Neto (ROS): <span className="tabular-nums font-mono text-tweed">{formatPercent(currentFin.netMargin)}</span>
              </div>
            </div>
          </div>

          {/* Detailed P&L Statement Table */}
          <div className="bg-white dark:bg-roura-navy border border-roura-beige-dark dark:border-roura-navy-light rounded-xl shadow-sm overflow-hidden w-full">
            <div className="p-4 bg-roura-beige-light dark:bg-roura-navy-dark border-b border-roura-beige-dark dark:border-roura-navy-light flex justify-between items-center">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-roura-teal" />
                <h3 className="font-serif font-bold text-sm text-roura-navy dark:text-white">
                  Estado de Resultados Detallado (P&L Auditado &bull; P{selectedPeriod})
                </h3>
              </div>
              <div className="flex items-center gap-3 text-xs font-mono text-roura-navy/70 dark:text-roura-sky font-semibold">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-tweed" /> Favorable
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-rust" /> Desfavorable
                </span>
              </div>
            </div>

            <div className="overflow-x-auto w-full">
              <table className="w-full text-xs text-left">
                <thead className="bg-roura-beige dark:bg-roura-navy-deep text-roura-navy dark:text-roura-sky uppercase font-mono text-[11px] border-b border-roura-beige-deep dark:border-roura-navy-light font-semibold">
                  <tr>
                    <th className="py-3 px-4">Línea del P&L</th>
                    <th className="py-3 px-4 text-right">Periodo Actual (P{selectedPeriod} &bull; {selectedYear})</th>
                    <th className="py-3 px-4 text-right">% Ventas</th>
                    <th className="py-3 px-4 text-right">Periodo Anterior ({prevFin ? `P${prevFin.period} · ${2025 + prevFin.period}` : 'N/A'})</th>
                    <th className="py-3 px-4 text-right">Variación (&Delta;%)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-roura-beige-dark dark:divide-roura-navy-light/40 font-sans text-roura-navy dark:text-roura-beige-light">
                  {/* INGRESOS */}
                  <tr className="font-bold bg-roura-beige-light/50 dark:bg-roura-navy-dark/40">
                    <td className="py-3 px-4 font-serif text-sm">INGRESOS POR VENTAS TOTALES</td>
                    <td className="py-3 px-4 text-right font-mono font-black text-sm tabular-nums">{formatCurrency(currentFin.totalRevenue)}</td>
                    <td className="py-3 px-4 text-right font-mono tabular-nums">100.0%</td>
                    <td className="py-3 px-4 text-right font-mono tabular-nums">{formatCurrency(prevFin?.totalRevenue)}</td>
                    <td className="py-3 px-4 text-right">{renderVariance(currentFin.totalRevenue, prevFin?.totalRevenue, 'revenue')}</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-8">Ventas Línea Corbatas (Core / Masivo)</td>
                    <td className="py-2 px-4 text-right font-mono tabular-nums">{formatCurrency(currentFin.revenueStandard)}</td>
                    <td className="py-2 px-4 text-right font-mono text-roura-navy/60 dark:text-roura-sky/60 tabular-nums">{((currentFin.revenueStandard / currentFin.totalRevenue) * 100).toFixed(1)}%</td>
                    <td className="py-2 px-4 text-right font-mono tabular-nums">{formatCurrency(prevFin?.revenueStandard)}</td>
                    <td className="py-2 px-4 text-right">{renderVariance(currentFin.revenueStandard, prevFin?.revenueStandard, 'revenue')}</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-8">Ventas Línea Bufandas (Premium / Temporada)</td>
                    <td className="py-2 px-4 text-right font-mono tabular-nums">{formatCurrency(currentFin.revenuePremium)}</td>
                    <td className="py-2 px-4 text-right font-mono text-roura-navy/60 dark:text-roura-sky/60 tabular-nums">{((currentFin.revenuePremium / currentFin.totalRevenue) * 100).toFixed(1)}%</td>
                    <td className="py-2 px-4 text-right font-mono tabular-nums">{formatCurrency(prevFin?.revenuePremium)}</td>
                    <td className="py-2 px-4 text-right">{renderVariance(currentFin.revenuePremium, prevFin?.revenuePremium, 'revenue')}</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-8">Ventas Línea Calcetines (Complementario / Entrada)</td>
                    <td className="py-2 px-4 text-right font-mono tabular-nums">{formatCurrency(currentFin.revenueSocks ?? 0)}</td>
                    <td className="py-2 px-4 text-right font-mono text-roura-navy/60 dark:text-roura-sky/60 tabular-nums">{(((currentFin.revenueSocks ?? 0) / currentFin.totalRevenue) * 100).toFixed(1)}%</td>
                    <td className="py-2 px-4 text-right font-mono tabular-nums">{formatCurrency(prevFin?.revenueSocks ?? 0)}</td>
                    <td className="py-2 px-4 text-right">{renderVariance(currentFin.revenueSocks, prevFin?.revenueSocks, 'revenue')}</td>
                  </tr>

                  {/* COGS */}
                  <tr className="font-bold bg-rust/5 text-rust">
                    <td className="py-3 px-4 font-serif text-sm">(-) COSTO DE VENTAS (COGS)</td>
                    <td className="py-3 px-4 text-right font-mono tabular-nums text-sm font-bold">{formatCurrency(currentFin.costOfGoodsSold.totalCOGS)}</td>
                    <td className="py-3 px-4 text-right font-mono tabular-nums">{((currentFin.costOfGoodsSold.totalCOGS / currentFin.totalRevenue) * 100).toFixed(1)}%</td>
                    <td className="py-3 px-4 text-right font-mono tabular-nums">{formatCurrency(prevFin?.costOfGoodsSold.totalCOGS)}</td>
                    <td className="py-3 px-4 text-right">{renderVariance(currentFin.costOfGoodsSold.totalCOGS, prevFin?.costOfGoodsSold.totalCOGS, 'expense')}</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-8">Materia Prima Directa (Telas & Hilados)</td>
                    <td className="py-2 px-4 text-right font-mono tabular-nums">{formatCurrency(currentFin.costOfGoodsSold.rawMaterialsUsed)}</td>
                    <td className="py-2 px-4 text-right font-mono text-roura-navy/60 dark:text-roura-sky/60 tabular-nums">{((currentFin.costOfGoodsSold.rawMaterialsUsed / currentFin.totalRevenue) * 100).toFixed(1)}%</td>
                    <td className="py-2 px-4 text-right font-mono tabular-nums">{formatCurrency(prevFin?.costOfGoodsSold.rawMaterialsUsed)}</td>
                    <td className="py-2 px-4 text-right">{renderVariance(currentFin.costOfGoodsSold.rawMaterialsUsed, prevFin?.costOfGoodsSold.rawMaterialsUsed, 'expense')}</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-8">Mano de Obra Directa (Turno Ordinario)</td>
                    <td className="py-2 px-4 text-right font-mono tabular-nums">{formatCurrency(currentFin.costOfGoodsSold.directLaborRegular)}</td>
                    <td className="py-2 px-4 text-right font-mono text-roura-navy/60 dark:text-roura-sky/60 tabular-nums">{((currentFin.costOfGoodsSold.directLaborRegular / currentFin.totalRevenue) * 100).toFixed(1)}%</td>
                    <td className="py-2 px-4 text-right font-mono tabular-nums">{formatCurrency(prevFin?.costOfGoodsSold.directLaborRegular)}</td>
                    <td className="py-2 px-4 text-right">{renderVariance(currentFin.costOfGoodsSold.directLaborRegular, prevFin?.costOfGoodsSold.directLaborRegular, 'expense')}</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-8">Mano de Obra Directa (Horas Extras / Turno 3)</td>
                    <td className="py-2 px-4 text-right font-mono text-rust font-bold tabular-nums">{formatCurrency(currentFin.costOfGoodsSold.directLaborOvertime)}</td>
                    <td className="py-2 px-4 text-right font-mono text-roura-navy/60 dark:text-roura-sky/60 tabular-nums">{((currentFin.costOfGoodsSold.directLaborOvertime / currentFin.totalRevenue) * 100).toFixed(1)}%</td>
                    <td className="py-2 px-4 text-right font-mono tabular-nums">{formatCurrency(prevFin?.costOfGoodsSold.directLaborOvertime)}</td>
                    <td className="py-2 px-4 text-right">{renderVariance(currentFin.costOfGoodsSold.directLaborOvertime, prevFin?.costOfGoodsSold.directLaborOvertime, 'expense')}</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-8">Costos Indirectos de Fabricación (CIF)</td>
                    <td className="py-2 px-4 text-right font-mono tabular-nums">{formatCurrency(currentFin.costOfGoodsSold.factoryOverhead)}</td>
                    <td className="py-2 px-4 text-right font-mono text-roura-navy/60 dark:text-roura-sky/60 tabular-nums">{((currentFin.costOfGoodsSold.factoryOverhead / currentFin.totalRevenue) * 100).toFixed(1)}%</td>
                    <td className="py-2 px-4 text-right font-mono tabular-nums">{formatCurrency(prevFin?.costOfGoodsSold.factoryOverhead)}</td>
                    <td className="py-2 px-4 text-right">{renderVariance(currentFin.costOfGoodsSold.factoryOverhead, prevFin?.costOfGoodsSold.factoryOverhead, 'expense')}</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-8">Depreciación de Maquinaria y Telares</td>
                    <td className="py-2 px-4 text-right font-mono tabular-nums">{formatCurrency(currentFin.costOfGoodsSold.plantDepreciation)}</td>
                    <td className="py-2 px-4 text-right font-mono text-roura-navy/60 dark:text-roura-sky/60 tabular-nums">{((currentFin.costOfGoodsSold.plantDepreciation / currentFin.totalRevenue) * 100).toFixed(1)}%</td>
                    <td className="py-2 px-4 text-right font-mono tabular-nums">{formatCurrency(prevFin?.costOfGoodsSold.plantDepreciation)}</td>
                    <td className="py-2 px-4 text-right">{renderVariance(currentFin.costOfGoodsSold.plantDepreciation, prevFin?.costOfGoodsSold.plantDepreciation, 'expense')}</td>
                  </tr>

                  {/* UTILIDAD BRUTA */}
                  <tr className="font-bold bg-amber-500/10 dark:bg-amber-500/20 text-roura-navy dark:text-white border-y-2 border-roura-beige-deep dark:border-roura-navy-light">
                    <td className="py-3 px-4 font-serif text-sm">(=) UTILIDAD BRUTA</td>
                    <td className="py-3 px-4 text-right font-mono font-black text-sm tabular-nums">{formatCurrency(currentFin.grossProfit)}</td>
                    <td className="py-3 px-4 text-right font-mono font-bold tabular-nums">{formatPercent(currentFin.grossMargin)}</td>
                    <td className="py-3 px-4 text-right font-mono tabular-nums">{formatCurrency(prevFin?.grossProfit)}</td>
                    <td className="py-3 px-4 text-right">{renderVariance(currentFin.grossProfit, prevFin?.grossProfit, 'revenue')}</td>
                  </tr>

                  {/* OPEX */}
                  <tr className="font-bold bg-roura-beige-light dark:bg-roura-navy-dark text-roura-navy dark:text-white">
                    <td className="py-3 px-4 font-serif text-sm">(-) GASTOS OPERATIVOS (OPEX)</td>
                    <td className="py-3 px-4 text-right font-mono tabular-nums font-bold">{formatCurrency(currentFin.operatingExpenses.totalOPEX)}</td>
                    <td className="py-3 px-4 text-right font-mono tabular-nums">{((currentFin.operatingExpenses.totalOPEX / currentFin.totalRevenue) * 100).toFixed(1)}%</td>
                    <td className="py-3 px-4 text-right font-mono tabular-nums">{formatCurrency(prevFin?.operatingExpenses.totalOPEX)}</td>
                    <td className="py-3 px-4 text-right">{renderVariance(currentFin.operatingExpenses.totalOPEX, prevFin?.operatingExpenses.totalOPEX, 'expense')}</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-8">Marketing & Publicidad de Marca</td>
                    <td className="py-2 px-4 text-right font-mono tabular-nums">{formatCurrency(currentFin.operatingExpenses.marketingAndAdvertising)}</td>
                    <td className="py-2 px-4 text-right font-mono text-roura-navy/60 dark:text-roura-sky/60 tabular-nums">{((currentFin.operatingExpenses.marketingAndAdvertising / currentFin.totalRevenue) * 100).toFixed(1)}%</td>
                    <td className="py-2 px-4 text-right font-mono tabular-nums">{formatCurrency(prevFin?.operatingExpenses.marketingAndAdvertising)}</td>
                    <td className="py-2 px-4 text-right">{renderVariance(currentFin.operatingExpenses.marketingAndAdvertising, prevFin?.operatingExpenses.marketingAndAdvertising, 'expense')}</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-8">Fuerza de Ventas / Red Comercial</td>
                    <td className="py-2 px-4 text-right font-mono tabular-nums">{formatCurrency(currentFin.operatingExpenses.salesForcePayroll)}</td>
                    <td className="py-2 px-4 text-right font-mono text-roura-navy/60 dark:text-roura-sky/60 tabular-nums">{((currentFin.operatingExpenses.salesForcePayroll / currentFin.totalRevenue) * 100).toFixed(1)}%</td>
                    <td className="py-2 px-4 text-right font-mono tabular-nums">{formatCurrency(prevFin?.operatingExpenses.salesForcePayroll)}</td>
                    <td className="py-2 px-4 text-right">{renderVariance(currentFin.operatingExpenses.salesForcePayroll, prevFin?.operatingExpenses.salesForcePayroll, 'expense')}</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-8">Aseguramiento de Calidad y Mantenimiento</td>
                    <td className="py-2 px-4 text-right font-mono tabular-nums">{formatCurrency(currentFin.operatingExpenses.qualityAssurance + currentFin.operatingExpenses.plantMaintenance)}</td>
                    <td className="py-2 px-4 text-right font-mono text-roura-navy/60 dark:text-roura-sky/60 tabular-nums">{(((currentFin.operatingExpenses.qualityAssurance + currentFin.operatingExpenses.plantMaintenance) / currentFin.totalRevenue) * 100).toFixed(1)}%</td>
                    <td className="py-2 px-4 text-right font-mono tabular-nums">{formatCurrency((prevFin?.operatingExpenses.qualityAssurance || 0) + (prevFin?.operatingExpenses.plantMaintenance || 0))}</td>
                    <td className="py-2 px-4 text-right">{renderVariance(currentFin.operatingExpenses.qualityAssurance + currentFin.operatingExpenses.plantMaintenance, (prevFin?.operatingExpenses.qualityAssurance || 0) + (prevFin?.operatingExpenses.plantMaintenance || 0), 'expense')}</td>
                  </tr>

                  {/* EBIT & EBITDA */}
                  <tr className="font-semibold bg-roura-beige-light/40 dark:bg-roura-navy-dark/30">
                    <td className="py-2.5 px-4 font-serif">EBITDA (Flujo Operativo Bruto)</td>
                    <td className="py-2.5 px-4 text-right font-mono font-bold tabular-nums">{formatCurrency(currentFin.ebitda)}</td>
                    <td className="py-2.5 px-4 text-right font-mono text-roura-navy/60 dark:text-roura-sky/60 tabular-nums">{((currentFin.ebitda / currentFin.totalRevenue) * 100).toFixed(1)}%</td>
                    <td className="py-2.5 px-4 text-right font-mono tabular-nums">{formatCurrency(prevFin?.ebitda)}</td>
                    <td className="py-2.5 px-4 text-right">{renderVariance(currentFin.ebitda, prevFin?.ebitda, 'revenue')}</td>
                  </tr>
                  <tr className="font-semibold bg-roura-beige-light/60 dark:bg-roura-navy-dark/50">
                    <td className="py-2.5 px-4 font-serif">(=) EBIT (Utilidad Operativa)</td>
                    <td className="py-2.5 px-4 text-right font-mono font-bold tabular-nums">{formatCurrency(currentFin.ebit)}</td>
                    <td className="py-2.5 px-4 text-right font-mono font-bold tabular-nums">{formatPercent(currentFin.operatingMargin)}</td>
                    <td className="py-2.5 px-4 text-right font-mono tabular-nums">{formatCurrency(prevFin?.ebit)}</td>
                    <td className="py-2.5 px-4 text-right">{renderVariance(currentFin.ebit, prevFin?.ebit, 'revenue')}</td>
                  </tr>

                  {/* Extraordinarios y Financieros */}
                  <tr>
                    <td className="py-2 px-4">(-) Costos Financieros Netos</td>
                    <td className="py-2 px-4 text-right font-mono tabular-nums">{formatCurrency(currentFin.financialResults.netFinancialCost)}</td>
                    <td className="py-2 px-4 text-right font-mono text-roura-navy/60 dark:text-roura-sky/60 tabular-nums">{((currentFin.financialResults.netFinancialCost / currentFin.totalRevenue) * 100).toFixed(1)}%</td>
                    <td className="py-2 px-4 text-right font-mono tabular-nums">{formatCurrency(prevFin?.financialResults.netFinancialCost)}</td>
                    <td className="py-2 px-4 text-right">{renderVariance(currentFin.financialResults.netFinancialCost, prevFin?.financialResults.netFinancialCost, 'expense')}</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4">(+/-) Resultados Extraordinarios</td>
                    <td className="py-2 px-4 text-right font-mono font-bold text-tweed tabular-nums">{formatCurrency(currentFin.extraordinaryIncome ?? 0)}</td>
                    <td className="py-2 px-4 text-right font-mono text-roura-navy/60 dark:text-roura-sky/60 tabular-nums">{(((currentFin.extraordinaryIncome ?? 0) / currentFin.totalRevenue) * 100).toFixed(1)}%</td>
                    <td className="py-2 px-4 text-right font-mono tabular-nums">{formatCurrency(prevFin?.extraordinaryIncome ?? 0)}</td>
                    <td className="py-2 px-4 text-right">{renderVariance(currentFin.extraordinaryIncome ?? 0, prevFin?.extraordinaryIncome ?? 0, 'revenue')}</td>
                  </tr>

                  {/* UTILIDAD NETA */}
                  <tr className="font-extrabold bg-tweed/10 text-tweed border-t-2 border-tweed">
                    <td className="py-3 px-4 font-serif text-sm">(=) UTILIDAD NETA DEL EJERCICIO</td>
                    <td className="py-3 px-4 text-right font-mono font-black tabular-nums text-sm">{formatCurrency(currentFin.netIncome)}</td>
                    <td className="py-3 px-4 text-right font-mono font-black tabular-nums">{formatPercent(currentFin.netMargin)}</td>
                    <td className="py-3 px-4 text-right font-mono tabular-nums">{formatCurrency(prevFin?.netIncome)}</td>
                    <td className="py-3 px-4 text-right">{renderVariance(currentFin.netIncome, prevFin?.netIncome, 'revenue')}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* SECCIÓN 2: BALANCE DE SITUACIÓN GENERAL (DEL EXCEL OFICIAL) */}
      {(viewMode === 'both' || viewMode === 'balance') && (
        <section className="space-y-6 pt-4 border-t-2 border-roura-beige-deep dark:border-roura-navy-light">
          {/* Header de Balance con Selector de Sub-vista */}
          <div className="bg-white dark:bg-roura-navy border border-roura-beige-dark dark:border-roura-navy-light rounded-xl p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-roura-teal/15 dark:bg-roura-teal/30 text-roura-teal dark:text-roura-sky flex items-center justify-center font-bold">
                  <Landmark className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-serif font-black text-roura-navy dark:text-white flex items-center gap-2">
                    <span>Balance de Situación &bull; Compañía Roura1940</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-roura-teal text-white font-bold uppercase">
                      Hoja BALANCE del Excel
                    </span>
                  </h3>
                  <p className="text-xs text-roura-navy/60 dark:text-roura-sky/70 font-sans">
                    Estructura patrimonial extraída de CUADRO DE MANDO DEL AÑO 2029.xlsx (Auditoría CompanyGame)
                  </p>
                </div>
              </div>

              {/* Toggle Histórica vs Comparativa 2029-2028 */}
              <div className="flex items-center gap-1.5 bg-roura-beige-light dark:bg-roura-navy-dark p-1 rounded-lg border border-roura-beige-deep dark:border-roura-navy-light text-xs font-mono self-start sm:self-auto">
                <button
                  onClick={() => setBalanceSubView('historical')}
                  className={`px-3 py-1.5 rounded-md transition-all ${
                    balanceSubView === 'historical'
                      ? 'bg-roura-teal text-white font-bold shadow-sm'
                      : 'text-roura-navy/70 dark:text-roura-sky hover:text-roura-teal'
                  }`}
                >
                  Serie Histórica (2024 - 2029)
                </button>
                <button
                  onClick={() => setBalanceSubView('comparison')}
                  className={`px-3 py-1.5 rounded-md transition-all ${
                    balanceSubView === 'comparison'
                      ? 'bg-roura-teal text-white font-bold shadow-sm'
                      : 'text-roura-navy/70 dark:text-roura-sky hover:text-roura-teal'
                  }`}
                >
                  Comparativa 2029 vs 2028 (&Delta;)
                </button>
              </div>
            </div>
          </div>

          {/* KPI Summary Cards del Balance para 2029 */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
            <div className="p-3.5 rounded-xl bg-white dark:bg-roura-navy border border-roura-beige-dark dark:border-roura-navy-light shadow-sm text-center">
              <span className="text-[10px] font-mono uppercase text-roura-navy/60 dark:text-roura-sky/70 font-bold block">
                Activo Total (2029)
              </span>
              <span className="text-base sm:text-lg font-serif font-black text-roura-navy dark:text-white block mt-0.5">
                3.995.645 {currency}
              </span>
              <span className="text-[10px] text-roura-navy/60 dark:text-roura-sky/70 font-mono block">
                vs 4.148.888 (2028)
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-white dark:bg-roura-navy border border-roura-beige-dark dark:border-roura-navy-light shadow-sm text-center">
              <span className="text-[10px] font-mono uppercase text-roura-navy/60 dark:text-roura-sky/70 font-bold block">
                Total No Corriente
              </span>
              <span className="text-base sm:text-lg font-serif font-black text-roura-teal dark:text-roura-sky block mt-0.5">
                3.556.625 {currency}
              </span>
              <span className="text-[10px] text-tweed font-mono font-bold block">
                +16,6% (Inversión Telar)
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-white dark:bg-roura-navy border border-roura-beige-dark dark:border-roura-navy-light shadow-sm text-center">
              <span className="text-[10px] font-mono uppercase text-roura-navy/60 dark:text-roura-sky/70 font-bold block">
                Efectivo al Cierre
              </span>
              <span className="text-base sm:text-lg font-serif font-black text-rust block mt-0.5">
                0 {currency}
              </span>
              <span className="text-[10px] text-rust font-mono block">
                Tensión de liquidez
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-white dark:bg-roura-navy border border-roura-beige-dark dark:border-roura-navy-light shadow-sm text-center">
              <span className="text-[10px] font-mono uppercase text-roura-navy/60 dark:text-roura-sky/70 font-bold block">
                Patrimonio Neto
              </span>
              <span className="text-base sm:text-lg font-serif font-black text-tweed block mt-0.5">
                2.674.643 {currency}
              </span>
              <span className="text-[10px] text-tweed font-mono font-bold block">
                +15,8% (+365.700)
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-white dark:bg-roura-navy border border-roura-beige-dark dark:border-roura-navy-light shadow-sm text-center">
              <span className="text-[10px] font-mono uppercase text-roura-navy/60 dark:text-roura-sky/70 font-bold block">
                Deuda a Largo Plazo
              </span>
              <span className="text-base sm:text-lg font-serif font-black text-tweed block mt-0.5">
                784.750 {currency}
              </span>
              <span className="text-[10px] text-tweed font-mono font-bold block">
                -37,9% (Desapalancamiento)
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-white dark:bg-roura-navy border-2 border-rust/30 shadow-sm text-center">
              <span className="text-[10px] font-mono uppercase text-rust font-bold block">
                Crédito Extraord.
              </span>
              <span className="text-base sm:text-lg font-serif font-black text-rust block mt-0.5">
                102.332 {currency}
              </span>
              <span className="text-[10px] text-rust font-mono block">
                Saldo por caja 0
              </span>
            </div>
          </div>

          {/* TABLA: SERIE HISTÓRICA MULTI-ANUAL (2024 A 2029) */}
          {balanceSubView === 'historical' && (
            <div className="bg-white dark:bg-roura-navy border border-roura-beige-dark dark:border-roura-navy-light rounded-xl shadow-sm overflow-hidden">
              <div className="p-4 bg-roura-beige-light dark:bg-roura-navy-dark border-b border-roura-beige-dark dark:border-roura-navy-light flex justify-between items-center">
                <span className="font-serif font-bold text-sm text-roura-navy dark:text-white">
                  Balance de Situación Multi-Anual (Valores Oficiales en {currency})
                </span>
                <span className="text-xs font-mono text-roura-teal dark:text-roura-sky">
                  Columna seleccionada: <strong>{selectedYear} (P{selectedPeriod})</strong>
                </span>
              </div>

              <div className="overflow-x-auto w-full">
                <table className="w-full text-xs text-left">
                  <thead className="bg-roura-beige dark:bg-roura-navy-deep text-roura-navy dark:text-roura-sky uppercase font-mono text-[11px] border-b border-roura-beige-deep dark:border-roura-navy-light">
                    <tr>
                      <th className="py-3 px-4 font-bold">Concepto Contable</th>
                      <th className={`py-3 px-3 text-right font-bold ${selectedYear === 2029 ? 'bg-roura-teal/15 dark:bg-roura-teal/30 text-roura-teal dark:text-white ring-1 ring-roura-teal' : ''}`}>
                        2029 (P4)
                      </th>
                      <th className={`py-3 px-3 text-right font-bold ${selectedYear === 2028 ? 'bg-roura-teal/15 dark:bg-roura-teal/30 text-roura-teal dark:text-white ring-1 ring-roura-teal' : ''}`}>
                        2028 (P3)
                      </th>
                      <th className={`py-3 px-3 text-right font-bold ${selectedYear === 2027 ? 'bg-roura-teal/15 dark:bg-roura-teal/30 text-roura-teal dark:text-white ring-1 ring-roura-teal' : ''}`}>
                        2027 (P2)
                      </th>
                      <th className={`py-3 px-3 text-right font-bold ${selectedYear === 2026 ? 'bg-roura-teal/15 dark:bg-roura-teal/30 text-roura-teal dark:text-white ring-1 ring-roura-teal' : ''}`}>
                        2026 (P1)
                      </th>
                      <th className={`py-3 px-3 text-right font-bold ${selectedYear === 2025 ? 'bg-roura-teal/15 dark:bg-roura-teal/30 text-roura-teal dark:text-white ring-1 ring-roura-teal' : ''}`}>
                        2025 (Base)
                      </th>
                      <th className={`py-3 px-3 text-right font-bold ${selectedYear === 2024 ? 'bg-roura-teal/15 dark:bg-roura-teal/30 text-roura-teal dark:text-white ring-1 ring-roura-teal' : ''}`}>
                        2024
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-roura-beige-dark dark:divide-roura-navy-light/40 font-sans text-roura-navy dark:text-roura-beige-light">
                    {balanceSheetData.historical.slice(1).map((item, idx) => {
                      const isTotal = item.concept.startsWith('Total') ||
                                      item.concept.startsWith('Activo Total') ||
                                      item.concept.startsWith('Patrimonio Neto') ||
                                      item.concept.startsWith('Activos Fijos Neto');
                      const isSpecial = item.concept === 'Crédito Extraordinario' || item.concept === 'Efectivo - Disponible';

                      return (
                        <tr
                          key={idx}
                          className={`${
                            isTotal
                              ? 'font-bold bg-roura-beige-light/60 dark:bg-roura-navy-dark/40 text-roura-navy dark:text-white border-y border-roura-beige-deep dark:border-roura-navy-light'
                              : isSpecial
                              ? 'bg-amber-500/5'
                              : 'hover:bg-roura-beige-light/30 dark:hover:bg-roura-navy-dark/20'
                          }`}
                        >
                          <td className={`py-2 px-4 ${isTotal ? 'font-serif text-sm' : 'pl-6'}`}>
                            {item.concept}
                          </td>
                          <td className={`py-2 px-3 text-right font-mono tabular-nums ${selectedYear === 2029 ? 'font-bold bg-roura-teal/5' : ''} ${item.y2029 === 0 && isSpecial ? 'text-rust font-bold' : ''}`}>
                            {typeof item.y2029 === 'number' ? Math.round(item.y2029).toLocaleString() : item.y2029}
                          </td>
                          <td className={`py-2 px-3 text-right font-mono tabular-nums ${selectedYear === 2028 ? 'font-bold bg-roura-teal/5' : ''}`}>
                            {typeof item.y2028 === 'number' ? Math.round(item.y2028).toLocaleString() : item.y2028}
                          </td>
                          <td className={`py-2 px-3 text-right font-mono tabular-nums ${selectedYear === 2027 ? 'font-bold bg-roura-teal/5' : ''}`}>
                            {typeof item.y2027 === 'number' ? Math.round(item.y2027).toLocaleString() : item.y2027}
                          </td>
                          <td className={`py-2 px-3 text-right font-mono tabular-nums ${selectedYear === 2026 ? 'font-bold bg-roura-teal/5' : ''}`}>
                            {typeof item.y2026 === 'number' ? Math.round(item.y2026).toLocaleString() : item.y2026}
                          </td>
                          <td className={`py-2 px-3 text-right font-mono tabular-nums ${selectedYear === 2025 ? 'font-bold bg-roura-teal/5' : ''}`}>
                            {typeof item.y2025 === 'number' ? Math.round(item.y2025).toLocaleString() : item.y2025}
                          </td>
                          <td className={`py-2 px-3 text-right font-mono tabular-nums ${selectedYear === 2024 ? 'font-bold bg-roura-teal/5' : ''}`}>
                            {typeof item.y2024 === 'number' ? Math.round(item.y2024).toLocaleString() : item.y2024}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TABLA: COMPARATIVA 2029 VS 2028 CON DIFERENCIA Y VARIACIÓN % */}
          {balanceSubView === 'comparison' && (
            <div className="bg-white dark:bg-roura-navy border border-roura-beige-dark dark:border-roura-navy-light rounded-xl shadow-sm overflow-hidden">
              <div className="p-4 bg-roura-beige-light dark:bg-roura-navy-dark border-b border-roura-beige-dark dark:border-roura-navy-light flex justify-between items-center">
                <span className="font-serif font-bold text-sm text-roura-navy dark:text-white">
                  Balance Comparativo 2029 vs 2028 (Diferencia Absoluta & Variación Porcentual)
                </span>
                <span className="text-xs font-mono text-roura-teal dark:text-roura-sky">
                  Filas 7 a 32 de la hoja BALANCE
                </span>
              </div>

              <div className="overflow-x-auto w-full">
                <table className="w-full text-xs text-left">
                  <thead className="bg-roura-beige dark:bg-roura-navy-deep text-roura-navy dark:text-roura-sky uppercase font-mono text-[11px] border-b border-roura-beige-deep dark:border-roura-navy-light">
                    <tr>
                      <th className="py-3 px-4 font-bold">Concepto</th>
                      <th className="py-3 px-3 text-right font-bold">2029 ({currency})</th>
                      <th className="py-3 px-3 text-right font-bold">2028 ({currency})</th>
                      <th className="py-3 px-3 text-right font-bold">Diferencia (&Delta;)</th>
                      <th className="py-3 px-3 text-right font-bold">Variación (%)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-roura-beige-dark dark:divide-roura-navy-light/40 font-sans text-roura-navy dark:text-roura-beige-light">
                    {balanceSheetData.comparison2029_2028.slice(1).map((item, idx) => {
                      const isTotal = item.concept.includes('Total') ||
                                      item.concept.includes('Patrimonio') ||
                                      item.concept.includes('Activos Fijos');
                      const diffNum = parseFloat(item.diff);
                      const varNum = parseFloat(item.var);

                      return (
                        <tr
                          key={idx}
                          className={`${
                            isTotal
                              ? 'font-bold bg-roura-beige-light/60 dark:bg-roura-navy-dark/40 text-roura-navy dark:text-white'
                              : 'hover:bg-roura-beige-light/30 dark:hover:bg-roura-navy-dark/20'
                          }`}
                        >
                          <td className={`py-2 px-4 ${isTotal ? 'font-serif text-sm' : 'pl-6'}`}>
                            {item.concept}
                          </td>
                          <td className="py-2 px-3 text-right font-mono tabular-nums font-bold">
                            {isNaN(Number(item.y2029)) ? item.y2029 : Math.round(Number(item.y2029)).toLocaleString()}
                          </td>
                          <td className="py-2 px-3 text-right font-mono tabular-nums">
                            {isNaN(Number(item.y2028)) ? item.y2028 : Math.round(Number(item.y2028)).toLocaleString()}
                          </td>
                          <td className={`py-2 px-3 text-right font-mono tabular-nums font-semibold ${
                            !isNaN(diffNum) && diffNum > 0 ? 'text-tweed' : !isNaN(diffNum) && diffNum < 0 ? 'text-rust' : ''
                          }`}>
                            {!isNaN(diffNum) ? (diffNum > 0 ? `+${Math.round(diffNum).toLocaleString()}` : Math.round(diffNum).toLocaleString()) : item.diff}
                          </td>
                          <td className={`py-2 px-3 text-right font-mono tabular-nums font-bold ${
                            !isNaN(varNum) && varNum > 0 ? 'text-tweed' : !isNaN(varNum) && varNum < 0 ? 'text-rust' : ''
                          }`}>
                            {!isNaN(varNum) ? `${(varNum * 100).toFixed(1)}%` : item.var}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Notas Directivas & Explicación de Partidas del Balance */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-sans">
            <div className="p-4 rounded-xl bg-white dark:bg-roura-navy border border-roura-beige-dark dark:border-roura-navy-light shadow-sm">
              <div className="flex items-center gap-2 mb-2 text-roura-teal dark:text-roura-sky font-bold font-serif">
                <CheckCircle2 className="w-4 h-4 text-tweed" />
                <span>Patrimonio Neto & Resultados (+15,8%)</span>
              </div>
              <p className="text-roura-navy/70 dark:text-roura-sky/80 leading-relaxed">
                El Patrimonio Neto subió de 2.308.944 {currency} a <strong>2.674.643 {currency}</strong> (+365.700 {currency}) impulsado por la utilidad neta final. Las reservas acumulan -740.133 {currency} en recuperación.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white dark:bg-roura-navy border border-roura-beige-dark dark:border-roura-navy-light shadow-sm">
              <div className="flex items-center gap-2 mb-2 text-roura-teal dark:text-roura-sky font-bold font-serif">
                <TrendingDown className="w-4 h-4 text-tweed" />
                <span>Desapalancamiento Bancario (-37,9%)</span>
              </div>
              <p className="text-roura-navy/70 dark:text-roura-sky/80 leading-relaxed">
                El préstamo a largo plazo se recortó en -479.572 {currency}, cerrando en <strong>784.750 {currency}</strong> frente a 1.264.322 {currency} del ejercicio anterior, reduciendo los gastos financieros a 79.636 {currency}.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white dark:bg-roura-navy border border-rust/30 shadow-sm">
              <div className="flex items-center gap-2 mb-2 text-rust font-bold font-serif">
                <ShieldAlert className="w-4 h-4 text-rust" />
                <span>Crédito Extraordinario (102.332 {currency})</span>
              </div>
              <p className="text-roura-navy/70 dark:text-roura-sky/80 leading-relaxed">
                Al agotarse la caja al cierre (0 {currency}), el simulador activó automáticamente 102.332 {currency} de crédito extraordinario por desfase de cobros/pagos a corto plazo, siendo la prioridad de mejora en tesorería.
              </p>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
