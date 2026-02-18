# Azure Resource Page Shell

Full-page scaffold for any Azure resource blade: app frame, header, side navigation drawer, and main content area with breadcrumb, title row, subtitle, and toolbar.

## Structure

```
CuiAppFrame (skipToMainText)
├── slot="header"      → Azure Portal Header (see azure-portal-header.md)
├── slot="navigation"  → CuiDrawer (inline, position="start", breakpoint="686px", open)
│   └── CuiSideNav     → See side-nav-with-iconify.md
└── slot="main"
    ├── Breadcrumb row  → CuiBreadcrumb > CuiBreadcrumbItem(s)
    ├── Page header     → icon + h1 title + star/action buttons
    ├── Subtitle        → <p> with resource type
    ├── Toolbar         → See resource-page-toolbar.md
    ├── CuiDivider
    └── Content area    → Tabs, cards, tables, etc.
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
  CuiDrawer,
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

export default function AzureResourcePage() {
  const styles = `
    body { margin: 0; }
    [slot='main'] {
      min-width: 320px;
      padding: 0;
      background: var(--neutral-background2);
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
            {/* Nav items — see side-nav-with-iconify.md */}
            <CuiNavItem label="Overview" href="#" selected>
              <CuiIcon
                slot="icon"
                url="https://api.iconify.design/fluent:home-24-regular.svg"
                selectedUrl="https://api.iconify.design/fluent:home-24-filled.svg"
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
              <CuiBreadcrumbItem active current="page">Resource Name</CuiBreadcrumbItem>
            </CuiBreadcrumb>
          </div>

          {/* Page title row */}
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
