import * as fs from 'fs';
import * as path from 'path';
import {
  CompanyFinancials,
  MarketCompetitorState,
  PeriodDecision,
  PeriodVarianceAnalysis,
  ProductionMetrics,
  SimulationDataset
} from '../src/types/corbatul';
import { calculateBenchmarkingMetrics, calculatePeriodVariations } from '../src/lib/analytics';

/**
 * Generates or ingests raw simulation logs and builds the executive analytical store.
 */
export function buildCorbatulDataset(): SimulationDataset {
  const periods = [1, 2, 3, 4, 5, 6, 7, 8];
  const primaryFirmId = 'F3';

  const firms = [
    { id: 'F1', name: 'Firma 1 (Alpha Textil)', isOurFirm: false, color: '#94a3b8' },
    { id: 'F2', name: 'Firma 2 (Confecciones Betamax)', isOurFirm: false, color: '#f59e0b' },
    { id: 'F3', name: 'Firma 3 (Nuestra Firma - Sideral Textil)', isOurFirm: true, color: '#2563eb' },
    { id: 'F4', name: 'Firma 4 (Gamma Apparel)', isOurFirm: false, color: '#10b981' },
    { id: 'F5', name: 'Firma 5 (Delta Fashion)', isOurFirm: false, color: '#8b5cf6' },
  ];

  // Base parameters for 8 periods
  const decisions: PeriodDecision[] = [];
  const financials: CompanyFinancials[] = [];
  const operations: ProductionMetrics[] = [];
  const competitors: MarketCompetitorState[] = [];

  // Evolution profiles
  // F3 profile: Growth, plant investment in P3, operational scaling in P4, premium shift in P5, leadership in P8
  const f3DecisionsBase = [
    { period: 1, pStd: 45, pPrem: 75, mkt: 25000, shifts: 1 as const, maint: 12000, qc: 8000, exp: 0, loan: 0 },
    { period: 2, pStd: 46, pPrem: 78, mkt: 28000, shifts: 1 as const, maint: 14000, qc: 10000, exp: 0, loan: 0 },
    { period: 3, pStd: 47, pPrem: 80, mkt: 32000, shifts: 2 as const, maint: 15000, qc: 12000, exp: 50000, loan: 60000 }, // CAPEX!
    { period: 4, pStd: 44, pPrem: 82, mkt: 40000, shifts: 2 as const, maint: 18000, qc: 15000, exp: 0, loan: 0 }, // Scale
    { period: 5, pStd: 45, pPrem: 85, mkt: 45000, shifts: 2 as const, maint: 20000, qc: 18000, exp: 0, loan: 0 }, // Premium focus
    { period: 6, pStd: 48, pPrem: 90, mkt: 50000, shifts: 3 as const, maint: 22000, qc: 22000, exp: 20000, loan: 0 }, // 3 shifts / surge
    { period: 7, pStd: 49, pPrem: 92, mkt: 48000, shifts: 2 as const, maint: 25000, qc: 24000, exp: 0, loan: 0 }, // Consolidation
    { period: 8, pStd: 50, pPrem: 95, mkt: 52000, shifts: 2 as const, maint: 26000, qc: 25000, exp: 0, loan: 0 }, // Harvest
  ];

  periods.forEach(p => {
    const dF3 = f3DecisionsBase[p - 1];
    
    // Store F3 decision
    decisions.push({
      period: p,
      firmId: 'F3',
      priceStandard: dF3.pStd,
      pricePremium: dF3.pPrem,
      marketingBudget: dF3.mkt,
      salesForceHeadcount: 10 + p * 2,
      productionOrdersStandard: 18000 + p * 2400,
      productionOrdersPremium: 4000 + p * 1200,
      plantShifts: dF3.shifts,
      maintenanceBudget: dF3.maint,
      qualityControlBudget: dF3.qc,
      plantExpansionUnits: dF3.exp,
      rawMaterialPurchaseStandard: 22000 + p * 2500,
      rawMaterialPurchasePremium: 5000 + p * 1300,
      shortTermLoanRequest: dF3.loan,
      longTermDebtRepayment: p > 4 ? 15000 : 0,
      dividendPayoutRatio: p >= 7 ? 0.25 : 0.0,
    });

    // Generate financials and operations for all 5 firms
    firms.forEach(firm => {
      const isF3 = firm.id === 'F3';
      
      // Multipliers and dynamic behaviors
      let marketFactor = 1.0;
      if (firm.id === 'F1') marketFactor = 1.0 - (p * 0.03); // F1 loses ground
      if (firm.id === 'F2') marketFactor = p === 4 ? 1.25 : 0.95; // F2 price cut spike then loss
      if (firm.id === 'F3') marketFactor = 1.0 + (p * 0.08); // F3 steady compounding
      if (firm.id === 'F4') marketFactor = 0.98;
      if (firm.id === 'F5') marketFactor = 0.92;

      const nominalCap = isF3 ? (25000 + (p >= 4 ? 12000 : 0)) : (26000 + (firm.id === 'F1' ? 4000 : 0));
      const practicalCap = nominalCap * 0.95;
      const effectiveUnits = Math.round(practicalCap * (isF3 ? (0.85 + (p * 0.015)) : 0.82));
      const unitsSold = Math.round(effectiveUnits * 0.96);
      const stockoutUnits = isF3 ? (p === 3 ? 1200 : 0) : (p === 6 ? 3400 : 500);

      const avgPrice = isF3 ? (dF3.pStd * 0.75 + dF3.pPrem * 0.25) : (44 + (p * 0.5));
      const totalRevenue = Math.round(unitsSold * avgPrice);

      const unitRaw = isF3 ? 14.50 : 15.20;
      const unitLabor = isF3 ? (dF3.shifts === 3 ? 11.20 : 9.50) : 10.40;
      const unitOverhead = Math.round((95000 / effectiveUnits) * 100) / 100;
      const unitDepr = isF3 ? (p >= 4 ? 3.80 : 2.50) : 2.60;
      const unitCost = Math.round((unitRaw + unitLabor + unitOverhead + unitDepr) * 100) / 100;

      const totalCOGS = Math.round(unitsSold * unitCost);
      const grossProfit = totalRevenue - totalCOGS;
      const grossMargin = grossProfit / totalRevenue;

      const opexMarketing = isF3 ? dF3.mkt : 26000;
      const opexSales = 22000 + (p * 1500);
      const opexAdmin = 35000;
      const totalOPEX = opexMarketing + opexSales + opexAdmin;

      const ebit = grossProfit - totalOPEX;
      const ebitda = ebit + (unitDepr * unitsSold);
      const operatingMargin = ebit / totalRevenue;

      const interestExpense = isF3 && p >= 3 && p <= 5 ? 12000 : 4500;
      const emergencyCost = !isF3 && firm.id === 'F2' && p === 5 ? 18000 : 0;
      const netFinancial = interestExpense + emergencyCost;

      const ebt = ebit - netFinancial;
      const taxes = ebt > 0 ? Math.round(ebt * 0.27) : 0;
      const netIncome = ebt - taxes;
      const netMargin = netIncome / totalRevenue;

      // Balance Sheet simulation
      const cash = isF3 ? (80000 + (p * 45000) - (p === 3 ? 50000 : 0)) : (60000 + (p * 10000));
      const sharePrice = isF3 
        ? Math.round((10.0 + (p * 1.85) + (netIncome / 80000)) * 100) / 100
        : Math.round((10.0 + (p * (firm.id === 'F1' ? 0.6 : 0.8)) + (netIncome / 110000)) * 100) / 100;

      const finRecord: CompanyFinancials = {
        period: p,
        firmId: firm.id,
        revenueStandard: Math.round(totalRevenue * 0.72),
        revenuePremium: Math.round(totalRevenue * 0.28),
        totalRevenue,
        costOfGoodsSold: {
          rawMaterialsUsed: Math.round(unitsSold * unitRaw),
          directLaborRegular: Math.round(unitsSold * (unitLabor * 0.85)),
          directLaborOvertime: Math.round(unitsSold * (unitLabor * 0.15)),
          factoryOverhead: Math.round(unitsSold * unitOverhead),
          plantDepreciation: Math.round(unitsSold * unitDepr),
          inventoryHoldingCost: 4500,
          rejectionAndWasteCost: isF3 ? 3200 : 6800,
          totalCOGS
        },
        grossProfit,
        grossMargin,
        operatingExpenses: {
          marketingAndAdvertising: opexMarketing,
          salesForcePayroll: opexSales,
          qualityAssurance: isF3 ? dF3.qc : 10000,
          plantMaintenance: isF3 ? dF3.maint : 11000,
          generalAdministrative: opexAdmin,
          totalOPEX
        },
        ebitda,
        ebit,
        operatingMargin,
        financialResults: {
          interestExpense,
          interestIncome: 1200,
          emergencyFinancingCost: emergencyCost,
          netFinancialCost: netFinancial - 1200
        },
        earningsBeforeTaxes: ebt,
        incomeTaxes: taxes,
        netIncome,
        netMargin,
        balanceSheet: {
          cashAndEquivalents: cash,
          accountsReceivable: Math.round(totalRevenue * 0.18),
          inventoriesFinishedGoods: Math.round((effectiveUnits - unitsSold) * unitCost),
          inventoriesRawMaterials: 45000,
          netPropertyPlantEquipment: 350000 + (isF3 && p >= 3 ? 120000 : 0) - (p * 15000),
          totalAssets: 650000 + (p * 35000),
          shortTermDebt: isF3 && p === 3 ? 60000 : 15000,
          accountsPayable: 30000,
          longTermDebt: isF3 && p >= 3 ? Math.max(0, 100000 - ((p - 3) * 15000)) : 40000,
          totalLiabilities: 180000,
          shareholdersEquity: 470000 + (p * 30000),
          retainedEarnings: 150000 + (p * 28000),
          sharePrice,
          sharesOutstanding: 100000,
          enterpriseValue: Math.round(sharePrice * 100000 + 120000 - cash)
        }
      };

      financials.push(finRecord);

      // Operations
      operations.push({
        period: p,
        firmId: firm.id,
        nominalCapacity: nominalCap,
        practicalCapacity: practicalCap,
        effectiveProductionUnits: effectiveUnits,
        capacityUtilizationRate: effectiveUnits / practicalCap,
        overtimeHoursPercent: isF3 ? (dF3.shifts === 3 ? 18.5 : 4.0) : 6.0,
        machineBreakdownRate: isF3 ? 1.8 : 4.5,
        qualityDefectRate: isF3 ? (p >= 5 ? 1.2 : 2.5) : 3.8,
        unitProductionCost: unitCost,
        inventoryBeginning: 3000,
        inventoryEnding: effectiveUnits - unitsSold + 3000,
        inventoryHoldingCostIncurred: 4500,
        marketDemand: unitsSold + stockoutUnits,
        unitsSold,
        stockoutUnits,
        stockoutRate: stockoutUnits / (unitsSold + stockoutUnits)
      });

      // Competitor State
      competitors.push({
        period: p,
        firmId: firm.id,
        firmName: firm.name,
        marketShareUnits: 0, // calculated below
        marketShareRevenue: 0,
        averagePrice: avgPrice,
        qualityPerceptionScore: isF3 ? (75 + p * 2.8) : (75 - (p === 4 ? 2 : 0)),
        totalRevenue,
        netIncome,
        accumulatedNetIncome: 0, // calculated below
        sharePrice,
        marketCap: sharePrice * 100000,
        rankBySharePrice: 1,
        rankByMarketShare: 1,
        rankByAccumulatedProfit: 1
      });
    });
  });

  // Second pass: Calculate industry sums, market shares, accumulated profits, and ranks
  periods.forEach(p => {
    const periodComps = competitors.filter(c => c.period === p);
    const totalIndustryRev = periodComps.reduce((sum, c) => sum + c.totalRevenue, 0);
    const totalIndustryUnits = operations
      .filter(o => o.period === p)
      .reduce((sum, o) => sum + o.unitsSold, 0);

    periodComps.forEach(comp => {
      const ops = operations.find(o => o.firmId === comp.firmId && o.period === p);
      comp.marketShareRevenue = comp.totalRevenue / totalIndustryRev;
      comp.marketShareUnits = (ops?.unitsSold || 0) / totalIndustryUnits;

      // Accumulated net income
      comp.accumulatedNetIncome = financials
        .filter(f => f.firmId === comp.firmId && f.period <= p)
        .reduce((sum, f) => sum + f.netIncome, 0);
    });

    // Compute ranks for this period
    const bySharePrice = [...periodComps].sort((a, b) => b.sharePrice - a.sharePrice);
    bySharePrice.forEach((c, idx) => { c.rankBySharePrice = idx + 1; });

    const byMarketShare = [...periodComps].sort((a, b) => b.marketShareUnits - a.marketShareUnits);
    byMarketShare.forEach((c, idx) => { c.rankByMarketShare = idx + 1; });

    const byAccProfit = [...periodComps].sort((a, b) => b.accumulatedNetIncome - a.accumulatedNetIncome);
    byAccProfit.forEach((c, idx) => { c.rankByAccumulatedProfit = idx + 1; });
  });

  // Calculate period variances for primary firm (F3)
  const variances: PeriodVarianceAnalysis[] = [];
  for (let p = 2; p <= 8; p++) {
    const currFin = financials.find(f => f.firmId === primaryFirmId && f.period === p)!;
    const prevFin = financials.find(f => f.firmId === primaryFirmId && f.period === p - 1)!;
    const currOps = operations.find(o => o.firmId === primaryFirmId && o.period === p)!;
    const prevOps = operations.find(o => o.firmId === primaryFirmId && o.period === p - 1)!;
    const currDec = decisions.find(d => d.firmId === primaryFirmId && d.period === p)!;
    const prevDec = decisions.find(d => d.firmId === primaryFirmId && d.period === p - 1)!;
    const currComp = competitors.find(c => c.firmId === primaryFirmId && c.period === p)!;
    const prevComp = competitors.find(c => c.firmId === primaryFirmId && c.period === p - 1)!;

    variances.push(
      calculatePeriodVariations(
        currFin,
        prevFin,
        currOps,
        prevOps,
        currDec,
        prevDec,
        currComp,
        prevComp
      )
    );
  }

  return {
    meta: {
      generatedAt: new Date().toISOString(),
      totalPeriods: periods.length,
      primaryFirmId,
      currencySymbol: '$',
      firms
    },
    periods,
    decisions,
    financials,
    operations,
    competitors,
    variances
  };
}

// Auto-run if executed directly via Node/ts-node
if (require.main === module) {
  const dataset = buildCorbatulDataset();
  const outputPath = path.resolve(__dirname, '../data/processed/corbatul_analytics.json');
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, JSON.stringify(dataset, null, 2), 'utf-8');
  console.log(`Corbatul Analytics Dataset compiled successfully -> ${outputPath}`);
  console.log(`Periods: ${dataset.periods.length} | Firms: ${dataset.meta.firms.length} | Primary: ${dataset.meta.primaryFirmId}`);
}
