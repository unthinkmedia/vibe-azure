# Side Nav with Icons

Pattern for Azure-style side navigation using `CuiSideNav` with Fluent 2 icons. **Prefer native `name` attribute** for icons in the Coherence registered set (~120 icons). Fall back to Iconify SVG URLs only for icons not available natively. Supports regular/filled icon pairs that toggle on selection, plus grouped sections with headings.

## Icon Strategy

1. **Native icons (preferred):** Use `<CuiIcon slot="icon" name="settings" />` for icons in the registered set. Faster, offline-capable, design-system consistent.
2. **Iconify fallback:** Use `<CuiIcon slot="icon" url="..." selectedUrl="..." />` only for domain-specific icons not in the registered set (e.g. `stethoscope`, `folder`, `server`, `globe`).

## Structure

```
CuiDrawer (slot="navigation", inline, position="start", breakpoint="686px", open)
└── CuiSideNav (size="small")
    ├── CuiNavItem (label, href, selected?)
    │   └── CuiIcon (slot="icon", name="..." or url="...regular.svg", selectedUrl="...filled.svg")
    ├── CuiNavItem ...
    ├── CuiNavHeading → Section title
    ├── CuiNavItem ...
    ├── CuiDivider → Visual separator between groups
    └── CuiNavItem ...
```

## React Example

```tsx
<CuiDrawer
  slot="navigation"
  id="navigation-drawer"
  inline
  position="start"
  breakpoint="686px"
  open
>
  <CuiSideNav size="small">
    {/* Native icon — "navigation" is in the registered set */}
    <CuiNavItem label="Overview" href="#" selected>
      <CuiIcon slot="icon" name="navigation" />
    </CuiNavItem>
    {/* Native icon — "history" is in the registered set */}
    <CuiNavItem label="Activity log" href="#">
      <CuiIcon slot="icon" name="history" />
    </CuiNavItem>
    {/* Native icon — "person" is in the registered set */}
    <CuiNavItem label="Access control (IAM)" href="#">
      <CuiIcon slot="icon" name="person" />
    </CuiNavItem>

    <CuiNavHeading>Settings</CuiNavHeading>

    {/* Native icon — "settings" is in the registered set */}
    <CuiNavItem label="Configuration" href="#">
      <CuiIcon slot="icon" name="settings" />
    </CuiNavItem>
    {/* Native icon — "info" is in the registered set */}
    <CuiNavItem label="Properties" href="#">
      <CuiIcon slot="icon" name="info" />
    </CuiNavItem>

    <CuiNavHeading>APIs</CuiNavHeading>

    {/* Iconify fallback — "plug-connected" is NOT in the registered set */}
    <CuiNavItem label="APIs" href="#">
      <CuiIcon
        slot="icon"
        url="https://api.iconify.design/fluent:plug-connected-24-regular.svg"
        selectedUrl="https://api.iconify.design/fluent:plug-connected-24-filled.svg"
      />
    </CuiNavItem>

    <CuiDivider />

    {/* Iconify fallback — "globe" is NOT in the registered set */}
    <CuiNavItem label="Developer portal" href="#">
      <CuiIcon
        slot="icon"
        url="https://api.iconify.design/fluent:globe-24-regular.svg"
        selectedUrl="https://api.iconify.design/fluent:globe-24-filled.svg"
      />
    </CuiNavItem>
  </CuiSideNav>
</CuiDrawer>
```

## Iconify URL Pattern (fallback only)

For icons **not** in the Coherence registered set, use the Iconify API:

```
Regular:  https://api.iconify.design/fluent:{name}-24-regular.svg
Filled:   https://api.iconify.design/fluent:{name}-24-filled.svg
```

## Common Azure Nav Icons

| Label | Native `name` | Iconify fallback needed? |
|-------|--------------|--------------------------|
| Home / Overview | `navigation` | No |
| Activity log | `history` | No |
| Access control (IAM) | `person` | No |
| Tags | — | Yes: `tag` |
| Diagnostics | — | Yes: `stethoscope` |
| Resource visualizer | — | Yes: `diagram` |
| Events | — | Yes: `flash` |
| Settings / Config | `settings` | No |
| Properties / Info | `info` | No |
| Delete | `delete` | No |
| Edit | `edit` | No |
| Search | `search` | No |
| Save | `save` | No |
| Filter | `filter` | No |
| Eye / View | `eye` | No |
| Mail | `mail` | No |
| Share | `share` | No |
| Copilot | `copilot` | No |
| Warning | `warning` | No |
| Workspaces / Folders | — | Yes: `folder` |
| APIs / Connections | — | Yes: `plug-connected` |
| Servers | — | Yes: `server` |
| Products / Packages | — | Yes: `box` |
| Subscriptions / Keys | — | Yes: `key` |
| Cloud / Backends | — | Yes: `cloud` |
| Schemas / Database | — | Yes: `database` |
| Security / Credentials | — | Yes: `shield` |
| Portal / Web | — | Yes: `globe` |
| Terminal | — | Yes: `terminal` |

## Key Details

- `CuiDrawer` props: `inline` makes it part of the layout flow (not overlay). `breakpoint="686px"` collapses to hamburger. `open` shows it by default.
- `CuiSideNav size="small"` matches the Azure portal compact nav style.
- `CuiNavHeading` creates visual section dividers with a label.
- `CuiDivider` (without heading) creates a simple line separator.
- Mark the active page with `selected` on the `CuiNavItem`.
