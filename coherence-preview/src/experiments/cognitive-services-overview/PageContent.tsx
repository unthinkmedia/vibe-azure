// @ts-nocheck
import { useState } from 'react';
import {
  CuiButton,
  CuiCard,
  CuiDivider,
  CuiIcon,
  CuiMessageBar,
  CuiTab,
  CuiTabPanel,
  CuiTabs,
  CuiToolbar,
} from '@charm-ux/cui/react';
import { EssentialsAccordion } from '../../patterns/PatternEssentialsAccordion';
import { KeysEndpoint } from '../../patterns/PatternKeysEndpoint';
import { InfoBanner } from '../../patterns/PatternInfoBanner';
import {
  essentialsData,
  apiKeys,
  usageMetrics,
  callVolumeSeries,
  quotaBars,
  recentErrors,
  MetricCard as MetricCardData,
} from './data';

// ─── Sparkline Component ───
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

// ─── Metric Card ───
function MetricCard({ metric }: { metric: MetricCardData }) {
  const sparkColor = 'var(--brand-foreground-link)';
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
      <div className={`metric-trend ${metric.trend}`}>
        <CuiIcon url={`https://api.iconify.design/fluent:${trendIcon}-24-regular.svg`} style={{ fontSize: 14 }} />
        {metric.trendLabel}
      </div>
      <Sparkline points={metric.sparkline} color={sparkColor} />
    </CuiCard>
  );
}

// ─── Call Volume Chart (stacked area, CSS-only SVG) ───
function CallVolumeChart() {
  const days = callVolumeSeries.map(d => d.day);
  const maxVal = Math.max(...callVolumeSeries.map(d => d.stt + d.tts + d.pronunciation));
  const w = 600;
  const h = 140;
  const pad = 4;

  function yScale(val: number) {
    return pad + (1 - val / maxVal) * (h - pad * 2);
  }

  function makeAreaPath(values: number[], baseline: number[]) {
    const pts = values.map((v, i) => {
      const x = (i / (values.length - 1)) * w;
      return { x, y: yScale(v) };
    });
    const basePts = baseline.map((v, i) => {
      const x = (i / (values.length - 1)) * w;
      return { x, y: yScale(v) };
    }).reverse();

    return `M${pts.map(p => `${p.x},${p.y}`).join(' L')} L${basePts.map(p => `${p.x},${p.y}`).join(' L')} Z`;
  }

  // Stacked: pronunciation at bottom, then tts, then stt on top
  const pronunciationTop = callVolumeSeries.map(d => d.pronunciation);
  const ttsTop = callVolumeSeries.map((d, i) => pronunciationTop[i] + d.tts);
  const sttTop = callVolumeSeries.map((d, i) => ttsTop[i] + d.stt);
  const zeros = callVolumeSeries.map(() => 0);

  const colors = {
    stt: 'var(--brand-foreground-link)',
    tts: 'var(--status-success-foreground1)',
    pronunciation: 'var(--status-warning-foreground1)',
  };

  return (
    <div className="volume-chart-panel">
      <h3>API Call Volume (Last 7 Days)</h3>
      <div className="volume-legend">
        <span><span className="legend-dot" style={{ background: colors.stt }} />Speech-to-Text</span>
        <span><span className="legend-dot" style={{ background: colors.tts }} />Text-to-Speech</span>
        <span><span className="legend-dot" style={{ background: colors.pronunciation }} />Pronunciation Assessment</span>
      </div>
      <svg className="volume-chart-svg" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
        <path d={makeAreaPath(sttTop, ttsTop)} fill={colors.stt} opacity="0.6" />
        <path d={makeAreaPath(ttsTop, pronunciationTop)} fill={colors.tts} opacity="0.6" />
        <path d={makeAreaPath(pronunciationTop, zeros)} fill={colors.pronunciation} opacity="0.6" />
      </svg>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--font-size-base200)', color: 'var(--neutral-foreground3)', marginTop: 4 }}>
        {days.map(d => <span key={d}>{d}</span>)}
      </div>
    </div>
  );
}

// ─── Quota Bars ───
function QuotaSection() {
  return (
    <div className="quota-panel">
      <h3>Quota Utilization (Free Tier)</h3>
      {quotaBars.map(q => {
        const pct = (q.used / q.limit) * 100;
        const level = pct > 80 ? 'red' : pct > 60 ? 'amber' : 'green';
        return (
          <div key={q.label} className="quota-row">
            <div className="quota-label-row">
              <span className="quota-label">{q.label}</span>
              <span className="quota-values">{q.used.toLocaleString()} / {q.limit.toLocaleString()} {q.unit}</span>
            </div>
            <div className="quota-track">
              <div className={`quota-fill ${level}`} style={{ width: `${pct}%` }} />
            </div>
            {pct > 80 && (
              <div className="quota-warning">
                <CuiIcon name="warning" style={{ fontSize: 14 }} />
                {pct >= 100 ? 'Quota exhausted' : 'Approaching quota limit'}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Error Code Badge ───
function errorCodeClass(code: string): string {
  const num = parseInt(code, 10);
  return num >= 500 ? 'server' : 'client';
}

// ─── Main PageContent ───
export default function PageContent() {
  return (
    <>
      {/* Toolbar */}
      <div style={{ padding: '0 32px' }}>
        <CuiToolbar size="small" label="Resource actions">
          <CuiButton appearance="subtle" size="small">
            <CuiIcon slot="start" name="delete" label="Delete" />
            Delete
          </CuiButton>
        </CuiToolbar>
      </div>

      <CuiDivider style={{ margin: '0' }} />

      {/* ─── Essentials Accordion ─── */}
      <EssentialsAccordion rows={essentialsData} />

      <div className="content-area">
        {/* ─── Tabs ─── */}
        <div className="tabs-wrapper">
          <CuiTabs>
            <CuiTab id="tab-get-started">Get Started</CuiTab>
            <CuiTab id="tab-usage">Usage &amp; Insights</CuiTab>

            {/* Get Started tab panel */}
            <CuiTabPanel id="tab-get-started">
              <div className="get-started-section">
                {/* Speech Studio CTA */}
                <div className="speech-studio-section">
                  <h3>Get started with your resource in Speech Studio</h3>
                  <div className="speech-studio-row">
                    <CuiIcon
                      url="https://api.iconify.design/fluent:mic-sparkle-24-regular.svg"
                      style={{ fontSize: 48, color: 'var(--brand-foreground-link)', flexShrink: 0 }}
                    />
                    <div>
                      <p>Try out all use cases and see other custom tools for building Speech AI models</p>
                      <CuiButton appearance="primary" size="small" style={{ marginTop: 12 }}>
                        Go to Speech Studio
                      </CuiButton>
                    </div>
                  </div>
                </div>

                <CuiDivider />

                {/* Keys & Endpoint */}
                <div className="keys-section">
                  <h3>Keys and endpoint</h3>
                  <KeysEndpoint
                    header={
                      <InfoBanner intent="info">
                        These keys are used to access your Foundry API. Do not share your keys. Store them securely — for example, using Azure Key Vault. We also recommend regenerating these keys regularly. Only one key is necessary to make an API call. When regenerating the first key, you can use the second key for continued access to the service.
                      </InfoBanner>
                    }
                    fields={[
                      { label: 'KEY 1', value: apiKeys.key1 },
                      { label: 'KEY 2', value: apiKeys.key2 },
                      { label: 'Location/Region', value: apiKeys.region, masked: false, infoTooltip: 'The Azure region where this resource is deployed' },
                      { label: 'Endpoint', value: apiKeys.endpoint, masked: false },
                    ]}
                  />
                </div>
              </div>
            </CuiTabPanel>

            {/* Usage & Insights tab panel */}
            <CuiTabPanel id="tab-usage">
              <div style={{ paddingTop: 16 }}>
                {/* KPI Metric Strip */}
                <div className="metrics-grid">
                  {usageMetrics.map((metric) => (
                    <MetricCard key={metric.title} metric={metric} />
                  ))}
                </div>

                {/* Call Volume Chart */}
                <CallVolumeChart />

                {/* Quota Utilization */}
                <QuotaSection />

                {/* Recent Errors */}
                <div style={{ marginBottom: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h2 className="section-title" style={{ margin: 0 }}>Recent Errors (Last 10)</h2>
                  <CuiButton appearance="subtle" size="small">
                    <CuiIcon slot="start" url="https://api.iconify.design/fluent:text-align-left-24-regular.svg" />
                    View all in Logs
                  </CuiButton>
                </div>
                <table className="errors-table">
                  <thead>
                    <tr>
                      <th>Timestamp</th>
                      <th>Operation</th>
                      <th>Error Code</th>
                      <th>Message</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentErrors.map((err, i) => (
                      <tr key={i}>
                        <td style={{ whiteSpace: 'nowrap', fontFamily: 'var(--font-family-monospace)', fontSize: 'var(--font-size-base200)' }}>
                          {err.timestamp}
                        </td>
                        <td>{err.operation}</td>
                        <td>
                          <span className={`error-code-badge ${errorCodeClass(err.errorCode)}`}>
                            {err.errorCode}
                          </span>
                        </td>
                        <td style={{ maxWidth: 320 }}>{err.message}</td>
                        <td>
                          <a href="#" className="view-logs-link">View in Logs</a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CuiTabPanel>
          </CuiTabs>
        </div>
      </div>
    </>
  );
}
