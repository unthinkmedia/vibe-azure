// @ts-nocheck
/**
 * Data & configuration for Azure Functions overview page.
 */

export interface NavItemConfig {
  id: string;
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

export interface FunctionEntry {
  name: string;
  trigger: string;
  status: 'Enabled' | 'Disabled';
  executions24h: number;
  errors24h: number;
  avgDuration: string;
}

export interface MetricPoint {
  time: string;
  value: number;
}

export interface MetricCard {
  title: string;
  value: string;
  unit: string;
  trend: 'up' | 'down' | 'flat';
  trendLabel: string;
  sparkline: MetricPoint[];
}

// ─── Resource identity ───
export const resourceName = 'contoso-func-prod';
export const resourceType = 'Function App';

export const copilotSuggestions = [
  'Show me failed executions in the last 24 hours',
  'Analyze function performance trends',
  'What functions have the highest error rate?',
];

// ─── Essentials ───
export const essentialsData: EssentialsRow[] = [
  { label: 'Resource group', value: 'rg-contoso-prod', href: '#' },
  { label: 'Status', value: 'Running', status: 'success' },
  { label: 'Location', value: 'East US 2' },
  { label: 'Subscription', value: 'Contoso Production', href: '#' },
  { label: 'Subscription ID', value: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' },
  { label: 'URL', value: 'https://contoso-func-prod.azurewebsites.net', href: '#' },
  { label: 'App Service plan', value: 'ASP-contosoprod (EP1)', href: '#' },
  { label: 'Runtime version', value: '~4 (.NET 8 Isolated)' },
  { label: 'Operating system', value: 'Windows' },
  { label: 'Tags', value: 'env:production, team:platform', href: '#' },
];

// ─── Monitoring metrics ───
function generateSparkline(base: number, variance: number, points = 12): MetricPoint[] {
  const hours = ['12a', '2a', '4a', '6a', '8a', '10a', '12p', '2p', '4p', '6p', '8p', '10p'];
  return hours.slice(0, points).map((time) => ({
    time,
    value: Math.max(0, base + Math.round((Math.random() - 0.5) * variance)),
  }));
}

export const metricsCards: MetricCard[] = [
  {
    title: 'Total Executions',
    value: '24,847',
    unit: 'last 24h',
    trend: 'up',
    trendLabel: '+12.3% vs prior day',
    sparkline: generateSparkline(2000, 800),
  },
  {
    title: 'Success Rate',
    value: '99.2%',
    unit: 'last 24h',
    trend: 'flat',
    trendLabel: 'Stable',
    sparkline: generateSparkline(99, 2),
  },
  {
    title: 'Avg Duration',
    value: '142 ms',
    unit: 'last 24h',
    trend: 'down',
    trendLabel: '-8.5% vs prior day',
    sparkline: generateSparkline(150, 40),
  },
  {
    title: 'Errors',
    value: '198',
    unit: 'last 24h',
    trend: 'up',
    trendLabel: '+3 vs prior day',
    sparkline: generateSparkline(16, 10),
  },
];

// ─── Functions list ───
export const functions: FunctionEntry[] = [
  { name: 'ProcessOrderQueue', trigger: 'Queue trigger', status: 'Enabled', executions24h: 8432, errors24h: 12, avgDuration: '89ms' },
  { name: 'SendNotificationEmail', trigger: 'Queue trigger', status: 'Enabled', executions24h: 6218, errors24h: 3, avgDuration: '234ms' },
  { name: 'HttpApiGateway', trigger: 'HTTP trigger', status: 'Enabled', executions24h: 5104, errors24h: 87, avgDuration: '156ms' },
  { name: 'BlobImageResizer', trigger: 'Blob trigger', status: 'Enabled', executions24h: 2847, errors24h: 45, avgDuration: '312ms' },
  { name: 'TimerCleanupJob', trigger: 'Timer trigger', status: 'Enabled', executions24h: 1440, errors24h: 0, avgDuration: '67ms' },
  { name: 'CosmosChangeProcessor', trigger: 'Cosmos DB trigger', status: 'Enabled', executions24h: 756, errors24h: 51, avgDuration: '198ms' },
  { name: 'EventHubIngestor', trigger: 'Event Hub trigger', status: 'Disabled', executions24h: 0, errors24h: 0, avgDuration: '—' },
  { name: 'ServiceBusHandler', trigger: 'Service Bus trigger', status: 'Enabled', executions24h: 50, errors24h: 0, avgDuration: '78ms' },
];

// ─── Navigation ───
// ─── Networking page data ───
export type SecurityLevel = 'public-all' | 'public-selected' | 'private-only';

export interface IpRule {
  name: string;
  startIp: string;
  endIp: string;
}

export interface VNetRule {
  name: string;
  vnet: string;
  subnet: string;
  status: 'Active' | 'Provisioning';
}

export interface PrivateEndpoint {
  name: string;
  subnet: string;
  status: 'Approved' | 'Pending' | 'Rejected';
  privateIp: string;
}

export const securityLevels: { value: SecurityLevel; label: string; description: string }[] = [
  {
    value: 'public-all',
    label: 'Public access — All networks',
    description: 'Allow inbound traffic from all networks, including the internet. Not recommended for production workloads.',
  },
  {
    value: 'public-selected',
    label: 'Public access — Selected networks',
    description: 'Allow inbound traffic only from selected virtual networks and IP addresses. Recommended for most workloads.',
  },
  {
    value: 'private-only',
    label: 'Private access only',
    description: 'No public access. Use private endpoints for all inbound traffic. Best for sensitive or regulated workloads.',
  },
];

export const ipRules: IpRule[] = [
  { name: 'Office VPN', startIp: '203.0.113.0', endIp: '203.0.113.255' },
  { name: 'CI/CD Pipeline', startIp: '198.51.100.10', endIp: '198.51.100.10' },
  { name: 'Partner API Gateway', startIp: '192.0.2.50', endIp: '192.0.2.60' },
];

export const vnetRules: VNetRule[] = [
  { name: 'app-subnet-rule', vnet: 'vnet-contoso-prod', subnet: 'snet-app-tier', status: 'Active' },
  { name: 'data-subnet-rule', vnet: 'vnet-contoso-prod', subnet: 'snet-data-tier', status: 'Active' },
  { name: 'staging-subnet-rule', vnet: 'vnet-contoso-staging', subnet: 'snet-default', status: 'Provisioning' },
];

export const privateEndpoints: PrivateEndpoint[] = [
  { name: 'pe-contoso-func-prod', subnet: 'snet-private-endpoints', status: 'Approved', privateIp: '10.0.4.5' },
  { name: 'pe-contoso-func-staging', subnet: 'snet-private-endpoints', status: 'Pending', privateIp: '10.0.4.8' },
];

// ─── Navigation ───
export const navSections: NavSectionConfig[] = [
  {
    items: [
      {
        id: 'overview',
        label: 'Overview',
        icon: 'https://api.iconify.design/fluent:home-24-regular.svg',
        iconFilled: 'https://api.iconify.design/fluent:home-24-filled.svg',
        selected: true,
      },
      {
        id: 'activity-log',
        label: 'Activity log',
        icon: 'https://api.iconify.design/fluent:document-24-regular.svg',
        iconFilled: 'https://api.iconify.design/fluent:document-24-filled.svg',
      },
      {
        id: 'access-control',
        label: 'Access control (IAM)',
        icon: 'https://api.iconify.design/fluent:person-24-regular.svg',
        iconFilled: 'https://api.iconify.design/fluent:person-24-filled.svg',
      },
      {
        id: 'tags',
        label: 'Tags',
        icon: 'https://api.iconify.design/fluent:tag-24-regular.svg',
        iconFilled: 'https://api.iconify.design/fluent:tag-24-filled.svg',
      },
      {
        id: 'diagnose',
        label: 'Diagnose and solve problems',
        icon: 'https://api.iconify.design/fluent:stethoscope-24-regular.svg',
        iconFilled: 'https://api.iconify.design/fluent:stethoscope-24-filled.svg',
      },
    ],
  },
  {
    heading: 'Functions',
    items: [
      {
        id: 'functions',
        label: 'Functions',
        icon: 'https://api.iconify.design/fluent:flash-24-regular.svg',
        iconFilled: 'https://api.iconify.design/fluent:flash-24-filled.svg',
      },
      {
        id: 'app-keys',
        label: 'App keys',
        icon: 'https://api.iconify.design/fluent:key-24-regular.svg',
        iconFilled: 'https://api.iconify.design/fluent:key-24-filled.svg',
      },
      {
        id: 'app-files',
        label: 'App files',
        icon: 'https://api.iconify.design/fluent:folder-24-regular.svg',
        iconFilled: 'https://api.iconify.design/fluent:folder-24-filled.svg',
      },
    ],
  },
  {
    heading: 'Monitoring',
    items: [
      {
        id: 'log-stream',
        label: 'Log stream',
        icon: 'https://api.iconify.design/fluent:text-align-left-24-regular.svg',
        iconFilled: 'https://api.iconify.design/fluent:text-align-left-24-filled.svg',
      },
      {
        id: 'metrics',
        label: 'Metrics',
        icon: 'https://api.iconify.design/fluent:data-bar-vertical-24-regular.svg',
        iconFilled: 'https://api.iconify.design/fluent:data-bar-vertical-24-filled.svg',
      },
      {
        id: 'alerts',
        label: 'Alerts',
        icon: 'https://api.iconify.design/fluent:alert-24-regular.svg',
        iconFilled: 'https://api.iconify.design/fluent:alert-24-filled.svg',
      },
      {
        id: 'diagnostic-settings',
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
        id: 'configuration',
        label: 'Configuration',
        icon: 'https://api.iconify.design/fluent:settings-24-regular.svg',
        iconFilled: 'https://api.iconify.design/fluent:settings-24-filled.svg',
      },
      {
        id: 'networking',
        label: 'Networking',
        icon: 'https://api.iconify.design/fluent:globe-24-regular.svg',
        iconFilled: 'https://api.iconify.design/fluent:globe-24-filled.svg',
      },
      {
        id: 'scale-out',
        label: 'Scale out',
        icon: 'https://api.iconify.design/fluent:arrow-maximize-24-regular.svg',
        iconFilled: 'https://api.iconify.design/fluent:arrow-maximize-24-filled.svg',
      },
      {
        id: 'properties',
        label: 'Properties',
        icon: 'https://api.iconify.design/fluent:info-24-regular.svg',
        iconFilled: 'https://api.iconify.design/fluent:info-24-filled.svg',
      },
    ],
  },
];
