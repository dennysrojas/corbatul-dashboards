import {
  CompanyFinancials,
  MarketCompetitorState,
  PeriodDecision,
  PeriodVarianceAnalysis,
  ProductionMetrics,
  SimulationDataset
} from '../types/corbatul';

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
 * Aggregates high-impact executive KPIs for PuntoOne (FINEDGE)
 */
export function getExecutiveScorecard(dataset: SimulationDataset, selectedPeriod?: number) {
  const ourFirmId = dataset.meta.primaryFirmId;
  const currentPeriod = selectedPeriod ?? dataset.periods[dataset.periods.length - 1];
  
  const ourFinCurrent = dataset.financials.find(f => f.firmId === ourFirmId && f.period === currentPeriod);
  const ourFinPrev = dataset.financials.find(f => f.firmId === ourFirmId && f.period === currentPeriod - 1);
  const ourOpsCurrent = dataset.operations.find(o => o.firmId === ourFirmId && o.period === currentPeriod);
  const ourCompCurrent = dataset.competitors.find(c => c.firmId === ourFirmId && c.period === currentPeriod);
  
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
