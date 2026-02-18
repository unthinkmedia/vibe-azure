export const serviceName = 'API Management';
export const pageTitle = 'Health Dashboard';

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
      { label: 'Health Dashboard', icon: 'heart-pulse', selected: true },
      { label: 'APIs', icon: 'plug-connected' },
      { label: 'Products', icon: 'box' },
      { label: 'Subscriptions', icon: 'key' },
      { label: 'Analytics', icon: 'data-trending' },
    ],
  },
  {
    heading: 'Monitoring',
    items: [
      { label: 'Metrics', icon: 'chart-multiple' },
      { label: 'Alerts', icon: 'alert' },
      { label: 'Logs', icon: 'document-text' },
      { label: 'Diagnostic settings', icon: 'stethoscope' },
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

// ─── Status Types ───
export type EndpointStatus = 'healthy' | 'degraded' | 'down';

export interface EndpointHealth {
  name: string;
  path: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  status: EndpointStatus;
  p95Ms: number;
  uptimePct: number;
  requestsPerMin: number;
  errorRate: number;
}

export const endpoints: EndpointHealth[] = [
  { name: 'User Auth', path: '/api/v2/auth/login', method: 'POST', status: 'healthy', p95Ms: 142, uptimePct: 99.98, requestsPerMin: 1240, errorRate: 0.02 },
  { name: 'Product Catalog', path: '/api/v2/products', method: 'GET', status: 'healthy', p95Ms: 89, uptimePct: 99.99, requestsPerMin: 3420, errorRate: 0.01 },
  { name: 'Order Submit', path: '/api/v2/orders', method: 'POST', status: 'degraded', p95Ms: 1840, uptimePct: 99.42, requestsPerMin: 890, errorRate: 2.3 },
  { name: 'Payment Process', path: '/api/v2/payments/charge', method: 'POST', status: 'healthy', p95Ms: 320, uptimePct: 99.95, requestsPerMin: 740, errorRate: 0.05 },
  { name: 'Inventory Check', path: '/api/v2/inventory/check', method: 'GET', status: 'healthy', p95Ms: 56, uptimePct: 99.97, requestsPerMin: 2100, errorRate: 0.03 },
  { name: 'Search', path: '/api/v2/search', method: 'GET', status: 'degraded', p95Ms: 2100, uptimePct: 98.80, requestsPerMin: 4500, errorRate: 3.1 },
  { name: 'Notifications', path: '/api/v2/notifications', method: 'POST', status: 'healthy', p95Ms: 210, uptimePct: 99.91, requestsPerMin: 680, errorRate: 0.09 },
  { name: 'User Profile', path: '/api/v2/users/profile', method: 'GET', status: 'healthy', p95Ms: 78, uptimePct: 99.96, requestsPerMin: 1850, errorRate: 0.04 },
  { name: 'Webhook Dispatch', path: '/api/v2/webhooks/dispatch', method: 'POST', status: 'down', p95Ms: 0, uptimePct: 94.20, requestsPerMin: 0, errorRate: 100 },
  { name: 'Analytics Ingest', path: '/api/v2/analytics/events', method: 'POST', status: 'healthy', p95Ms: 165, uptimePct: 99.88, requestsPerMin: 5200, errorRate: 0.12 },
  { name: 'File Upload', path: '/api/v2/files/upload', method: 'POST', status: 'healthy', p95Ms: 480, uptimePct: 99.93, requestsPerMin: 320, errorRate: 0.07 },
  { name: 'Config Service', path: '/api/v2/config', method: 'GET', status: 'healthy', p95Ms: 34, uptimePct: 99.99, requestsPerMin: 960, errorRate: 0.01 },
];

// ─── Latency Chart Data ───
export interface LatencyDataPoint {
  hour: string; // "00:00", "01:00", ...
  p50: number;
  p95: number;
  p99: number;
}

export interface EndpointLatencyData {
  endpointName: string;
  data: LatencyDataPoint[];
}

function generateLatencyData(): LatencyDataPoint[] {
  const points: LatencyDataPoint[] = [];
  for (let h = 0; h < 24; h++) {
    const hour = `${h.toString().padStart(2, '0')}:00`;
    const base = 80 + Math.sin(h * 0.3) * 30;
    const spike = (h >= 9 && h <= 11) ? 60 : 0; // morning traffic spike
    const spike2 = (h >= 14 && h <= 16) ? 40 : 0; // afternoon spike
    points.push({
      hour,
      p50: Math.round(base + spike * 0.5 + spike2 * 0.3 + Math.random() * 15),
      p95: Math.round(base * 2.5 + spike + spike2 + Math.random() * 40),
      p99: Math.round(base * 4 + spike * 2 + spike2 * 1.5 + Math.random() * 80),
    });
  }
  return points;
}

function generateEndpointLatency(name: string, multiplier: number): EndpointLatencyData {
  return {
    endpointName: name,
    data: generateLatencyData().map(p => ({
      ...p,
      p50: Math.round(p.p50 * multiplier),
      p95: Math.round(p.p95 * multiplier),
      p99: Math.round(p.p99 * multiplier),
    })),
  };
}

export const aggregateLatency: LatencyDataPoint[] = generateLatencyData();

export const perEndpointLatency: EndpointLatencyData[] = [
  generateEndpointLatency('Order Submit', 2.2),
  generateEndpointLatency('Search', 2.8),
  generateEndpointLatency('Payment Process', 1.4),
  generateEndpointLatency('User Auth', 1.0),
  generateEndpointLatency('Product Catalog', 0.7),
];

// ─── Failure Log ───
export interface FailureLogEntry {
  timestamp: string;
  endpoint: string;
  method: string;
  httpStatus: number;
  errorMessage: string;
  correlationId: string;
}

const now = new Date();
function timeAgo(minutesAgo: number): string {
  const d = new Date(now.getTime() - minutesAgo * 60000);
  return d.toISOString().replace('T', ' ').slice(0, 19);
}

function uuid(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = (Math.random() * 16) | 0;
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });
}

export const failureLog: FailureLogEntry[] = [
  { timestamp: timeAgo(2), endpoint: '/api/v2/webhooks/dispatch', method: 'POST', httpStatus: 503, errorMessage: 'Service Unavailable: upstream connection refused', correlationId: uuid() },
  { timestamp: timeAgo(3), endpoint: '/api/v2/webhooks/dispatch', method: 'POST', httpStatus: 503, errorMessage: 'Service Unavailable: upstream connection refused', correlationId: uuid() },
  { timestamp: timeAgo(5), endpoint: '/api/v2/search', method: 'GET', httpStatus: 504, errorMessage: 'Gateway Timeout: Elasticsearch cluster not responding within 30s', correlationId: uuid() },
  { timestamp: timeAgo(8), endpoint: '/api/v2/orders', method: 'POST', httpStatus: 500, errorMessage: 'Internal Server Error: deadlock detected in orders_table', correlationId: uuid() },
  { timestamp: timeAgo(12), endpoint: '/api/v2/webhooks/dispatch', method: 'POST', httpStatus: 503, errorMessage: 'Service Unavailable: upstream connection refused', correlationId: uuid() },
  { timestamp: timeAgo(15), endpoint: '/api/v2/search', method: 'GET', httpStatus: 502, errorMessage: 'Bad Gateway: upstream returned invalid response', correlationId: uuid() },
  { timestamp: timeAgo(18), endpoint: '/api/v2/orders', method: 'POST', httpStatus: 429, errorMessage: 'Too Many Requests: rate limit exceeded (1000 req/min)', correlationId: uuid() },
  { timestamp: timeAgo(22), endpoint: '/api/v2/webhooks/dispatch', method: 'POST', httpStatus: 503, errorMessage: 'Service Unavailable: upstream connection refused', correlationId: uuid() },
  { timestamp: timeAgo(28), endpoint: '/api/v2/search', method: 'GET', httpStatus: 504, errorMessage: 'Gateway Timeout: Elasticsearch cluster not responding within 30s', correlationId: uuid() },
  { timestamp: timeAgo(35), endpoint: '/api/v2/payments/charge', method: 'POST', httpStatus: 502, errorMessage: 'Bad Gateway: payment processor returned malformed response', correlationId: uuid() },
  { timestamp: timeAgo(42), endpoint: '/api/v2/orders', method: 'POST', httpStatus: 500, errorMessage: 'Internal Server Error: transaction rollback due to constraint violation', correlationId: uuid() },
  { timestamp: timeAgo(50), endpoint: '/api/v2/files/upload', method: 'POST', httpStatus: 413, errorMessage: 'Payload Too Large: file exceeds 50MB limit', correlationId: uuid() },
  { timestamp: timeAgo(55), endpoint: '/api/v2/search', method: 'GET', httpStatus: 504, errorMessage: 'Gateway Timeout: Elasticsearch cluster not responding within 30s', correlationId: uuid() },
  { timestamp: timeAgo(62), endpoint: '/api/v2/webhooks/dispatch', method: 'POST', httpStatus: 503, errorMessage: 'Service Unavailable: upstream connection refused', correlationId: uuid() },
  { timestamp: timeAgo(70), endpoint: '/api/v2/notifications', method: 'POST', httpStatus: 500, errorMessage: 'Internal Server Error: SMTP connection failed to mail relay', correlationId: uuid() },
  { timestamp: timeAgo(80), endpoint: '/api/v2/orders', method: 'POST', httpStatus: 500, errorMessage: 'Internal Server Error: deadlock detected in orders_table', correlationId: uuid() },
  { timestamp: timeAgo(95), endpoint: '/api/v2/auth/login', method: 'POST', httpStatus: 401, errorMessage: 'Unauthorized: invalid client certificate', correlationId: uuid() },
  { timestamp: timeAgo(110), endpoint: '/api/v2/search', method: 'GET', httpStatus: 502, errorMessage: 'Bad Gateway: upstream returned invalid response', correlationId: uuid() },
  { timestamp: timeAgo(125), endpoint: '/api/v2/analytics/events', method: 'POST', httpStatus: 429, errorMessage: 'Too Many Requests: ingestion quota exceeded for current window', correlationId: uuid() },
  { timestamp: timeAgo(140), endpoint: '/api/v2/webhooks/dispatch', method: 'POST', httpStatus: 503, errorMessage: 'Service Unavailable: upstream connection refused', correlationId: uuid() },
];

// ─── Dependency Map ───
export type DependencyStatus = 'healthy' | 'degraded' | 'down';

export interface ServiceNode {
  id: string;
  label: string;
  type: 'api' | 'database' | 'cache' | 'queue' | 'external' | 'gateway';
  status: DependencyStatus;
  x: number;
  y: number;
}

export interface ServiceEdge {
  from: string;
  to: string;
  status: DependencyStatus;
  latencyMs: number;
  label?: string;
}

export const serviceNodes: ServiceNode[] = [
  { id: 'gateway', label: 'API Gateway', type: 'gateway', status: 'healthy', x: 400, y: 40 },
  { id: 'auth', label: 'Auth Service', type: 'api', status: 'healthy', x: 120, y: 140 },
  { id: 'orders', label: 'Order Service', type: 'api', status: 'degraded', x: 300, y: 140 },
  { id: 'search', label: 'Search Service', type: 'api', status: 'degraded', x: 500, y: 140 },
  { id: 'webhooks', label: 'Webhook Service', type: 'api', status: 'down', x: 680, y: 140 },
  { id: 'sql-db', label: 'SQL Database', type: 'database', status: 'degraded', x: 200, y: 260 },
  { id: 'redis', label: 'Redis Cache', type: 'cache', status: 'healthy', x: 400, y: 260 },
  { id: 'elasticsearch', label: 'Elasticsearch', type: 'database', status: 'degraded', x: 560, y: 260 },
  { id: 'service-bus', label: 'Service Bus', type: 'queue', status: 'healthy', x: 120, y: 260 },
  { id: 'stripe', label: 'Stripe API', type: 'external', status: 'healthy', x: 300, y: 340 },
  { id: 'sendgrid', label: 'SendGrid', type: 'external', status: 'healthy', x: 680, y: 260 },
];

export const serviceEdges: ServiceEdge[] = [
  { from: 'gateway', to: 'auth', status: 'healthy', latencyMs: 12 },
  { from: 'gateway', to: 'orders', status: 'degraded', latencyMs: 45 },
  { from: 'gateway', to: 'search', status: 'degraded', latencyMs: 68 },
  { from: 'gateway', to: 'webhooks', status: 'down', latencyMs: 0 },
  { from: 'auth', to: 'redis', status: 'healthy', latencyMs: 3 },
  { from: 'orders', to: 'sql-db', status: 'degraded', latencyMs: 28, label: 'deadlocks' },
  { from: 'orders', to: 'stripe', status: 'healthy', latencyMs: 120 },
  { from: 'orders', to: 'service-bus', status: 'healthy', latencyMs: 8 },
  { from: 'search', to: 'elasticsearch', status: 'degraded', latencyMs: 890, label: 'slow queries' },
  { from: 'search', to: 'redis', status: 'healthy', latencyMs: 4 },
  { from: 'webhooks', to: 'sendgrid', status: 'down', latencyMs: 0, label: 'conn refused' },
];
