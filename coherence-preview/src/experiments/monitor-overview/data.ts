export const serviceName = 'Monitor';
export const pageTitle = 'Overview';

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
      { label: 'Overview', icon: 'home', selected: true },
      { label: 'Activity log', icon: 'document' },
      { label: 'Alerts', icon: 'alert' },
      { label: 'Issues (preview)', icon: 'warning' },
      { label: 'Metrics', icon: 'data-trending' },
      { label: 'Logs', icon: 'notebook' },
      { label: 'Change Analysis', icon: 'arrow-sync' },
      { label: 'Service health', icon: 'heart-pulse' },
      { label: 'Workbooks', icon: 'book-open' },
      { label: 'Dashboards with Grafana', icon: 'grid' },
    ],
  },
  {
    heading: 'Insights',
    items: [
      { label: 'Insights', icon: 'lightbulb' },
    ],
  },
  {
    items: [
      { label: 'Managed Services', icon: 'people-team' },
    ],
  },
  {
    heading: 'Settings',
    items: [
      { label: 'Settings', icon: 'settings' },
    ],
  },
  {
    items: [
      { label: 'Support + Troubleshooting', icon: 'chat-help' },
    ],
  },
];

export interface ServiceCard {
  title: string;
  description: string;
  icon: string;
}

export const insightsCards: ServiceCard[] = [
  {
    title: 'Application Insights',
    description: "Monitor your app's availability, performance, errors, and usage.",
    icon: 'app-generic',
  },
  {
    title: 'Container Insights',
    description: 'Gain visibility into the performance and health of your controllers, nodes, and containers.',
    icon: 'box',
  },
  {
    title: 'VM Insights',
    description: 'Monitor the health, performance, and dependencies of your VMs and VM scale sets.',
    icon: 'desktop',
  },
  {
    title: 'Network Insights',
    description: 'View the health and metrics for all deployed network resources.',
    icon: 'globe',
  },
];

export const detectionCards: ServiceCard[] = [
  {
    title: 'Metrics',
    description: 'Create charts to monitor and investigate the usage and performance of your Azure resources.',
    icon: 'data-trending',
  },
  {
    title: 'Alerts',
    description: 'Get notified and respond using alerts and actions.',
    icon: 'alert',
  },
  {
    title: 'Logs',
    description: 'Analyze and diagnose issues with log queries.',
    icon: 'notebook',
  },
  {
    title: 'Workbooks',
    description: 'View, create and share interactive reports.',
    icon: 'book-open',
  },
];

export const detectionCardsRow2: ServiceCard[] = [
  {
    title: 'Dashboards with Grafana (preview)',
    description: 'View, create and share Azure Monitor dashboards with Grafana.',
    icon: 'grid',
  },
  {
    title: 'Change Analysis',
    description: 'Investigate what changed to triage incidents.',
    icon: 'arrow-sync',
  },
  {
    title: 'Diagnostic Settings',
    description: 'Route monitoring metrics and logs to selected locations.',
    icon: 'settings',
  },
  {
    title: 'Azure Monitor SCOM managed instance',
    description: 'SCOM managed instance monitors workloads running on cloud and on-prem.',
    icon: 'server',
  },
];
