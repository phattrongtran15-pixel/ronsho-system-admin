import { store } from '../core/store.ts';
import { C4ViewMode } from '../core/models.ts';

export function renderC4LivingMap(): string {
  const currentMode = store.c4Mode;
  const nodes = store.c4Nodes;
  const selectedNode = store.selectedC4Node;

  const modes: { id: C4ViewMode; label: string; desc: string }[] = [
    { id: 'C1_SYSTEM', label: 'C1 — Context', desc: 'Bản đồ hệ thống tổng thể & người vận hành' },
    { id: 'C2_CONTAINER', label: 'C2 — Containers', desc: 'Các kho lưu trữ, MCP server & dịch vụ độc lập' },
    { id: 'C3_COMPONENT', label: 'C3 — Components', desc: 'Các khối module nghiệp vụ & luồng dữ liệu bên trong' },
  ];

  return `
    <div class="space-y-6">

      <!-- Header & Level Drill-down Selector -->
      <div class="bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-indigo-500/30 rounded-2xl p-5 shadow-xl">
        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div class="flex items-center space-x-2">
              <span class="text-xl">🗺️</span>
              <h2 class="text-xl font-black text-white tracking-wide">
                LIKEC4 LIVING ARCHITECTURE MAP — BẢN ĐỒ SỐNG HỆ THỐNG
              </h2>
            </div>
            <p class="text-xs text-slate-400 mt-1">
              Khảo sát kiến trúc dạng mã nguồn DSL (Architecture-as-Code) với khả năng phóng to/thu nhỏ phân cấp C1 ➔ C2 ➔ C3.
            </p>
          </div>

          <!-- Level Buttons -->
          <div class="flex items-center space-x-1.5 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
            ${modes
              .map(
                (m) => `
              <button
                data-c4-mode="${m.id}"
                class="c4-level-btn px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                  currentMode === m.id
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'text-slate-400 hover:text-slate-200'
                }"
                title="${m.desc}"
              >
                ${m.label}
              </button>
            `
              )
              .join('')}
          </div>
        </div>
      </div>

      <!-- Node Grid and Detail Inspector -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">

        <!-- Nodes Display (2 Cols) -->
        <div class="lg:col-span-2 space-y-4">
          <div class="text-xs font-mono uppercase text-slate-400 flex items-center justify-between px-1">
            <span>Elements in ${currentMode}</span>
            <span>Total: <strong>${nodes.length} nodes</strong></span>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            ${nodes
              .map((node) => {
                const isSelected = selectedNode?.id === node.id;
                const kindBadge =
                  node.kind === 'person'
                    ? 'bg-rose-950 text-rose-300 border-rose-800'
                    : node.kind === 'system'
                    ? 'bg-cyan-950 text-cyan-300 border-cyan-800'
                    : node.kind === 'container'
                    ? 'bg-indigo-950 text-indigo-300 border-indigo-800'
                    : 'bg-emerald-950 text-emerald-300 border-emerald-800';

                return `
                <div
                  data-c4-node-id="${node.id}"
                  class="c4-node-card cursor-pointer bg-slate-900 border ${
                    isSelected ? 'border-cyan-400 ring-2 ring-cyan-500/20 shadow-cyan-500/10' : 'border-slate-800'
                  } rounded-2xl p-5 shadow-xl hover:border-slate-700 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div class="flex items-center justify-between mb-2">
                      <span class="text-[10px] font-mono uppercase px-2 py-0.5 rounded border ${kindBadge}">
                        ${node.kind}
                      </span>
                      <span class="text-[11px] font-mono text-emerald-400 font-bold">● ${node.status}</span>
                    </div>
                    <h3 class="text-base font-extrabold text-white mb-1">${node.name}</h3>
                    <div class="text-xs text-slate-400 mb-2 font-mono text-[11px]">${node.technology}</div>
                    <p class="text-xs text-slate-300 leading-relaxed mb-3">${node.description}</p>
                  </div>

                  <div class="pt-3 border-t border-slate-800/80 text-[11px] font-mono text-slate-400 flex items-center justify-between">
                    <span>Relations: <strong class="text-cyan-400">${node.relations.length}</strong></span>
                    <span class="text-cyan-400 hover:underline">Click to Inspect →</span>
                  </div>
                </div>
              `;
              })
              .join('')}
          </div>
        </div>

        <!-- Node Inspector Drawer (1 Col) -->
        <div class="bg-slate-950 border border-slate-800 rounded-2xl p-5 shadow-2xl flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
              <h3 class="text-sm font-bold text-slate-200 uppercase font-mono">🔍 Element Inspector</h3>
              <span class="text-xs font-mono text-cyan-400">${selectedNode ? selectedNode.id : 'None'}</span>
            </div>

            ${
              selectedNode
                ? `
              <div class="space-y-4">
                <div>
                  <div class="text-[10px] font-mono text-slate-500 uppercase">Element Name</div>
                  <div class="text-base font-extrabold text-white">${selectedNode.name}</div>
                </div>

                <div>
                  <div class="text-[10px] font-mono text-slate-500 uppercase">Technology & Scope</div>
                  <div class="text-xs font-mono text-cyan-300 bg-slate-900 px-2.5 py-1 rounded border border-slate-800 mt-1">
                    ${selectedNode.technology}
                  </div>
                </div>

                <div>
                  <div class="text-[10px] font-mono text-slate-500 uppercase">Description & Duty</div>
                  <div class="text-xs text-slate-300 leading-relaxed mt-1">
                    ${selectedNode.description}
                  </div>
                </div>

                <div>
                  <div class="text-[10px] font-mono text-slate-500 uppercase mb-1.5">Outbound Connections</div>
                  ${
                    selectedNode.relations.length > 0
                      ? `
                    <div class="space-y-1.5">
                      ${selectedNode.relations
                        .map(
                          (r) => `
                        <div class="bg-slate-900 border border-slate-800 p-2 rounded-lg text-xs font-mono">
                          <div class="flex items-center justify-between text-cyan-400 font-bold">
                            <span>➔ ${r.targetId}</span>
                            <span class="text-[10px] text-slate-500 font-normal">${r.protocol}</span>
                          </div>
                          <div class="text-slate-300 text-[11px] mt-0.5">${r.label}</div>
                        </div>
                      `
                        )
                        .join('')}
                    </div>
                  `
                      : '<div class="text-xs text-slate-500 italic">Không có kết nối ra ngoài trực tiếp</div>'
                  }
                </div>
              </div>
            `
                : '<div class="text-xs text-slate-500 text-center py-12">Chọn một khối để khảo sát chi tiết</div>'
            }
          </div>

          <!-- LikeC4 DSL Preview Snippet -->
          <div class="mt-6 pt-4 border-t border-slate-800">
            <div class="text-[10px] font-mono uppercase text-slate-500 mb-1">LikeC4 Model Spec (.c4)</div>
            <pre class="bg-slate-900 text-cyan-300 p-3 rounded-lg text-[10px] font-mono overflow-x-auto border border-slate-800">
model {
  ${selectedNode ? selectedNode.id.replace(/-/g, '_') : 'element'} = ${selectedNode ? selectedNode.kind : 'system'} '${selectedNode ? selectedNode.name : 'Unknown'}' {
    technology '${selectedNode ? selectedNode.technology : ''}'
    description '${selectedNode ? selectedNode.description : ''}'
  }
}</pre>
          </div>
        </div>

      </div>

    </div>
  `;
}
