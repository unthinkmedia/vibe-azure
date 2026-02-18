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
  ruGaugeData,
  partitionKeys,
  globalRegions,
  consistencyConfig,
  recentOperations,
  formatTimestamp,
} from './data';
import type { RecentOperation } from './data';

/* ═══════════════════════════════════════════════════
   RU/s Consumption Gauge
   ═══════════════════════════════════════════════════ */
function RuGauge() {
  const r = 52;
  const circ = 2 * Math.PI * r;
  const pct = (ruGaugeData.currentRUs / ruGaugeData.provisionedRUs) * 100;
  const dashLen = (pct / 100) * circ;

  let gaugeColor = 'var(--status-success-foreground1)';
  if (pct >= ruGaugeData.criticalThreshold) gaugeColor = 'var(--status-danger-foreground1)';
  else if (pct >= ruGaugeData.warningThreshold) gaugeColor = 'var(--status-warning-foreground1)';

  return (
    <CuiCard appearance="outline" heading="RU/s consumption" className="gauge-card">
      <div className="gauge-body">
        <div className="gauge-wrap">
          <svg width="140" height="140" viewBox="0 0 140 140" role="img" aria-label={`RU consumption: ${Math.round(pct)}%`}>
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
            <span className="gauge-value" style={{ color: gaugeColor }}>{Math.round(pct)}%</span>
            <span className="gauge-value-label">RU/s</span>
          </div>
        </div>
        <div className="gauge-details">
          <div className="gauge-detail-row">
            <span className="gauge-detail-label">Current</span>
            <span className="gauge-detail-value">{ruGaugeData.currentRUs.toLocaleString()} RU/s</span>
          </div>
          <div className="gauge-detail-row">
            <span className="gauge-detail-label">Provisioned</span>
            <span className="gauge-detail-value">{ruGaugeData.provisionedRUs.toLocaleString()} RU/s</span>
          </div>
          <CuiDivider />
          <div className="gauge-threshold">
            <span className="gauge-threshold-dot" style={{ background: 'var(--status-warning-foreground1)' }} />
            Warning: {ruGaugeData.warningThreshold}%
          </div>
          <div className="gauge-threshold">
            <span className="gauge-threshold-dot" style={{ background: 'var(--status-danger-foreground1)' }} />
            Critical: {ruGaugeData.criticalThreshold}%
          </div>
        </div>
      </div>
    </CuiCard>
  );
}

/* ═══════════════════════════════════════════════════
   Partition Key Distribution Heat Map
   ═══════════════════════════════════════════════════ */
function PartitionHeatMap() {
  function getBarColor(pct: number): string {
    if (pct >= 70) return 'var(--status-danger-foreground1)';
    if (pct >= 50) return 'var(--status-warning-foreground1)';
    return 'var(--status-success-foreground1)';
  }

  return (
    <CuiCard appearance="outline" heading="Partition key distribution" className="heatmap-card">
      <div className="heatmap-rows">
        {partitionKeys.map((pk) => (
          <div key={pk.partitionKey} className="heatmap-row">
            <span className="heatmap-key" title={pk.partitionKey}>{pk.partitionKey}</span>
            <div className="heatmap-bar-track" role="meter" aria-valuenow={pk.ruPercent} aria-valuemin={0} aria-valuemax={100} aria-label={`${pk.partitionKey} RU usage`}>
              <div
                className="heatmap-bar-fill"
                style={{
                  width: `${pk.ruPercent}%`,
                  background: getBarColor(pk.ruPercent),
                }}
              />
            </div>
            <span className="heatmap-pct" style={{ color: getBarColor(pk.ruPercent) }}>{pk.ruPercent}%</span>
            <span className="heatmap-meta">{pk.storageGB} GB · {pk.documentCount}</span>
          </div>
        ))}
      </div>
    </CuiCard>
  );
}

/* ═══════════════════════════════════════════════════
   Global Distribution Map
   ═══════════════════════════════════════════════════ */
function GlobalDistributionMap() {
  const writeColor = 'var(--brand-foreground1)';
  const readColor = 'var(--status-success-foreground1)';
  const initColor = 'var(--status-warning-foreground1)';

  function getRegionColor(region: typeof globalRegions[0]) {
    if (region.status === 'Initializing') return initColor;
    return region.role === 'Read/Write' ? writeColor : readColor;
  }

  function getLatencyBadgeColor(ms: number): 'success' | 'warning' | 'danger' {
    if (ms <= 10) return 'success';
    if (ms <= 50) return 'warning';
    return 'danger';
  }

  return (
    <CuiCard appearance="outline" heading="Global distribution" className="map-card">
      <div className="map-container">
        <svg className="map-svg" viewBox="0 0 480 260" preserveAspectRatio="xMidYMid meet">
          {/* Simplified world map outlines */}
          <path d="M60,60 Q90,50 120,55 L140,50 Q170,45 200,55 L210,60 Q230,65 240,75 L235,85 Q225,95 210,100 L190,105 Q170,110 150,105 L130,95 Q110,85 90,80 L70,75 Q55,70 60,60Z" fill="var(--neutral-background4)" stroke="var(--neutral-stroke2)" strokeWidth="0.5" />
          <path d="M210,30 Q250,25 290,35 L320,40 Q350,35 370,40 L380,50 Q390,60 385,75 L375,85 Q360,95 345,90 L325,85 Q300,80 280,85 L260,90 Q240,85 225,75 L215,65 Q205,50 210,30Z" fill="var(--neutral-background4)" stroke="var(--neutral-stroke2)" strokeWidth="0.5" />
          <path d="M330,50 Q360,40 390,45 L420,55 Q440,60 445,75 L440,90 Q430,100 415,95 L395,85 Q370,80 350,75 L335,65 Q325,55 330,50Z" fill="var(--neutral-background4)" stroke="var(--neutral-stroke2)" strokeWidth="0.5" />
          <path d="M140,120 Q160,110 180,115 L200,130 Q210,145 200,160 L185,170 Q165,175 145,165 L135,150 Q125,135 140,120Z" fill="var(--neutral-background4)" stroke="var(--neutral-stroke2)" strokeWidth="0.5" />
          <path d="M280,100 Q310,95 340,105 L350,120 Q355,140 345,155 L325,160 Q300,165 280,155 L270,140 Q265,120 280,100Z" fill="var(--neutral-background4)" stroke="var(--neutral-stroke2)" strokeWidth="0.5" />
          <path d="M350,130 Q380,120 420,130 L450,145 Q460,160 450,180 L430,190 Q400,200 370,190 L355,175 Q340,155 350,130Z" fill="var(--neutral-background4)" stroke="var(--neutral-stroke2)" strokeWidth="0.5" />
          <path d="M180,180 Q210,175 240,185 L250,200 Q245,220 225,230 L205,235 Q185,230 175,215 L170,200 Q170,188 180,180Z" fill="var(--neutral-background4)" stroke="var(--neutral-stroke2)" strokeWidth="0.5" />

          {/* Connection lines between regions */}
          {globalRegions.filter(r => r.role === 'Read').map((region) => {
            const primary = globalRegions.find(r => r.role === 'Read/Write')!;
            return (
              <line
                key={region.code}
                x1={(primary.x / 100) * 480}
                y1={(primary.y / 100) * 260}
                x2={(region.x / 100) * 480}
                y2={(region.y / 100) * 260}
                stroke="var(--neutral-stroke2)"
                strokeWidth="1"
                strokeDasharray="4 3"
              />
            );
          })}

          {/* Region dots */}
          {globalRegions.map((region) => (
            <g key={region.code} className="map-region-dot">
              {/* Pulse ring for write region */}
              {region.role === 'Read/Write' && (
                <circle
                  cx={(region.x / 100) * 480}
                  cy={(region.y / 100) * 260}
                  r="12"
                  fill="none"
                  stroke={writeColor}
                  strokeWidth="1.5"
                  opacity="0.3"
                />
              )}
              <circle
                cx={(region.x / 100) * 480}
                cy={(region.y / 100) * 260}
                r="6"
                fill={getRegionColor(region)}
              />
            </g>
          ))}
        </svg>

        {/* Labels positioned over map */}
        {globalRegions.map((region) => (
          <div
            key={region.code}
            className="map-region-label"
            style={{
              left: `${region.x}%`,
              top: `${region.y < 50 ? region.y + 8 : region.y - 18}%`,
              transform: 'translateX(-50%)',
            }}
          >
            <div className="map-region-name">{region.name}</div>
            <div className="map-region-detail">
              {region.role} · {region.readLatencyMs}ms read
              {region.writeLatencyMs !== null && ` · ${region.writeLatencyMs}ms write`}
            </div>
          </div>
        ))}
      </div>

      {/* Legend + badges row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 }}>
        <div className="map-legend">
          <div className="map-legend-item">
            <span className="map-legend-dot" style={{ background: writeColor }} />
            Read/Write
          </div>
          <div className="map-legend-item">
            <span className="map-legend-dot" style={{ background: readColor }} />
            Read
          </div>
          <div className="map-legend-item">
            <span className="map-legend-dot" style={{ background: initColor }} />
            Initializing
          </div>
        </div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {globalRegions.map(region => (
            <CuiBadge
              key={region.code}
              appearance="tint"
              size="small"
              color={getLatencyBadgeColor(region.readLatencyMs)}
            >
              {region.name}: {region.readLatencyMs}ms
            </CuiBadge>
          ))}
        </div>
      </div>
    </CuiCard>
  );
}

/* ═══════════════════════════════════════════════════
   Consistency Level Selector
   ═══════════════════════════════════════════════════ */
function ConsistencySelector() {
  const levels = ['Strong', 'Bounded Staleness', 'Session', 'Consistent Prefix', 'Eventual'] as const;
  const latencyScale: Record<string, string> = {
    'Strong': 'Highest',
    'Bounded Staleness': 'High',
    'Session': 'Moderate',
    'Consistent Prefix': 'Low',
    'Eventual': 'Lowest',
  };
  const throughputScale: Record<string, string> = {
    'Strong': 'Lowest',
    'Bounded Staleness': 'Low',
    'Session': 'Moderate',
    'Consistent Prefix': 'High',
    'Eventual': 'Highest',
  };

  return (
    <CuiCard appearance="outline" heading="Consistency level" className="consistency-card">
      <div className="consistency-levels">
        {levels.map((level) => {
          const isActive = level === consistencyConfig.current;
          const isRecommended = level === consistencyConfig.recommended;
          return (
            <div
              key={level}
              className={`consistency-level${isActive ? ' active' : ''}${isRecommended ? ' recommended' : ''}`}
              title={isRecommended ? 'Recommended for your workload' : undefined}
            >
              {level}
            </div>
          );
        })}
      </div>
      <div className="consistency-desc">
        {consistencyConfig.description[consistencyConfig.current]}
      </div>
      <div className="consistency-meta">
        <div className="consistency-meta-item">
          Read latency: <span className="consistency-meta-value">{latencyScale[consistencyConfig.current]}</span>
        </div>
        <div className="consistency-meta-item">
          Throughput: <span className="consistency-meta-value">{throughputScale[consistencyConfig.current]}</span>
        </div>
        <div className="consistency-meta-item">
          <CuiBadge appearance="tint" color="success" size="small">
            <CuiIcon slot="start" name="checkmark" style={{ fontSize: 12 }} />
            Current = Recommended
          </CuiBadge>
        </div>
      </div>
    </CuiCard>
  );
}

/* ═══════════════════════════════════════════════════
   Recent Operations Table
   ═══════════════════════════════════════════════════ */
type SortKey = keyof RecentOperation;
type SortDir = 'asc' | 'desc';

function RecentOperationsTable() {
  const [sortKey, setSortKey] = useState<SortKey>('timestamp');
  const [sortDir, setSortDir] = useState<SortDir>('desc');

  const sorted = useMemo(() => {
    const copy = [...recentOperations];
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

  function getRuClass(ru: number): string {
    if (ru >= 100) return 'ru-high';
    if (ru >= 40) return 'ru-med';
    return 'ru-low';
  }

  function getLatencyClass(ms: number): string {
    if (ms >= 30) return 'latency-high';
    if (ms >= 15) return 'latency-med';
    return '';
  }

  return (
    <div className="ops-section">
      <h2 className="section-title">Recent operations</h2>
      <table className="ops-table" role="grid" aria-label="Recent Cosmos DB operations">
        <thead>
          <tr>
            <th onClick={() => handleSort('timestamp')}>Time{sortIndicator('timestamp')}</th>
            <th onClick={() => handleSort('operation')}>Operation{sortIndicator('operation')}</th>
            <th onClick={() => handleSort('database')}>Database{sortIndicator('database')}</th>
            <th onClick={() => handleSort('container')}>Container{sortIndicator('container')}</th>
            <th onClick={() => handleSort('ruCharge')}>RU charge{sortIndicator('ruCharge')}</th>
            <th onClick={() => handleSort('latencyMs')}>Latency{sortIndicator('latencyMs')}</th>
            <th onClick={() => handleSort('statusCode')}>Status{sortIndicator('statusCode')}</th>
            <th>Partition key</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((op, i) => (
            <tr key={i}>
              <td>{formatTimestamp(op.timestamp)}</td>
              <td>{op.operation}</td>
              <td>{op.database}</td>
              <td>{op.container}</td>
              <td className={getRuClass(op.ruCharge)} style={{ fontVariantNumeric: 'tabular-nums' }}>
                {op.ruCharge.toFixed(1)}
              </td>
              <td className={getLatencyClass(op.latencyMs)} style={{ fontVariantNumeric: 'tabular-nums' }}>
                {op.latencyMs} ms
              </td>
              <td>
                <CuiBadge
                  appearance="tint"
                  size="small"
                  color={op.statusCode === 429 ? 'danger' : op.statusCode >= 200 && op.statusCode < 300 ? 'success' : 'warning'}
                >
                  {op.statusCode}
                </CuiBadge>
              </td>
              <td className="mono-cell">{op.partitionKey}</td>
            </tr>
          ))}
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
        <CuiToolbar size="small" label="Resource actions">
          <CuiButton appearance="subtle" size="small">
            <CuiIcon slot="start" url="https://api.iconify.design/fluent:database-search-24-regular.svg" />
            Data Explorer
          </CuiButton>
          <CuiDivider orientation="vertical" style={{ height: '20px' }} />
          <CuiButton appearance="subtle" size="small">
            <CuiIcon slot="start" url="https://api.iconify.design/fluent:notebook-24-regular.svg" />
            New Notebook
          </CuiButton>
          <CuiButton appearance="subtle" size="small">
            <CuiIcon slot="start" url="https://api.iconify.design/fluent:arrow-sync-24-regular.svg" />
            Refresh
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

        {/* ─── RU Gauge + Partition Heat Map ─── */}
        <div className="overview-cards-row">
          <RuGauge />
          <PartitionHeatMap />
        </div>

        {/* ─── Global Distribution Map ─── */}
        <div style={{ marginBottom: 24 }}>
          <GlobalDistributionMap />
        </div>

        {/* ─── Consistency Level ─── */}
        <div style={{ marginBottom: 24 }}>
          <ConsistencySelector />
        </div>

        {/* ─── Recent Operations ─── */}
        <RecentOperationsTable />
      </div>
    </>
  );
}
