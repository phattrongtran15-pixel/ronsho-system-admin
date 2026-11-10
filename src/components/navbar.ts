import { store } from '../core/store.ts';
import { TabId, TimeRange } from '../core/models.ts';

export function renderNavbar(): string {
  const activeTab = store.activeTab;
  const timeRange = store.timeRange;
  const circuitArmed = store.circuitBreakerArmed;
  const searchQuery = store.searchQuery;

  const tabs: { id: TabId; label: string; icon: string }[] = [
    { id: 'nexus-operations', label: 'Nexus Operations', icon: '📊' },
    { id: 'mission-hud', label: '1. Mission HUD', icon: '🛸' },
    { id: 'c4-living-map', label: 'C4 Living Map', icon: '🗺️' },
    { id: 'triad-oracle', label: 'Archify Oracle', icon: '🛡️' },
  ];

  const ranges: { id: TimeRange; label: string }[] = [
    { id: 'weekly', label: 'Weekly' },
    { id: 'monthly', label: 'Monthly' },
    { id: 'yearly', label: 'Yearly' },
  ];

  return `
    <header class="bg-slate-900 border-b border-cyan-500/30 text-white sticky top-0 z-50 shadow-xl backdrop-blur-md bg-opacity-95">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          
          <!-- Brand & Sovereign Title -->
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 rounded-lg bg-gradient-to-tr from-cyan-600 via-indigo-600 to-emerald-400 flex items-center justify-center font-black text-xl text-white shadow-lg shadow-cyan-500/20 border border-cyan-400/50">
              RS
            </div>
            <div>
              <div class="flex items-center space-x-2">
                <span class="font-extrabold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400 text-lg">
                  RON-SHO AIOS
                </span>
                <span class="text-xs bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 font-mono px-2 py-0.5 rounded-full">
                  v2.5 PROD
                </span>
              </div>
              <div class="text-[11px] text-slate-400 font-mono tracking-tight">
                Report Control & Management Center
              </div>
            </div>
          </div>

          <!-- Navigation Tabs -->
          <nav class="hidden md:flex items-center space-x-1 bg-slate-950/80 p-1.5 rounded-xl border border-slate-800">
            ${tabs
              .map(
                (t) => `
              <button 
                data-tab="${t.id}"
                class="tab-btn px-3 py-1.5 rounded-lg text-sm font-semibold transition-all duration-150 flex items-center space-x-1.5 ${
                  activeTab === t.id
                    ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }"
              >
                <span>${t.icon}</span>
                <span>${t.label}</span>
              </button>
            `
              )
              .join('')}
          </nav>

          <!-- Controls: TimeRange + Search + Circuit Breaker -->
          <div class="flex items-center space-x-3">
            
            <!-- Global Search Input -->
            <div class="relative hidden lg:block">
              <input
                id="global-search"
                type="text"
                value="${searchQuery}"
                placeholder="Search projects, fleet..."
                class="w-48 bg-slate-950 border border-slate-700 rounded-lg px-3 py-1 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-all"
              />
              <span class="absolute right-2 top-1.5 text-xs text-slate-500">🔍</span>
            </div>

            <!-- Time Range Toggle -->
            <div class="flex items-center bg-slate-950 border border-slate-800 p-1 rounded-lg">
              ${ranges
                .map(
                  (r) => `
                <button
                  data-range="${r.id}"
                  class="range-btn px-2.5 py-1 text-xs font-mono rounded ${
                    timeRange === r.id
                      ? 'bg-slate-800 text-emerald-400 font-bold border border-emerald-500/30'
                      : 'text-slate-400 hover:text-slate-200'
                  }"
                >
                  ${r.label}
                </button>
              `
                )
                .join('')}
            </div>

            <!-- Circuit Breaker Toggle Button -->
            <button
              id="circuit-toggle-btn"
              class="px-3 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center space-x-1.5 transition-all shadow-md ${
                circuitArmed
                  ? 'bg-emerald-950/80 border border-emerald-500/60 text-emerald-300 hover:bg-emerald-900/60'
                  : 'bg-rose-950/80 border border-rose-500/60 text-rose-300 animate-pulse hover:bg-rose-900/60'
              }"
              title="Click to toggle Circuit Breaker state"
            >
              <span>${circuitArmed ? '🛡️' : '🚨'}</span>
              <span>${circuitArmed ? 'CB ARMED' : 'CB TRIPPED'}</span>
            </button>

            <!-- Export Audit Report Button -->
            <button
              id="export-audit-btn"
              class="hidden sm:flex px-2.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold items-center space-x-1 shadow-md shadow-indigo-600/30 transition-all"
              title="Download verified JSON audit report"
            >
              <span>📥</span>
              <span>Audit</span>
            </button>

          </div>
        </div>

        <!-- Mobile Tab Row -->
        <div class="flex md:hidden items-center justify-around py-2 border-t border-slate-800 overflow-x-auto space-x-1">
          ${tabs
            .map(
              (t) => `
            <button 
              data-tab="${t.id}"
              class="tab-btn px-2 py-1 rounded text-xs whitespace-nowrap font-medium ${
                activeTab === t.id
                  ? 'bg-cyan-600 text-white font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }"
            >
              ${t.icon} ${t.label}
            </button>
          `
            )
            .join('')}
        </div>

      </div>
    </header>
  `;
}
