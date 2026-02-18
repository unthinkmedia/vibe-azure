// @ts-nocheck
/**
 * Data & configuration for Azure Key Vault overview dashboard.
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

export interface Secret {
  name: string;
  status: 'Enabled' | 'Disabled';
  contentType: string;
  expirationDate: string;
  createdOn: string;
  lastUpdated: string;
}

export interface Certificate {
  name: string;
  subject: string;
  issuer: string;
  status: 'Valid' | 'Expiring' | 'Expired' | 'Revoked';
  validFrom: string;
  validTo: string;
  autoRenew: boolean;
  renewalStatus?: 'Pending' | 'Scheduled' | 'Failed';
  keyType: string;
  keySize: number;
}

export interface AccessPolicy {
  principalName: string;
  principalType: 'User' | 'Application' | 'Managed Identity';
  objectId: string;
  keyPermissions: string[];
  secretPermissions: string[];
  certificatePermissions: string[];
}

export interface SensitiveOperation {
  timestamp: string;
  operation: string;
  objectType: 'Secret' | 'Key' | 'Certificate' | 'Vault';
  objectName: string;
  initiatedBy: string;
  principalType: 'User' | 'Application' | 'Managed Identity';
  status: 'Succeeded' | 'Failed';
  clientIp: string;
}

// ─── Resource identity ───
export const resourceName = 'kv-contoso-prod-eastus';
export const resourceType = 'Key vault';

export const copilotSuggestions = [
  'Which secrets expire in the next 30 days?',
  'Are there any certificates failing auto-renewal?',
  'Who has purge permissions on this vault?',
];

// ─── Essentials ───
export const essentialsData: EssentialsRow[] = [
  { label: 'Resource group', value: 'rg-contoso-prod', href: '#' },
  { label: 'Status', value: 'Available', status: 'success' },
  { label: 'Location', value: 'East US' },
  { label: 'Subscription', value: 'Contoso Production', href: '#' },
  { label: 'Subscription ID', value: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' },
  { label: 'Vault URI', value: 'https://kv-contoso-prod-eastus.vault.azure.net/', href: '#' },
  { label: 'SKU', value: 'Standard' },
  { label: 'Soft delete', value: 'Enabled (90 days)' },
  { label: 'Purge protection', value: 'Enabled', status: 'success' },
  { label: 'Tags', value: 'env:production, team:platform, cost-center:eng', href: '#' },
];

// ─── Secrets with expiration data ───
// "Today" = 2026-02-18 for mock purposes
export const secrets: Secret[] = [
  {
    name: 'DatabaseConnectionString',
    status: 'Enabled',
    contentType: 'text/plain',
    expirationDate: '2026-03-05',
    createdOn: '2025-04-12',
    lastUpdated: '2025-11-20',
  },
  {
    name: 'StorageAccountKey-Primary',
    status: 'Enabled',
    contentType: 'text/plain',
    expirationDate: '2026-03-10',
    createdOn: '2025-05-20',
    lastUpdated: '2025-12-01',
  },
  {
    name: 'SendGridApiKey',
    status: 'Enabled',
    contentType: 'application/json',
    expirationDate: '2026-03-28',
    createdOn: '2025-06-03',
    lastUpdated: '2025-06-03',
  },
  {
    name: 'RedisPassword',
    status: 'Enabled',
    contentType: 'text/plain',
    expirationDate: '2026-04-15',
    createdOn: '2025-03-18',
    lastUpdated: '2025-10-05',
  },
  {
    name: 'AppInsightsKey',
    status: 'Enabled',
    contentType: 'text/plain',
    expirationDate: '2026-04-22',
    createdOn: '2025-07-22',
    lastUpdated: '2025-07-22',
  },
  {
    name: 'CosmosDbPrimaryKey',
    status: 'Enabled',
    contentType: 'application/json',
    expirationDate: '2026-05-10',
    createdOn: '2025-08-10',
    lastUpdated: '2026-01-15',
  },
  {
    name: 'ServiceBusConnectionString',
    status: 'Enabled',
    contentType: 'text/plain',
    expirationDate: '2026-05-18',
    createdOn: '2025-09-01',
    lastUpdated: '2025-09-01',
  },
  {
    name: 'EventHubSasToken',
    status: 'Disabled',
    contentType: 'text/plain',
    expirationDate: '2026-01-15',
    createdOn: '2025-02-10',
    lastUpdated: '2025-02-10',
  },
  {
    name: 'GraphApiClientSecret',
    status: 'Enabled',
    contentType: 'text/plain',
    expirationDate: '2026-08-30',
    createdOn: '2025-10-15',
    lastUpdated: '2025-10-15',
  },
  {
    name: 'StorageAccountKey-Secondary',
    status: 'Enabled',
    contentType: 'text/plain',
    expirationDate: '2027-01-20',
    createdOn: '2025-12-01',
    lastUpdated: '2025-12-01',
  },
];

// ─── Certificates ───
export const certificates: Certificate[] = [
  {
    name: 'contoso-api-gateway',
    subject: 'CN=api.contoso.com',
    issuer: 'DigiCert SHA2 Extended Validation Server CA',
    status: 'Expiring',
    validFrom: '2025-03-15',
    validTo: '2026-03-15',
    autoRenew: true,
    renewalStatus: 'Scheduled',
    keyType: 'RSA',
    keySize: 2048,
  },
  {
    name: 'contoso-wildcard',
    subject: 'CN=*.contoso.com',
    issuer: "Let's Encrypt Authority X3",
    status: 'Valid',
    validFrom: '2025-11-01',
    validTo: '2026-11-01',
    autoRenew: true,
    renewalStatus: undefined,
    keyType: 'RSA',
    keySize: 4096,
  },
  {
    name: 'internal-mtls-cert',
    subject: 'CN=internal.contoso.local',
    issuer: 'Contoso Internal CA',
    status: 'Valid',
    validFrom: '2025-06-20',
    validTo: '2027-06-20',
    autoRenew: false,
    keyType: 'EC',
    keySize: 256,
  },
  {
    name: 'legacy-signing-cert',
    subject: 'CN=signing.contoso.com',
    issuer: 'GlobalSign RSA OV SSL CA 2018',
    status: 'Expired',
    validFrom: '2024-01-10',
    validTo: '2026-01-10',
    autoRenew: true,
    renewalStatus: 'Failed',
    keyType: 'RSA',
    keySize: 2048,
  },
  {
    name: 'data-encryption-cert',
    subject: 'CN=data.contoso.com',
    issuer: 'DigiCert Global Root G2',
    status: 'Expiring',
    validFrom: '2025-04-01',
    validTo: '2026-04-01',
    autoRenew: true,
    renewalStatus: 'Pending',
    keyType: 'RSA',
    keySize: 2048,
  },
  {
    name: 'frontend-ssl',
    subject: 'CN=app.contoso.com',
    issuer: "Let's Encrypt Authority X3",
    status: 'Valid',
    validFrom: '2026-01-05',
    validTo: '2027-01-05',
    autoRenew: true,
    keyType: 'RSA',
    keySize: 2048,
  },
];

// ─── Access Policies ───
export const accessPolicies: AccessPolicy[] = [
  // Users
  {
    principalName: 'Alex Britez',
    principalType: 'User',
    objectId: 'a1b2c3d4-e5f6-7890-abcd-000000000001',
    keyPermissions: ['Get', 'List', 'Create', 'Delete', 'Backup', 'Restore'],
    secretPermissions: ['Get', 'List', 'Set', 'Delete', 'Backup', 'Restore', 'Purge'],
    certificatePermissions: ['Get', 'List', 'Create', 'Delete', 'ManageContacts', 'ManageIssuers'],
  },
  {
    principalName: 'Sarah Chen',
    principalType: 'User',
    objectId: 'a1b2c3d4-e5f6-7890-abcd-000000000002',
    keyPermissions: ['Get', 'List'],
    secretPermissions: ['Get', 'List'],
    certificatePermissions: ['Get', 'List'],
  },
  {
    principalName: 'Marcus Johnson',
    principalType: 'User',
    objectId: 'a1b2c3d4-e5f6-7890-abcd-000000000003',
    keyPermissions: ['Get', 'List', 'Create'],
    secretPermissions: ['Get', 'List', 'Set'],
    certificatePermissions: ['Get', 'List'],
  },
  // Applications
  {
    principalName: 'contoso-web-app',
    principalType: 'Application',
    objectId: 'a1b2c3d4-e5f6-7890-abcd-000000000004',
    keyPermissions: ['Get', 'List', 'Unwrap', 'Wrap'],
    secretPermissions: ['Get', 'List'],
    certificatePermissions: ['Get', 'List'],
  },
  {
    principalName: 'ci-cd-pipeline',
    principalType: 'Application',
    objectId: 'a1b2c3d4-e5f6-7890-abcd-000000000005',
    keyPermissions: ['Get', 'List'],
    secretPermissions: ['Get', 'List', 'Set', 'Delete'],
    certificatePermissions: ['Get', 'List', 'Create', 'Import'],
  },
  {
    principalName: 'backup-service',
    principalType: 'Application',
    objectId: 'a1b2c3d4-e5f6-7890-abcd-000000000006',
    keyPermissions: ['Get', 'List', 'Backup'],
    secretPermissions: ['Get', 'List', 'Backup'],
    certificatePermissions: ['Get', 'List', 'Backup'],
  },
  // Managed Identities
  {
    principalName: 'app-contoso-prod-eastus',
    principalType: 'Managed Identity',
    objectId: 'a1b2c3d4-e5f6-7890-abcd-000000000007',
    keyPermissions: ['Get', 'List'],
    secretPermissions: ['Get', 'List'],
    certificatePermissions: ['Get'],
  },
  {
    principalName: 'func-contoso-processor',
    principalType: 'Managed Identity',
    objectId: 'a1b2c3d4-e5f6-7890-abcd-000000000008',
    keyPermissions: ['Get'],
    secretPermissions: ['Get', 'List'],
    certificatePermissions: [],
  },
  {
    principalName: 'aks-contoso-cluster',
    principalType: 'Managed Identity',
    objectId: 'a1b2c3d4-e5f6-7890-abcd-000000000009',
    keyPermissions: ['Get', 'List', 'Unwrap', 'Wrap'],
    secretPermissions: ['Get', 'List'],
    certificatePermissions: ['Get', 'List'],
  },
];

// ─── Sensitive Operations ───
export const sensitiveOperations: SensitiveOperation[] = [
  {
    timestamp: '2026-02-18T14:32:18Z',
    operation: 'SecretDelete',
    objectType: 'Secret',
    objectName: 'EventHubSasToken',
    initiatedBy: 'ci-cd-pipeline',
    principalType: 'Application',
    status: 'Succeeded',
    clientIp: '10.0.1.42',
  },
  {
    timestamp: '2026-02-18T11:05:44Z',
    operation: 'SecretPurge',
    objectType: 'Secret',
    objectName: 'OldApiKey',
    initiatedBy: 'Alex Britez',
    principalType: 'User',
    status: 'Succeeded',
    clientIp: '203.0.113.15',
  },
  {
    timestamp: '2026-02-17T22:18:03Z',
    operation: 'SecretRecover',
    objectType: 'Secret',
    objectName: 'DatabaseConnectionString',
    initiatedBy: 'Alex Britez',
    principalType: 'User',
    status: 'Succeeded',
    clientIp: '203.0.113.15',
  },
  {
    timestamp: '2026-02-17T16:41:29Z',
    operation: 'KeyDelete',
    objectType: 'Key',
    objectName: 'rsa-data-key-01',
    initiatedBy: 'ci-cd-pipeline',
    principalType: 'Application',
    status: 'Succeeded',
    clientIp: '10.0.1.42',
  },
  {
    timestamp: '2026-02-16T09:22:55Z',
    operation: 'CertificateDelete',
    objectType: 'Certificate',
    objectName: 'legacy-signing-cert',
    initiatedBy: 'Marcus Johnson',
    principalType: 'User',
    status: 'Failed',
    clientIp: '198.51.100.22',
  },
  {
    timestamp: '2026-02-15T18:07:12Z',
    operation: 'SecretPurge',
    objectType: 'Secret',
    objectName: 'DeprecatedToken',
    initiatedBy: 'backup-service',
    principalType: 'Application',
    status: 'Failed',
    clientIp: '10.0.2.18',
  },
  {
    timestamp: '2026-02-14T13:55:38Z',
    operation: 'KeyRecover',
    objectType: 'Key',
    objectName: 'hmac-signing-key',
    initiatedBy: 'func-contoso-processor',
    principalType: 'Managed Identity',
    status: 'Succeeded',
    clientIp: '10.0.3.55',
  },
  {
    timestamp: '2026-02-13T08:33:01Z',
    operation: 'SecretDelete',
    objectType: 'Secret',
    objectName: 'LegacyDbPassword',
    initiatedBy: 'Sarah Chen',
    principalType: 'User',
    status: 'Succeeded',
    clientIp: '192.0.2.44',
  },
];

// ─── Helpers ───
const TODAY = new Date('2026-02-18');

export function getDaysUntilExpiry(dateStr: string): number {
  const exp = new Date(dateStr);
  return Math.ceil((exp.getTime() - TODAY.getTime()) / (1000 * 60 * 60 * 24));
}

export function formatDate(iso: string): string {
  const d = new Date(iso + 'T00:00:00');
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

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
];
