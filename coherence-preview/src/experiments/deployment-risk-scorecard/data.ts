export const serviceName = 'Deployments';
export const pageTitle = 'Risk Scorecard';

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
      { label: 'Deployment history', icon: 'history' },
      { label: 'Risk Scorecard', icon: 'shield-checkmark', selected: true },
      { label: 'Policy compliance', icon: 'checkmark-circle' },
      { label: 'Advisor recommendations', icon: 'lightbulb' },
    ],
  },
  {
    heading: 'Analysis',
    items: [
      { label: 'Blast radius', icon: 'target' },
      { label: 'Diff viewer', icon: 'code' },
      { label: 'Cost projections', icon: 'money' },
    ],
  },
  {
    heading: 'Settings',
    items: [
      { label: 'Configuration', icon: 'settings' },
      { label: 'Properties', icon: 'info' },
      { label: 'Locks', icon: 'lock-closed' },
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
  { label: 'Pending Deployments', value: '7', subtext: '3 awaiting approval', icon: 'rocket', accent: 'blue' },
  { label: 'High-Risk Changes', value: '3', subtext: 'Risk score ≥ 70', icon: 'warning', accent: 'red' },
  { label: 'Resources Affected', value: '34', subtext: '18 created · 13 modified · 3 deleted', icon: 'cube', accent: 'amber' },
  { label: 'Est. Cost Delta', value: '+$2,840', subtext: '/month projected impact', icon: 'money', accent: 'green' },
];

// ─── Deployments ───
export type DeploymentSource = 'ARM' | 'Bicep' | 'Terraform';
export type TargetEnv = 'dev' | 'staging' | 'prod';

export interface Deployment {
  id: string;
  name: string;
  source: DeploymentSource;
  targetEnv: TargetEnv;
  resourceGroup: string;
  subscription: string;
  created: number;
  modified: number;
  deleted: number;
  riskScore: number;
  submittedBy: string;
  submittedAt: string;
  hasApprovalGate: boolean;
}

export const deployments: Deployment[] = [
  {
    id: 'dep-1',
    name: 'deploy-storage-migration-prod',
    source: 'Bicep',
    targetEnv: 'prod',
    resourceGroup: 'rg-prod-data',
    subscription: 'Contoso Production',
    created: 6,
    modified: 0,
    deleted: 3,
    riskScore: 91,
    submittedBy: 'Maria Santos',
    submittedAt: '2026-02-18T14:22:00Z',
    hasApprovalGate: false,
  },
  {
    id: 'dep-2',
    name: 'deploy-api-gateway-v3',
    source: 'ARM',
    targetEnv: 'prod',
    resourceGroup: 'rg-prod-api',
    subscription: 'Contoso Production',
    created: 4,
    modified: 2,
    deleted: 0,
    riskScore: 82,
    submittedBy: 'Sarah Chen',
    submittedAt: '2026-02-18T10:45:00Z',
    hasApprovalGate: true,
  },
  {
    id: 'dep-3',
    name: 'deploy-vnet-peering-update',
    source: 'ARM',
    targetEnv: 'prod',
    resourceGroup: 'rg-prod-networking',
    subscription: 'Contoso Production',
    created: 0,
    modified: 4,
    deleted: 0,
    riskScore: 67,
    submittedBy: 'David Kim',
    submittedAt: '2026-02-17T16:30:00Z',
    hasApprovalGate: true,
  },
  {
    id: 'dep-4',
    name: 'deploy-sql-geo-replication',
    source: 'Bicep',
    targetEnv: 'staging',
    resourceGroup: 'rg-staging-sql',
    subscription: 'Contoso Staging',
    created: 2,
    modified: 2,
    deleted: 1,
    riskScore: 58,
    submittedBy: 'Priya Patel',
    submittedAt: '2026-02-17T11:15:00Z',
    hasApprovalGate: true,
  },
  {
    id: 'dep-5',
    name: 'deploy-aks-nodepool-scale',
    source: 'Terraform',
    targetEnv: 'staging',
    resourceGroup: 'rg-staging-aks',
    subscription: 'Contoso Staging',
    created: 2,
    modified: 3,
    deleted: 0,
    riskScore: 45,
    submittedBy: 'James Wilson',
    submittedAt: '2026-02-18T08:05:00Z',
    hasApprovalGate: true,
  },
  {
    id: 'dep-6',
    name: 'deploy-redis-cache-premium',
    source: 'ARM',
    targetEnv: 'prod',
    resourceGroup: 'rg-prod-cache',
    subscription: 'Contoso Production',
    created: 1,
    modified: 1,
    deleted: 0,
    riskScore: 38,
    submittedBy: 'Tom Rivera',
    submittedAt: '2026-02-16T09:50:00Z',
    hasApprovalGate: true,
  },
  {
    id: 'dep-7',
    name: 'deploy-func-app-v2-dev',
    source: 'Terraform',
    targetEnv: 'dev',
    resourceGroup: 'rg-dev-functions',
    subscription: 'Contoso Dev/Test',
    created: 3,
    modified: 1,
    deleted: 0,
    riskScore: 23,
    submittedBy: 'Alex Johnson',
    submittedAt: '2026-02-18T15:10:00Z',
    hasApprovalGate: false,
  },
];

// ─── Blast Radius Graph ───
export interface GraphNode {
  id: string;
  label: string;
  type: 'changing' | 'dependent';
  risk: 'safe' | 'caution' | 'breaking';
  x: number;
  y: number;
}

export interface GraphEdge {
  from: string;
  to: string;
}

export interface BlastRadiusData {
  nodes: GraphNode[];
  edges: GraphEdge[];
}

export const blastRadiusGraphs: Record<string, BlastRadiusData> = {
  'dep-1': {
    nodes: [
      { id: 'n1', label: 'storage-prod-01', type: 'changing', risk: 'breaking', x: 400, y: 60 },
      { id: 'n2', label: 'storage-prod-02', type: 'changing', risk: 'breaking', x: 200, y: 60 },
      { id: 'n3', label: 'storage-archive', type: 'changing', risk: 'breaking', x: 600, y: 60 },
      { id: 'n4', label: 'func-data-processor', type: 'dependent', risk: 'caution', x: 100, y: 180 },
      { id: 'n5', label: 'app-svc-backend', type: 'dependent', risk: 'caution', x: 300, y: 180 },
      { id: 'n6', label: 'cosmos-orders-db', type: 'dependent', risk: 'safe', x: 500, y: 180 },
      { id: 'n7', label: 'cdn-endpoint', type: 'dependent', risk: 'caution', x: 700, y: 180 },
      { id: 'n8', label: 'api-gateway', type: 'dependent', risk: 'safe', x: 200, y: 300 },
      { id: 'n9', label: 'log-analytics', type: 'dependent', risk: 'safe', x: 500, y: 300 },
    ],
    edges: [
      { from: 'n1', to: 'n4' }, { from: 'n1', to: 'n5' }, { from: 'n2', to: 'n4' },
      { from: 'n2', to: 'n5' }, { from: 'n3', to: 'n6' }, { from: 'n3', to: 'n7' },
      { from: 'n5', to: 'n8' }, { from: 'n6', to: 'n9' }, { from: 'n7', to: 'n9' },
    ],
  },
  'dep-2': {
    nodes: [
      { id: 'n1', label: 'apim-gateway-v3', type: 'changing', risk: 'caution', x: 400, y: 60 },
      { id: 'n2', label: 'apim-policy-set', type: 'changing', risk: 'caution', x: 200, y: 60 },
      { id: 'n3', label: 'nsg-api-tier', type: 'changing', risk: 'breaking', x: 600, y: 60 },
      { id: 'n4', label: 'app-svc-frontend', type: 'dependent', risk: 'caution', x: 150, y: 180 },
      { id: 'n5', label: 'func-webhook', type: 'dependent', risk: 'safe', x: 400, y: 180 },
      { id: 'n6', label: 'aks-ingress', type: 'dependent', risk: 'caution', x: 650, y: 180 },
      { id: 'n7', label: 'dns-zone', type: 'dependent', risk: 'safe', x: 300, y: 300 },
      { id: 'n8', label: 'key-vault-prod', type: 'dependent', risk: 'safe', x: 550, y: 300 },
    ],
    edges: [
      { from: 'n1', to: 'n4' }, { from: 'n1', to: 'n5' }, { from: 'n2', to: 'n5' },
      { from: 'n3', to: 'n6' }, { from: 'n3', to: 'n4' }, { from: 'n4', to: 'n7' },
      { from: 'n6', to: 'n8' },
    ],
  },
};

// Default graph for deployments without a specific graph
export const defaultBlastRadius: BlastRadiusData = {
  nodes: [
    { id: 'n1', label: 'target-resource', type: 'changing', risk: 'caution', x: 400, y: 80 },
    { id: 'n2', label: 'dependent-a', type: 'dependent', risk: 'safe', x: 250, y: 200 },
    { id: 'n3', label: 'dependent-b', type: 'dependent', risk: 'safe', x: 550, y: 200 },
  ],
  edges: [
    { from: 'n1', to: 'n2' }, { from: 'n1', to: 'n3' },
  ],
};

// ─── Risk Breakdown ───
export type RiskCategory =
  | 'Public Endpoint Exposure'
  | 'Missing Encryption'
  | 'Oversized SKUs'
  | 'No Availability Zone'
  | 'Missing Tags'
  | 'Destructive Deletes';

export type RiskSeverity = 'critical' | 'high' | 'medium' | 'low' | 'none';

export interface RiskFactor {
  category: RiskCategory;
  severity: RiskSeverity;
  explanation: string;
  icon: string;
}

export const riskBreakdowns: Record<string, RiskFactor[]> = {
  'dep-1': [
    { category: 'Public Endpoint Exposure', severity: 'high', explanation: 'New storage account exposes blob endpoint without private link', icon: 'globe' },
    { category: 'Missing Encryption', severity: 'critical', explanation: 'Three storage accounts scheduled for deletion contain customer-managed keys — key vault references will break', icon: 'lock-open' },
    { category: 'Oversized SKUs', severity: 'low', explanation: 'Premium_LRS tier selected; workload only requires Standard_LRS', icon: 'resize-large' },
    { category: 'No Availability Zone', severity: 'high', explanation: 'New storage accounts not configured for zone-redundant storage (ZRS)', icon: 'location' },
    { category: 'Missing Tags', severity: 'medium', explanation: '4 of 6 new resources missing cost-center and environment tags', icon: 'tag' },
    { category: 'Destructive Deletes', severity: 'critical', explanation: '3 storage accounts with active containers will be deleted — 2.4 TB data at risk', icon: 'delete' },
  ],
  'dep-2': [
    { category: 'Public Endpoint Exposure', severity: 'critical', explanation: 'API gateway v3 creates new public HTTPS endpoint without WAF protection', icon: 'globe' },
    { category: 'Missing Encryption', severity: 'low', explanation: 'TLS 1.2 configured correctly on all endpoints', icon: 'lock-open' },
    { category: 'Oversized SKUs', severity: 'medium', explanation: 'Premium tier APIM selected for <1000 req/sec workload', icon: 'resize-large' },
    { category: 'No Availability Zone', severity: 'none', explanation: 'Multi-zone deployment configured across 3 zones', icon: 'location' },
    { category: 'Missing Tags', severity: 'low', explanation: 'All resources properly tagged', icon: 'tag' },
    { category: 'Destructive Deletes', severity: 'none', explanation: 'No resources being deleted', icon: 'delete' },
  ],
};

export const defaultRiskBreakdown: RiskFactor[] = [
  { category: 'Public Endpoint Exposure', severity: 'low', explanation: 'No new public endpoints detected', icon: 'globe' },
  { category: 'Missing Encryption', severity: 'none', explanation: 'Encryption at rest and in transit configured', icon: 'lock-open' },
  { category: 'Oversized SKUs', severity: 'low', explanation: 'SKU selections match workload requirements', icon: 'resize-large' },
  { category: 'No Availability Zone', severity: 'medium', explanation: 'Single-zone deployment detected', icon: 'location' },
  { category: 'Missing Tags', severity: 'medium', explanation: 'Some resources missing required tags', icon: 'tag' },
  { category: 'Destructive Deletes', severity: 'none', explanation: 'No destructive operations', icon: 'delete' },
];

// ─── Diff Preview ───
export interface DiffEntry {
  property: string;
  resourceName: string;
  before: string;
  after: string;
  changeType: 'modified' | 'added' | 'removed';
}

export const diffPreviews: Record<string, DiffEntry[]> = {
  'dep-1': [
    { property: 'sku.name', resourceName: 'storage-prod-01', before: 'Standard_LRS', after: 'Premium_LRS', changeType: 'modified' },
    { property: 'properties.supportsHttpsTrafficOnly', resourceName: 'storage-prod-01', before: 'true', after: 'true', changeType: 'modified' },
    { property: 'properties.networkAcls.defaultAction', resourceName: 'storage-prod-01', before: 'Deny', after: 'Allow', changeType: 'modified' },
    { property: 'properties.minimumTlsVersion', resourceName: 'storage-prod-01', before: 'TLS1_2', after: 'TLS1_2', changeType: 'modified' },
    { property: 'resource', resourceName: 'storage-archive', before: 'Microsoft.Storage/storageAccounts', after: '(deleted)', changeType: 'removed' },
    { property: 'properties.encryption.keySource', resourceName: 'storage-prod-02', before: 'Microsoft.Keyvault', after: 'Microsoft.Storage', changeType: 'modified' },
    { property: 'location', resourceName: 'storage-prod-new-01', before: '(not set)', after: 'eastus2', changeType: 'added' },
    { property: 'sku.name', resourceName: 'storage-prod-new-01', before: '(not set)', after: 'Premium_LRS', changeType: 'added' },
  ],
  'dep-2': [
    { property: 'sku.name', resourceName: 'apim-gateway-v3', before: 'Developer', after: 'Premium', changeType: 'modified' },
    { property: 'properties.virtualNetworkType', resourceName: 'apim-gateway-v3', before: 'Internal', after: 'External', changeType: 'modified' },
    { property: 'properties.customProperties.Microsoft.WindowsAzure.ApiManagement.Gateway.Protocols.Server.Http2', resourceName: 'apim-gateway-v3', before: 'false', after: 'true', changeType: 'modified' },
    { property: 'properties.hostnameConfigurations[0].hostName', resourceName: 'apim-gateway-v3', before: 'api-internal.contoso.com', after: 'api.contoso.com', changeType: 'modified' },
    { property: 'properties.securityRules[3].access', resourceName: 'nsg-api-tier', before: 'Deny', after: 'Allow', changeType: 'modified' },
    { property: 'properties.securityRules[3].sourceAddressPrefix', resourceName: 'nsg-api-tier', before: '10.0.0.0/8', after: '*', changeType: 'modified' },
  ],
};

export const defaultDiffPreview: DiffEntry[] = [
  { property: 'sku.name', resourceName: 'resource', before: 'Standard', after: 'Premium', changeType: 'modified' },
  { property: 'location', resourceName: 'resource', before: 'eastus', after: 'eastus2', changeType: 'modified' },
];
