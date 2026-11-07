'use client';

import React from 'react';
import { SimulationDataset } from '../../types/corbatul';
import { getExecutiveScorecard } from '../../lib/analytics';

export type DashboardTab = 'identity' | 'decisions' | 'board' | 'pnl' | 'operations' | 'benchmark';

interface SidebarProps {
  dataset: SimulationDataset;
  selectedPeriod: number;
  onSelectPeriod: (period: number) => void;
  activeTab: DashboardTab;
  onSelectTab: (tab: DashboardTab) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  isDarkMode?: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({
  dataset,
  selectedPeriod,
  onSelectPeriod,
  activeTab,
  onSelectTab,
  isCollapsed,
  onToggleCollapse,
}) => {
  const scorecard = getExecutiveScorecard(dataset, selectedPeriod);
  const ourFirm = dataset.meta.firms.find(f => f.id === dataset.meta.primaryFirmId);

  const menuItems: { id: DashboardTab; label: string; sublabel: string; icon: string; isPrimary?: boolean }[] = [
    {
      id: 'identity',
      label: 'Identidad & Plan',
      sublabel: 'Equipo FINFORCE, Torneo & Metas 2025',
      icon: '🏛️',
    },
    {
      id: 'decisions',
      label: 'Bitácora de Decisiones',
      sublabel: 'Pipeline Causal (Punto → Decisión → Impacto)',
      icon: '🧭',
      isPrimary: true,
    },
    {
      id: 'board',
      label: 'Sala de Juntas',
      sublabel: 'Scorecard Macro & Creación de Valor',
      icon: '🏛️',
    },
    {
      id: 'pnl',
      label: 'P&L y Finanzas',
      sublabel: 'Cascada de Costos & Márgenes',
      icon: '📜',
    },
    {
      id: 'operations',
      label: 'Taller & Existencias',
      sublabel: 'Capacidad, Telar & Inventario',
      icon: '🧵',
    },
    {
      id: 'benchmark',
      label: 'Radar de Competidores',
      sublabel: 'Benchmarking de las 7 Firmas',
      icon: '🎯',
    },
  ];

  return (
    <aside
      className={`${
        isCollapsed ? 'w-20' : 'w-72'
      } bg-white dark:bg-roura-navy-dark text-roura-navy dark:text-roura-beige-light flex flex-col h-screen sticky top-0 border-r border-roura-beige-dark dark:border-roura-navy shadow-sm select-none z-40 transition-all duration-300 ease-in-out`}
    >
      {/* Brand & Header */}
      {isCollapsed ? (
        <div className="py-4 px-2 flex flex-col items-center gap-2.5 border-b border-roura-beige-dark dark:border-roura-navy-light/30 bg-roura-beige-light dark:bg-roura-navy-deep">
          <div className="w-11 h-11 rounded-xl bg-roura-teal text-white flex items-center justify-center font-serif font-black text-xl shadow-sm border border-roura-teal-light/40">
            R
          </div>
          <button
            onClick={onToggleCollapse}
            title="Expandir menú lateral"
            className="w-8 h-8 rounded-lg bg-white dark:bg-roura-navy text-roura-navy dark:text-roura-sky hover:bg-roura-teal hover:text-white transition-all border border-roura-beige-deep dark:border-roura-navy-light flex items-center justify-center text-xs shadow-sm"
          >
            ❯
          </button>
        </div>
      ) : (
        <div className="p-4 border-b border-roura-beige-dark dark:border-roura-navy-light/30 bg-roura-beige-light dark:bg-roura-navy-deep flex items-center justify-between">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-10 h-10 min-w-[40px] rounded-lg bg-roura-teal dark:bg-roura-teal text-white flex items-center justify-center font-serif font-black text-lg shadow-sm border border-roura-teal-light/40">
              R
            </div>
            <div className="truncate">
              <span className="font-serif font-black tracking-wider text-sm text-roura-navy dark:text-white uppercase block truncate">
                ROURA 1940
              </span>
              <p className="text-xs text-roura-teal dark:text-roura-sky tracking-widest uppercase font-mono truncate font-semibold">
                Textil & Sastrería • ACBSP
              </p>
            </div>
          </div>

          <button
            onClick={onToggleCollapse}
            title="Colapsar panel lateral"
            className="p-1.5 rounded-lg bg-roura-beige dark:bg-roura-navy text-roura-navy dark:text-roura-sky hover:bg-roura-beige-dark dark:hover:bg-roura-navy-light transition-colors border border-roura-beige-deep dark:border-roura-navy-light ml-1"
          >
            ❮
          </button>
        </div>
      )}

      {/* Active Firm Card (when expanded) */}
      {!isCollapsed && (
        <div className="px-4 py-2.5 border-b border-roura-beige-dark dark:border-roura-navy-light/30 bg-roura-beige/40 dark:bg-roura-navy/40">
          <div className="p-2.5 rounded-lg bg-white dark:bg-roura-navy border border-roura-beige-dark dark:border-roura-navy-light/50 flex items-center justify-between shadow-sm">
            <div className="truncate">
              <span className="text-[10px] uppercase tracking-widest text-roura-teal dark:text-roura-sky font-bold block">
                Firma Administrada
              </span>
              <span className="text-xs font-bold text-roura-navy dark:text-white font-serif truncate block">
                {ourFirm?.name || 'Roura1940 (FINFORCE)'}
              </span>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-roura-sky/40 dark:bg-roura-teal/30 text-roura-navy dark:text-roura-sky border border-roura-teal/30 shrink-0 ml-1">
              FINFORCE
            </span>
          </div>
        </div>
      )}

      {/* Period Selector */}
      <div className={`border-b border-roura-beige-dark dark:border-roura-navy-light/30 bg-roura-beige-light/60 dark:bg-roura-navy-deep/60 ${isCollapsed ? 'py-3 px-2 text-center' : 'px-4 py-3'}`}>
        {!isCollapsed ? (
          <>
            <div className="flex items-center justify-between text-xs text-roura-navy/70 dark:text-roura-sky font-medium mb-2">
              <span className="text-[10px] uppercase tracking-wider font-mono font-bold">
                Ronda / Ejercicio:
              </span>
              <span className="text-xs font-serif font-bold text-roura-teal dark:text-roura-sky">
                P{selectedPeriod} ({2025 + selectedPeriod})
              </span>
            </div>

            <div className="grid grid-cols-4 gap-1.5">
              {dataset.periods.map(p => {
                const isSelected = p === selectedPeriod;
                const yearLabel = 2025 + p;
                return (
                  <button
                    key={p}
                    onClick={() => onSelectPeriod(p)}
                    className={`py-1.5 text-xs font-serif font-bold rounded-md transition-all flex flex-col items-center justify-center ${
                      isSelected
                        ? 'bg-roura-teal dark:bg-roura-teal text-white shadow-sm ring-2 ring-roura-teal/40 font-black'
                        : 'bg-roura-beige dark:bg-roura-navy text-roura-navy dark:text-roura-sky hover:bg-roura-beige-dark dark:hover:bg-roura-navy-light border border-roura-beige-dark dark:border-roura-navy-light/40'
                    }`}
                  >
                    <span>P{p}</span>
                    <span className={`text-[10px] font-sans font-normal ${isSelected ? 'text-white font-bold' : 'text-roura-navy/60 dark:text-roura-sky/60'}`}>
                      {yearLabel}
                    </span>
                  </button>
                );
              })}
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center gap-1.5 w-full">
            <span className="text-[9px] font-mono uppercase tracking-wider text-roura-navy/60 dark:text-roura-sky/70 font-bold">
              Ronda
            </span>
            <div className="flex flex-col gap-1 w-full items-center">
              {dataset.periods.map(p => {
                const isSelected = p === selectedPeriod;
                return (
                  <button
                    key={p}
                    onClick={() => onSelectPeriod(p)}
                    title={`Ronda ${p} (${2025 + p})`}
                    className={`w-10 h-7 rounded-lg font-serif font-bold text-xs transition-all flex items-center justify-center ${
                      isSelected
                        ? 'bg-roura-teal text-white shadow-sm ring-1 ring-roura-teal/50 font-black'
                        : 'bg-white dark:bg-roura-navy text-roura-navy/80 dark:text-roura-sky hover:bg-roura-sky/40 dark:hover:bg-roura-navy-light border border-roura-beige-dark dark:border-roura-navy-light/30'
                    }`}
                  >
                    P{p}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Navigation Links */}
      <nav className={`flex-1 overflow-y-auto ${isCollapsed ? 'px-2 py-3 space-y-2' : 'px-3 py-4 space-y-1.5'}`}>
        {!isCollapsed && (
          <div className="px-2 pb-1 text-[10px] uppercase font-mono tracking-wider text-roura-teal dark:text-roura-sky font-bold">
            Análisis Estratégico
          </div>
        )}
        {menuItems.map(item => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              title={`${item.label} (${item.sublabel})`}
              className={`transition-all relative rounded-xl ${
                isCollapsed
                  ? `w-12 h-12 mx-auto flex items-center justify-center ${
                      isActive
                        ? 'bg-roura-teal text-white shadow-md ring-2 ring-roura-teal/30'
                        : 'text-roura-navy dark:text-roura-sky hover:bg-roura-beige dark:hover:bg-roura-navy/80 border border-transparent hover:border-roura-beige-dark'
                    }`
                  : `w-full text-left flex items-center gap-3 px-3 py-2.5 ${
                      isActive
                        ? 'bg-roura-beige dark:bg-roura-navy text-roura-navy dark:text-white border-l-4 border-roura-teal shadow-sm font-bold'
                        : 'text-roura-navy/80 dark:text-roura-sky hover:bg-roura-beige/60 dark:hover:bg-roura-navy/60'
                    }`
              } ${item.isPrimary && !isCollapsed ? 'ring-1 ring-roura-teal/30' : ''}`}
            >
              <span className={`leading-none shrink-0 ${isCollapsed ? 'text-2xl' : 'text-lg'}`}>
                {item.icon}
              </span>
              {!isCollapsed && (
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className={`text-xs font-serif font-bold truncate ${isActive ? 'text-roura-navy dark:text-white' : 'text-roura-navy/90 dark:text-roura-beige-light'}`}>
                      {item.label}
                    </span>
                    {item.isPrimary && (
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-mono uppercase bg-roura-teal text-white font-black">
                        Foco
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-roura-navy/60 dark:text-roura-sky/70 truncate mt-0.5">
                    {item.sublabel}
                  </div>
                </div>
              )}
            </button>
          );
        })}
      </nav>

      {/* Executive Quick Stats Footer */}
      <div className={`border-t border-roura-beige-dark dark:border-roura-navy-light/30 bg-roura-beige-light dark:bg-roura-navy-deep ${isCollapsed ? 'p-2.5 text-center' : 'p-4'}`}>
        {!isCollapsed ? (
          <>
            <div className="text-[10px] uppercase tracking-wider text-roura-teal dark:text-roura-sky font-mono font-bold mb-2 flex items-center justify-between">
              <span>Resumen P{selectedPeriod}</span>
              <span className="text-roura-teal dark:text-roura-sky font-bold">Ronda Activa</span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded bg-white dark:bg-roura-navy border border-roura-beige-dark dark:border-roura-navy-light/40 shadow-sm">
                <span className="text-[10px] text-roura-navy/60 dark:text-roura-sky/70 uppercase tracking-wider block font-medium">Valor Cía</span>
                <span className="font-serif font-bold text-roura-navy dark:text-white text-base tabular-nums">
                  {scorecard.sharePrice.toFixed(1)} <span className="text-[10px] text-roura-teal dark:text-roura-sky font-sans">pts</span>
                </span>
              </div>

              <div className="p-2.5 rounded bg-white dark:bg-roura-navy border border-roura-beige-dark dark:border-roura-navy-light/40 shadow-sm">
                <span className="text-[10px] text-roura-navy/60 dark:text-roura-sky/70 uppercase tracking-wider block font-medium">Cuota</span>
                <span className="font-serif font-bold text-roura-teal dark:text-roura-sky text-base tabular-nums">
                  {scorecard.marketShare.toFixed(1)}%
                </span>
              </div>
            </div>

            <div className="mt-2.5 pt-2 border-t border-roura-beige-dark dark:border-roura-navy-light/30 flex items-center justify-between text-xs text-roura-navy/70 dark:text-roura-sky">
              <span className="text-[11px]">Posición Mercado:</span>
              <span className="font-serif font-black text-white px-2 py-0.5 rounded bg-roura-teal shadow-sm">
                #{scorecard.rankBySharePrice} de 7
              </span>
            </div>
          </>
        ) : (
          <div className="p-2 flex flex-col items-center justify-center bg-white dark:bg-roura-navy rounded-xl border border-roura-beige-dark dark:border-roura-navy-light/30 shadow-sm">
            <span className="text-[9px] font-mono uppercase tracking-wider text-roura-navy/60 dark:text-roura-sky font-semibold">
              Rank
            </span>
            <span className="font-serif font-black text-roura-teal dark:text-roura-sky text-sm">
              #{scorecard.rankBySharePrice}
            </span>
            <span className="text-[8px] font-mono text-roura-navy/40 dark:text-roura-sky/50">
              de 7
            </span>
          </div>
        )}
      </div>
    </aside>
  );
};
