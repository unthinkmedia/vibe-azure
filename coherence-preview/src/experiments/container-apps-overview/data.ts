// @ts-nocheck
/**
 * Data & configuration for Azure Container Apps overview page.
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

export interface RevisionEntry {
  name: string;
  status: 'Running' | 'Provisioning' | 'Degraded' | 'Inactive';
  trafficWeight: number;
  replicas: string;
  created: string;
  image: string;
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

export interface IngressConfig {
  enabled: boolean;
  external: boolean;
  targetPort: number;
  transport: string;
  allowInsecure: boolean;
  fqdn: string;
  ipRestrictions: number;
  corsEnabled: boolean;
  stickySessionsAffinity: string;
}

// ─── Resource identity ───
export const resourceName = 'contoso-web-app';
export const resourceType = 'Container App';

export const copilotSuggestions = [
  'Show me the health of active revisions',
  'Why is my app scaling beyond expected replicas?',
  'How do I split traffic between revisions?',
];

// ─── Essentials ───
export const essentialsData: EssentialsRow[] = [
  { label: 'Resource group', value: 'rg-contoso-apps', href: '#' },
  { label: 'Status', value: 'Running', status: 'success' },
  { label: 'Location', value: 'East US 2' },
  { label: 'Subscription', value: 'Contoso Production', href: '#' },
  { label: 'Subscription ID', value: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' },
  { label: 'Application URL', value: 'https://contoso-web-app.happyocean-a1b2c3d4.eastus2.azurecontainerapps.io', href: '#' },
  { label: 'Managed environment', value: 'contoso-env-prod', href: '#' },
  { label: 'Revision mode', value: 'Multiple' },
  { label: 'Latest revision', value: 'contoso-web-app--v3-8f2a', href: '#' },
  { label: 'Tags', value: 'env:production, team:platform', href: '#' },
];

// ─── Scaling metrics ───
function generateSparkline(base: number, variance: number, points = 12): MetricPoint[] {
  const hours = ['12a', '2a', '4a', '6a', '8a', '10a', '12p', '2p', '4p', '6p', '8p', '10p'];
  return hours.slice(0, points).map((time) => ({
    time,
    value: Math.max(0, base + Math.round((Math.random() - 0.5) * variance)),
  }));
}

export const metricsCards: MetricCard[] = [
  {
    title: 'Replica Count',
    value: '6',
    unit: 'active replicas',
    trend: 'up',
    trendLabel: '+2 vs 1h ago',
    sparkline: generateSparkline(4, 3),
  },
  {
    title: 'CPU Usage',
    value: '42%',
    unit: 'avg across replicas',
    trend: 'flat',
    trendLabel: 'Stable',
    sparkline: generateSparkline(40, 15),
  },
  {
    title: 'Memory Usage',
    value: '58%',
    unit: 'avg across replicas',
    trend: 'up',
    trendLabel: '+5% vs 1h ago',
    sparkline: generateSparkline(55, 12),
  },
  {
    title: 'Requests',
    value: '1,247',
    unit: 'req/min',
    trend: 'up',
    trendLabel: '+18% vs prior hour',
    sparkline: generateSparkline(1100, 400),
  },
];

// ─── Revisions ───
export const revisions: RevisionEntry[] = [
  { name: 'contoso-web-app--v3-8f2a', status: 'Running', trafficWeight: 80, replicas: '4/10', created: '2026-02-18 09:14 AM', image: 'contosoacr.azurecr.io/web-app:v3.2.1' },
  { name: 'contoso-web-app--v2-c4d1', status: 'Running', trafficWeight: 20, replicas: '2/10', created: '2026-02-15 03:42 PM', image: 'contosoacr.azurecr.io/web-app:v3.1.0' },
  { name: 'contoso-web-app--v1-a9e7', status: 'Inactive', trafficWeight: 0, replicas: '0/10', created: '2026-02-10 11:08 AM', image: 'contosoacr.azurecr.io/web-app:v3.0.0' },
  { name: 'contoso-web-app--init-b3f5', status: 'Inactive', trafficWeight: 0, replicas: '0/10', created: '2026-02-05 08:30 AM', image: 'contosoacr.azurecr.io/web-app:v2.9.4' },
];

// ─── Ingress configuration ───
export const ingressConfig: IngressConfig = {
  enabled: true,
  external: true,
  targetPort: 8080,
  transport: 'HTTP/1',
  allowInsecure: false,
  fqdn: 'contoso-web-app.happyocean-a1b2c3d4.eastus2.azurecontainerapps.io',
  ipRestrictions: 0,
  corsEnabled: true,
  stickySessionsAffinity: 'None',
};

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
    heading: 'Application',
    items: [
      {
        label: 'Revisions and replicas',
        icon: 'https://api.iconify.design/fluent:layer-24-regular.svg',
        iconFilled: 'https://api.iconify.design/fluent:layer-24-filled.svg',
      },
      {
        label: 'Containers',
        icon: 'https://api.iconify.design/fluent:box-24-regular.svg',
        iconFilled: 'https://api.iconify.design/fluent:box-24-filled.svg',
      },
      {
        label: 'Ingress',
        icon: 'https://api.iconify.design/fluent:globe-24-regular.svg',
        iconFilled: 'https://api.iconify.design/fluent:globe-24-filled.svg',
      },
      {
        label: 'Scale',
        icon: 'https://api.iconify.design/fluent:arrow-maximize-24-regular.svg',
        iconFilled: 'https://api.iconify.design/fluent:arrow-maximize-24-filled.svg',
      },
      {
        label: 'Secrets',
        icon: 'https://api.iconify.design/fluent:key-24-regular.svg',
        iconFilled: 'https://api.iconify.design/fluent:key-24-filled.svg',
      },
    ],
  },
  {
    heading: 'Monitoring',
    items: [
      {
        label: 'Log stream',
        icon: 'https://api.iconify.design/fluent:text-align-left-24-regular.svg',
        iconFilled: 'https://api.iconify.design/fluent:text-align-left-24-filled.svg',
      },
      {
        label: 'Console',
        icon: 'https://api.iconify.design/fluent:terminal-24-regular.svg',
        iconFilled: 'https://api.iconify.design/fluent:terminal-24-filled.svg',
      },
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
    ],
  },
  {
    heading: 'Settings',
    items: [
      {
        label: 'Environment variables',
        icon: 'https://api.iconify.design/fluent:settings-24-regular.svg',
        iconFilled: 'https://api.iconify.design/fluent:settings-24-filled.svg',
      },
      {
        label: 'Identity',
        icon: 'https://api.iconify.design/fluent:shield-person-24-regular.svg',
        iconFilled: 'https://api.iconify.design/fluent:shield-person-24-filled.svg',
      },
      {
        label: 'Networking',
        icon: 'https://api.iconify.design/fluent:globe-24-regular.svg',
        iconFilled: 'https://api.iconify.design/fluent:globe-24-filled.svg',
      },
      {
        label: 'Properties',
        icon: 'https://api.iconify.design/fluent:info-24-regular.svg',
        iconFilled: 'https://api.iconify.design/fluent:info-24-filled.svg',
      },
    ],
  },
];
