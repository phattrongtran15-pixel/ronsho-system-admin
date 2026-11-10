import {
  A2AAgent,
  C4Node,
  C4ViewMode,
  Department,
  Employee,
  Kpi,
  PerformancePoint,
  Project,
  ProjectStatus,
  TabId,
  TelemetryLog,
  TimeRange,
} from './models.ts';

const avatar = (seed: string) => `https://i.pravatar.cc/80?u=${encodeURIComponent(seed)}`;

const HOURS_FACTOR: Record<TimeRange, number> = {
  weekly: 1,
  monthly: 4.33,
  yearly: 52,
};

const KPI_CONFIG: Record<TimeRange, Record<Kpi['id'], { value: number; trend: number }>> = {
  weekly: {
    activeProjects: { value: 38, trend: 2.7 },
    activeEmployees: { value: 312, trend: 0.6 },
    efficiencyRate: { value: 93.1, trend: -0.4 },
    monthlyRevenue: { value: 296400, trend: 3.1 },
  },
  monthly: {
    activeProjects: { value: 42, trend: 8.4 },
    activeEmployees: { value: 318, trend: 3.2 },
    efficiencyRate: { value: 94.8, trend: 1.5 },
    monthlyRevenue: { value: 1284500, trend: 12.3 },
  },
  yearly: {
    activeProjects: { value: 57, trend: 21.3 },
    activeEmployees: { value: 331, trend: 9.8 },
    efficiencyRate: { value: 96.2, trend: 4.6 },
    monthlyRevenue: { value: 15420000, trend: 18.7 },
  },
};

const PERFORMANCE_DATA: Record<TimeRange, PerformancePoint[]> = {
  weekly: [
    { label: 'Mon', efficiency: 91, output: 2840, latencyMs: 142 },
    { label: 'Tue', efficiency: 94, output: 3010, latencyMs: 135 },
    { label: 'Wed', efficiency: 89, output: 2760, latencyMs: 168 },
    { label: 'Thu', efficiency: 96, output: 3150, latencyMs: 122 },
    { label: 'Fri', efficiency: 97, output: 3220, latencyMs: 118 },
    { label: 'Sat', efficiency: 92, output: 1680, latencyMs: 129 },
    { label: 'Sun', efficiency: 88, output: 940, latencyMs: 155 },
  ],
  monthly: [
    { label: 'W1', efficiency: 92, output: 17400, latencyMs: 140 },
    { label: 'W2', efficiency: 95, output: 18900, latencyMs: 126 },
    { label: 'W3', efficiency: 93, output: 18100, latencyMs: 138 },
    { label: 'W4', efficiency: 97, output: 19600, latencyMs: 119 },
  ],
  yearly: [
    { label: 'Q1', efficiency: 91, output: 194000, latencyMs: 145 },
    { label: 'Q2', efficiency: 93, output: 208000, latencyMs: 134 },
    { label: 'Q3', efficiency: 95, output: 221000, latencyMs: 125 },
    { label: 'Q4', efficiency: 97, output: 236000, latencyMs: 117 },
  ],
};

const INITIAL_PROJECTS: Project[] = [
  { id: 'NEX-1042', name: 'CNC Line 4 Retrofit & Telemetry', client: 'Vortex Automotive', status: 'In Progress', progress: 68, priority: 'P1 - High', lead: 'Alex Mercer', budget: '$180,000' },
  { id: 'NEX-1043', name: 'Smart Furnace IoT Edge Sensors', client: 'Ferrum Steelworks', status: 'In Progress', progress: 41, priority: 'P0 - Critical', lead: 'Giulia Ferri', budget: '$95,000' },
  { id: 'NEX-1044', name: 'Automated Logistics Warehouse 2.0', client: 'Granaria Foods', status: 'Pending', progress: 15, priority: 'P2 - Normal', lead: 'Luca Bianchi', budget: '$320,000' },
  { id: 'NEX-1045', name: 'ISO 50001 Energy Audit Pipeline', client: 'Helix Tyres', status: 'Completed', progress: 100, priority: 'P2 - Normal', lead: 'Sara Kim', budget: '$45,000' },
  { id: 'NEX-1046', name: 'Robotic Palletizing Vision Cell', client: 'Aroma Roasters', status: 'In Progress', progress: 83, priority: 'P1 - High', lead: 'Nadia Rossi', budget: '$210,000' },
  { id: 'NEX-1047', name: 'Predictive Maintenance A2A Agent', client: 'Volta Energy', status: 'Pending', progress: 5, priority: 'P0 - Critical', lead: 'Marco Valli', budget: '$140,000' },
  { id: 'NEX-1048', name: 'Pharma Clean Room Ventilation Control', client: 'Medica Pharma', status: 'Completed', progress: 100, priority: 'P1 - High', lead: 'Omar Haddad', budget: '$165,000' },
];

const INITIAL_EMPLOYEES: Employee[] = [
  { id: 1, name: 'Alex Mercer', role: 'Operations Lead', department: 'Manufacturing', status: 'Active', avatar: avatar('alex'), weeklyHours: 46, hoursLogged: 199 },
  { id: 2, name: 'Giulia Ferri', role: 'Process Engineer', department: 'Engineering', status: 'Busy', avatar: avatar('giulia'), weeklyHours: 44, hoursLogged: 190 },
  { id: 3, name: 'Marco Valli', role: 'Maintenance Specialist', department: 'Manufacturing', status: 'Active', avatar: avatar('marco'), weeklyHours: 40, hoursLogged: 173 },
  { id: 4, name: 'Sara Kim', role: 'Quality Assurance Auditor', department: 'Engineering', status: 'On Leave', avatar: avatar('sara'), weeklyHours: 18, hoursLogged: 78 },
  { id: 5, name: 'Luca Bianchi', role: 'Supply Chain Coordinator', department: 'Logistics', status: 'Active', avatar: avatar('luca'), weeklyHours: 38, hoursLogged: 165 },
  { id: 6, name: 'Nadia Rossi', role: 'Robotics Automation Dev', department: 'Engineering', status: 'Busy', avatar: avatar('nadia'), weeklyHours: 42, hoursLogged: 182 },
  { id: 7, name: 'Omar Haddad', role: 'Fleet & Dispatch Lead', department: 'Logistics', status: 'Active', avatar: avatar('omar'), weeklyHours: 39, hoursLogged: 169 },
];

const INITIAL_AGENTS: A2AAgent[] = [
  { id: 'AGT-01', name: 'RON RUNTIME', role: 'Master System Orchestrator', engine: 'Native Core Control Layer', status: 'ACTIVE', quotaSpent: '$0.00 / FREE', quotaLimit: 'UNLIMITED', circuitBreaker: 'ARMED', activeTask: 'Cross-Chat Operations & Sovereign Governance', lastHandoff: 'TKT-A2A-071 [VERIFIED]' },
  { id: 'AGT-02', name: 'GOOSE WORKER', role: 'Headless Task Executor', engine: 'OpenRouter / Nemotron-70B', status: 'WORKING', quotaSpent: '$0.00 (50/50 Hits)', quotaLimit: 'Daily Cap 50', circuitBreaker: 'ARMED', activeTask: 'Automated Local Bug Fixing & Shell Testing', lastHandoff: 'TKT-BRN-179 [SUCCESS]' },
  { id: 'AGT-03', name: 'KILO LOCAL', role: 'Windows Ground Base Sentinel', engine: 'Local Ollama / Qwen-2.5', status: 'STANDBY', quotaSpent: '$0.00 (Air-Gapped)', quotaLimit: 'Local RAM 32GB', circuitBreaker: 'ARMED', activeTask: 'Monitoring Local File System & Git Events', lastHandoff: 'TKT-MCP-001 [STANDBY]' },
  { id: 'AGT-04', name: 'ANTI CLOUD', role: 'Cloud Architect & QA Oracle', engine: 'Governed Bounded Codex', status: 'ACTIVE', quotaSpent: 'Pro Tier Managed', quotaLimit: 'Enterprise Guard', circuitBreaker: 'ARMED', activeTask: 'C4 Architecture Conformance & TypeScript Deployment', lastHandoff: 'TKT-ARC-002 [ACTIVE]' },
];

const INITIAL_LOGS: TelemetryLog[] = [
  { id: 'L-101', timestamp: '03:30:15', level: 'INFO', source: 'RON_RUNTIME', message: 'Initialized Sovereign Report Control & Management Center' },
  { id: 'L-102', timestamp: '03:31:02', level: 'A2A', source: 'A2A_BUS', message: 'Handoff from Anti Cloud accepted by Ron-MCP-Master' },
  { id: 'L-103', timestamp: '03:32:44', level: 'SUCCESS', source: 'ARCHIFY_GATE', message: 'Merkle SHA-256 Seal verified: 3f74ce6c80... Pass 9/9 gates' },
  { id: 'L-104', timestamp: '03:34:10', level: 'INFO', source: 'NEXUS_STORE', message: 'Reactive TypeScript data streams connected to operations store' },
  { id: 'L-105', timestamp: '03:35:01', level: 'A2A', source: 'CIRCUIT_BREAKER', message: 'Armed 100% — Zero Silent Halt policy active' },
];

const C4_NODES: C4Node[] = [
  // C1
  { id: 'c1-ron', name: 'Captain Ron (Human)', level: 'C1_SYSTEM', kind: 'person', technology: 'Human Sovereignty', description: 'Supreme authority, protected decision maker. Ron is never the middleware.', status: 'GOVERNED', relations: [{ targetId: 'c1-ronsho', label: 'Commands & Audits', protocol: 'Direct UI / Chat' }] },
  { id: 'c1-ronsho', name: 'RON-SHO AIOS', level: 'C1_SYSTEM', kind: 'system', technology: 'TypeScript / Node / MCP', description: 'Autonomous multi-agent operating system governed by M1-M5 truth cycles.', status: 'HEALTHY', relations: [{ targetId: 'c1-nexus', label: 'Dispatches Operations', protocol: 'A2A JSON Bus' }] },
  { id: 'c1-nexus', name: 'Nexus Operations Enterprise', level: 'C1_SYSTEM', kind: 'system', technology: 'Vite / Reactive TypeScript', description: 'Comprehensive KPI, Kanban & Fleet Operations Management Center.', status: 'HEALTHY', relations: [] },

  // C2
  { id: 'c2-mcp', name: 'Ron-MCP-Master (Repo 1)', level: 'C2_CONTAINER', kind: 'container', technology: 'Node.js MCP Server', description: 'Core hub, circuit breaker, A2A mailbox, and governance enforcement.', status: 'HEALTHY', relations: [{ targetId: 'c2-admin', label: 'Streams Telemetry', protocol: 'WebSockets / JSON' }] },
  { id: 'c2-admin', name: 'System Admin UI (Repo 6)', level: 'C2_CONTAINER', kind: 'container', technology: 'Vite / Tailwind / TypeScript', description: 'Dual-mode Mission Control HUD and Nexus Operations Dashboard.', status: 'HEALTHY', relations: [{ targetId: 'c2-oracle', label: 'Validates Architecture', protocol: 'Archify CLI' }] },
  { id: 'c2-oracle', name: 'Archify Oracle Gatekeeper', level: 'C2_CONTAINER', kind: 'container', technology: 'Archify v3.2 Engine', description: 'Independent verification oracle enforcing zero boundary violations & Merkle receipt.', status: 'GOVERNED', relations: [{ targetId: 'c2-core', label: 'Audits Delivery', protocol: 'SHA-256 Hash' }] },
  { id: 'c2-core', name: 'Unified Delivery Core (Repo 3,4,5)', level: 'C2_CONTAINER', kind: 'container', technology: 'Consolidated Service Engine', description: 'Merged operations core eliminating fragmentation across kits.', status: 'ACTIVE', relations: [] },

  // C3
  { id: 'c3-store', name: 'Reactive Data Store', level: 'C3_COMPONENT', kind: 'component', technology: 'TypeScript Signal Store', description: 'In-memory state management handling time-range derivations and real mutations.', status: 'HEALTHY', relations: [{ targetId: 'c3-kanban', label: 'Updates Project State', protocol: 'Event Dispatch' }] },
  { id: 'c3-kanban', name: 'Kanban Operations Engine', level: 'C3_COMPONENT', kind: 'component', technology: 'DOM Event Controller', description: 'Status pipeline managing task transitions between Pending, In Progress, and Completed.', status: 'HEALTHY', relations: [] },
  { id: 'c3-circuit', name: 'Circuit Breaker Controller', level: 'C3_COMPONENT', kind: 'component', technology: 'Anti-Greedy Fallback Gate', description: 'Closes downstream agent tasks when quota is exhausted or errors repeat.', status: 'GOVERNED', relations: [] },
  { id: 'c3-c4engine', name: 'LikeC4 Living View Bridge', level: 'C3_COMPONENT', kind: 'component', technology: 'WebComponent Adapter', description: 'Renders living hierarchical architecture diagrams with drill-down navigation.', status: 'HEALTHY', relations: [] },
];

export class AppStore {
  private listeners: (() => void)[] = [];

  // State
  private _activeTab: TabId = 'nexus-operations';
  private _timeRange: TimeRange = 'monthly';
  private _searchQuery = '';
  private _c4Mode: C4ViewMode = 'C1_SYSTEM';
  private _selectedDepartment: Department | 'All' = 'All';
  private _circuitBreakerArmed = true;
  private _projects: Project[] = [...INITIAL_PROJECTS];
  private _employees: Employee[] = [...INITIAL_EMPLOYEES];
  private _agents: A2AAgent[] = [...INITIAL_AGENTS];
  private _logs: TelemetryLog[] = [...INITIAL_LOGS];
  private _selectedC4Node: C4Node | null = C4_NODES[0];

  // Subscribe to state changes
  subscribe(fn: () => void): () => void {
    this.listeners.push(fn);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== fn);
    };
  }

  private notify(): void {
    for (const listener of this.listeners) {
      listener();
    }
  }

  // Getters
  get activeTab(): TabId { return this._activeTab; }
  get timeRange(): TimeRange { return this._timeRange; }
  get searchQuery(): string { return this._searchQuery; }
  get c4Mode(): C4ViewMode { return this._c4Mode; }
  get selectedDepartment(): Department | 'All' { return this._selectedDepartment; }
  get circuitBreakerArmed(): boolean { return this._circuitBreakerArmed; }
  get agents(): A2AAgent[] { return this._agents; }
  get logs(): TelemetryLog[] { return this._logs; }
  get selectedC4Node(): C4Node | null { return this._selectedC4Node; }

  // Computeds
  get kpis(): Kpi[] {
    const snapshot = KPI_CONFIG[this._timeRange];
    return [
      { id: 'activeProjects', label: 'Active Projects', format: 'number', value: snapshot.activeProjects.value, trend: snapshot.activeProjects.trend, icon: '⚡', accent: 'violet' },
      { id: 'activeEmployees', label: 'Active Workforce', format: 'number', value: snapshot.activeEmployees.value, trend: snapshot.activeEmployees.trend, icon: '👥', accent: 'emerald' },
      { id: 'efficiencyRate', label: 'Operational Efficiency', format: 'percent', value: snapshot.efficiencyRate.value, trend: snapshot.efficiencyRate.trend, icon: '🎯', accent: 'lime' },
      { id: 'monthlyRevenue', label: this._timeRange === 'yearly' ? 'Annualized Revenue' : 'Operational Revenue', format: 'currency', value: snapshot.monthlyRevenue.value, trend: snapshot.monthlyRevenue.trend, icon: '💎', accent: 'cyan' },
    ];
  }

  get performance(): PerformancePoint[] {
    return PERFORMANCE_DATA[this._timeRange];
  }

  get filteredProjects(): Project[] {
    const q = this._searchQuery.trim().toLowerCase();
    return this._projects.filter((p) => {
      return !q || p.name.toLowerCase().includes(q) || p.client.toLowerCase().includes(q) || p.id.toLowerCase().includes(q) || p.lead.toLowerCase().includes(q);
    });
  }

  get projectCounts(): Record<ProjectStatus, number> {
    const counts: Record<ProjectStatus, number> = { 'In Progress': 0, Pending: 0, Completed: 0 };
    for (const p of this._projects) {
      counts[p.status]++;
    }
    return counts;
  }

  get filteredEmployees(): Employee[] {
    const q = this._searchQuery.trim().toLowerCase();
    const factor = HOURS_FACTOR[this._timeRange];
    return this._employees
      .filter((e) => {
        const matchesDept = this._selectedDepartment === 'All' || e.department === this._selectedDepartment;
        const matchesQuery = !q || e.name.toLowerCase().includes(q) || e.role.toLowerCase().includes(q) || e.department.toLowerCase().includes(q);
        return matchesDept && matchesQuery;
      })
      .map((e) => ({
        ...e,
        hoursLogged: Math.round(e.weeklyHours * factor),
      }));
  }

  get totalHoursLogged(): number {
    return this.filteredEmployees.reduce((sum, e) => sum + e.hoursLogged, 0);
  }

  get c4Nodes(): C4Node[] {
    return C4_NODES.filter((n) => n.level === this._c4Mode);
  }

  // Actions
  setActiveTab(tab: TabId): void {
    if (this._activeTab !== tab) {
      this._activeTab = tab;
      this.addLog('INFO', 'NAV', `Switched view tab to ${tab}`);
      this.notify();
    }
  }

  setTimeRange(range: TimeRange): void {
    if (this._timeRange !== range) {
      this._timeRange = range;
      this.addLog('INFO', 'TIMELINE', `Recalibrated operational metrics for ${range} range`);
      this.notify();
    }
  }

  setSearchQuery(q: string): void {
    this._searchQuery = q;
    this.notify();
  }

  setC4Mode(mode: C4ViewMode): void {
    if (this._c4Mode !== mode) {
      this._c4Mode = mode;
      const firstInMode = C4_NODES.find((n) => n.level === mode);
      if (firstInMode) this._selectedC4Node = firstInMode;
      this.addLog('A2A', 'C4_LIVING', `Zoomed C4 level to ${mode}`);
      this.notify();
    }
  }

  setSelectedC4Node(node: C4Node): void {
    this._selectedC4Node = node;
    this.notify();
  }

  setSelectedDepartment(dept: Department | 'All'): void {
    this._selectedDepartment = dept;
    this.notify();
  }

  updateProjectStatus(id: string, newStatus: ProjectStatus): void {
    const prj = this._projects.find((p) => p.id === id);
    if (prj) {
      const prevStatus = prj.status;
      prj.status = newStatus;
      if (newStatus === 'Completed') prj.progress = 100;
      if (newStatus === 'Pending' && prj.progress === 100) prj.progress = 0;
      this.addLog('SUCCESS', 'KANBAN', `Moved project [${id}] from ${prevStatus} -> ${newStatus}`);
      this.notify();
    }
  }

  toggleCircuitBreaker(): void {
    this._circuitBreakerArmed = !this._circuitBreakerArmed;
    const status = this._circuitBreakerArmed ? 'ARMED' : 'TRIPPED';
    for (const agent of this._agents) {
      agent.circuitBreaker = status;
    }
    this.addLog(
      this._circuitBreakerArmed ? 'SUCCESS' : 'CRITICAL',
      'CIRCUIT_BREAKER',
      `Master Circuit Breaker manually ${status} by Captain Ron`
    );
    this.notify();
  }

  addLog(level: TelemetryLog['level'], source: string, message: string): void {
    const time = new Date().toTimeString().split(' ')[0];
    const newLog: TelemetryLog = {
      id: `L-${Date.now().toString().slice(-4)}`,
      timestamp: time,
      level,
      source,
      message,
    };
    this._logs.unshift(newLog);
    if (this._logs.length > 50) this._logs.pop();
  }

  exportAuditReport(): void {
    const report = {
      title: 'RON-SHO Nexus Operations Strategic Audit Report',
      timestamp: new Date().toISOString(),
      governedBy: 'Captain Ron (phattrongtran15-pixel)',
      timeRange: this._timeRange,
      kpis: this.kpis,
      projects: this._projects,
      workforce: this.filteredEmployees,
      fleetStatus: this._agents,
      circuitBreaker: this._circuitBreakerArmed ? 'ARMED_100%' : 'TRIPPED_SAFE',
      merkleProof: '3f74ce6c80e90f596a26bc38ee04c17894d8cf0f8562182c97bc246204446bd7',
    };

    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `RONSHO-NEXUS-AUDIT-${this._timeRange.toUpperCase()}-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    this.addLog('SUCCESS', 'AUDIT_EXPORT', 'Exported comprehensive physical audit receipt to client machine');
    this.notify();
  }
}

export const store = new AppStore();
