# Side Nav with Iconify Icons

Pattern for Azure-style side navigation using `CuiSideNav` with Fluent 2 icons loaded from Iconify SVG URLs. Supports regular/filled icon pairs that toggle on selection, plus grouped sections with headings.

## Structure

```
CuiDrawer (slot="navigation", inline, position="start", breakpoint="686px", open)
└── CuiSideNav (size="small")
    ├── CuiNavItem (label, href, selected?)
    │   └── CuiIcon (slot="icon", url="...regular.svg", selectedUrl="...filled.svg")
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

    <CuiNavHeading>APIs</CuiNavHeading>

    <CuiNavItem label="APIs" href="#">
      <CuiIcon
        slot="icon"
        url="https://api.iconify.design/fluent:plug-connected-24-regular.svg"
        selectedUrl="https://api.iconify.design/fluent:plug-connected-24-filled.svg"
      />
    </CuiNavItem>
    <CuiNavItem label="Subscriptions" href="#">
      <CuiIcon
        slot="icon"
        url="https://api.iconify.design/fluent:key-24-regular.svg"
        selectedUrl="https://api.iconify.design/fluent:key-24-filled.svg"
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
```

## Iconify URL Pattern

All icons use the Iconify API with Fluent 2 icon set:

```
Regular:  https://api.iconify.design/fluent:{name}-24-regular.svg
Filled:   https://api.iconify.design/fluent:{name}-24-filled.svg
```

The `url` prop shows the regular (outline) variant. The `selectedUrl` prop shows the filled variant when the parent `CuiNavItem` has `selected`.

## Common Azure Nav Icons

| Label | Icon name |
|-------|-----------|
| Home / Overview | `home` |
| Activity log | `document` |
| Access control (IAM) | `person` |
| Tags | `tag` |
| Diagnostics | `stethoscope` |
| Resource visualizer | `diagram` |
| Events | `flash` |
| Workspaces / Folders | `folder` |
| APIs / Connections | `plug-connected` |
| Servers | `server` |
| Products / Packages | `box` |
| Subscriptions / Keys | `key` |
| Settings / Grid | `grid` |
| Cloud / Backends | `cloud` |
| Extensions / Fragments | `puzzle-piece` |
| Schemas / Database | `database` |
| Security / Credentials | `shield` |
| Portal / Web | `globe` |
| Power Platform | `power` |
| Center / Alignment | `center-horizontal` |
| Edit columns | `column-edit` |
| Delete | `delete` |

## Key Details

- `CuiDrawer` props: `inline` makes it part of the layout flow (not overlay). `breakpoint="686px"` collapses to hamburger. `open` shows it by default.
- `CuiSideNav size="small"` matches the Azure portal compact nav style.
- `CuiNavHeading` creates visual section dividers with a label.
- `CuiDivider` (without heading) creates a simple line separator.
- Mark the active page with `selected` on the `CuiNavItem`.
