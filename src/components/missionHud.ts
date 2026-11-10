import { store } from '../core/store.ts';

export function renderMissionHud(): string {
  const agents = store.agents;
  const logs = store.logs;
  const circuitArmed = store.circuitBreakerArmed;

  return `
    <div class="space-y-6">

      <!-- Header & Alert Banner -->
      <div class="bg-gradient-to-r from-slate-950 via-slate-900 to-cyan-950/60 border border-cyan-500/30 rounded-2xl p-5 shadow-2xl relative overflow-hidden">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div class="flex items-center space-x-2">
              <span class="text-2xl">🛸</span>
              <h2 class="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-emerald-300 to-indigo-300">
                1. MISSION HUD — A2A FLEET OPERATIONS
              </h2>
            </div>
            <p class="text-xs text-slate-400 mt-1">
              Trung tâm giám sát trạng thái 4 tác tử cốt lõi, hạn mức token và cầu dao chống cháy Quota.
            </p>
          </div>
          
          <!-- Master Circuit Breaker Status Banner -->
          <div class="flex items-center space-x-3 bg-slate-950/90 border border-slate-800 p-2.5 rounded-xl">
            <div>
              <div class="text-[10px] font-mono uppercase text-slate-500">System Circuit Breaker</div>
              <div class="text-xs font-mono font-black ${circuitArmed ? 'text-emerald-400' : 'text-rose-400 animate-pulse'}">
                ${circuitArmed ? 'ARMED 100% [ZERO-SILENT-HALT]' : '🚨 TRIPPED [MANUAL OVERRIDE]'}
              </div>
            </div>
            <button
              id="hud-cb-toggle"
              class="px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all shadow-md ${
                circuitArmed
                  ? 'bg-rose-950 hover:bg-rose-900 text-rose-300 border border-rose-700/60'
                  : 'bg-emerald-950 hover:bg-emerald-900 text-emerald-300 border border-emerald-700/60'
              }"
            >
              ${circuitArmed ? 'Trip Breaker' : 'Arm Breaker'}
            </button>
          </div>
        </div>
      </div>

      <!-- Fleet Grid (4 Agents) -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        ${agents
          .map((agent) => {
            const statusColor =
              agent.status === 'ACTIVE'
                ? 'bg-emerald-950 text-emerald-300 border-emerald-600'
                : agent.status === 'WORKING'
                ? 'bg-cyan-950 text-cyan-300 border-cyan-600 animate-pulse'
                : agent.status === 'STANDBY'
                ? 'bg-slate-800 text-slate-300 border-slate-600'
                : 'bg-rose-950 text-rose-300 border-rose-600';

            return `
            <div class="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col justify-between hover:border-cyan-500/40 transition-all">
              <div>
                <div class="flex items-center justify-between mb-3">
                  <span class="text-xs font-mono font-bold text-slate-400">${agent.id}</span>
                  <span class="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${statusColor}">
                    ${agent.status}
                  </span>
                </div>
                <h3 class="text-base font-extrabold text-white mb-0.5">${agent.name}</h3>
                <div class="text-xs text-cyan-400 font-semibold mb-2">${agent.role}</div>
                <div class="text-[11px] text-slate-400 font-mono mb-4 bg-slate-950 p-2 rounded-lg border border-slate-800/80">
                  <span class="text-slate-500">Engine:</span> ${agent.engine}
                </div>
              </div>

              <div class="space-y-2 pt-3 border-t border-slate-800 text-xs font-mono">
                <div class="flex items-center justify-between">
                  <span class="text-slate-400">Quota Spent:</span>
                  <span class="text-emerald-400 font-bold">${agent.quotaSpent}</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-slate-400">Quota Cap:</span>
                  <span class="text-slate-300">${agent.quotaLimit}</span>
                </div>
                <div class="flex items-center justify-between text-[11px] pt-1">
                  <span class="text-slate-500">Last Handoff:</span>
                  <span class="text-cyan-300 font-bold">${agent.lastHandoff}</span>
                </div>
              </div>
            </div>
          `;
          })
          .join('')}
      </div>

      <!-- Live Telemetry Log Terminal -->
      <div class="bg-slate-950 border border-slate-800 rounded-2xl p-5 shadow-2xl font-mono text-xs">
        <div class="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
          <div class="flex items-center space-x-2">
            <span class="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></span>
            <span class="font-bold text-slate-200">A2A TELEMETRY LOG STREAM (FIFO 50 BUFFER)</span>
          </div>
          <span class="text-[11px] text-slate-500">Listening on internal message bus</span>
        </div>

        <div class="space-y-1.5 max-h-64 overflow-y-auto pr-2">
          ${logs
            .map((log) => {
              const levelColor =
                log.level === 'SUCCESS'
                  ? 'text-emerald-400'
                  : log.level === 'CRITICAL'
                  ? 'text-rose-400 font-bold'
                  : log.level === 'A2A'
                  ? 'text-cyan-400'
                  : 'text-slate-300';

              return `
              <div class="flex items-start space-x-3 py-0.5 hover:bg-slate-900/60 px-2 rounded">
                <span class="text-slate-500 whitespace-nowrap">[${log.timestamp}]</span>
                <span class="font-bold ${levelColor} whitespace-nowrap min-w-[65px]">[${log.level}]</span>
                <span class="text-indigo-400 font-semibold whitespace-nowrap">[${log.source}]</span>
                <span class="text-slate-300 flex-1">${log.message}</span>
              </div>
            `;
            })
            .join('')}
        </div>
      </div>

    </div>
  `;
}
