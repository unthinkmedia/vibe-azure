// @ts-nocheck
import {
  CuiButton,
  CuiCard,
  CuiDivider,
  CuiIcon,
  CuiToolbar,
} from '@charm-ux/cui/react';
import {
  essentialsData,
  metricsCards,
  revisions,
  ingressConfig,
  MetricCard as MetricCardData,
} from './data';

/** SVG sparkline from data points */
function Sparkline({ points, color }: { points: { time: string; value: number }[]; color: string }) {
  if (points.length < 2) return null;
  const maxVal = Math.max(...points.map(p => p.value));
  const minVal = Math.min(...points.map(p => p.value));
  const range = maxVal - minVal || 1;
  const w = 100;
  const h = 40;
  const pad = 2;

  const pathPoints = points.map((p, i) => {
    const x = (i / (points.length - 1)) * w;
    const y = pad + (1 - (p.value - minVal) / range) * (h - pad * 2);
    return `${x},${y}`;
  });

  const areaPath = `M${pathPoints[0]} ${pathPoints.map(p => `L${p}`).join(' ')} L${w},${h} L0,${h} Z`;

  return (
    <div className="sparkline-container">
      <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
        <path d={areaPath} fill={color} opacity="0.12" />
        <polyline
          points={pathPoints.join(' ')}
          fill="none"
          stroke={color}
          strokeWidth="1.5"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
}

function MetricCard({ metric }: { metric: MetricCardData }) {
  const sparkColor = 'var(--brand-foreground-link)';
  const trendIcon = metric.trend === 'up'
    ? 'arrow-trending-up'
    : metric.trend === 'down'
      ? 'arrow-trending-down'
      : 'arrow-right';

  return (
    <CuiCard appearance="outline" className="metric-card">
      <p className="metric-header">{metric.title}</p>
      <div>
        <span className="metric-value">{metric.value}</span>
        <span className="metric-unit">{metric.unit}</span>
      </div>
      <div className={`metric-trend ${metric.trend}`}>
        <CuiIcon url={`https://api.iconify.design/fluent:${trendIcon}-24-regular.svg`} style={{ fontSize: 14 }} />
        {metric.trendLabel}
      </div>
      <Sparkline points={metric.sparkline} color={sparkColor} />
    </CuiCard>
  );
}

function revisionStatusClass(status: string): string {
  switch (status) {
    case 'Running': return 'status-running';
    case 'Provisioning': return 'status-provisioning';
    case 'Degraded': return 'status-degraded';
    default: return 'status-inactive';
  }
}

export default function PageContent() {
  return (
    <>
      {/* Toolbar */}
      <div style={{ padding: '0 32px' }}>
        <CuiToolbar size="small" label="Resource actions">
          <CuiButton appearance="subtle" size="small">
            <CuiIcon slot="start" url="https://api.iconify.design/fluent:arrow-clockwise-24-regular.svg" />
            Restart
          </CuiButton>
          <CuiDivider orientation="vertical" style={{ height: '20px' }} />
          <CuiButton appearance="subtle" size="small">Refresh</CuiButton>
          <CuiButton appearance="subtle" size="small">
            <CuiIcon slot="start" name="delete" label="Delete" />
            Delete
          </CuiButton>
        </CuiToolbar>
      </div>

      <CuiDivider style={{ margin: '0' }} />

      <div className="content-area">
        {/* ─── Essentials Panel ─── */}
        <div className="essentials">
          {essentialsData.map((row) => (
            <div key={row.label} className="essentials-row">
              <span className="essentials-label">{row.label}</span>
              <span className="essentials-value">
                {row.status && <span className={`status-dot ${row.status}`} />}
                {row.href ? <a href={row.href}>{row.value}</a> : row.value}
              </span>
            </div>
          ))}
        </div>

        {/* ─── Scaling Metrics ─── */}
        <h2 className="section-title">Scaling &amp; Performance</h2>
        <div className="metrics-grid">
          {metricsCards.map((metric) => (
            <MetricCard key={metric.title} metric={metric} />
          ))}
        </div>

        {/* ─── Active Revisions ─── */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <h2 className="section-title" style={{ margin: 0 }}>
            Revisions ({revisions.filter(r => r.status === 'Running').length} active)
          </h2>
          <CuiButton appearance="subtle" size="small">
            <CuiIcon slot="start" name="add" />
            Create new revision
          </CuiButton>
        </div>
        <table className="revisions-table" style={{ marginBottom: 24 }}>
          <thead>
            <tr>
              <th>Revision name</th>
              <th>Status</th>
              <th>Traffic</th>
              <th>Replicas</th>
              <th>Container image</th>
              <th>Created</th>
            </tr>
          </thead>
          <tbody>
            {revisions.map((rev) => (
              <tr key={rev.name}>
                <td>
                  <a href="#" className="revision-name-link">{rev.name}</a>
                </td>
                <td>
                  <span className={revisionStatusClass(rev.status)}>
                    <span className={`status-dot ${rev.status === 'Running' ? 'success' : rev.status === 'Degraded' ? 'error' : ''}`}
                      style={{ display: rev.status === 'Inactive' || rev.status === 'Provisioning' ? 'none' : undefined }}
                    />
                    {rev.status}
                  </span>
                </td>
                <td>
                  <span className="traffic-bar">
                    <span
                      className={`traffic-fill${rev.trafficWeight === 0 ? ' zero' : ''}`}
                      style={{ width: rev.trafficWeight > 0 ? `${rev.trafficWeight * 0.6}px` : undefined }}
                    />
                    {rev.trafficWeight}%
                  </span>
                </td>
                <td>{rev.replicas}</td>
                <td style={{ fontFamily: 'var(--font-family-monospace)', fontSize: 'var(--font-size-base200)' }}>
                  {rev.image}
                </td>
                <td style={{ whiteSpace: 'nowrap' }}>{rev.created}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* ─── Ingress Configuration ─── */}
        <h2 className="section-title">Ingress</h2>
        <div className="ingress-panel">
          <div className="ingress-grid">
            <div className="ingress-row">
              <span className="ingress-label">Ingress</span>
              <span className="ingress-value">
                {ingressConfig.enabled
                  ? <span className="ingress-badge-enabled">
                      <span className="status-dot success" />
                      Enabled
                    </span>
                  : <span className="ingress-badge-disabled">Disabled</span>
                }
              </span>
            </div>
            <div className="ingress-row">
              <span className="ingress-label">Visibility</span>
              <span className="ingress-value">{ingressConfig.external ? 'Accepting traffic from anywhere' : 'Limited to Container Apps Environment'}</span>
            </div>
            <div className="ingress-row">
              <span className="ingress-label">Target port</span>
              <span className="ingress-value">{ingressConfig.targetPort}</span>
            </div>
            <div className="ingress-row">
              <span className="ingress-label">Transport</span>
              <span className="ingress-value">{ingressConfig.transport}</span>
            </div>
            <div className="ingress-row">
              <span className="ingress-label">FQDN</span>
              <span className="ingress-value">
                <a href={`https://${ingressConfig.fqdn}`}>{ingressConfig.fqdn}</a>
              </span>
            </div>
            <div className="ingress-row">
              <span className="ingress-label">Insecure connections</span>
              <span className="ingress-value">{ingressConfig.allowInsecure ? 'Allowed' : 'Not allowed'}</span>
            </div>
            <div className="ingress-row">
              <span className="ingress-label">IP restrictions</span>
              <span className="ingress-value">{ingressConfig.ipRestrictions === 0 ? 'None configured' : `${ingressConfig.ipRestrictions} rules`}</span>
            </div>
            <div className="ingress-row">
              <span className="ingress-label">CORS</span>
              <span className="ingress-value">{ingressConfig.corsEnabled ? 'Enabled' : 'Disabled'}</span>
            </div>
            <div className="ingress-row">
              <span className="ingress-label">Session affinity</span>
              <span className="ingress-value">{ingressConfig.stickySessionsAffinity}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
