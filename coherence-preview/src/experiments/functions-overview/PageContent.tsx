// @ts-nocheck
import {
  CuiBadge,
  CuiButton,
  CuiCard,
  CuiDivider,
  CuiIcon,
  CuiToolbar,
} from '@charm-ux/cui/react';
import { essentialsData, metricsCards, functions, MetricCard as MetricCardData } from './data';

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

function MetricCard({ metric, index }: { metric: MetricCardData; index: number }) {
  const isErrorMetric = metric.title === 'Errors';
  const sparkColor = isErrorMetric
    ? 'var(--status-danger-foreground1)'
    : 'var(--brand-foreground-link)';
  const trendClass = isErrorMetric && metric.trend === 'up' ? 'error-up' : metric.trend;
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
      <div className={`metric-trend ${trendClass}`}>
        <CuiIcon url={`https://api.iconify.design/fluent:${trendIcon}-24-regular.svg`} style={{ fontSize: 14 }} />
        {metric.trendLabel}
      </div>
      <Sparkline points={metric.sparkline} color={sparkColor} />
    </CuiCard>
  );
}

export default function PageContent() {
  return (
    <>
      {/* Toolbar */}
      <div style={{ padding: '0 32px' }}>
        <CuiToolbar size="small" label="Resource actions">
          <CuiButton appearance="subtle" size="small">
            <CuiIcon slot="start" name="play" />
            Start
          </CuiButton>
          <CuiButton appearance="subtle" size="small">
            <CuiIcon slot="start" name="stop" />
            Stop
          </CuiButton>
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

        {/* ─── Monitoring Metrics ─── */}
        <h2 className="section-title">Monitoring</h2>
        <div className="metrics-grid">
          {metricsCards.map((metric, i) => (
            <MetricCard key={metric.title} metric={metric} index={i} />
          ))}
        </div>

        {/* ─── Functions List ─── */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <h2 className="section-title" style={{ margin: 0 }}>Functions ({functions.length})</h2>
          <CuiButton appearance="subtle" size="small">
            <CuiIcon slot="start" name="add" />
            Create function
          </CuiButton>
        </div>
        <table className="functions-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Trigger</th>
              <th>Status</th>
              <th>Executions (24h)</th>
              <th>Errors (24h)</th>
              <th>Avg Duration</th>
            </tr>
          </thead>
          <tbody>
            {functions.map((fn) => (
              <tr key={fn.name}>
                <td>
                  <a href="#" className="function-name-link">{fn.name}</a>
                </td>
                <td><span className="trigger-badge">{fn.trigger}</span></td>
                <td>
                  <span className={fn.status === 'Enabled' ? 'status-enabled' : 'status-disabled'}>
                    {fn.status}
                  </span>
                </td>
                <td>{fn.executions24h.toLocaleString()}</td>
                <td>
                  {fn.errors24h > 0
                    ? <span className="error-count">{fn.errors24h}</span>
                    : <span style={{ color: 'var(--neutral-foreground3)' }}>0</span>
                  }
                </td>
                <td>{fn.avgDuration}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
