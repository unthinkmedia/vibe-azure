// @ts-nocheck
import { useState, useCallback } from 'react';
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
  usageSegments,
  totalUsageGiB,
  costData,
  accessKeys,
  daysSince,
  KEY_AGE_WARNING_DAYS,
} from './data';

/* ─── Donut Chart ─── */
function UsageDonut() {
  const r = 52;
  const circ = 2 * Math.PI * r;
  let accumulated = 0;

  return (
    <CuiCard appearance="outline" heading="Usage breakdown" className="donut-card">
      <div className="donut-body">
        <div className="donut-wrap">
          <svg width="140" height="140" viewBox="0 0 140 140">
            <circle cx="70" cy="70" r={r} fill="none" stroke="var(--neutral-background5)" strokeWidth="12" />
            {usageSegments.map((seg) => {
              const fraction = seg.value / totalUsageGiB;
              const dashLen = fraction * circ;
              const offset = -accumulated * circ;
              accumulated += fraction;
              return (
                <circle
                  key={seg.label}
                  cx="70" cy="70" r={r}
                  fill="none"
                  stroke={seg.color}
                  strokeWidth="12"
                  strokeDasharray={`${dashLen} ${circ - dashLen}`}
                  strokeDashoffset={offset}
                />
              );
            })}
          </svg>
          <div className="donut-center">
            <span className="donut-total">{totalUsageGiB}</span>
            <span className="donut-total-label">GiB total</span>
          </div>
        </div>
        <div className="donut-legend">
          {usageSegments.map((seg) => {
            const pct = ((seg.value / totalUsageGiB) * 100).toFixed(1);
            return (
              <div key={seg.label} className="donut-legend-row">
                <span className="donut-legend-dot" style={{ background: seg.color }} />
                <span className="donut-legend-label">{seg.label}</span>
                <span className="donut-legend-value">{seg.value} GiB</span>
                <span className="donut-legend-pct">{pct}%</span>
              </div>
            );
          })}
        </div>
      </div>
    </CuiCard>
  );
}

/* ─── Cost Card ─── */
function CostCard() {
  const diff = costData.currentMonth - costData.previousMonth;
  const pctChange = ((diff / costData.previousMonth) * 100).toFixed(1);
  const isUp = diff > 0;

  return (
    <CuiCard appearance="outline" heading="Cost to date" className="cost-card">
      <div className="cost-primary">
        ${costData.currentMonth.toFixed(2)}
        <span style={{ fontSize: 14, fontWeight: 400, color: 'var(--neutral-foreground3)', marginLeft: 4 }}>{costData.currency}</span>
      </div>
      <div className="cost-period">{costData.billingPeriod}</div>
      <CuiBadge appearance="tint" color={isUp ? 'danger' : 'success'} size="small">
        <CuiIcon
          slot="start"
          url={`https://api.iconify.design/fluent:arrow-trending-${isUp ? 'up' : 'down'}-24-regular.svg`}
          style={{ fontSize: 14 }}
        />
        {isUp ? '+' : ''}{pctChange}% vs last month (${costData.previousMonth.toFixed(2)})
      </CuiBadge>
      <div className="cost-breakdown">
        {costData.breakdown.map((item) => (
          <div key={item.label} className="cost-breakdown-row">
            <span className="cost-breakdown-label">{item.label}</span>
            <span className="cost-breakdown-amount">${item.amount.toFixed(2)}</span>
          </div>
        ))}
      </div>
    </CuiCard>
  );
}

/* ─── Access Keys ─── */
function AccessKeysSection() {
  const [showValues, setShowValues] = useState<Record<string, boolean>>({});
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const staleKeys = accessKeys.filter(k => daysSince(k.createdDate) > KEY_AGE_WARNING_DAYS);

  const toggleVisibility = useCallback((keyName: string) => {
    setShowValues(prev => ({ ...prev, [keyName]: !prev[keyName] }));
  }, []);

  const copyToClipboard = useCallback((text: string, fieldId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldId);
    setTimeout(() => setCopiedField(null), 2000);
  }, []);

  const maskValue = (val: string) => '••••••••••••••••••••••••••••••••';

  return (
    <div className="keys-section">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
        <h2 className="section-title" style={{ margin: 0 }}>Access keys</h2>
        <CuiButton appearance="subtle" size="small">
          <CuiIcon slot="start" url="https://api.iconify.design/fluent:arrow-clockwise-24-regular.svg" />
          Rotate keys
        </CuiButton>
      </div>

      {staleKeys.length > 0 && (
        <div className="key-warning-banner">
          <CuiIcon name="warning" style={{ color: '#b45309', fontSize: 16, flexShrink: 0 }} />
          {staleKeys.length === 1 ? (
            <span><strong>{staleKeys[0].name}</strong> was created {daysSince(staleKeys[0].createdDate)} days ago. Rotate keys that are older than {KEY_AGE_WARNING_DAYS} days for security best practices.</span>
          ) : (
            <span>{staleKeys.length} access keys are older than {KEY_AGE_WARNING_DAYS} days. Rotate them for security best practices.</span>
          )}
        </div>
      )}

      {accessKeys.map((key) => {
        const age = daysSince(key.createdDate);
        const isStale = age > KEY_AGE_WARNING_DAYS;
        const isVisible = showValues[key.name] ?? false;

        return (
          <div key={key.name} className="key-block">
            <div className="key-block-header">
              <div className="key-block-title">
                <CuiIcon url="https://api.iconify.design/fluent:key-24-regular.svg" style={{ fontSize: 16 }} />
                {key.name}
                {isStale && (
                  <CuiBadge appearance="tint" color="danger" size="small">
                    {age} days old
                  </CuiBadge>
                )}
              </div>
              <span className={`key-age ${isStale ? 'stale' : ''}`}>
                Created {new Date(key.createdDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </span>
            </div>

            {/* Key value */}
            <div className="key-field">
              <span className="key-field-label">Key</span>
              <div className="key-field-row">
                <span className="key-field-value">
                  {isVisible ? key.value : maskValue(key.value)}
                </span>
                <CuiButton
                  appearance="subtle"
                  size="small"
                  iconOnly
                  aria-label={isVisible ? `Hide ${key.name}` : `Show ${key.name}`}
                  onClick={() => toggleVisibility(key.name)}
                >
                  <CuiIcon name={isVisible ? 'eye-off' : 'eye'} />
                </CuiButton>
                <CuiButton
                  appearance="subtle"
                  size="small"
                  iconOnly
                  aria-label={`Copy ${key.name}`}
                  onClick={() => copyToClipboard(key.value, `${key.name}-key`)}
                >
                  <CuiIcon name="copy" />
                </CuiButton>
              </div>
            </div>

            {/* Connection string */}
            <div className="key-field">
              <span className="key-field-label">Connection string</span>
              <div className="key-field-row">
                <span className="key-field-value">
                  {isVisible ? key.connectionString : maskValue(key.connectionString)}
                </span>
                <CuiButton
                  appearance="subtle"
                  size="small"
                  iconOnly
                  aria-label={`Copy ${key.name} connection string`}
                  onClick={() => copyToClipboard(key.connectionString, `${key.name}-conn`)}
                >
                  <CuiIcon name="copy" />
                </CuiButton>
              </div>
            </div>
          </div>
        );
      })}

      {/* Copied toast */}
      {copiedField && (
        <div className="copy-toast">
          <CuiIcon name="checkmark" style={{ color: 'var(--status-success-foreground1)' }} />
          Copied to clipboard
        </div>
      )}
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
            <CuiIcon slot="start" name="open" />
            Open in Explorer
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

        {/* ─── Usage + Cost cards ─── */}
        <div className="overview-cards-row">
          <UsageDonut />
          <CostCard />
        </div>

        {/* ─── Access Keys ─── */}
        <AccessKeysSection />
      </div>
    </>
  );
}
