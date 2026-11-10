import { nexvantaStore } from '../core/nexvantaStore.ts';

export function renderNexvantaSidebar(): string {
  const store = nexvantaStore;
  const activeView = store.activeView;

  const coreNav = [
    { id: 'noc-overview', label: 'NOC Overview', icon: '💻', badge: '' },
    { id: 'incidents', label: 'Incidents', icon: '🚨', badge: `${store.unresolvedIncidents.length}`, badgeColor: 'bg-rose-950 text-rose-300 border-rose-600' },
    { id: 'alerts', label: 'Alerts', icon: '🔔', badge: `${store.activeAlerts}`, badgeColor: 'bg-amber-950 text-amber-300 border-amber-600' },
    { id: 'ai-assistant', label: 'AI Assistant', icon: '🤖', badge: '' },
    { id: 'database', label: 'Database (DPM)', icon: '🗄️', badge: '' },
    { id: 'synthetics', label: 'Synthetic Journeys', icon: '⚡', badge: '' },
  ];

  const fleetNav = [
    { id: 'server-fleet', label: 'Server Fleet', icon: '🖥️' },
    { id: 'virtualization', label: 'Virtualization (VMM)', icon: '📦' },
    { id: 'network-fleet', label: 'Network Fleet', icon: '🌐' },
    { id: 'kubernetes', label: 'Kubernetes', icon: '☸️' },
    { id: 'cloud-hybrid', label: 'Cloud & Hybrid', icon: '☁️' },
    { id: 'monitoring-agents', label: 'Monitoring Agents', icon: '📡' },
  ];

  const observabilityNav = [
    { id: 'topology', label: 'Topology (3D WebGL)', icon: '🕸️', isHighlight: true },
    { id: 'security-audit', label: 'Security Audit', icon: '🛡️' },
    { id: 'maintenance-windows', label: 'Maintenance Windows', icon: '🔧' },
    { id: 'log-search', label: 'Log Search', icon: '📜' },
  ];

  return `
    <aside class="w-64 bg-[#050813]/90 border-r border-[#142038] p-4 flex flex-col justify-between shrink-0 font-sans backdrop-blur-md">
      
      <!-- Top Section -->
      <div class="space-y-5">
        
        <!-- Brand Block -->
        <div class="flex items-center space-x-3 pb-3 border-b border-[#142038]">
          <div class="w-9 h-9 rounded-lg bg-gradient-to-tr from-cyan-500 via-indigo-600 to-emerald-400 flex items-center justify-center font-display font-black text-xl text-white shadow-[0_0_15px_rgba(34,211,238,0.3)] border border-cyan-400/40">
            N
          </div>
          <div>
            <div class="font-display font-extrabold text-sm tracking-wide text-white flex items-center space-x-1.5">
              <span>NEXVANTA</span>
              <span class="text-[10px] text-cyan-400 font-mono font-bold">NIMS</span>
            </div>
            <div class="text-[9px] text-slate-400 font-mono tracking-tight uppercase leading-tight">
              Intelligent Visibility, Proactive Control
            </div>
          </div>
        </div>

        <!-- Global SLA & Live Telemetry Pill -->
        <div class="space-y-2">
          <div class="flex items-center justify-between px-3 py-1.5 rounded-xl bg-[#081326] border border-cyan-500/30 text-xs font-mono shadow-[0_0_12px_rgba(34,211,238,0.1)]">
            <span class="text-slate-400">GLOBAL SLA</span>
            <strong class="text-cyan-300 font-bold glow-cyan">${store.globalSla}%</strong>
          </div>

          <div class="bg-[#070e1c] border border-slate-800 p-2.5 rounded-xl text-[11px] font-mono space-y-1">
            <div class="flex items-center justify-between text-slate-400">
              <span class="flex items-center space-x-1 text-cyan-400">
                <span class="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping"></span>
                <span>TELEMETRY</span>
              </span>
              <span class="text-slate-500">${store.clockTime}</span>
            </div>
            <div class="flex items-center justify-between text-slate-300">
              <span>FLEET LOAD</span>
              <span>CPU <strong class="text-cyan-400">38%</strong> · RAM <strong class="text-emerald-400">64%</strong></span>
            </div>
          </div>
        </div>

        <!-- Section 1: CORE OPERATIONS -->
        <div>
          <div class="text-[10px] font-mono uppercase tracking-wider text-slate-500 mb-2 px-1">
            Core Operations
          </div>
          <nav class="space-y-0.5">
            ${coreNav
              .map(
                (item) => `
              <button
                data-sidebar-view="${item.id}"
                class="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition-all ${
                  activeView === item.id
                    ? 'bg-cyan-950/80 text-cyan-300 border border-cyan-500/40 shadow-[0_0_12px_rgba(34,211,238,0.2)]'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                }"
              >
                <span class="flex items-center space-x-2.5">
                  <span class="text-sm">${item.icon}</span>
                  <span>${item.label}</span>
                </span>
                ${
                  item.badge
                    ? `<span class="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded-full border ${item.badgeColor}">${item.badge}</span>`
                    : ''
                }
              </button>
            `
              )
              .join('')}
          </nav>
        </div>

        <!-- Section 2: INFRASTRUCTURE FLEET -->
        <div>
          <div class="text-[10px] font-mono uppercase tracking-wider text-slate-500 mb-2 px-1">
            Infrastructure Fleet
          </div>
          <nav class="space-y-0.5">
            ${fleetNav
              .map(
                (item) => `
              <button
                data-sidebar-view="${item.id}"
                class="w-full text-left px-3 py-1.5 rounded-xl text-xs font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-900/50 flex items-center space-x-2.5 transition-colors"
              >
                <span class="text-sm">${item.icon}</span>
                <span>${item.label}</span>
              </button>
            `
              )
              .join('')}
          </nav>
        </div>

        <!-- Section 3: OBSERVABILITY & TELEMETRY -->
        <div>
          <div class="text-[10px] font-mono uppercase tracking-wider text-slate-500 mb-2 px-1">
            Observability & Telemetry
          </div>
          <nav class="space-y-0.5">
            ${observabilityNav
              .map(
                (item) => `
              <button
                data-sidebar-view="${item.id}"
                class="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition-all ${
                  activeView === item.id
                    ? 'bg-indigo-950/80 text-indigo-300 border border-indigo-500/40 shadow-[0_0_12px_rgba(168,85,247,0.2)]'
                    : item.isHighlight
                    ? 'text-cyan-400 hover:bg-slate-900/60 font-bold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
                }"
              >
                <span class="flex items-center space-x-2.5">
                  <span class="text-sm">${item.icon}</span>
                  <span>${item.label}</span>
                </span>
                ${item.isHighlight ? '<span class="text-[9px] font-mono uppercase bg-cyan-950 text-cyan-300 px-1.5 py-0.5 rounded border border-cyan-800">HOT</span>' : ''}
              </button>
            `
              )
              .join('')}
          </nav>
        </div>

      </div>

      <!-- Bottom Firehose Badge -->
      <div class="pt-4 border-t border-[#142038]">
        <div class="bg-[#081224] border border-[#1b2b4d] rounded-xl p-3 flex items-center justify-between text-xs font-mono">
          <div class="flex items-center space-x-2">
            <span class="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping"></span>
            <span class="text-slate-400 font-bold">FIREHOSE</span>
          </div>
          <strong class="text-amber-300 font-mono font-bold">${store.firehoseEps}k EPS</strong>
        </div>
      </div>

    </aside>
  `;
}
