// @ts-nocheck
import { useState, useMemo } from 'react';
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
  dtuData,
  connectionStats,
  geoReplicas,
  auditLogEntries,
  formatTimestamp,
} from './data';
import type { AuditLogEntry } from './data';

/* ─── DTU Gauge ─── */
function DtuGauge() {
  const r = 52;
  const circ = 2 * Math.PI * r;
  const pct = dtuData.currentPercent;
  const dashLen = (pct / 100) * circ;

  // Color based on thresholds
  let gaugeColor = 'var(--status-success-foreground1)';
  if (pct >= dtuData.criticalThreshold) gaugeColor = 'var(--status-danger-foreground1)';
  else if (pct >= dtuData.warningThreshold) gaugeColor = 'var(--status-warning-foreground1)';

  return (
    <CuiCard appearance="outline" heading="DTU usage" className="gauge-card">
      <div className="gauge-body">
        <div className="gauge-wrap">
          <svg width="140" height="140" viewBox="0 0 140 140" role="img" aria-label={`DTU usage: ${pct}%`}>
            <circle cx="70" cy="70" r={r} fill="none" stroke="var(--neutral-background5)" strokeWidth="12" />
            <circle
              cx="70" cy="70" r={r}
              fill="none"
              stroke={gaugeColor}
              strokeWidth="12"
              strokeDasharray={`${dashLen} ${circ - dashLen}`}
              strokeLinecap="round"
            />
          </svg>
          <div className="gauge-center">
            <span className="gauge-percent">{pct}%</span>
            <span className="gauge-percent-label">of {dtuData.limit} DTUs</span>
          </div>
        </div>
        <div className="gauge-details">
          <div className="gauge-detail-row">
            <span className="gauge-detail-label">Current usage</span>
            <span className="gauge-detail-value">{dtuData.used} / {dtuData.limit} DTUs</span>
          </div>
          <CuiDivider />
          <div className="gauge-threshold">
            <span className="gauge-threshold-dot" style={{ background: 'var(--status-warning-foreground1)' }} />
            Warning threshold: {dtuData.warningThreshold}%
          </div>
          <div className="gauge-threshold">
            <span className="gauge-threshold-dot" style={{ background: 'var(--status-danger-foreground1)' }} />
            Critical threshold: {dtuData.criticalThreshold}%
          </div>
        </div>
      </div>
    </CuiCard>
  );
}

/* ─── Connections Card ─── */
function ConnectionsCard() {
  const { active, trend, trendPercent, peak24h, avg24h } = connectionStats;
  const isUp = trend === 'up';

  return (
    <CuiCard appearance="outline" heading="Active connections" className="connections-card">
      <div className="connections-primary">{active}</div>
      <div className="connections-label">active connections right now</div>
      <CuiBadge appearance="tint" color={isUp ? 'warning' : 'success'} size="small">
        <CuiIcon
          slot="start"
          url={`https://api.iconify.design/fluent:arrow-trending-${isUp ? 'up' : 'down'}-24-regular.svg`}
          style={{ fontSize: 14 }}
        />
        {isUp ? '+' : '-'}{trendPercent}% vs 1h ago
      </CuiBadge>
      <div className="connections-stats">
        <div className="connections-stat-row">
          <span className="connections-stat-label">24h peak</span>
          <span className="connections-stat-value">{peak24h}</span>
        </div>
        <div className="connections-stat-row">
          <span className="connections-stat-label">24h average</span>
          <span className="connections-stat-value">{avg24h}</span>
        </div>
      </div>
    </CuiCard>
  );
}

/* ─── Geo-Replication ─── */
function GeoReplicationSection() {
  const statusColor: Record<string, string> = {
    Online: 'success',
    Seeding: 'warning',
    Suspended: 'warning',
    Offline: 'danger',
  };

  return (
    <div className="geo-section">
      <h2 className="section-title">Geo-Replication</h2>
      <div className="geo-grid">
        {geoReplicas.map((replica) => (
          <CuiCard key={replica.region} appearance="outline" className="geo-card">
            <div className="geo-card-header">
              <div className="geo-card-region">
                <CuiIcon url="https://api.iconify.design/fluent:globe-24-regular.svg" style={{ fontSize: 18 }} />
                {replica.region}
              </div>
              <CuiBadge
                appearance="tint"
                color={statusColor[replica.status] || 'informative'}
                size="small"
              >
                {replica.status}
              </CuiBadge>
            </div>
            <div className="geo-card-body">
              <div className="geo-card-row">
                <span className="geo-card-label">Role</span>
                <span className="geo-card-value">{replica.role}</span>
              </div>
              <div className="geo-card-row">
                <span className="geo-card-label">Replication lag</span>
                <span className="geo-card-value">{replica.replicationLag}</span>
              </div>
              <div className="geo-card-row">
                <span className="geo-card-label">Last sync</span>
                <span className="geo-card-value">{replica.lastSync}</span>
              </div>
            </div>
          </CuiCard>
        ))}
      </div>
    </div>
  );
}

/* ─── Audit Log Table ─── */
type SortKey = keyof AuditLogEntry;
type SortDir = 'asc' | 'desc';

function AuditLogTable() {
  const [sortKey, setSortKey] = useState<SortKey>('timestamp');
  const [sortDir, setSortDir] = useState<SortDir>('desc');

  const sorted = useMemo(() => {
    const copy = [...auditLogEntries];
    copy.sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      const cmp = aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
      return sortDir === 'asc' ? cmp : -cmp;
    });
    return copy;
  }, [sortKey, sortDir]);

  const handleSort = (key: SortKey) => {
    if (key === sortKey) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDir('desc');
    }
  };

  const sortIndicator = (key: SortKey) => {
    if (key !== sortKey) return null;
    return <span className="sort-indicator">{sortDir === 'asc' ? '▲' : '▼'}</span>;
  };

  const resultColor = (result: string) =>
    result === 'Failure' ? 'var(--status-danger-foreground1)' : 'inherit';

  return (
    <div className="audit-section">
      <h2 className="section-title">Recent audit log entries</h2>
      <table className="audit-table" role="grid" aria-label="Audit log entries">
        <thead>
          <tr>
            <th onClick={() => handleSort('timestamp')}>Time{sortIndicator('timestamp')}</th>
            <th onClick={() => handleSort('action')}>Action{sortIndicator('action')}</th>
            <th onClick={() => handleSort('principal')}>Principal{sortIndicator('principal')}</th>
            <th onClick={() => handleSort('clientIp')}>Client IP{sortIndicator('clientIp')}</th>
            <th onClick={() => handleSort('result')}>Result{sortIndicator('result')}</th>
            <th>Statement</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((entry, i) => (
            <tr key={i}>
              <td>{formatTimestamp(entry.timestamp)}</td>
              <td>{entry.action}</td>
              <td>{entry.principal}</td>
              <td style={{ fontFamily: 'var(--font-family-monospace)', fontSize: 'var(--font-size-base100)' }}>
                {entry.clientIp}
              </td>
              <td style={{ color: resultColor(entry.result), fontWeight: entry.result === 'Failure' ? 600 : 400 }}>
                {entry.result}
              </td>
              <td className="statement-cell" title={entry.statement}>{entry.statement}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ─── Main Page Content ─── */
export default function PageContent() {
  return (
    <>
      {/* Toolbar */}
      <div style={{ padding: '0 32px' }}>
        <CuiToolbar size="small" label="Resource actions">
          <CuiButton appearance="subtle" size="small">
            <CuiIcon slot="start" url="https://api.iconify.design/fluent:code-24-regular.svg" />
            Query editor
          </CuiButton>
          <CuiDivider orientation="vertical" style={{ height: '20px' }} />
          <CuiButton appearance="subtle" size="small">
            <CuiIcon slot="start" url="https://api.iconify.design/fluent:arrow-sync-24-regular.svg" />
            Restore
          </CuiButton>
          <CuiButton appearance="subtle" size="small">
            <CuiIcon slot="start" url="https://api.iconify.design/fluent:copy-24-regular.svg" />
            Copy
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

        {/* ─── DTU + Connections cards ─── */}
        <div className="overview-cards-row">
          <DtuGauge />
          <ConnectionsCard />
        </div>

        {/* ─── Geo-Replication ─── */}
        <GeoReplicationSection />

        {/* ─── Audit Log ─── */}
        <AuditLogTable />
      </div>
    </>
  );
}
