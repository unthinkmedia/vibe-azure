// @ts-nocheck
/**
 * Data & configuration for Azure Kubernetes Service (AKS) cluster overview page.
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

export interface NodePool {
  name: string;
  mode: 'System' | 'User';
  vmSize: string;
  nodeCount: number;
  maxNodes: number;
  cpuPercent: number;
  memoryPercent: number;
  status: 'Ready' | 'Scaling' | 'NotReady';
  osType: 'Linux' | 'Windows';
  kubernetesVersion: string;
}

export interface Deployment {
  name: string;
  namespace: string;
  status: 'Succeeded' | 'In Progress' | 'Failed' | 'Pending';
  replicas: string;
  image: string;
  lastUpdated: string;
  initiatedBy: string;
}

export interface ClusterHealth {
  overallStatus: 'Healthy' | 'Warning' | 'Critical';
  kubernetesVersion: string;
  apiServerStatus: 'Running' | 'Degraded' | 'Unreachable';
  nodeHealthy: number;
  nodeTotal: number;
  podRunning: number;
  podTotal: number;
  uptime: string;
}

// ─── Resource identity ───
export const resourceName = 'contoso-aks-prod';
export const resourceType = 'Kubernetes service';

export const copilotSuggestions = [
  'Scale nodepool-user to handle traffic spike',
  'Show pods in CrashLoopBackOff state',
  'Recommend right-sizing for my node pools',
];

// ─── Cluster health ───
export const clusterHealth: ClusterHealth = {
  overallStatus: 'Healthy',
  kubernetesVersion: '1.29.4',
  apiServerStatus: 'Running',
  nodeHealthy: 7,
  nodeTotal: 8,
  podRunning: 124,
  podTotal: 142,
  uptime: '45d 12h 33m',
};

// ─── Essentials ───
export const essentialsData: EssentialsRow[] = [
  { label: 'Resource group', value: 'rg-contoso-aks-prod', href: '#' },
  { label: 'Status', value: 'Running', status: 'success' },
  { label: 'Location', value: 'East US 2' },
  { label: 'Subscription', value: 'Contoso Production', href: '#' },
  { label: 'Subscription ID', value: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' },
  { label: 'Kubernetes version', value: '1.29.4' },
  { label: 'API server address', value: 'contoso-aks-prod-dns-abc123.hcp.eastus2.azmk8s.io', href: '#' },
  { label: 'Network model', value: 'Azure CNI Overlay' },
  { label: 'Node resource group', value: 'MC_rg-contoso-aks-prod_contoso-aks-prod_eastus2', href: '#' },
  { label: 'Tags', value: 'env:production, team:platform, cost-center:engineering', href: '#' },
];

// ─── Node pools ───
export const nodePools: NodePool[] = [
  {
    name: 'systempool',
    mode: 'System',
    vmSize: 'Standard_D4s_v5',
    nodeCount: 3,
    maxNodes: 5,
    cpuPercent: 34,
    memoryPercent: 52,
    status: 'Ready',
    osType: 'Linux',
    kubernetesVersion: '1.29.4',
  },
  {
    name: 'userpool1',
    mode: 'User',
    vmSize: 'Standard_D8s_v5',
    nodeCount: 4,
    maxNodes: 10,
    cpuPercent: 72,
    memoryPercent: 68,
    status: 'Ready',
    osType: 'Linux',
    kubernetesVersion: '1.29.4',
  },
  {
    name: 'gpupool',
    mode: 'User',
    vmSize: 'Standard_NC6s_v3',
    nodeCount: 1,
    maxNodes: 4,
    cpuPercent: 89,
    memoryPercent: 76,
    status: 'Scaling',
    osType: 'Linux',
    kubernetesVersion: '1.29.4',
  },
];

// ─── Recent deployments ───
export const recentDeployments: Deployment[] = [
  {
    name: 'contoso-web-frontend',
    namespace: 'production',
    status: 'Succeeded',
    replicas: '3/3',
    image: 'contosoacr.azurecr.io/web-frontend:v2.8.1',
    lastUpdated: '2026-02-18 10:22 AM',
    initiatedBy: 'GitHub Actions',
  },
  {
    name: 'payment-service',
    namespace: 'production',
    status: 'In Progress',
    replicas: '2/4',
    image: 'contosoacr.azurecr.io/payment-svc:v1.14.0',
    lastUpdated: '2026-02-18 10:18 AM',
    initiatedBy: 'Azure DevOps',
  },
  {
    name: 'notification-worker',
    namespace: 'production',
    status: 'Succeeded',
    replicas: '2/2',
    image: 'contosoacr.azurecr.io/notif-worker:v3.1.2',
    lastUpdated: '2026-02-17 04:45 PM',
    initiatedBy: 'GitHub Actions',
  },
  {
    name: 'inventory-api',
    namespace: 'staging',
    status: 'Failed',
    replicas: '0/3',
    image: 'contosoacr.azurecr.io/inventory-api:v5.0.0-rc1',
    lastUpdated: '2026-02-17 02:30 PM',
    initiatedBy: 'Azure DevOps',
  },
  {
    name: 'redis-cache',
    namespace: 'infrastructure',
    status: 'Succeeded',
    replicas: '3/3',
    image: 'contosoacr.azurecr.io/redis:7.2-alpine',
    lastUpdated: '2026-02-16 09:10 AM',
    initiatedBy: 'Helm',
  },
  {
    name: 'telemetry-collector',
    namespace: 'monitoring',
    status: 'Pending',
    replicas: '0/2',
    image: 'contosoacr.azurecr.io/otel-collector:v0.92.0',
    lastUpdated: '2026-02-18 10:25 AM',
    initiatedBy: 'Flux CD',
  },
];

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
    heading: 'Kubernetes resources',
    items: [
      {
        label: 'Namespaces',
        icon: 'https://api.iconify.design/fluent:folder-24-regular.svg',
        iconFilled: 'https://api.iconify.design/fluent:folder-24-filled.svg',
      },
      {
        label: 'Workloads',
        icon: 'https://api.iconify.design/fluent:tasks-app-24-regular.svg',
        iconFilled: 'https://api.iconify.design/fluent:tasks-app-24-filled.svg',
      },
      {
        label: 'Services and ingresses',
        icon: 'https://api.iconify.design/fluent:globe-24-regular.svg',
        iconFilled: 'https://api.iconify.design/fluent:globe-24-filled.svg',
      },
      {
        label: 'Storage',
        icon: 'https://api.iconify.design/fluent:database-24-regular.svg',
        iconFilled: 'https://api.iconify.design/fluent:database-24-filled.svg',
      },
      {
        label: 'Configuration',
        icon: 'https://api.iconify.design/fluent:settings-24-regular.svg',
        iconFilled: 'https://api.iconify.design/fluent:settings-24-filled.svg',
      },
    ],
  },
  {
    heading: 'Node pools',
    items: [
      {
        label: 'Node pools',
        icon: 'https://api.iconify.design/fluent:server-24-regular.svg',
        iconFilled: 'https://api.iconify.design/fluent:server-24-filled.svg',
      },
      {
        label: 'Nodes',
        icon: 'https://api.iconify.design/fluent:desktop-24-regular.svg',
        iconFilled: 'https://api.iconify.design/fluent:desktop-24-filled.svg',
      },
    ],
  },
  {
    heading: 'Monitoring',
    items: [
      {
        label: 'Insights',
        icon: 'https://api.iconify.design/fluent:data-bar-vertical-24-regular.svg',
        iconFilled: 'https://api.iconify.design/fluent:data-bar-vertical-24-filled.svg',
      },
      {
        label: 'Logs',
        icon: 'https://api.iconify.design/fluent:text-align-left-24-regular.svg',
        iconFilled: 'https://api.iconify.design/fluent:text-align-left-24-filled.svg',
      },
      {
        label: 'Metrics',
        icon: 'https://api.iconify.design/fluent:chart-multiple-24-regular.svg',
        iconFilled: 'https://api.iconify.design/fluent:chart-multiple-24-filled.svg',
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
        label: 'Networking',
        icon: 'https://api.iconify.design/fluent:globe-24-regular.svg',
        iconFilled: 'https://api.iconify.design/fluent:globe-24-filled.svg',
      },
      {
        label: 'Cluster configuration',
        icon: 'https://api.iconify.design/fluent:wrench-24-regular.svg',
        iconFilled: 'https://api.iconify.design/fluent:wrench-24-filled.svg',
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
