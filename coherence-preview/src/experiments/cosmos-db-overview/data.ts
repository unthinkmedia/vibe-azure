// @ts-nocheck
/**
 * Data & configuration for Azure Cosmos DB account overview page.
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

export interface RuGaugeData {
  currentRUs: number;
  provisionedRUs: number;
  warningThreshold: number;  // percentage
  criticalThreshold: number; // percentage
}

export interface PartitionKeyData {
  partitionKey: string;
  ruPercent: number; // 0–100
  storageGB: number;
  documentCount: string;
}

export interface GlobalRegion {
  name: string;
  code: string;
  role: 'Read/Write' | 'Read';
  status: 'Online' | 'Initializing' | 'Offline';
  readLatencyMs: number;
  writeLatencyMs: number | null; // null for read-only
  /** approximate x/y on a 480x220 map (percentage) */
  x: number;
  y: number;
}

export interface ConsistencyConfig {
  current: 'Strong' | 'Bounded Staleness' | 'Session' | 'Consistent Prefix' | 'Eventual';
  recommended: 'Strong' | 'Bounded Staleness' | 'Session' | 'Consistent Prefix' | 'Eventual';
  description: Record<string, string>;
}

export interface RecentOperation {
  timestamp: string;
  operation: string;
  database: string;
  container: string;
  ruCharge: number;
  latencyMs: number;
  statusCode: number;
  partitionKey: string;
}

// ─── Resource identity ───
export const resourceName = 'contoso-cosmos-prod';
export const resourceType = 'Azure Cosmos DB account';

export const copilotSuggestions = [
  'Why are my RU/s spiking?',
  'Which partition keys are causing hot partitions?',
  'Recommend a consistency level for my workload',
];

// ─── Essentials ───
export const essentialsData: EssentialsRow[] = [
  { label: 'Resource group', value: 'rg-contoso-prod', href: '#' },
  { label: 'Status', value: 'Online', status: 'success' },
  { label: 'Location', value: 'East US' },
  { label: 'Subscription', value: 'Contoso Production', href: '#' },
  { label: 'Subscription ID', value: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' },
  { label: 'URI', value: 'https://contoso-cosmos-prod.documents.azure.com:443/', href: '#' },
  { label: 'API', value: 'NoSQL' },
  { label: 'Capacity mode', value: 'Provisioned throughput' },
  { label: 'Backup policy', value: 'Continuous (7 days)' },
  { label: 'Tags', value: 'env:production, team:data, cost-center:eng', href: '#' },
];

// ─── RU/s Gauge ───
export const ruGaugeData: RuGaugeData = {
  currentRUs: 3200,
  provisionedRUs: 4000,
  warningThreshold: 70,
  criticalThreshold: 90,
};

// ─── Partition Key Distribution ───
export const partitionKeys: PartitionKeyData[] = [
  { partitionKey: '/tenantId=contoso', ruPercent: 82, storageGB: 14.2, documentCount: '2.4M' },
  { partitionKey: '/tenantId=fabrikam', ruPercent: 65, storageGB: 9.8, documentCount: '1.7M' },
  { partitionKey: '/tenantId=northwind', ruPercent: 41, storageGB: 6.1, documentCount: '980K' },
  { partitionKey: '/tenantId=adventure', ruPercent: 28, storageGB: 3.4, documentCount: '520K' },
  { partitionKey: '/tenantId=tailspin', ruPercent: 15, storageGB: 1.9, documentCount: '310K' },
  { partitionKey: '/tenantId=woodgrove', ruPercent: 8, storageGB: 0.7, documentCount: '125K' },
];

// ─── Global Distribution ───
export const globalRegions: GlobalRegion[] = [
  { name: 'East US', code: 'eastus', role: 'Read/Write', status: 'Online', readLatencyMs: 2, writeLatencyMs: 4, x: 26, y: 40 },
  { name: 'West Europe', code: 'westeurope', role: 'Read', status: 'Online', readLatencyMs: 18, writeLatencyMs: null, x: 48, y: 30 },
  { name: 'Southeast Asia', code: 'southeastasia', role: 'Read', status: 'Online', readLatencyMs: 32, writeLatencyMs: null, x: 76, y: 55 },
  { name: 'Japan East', code: 'japaneast', role: 'Read', status: 'Online', readLatencyMs: 45, writeLatencyMs: null, x: 85, y: 38 },
  { name: 'Brazil South', code: 'brazilsouth', role: 'Read', status: 'Initializing', readLatencyMs: 68, writeLatencyMs: null, x: 32, y: 72 },
];

// ─── Consistency Level ───
export const consistencyConfig: ConsistencyConfig = {
  current: 'Session',
  recommended: 'Session',
  description: {
    'Strong': 'Reads guaranteed to return most recent committed write. Highest latency, lowest throughput.',
    'Bounded Staleness': 'Reads lag behind writes by at most K versions or T time interval.',
    'Session': 'Within a session, reads are guaranteed to honor read-your-writes. Best balance for most workloads.',
    'Consistent Prefix': 'Updates returned in order, but may lag behind writes. Never see out-of-order reads.',
    'Eventual': 'No ordering guarantee. Lowest latency, highest throughput. Reads may return stale data.',
  },
};

// ─── Recent Operations ───
export const recentOperations: RecentOperation[] = [
  { timestamp: '2026-02-18T21:14:32Z', operation: 'Query', database: 'orders-db', container: 'orders', ruCharge: 42.8, latencyMs: 6, statusCode: 200, partitionKey: '/tenantId=contoso' },
  { timestamp: '2026-02-18T21:13:55Z', operation: 'Upsert', database: 'orders-db', container: 'orders', ruCharge: 12.4, latencyMs: 8, statusCode: 200, partitionKey: '/tenantId=fabrikam' },
  { timestamp: '2026-02-18T21:12:18Z', operation: 'Read', database: 'catalog-db', container: 'products', ruCharge: 1.0, latencyMs: 2, statusCode: 200, partitionKey: '/tenantId=contoso' },
  { timestamp: '2026-02-18T21:10:42Z', operation: 'Query', database: 'orders-db', container: 'customers', ruCharge: 156.3, latencyMs: 34, statusCode: 200, partitionKey: '/tenantId=contoso' },
  { timestamp: '2026-02-18T21:09:11Z', operation: 'Delete', database: 'staging-db', container: 'temp-events', ruCharge: 8.2, latencyMs: 5, statusCode: 204, partitionKey: '/tenantId=northwind' },
  { timestamp: '2026-02-18T21:07:03Z', operation: 'Create', database: 'orders-db', container: 'orders', ruCharge: 10.6, latencyMs: 7, statusCode: 201, partitionKey: '/tenantId=adventure' },
  { timestamp: '2026-02-18T21:05:48Z', operation: 'Query', database: 'catalog-db', container: 'products', ruCharge: 89.1, latencyMs: 22, statusCode: 200, partitionKey: '/tenantId=fabrikam' },
  { timestamp: '2026-02-18T21:03:15Z', operation: 'Read', database: 'orders-db', container: 'orders', ruCharge: 1.0, latencyMs: 2, statusCode: 429, partitionKey: '/tenantId=contoso' },
];

export function formatTimestamp(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
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
        label: 'Diagnose and solve problems',
        icon: 'https://api.iconify.design/fluent:stethoscope-24-regular.svg',
        iconFilled: 'https://api.iconify.design/fluent:stethoscope-24-filled.svg',
      },
    ],
  },
  {
    heading: 'Data Explorer',
    items: [
      {
        label: 'Data Explorer',
        icon: 'https://api.iconify.design/fluent:database-search-24-regular.svg',
        iconFilled: 'https://api.iconify.design/fluent:database-search-24-filled.svg',
      },
      {
        label: 'Notebooks',
        icon: 'https://api.iconify.design/fluent:notebook-24-regular.svg',
        iconFilled: 'https://api.iconify.design/fluent:notebook-24-filled.svg',
      },
    ],
  },
  {
    heading: 'Settings',
    items: [
      {
        label: 'Replicate data globally',
        icon: 'https://api.iconify.design/fluent:globe-24-regular.svg',
        iconFilled: 'https://api.iconify.design/fluent:globe-24-filled.svg',
      },
      {
        label: 'Default consistency',
        icon: 'https://api.iconify.design/fluent:arrow-sync-24-regular.svg',
        iconFilled: 'https://api.iconify.design/fluent:arrow-sync-24-filled.svg',
      },
      {
        label: 'Backup & Restore',
        icon: 'https://api.iconify.design/fluent:cloud-backup-24-regular.svg',
        iconFilled: 'https://api.iconify.design/fluent:cloud-backup-24-filled.svg',
      },
      {
        label: 'Networking',
        icon: 'https://api.iconify.design/fluent:globe-24-regular.svg',
        iconFilled: 'https://api.iconify.design/fluent:globe-24-filled.svg',
      },
      {
        label: 'Keys',
        icon: 'https://api.iconify.design/fluent:key-24-regular.svg',
        iconFilled: 'https://api.iconify.design/fluent:key-24-filled.svg',
      },
    ],
  },
  {
    heading: 'Monitoring',
    items: [
      {
        label: 'Metrics',
        icon: 'https://api.iconify.design/fluent:data-bar-vertical-24-regular.svg',
        iconFilled: 'https://api.iconify.design/fluent:data-bar-vertical-24-filled.svg',
      },
      {
        label: 'Alerts',
        icon: 'https://api.iconify.design/fluent:alert-24-regular.svg',
        iconFilled: 'https://api.iconify.design/fluent:alert-24-filled.svg',
      },
      {
        label: 'Diagnostic settings',
        icon: 'https://api.iconify.design/fluent:stethoscope-24-regular.svg',
        iconFilled: 'https://api.iconify.design/fluent:stethoscope-24-filled.svg',
      },
      {
        label: 'Insights',
        icon: 'https://api.iconify.design/fluent:lightbulb-24-regular.svg',
        iconFilled: 'https://api.iconify.design/fluent:lightbulb-24-filled.svg',
      },
    ],
  },
  {
    heading: 'Configuration',
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
