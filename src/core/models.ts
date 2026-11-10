export type TimeRange = 'weekly' | 'monthly' | 'yearly';

export type KpiFormat = 'number' | 'percent' | 'currency';

export interface Kpi {
  id: 'activeProjects' | 'activeEmployees' | 'efficiencyRate' | 'monthlyRevenue';
  label: string;
  value: number;
  format: KpiFormat;
  trend: number;
  icon: string;
  accent: 'emerald' | 'lime' | 'violet' | 'cyan' | 'rose';
}

export type ProjectStatus = 'In Progress' | 'Pending' | 'Completed';
export type ProjectPriority = 'P0 - Critical' | 'P1 - High' | 'P2 - Normal';

export interface Project {
  id: string;
  name: string;
  client: string;
  status: ProjectStatus;
  progress: number;
  priority: ProjectPriority;
  lead: string;
  budget: string;
}

export type Department = 'Manufacturing' | 'Engineering' | 'Logistics';
export type EmployeeStatus = 'Active' | 'On Leave' | 'Busy';

export interface Employee {
  id: number;
  name: string;
  role: string;
  department: Department;
  status: EmployeeStatus;
  avatar: string;
  hoursLogged: number;
  weeklyHours: number;
}

export interface PerformancePoint {
  label: string;
  efficiency: number;
  output: number;
  latencyMs: number;
}

export type AgentStatus = 'ACTIVE' | 'WORKING' | 'STANDBY' | 'TRIPPED';

export interface A2AAgent {
  id: string;
  name: string;
  role: string;
  engine: string;
  status: AgentStatus;
  quotaSpent: string;
  quotaLimit: string;
  circuitBreaker: 'ARMED' | 'TRIPPED';
  activeTask: string;
  lastHandoff: string;
}

export interface TelemetryLog {
  id: string;
  timestamp: string;
  level: 'INFO' | 'SUCCESS' | 'WARN' | 'CRITICAL' | 'A2A';
  source: string;
  message: string;
}

export type C4ViewMode = 'C1_SYSTEM' | 'C2_CONTAINER' | 'C3_COMPONENT';

export type TabId = 'mission-hud' | 'nexus-operations' | 'c4-living-map' | 'triad-oracle';

export interface C4Node {
  id: string;
  name: string;
  level: C4ViewMode;
  kind: 'person' | 'system' | 'container' | 'component' | 'database';
  technology: string;
  description: string;
  status: 'HEALTHY' | 'ACTIVE' | 'GOVERNED';
  relations: { targetId: string; label: string; protocol: string }[];
}
