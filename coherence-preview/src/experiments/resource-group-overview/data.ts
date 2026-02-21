// @ts-nocheck
/**
 * Data & configuration for Azure Resource Group Overview page.
 */

export interface NavItemConfig {
  label: string;
  icon: string;
  iconFilled: string;
  selected?: boolean;
}

export interface NavSectionConfig {
  heading?: string;
  items: NavItemConfig[];
}

export interface EssentialsRow {
  label: string;
  value: string;
  href?: string;
  status?: 'success' | 'warning' | 'error';
}

export interface ResourceCount {
  type: string;
  count: number;
  icon: string;
  color: string;
}

export interface CostSegment {
  label: string;
  amount: number;
  color: string;
}

export interface ActivityEntry {
  id: string;
  timestamp: string;
  user: string;
  operation: string;
  operationType: 'create' | 'delete' | 'modify' | 'read';
  resource: string;
  resourceType: string;
  status: 'Succeeded' | 'Failed' | 'In Progress';
}

export interface TagComplianceEntry {
  resource: string;
  resourceType: string;
  environment: boolean;
  owner: boolean;
  costCenter: boolean;
}

// ─── Resource identity ───
export const resourceGroupName = 'rg-contoso-prod';
export const resourceType = 'Resource group';
export const subscriptionName = 'Contoso Production';
export const location = 'East US 2';

export const copilotSuggestions = [
  'Which resources are missing required tags?',
  'Show me cost trends for this resource group',
  'What resources were modified in the last 7 days?',
];

// ─── Essentials ───
export const essentialsData: EssentialsRow[] = [
  { label: 'Subscription', value: subscriptionName, href: '#' },
  { label: 'Status', value: 'Active', status: 'success' },
  { label: 'Location', value: location },
  { label: 'Subscription ID', value: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' },
  { label: 'Deployments', value: '47 succeeded', href: '#' },
  { label: 'Tags', value: 'env:production, team:platform, cost-center:engineering', href: '#' },
];

// ─── Resource counts by type ───
export const resourceCounts: ResourceCount[] = [
  { type: 'Virtual machines', count: 8, icon: 'https://api.iconify.design/fluent:desktop-24-regular.svg', color: 'var(--brand-foreground-link)' },
  { type: 'Storage accounts', count: 4, icon: 'https://api.iconify.design/fluent:database-24-regular.svg', color: 'var(--status-success-foreground1)' },
  { type: 'SQL databases', count: 3, icon: 'https://api.iconify.design/fluent:server-24-regular.svg', color: '#8764b8' },
  { type: 'App Services', count: 5, icon: 'https://api.iconify.design/fluent:globe-24-regular.svg', color: 'var(--status-warning-foreground1)' },
  { type: 'Key vaults', count: 2, icon: 'https://api.iconify.design/fluent:key-24-regular.svg', color: '#da3b01' },
  { type: 'Network interfaces', count: 8, icon: 'https://api.iconify.design/fluent:plug-connected-24-regular.svg', color: '#0078d4' },
  { type: 'Disks', count: 12, icon: 'https://api.iconify.design/fluent:hard-drive-24-regular.svg', color: '#498205' },
  { type: 'Public IP addresses', count: 3, icon: 'https://api.iconify.design/fluent:arrow-routing-24-regular.svg', color: '#ca5010' },
];

export const totalResourceCount = resourceCounts.reduce((sum, r) => sum + r.count, 0);

// ─── Cost breakdown ───
export const totalCost = 4827.56;
export const costCurrency = 'USD';
export const costPeriod = 'Feb 1 – Feb 20, 2026';
export const costSegments: CostSegment[] = [
  { label: 'Virtual machines', amount: 2145.30, color: 'var(--brand-foreground-link)' },
  { label: 'Storage accounts', amount: 892.18, color: 'var(--status-success-foreground1)' },
  { label: 'SQL databases', amount: 1024.50, color: '#8764b8' },
  { label: 'App Services', amount: 485.22, color: 'var(--status-warning-foreground1)' },
  { label: 'Other', amount: 280.36, color: 'var(--neutral-foreground3)' },
];

// ─── Recent activity log ───
export const activityLog: ActivityEntry[] = [
  {
    id: '1',
    timestamp: '2026-02-20T14:32:00Z',
    user: 'alex.britez@contoso.com',
    operation: 'Update Virtual Machine',
    operationType: 'modify',
    resource: 'vm-prod-web-01',
    resourceType: 'Virtual machine',
    status: 'Succeeded',
  },
  {
    id: '2',
    timestamp: '2026-02-20T13:15:00Z',
    user: 'sarah.chen@contoso.com',
    operation: 'Create Storage Account',
    operationType: 'create',
    resource: 'stcontosologsprod',
    resourceType: 'Storage account',
    status: 'Succeeded',
  },
  {
    id: '3',
    timestamp: '2026-02-20T11:48:00Z',
    user: 'james.wilson@contoso.com',
    operation: 'Delete Public IP Address',
    operationType: 'delete',
    resource: 'pip-legacy-api',
    resourceType: 'Public IP address',
    status: 'Succeeded',
  },
  {
    id: '4',
    timestamp: '2026-02-20T10:22:00Z',
    user: 'alex.britez@contoso.com',
    operation: 'Update App Service',
    operationType: 'modify',
    resource: 'app-contoso-api',
    resourceType: 'App Service',
    status: 'Failed',
  },
  {
    id: '5',
    timestamp: '2026-02-19T16:55:00Z',
    user: 'maria.garcia@contoso.com',
    operation: 'Create SQL Database',
    operationType: 'create',
    resource: 'sqldb-analytics-prod',
    resourceType: 'SQL database',
    status: 'Succeeded',
  },
  {
    id: '6',
    timestamp: '2026-02-19T14:10:00Z',
    user: 'sarah.chen@contoso.com',
    operation: 'Update Key Vault Secret',
    operationType: 'modify',
    resource: 'kv-contoso-prod',
    resourceType: 'Key vault',
    status: 'Succeeded',
  },
  {
    id: '7',
    timestamp: '2026-02-19T09:30:00Z',
    user: 'james.wilson@contoso.com',
    operation: 'Create Virtual Machine',
    operationType: 'create',
    resource: 'vm-prod-worker-04',
    resourceType: 'Virtual machine',
    status: 'In Progress',
  },
  {
    id: '8',
    timestamp: '2026-02-18T17:45:00Z',
    user: 'alex.britez@contoso.com',
    operation: 'Update Network Security Group',
    operationType: 'modify',
    resource: 'nsg-prod-vnet',
    resourceType: 'Network security group',
    status: 'Succeeded',
  },
];

// ─── Tag compliance ───
export const requiredTags = ['environment', 'owner', 'cost-center'];

export const tagComplianceData: TagComplianceEntry[] = [
  { resource: 'vm-prod-web-01', resourceType: 'Virtual machine', environment: true, owner: true, costCenter: true },
  { resource: 'vm-prod-web-02', resourceType: 'Virtual machine', environment: true, owner: true, costCenter: false },
  { resource: 'vm-prod-worker-01', resourceType: 'Virtual machine', environment: true, owner: false, costCenter: false },
  { resource: 'stcontosoprod', resourceType: 'Storage account', environment: true, owner: true, costCenter: true },
  { resource: 'stcontosologsprod', resourceType: 'Storage account', environment: false, owner: false, costCenter: false },
  { resource: 'sqldb-contoso-main', resourceType: 'SQL database', environment: true, owner: true, costCenter: true },
  { resource: 'sqldb-analytics-prod', resourceType: 'SQL database', environment: true, owner: true, costCenter: false },
  { resource: 'app-contoso-api', resourceType: 'App Service', environment: true, owner: true, costCenter: true },
  { resource: 'app-contoso-web', resourceType: 'App Service', environment: true, owner: false, costCenter: true },
  { resource: 'kv-contoso-prod', resourceType: 'Key vault', environment: true, owner: true, costCenter: true },
  { resource: 'kv-contoso-staging', resourceType: 'Key vault', environment: false, owner: true, costCenter: false },
  { resource: 'vm-prod-worker-04', resourceType: 'Virtual machine', environment: false, owner: false, costCenter: false },
];

export function getComplianceStats() {
  const total = tagComplianceData.length;
  const fullyCompliant = tagComplianceData.filter(
    (r) => r.environment && r.owner && r.costCenter
  ).length;
  const pct = Math.round((fullyCompliant / total) * 100);
  return { total, fullyCompliant, nonCompliant: total - fullyCompliant, pct };
}

export function formatTimestamp(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) +
    ', ' +
    d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
}

// ─── Navigation ───
export const navSections: NavSectionConfig[] = [
  {
    items: [
      {
        label: 'Overview',
        icon: 'https://api.iconify.design/fluent:home-24-regular.svg',
        iconFilled: 'https://api.iconify.design/fluent:home-24-filled.svg',
        selected: true,
      },
      {
        label: 'Activity log',
        icon: 'https://api.iconify.design/fluent:document-24-regular.svg',
        iconFilled: 'https://api.iconify.design/fluent:document-24-filled.svg',
      },
      {
        label: 'Access control (IAM)',
        icon: 'https://api.iconify.design/fluent:person-24-regular.svg',
        iconFilled: 'https://api.iconify.design/fluent:person-24-filled.svg',
      },
      {
        label: 'Tags',
        icon: 'https://api.iconify.design/fluent:tag-24-regular.svg',
        iconFilled: 'https://api.iconify.design/fluent:tag-24-filled.svg',
      },
      {
        label: 'Events',
        icon: 'https://api.iconify.design/fluent:calendar-24-regular.svg',
        iconFilled: 'https://api.iconify.design/fluent:calendar-24-filled.svg',
      },
    ],
  },
  {
    heading: 'Resource management',
    items: [
      {
        label: 'Resources',
        icon: 'https://api.iconify.design/fluent:grid-24-regular.svg',
        iconFilled: 'https://api.iconify.design/fluent:grid-24-filled.svg',
      },
      {
        label: 'Deployments',
        icon: 'https://api.iconify.design/fluent:rocket-24-regular.svg',
        iconFilled: 'https://api.iconify.design/fluent:rocket-24-filled.svg',
      },
      {
        label: 'Policies',
        icon: 'https://api.iconify.design/fluent:shield-24-regular.svg',
        iconFilled: 'https://api.iconify.design/fluent:shield-24-filled.svg',
      },
    ],
  },
  {
    heading: 'Cost management',
    items: [
      {
        label: 'Cost analysis',
        icon: 'https://api.iconify.design/fluent:data-pie-24-regular.svg',
        iconFilled: 'https://api.iconify.design/fluent:data-pie-24-filled.svg',
      },
      {
        label: 'Budgets',
        icon: 'https://api.iconify.design/fluent:wallet-24-regular.svg',
        iconFilled: 'https://api.iconify.design/fluent:wallet-24-filled.svg',
      },
      {
        label: 'Advisor recommendations',
        icon: 'https://api.iconify.design/fluent:lightbulb-24-regular.svg',
        iconFilled: 'https://api.iconify.design/fluent:lightbulb-24-filled.svg',
      },
    ],
  },
  {
    heading: 'Settings',
    items: [
      {
        label: 'Properties',
        icon: 'https://api.iconify.design/fluent:info-24-regular.svg',
        iconFilled: 'https://api.iconify.design/fluent:info-24-filled.svg',
      },
      {
        label: 'Locks',
        icon: 'https://api.iconify.design/fluent:lock-closed-24-regular.svg',
        iconFilled: 'https://api.iconify.design/fluent:lock-closed-24-filled.svg',
      },
      {
        label: 'Export template',
        icon: 'https://api.iconify.design/fluent:arrow-download-24-regular.svg',
        iconFilled: 'https://api.iconify.design/fluent:arrow-download-24-filled.svg',
      },
    ],
  },
];
