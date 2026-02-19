import { useState, useMemo } from 'react';
import { CuiButton, CuiIcon, CuiMessageBar } from '@charm-ux/cui/react';
import {
  summaryMetrics,
  complianceScore,
  complianceCategories,
  initiatives,
  remediationTasks,
  type PolicyInitiative,
  type TaskStatus,
} from './data';

// ─── Compliance Gauge ───
function ComplianceGauge() {
  const { percentage, compliant, nonCompliant, exempt } = complianceScore;
  const r = 48;
  const circ = 2 * Math.PI * r;
  const offset = circ - (percentage / 100) * circ;

  return (
    <div className="pcd-gauge-card">
      <h3>Overall Compliance Score</h3>
      <div className="pcd-gauge-body">
        <div className="pcd-gauge-wrap">
          <svg width="120" height="120" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r={r} fill="none" stroke="var(--neutral-background5)" strokeWidth="10" />
            <circle
              cx="60" cy="60" r={r}
              fill="none"
              stroke="var(--success-foreground-1)"
              strokeWidth="10"
              strokeDasharray={circ}
              strokeDashoffset={offset}
              strokeLinecap="round"
            />
          </svg>
          <div className="pcd-gauge-center">
            <span className="pcd-gauge-value">{percentage}%</span>
            <span className="pcd-gauge-label">compliant</span>
          </div>
        </div>
        <div className="pcd-gauge-cats">
          {complianceCategories.map((cat) => {
            const total = cat.compliant + cat.nonCompliant;
            const pct = Math.round((cat.compliant / total) * 100);
            const color = pct >= 90 ? 'var(--success-foreground-1)' : pct >= 70 ? 'var(--warning-foreground-1)' : 'var(--danger-foreground-1)';
            return (
              <div key={cat.label} className="pcd-gauge-cat-row">
                <span className="pcd-gauge-cat-dot" style={{ background: color }} />
                <span className="pcd-gauge-cat-label">{cat.label}</span>
                <span className="pcd-gauge-cat-score" style={{ color }}>{pct}%</span>
              </div>
            );
          })}
          <div style={{ borderTop: '1px solid var(--neutral-stroke2)', paddingTop: 8, marginTop: 4, fontSize: 12, color: 'var(--neutral-foreground3)' }}>
            {compliant.toLocaleString()} compliant · {nonCompliant.toLocaleString()} non-compliant · {exempt} exempt
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Summary Strip ───
function SummaryStrip() {
  return (
    <div className="pcd-summary-strip">
      {summaryMetrics.map((m) => (
        <div key={m.label} className="pcd-summary-card">
          <div className={`pcd-summary-icon ${m.accent}`}>
            <CuiIcon url={`https://api.iconify.design/fluent:${m.icon}-24-regular.svg`} style={{ fontSize: 22 }} />
          </div>
          <div>
            <div className="pcd-summary-label">{m.label}</div>
            <div className="pcd-summary-value">{m.value}</div>
            <div className="pcd-summary-subtext">{m.subtext}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Initiative Row (expandable) ───
function InitiativeRow({ initiative, expanded, onToggle }: {
  initiative: PolicyInitiative;
  expanded: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="pcd-initiative-row">
      <div className="pcd-initiative-header" onClick={onToggle} role="button" tabIndex={0} aria-expanded={expanded} onKeyDown={(e) => e.key === 'Enter' && onToggle()}>
        <CuiIcon
          name="chevron-right"
          className={`pcd-initiative-chevron ${expanded ? 'expanded' : ''}`}
          style={{ fontSize: 14 }}
        />
        <span className="pcd-initiative-name">{initiative.name}</span>
        <div className="pcd-initiative-meta">
          <span className={`pcd-severity-badge ${initiative.severity}`}>{initiative.severity}</span>
          <span>{initiative.category}</span>
          <span>{initiative.totalPolicies} policies</span>
          <span className="pcd-initiative-count">{initiative.nonCompliantCount} non-compliant</span>
        </div>
      </div>
      {expanded && (
        <div className="pcd-resource-table-wrap">
          <table className="pcd-resource-table">
            <thead>
              <tr>
                <th>Resource</th>
                <th>Type</th>
                <th>Resource Group</th>
                <th>Policy Rule</th>
                <th>Last Evaluated</th>
              </tr>
            </thead>
            <tbody>
              {initiative.resources.map((res, i) => (
                <tr key={i}>
                  <td><span className="pcd-resource-name">{res.name}</span></td>
                  <td><span className="pcd-resource-type">{res.type}</span></td>
                  <td>{res.resourceGroup}</td>
                  <td style={{ maxWidth: 300 }}>{res.policyRule}</td>
                  <td style={{ whiteSpace: 'nowrap' }}>{res.lastEvaluated}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {initiative.nonCompliantCount > initiative.resources.length && (
            <div className="pcd-resource-more">
              +{initiative.nonCompliantCount - initiative.resources.length} more non-compliant resources
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Initiative List ───
function InitiativeList() {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const sorted = useMemo(
    () => [...initiatives].sort((a, b) => b.nonCompliantCount - a.nonCompliantCount),
    [],
  );

  return (
    <div className="pcd-section">
      <h2>Non-Compliant Resources by Initiative</h2>
      <p className="pcd-section-desc">Policy initiatives sorted by non-compliant resource count. Expand to see affected resources.</p>
      <div className="pcd-initiative-list">
        {sorted.map((init) => (
          <InitiativeRow
            key={init.id}
            initiative={init}
            expanded={expandedIds.has(init.id)}
            onToggle={() => toggle(init.id)}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Status badge helper ───
const statusLabels: Record<TaskStatus, string> = {
  'in-progress': 'In Progress',
  'not-started': 'Not Started',
  'failed': 'Failed',
  'completed': 'Completed',
};

// ─── Remediation Tasks Table ───
function RemediationTable() {
  const [statusFilter, setStatusFilter] = useState<TaskStatus | 'all'>('all');
  const [sortField, setSortField] = useState<'affectedResources' | 'createdAt'>('affectedResources');
  const [sortAsc, setSortAsc] = useState(false);

  const filtered = useMemo(() => {
    let list = statusFilter === 'all' ? remediationTasks : remediationTasks.filter((t) => t.status === statusFilter);
    return [...list].sort((a, b) => {
      if (sortField === 'affectedResources') {
        return sortAsc ? a.affectedResources - b.affectedResources : b.affectedResources - a.affectedResources;
      }
      return sortAsc
        ? a.createdAt.localeCompare(b.createdAt)
        : b.createdAt.localeCompare(a.createdAt);
    });
  }, [statusFilter, sortField, sortAsc]);

  const toggleSort = (field: 'affectedResources' | 'createdAt') => {
    if (sortField === field) setSortAsc(!sortAsc);
    else { setSortField(field); setSortAsc(false); }
  };

  const filters: { key: TaskStatus | 'all'; label: string; count?: number }[] = [
    { key: 'all', label: 'All', count: remediationTasks.length },
    { key: 'in-progress', label: 'In Progress', count: remediationTasks.filter((t) => t.status === 'in-progress').length },
    { key: 'not-started', label: 'Not Started', count: remediationTasks.filter((t) => t.status === 'not-started').length },
    { key: 'failed', label: 'Failed', count: remediationTasks.filter((t) => t.status === 'failed').length },
    { key: 'completed', label: 'Completed', count: remediationTasks.filter((t) => t.status === 'completed').length },
  ];

  return (
    <div className="pcd-section">
      <h2>Remediation Tasks</h2>
      <p className="pcd-section-desc">Track and manage policy remediation across your environment.</p>

      <div className="pcd-filter-bar">
        {filters.map((f) => (
          <button
            key={f.key}
            className={`pcd-filter-chip ${statusFilter === f.key ? 'active' : ''}`}
            onClick={() => setStatusFilter(f.key)}
          >
            {f.label} ({f.count})
          </button>
        ))}
      </div>

      <div className="pcd-table-wrap">
        <table className="pcd-table">
          <thead>
            <tr>
              <th>Task</th>
              <th>Status</th>
              <th>Initiative</th>
              <th
                className="sortable"
                onClick={() => toggleSort('affectedResources')}
                aria-label="Sort by affected resources"
              >
                Resources {sortField === 'affectedResources' ? (sortAsc ? '↑' : '↓') : ''}
              </th>
              <th>Assigned To</th>
              <th
                className="sortable"
                onClick={() => toggleSort('createdAt')}
                aria-label="Sort by date"
              >
                Created {sortField === 'createdAt' ? (sortAsc ? '↑' : '↓') : ''}
              </th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((task) => (
              <tr key={task.id}>
                <td style={{ fontWeight: 600, maxWidth: 240 }}>{task.name}</td>
                <td>
                  <span className={`pcd-status-badge ${task.status}`}>
                    <span className={`pcd-status-dot ${task.status}`} />
                    {statusLabels[task.status]}
                  </span>
                </td>
                <td style={{ fontSize: 12, maxWidth: 200 }}>{task.initiative}</td>
                <td style={{ fontVariantNumeric: 'tabular-nums' }}>{task.affectedResources}</td>
                <td>{task.assignedTo}</td>
                <td style={{ whiteSpace: 'nowrap' }}>{task.createdAt}</td>
                <td>
                  {task.status === 'failed' ? (
                    <CuiButton appearance="outline" size="small">
                      <CuiIcon slot="start" name="arrow-clockwise" />
                      Retry
                    </CuiButton>
                  ) : task.status === 'not-started' ? (
                    <CuiButton appearance="outline" size="small">
                      <CuiIcon slot="start" name="play" />
                      Start
                    </CuiButton>
                  ) : task.status === 'in-progress' ? (
                    <CuiButton appearance="subtle" size="small">
                      <CuiIcon slot="start" name="open" />
                      View
                    </CuiButton>
                  ) : (
                    <CuiButton appearance="subtle" size="small" disabled>
                      <CuiIcon slot="start" name="checkmark" />
                      Done
                    </CuiButton>
                  )}
                </td>
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
  return (
    <div className="pcd-content-inner">
      {/* Info bar */}
      <div className="pcd-info-bar">
        <CuiMessageBar intent="info" shape="square">
          <CuiIcon name="info" slot="icon" />
          Compliance data was last evaluated 2 hours ago across 3 subscriptions. Next evaluation in 22 hours.
          <CuiButton slot="actions" appearance="outline" size="small">Trigger Evaluation</CuiButton>
        </CuiMessageBar>
      </div>

      {/* Compliance gauge + summary cards */}
      <div className="pcd-top-row">
        <ComplianceGauge />
        <SummaryStrip />
      </div>

      {/* Non-compliant resources by initiative */}
      <InitiativeList />

      {/* Remediation tasks */}
      <RemediationTable />
    </div>
  );
}
