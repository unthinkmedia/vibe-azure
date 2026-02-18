---
name: azure-portal-prototyper
description: Rapidly scaffold Azure portal page prototypes using Coherence UI components. Use when the user asks to build, mock, prototype, or wireframe an Azure portal page, blade, resource page, create flow, settings page, or any Azure-style UI. Also triggers on requests like "build me an Azure X page", "prototype a resource blade", or "create an Azure portal mockup". Works in tandem with the coherence-ui skill for component APIs and design tokens.
---

# Azure Portal Prototyper — Facade

> **This skill has been decomposed into four phase-specific skills with an orchestrator.**
> It exists as a trigger surface — when activated, it delegates to the `experiment-orchestrator` skill.

## What to Do

**Invoke the `experiment-orchestrator` skill** with the user's full request. The orchestrator will:

1. **INTENT** — Capture design intent via the MCP UI (`design-intent` skill)
2. **BUILD** — Generate the experiment files (`azure-portal-builder` skill)
3. **VERIFY** — Run UI verification (`experiment-verify` skill)
4. **DEPLOY** — Publish to Azure Static Web Apps (`experiment-deploy` skill)

The orchestrator detects which phase the experiment is in and dispatches to the correct skill automatically.

## Why This Changed

The monolithic workflow allowed phases to be skipped (e.g., bypassing the intent MCP tool). By decomposing into separate skills with hard boundaries, each phase skill is physically incapable of performing another phase's work. The orchestrator manages transitions between phases.

## Skill Map

| Phase | Skill | Responsibility |
|-------|-------|----------------|
| Intent | `design-intent` | Call `design_intent` MCP tool, save intent.json |
| Build | `azure-portal-builder` | Read intent.json, generate experiment files, register |
| Verify | `experiment-verify` | Run ui-verification, fix violations |
| Deploy | `experiment-deploy` | Run share-experiment, return URL |
| **Orchestrator** | `experiment-orchestrator` | Detect phase, dispatch to correct skill |

## References

Page type reference and icon maps are maintained in the builder skill:
- [references/page-types.md](references/page-types.md)
- [references/azure-icons.md](references/azure-icons.md)

## File Structure

Every experiment is a **self-contained folder** with focused files. Each experiment is independent — no shared components between experiments (except shared patterns from `src/patterns/`):

### Single-Page Experiments

```
coherence-preview/src/experiments/<experiment-id>/
  index.tsx          # Main entry point — composes Header + Navigation + PageContent
  intent.json        # MANDATORY — Design intent document (created by design_intent MCP tool, powers IntentButton in preview)
  data.ts            # Types, interfaces, mock data, nav config (swap for real APIs)
  styles.ts          # Scoped CSS as exported string
  Navigation.tsx     # CuiDrawer + CuiSideNav (driven by navSections from data.ts)
  PageContent.tsx    # Toolbar + page body — the unique part of the experiment
```

| File | Purpose | When to edit |
|------|---------|--------------|
| `data.ts` | Resource names, nav items array, mock data, TypeScript types | Always — first file to customize |
| `styles.ts` | All CSS for the experiment as an exported `styles` string | Add/adjust page-specific styles |
| `Navigation.tsx` | Side nav driven by `navSections` from `data.ts` | Rarely — the data-driven pattern handles most cases |
| `PageContent.tsx` | The page body below the header (tabs, forms, tables, cards) | Always — this is the experiment's unique content |
| `index.tsx` | Orchestrator: Header chrome + breadcrumb + title + `<Navigation />` + `<PageContent />` | Only to adjust the header or breadcrumb |

### Multi-Page Flow Experiments

When a user wants to test an **end-to-end flow** (e.g., browse → create → resource detail), use a multi-page experiment. All pages live in a single experiment folder with a `pages/` subdirectory:

```
coherence-preview/src/experiments/<experiment-id>/
  index.tsx          # Router — switches between pages based on subRoute prop
  intent.json        # MANDATORY — Design intent document (created by design_intent MCP tool, powers IntentButton in preview)
  data.ts            # Shared types, mock data for ALL pages
  styles.ts          # Combined CSS for ALL pages (organized by page section)
  pages/
    BrowsePage.tsx   # List/browse page (default, no sub-route)
    CreatePage.tsx   # Creation wizard (sub-route: "create")
    DetailPage.tsx   # Resource detail/overview (sub-route: "detail")
    (more pages as needed)
```

**How sub-routing works:**
- The main.tsx router supports hash sub-routes: `#<experiment-id>/<sub-route>`
- `#my-flow` → default page (BrowsePage), `#my-flow/create` → CreatePage, `#my-flow/detail` → DetailPage
- The router passes `subRoute` as a prop to the experiment's `index.tsx`
- `index.tsx` uses a `switch` statement to render the correct page component
- Pages navigate to each other via `window.location.hash = '<experiment-id>/<sub-route>'`

**Key differences from single-page experiments:**
- No `Navigation.tsx` or `PageContent.tsx` at the root — each page is self-contained in `pages/`
- Each page includes its own full CuiAppFrame + header + nav (since Azure pages have different chrome)
- `data.ts` is shared across all pages
- `styles.ts` is shared across all pages, organized with section comments per page

| File | Purpose | When to edit |
|------|---------|--------------|
| `index.tsx` | Router that maps `subRoute` prop to page components | Add/remove pages |
| `data.ts` | Shared mock data, types, nav configs for all pages | Always — first file to customize |
| `styles.ts` | Combined CSS organized by page section | Add styles for each page |
| `pages/*.tsx` | Full-page components with CuiAppFrame + header + nav + content | Each page's unique content |

## Page Types

Single-page scaffolds for individual Azure portal pages.

| Page Type | Description | Scaffold Folder | When to Use |
|-----------|-------------|-----------------|-------------|
| **Resource Page** | Standard resource blade with overview content | `assets/scaffolds/azure-resource-page/` | Default for any Azure resource (App Service, VM, Storage, etc.) |
| **List Page** | Two-column list + detail layout | `assets/scaffolds/azure-list-page/` | APIs, Subscriptions, Products, Endpoints — anything with a selectable list |
| **Overview Page** | Essentials panel + card grid | `assets/scaffolds/azure-overview-page/` | Resource overview/dashboard with key metrics and properties |
| **Marketplace Browse** | Categories sidebar with two-column service + marketplace grid | `assets/scaffolds/azure-marketplace-browse/` | "Create a resource" landing page, service catalog, marketplace browsing |

## Flow Types

Multi-step or multi-page flows involving navigation between steps or pages.

| Flow Type | Description | Flow Folder | When to Use |
|-----------|-------------|-------------|-------------|
| **Create Flow** | Multi-step wizard with tabbed form | `assets/flows/azure-create-flow/` | "Create a resource", "Add a service", any multi-step creation |
| **Multi-Page Flow** | End-to-end flow with multiple pages (Browse → Create → Detail) | `assets/flows/azure-multi-page-flow/` | Testing user journeys that span multiple pages within a single experiment |

### Choosing Single-Page vs Multi-Page

- **Single-page**: Use when prototyping one specific page in isolation (a resource overview, a settings page, a list view)
- **Multi-page flow**: Use when the user wants to test an **end-to-end user journey** — clicking buttons to navigate between related pages (e.g., "browse resources" → "click Create" → "fill form" → "see the created resource"). All assets live in one experiment folder.

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
- **File location** — output to `coherence-preview/src/experiments/<experiment-id>/` as a multi-file folder (see File Structure above)
- **Export** — `export default function PageName()` in `index.tsx` for lazy-loading compatibility. Multi-page flows must accept a `{ subRoute?: string }` prop.
- **Styles** — export a `styles` string from `styles.ts`, injected via `<style>{styles}</style>` in the page components
- **Data** — export mock data, types, and nav config from `data.ts`
- **Navigation** — single-page: export from `Navigation.tsx`. Multi-page: inline in each page file.
- **Page content** — single-page: export from `PageContent.tsx`. Multi-page: each page in `pages/` is self-contained.
- **Icons** — use Iconify URLs for nav/page icons (see azure-icons reference)
- **Body margin** — always include `body { margin: 0; }` in styles
- **Self-contained** — each experiment folder must be fully independent; never import from other experiments (except the `copilot-button` utility and shared patterns from `src/patterns/`)
- **Multi-page navigation** — use `window.location.hash = '<experiment-id>/<sub-route>'` to navigate between pages within a flow. Never use separate experiment entries for pages that are part of the same user journey.
