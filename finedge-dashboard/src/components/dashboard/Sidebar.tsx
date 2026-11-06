'use client';

import React from 'react';
import { SimulationDataset } from '../../types/corbatul';
import { getExecutiveScorecard } from '../../lib/analytics';
import { 
  Compass, 
  BarChart3, 
  FileSpreadsheet, 
  Layers, 
  Target, 
  ChevronLeft, 
  ChevronRight,
  Award
} from 'lucide-react';

export type DashboardTab = 'decisions' | 'board' | 'pnl' | 'operations' | 'benchmark';

interface SidebarProps {
  dataset: SimulationDataset;
  selectedPeriod: number;
  onSelectPeriod: (period: number) => void;
  activeTab: DashboardTab;
  onSelectTab: (tab: DashboardTab) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
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

  const menuItems: { id: DashboardTab; label: string; sublabel: string; icon: React.ReactNode }[] = [
    {
      id: 'decisions',
      label: 'Bitácora Estratégica',
      sublabel: 'Decisiones vs Consecuencias',
      icon: <Compass className="w-4 h-4" />,
    },
    {
      id: 'board',
      label: 'Sala de Juntas',
      sublabel: 'Creación de Valor & Scorecard',
      icon: <BarChart3 className="w-4 h-4" />,
    },
    {
      id: 'pnl',
      label: 'P&L y Finanzas',
      sublabel: 'Auditoría de Costes & Margen',
      icon: <FileSpreadsheet className="w-4 h-4" />,
    },
    {
      id: 'operations',
      label: 'Taller & Existencias',
      sublabel: 'Corbatas, Bufandas & Calcetines',
      icon: <Layers className="w-4 h-4" />,
    },
    {
      id: 'benchmark',
      label: 'Radar de Mercado',
      sublabel: 'Comparativa de las 7 Firmas',
      icon: <Target className="w-4 h-4" />,
    },
  ];

  return (
    <aside
      className={`${
        isCollapsed ? 'w-20' : 'w-72'
      } bg-white border-r border-mineral/40 text-slate-steel-900 flex flex-col h-screen sticky top-0 select-none z-40 transition-all duration-300 ease-in-out`}
    >
      {/* Brand Header */}
      <div className="p-4 border-b border-mineral/30 flex items-center justify-between bg-mineral-50/50">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="w-9 h-9 min-w-[36px] rounded-lg bg-slate-steel text-white flex items-center justify-center font-mono font-bold text-sm tracking-wider shadow-sm">
            FE
          </div>
          {!isCollapsed && (
            <div className="truncate">
              <span className="font-mono font-bold tracking-tight text-sm text-slate-steel block truncate">
                FINEDGE
              </span>
              <span className="text-[10px] text-slate-steel/70 font-mono block truncate">
                PuntoOne · Simulación Corbatul
              </span>
            </div>
          )}
        </div>
        <button
          onClick={onToggleCollapse}
          className="p-1 rounded-md text-slate-steel/60 hover:text-slate-steel hover:bg-mineral-100 transition-colors"
          title={isCollapsed ? 'Expandir barra' : 'Colapsar barra'}
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Period Selector */}
      <div className="p-3 border-b border-mineral/30 bg-mineral-50/30">
        {!isCollapsed && (
          <div className="flex items-center justify-between mb-1.5 px-1 text-[10px] font-mono uppercase tracking-wider text-slate-steel/70 font-medium">
            <span>Ronda:</span>
            <span className="font-bold text-rosewood">
              {selectedPeriod === 4 ? 'Cierre 2029' : `${2025 + selectedPeriod}`}
            </span>
          </div>
        )}
        <div className="grid grid-cols-4 gap-1">
          {dataset.periods.map(period => {
            const isSelected = period === selectedPeriod;
            return (
              <button
                key={period}
                onClick={() => onSelectPeriod(period)}
                className={`py-1.5 px-1 rounded-md text-center font-mono transition-all text-xs ${
                  isSelected
                    ? 'bg-slate-steel text-white font-semibold shadow-sm'
                    : 'bg-mineral-100/60 text-slate-steel/80 hover:bg-mineral-200/60'
                }`}
              >
                <div className="text-[11px] font-semibold">P{period}</div>
                <div className="text-[9px] opacity-75">{2025 + period}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Nav Menu */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {menuItems.map(item => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all ${
                isActive
                  ? 'bg-mineral-100/90 text-slate-steel font-semibold border-l-2 border-rosewood'
                  : 'text-slate-steel/70 hover:bg-mineral-50 hover:text-slate-steel'
              }`}
            >
              <div className={`${isActive ? 'text-rosewood' : 'text-slate-steel/60'}`}>
                {item.icon}
              </div>
              {!isCollapsed && (
                <div className="truncate flex-1">
                  <div className="text-xs">{item.label}</div>
                  <div className="text-[10px] text-slate-steel/50 font-mono truncate">
                    {item.sublabel}
                  </div>
                </div>
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom KPI Card */}
      {!isCollapsed && (
        <div className="p-3 border-t border-mineral/30 bg-mineral-50/50">
          <div className="p-3 rounded-xl bg-white border border-mineral/50 shadow-minimal">
            <div className="flex items-center justify-between text-xs font-mono mb-1">
              <span className="text-slate-steel/70 flex items-center gap-1 text-[11px]">
                <Award className="w-3.5 h-3.5 text-rosewood" /> Valor Firma
              </span>
              <span className="text-rosewood font-bold">
                {scorecard.sharePrice.toFixed(1)} pts
              </span>
            </div>
            <div className="flex items-center justify-between text-[10px] font-mono text-slate-steel/60">
              <span>Posición:</span>
              <span className="font-semibold text-slate-steel">
                #{scorecard.rankBySharePrice} de 7
              </span>
            </div>
            <div className="mt-2 pt-2 border-t border-mineral/30 flex items-center justify-between text-[10px] font-mono">
              <span className="text-slate-steel/60">Margen Bruto:</span>
              <span className="text-slate-steel font-bold">
                {scorecard.grossMargin.toFixed(1)}%
              </span>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};
