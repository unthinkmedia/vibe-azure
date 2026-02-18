import { useState, useMemo } from 'react';
import { CuiButton, CuiIcon, CuiMessageBar } from '@charm-ux/cui/react';
import {
  summaryMetrics,
  deployments,
  blastRadiusGraphs,
  defaultBlastRadius,
  riskBreakdowns,
  defaultRiskBreakdown,
  diffPreviews,
  defaultDiffPreview,
  type Deployment,
  type GraphNode,
  type BlastRadiusData,
  type RiskFactor,
  type DiffEntry,
} from './data';

// ─── Helpers ───
function riskClass(score: number): string {
  if (score >= 70) return 'risk-high';
  if (score >= 40) return 'risk-medium';
  return 'risk-low';
}

function riskColor(risk: 'safe' | 'caution' | 'breaking'): string {
  if (risk === 'breaking') return '#c62828';
  if (risk === 'caution') return '#e65100';
  return '#2e7d32';
}

function severityBgColor(risk: 'safe' | 'caution' | 'breaking'): string {
  if (risk === 'breaking') return '#fdecea';
  if (risk === 'caution') return '#fff3e0';
  return '#e8f5e9';
}

// ─── Summary Strip ───
function SummaryStrip() {
  return (
    <div className="drs-summary-strip">
      {summaryMetrics.map((m) => (
        <div key={m.label} className="drs-summary-card">
          <div className={`drs-summary-icon ${m.accent}`}>
            <CuiIcon url={`https://api.iconify.design/fluent:${m.icon}-24-regular.svg`} style={{ fontSize: 22 }} />
          </div>
          <div>
            <div className="drs-summary-label">{m.label}</div>
            <div className="drs-summary-value">{m.value}</div>
            <div className="drs-summary-subtext">{m.subtext}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Production Warning Bar ───
function ProdWarningBar({ deployment }: { deployment: Deployment | null }) {
  if (!deployment || deployment.targetEnv !== 'prod' || deployment.hasApprovalGate) return null;

  return (
    <div className="drs-warning-bar">
      <CuiMessageBar intent="warning" shape="square">
        <CuiIcon name="warning" slot="icon" />
        <strong>{deployment.name}</strong> targets the <strong>{deployment.subscription}</strong> production subscription without an approval gate configured. Add a manual approval step before deploying to production.
        <CuiButton slot="actions" appearance="outline" size="small">Configure Gate</CuiButton>
      </CuiMessageBar>
    </div>
  );
}

// ─── Deployments Table ───
function DeploymentsTable({
  selected,
  onSelect,
}: {
  selected: string | null;
  onSelect: (id: string) => void;
}) {
  const [sortAsc, setSortAsc] = useState(false);

  const sorted = useMemo(() => {
    return [...deployments].sort((a, b) =>
      sortAsc ? a.riskScore - b.riskScore : b.riskScore - a.riskScore
    );
  }, [sortAsc]);

  return (
    <div className="drs-section">
      <h2>Deployments Queue</h2>
      <p className="drs-section-desc">Pending infrastructure deployments sorted by risk. Click a row to inspect details.</p>
      <div className="drs-table-wrap">
        <table className="drs-table">
          <thead>
            <tr>
              <th>Deployment Name</th>
              <th>Source</th>
              <th>Target Env</th>
              <th>Resources (C/M/D)</th>
              <th
                className="sortable"
                onClick={() => setSortAsc(!sortAsc)}
                aria-label="Sort by risk score"
              >
                Risk Score {sortAsc ? '↑' : '↓'}
              </th>
              <th>Submitted By</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((dep) => (
              <tr
                key={dep.id}
                className={selected === dep.id ? 'selected' : ''}
                onClick={() => onSelect(dep.id)}
              >
                <td style={{ fontWeight: 600 }}>{dep.name}</td>
                <td>
                  <span className={`drs-source-badge ${dep.source}`}>{dep.source}</span>
                </td>
                <td>
                  <span className={`drs-env-badge ${dep.targetEnv}`}>{dep.targetEnv}</span>
                </td>
                <td>
                  <span className="drs-resource-triple">
                    <span className="drs-triple-created">+{dep.created}</span>
                    {' / '}
                    <span className="drs-triple-modified">~{dep.modified}</span>
                    {' / '}
                    <span className="drs-triple-deleted">-{dep.deleted}</span>
                  </span>
                </td>
                <td>
                  <span className="drs-risk-score">
                    <span className={`drs-risk-dot ${riskClass(dep.riskScore)}`} />
                    {dep.riskScore}
                  </span>
                </td>
                <td>{dep.submittedBy}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Blast Radius Graph ───
function BlastRadiusGraph({ data }: { data: BlastRadiusData }) {
  const viewBox = '0 0 800 360';

  return (
    <div className="drs-panel">
      <h3>Blast Radius</h3>
      <svg viewBox={viewBox} className="drs-graph-svg">
        <defs>
          <marker id="arrowhead" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
            <polygon points="0 0, 8 3, 0 6" fill="var(--neutral-foreground3)" opacity="0.4" />
          </marker>
        </defs>
        {/* Edges */}
        {data.edges.map((edge, i) => {
          const from = data.nodes.find((n) => n.id === edge.from);
          const to = data.nodes.find((n) => n.id === edge.to);
          if (!from || !to) return null;
          return (
            <line
              key={i}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              stroke="var(--neutral-stroke2)"
              strokeWidth={1.5}
              markerEnd="url(#arrowhead)"
            />
          );
        })}
        {/* Nodes */}
        {data.nodes.map((node) => (
          <g key={node.id}>
            <circle
              cx={node.x}
              cy={node.y}
              r={28}
              fill={severityBgColor(node.risk)}
              stroke={riskColor(node.risk)}
              strokeWidth={2}
            />
            <circle
              cx={node.x}
              cy={node.y}
              r={8}
              fill={riskColor(node.risk)}
            />
            <text
              x={node.x}
              y={node.y + 42}
              textAnchor="middle"
              fontSize="11"
              fill="var(--neutral-foreground2)"
              fontWeight={node.type === 'changing' ? '600' : '400'}
            >
              {node.label}
            </text>
          </g>
        ))}
      </svg>
      <div className="drs-graph-legend">
        <span className="drs-graph-legend-item">
          <span className="drs-graph-legend-dot" style={{ background: '#2e7d32' }} /> Safe
        </span>
        <span className="drs-graph-legend-item">
          <span className="drs-graph-legend-dot" style={{ background: '#e65100' }} /> Caution
        </span>
        <span className="drs-graph-legend-item">
          <span className="drs-graph-legend-dot" style={{ background: '#c62828' }} /> Breaking
        </span>
        <span className="drs-graph-legend-item" style={{ marginLeft: 'auto', fontSize: 11, fontStyle: 'italic' }}>
          Filled = changing · Outlined = dependent
        </span>
      </div>
    </div>
  );
}

// ─── Risk Breakdown Panel ───
function RiskBreakdownPanel({ factors }: { factors: RiskFactor[] }) {
  return (
    <div className="drs-panel">
      <h3>Risk Breakdown</h3>
      <div className="drs-risk-list">
        {factors.map((f) => (
          <div key={f.category} className="drs-risk-row">
            <div
              className="drs-risk-row-icon"
              style={{
                background: f.severity === 'critical' ? '#fdecea'
                  : f.severity === 'high' ? '#fff3e0'
                  : f.severity === 'medium' ? '#fff8e1'
                  : f.severity === 'low' ? '#e3f2fd'
                  : '#e8f5e9',
              }}
            >
              <CuiIcon url={`https://api.iconify.design/fluent:${f.icon}-24-regular.svg`} />
            </div>
            <div className="drs-risk-row-body">
              <div className="drs-risk-row-cat">{f.category}</div>
              <div className="drs-risk-row-exp">{f.explanation}</div>
            </div>
            <span className={`drs-severity-badge ${f.severity}`}>{f.severity}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Diff Preview ───
function DiffPreview({ diffs }: { diffs: DiffEntry[] }) {
  return (
    <div className="drs-section">
      <h2>Config Diff Preview</h2>
      <p className="drs-section-desc">Before/after comparison of key resource property changes in this deployment.</p>
      <div className="drs-panel" style={{ padding: 0, overflow: 'hidden' }}>
        <table className="drs-diff-table">
          <thead>
            <tr>
              <th style={{ width: 60 }}>Change</th>
              <th>Resource</th>
              <th>Property</th>
              <th>Before</th>
              <th>After</th>
            </tr>
          </thead>
          <tbody>
            {diffs.map((d, i) => (
              <tr key={i} className={d.changeType === 'added' ? 'drs-diff-added' : d.changeType === 'removed' ? 'drs-diff-removed' : ''}>
                <td>
                  <span className={`drs-diff-change-tag ${d.changeType}`}>{d.changeType}</span>
                </td>
                <td style={{ fontSize: 12 }}>{d.resourceName}</td>
                <td>{d.property}</td>
                <td>{d.changeType === 'added' ? '—' : <span className="drs-diff-before">{d.before}</span>}</td>
                <td>{d.changeType === 'removed' ? '—' : <span className="drs-diff-after">{d.after}</span>}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Page Content ───
export default function PageContent() {
  const [selectedId, setSelectedId] = useState<string>(deployments[0].id);

  const selectedDep = deployments.find((d) => d.id === selectedId) ?? null;
  const graphData = blastRadiusGraphs[selectedId] ?? defaultBlastRadius;
  const riskFactors = riskBreakdowns[selectedId] ?? defaultRiskBreakdown;
  const diffs = diffPreviews[selectedId] ?? defaultDiffPreview;

  return (
    <div className="drs-content-inner">
      {/* Production warning */}
      <ProdWarningBar deployment={selectedDep} />

      {/* Summary strip */}
      <SummaryStrip />

      {/* Deployments table */}
      <DeploymentsTable selected={selectedId} onSelect={setSelectedId} />

      {/* Detail panels — blast radius + risk breakdown side by side */}
      <div className="drs-detail-grid">
        <BlastRadiusGraph data={graphData} />
        <RiskBreakdownPanel factors={riskFactors} />
      </div>

      {/* Diff preview */}
      <DiffPreview diffs={diffs} />
    </div>
  );
}
