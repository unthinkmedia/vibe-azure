import { useState } from 'react';
import { CuiButton, CuiIcon } from '@charm-ux/cui/react';
import {
  resourceGroupDeltas,
  topMovers,
  dailyCosts,
  anomalyEvents,
  budgetThreshold,
  recommendations,
  type AnomalyEvent,
  type CauseTag,
} from './data';

// ─── Helpers ───
const fmt = (n: number) => '$' + n.toLocaleString();

const causeTagClass: Record<CauseTag, string> = {
  'scale-out': 'scale-out',
  'new deployment': 'new-deployment',
  'idle but running': 'idle-but-running',
  'storage growth': 'storage-growth',
  'config change': 'config-change',
  'traffic spike': 'traffic-spike',
};

// ─── Heatmap Section ───
function CostHeatmap() {
  return (
    <div className="cost-section">
      <h2>Cost Delta Heatmap</h2>
      <p className="cost-section-desc">Resource group spending changes week-over-week, color-coded by severity.</p>
      <div className="heatmap-grid">
        {resourceGroupDeltas.map((rg) => (
          <div key={rg.name} className={`heatmap-cell severity-${rg.severity}`}>
            <div className="heatmap-name" title={rg.name}>{rg.name}</div>
            <div className={`heatmap-delta severity-${rg.severity}`}>
              {rg.deltaPct > 0 ? '+' : ''}{rg.deltaPct.toFixed(1)}%
            </div>
            <div className="heatmap-cost">
              {fmt(rg.lastWeek)} → {fmt(rg.thisWeek)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Top Movers Table ───
function TopMoversTable() {
  return (
    <div className="cost-section">
      <h2>Top Movers</h2>
      <p className="cost-section-desc">15 resources with the largest absolute cost increase this week.</p>
      <div className="movers-table-wrap">
        <table className="movers-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Resource</th>
              <th>Type</th>
              <th>Last Week</th>
              <th>This Week</th>
              <th>Delta %</th>
              <th>Likely Cause</th>
            </tr>
          </thead>
          <tbody>
            {topMovers.map((m, i) => (
              <tr key={m.resourceName}>
                <td>{i + 1}</td>
                <td style={{ fontWeight: 600 }}>{m.resourceName}</td>
                <td>{m.resourceType}</td>
                <td>{fmt(m.lastWeekCost)}</td>
                <td>{fmt(m.thisWeekCost)}</td>
                <td className="delta-positive">+{m.deltaPct}%</td>
                <td>
                  <span className={`cause-tag ${causeTagClass[m.causeTag]}`}>
                    {m.causeTag}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Anomaly Timeline ───
function AnomalyTimeline() {
  const [activeEvent, setActiveEvent] = useState<AnomalyEvent | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const padding = { top: 20, right: 20, bottom: 30, left: 60 };
  const width = 800;
  const height = 220;
  const innerW = width - padding.left - padding.right;
  const innerH = height - padding.top - padding.bottom;

  const costs = dailyCosts.map((d) => d.cost);
  const minCost = Math.min(...costs, budgetThreshold) * 0.9;
  const maxCost = Math.max(...costs, budgetThreshold) * 1.05;

  const xScale = (i: number) => padding.left + (i / (dailyCosts.length - 1)) * innerW;
  const yScale = (v: number) => padding.top + innerH - ((v - minCost) / (maxCost - minCost)) * innerH;

  const linePath = dailyCosts
    .map((d, i) => `${i === 0 ? 'M' : 'L'}${xScale(i).toFixed(1)},${yScale(d.cost).toFixed(1)}`)
    .join(' ');

  const areaPath = linePath +
    ` L${xScale(dailyCosts.length - 1).toFixed(1)},${(padding.top + innerH).toFixed(1)}` +
    ` L${xScale(0).toFixed(1)},${(padding.top + innerH).toFixed(1)} Z`;

  const budgetY = yScale(budgetThreshold);

  const handleMarkerEnter = (evt: AnomalyEvent, e: React.MouseEvent) => {
    const rect = (e.currentTarget as SVGElement).closest('.timeline-wrap')!.getBoundingClientRect();
    const cx = e.clientX - rect.left;
    const cy = e.clientY - rect.top;
    setActiveEvent(evt);
    setTooltipPos({ x: cx + 12, y: cy - 60 });
  };

  const typeColorMap: Record<string, string> = {
    deployment: '#2e7d32',
    'config change': '#6a1b9a',
    'traffic spike': '#00838f',
  };

  return (
    <div className="cost-section">
      <h2>Anomaly Timeline</h2>
      <p className="cost-section-desc">Flagged cost events over the past 30 days against your budget threshold.</p>
      <div className="timeline-wrap" style={{ position: 'relative' }} onMouseLeave={() => setActiveEvent(null)}>
        <svg viewBox={`0 0 ${width} ${height}`} className="timeline-svg">
          {/* Y-axis labels */}
          {[0, 0.25, 0.5, 0.75, 1].map((pct) => {
            const val = minCost + pct * (maxCost - minCost);
            const y = yScale(val);
            return (
              <g key={pct}>
                <line x1={padding.left} y1={y} x2={width - padding.right} y2={y} stroke="var(--neutral-stroke2)" strokeDasharray="3,3" />
                <text x={padding.left - 6} y={y + 4} textAnchor="end" fontSize="10" fill="var(--neutral-foreground3)">
                  ${(val / 1000).toFixed(0)}k
                </text>
              </g>
            );
          })}

          {/* X-axis labels — every 5 days */}
          {dailyCosts.map((d, i) =>
            i % 5 === 0 ? (
              <text key={i} x={xScale(i)} y={height - 6} textAnchor="middle" fontSize="10" fill="var(--neutral-foreground3)">
                {new Date(d.date + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </text>
            ) : null
          )}

          {/* Cost area + line */}
          <path d={areaPath} fill="var(--brand-background2)" opacity={0.3} />
          <path d={linePath} fill="none" stroke="var(--brand-foreground-link)" strokeWidth={2} />

          {/* Budget threshold line */}
          <line x1={padding.left} y1={budgetY} x2={width - padding.right} y2={budgetY} stroke="#c62828" strokeWidth={1.5} strokeDasharray="6,4" />
          <text x={width - padding.right + 2} y={budgetY - 4} fontSize="10" fill="#c62828" fontWeight="600">
            Budget
          </text>

          {/* Anomaly markers */}
          {anomalyEvents.map((evt) => {
            const idx = dailyCosts.findIndex((d) => d.date === evt.date);
            if (idx < 0) return null;
            const cx = xScale(idx);
            const cy = yScale(dailyCosts[idx].cost);
            return (
              <g
                key={evt.date}
                style={{ cursor: 'pointer' }}
                onMouseEnter={(e) => handleMarkerEnter(evt, e)}
              >
                <circle cx={cx} cy={cy} r={10} fill={typeColorMap[evt.type]} opacity={0.15} />
                <circle cx={cx} cy={cy} r={5} fill={typeColorMap[evt.type]} stroke="#fff" strokeWidth={1.5} />
              </g>
            );
          })}
        </svg>

        {/* Tooltip */}
        {activeEvent && (
          <div className="timeline-tooltip" style={{ left: tooltipPos.x, top: tooltipPos.y }}>
            <span className={`timeline-tooltip-type ${activeEvent.type === 'traffic spike' ? 'traffic-spike' : activeEvent.type}`}>
              {activeEvent.type}
            </span>
            <div className="timeline-tooltip-title">{activeEvent.label}</div>
            <div className="timeline-tooltip-detail">{activeEvent.detail}</div>
          </div>
        )}

        <div className="timeline-legend">
          <span className="timeline-legend-item">
            <span className="timeline-legend-dot" style={{ background: '#2e7d32' }} /> Deployment
          </span>
          <span className="timeline-legend-item">
            <span className="timeline-legend-dot" style={{ background: '#6a1b9a' }} /> Config change
          </span>
          <span className="timeline-legend-item">
            <span className="timeline-legend-dot" style={{ background: '#00838f' }} /> Traffic spike
          </span>
          <span className="timeline-legend-item">
            <span style={{ width: 16, height: 2, background: '#c62828', display: 'inline-block', verticalAlign: 'middle' }} /> Budget threshold ({fmt(budgetThreshold)}/week)
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── Recommendations ───
function RecommendationsPanel() {
  return (
    <div className="cost-section">
      <h2>Recommendations</h2>
      <p className="cost-section-desc">Actionable savings opportunities based on detected anomalies.</p>
      <div className="rec-grid">
        {recommendations.map((rec) => (
          <div key={rec.id} className="rec-card">
            <div className="rec-card-header">
              <div>
                <div className="rec-card-title">{rec.title}</div>
                <span className={`rec-impact ${rec.impact}`}>{rec.impact} impact</span>
              </div>
              <div className="rec-savings">{fmt(rec.monthlySavings)}<span style={{ fontSize: 12, fontWeight: 400, color: 'var(--neutral-foreground3)' }}>/mo</span></div>
            </div>
            <div className="rec-desc">{rec.description}</div>
            <div className="rec-footer">
              <span className="rec-resource">
                <CuiIcon url="https://api.iconify.design/fluent:cube-24-regular.svg" style={{ fontSize: 14, verticalAlign: 'text-bottom', marginRight: 4 }} />
                {rec.affectedResource}
              </span>
              <CuiButton appearance="outline" size="small">
                <CuiIcon name="alert" slot="start" />
                Create Alert Rule
              </CuiButton>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Page Content ───
export default function PageContent() {
  return (
    <div className="cost-content-inner">
      <CostHeatmap />
      <TopMoversTable />
      <AnomalyTimeline />
      <RecommendationsPanel />
    </div>
  );
}
