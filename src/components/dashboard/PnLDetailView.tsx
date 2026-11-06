'use client';

import React from 'react';
import { SimulationDataset } from '../../types/corbatul';

interface PnLDetailViewProps {
  dataset: SimulationDataset;
  selectedPeriod: number;
}

type Polarity = 'revenue' | 'expense';

export const PnLDetailView: React.FC<PnLDetailViewProps> = ({
  dataset,
  selectedPeriod
}) => {
  const ourFirmId = dataset.meta.primaryFirmId;
  const currentFin = dataset.financials.find(f => f.firmId === ourFirmId && f.period === selectedPeriod);
  const prevFin = dataset.financials.find(f => f.firmId === ourFirmId && f.period === selectedPeriod - 1);

  const formatCurrency = (val?: number) => (val !== undefined ? `${Math.round(val).toLocaleString()} €` : '-');
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
          isFavorable ? 'text-tweed-dark' : 'text-rust'
        }`}
      >
        {delta > 0 ? '+' : ''}{delta.toFixed(1)}%
      </span>
    );
  };

  if (!currentFin) return null;

  return (
    <div className="space-y-6 w-full">
      {/* Header with High Projection Contrast */}
      <div className="bg-white border border-zinc-200 rounded-xl p-6 shadow-sm w-full">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-brass-DEFAULT" />
              <span className="text-xs uppercase font-mono font-bold text-zinc-600 tracking-widest">
                Rigor Contable Textil • ROURA 1940 (Equipo FINFORCE · ACBSP)
              </span>
            </div>
            <h2 className="text-2xl font-serif font-black text-zinc-900 mt-1">
              Estado de Resultados (P&L) y Estructura de Costes
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600 mt-0.5">
              Desglose analítico de ingresos, coste de ventas (COGS), gastos operativos y margen neto en Euros (€).
            </p>
          </div>
          <div className="text-right bg-zinc-50 px-5 py-3 rounded-lg border border-zinc-200 shadow-inner">
            <span className="text-xs uppercase tracking-wider font-mono text-zinc-600 block">
              Margen Bruto P{selectedPeriod} ({2025 + selectedPeriod})
            </span>
            <div className="text-3xl font-serif font-black text-zinc-950 tabular-nums">
              {formatPercent(currentFin.grossMargin)}
            </div>
          </div>
        </div>
      </div>

      {/* Waterfall Breakdown Cards with Crisp Boardroom Contrast */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
        <div className="bg-white border border-zinc-200 rounded-xl p-5 shadow-sm">
          <div className="text-xs font-mono uppercase font-bold text-zinc-600 tracking-wider">
            1. Ingresos Totales
          </div>
          <div className="text-2xl sm:text-3xl font-serif font-bold text-zinc-950 mt-1 tabular-nums">
            {formatCurrency(currentFin.totalRevenue)}
          </div>
          <div className="text-xs text-zinc-600 mt-2 font-medium">
            Corbatas: <span className="tabular-nums font-mono text-zinc-800">{formatCurrency(currentFin.revenueStandard)}</span> | Bufandas: <span className="tabular-nums font-mono text-zinc-800">{formatCurrency(currentFin.revenuePremium)}</span> | Calcetines: <span className="tabular-nums font-mono text-zinc-800">{formatCurrency(currentFin.revenueSocks ?? 0)}</span>
          </div>
        </div>

        <div className="bg-white border-2 border-rust/40 rounded-xl p-5 shadow-sm">
          <div className="text-xs font-mono uppercase font-bold text-rust tracking-wider">
            2. Costo de Ventas (COGS)
          </div>
          <div className="text-2xl sm:text-3xl font-serif font-bold text-rust-dark mt-1 tabular-nums">
            -{formatCurrency(currentFin.costOfGoodsSold.totalCOGS)}
          </div>
          <div className="text-xs text-zinc-700 mt-2 font-semibold">
            Representa el <span className="tabular-nums font-mono font-bold text-rust">{((currentFin.costOfGoodsSold.totalCOGS / currentFin.totalRevenue) * 100).toFixed(1)}%</span> de las ventas
          </div>
        </div>

        <div className="bg-white border border-brass-DEFAULT/40 rounded-xl p-5 shadow-sm">
          <div className="text-xs font-mono uppercase font-bold text-brass-dark tracking-wider">
            3. Gastos Operativos (OPEX)
          </div>
          <div className="text-2xl sm:text-3xl font-serif font-bold text-zinc-900 mt-1 tabular-nums">
            -{formatCurrency(currentFin.operatingExpenses.totalOPEX)}
          </div>
          <div className="text-xs text-zinc-700 mt-2 font-medium">
            Comercial, Admin, Mant. y Calidad
          </div>
        </div>

        <div className="bg-white border-2 border-tweed/50 rounded-xl p-5 shadow-sm">
          <div className="text-xs font-mono uppercase font-bold text-tweed-dark tracking-wider">
            4. Utilidad Neta Final
          </div>
          <div className="text-2xl sm:text-3xl font-serif font-black text-tweed-dark mt-1 tabular-nums">
            {formatCurrency(currentFin.netIncome)}
          </div>
          <div className="text-xs text-zinc-800 mt-2 font-bold">
            Margen Neto (ROS): <span className="tabular-nums font-mono text-tweed-dark">{formatPercent(currentFin.netMargin)}</span>
          </div>
        </div>
      </div>

      {/* Detailed P&L Statement Table with Polarities & High Contrast */}
      <div className="bg-white border border-zinc-200 rounded-xl shadow-sm overflow-hidden w-full">
        <div className="p-4 bg-zinc-50 border-b border-zinc-200 flex justify-between items-center">
          <h3 className="font-serif font-bold text-sm text-zinc-900">
            Estado de Resultados Detallado (Auditoría Financiera - ROURA 1940 / FINFORCE)
          </h3>
          <div className="flex items-center gap-3 text-xs font-mono text-zinc-600 font-semibold">
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
            <thead className="bg-zinc-100 text-zinc-800 uppercase font-mono text-[11px] border-b border-zinc-200 font-semibold">
              <tr>
                <th className="py-3 px-4">Línea del P&L</th>
                <th className="py-3 px-4 text-right">Periodo Actual (P{selectedPeriod} · {2025 + selectedPeriod})</th>
                <th className="py-3 px-4 text-right">% Ventas</th>
                <th className="py-3 px-4 text-right">Periodo Anterior ({prevFin ? `P${prevFin.period} · ${2025 + prevFin.period}` : 'N/A'})</th>
                <th className="py-3 px-4 text-right">Variación (Δ%)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 font-sans">
              {/* INGRESOS */}
              <tr className="font-bold bg-zinc-50/70">
                <td className="py-3 px-4 text-zinc-950 font-serif text-sm">INGRESOS POR VENTAS TOTALES</td>
                <td className="py-3 px-4 text-right font-mono text-zinc-950 font-black text-sm tabular-nums">{formatCurrency(currentFin.totalRevenue)}</td>
                <td className="py-3 px-4 text-right text-zinc-700 font-mono tabular-nums">100.0%</td>
                <td className="py-3 px-4 text-right text-zinc-700 font-mono tabular-nums">{formatCurrency(prevFin?.totalRevenue)}</td>
                <td className="py-3 px-4 text-right">{renderVariance(currentFin.totalRevenue, prevFin?.totalRevenue, 'revenue')}</td>
              </tr>
              <tr>
                <td className="py-2 px-8 text-zinc-800">Ventas Línea Corbatas (Core / Masivo)</td>
                <td className="py-2 px-4 text-right font-mono text-zinc-900 tabular-nums">{formatCurrency(currentFin.revenueStandard)}</td>
                <td className="py-2 px-4 text-right font-mono text-zinc-600 tabular-nums">{((currentFin.revenueStandard / currentFin.totalRevenue) * 100).toFixed(1)}%</td>
                <td className="py-2 px-4 text-right font-mono text-zinc-600 tabular-nums">{formatCurrency(prevFin?.revenueStandard)}</td>
                <td className="py-2 px-4 text-right">{renderVariance(currentFin.revenueStandard, prevFin?.revenueStandard, 'revenue')}</td>
              </tr>
              <tr>
                <td className="py-2 px-8 text-zinc-800">Ventas Línea Bufandas (Premium / Temporada)</td>
                <td className="py-2 px-4 text-right font-mono text-zinc-900 tabular-nums">{formatCurrency(currentFin.revenuePremium)}</td>
                <td className="py-2 px-4 text-right font-mono text-zinc-600 tabular-nums">{((currentFin.revenuePremium / currentFin.totalRevenue) * 100).toFixed(1)}%</td>
                <td className="py-2 px-4 text-right font-mono text-zinc-600 tabular-nums">{formatCurrency(prevFin?.revenuePremium)}</td>
                <td className="py-2 px-4 text-right">{renderVariance(currentFin.revenuePremium, prevFin?.revenuePremium, 'revenue')}</td>
              </tr>
              <tr>
                <td className="py-2 px-8 text-zinc-800">Ventas Línea Calcetines (Complementario / Entrada)</td>
                <td className="py-2 px-4 text-right font-mono text-zinc-900 tabular-nums">{formatCurrency(currentFin.revenueSocks ?? 0)}</td>
                <td className="py-2 px-4 text-right font-mono text-zinc-600 tabular-nums">{(((currentFin.revenueSocks ?? 0) / currentFin.totalRevenue) * 100).toFixed(1)}%</td>
                <td className="py-2 px-4 text-right font-mono text-zinc-600 tabular-nums">{formatCurrency(prevFin?.revenueSocks ?? 0)}</td>
                <td className="py-2 px-4 text-right">{renderVariance(currentFin.revenueSocks, prevFin?.revenueSocks, 'revenue')}</td>
              </tr>

              {/* COGS (Costo de Ventas - Polaridad Expense) */}
              <tr className="font-bold bg-rust-light/30 text-rust-dark">
                <td className="py-3 px-4 font-serif text-sm">(-) COSTO DE VENTAS (COGS)</td>
                <td className="py-3 px-4 text-right font-mono tabular-nums text-sm font-bold text-rust-dark">{formatCurrency(currentFin.costOfGoodsSold.totalCOGS)}</td>
                <td className="py-3 px-4 text-right font-mono tabular-nums text-rust-dark">{((currentFin.costOfGoodsSold.totalCOGS / currentFin.totalRevenue) * 100).toFixed(1)}%</td>
                <td className="py-3 px-4 text-right font-mono tabular-nums text-zinc-700">{formatCurrency(prevFin?.costOfGoodsSold.totalCOGS)}</td>
                <td className="py-3 px-4 text-right">{renderVariance(currentFin.costOfGoodsSold.totalCOGS, prevFin?.costOfGoodsSold.totalCOGS, 'expense')}</td>
              </tr>
              <tr>
                <td className="py-2 px-8 text-zinc-800">Materia Prima Directa (Telas & Hilados)</td>
                <td className="py-2 px-4 text-right font-mono text-zinc-900 tabular-nums">{formatCurrency(currentFin.costOfGoodsSold.rawMaterialsUsed)}</td>
                <td className="py-2 px-4 text-right font-mono text-zinc-600 tabular-nums">{((currentFin.costOfGoodsSold.rawMaterialsUsed / currentFin.totalRevenue) * 100).toFixed(1)}%</td>
                <td className="py-2 px-4 text-right font-mono text-zinc-600 tabular-nums">{formatCurrency(prevFin?.costOfGoodsSold.rawMaterialsUsed)}</td>
                <td className="py-2 px-4 text-right">{renderVariance(currentFin.costOfGoodsSold.rawMaterialsUsed, prevFin?.costOfGoodsSold.rawMaterialsUsed, 'expense')}</td>
              </tr>
              <tr>
                <td className="py-2 px-8 text-zinc-800">Mano de Obra Directa (Turno Ordinario)</td>
                <td className="py-2 px-4 text-right font-mono text-zinc-900 tabular-nums">{formatCurrency(currentFin.costOfGoodsSold.directLaborRegular)}</td>
                <td className="py-2 px-4 text-right font-mono text-zinc-600 tabular-nums">{((currentFin.costOfGoodsSold.directLaborRegular / currentFin.totalRevenue) * 100).toFixed(1)}%</td>
                <td className="py-2 px-4 text-right font-mono text-zinc-600 tabular-nums">{formatCurrency(prevFin?.costOfGoodsSold.directLaborRegular)}</td>
                <td className="py-2 px-4 text-right">{renderVariance(currentFin.costOfGoodsSold.directLaborRegular, prevFin?.costOfGoodsSold.directLaborRegular, 'expense')}</td>
              </tr>
              <tr>
                <td className="py-2 px-8 text-zinc-800">Mano de Obra Directa (Horas Extras / Turno 3)</td>
                <td className="py-2 px-4 text-right font-mono text-rust font-bold tabular-nums">{formatCurrency(currentFin.costOfGoodsSold.directLaborOvertime)}</td>
                <td className="py-2 px-4 text-right font-mono text-zinc-600 tabular-nums">{((currentFin.costOfGoodsSold.directLaborOvertime / currentFin.totalRevenue) * 100).toFixed(1)}%</td>
                <td className="py-2 px-4 text-right font-mono text-zinc-600 tabular-nums">{formatCurrency(prevFin?.costOfGoodsSold.directLaborOvertime)}</td>
                <td className="py-2 px-4 text-right">{renderVariance(currentFin.costOfGoodsSold.directLaborOvertime, prevFin?.costOfGoodsSold.directLaborOvertime, 'expense')}</td>
              </tr>
              <tr>
                <td className="py-2 px-8 text-zinc-800">Costos Indirectos de Fabricación (CIF)</td>
                <td className="py-2 px-4 text-right font-mono text-zinc-900 tabular-nums">{formatCurrency(currentFin.costOfGoodsSold.factoryOverhead)}</td>
                <td className="py-2 px-4 text-right font-mono text-zinc-600 tabular-nums">{((currentFin.costOfGoodsSold.factoryOverhead / currentFin.totalRevenue) * 100).toFixed(1)}%</td>
                <td className="py-2 px-4 text-right font-mono text-zinc-600 tabular-nums">{formatCurrency(prevFin?.costOfGoodsSold.factoryOverhead)}</td>
                <td className="py-2 px-4 text-right">{renderVariance(currentFin.costOfGoodsSold.factoryOverhead, prevFin?.costOfGoodsSold.factoryOverhead, 'expense')}</td>
              </tr>
              <tr>
                <td className="py-2 px-8 text-zinc-800">Depreciación de Maquinaria y Telares</td>
                <td className="py-2 px-4 text-right font-mono text-zinc-900 tabular-nums">{formatCurrency(currentFin.costOfGoodsSold.plantDepreciation)}</td>
                <td className="py-2 px-4 text-right font-mono text-zinc-600 tabular-nums">{((currentFin.costOfGoodsSold.plantDepreciation / currentFin.totalRevenue) * 100).toFixed(1)}%</td>
                <td className="py-2 px-4 text-right font-mono text-zinc-600 tabular-nums">{formatCurrency(prevFin?.costOfGoodsSold.plantDepreciation)}</td>
                <td className="py-2 px-4 text-right">{renderVariance(currentFin.costOfGoodsSold.plantDepreciation, prevFin?.costOfGoodsSold.plantDepreciation, 'expense')}</td>
              </tr>

              {/* UTILIDAD BRUTA (Polaridad Revenue) */}
              <tr className="font-bold bg-amber-50/50 text-zinc-950 border-y-2 border-zinc-300">
                <td className="py-3 px-4 font-serif text-sm">(=) UTILIDAD BRUTA</td>
                <td className="py-3 px-4 text-right font-mono font-black text-sm text-zinc-950 tabular-nums">{formatCurrency(currentFin.grossProfit)}</td>
                <td className="py-3 px-4 text-right font-mono font-bold text-zinc-950 tabular-nums">{formatPercent(currentFin.grossMargin)}</td>
                <td className="py-3 px-4 text-right font-mono text-zinc-700 tabular-nums">{formatCurrency(prevFin?.grossProfit)}</td>
                <td className="py-3 px-4 text-right">{renderVariance(currentFin.grossProfit, prevFin?.grossProfit, 'revenue')}</td>
              </tr>

              {/* OPEX (Gastos Operativos - Polaridad Expense) */}
              <tr className="font-bold bg-zinc-50 text-zinc-900">
                <td className="py-3 px-4 font-serif text-sm">(-) GASTOS OPERATIVOS (OPEX)</td>
                <td className="py-3 px-4 text-right font-mono tabular-nums text-zinc-950 font-bold">{formatCurrency(currentFin.operatingExpenses.totalOPEX)}</td>
                <td className="py-3 px-4 text-right font-mono text-zinc-700 tabular-nums">{((currentFin.operatingExpenses.totalOPEX / currentFin.totalRevenue) * 100).toFixed(1)}%</td>
                <td className="py-3 px-4 text-right font-mono text-zinc-700 tabular-nums">{formatCurrency(prevFin?.operatingExpenses.totalOPEX)}</td>
                <td className="py-3 px-4 text-right">{renderVariance(currentFin.operatingExpenses.totalOPEX, prevFin?.operatingExpenses.totalOPEX, 'expense')}</td>
              </tr>
              <tr>
                <td className="py-2 px-8 text-zinc-800">Marketing & Publicidad de Moda</td>
                <td className="py-2 px-4 text-right font-mono text-zinc-900 tabular-nums">{formatCurrency(currentFin.operatingExpenses.marketingAndAdvertising)}</td>
                <td className="py-2 px-4 text-right font-mono text-zinc-600 tabular-nums">{((currentFin.operatingExpenses.marketingAndAdvertising / currentFin.totalRevenue) * 100).toFixed(1)}%</td>
                <td className="py-2 px-4 text-right font-mono text-zinc-600 tabular-nums">{formatCurrency(prevFin?.operatingExpenses.marketingAndAdvertising)}</td>
                <td className="py-2 px-4 text-right">{renderVariance(currentFin.operatingExpenses.marketingAndAdvertising, prevFin?.operatingExpenses.marketingAndAdvertising, 'expense')}</td>
              </tr>
              <tr>
                <td className="py-2 px-8 text-zinc-800">Fuerza de Ventas / Red Comercial</td>
                <td className="py-2 px-4 text-right font-mono text-zinc-900 tabular-nums">{formatCurrency(currentFin.operatingExpenses.salesForcePayroll)}</td>
                <td className="py-2 px-4 text-right font-mono text-zinc-600 tabular-nums">{((currentFin.operatingExpenses.salesForcePayroll / currentFin.totalRevenue) * 100).toFixed(1)}%</td>
                <td className="py-2 px-4 text-right font-mono text-zinc-600 tabular-nums">{formatCurrency(prevFin?.operatingExpenses.salesForcePayroll)}</td>
                <td className="py-2 px-4 text-right">{renderVariance(currentFin.operatingExpenses.salesForcePayroll, prevFin?.operatingExpenses.salesForcePayroll, 'expense')}</td>
              </tr>
              <tr>
                <td className="py-2 px-8 text-zinc-800">Aseguramiento de Calidad y Mantenimiento</td>
                <td className="py-2 px-4 text-right font-mono text-zinc-900 tabular-nums">{formatCurrency(currentFin.operatingExpenses.qualityAssurance + currentFin.operatingExpenses.plantMaintenance)}</td>
                <td className="py-2 px-4 text-right font-mono text-zinc-600 tabular-nums">{(((currentFin.operatingExpenses.qualityAssurance + currentFin.operatingExpenses.plantMaintenance) / currentFin.totalRevenue) * 100).toFixed(1)}%</td>
                <td className="py-2 px-4 text-right font-mono text-zinc-600 tabular-nums">{formatCurrency((prevFin?.operatingExpenses.qualityAssurance || 0) + (prevFin?.operatingExpenses.plantMaintenance || 0))}</td>
                <td className="py-2 px-4 text-right">{renderVariance(currentFin.operatingExpenses.qualityAssurance + currentFin.operatingExpenses.plantMaintenance, (prevFin?.operatingExpenses.qualityAssurance || 0) + (prevFin?.operatingExpenses.plantMaintenance || 0), 'expense')}</td>
              </tr>

              {/* EBIT & EBITDA (Polaridad Revenue) */}
              <tr className="font-semibold bg-zinc-50/70 border-t border-zinc-200">
                <td className="py-2.5 px-4 text-zinc-900 font-serif">EBITDA (Flujo Operativo Bruto)</td>
                <td className="py-2.5 px-4 text-right font-mono font-bold text-zinc-950 tabular-nums">{formatCurrency(currentFin.ebitda)}</td>
                <td className="py-2.5 px-4 text-right font-mono text-zinc-700 tabular-nums">{((currentFin.ebitda / currentFin.totalRevenue) * 100).toFixed(1)}%</td>
                <td className="py-2.5 px-4 text-right font-mono text-zinc-600 tabular-nums">{formatCurrency(prevFin?.ebitda)}</td>
                <td className="py-2.5 px-4 text-right">{renderVariance(currentFin.ebitda, prevFin?.ebitda, 'revenue')}</td>
              </tr>
              <tr className="font-semibold bg-zinc-50/70">
                <td className="py-2.5 px-4 text-zinc-900 font-serif">(=) EBIT (Utilidad Operativa)</td>
                <td className="py-2.5 px-4 text-right font-mono font-bold text-zinc-950 tabular-nums">{formatCurrency(currentFin.ebit)}</td>
                <td className="py-2.5 px-4 text-right font-mono font-bold text-zinc-950 tabular-nums">{formatPercent(currentFin.operatingMargin)}</td>
                <td className="py-2.5 px-4 text-right font-mono text-zinc-600 tabular-nums">{formatCurrency(prevFin?.ebit)}</td>
                <td className="py-2.5 px-4 text-right">{renderVariance(currentFin.ebit, prevFin?.ebit, 'revenue')}</td>
              </tr>

              {/* Financieros e Impuestos (Polaridad Expense) */}
              <tr>
                <td className="py-2 px-4 text-zinc-800">(-) Costos Financieros Netos</td>
                <td className="py-2 px-4 text-right font-mono text-zinc-900 tabular-nums">{formatCurrency(currentFin.financialResults.netFinancialCost)}</td>
                <td className="py-2 px-4 text-right font-mono text-zinc-600 tabular-nums">{((currentFin.financialResults.netFinancialCost / currentFin.totalRevenue) * 100).toFixed(1)}%</td>
                <td className="py-2 px-4 text-right font-mono text-zinc-600 tabular-nums">{formatCurrency(prevFin?.financialResults.netFinancialCost)}</td>
                <td className="py-2 px-4 text-right">{renderVariance(currentFin.financialResults.netFinancialCost, prevFin?.financialResults.netFinancialCost, 'expense')}</td>
              </tr>
              <tr>
                <td className="py-2 px-4 text-zinc-800">(-) Provisión Impuesto a la Renta</td>
                <td className="py-2 px-4 text-right font-mono text-zinc-900 tabular-nums">{formatCurrency(currentFin.incomeTaxes)}</td>
                <td className="py-2 px-4 text-right font-mono text-zinc-600 tabular-nums">{((currentFin.incomeTaxes / currentFin.totalRevenue) * 100).toFixed(1)}%</td>
                <td className="py-2 px-4 text-right font-mono text-zinc-600 tabular-nums">{formatCurrency(prevFin?.incomeTaxes)}</td>
                <td className="py-2 px-4 text-right">{renderVariance(currentFin.incomeTaxes, prevFin?.incomeTaxes, 'expense')}</td>
              </tr>
              <tr>
                <td className="py-2 px-4 text-zinc-800">(+/-) Resultados Extraordinarios</td>
                <td className="py-2 px-4 text-right font-mono text-zinc-900 tabular-nums">{formatCurrency(currentFin.extraordinaryIncome ?? 0)}</td>
                <td className="py-2 px-4 text-right font-mono text-zinc-600 tabular-nums">{(((currentFin.extraordinaryIncome ?? 0) / currentFin.totalRevenue) * 100).toFixed(1)}%</td>
                <td className="py-2 px-4 text-right font-mono text-zinc-600 tabular-nums">{formatCurrency(prevFin?.extraordinaryIncome ?? 0)}</td>
                <td className="py-2 px-4 text-right">{renderVariance(currentFin.extraordinaryIncome ?? 0, prevFin?.extraordinaryIncome ?? 0, 'revenue')}</td>
              </tr>

              {/* UTILIDAD NETA (Polaridad Revenue) */}
              <tr className="font-extrabold bg-tweed-light/80 text-tweed-dark text-sm border-t-2 border-tweed">
                <td className="py-3 px-4 font-serif">(=) UTILIDAD NETA DEL EJERCICIO</td>
                <td className="py-3 px-4 text-right font-mono text-tweed-dark font-black tabular-nums">{formatCurrency(currentFin.netIncome)}</td>
                <td className="py-3 px-4 text-right font-mono text-tweed-dark font-black tabular-nums">{formatPercent(currentFin.netMargin)}</td>
                <td className="py-3 px-4 text-right font-mono text-zinc-700 tabular-nums">{formatCurrency(prevFin?.netIncome)}</td>
                <td className="py-3 px-4 text-right">{renderVariance(currentFin.netIncome, prevFin?.netIncome, 'revenue')}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
