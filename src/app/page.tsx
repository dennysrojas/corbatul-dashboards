'use client';

import React, { useState } from 'react';
import datasetJson from '../../data/processed/corbatul_analytics.json';
import { SimulationDataset } from '../types/corbatul';
import { Sidebar, DashboardTab } from '../components/dashboard/Sidebar';
import { DecisionAnalysisView } from '../components/dashboard/DecisionAnalysisView';
import { ExecutiveSummaryView } from '../components/dashboard/ExecutiveSummaryView';
import { PnLDetailView } from '../components/dashboard/PnLDetailView';
import { OperationsInventoryView } from '../components/dashboard/OperationsInventoryView';
import { CompetitorBenchmarkingView } from '../components/dashboard/CompetitorBenchmarkingView';
import { TeamIdentityPlanView } from '../components/dashboard/TeamIdentityPlanView';

export default function DashboardPage() {
  const dataset = datasetJson as unknown as SimulationDataset;
  const [selectedPeriod, setSelectedPeriod] = useState<number>(4); // Default to Period 4 (2029 - Cierre de Simulación)
  const [activeTab, setActiveTab] = useState<DashboardTab>('identity');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [currency, setCurrency] = useState<'$' | '€'>('€'); // Modo Claro por defecto

  const tabTitles: Record<DashboardTab, { title: string; subtitle: string; icon: string }> = {
    identity: {
      icon: '🏛️',
      title: 'Identidad, Torneo & Plan de Actuación',
      subtitle: 'Equipo FINFORCE (ESPOCH) • ROURA 1940 • Metas & Situación 2025',
    },
    decisions: {
      icon: '🧭',
      title: 'Bitácora Estratégica',
      subtitle: 'Punto Inicial → Decisión → Resultados Causales (2026-2029)',
    },
    board: {
      icon: '🏛️',
      title: 'Sala de Juntas',
      subtitle: 'Scorecard Ejecutivo & Creación de Valor (Roura 1940)',
    },
    pnl: {
      icon: '📜',
      title: 'Estado de Resultados (P&L)',
      subtitle: 'Auditoría Contable Textil & Cascada de Costes en Euros (€)',
    },
    operations: {
      icon: '🧵',
      title: 'Taller, Telar & Inventario',
      subtitle: 'Corbatas, Bufandas & Calcetines (Capacidad & Servicio)',
    },
    benchmark: {
      icon: '🎯',
      title: 'Radar de Competidores',
      subtitle: 'Benchmarking de la Industria Textil Española (7 Firmas)',
    },
  };

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-roura-beige dark:bg-roura-navy-deep text-roura-navy dark:text-roura-beige-light font-sans flex antialiased transition-colors duration-300">
        {/* 1. Collapsible Sidebar */}
        <Sidebar
          dataset={dataset}
          selectedPeriod={selectedPeriod}
          onSelectPeriod={setSelectedPeriod}
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={() => setIsSidebarCollapsed(prev => !prev)}
          isDarkMode={isDarkMode}
        />

        {/* 2. Main Executive Content Column */}
        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto h-screen">
          {/* Top Header Bar */}
          <header className="sticky top-0 z-30 bg-white/95 dark:bg-roura-navy/95 backdrop-blur border-b border-roura-beige-dark dark:border-roura-navy-dark px-6 py-3.5 flex items-center justify-between shadow-sm transition-colors duration-300">
            <div className="flex items-center gap-3">
              {isSidebarCollapsed && (
                <button
                  onClick={() => setIsSidebarCollapsed(false)}
                  className="p-1.5 rounded-lg bg-roura-beige dark:bg-roura-navy-dark hover:bg-roura-beige-dark dark:hover:bg-roura-navy text-roura-navy dark:text-white transition-colors border border-roura-beige-deep dark:border-roura-navy-light"
                  title="Expandir menú lateral"
                >
                  ❯
                </button>
              )}
              <div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-roura-teal dark:text-roura-sky font-semibold flex items-center gap-1.5">
                  <span>ROURA 1940</span>
                  <span>•</span>
                  <span>Equipo FINFORCE</span>
                  <span>•</span>
                  <span className="font-bold">Certificación ACBSP</span>
                </div>
                <h1 className="text-base sm:text-lg font-serif font-black text-roura-navy dark:text-white flex items-center gap-2">
                  <span className="text-sm shrink-0">{tabTitles[activeTab].icon}</span>
                  <span>{tabTitles[activeTab].title}</span>
                  <span className="hidden md:inline font-sans font-normal text-xs text-roura-navy/60 dark:text-roura-sky/70">
                    — {tabTitles[activeTab].subtitle}
                  </span>
                </h1>
              </div>
            </div>

            {/* Quick Period Indicator Badge & Actions */}
            <div className="flex items-center gap-2.5">
              <div className="hidden sm:flex items-center gap-2 bg-roura-beige dark:bg-roura-navy-dark px-3 py-1.5 rounded-lg border border-roura-beige-dark dark:border-roura-navy-light text-xs font-serif">
                <span className="text-roura-navy/60 dark:text-roura-sky/70 font-mono text-[10px] uppercase">Ronda:</span>
                <strong className="text-roura-navy dark:text-white font-bold">
                  P{selectedPeriod} ({2025 + selectedPeriod})
                </strong>
              </div>

              {/* Currency Selector ($ / €) */}
              <button
                onClick={() => setCurrency(prev => prev === '$' ? '€' : '$')}
                className={`px-3 py-1.5 text-xs font-mono font-bold rounded-lg border transition-all flex items-center gap-1.5 shadow-sm ${
                  currency === '$'
                    ? 'bg-roura-teal text-white border-roura-teal'
                    : 'bg-white dark:bg-roura-navy text-roura-navy dark:text-roura-sky border-roura-beige-deep dark:border-roura-navy-light'
                }`}
                title="Alternar entre $ (Dólar del informe) y € (Euro del simulador)"
              >
                <span>Moneda:</span>
                <span className="font-black text-sm">{currency}</span>
              </button>

              {/* Theme Toggle Button (Light Mode / Dark Mode) */}
              <button
                onClick={() => setIsDarkMode(prev => !prev)}
                className={`px-3 py-1.5 text-xs font-serif font-bold rounded-lg border transition-all flex items-center gap-1.5 shadow-sm ${
                  isDarkMode
                    ? 'bg-roura-navy-dark text-roura-sky border-roura-teal hover:bg-roura-navy'
                    : 'bg-white text-roura-navy border-roura-beige-deep hover:bg-roura-beige'
                }`}
                title={isDarkMode ? 'Cambiar a Versión Clara' : 'Cambiar a Versión Oscura'}
              >
                <span>{isDarkMode ? '☀️' : '🌙'}</span>
                <span className="hidden md:inline">{isDarkMode ? 'Versión Clara' : 'Versión Oscura'}</span>
              </button>

              <button
                onClick={() => window.print()}
                className="px-3 py-1.5 text-xs font-serif font-bold rounded-lg bg-roura-navy dark:bg-roura-teal text-white hover:bg-roura-navy-light dark:hover:bg-roura-teal-dark transition-all shadow-sm border border-roura-navy dark:border-roura-teal flex items-center gap-1.5"
              >
                <span>🖨️</span>
                <span className="hidden sm:inline">Imprimir Informe</span>
              </button>
            </div>
          </header>

          {/* Main Dashboard Canvas */}
          <main className="p-6 sm:p-8 w-full flex-1">
            {activeTab === 'identity' && (
              <TeamIdentityPlanView currency={currency} />
            )}
            {activeTab === 'decisions' && (
              <DecisionAnalysisView
                dataset={dataset}
                selectedPeriod={selectedPeriod}
                onSelectPeriod={setSelectedPeriod}
              />
            )}
            {activeTab === 'board' && (
              <ExecutiveSummaryView dataset={dataset} selectedPeriod={selectedPeriod} />
            )}
            {activeTab === 'pnl' && (
              <PnLDetailView dataset={dataset} selectedPeriod={selectedPeriod} />
            )}
            {activeTab === 'operations' && (
              <OperationsInventoryView dataset={dataset} selectedPeriod={selectedPeriod} />
            )}
            {activeTab === 'benchmark' && (
              <CompetitorBenchmarkingView dataset={dataset} selectedPeriod={selectedPeriod} />
            )}
          </main>

          {/* Tailored Footer */}
          <footer className="px-6 sm:px-8 py-4 border-t border-roura-beige-dark dark:border-roura-navy-dark bg-white/70 dark:bg-roura-navy/60 text-center text-[11px] text-roura-navy/70 dark:text-roura-sky/60 font-serif flex items-center justify-between">
            <span>ROURA 1940 &bull; Auditoría Oficial ACBSP &bull; Equipo FINFORCE</span>
            <span className="font-mono text-[10px]">
              Ejercicio {2025 + selectedPeriod} (Ronda {selectedPeriod} de {dataset.periods.length}) &bull; Roura1940
            </span>
          </footer>
        </div>
      </div>
    </div>
  );
}
