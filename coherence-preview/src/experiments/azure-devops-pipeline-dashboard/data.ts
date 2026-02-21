export const serviceName = 'Azure DevOps Pipeline';
export const pageTitle = 'Dashboard';

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
      { label: 'Dashboard', icon: 'data-trending', selected: true },
      { label: 'Pipelines', icon: 'pipeline' },
      { label: 'Runs', icon: 'clock' },
      { label: 'Agents', icon: 'people' },
    ],
  },
  {
    heading: 'Insights',
    items: [
      { label: 'Flaky Tests', icon: 'beaker' },
      { label: 'Stage Analytics', icon: 'grid' },
      { label: 'Failure Trends', icon: 'line' },
    ],
  },
  {
    heading: 'Manage',
    items: [
      { label: 'Agent Pools', icon: 'server' },
      { label: 'Service Connections', icon: 'plug-connected' },
      { label: 'Settings', icon: 'settings' },
    ],
  },
];

export interface HealthMetric {
  label: string;
  value: number;
  subtext: string;
  icon: string;
  accent: 'success' | 'danger' | 'brand';
}

export const healthMetrics: HealthMetric[] = [
  { label: 'Passed', value: 148, subtext: 'Last 24 hours', icon: 'checkmark-circle', accent: 'success' },
  { label: 'Failed', value: 23, subtext: 'Last 24 hours', icon: 'dismiss-circle', accent: 'danger' },
  { label: 'In progress', value: 11, subtext: 'Currently running', icon: 'clock', accent: 'brand' },
];

export const successRate = 86;

export type PipelineStatus = 'succeeded' | 'failed' | 'inProgress';

export interface PipelineRun {
  id: string;
  pipeline: string;
  branch: string;
  startedAt: string;
  durationMinutes: number;
  status: PipelineStatus;
  commitMessage: string;
}

export const recentRuns: PipelineRun[] = [
  {
    id: 'run-9281',
    pipeline: 'web-frontend-deploy',
    branch: 'main',
    startedAt: '4 min ago',
    durationMinutes: 19,
    status: 'failed',
    commitMessage: 'Fix auth callback route for federated sign-in',
  },
  {
    id: 'run-9279',
    pipeline: 'payments-api-ci',
    branch: 'release/2026.02',
    startedAt: '11 min ago',
    durationMinutes: 14,
    status: 'succeeded',
    commitMessage: 'Improve retry jitter for charge settlement worker',
  },
  {
    id: 'run-9278',
    pipeline: 'infra-network-validate',
    branch: 'main',
    startedAt: '18 min ago',
    durationMinutes: 32,
    status: 'inProgress',
    commitMessage: 'Tighten NSG rules for build subnet egress',
  },
  {
    id: 'run-9276',
    pipeline: 'mobile-app-ci',
    branch: 'feature/offline-cache',
    startedAt: '24 min ago',
    durationMinutes: 9,
    status: 'succeeded',
    commitMessage: 'Add telemetry for sync conflict resolution',
  },
  {
    id: 'run-9275',
    pipeline: 'data-platform-nightly',
    branch: 'main',
    startedAt: '38 min ago',
    durationMinutes: 47,
    status: 'failed',
    commitMessage: 'Upgrade spark image to patch CVE-2026-1412',
  },
  {
    id: 'run-9274',
    pipeline: 'shared-services-smoke',
    branch: 'main',
    startedAt: '52 min ago',
    durationMinutes: 7,
    status: 'succeeded',
    commitMessage: 'Refresh synthetic probes for API gateway edge',
  },
];

export interface StageBreakdown {
  stage: string;
  pipelineCount: number;
  avgDurationMinutes: number;
  p95DurationMinutes: number;
}

export const slowestStages: StageBreakdown[] = [
  { stage: 'Integration tests', pipelineCount: 12, avgDurationMinutes: 18.6, p95DurationMinutes: 27.8 },
  { stage: 'Container security scan', pipelineCount: 10, avgDurationMinutes: 15.3, p95DurationMinutes: 24.1 },
  { stage: 'E2E browser suite', pipelineCount: 8, avgDurationMinutes: 13.1, p95DurationMinutes: 21.4 },
  { stage: 'Terraform plan', pipelineCount: 7, avgDurationMinutes: 11.9, p95DurationMinutes: 17.2 },
  { stage: 'Artifact publish', pipelineCount: 19, avgDurationMinutes: 9.4, p95DurationMinutes: 13.8 },
];

export interface AgentPool {
  pool: string;
  online: number;
  busy: number;
  offline: number;
}

export const agentPools: AgentPool[] = [
  { pool: 'Hosted Ubuntu 22', online: 42, busy: 33, offline: 2 },
  { pool: 'Hosted Windows 2022', online: 28, busy: 21, offline: 3 },
  { pool: 'Self-hosted Linux', online: 16, busy: 14, offline: 1 },
  { pool: 'GPU Build Pool', online: 6, busy: 5, offline: 2 },
];

export interface FailingPipelineAlert {
  pipeline: string;
  failingForHours: number;
  lastFailureReason: string;
}

export const longFailingPipelines: FailingPipelineAlert[] = [
  {
    pipeline: 'web-frontend-deploy',
    failingForHours: 31,
    lastFailureReason: 'Playwright smoke tests timing out in East US ring',
  },
  {
    pipeline: 'data-platform-nightly',
    failingForHours: 27,
    lastFailureReason: 'Spark dependency conflict on transitive parquet package',
  },
];
