// @ts-nocheck
/**
 * Data & configuration for Azure SQL Database overview page.
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

export interface DtuData {
  currentPercent: number;
  limit: number;
  used: number;
  warningThreshold: number;  // percentage
  criticalThreshold: number; // percentage
}

export interface ConnectionStats {
  active: number;
  trend: 'up' | 'down' | 'stable';
  trendPercent: number;
  peak24h: number;
  avg24h: number;
}

export interface GeoReplica {
  region: string;
  role: 'Primary' | 'Secondary' | 'Geo-Secondary';
  status: 'Online' | 'Seeding' | 'Suspended' | 'Offline';
  replicationLag: string;
  lastSync: string;
}

export interface AuditLogEntry {
  timestamp: string;
  action: string;
  principal: string;
  clientIp: string;
  result: 'Success' | 'Failure';
  statement: string;
}

// ─── Resource identity ───
export const resourceName = 'contoso-sqldb-prod';
export const resourceType = 'SQL database';

export const copilotSuggestions = [
  'Why is DTU usage spiking?',
  'Show me the slowest queries from the last hour',
  'Are there any failed login attempts today?',
];

// ─── Essentials ───
export const essentialsData: EssentialsRow[] = [
  { label: 'Resource group', value: 'rg-contoso-prod', href: '#' },
  { label: 'Status', value: 'Online', status: 'success' },
  { label: 'Location', value: 'East US' },
  { label: 'Subscription', value: 'Contoso Production', href: '#' },
  { label: 'Subscription ID', value: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' },
  { label: 'Server name', value: 'contoso-sql-server.database.windows.net', href: '#' },
  { label: 'Pricing tier', value: 'Standard S3 (100 DTUs)' },
  { label: 'Earliest restore point', value: 'Feb 11, 2026 3:14 AM' },
  { label: 'Elastic pool', value: 'None' },
  { label: 'Tags', value: 'env:production, team:data, cost-center:engineering', href: '#' },
];

// ─── DTU usage ───
export const dtuData: DtuData = {
  currentPercent: 67,
  limit: 100,
  used: 67,
  warningThreshold: 70,
  criticalThreshold: 90,
};

// ─── Connections ───
export const connectionStats: ConnectionStats = {
  active: 142,
  trend: 'up',
  trendPercent: 12,
  peak24h: 218,
  avg24h: 124,
};

// ─── Geo-replication ───
export const geoReplicas: GeoReplica[] = [
  {
    region: 'East US',
    role: 'Primary',
    status: 'Online',
    replicationLag: '—',
    lastSync: '—',
  },
  {
    region: 'West US 2',
    role: 'Secondary',
    status: 'Online',
    replicationLag: '< 5 sec',
    lastSync: 'Feb 18, 2026 9:17 PM',
  },
  {
    region: 'North Europe',
    role: 'Geo-Secondary',
    status: 'Online',
    replicationLag: '< 12 sec',
    lastSync: 'Feb 18, 2026 9:17 PM',
  },
];

// ─── Audit log ───
export const auditLogEntries: AuditLogEntry[] = [
  {
    timestamp: '2026-02-18T21:14:32Z',
    action: 'SELECT',
    principal: 'app-service-identity',
    clientIp: '10.0.1.42',
    result: 'Success',
    statement: 'SELECT TOP 100 * FROM dbo.Orders WHERE ...',
  },
  {
    timestamp: '2026-02-18T21:12:05Z',
    action: 'LOGIN',
    principal: 'admin@contoso.com',
    clientIp: '203.0.113.55',
    result: 'Success',
    statement: '—',
  },
  {
    timestamp: '2026-02-18T21:08:47Z',
    action: 'UPDATE',
    principal: 'app-service-identity',
    clientIp: '10.0.1.42',
    result: 'Success',
    statement: 'UPDATE dbo.Customers SET LastLogin = ...',
  },
  {
    timestamp: '2026-02-18T20:55:19Z',
    action: 'LOGIN',
    principal: 'unknown_user',
    clientIp: '198.51.100.77',
    result: 'Failure',
    statement: '—',
  },
  {
    timestamp: '2026-02-18T20:42:11Z',
    action: 'DELETE',
    principal: 'admin@contoso.com',
    clientIp: '203.0.113.55',
    result: 'Success',
    statement: 'DELETE FROM dbo.TempSessions WHERE ...',
  },
  {
    timestamp: '2026-02-18T20:30:00Z',
    action: 'ALTER',
    principal: 'admin@contoso.com',
    clientIp: '203.0.113.55',
    result: 'Success',
    statement: 'ALTER INDEX IX_Orders_Date ON dbo.Orders REBUILD',
  },
  {
    timestamp: '2026-02-18T20:15:33Z',
    action: 'LOGIN',
    principal: 'readonly_svc',
    clientIp: '10.0.2.18',
    result: 'Success',
    statement: '—',
  },
  {
    timestamp: '2026-02-18T19:58:02Z',
    action: 'SELECT',
    principal: 'readonly_svc',
    clientIp: '10.0.2.18',
    result: 'Success',
    statement: 'SELECT COUNT(*) FROM dbo.AuditEvents',
  },
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
    heading: 'Query tools',
    items: [
      {
        label: 'Query editor (preview)',
        icon: 'https://api.iconify.design/fluent:code-24-regular.svg',
        iconFilled: 'https://api.iconify.design/fluent:code-24-filled.svg',
      },
      {
        label: 'Query performance insight',
        icon: 'https://api.iconify.design/fluent:top-speed-24-regular.svg',
        iconFilled: 'https://api.iconify.design/fluent:top-speed-24-filled.svg',
      },
    ],
  },
  {
    heading: 'Data management',
    items: [
      {
        label: 'Geo-Replication',
        icon: 'https://api.iconify.design/fluent:globe-24-regular.svg',
        iconFilled: 'https://api.iconify.design/fluent:globe-24-filled.svg',
      },
      {
        label: 'Data sync',
        icon: 'https://api.iconify.design/fluent:arrow-sync-24-regular.svg',
        iconFilled: 'https://api.iconify.design/fluent:arrow-sync-24-filled.svg',
      },
      {
        label: 'Import/Export',
        icon: 'https://api.iconify.design/fluent:arrow-upload-24-regular.svg',
        iconFilled: 'https://api.iconify.design/fluent:arrow-upload-24-filled.svg',
      },
    ],
  },
  {
    heading: 'Security',
    items: [
      {
        label: 'Auditing',
        icon: 'https://api.iconify.design/fluent:shield-checkmark-24-regular.svg',
        iconFilled: 'https://api.iconify.design/fluent:shield-checkmark-24-filled.svg',
      },
      {
        label: 'Transparent data encryption',
        icon: 'https://api.iconify.design/fluent:lock-closed-24-regular.svg',
        iconFilled: 'https://api.iconify.design/fluent:lock-closed-24-filled.svg',
      },
      {
        label: 'Dynamic data masking',
        icon: 'https://api.iconify.design/fluent:eye-off-24-regular.svg',
        iconFilled: 'https://api.iconify.design/fluent:eye-off-24-filled.svg',
      },
      {
        label: 'Firewall rules',
        icon: 'https://api.iconify.design/fluent:shield-24-regular.svg',
        iconFilled: 'https://api.iconify.design/fluent:shield-24-filled.svg',
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
        label: 'Connection strings',
        icon: 'https://api.iconify.design/fluent:link-24-regular.svg',
        iconFilled: 'https://api.iconify.design/fluent:link-24-filled.svg',
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
