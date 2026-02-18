// ─── Types ───

export interface CategoryItem {
  label: string;
  id: string;
}

export interface AzureService {
  name: string;
  icon: string;
  createUrl?: string;
}

export interface MarketplaceProduct {
  name: string;
  icon: string;
  createUrl?: string;
  learnMoreUrl?: string;
}

// ─── Page Config ───

export const headerTitle = 'Microsoft Azure (Preview)';
export const pageTitle = 'Create a resource';
export const breadcrumb = 'Home';

// ─── Copilot Suggestions ───
export const copilotSuggestions = [
  'Design a new Azure workload',
  'I want to duplicate an existing VM',
  'Help me choose the right VM size',
];

// ─── Categories ───

export const topCategories: CategoryItem[] = [
  { label: 'Get Started', id: 'get-started' },
  { label: 'Recently created', id: 'recently-created' },
];

export const categories: CategoryItem[] = [
  { label: 'Machine Learning', id: 'machine-learning' },
  { label: 'AI Apps and Agents', id: 'ai-apps-agents' },
  { label: 'Analytics', id: 'analytics' },
  { label: 'Blockchain', id: 'blockchain' },
  { label: 'Infrastructure Services', id: 'infrastructure-services' },
  { label: 'Databases', id: 'databases' },
  { label: 'Developer Tools', id: 'developer-tools' },
  { label: 'DevOps', id: 'devops' },
  { label: 'Identity', id: 'identity' },
  { label: 'Integration', id: 'integration' },
  { label: 'Internet of Things', id: 'internet-of-things' },
  { label: 'IT & Management Tools', id: 'it-management-tools' },
  { label: 'Media', id: 'media' },
  { label: 'Migration', id: 'migration' },
  { label: 'Mixed Reality', id: 'mixed-reality' },
  { label: 'Monitoring & Management', id: 'monitoring-management' },
  { label: 'Security', id: 'security' },
  { label: 'Web', id: 'web' },
];

// ─── Popular Azure Services ───

export const popularServices: AzureService[] = [
  { name: 'Function App', icon: 'https://api.iconify.design/fluent:flash-24-regular.svg' },
  { name: 'Web App', icon: 'https://api.iconify.design/fluent:globe-24-regular.svg' },
  { name: 'Virtual network', icon: 'https://api.iconify.design/fluent:connector-24-regular.svg' },
  { name: 'Key Vault', icon: 'https://api.iconify.design/fluent:key-24-regular.svg' },
  { name: 'Virtual machine', icon: 'https://api.iconify.design/fluent:desktop-24-regular.svg' },
  { name: 'Storage account', icon: 'https://api.iconify.design/fluent:storage-24-regular.svg' },
  { name: 'Data Factory', icon: 'https://api.iconify.design/fluent:database-plug-connected-24-regular.svg' },
  { name: 'Logic App', icon: 'https://api.iconify.design/fluent:puzzle-piece-24-regular.svg' },
  { name: 'Azure Databricks', icon: 'https://api.iconify.design/fluent:data-trending-24-regular.svg' },
  { name: 'App Service Plan', icon: 'https://api.iconify.design/fluent:app-generic-24-regular.svg' },
];

// ─── Popular Marketplace Products ───

export const marketplaceProducts: MarketplaceProduct[] = [
  { name: 'Windows Server 2025 Datacenter: Azure Edition', icon: 'https://api.iconify.design/fluent:window-24-regular.svg' },
  { name: 'Windows 11 Enterprise, version 25H2', icon: 'https://api.iconify.design/fluent:window-24-regular.svg' },
  { name: 'Ubuntu Pro 24.04 LTS', icon: 'https://api.iconify.design/fluent:server-24-regular.svg' },
  { name: 'Free SQL Server License: SQL Server 2022 Developer on Windows Server 2022', icon: 'https://api.iconify.design/fluent:database-24-regular.svg' },
  { name: 'Red Hat Enterprise Linux10 (latest minor version)', icon: 'https://api.iconify.design/fluent:server-24-regular.svg' },
  { name: 'Debian 13 "Trixie"', icon: 'https://api.iconify.design/fluent:server-24-regular.svg' },
  { name: 'Visual Studio 2022 Pro on Windows 10 Enterprise (x64) + Microsoft 365 Apps', icon: 'https://api.iconify.design/fluent:code-24-regular.svg' },
  { name: 'AlmaLinux OS 9', icon: 'https://api.iconify.design/fluent:server-24-regular.svg' },
  { name: 'SharePoint Server Subscription Edition Trial', icon: 'https://api.iconify.design/fluent:share-24-regular.svg' },
  { name: 'Oracle Linux 8.10 (LVM)', icon: 'https://api.iconify.design/fluent:server-24-regular.svg' },
];
