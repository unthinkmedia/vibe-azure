export interface NavItemConfig {
  label: string;
  icon: string;
  iconFilled: string;
  selected?: boolean;
}

export interface NavSectionConfig {
  heading?: string;
  dividerBefore?: boolean;
  items: NavItemConfig[];
}

export const resourceName = 'my-app';
export const pageTitle = 'AI Hub';
export const resourceType = 'Web App';

export interface FoundryConnection {
  id: string;
  projectName: string;
  endpoint: string;
  model: string;
  status: 'Connected' | 'Disconnected' | 'Error';
  region: string;
  deploymentName: string;
  apiVersion: string;
}

export const foundryConnections: FoundryConnection[] = [
  {
    id: 'conn-1',
    projectName: 'contoso-ai-project',
    endpoint: 'https://contoso-ai.openai.azure.com/',
    model: 'gpt-4o',
    status: 'Connected',
    region: 'East US',
    deploymentName: 'gpt-4o-deploy',
    apiVersion: '2024-12-01-preview',
  },
  {
    id: 'conn-2',
    projectName: 'contoso-embeddings',
    endpoint: 'https://contoso-embed.openai.azure.com/',
    model: 'text-embedding-ada-002',
    status: 'Connected',
    region: 'East US',
    deploymentName: 'embed-ada-002',
    apiVersion: '2024-12-01-preview',
  },
  {
    id: 'conn-3',
    projectName: 'contoso-vision-prod',
    endpoint: 'https://contoso-vision.cognitiveservices.azure.com/',
    model: 'gpt-4o-vision',
    status: 'Disconnected',
    region: 'West US 2',
    deploymentName: 'gpt-4o-vision-deploy',
    apiVersion: '2024-12-01-preview',
  },
];

export interface ReadinessCategory {
  label: string;
  score: number;
  maxScore: number;
  color: string;
}

export const readinessScore = 32;
export const readinessMax = 100;
export const readinessCategories: ReadinessCategory[] = [
  { label: 'Security', score: 8, maxScore: 30, color: 'var(--danger-foreground-1)' },
  { label: 'Reliability', score: 10, maxScore: 25, color: 'var(--warning-foreground-1)' },
  { label: 'Observability', score: 6, maxScore: 25, color: 'var(--warning-foreground-1)' },
  { label: 'Performance', score: 8, maxScore: 20, color: 'var(--warning-foreground-1)' },
];

export const navSections: NavSectionConfig[] = [
  {
    items: [
      {
        label: 'Overview',
        icon: 'https://api.iconify.design/fluent:home-24-regular.svg',
        iconFilled: 'https://api.iconify.design/fluent:home-24-filled.svg',
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
    heading: 'AI',
    items: [
      {
        label: 'AI Hub',
        icon: 'https://api.iconify.design/fluent:brain-circuit-24-regular.svg',
        iconFilled: 'https://api.iconify.design/fluent:brain-circuit-24-filled.svg',
        selected: true,
      },
    ],
  },
  {
    heading: 'Deployment',
    items: [
      {
        label: 'Deployment Center',
        icon: 'https://api.iconify.design/fluent:rocket-24-regular.svg',
        iconFilled: 'https://api.iconify.design/fluent:rocket-24-filled.svg',
      },
      {
        label: 'Deployment slots',
        icon: 'https://api.iconify.design/fluent:layer-24-regular.svg',
        iconFilled: 'https://api.iconify.design/fluent:layer-24-filled.svg',
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
        label: 'Networking',
        icon: 'https://api.iconify.design/fluent:wifi-1-24-regular.svg',
        iconFilled: 'https://api.iconify.design/fluent:wifi-1-24-filled.svg',
      },
      {
        label: 'Scale up (App Service plan)',
        icon: 'https://api.iconify.design/fluent:arrow-maximize-24-regular.svg',
        iconFilled: 'https://api.iconify.design/fluent:arrow-maximize-24-filled.svg',
      },
      {
        label: 'Properties',
        icon: 'https://api.iconify.design/fluent:info-24-regular.svg',
        iconFilled: 'https://api.iconify.design/fluent:info-24-filled.svg',
      },
    ],
  },
  {
    heading: 'Monitoring',
    items: [
      {
        label: 'Log stream',
        icon: 'https://api.iconify.design/fluent:text-description-24-regular.svg',
        iconFilled: 'https://api.iconify.design/fluent:text-description-24-filled.svg',
      },
      {
        label: 'Metrics',
        icon: 'https://api.iconify.design/fluent:data-trending-24-regular.svg',
        iconFilled: 'https://api.iconify.design/fluent:data-trending-24-filled.svg',
      },
    ],
  },
];
