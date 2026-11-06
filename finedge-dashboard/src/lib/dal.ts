import { SimulationDataset } from '../types/corbatul';
import datasetJson from '../../data/processed/finedge_analytics.json';

/**
 * Data Access Layer (DAL) for FINEDGE Local-First Architecture.
 * Provides deterministic, typed access to PuntoOne analytics.
 */
export class FinedgeDAL {
  private static cachedDataset: SimulationDataset = datasetJson as unknown as SimulationDataset;

  public static getDataset(): SimulationDataset {
    return this.cachedDataset;
  }

  public static getPeriods(): number[] {
    return this.cachedDataset.periods;
  }

  public static getPrimaryFirmId(): string {
    return this.cachedDataset.meta.primaryFirmId;
  }

  public static getFirms() {
    return this.cachedDataset.meta.firms;
  }

  public static getFinancials(period?: number, firmId?: string) {
    let data = this.cachedDataset.financials;
    if (period !== undefined) {
      data = data.filter(f => f.period === period);
    }
    if (firmId !== undefined) {
      data = data.filter(f => f.firmId === firmId);
    }
    return data;
  }

  public static getOperations(period?: number, firmId?: string) {
    let data = this.cachedDataset.operations;
    if (period !== undefined) {
      data = data.filter(o => o.period === period);
    }
    if (firmId !== undefined) {
      data = data.filter(o => o.firmId === firmId);
    }
    return data;
  }

  public static getCompetitors(period?: number) {
    if (period !== undefined) {
      return this.cachedDataset.competitors.filter(c => c.period === period);
    }
    return this.cachedDataset.competitors;
  }

  public static getVariances(period?: number) {
    if (period !== undefined) {
      return this.cachedDataset.variances.find(v => v.period === period);
    }
    return this.cachedDataset.variances;
  }

  public static getDecisions(period?: number) {
    if (period !== undefined) {
      return this.cachedDataset.decisions.find(d => d.period === period);
    }
    return this.cachedDataset.decisions;
  }
}
