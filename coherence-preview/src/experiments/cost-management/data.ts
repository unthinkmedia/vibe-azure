/**
 * Mock data for Azure Cost Management + Billing Dashboard
 */

/* ─── Cost Breakdown by Service ─── */
export interface ServiceCost {
  name: string;
  cost: number;
  color: string;
}

export const serviceCosts: ServiceCost[] = [
  { name: 'Compute',     cost: 4_280, color: '#0078D4' },
  { name: 'Storage',     cost: 1_650, color: '#50E6FF' },
  { name: 'Networking',  cost: 1_120, color: '#773ADC' },
  { name: 'Databases',   cost: 2_340, color: '#008575' },
  { name: 'Other',       cost: 610,   color: '#D83B01' },
];

export const totalSpend = serviceCosts.reduce((s, c) => s + c.cost, 0);

/* ─── Daily Spend Trend (current billing period) ─── */
export interface DailySpend {
  day: number;   // 1–31
  label: string; // "Mar 1", "Mar 2" …
  amount: number;
}

function generateDailySpend(): DailySpend[] {
  const base = 320;
  const days: DailySpend[] = [];
  for (let d = 1; d <= 28; d++) {
    const jitter = Math.sin(d * 0.7) * 60 + Math.cos(d * 1.3) * 40;
    const spike = d === 14 ? 180 : d === 22 ? 150 : 0;
    days.push({
      day: d,
      label: `Mar ${d}`,
      amount: Math.round(base + jitter + spike),
    });
  }
  return days;
}

export const dailySpend: DailySpend[] = generateDailySpend();
export const budgetThresholdPerDay = 360; // budget line

/* ─── Resource Group Table ─── */
export interface ResourceGroupRow {
  name: string;
  cost: number;
  lastMonthCost: number;
  trend: number[];   // 7-day sparkline values
  anomaly?: boolean;
}

export const resourceGroups: ResourceGroupRow[] = [
  { name: 'rg-production-eastus',      cost: 3_420, lastMonthCost: 3_180, trend: [280, 310, 290, 320, 360, 380, 410], anomaly: true },
  { name: 'rg-staging-westus2',        cost: 1_960, lastMonthCost: 2_100, trend: [180, 190, 175, 185, 170, 165, 160] },
  { name: 'rg-devtest-centralus',      cost: 1_480, lastMonthCost: 1_250, trend: [120, 130, 150, 160, 180, 200, 220], anomaly: true },
  { name: 'rg-data-platform',          cost: 1_340, lastMonthCost: 1_290, trend: [110, 115, 120, 118, 122, 125, 130] },
  { name: 'rg-shared-services',        cost: 890,   lastMonthCost: 870,   trend: [75, 78, 80, 82, 80, 85, 88] },
  { name: 'rg-ml-workspace',           cost: 560,   lastMonthCost: 420,   trend: [40, 50, 60, 70, 80, 90, 100], anomaly: true },
  { name: 'rg-backup-recovery',        cost: 350,   lastMonthCost: 340,   trend: [28, 30, 29, 31, 30, 32, 33] },
];

/* ─── Budget Alerts ─── */
export interface BudgetAlert {
  name: string;
  spent: number;
  budget: number;
  status: 'success' | 'warning' | 'danger';
}

export const budgetAlerts: BudgetAlert[] = [
  { name: 'Dev/Test',    spent: 390,   budget: 500,   status: 'warning' },
  { name: 'Production',  spent: 1_840, budget: 2_000, status: 'danger' },
  { name: 'Shared Infra', spent: 320,  budget: 800,   status: 'success' },
];

/* ─── Advisor Recommendations ─── */
export interface Recommendation {
  title: string;
  description: string;
  savings: string;
  icon: string; // CuiIcon name
}

export const recommendations: Recommendation[] = [
  {
    title: 'Purchase reserved instances',
    description: '3 VMs in rg-production-eastus run 24/7 — switch to 1-year reserved to save up to 40%.',
    savings: '~$680/mo',
    icon: 'savings',
  },
  {
    title: 'Shut down idle resources',
    description: '2 VMs in rg-devtest-centralus avg <5% CPU over 14 days. Deallocate off-hours.',
    savings: '~$220/mo',
    icon: 'arrow-trending-down',
  },
  {
    title: 'Delete orphaned disks',
    description: '4 unattached managed disks (128 GB total) in rg-staging-westus2.',
    savings: '~$45/mo',
    icon: 'delete',
  },
];

/* ─── Copilot Suggestions ─── */
export const copilotSuggestions = [
  'Where are my biggest cost increases?',
  'Which resources can I shut down off-hours?',
  'Forecast my spend for this month',
];
