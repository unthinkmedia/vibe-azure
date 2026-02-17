import React from 'react';
import {
  CuiBadge,
  CuiButton,
  CuiCard,
  CuiCheckbox,
  CuiDivider,
  CuiIcon,
  CuiSearchBox,
} from '@charm-ux/cui/react';

export default function PageContent() {
  return (
    <>
      {/* Header links */}
      <div className="apis-header-links">
        <CuiButton appearance="link" size="small" href="#">
          <CuiIcon
            slot="start"
            url="https://api.iconify.design/fluent:open-24-regular.svg"
            style={{ fontSize: '14px' }}
          />
          Developer portal
        </CuiButton>
        <CuiButton appearance="link" size="small" href="#">
          Send us your feedback
        </CuiButton>
      </div>

      <CuiDivider style={{ margin: 0 }} />

      {/* Two-column layout */}
      <div className="apis-layout">
        {/* ─── API List Panel (left) ─── */}
        <div className="apis-list-panel">
          <CuiSearchBox hideLabel placeholder="Search APIs" size="small" />
          <CuiSearchBox hideLabel placeholder="Filter by tags" size="small" />
          <CuiCheckbox>
            <span style={{ fontSize: 'var(--font-size-base-200)' }}>Group by tag</span>
          </CuiCheckbox>

          <CuiButton appearance="subtle" size="small">
            <CuiIcon slot="start" name="add" />
            Add API
          </CuiButton>

          <CuiDivider />

          <div className="api-list-heading">All APIs</div>

          <div className="api-list-item">
            <span>TestAPI1</span>
            <CuiButton appearance="transparent" iconOnly size="small">
              <CuiIcon name="more-horizontal" />
            </CuiButton>
          </div>
          <div className="api-list-item">
            <span>TestAPI2</span>
            <CuiButton appearance="transparent" iconOnly size="small">
              <CuiIcon name="more-horizontal" />
            </CuiButton>
          </div>
        </div>

        {/* ─── Main Card Content (right) ─── */}
        <div className="apis-main-content">
          {/* Create an AI API */}
          <h2 className="api-section-title">Create an AI API</h2>
          <div className="api-card-grid">
            {/* A2A Agent (preview) */}
            <CuiCard appearance="outline" className="api-card">
              <div className="api-card-icon-area bg-teal">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <circle cx="24" cy="24" r="16" stroke="white" strokeWidth="2" fill="none" />
                  <circle cx="24" cy="14" r="3" fill="white" />
                  <circle cx="14" cy="30" r="3" fill="white" />
                  <circle cx="34" cy="30" r="3" fill="white" />
                  <line x1="24" y1="17" x2="14" y2="27" stroke="white" strokeWidth="1.5" />
                  <line x1="24" y1="17" x2="34" y2="27" stroke="white" strokeWidth="1.5" />
                  <line x1="14" y1="30" x2="34" y2="30" stroke="white" strokeWidth="1.5" />
                </svg>
                <CuiBadge
                  className="new-badge"
                  shape="rounded"
                  appearance="tint"
                  color="danger"
                  style={{ '--badge-border-radius': '4px' } as React.CSSProperties}
                >
                  New
                </CuiBadge>
              </div>
              <div className="api-card-body">
                <p className="api-card-title">A2A Agent (preview)</p>
                <p className="api-card-desc">
                  Create an API for an agent compatible with the A2A (Agent2Agent) protocol.
                </p>
              </div>
            </CuiCard>

            {/* Language Model API */}
            <CuiCard appearance="outline" className="api-card">
              <div className="api-card-icon-area bg-teal">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <path
                    d="M24 8C15.2 8 8 15.2 8 24s7.2 16 16 16c2.6 0 5-.6 7.2-1.7L40 42l-3.7-8.8c1.1-2.2 1.7-4.6 1.7-7.2 0-8.8-7.2-16-16-16z"
                    stroke="white"
                    strokeWidth="2"
                    fill="none"
                  />
                  <circle cx="17" cy="24" r="2" fill="white" />
                  <circle cx="24" cy="24" r="2" fill="white" />
                  <circle cx="31" cy="24" r="2" fill="white" />
                </svg>
                <CuiBadge
                  className="new-badge"
                  shape="rounded"
                  appearance="tint"
                  color="danger"
                  style={{ '--badge-border-radius': '4px' } as React.CSSProperties}
                >
                  New
                </CuiBadge>
              </div>
              <div className="api-card-body">
                <p className="api-card-title">Language Model API</p>
                <p className="api-card-desc">
                  Create an API for an OpenAI API-compatible model.
                </p>
              </div>
            </CuiCard>

            {/* Microsoft Foundry */}
            <CuiCard appearance="outline" className="api-card">
              <div className="api-card-icon-area bg-purple">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <path d="M14 34V14h10l10 10v10H14z" stroke="white" strokeWidth="2" fill="none" />
                  <path d="M24 14v10h10" stroke="white" strokeWidth="2" fill="none" />
                </svg>
                <CuiBadge
                  className="new-badge"
                  shape="rounded"
                  appearance="tint"
                  color="danger"
                  style={{ '--badge-border-radius': '4px' } as React.CSSProperties}
                >
                  New
                </CuiBadge>
              </div>
              <div className="api-card-body">
                <p className="api-card-title">Microsoft Foundry</p>
                <p className="api-card-desc">
                  Connect API Management services to Microsoft Foundry.
                </p>
              </div>
            </CuiCard>
          </div>

          {/* Define a new API */}
          <h2 className="api-section-title">Define a new API</h2>
          <div className="api-card-grid">
            {/* HTTP */}
            <CuiCard appearance="outline" className="api-card">
              <div className="api-card-icon-area bg-blue">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <line x1="24" y1="12" x2="24" y2="36" stroke="white" strokeWidth="3" />
                  <line x1="12" y1="24" x2="36" y2="24" stroke="white" strokeWidth="3" />
                </svg>
              </div>
              <div className="api-card-body">
                <p className="api-card-title">HTTP</p>
                <p className="api-card-desc">Manually define an HTTP API</p>
              </div>
            </CuiCard>

            {/* WebSocket */}
            <CuiCard appearance="outline" className="api-card">
              <div className="api-card-icon-area bg-teal">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <path d="M14 24h20" stroke="white" strokeWidth="2" />
                  <path d="M28 18l6 6-6 6" stroke="white" strokeWidth="2" fill="none" />
                  <path d="M20 18l-6 6 6 6" stroke="white" strokeWidth="2" fill="none" />
                </svg>
              </div>
              <div className="api-card-body">
                <p className="api-card-title">WebSocket</p>
                <p className="api-card-desc">
                  Streaming, full-duplex communication with a WebSocket server
                </p>
              </div>
            </CuiCard>

            {/* GraphQL */}
            <CuiCard appearance="outline" className="api-card">
              <div className="api-card-icon-area bg-pink">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <polygon
                    points="24,10 38,18 38,34 24,42 10,34 10,18"
                    stroke="white"
                    strokeWidth="2"
                    fill="none"
                  />
                  <circle cx="24" cy="10" r="3" fill="white" />
                  <circle cx="38" cy="18" r="3" fill="white" />
                  <circle cx="38" cy="34" r="3" fill="white" />
                  <circle cx="24" cy="42" r="3" fill="white" />
                  <circle cx="10" cy="34" r="3" fill="white" />
                  <circle cx="10" cy="18" r="3" fill="white" />
                </svg>
              </div>
              <div className="api-card-body">
                <p className="api-card-title">GraphQL</p>
                <p className="api-card-desc">
                  Access the full capabilities of your data from a single endpoint.
                </p>
              </div>
            </CuiCard>
          </div>

          {/* Create from definition */}
          <h2 className="api-section-title">Create from definition</h2>
          <div className="api-card-grid">
            {/* OpenAPI */}
            <CuiCard appearance="outline" className="api-card">
              <div className="api-card-icon-area bg-darkblue">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <rect x="12" y="14" width="24" height="20" rx="2" stroke="white" strokeWidth="2" fill="none" />
                  <line x1="18" y1="20" x2="30" y2="20" stroke="white" strokeWidth="1.5" />
                  <line x1="18" y1="24" x2="30" y2="24" stroke="white" strokeWidth="1.5" />
                  <line x1="18" y1="28" x2="26" y2="28" stroke="white" strokeWidth="1.5" />
                </svg>
              </div>
              <div className="api-card-body">
                <p className="api-card-title">OpenAPI</p>
                <p className="api-card-desc">Import an OpenAPI specification.</p>
              </div>
            </CuiCard>

            {/* WSDL */}
            <CuiCard appearance="outline" className="api-card">
              <div className="api-card-icon-area bg-orange">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <rect x="12" y="14" width="24" height="20" rx="2" stroke="white" strokeWidth="2" fill="none" />
                  <text x="24" y="29" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">XML</text>
                </svg>
              </div>
              <div className="api-card-body">
                <p className="api-card-title">WSDL</p>
                <p className="api-card-desc">Import a WSDL specification.</p>
              </div>
            </CuiCard>

            {/* WADL */}
            <CuiCard appearance="outline" className="api-card">
              <div className="api-card-icon-area bg-blue">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <path d="M16 18l-6 6 6 6" stroke="white" strokeWidth="2" fill="none" />
                  <path d="M32 18l6 6-6 6" stroke="white" strokeWidth="2" fill="none" />
                  <line x1="22" y1="14" x2="26" y2="34" stroke="white" strokeWidth="2" />
                </svg>
              </div>
              <div className="api-card-body">
                <p className="api-card-title">WADL</p>
                <p className="api-card-desc">Import a WADL specification.</p>
              </div>
            </CuiCard>
          </div>
        </div>
      </div>
    </>
  );
}
