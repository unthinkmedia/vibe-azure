---
name: azure-portal-prototyper
description: Rapidly scaffold Azure portal page prototypes using Coherence UI components. Use when the user asks to build, mock, prototype, or wireframe an Azure portal page, blade, resource page, create flow, settings page, or any Azure-style UI. Also triggers on requests like "build me an Azure X page", "prototype a resource blade", or "create an Azure portal mockup". Works in tandem with the coherence-ui skill for component APIs and design tokens.
---

# Azure Portal Prototyper

Generate complete Azure portal page prototypes using Coherence UI components (`@charm-ux/cui/react`). Produces ready-to-run `.tsx` files for the `coherence-preview/` app.

## Workflow

1. **Identify page type** from the table below
2. **Copy the matching scaffold** from the coherence-ui skill's `assets/scaffolds/` into `coherence-preview/src/`
3. **Customize the scaffold** — fill in TODOs with real resource names, nav items, toolbar actions, and page content
4. **Use the coherence-ui skill** to look up component APIs (fetch the manifest) and design guidance (read reference files)
5. **Use the azure-mock-data skill** (if installed) to generate realistic fake data for tables, cards, and lists
6. **Register the experiment** in `coherence-preview/src/main.tsx` so it appears in the experiment picker (see coherence-live-preview skill)

## Page Types

| Page Type | Description | Scaffold | When to Use |
|-----------|-------------|----------|-------------|
| **Resource Page** | Standard resource blade with overview content | `assets/scaffolds/azure-resource-page.tsx` | Default for any Azure resource (App Service, VM, Storage, etc.) |
| **List Page** | Two-column list + detail layout | `assets/scaffolds/azure-list-page.tsx` | APIs, Subscriptions, Products, Endpoints — anything with a selectable list |
| **Create Flow** | Multi-step wizard with tabbed form | `assets/scaffolds/azure-create-flow.tsx` | "Create a resource", "Add a service", any multi-step creation |
| **Overview Page** | Essentials panel + card grid | `assets/scaffolds/azure-overview-page.tsx` | Resource overview/dashboard with key metrics and properties |

See [references/page-types.md](references/page-types.md) for detailed anatomy and customization guidance for each type.

## Common Customizations

### Resource-Specific Nav Items

Replace the scaffold's side nav with items relevant to the resource. See [references/azure-icons.md](references/azure-icons.md) for the complete icon map.

Standard sections that appear on most Azure resources:
- **Top:** Overview, Activity log, Access control (IAM), Tags, Diagnose and solve problems
- **Middle:** Resource-specific items (varies)
- **Bottom:** Settings group (Configuration, Properties, Locks, Export template)

### Page Content Patterns

| Content Type | Components | Example |
|---|---|---|
| Key-value properties | Grid of `<div>` with label/value pairs | Essentials panel on Overview pages |
| Data table | `CuiTable` or `CuiDataGrid` | Resource lists, role assignments |
| Card grid | `CuiCard` in CSS grid | API cards, metrics cards |
| Tabbed content | `CuiTabs` + `CuiTab` + `CuiTabPanel` | Settings pages, multi-section views |
| Form sections | `CuiInput`, `CuiSelect`, `CuiRadioGroup` in fieldsets | Create flows, configuration pages |
| Status indicators | `CuiBadge` or colored dots | Resource health, deployment status |

### Standard Azure Terminology

Use these exact labels for consistency with the real Azure portal:

| Element | Standard Label |
|---------|---------------|
| Primary action | "Create", "Add", "Save" |
| Secondary action | "Discard", "Cancel" |
| Destructive action | "Delete", "Remove" |
| Refresh | "Refresh" |
| Help | "Feedback" |
| Search placeholder | "Search resources, services, and docs (G+/)" |
| Nav toggle | "toggle navigation" (aria label) |
| Breadcrumb root | "Home" |

## Output Conventions

- **React by default** — use `@charm-ux/cui/react` wrappers
- **File location** — output to `coherence-preview/src/<PageName>.tsx`
- **Export** — `export default function PageName()` for lazy-loading compatibility
- **Styles** — inline `<style>` tag at end of JSX (matches scaffold pattern)
- **Icons** — use Iconify URLs for nav/page icons (see azure-icons reference)
- **Body margin** — always include `body { margin: 0; }` in styles
