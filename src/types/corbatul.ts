/**
 * Corbatul Business Simulation - Spec-Driven Development (SDD) Type Definitions
 * Strict types representing raw inputs, normalized financial entities, operations,
 * competitor states, and the Decision Storytelling Cycle (Initial State -> Decision -> Result).
 */

export interface PeriodDecision {
  period: number;
  year?: number;
  firmId: string;
  // Comercial y Precios (Línea Estándar Corbatas, Bufandas Seda y Calcetines)
  priceStandard: number;
  pricePremium: number;
  priceSocks?: number;
  channelDiscount?: number;
  marketingBudget: number;
  salesForceHeadcount: number;
  // Manufactura, Telares y Capacidad
  productionOrdersStandard: number;
  productionOrdersPremium: number;
  productionOrdersSocks?: number;
  plantShifts: 1 | 2 | 3; // Turno 1 (Normal), Turno 2 (Vespertino), Turno 3 (Nocturno/Horas Extras)
  maintenanceBudget: number; // Mantenimiento preventivo de telares
  qualityControlBudget: number; // Aseguramiento y control de costuras
  plantExpansionUnits: number; // Compra de nuevos telares / maquinaria
  // Abastecimiento de Materias Primas
  rawMaterialPurchaseStandard: number; // Metros tela poliéster
  rawMaterialPurchasePremium: number; // Metros seda natural
  rawMaterialPurchaseSocks?: number;
  // Finanzas y Tesorería
  shortTermLoanRequest: number;
  longTermLoanRequest?: number;
  longTermDebtRepayment: number;
  dividendPayoutRatio: number; // 0.0 a 1.0
}

export interface RoundDecisionStory {
  period: number;
  firmId: string;
  roundTitle: string;
  strategicTheme: string; // ej: "Expansión Agresiva de Planta", "Guerra de Precios y Giro a Premium", etc.
  
  // 1. Punto Inicial / Diagnóstico Previo
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

  // 2. La Decisión Tomada (Hoja de Decisiones Corbatul)
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
      rawMaterialSocks?: number;
      sourcingRationale: string;
    };
    finance: {
      shortTermLoan: number;
      longTermLoan?: number;
      debtRepayment: number;
      dividendPayout: number;
      financeRationale: string;
    };
    strategicHypothesis: string; // Qué hipótesis buscaba validar la junta directiva en esta ronda
  };

  // 3. Resultados y Consecuencias Causales
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
    lessonsLearned: string; // Conclusión y ajuste para la siguiente ronda
  };
}

export interface CompanyFinancials {
  period: number;
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
  revenueDeltaPercent: number;
  netIncomeDeltaPercent: number;
  unitCostDeltaPercent: number;
  grossMarginDeltaPoints: number;
  marketShareDeltaPoints: number;
  primaryRootCauses: {
    category: 'PRICE' | 'PRODUCTION' | 'COST' | 'FINANCIAL' | 'DEMAND';
    description: string;
    financialImpact: number;
    type: 'FAVORABLE' | 'UNFAVORABLE' | 'NEUTRAL';
  }[];
}

export interface ProductMetricItem {
  name: string;
  category: string;
  price: number;
  produced: number;
  sold: number;
  revenue: number;
  grossMarginPct: number;
  endingStockUnits: number;
  capacity?: number;
  occupancyPct?: number;
  catalogWidth?: number;
}

export interface PeriodProductMetrics {
  year: number;
  corbatas: ProductMetricItem;
  bufandas: ProductMetricItem;
  calcetines: ProductMetricItem;
}

export interface SimulationDataset {
  meta: {
    generatedAt: string;
    totalPeriods: number;
    primaryFirmId: string;
    currencySymbol: string;
    caseStudy?: string;
    team?: string;
    firms: { id: string; name: string; isOurFirm: boolean; color: string }[];
  };
  periods: number[];
  decisions: PeriodDecision[];
  decisionStories?: RoundDecisionStory[];
  financials: CompanyFinancials[];
  operations: ProductionMetrics[];
  competitors: MarketCompetitorState[];
  variances: PeriodVarianceAnalysis[];
  productMetrics?: Record<number, PeriodProductMetrics>;
}
