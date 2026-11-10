import { nexvantaStore } from '../core/nexvantaStore.ts';

export function renderNexvantaOverview(): string {
  const store = nexvantaStore;
  const inv = store.filteredInventory;
  const currentFilter = store.inventoryFilter;

  // Helper to render circular SVG gauge
  const renderGauge = (label: string, value: string, sublabel: string, strokeColor: string, percent: number) => {
    const radius = 42;
    const circ = 2 * Math.PI * radius;
    const strokeDash = (percent / 100) * circ;
    const strokeDashoffset = circ - strokeDash;

    return `
      <div class="flex flex-col items-center justify-center p-3 text-center">
        <div class="relative w-28 h-28 flex items-center justify-center mb-2">
          <svg class="w-full h-full -rotate-90 gauge-svg" viewBox="0 0 100 100">
            <!-- Background circle -->
            <circle cx="50" cy="50" r="${radius}" fill="none" stroke="#0a1426" stroke-width="8" />
            <!-- Glowing active circle -->
            <circle
              cx="50" cy="50" r="${radius}"
              fill="none"
              stroke="${strokeColor}"
              stroke-width="8"
              stroke-linecap="round"
              stroke-dasharray="${circ}"
              stroke-dashoffset="${strokeDashoffset}"
              class="drop-shadow-[0_0_8px_${strokeColor}]"
            />
          </svg>
          <div class="absolute inset-0 flex flex-col items-center justify-center">
            <span class="text-lg font-display font-extrabold text-white leading-tight">${value}</span>
            <span class="text-[9px] font-mono text-slate-400 mt-0.5">${sublabel}</span>
          </div>
        </div>
        <span class="text-[10px] font-mono uppercase tracking-wider text-slate-300 font-bold">${label}</span>
      </div>
    `;
  };

  return `
    <div class="space-y-5 font-sans">

      <!-- Header: Title + Traffic Stats + Refresh Button -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <div class="text-[10px] font-mono tracking-widest text-cyan-400 uppercase font-bold">
            OPERATIONAL INTELLIGENCE ENGINE
          </div>
          <h1 class="text-2xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-cyan-300 tracking-wide mt-0.5">
            NOC OVERVIEW
          </h1>
        </div>

        <div class="flex items-center space-x-3">
          <div class="bg-[#081224] border border-[#1b2b4d] px-3.5 py-1.5 rounded-xl text-xs font-mono flex items-center space-x-2">
            <span class="text-slate-400">FLEET TRAFFIC:</span>
            <strong class="text-cyan-300">4.8 Gbps In</strong>
            <span class="text-slate-600">/</span>
            <strong class="text-emerald-300">1.7 Gbps Out</strong>
          </div>

          <button
            id="refresh-noc-btn"
            class="px-3.5 py-1.5 rounded-xl bg-[#0b1730] hover:bg-[#102246] border border-[#233866] text-xs font-mono font-bold text-slate-200 transition-all flex items-center space-x-1.5 shadow-md active:scale-95"
          >
            <span>🔄</span>
            <span>REFRESH NOC</span>
          </button>
        </div>
      </div>

      <!-- 1. Top 6 KPI Cards -->
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        
        <!-- Card 1: Devices Up -->
        <div class="nv-glass-card border-neon-emerald p-3.5 flex flex-col justify-between">
          <div class="flex items-center justify-between mb-1.5">
            <span class="text-[10px] font-mono uppercase text-slate-400 font-bold">DEVICES UP</span>
            <span class="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(16,224,160,0.8)]"></span>
          </div>
          <div class="text-2xl font-display font-extrabold text-emerald-300 glow-emerald font-mono">
            ${store.devicesUp} <span class="text-xs text-slate-500 font-normal">/ ${store.devicesTotal}</span>
          </div>
          <div class="text-[10px] text-slate-400 mt-2 font-mono flex items-center justify-between">
            <span>Uptime: <strong class="text-emerald-400">95.5%</strong></span>
            <span class="text-slate-500">(21/22)</span>
          </div>
        </div>

        <!-- Card 2: Devices Down -->
        <div class="nv-glass-card border-neon-rose p-3.5 flex flex-col justify-between">
          <div class="flex items-center justify-between mb-1.5">
            <span class="text-[10px] font-mono uppercase text-slate-400 font-bold">DEVICES DOWN</span>
            <span class="w-2 h-2 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(251,59,108,0.8)]"></span>
          </div>
          <div class="text-2xl font-display font-extrabold text-rose-400 glow-rose font-mono">
            ${store.devicesDown} <span class="text-xs text-slate-500 font-normal">/ ${store.devicesTotal}</span>
          </div>
          <div class="text-[10px] text-slate-400 mt-2 font-mono">
            1 unreachable
          </div>
        </div>

        <!-- Card 3: Degraded -->
        <div class="nv-glass-card border-neon-amber p-3.5 flex flex-col justify-between">
          <div class="flex items-center justify-between mb-1.5">
            <span class="text-[10px] font-mono uppercase text-slate-400 font-bold">DEGRADED</span>
            <span class="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(245,165,36,0.8)]"></span>
          </div>
          <div class="text-2xl font-display font-extrabold text-amber-300 glow-amber font-mono">
            ${store.degraded} <span class="text-xs text-slate-500 font-normal">/ ${store.devicesTotal}</span>
          </div>
          <div class="text-[10px] text-slate-400 mt-2 font-mono">
            Nominal health
          </div>
        </div>

        <!-- Card 4: Active Alerts -->
        <div class="nv-glass-card border-neon-amber p-3.5 flex flex-col justify-between">
          <div class="flex items-center justify-between mb-1.5">
            <span class="text-[10px] font-mono uppercase text-slate-400 font-bold">ACTIVE ALERTS</span>
            <span class="text-amber-400 text-xs">🔔</span>
          </div>
          <div class="text-2xl font-display font-extrabold text-amber-300 glow-amber font-mono">
            ${store.activeAlerts}
          </div>
          <div class="text-[10px] text-slate-400 mt-2 font-mono">
            8 firing
          </div>
        </div>

        <!-- Card 5: Critical Alerts -->
        <div class="nv-glass-card border-neon-rose p-3.5 flex flex-col justify-between">
          <div class="flex items-center justify-between mb-1.5">
            <span class="text-[10px] font-mono uppercase text-slate-400 font-bold">CRITICAL ALERTS</span>
            <span class="text-rose-400 text-xs">🚨</span>
          </div>
          <div class="text-2xl font-display font-extrabold text-rose-400 glow-rose font-mono">
            ${store.criticalAlerts}
          </div>
          <div class="text-[10px] text-slate-400 mt-2 font-mono">
            Immediate Action
          </div>
        </div>

        <!-- Card 6: Open Incidents -->
        <div class="nv-glass-card border-neon-cyan p-3.5 flex flex-col justify-between cursor-pointer hover:border-cyan-400" id="card-open-incidents">
          <div class="flex items-center justify-between mb-1.5">
            <span class="text-[10px] font-mono uppercase text-slate-400 font-bold">OPEN INCIDENTS</span>
            <span class="text-cyan-400 text-xs">⚡</span>
          </div>
          <div class="text-2xl font-display font-extrabold text-cyan-300 glow-cyan font-mono">
            ${store.unresolvedIncidents.length}
          </div>
          <div class="text-[10px] text-slate-400 mt-2 font-mono">
            17 Dev Hours
          </div>
        </div>

      </div>

      <!-- 2. Circular Gauge Dials + RCA Intelligence Card Row -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-4">
        
        <!-- Left: 4 Circular Dials (7 Cols) -->
        <div class="lg:col-span-7 nv-glass p-4 border border-[#1b2b4d]">
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
            ${renderGauge('GLOBAL SLA', '95.5%', '-3.5% SLI', '#f5a524', 95.5)}
            ${renderGauge('FLEET MTTR', '57.8m', '1.8H MTTA', '#fb3b6c', 70)}
            ${renderGauge('AI RISK INDEX', '0', '22 ANIMA', '#22d3ee', 10)}
            ${renderGauge('FIREHOSE INGEST', `${store.firehoseEps}k`, 'EPS', '#a855f7', 82)}
          </div>
        </div>

        <!-- Right: Status Metrics & AI Root Cause (RCA) Card (5 Cols) -->
        <div class="lg:col-span-5 nv-glass p-4 border border-[#1b2b4d] flex flex-col justify-between">
          
          <!-- Mini metrics row -->
          <div class="grid grid-cols-3 gap-2 pb-3 mb-3 border-b border-[#142038] text-[11px] font-mono">
            <div class="bg-[#070e1c] p-2 rounded-lg border border-[#162544]">
              <div class="text-slate-500 text-[9px] uppercase">Edge & DNS</div>
              <div class="font-bold text-cyan-400">454ms</div>
            </div>
            <div class="bg-[#070e1c] p-2 rounded-lg border border-[#162544]">
              <div class="text-slate-500 text-[9px] uppercase">Zero-Trust</div>
              <div class="font-bold text-emerald-400">76%</div>
            </div>
            <div class="bg-[#070e1c] p-2 rounded-lg border border-[#162544]">
              <div class="text-slate-500 text-[9px] uppercase">Self-Healing</div>
              <div class="font-bold text-emerald-300">ACTIVE</div>
            </div>
          </div>

          <!-- AI RCA Card Body -->
          <div>
            <div class="flex items-center justify-between mb-1.5">
              <span class="text-xs font-display font-black text-white flex items-center space-x-1.5">
                <span>🤖</span>
                <span>AI ROOT CAUSE (RCA)</span>
              </span>
              <span class="text-[9px] font-mono font-bold bg-cyan-950 text-cyan-300 px-2 py-0.5 rounded border border-cyan-800">
                AI RCA 96.4% CONFIDENCE
              </span>
            </div>
            <p class="text-xs text-slate-300 leading-snug mb-3">
              Neural Diagnostic: Isolated <strong class="text-rose-400 font-mono">${store.unresolvedIncidents.length} active events</strong> across database & storage clusters.
            </p>
          </div>

          <!-- Trigger Modal Button -->
          <button
            id="view-ai-diagnostics-btn"
            class="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 via-indigo-600 to-cyan-500 hover:from-cyan-500 hover:to-indigo-500 text-white font-display font-bold text-xs tracking-wide shadow-[0_0_20px_rgba(34,211,238,0.4)] flex items-center justify-center space-x-2 transition-all active:scale-[0.98] cursor-pointer"
          >
            <span>✨</span>
            <span>VIEW AI DIAGNOSTICS & RCA BRIEFING</span>
          </button>

        </div>

      </div>

      <!-- 3. Infrastructure Domains Row (7 Domain Badges) -->
      <div class="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5 text-xs font-mono">
        
        <div class="nv-glass-card p-3 border-[#16284a]">
          <div class="text-[9px] text-emerald-400 uppercase font-bold">INFRA & VMM</div>
          <div class="font-bold text-white text-sm mt-0.5">32 VMs · 3 Hosts</div>
          <div class="text-[10px] text-slate-400 mt-1">18% Avg CPU</div>
        </div>

        <div class="nv-glass-card p-3 border-[#16284a]">
          <div class="text-[9px] text-cyan-400 uppercase font-bold">DATABASE (DPM)</div>
          <div class="font-bold text-white text-sm mt-0.5">2 Clusters</div>
          <div class="text-[10px] text-slate-400 mt-1">0.0s Repl Lag</div>
        </div>

        <div class="nv-glass-card p-3 border-[#16284a]">
          <div class="text-[9px] text-violet-400 uppercase font-bold">SYNTHETICS</div>
          <div class="font-bold text-emerald-400 text-sm mt-0.5">100% Pass</div>
          <div class="text-[10px] text-slate-400 mt-1">654ms Avg RTT</div>
        </div>

        <div class="nv-glass-card p-3 border-[#16284a]">
          <div class="text-[9px] text-cyan-400 uppercase font-bold">KUBERNETES</div>
          <div class="font-bold text-white text-sm mt-0.5">0 Clusters</div>
          <div class="text-[10px] text-slate-400 mt-1">Pods (Not Conn)</div>
        </div>

        <div class="nv-glass-card p-3 border-[#16284a]">
          <div class="text-[9px] text-amber-400 uppercase font-bold">MULTI-CLOUD</div>
          <div class="font-bold text-white text-xs mt-0.5 truncate">AWS Enonte Prod</div>
          <div class="text-[10px] text-slate-400 mt-1">$0/mo</div>
        </div>

        <div class="nv-glass-card p-3 border-[#16284a]">
          <div class="text-[9px] text-indigo-400 uppercase font-bold">APM TRACES</div>
          <div class="font-bold text-white text-sm mt-0.5">0 Services</div>
          <div class="text-[10px] text-slate-400 mt-1">0.0ms P95</div>
        </div>

        <div class="nv-glass-card p-3 border-[#16284a]">
          <div class="text-[9px] text-rose-400 uppercase font-bold">SECURITY / FIM</div>
          <div class="font-bold text-white text-sm mt-0.5">26/100 CIS</div>
          <div class="text-[10px] text-slate-400 mt-1">0 FIM Breaches</div>
        </div>

      </div>

      <!-- 4. Bottom Row: Inventory + Mini Topology Preview -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-4">
        
        <!-- Left: Infrastructure Inventory (7 Cols) -->
        <div class="lg:col-span-7 nv-glass p-4 border border-[#1b2b4d] space-y-3">
          
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-2 border-b border-[#142038]">
            <div class="flex items-center space-x-2">
              <span class="text-cyan-400">🗂️</span>
              <span class="font-display font-bold text-sm text-white">INFRASTRUCTURE INVENTORY</span>
              <span class="text-[10px] font-mono text-slate-400">(${inv.length} nodes)</span>
            </div>

            <!-- Category Filter Pills -->
            <div class="flex items-center space-x-1 bg-[#070e1c] p-1 rounded-lg border border-[#162544] text-[11px] font-mono">
              ${(['All', 'Servers', 'Databases', 'Network'] as const)
                .map(
                  (f) => `
                <button
                  data-inv-filter="${f}"
                  class="inv-filter-btn px-2.5 py-0.5 rounded font-semibold transition-all ${
                    currentFilter === f
                      ? 'bg-cyan-600 text-white font-bold'
                      : 'text-slate-400 hover:text-slate-200'
                  }"
                >
                  ${f}
                </button>
              `
                )
                .join('')}
            </div>
          </div>

          <!-- Inventory Search Input -->
          <div>
            <input
              id="inv-search-input"
              type="text"
              value="${store.searchQuery}"
              placeholder="🔍 Search node by hostname or IP address..."
              class="w-full bg-[#070d1a] border border-[#172544] rounded-lg px-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono"
            />
          </div>

          <!-- Node Rows -->
          <div class="space-y-2 max-h-56 overflow-y-auto pr-1">
            ${inv
              .map((node) => {
                const statusBadge =
                  node.status === 'Critical'
                    ? 'bg-rose-950 text-rose-300 border-rose-600'
                    : node.status === 'Degraded'
                    ? 'bg-amber-950 text-amber-300 border-amber-600'
                    : 'bg-emerald-950 text-emerald-300 border-emerald-600';

                return `
                <div class="bg-[#070d1a] border border-[#172544] hover:border-cyan-500/40 p-2.5 rounded-xl flex items-center justify-between text-xs font-mono transition-all">
                  <div class="flex items-center space-x-3">
                    <span class="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 text-xs">
                      ${node.category === 'Databases' ? '🗄️' : node.category === 'Network' ? '🌐' : '🖥️'}
                    </span>
                    <div>
                      <div class="font-bold text-white flex items-center space-x-2">
                        <span>${node.name}</span>
                        ${node.alertsCount > 0 ? `<span class="px-1.5 py-0.2 rounded bg-rose-950 text-rose-300 text-[9px] border border-rose-800">● ${node.alertsCount}</span>` : ''}
                      </div>
                      <div class="text-[10px] text-slate-500">${node.ip} · ${node.category}</div>
                    </div>
                  </div>

                  <div class="flex items-center space-x-4">
                    <div class="text-right text-[11px]">
                      <div>CPU <strong class="text-cyan-400">${node.cpu}%</strong></div>
                      <div>RAM <strong class="text-emerald-400">${node.ram}%</strong></div>
                    </div>
                    <span class="px-2 py-0.5 rounded text-[10px] font-bold border ${statusBadge}">
                      ${node.status}
                    </span>
                  </div>
                </div>
              `;
              })
              .join('')}
          </div>

        </div>

        <!-- Right: Mini Topology Map Preview (5 Cols) -->
        <div class="lg:col-span-5 nv-glass p-4 border border-[#1b2b4d] flex flex-col justify-between">
          <div class="flex items-center justify-between pb-2 border-b border-[#142038]">
            <div class="flex items-center space-x-2">
              <span class="text-cyan-400">🕸️</span>
              <span class="font-display font-bold text-sm text-white">INFRASTRUCTURE TOPO-MAP</span>
            </div>
            <button
              id="goto-topology-btn"
              class="text-[10px] font-mono text-cyan-400 hover:text-cyan-300 uppercase font-bold tracking-wider hover:underline"
            >
              FULLSCREEN SPATIAL MAP ↗
            </button>
          </div>

          <!-- Topology Graphic Preview Canvas -->
          <div class="relative w-full h-52 bg-[#050914] rounded-xl border border-[#132038] overflow-hidden flex items-center justify-center my-2">
            <!-- Grid Lines -->
            <div class="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-40"></div>

            <!-- SVG Tree Connection Preview -->
            <svg class="w-full h-full" viewBox="0 0 300 180">
              <!-- Tier 1 to 2 -->
              <line x1="150" y1="20" x2="150" y2="55" stroke="#22d3ee" stroke-width="1.5" stroke-dasharray="3,3" opacity="0.8" />
              <!-- Tier 2 to Tier 3 branches -->
              <line x1="150" y1="55" x2="60" y2="100" stroke="#10e0a0" stroke-width="1.5" opacity="0.7" />
              <line x1="150" y1="55" x2="150" y2="100" stroke="#10e0a0" stroke-width="1.5" opacity="0.7" />
              <line x1="150" y1="55" x2="240" y2="100" stroke="#10e0a0" stroke-width="1.5" opacity="0.7" />
              <!-- Tier 3 to Tier 4 databases -->
              <line x1="60" y1="100" x2="40" y2="150" stroke="#f5a524" stroke-width="1" opacity="0.6" />
              <line x1="60" y1="100" x2="110" y2="150" stroke="#f5a524" stroke-width="1" opacity="0.6" />
              <line x1="150" y1="100" x2="150" y2="150" stroke="#fb3b6c" stroke-width="1.5" stroke-dasharray="2,2" opacity="0.9" />
              <line x1="240" y1="100" x2="200" y2="150" stroke="#f5a524" stroke-width="1" opacity="0.6" />
              <line x1="240" y1="100" x2="260" y2="150" stroke="#f5a524" stroke-width="1" opacity="0.6" />

              <!-- Nodes -->
              <!-- Firewall -->
              <rect x="130" y="10" width="40" height="18" rx="4" fill="#0b1730" stroke="#fb3b6c" stroke-width="1.5" />
              <text x="150" y="23" font-size="7" fill="#fff" text-anchor="middle" font-family="monospace">FW-01</text>
              <!-- Load Balancer -->
              <rect x="130" y="46" width="40" height="18" rx="4" fill="#0b1730" stroke="#22d3ee" stroke-width="1.5" />
              <text x="150" y="59" font-size="7" fill="#fff" text-anchor="middle" font-family="monospace">LB-01</text>
              <!-- Web Servers -->
              <rect x="40" y="91" width="40" height="18" rx="4" fill="#0b1730" stroke="#10e0a0" stroke-width="1.5" />
              <text x="60" y="104" font-size="7" fill="#fff" text-anchor="middle" font-family="monospace">WEB-1</text>
              <rect x="130" y="91" width="40" height="18" rx="4" fill="#0b1730" stroke="#10e0a0" stroke-width="1.5" />
              <text x="150" y="104" font-size="7" fill="#fff" text-anchor="middle" font-family="monospace">WEB-2</text>
              <rect x="220" y="91" width="40" height="18" rx="4" fill="#0b1730" stroke="#10e0a0" stroke-width="1.5" />
              <text x="240" y="104" font-size="7" fill="#fff" text-anchor="middle" font-family="monospace">WEB-3</text>
              <!-- Databases -->
              <rect x="20" y="141" width="40" height="18" rx="4" fill="#0b1730" stroke="#f5a524" stroke-width="1" />
              <text x="40" y="154" font-size="6" fill="#fff" text-anchor="middle" font-family="monospace">SQL-01</text>
              <rect x="90" y="141" width="40" height="18" rx="4" fill="#0b1730" stroke="#f5a524" stroke-width="1" />
              <text x="110" y="154" font-size="6" fill="#fff" text-anchor="middle" font-family="monospace">SQL-02</text>
              <rect x="130" y="141" width="40" height="18" rx="4" fill="#2d0f19" stroke="#fb3b6c" stroke-width="1.5" />
              <text x="150" y="154" font-size="6" fill="#fb3b6c" text-anchor="middle" font-family="monospace" font-weight="bold">REPLICA</text>
              <rect x="180" y="141" width="40" height="18" rx="4" fill="#0b1730" stroke="#f5a524" stroke-width="1" />
              <text x="200" y="154" font-size="6" fill="#fff" text-anchor="middle" font-family="monospace">SQL-03</text>
              <rect x="240" y="141" width="40" height="18" rx="4" fill="#0b1730" stroke="#f5a524" stroke-width="1" />
              <text x="260" y="154" font-size="6" fill="#fff" text-anchor="middle" font-family="monospace">SQL-04</text>
            </svg>
          </div>

          <div class="text-[11px] font-mono text-slate-400 flex items-center justify-between">
            <span>Mesh: <strong>22 Active Nodes</strong></span>
            <span class="text-emerald-400 font-bold">● Synchronized</span>
          </div>

        </div>

      </div>

    </div>
  `;
}
