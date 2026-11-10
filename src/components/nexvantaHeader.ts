import { nexvantaStore } from '../core/nexvantaStore.ts';

export function renderNexvantaHeader(): string {
  const store = nexvantaStore;

  return `
    <header class="bg-[#050913]/95 border-b border-[#142038] px-4 py-2 sticky top-0 z-40 backdrop-blur-md">
      <div class="flex flex-col lg:flex-row items-center justify-between gap-3">
        
        <!-- Left: Virtual Browser URL & Window Dots -->
        <div class="flex items-center space-x-3 w-full lg:w-auto">
          <div class="flex items-center space-x-1.5 mr-2">
            <span class="w-2.5 h-2.5 rounded-full bg-[#fb3b6c]/80 shadow-[0_0_8px_rgba(251,59,108,0.6)]"></span>
            <span class="w-2.5 h-2.5 rounded-full bg-[#f5a524]/80 shadow-[0_0_8px_rgba(245,165,36,0.6)]"></span>
            <span class="w-2.5 h-2.5 rounded-full bg-[#10e0a0]/80 shadow-[0_0_8px_rgba(16,224,160,0.6)]"></span>
          </div>

          <!-- URL Bar -->
          <div class="flex items-center space-x-2 bg-[#091122] border border-[#1b2b4d] px-3.5 py-1 rounded-full text-xs font-mono text-slate-300 shadow-inner">
            <span class="text-slate-500">🔒</span>
            <span class="text-cyan-400 font-bold">nexvanta.internal</span>
            <span class="text-slate-400">/${store.activeView}</span>
          </div>
        </div>

        <!-- Center: Alert Tickers (Marquee / Live Stream) -->
        <div class="hidden xl:flex items-center space-x-3 overflow-hidden max-w-2xl text-[11px] font-mono">
          <span class="px-2 py-0.5 rounded bg-amber-950/80 text-amber-300 border border-amber-600/60 font-bold whitespace-nowrap animate-pulse">
            ⚠ METRIC WARNING
          </span>
          <div class="flex items-center space-x-2 text-slate-300 bg-[#070d1a] border border-[#172544] px-2.5 py-0.5 rounded-md whitespace-nowrap">
            <span class="text-cyan-400 font-bold">MSSQL-55</span>
            <span class="text-slate-400">Global High RAM Usage = <strong class="text-amber-400">78.72%</strong></span>
            <span class="text-slate-500 font-mono">[2/5]</span>
          </div>
          <span class="px-2 py-0.5 rounded bg-rose-950/80 text-rose-300 border border-rose-600/60 font-bold whitespace-nowrap">
            🚨 INCIDENT: disk_usage_pct on MSSQL-176
          </span>
        </div>

        <!-- Right: Status Pills & Action Badges -->
        <div class="flex items-center space-x-2.5 w-full lg:w-auto justify-end">
          
          <!-- Live Telemetry Mode -->
          <div class="flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-[#081326] border border-cyan-500/30 text-[11px] font-mono font-bold text-cyan-300 shadow-[0_0_12px_rgba(34,211,238,0.2)]">
            <span class="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
            <span>LIVE</span>
          </div>

          <!-- Incidents Badge Button -->
          <button
            id="hdr-incidents-btn"
            class="px-2.5 py-1 rounded-full bg-rose-950/90 text-rose-300 border border-rose-500/50 text-[11px] font-mono font-bold hover:bg-rose-900 transition-all shadow-[0_0_10px_rgba(251,59,108,0.3)] cursor-pointer"
          >
            ${store.unresolvedIncidents.length} INCIDENTS
          </button>

          <!-- Alerts Badge Button -->
          <button
            id="hdr-alerts-btn"
            class="px-2.5 py-1 rounded-full bg-amber-950/90 text-amber-300 border border-amber-500/50 text-[11px] font-mono font-bold hover:bg-amber-900 transition-all shadow-[0_0_10px_rgba(245,165,36,0.3)] cursor-pointer"
          >
            ${store.activeAlerts} ALERTS
          </button>

          <!-- Fleet Health Pill -->
          <div class="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/50 text-xs font-mono font-bold text-emerald-300 shadow-[0_0_12px_rgba(16,224,160,0.2)]">
            <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>${store.devicesUp} / ${store.devicesTotal} HEALTHY</span>
          </div>

          <!-- Digital Clock Pill -->
          <div class="px-3 py-1 rounded-full bg-[#080f1e] border border-slate-800 text-xs font-mono text-slate-300 font-bold shadow-inner">
            ${store.clockTime}
          </div>

        </div>

      </div>
    </header>
  `;
}
