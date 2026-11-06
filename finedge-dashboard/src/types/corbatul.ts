export interface PeriodDecision {
  period: number;
  year?: number;
  firmId: string;
  priceStandard: number;
  pricePremium: number;
  priceSocks?: number;
  channelDiscount?: number;
  marketingBudget: number;
  salesForceHeadcount: number;
  productionOrdersStandard: number;
  productionOrdersPremium: number;
  productionOrdersSocks?: number;
  plantShifts: 1 | 2 | 3;
  maintenanceBudget: number;
  qualityControlBudget: number;
  plantExpansionUnits: number;
  rawMaterialPurchaseStandard: number;
  rawMaterialPurchasePremium: number;
  shortTermLoanRequest: number;
  longTermDebtRepayment: number;
  dividendPayoutRatio: number;
}

export interface RoundDecisionStory {
  period: number;
  year?: number;
  firmId: string;
  roundTitle: string;
  strategicTheme: string;
  initialState: {
    cashStarting: number;
    inventoryStartingUnits: number;
    nominalCapacity: number;
    inheritedSharePrice: number;
    inheritedRank: number;
    inheritedMarketShare: number;
    diagnosticContext: string;
    criticalChallenge: string;
  };
  decisions: {
    commercial: {
      priceStandard: number;
      pricePremium: number;
      priceSocks?: number;
      marketingBudget: number;
      salesForceCount: number;
      commercialRationale: string;
    };
    production: {
      ordersStandard: number;
      ordersPremium: number;
      ordersSocks?: number;
      plantShifts: 1 | 2 | 3;
      maintenanceBudget: number;
      qualityControlBudget: number;
      plantExpansionUnits: number;
      productionRationale: string;
    };
    sourcing: {
      rawMaterialStandard: number;
      rawMaterialPremium: number;
      sourcingRationale: string;
    };
    finance: {
      shortTermLoan: number;
      debtRepayment: number;
      dividendPayout: number;
      financeRationale: string;
    };
    strategicHypothesis: string;
  };
  consequences: {
    operationalImpact: {
      unitsProduced: number;
      utilizationRate: number;
      overtimeIncidence: string;
      machineBreakdowns: string;
      stockoutOccurred: boolean;
      stockoutUnits: number;
      operationalVerdict: string;
    };
    financialImpact: {
      totalRevenue: number;
      grossProfit: number;
      grossMargin: number;
      cogsSummary: string;
      netIncome: number;
      netMargin: number;
      endingCash: number;
      financialVerdict: string;
    };
    competitiveImpact: {
      endingSharePrice: number;
      sharePriceDelta: number;
      marketShare: number;
      marketRank: number;
      competitorMovements: string;
    };
    lessonsLearned: string;
  };
}

export interface CompanyFinancials {
  period: number;
  year?: number;
  firmId: string;
  revenueStandard: number;
  revenuePremium: number;
  revenueSocks?: number;
  totalRevenue: number;
  costOfGoodsSold: {
    rawMaterialsUsed: number;
    directLaborRegular: number;
    directLaborOvertime: number;
    factoryOverhead: number;
    plantDepreciation: number;
    inventoryHoldingCost: number;
    rejectionAndWasteCost: number;
    totalCOGS: number;
  };
  grossProfit: number;
  grossMargin: number;
  operatingExpenses: {
    marketingAndAdvertising: number;
    salesForcePayroll: number;
    qualityAssurance: number;
    plantMaintenance: number;
    generalAdministrative: number;
    totalOPEX: number;
  };
  ebitda: number;
  ebit: number;
  operatingMargin: number;
  financialResults: {
    interestExpense: number;
    interestIncome: number;
    emergencyFinancingCost: number;
    netFinancialCost: number;
  };
  earningsBeforeTaxes: number;
  incomeTaxes: number;
  netIncome: number;
  netMargin: number;
  balanceSheet: {
    cashAndEquivalents: number;
    accountsReceivable: number;
    inventoriesFinishedGoods: number;
    inventoriesRawMaterials: number;
    netPropertyPlantEquipment: number;
    totalAssets: number;
    shortTermDebt: number;
    accountsPayable: number;
    longTermDebt: number;
    totalLiabilities: number;
    shareholdersEquity: number;
    retainedEarnings: number;
    sharePrice: number;
    sharesOutstanding: number;
    enterpriseValue: number;
  };
}

export interface ProductionMetrics {
  period: number;
  year?: number;
  firmId: string;
  nominalCapacity: number;
  practicalCapacity: number;
  effectiveProductionUnits: number;
  capacityUtilizationRate: number;
  overtimeHoursPercent: number;
  machineBreakdownRate: number;
  qualityDefectRate: number;
  unitProductionCost: number;
  inventoryBeginning: number;
  inventoryEnding: number;
  inventoryHoldingCostIncurred: number;
  marketDemand: number;
  unitsSold: number;
  stockoutUnits: number;
  stockoutRate: number;
}

export interface MarketCompetitorState {
  period: number;
  year?: number;
  firmId: string;
  firmName: string;
  marketShareUnits: number;
  marketShareRevenue: number;
  averagePrice: number;
  qualityPerceptionScore: number;
  totalRevenue: number;
  netIncome: number;
  accumulatedNetIncome: number;
  sharePrice: number;
  marketCap: number;
  rankBySharePrice: number;
  rankByMarketShare: number;
  rankByAccumulatedProfit: number;
}

export interface PeriodVarianceAnalysis {
  period: number;
  previousPeriod: number;
  revenueStandardDelta: number;
  revenuePremiumDelta: number;
  totalRevenueDelta: number;
  grossProfitDelta: number;
  netIncomeDelta: number;
  sharePriceDelta: number;
  marketShareDelta: number;
  capacityUtilizationDelta: number;
  highlights: {
    metric: string;
    deltaPercent: number;
    semantic: 'FAVORABLE' | 'UNFAVORABLE' | 'NEUTRAL';
    commentary: string;
  }[];
}

export interface SimulationDataset {
  meta: {
    generatedAt: string;
    totalPeriods: number;
    primaryFirmId: string;
    currencySymbol: string;
    caseStudy?: string;
    team?: string;
    firms: {
      id: string;
      name: string;
      isOurFirm: boolean;
      color: string;
    }[];
  };
  periods: number[];
  decisions: PeriodDecision[];
  decisionStories?: RoundDecisionStory[];
  financials: CompanyFinancials[];
  operations: ProductionMetrics[];
  competitors: MarketCompetitorState[];
  variances: PeriodVarianceAnalysis[];
}
