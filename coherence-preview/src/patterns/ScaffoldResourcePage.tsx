/**
 * Azure Resource Page Scaffold
 *
 * Full Azure portal resource blade with header, side nav, breadcrumb, title,
 * toolbar, and content area. Copy this file and customize the TODOs.
 *
 * Usage: cp this file to coherence-preview/src/MyPage.tsx and edit.
 */
import {
  CuiAppFrame,
  CuiAvatar,
  CuiBreadcrumb,
  CuiBreadcrumbItem,
  CuiButton,
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
import PageHeader from './PageHeader';

export default function AzureResourcePage() {
  // TODO: Replace with your page title, resource name, resource type
  const resourceName = 'myResource';
  const pageTitle = 'Overview';
  const resourceType = 'App Service';

  const styles = `
    body { margin: 0; }
    [slot='main'] {
      min-width: 320px;
      padding: 0;
      background: var(--neutral-background2);
    }
    /* Page header styles provided by shared PageHeader component */
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
            <CuiNavItem label="Diagnose and solve problems" href="#">
              <CuiIcon
                slot="icon"
                url="https://api.iconify.design/fluent:stethoscope-24-regular.svg"
                selectedUrl="https://api.iconify.design/fluent:stethoscope-24-filled.svg"
              />
            </CuiNavItem>

            {/* TODO: Add resource-specific nav sections */}
            <CuiNavHeading>Settings</CuiNavHeading>
            <CuiNavItem label="Configuration" href="#">
              <CuiIcon
                slot="icon"
                url="https://api.iconify.design/fluent:settings-24-regular.svg"
                selectedUrl="https://api.iconify.design/fluent:settings-24-filled.svg"
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
          <PageHeader
            icon="https://api.iconify.design/fluent:app-generic-24-regular.svg"
            title={`${resourceName} | ${pageTitle}`}
            subtitle={resourceType}
            showFavorite
            copilotSuggestions={[
              'Show me the health of this resource.',
              'What are the recent changes to this resource?',
            ]}
          />

          {/* Toolbar */}
          {/* TODO: Customize toolbar actions for your page */}
          <div style={{ padding: '0 32px' }}>
            <CuiToolbar size="small" label="Actions">
              <CuiButton appearance="subtle" size="small">
                <CuiIcon slot="start" name="add" />
                Add
              </CuiButton>
              <CuiDivider orientation="vertical" style={{ height: '20px' }} />
              <CuiButton appearance="subtle" size="small">Refresh</CuiButton>
              <CuiButton appearance="subtle" size="small">Feedback</CuiButton>
            </CuiToolbar>
          </div>

          <CuiDivider style={{ margin: '0' }} />

          {/* ─── Page Content ─── */}
          {/* TODO: Replace with your page content (tabs, cards, tables, etc.) */}
          <div style={{ padding: '24px 32px' }}>
            <p style={{ color: 'var(--neutral-foreground2)' }}>
              Page content goes here.
            </p>
          </div>
        </div>
      </CuiAppFrame>
      <style>{styles}</style>
    </>
  );
}
