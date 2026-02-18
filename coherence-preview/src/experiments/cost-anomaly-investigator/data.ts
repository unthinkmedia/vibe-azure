export const serviceName = 'Cost Management';
export const pageTitle = 'Anomaly Investigator';

// ─── Nav Config ───
export interface NavItemConfig {
  label: string;
  icon: string;
  selected?: boolean;
}

export interface NavSectionConfig {
  heading?: string;
  items: NavItemConfig[];
}

export const navSections: NavSectionConfig[] = [
  {
    items: [
      { label: 'Overview', icon: 'home' },
      { label: 'Cost analysis', icon: 'data-trending' },
      { label: 'Cost alerts', icon: 'alert' },
      { label: 'Budgets', icon: 'wallet' },
      { label: 'Anomaly Investigator', icon: 'search', selected: true },
      { label: 'Advisor recommendations', icon: 'lightbulb' },
    ],
  },
  {
    heading: 'Settings',
    items: [
      { label: 'Configuration', icon: 'settings' },
      { label: 'Properties', icon: 'info' },
      { label: 'Exports', icon: 'arrow-download' },
    ],
  },
];

// ─── Heatmap ───
export type Severity = 'low' | 'medium' | 'high';

export interface ResourceGroupDelta {
  name: string;
  lastWeek: number;
  thisWeek: number;
  deltaPct: number;
  severity: Severity;
}

export const resourceGroupDeltas: ResourceGroupDelta[] = [
  { name: 'rg-prod-api', lastWeek: 4200, thisWeek: 7140, deltaPct: 70, severity: 'high' },
  { name: 'rg-prod-web', lastWeek: 3100, thisWeek: 3400, deltaPct: 9.7, severity: 'low' },
  { name: 'rg-staging', lastWeek: 1800, thisWeek: 2900, deltaPct: 61, severity: 'high' },
  { name: 'rg-data-lake', lastWeek: 5600, thisWeek: 6440, deltaPct: 15, severity: 'medium' },
  { name: 'rg-ml-training', lastWeek: 8200, thisWeek: 13940, deltaPct: 70, severity: 'high' },
  { name: 'rg-networking', lastWeek: 920, thisWeek: 960, deltaPct: 4.3, severity: 'low' },
  { name: 'rg-monitoring', lastWeek: 640, thisWeek: 680, deltaPct: 6.3, severity: 'low' },
  { name: 'rg-backup', lastWeek: 1200, thisWeek: 1380, deltaPct: 15, severity: 'medium' },
  { name: 'rg-dev-team-a', lastWeek: 780, thisWeek: 1250, deltaPct: 60, severity: 'high' },
  { name: 'rg-dev-team-b', lastWeek: 650, thisWeek: 710, deltaPct: 9.2, severity: 'low' },
  { name: 'rg-shared-infra', lastWeek: 2100, thisWeek: 2730, deltaPct: 30, severity: 'medium' },
  { name: 'rg-container-apps', lastWeek: 1400, thisWeek: 2380, deltaPct: 70, severity: 'high' },
  { name: 'rg-sql-prod', lastWeek: 3400, thisWeek: 3570, deltaPct: 5, severity: 'low' },
  { name: 'rg-redis-cache', lastWeek: 480, thisWeek: 530, deltaPct: 10.4, severity: 'medium' },
  { name: 'rg-iot-hub', lastWeek: 1100, thisWeek: 1265, deltaPct: 15, severity: 'medium' },
  { name: 'rg-cdn', lastWeek: 340, thisWeek: 360, deltaPct: 5.9, severity: 'low' },
];

// ─── Top Movers ───
export type CauseTag = 'scale-out' | 'new deployment' | 'idle but running' | 'storage growth' | 'config change' | 'traffic spike';

export interface TopMover {
  resourceName: string;
  resourceType: string;
  lastWeekCost: number;
  thisWeekCost: number;
  deltaPct: number;
  deltaAbsolute: number;
  causeTag: CauseTag;
}

export const topMovers: TopMover[] = [
  { resourceName: 'ml-gpu-cluster-01', resourceType: 'Machine Learning Compute', lastWeekCost: 4800, thisWeekCost: 8640, deltaPct: 80, deltaAbsolute: 3840, causeTag: 'scale-out' },
  { resourceName: 'api-gateway-prod', resourceType: 'API Management', lastWeekCost: 2200, thisWeekCost: 4620, deltaPct: 110, deltaAbsolute: 2420, causeTag: 'traffic spike' },
  { resourceName: 'aks-prod-nodepool3', resourceType: 'Kubernetes Service', lastWeekCost: 1800, thisWeekCost: 3960, deltaPct: 120, deltaAbsolute: 2160, causeTag: 'scale-out' },
  { resourceName: 'cosmos-orders-db', resourceType: 'Cosmos DB', lastWeekCost: 3200, thisWeekCost: 5120, deltaPct: 60, deltaAbsolute: 1920, causeTag: 'storage growth' },
  { resourceName: 'func-event-processor', resourceType: 'Function App', lastWeekCost: 340, thisWeekCost: 1870, deltaPct: 450, deltaAbsolute: 1530, causeTag: 'traffic spike' },
  { resourceName: 'vm-staging-batch-01', resourceType: 'Virtual Machine', lastWeekCost: 0, thisWeekCost: 1440, deltaPct: 100, deltaAbsolute: 1440, causeTag: 'new deployment' },
  { resourceName: 'sql-analytics-pool', resourceType: 'SQL Database', lastWeekCost: 2800, thisWeekCost: 4060, deltaPct: 45, deltaAbsolute: 1260, causeTag: 'config change' },
  { resourceName: 'storage-datalake-01', resourceType: 'Storage Account', lastWeekCost: 1600, thisWeekCost: 2720, deltaPct: 70, deltaAbsolute: 1120, causeTag: 'storage growth' },
  { resourceName: 'vm-dev-gpu-02', resourceType: 'Virtual Machine', lastWeekCost: 960, thisWeekCost: 1920, deltaPct: 100, deltaAbsolute: 960, causeTag: 'idle but running' },
  { resourceName: 'redis-session-cache', resourceType: 'Azure Cache for Redis', lastWeekCost: 480, thisWeekCost: 1350, deltaPct: 181, deltaAbsolute: 870, causeTag: 'scale-out' },
  { resourceName: 'app-svc-frontend', resourceType: 'App Service', lastWeekCost: 620, thisWeekCost: 1400, deltaPct: 126, deltaAbsolute: 780, causeTag: 'scale-out' },
  { resourceName: 'log-analytics-ws', resourceType: 'Log Analytics', lastWeekCost: 1100, thisWeekCost: 1820, deltaPct: 65, deltaAbsolute: 720, causeTag: 'storage growth' },
  { resourceName: 'container-app-worker', resourceType: 'Container Apps', lastWeekCost: 0, thisWeekCost: 680, deltaPct: 100, deltaAbsolute: 680, causeTag: 'new deployment' },
  { resourceName: 'vnet-hub-firewall', resourceType: 'Azure Firewall', lastWeekCost: 920, thisWeekCost: 1520, deltaPct: 65, deltaAbsolute: 600, causeTag: 'traffic spike' },
  { resourceName: 'disk-snapshot-archive', resourceType: 'Managed Disk', lastWeekCost: 200, thisWeekCost: 740, deltaPct: 270, deltaAbsolute: 540, causeTag: 'storage growth' },
];

// ─── Anomaly Timeline ───
export type AnomalyType = 'deployment' | 'config change' | 'traffic spike';

export interface AnomalyEvent {
  date: string; // ISO date
  label: string;
  cost: number;
  type: AnomalyType;
  detail: string;
}

export const budgetThreshold = 45000;

export interface DailyCost {
  date: string;
  cost: number;
}

function generateDailyCosts(): DailyCost[] {
  const costs: DailyCost[] = [];
  const base = 38000;
  for (let i = 29; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const iso = d.toISOString().split('T')[0];
    let cost = base + Math.sin(i * 0.5) * 3000 + (i < 10 ? (10 - i) * 800 : 0);
    if (i === 5) cost = 52000;
    if (i === 12) cost = 48500;
    if (i === 20) cost = 47000;
    costs.push({ date: iso, cost: Math.round(cost) });
  }
  return costs;
}

export const dailyCosts: DailyCost[] = generateDailyCosts();

export const anomalyEvents: AnomalyEvent[] = [
  {
    date: dailyCosts[9].date,
    label: 'ML cluster scale-out',
    cost: dailyCosts[9].cost,
    type: 'deployment',
    detail: 'ml-gpu-cluster-01 scaled from 2 to 6 nodes via autoscaler. Triggered by training job batch-train-v4.2.',
  },
  {
    date: dailyCosts[17].date,
    label: 'API gateway traffic surge',
    cost: dailyCosts[17].cost,
    type: 'traffic spike',
    detail: 'api-gateway-prod processed 3.2M requests (vs 1.1M avg). Caused by partner integration load test without prior notice.',
  },
  {
    date: dailyCosts[24].date,
    label: 'SQL pool tier upgrade',
    cost: dailyCosts[24].cost,
    type: 'config change',
    detail: 'sql-analytics-pool upgraded from DW200c to DW500c by user admin@contoso.com. No corresponding scale-down scheduled.',
  },
  {
    date: dailyCosts[27].date,
    label: 'New staging VMs deployed',
    cost: dailyCosts[27].cost,
    type: 'deployment',
    detail: 'vm-staging-batch-01 and container-app-worker deployed via ARM template release-2026.02.15. Auto-shutdown not configured.',
  },
];

// ─── Recommendations ───
export interface Recommendation {
  id: string;
  title: string;
  description: string;
  monthlySavings: number;
  affectedResource: string;
  impact: 'high' | 'medium' | 'low';
}

export const recommendations: Recommendation[] = [
  {
    id: 'rec-1',
    title: 'Shut down idle GPU VM',
    description: 'vm-dev-gpu-02 has had <2% CPU utilization for 12 days. Configure auto-shutdown or deallocate to stop charges.',
    monthlySavings: 3840,
    affectedResource: 'vm-dev-gpu-02',
    impact: 'high',
  },
  {
    id: 'rec-2',
    title: 'Right-size SQL analytics pool',
    description: 'sql-analytics-pool is running at DW500c but query workload fits DW200c. Scale down during off-peak or enable auto-pause.',
    monthlySavings: 5040,
    affectedResource: 'sql-analytics-pool',
    impact: 'high',
  },
  {
    id: 'rec-3',
    title: 'Enable auto-shutdown on staging VMs',
    description: 'vm-staging-batch-01 runs 24/7 but is only used during business hours. Enable auto-shutdown 7PM–7AM to save ~50%.',
    monthlySavings: 2880,
    affectedResource: 'vm-staging-batch-01',
    impact: 'medium',
  },
  {
    id: 'rec-4',
    title: 'Move cold storage to Archive tier',
    description: 'storage-datalake-01 has 2.4 TB of data not accessed in 90+ days. Move to Archive tier for 80% cost reduction on those blobs.',
    monthlySavings: 1920,
    affectedResource: 'storage-datalake-01',
    impact: 'medium',
  },
  {
    id: 'rec-5',
    title: 'Set Log Analytics daily cap',
    description: 'log-analytics-ws ingestion jumped 65% this week with no cap configured. Set a daily cap at projected baseline + 20% buffer.',
    monthlySavings: 1440,
    affectedResource: 'log-analytics-ws',
    impact: 'low',
  },
];
