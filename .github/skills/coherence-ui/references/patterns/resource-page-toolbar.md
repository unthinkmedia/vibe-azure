# Resource Page Toolbar

Horizontal action bar used at the top of Azure resource pages. Built with `CuiToolbar` containing subtle buttons, vertical dividers, and optional dropdown menus.

## Structure

```
div (padding: 0 32px)
└── CuiToolbar (size="small", label="<descriptive label>")
    ├── CuiMenu (dropdown action)
    │   ├── slot="trigger" → CuiButton (subtle, small) with start icon + text + chevron-down end icon
    │   └── CuiMenuItem(s)
    ├── CuiDivider (orientation="vertical", height: 20px)
    ├── CuiButton (subtle, small) with start icon + text
    ├── CuiButton (subtle, small) with start icon + text
    ├── CuiDivider (orientation="vertical", height: 20px)
    ├── CuiButton (subtle, small) — text only or with icon
    └── ...
```

## React Example

```tsx
import {
  CuiButton,
  CuiDivider,
  CuiIcon,
  CuiMenu,
  CuiMenuItem,
  CuiToolbar,
} from '@charm-ux/cui/react';

function ResourceToolbar() {
  return (
    <div style={{ padding: '0 32px' }}>
      <CuiToolbar size="small" label="Resource actions">
        {/* Dropdown action */}
        <CuiMenu>
          <CuiButton slot="trigger" appearance="subtle" size="small">
            <CuiIcon slot="start" name="add" />
            Add
            <CuiIcon slot="end" name="chevron-down" />
          </CuiButton>
          <CuiMenuItem>Add role assignment</CuiMenuItem>
          <CuiMenuItem>Add co-administrator</CuiMenuItem>
        </CuiMenu>

        <CuiDivider orientation="vertical" style={{ height: '20px' }} />

        {/* Standard actions */}
        <CuiButton appearance="subtle" size="small">
          <CuiIcon slot="start" name="arrow-download" />
          Download
        </CuiButton>
        <CuiButton appearance="subtle" size="small">
          <CuiIcon
            slot="start"
            url="https://api.iconify.design/fluent:column-edit-24-regular.svg"
            label="Edit columns"
          />
          Edit columns
        </CuiButton>
        <CuiButton appearance="subtle" size="small">
          <CuiIcon slot="start" name="arrow-sync" />
          Refresh
        </CuiButton>

        <CuiDivider orientation="vertical" style={{ height: '20px' }} />

        {/* Destructive action */}
        <CuiButton appearance="subtle" size="small">
          <CuiIcon
            slot="start"
            name="delete"
            label="Delete"
          />
          Delete
        </CuiButton>

        <CuiDivider orientation="vertical" style={{ height: '20px' }} />

        {/* Meta action */}
        <CuiButton appearance="subtle" size="small">
          <CuiIcon slot="start" name="person-feedback" />
          Feedback
        </CuiButton>
      </CuiToolbar>
    </div>
  );
}
```

## Layout Rules

- Toolbar wraps in a `div` with `padding: 0 32px` to align with the page content.
- All buttons use `appearance="subtle"` and `size="small"`.
- Icons go in `slot="start"`. For dropdown triggers, add a `chevron-down` icon in `slot="end"`.
- Vertical dividers use `CuiDivider orientation="vertical"` with `height: 20px` inline style.
- Group related actions between dividers. Common grouping:
  1. Primary action (Add, Create) — often a dropdown menu
  2. Data actions (Download, Edit columns, Refresh)
  3. Destructive actions (Delete)
  4. Meta actions (Feedback)

## Icon Sources

- **Bundled icons** (preferred): `name="add"`, `name="arrow-download"`, `name="arrow-sync"`, `name="person-feedback"`, `name="chevron-down"`
- **Iconify fallback** (when not bundled): Use `url` prop with Iconify API for icons like `column-edit`, `delete`
- Always include `label` prop when using `url`-based icons for accessibility.

## Toolbar-Only vs Dropdown

| Use | Pattern |
|-----|---------|
| Single action | `CuiButton` directly inside `CuiToolbar` |
| Action with sub-options | `CuiMenu` with `CuiButton slot="trigger"` + `CuiMenuItem` children |
| Text-only action (no icon) | `CuiButton` with text only (acceptable for secondary actions like "Edit columns") |
