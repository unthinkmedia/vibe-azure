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
  secrets,
  certificates,
  accessPolicies,
  sensitiveOperations,
  getDaysUntilExpiry,
  formatDate,
  formatTimestamp,
} from './data';
import type { SensitiveOperation } from './data';

/* ═══════════════════════════════════════════════════
   Secrets Expiration Timeline
   ═══════════════════════════════════════════════════ */
function SecretsExpirationTimeline() {
  const enabledSecrets = secrets.filter(s => s.status === 'Enabled');
  const expired = enabledSecrets.filter(s => getDaysUntilExpiry(s.expirationDate) <= 0);
  const within30 = enabledSecrets.filter(s => {
    const d = getDaysUntilExpiry(s.expirationDate);
    return d > 0 && d <= 30;
  });
  const within60 = enabledSecrets.filter(s => {
    const d = getDaysUntilExpiry(s.expirationDate);
    return d > 30 && d <= 60;
  });
  const within90 = enabledSecrets.filter(s => {
    const d = getDaysUntilExpiry(s.expirationDate);
    return d > 60 && d <= 90;
  });

  const allUpcoming = [...expired, ...within30, ...within60, ...within90].sort(
    (a, b) => new Date(a.expirationDate).getTime() - new Date(b.expirationDate).getTime()
  );

  const total = allUpcoming.length || 1;
  const dangerPct = ((expired.length + within30.length) / total) * 100;
  const warningPct = (within60.length / total) * 100;
  const infoPct = (within90.length / total) * 100;

  return (
    <CuiCard appearance="outline" heading="Secret expiration timeline" className="overview-cards-full">
      {/* Summary buckets */}
      <div className="expiry-buckets">
        <div className={`expiry-bucket ${expired.length + within30.length > 0 ? 'danger' : ''}`}>
          <span className="expiry-bucket-count">{expired.length + within30.length}</span>
          <span className="expiry-bucket-label">Next 30 days</span>
        </div>
        <div className={`expiry-bucket ${within60.length > 0 ? 'warning' : ''}`}>
          <span className="expiry-bucket-count">{within60.length}</span>
          <span className="expiry-bucket-label">31–60 days</span>
        </div>
        <div className={`expiry-bucket ${within90.length > 0 ? 'info' : ''}`}>
          <span className="expiry-bucket-count">{within90.length}</span>
          <span className="expiry-bucket-label">61–90 days</span>
        </div>
      </div>

      {/* Timeline bar */}
      <div className="expiry-timeline-bar">
        <div
          className="expiry-timeline-segment"
          style={{ width: `${dangerPct}%`, background: 'var(--status-danger-foreground1)' }}
        />
        <div
          className="expiry-timeline-segment"
          style={{ width: `${warningPct}%`, background: 'var(--status-warning-foreground1)' }}
        />
        <div
          className="expiry-timeline-segment"
          style={{ width: `${infoPct}%`, background: 'var(--brand-foreground1)' }}
        />
      </div>

      {/* Upcoming expirations list */}
      <div className="expiry-list">
        {allUpcoming.map(secret => {
          const days = getDaysUntilExpiry(secret.expirationDate);
          let badgeColor: 'danger' | 'warning' | 'brand' = 'brand';
          let badgeLabel = `${days}d`;
          if (days <= 0) { badgeColor = 'danger'; badgeLabel = 'Expired'; }
          else if (days <= 30) { badgeColor = 'danger'; }
          else if (days <= 60) { badgeColor = 'warning'; }

          return (
            <div className="expiry-item" key={secret.name}>
              <div className="expiry-item-left">
                <CuiBadge appearance="tint" size="small" color={badgeColor}>
                  {badgeLabel}
                </CuiBadge>
                <span className="expiry-item-name">{secret.name}</span>
              </div>
              <div className="expiry-item-right">
                <span>Expires {formatDate(secret.expirationDate)}</span>
                <span>Updated {formatDate(secret.lastUpdated)}</span>
              </div>
            </div>
          );
        })}
      </div>
    </CuiCard>
  );
}

/* ═══════════════════════════════════════════════════
   Certificate Health Dashboard
   ═══════════════════════════════════════════════════ */
function CertificateHealthDashboard() {
  const validCount = certificates.filter(c => c.status === 'Valid').length;
  const expiringCount = certificates.filter(c => c.status === 'Expiring').length;
  const expiredCount = certificates.filter(c => c.status === 'Expired' || c.status === 'Revoked').length;
  const autoRenewCount = certificates.filter(c => c.autoRenew).length;

  function getStatusBadge(status: string): { color: 'success' | 'warning' | 'danger'; icon: string } {
    switch (status) {
      case 'Valid': return { color: 'success', icon: 'checkmark-circle' };
      case 'Expiring': return { color: 'warning', icon: 'warning' };
      case 'Expired': return { color: 'danger', icon: 'dismiss-circle' };
      case 'Revoked': return { color: 'danger', icon: 'dismiss-circle' };
      default: return { color: 'success', icon: 'checkmark-circle' };
    }
  }

  return (
    <CuiCard appearance="outline" heading="Certificate health" className="overview-cards-full">
      {/* Summary counters */}
      <div className="cert-summary-row">
        <div className="cert-summary-stat">
          <span className="status-dot success" />
          <span className="cert-summary-stat-value">{validCount}</span> Valid
        </div>
        <div className="cert-summary-stat">
          <span className="status-dot warning" />
          <span className="cert-summary-stat-value">{expiringCount}</span> Expiring
        </div>
        <div className="cert-summary-stat">
          <span className="status-dot error" />
          <span className="cert-summary-stat-value">{expiredCount}</span> Expired/Revoked
        </div>
        <div className="cert-summary-stat">
          <CuiIcon name="arrow-sync" style={{ fontSize: 14, color: 'var(--brand-foreground1)' }} />
          <span className="cert-summary-stat-value">{autoRenewCount}</span> Auto-renew
        </div>
      </div>

      {/* Certificate cards */}
      <div className="cert-grid">
        {certificates.map(cert => {
          const badge = getStatusBadge(cert.status);
          const daysLeft = getDaysUntilExpiry(cert.validTo);
          return (
            <div className="cert-card" key={cert.name}>
              <div className="cert-card-header">
                <span className="cert-card-name">{cert.name}</span>
                <CuiBadge appearance="tint" size="small" color={badge.color}>
                  <CuiIcon slot="start" name={badge.icon} style={{ fontSize: 12 }} />
                  {cert.status}
                </CuiBadge>
              </div>
              <div className="cert-card-subject">{cert.subject} · {cert.issuer}</div>
              <div className="cert-card-details">
                <div className="cert-card-row">
                  <span className="cert-card-row-label">Valid</span>
                  <span className="cert-card-row-value">
                    {formatDate(cert.validFrom)} → {formatDate(cert.validTo)}
                    {daysLeft > 0 && ` (${daysLeft}d)`}
                  </span>
                </div>
                <div className="cert-card-row">
                  <span className="cert-card-row-label">Key</span>
                  <span className="cert-card-row-value">{cert.keyType}-{cert.keySize}</span>
                </div>
                <div className="cert-card-row">
                  <span className="cert-card-row-label">Renewal</span>
                  <span className="cert-card-row-value">
                    {cert.autoRenew ? (
                      <span className="cert-renewal-indicator auto">
                        <CuiIcon name="arrow-sync" style={{ fontSize: 12 }} /> Auto
                        {cert.renewalStatus && ` · ${cert.renewalStatus}`}
                      </span>
                    ) : (
                      <span className="cert-renewal-indicator manual">Manual</span>
                    )}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </CuiCard>
  );
}

/* ═══════════════════════════════════════════════════
   Access Policy Summary Cards
   ═══════════════════════════════════════════════════ */
function AccessPolicySummary() {
  const groups = [
    { type: 'User' as const, icon: 'person', label: 'Users' },
    { type: 'Application' as const, icon: 'app-generic', label: 'Applications' },
    { type: 'Managed Identity' as const, icon: 'bot', label: 'Managed Identities' },
  ];

  return (
    <CuiCard appearance="outline" heading="Access policies" className="overview-cards-full">
      {groups.map(group => {
        const policies = accessPolicies.filter(p => p.principalType === group.type);
        if (policies.length === 0) return null;
        return (
          <div className="policy-group" key={group.type}>
            <div className="policy-group-header">
              <CuiIcon name={group.icon} style={{ fontSize: 18 }} />
              <h3 className="policy-group-title">{group.label}</h3>
              <span className="policy-group-count">{policies.length}</span>
            </div>
            <div className="policy-cards">
              {policies.map(policy => (
                <div className="policy-card" key={policy.objectId}>
                  <div className="policy-card-name">
                    <CuiIcon name={group.icon} style={{ fontSize: 14 }} />
                    {policy.principalName}
                  </div>
                  <div className="policy-card-perms">
                    {policy.keyPermissions.length > 0 && (
                      <div className="policy-perm-row">
                        <span className="policy-perm-label">Keys</span>
                        <div className="policy-perm-tags">
                          {policy.keyPermissions.slice(0, 3).map(p => (
                            <CuiBadge key={p} appearance="outline" size="small">{p}</CuiBadge>
                          ))}
                          {policy.keyPermissions.length > 3 && (
                            <CuiBadge appearance="outline" size="small">
                              +{policy.keyPermissions.length - 3}
                            </CuiBadge>
                          )}
                        </div>
                      </div>
                    )}
                    {policy.secretPermissions.length > 0 && (
                      <div className="policy-perm-row">
                        <span className="policy-perm-label">Secrets</span>
                        <div className="policy-perm-tags">
                          {policy.secretPermissions.slice(0, 3).map(p => (
                            <CuiBadge key={p} appearance="outline" size="small">{p}</CuiBadge>
                          ))}
                          {policy.secretPermissions.length > 3 && (
                            <CuiBadge appearance="outline" size="small">
                              +{policy.secretPermissions.length - 3}
                            </CuiBadge>
                          )}
                        </div>
                      </div>
                    )}
                    {policy.certificatePermissions.length > 0 && (
                      <div className="policy-perm-row">
                        <span className="policy-perm-label">Certs</span>
                        <div className="policy-perm-tags">
                          {policy.certificatePermissions.slice(0, 3).map(p => (
                            <CuiBadge key={p} appearance="outline" size="small">{p}</CuiBadge>
                          ))}
                          {policy.certificatePermissions.length > 3 && (
                            <CuiBadge appearance="outline" size="small">
                              +{policy.certificatePermissions.length - 3}
                            </CuiBadge>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </CuiCard>
  );
}

/* ═══════════════════════════════════════════════════
   Recent Sensitive Operations Table
   ═══════════════════════════════════════════════════ */
type SortKey = keyof SensitiveOperation;
type SortDir = 'asc' | 'desc';

function SensitiveOperationsTable() {
  const [sortKey, setSortKey] = useState<SortKey>('timestamp');
  const [sortDir, setSortDir] = useState<SortDir>('desc');

  const sorted = useMemo(() => {
    const copy = [...sensitiveOperations];
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
      setSortDir(d => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDir('desc');
    }
  };

  const sortIndicator = (key: SortKey) => {
    if (key !== sortKey) return null;
    return <span className="sort-indicator">{sortDir === 'asc' ? '▲' : '▼'}</span>;
  };

  function getOpIcon(op: string): { name: string; className: string } {
    if (op.includes('Purge')) return { name: 'fire', className: 'op-icon-purge' };
    if (op.includes('Delete')) return { name: 'delete', className: 'op-icon-delete' };
    if (op.includes('Recover')) return { name: 'arrow-undo', className: 'op-icon-recover' };
    return { name: 'document', className: '' };
  }

  return (
    <div className="ops-section">
      <h2 className="section-title">Recent sensitive operations</h2>
      <table className="ops-table" role="grid" aria-label="Recent sensitive Key Vault operations">
        <thead>
          <tr>
            <th onClick={() => handleSort('timestamp')}>Time{sortIndicator('timestamp')}</th>
            <th onClick={() => handleSort('operation')}>Operation{sortIndicator('operation')}</th>
            <th onClick={() => handleSort('objectType')}>Type{sortIndicator('objectType')}</th>
            <th onClick={() => handleSort('objectName')}>Object{sortIndicator('objectName')}</th>
            <th onClick={() => handleSort('initiatedBy')}>Initiated by{sortIndicator('initiatedBy')}</th>
            <th onClick={() => handleSort('principalType')}>Principal{sortIndicator('principalType')}</th>
            <th onClick={() => handleSort('status')}>Status{sortIndicator('status')}</th>
            <th>Client IP</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((op, i) => {
            const icon = getOpIcon(op.operation);
            return (
              <tr key={i}>
                <td style={{ whiteSpace: 'nowrap' }}>{formatTimestamp(op.timestamp)}</td>
                <td>
                  <span className="op-name-cell">
                    <CuiIcon name={icon.name} className={icon.className} style={{ fontSize: 14 }} />
                    {op.operation}
                  </span>
                </td>
                <td>
                  <CuiBadge appearance="outline" size="small">{op.objectType}</CuiBadge>
                </td>
                <td className="mono-cell">{op.objectName}</td>
                <td>{op.initiatedBy}</td>
                <td>
                  <CuiBadge appearance="tint" size="small" color="brand">{op.principalType}</CuiBadge>
                </td>
                <td>
                  <CuiBadge
                    appearance="tint"
                    size="small"
                    color={op.status === 'Succeeded' ? 'success' : 'danger'}
                  >
                    {op.status}
                  </CuiBadge>
                </td>
                <td className="mono-cell">{op.clientIp}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   Main Page Content
   ═══════════════════════════════════════════════════ */
export default function PageContent() {
  return (
    <>
      {/* Toolbar */}
      <div style={{ padding: '0 32px' }}>
        <CuiToolbar size="small" label="Key vault actions">
          <CuiButton appearance="subtle" size="small">
            <CuiIcon slot="start" name="add" />
            Generate/Import
          </CuiButton>
          <CuiDivider orientation="vertical" style={{ height: '20px' }} />
          <CuiButton appearance="subtle" size="small">
            <CuiIcon slot="start" name="delete" label="Delete" />
            Delete vault
          </CuiButton>
          <CuiButton appearance="subtle" size="small">
            <CuiIcon slot="start" url="https://api.iconify.design/fluent:arrow-sync-24-regular.svg" />
            Refresh
          </CuiButton>
          <CuiButton appearance="subtle" size="small">Feedback</CuiButton>
        </CuiToolbar>
      </div>

      <CuiDivider style={{ margin: '0' }} />

      <div className="content-area">
        {/* ─── Essentials Panel ─── */}
        <div className="essentials">
          {essentialsData.map(row => (
            <div key={row.label} className="essentials-row">
              <span className="essentials-label">{row.label}</span>
              <span className="essentials-value">
                {row.status && <span className={`status-dot ${row.status}`} />}
                {row.href ? <a href={row.href}>{row.value}</a> : row.value}
              </span>
            </div>
          ))}
        </div>

        {/* ─── Secrets Expiration Timeline ─── */}
        <SecretsExpirationTimeline />

        {/* ─── Certificate Health Dashboard ─── */}
        <CertificateHealthDashboard />

        {/* ─── Access Policy Summary ─── */}
        <AccessPolicySummary />

        {/* ─── Recent Sensitive Operations ─── */}
        <SensitiveOperationsTable />
      </div>
    </>
  );
}
