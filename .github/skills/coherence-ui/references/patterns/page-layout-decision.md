# Page Layout Decision Guide

Azure portal pages use one of two layouts based on whether the page lives **inside a specific resource/service context** or operates at the **portal level**.

## Decision Rule

**Ask: "Is the user looking at a specific deployed resource or service?"**

- **YES → Layout A: Side Panel** (section nav on the left)
- **NO → Layout B: Full Width** (no section nav)

## Layout A: With Side Panel

The section nav (`<nav>` + `CuiSideNav`) appears to the LEFT of the content area, BELOW the header and title blade. It provides navigation between sub-pages of that specific resource or service (Overview, Settings, Properties, etc.).

### When to use

| Page Type | Example | Scaffold |
|-----------|---------|----------|
| Resource overview | Storage account overview | `ScaffoldOverviewPage` |
| Resource sub-page | App Service → Configuration | `ScaffoldResourcePage` |
| Resource list page | Key Vault → Secrets list | `ScaffoldListPage` |
| Service landing page | Monitor → Overview | `ScaffoldServiceBlade` |
| Resource detail (in multi-page flow) | my-vm-01 → Overview | `ScaffoldMultiPageFlow` (detail sub-route) |

### Structural pattern

```
AppFrame
├── Header (slot="header")
├── AzurePortalNav (slot="navigation" — hamburger overlay)
└── div (slot="main", display: flex, height: 100%)
    ├── <nav> (220px, border-right, background1)  ← SIDE PANEL
    │   └── CuiSideNav
    │       ├── CuiNavItem (Overview, selected)
    │       ├── CuiNavItem (Activity log)
    │       ├── CuiNavHeading (Settings)
    │       └── CuiNavItem (Configuration)
    └── <div> (flex: 1, overflowY: auto)           ← CONTENT AREA
        ├── Breadcrumb
        ├── PageHeader (title, icon, copilot suggestions)
        ├── Toolbar
        ├── Divider
        └── Page content
```

### Key details

- Side panel width: `220px` with `min-width: 220px`
- Side panel background: `var(--neutral-background1)`
- Side panel border: `1px solid var(--neutral-stroke2)` (right side)
- The `slot="main"` div MUST have `display: flex` and `height: 100%`
- Breadcrumb, PageHeader, and Toolbar go INSIDE the content area (right of nav), NOT above the nav

### nav items by resource type

Standard sections every resource has:
- **Top:** Overview, Activity log, Access control (IAM), Tags, Diagnose and solve problems
- **Middle:** Resource-specific items (varies)
- **Bottom (Settings heading):** Configuration, Networking, Properties, Locks, Export template

---

## Layout B: Full Width (No Side Panel)

The content area stretches the full width of `slot="main"` with no section nav. Used for portal-level pages that don't belong to a specific resource.

### When to use

| Page Type | Example | Scaffold |
|-----------|---------|----------|
| Portal home | Azure home page | `ScaffoldHomePage` |
| Create resource wizard | Create Storage account | `ScaffoldCreateFlow` |
| Marketplace / catalog | Create a resource browse | `ScaffoldMarketplaceBrowse` |
| Browse page (empty state) | Function Apps (no resources yet) | `ScaffoldMultiPageFlow` (browse sub-route) |
| All-resources list | All resources flat list | (custom — full-width table) |
| Subscription list | Subscriptions page | (custom — full-width table) |

### Structural pattern

```
AppFrame
├── Header (slot="header")
├── AzurePortalNav (slot="navigation" — hamburger overlay)
└── div (slot="main")                               ← FULL WIDTH
    ├── Breadcrumb
    ├── PageHeader (title, copilot suggestions)
    └── Page content (centered or full-width)
```

### Key details

- No `display: flex` needed on `slot="main"` (unless the page has its own internal columns like Marketplace)
- Content may be centered with a max-width (Home page uses `max-width: 1063px`)
- Create flows use full-width tabs + form sections constrained to `max-width: 640px`
- Marketplace browse has its OWN custom sidebar (categories list) — this is NOT a CuiSideNav section nav

---

## Edge Cases

### Content sidebar ≠ Section nav

Some full-width pages have a **content sidebar** (e.g., Marketplace categories, list panel). These are NOT section navs — they are part of the page content:

| Component | Purpose | Where it goes |
|-----------|---------|---------------|
| `CuiSideNav` (section nav) | Resource sub-page navigation | LEFT of content, INSIDE `slot="main"` flex |
| Categories sidebar | Filter/browse by category | INSIDE the page content area |
| List panel | Item selection panel | INSIDE the page content area |
| Collapsible service nav | Service-level navigation | INSIDE the page content area (Service Blade pattern) |

**Rule:** If it navigates between resource sub-pages → it's a section nav (Layout A). If it filters or categorizes content → it's part of the content (Layout B with internal columns).

### Multi-page flows

Multi-page flows can mix layouts across sub-routes:
- **Browse sub-route** → Layout B (full width, no side panel)
- **Create sub-route** → Layout B (full width create wizard)
- **Detail sub-route** → Layout A (side panel with resource nav)

### Service Blades (hybrid)

Service blades like Azure Monitor use a **collapsible** sidebar that sits below the full-width title. This is structurally Layout B but with a content sidebar. Use `ScaffoldServiceBlade` for this pattern — the sidebar collapses and is NOT a standard CuiSideNav section nav.

---

## Quick Reference for Builder

When building an experiment, use this checklist:

1. Read the `pageType` from intent.json
2. Check the `layout` field if present (explicit override)
3. If neither is set, apply the decision rule: resource/service context → side panel; portal-level → full width
4. Pick the matching scaffold from the table above
5. **NEVER** add a side panel to a create flow, home page, or browse page
6. **ALWAYS** add a side panel to resource overview, resource sub-page, or detail pages
