import {
  CuiAppFrame,
  CuiAvatar,
  CuiBreadcrumb,
  CuiBreadcrumbItem,
  CuiButton,
  CuiCard,
  CuiCheckbox,
  CuiDivider,
  CuiDrawer,
  CuiHeader,
  CuiIcon,
  CuiNavHeading,
  CuiNavItem,
  CuiPersona,
  CuiPopOver,
  CuiSearchBox,
  CuiSideNav,
  CuiBadge,
} from '@charm-ux/cui/react';
import CopilotButton from './CopilotButton';

export default function APIsPage() {
  const styles = `
    body { margin: 0; }
    [slot='main'] {
      min-width: 320px;
      padding: 0;
      background: var(--neutral-background-2);
    }

    /* ─── Two-column layout: API list panel + main content ─── */
    .apis-layout {
      display: flex;
      height: 100%;
    }
    .apis-list-panel {
      width: 260px;
      min-width: 220px;
      border-right: 1px solid var(--neutral-stroke-2);
      background: var(--neutral-background-1);
      padding: 12px 16px;
      display: flex;
      flex-direction: column;
      gap: 8px;
      overflow-y: auto;
    }
    .apis-main-content {
      flex: 1;
      padding: 24px 32px;
      overflow-y: auto;
    }

    /* ─── Page header ─── */
    .apis-page-header {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 16px 32px 0;
    }
    .apis-resource-title {
      display: flex;
      align-items: center;
      gap: 8px;
      margin: 0;
      font-size: var(--font-size-base-500);
      font-weight: var(--font-weight-semibold);
      color: var(--neutral-foreground-1);
    }
    .apis-resource-subtitle {
      font-size: var(--font-size-base-200);
      color: var(--neutral-foreground-3);
      margin: 0 0 0 32px;
      padding-bottom: 8px;
    }
    .apis-header-links {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 0 32px 12px;
      font-size: var(--font-size-base-200);
    }

    /* ─── API list panel items ─── */
    .api-list-heading {
      font-size: var(--font-size-base-300);
      font-weight: var(--font-weight-semibold);
      color: var(--neutral-foreground-1);
      margin: 8px 0 4px;
    }
    .api-list-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 6px 8px;
      border-radius: var(--border-radius-md);
      font-size: var(--font-size-base-300);
      color: var(--neutral-foreground-1);
      cursor: pointer;
    }
    .api-list-item:hover {
      background: var(--subtle-background-hover);
    }

    /* ─── Card grid sections ─── */
    .api-section-title {
      font-size: var(--font-size-base-500);
      font-weight: var(--font-weight-semibold);
      color: var(--neutral-foreground-1);
      margin: 0 0 16px;
    }
    .api-card-grid {
      display: flex;
      gap: 16px;
      flex-wrap: wrap;
      margin-bottom: 32px;
    }
    .api-card {
      width: 200px;
      min-width: 180px;
      cursor: pointer;
      position: relative;
      --card-padding: 0;
      --card-content-gap: 0;
    }
    .api-card-icon-area {
      height: 120px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: var(--border-radius-md) var(--border-radius-md) 0 0;
      position: relative;
    }
    .api-card-icon-area svg,
    .api-card-icon-area img {
      width: 48px;
      height: 48px;
    }
    .api-card-icon-area .new-badge {
      position: absolute;
      top: 8px;
      right: 8px;
    }
    .api-card-body {
      padding: 12px;
    }
    .api-card-title {
      font-size: var(--font-size-base-300);
      font-weight: var(--font-weight-semibold);
      color: var(--neutral-foreground-1);
      margin: 0 0 4px;
    }
    .api-card-desc {
      font-size: var(--font-size-base-200);
      color: var(--neutral-foreground-3);
      margin: 0;
      line-height: 1.4;
    }

    /* Icon area color themes */
    .bg-teal { background: linear-gradient(135deg, #0e7a6e 0%, #14967a 100%); }
    .bg-purple { background: linear-gradient(135deg, #5c2d91 0%, #7b3fb5 100%); }
    .bg-blue { background: linear-gradient(135deg, #0063b1 0%, #007acc 100%); }
    .bg-pink { background: linear-gradient(135deg, #c4237b 0%, #e3308a 100%); }
    .bg-orange { background: linear-gradient(135deg, #ca5010 0%, #e06a23 100%); }
    .bg-darkblue { background: linear-gradient(135deg, #003f6e 0%, #005a9a 100%); }
  `;

  return (
    <>
      <CuiAppFrame skipToMainText="Skip to main content">
        {/* ─── Header ─── */}
        <CuiHeader slot="header" navigationIconLabel="toggle navigation">
          <CuiButton slot="title" appearance="transparent">
            <span className="font-base400">Microsoft Azure (Preview)</span>
          </CuiButton>
          <CuiSearchBox
            slot="search"
            hideLabel
            placeholder="Search resources, services, and docs (G+/)"
          />
          <CopilotButton slot="overflow-actions" />
          <CuiButton slot="overflow-actions" appearance="subtle" shape="rounded" size="large" iconOnly aria-label="Cloud Shell">
            <CuiIcon url="https://api.iconify.design/fluent:terminal-24-regular.svg" />
          </CuiButton>
          <CuiButton slot="overflow-actions" appearance="subtle" shape="rounded" size="large" iconOnly aria-label="Notifications">
            <CuiIcon name="alert" />
          </CuiButton>
          <CuiButton slot="overflow-actions" appearance="subtle" shape="rounded" size="large" iconOnly aria-label="Settings">
            <CuiIcon url="https://api.iconify.design/fluent:settings-24-regular.svg" />
          </CuiButton>
          <CuiButton slot="overflow-actions" appearance="subtle" shape="rounded" size="large" iconOnly aria-label="Help + support">
            <CuiIcon url="https://api.iconify.design/fluent:question-circle-24-regular.svg" />
          </CuiButton>
          <CuiButton slot="overflow-actions" appearance="subtle" shape="rounded" size="large" iconOnly aria-label="Feedback">
            <CuiIcon name="person-feedback" />
          </CuiButton>
          <CuiPopOver slot="actions-end" fixedPlacement>
            <CuiButton slot="anchor" appearance="subtle" shape="rounded" size="large" iconOnly>
              <CuiAvatar size={24} name="Alex Britez" />
            </CuiButton>
            <CuiPersona>
              <CuiAvatar name="Alex Britez" />
              <div slot="primary">alexbritez@microsoft.co...</div>
              <div slot="secondary">MICROSOFT (MICROSOFT.ONM...)</div>
            </CuiPersona>
            <CuiDivider className="my-xl" />
            <div className="d-flex flex-column align-start">
              <CuiButton appearance="link">Your profile</CuiButton>
              <CuiButton appearance="link">View account</CuiButton>
              <CuiButton appearance="link">Sign Out</CuiButton>
            </div>
          </CuiPopOver>
        </CuiHeader>

        {/* ─── Side Navigation ─── */}
        <CuiDrawer
          slot="navigation"
          id="navigation-drawer"
          inline
          position="start"
          breakpoint="686px"
          open
        >
          <CuiSideNav size="small">
            <CuiNavItem label="Overview" href="#">
              <CuiIcon
                slot="icon"
                url="https://api.iconify.design/fluent:home-24-regular.svg"
                selectedUrl="https://api.iconify.design/fluent:home-24-filled.svg"
              />
            </CuiNavItem>
            <CuiNavItem label="Activity log" href="#">
              <CuiIcon
                slot="icon"
                url="https://api.iconify.design/fluent:document-24-regular.svg"
                selectedUrl="https://api.iconify.design/fluent:document-24-filled.svg"
              />
            </CuiNavItem>
            <CuiNavItem label="Access control (IAM)" href="#">
              <CuiIcon
                slot="icon"
                url="https://api.iconify.design/fluent:person-24-regular.svg"
                selectedUrl="https://api.iconify.design/fluent:person-24-filled.svg"
              />
            </CuiNavItem>
            <CuiNavItem label="Tags" href="#">
              <CuiIcon
                slot="icon"
                url="https://api.iconify.design/fluent:tag-24-regular.svg"
                selectedUrl="https://api.iconify.design/fluent:tag-24-filled.svg"
              />
            </CuiNavItem>
            <CuiNavItem label="Diagnose and solve problems" href="#">
              <CuiIcon
                slot="icon"
                url="https://api.iconify.design/fluent:stethoscope-24-regular.svg"
                selectedUrl="https://api.iconify.design/fluent:stethoscope-24-filled.svg"
              />
            </CuiNavItem>
            <CuiNavItem label="Resource visualizer" href="#">
              <CuiIcon
                slot="icon"
                url="https://api.iconify.design/fluent:diagram-24-regular.svg"
                selectedUrl="https://api.iconify.design/fluent:diagram-24-filled.svg"
              />
            </CuiNavItem>
            <CuiNavItem label="Events" href="#">
              <CuiIcon
                slot="icon"
                url="https://api.iconify.design/fluent:flash-24-regular.svg"
                selectedUrl="https://api.iconify.design/fluent:flash-24-filled.svg"
              />
            </CuiNavItem>

            <CuiNavHeading>APIs</CuiNavHeading>
            <CuiNavItem label="Workspaces" href="#">
              <CuiIcon
                slot="icon"
                url="https://api.iconify.design/fluent:folder-24-regular.svg"
                selectedUrl="https://api.iconify.design/fluent:folder-24-filled.svg"
              />
            </CuiNavItem>
            <CuiNavItem label="APIs" href="#" selected>
              <CuiIcon
                slot="icon"
                url="https://api.iconify.design/fluent:plug-connected-24-regular.svg"
                selectedUrl="https://api.iconify.design/fluent:plug-connected-24-filled.svg"
              />
            </CuiNavItem>
            <CuiNavItem label="MCP Servers" href="#">
              <CuiIcon
                slot="icon"
                url="https://api.iconify.design/fluent:server-24-regular.svg"
                selectedUrl="https://api.iconify.design/fluent:server-24-filled.svg"
              />
            </CuiNavItem>
            <CuiNavItem label="Products" href="#">
              <CuiIcon
                slot="icon"
                url="https://api.iconify.design/fluent:box-24-regular.svg"
                selectedUrl="https://api.iconify.design/fluent:box-24-filled.svg"
              />
            </CuiNavItem>
            <CuiNavItem label="Subscriptions" href="#">
              <CuiIcon
                slot="icon"
                url="https://api.iconify.design/fluent:key-24-regular.svg"
                selectedUrl="https://api.iconify.design/fluent:key-24-filled.svg"
              />
            </CuiNavItem>
            <CuiNavItem label="Named values" href="#">
              <CuiIcon
                slot="icon"
                url="https://api.iconify.design/fluent:grid-24-regular.svg"
                selectedUrl="https://api.iconify.design/fluent:grid-24-filled.svg"
              />
            </CuiNavItem>
            <CuiNavItem label="Backends" href="#">
              <CuiIcon
                slot="icon"
                url="https://api.iconify.design/fluent:cloud-24-regular.svg"
                selectedUrl="https://api.iconify.design/fluent:cloud-24-filled.svg"
              />
            </CuiNavItem>
            <CuiNavItem label="Policy fragments" href="#">
              <CuiIcon
                slot="icon"
                url="https://api.iconify.design/fluent:puzzle-piece-24-regular.svg"
                selectedUrl="https://api.iconify.design/fluent:puzzle-piece-24-filled.svg"
              />
            </CuiNavItem>
            <CuiNavItem label="API Tags" href="#">
              <CuiIcon
                slot="icon"
                url="https://api.iconify.design/fluent:tag-24-regular.svg"
                selectedUrl="https://api.iconify.design/fluent:tag-24-filled.svg"
              />
            </CuiNavItem>
            <CuiNavItem label="Schemas" href="#">
              <CuiIcon
                slot="icon"
                url="https://api.iconify.design/fluent:database-24-regular.svg"
                selectedUrl="https://api.iconify.design/fluent:database-24-filled.svg"
              />
            </CuiNavItem>
            <CuiNavItem label="Credential manager" href="#">
              <CuiIcon
                slot="icon"
                url="https://api.iconify.design/fluent:shield-24-regular.svg"
                selectedUrl="https://api.iconify.design/fluent:shield-24-filled.svg"
              />
            </CuiNavItem>
            <CuiNavItem label="API Center" href="#">
              <CuiIcon
                slot="icon"
                url="https://api.iconify.design/fluent:center-horizontal-24-regular.svg"
                selectedUrl="https://api.iconify.design/fluent:center-horizontal-24-filled.svg"
              />
            </CuiNavItem>
            <CuiNavItem label="Power Platform" href="#">
              <CuiIcon
                slot="icon"
                url="https://api.iconify.design/fluent:power-24-regular.svg"
                selectedUrl="https://api.iconify.design/fluent:power-24-filled.svg"
              />
            </CuiNavItem>

            <CuiDivider />
            <CuiNavItem label="Developer portal" href="#">
              <CuiIcon
                slot="icon"
                url="https://api.iconify.design/fluent:globe-24-regular.svg"
                selectedUrl="https://api.iconify.design/fluent:globe-24-filled.svg"
              />
            </CuiNavItem>
          </CuiSideNav>
        </CuiDrawer>

        {/* ─── Main Content ─── */}
        <div slot="main">
          {/* Breadcrumb */}
          <div style={{ padding: '8px 32px 0' }}>
            <CuiBreadcrumb label="Navigation" size="small">
              <CuiBreadcrumbItem href="#">Home</CuiBreadcrumbItem>
              <CuiBreadcrumbItem href="#">alexbritezFeb6</CuiBreadcrumbItem>
            </CuiBreadcrumb>
          </div>

          {/* Page title row */}
          <div className="apis-page-header">
            <h1 className="apis-resource-title">
              alexbritezFeb6 | APIs
            </h1>
            <CuiButton appearance="subtle" iconOnly size="small">
              <CuiIcon name="star" />
            </CuiButton>
            <CuiButton appearance="subtle" iconOnly size="small">
              <CuiIcon name="more-horizontal" />
            </CuiButton>
          </div>
          <p className="apis-resource-subtitle">API Management service</p>

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
              <CuiSearchBox
                hideLabel
                placeholder="Search APIs"
                size="small"
              />
              <CuiSearchBox
                hideLabel
                placeholder="Filter by tags"
                size="small"
              />
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
                    <p className="api-card-desc">
                      Manually define an HTTP API
                    </p>
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
                    <p className="api-card-desc">
                      Import an OpenAPI specification.
                    </p>
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
                    <p className="api-card-desc">
                      Import a WSDL specification.
                    </p>
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
                    <p className="api-card-desc">
                      Import a WADL specification.
                    </p>
                  </div>
                </CuiCard>
              </div>
            </div>
          </div>
        </div>
      </CuiAppFrame>
      <style>{styles}</style>
    </>
  );
}
