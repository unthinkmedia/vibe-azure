export const serviceName = 'Network Security';
export const pageTitle = 'Dashboard';

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
      { label: 'Dashboard', icon: 'gauge', selected: true },
      { label: 'Overview', icon: 'home' },
      { label: 'Firewall Policies', icon: 'shield-keyhole' },
      { label: 'DDoS Protection', icon: 'shield-error' },
      { label: 'NSG Rules', icon: 'list' },
    ],
  },
  {
    heading: 'Monitoring',
    items: [
      { label: 'Traffic Analytics', icon: 'data-trending' },
      { label: 'Flow Logs', icon: 'document-text' },
      { label: 'Alerts', icon: 'alert' },
      { label: 'Diagnostics', icon: 'stethoscope' },
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

// ─── Threat Summary ───
export interface ThreatMetric {
  label: string;
  value: string;
  subtext: string;
  icon: string;
  accent: 'red' | 'amber' | 'blue' | 'green';
}

export const threatMetrics: ThreatMetric[] = [
  { label: 'Blocked Attacks', value: '12,847', subtext: 'Last 24 hours', icon: 'shield-dismiss', accent: 'red' },
  { label: 'Active DDoS Mitigations', value: '3', subtext: '2 volumetric, 1 protocol', icon: 'shield-error', accent: 'amber' },
  { label: 'NSG Rule Violations', value: '17', subtext: '5 critical, 8 high, 4 medium', icon: 'warning', accent: 'blue' },
  { label: 'Threat Score', value: '72/100', subtext: 'Moderate risk', icon: 'shield-checkmark', accent: 'green' },
];

// ─── Geographic Attack Map ───
export interface AttackOrigin {
  country: string;
  code: string;
  threatCount: number;
  topAttackType: string;
  percentageOfTotal: number;
}

export const attackOrigins: AttackOrigin[] = [
  { country: 'China', code: 'CN', threatCount: 3842, topAttackType: 'Port Scanning', percentageOfTotal: 29.9 },
  { country: 'Russia', code: 'RU', threatCount: 2156, topAttackType: 'Brute Force SSH', percentageOfTotal: 16.8 },
  { country: 'United States', code: 'US', threatCount: 1893, topAttackType: 'SQL Injection', percentageOfTotal: 14.7 },
  { country: 'Brazil', code: 'BR', threatCount: 1247, topAttackType: 'DDoS Amplification', percentageOfTotal: 9.7 },
  { country: 'India', code: 'IN', threatCount: 987, topAttackType: 'Credential Stuffing', percentageOfTotal: 7.7 },
  { country: 'Iran', code: 'IR', threatCount: 812, topAttackType: 'DNS Tunneling', percentageOfTotal: 6.3 },
  { country: 'North Korea', code: 'KP', threatCount: 654, topAttackType: 'Zero-day Exploit', percentageOfTotal: 5.1 },
  { country: 'Vietnam', code: 'VN', threatCount: 498, topAttackType: 'Phishing', percentageOfTotal: 3.9 },
  { country: 'Nigeria', code: 'NG', threatCount: 421, topAttackType: 'BEC Attempt', percentageOfTotal: 3.3 },
  { country: 'Germany', code: 'DE', threatCount: 337, topAttackType: 'Web Scraping', percentageOfTotal: 2.6 },
];

// ─── Firewall Events ───
export type FirewallAction = 'deny' | 'allow';
export type EventSeverity = 'critical' | 'high' | 'medium' | 'low' | 'info';

export interface FirewallEvent {
  id: string;
  timestamp: string;
  sourceIP: string;
  destination: string;
  action: FirewallAction;
  ruleName: string;
  severity: EventSeverity;
  protocol: string;
  port: number;
}

export const firewallEvents: FirewallEvent[] = [
  { id: 'fw-1', timestamp: '2026-02-19 18:32:14', sourceIP: '103.47.92.18', destination: 'vm-prod-web-01:443', action: 'deny', ruleName: 'Block-Suspicious-CN', severity: 'critical', protocol: 'TCP', port: 443 },
  { id: 'fw-2', timestamp: '2026-02-19 18:31:56', sourceIP: '185.220.101.34', destination: 'aks-ingress:80', action: 'deny', ruleName: 'DDoS-Mitigation-RU', severity: 'high', protocol: 'TCP', port: 80 },
  { id: 'fw-3', timestamp: '2026-02-19 18:31:42', sourceIP: '10.0.1.45', destination: 'sql-prod-01:1433', action: 'allow', ruleName: 'Internal-DB-Access', severity: 'info', protocol: 'TCP', port: 1433 },
  { id: 'fw-4', timestamp: '2026-02-19 18:31:28', sourceIP: '45.33.32.156', destination: 'vm-prod-api-02:22', action: 'deny', ruleName: 'Block-SSH-External', severity: 'high', protocol: 'TCP', port: 22 },
  { id: 'fw-5', timestamp: '2026-02-19 18:31:15', sourceIP: '198.51.100.27', destination: 'apim-gateway:443', action: 'allow', ruleName: 'Allow-APIM-Public', severity: 'low', protocol: 'TCP', port: 443 },
  { id: 'fw-6', timestamp: '2026-02-19 18:30:58', sourceIP: '203.0.113.89', destination: 'vm-prod-web-03:3389', action: 'deny', ruleName: 'Block-RDP-External', severity: 'critical', protocol: 'TCP', port: 3389 },
  { id: 'fw-7', timestamp: '2026-02-19 18:30:41', sourceIP: '10.0.2.12', destination: 'storage-logs-01:445', action: 'allow', ruleName: 'Internal-Storage', severity: 'info', protocol: 'TCP', port: 445 },
  { id: 'fw-8', timestamp: '2026-02-19 18:30:22', sourceIP: '91.134.56.78', destination: 'vm-staging-01:8080', action: 'deny', ruleName: 'Block-Suspicious-EU', severity: 'medium', protocol: 'TCP', port: 8080 },
  { id: 'fw-9', timestamp: '2026-02-19 18:30:05', sourceIP: '177.54.123.90', destination: 'aks-ingress:443', action: 'deny', ruleName: 'Rate-Limit-BR', severity: 'medium', protocol: 'TCP', port: 443 },
  { id: 'fw-10', timestamp: '2026-02-19 18:29:48', sourceIP: '10.0.3.8', destination: 'redis-cache:6379', action: 'allow', ruleName: 'Internal-Cache', severity: 'info', protocol: 'TCP', port: 6379 },
  { id: 'fw-11', timestamp: '2026-02-19 18:29:31', sourceIP: '62.210.44.12', destination: 'vm-prod-web-01:80', action: 'deny', ruleName: 'GeoBlock-Restricted', severity: 'high', protocol: 'TCP', port: 80 },
  { id: 'fw-12', timestamp: '2026-02-19 18:29:14', sourceIP: '10.0.1.100', destination: 'cosmos-db:443', action: 'allow', ruleName: 'Internal-CosmosDB', severity: 'info', protocol: 'TCP', port: 443 },
  { id: 'fw-13', timestamp: '2026-02-19 18:28:56', sourceIP: '139.59.20.45', destination: 'vm-prod-api-01:443', action: 'deny', ruleName: 'Block-Brute-Force', severity: 'critical', protocol: 'TCP', port: 443 },
  { id: 'fw-14', timestamp: '2026-02-19 18:28:38', sourceIP: '10.0.2.55', destination: 'kv-prod-secrets:443', action: 'allow', ruleName: 'Internal-KeyVault', severity: 'low', protocol: 'TCP', port: 443 },
  { id: 'fw-15', timestamp: '2026-02-19 18:28:20', sourceIP: '84.17.46.91', destination: 'func-app-prod:443', action: 'deny', ruleName: 'WAF-SQLi-Block', severity: 'critical', protocol: 'TCP', port: 443 },
];

// ─── NSG Recommendations ───
export type RecommendationPriority = 'critical' | 'high' | 'medium';

export interface NSGRecommendation {
  id: string;
  title: string;
  description: string;
  priority: RecommendationPriority;
  affectedResources: number;
  nsgName: string;
  currentRule: string;
  suggestedAction: string;
}

export const nsgRecommendations: NSGRecommendation[] = [
  { id: 'rec-1', title: 'Close RDP port to internet', description: 'NSG allows inbound RDP (3389) from any source. Restrict to known IP ranges or use Azure Bastion.', priority: 'critical', affectedResources: 4, nsgName: 'nsg-prod-web', currentRule: 'Allow-RDP-Any → Inbound 3389 from 0.0.0.0/0', suggestedAction: 'Restrict source to VPN CIDR or remove rule' },
  { id: 'rec-2', title: 'Close SSH port to internet', description: 'NSG allows inbound SSH (22) from any source. Use Azure Bastion or restrict to jump box IPs.', priority: 'critical', affectedResources: 6, nsgName: 'nsg-prod-api', currentRule: 'Allow-SSH-Any → Inbound 22 from 0.0.0.0/0', suggestedAction: 'Remove rule and use Azure Bastion' },
  { id: 'rec-3', title: 'Restrict SQL server access', description: 'SQL port 1433 is open to the entire VNet. Limit to application subnet only.', priority: 'critical', affectedResources: 2, nsgName: 'nsg-prod-data', currentRule: 'Allow-SQL-VNet → Inbound 1433 from VirtualNetwork', suggestedAction: 'Restrict source to 10.0.1.0/24 (app subnet)' },
  { id: 'rec-4', title: 'Enable NSG flow logs', description: 'Flow logs are not enabled on 3 NSGs. Enable for traffic visibility and threat detection.', priority: 'high', affectedResources: 3, nsgName: 'nsg-staging-*', currentRule: 'No flow logs configured', suggestedAction: 'Enable NSG flow logs v2 with Traffic Analytics' },
  { id: 'rec-5', title: 'Remove unused allow rules', description: '5 allow rules reference security groups with no active members. Clean up to reduce attack surface.', priority: 'high', affectedResources: 5, nsgName: 'nsg-prod-web', currentRule: 'Multiple unused allow rules', suggestedAction: 'Audit and remove unused rules' },
  { id: 'rec-6', title: 'Restrict outbound to internet', description: 'Default outbound rule allows all traffic to internet. Add explicit outbound rules.', priority: 'high', affectedResources: 8, nsgName: 'nsg-prod-*', currentRule: 'AllowInternetOutbound → Any to Internet', suggestedAction: 'Deny by default, allow specific destinations' },
  { id: 'rec-7', title: 'Enable DDoS Standard protection', description: 'VNet uses Basic DDoS protection. Upgrade to Standard for advanced mitigation and metrics.', priority: 'high', affectedResources: 2, nsgName: 'vnet-prod', currentRule: 'DDoS Basic enabled', suggestedAction: 'Enable DDoS Protection Standard plan' },
  { id: 'rec-8', title: 'Use application security groups', description: 'Rules reference IP ranges instead of ASGs. Migrate to ASGs for easier management.', priority: 'medium', affectedResources: 12, nsgName: 'nsg-prod-*', currentRule: 'IP-based source/destination rules', suggestedAction: 'Create ASGs and update rules' },
  { id: 'rec-9', title: 'Review overly permissive rules', description: '3 rules allow traffic on all ports. Restrict to required ports only.', priority: 'medium', affectedResources: 3, nsgName: 'nsg-dev-general', currentRule: 'Allow-All-Ports → Inbound * from 10.0.0.0/8', suggestedAction: 'Restrict to specific ports (80, 443, 22)' },
  { id: 'rec-10', title: 'Tag all NSGs for compliance', description: '4 NSGs are missing required tags (Environment, Owner, CostCenter).', priority: 'medium', affectedResources: 4, nsgName: 'Various', currentRule: 'Missing required tags', suggestedAction: 'Apply Environment, Owner, CostCenter tags' },
];
