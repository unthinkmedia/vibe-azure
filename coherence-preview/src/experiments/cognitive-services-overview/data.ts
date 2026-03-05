// @ts-nocheck
/** Mock data for Azure Cognitive Services (Speech) overview experiment. */

// ─── Types ───
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

export interface MetricPoint {
  time: string;
  value: number;
}

export interface MetricCard {
  title: string;
  value: string;
  unit: string;
  trend: 'up' | 'down' | 'flat';
  trendLabel: string;
  sparkline: MetricPoint[];
}

export interface QuotaBar {
  label: string;
  used: number;
  limit: number;
  unit: string;
}

export interface ErrorEntry {
  timestamp: string;
  operation: string;
  errorCode: string;
  message: string;
}

export interface SparklineSeriesPoint {
  day: string;
  stt: number;
  tts: number;
  pronunciation: number;
}

// ─── Resource info ───
export const resourceName = 'FigmaFoundry';
export const resourceType = 'Cognitive Services';

export const copilotSuggestions = [
  'Duplicate my Azure AI resource with CLI',
  'Best practices for managing AI resources',
  'Show platform metrics for this AI resource',
];

// ─── Essentials ───
export const essentialsData: EssentialsRow[] = [
  { label: 'Resource group (move)', value: 'rg-abritez-9245', href: '#' },
  { label: 'API Kind', value: 'SpeechServices' },
  { label: 'Status', value: 'Active', status: 'success' },
  { label: 'Pricing tier', value: 'Free' },
  { label: 'Location', value: 'East US' },
  { label: 'Endpoint', value: 'https://eastus.api.cognitive.microsoft.com/', href: '#' },
  { label: 'Subscription (move)', value: 'Azure subscription 1', href: '#' },
  { label: 'Manage keys', value: 'Click here to manage keys', href: '#' },
  { label: 'Subscription ID', value: '813fc56e-c3b3-4222-9586-3e6966997f90' },
  { label: 'Tags (edit)', value: 'Add tags', href: '#' },
];

// ─── API Keys ───
export const apiKeys = {
  key1: '••••••••••••••••••••••a1b2c3',
  key2: '••••••••••••••••••••••d4e5f6',
  region: 'eastus',
  endpoint: 'https://eastus.api.cognitive.microsoft.com/',
};

// ─── Usage KPI Metrics ───
function generateSparkline(base: number, variance: number, points = 7): MetricPoint[] {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  return days.slice(0, points).map((time) => ({
    time,
    value: Math.max(0, base + Math.round((Math.random() - 0.5) * variance)),
  }));
}

export const usageMetrics: MetricCard[] = [
  {
    title: 'Total API Calls',
    value: '12,847',
    unit: 'last 7 days',
    trend: 'up',
    trendLabel: '+14% vs prior week',
    sparkline: generateSparkline(1800, 500),
  },
  {
    title: 'Avg Latency (P95)',
    value: '142',
    unit: 'ms',
    trend: 'down',
    trendLabel: '−8ms vs prior week',
    sparkline: generateSparkline(150, 30),
  },
  {
    title: 'Error Rate',
    value: '0.3%',
    unit: 'of requests',
    trend: 'flat',
    trendLabel: 'Stable',
    sparkline: generateSparkline(4, 3),
  },
  {
    title: 'Quota Used',
    value: '64%',
    unit: 'of free tier',
    trend: 'up',
    trendLabel: '+9% this week',
    sparkline: generateSparkline(60, 15),
  },
];

// ─── API Call Volume by Operation (7 days) ───
export const callVolumeSeries: SparklineSeriesPoint[] = [
  { day: 'Mon', stt: 620, tts: 410, pronunciation: 180 },
  { day: 'Tue', stt: 710, tts: 380, pronunciation: 220 },
  { day: 'Wed', stt: 850, tts: 450, pronunciation: 190 },
  { day: 'Thu', stt: 780, tts: 520, pronunciation: 240 },
  { day: 'Fri', stt: 920, tts: 480, pronunciation: 210 },
  { day: 'Sat', stt: 540, tts: 310, pronunciation: 130 },
  { day: 'Sun', stt: 480, tts: 290, pronunciation: 110 },
];

// ─── Quota Utilization ───
export const quotaBars: QuotaBar[] = [
  { label: 'Speech-to-Text', used: 3200, limit: 5000, unit: 'minutes' },
  { label: 'Text-to-Speech', used: 2840, limit: 5000, unit: 'characters (×1K)' },
  { label: 'Pronunciation Assessment', used: 1280, limit: 5000, unit: 'assessments' },
  { label: 'Custom Speech', used: 420, limit: 1000, unit: 'hours' },
];

// ─── Recent Errors ───
export const recentErrors: ErrorEntry[] = [
  { timestamp: '2026-03-05 14:32:18', operation: 'Speech-to-Text', errorCode: '429', message: 'Rate limit exceeded — retry after 12s' },
  { timestamp: '2026-03-05 13:18:04', operation: 'Text-to-Speech', errorCode: '400', message: 'Invalid SSML — unclosed <voice> tag' },
  { timestamp: '2026-03-05 11:45:52', operation: 'Speech-to-Text', errorCode: '408', message: 'Request timeout — audio stream too long (>60s)' },
  { timestamp: '2026-03-04 22:10:33', operation: 'Pronunciation Assessment', errorCode: '422', message: 'Reference text mismatch — language code unsupported' },
  { timestamp: '2026-03-04 19:55:17', operation: 'Speech-to-Text', errorCode: '429', message: 'Rate limit exceeded — retry after 8s' },
  { timestamp: '2026-03-04 16:42:09', operation: 'Text-to-Speech', errorCode: '503', message: 'Service temporarily unavailable — region failover in progress' },
  { timestamp: '2026-03-04 14:28:41', operation: 'Speech-to-Text', errorCode: '401', message: 'Invalid subscription key — key rotation detected' },
  { timestamp: '2026-03-04 10:15:22', operation: 'Pronunciation Assessment', errorCode: '400', message: 'Audio format not supported — expected WAV 16kHz' },
  { timestamp: '2026-03-03 20:33:58', operation: 'Text-to-Speech', errorCode: '429', message: 'Rate limit exceeded — concurrent request limit reached' },
  { timestamp: '2026-03-03 17:12:45', operation: 'Speech-to-Text', errorCode: '413', message: 'Audio payload too large — max 25MB exceeded' },
];

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
      {
        label: 'Resource visualizer',
        icon: 'https://api.iconify.design/fluent:diagram-24-regular.svg',
        iconFilled: 'https://api.iconify.design/fluent:diagram-24-filled.svg',
      },
    ],
  },
  {
    heading: 'Resource Management',
    items: [
      {
        label: 'Keys and Endpoint',
        icon: 'https://api.iconify.design/fluent:key-24-regular.svg',
        iconFilled: 'https://api.iconify.design/fluent:key-24-filled.svg',
      },
      {
        label: 'Encryption',
        icon: 'https://api.iconify.design/fluent:shield-keyhole-24-regular.svg',
        iconFilled: 'https://api.iconify.design/fluent:shield-keyhole-24-filled.svg',
      },
      {
        label: 'Pricing tier',
        icon: 'https://api.iconify.design/fluent:money-24-regular.svg',
        iconFilled: 'https://api.iconify.design/fluent:money-24-filled.svg',
      },
      {
        label: 'Networking',
        icon: 'https://api.iconify.design/fluent:globe-24-regular.svg',
        iconFilled: 'https://api.iconify.design/fluent:globe-24-filled.svg',
      },
      {
        label: 'Identity',
        icon: 'https://api.iconify.design/fluent:shield-person-24-regular.svg',
        iconFilled: 'https://api.iconify.design/fluent:shield-person-24-filled.svg',
      },
      {
        label: 'Cost analysis',
        icon: 'https://api.iconify.design/fluent:data-pie-24-regular.svg',
        iconFilled: 'https://api.iconify.design/fluent:data-pie-24-filled.svg',
      },
      {
        label: 'Properties',
        icon: 'https://api.iconify.design/fluent:info-24-regular.svg',
        iconFilled: 'https://api.iconify.design/fluent:info-24-filled.svg',
      },
    ],
  },
  {
    heading: 'Security',
    items: [
      {
        label: 'Defender for Cloud',
        icon: 'https://api.iconify.design/fluent:shield-24-regular.svg',
        iconFilled: 'https://api.iconify.design/fluent:shield-24-filled.svg',
      },
    ],
  },
  {
    heading: 'Monitoring',
    items: [
      {
        label: 'Alerts',
        icon: 'https://api.iconify.design/fluent:alert-24-regular.svg',
        iconFilled: 'https://api.iconify.design/fluent:alert-24-filled.svg',
      },
      {
        label: 'Metrics',
        icon: 'https://api.iconify.design/fluent:data-bar-vertical-24-regular.svg',
        iconFilled: 'https://api.iconify.design/fluent:data-bar-vertical-24-filled.svg',
      },
      {
        label: 'Diagnostic settings',
        icon: 'https://api.iconify.design/fluent:wrench-24-regular.svg',
        iconFilled: 'https://api.iconify.design/fluent:wrench-24-filled.svg',
      },
      {
        label: 'Logs',
        icon: 'https://api.iconify.design/fluent:text-align-left-24-regular.svg',
        iconFilled: 'https://api.iconify.design/fluent:text-align-left-24-filled.svg',
      },
    ],
  },
  {
    heading: 'Automation',
    items: [
      {
        label: 'Tasks',
        icon: 'https://api.iconify.design/fluent:clipboard-task-24-regular.svg',
        iconFilled: 'https://api.iconify.design/fluent:clipboard-task-24-filled.svg',
      },
      {
        label: 'Export template',
        icon: 'https://api.iconify.design/fluent:arrow-download-24-regular.svg',
        iconFilled: 'https://api.iconify.design/fluent:arrow-download-24-filled.svg',
      },
    ],
  },
  {
    heading: 'Help',
    items: [
      {
        label: 'Resource health',
        icon: 'https://api.iconify.design/fluent:heart-pulse-24-regular.svg',
        iconFilled: 'https://api.iconify.design/fluent:heart-pulse-24-filled.svg',
      },
      {
        label: 'Support + Troubleshooting',
        icon: 'https://api.iconify.design/fluent:question-circle-24-regular.svg',
        iconFilled: 'https://api.iconify.design/fluent:question-circle-24-filled.svg',
      },
    ],
  },
];
