/**
 * Azure List Page Scaffold
 *
 * Two-column layout: scrollable list panel (left) + detail/card content (right).
 * Common pattern for API lists, resource lists, service catalogs.
 *
 * Usage: cp this file to coherence-preview/src/MyListPage.tsx and edit.
 */
import {
  CuiAppFrame,
  CuiAvatar,
  CuiBreadcrumb,
  CuiBreadcrumbItem,
  CuiButton,
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
} from '@charm-ux/cui/react';

export default function AzureListPage() {
  // TODO: Replace with your resource and page details
  const resourceName = 'myResource';
  const pageTitle = 'Items';
  const resourceType = 'Service type';

  const styles = `
    body { margin: 0; }
    [slot='main'] {
      min-width: 320px;
      padding: 0;
      background: var(--neutral-background-2);
    }

    /* Two-column layout */
    .list-layout {
      display: flex;
      height: 100%;
    }
    .list-panel {
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
    .main-content {
      flex: 1;
      padding: 24px 32px;
      overflow-y: auto;
    }

    /* Page header */
    .page-header {
      display: flex;
      align-items: center;
      gap: 8px;
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
      padding-bottom: 8px;
    }

    /* List panel items */
    .list-heading {
      font-size: var(--font-size-base-300);
      font-weight: var(--font-weight-semibold);
      color: var(--neutral-foreground-1);
      margin: 8px 0 4px;
    }
    .list-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 6px 8px;
      border-radius: var(--border-radius-md);
      font-size: var(--font-size-base-300);
      color: var(--neutral-foreground-1);
      cursor: pointer;
    }
    .list-item:hover {
      background: var(--subtle-background-hover);
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
          <CuiButton slot="overflow-actions" appearance="subtle" shape="rounded" size="large" iconOnly aria-label="Copilot">
            <CuiIcon name="bot" />
          </CuiButton>
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
        {/* TODO: Customize nav items */}
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

            {/* TODO: Add resource-specific sections */}
            <CuiNavHeading>Resources</CuiNavHeading>
            <CuiNavItem label={pageTitle} href="#" selected>
              <CuiIcon
                slot="icon"
                url="https://api.iconify.design/fluent:list-24-regular.svg"
                selectedUrl="https://api.iconify.design/fluent:list-24-filled.svg"
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
              <CuiBreadcrumbItem href="#">{resourceName}</CuiBreadcrumbItem>
            </CuiBreadcrumb>
          </div>

          {/* Page title row */}
          <div className="page-header">
            <h1 className="resource-title">
              {resourceName} | {pageTitle}
            </h1>
            <CuiButton appearance="subtle" iconOnly size="small">
              <CuiIcon name="star" />
            </CuiButton>
            <CuiButton appearance="subtle" iconOnly size="small">
              <CuiIcon name="more-horizontal" />
            </CuiButton>
          </div>
          <p className="resource-subtitle">{resourceType}</p>

          <CuiDivider style={{ margin: 0 }} />

          {/* Two-column layout */}
          <div className="list-layout">
            {/* ─── List Panel (left) ─── */}
            {/* TODO: Populate with your list items */}
            <div className="list-panel">
              <CuiSearchBox hideLabel placeholder="Search items" size="small" />
              <CuiSearchBox hideLabel placeholder="Filter by tags" size="small" />
              <CuiCheckbox>
                <span style={{ fontSize: 'var(--font-size-base-200)' }}>Group by tag</span>
              </CuiCheckbox>

              <CuiButton appearance="subtle" size="small">
                <CuiIcon slot="start" name="add" />
                Add item
              </CuiButton>

              <CuiDivider />

              <div className="list-heading">All items</div>

              <div className="list-item">
                <span>Item 1</span>
                <CuiButton appearance="transparent" iconOnly size="small">
                  <CuiIcon name="more-horizontal" />
                </CuiButton>
              </div>
              <div className="list-item">
                <span>Item 2</span>
                <CuiButton appearance="transparent" iconOnly size="small">
                  <CuiIcon name="more-horizontal" />
                </CuiButton>
              </div>
            </div>

            {/* ─── Main Content (right) ─── */}
            {/* TODO: Replace with your detail view or card grid */}
            <div className="main-content">
              <p style={{ color: 'var(--neutral-foreground-2)' }}>
                Select an item from the list or add a new one.
              </p>
            </div>
          </div>
        </div>
      </CuiAppFrame>
      <style>{styles}</style>
    </>
  );
}
