'use client';

import React from 'react';
import { SimulationDataset } from '../../types/corbatul';
import { FileText, Landmark } from 'lucide-react';

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

  const renderVariance = (curr?: number, prev?: number, polarity: Polarity = 'revenue') => {
    if (curr === undefined || prev === undefined || prev === 0) {
      return <span className="text-slate-steel/40 font-mono text-xs tabular-nums">-</span>;
    }
    const delta = ((curr - prev) / Math.abs(prev)) * 100;

    if (Math.abs(delta) < 0.05) {
      return <span className="text-xs font-mono tabular-nums text-slate-steel/50">0.0%</span>;
    }

    const isFavorable = polarity === 'revenue' ? delta > 0 : delta < 0;

    return (
      <span className={`text-xs font-mono tabular-nums font-semibold ${isFavorable ? 'text-slate-steel font-bold' : 'text-rosewood'}`}>
        {delta > 0 ? '+' : ''}{delta.toFixed(1)}%
      </span>
    );
  };

  if (!currentFin) return null;

  return (
    <div className="space-y-6 w-full">
      {/* Top Banner */}
      <div className="bg-white border border-mineral/40 rounded-2xl p-6 shadow-minimal w-full">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-slate-steel" />
              <span className="text-[11px] uppercase font-mono font-semibold text-slate-steel/70 tracking-widest">
                Auditoría Contable · PuntoOne (FINEDGE)
              </span>
            </div>
            <h2 className="text-2xl font-sans font-bold text-slate-steel">
              Estado de Resultados (P&L) y Cascada Financiera
            </h2>
            <p className="text-xs text-slate-steel/70 mt-0.5 font-normal">
              Desglose verificado de ingresos por producto, costes de fabricación, absorción de gastos y margen neto en Euros (€).
            </p>
          </div>
          <div className="text-right bg-mineral-50 px-5 py-3 rounded-xl border border-mineral/40">
            <span className="text-[10px] uppercase tracking-wider font-mono text-slate-steel/60 block">
              Margen Bruto P{selectedPeriod} ({2025 + selectedPeriod})
            </span>
            <div className="text-2xl sm:text-3xl font-mono font-bold text-rosewood tabular-nums">
              {formatPercent(currentFin.grossMargin)}
            </div>
          </div>
        </div>
      </div>

      {/* Main P&L Statement Table */}
      <div className="bg-white border border-mineral/40 rounded-2xl p-6 shadow-minimal overflow-x-auto">
        <h3 className="text-sm font-mono uppercase tracking-wider font-bold text-slate-steel mb-4 flex items-center gap-2">
          <FileText className="w-4 h-4 text-slate-steel" />
          <span>Cuenta de Pérdidas y Ganancias (Periodo {selectedPeriod})</span>
        </h3>

        <table className="w-full text-left border-collapse text-xs font-mono">
          <thead>
            <tr className="border-b border-mineral/40 text-slate-steel/60 bg-mineral-50/60">
              <th className="py-2.5 px-4 font-semibold">Partida Contable</th>
              <th className="py-2.5 px-4 font-semibold text-right">P{selectedPeriod} ({2025 + selectedPeriod})</th>
              <th className="py-2.5 px-4 font-semibold text-right">P{selectedPeriod - 1} ({2024 + selectedPeriod})</th>
              <th className="py-2.5 px-4 font-semibold text-right">Variación (Δ%)</th>
              <th className="py-2.5 px-4 font-semibold text-right">% s/ Ventas</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-mineral/30 text-slate-steel">
            {/* 1. INGRESOS */}
            <tr className="bg-mineral-50/60 font-semibold text-slate-steel">
              <td className="py-2.5 px-4">INGRESOS TOTALES</td>
              <td className="py-2.5 px-4 text-right font-bold tabular-nums">{formatCurrency(currentFin.totalRevenue)}</td>
              <td className="py-2.5 px-4 text-right tabular-nums text-slate-steel/60">{formatCurrency(prevFin?.totalRevenue)}</td>
              <td className="py-2.5 px-4 text-right">{renderVariance(currentFin.totalRevenue, prevFin?.totalRevenue, 'revenue')}</td>
              <td className="py-2.5 px-4 text-right text-slate-steel/60">100.0%</td>
            </tr>
            <tr className="text-slate-steel/80">
              <td className="py-2 px-8">├── Ventas Corbatas</td>
              <td className="py-2 px-4 text-right tabular-nums">{formatCurrency(currentFin.revenueStandard)}</td>
              <td className="py-2 px-4 text-right tabular-nums text-slate-steel/60">{formatCurrency(prevFin?.revenueStandard)}</td>
              <td className="py-2 px-4 text-right">{renderVariance(currentFin.revenueStandard, prevFin?.revenueStandard, 'revenue')}</td>
              <td className="py-2 px-4 text-right text-slate-steel/60">{formatPercent(currentFin.revenueStandard / currentFin.totalRevenue)}</td>
            </tr>
            <tr className="text-slate-steel/80">
              <td className="py-2 px-8">├── Ventas Bufandas</td>
              <td className="py-2 px-4 text-right tabular-nums font-medium text-rosewood">{formatCurrency(currentFin.revenuePremium)}</td>
              <td className="py-2 px-4 text-right tabular-nums text-slate-steel/60">{formatCurrency(prevFin?.revenuePremium)}</td>
              <td className="py-2 px-4 text-right">{renderVariance(currentFin.revenuePremium, prevFin?.revenuePremium, 'revenue')}</td>
              <td className="py-2 px-4 text-right text-slate-steel/60">{formatPercent(currentFin.revenuePremium / currentFin.totalRevenue)}</td>
            </tr>
            <tr className="text-slate-steel/80">
              <td className="py-2 px-8">└── Ventas Calcetines</td>
              <td className="py-2 px-4 text-right tabular-nums">{formatCurrency(currentFin.revenueSocks)}</td>
              <td className="py-2 px-4 text-right tabular-nums text-slate-steel/60">{formatCurrency(prevFin?.revenueSocks)}</td>
              <td className="py-2 px-4 text-right">{renderVariance(currentFin.revenueSocks, prevFin?.revenueSocks, 'revenue')}</td>
              <td className="py-2 px-4 text-right text-slate-steel/60">{formatPercent((currentFin.revenueSocks || 0) / currentFin.totalRevenue)}</td>
            </tr>

            {/* 2. COGS */}
            <tr className="bg-mineral-50/60 font-semibold text-slate-steel">
              <td className="py-2.5 px-4">COSTE DE LAS VENTAS (COGS)</td>
              <td className="py-2.5 px-4 text-right tabular-nums text-rosewood">-{formatCurrency(currentFin.costOfGoodsSold.totalCOGS)}</td>
              <td className="py-2.5 px-4 text-right tabular-nums text-slate-steel/60">-{formatCurrency(prevFin?.costOfGoodsSold.totalCOGS)}</td>
              <td className="py-2.5 px-4 text-right">{renderVariance(currentFin.costOfGoodsSold.totalCOGS, prevFin?.costOfGoodsSold.totalCOGS, 'expense')}</td>
              <td className="py-2.5 px-4 text-right text-slate-steel/60">{formatPercent(currentFin.costOfGoodsSold.totalCOGS / currentFin.totalRevenue)}</td>
            </tr>

            {/* 3. MARGEN BRUTO */}
            <tr className="bg-blush/20 font-bold text-slate-steel">
              <td className="py-3 px-4">MARGEN BRUTO</td>
              <td className="py-3 px-4 text-right font-bold text-rosewood tabular-nums">{formatCurrency(currentFin.grossProfit)}</td>
              <td className="py-3 px-4 text-right tabular-nums text-slate-steel/60">{formatCurrency(prevFin?.grossProfit)}</td>
              <td className="py-3 px-4 text-right">{renderVariance(currentFin.grossProfit, prevFin?.grossProfit, 'revenue')}</td>
              <td className="py-3 px-4 text-right font-bold">{formatPercent(currentFin.grossMargin)}</td>
            </tr>

            {/* 4. OPEX */}
            <tr className="bg-mineral-50/60 font-semibold text-slate-steel">
              <td className="py-2.5 px-4">GASTOS DE OPERACIÓN (OPEX)</td>
              <td className="py-2.5 px-4 text-right tabular-nums">-{formatCurrency(currentFin.operatingExpenses.totalOPEX)}</td>
              <td className="py-2.5 px-4 text-right tabular-nums text-slate-steel/60">-{formatCurrency(prevFin?.operatingExpenses.totalOPEX)}</td>
              <td className="py-2.5 px-4 text-right">{renderVariance(currentFin.operatingExpenses.totalOPEX, prevFin?.operatingExpenses.totalOPEX, 'expense')}</td>
              <td className="py-2.5 px-4 text-right text-slate-steel/60">{formatPercent(currentFin.operatingExpenses.totalOPEX / currentFin.totalRevenue)}</td>
            </tr>
            <tr className="text-slate-steel/70">
              <td className="py-2 px-8">├── Gastos de Marketing y Marca</td>
              <td className="py-2 px-4 text-right tabular-nums">-{formatCurrency(currentFin.operatingExpenses.marketingAndAdvertising)}</td>
              <td className="py-2 px-4 text-right tabular-nums text-slate-steel/60">-{formatCurrency(prevFin?.operatingExpenses.marketingAndAdvertising)}</td>
              <td className="py-2 px-4 text-right">{renderVariance(currentFin.operatingExpenses.marketingAndAdvertising, prevFin?.operatingExpenses.marketingAndAdvertising, 'expense')}</td>
              <td className="py-2 px-4 text-right text-slate-steel/60">{formatPercent(currentFin.operatingExpenses.marketingAndAdvertising / currentFin.totalRevenue)}</td>
            </tr>
            <tr className="text-slate-steel/70">
              <td className="py-2 px-8">├── Personal de Estructura</td>
              <td className="py-2 px-4 text-right tabular-nums">-{formatCurrency(currentFin.operatingExpenses.salesForcePayroll)}</td>
              <td className="py-2 px-4 text-right tabular-nums text-slate-steel/60">-{formatCurrency(prevFin?.operatingExpenses.salesForcePayroll)}</td>
              <td className="py-2 px-4 text-right">{renderVariance(currentFin.operatingExpenses.salesForcePayroll, prevFin?.operatingExpenses.salesForcePayroll, 'expense')}</td>
              <td className="py-2 px-4 text-right text-slate-steel/60">{formatPercent(currentFin.operatingExpenses.salesForcePayroll / currentFin.totalRevenue)}</td>
            </tr>
            <tr className="text-slate-steel/70">
              <td className="py-2 px-8">├── Calidad y Diseño I+D</td>
              <td className="py-2 px-4 text-right tabular-nums">-{formatCurrency(currentFin.operatingExpenses.qualityAssurance)}</td>
              <td className="py-2 px-4 text-right tabular-nums text-slate-steel/60">-{formatCurrency(prevFin?.operatingExpenses.qualityAssurance)}</td>
              <td className="py-2 px-4 text-right">{renderVariance(currentFin.operatingExpenses.qualityAssurance, prevFin?.operatingExpenses.qualityAssurance, 'expense')}</td>
              <td className="py-2 px-4 text-right text-slate-steel/60">{formatPercent(currentFin.operatingExpenses.qualityAssurance / currentFin.totalRevenue)}</td>
            </tr>
            <tr className="text-slate-steel/70">
              <td className="py-2 px-8">└── Gastos Generales</td>
              <td className="py-2 px-4 text-right tabular-nums">-{formatCurrency(currentFin.operatingExpenses.generalAdministrative)}</td>
              <td className="py-2 px-4 text-right tabular-nums text-slate-steel/60">-{formatCurrency(prevFin?.operatingExpenses.generalAdministrative)}</td>
              <td className="py-2 px-4 text-right">{renderVariance(currentFin.operatingExpenses.generalAdministrative, prevFin?.operatingExpenses.generalAdministrative, 'expense')}</td>
              <td className="py-2 px-4 text-right text-slate-steel/60">{formatPercent(currentFin.operatingExpenses.generalAdministrative / currentFin.totalRevenue)}</td>
            </tr>

            {/* 5. EBIT */}
            <tr className="bg-mineral-50/60 font-semibold text-slate-steel">
              <td className="py-2.5 px-4">RESULTADO DE EXPLOTACIÓN (EBIT)</td>
              <td className={`py-2.5 px-4 text-right tabular-nums font-bold ${currentFin.ebit >= 0 ? 'text-slate-steel' : 'text-rosewood'}`}>
                {formatCurrency(currentFin.ebit)}
              </td>
              <td className="py-2.5 px-4 text-right tabular-nums text-slate-steel/60">{formatCurrency(prevFin?.ebit)}</td>
              <td className="py-2.5 px-4 text-right">{renderVariance(currentFin.ebit, prevFin?.ebit, 'revenue')}</td>
              <td className="py-2.5 px-4 text-right text-slate-steel/60">{formatPercent(currentFin.operatingMargin)}</td>
            </tr>

            {/* 6. NET INCOME */}
            <tr className="bg-blush/30 font-bold text-slate-steel">
              <td className="py-3 px-4 text-rosewood-dark">RESULTADO DESPUÉS DE IMPUESTOS (BDI)</td>
              <td className={`py-3 px-4 text-right tabular-nums font-bold ${currentFin.netIncome >= 0 ? 'text-rosewood' : 'text-slate-steel/60'}`}>
                {formatCurrency(currentFin.netIncome)}
              </td>
              <td className="py-3 px-4 text-right tabular-nums text-slate-steel/60">{formatCurrency(prevFin?.netIncome)}</td>
              <td className="py-3 px-4 text-right">{renderVariance(currentFin.netIncome, prevFin?.netIncome, 'revenue')}</td>
              <td className="py-3 px-4 text-right font-bold text-rosewood">{formatPercent(currentFin.netMargin)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Balance General Highlights */}
      <div className="bg-white border border-mineral/40 rounded-2xl p-6 shadow-minimal">
        <h3 className="text-sm font-mono uppercase tracking-wider font-bold text-slate-steel mb-4 flex items-center gap-2">
          <Landmark className="w-4 h-4 text-slate-steel" />
          <span>Estructura Patrimonial y Balance General</span>
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-mineral-50/60 border border-mineral/30">
            <span className="text-[10px] uppercase font-mono text-slate-steel/60 block">Total Activo</span>
            <div className="text-lg font-mono font-bold text-slate-steel mt-1 tabular-nums">
              {formatCurrency(currentFin.balanceSheet.totalAssets)}
            </div>
            <span className="text-[10px] text-slate-steel/60 font-mono">Inmovilizado: {formatCurrency(currentFin.balanceSheet.netPropertyPlantEquipment)}</span>
          </div>

          <div className="p-4 rounded-xl bg-mineral-50/60 border border-mineral/30">
            <span className="text-[10px] uppercase font-mono text-slate-steel/60 block">Patrimonio Neto</span>
            <div className="text-lg font-mono font-bold text-rosewood mt-1 tabular-nums">
              {formatCurrency(currentFin.balanceSheet.shareholdersEquity)}
            </div>
            <span className="text-[10px] text-slate-steel/60 font-mono">Capital + Reservas</span>
          </div>

          <div className="p-4 rounded-xl bg-mineral-50/60 border border-mineral/30">
            <span className="text-[10px] uppercase font-mono text-slate-steel/60 block">Deuda Largo Plazo</span>
            <div className="text-lg font-mono font-bold text-slate-steel mt-1 tabular-nums">
              {formatCurrency(currentFin.balanceSheet.longTermDebt)}
            </div>
            <span className="text-[10px] text-rosewood font-mono">{currentFin.balanceSheet.longTermDebt === 0 ? '100% Desapalancado' : 'Amortización regular'}</span>
          </div>

          <div className="p-4 rounded-xl bg-mineral-50/60 border border-mineral/30">
            <span className="text-[10px] uppercase font-mono text-slate-steel/60 block">Pasivo Corriente</span>
            <div className="text-lg font-mono font-bold text-slate-steel mt-1 tabular-nums">
              {formatCurrency(currentFin.balanceSheet.shortTermDebt + currentFin.balanceSheet.accountsPayable)}
            </div>
            <span className="text-[10px] text-slate-steel/60 font-mono">Proveedores + Préstamo CP</span>
          </div>
        </div>
      </div>
    </div>
  );
};
