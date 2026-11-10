import { nexvantaStore } from '../core/nexvantaStore.ts';

export function renderNexvantaTopology(): string {
  const store = nexvantaStore;
  const is3D = store.topologyMode === '3d';

  return `
    <div class="space-y-4 font-sans h-full flex flex-col">

      <!-- Top Topology Controls Bar (image_3.png style) -->
      <div class="bg-[#070d1a] border border-[#1b2b4d] rounded-2xl p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3 shadow-xl">
        <div class="flex items-center space-x-3">
          <div class="flex items-center space-x-2">
            <span class="text-xl">🕸️</span>
            <h2 class="font-display font-black text-lg text-white tracking-wide">
              3D WEBGL TOPOLOGY MAP
            </h2>
            <span class="text-xs font-mono font-bold bg-cyan-950 text-cyan-300 border border-cyan-800 px-2 py-0.5 rounded-full">
              22 NODES
            </span>
          </div>

          <!-- Topology Mode Toggle (3D vs 2D) -->
          <div class="flex items-center bg-[#050914] p-1 rounded-xl border border-slate-800 text-xs font-mono">
            <button
              id="topo-mode-3d"
              class="px-3 py-1 rounded-lg font-bold transition-all ${
                is3D
                  ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30'
                  : 'text-slate-400 hover:text-slate-200'
              }"
            >
              Reset View (30° Isometric)
            </button>
            <button
              id="topo-mode-2d"
              class="px-3 py-1 rounded-lg font-bold transition-all ${
                !is3D
                  ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30'
                  : 'text-slate-400 hover:text-slate-200'
              }"
            >
              Top-Down 2D
            </button>
          </div>
        </div>

        <!-- Filter Sub-Tabs -->
        <div class="flex items-center space-x-2 text-xs font-mono">
          <span class="px-2.5 py-1 rounded-lg bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 font-bold">
            Infrastructure (22)
          </span>
          <span class="px-2.5 py-1 rounded-lg bg-[#070e1c] border border-slate-800 text-slate-400 hover:text-slate-200 cursor-pointer">
            DPM Databases (8)
          </span>
          <span class="px-2.5 py-1 rounded-lg bg-[#070e1c] border border-slate-800 text-slate-400 hover:text-slate-200 cursor-pointer">
            Synthetics (4)
          </span>
        </div>
      </div>

      <!-- Main Canvas Stage -->
      <div class="relative w-full flex-1 min-h-[640px] bg-[#03060d] border border-[#142038] rounded-2xl overflow-hidden shadow-2xl flex items-center justify-center p-6">
        
        <!-- Perspective 3D Grid Overlay -->
        <div class="absolute inset-0 bg-[linear-gradient(to_right,#0e1728_1px,transparent_1px),linear-gradient(to_bottom,#0e1728_1px,transparent_1px)] bg-[size:40px_40px] ${
          is3D ? '[transform:perspective(800px)_rotateX(25deg)] origin-bottom' : ''
        } opacity-60"></div>

        <!-- Central Interactive Visual Topology Mesh -->
        <div class="relative z-10 w-full max-w-5xl transition-all duration-500 ${
          is3D ? '[transform:perspective(900px)_rotateX(15deg)]' : ''
        }">
          
          <!-- SVG Connections Overlay -->
          <svg class="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1000 550">
            <!-- Glow Filters -->
            <defs>
              <filter id="glow-cyan" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
              <filter id="glow-emerald" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>

            <!-- Tier 1 to 2 -->
            <line x1="500" y1="45" x2="500" y2="105" stroke="#22d3ee" stroke-width="2" filter="url(#glow-cyan)" />
            
            <!-- Tier 2 to Tier 3 (Firewall to Web/Mail/App/Windows) -->
            <path d="M 500 135 L 140 200" stroke="#38bdf8" stroke-width="1.5" stroke-dasharray="3,3" opacity="0.8" />
            <path d="M 500 135 L 260 200" stroke="#fb3b6c" stroke-width="2" opacity="0.9" />
            <path d="M 500 135 L 380 200" stroke="#10e0a0" stroke-width="1.5" opacity="0.8" filter="url(#glow-emerald)" />
            <path d="M 500 135 L 500 200" stroke="#10e0a0" stroke-width="1.5" opacity="0.8" filter="url(#glow-emerald)" />
            <path d="M 500 135 L 620 200" stroke="#10e0a0" stroke-width="1.5" opacity="0.8" filter="url(#glow-emerald)" />
            <path d="M 500 135 L 740 200" stroke="#fb3b6c" stroke-width="2" opacity="0.9" />
            <path d="M 500 135 L 860 200" stroke="#38bdf8" stroke-width="1.5" opacity="0.8" />

            <!-- Tier 3 to Tier 4 (Web Servers down to Database Cluster) -->
            <path d="M 380 235 L 200 320" stroke="#f5a524" stroke-width="1.2" opacity="0.7" />
            <path d="M 380 235 L 350 320" stroke="#f5a524" stroke-width="1.2" opacity="0.7" />
            <path d="M 500 235 L 500 320" stroke="#fb3b6c" stroke-width="1.8" opacity="0.9" />
            <path d="M 500 235 L 650 320" stroke="#f5a524" stroke-width="1.2" opacity="0.7" />
            <path d="M 620 235 L 800 320" stroke="#f5a524" stroke-width="1.2" opacity="0.7" />

            <!-- Tier 4 to Tier 5 (Databases to Replicas & Shared Storage) -->
            <path d="M 500 355 L 420 440" stroke="#22d3ee" stroke-width="1.5" opacity="0.8" />
            <path d="M 500 355 L 580 440" stroke="#fb3b6c" stroke-width="2" stroke-dasharray="4,2" opacity="1" />
            <path d="M 800 355 L 800 440" stroke="#10e0a0" stroke-width="1.2" opacity="0.8" />
          </svg>

          <!-- TIER 1: FIREWALL -->
          <div class="flex justify-center mb-10">
            <div class="bg-[#071022] border-2 border-[#fb3b6c] text-white px-5 py-2.5 rounded-xl shadow-[0_0_20px_rgba(251,59,108,0.5)] flex flex-col items-center">
              <span class="text-[9px] font-mono text-[#fb3b6c] uppercase font-bold tracking-wider">FIREWALL</span>
              <strong class="font-display font-extrabold text-xs">Main-Firewall</strong>
              <span class="text-[10px] font-mono text-slate-400 mt-0.5">18% CPU</span>
            </div>
          </div>

          <!-- TIER 2: LOAD BALANCER -->
          <div class="flex justify-center mb-12">
            <div class="bg-[#071022] border-2 border-[#22d3ee] text-white px-5 py-2.5 rounded-xl shadow-[0_0_20px_rgba(34,211,238,0.5)] flex flex-col items-center">
              <span class="text-[9px] font-mono text-[#22d3ee] uppercase font-bold tracking-wider">LOAD BALANCER</span>
              <strong class="font-display font-extrabold text-xs">Load-Balancer-1</strong>
              <span class="text-[10px] font-mono text-slate-400 mt-0.5">22% CPU · 4.8 Gbps</span>
            </div>
          </div>

          <!-- TIER 3: WEB / MAIL / APP / CONTAINER FLEET -->
          <div class="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 mb-14 text-center">
            
            <div class="bg-[#071022] border border-[#38bdf8] p-2.5 rounded-xl shadow-[0_0_12px_rgba(56,189,248,0.2)]">
              <div class="text-[8px] font-mono text-slate-400 uppercase font-bold">MAIL SERVER</div>
              <div class="text-xs font-bold text-white mt-0.5 truncate">EMAIL-SERVER-1</div>
              <div class="text-[9px] font-mono text-cyan-300 mt-0.5">15% CPU</div>
            </div>

            <div class="bg-[#1f0910] border-2 border-[#fb3b6c] p-2.5 rounded-xl shadow-[0_0_15px_rgba(251,59,108,0.4)] animate-pulse">
              <div class="text-[8px] font-mono text-rose-400 uppercase font-bold">MAIL SERVER [!]</div>
              <div class="text-xs font-bold text-white mt-0.5 truncate">EMAIL-SERVER-2</div>
              <div class="text-[9px] font-mono text-rose-300 mt-0.5">Agent Offline</div>
            </div>

            <div class="bg-[#071022] border-2 border-[#10e0a0] p-2.5 rounded-xl shadow-[0_0_15px_rgba(16,224,160,0.3)]">
              <div class="text-[8px] font-mono text-emerald-400 uppercase font-bold">WEB SERVER</div>
              <div class="text-xs font-bold text-white mt-0.5 truncate">WEBSERVER-1</div>
              <div class="text-[9px] font-mono text-emerald-300 mt-0.5">34% CPU</div>
            </div>

            <div class="bg-[#071022] border-2 border-[#10e0a0] p-2.5 rounded-xl shadow-[0_0_15px_rgba(16,224,160,0.3)]">
              <div class="text-[8px] font-mono text-emerald-400 uppercase font-bold">WEB SERVER</div>
              <div class="text-xs font-bold text-white mt-0.5 truncate">WEBSERVER-2</div>
              <div class="text-[9px] font-mono text-emerald-300 mt-0.5">28% CPU</div>
            </div>

            <div class="bg-[#071022] border-2 border-[#10e0a0] p-2.5 rounded-xl shadow-[0_0_15px_rgba(16,224,160,0.3)]">
              <div class="text-[8px] font-mono text-emerald-400 uppercase font-bold">WEB SERVER</div>
              <div class="text-xs font-bold text-white mt-0.5 truncate">Webserver-3</div>
              <div class="text-[9px] font-mono text-emerald-300 mt-0.5">19% CPU</div>
            </div>

            <div class="bg-[#1f0910] border-2 border-[#fb3b6c] p-2.5 rounded-xl shadow-[0_0_15px_rgba(251,59,108,0.4)] animate-pulse">
              <div class="text-[8px] font-mono text-rose-400 uppercase font-bold">CONTAINER HOST [!]</div>
              <div class="text-xs font-bold text-white mt-0.5 truncate">DOCKERHOST</div>
              <div class="text-[9px] font-mono text-rose-300 mt-0.5">98% Disk</div>
            </div>

            <div class="bg-[#071022] border border-[#a855f7] p-2.5 rounded-xl shadow-[0_0_12px_rgba(168,85,247,0.2)]">
              <div class="text-[8px] font-mono text-purple-400 uppercase font-bold">APP SERVER</div>
              <div class="text-xs font-bold text-white mt-0.5 truncate">JAVA-APP-SERVER</div>
              <div class="text-[9px] font-mono text-purple-300 mt-0.5">26% CPU</div>
            </div>

          </div>

          <!-- TIER 4: DATABASE CLUSTER -->
          <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-12 text-center">
            
            <div class="bg-[#181005] border border-[#f5a524] p-2.5 rounded-xl shadow-[0_0_12px_rgba(245,165,36,0.3)]">
              <div class="text-[8px] font-mono text-amber-400 uppercase font-bold">MYSQL DB</div>
              <div class="text-xs font-bold text-white mt-0.5">Msql-Server-3</div>
              <div class="text-[9px] font-mono text-amber-300 mt-0.5">76% RAM</div>
            </div>

            <div class="bg-[#071022] border border-[#38bdf8] p-2.5 rounded-xl">
              <div class="text-[8px] font-mono text-slate-400 uppercase font-bold">MSSQL DB</div>
              <div class="text-xs font-bold text-white mt-0.5">MSSQL-172</div>
              <div class="text-[9px] font-mono text-cyan-300 mt-0.5">84% RAM</div>
            </div>

            <div class="bg-[#1f0910] border-2 border-[#fb3b6c] p-2.5 rounded-xl shadow-[0_0_15px_rgba(251,59,108,0.4)] animate-pulse">
              <div class="text-[8px] font-mono text-rose-400 uppercase font-bold">MSSQL DB [!]</div>
              <div class="text-xs font-bold text-white mt-0.5">MSSQL-176</div>
              <div class="text-[9px] font-mono text-rose-300 mt-0.5">88.5% Disk</div>
            </div>

            <div class="bg-[#181005] border border-[#f5a524] p-2.5 rounded-xl shadow-[0_0_12px_rgba(245,165,36,0.3)]">
              <div class="text-[8px] font-mono text-amber-400 uppercase font-bold">MSSQL DB</div>
              <div class="text-xs font-bold text-white mt-0.5">MSSQL-55</div>
              <div class="text-[9px] font-mono text-amber-300 mt-0.5">78.7% RAM</div>
            </div>

            <div class="bg-[#071022] border border-[#38bdf8] p-2.5 rounded-xl">
              <div class="text-[8px] font-mono text-slate-400 uppercase font-bold">MYSQL DB</div>
              <div class="text-xs font-bold text-white mt-0.5">MYSQL-SERVER5</div>
              <div class="text-[9px] font-mono text-cyan-300 mt-0.5">19% CPU</div>
            </div>

          </div>

          <!-- TIER 5: REPLICAS & STORAGE -->
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto text-center">
            
            <div class="bg-[#071022] border border-[#38bdf8] p-2.5 rounded-xl">
              <div class="text-[8px] font-mono text-cyan-400 uppercase font-bold">SHARED STORAGE</div>
              <div class="text-xs font-bold text-white mt-0.5">WEBSERVER-SHARE</div>
              <div class="text-[9px] font-mono text-slate-400 mt-0.5">40.1% Disk</div>
            </div>

            <div class="bg-[#240810] border-2 border-[#fb3b6c] p-2.5 rounded-xl shadow-[0_0_20px_rgba(251,59,108,0.5)] animate-pulse">
              <div class="text-[8px] font-mono text-rose-400 uppercase font-bold">DB REPLICA [FAIL]</div>
              <div class="text-xs font-bold text-white mt-0.5">MSSQL-175-REPLICA</div>
              <div class="text-[9px] font-mono text-rose-300 font-bold mt-0.5">Service Stopped</div>
            </div>

            <div class="bg-[#071022] border border-[#10e0a0] p-2.5 rounded-xl">
              <div class="text-[8px] font-mono text-emerald-400 uppercase font-bold">DB REPLICA</div>
              <div class="text-xs font-bold text-white mt-0.5">MSSQL-REPLICA-50</div>
              <div class="text-[9px] font-mono text-emerald-300 mt-0.5">14% CPU · Synced</div>
            </div>

          </div>

        </div>

      </div>

    </div>
  `;
}
