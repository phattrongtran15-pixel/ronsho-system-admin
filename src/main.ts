import './style.css';
import { nexvantaStore } from './core/nexvantaStore.ts';
import { renderNexvantaHeader } from './components/nexvantaHeader.ts';
import { renderNexvantaSidebar } from './components/nexvantaSidebar.ts';
import { renderNexvantaOverview } from './components/nexvantaOverview.ts';
import { renderNexvantaTopology } from './components/nexvantaTopology.ts';
import { renderNexvantaModal } from './components/nexvantaModal.ts';

function renderApp(): void {
  const app = document.getElementById('app');
  if (!app) return;

  const activeView = nexvantaStore.activeView;

  let mainBody = '';
  switch (activeView) {
    case 'noc-overview':
      mainBody = renderNexvantaOverview();
      break;
    case 'topology':
      mainBody = renderNexvantaTopology();
      break;
    default:
      mainBody = renderNexvantaOverview();
  }

  app.innerHTML = `
    <div class="min-h-screen bg-[#04070e] text-[#e8eefb] flex flex-col font-sans selection:bg-cyan-500 selection:text-black">
      
      <!-- Top Browser Chrome Header -->
      ${renderNexvantaHeader()}

      <!-- Main Layout: Left Sidebar + Central View Canvas -->
      <div class="flex-1 flex overflow-hidden">
        
        <!-- Left Sidebar Navigation -->
        <div class="hidden md:flex">
          ${renderNexvantaSidebar()}
        </div>

        <!-- Central Work Canvas -->
        <main class="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-7 max-w-[1920px] mx-auto w-full">
          ${mainBody}
        </main>
      </div>

      <!-- Executive Intelligence Briefing Modal Popup (image_2.png) -->
      ${renderNexvantaModal()}

      <!-- Minimal Sovereign Status Footer -->
      <footer class="bg-[#03060c] border-t border-[#0e1728] px-6 py-2.5 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-slate-500">
        <div class="flex items-center space-x-2">
          <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
          <span>NEXVANTA NIMS · DEEP FIELD DESIGN SYSTEM · REPLICA v3.0</span>
        </div>
        <div>
          Governed by Captain Ron (phattrongtran15-pixel) · Evidence Before Claims
        </div>
      </footer>

    </div>
  `;
}

// Global Event Delegation (100% Active Buttons)
function setupEventDelegation(): void {
  const app = document.getElementById('app');
  if (!app) return;

  app.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;

    // 1. Open AI RCA Modal
    if (
      target.closest('#view-ai-diagnostics-btn') ||
      target.closest('#card-open-incidents') ||
      target.closest('#hdr-incidents-btn')
    ) {
      nexvantaStore.openRcaModal('open-incidents');
      return;
    }

    // 2. Open Alerts Modal
    if (target.closest('#hdr-alerts-btn')) {
      nexvantaStore.openRcaModal('active-alerts');
      return;
    }

    // 3. Close Modal
    if (target.closest('#modal-close-btn')) {
      nexvantaStore.closeRcaModal();
      return;
    }

    // 4. Modal Tab Switcher
    const modalTabBtn = target.closest('.modal-tab-btn') as HTMLElement;
    if (modalTabBtn) {
      const tab = modalTabBtn.dataset.modalTab as 'ai-priority' | 'active-alerts' | 'open-incidents';
      if (tab) nexvantaStore.setModalTab(tab);
      return;
    }

    // 5. Resolve Incident
    const resolveBtn = target.closest('.resolve-incident-btn') as HTMLElement;
    if (resolveBtn) {
      const id = resolveBtn.dataset.resolveId;
      if (id) nexvantaStore.resolveIncident(id);
      return;
    }

    // 6. Sidebar Navigation
    const sidebarBtn = target.closest('[data-sidebar-view]') as HTMLElement;
    if (sidebarBtn) {
      const view = sidebarBtn.dataset.sidebarView;
      if (view === 'topology' || view === 'noc-overview') {
        nexvantaStore.setView(view);
      } else {
        // Any other view triggers incident or alerts overview
        nexvantaStore.setView('noc-overview');
      }
      return;
    }

    // 7. Fullscreen Spatial Map button on mini topology
    if (target.closest('#goto-topology-btn')) {
      nexvantaStore.setView('topology');
      return;
    }

    // 8. Topology 3D / 2D toggles
    if (target.closest('#topo-mode-3d')) {
      nexvantaStore.setTopologyMode('3d');
      return;
    }
    if (target.closest('#topo-mode-2d')) {
      nexvantaStore.setTopologyMode('2d');
      return;
    }

    // 9. Inventory Category Filters
    const filterBtn = target.closest('.inv-filter-btn') as HTMLElement;
    if (filterBtn) {
      const filter = filterBtn.dataset.invFilter as 'All' | 'Servers' | 'Databases' | 'Network';
      if (filter) nexvantaStore.setInventoryFilter(filter);
      return;
    }

    // 10. Refresh NOC button
    if (target.closest('#refresh-noc-btn')) {
      nexvantaStore.notify();
      return;
    }
  });

  // Search input handler
  app.addEventListener('input', (e) => {
    const target = e.target as HTMLInputElement;
    if (target.id === 'inv-search-input') {
      nexvantaStore.setSearchQuery(target.value);
    }
  });
}

// Initial Mount
document.addEventListener('DOMContentLoaded', () => {
  renderApp();
  setupEventDelegation();
  nexvantaStore.subscribe(renderApp);
});
