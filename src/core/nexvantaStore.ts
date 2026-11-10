export interface Incident {
  id: string;
  title: string;
  severity: 'CRITICAL' | 'WARN' | 'MEDIUM';
  host: string;
  service: string;
  resolved: boolean;
  timestamp: string;
}

export interface InventoryNode {
  id: string;
  name: string;
  ip: string;
  category: 'Servers' | 'Databases' | 'Network';
  cpu: number;
  ram: number;
  status: 'Healthy' | 'Degraded' | 'Critical';
  alertsCount: number;
}

export interface TopologyNode {
  id: string;
  name: string;
  label: string;
  tier: number; // 1 to 5
  status: 'healthy' | 'warning' | 'critical';
  ip: string;
  metrics: string;
}

class NexvantaStore {
  private listeners: (() => void)[] = [];

  // Navigation
  activeView: 'noc-overview' | 'topology' | 'incidents' = 'noc-overview';
  topologyMode: '3d' | '2d' = '3d';
  isRcaModalOpen = false;
  activeModalTab: 'ai-priority' | 'active-alerts' | 'open-incidents' = 'open-incidents';

  // Live Indicators
  clockTime = '18:57:04';
  incidentClock = '03:07:12';
  incidentSeconds = 11232;

  // KPIs
  devicesUp = 21;
  devicesTotal = 22;
  devicesDown = 1;
  degraded = 0;
  activeAlerts = 8;
  criticalAlerts = 2;
  globalSla = 95.5;
  fleetMttr = 57.8;
  aiRiskIndex = 0;
  firehoseEps = 39.6;

  // Filter
  inventoryFilter: 'All' | 'Servers' | 'Databases' | 'Network' = 'All';
  searchQuery = '';

  // Data
  incidents: Incident[] = [
    { id: 'INC-701', title: '[Service Failure] Critical Service "sqlservr" Stopped on host "MSSQL-175-REPLICA"', severity: 'CRITICAL', host: 'MSSQL-175-REPLICA', service: 'sqlservr', resolved: false, timestamp: '18:52:10' },
    { id: 'INC-702', title: 'Incident: disk_usage_pct on System Server Host [92.4% used]', severity: 'CRITICAL', host: 'MSSQL-176', service: 'disk_engine', resolved: false, timestamp: '18:53:15' },
    { id: 'INC-703', title: 'Incident: disk_usage_pct on DOCKERHOST [98.1% used]', severity: 'CRITICAL', host: 'DOCKERHOST', service: 'docker_daemon', resolved: false, timestamp: '18:54:02' },
    { id: 'INC-704', title: 'Incident: ram_usage_pct breach on bllbdalca-8393-43... [91.2%]', severity: 'CRITICAL', host: 'bllbdalca', service: 'ram_guard', resolved: false, timestamp: '18:55:40' },
    { id: 'INC-705', title: '[Agent Offline] EMAIL-SERVER-2 monitoring agent unresponsive', severity: 'WARN', host: 'EMAIL-SERVER-2', service: 'nims_agent', resolved: false, timestamp: '18:56:12' },
    { id: 'INC-706', title: 'Incident: ram_usage_pct on MSSQL-172 [84.1%]', severity: 'MEDIUM', host: 'MSSQL-172', service: 'buffer_pool', resolved: false, timestamp: '18:56:45' },
    { id: 'INC-707', title: 'Incident: disk_usage_pct on MSSQL-176 [88.5%]', severity: 'MEDIUM', host: 'MSSQL-176', service: 'storage', resolved: false, timestamp: '18:57:01' },
    { id: 'INC-708', title: 'Incident: disk_usage_pct on MSSQL-55 [86.2%]', severity: 'MEDIUM', host: 'MSSQL-55', service: 'storage', resolved: false, timestamp: '18:57:03' },
    { id: 'INC-709', title: 'Incident: disk_usage_pct on WEBSERVER-SHARE [85.0%]', severity: 'MEDIUM', host: 'WEBSERVER-SHARE', service: 'nfs_share', resolved: false, timestamp: '18:57:04' },
  ];

  inventory: InventoryNode[] = [
    { id: 'inv-1', name: 'MSSQL-175-REPLICA', ip: '192.168.7.175', category: 'Databases', cpu: 21, ram: 31, status: 'Critical', alertsCount: 1 },
    { id: 'inv-2', name: 'Msql-Server-3', ip: '192.168.7.171', category: 'Databases', cpu: 2, ram: 76, status: 'Degraded', alertsCount: 1 },
    { id: 'inv-3', name: 'DOCKERHOST', ip: '192.168.7.200', category: 'Servers', cpu: 45, ram: 82, status: 'Critical', alertsCount: 2 },
    { id: 'inv-4', name: 'WEBSERVER-1', ip: '192.168.7.101', category: 'Servers', cpu: 34, ram: 58, status: 'Healthy', alertsCount: 0 },
    { id: 'inv-5', name: 'WEBSERVER-2', ip: '192.168.7.102', category: 'Servers', cpu: 28, ram: 62, status: 'Healthy', alertsCount: 0 },
    { id: 'inv-6', name: 'EMAIL-SERVER-2', ip: '192.168.7.112', category: 'Servers', cpu: 12, ram: 44, status: 'Degraded', alertsCount: 1 },
    { id: 'inv-7', name: 'Main-Firewall', ip: '192.168.7.1', category: 'Network', cpu: 18, ram: 25, status: 'Healthy', alertsCount: 0 },
    { id: 'inv-8', name: 'Load-Balancer-1', ip: '192.168.7.2', category: 'Network', cpu: 22, ram: 38, status: 'Healthy', alertsCount: 0 },
  ];

  topologyNodes: TopologyNode[] = [
    // Tier 1
    { id: 'topo-fw', name: 'Main-Firewall', label: 'FIREWALL', tier: 1, status: 'healthy', ip: '192.168.7.1', metrics: '18% CPU' },
    // Tier 2
    { id: 'topo-lb', name: 'Load-Balancer-1', label: 'LOAD BALANCER', tier: 2, status: 'healthy', ip: '192.168.7.2', metrics: '22% CPU' },
    // Tier 3
    { id: 'topo-mail1', name: 'EMAIL-SERVER-1', label: 'MAIL SERVER', tier: 3, status: 'healthy', ip: '192.168.7.111', metrics: '15% CPU' },
    { id: 'topo-mail2', name: 'EMAIL-SERVER-2', label: 'MAIL SERVER', tier: 3, status: 'warning', ip: '192.168.7.112', metrics: '12% CPU' },
    { id: 'topo-web1', name: 'WEBSERVER-1', label: 'WEB SERVER', tier: 3, status: 'healthy', ip: '192.168.7.101', metrics: '34% CPU' },
    { id: 'topo-web2', name: 'WEBSERVER-2', label: 'WEB SERVER', tier: 3, status: 'healthy', ip: '192.168.7.102', metrics: '28% CPU' },
    { id: 'topo-web3', name: 'Webserver-3', label: 'WEB SERVER', tier: 3, status: 'healthy', ip: '192.168.7.103', metrics: '19% CPU' },
    { id: 'topo-doc', name: 'DOCKERHOST', label: 'CONTAINER HOST', tier: 3, status: 'critical', ip: '192.168.7.200', metrics: '45% CPU' },
    { id: 'topo-app', name: 'JAVA-APP-SERVER1', label: 'APP SERVER', tier: 3, status: 'healthy', ip: '192.168.7.105', metrics: '26% CPU' },
    { id: 'topo-win', name: 'Windows-Server1', label: 'WINDOWS HOST', tier: 3, status: 'healthy', ip: '192.168.7.106', metrics: '31% CPU' },
    { id: 'topo-srv170', name: 'SERVER-170', label: 'SERVER', tier: 3, status: 'healthy', ip: '192.168.7.170', metrics: '14% CPU' },
    // Tier 4 (Databases)
    { id: 'topo-db3', name: 'Msql-Server-3', label: 'MYSQL DB', tier: 4, status: 'warning', ip: '192.168.7.171', metrics: '2% CPU' },
    { id: 'topo-db172', name: 'MSSQL-172', label: 'MSSQL DB', tier: 4, status: 'healthy', ip: '192.168.7.172', metrics: '22% CPU' },
    { id: 'topo-db173', name: 'MSSQL-173', label: 'MSSQL DB', tier: 4, status: 'healthy', ip: '192.168.7.173', metrics: '18% CPU' },
    { id: 'topo-db176', name: 'MSSQL-176', label: 'MSSQL DB', tier: 4, status: 'warning', ip: '192.168.7.176', metrics: '35% CPU' },
    { id: 'topo-db55', name: 'MSSQL-55', label: 'MSSQL DB', tier: 4, status: 'warning', ip: '192.168.7.55', metrics: '29% CPU' },
    { id: 'topo-db56', name: 'MSSQL-56', label: 'MSSQL DB', tier: 4, status: 'healthy', ip: '192.168.7.56', metrics: '17% CPU' },
    { id: 'topo-dbatu', name: 'MSSQL-ATU-52', label: 'MSSQL DB', tier: 4, status: 'healthy', ip: '192.168.7.52', metrics: '11% CPU' },
    { id: 'topo-dbmy5', name: 'MYSQL-SERVER5', label: 'MYSQL DB', tier: 4, status: 'healthy', ip: '192.168.7.155', metrics: '19% CPU' },
    // Tier 5 (Replicas & Storage)
    { id: 'topo-share', name: 'WEBSERVER-SHARE', label: 'SHARED STORAGE', tier: 5, status: 'healthy', ip: '192.168.7.99', metrics: '40.1% Disk' },
    { id: 'topo-rep175', name: 'MSSQL-175-REPLICA', label: 'DB REPLICA', tier: 5, status: 'critical', ip: '192.168.7.175', metrics: '21% CPU' },
    { id: 'topo-rep50', name: 'MSSQL-REPLICA-50', label: 'DB REPLICA', tier: 5, status: 'healthy', ip: '192.168.7.50', metrics: '14% CPU' },
  ];

  constructor() {
    this.startHeartbeat();
  }

  subscribe(listener: () => void): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  notify(): void {
    for (const listener of this.listeners) {
      listener();
    }
  }

  private startHeartbeat(): void {
    // 1-second clock
    setInterval(() => {
      const d = new Date();
      this.clockTime = d.toTimeString().split(' ')[0];
      this.incidentSeconds++;
      const h = String(Math.floor(this.incidentSeconds / 3600)).padStart(2, '0');
      const m = String(Math.floor((this.incidentSeconds % 3600) / 60)).padStart(2, '0');
      const s = String(this.incidentSeconds % 60).padStart(2, '0');
      this.incidentClock = `${h}:${m}:${s}`;
      this.notify();
    }, 1000);

    // 2.5-second telemetry micro-jitter
    setInterval(() => {
      // Small jitter in Firehose EPS
      const delta = (Math.random() - 0.5) * 0.4;
      this.firehoseEps = Math.round((39.6 + delta) * 10) / 10;
      
      // Randomly update inventory host stats
      const randomHost = this.inventory[Math.floor(Math.random() * this.inventory.length)];
      if (randomHost) {
        randomHost.cpu = Math.min(99, Math.max(5, randomHost.cpu + Math.floor((Math.random() - 0.5) * 6)));
      }
      this.notify();
    }, 2500);
  }

  // Actions
  setView(view: 'noc-overview' | 'topology' | 'incidents'): void {
    this.activeView = view;
    this.notify();
  }

  setTopologyMode(mode: '3d' | '2d'): void {
    this.topologyMode = mode;
    this.notify();
  }

  openRcaModal(tab: 'ai-priority' | 'active-alerts' | 'open-incidents' = 'open-incidents'): void {
    this.isRcaModalOpen = true;
    this.activeModalTab = tab;
    this.notify();
  }

  closeRcaModal(): void {
    this.isRcaModalOpen = false;
    this.notify();
  }

  setModalTab(tab: 'ai-priority' | 'active-alerts' | 'open-incidents'): void {
    this.activeModalTab = tab;
    this.notify();
  }

  setInventoryFilter(filter: 'All' | 'Servers' | 'Databases' | 'Network'): void {
    this.inventoryFilter = filter;
    this.notify();
  }

  setSearchQuery(q: string): void {
    this.searchQuery = q.toLowerCase();
    this.notify();
  }

  resolveIncident(id: string): void {
    const inc = this.incidents.find((i) => i.id === id);
    if (inc && !inc.resolved) {
      inc.resolved = true;
      if (this.criticalAlerts > 0 && inc.severity === 'CRITICAL') this.criticalAlerts--;
      if (this.activeAlerts > 0) this.activeAlerts--;
      this.notify();
    }
  }

  get filteredInventory(): InventoryNode[] {
    return this.inventory.filter((node) => {
      const matchCat = this.inventoryFilter === 'All' || node.category === this.inventoryFilter;
      const matchSearch = !this.searchQuery || node.name.toLowerCase().includes(this.searchQuery) || node.ip.includes(this.searchQuery);
      return matchCat && matchSearch;
    });
  }

  get unresolvedIncidents(): Incident[] {
    return this.incidents.filter((i) => !i.resolved);
  }
}

export const nexvantaStore = new NexvantaStore();
