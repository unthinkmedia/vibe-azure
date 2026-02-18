import { useState } from 'react';
import { CuiButton, CuiIcon } from '@charm-ux/cui/react';
import {
  endpoints,
  aggregateLatency,
  perEndpointLatency,
  failureLog,
  serviceNodes,
  serviceEdges,
  type EndpointHealth,
  type EndpointStatus,
  type LatencyDataPoint,
  type EndpointLatencyData,
  type FailureLogEntry,
  type ServiceNode,
  type ServiceEdge,
  type DependencyStatus,
} from './data';

// ─── Helpers ───
const statusColor: Record<EndpointStatus, string> = {
  healthy: '#1b7d3a',
  degraded: '#b8860b',
  down: '#c62828',
};

const statusIcon: Record<EndpointStatus, string> = {
  healthy: '●',
  degraded: '▲',
  down: '✕',
};

// ─── Summary Bar ───
function SummaryBar() {
  const healthy = endpoints.filter(e => e.status === 'healthy').length;
  const degraded = endpoints.filter(e => e.status === 'degraded').length;
  const down = endpoints.filter(e => e.status === 'down').length;

  return (
    <div className="summary-bar">
      <div className="summary-chip">
        <span className="summary-dot healthy" /> {healthy} Healthy
      </div>
      <div className="summary-chip">
        <span className="summary-dot degraded" /> {degraded} Degraded
      </div>
      <div className="summary-chip">
        <span className="summary-dot down" /> {down} Down
      </div>
      <div className="summary-chip" style={{ marginLeft: 'auto' }}>
        <CuiIcon url="https://api.iconify.design/fluent:clock-24-regular.svg" style={{ fontSize: 14 }} />
        Last updated: just now
      </div>
    </div>
  );
}

// ─── Status Grid ───
function StatusGrid() {
  return (
    <div className="health-section">
      <h2>Endpoint Status</h2>
      <p className="health-section-desc">Current health of each API endpoint with P95 latency and 7-day uptime.</p>
      <div className="status-grid">
        {endpoints.map((ep) => (
          <StatusCard key={ep.path} endpoint={ep} />
        ))}
      </div>
    </div>
  );
}

function StatusCard({ endpoint: ep }: { endpoint: EndpointHealth }) {
  const p95Class = ep.p95Ms > 2000 ? 'crit' : ep.p95Ms > 1000 ? 'warn' : '';
  const uptimeClass = ep.uptimePct < 95 ? 'crit' : ep.uptimePct < 99 ? 'warn' : '';

  return (
    <div className="status-card">
      <div className="status-card-header">
        <div className="status-card-name">{ep.name}</div>
        <span className={`status-badge ${ep.status}`}>
          {statusIcon[ep.status]} {ep.status}
        </span>
      </div>
      <div className="status-card-path">
        <span className={`status-card-method ${ep.method}`}>{ep.method}</span>
        {ep.path}
      </div>
      <div className="status-card-metrics">
        <div className="status-metric">
          <span className="status-metric-label">P95 Latency</span>
          <span className={`status-metric-value ${p95Class}`}>
            {ep.status === 'down' ? '—' : `${ep.p95Ms}ms`}
          </span>
        </div>
        <div className="status-metric">
          <span className="status-metric-label">Uptime (7d)</span>
          <span className={`status-metric-value ${uptimeClass}`}>
            {ep.uptimePct.toFixed(2)}%
          </span>
        </div>
        <div className="status-metric">
          <span className="status-metric-label">Req/min</span>
          <span className="status-metric-value">
            {ep.status === 'down' ? '—' : ep.requestsPerMin.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── Latency Chart ───
const lineColors = {
  p50: '#1565c0',
  p95: '#e65100',
  p99: '#c62828',
};

const endpointLineColors = ['#1565c0', '#2e7d32', '#6a1b9a', '#e65100', '#00838f'];

function LatencyChart() {
  const [showPerEndpoint, setShowPerEndpoint] = useState(false);
  const [selectedEndpoints, setSelectedEndpoints] = useState<string[]>(
    perEndpointLatency.map(e => e.endpointName)
  );

  const padding = { top: 20, right: 20, bottom: 30, left: 50 };
  const width = 800;
  const height = 260;
  const innerW = width - padding.left - padding.right;
  const innerH = height - padding.top - padding.bottom;

  const dataSource = showPerEndpoint
    ? perEndpointLatency.filter(e => selectedEndpoints.includes(e.endpointName))
    : [{ endpointName: 'All', data: aggregateLatency }];

  // Compute y domain
  let maxVal = 0;
  if (showPerEndpoint) {
    dataSource.forEach(ep => ep.data.forEach(d => {
      maxVal = Math.max(maxVal, d.p95);
    }));
  } else {
    aggregateLatency.forEach(d => {
      maxVal = Math.max(maxVal, d.p99);
    });
  }
  maxVal = maxVal * 1.1;

  const xScale = (i: number) => padding.left + (i / 23) * innerW;
  const yScale = (v: number) => padding.top + innerH - (v / maxVal) * innerH;

  function makePath(data: LatencyDataPoint[], key: 'p50' | 'p95' | 'p99'): string {
    return data
      .map((d, i) => `${i === 0 ? 'M' : 'L'}${xScale(i).toFixed(1)},${yScale(d[key]).toFixed(1)}`)
      .join(' ');
  }

  function toggleEndpoint(name: string) {
    setSelectedEndpoints(prev =>
      prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name]
    );
  }

  return (
    <div className="health-section">
      <h2>Latency Distribution (24h)</h2>
      <p className="health-section-desc">Response time percentiles over the past 24 hours.</p>
      <div className="latency-wrap">
        <div className="latency-controls">
          <button
            className={`latency-toggle ${!showPerEndpoint ? 'active' : ''}`}
            onClick={() => setShowPerEndpoint(false)}
          >
            Aggregate
          </button>
          <button
            className={`latency-toggle ${showPerEndpoint ? 'active' : ''}`}
            onClick={() => setShowPerEndpoint(true)}
          >
            Per Endpoint
          </button>
          {showPerEndpoint && (
            <>
              <span style={{ width: 1, height: 20, background: 'var(--neutral-stroke2)', display: 'inline-block' }} />
              {perEndpointLatency.map((ep, i) => (
                <button
                  key={ep.endpointName}
                  className={`latency-toggle ${selectedEndpoints.includes(ep.endpointName) ? 'active' : ''}`}
                  style={selectedEndpoints.includes(ep.endpointName) ? {
                    borderColor: endpointLineColors[i],
                    color: endpointLineColors[i],
                    background: endpointLineColors[i] + '18',
                  } : undefined}
                  onClick={() => toggleEndpoint(ep.endpointName)}
                >
                  {ep.endpointName}
                </button>
              ))}
            </>
          )}
        </div>

        <svg viewBox={`0 0 ${width} ${height}`} className="latency-svg">
          {/* Y-axis grid + labels */}
          {[0, 0.25, 0.5, 0.75, 1].map(pct => {
            const val = pct * maxVal;
            const y = yScale(val);
            return (
              <g key={pct}>
                <line x1={padding.left} y1={y} x2={width - padding.right} y2={y} stroke="var(--neutral-stroke2)" strokeDasharray="3,3" />
                <text x={padding.left - 6} y={y + 4} textAnchor="end" fontSize="10" fill="var(--neutral-foreground3)">
                  {val >= 1000 ? `${(val / 1000).toFixed(1)}s` : `${Math.round(val)}ms`}
                </text>
              </g>
            );
          })}

          {/* X-axis labels — every 3 hours */}
          {aggregateLatency.map((d, i) =>
            i % 3 === 0 ? (
              <text key={i} x={xScale(i)} y={height - 6} textAnchor="middle" fontSize="10" fill="var(--neutral-foreground3)">
                {d.hour}
              </text>
            ) : null
          )}

          {!showPerEndpoint ? (
            <>
              {/* Aggregate: P50, P95, P99 */}
              <path d={makePath(aggregateLatency, 'p50')} fill="none" stroke={lineColors.p50} strokeWidth={2} />
              <path d={makePath(aggregateLatency, 'p95')} fill="none" stroke={lineColors.p95} strokeWidth={2} />
              <path d={makePath(aggregateLatency, 'p99')} fill="none" stroke={lineColors.p99} strokeWidth={2} strokeDasharray="6,3" />
            </>
          ) : (
            <>
              {/* Per-endpoint: P95 lines */}
              {dataSource.map((ep, i) => {
                const colorIdx = perEndpointLatency.findIndex(e => e.endpointName === ep.endpointName);
                return (
                  <path
                    key={ep.endpointName}
                    d={makePath(ep.data, 'p95')}
                    fill="none"
                    stroke={endpointLineColors[colorIdx >= 0 ? colorIdx : i]}
                    strokeWidth={2}
                  />
                );
              })}
            </>
          )}
        </svg>

        <div className="latency-legend">
          {!showPerEndpoint ? (
            <>
              <span className="latency-legend-item">
                <span className="latency-legend-line" style={{ background: lineColors.p50 }} /> P50
              </span>
              <span className="latency-legend-item">
                <span className="latency-legend-line" style={{ background: lineColors.p95 }} /> P95
              </span>
              <span className="latency-legend-item">
                <span className="latency-legend-line" style={{ background: lineColors.p99, borderTop: '2px dashed ' + lineColors.p99, height: 0 }} /> P99
              </span>
            </>
          ) : (
            dataSource.map((ep, i) => {
              const colorIdx = perEndpointLatency.findIndex(e => e.endpointName === ep.endpointName);
              return (
                <span key={ep.endpointName} className="latency-legend-item">
                  <span className="latency-legend-line" style={{ background: endpointLineColors[colorIdx >= 0 ? colorIdx : i] }} /> {ep.endpointName} (P95)
                </span>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Failure Log ───
function FailureLog() {
  return (
    <div className="health-section">
      <h2>Failure Log</h2>
      <p className="health-section-desc">Last 20 failed requests across all endpoints.</p>
      <div className="failure-table-wrap">
        <table className="failure-table">
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>Endpoint</th>
              <th>Status</th>
              <th>Error Message</th>
              <th>Correlation ID</th>
            </tr>
          </thead>
          <tbody>
            {failureLog.map((entry, i) => (
              <FailureRow key={i} entry={entry} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function FailureRow({ entry }: { entry: FailureLogEntry }) {
  const statusClass = entry.httpStatus >= 500 ? 's5xx' : 's4xx';

  return (
    <tr>
      <td style={{ whiteSpace: 'nowrap', fontSize: 12, fontFamily: 'var(--font-family-monospace, monospace)' }}>
        {entry.timestamp}
      </td>
      <td>
        <span className={`status-card-method ${entry.method}`}>{entry.method}</span>
        <span style={{ fontSize: 12 }}>{entry.endpoint}</span>
      </td>
      <td>
        <span className={`http-status-badge ${statusClass}`}>{entry.httpStatus}</span>
      </td>
      <td>
        <span className="error-message" title={entry.errorMessage}>{entry.errorMessage}</span>
      </td>
      <td>
        <span className="correlation-id" title={`Click to copy: ${entry.correlationId}`}>
          {entry.correlationId.slice(0, 8)}…
        </span>
      </td>
    </tr>
  );
}

// ─── Dependency Map ───
const nodeTypeColors: Record<ServiceNode['type'], string> = {
  gateway: '#1565c0',
  api: '#0078d4',
  database: '#6a1b9a',
  cache: '#e65100',
  queue: '#2e7d32',
  external: '#616161',
};

const nodeTypeLabels: Record<ServiceNode['type'], string> = {
  gateway: 'Gateway',
  api: 'API Service',
  database: 'Database',
  cache: 'Cache',
  queue: 'Message Queue',
  external: 'External',
};

const depStatusColor: Record<DependencyStatus, string> = {
  healthy: '#1b7d3a',
  degraded: '#b8860b',
  down: '#c62828',
};

function DependencyMap() {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const svgWidth = 800;
  const svgHeight = 400;

  return (
    <div className="health-section">
      <h2>Service Dependencies</h2>
      <p className="health-section-desc">Upstream and downstream service connections with health indicators.</p>
      <div className="depmap-wrap">
        <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="depmap-svg">
          {/* Edges */}
          {serviceEdges.map((edge, i) => {
            const from = serviceNodes.find(n => n.id === edge.from)!;
            const to = serviceNodes.find(n => n.id === edge.to)!;
            const midX = (from.x + to.x) / 2;
            const midY = (from.y + to.y) / 2;
            const isHighlighted = hoveredNode === edge.from || hoveredNode === edge.to;

            return (
              <g key={i}>
                <line
                  x1={from.x} y1={from.y + 16}
                  x2={to.x} y2={to.y - 16}
                  stroke={depStatusColor[edge.status]}
                  strokeWidth={isHighlighted ? 3 : 2}
                  strokeDasharray={edge.status === 'down' ? '6,4' : undefined}
                  opacity={hoveredNode && !isHighlighted ? 0.2 : 1}
                />
                {/* Latency label on edge */}
                <rect
                  x={midX - 22} y={midY - 8}
                  width={44} height={16}
                  rx={4}
                  fill="var(--neutral-background1)"
                  stroke={depStatusColor[edge.status]}
                  strokeWidth={1}
                  opacity={hoveredNode && !isHighlighted ? 0.2 : 1}
                />
                <text
                  x={midX} y={midY + 4}
                  textAnchor="middle"
                  fontSize="9"
                  fontWeight="600"
                  fill={depStatusColor[edge.status]}
                  opacity={hoveredNode && !isHighlighted ? 0.2 : 1}
                >
                  {edge.status === 'down' ? 'DOWN' : `${edge.latencyMs}ms`}
                </text>
                {/* Edge label */}
                {edge.label && (
                  <text
                    x={midX} y={midY + 18}
                    textAnchor="middle"
                    fontSize="8"
                    fill="var(--neutral-foreground3)"
                    opacity={hoveredNode && !isHighlighted ? 0.2 : 1}
                  >
                    {edge.label}
                  </text>
                )}
              </g>
            );
          })}

          {/* Nodes */}
          {serviceNodes.map((node) => {
            const isHighlighted = !hoveredNode || hoveredNode === node.id ||
              serviceEdges.some(e => (e.from === hoveredNode && e.to === node.id) || (e.to === hoveredNode && e.from === node.id));

            return (
              <g
                key={node.id}
                opacity={isHighlighted ? 1 : 0.2}
                style={{ cursor: 'pointer' }}
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
              >
                {/* Node background */}
                <rect
                  x={node.x - 52} y={node.y - 16}
                  width={104} height={32}
                  rx={6}
                  fill="var(--neutral-background1)"
                  stroke={depStatusColor[node.status]}
                  strokeWidth={2}
                />
                {/* Type indicator */}
                <rect
                  x={node.x - 52} y={node.y - 16}
                  width={4} height={32}
                  rx={2}
                  fill={nodeTypeColors[node.type]}
                />
                {/* Status dot */}
                <circle
                  cx={node.x - 40} cy={node.y}
                  r={4}
                  fill={depStatusColor[node.status]}
                />
                {/* Label */}
                <text
                  x={node.x + 2} y={node.y + 4}
                  textAnchor="middle"
                  fontSize="10"
                  fontWeight="600"
                  fill="var(--neutral-foreground1)"
                >
                  {node.label}
                </text>
              </g>
            );
          })}
        </svg>

        <div className="depmap-legend">
          {Object.entries(nodeTypeLabels).map(([type, label]) => (
            <span key={type} className="depmap-legend-item">
              <span className="depmap-legend-icon" style={{ background: nodeTypeColors[type as ServiceNode['type']] }} />
              {label}
            </span>
          ))}
          <span style={{ width: 1, height: 16, background: 'var(--neutral-stroke2)', display: 'inline-block' }} />
          <span className="depmap-legend-item">
            <span style={{ width: 16, height: 2, background: '#1b7d3a', display: 'inline-block' }} /> Healthy
          </span>
          <span className="depmap-legend-item">
            <span style={{ width: 16, height: 2, background: '#b8860b', display: 'inline-block' }} /> Degraded
          </span>
          <span className="depmap-legend-item">
            <span style={{ width: 16, height: 2, background: '#c62828', display: 'inline-block', borderTop: '2px dashed #c62828', height: 0 }} /> Down
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── Page Content ───
export default function PageContent() {
  return (
    <div className="health-content-inner">
      <SummaryBar />
      <StatusGrid />
      <LatencyChart />
      <FailureLog />
      <DependencyMap />
    </div>
  );
}
