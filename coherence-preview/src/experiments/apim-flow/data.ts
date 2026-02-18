// ─── Shared Types ───
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

// ─── Browse Page Data ───
export const browseTitle = 'API Management services';
export const browseSubtitle = 'Microsoft (microsoft.onmicrosoft.com)';

export const copilotSuggestions = [
  'Identify non-compliant API Management services in my environment.',
  'How many API Management services do I have?',
];

export const filterPills = [
  { label: 'Subscription equals', value: '17 selected', removable: false },
  { label: 'Resource Group equals', value: 'all', removable: true },
  { label: 'Location equals', value: 'all', removable: true },
];

export const commandBarActions = [
  { label: 'Create', icon: 'add', primary: true },
  { label: 'Recover', icon: 'https://api.iconify.design/fluent:arrow-counterclockwise-24-regular.svg' },
  { label: 'Manage view', icon: 'https://api.iconify.design/fluent:eye-24-regular.svg', hasChevron: true },
  { label: 'Refresh', icon: 'https://api.iconify.design/fluent:arrow-sync-24-regular.svg' },
  { label: 'Export to CSV', icon: 'https://api.iconify.design/fluent:arrow-download-24-regular.svg' },
  { label: 'Open query', icon: 'https://api.iconify.design/fluent:database-search-24-regular.svg' },
  { label: 'Assign tags', icon: 'https://api.iconify.design/fluent:tag-24-regular.svg', disabled: true },
  { label: 'Add to service group', icon: 'https://api.iconify.design/fluent:folder-add-24-regular.svg', hasChevron: true, disabled: true },
];

// ─── Create Page Data ───
export const resourceTypeLabel = 'API Management service';

export const tabIds = ['basics', 'monitor', 'networking', 'identity', 'tags', 'review'] as const;
export type TabId = (typeof tabIds)[number];

export const tabLabels: Record<TabId, string> = {
  basics: 'Basics',
  monitor: 'Monitor + secure',
  networking: 'Networking',
  identity: 'Managed identity',
  tags: 'Tags',
  review: 'Review + install',
};

export const pricingTiers = [
  { value: 'standard-v2', label: 'Standard v2 (99.95% SLA)' },
  { value: 'basic-v2', label: 'Basic v2 (99.95% SLA)' },
  { value: 'developer', label: 'Developer (No SLA)' },
  { value: 'premium-v2', label: 'Premium v2 (99.99% SLA)' },
  { value: 'consumption', label: 'Consumption' },
];

export const regions = [
  { value: 'eastus', label: '(US) East US' },
  { value: 'westus', label: '(US) West US' },
  { value: 'westus2', label: '(US) West US 2' },
  { value: 'centralus', label: '(US) Central US' },
  { value: 'westeurope', label: '(Europe) West Europe' },
  { value: 'northeurope', label: '(Europe) North Europe' },
  { value: 'southeastasia', label: '(Asia Pacific) Southeast Asia' },
];

export const subscriptions = [
  { value: 'sub-1', label: 'Private Test Sub APICENTER TEST ENV' },
  { value: 'sub-2', label: 'Visual Studio Enterprise' },
  { value: 'sub-3', label: 'Azure subscription 1' },
];

export const resourceGroups = [
  { value: 'rg-1', label: 'design-playground' },
  { value: 'rg-2', label: 'rg-production' },
  { value: 'rg-3', label: 'rg-development' },
];

// ─── Overview Page Data ───
export const resourceName = 'apim-contoso-prod';
export const overviewTitle = 'Overview';
export const resourceType = 'API Management service';

export const serviceEssentials = {
  name: 'apim-contoso-prod',
  resourceGroup: 'rg-contoso-prod',
  location: 'East US',
  subscription: 'Contoso Production',
  subscriptionId: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  status: 'Online',
  tier: 'Standard',
  units: 1,
  virtualIpAddress: '20.85.134.72',
  publicIpAddresses: '20.85.134.72',
  gatewayUrl: 'https://apim-contoso-prod.azure-api.net',
  managementUrl: 'https://apim-contoso-prod.management.azure-api.net',
  developerPortalUrl: 'https://apim-contoso-prod.developer.azure-api.net',
  createdOn: '2025-06-15',
  tags: { Environment: 'Production', CostCenter: 'Engineering', Owner: 'team-platform' },
};

export interface ApiItem {
  name: string;
  displayName: string;
  path: string;
  protocols: string[];
  isCurrent: boolean;
  apiType: string;
}

export const apis: ApiItem[] = [
  { name: 'echo-api', displayName: 'Echo API', path: '/echo', protocols: ['HTTPS'], isCurrent: true, apiType: 'REST' },
  { name: 'petstore-api', displayName: 'Petstore API', path: '/petstore', protocols: ['HTTPS'], isCurrent: true, apiType: 'REST' },
  { name: 'weather-api', displayName: 'Weather Service', path: '/weather', protocols: ['HTTPS', 'HTTP'], isCurrent: true, apiType: 'REST' },
  { name: 'graphql-api', displayName: 'GraphQL Gateway', path: '/graphql', protocols: ['HTTPS'], isCurrent: true, apiType: 'GraphQL' },
  { name: 'orders-api', displayName: 'Orders API', path: '/orders/v2', protocols: ['HTTPS'], isCurrent: true, apiType: 'REST' },
  { name: 'legacy-soap', displayName: 'Legacy SOAP Service', path: '/soap', protocols: ['HTTPS'], isCurrent: false, apiType: 'SOAP' },
];

export interface SubscriptionItem {
  name: string;
  displayName: string;
  scope: string;
  state: 'Active' | 'Suspended' | 'Cancelled';
  createdDate: string;
}

export const apiSubscriptions: SubscriptionItem[] = [
  { name: 'master', displayName: 'Built-in all-access subscription', scope: 'All APIs', state: 'Active', createdDate: '2025-06-15' },
  { name: 'mobile-app-sub', displayName: 'Mobile App Subscription', scope: 'Petstore API', state: 'Active', createdDate: '2025-08-20' },
  { name: 'partner-sub', displayName: 'Partner Integration', scope: 'Orders API', state: 'Active', createdDate: '2025-09-10' },
  { name: 'test-sub', displayName: 'Test Subscription', scope: 'All APIs', state: 'Suspended', createdDate: '2025-10-05' },
];

export const overviewNavSections: NavSectionConfig[] = [
  {
    items: [
      { label: 'Overview', icon: 'https://api.iconify.design/fluent:home-24-regular.svg', iconFilled: 'https://api.iconify.design/fluent:home-24-filled.svg', selected: true },
      { label: 'Activity log', icon: 'https://api.iconify.design/fluent:document-24-regular.svg', iconFilled: 'https://api.iconify.design/fluent:document-24-filled.svg' },
      { label: 'Access control (IAM)', icon: 'https://api.iconify.design/fluent:person-24-regular.svg', iconFilled: 'https://api.iconify.design/fluent:person-24-filled.svg' },
      { label: 'Tags', icon: 'https://api.iconify.design/fluent:tag-24-regular.svg', iconFilled: 'https://api.iconify.design/fluent:tag-24-filled.svg' },
      { label: 'Diagnose and solve problems', icon: 'https://api.iconify.design/fluent:stethoscope-24-regular.svg', iconFilled: 'https://api.iconify.design/fluent:stethoscope-24-filled.svg' },
    ],
  },
  {
    heading: 'APIs',
    items: [
      { label: 'APIs', icon: 'https://api.iconify.design/fluent:plug-connected-24-regular.svg', iconFilled: 'https://api.iconify.design/fluent:plug-connected-24-filled.svg' },
      { label: 'Products', icon: 'https://api.iconify.design/fluent:box-24-regular.svg', iconFilled: 'https://api.iconify.design/fluent:box-24-filled.svg' },
      { label: 'Subscriptions', icon: 'https://api.iconify.design/fluent:key-24-regular.svg', iconFilled: 'https://api.iconify.design/fluent:key-24-filled.svg' },
      { label: 'Named values', icon: 'https://api.iconify.design/fluent:grid-24-regular.svg', iconFilled: 'https://api.iconify.design/fluent:grid-24-filled.svg' },
      { label: 'Backends', icon: 'https://api.iconify.design/fluent:cloud-24-regular.svg', iconFilled: 'https://api.iconify.design/fluent:cloud-24-filled.svg' },
      { label: 'Schemas', icon: 'https://api.iconify.design/fluent:database-24-regular.svg', iconFilled: 'https://api.iconify.design/fluent:database-24-filled.svg' },
    ],
  },
  {
    heading: 'Deployment + infrastructure',
    items: [
      { label: 'Gateways', icon: 'https://api.iconify.design/fluent:server-24-regular.svg', iconFilled: 'https://api.iconify.design/fluent:server-24-filled.svg' },
      { label: 'Locations', icon: 'https://api.iconify.design/fluent:globe-24-regular.svg', iconFilled: 'https://api.iconify.design/fluent:globe-24-filled.svg' },
      { label: 'Custom domains', icon: 'https://api.iconify.design/fluent:link-24-regular.svg', iconFilled: 'https://api.iconify.design/fluent:link-24-filled.svg' },
    ],
  },
  {
    heading: 'Settings',
    items: [
      { label: 'Networking', icon: 'https://api.iconify.design/fluent:wifi-1-24-regular.svg', iconFilled: 'https://api.iconify.design/fluent:wifi-1-24-filled.svg' },
      { label: 'Protocols', icon: 'https://api.iconify.design/fluent:shield-24-regular.svg', iconFilled: 'https://api.iconify.design/fluent:shield-24-filled.svg' },
      { label: 'Properties', icon: 'https://api.iconify.design/fluent:info-24-regular.svg', iconFilled: 'https://api.iconify.design/fluent:info-24-filled.svg' },
    ],
  },
  {
    dividerBefore: true,
    items: [
      { label: 'Developer portal', icon: 'https://api.iconify.design/fluent:globe-24-regular.svg', iconFilled: 'https://api.iconify.design/fluent:globe-24-filled.svg' },
    ],
  },
];
