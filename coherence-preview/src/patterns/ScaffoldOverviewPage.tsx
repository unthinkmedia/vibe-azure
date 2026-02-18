/**
 * Azure Overview Page Scaffold
 *
 * Resource overview with essentials panel (key-value pairs) and card grid
 * sections. Common landing page for any Azure resource.
 *
 * Usage: cp this file to coherence-preview/src/MyOverviewPage.tsx and edit.
 */
import {
  CuiAppFrame,
  CuiAvatar,
  CuiBreadcrumb,
  CuiBreadcrumbItem,
  CuiButton,
  CuiCard,
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
  CuiToolbar,
} from '@charm-ux/cui/react';
import CopilotButton from '../experiments/copilot-button';

export default function AzureOverviewPage() {
  // TODO: Replace with your resource details
  const resourceName = 'myStorageAccount';
  const resourceType = 'Storage account';

  const styles = `
    body { margin: 0; }
    [slot='main'] {
      min-width: 320px;
      padding: 0;
      background: var(--neutral-background-2);
    }
    .page-header {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 16px 32px 0;
    }
    .resource-title {
      display: flex;
      align-items: center;
      gap: 8px;
      margin: 0;
      font-size: var(--font-size-base-500);
      font-weight: var(--font-weight-semibold);
      color: var(--neutral-foreground-1);
    }
    .resource-subtitle {
      font-size: var(--font-size-base-200);
      color: var(--neutral-foreground-3);
      margin: 0 0 0 32px;
      padding-bottom: 12px;
    }
    .content-area {
      padding: 24px 32px;
    }

    /* Essentials panel */
    .essentials {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 0;
      margin-bottom: 24px;
      padding: 16px 20px;
      background: var(--neutral-background-1);
      border: 1px solid var(--neutral-stroke-2);
      border-radius: var(--border-radius-md);
    }
    .essentials-row {
      display: flex;
      padding: 6px 0;
      font-size: var(--font-size-base-300);
      line-height: var(--line-height-base-300);
    }
    .essentials-label {
      color: var(--neutral-foreground-3);
      min-width: 160px;
      flex-shrink: 0;
    }
    .essentials-value {
      color: var(--neutral-foreground-1);
    }
    .essentials-value a {
      color: var(--brand-foreground-link);
      text-decoration: none;
    }

    /* Card sections */
    .section-title {
      font-size: var(--font-size-base-400);
      font-weight: var(--font-weight-semibold);
      color: var(--neutral-foreground-1);
      margin: 0 0 12px;
    }
    .card-row {
      display: flex;
      gap: 16px;
      flex-wrap: wrap;
      margin-bottom: 24px;
    }
    .overview-card {
      flex: 1 1 280px;
      min-width: 260px;
      max-width: 400px;
    }
  `;

  return (
    <>
      <CuiAppFrame skipToMainText="Skip to main content">
        {/* ─── Header ─── */}
        <CuiHeader slot="header" navigationIconLabel="toggle navigation">
          <CuiButton slot="title" appearance="transparent">
            <span className="font-base400">Microsoft Azure</span>
          </CuiButton>
          <CuiSearchBox
            slot="search"
            hideLabel
            placeholder="Search resources, services, and docs (G+/)"
          />
          <CopilotButton slot="search" />
          <CuiButton slot="overflow-actions" appearance="subtle" shape="rounded" size="large" iconOnly aria-label="Cloud Shell">
            <CuiIcon url="https://api.iconify.design/fluent:terminal-24-regular.svg" />
          </CuiButton>
          <CuiButton slot="overflow-actions" appearance="subtle" shape="rounded" size="large" iconOnly aria-label="Notifications">
            <CuiIcon name="alert" />
          </CuiButton>
          <CuiButton slot="overflow-actions" appearance="subtle" shape="rounded" size="large" iconOnly aria-label="Settings">
            <CuiIcon name="settings" />
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
              <div slot="primary">Alex Britez</div>
              <div slot="secondary">Available</div>
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
        {/* TODO: Customize nav items for your resource type */}
        <CuiDrawer
          slot="navigation"
          id="navigation-drawer"
          inline
          position="start"
          breakpoint="686px"
          open
        >
          <CuiSideNav size="small">
            <CuiNavItem label="Overview" href="#" selected>
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

            <CuiNavHeading>Settings</CuiNavHeading>
            <CuiNavItem label="Configuration" href="#">
              <CuiIcon
                slot="icon"
                url="https://api.iconify.design/fluent:settings-24-regular.svg"
                selectedUrl="https://api.iconify.design/fluent:settings-24-filled.svg"
              />
            </CuiNavItem>
            <CuiNavItem label="Networking" href="#">
              <CuiIcon
                slot="icon"
                url="https://api.iconify.design/fluent:globe-24-regular.svg"
                selectedUrl="https://api.iconify.design/fluent:globe-24-filled.svg"
              />
            </CuiNavItem>
            <CuiNavItem label="Properties" href="#">
              <CuiIcon
                slot="icon"
                url="https://api.iconify.design/fluent:info-24-regular.svg"
                selectedUrl="https://api.iconify.design/fluent:info-24-filled.svg"
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
              <CuiBreadcrumbItem active current="page">{resourceName}</CuiBreadcrumbItem>
            </CuiBreadcrumb>
          </div>

          {/* Page title row */}
          <div className="page-header">
            <CuiIcon
              url="https://api.iconify.design/fluent:app-generic-24-regular.svg"
              style={{ fontSize: '24px' }}
            />
            <h1 className="resource-title">{resourceName}</h1>
            <CuiButton appearance="subtle" iconOnly size="small">
              <CuiIcon name="star" />
            </CuiButton>
          </div>
          <p className="resource-subtitle">{resourceType}</p>

          {/* Toolbar */}
          <div style={{ padding: '0 32px' }}>
            <CuiToolbar size="small" label="Resource actions">
              <CuiButton appearance="subtle" size="small">
                <CuiIcon slot="start" name="add" />
                Create
              </CuiButton>
              <CuiDivider orientation="vertical" style={{ height: '20px' }} />
              <CuiButton appearance="subtle" size="small">Refresh</CuiButton>
              <CuiButton appearance="subtle" size="small">
                <CuiIcon
                  slot="start"
                  name="delete"
                />
                Delete
              </CuiButton>
            </CuiToolbar>
          </div>

          <CuiDivider style={{ margin: '0' }} />

          {/* ─── Overview Content ─── */}
          <div className="content-area">
            {/* Essentials Panel */}
            {/* TODO: Replace with your resource's key properties */}
            <div className="essentials">
              <div className="essentials-row">
                <span className="essentials-label">Resource group</span>
                <span className="essentials-value"><a href="#">rg-production</a></span>
              </div>
              <div className="essentials-row">
                <span className="essentials-label">Status</span>
                <span className="essentials-value">Available</span>
              </div>
              <div className="essentials-row">
                <span className="essentials-label">Location</span>
                <span className="essentials-value">East US</span>
              </div>
              <div className="essentials-row">
                <span className="essentials-label">Subscription</span>
                <span className="essentials-value"><a href="#">Azure subscription 1</a></span>
              </div>
              <div className="essentials-row">
                <span className="essentials-label">Subscription ID</span>
                <span className="essentials-value">a1b2c3d4-e5f6-7890-abcd-ef1234567890</span>
              </div>
              <div className="essentials-row">
                <span className="essentials-label">Tags</span>
                <span className="essentials-value"><a href="#">Click here to add tags</a></span>
              </div>
            </div>

            {/* Card sections */}
            {/* TODO: Add overview cards relevant to your resource */}
            <h2 className="section-title">Get started</h2>
            <div className="card-row">
              <CuiCard appearance="outline" className="overview-card">
                <div slot="heading">Quick start</div>
                <p style={{ margin: '0 0 8px', color: 'var(--neutral-foreground-2)' }}>
                  Get started with step-by-step instructions.
                </p>
                <CuiButton appearance="link">Learn more</CuiButton>
              </CuiCard>

              <CuiCard appearance="outline" className="overview-card">
                <div slot="heading">Monitoring</div>
                <p style={{ margin: '0 0 8px', color: 'var(--neutral-foreground-2)' }}>
                  View metrics and logs for this resource.
                </p>
                <CuiButton appearance="link">View metrics</CuiButton>
              </CuiCard>

              <CuiCard appearance="outline" className="overview-card">
                <div slot="heading">Documentation</div>
                <p style={{ margin: '0 0 8px', color: 'var(--neutral-foreground-2)' }}>
                  Read the documentation for this resource type.
                </p>
                <CuiButton appearance="link">Open docs</CuiButton>
              </CuiCard>
            </div>
          </div>
        </div>
      </CuiAppFrame>
      <style>{styles}</style>
    </>
  );
}
