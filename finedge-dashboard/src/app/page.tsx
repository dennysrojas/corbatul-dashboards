'use client';

import React, { useState } from 'react';
import datasetJson from '../../data/processed/finedge_analytics.json';
import { SimulationDataset } from '../types/corbatul';
import { Sidebar, DashboardTab } from '../components/dashboard/Sidebar';
import { DecisionAnalysisView } from '../components/dashboard/DecisionAnalysisView';
import { ExecutiveSummaryView } from '../components/dashboard/ExecutiveSummaryView';
import { PnLDetailView } from '../components/dashboard/PnLDetailView';
import { OperationsInventoryView } from '../components/dashboard/OperationsInventoryView';
import { CompetitorBenchmarkingView } from '../components/dashboard/CompetitorBenchmarkingView';
import { Award, Compass, BarChart3, FileSpreadsheet, Layers, Target, ChevronRight } from 'lucide-react';

export default function FinedgeDashboardPage() {
  const dataset = datasetJson as unknown as SimulationDataset;
  const [selectedPeriod, setSelectedPeriod] = useState<number>(4); // Default to Period 4 (2029)
  const [activeTab, setActiveTab] = useState<DashboardTab>('decisions');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);

  const tabTitles: Record<DashboardTab, { title: string; subtitle: string; icon: React.ReactNode }> = {
    decisions: {
      icon: <Compass className="w-5 h-5 text-rosewood" />,
      title: 'Bitácora Estratégica Causal',
      subtitle: 'Punto Inicial → Decisión Paramétrica → Resultados Reales (2026-2029)',
    },
    board: {
      icon: <BarChart3 className="w-5 h-5 text-slate-steel" />,
      title: 'Sala de Juntas Directiva',
      subtitle: 'Scorecard Ejecutivo & Creación de Valor (PuntoOne)',
    },
    pnl: {
      icon: <FileSpreadsheet className="w-5 h-5 text-slate-steel" />,
      title: 'Estado de Resultados y Finanzas',
      subtitle: 'Auditoría Contable Textil, P&L y Balance General (€)',
    },
    operations: {
      icon: <Layers className="w-5 h-5 text-slate-steel" />,
      title: 'Operaciones, Planta e Inventario',
      subtitle: 'Corbatas, Bufandas y Calcetines (Capacidad, Ocupación y Suministro)',
    },
    benchmark: {
      icon: <Target className="w-5 h-5 text-rosewood" />,
      title: 'Radar de Mercado y Competidores',
      subtitle: 'Benchmarking Multidimensional de la Industria (7 Firmas)',
    },
  };

  return (
    <div className="min-h-screen bg-mineral-50 text-slate-steel font-sans flex antialiased">
      {/* 1. Sidebar */}
      <Sidebar
        dataset={dataset}
        selectedPeriod={selectedPeriod}
        onSelectPeriod={setSelectedPeriod}
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(prev => !prev)}
      />

      {/* 2. Main Executive Content Column */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto h-screen">
        {/* Top Header Bar */}
        <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-mineral/30 px-6 py-3.5 flex items-center justify-between shadow-minimal">
          <div className="flex items-center gap-3">
            {isSidebarCollapsed && (
              <button
                onClick={() => setIsSidebarCollapsed(false)}
                className="p-1 rounded-md text-slate-steel/60 hover:text-slate-steel hover:bg-mineral-100 transition-colors"
                title="Expandir barra lateral"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
            <div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-slate-steel/60 font-medium flex items-center gap-1.5">
                <span className="text-rosewood font-bold">PUNTOONE</span>
                <span>•</span>
                <span>Equipo FINEDGE</span>
                <span>•</span>
                <span>Certificación ACBSP</span>
              </div>
              <h1 className="text-base sm:text-lg font-sans font-bold text-slate-steel flex items-center gap-2">
                <span className="shrink-0">{tabTitles[activeTab].icon}</span>
                <span>{tabTitles[activeTab].title}</span>
                <span className="hidden md:inline font-sans font-normal text-xs text-slate-steel/60">
                  — {tabTitles[activeTab].subtitle}
                </span>
              </h1>
            </div>
          </div>

          {/* Quick Period Indicator Badge */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 bg-mineral-100/70 px-3 py-1.5 rounded-lg border border-mineral/30 text-xs font-mono">
              <span className="text-slate-steel/60 uppercase text-[10px]">Ronda:</span>
              <strong className="text-slate-steel font-bold">
                P{selectedPeriod} ({2025 + selectedPeriod})
              </strong>
            </div>

            <div className="flex items-center gap-1.5 bg-blush/30 px-3 py-1.5 rounded-lg border border-blush/50 text-xs font-mono text-rosewood-dark font-bold shadow-sm">
              <Award className="w-4 h-4 text-rosewood" />
              <span>2,980.3 pts</span>
            </div>
          </div>
        </header>

        {/* Tab Content Canvas */}
        <main className="flex-1 p-6 md:p-8 space-y-6 max-w-full">
          {activeTab === 'decisions' && (
            <DecisionAnalysisView
              dataset={dataset}
              selectedPeriod={selectedPeriod}
              onSelectPeriod={setSelectedPeriod}
            />
          )}

          {activeTab === 'board' && (
            <ExecutiveSummaryView
              dataset={dataset}
              selectedPeriod={selectedPeriod}
            />
          )}

          {activeTab === 'pnl' && (
            <PnLDetailView
              dataset={dataset}
              selectedPeriod={selectedPeriod}
            />
          )}

          {activeTab === 'operations' && (
            <OperationsInventoryView
              dataset={dataset}
              selectedPeriod={selectedPeriod}
            />
          )}

          {activeTab === 'benchmark' && (
            <CompetitorBenchmarkingView
              dataset={dataset}
              selectedPeriod={selectedPeriod}
            />
          )}
        </main>
      </div>
    </div>
  );
}
