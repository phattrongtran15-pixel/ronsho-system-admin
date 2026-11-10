import { store } from '../core/store.ts';
import { Department, Project } from '../core/models.ts';

export function renderNexusOperations(): string {
  const kpis = store.kpis;
  const projects = store.filteredProjects;
  const projectCounts = store.projectCounts;
  const employees = store.filteredEmployees;
  const totalHours = store.totalHoursLogged;
  const currentDept = store.selectedDepartment;
  const timeRange = store.timeRange;
  const performance = store.performance;

  const departments: (Department | 'All')[] = ['All', 'Manufacturing', 'Engineering', 'Logistics'];

  const pendingProjects = projects.filter((p) => p.status === 'Pending');
  const inProgressProjects = projects.filter((p) => p.status === 'In Progress');
  const completedProjects = projects.filter((p) => p.status === 'Completed');

  const formatValue = (val: number, format: string) => {
    if (format === 'currency') return `$${val.toLocaleString()}`;
    if (format === 'percent') return `${val}%`;
    return val.toLocaleString();
  };

  const renderKanbanCard = (p: Project) => {
    const priorityColor =
      p.priority.startsWith('P0')
        ? 'bg-rose-950 text-rose-300 border-rose-700/50'
        : p.priority.startsWith('P1')
        ? 'bg-amber-950 text-amber-300 border-amber-700/50'
        : 'bg-slate-800 text-slate-300 border-slate-700';

    return `
      <div class="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-lg hover:border-slate-700 transition-all">
        <div class="flex items-center justify-between mb-2">
          <span class="text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${priorityColor}">
            ${p.priority}
          </span>
          <span class="text-xs font-mono text-slate-400 font-bold">${p.id}</span>
        </div>
        <h4 class="text-sm font-bold text-white mb-1 line-clamp-1">${p.name}</h4>
        <div class="text-xs text-slate-400 mb-3 flex items-center justify-between">
          <span>Client: <strong class="text-slate-300">${p.client}</strong></span>
          <span class="font-mono text-emerald-400">${p.budget}</span>
        </div>
        
        <!-- Progress Bar -->
        <div class="w-full bg-slate-950 rounded-full h-2 mb-3 overflow-hidden border border-slate-800">
          <div class="bg-gradient-to-r from-cyan-500 to-emerald-400 h-2 rounded-full transition-all duration-300" style="width: ${p.progress}%"></div>
        </div>
        <div class="flex items-center justify-between text-[11px] text-slate-400 mb-3">
          <span>Lead: ${p.lead}</span>
          <span class="font-mono font-bold text-cyan-300">${p.progress}%</span>
        </div>

        <!-- Action Move Buttons -->
        <div class="pt-2 border-t border-slate-800/80 flex items-center justify-between gap-1 text-[11px]">
          ${p.status !== 'Pending' ? `
            <button data-move-id="${p.id}" data-target-status="Pending" class="move-btn px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-all">
              ← Pending
            </button>
          ` : '<span class="text-[10px] text-slate-600">Pending</span>'}
          
          ${p.status !== 'In Progress' ? `
            <button data-move-id="${p.id}" data-target-status="In Progress" class="move-btn px-2 py-0.5 rounded bg-cyan-950 hover:bg-cyan-900 text-cyan-300 border border-cyan-800 transition-all font-semibold">
              ⚡ Progress
            </button>
          ` : '<span class="text-[10px] text-cyan-500 font-bold">In Progress</span>'}

          ${p.status !== 'Completed' ? `
            <button data-move-id="${p.id}" data-target-status="Completed" class="move-btn px-2 py-0.5 rounded bg-emerald-950 hover:bg-emerald-900 text-emerald-300 border border-emerald-800 transition-all font-semibold">
              ✓ Done
            </button>
          ` : '<span class="text-[10px] text-emerald-500 font-bold">✓ Done</span>'}
        </div>
      </div>
    `;
  };

  return `
    <div class="space-y-6">

      <!-- Section Title & Strategic Subheader -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-950/40 border border-slate-800 rounded-2xl p-5 shadow-xl">
        <div>
          <div class="flex items-center space-x-2">
            <span class="text-xl">📊</span>
            <h2 class="text-xl font-black text-white tracking-wide">NEXUS OPERATIONS DASHBOARD</h2>
            <span class="text-xs font-mono uppercase bg-indigo-950 text-indigo-300 border border-indigo-700/60 px-2.5 py-0.5 rounded-full">
              Reactive Stream (${timeRange})
            </span>
          </div>
          <p class="text-xs text-slate-400 mt-1">
            Quản trị hoạt động sản xuất, điều phối Kanban và phân tích hiệu suất thời gian thực.
          </p>
        </div>
        <div class="flex items-center space-x-3">
          <div class="bg-slate-950/90 border border-slate-800 px-3 py-1.5 rounded-xl text-xs font-mono">
            <span class="text-slate-400">Total Workforce Hours: </span>
            <strong class="text-cyan-400 font-bold">${totalHours.toLocaleString()} hrs</strong>
          </div>
        </div>
      </div>

      <!-- 1. Top KPI Row -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        ${kpis
          .map((kpi) => {
            const isPos = kpi.trend >= 0;
            return `
            <div class="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-lg relative overflow-hidden group hover:border-cyan-500/40 transition-all">
              <div class="flex items-center justify-between mb-3">
                <span class="text-xs font-bold text-slate-400 uppercase tracking-wider">${kpi.label}</span>
                <span class="text-2xl p-2 rounded-xl bg-slate-950 border border-slate-800 group-hover:scale-110 transition-transform">${kpi.icon}</span>
              </div>
              <div class="text-3xl font-black font-mono text-white mb-2">
                ${formatValue(kpi.value, kpi.format)}
              </div>
              <div class="flex items-center text-xs">
                <span class="font-mono font-bold flex items-center ${isPos ? 'text-emerald-400' : 'text-rose-400'}">
                  ${isPos ? '▲ +' : '▼ '}${kpi.trend}%
                </span>
                <span class="text-slate-500 ml-1.5 font-mono text-[11px]">vs prior ${timeRange}</span>
              </div>
            </div>
          `;
          })
          .join('')}
      </div>

      <!-- 2. Performance & Output Analytics Chart -->
      <div class="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
          <div>
            <h3 class="text-base font-bold text-white flex items-center space-x-2">
              <span>📈</span>
              <span>Production Output & Operational Efficiency</span>
            </h3>
            <p class="text-xs text-slate-400 mt-0.5">Xu hướng sản lượng đầu ra và chỉ số hiệu suất bình quân</p>
          </div>
          <div class="flex items-center space-x-3 text-xs font-mono">
            <span class="flex items-center space-x-1.5">
              <span class="w-3 h-3 rounded-full bg-cyan-400 inline-block"></span>
              <span class="text-slate-300">Efficiency (%)</span>
            </span>
            <span class="flex items-center space-x-1.5">
              <span class="w-3 h-3 rounded-full bg-emerald-400 inline-block"></span>
              <span class="text-slate-300">Produced Units</span>
            </span>
          </div>
        </div>

        <!-- SVG Line/Bar Chart -->
        <div class="w-full h-48 bg-slate-950/80 rounded-xl p-4 border border-slate-800 flex items-end justify-between gap-2 overflow-x-auto">
          ${performance
            .map((p) => {
              const barHeight = Math.max(15, Math.round((p.efficiency / 100) * 120));
              return `
              <div class="flex-1 min-w-[40px] flex flex-col items-center justify-end h-full group">
                <div class="text-[10px] font-mono text-cyan-300 opacity-0 group-hover:opacity-100 transition-opacity mb-1 font-bold">
                  ${p.efficiency}%
                </div>
                <div 
                  class="w-full max-w-[36px] bg-gradient-to-t from-cyan-600 to-emerald-400 rounded-t-md shadow-lg group-hover:from-cyan-400 group-hover:to-emerald-300 transition-all duration-300"
                  style="height: ${barHeight}px;"
                  title="${p.label}: Efficiency ${p.efficiency}%, Output: ${p.output.toLocaleString()} units, Latency: ${p.latencyMs}ms"
                ></div>
                <div class="text-[11px] font-mono text-slate-400 mt-2 font-semibold">
                  ${p.label}
                </div>
              </div>
            `;
            })
            .join('')}
        </div>
      </div>

      <!-- 3. Projects Kanban Board -->
      <div>
        <div class="flex items-center justify-between mb-4">
          <div>
            <h3 class="text-base font-bold text-white flex items-center space-x-2">
              <span>📋</span>
              <span>Operations Project Pipeline (Kanban)</span>
            </h3>
            <p class="text-xs text-slate-400 mt-0.5">Click nút trạng thái trên từng thẻ để chuyển tiến độ dự án vật lý</p>
          </div>
          <div class="text-xs text-slate-400 font-mono">
            Total Projects: <strong class="text-white">${projects.length}</strong>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
          
          <!-- Column 1: Pending -->
          <div class="bg-slate-950/60 border border-slate-800/80 rounded-2xl p-4 flex flex-col">
            <div class="flex items-center justify-between mb-3 pb-2 border-b border-slate-800">
              <div class="flex items-center space-x-2">
                <span class="w-2.5 h-2.5 rounded-full bg-slate-400"></span>
                <span class="text-sm font-bold text-slate-200 uppercase tracking-wide">Pending</span>
              </div>
              <span class="text-xs font-mono font-bold bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full">
                ${projectCounts['Pending']}
              </span>
            </div>
            <div class="space-y-3 flex-1">
              ${pendingProjects.length > 0
                ? pendingProjects.map(renderKanbanCard).join('')
                : '<div class="text-xs text-slate-600 text-center py-8">Không có dự án chờ</div>'
              }
            </div>
          </div>

          <!-- Column 2: In Progress -->
          <div class="bg-slate-950/60 border border-slate-800/80 rounded-2xl p-4 flex flex-col">
            <div class="flex items-center justify-between mb-3 pb-2 border-b border-cyan-800/60">
              <div class="flex items-center space-x-2">
                <span class="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse"></span>
                <span class="text-sm font-bold text-cyan-300 uppercase tracking-wide">In Progress</span>
              </div>
              <span class="text-xs font-mono font-bold bg-cyan-950 text-cyan-300 border border-cyan-800 px-2 py-0.5 rounded-full">
                ${projectCounts['In Progress']}
              </span>
            </div>
            <div class="space-y-3 flex-1">
              ${inProgressProjects.length > 0
                ? inProgressProjects.map(renderKanbanCard).join('')
                : '<div class="text-xs text-slate-600 text-center py-8">Không có dự án đang chạy</div>'
              }
            </div>
          </div>

          <!-- Column 3: Completed -->
          <div class="bg-slate-950/60 border border-slate-800/80 rounded-2xl p-4 flex flex-col">
            <div class="flex items-center justify-between mb-3 pb-2 border-b border-emerald-800/60">
              <div class="flex items-center space-x-2">
                <span class="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                <span class="text-sm font-bold text-emerald-300 uppercase tracking-wide">Completed</span>
              </div>
              <span class="text-xs font-mono font-bold bg-emerald-950 text-emerald-300 border border-emerald-800 px-2 py-0.5 rounded-full">
                ${projectCounts['Completed']}
              </span>
            </div>
            <div class="space-y-3 flex-1">
              ${completedProjects.length > 0
                ? completedProjects.map(renderKanbanCard).join('')
                : '<div class="text-xs text-slate-600 text-center py-8">Chưa có dự án hoàn thành</div>'
              }
            </div>
          </div>

        </div>
      </div>

      <!-- 4. Employee Operations Roster -->
      <div class="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
          <div>
            <h3 class="text-base font-bold text-white flex items-center space-x-2">
              <span>👥</span>
              <span>Operational Workforce & Resource Roster</span>
            </h3>
            <p class="text-xs text-slate-400 mt-0.5">Theo dõi nhật ký giờ công và tình trạng nhân sự theo phân ban</p>
          </div>
          <!-- Department Filter Tabs -->
          <div class="flex items-center space-x-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800">
            ${departments
              .map(
                (d) => `
              <button
                data-dept="${d}"
                class="dept-btn px-2.5 py-1 text-xs rounded-lg font-semibold transition-all ${
                  currentDept === d
                    ? 'bg-cyan-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }"
              >
                ${d}
              </button>
            `
              )
              .join('')}
          </div>
        </div>

        <!-- Table View -->
        <div class="overflow-x-auto rounded-xl border border-slate-800">
          <table class="w-full text-left text-xs text-slate-300">
            <thead class="bg-slate-950/80 text-[11px] font-mono uppercase text-slate-400 border-b border-slate-800">
              <tr>
                <th class="p-3">Employee</th>
                <th class="p-3">Role</th>
                <th class="p-3">Department</th>
                <th class="p-3">Status</th>
                <th class="p-3 text-right">Hours Logged (${timeRange})</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-800/60 font-sans">
              ${employees
                .map((e) => {
                  const statusBadge =
                    e.status === 'Active'
                      ? 'bg-emerald-950 text-emerald-300 border-emerald-700/60'
                      : e.status === 'Busy'
                      ? 'bg-amber-950 text-amber-300 border-amber-700/60'
                      : 'bg-slate-800 text-slate-400 border-slate-700';

                  return `
                  <tr class="hover:bg-slate-800/40 transition-colors">
                    <td class="p-3 flex items-center space-x-3">
                      <img src="${e.avatar}" alt="${e.name}" class="w-8 h-8 rounded-full border border-slate-700 bg-slate-950" />
                      <span class="font-bold text-white">${e.name}</span>
                    </td>
                    <td class="p-3 text-slate-300">${e.role}</td>
                    <td class="p-3">
                      <span class="px-2 py-0.5 rounded bg-slate-950 font-mono text-[11px] border border-slate-800 text-slate-300">
                        ${e.department}
                      </span>
                    </td>
                    <td class="p-3">
                      <span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${statusBadge}">
                        ${e.status}
                      </span>
                    </td>
                    <td class="p-3 text-right font-mono font-bold text-cyan-300">
                      ${e.hoursLogged.toLocaleString()} hrs
                    </td>
                  </tr>
                `;
                })
                .join('')}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  `;
}
