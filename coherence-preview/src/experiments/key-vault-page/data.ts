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

export const resourceName = 'kv-contoso-prod-eastus';
export const pageTitle = 'Overview';
export const resourceType = 'Key vault';

export const vaultEssentials = {
  name: 'kv-contoso-prod-eastus',
  resourceGroup: 'rg-contoso-prod',
  location: 'East US',
  subscription: 'Contoso Production',
  subscriptionId: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  vaultUri: 'https://kv-contoso-prod-eastus.vault.azure.net/',
  skuName: 'Standard',
  directoryId: 'f8c7e9a2-1d3b-4e5f-9a6c-8b7d0e2f4a1c',
  softDelete: 'Enabled (90 days)',
  purgeProtection: 'Enabled',
  createdOn: '2025-04-12',
  tags: { Environment: 'Production', CostCenter: 'Engineering', Owner: 'team-platform' },
};

export interface Secret {
  name: string;
  status: 'Enabled' | 'Disabled';
  contentType: string;
  expirationDate: string;
  createdOn: string;
}

export const secrets: Secret[] = [
  {
    name: 'DatabaseConnectionString',
    status: 'Enabled',
    contentType: 'text/plain',
    expirationDate: '2026-09-15',
    createdOn: '2025-04-12',
  },
  {
    name: 'StorageAccountKey',
    status: 'Enabled',
    contentType: 'text/plain',
    expirationDate: '2026-06-01',
    createdOn: '2025-05-20',
  },
  {
    name: 'SendGridApiKey',
    status: 'Enabled',
    contentType: 'application/json',
    expirationDate: '2026-12-31',
    createdOn: '2025-06-03',
  },
  {
    name: 'RedisPassword',
    status: 'Disabled',
    contentType: 'text/plain',
    expirationDate: '2025-11-30',
    createdOn: '2025-03-18',
  },
  {
    name: 'AppInsightsInstrumentationKey',
    status: 'Enabled',
    contentType: 'text/plain',
    expirationDate: '2027-01-15',
    createdOn: '2025-07-22',
  },
  {
    name: 'CosmosDbPrimaryKey',
    status: 'Enabled',
    contentType: 'application/json',
    expirationDate: '2026-08-20',
    createdOn: '2025-08-10',
  },
];

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
    heading: 'Objects',
    items: [
      {
        label: 'Keys',
        icon: 'https://api.iconify.design/fluent:key-24-regular.svg',
        iconFilled: 'https://api.iconify.design/fluent:key-24-filled.svg',
      },
      {
        label: 'Secrets',
        icon: 'https://api.iconify.design/fluent:lock-closed-24-regular.svg',
        iconFilled: 'https://api.iconify.design/fluent:lock-closed-24-filled.svg',
      },
      {
        label: 'Certificates',
        icon: 'https://api.iconify.design/fluent:certificate-24-regular.svg',
        iconFilled: 'https://api.iconify.design/fluent:certificate-24-filled.svg',
      },
    ],
  },
  {
    heading: 'Settings',
    items: [
      {
        label: 'Access policies',
        icon: 'https://api.iconify.design/fluent:shield-24-regular.svg',
        iconFilled: 'https://api.iconify.design/fluent:shield-24-filled.svg',
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
      {
        label: 'Locks',
        icon: 'https://api.iconify.design/fluent:lock-closed-24-regular.svg',
        iconFilled: 'https://api.iconify.design/fluent:lock-closed-24-filled.svg',
      },
    ],
  },
];
