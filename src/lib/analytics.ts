import {
  CompanyFinancials,
  MarketCompetitorState,
  PeriodDecision,
  PeriodVarianceAnalysis,
  ProductionMetrics,
  SimulationDataset
} from '../types/corbatul';

/**
 * Computes period-over-period variations (Δ% and basis point shifts)
 * and determines root-cause attributions for the board presentation.
 */
export function calculatePeriodVariations(
  currentFin: CompanyFinancials,
  prevFin: CompanyFinancials,
  currentOps: ProductionMetrics,
  prevOps: ProductionMetrics,
  currentDecision: PeriodDecision,
  prevDecision: PeriodDecision,
  currentComp: MarketCompetitorState,
  prevComp: MarketCompetitorState
): PeriodVarianceAnalysis {
  const calcDeltaPct = (curr: number, prev: number) => {
    if (prev === 0) return 0;
    return ((curr - prev) / Math.abs(prev)) * 100;
  };

  const revenueDeltaPercent = calcDeltaPct(currentFin.totalRevenue, prevFin.totalRevenue);
  const netIncomeDeltaPercent = calcDeltaPct(currentFin.netIncome, prevFin.netIncome);
  const unitCostDeltaPercent = calcDeltaPct(currentOps.unitProductionCost, prevOps.unitProductionCost);
  const grossMarginDeltaPoints = (currentFin.grossMargin - prevFin.grossMargin) * 100;
  const marketShareDeltaPoints = (currentComp.marketShareUnits - prevComp.marketShareUnits) * 100;

  const rootCauses: PeriodVarianceAnalysis['primaryRootCauses'] = [];

  // 1. Price Variation Effect
  const priceChange = currentDecision.priceStandard - prevDecision.priceStandard;
  if (Math.abs(priceChange) > 1.0) {
    const revenueImpact = priceChange * currentOps.unitsSold;
    rootCauses.push({
      category: 'PRICE',
      description: priceChange > 0
        ? `Incremento de precio estándar (+${priceChange.toFixed(2)} €) impulsó margen bruto a pesar del ajuste de volumen.`
        : `Reducción de precio (-${Math.abs(priceChange).toFixed(2)} €) para proteger cuota de mercado sacrificando margen unitario.`,
      financialImpact: revenueImpact,
      type: revenueImpact >= 0 ? 'FAVORABLE' : 'UNFAVORABLE'
    });
  }

  // 2. Production Overtime & Shifts Effect
  const overtimeDiff = currentOps.overtimeHoursPercent - prevOps.overtimeHoursPercent;
  if (overtimeDiff > 5) {
    const overtimeCostImpact = -(currentFin.costOfGoodsSold.directLaborOvertime - prevFin.costOfGoodsSold.directLaborOvertime);
    rootCauses.push({
      category: 'PRODUCTION',
      description: `Uso intensivo de horas extras/turnos adicionales (+${overtimeDiff.toFixed(1)}%) elevó costo laboral por recargo nocturno/extraordinario.`,
      financialImpact: overtimeCostImpact,
      type: 'UNFAVORABLE'
    });
  }

  // 3. Quality & Maintenance Impact
  if (currentDecision.maintenanceBudget < prevDecision.maintenanceBudget * 0.7) {
    rootCauses.push({
      category: 'COST',
      description: `Subinversión en mantenimiento provocó paradas de planta no programadas y tasa de falla de ${currentOps.machineBreakdownRate.toFixed(1)}%.`,
      financialImpact: -((currentOps.machineBreakdownRate / 100) * currentFin.costOfGoodsSold.factoryOverhead),
      type: 'UNFAVORABLE'
    });
  }

  // 4. Stockout (Lost Opportunity)
  if (currentOps.stockoutUnits > 0) {
    const lostRevenue = currentOps.stockoutUnits * currentDecision.priceStandard;
    rootCauses.push({
      category: 'DEMAND',
      description: `Quiebre de stock (${currentOps.stockoutUnits.toLocaleString()} unidades no atendidas) por estimación conservadora de demanda.`,
      financialImpact: -lostRevenue,
      type: 'UNFAVORABLE'
    });
  }

  // 5. Financial / Emergency loans
  if (currentFin.financialResults.emergencyFinancingCost > 0) {
    rootCauses.push({
      category: 'FINANCIAL',
      description: `Sobregiro o préstamo de emergencia activado con costo financiero punitivo de ${currentFin.financialResults.emergencyFinancingCost.toLocaleString()} €.`,
      financialImpact: -currentFin.financialResults.emergencyFinancingCost,
      type: 'UNFAVORABLE'
    });
  }

  return {
    period: currentFin.period,
    previousPeriod: prevFin.period,
    revenueDeltaPercent,
    netIncomeDeltaPercent,
    unitCostDeltaPercent,
    grossMarginDeltaPoints,
    marketShareDeltaPoints,
    primaryRootCauses: rootCauses
  };
}

/**
 * Calculates competitive rankings, gap to industry leader,
 * and positioning metrics for each period.
 */
export function calculateBenchmarkingMetrics(competitors: MarketCompetitorState[], targetPeriod: number) {
  const periodData = competitors.filter(c => c.period === targetPeriod);
  
  // Sort by share price descending
  const sortedBySharePrice = [...periodData].sort((a, b) => b.sharePrice - a.sharePrice);
  const leaderSharePrice = sortedBySharePrice[0]?.sharePrice || 1;

  // Sort by market share descending
  const sortedByShare = [...periodData].sort((a, b) => b.marketShareUnits - a.marketShareUnits);
  const leaderMarketShare = sortedByShare[0]?.marketShareUnits || 1;

  return periodData.map(comp => {
    const gapToLeaderSharePricePct = ((comp.sharePrice - leaderSharePrice) / leaderSharePrice) * 100;
    const gapToLeaderMarketSharePoints = (comp.marketShareUnits - leaderMarketShare) * 100;
    const ros = comp.totalRevenue > 0 ? (comp.netIncome / comp.totalRevenue) * 100 : 0;

    return {
      ...comp,
      gapToLeaderSharePricePct,
      gapToLeaderMarketSharePoints,
      returnOnSales: ros,
      isLeaderSharePrice: comp.sharePrice === leaderSharePrice,
      isLeaderMarketShare: comp.marketShareUnits === leaderMarketShare
    };
  });
}

/**
 * Aggregates high-impact executive KPIs for our firm
 */
export function getExecutiveScorecard(dataset: SimulationDataset, selectedPeriod?: number) {
  const ourFirmId = dataset.meta.primaryFirmId;
  const currentPeriod = selectedPeriod ?? dataset.periods[dataset.periods.length - 1];
  
  const ourFinCurrent = dataset.financials.find(f => f.firmId === ourFirmId && f.period === currentPeriod);
  const ourFinPrev = dataset.financials.find(f => f.firmId === ourFirmId && f.period === currentPeriod - 1);
  const ourOpsCurrent = dataset.operations.find(o => o.firmId === ourFirmId && o.period === currentPeriod);
  const ourCompCurrent = dataset.competitors.find(c => c.firmId === ourFirmId && c.period === currentPeriod);
  
  // Total accumulated net income across all periods to date
  const accumulatedNetIncome = dataset.financials
    .filter(f => f.firmId === ourFirmId && f.period <= currentPeriod)
    .reduce((sum, f) => sum + f.netIncome, 0);

  const prevAccumulatedNetIncome = dataset.financials
    .filter(f => f.firmId === ourFirmId && f.period <= currentPeriod - 1)
    .reduce((sum, f) => sum + f.netIncome, 0);

  const revenueGrowth = ourFinPrev 
    ? ((ourFinCurrent?.totalRevenue || 0) - ourFinPrev.totalRevenue) / ourFinPrev.totalRevenue * 100 
    : 0;

  const netIncomeGrowth = ourFinPrev && ourFinPrev.netIncome !== 0
    ? ((ourFinCurrent?.netIncome || 0) - ourFinPrev.netIncome) / Math.abs(ourFinPrev.netIncome) * 100
    : 0;

  return {
    period: currentPeriod,
    totalRevenue: ourFinCurrent?.totalRevenue || 0,
    revenueGrowth,
    netIncome: ourFinCurrent?.netIncome || 0,
    netIncomeGrowth,
    accumulatedNetIncome,
    accumulatedNetIncomeGrowth: prevAccumulatedNetIncome !== 0 
      ? ((accumulatedNetIncome - prevAccumulatedNetIncome) / Math.abs(prevAccumulatedNetIncome)) * 100 
      : 0,
    grossMargin: (ourFinCurrent?.grossMargin || 0) * 100,
    operatingMargin: (ourFinCurrent?.operatingMargin || 0) * 100,
    netMargin: (ourFinCurrent?.netMargin || 0) * 100,
    marketShare: (ourCompCurrent?.marketShareUnits || 0) * 100,
    sharePrice: ourCompCurrent?.sharePrice || 0,
    rankBySharePrice: ourCompCurrent?.rankBySharePrice || 1,
    unitCost: ourOpsCurrent?.unitProductionCost || 0,
    capacityUtilization: (ourOpsCurrent?.capacityUtilizationRate || 0) * 100,
    stockoutRate: (ourOpsCurrent?.stockoutRate || 0) * 100,
    cashPosition: ourFinCurrent?.balanceSheet.cashAndEquivalents || 0
  };
}
