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
  CuiHeader,
  CuiIcon,
  CuiNavHeading,
  CuiNavItem,
  CuiPersona,
  CuiPopOver,
  CuiSearchBox,
  CuiSideNav,
} from '@charm-ux/cui/react';
import CopilotButton from '../experiments/copilot-button';
import { azureIcon } from './azure-icons';
import PageHeader from './PageHeader';
import AzurePortalNav from './PatternAzurePortalNav';

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
      background: var(--neutral-background2);
    }
    .section-nav {
      width: 220px;
      min-width: 220px;
      border-right: 1px solid var(--neutral-stroke2);
      background: var(--neutral-background1);
      overflow-y: auto;
    }

    /* Two-column layout */
    .list-layout {
      display: flex;
      height: 100%;
    }
    .list-panel {
      width: 260px;
      min-width: 220px;
      border-right: 1px solid var(--neutral-stroke2);
      background: var(--neutral-background1);
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

    /* Page header styles provided by shared PageHeader component */

    /* List panel items */
    .list-heading {
      font-size: var(--font-size-base300);
      font-weight: var(--font-weight-semi-bold);
      color: var(--neutral-foreground1);
      margin: 8px 0 4px;
    }
    .list-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 6px 8px;
      border-radius: var(--border-radius-md);
      font-size: var(--font-size-base300);
      color: var(--neutral-foreground1);
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

        {/* ─── Global Navigation (hamburger menu) ─── */}
        <AzurePortalNav />

        {/* ─── Main Content ─── */}
        <div slot="main" style={{ display: 'flex', height: '100%' }}>
          {/* ─── Section Navigation ─── */}
          {/* TODO: Customize nav items */}
          <nav className="section-nav">
            <CuiSideNav size="small">
              <CuiNavItem label="Overview" href="#">
                <CuiIcon slot="icon" name="navigation" />
              </CuiNavItem>
              <CuiNavItem label="Activity log" href="#">
                <CuiIcon slot="icon" url={azureIcon('activity-log')} />
              </CuiNavItem>
              <CuiNavItem label="Access control (IAM)" href="#">
                <CuiIcon slot="icon" name="person" />
              </CuiNavItem>
              <CuiNavHeading>Resources</CuiNavHeading>
              <CuiNavItem label={pageTitle} href="#" selected>
                <CuiIcon slot="icon" name="task-list" />
              </CuiNavItem>
            </CuiSideNav>
          </nav>

          {/* ─── Page Content ─── */}
          <div style={{ flex: 1, overflowY: 'auto' }}>
            {/* Breadcrumb */}
          <div style={{ padding: '8px 32px 0' }}>
            <CuiBreadcrumb label="Navigation" size="small">
              <CuiBreadcrumbItem href="#">Home</CuiBreadcrumbItem>
              <CuiBreadcrumbItem href="#">{resourceName}</CuiBreadcrumbItem>
            </CuiBreadcrumb>
          </div>

          {/* Page title row */}
          <PageHeader
            title={`${resourceName} | ${pageTitle}`}
            subtitle={resourceType}
            showFavorite
            copilotSuggestions={[
              'Show me the health of this resource.',
              'What are the recent changes to this resource?',
            ]}
          />

          <CuiDivider style={{ margin: 0 }} />

          {/* Two-column layout */}
          <div className="list-layout">
            {/* ─── List Panel (left) ─── */}
            {/* TODO: Populate with your list items */}
            <div className="list-panel">
              <CuiSearchBox hideLabel placeholder="Search items" size="small" />
              <CuiSearchBox hideLabel placeholder="Filter by tags" size="small" />
              <CuiCheckbox>
                <span style={{ fontSize: 'var(--font-size-base200)' }}>Group by tag</span>
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
              <p style={{ color: 'var(--neutral-foreground2)' }}>
                Select an item from the list or add a new one.
              </p>
            </div>
          </div>
          </div>
        </div>
      </CuiAppFrame>
      <style>{styles}</style>
    </>
  );
}
