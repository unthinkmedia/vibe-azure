import {
  CuiBadge,
  CuiButton,
  CuiCard,
  CuiDivider,
  CuiIcon,
  CuiToolbar,
} from '@charm-ux/cui/react';
import {
  foundryConnections,
  readinessScore,
  readinessMax,
  readinessCategories,
} from './data';
import {
  getScoreColor,
  getBadgeColor,
  getStatusLabel,
} from '../readiness-card-variants/data';

const overallColor = getScoreColor(readinessScore, readinessMax);
const overallBadge = getBadgeColor(readinessScore, readinessMax);
const overallStatus = getStatusLabel(readinessScore, readinessMax);

export default function PageContent() {
  return (
    <>
      {/* Toolbar */}
      <div style={{ padding: '0 32px' }}>
        <CuiToolbar size="small" label="AI Hub actions">
          <CuiButton appearance="subtle" size="small">Refresh</CuiButton>
          <CuiButton appearance="subtle" size="small">Feedback</CuiButton>
        </CuiToolbar>
      </div>

      <CuiDivider style={{ margin: '0' }} />

      {/* ─── AI Hub Content ─── */}
      <div className="aihub-content">

        {/* ── Top row: Readiness + Foundry Connections ── */}
        <div className="aihub-top-row">
          {/* AI Readiness Score — Donut Gauge */}
          <CuiCard appearance="outline" className="readiness-card" heading="AI Readiness Score">
            <div className="v1-body">
              <div className="v1-donut-wrap">
                <svg width="100" height="100" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r={40} fill="none" stroke="var(--neutral-background5)" strokeWidth="8" />
                  <circle
                    cx="50" cy="50" r={40}
                    fill="none"
                    stroke={overallColor}
                    strokeWidth="8"
                    strokeDasharray={2 * Math.PI * 40}
                    strokeDashoffset={2 * Math.PI * 40 - ((readinessScore / readinessMax) * 2 * Math.PI * 40)}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="v1-donut-center">
                  <span className="v1-donut-value" style={{ color: overallColor }}>{readinessScore}</span>
                  <span className="v1-donut-max">/ {readinessMax}</span>
                </div>
              </div>
              <div className="v1-cats">
                {readinessCategories.map((cat) => {
                  const c = getScoreColor(cat.score, cat.maxScore);
                  return (
                    <div key={cat.label} className="v1-cat-row">
                      <span className="v1-cat-dot" style={{ background: c }} />
                      <span className="v1-cat-label">{cat.label}</span>
                      <span className="v1-cat-score" style={{ color: c }}>
                        {cat.score}/{cat.maxScore}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
            <div slot="footer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <CuiBadge appearance="tint" color={overallBadge} size="small">{overallStatus}</CuiBadge>
              <CuiButton appearance="subtle" size="small">
                <CuiIcon slot="start" name="open" />
                View Recommendations
              </CuiButton>
            </div>
          </CuiCard>

          {/* Get Started with AI */}
          <CuiCard appearance="outline" heading="Get Started with AI">
            <p style={{ margin: '0 0 12px', fontSize: 'var(--font-size-base200)', color: 'var(--neutral-foreground3)' }}>
              No AI Foundry project connected. Easy Agent provisions Foundry resources
              and connects them to your app in one click.
            </p>
            <div slot="footer">
              <CuiButton appearance="primary" size="small">
                <CuiIcon slot="start" url="https://api.iconify.design/fluent:plug-connected-24-regular.svg" />
                Connect to AI Foundry
              </CuiButton>
            </div>
          </CuiCard>
        </div>

        {/* ── Foundry Connections Card ── */}
        <CuiCard appearance="outline" className="connections-card">
          <div className="connections-header">
            <h2 className="connections-title">
              <CuiIcon url="https://api.iconify.design/fluent:brain-circuit-24-regular.svg" style={{ fontSize: '20px' }} />
              Connected AI Foundry Resources
            </h2>
            <div className="connections-actions">
              <CuiButton appearance="primary" size="small">
                <CuiIcon slot="start" name="add" />
                Add connection
              </CuiButton>
              <CuiButton appearance="subtle" size="small">
                <CuiIcon slot="start" url="https://api.iconify.design/fluent:open-24-regular.svg" />
                View in AI Foundry
              </CuiButton>
            </div>
          </div>
          <div className="connection-list">
            {foundryConnections.map((conn) => (
              <div key={conn.id} className="connection-item">
                <div className="connection-details">
                  <a className="connection-project" href="#">{conn.projectName}</a>
                  <div className="connection-meta">
                    <span className="connection-meta-item">
                      <span className="connection-meta-label">Endpoint:</span>
                      <span className="connection-meta-value">{conn.endpoint}</span>
                    </span>
                    <span className="connection-meta-item">
                      <span className="connection-meta-label">Model:</span>
                      <CuiBadge appearance="outline" size="small">{conn.model}</CuiBadge>
                    </span>
                    <span className="connection-meta-item">
                      <span className="connection-meta-label">Region:</span>
                      <span className="connection-meta-value">{conn.region}</span>
                    </span>
                  </div>
                </div>
                <div className="connection-item-actions">
                  <CuiBadge
                    appearance="filled"
                    color={conn.status === 'Connected' ? 'success' : conn.status === 'Error' ? 'danger' : 'warning'}
                    size="small"
                  >
                    {conn.status}
                  </CuiBadge>
                  <CuiButton appearance="subtle" size="small" iconOnly aria-label={`Edit ${conn.projectName}`}>
                    <CuiIcon name="edit" />
                  </CuiButton>
                  <CuiButton appearance="subtle" size="small" iconOnly aria-label={`More options for ${conn.projectName}`}>
                    <CuiIcon name="more-horizontal" />
                  </CuiButton>
                </div>
              </div>
            ))}
          </div>
          <div className="connections-footer">
            <span style={{ fontSize: 'var(--font-size-base200)', color: 'var(--neutral-foreground3)' }}>
              {foundryConnections.length} connection{foundryConnections.length !== 1 ? 's' : ''}
            </span>
            <CuiButton appearance="link" size="small" href="#">
              Manage all connections
            </CuiButton>
          </div>
        </CuiCard>

        {/* ── Features ── */}
        <h2 className="section-heading">Features</h2>
        <div className="features-row">
          {/* Easy Agent */}
          <CuiCard appearance="outline" className="feature-card" heading="Easy Agent">
            <p className="feature-card-desc">Deploy AI-powered chat interface</p>
            <div className="feature-status">
              <span className="feature-status-dot" />
              Status: Not configured
            </div>
            <p className="feature-hint">Connect to AI Foundry first to enable this feature.</p>
            <div slot="footer">
              <CuiButton appearance="subtle" size="small">
                <CuiIcon slot="start" name="settings" />
                Set Up Easy Agent
              </CuiButton>
            </div>
          </CuiCard>

          {/* Easy MCP */}
          <CuiCard appearance="outline" className="feature-card" heading="Easy MCP">
            <p className="feature-card-desc">Expose your API to AI agents</p>
            <div className="feature-status">
              <span className="feature-status-dot" />
              Status: Not configured
            </div>
            <p className="feature-hint">Detected specs: (none detected)</p>
            <div slot="footer">
              <CuiButton appearance="link" size="small" href="#">Learn More</CuiButton>
            </div>
          </CuiCard>
        </div>

        {/* ── Diagnostics & Tools ── */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h2 className="section-heading">Diagnostics &amp; Tools</h2>
          <CuiBadge appearance="outline" size="small">limited</CuiBadge>
        </div>
        <div className="diagnostics-row">
          <CuiCard appearance="outline" className="diagnostics-card">
            <div className="diagnostics-card-title">
              <CuiIcon url="https://api.iconify.design/fluent:terminal-24-regular.svg" style={{ fontSize: '16px' }} />
              SSH Terminal
            </div>
            <div slot="footer">
              <CuiButton appearance="subtle" size="small">
                <CuiIcon slot="start" name="open" />
                Open SSH
              </CuiButton>
            </div>
          </CuiCard>

          <CuiCard appearance="outline" className="diagnostics-card">
            <div className="diagnostics-card-title">
              <span className="feature-status-dot" style={{ display: 'inline-block', width: 8, height: 8, marginRight: 2 }} />
              AI Connection Test
            </div>
            <div slot="footer">
              <CuiButton appearance="subtle" size="small">
                <CuiIcon slot="start" name="open" />
                Run Test
              </CuiButton>
            </div>
          </CuiCard>

          <div className="diagnostics-hint">
            More diagnostic tools become available after connecting to AI Foundry.
          </div>
        </div>
      </div>
    </>
  );
}
