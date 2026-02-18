// @ts-nocheck
/**
 * Data & configuration for Azure Storage Account overview page.
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

export interface UsageSegment {
  label: string;
  value: number;       // in GiB
  color: string;
}

export interface CostData {
  currentMonth: number;
  previousMonth: number;
  currency: string;
  billingPeriod: string;
  breakdown: { label: string; amount: number }[];
}

export interface AccessKey {
  name: string;
  value: string;
  connectionString: string;
  createdDate: string;      // ISO date
}

// ─── Resource identity ───
export const resourceName = 'contosostorageprod';
export const resourceType = 'Storage account';

export const copilotSuggestions = [
  'Show me storage usage trends over the last 30 days',
  'Are there any unused containers I can delete?',
  'When should I rotate my access keys?',
];

// ─── Essentials ───
export const essentialsData: EssentialsRow[] = [
  { label: 'Resource group', value: 'rg-contoso-prod', href: '#' },
  { label: 'Status', value: 'Available', status: 'success' },
  { label: 'Location', value: 'East US 2' },
  { label: 'Subscription', value: 'Contoso Production', href: '#' },
  { label: 'Subscription ID', value: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' },
  { label: 'Performance', value: 'Standard' },
  { label: 'Replication', value: 'Read-access geo-redundant storage (RA-GRS)' },
  { label: 'Account kind', value: 'StorageV2 (general purpose v2)' },
  { label: 'Primary endpoint', value: 'contosostorageprod.blob.core.windows.net', href: '#' },
  { label: 'Tags', value: 'env:production, team:platform, cost-center:engineering', href: '#' },
];

// ─── Usage breakdown ───
export const totalUsageGiB = 487.3;
export const usageSegments: UsageSegment[] = [
  { label: 'Blob storage',  value: 312.5, color: 'var(--brand-foreground-link)' },
  { label: 'File shares',   value: 98.2,  color: 'var(--status-success-foreground1)' },
  { label: 'Table storage', value: 52.8,  color: 'var(--status-warning-foreground1)' },
  { label: 'Queue storage', value: 23.8,  color: '#8764b8' },
];

// ─── Cost data ───
export const costData: CostData = {
  currentMonth: 127.43,
  previousMonth: 118.91,
  currency: 'USD',
  billingPeriod: 'Feb 1 – Feb 18, 2026',
  breakdown: [
    { label: 'Blob storage', amount: 82.15 },
    { label: 'File shares', amount: 24.30 },
    { label: 'Bandwidth', amount: 12.48 },
    { label: 'Operations', amount: 8.50 },
  ],
};

// ─── Access keys ───
// Key1 was created 120 days ago (stale → should warn)
// Key2 was created 45 days ago (ok)
export const accessKeys: AccessKey[] = [
  {
    name: 'key1',
    value: 'Eby8vdM02xNOcqFlqUwJPLlmEtlCDXJ1OUzFT50uSRZ6IFsuFq2UVErCz4I6tq/K1SZFPTOtr/KBHBeksoGMGw==',
    connectionString: 'DefaultEndpointsProtocol=https;AccountName=contosostorageprod;AccountKey=Eby8vdM02xNOcqFlqUwJPLlmEtlCDXJ1OUzFT50uSRZ6IFsuFq2UVErCz4I6tq/K1SZFPTOtr/KBHBeksoGMGw==;EndpointSuffix=core.windows.net',
    createdDate: '2025-10-21',
  },
  {
    name: 'key2',
    value: 'nZhG3bF4VwxR8kLmD2qJcY0pTuA5sE7iO9gKfHjM1dW6rXyCzNlBaQvS+Ub/IRPT4oE8mFx3w==',
    connectionString: 'DefaultEndpointsProtocol=https;AccountName=contosostorageprod;AccountKey=nZhG3bF4VwxR8kLmD2qJcY0pTuA5sE7iO9gKfHjM1dW6rXyCzNlBaQvS+Ub/IRPT4oE8mFx3w==;EndpointSuffix=core.windows.net',
    createdDate: '2026-01-05',
  },
];

/** Number of days since a given ISO date string */
export function daysSince(isoDate: string): number {
  const now = new Date('2026-02-18');
  const then = new Date(isoDate);
  return Math.floor((now.getTime() - then.getTime()) / (1000 * 60 * 60 * 24));
}

export const KEY_AGE_WARNING_DAYS = 90;

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
    heading: 'Data storage',
    items: [
      {
        label: 'Containers',
        icon: 'https://api.iconify.design/fluent:box-24-regular.svg',
        iconFilled: 'https://api.iconify.design/fluent:box-24-filled.svg',
      },
      {
        label: 'File shares',
        icon: 'https://api.iconify.design/fluent:folder-24-regular.svg',
        iconFilled: 'https://api.iconify.design/fluent:folder-24-filled.svg',
      },
      {
        label: 'Queues',
        icon: 'https://api.iconify.design/fluent:text-align-left-24-regular.svg',
        iconFilled: 'https://api.iconify.design/fluent:text-align-left-24-filled.svg',
      },
      {
        label: 'Tables',
        icon: 'https://api.iconify.design/fluent:table-24-regular.svg',
        iconFilled: 'https://api.iconify.design/fluent:table-24-filled.svg',
      },
    ],
  },
  {
    heading: 'Security + networking',
    items: [
      {
        label: 'Access keys',
        icon: 'https://api.iconify.design/fluent:key-24-regular.svg',
        iconFilled: 'https://api.iconify.design/fluent:key-24-filled.svg',
      },
      {
        label: 'Shared access signature',
        icon: 'https://api.iconify.design/fluent:share-24-regular.svg',
        iconFilled: 'https://api.iconify.design/fluent:share-24-filled.svg',
      },
      {
        label: 'Networking',
        icon: 'https://api.iconify.design/fluent:globe-24-regular.svg',
        iconFilled: 'https://api.iconify.design/fluent:globe-24-filled.svg',
      },
      {
        label: 'Encryption',
        icon: 'https://api.iconify.design/fluent:lock-closed-24-regular.svg',
        iconFilled: 'https://api.iconify.design/fluent:lock-closed-24-filled.svg',
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
    ],
  },
  {
    heading: 'Settings',
    items: [
      {
        label: 'Configuration',
        icon: 'https://api.iconify.design/fluent:settings-24-regular.svg',
        iconFilled: 'https://api.iconify.design/fluent:settings-24-filled.svg',
      },
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
    ],
  },
];
