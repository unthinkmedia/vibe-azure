export type AgentStatus = 'healthy' | 'degraded' | 'offline';

export interface Agent {
  id: string;
  name: string;
  description: string;
  status: AgentStatus;
  lastActive: string;
  invocations24h: number;
  avgLatencyMs: number;
  successRate: number; // 0–100
}

export interface ActivityEntry {
  id: string;
  agentName: string;
  timestamp: string;
  durationMs: number;
  result: 'success' | 'failure' | 'timeout';
  summary: string;
}

export const agents: Agent[] = [
  {
    id: 'azqr-cost',
    name: 'AzqrCostOptimizeAgent',
    description: 'Identifies cost savings via Azure Quick Review (azqr) scans and compliance best practices.',
    status: 'healthy',
    lastActive: '2 min ago',
    invocations24h: 47,
    avgLatencyMs: 3200,
    successRate: 97.9,
  },
  {
    id: 'azure-cost',
    name: 'AzureCostOptimizeAgent',
    description: 'Analyzes Azure Monitor metrics and billing data to recommend right-sizing and orphaned resource cleanup.',
    status: 'healthy',
    lastActive: '8 min ago',
    invocations24h: 62,
    avgLatencyMs: 4100,
    successRate: 95.2,
  },
  {
    id: 'mcp-appservice',
    name: 'MCP AppService Builder',
    description: 'Plans, scaffolds, and deploys .NET 10 MCP App Service servers with azd/Bicep and RBAC.',
    status: 'degraded',
    lastActive: '23 min ago',
    invocations24h: 18,
    avgLatencyMs: 8900,
    successRate: 83.3,
  },
  {
    id: 'iac-exporter',
    name: 'Azure IaC Exporter',
    description: 'Exports existing Azure resources to Bicep, ARM, Terraform, or Pulumi templates via Resource Graph.',
    status: 'healthy',
    lastActive: '5 min ago',
    invocations24h: 31,
    avgLatencyMs: 5400,
    successRate: 96.8,
  },
  {
    id: 'iac-generator',
    name: 'Azure IaC Generator',
    description: 'Generates Infrastructure as Code with format-specific validation and best practices for Bicep, ARM, Terraform, and Pulumi.',
    status: 'healthy',
    lastActive: '12 min ago',
    invocations24h: 54,
    avgLatencyMs: 3800,
    successRate: 98.1,
  },
  {
    id: 'explore',
    name: 'Explore',
    description: 'Fast read-only codebase exploration and Q&A subagent for searching and reading workspace files.',
    status: 'offline',
    lastActive: '4h ago',
    invocations24h: 5,
    avgLatencyMs: 1200,
    successRate: 100,
  },
];

export const recentActivity: ActivityEntry[] = [
  { id: '1', agentName: 'AzureCostOptimizeAgent', timestamp: '3/4/2026, 2:47 PM', durationMs: 4200, result: 'success', summary: 'Analyzed subscription costs — found 3 orphaned disks ($42/mo savings)' },
  { id: '2', agentName: 'Azure IaC Generator', timestamp: '3/4/2026, 2:38 PM', durationMs: 3100, result: 'success', summary: 'Generated Bicep template for Container App + Key Vault + RBAC' },
  { id: '3', agentName: 'MCP AppService Builder', timestamp: '3/4/2026, 2:31 PM', durationMs: 12400, result: 'failure', summary: 'Deploy failed — App Service Plan SKU not available in westus3' },
  { id: '4', agentName: 'AzqrCostOptimizeAgent', timestamp: '3/4/2026, 2:22 PM', durationMs: 2800, result: 'success', summary: 'Compliance scan complete — 94/100 checks passed' },
  { id: '5', agentName: 'Azure IaC Exporter', timestamp: '3/4/2026, 2:15 PM', durationMs: 6700, result: 'success', summary: 'Exported 12 resources from rg-production to Terraform' },
  { id: '6', agentName: 'AzureCostOptimizeAgent', timestamp: '3/4/2026, 1:58 PM', durationMs: 3900, result: 'success', summary: 'Right-sizing analysis — recommended B2s→B1s for 2 VMs ($18/mo savings)' },
  { id: '7', agentName: 'MCP AppService Builder', timestamp: '3/4/2026, 1:45 PM', durationMs: 15200, result: 'timeout', summary: 'Scaffold timed out — azd provision exceeded 120s deadline' },
  { id: '8', agentName: 'Azure IaC Generator', timestamp: '3/4/2026, 1:32 PM', durationMs: 2400, result: 'success', summary: 'Generated ARM template for Event Hub + consumer group' },
  { id: '9', agentName: 'Explore', timestamp: '3/4/2026, 10:14 AM', durationMs: 890, result: 'success', summary: 'Found 4 usages of DefaultAzureCredential across 3 files' },
  { id: '10', agentName: 'AzqrCostOptimizeAgent', timestamp: '3/4/2026, 9:55 AM', durationMs: 3400, result: 'success', summary: 'Key Vault expiration audit — 2 secrets expiring within 30 days' },
];

export const copilotSuggestions = [
  'Which agents have the highest failure rate?',
  'Show me agents with latency above 5 seconds',
  'Why is MCP AppService Builder degraded?',
];
