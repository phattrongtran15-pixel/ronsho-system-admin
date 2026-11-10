import { nexvantaStore } from '../core/nexvantaStore.ts';

export function renderNexvantaModal(): string {
  const store = nexvantaStore;
  if (!store.isRcaModalOpen) return '';

  const activeTab = store.activeModalTab;
  const incidents = store.incidents;
  const unresolved = store.unresolvedIncidents;

  return `
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in font-sans">
      
      <!-- Modal Box -->
      <div class="w-full max-w-3xl bg-[#070d1a] border border-[#1e3258] rounded-2xl shadow-[0_25px_80px_rgba(0,0,0,0.9),0_0_30px_rgba(34,211,238,0.15)] overflow-hidden flex flex-col max-h-[90vh]">
        
        <!-- Modal Top Bar -->
        <div class="px-5 py-3.5 bg-[#091224] border-b border-[#182a4c] flex items-center justify-between">
          <div class="flex items-center space-x-2.5">
            <span class="text-base text-cyan-400">🤖</span>
            <h3 class="font-display font-extrabold text-sm tracking-wide text-white">
              NEXVANTA EXECUTIVE INTELLIGENCE BRIEFING
            </h3>
            <span class="text-[9px] font-mono font-bold bg-cyan-950 text-cyan-300 border border-cyan-800 px-2 py-0.5 rounded-full animate-pulse">
              LIVE TELEMETRY
            </span>
          </div>

          <div class="flex items-center space-x-2 text-xs font-mono text-slate-400">
            <button id="modal-close-btn" class="p-1 hover:text-white rounded hover:bg-slate-800 transition-colors cursor-pointer text-base leading-none">
              ✕
            </button>
          </div>
        </div>

        <!-- Top 3 Metric Cards Row -->
        <div class="p-5 pb-3 grid grid-cols-1 sm:grid-cols-3 gap-3">
          
          <!-- Card 1: Open Incidents -->
          <div class="bg-[#0b1426] border border-rose-500/40 p-3 rounded-xl flex items-center space-x-3 shadow-[0_0_15px_rgba(251,59,108,0.1)]">
            <div class="w-9 h-9 rounded-lg bg-rose-950/80 border border-rose-600/50 flex items-center justify-center text-rose-400 text-lg">
              ⚡
            </div>
            <div>
              <div class="text-[9px] font-mono text-slate-400 uppercase font-bold">OPEN INCIDENTS</div>
              <div class="text-lg font-display font-black text-rose-400 glow-rose">${unresolved.length} Active</div>
            </div>
          </div>

          <!-- Card 2: Active Firing Alerts -->
          <div class="bg-[#0b1426] border border-amber-500/40 p-3 rounded-xl flex items-center space-x-3 shadow-[0_0_15px_rgba(245,165,36,0.1)]">
            <div class="w-9 h-9 rounded-lg bg-amber-950/80 border border-amber-600/50 flex items-center justify-center text-amber-400 text-lg">
              🛡️
            </div>
            <div>
              <div class="text-[9px] font-mono text-slate-400 uppercase font-bold">ACTIVE FIRING ALERTS</div>
              <div class="text-lg font-display font-black text-amber-300 glow-amber">${store.activeAlerts} (${store.criticalAlerts} Critical)</div>
            </div>
          </div>

          <!-- Card 3: Fleet Node Status -->
          <div class="bg-[#0b1426] border border-emerald-500/40 p-3 rounded-xl flex items-center space-x-3 shadow-[0_0_15px_rgba(16,224,160,0.1)]">
            <div class="w-9 h-9 rounded-lg bg-emerald-950/80 border border-emerald-600/50 flex items-center justify-center text-emerald-400 text-lg">
              ✓
            </div>
            <div>
              <div class="text-[9px] font-mono text-slate-400 uppercase font-bold">FLEET NODE STATUS</div>
              <div class="text-lg font-display font-black text-emerald-300 glow-emerald">${store.devicesUp} / ${store.devicesTotal} Healthy</div>
            </div>
          </div>

        </div>

        <!-- Navigation Tabs Inside Modal -->
        <div class="px-5 flex items-center space-x-2 border-b border-[#182a4c] pb-2 text-xs font-mono font-bold">
          <button
            data-modal-tab="ai-priority"
            class="modal-tab-btn px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'ai-priority'
                ? 'bg-indigo-950 text-indigo-300 border border-indigo-700/60 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }"
          >
            ⚡ AI PRIORITY PLAN (4)
          </button>
          
          <button
            data-modal-tab="active-alerts"
            class="modal-tab-btn px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'active-alerts'
                ? 'bg-amber-950 text-amber-300 border border-amber-700/60 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }"
          >
            🔔 ACTIVE FIRING ALERTS (${store.activeAlerts})
          </button>

          <button
            data-modal-tab="open-incidents"
            class="modal-tab-btn px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'open-incidents'
                ? 'bg-rose-950 text-rose-300 border border-rose-700/60 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }"
          >
            🚨 OPEN INCIDENTS (${unresolved.length})
          </button>
        </div>

        <!-- Scrollable Incident List -->
        <div class="p-5 overflow-y-auto space-y-2.5 flex-1">
          ${incidents
            .map((inc) => {
              const sevBadge =
                inc.severity === 'CRITICAL'
                  ? 'bg-rose-950/80 text-rose-300 border-rose-600'
                  : inc.severity === 'WARN'
                  ? 'bg-amber-950/80 text-amber-300 border-amber-600'
                  : 'bg-cyan-950/80 text-cyan-300 border-cyan-600';

              return `
              <div class="bg-[#091122] border ${inc.resolved ? 'border-slate-800 opacity-50' : 'border-[#1b2f56]'} p-3 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-cyan-500/40 transition-all">
                <div class="flex items-start space-x-3">
                  <span class="text-sm mt-0.5">${inc.resolved ? '✅' : '⚡'}</span>
                  <div>
                    <div class="flex items-center space-x-2">
                      <span class="text-xs font-bold text-white">${inc.title}</span>
                      <span class="text-[9px] font-mono px-1.5 py-0.2 rounded border ${sevBadge} font-bold">
                        ${inc.severity}
                      </span>
                    </div>
                    <div class="text-[11px] text-slate-400 mt-1">
                      Automated incident triggered by Nexvanta NIMS Alerting Engine on host <strong class="text-slate-300">${inc.host}</strong>.
                    </div>
                  </div>
                </div>

                <div class="shrink-0 flex items-center space-x-2">
                  ${
                    inc.resolved
                      ? '<span class="text-xs font-mono text-emerald-400 font-bold px-3 py-1 bg-emerald-950/60 rounded-lg border border-emerald-800">RESOLVED</span>'
                      : `
                    <button
                      data-resolve-id="${inc.id}"
                      class="resolve-incident-btn px-3 py-1.5 rounded-lg bg-gradient-to-r from-cyan-600 to-teal-500 hover:from-cyan-500 hover:to-teal-400 text-white font-mono text-xs font-bold transition-all shadow-[0_0_12px_rgba(34,211,238,0.3)] flex items-center space-x-1 cursor-pointer active:scale-95"
                    >
                      <span>RESOLVE INCIDENT</span>
                      <span>></span>
                    </button>
                  `
                  }
                </div>
              </div>
            `;
            })
            .join('')}
        </div>

        <!-- Modal Bottom Bar (image_2.png style) -->
        <div class="px-5 py-3 bg-[#050a14] border-t border-[#182a4c] flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-slate-400 gap-2">
          <div class="flex items-center space-x-2">
            <span class="text-slate-500">INCIDENT CLOCK:</span>
            <strong class="text-cyan-400 font-bold">${store.incidentClock}</strong>
          </div>

          <div class="flex items-center space-x-2">
            <span class="text-slate-500">AI ENGINE:</span>
            <strong class="text-indigo-400 font-bold">ENONTE-AI/GFL35</strong>
          </div>

          <div class="flex items-center space-x-2">
            <span class="text-slate-500">BLAST RADIUS:</span>
            <strong class="text-rose-400 font-bold">4 NODES</strong>
          </div>
        </div>

      </div>

    </div>
  `;
}
