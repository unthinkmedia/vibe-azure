/**
 * Pattern Demo: Azure Resource Page Shell
 * Full page scaffold combining header, side nav, breadcrumb, title, and toolbar.
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
  CuiMenu,
  CuiMenuItem,
  CuiNavHeading,
  CuiNavItem,
  CuiPersona,
  CuiPopOver,
  CuiSearchBox,
  CuiSideNav,
  CuiToolbar,
} from '@charm-ux/cui/react';
import CopilotButton from '../CopilotButton';

export default function PatternResourceShell() {
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
    .content-area { padding: 24px 32px; }
    .pattern-note {
      background: var(--neutral-background-1);
      border: 1px solid var(--neutral-stroke-2);
      border-radius: var(--border-radius-md);
      padding: 20px;
      margin-bottom: 16px;
    }
    .pattern-note h3 {
      margin: 0 0 8px;
      font-size: var(--font-size-base-400);
      color: var(--neutral-foreground-1);
    }
    .pattern-note p {
      margin: 0;
      color: var(--neutral-foreground-2);
      font-size: var(--font-size-base-300);
      line-height: 1.6;
    }
  `;

  return (
    <>
      <CuiAppFrame skipToMainText="Skip to main content">
        {/* ─── Header Pattern ─── */}
        <CuiHeader slot="header" navigationIconLabel="toggle navigation">
          <CuiButton slot="title" appearance="transparent">
            <span className="font-base400">Microsoft Azure</span>
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

        {/* ─── Side Nav Pattern ─── */}
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
              <CuiBreadcrumbItem href="#">rg-contoso-prod</CuiBreadcrumbItem>
              <CuiBreadcrumbItem active current="page">app-contoso-prod</CuiBreadcrumbItem>
            </CuiBreadcrumb>
          </div>

          {/* Title row */}
          <div className="page-header">
            <CuiIcon
              url="https://api.iconify.design/fluent:app-generic-24-regular.svg"
              style={{ fontSize: '24px' }}
            />
            <h1 className="resource-title">app-contoso-prod | Overview</h1>
            <CuiButton appearance="subtle" iconOnly size="small">
              <CuiIcon name="star" />
            </CuiButton>
          </div>
          <p className="resource-subtitle">App Service</p>

          {/* Toolbar Pattern */}
          <div style={{ padding: '0 32px' }}>
            <CuiToolbar size="small" label="Resource actions">
              <CuiMenu>
                <CuiButton slot="trigger" appearance="subtle" size="small">
                  <CuiIcon slot="start" name="add" />
                  Add
                  <CuiIcon slot="end" name="chevron-down" />
                </CuiButton>
                <CuiMenuItem>Add deployment slot</CuiMenuItem>
                <CuiMenuItem>Add custom domain</CuiMenuItem>
              </CuiMenu>
              <CuiDivider orientation="vertical" style={{ height: '20px' }} />
              <CuiButton appearance="subtle" size="small">Restart</CuiButton>
              <CuiButton appearance="subtle" size="small">Stop</CuiButton>
              <CuiButton appearance="subtle" size="small">Refresh</CuiButton>
              <CuiDivider orientation="vertical" style={{ height: '20px' }} />
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

          {/* Content */}
          <div className="content-area">
            <div className="pattern-note">
              <h3>Resource Page Shell Pattern</h3>
              <p>
                This page demonstrates all 4 composition patterns working together:
                <strong> Azure Portal Header</strong> (top bar),
                <strong> Side Nav with Iconify Icons</strong> (left drawer),
                <strong> Resource Page Toolbar</strong> (action bar),
                and the overall <strong>page shell</strong> (AppFrame + breadcrumb + title).
              </p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <CuiCard appearance="outline">
                <div slot="heading">Pattern: Header</div>
                <p style={{ margin: 0, color: 'var(--neutral-foreground-2)', fontSize: 13 }}>
                  CuiHeader with search, Copilot button, and avatar popover
                </p>
              </CuiCard>
              <CuiCard appearance="outline">
                <div slot="heading">Pattern: Side Nav</div>
                <p style={{ margin: 0, color: 'var(--neutral-foreground-2)', fontSize: 13 }}>
                  CuiDrawer + CuiSideNav with Iconify regular/filled icon pairs
                </p>
              </CuiCard>
              <CuiCard appearance="outline">
                <div slot="heading">Pattern: Toolbar</div>
                <p style={{ margin: 0, color: 'var(--neutral-foreground-2)', fontSize: 13 }}>
                  CuiToolbar with subtle buttons, dividers, and menus
                </p>
              </CuiCard>
              <CuiCard appearance="outline">
                <div slot="heading">Pattern: Page Shell</div>
                <p style={{ margin: 0, color: 'var(--neutral-foreground-2)', fontSize: 13 }}>
                  CuiAppFrame + breadcrumb + resource title + subtitle
                </p>
              </CuiCard>
            </div>
          </div>
        </div>
      </CuiAppFrame>
      <style>{styles}</style>
    </>
  );
}
