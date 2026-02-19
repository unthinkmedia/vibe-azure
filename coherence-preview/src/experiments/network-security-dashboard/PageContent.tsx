import { useState, useMemo } from 'react';
import { CuiButton, CuiIcon, CuiMessageBar } from '@charm-ux/cui/react';
import {
  threatMetrics,
  attackOrigins,
  firewallEvents,
  nsgRecommendations,
  type FirewallAction,
  type EventSeverity,
  type RecommendationPriority,
} from './data';

// ─── Country code → flag emoji ───
const countryFlags: Record<string, string> = {
  CN: '🇨🇳', RU: '🇷🇺', US: '🇺🇸', BR: '🇧🇷', IN: '🇮🇳',
  IR: '🇮🇷', KP: '🇰🇵', VN: '🇻🇳', NG: '🇳🇬', DE: '🇩🇪',
};

// ─── Threat Summary Strip ───
function ThreatSummary() {
  return (
    <div className="nsd-threat-strip">
      {threatMetrics.map((m) => (
        <div key={m.label} className="nsd-threat-card">
          <div className={`nsd-threat-icon ${m.accent}`}>
            <CuiIcon url={`https://api.iconify.design/fluent:${m.icon}-24-regular.svg`} style={{ fontSize: 22 }} />
          </div>
          <div>
            <div className="nsd-threat-label">{m.label}</div>
            <div className="nsd-threat-value">{m.value}</div>
            <div className="nsd-threat-subtext">{m.subtext}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Geographic Attack Map ───
function GeoAttackMap() {
  const maxCount = attackOrigins[0]?.threatCount ?? 1;

  return (
    <div className="nsd-geo-card">
      <h3>Top Attack Source Countries</h3>
      <p className="nsd-geo-desc">Geographic distribution of blocked threats in the last 24 hours</p>
      <div className="nsd-geo-grid">
        {attackOrigins.map((origin, i) => (
          <div key={origin.code} className="nsd-geo-row">
            <span className="nsd-geo-rank">{i + 1}</span>
            <span className="nsd-geo-flag">{countryFlags[origin.code] ?? '🌐'}</span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="nsd-geo-country">{origin.country}</div>
              <div className="nsd-geo-attack-type">{origin.topAttackType}</div>
            </div>
            <div style={{ textAlign: 'right', flexShrink: 0 }}>
              <div className="nsd-geo-count">{origin.threatCount.toLocaleString()}</div>
              <div className="nsd-geo-bar-wrap">
                <div
                  className="nsd-geo-bar-fill"
                  style={{ width: `${(origin.threatCount / maxCount) * 100}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Firewall Events Table ───
function FirewallEventsTable() {
  const [actionFilter, setActionFilter] = useState<FirewallAction | 'all'>('all');
  const [severityFilter, setSeverityFilter] = useState<EventSeverity | 'all'>('all');

  const filtered = useMemo(() => {
    let list = firewallEvents;
    if (actionFilter !== 'all') list = list.filter((e) => e.action === actionFilter);
    if (severityFilter !== 'all') list = list.filter((e) => e.severity === severityFilter);
    return list;
  }, [actionFilter, severityFilter]);

  const actionFilters: { key: FirewallAction | 'all'; label: string }[] = [
    { key: 'all', label: `All (${firewallEvents.length})` },
    { key: 'deny', label: `Deny (${firewallEvents.filter((e) => e.action === 'deny').length})` },
    { key: 'allow', label: `Allow (${firewallEvents.filter((e) => e.action === 'allow').length})` },
  ];

  const severityFilters: { key: EventSeverity | 'all'; label: string }[] = [
    { key: 'all', label: 'All Severities' },
    { key: 'critical', label: 'Critical' },
    { key: 'high', label: 'High' },
    { key: 'medium', label: 'Medium' },
    { key: 'low', label: 'Low' },
    { key: 'info', label: 'Info' },
  ];

  return (
    <div className="nsd-section">
      <h2>Recent Firewall Events</h2>
      <p className="nsd-section-desc">Real-time log of firewall rule evaluations across all network security groups.</p>

      <div className="nsd-filter-bar">
        {actionFilters.map((f) => (
          <button
            key={f.key}
            className={`nsd-filter-chip ${actionFilter === f.key ? 'active' : ''}`}
            onClick={() => setActionFilter(f.key)}
          >
            {f.label}
          </button>
        ))}
        <span aria-hidden="true" style={{ width: 1, height: 20, background: 'var(--neutral-stroke2)', margin: '0 4px' }} />
        {severityFilters.map((f) => (
          <button
            key={f.key}
            className={`nsd-filter-chip ${severityFilter === f.key ? 'active' : ''}`}
            onClick={() => setSeverityFilter(f.key)}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="nsd-table-wrap">
        <table className="nsd-table" aria-label="Recent firewall events">
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>Source IP</th>
              <th>Destination</th>
              <th>Action</th>
              <th>Rule Name</th>
              <th>Severity</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((evt) => (
              <tr key={evt.id}>
                <td style={{ whiteSpace: 'nowrap', fontVariantNumeric: 'tabular-nums' }}>{evt.timestamp}</td>
                <td><span className="nsd-mono">{evt.sourceIP}</span></td>
                <td><span className="nsd-mono">{evt.destination}</span></td>
                <td>
                  <span className={`nsd-action-badge ${evt.action}`}>
                    <CuiIcon
                      name={evt.action === 'deny' ? 'dismiss-circle' : 'checkmark-circle'}
                      style={{ fontSize: 14 }}
                    />
                    {evt.action === 'deny' ? 'Deny' : 'Allow'}
                  </span>
                </td>
                <td style={{ fontSize: 'var(--font-size-base200)' }}>{evt.ruleName}</td>
                <td><span className={`nsd-severity-badge ${evt.severity}`}>{evt.severity}</span></td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} style={{ textAlign: 'center', color: 'var(--neutral-foreground3)', padding: 24 }}>
                  No events match the current filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── NSG Recommendations Panel ───
function NSGRecommendationsPanel() {
  const grouped = useMemo(() => {
    const groups: Record<RecommendationPriority, typeof nsgRecommendations> = {
      critical: [],
      high: [],
      medium: [],
    };
    nsgRecommendations.forEach((rec) => groups[rec.priority].push(rec));
    return groups;
  }, []);

  const priorityOrder: RecommendationPriority[] = ['critical', 'high', 'medium'];

  return (
    <div className="nsd-rec-panel">
      <div className="nsd-rec-card">
        <div className="nsd-rec-header">
          <h3>NSG Recommendations</h3>
          <p>{nsgRecommendations.length} recommendations across your NSGs</p>
        </div>
        {priorityOrder.map((priority) => {
          const items = grouped[priority];
          if (items.length === 0) return null;
          return (
            <div key={priority} className="nsd-rec-group">
              <div className="nsd-rec-group-header">
                <span className={`nsd-rec-group-count ${priority}`}>{items.length}</span>
                {priority}
              </div>
              {items.map((rec) => (
                <div key={rec.id} className="nsd-rec-item" role="button" tabIndex={0}>
                  <div className="nsd-rec-item-title">{rec.title}</div>
                  <div className="nsd-rec-item-desc">{rec.description}</div>
                  <div className="nsd-rec-item-meta">
                    <span className="nsd-rec-item-resources">{rec.affectedResources} resources</span>
                    <span>{rec.nsgName}</span>
                  </div>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Page Content ───
export default function PageContent() {
  return (
    <div className="nsd-content-inner">
      {/* Info bar */}
      <div className="nsd-info-bar">
        <CuiMessageBar intent="info" shape="square">
          <CuiIcon name="info" slot="icon" />
          Threat data is updated in real-time. Last sync: 2 minutes ago across 3 subscriptions and 14 NSGs.
          <CuiButton slot="actions" appearance="outline" size="small">Refresh</CuiButton>
        </CuiMessageBar>
      </div>

      {/* Threat summary strip */}
      <ThreatSummary />

      {/* Main layout: content + side panel */}
      <div className="nsd-main-layout">
        {/* Left column */}
        <div>
          <GeoAttackMap />
          <FirewallEventsTable />
        </div>

        {/* Right column: Recommendations panel */}
        <NSGRecommendationsPanel />
      </div>
    </div>
  );
}
