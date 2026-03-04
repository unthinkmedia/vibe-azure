# Azure Resource Page Shell

Full-page scaffold for any Azure resource blade: app frame, header, section nav inside `slot="main"`, and main content area with breadcrumb, title row, subtitle, and toolbar.

> **⚠️ Two-Tier Navigation Rule:** Section nav (`<nav>` + `CuiSideNav`) goes **inside `slot="main"`** — **NOT** inside a `CuiDrawer slot="navigation"`. Only the global portal nav (`AzurePortalNav`) uses `slot="navigation"`. Putting both in `slot="navigation"` causes two drawers to collide in CuiAppFrame's single `<aside>`, breaking layout.

## Structure

```
CuiAppFrame (skipToMainText)
├── slot="header"      → Azure Portal Header (see azure-portal-header.md)
├── slot="navigation"  → Global AzurePortalNav ONLY (hamburger-toggled overlay)
└── slot="main"        → display: flex; flex-direction: column; height: 100%
    ├── Breadcrumb row  → CuiBreadcrumb > CuiBreadcrumbItem(s) (full width, above sidebar)
    ├── Page header     → icon + h1 title + star/action buttons (full width, above sidebar)
    ├── .blade-body     → display: flex; flex: 1; overflow: hidden
    │   ├── .blade-sidebar  → 220px collapsible <nav> + CuiSideNav
    │   ├── .blade-toggle   → 28px thin column with chevron toggle button
    │   └── .blade-content  → flex: 1; the main content area
    │       ├── Subtitle    → <p> with resource type
    │       ├── Toolbar     → See resource-page-toolbar.md
    │       ├── CuiDivider
    │       └── Content     → Tabs, cards, tables, etc.
```

## React Example

```tsx
import {
  CuiAppFrame,
  CuiAvatar,
  CuiBreadcrumb,
  CuiBreadcrumbItem,
  CuiButton,
  CuiDivider,
  CuiHeader,
  CuiIcon,
  CuiPopOver,
  CuiPersona,
  CuiSearchBox,
  CuiSideNav,
  CuiNavHeading,
  CuiNavItem,
  CuiToolbar,
} from '@charm-ux/cui/react';
import { useState } from 'react';

export default function AzureResourcePage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const styles = `
    body { margin: 0; }
    [slot='main'] {
      display: flex;
      flex-direction: column;
      height: 100%;
      min-width: 320px;
      padding: 0;
      background: var(--neutral-background2);
    }
    .blade-body {
      display: flex;
      flex: 1;
      overflow: hidden;
    }
    .blade-sidebar {
      width: 220px;
      min-width: 220px;
      background: var(--neutral-background1);
      border-right: 1px solid var(--neutral-stroke2);
      overflow-y: auto;
      transition: width 0.2s, min-width 0.2s;
    }
    .blade-sidebar.collapsed {
      width: 0;
      min-width: 0;
      overflow: hidden;
    }
    .blade-toggle-strip {
      width: 28px;
      min-width: 28px;
      display: flex;
      align-items: flex-start;
      padding-top: 8px;
      justify-content: center;
      border-right: 1px solid var(--neutral-stroke2);
      background: var(--neutral-background1);
    }
    .blade-content {
      flex: 1;
      overflow-y: auto;
      min-width: 0;
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
      font-size: var(--font-size-base500);
      font-weight: var(--font-weight-semi-bold);
      color: var(--neutral-foreground1);
    }
    .resource-subtitle {
      font-size: var(--font-size-base200);
      color: var(--neutral-foreground3);
      margin: 0 0 0 32px;
      padding-bottom: 12px;
    }
  `;

  return (
    <>
      <CuiAppFrame skipToMainText="Skip to main content">
        {/* ─── Header ─── */}
        {/* Insert Azure Portal Header here (see azure-portal-header.md) */}

        {/* ─── Global Nav (AzurePortalNav) goes in slot="navigation" ─── */}
        {/* See azure-portal-nav.md — this is the ONLY drawer in slot="navigation" */}

        {/* ─── Main Content ─── */}
        <div slot="main">
          {/* Breadcrumb — full width, above sidebar */}
          <div style={{ padding: '8px 32px 0' }}>
            <CuiBreadcrumb label="Navigation" size="small">
              <CuiBreadcrumbItem href="#">Home</CuiBreadcrumbItem>
              <CuiBreadcrumbItem active current="page">Resource Name</CuiBreadcrumbItem>
            </CuiBreadcrumb>
          </div>

          {/* Page title row — full width, above sidebar */}
          <div className="page-header">
            <CuiIcon
              url="https://api.iconify.design/fluent:person-24-regular.svg"
              style={{ fontSize: '24px' }}
            />
            <h1 className="resource-title">
              Resource Name | Page Title
            </h1>
            <CuiButton appearance="subtle" iconOnly size="small">
              <CuiIcon name="star" />
            </CuiButton>
          </div>

          {/* ─── Blade Body: Sidebar + Content ─── */}
          <div className="blade-body">
            {/* Section nav — inside slot="main", NOT in CuiDrawer slot="navigation" */}
            <nav className={`blade-sidebar ${sidebarOpen ? '' : 'collapsed'}`}
                 aria-label="Resource navigation">
              <CuiSideNav size="small">
                {/* Nav items — see side-nav-with-iconify.md */}
                <CuiNavItem label="Overview" href="#" selected>
                  <CuiIcon
                    slot="icon"
                    url="https://api.iconify.design/fluent:home-24-regular.svg"
                    selectedUrl="https://api.iconify.design/fluent:home-24-filled.svg"
                  />
                </CuiNavItem>
              </CuiSideNav>
            </nav>

            {/* Toggle strip */}
            <div className="blade-toggle-strip">
              <CuiButton
                appearance="subtle"
                iconOnly
                size="small"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                aria-label={sidebarOpen ? 'Collapse navigation' : 'Expand navigation'}
              >
                <CuiIcon name={sidebarOpen ? 'chevron-left' : 'chevron-right'} />
              </CuiButton>
            </div>

            {/* Main content area */}
            <div className="blade-content">
              <p className="resource-subtitle">Resource type</p>

              {/* Toolbar */}
              <div style={{ padding: '0 32px' }}>
                <CuiToolbar size="small" label="Actions">
                  <CuiButton appearance="subtle" size="small">
                    <CuiIcon slot="start" name="add" />
                    Add
                  </CuiButton>
                  <CuiDivider orientation="vertical" style={{ height: '20px' }} />
                  <CuiButton appearance="subtle" size="small">Refresh</CuiButton>
                </CuiToolbar>
              </div>

              <CuiDivider style={{ margin: '0' }} />

              {/* ─── Page Content Goes Here ─── */}
              <div style={{ padding: '24px 32px' }}>
                {/* Tabs, cards, tables, etc. */}
              </div>
            </div>
          </div>
        </div>
      </CuiAppFrame>
      <style>{styles}</style>
    </>
  );
}
```

## Layout Rules

- `body { margin: 0; }` — required to remove default browser margin.
- `[slot='main']` uses `background: var(--neutral-background2)` for the standard Azure grey surface.
- Breadcrumb sits at `padding: 8px 32px 0` — consistent top-left positioning.
- Page header row uses `padding: 16px 32px 0` with `gap: 12px` for icon-title-actions alignment.
- Title follows **"Resource Name | Page Title"** naming convention (e.g. `"myApp | Access control (IAM)"`).
- Subtitle is the resource type (e.g. `"API Management service"`, `"Storage account"`).
- Toolbar sits at `padding: 0 32px` followed immediately by a full-width `CuiDivider`.
- Content area below the divider uses `padding: 24px 32px`.

## Composition

This shell composes 3 other patterns — read them for detailed guidance:

| Sub-pattern | Reference |
|-------------|-----------|
| Header | [azure-portal-header.md](azure-portal-header.md) |
| Side Nav | [side-nav-with-iconify.md](side-nav-with-iconify.md) |
| Toolbar | [resource-page-toolbar.md](resource-page-toolbar.md) |
