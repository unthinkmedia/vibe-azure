export const serviceName = 'Policy';
export const pageTitle = 'Compliance';

// ─── Nav Config ───
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
      { label: 'Overview', icon: 'home' },
      { label: 'Compliance', icon: 'shield-checkmark', selected: true },
      { label: 'Remediation', icon: 'wrench' },
      { label: 'Definitions', icon: 'document-text' },
      { label: 'Assignments', icon: 'clipboard-task' },
    ],
  },
  {
    heading: 'Authoring',
    items: [
      { label: 'Definitions', icon: 'code' },
      { label: 'Initiatives', icon: 'library' },
      { label: 'Exemptions', icon: 'arrow-undo' },
    ],
  },
  {
    heading: 'Settings',
    items: [
      { label: 'Configuration', icon: 'settings' },
      { label: 'Properties', icon: 'info' },
    ],
  },
];

// ─── Summary Metrics ───
export interface SummaryMetric {
  label: string;
  value: string;
  subtext: string;
  icon: string;
  accent: 'blue' | 'red' | 'amber' | 'green';
}

export const summaryMetrics: SummaryMetric[] = [
  { label: 'Total Policies', value: '142', subtext: 'Across 12 initiatives', icon: 'document-checkmark', accent: 'blue' },
  { label: 'Compliant', value: '1,847', subtext: '87% of resources', icon: 'checkmark-circle', accent: 'green' },
  { label: 'Non-Compliant', value: '276', subtext: '13% of resources', icon: 'dismiss-circle', accent: 'red' },
  { label: 'Pending Remediations', value: '18', subtext: '5 in progress', icon: 'wrench', accent: 'amber' },
];

// ─── Compliance Score ───
export const complianceScore = {
  compliant: 1847,
  nonCompliant: 276,
  exempt: 34,
  total: 2157,
  percentage: 87,
};

// ─── Policy Initiatives ───
export type Severity = 'critical' | 'high' | 'medium' | 'low';

export interface NonCompliantResource {
  name: string;
  type: string;
  resourceGroup: string;
  subscription: string;
  policyRule: string;
  lastEvaluated: string;
}

export interface PolicyInitiative {
  id: string;
  name: string;
  nonCompliantCount: number;
  totalPolicies: number;
  severity: Severity;
  category: string;
  resources: NonCompliantResource[];
}

export const initiatives: PolicyInitiative[] = [
  {
    id: 'init-1',
    name: 'Azure Security Benchmark v3',
    nonCompliantCount: 67,
    totalPolicies: 42,
    severity: 'critical',
    category: 'Security',
    resources: [
      { name: 'vm-prod-web-01', type: 'Microsoft.Compute/virtualMachines', resourceGroup: 'rg-prod-web', subscription: 'Contoso Production', policyRule: 'Managed disks should use a specific set of disk encryption sets', lastEvaluated: '2 hours ago' },
      { name: 'storage-logs-01', type: 'Microsoft.Storage/storageAccounts', resourceGroup: 'rg-prod-logs', subscription: 'Contoso Production', policyRule: 'Secure transfer to storage accounts should be enabled', lastEvaluated: '3 hours ago' },
      { name: 'sql-analytics-db', type: 'Microsoft.Sql/servers/databases', resourceGroup: 'rg-prod-analytics', subscription: 'Contoso Production', policyRule: 'Transparent Data Encryption on SQL databases should be enabled', lastEvaluated: '1 hour ago' },
      { name: 'kv-prod-secrets', type: 'Microsoft.KeyVault/vaults', resourceGroup: 'rg-prod-security', subscription: 'Contoso Production', policyRule: 'Key vaults should have soft delete enabled', lastEvaluated: '4 hours ago' },
    ],
  },
  {
    id: 'init-2',
    name: 'CIS Microsoft Azure Foundations Benchmark 1.4.0',
    nonCompliantCount: 89,
    totalPolicies: 56,
    severity: 'high',
    category: 'Regulatory Compliance',
    resources: [
      { name: 'nsg-default-allow', type: 'Microsoft.Network/networkSecurityGroups', resourceGroup: 'rg-prod-networking', subscription: 'Contoso Production', policyRule: 'Management ports should be closed on your virtual machines', lastEvaluated: '1 hour ago' },
      { name: 'aks-dev-cluster', type: 'Microsoft.ContainerService/managedClusters', resourceGroup: 'rg-dev-aks', subscription: 'Contoso Dev/Test', policyRule: 'Azure Kubernetes Service clusters should have Defender profile enabled', lastEvaluated: '2 hours ago' },
      { name: 'app-svc-api-v2', type: 'Microsoft.Web/sites', resourceGroup: 'rg-staging-api', subscription: 'Contoso Staging', policyRule: 'App Service apps should use the latest TLS version', lastEvaluated: '5 hours ago' },
    ],
  },
  {
    id: 'init-3',
    name: 'NIST SP 800-53 Rev. 5',
    nonCompliantCount: 38,
    totalPolicies: 34,
    severity: 'high',
    category: 'Regulatory Compliance',
    resources: [
      { name: 'cosmos-orders-db', type: 'Microsoft.DocumentDB/databaseAccounts', resourceGroup: 'rg-prod-data', subscription: 'Contoso Production', policyRule: 'Azure Cosmos DB accounts should have firewall rules', lastEvaluated: '30 minutes ago' },
      { name: 'redis-cache-prod', type: 'Microsoft.Cache/Redis', resourceGroup: 'rg-prod-cache', subscription: 'Contoso Production', policyRule: 'Only secure connections to your Azure Cache for Redis should be enabled', lastEvaluated: '2 hours ago' },
    ],
  },
  {
    id: 'init-4',
    name: 'ISO 27001:2013',
    nonCompliantCount: 45,
    totalPolicies: 38,
    severity: 'medium',
    category: 'Regulatory Compliance',
    resources: [
      { name: 'diag-settings-missing', type: 'Microsoft.Insights/diagnosticSettings', resourceGroup: 'rg-prod-monitoring', subscription: 'Contoso Production', policyRule: 'Diagnostic logs in resources should be enabled', lastEvaluated: '6 hours ago' },
      { name: 'func-app-legacy', type: 'Microsoft.Web/sites', resourceGroup: 'rg-staging-functions', subscription: 'Contoso Staging', policyRule: 'Function apps should use the latest HTTP version', lastEvaluated: '8 hours ago' },
    ],
  },
  {
    id: 'init-5',
    name: 'PCI DSS v4.0',
    nonCompliantCount: 15,
    totalPolicies: 28,
    severity: 'critical',
    category: 'Payment Card Industry',
    resources: [
      { name: 'apim-gateway', type: 'Microsoft.ApiManagement/service', resourceGroup: 'rg-prod-api', subscription: 'Contoso Production', policyRule: 'API Management services should use a virtual network', lastEvaluated: '1 hour ago' },
      { name: 'sql-payments-db', type: 'Microsoft.Sql/servers', resourceGroup: 'rg-prod-payments', subscription: 'Contoso Production', policyRule: 'SQL servers should use customer-managed keys to encrypt data at rest', lastEvaluated: '3 hours ago' },
    ],
  },
  {
    id: 'init-6',
    name: 'Azure Cost Optimization',
    nonCompliantCount: 22,
    totalPolicies: 18,
    severity: 'low',
    category: 'Cost Management',
    resources: [
      { name: 'vm-dev-test-03', type: 'Microsoft.Compute/virtualMachines', resourceGroup: 'rg-dev-compute', subscription: 'Contoso Dev/Test', policyRule: 'Virtual machines should have auto-shutdown configured', lastEvaluated: '12 hours ago' },
    ],
  },
];

// ─── Remediation Tasks ───
export type TaskStatus = 'in-progress' | 'not-started' | 'failed' | 'completed';

export interface RemediationTask {
  id: string;
  name: string;
  initiative: string;
  status: TaskStatus;
  affectedResources: number;
  assignedTo: string;
  createdAt: string;
  policyRule: string;
}

export const remediationTasks: RemediationTask[] = [
  { id: 'task-1', name: 'Enable TDE on SQL databases', initiative: 'Azure Security Benchmark v3', status: 'in-progress', affectedResources: 12, assignedTo: 'Sarah Chen', createdAt: '2026-02-17', policyRule: 'Transparent Data Encryption on SQL databases should be enabled' },
  { id: 'task-2', name: 'Enable soft delete on key vaults', initiative: 'Azure Security Benchmark v3', status: 'in-progress', affectedResources: 8, assignedTo: 'David Kim', createdAt: '2026-02-16', policyRule: 'Key vaults should have soft delete enabled' },
  { id: 'task-3', name: 'Close management ports on VMs', initiative: 'CIS Azure Foundations 1.4.0', status: 'in-progress', affectedResources: 15, assignedTo: 'Priya Patel', createdAt: '2026-02-15', policyRule: 'Management ports should be closed on your virtual machines' },
  { id: 'task-4', name: 'Upgrade TLS to 1.2 on App Services', initiative: 'CIS Azure Foundations 1.4.0', status: 'in-progress', affectedResources: 6, assignedTo: 'James Wilson', createdAt: '2026-02-17', policyRule: 'App Service apps should use the latest TLS version' },
  { id: 'task-5', name: 'Enable Defender on AKS clusters', initiative: 'CIS Azure Foundations 1.4.0', status: 'in-progress', affectedResources: 3, assignedTo: 'Maria Santos', createdAt: '2026-02-18', policyRule: 'AKS clusters should have Defender profile enabled' },
  { id: 'task-6', name: 'Configure Cosmos DB firewall rules', initiative: 'NIST SP 800-53 Rev. 5', status: 'not-started', affectedResources: 4, assignedTo: 'Tom Rivera', createdAt: '2026-02-18', policyRule: 'Azure Cosmos DB accounts should have firewall rules' },
  { id: 'task-7', name: 'Enable secure connections on Redis', initiative: 'NIST SP 800-53 Rev. 5', status: 'not-started', affectedResources: 2, assignedTo: 'Sarah Chen', createdAt: '2026-02-18', policyRule: 'Only secure connections to Azure Cache for Redis should be enabled' },
  { id: 'task-8', name: 'Deploy APIM to virtual network', initiative: 'PCI DSS v4.0', status: 'failed', affectedResources: 1, assignedTo: 'David Kim', createdAt: '2026-02-14', policyRule: 'API Management services should use a virtual network' },
  { id: 'task-9', name: 'Enable CMK on SQL servers', initiative: 'PCI DSS v4.0', status: 'not-started', affectedResources: 3, assignedTo: 'Priya Patel', createdAt: '2026-02-17', policyRule: 'SQL servers should use customer-managed keys' },
  { id: 'task-10', name: 'Enable diagnostic logs', initiative: 'ISO 27001:2013', status: 'not-started', affectedResources: 18, assignedTo: 'James Wilson', createdAt: '2026-02-16', policyRule: 'Diagnostic logs in resources should be enabled' },
  { id: 'task-11', name: 'Configure auto-shutdown on dev VMs', initiative: 'Azure Cost Optimization', status: 'not-started', affectedResources: 9, assignedTo: 'Tom Rivera', createdAt: '2026-02-18', policyRule: 'Virtual machines should have auto-shutdown configured' },
  { id: 'task-12', name: 'Enable secure transfer on storage', initiative: 'Azure Security Benchmark v3', status: 'completed', affectedResources: 5, assignedTo: 'Maria Santos', createdAt: '2026-02-12', policyRule: 'Secure transfer to storage accounts should be enabled' },
  { id: 'task-13', name: 'Enforce disk encryption sets', initiative: 'Azure Security Benchmark v3', status: 'completed', affectedResources: 7, assignedTo: 'Sarah Chen', createdAt: '2026-02-10', policyRule: 'Managed disks should use a specific set of disk encryption sets' },
  { id: 'task-14', name: 'Update HTTP version on Function Apps', initiative: 'ISO 27001:2013', status: 'not-started', affectedResources: 4, assignedTo: 'David Kim', createdAt: '2026-02-17', policyRule: 'Function apps should use the latest HTTP version' },
  { id: 'task-15', name: 'Enable storage account encryption', initiative: 'Azure Security Benchmark v3', status: 'completed', affectedResources: 10, assignedTo: 'Priya Patel', createdAt: '2026-02-08', policyRule: 'Storage accounts should use customer-managed key for encryption' },
  { id: 'task-16', name: 'Configure NSG flow logs', initiative: 'NIST SP 800-53 Rev. 5', status: 'not-started', affectedResources: 6, assignedTo: 'James Wilson', createdAt: '2026-02-18', policyRule: 'Network Security Groups should have flow logs enabled' },
  { id: 'task-17', name: 'Restrict public blob access', initiative: 'CIS Azure Foundations 1.4.0', status: 'failed', affectedResources: 11, assignedTo: 'Tom Rivera', createdAt: '2026-02-13', policyRule: 'Storage account public access should be disallowed' },
  { id: 'task-18', name: 'Enable Azure Monitor on subscriptions', initiative: 'Azure Security Benchmark v3', status: 'completed', affectedResources: 3, assignedTo: 'Maria Santos', createdAt: '2026-02-09', policyRule: 'Azure Monitor should be enabled on subscriptions' },
];

// ─── Compliance Score Categories (for donut) ───
export interface ComplianceCategory {
  label: string;
  compliant: number;
  nonCompliant: number;
}

export const complianceCategories: ComplianceCategory[] = [
  { label: 'Security', compliant: 542, nonCompliant: 156 },
  { label: 'Regulatory', compliant: 678, nonCompliant: 83 },
  { label: 'Cost', compliant: 412, nonCompliant: 22 },
  { label: 'Operational', compliant: 215, nonCompliant: 15 },
];
