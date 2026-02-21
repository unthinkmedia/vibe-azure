// @ts-nocheck
import {
  CuiBadge,
  CuiButton,
  CuiCard,
  CuiDivider,
  CuiIcon,
  CuiToolbar,
} from '@charm-ux/cui/react';
import {
  essentialsData,
  resourceCounts,
  totalResourceCount,
  costSegments,
  totalCost,
  costCurrency,
  costPeriod,
  activityLog,
  tagComplianceData,
  requiredTags,
  getComplianceStats,
  formatTimestamp,
} from './data';

/* ─── Resource Count Summary ─── */
function ResourceSummary() {
  return (
    <>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 12 }}>
        <h2 className="section-title" style={{ margin: 0 }}>Resources ({totalResourceCount})</h2>
        <CuiButton appearance="subtle" size="small">
          <CuiIcon slot="start" name="open" />
          View all resources
        </CuiButton>
      </div>
      <div className="resource-summary-grid">
        {resourceCounts.map((rc) => (
          <div key={rc.type} className="resource-count-card">
            <div
              className="resource-count-icon"
              style={{ background: `color-mix(in srgb, ${rc.color} 12%, transparent)` }}
            >
              <CuiIcon url={rc.icon} style={{ fontSize: 20, color: rc.color }} />
            </div>
            <div className="resource-count-info">
              <span className="resource-count-value">{rc.count}</span>
              <span className="resource-count-type">{rc.type}</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

/* ─── Cost Breakdown Donut ─── */
function CostDonut() {
  const r = 60;
  const circ = 2 * Math.PI * r;
  let accumulated = 0;

  return (
    <CuiCard appearance="outline" heading="Cost breakdown" className="donut-card">
      <div className="donut-body">
        <div className="donut-wrap">
          <svg width="160" height="160" viewBox="0 0 160 160">
            <circle cx="80" cy="80" r={r} fill="none" stroke="var(--neutral-background5)" strokeWidth="14" />
            {costSegments.map((seg) => {
              const fraction = seg.amount / totalCost;
              const dashLen = fraction * circ;
              const offset = -accumulated * circ;
              accumulated += fraction;
              return (
                <circle
                  key={seg.label}
                  cx="80" cy="80" r={r}
                  fill="none"
                  stroke={seg.color}
                  strokeWidth="14"
                  strokeDasharray={`${dashLen} ${circ - dashLen}`}
                  strokeDashoffset={offset}
                />
              );
            })}
          </svg>
          <div className="donut-center">
            <span className="donut-total">${totalCost.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
            <span className="donut-total-label">{costCurrency} total</span>
          </div>
        </div>
        <div className="donut-legend">
          {costSegments.map((seg) => {
            const pct = ((seg.amount / totalCost) * 100).toFixed(1);
            return (
              <div key={seg.label} className="donut-legend-row">
                <span className="donut-legend-dot" style={{ background: seg.color }} />
                <span className="donut-legend-label">{seg.label}</span>
                <span className="donut-legend-value">${seg.amount.toFixed(2)}</span>
                <span className="donut-legend-pct">{pct}%</span>
              </div>
            );
          })}
        </div>
      </div>
      <div style={{ marginTop: 12, fontSize: 'var(--font-size-base200)', color: 'var(--neutral-foreground3)' }}>
        {costPeriod}
      </div>
    </CuiCard>
  );
}

/* ─── Recent Activity Log ─── */
function ActivityLog() {
  return (
    <CuiCard appearance="outline" heading="Recent activity" className="activity-card">
      <table className="activity-table" aria-label="Recent activity log">
        <thead>
          <tr>
            <th>Time</th>
            <th>Operation</th>
            <th>Resource</th>
            <th>User</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {activityLog.map((entry) => (
            <tr key={entry.id}>
              <td className="activity-timestamp">{formatTimestamp(entry.timestamp)}</td>
              <td>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span className={`op-type-badge ${entry.operationType}`}>
                    {entry.operationType}
                  </span>
                  <span>{entry.operation}</span>
                </div>
              </td>
              <td>
                <a href="#" className="activity-resource-link">{entry.resource}</a>
                <div style={{ fontSize: 'var(--font-size-base100)', color: 'var(--neutral-foreground3)' }}>{entry.resourceType}</div>
              </td>
              <td className="activity-user">{entry.user}</td>
              <td>
                <CuiBadge
                  appearance="tint"
                  size="small"
                  color={
                    entry.status === 'Succeeded' ? 'success' :
                    entry.status === 'Failed' ? 'danger' :
                    'warning'
                  }
                >
                  {entry.status}
                </CuiBadge>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </CuiCard>
  );
}

/* ─── Tag Compliance Checker ─── */
function TagCompliance() {
  const stats = getComplianceStats();

  return (
    <CuiCard appearance="outline" className="compliance-card">
      <div className="compliance-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <h2 className="section-title" style={{ margin: 0 }}>Tag compliance</h2>
          <CuiBadge
            appearance="tint"
            size="small"
            color={stats.pct >= 80 ? 'success' : stats.pct >= 50 ? 'warning' : 'danger'}
          >
            {stats.pct}% compliant
          </CuiBadge>
        </div>
        <div className="compliance-score">
          <div className="compliance-meta">
            <span className="compliance-count">{stats.fullyCompliant} / {stats.total} resources</span>
            <span className="compliance-label">have all required tags</span>
          </div>
        </div>
      </div>

      <div style={{ marginBottom: 12, fontSize: 'var(--font-size-base200)', color: 'var(--neutral-foreground3)' }}>
        Required tags: {requiredTags.map((t) => (
          <CuiBadge key={t} appearance="outline" size="small" style={{ marginRight: 6 }}>{t}</CuiBadge>
        ))}
      </div>

      <table className="compliance-table" aria-label="Tag compliance checker">
        <thead>
          <tr>
            <th>Resource</th>
            <th>environment</th>
            <th>owner</th>
            <th>cost-center</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {tagComplianceData.map((entry) => {
            const isCompliant = entry.environment && entry.owner && entry.costCenter;
            return (
              <tr key={entry.resource}>
                <td>
                  <a href="#" className="activity-resource-link">{entry.resource}</a>
                  <div className="compliance-resource-type">{entry.resourceType}</div>
                </td>
                <td>
                  <CuiIcon
                    name={entry.environment ? 'checkmark-circle' : 'dismiss-circle'}
                    className={entry.environment ? 'tag-pass' : 'tag-fail'}
                    style={{ fontSize: 16 }}
                  />
                </td>
                <td>
                  <CuiIcon
                    name={entry.owner ? 'checkmark-circle' : 'dismiss-circle'}
                    className={entry.owner ? 'tag-pass' : 'tag-fail'}
                    style={{ fontSize: 16 }}
                  />
                </td>
                <td>
                  <CuiIcon
                    name={entry.costCenter ? 'checkmark-circle' : 'dismiss-circle'}
                    className={entry.costCenter ? 'tag-pass' : 'tag-fail'}
                    style={{ fontSize: 16 }}
                  />
                </td>
                <td>
                  <CuiBadge
                    appearance="tint"
                    size="small"
                    color={isCompliant ? 'success' : 'danger'}
                  >
                    {isCompliant ? 'Compliant' : 'Non-compliant'}
                  </CuiBadge>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </CuiCard>
  );
}

/* ─── Main Page Content ─── */
export default function PageContent() {
  return (
    <>
      {/* Toolbar */}
      <div style={{ padding: '0 32px' }}>
        <CuiToolbar size="small" label="Resource group actions">
          <CuiButton appearance="subtle" size="small">
            <CuiIcon slot="start" url="https://api.iconify.design/fluent:add-24-regular.svg" />
            Create
          </CuiButton>
          <CuiDivider orientation="vertical" style={{ height: '20px' }} />
          <CuiButton appearance="subtle" size="small">Refresh</CuiButton>
          <CuiButton appearance="subtle" size="small">
            <CuiIcon slot="start" url="https://api.iconify.design/fluent:arrow-move-24-regular.svg" />
            Move
          </CuiButton>
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

        {/* ─── Resource Count Summary ─── */}
        <ResourceSummary />

        {/* ─── Cost Donut + Activity Log ─── */}
        <div className="overview-cards-row">
          <CostDonut />
          <ActivityLog />
        </div>

        {/* ─── Tag Compliance Checker ─── */}
        <TagCompliance />
      </div>
    </>
  );
}
