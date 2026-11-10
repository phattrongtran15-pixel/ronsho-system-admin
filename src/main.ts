import './style.css';
import { store } from './core/store.ts';
import { renderNavbar } from './components/navbar.ts';
import { renderNexusOperations } from './components/nexusOperations.ts';
import { renderMissionHud } from './components/missionHud.ts';
import { renderC4LivingMap } from './components/c4LivingMap.ts';
import { renderTriadOracle } from './components/triadOracle.ts';
import { C4ViewMode, Department, ProjectStatus, TabId, TimeRange } from './core/models.ts';

function renderApp(): void {
  const app = document.getElementById('app');
  if (!app) return;

  const activeTab = store.activeTab;

  let mainContent = '';
  switch (activeTab) {
    case 'nexus-operations':
      mainContent = renderNexusOperations();
      break;
    case 'mission-hud':
      mainContent = renderMissionHud();
      break;
    case 'c4-living-map':
      mainContent = renderC4LivingMap();
      break;
    case 'triad-oracle':
      mainContent = renderTriadOracle();
      break;
    default:
      mainContent = renderNexusOperations();
  }

  app.innerHTML = `
    <div class="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-black">
      ${renderNavbar()}
      <main class="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        ${mainContent}
      </main>
      <footer class="bg-slate-950 border-t border-slate-900 py-4 text-center text-xs text-slate-500 font-mono">
        RON-SHO AIOS · Human Sovereignty · Governed by Captain Ron (phattrongtran15-pixel) · Evidence Before Claims
      </footer>
    </div>
  `;
}

// Global Event Delegation (Zero Dead Buttons)
function setupEventDelegation(): void {
  const app = document.getElementById('app');
  if (!app) return;

  app.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;

    // 1. Tab switching
    const tabBtn = target.closest('.tab-btn') as HTMLElement;
    if (tabBtn) {
      const tab = tabBtn.dataset.tab as TabId;
      if (tab) store.setActiveTab(tab);
      return;
    }

    // 2. Time Range switching
    const rangeBtn = target.closest('.range-btn') as HTMLElement;
    if (rangeBtn) {
      const range = rangeBtn.dataset.range as TimeRange;
      if (range) store.setTimeRange(range);
      return;
    }

    // 3. Circuit Breaker Toggling
    if (target.closest('#circuit-toggle-btn') || target.closest('#hud-cb-toggle')) {
      store.toggleCircuitBreaker();
      return;
    }

    // 4. Export Audit Report
    if (target.closest('#export-audit-btn')) {
      store.exportAuditReport();
      return;
    }

    // 5. Kanban Move Project Status
    const moveBtn = target.closest('.move-btn') as HTMLElement;
    if (moveBtn) {
      const id = moveBtn.dataset.moveId;
      const targetStatus = moveBtn.dataset.targetStatus as ProjectStatus;
      if (id && targetStatus) store.updateProjectStatus(id, targetStatus);
      return;
    }

    // 6. Department Filter
    const deptBtn = target.closest('.dept-btn') as HTMLElement;
    if (deptBtn) {
      const dept = deptBtn.dataset.dept as Department | 'All';
      if (dept) store.setSelectedDepartment(dept);
      return;
    }

    // 7. C4 Mode Switching
    const c4Btn = target.closest('.c4-level-btn') as HTMLElement;
    if (c4Btn) {
      const mode = c4Btn.dataset.c4Mode as C4ViewMode;
      if (mode) store.setC4Mode(mode);
      return;
    }

    // 8. C4 Node Selection
    const nodeCard = target.closest('.c4-node-card') as HTMLElement;
    if (nodeCard) {
      const nodeId = nodeCard.dataset.c4NodeId;
      const found = store.c4Nodes.find((n) => n.id === nodeId);
      if (found) store.setSelectedC4Node(found);
      return;
    }
  });

  // Search input handler
  app.addEventListener('input', (e) => {
    const target = e.target as HTMLInputElement;
    if (target.id === 'global-search') {
      store.setSearchQuery(target.value);
    }
  });
}

// Initial Mount
document.addEventListener('DOMContentLoaded', () => {
  renderApp();
  setupEventDelegation();
  store.subscribe(renderApp);
});
