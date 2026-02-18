---
name: azure-portal-prototyper
description: Rapidly scaffold Azure portal page prototypes using Coherence UI components. Use when the user asks to build, mock, prototype, or wireframe an Azure portal page, blade, resource page, create flow, settings page, or any Azure-style UI. Also triggers on requests like "build me an Azure X page", "prototype a resource blade", or "create an Azure portal mockup". Works in tandem with the coherence-ui skill for component APIs and design tokens.
---

# Azure Portal Prototyper

Generate complete Azure portal page prototypes using Coherence UI components (`@charm-ux/cui/react`). Produces ready-to-run `.tsx` files for the `coherence-preview/` app.

## Workflow

0. **Open Design Intent form (MANDATORY — DO NOT SKIP)** — **ALWAYS** call the `design_intent` MCP tool with prefill parameters extracted from the user's prompt. Map their description to: `prefillVision` (what they want to build), `prefillProblem` (the problem it solves), `prefillSuccessCriteria` (what "done" looks like), `prefillConstraints` (any stated limits), and `prefillExperimentId` (a kebab-case folder name derived from the description). **The AI generates the title automatically** from the experiment description — do NOT ask the user to provide a title. The Intent form opens pre-populated with your best guesses. The user reviews, edits, and clicks **"Make This"** to confirm.

   > **⛔ NEVER skip this step.** The intent.json is the primary instruction source for the entire build. Without it, the IntentButton in the preview header will show a "Create Intent" prompt instead of the design context, and the experiment is considered incomplete.

0b. **Read & verify the finalized intent (HARD GATE)** — After the `design_intent` tool returns, read the intent.json file from `coherence-preview/src/experiments/<experimentId>/intent.json`. **Verify this file exists at the correct path** — it must be inside `coherence-preview/src/experiments/`, NOT inside `mcp-server/`. If it ended up in the wrong location, copy it to the correct path.

   **🚫 If intent.json does not exist: STOP. Do not proceed to Step 1.**
   - Tell the user: _"Your experiment needs a design intent before building. Please open the Intent MCP UI to create one — use the `design_intent` tool or click the Intent button in the preview header."_
   - Re-call the `design_intent` MCP tool so the user can fill in the form.
   - Only proceed once intent.json exists at the correct path.

   **Use the full intent document (vision, problem, success criteria, non-goals, constraints) as the PRIMARY INSTRUCTION SOURCE for all subsequent build decisions.** The intent drives what you build, what you prioritize, and what you skip. Every component choice, layout decision, and mock data selection should trace back to a field in the intent.

   > **Why this matters:** The `IntentButton` component in the preview header bar uses Vite's `import.meta.glob('./experiments/*/intent.json')` to discover intent files. If the intent.json is missing, the IntentButton shows a "Create Intent" prompt directing the user to the MCP UI. The intent.json must be co-located with the experiment's other files at `coherence-preview/src/experiments/<experimentId>/intent.json`.

0c. **Show the user the Intent MCP UI (onboarding)** — After the intent.json is confirmed, tell the user: _"Your design intent is saved. You can view and edit it anytime using the Intent button in the preview header bar, or by calling the `design_intent` tool to open the full Intent MCP App."_ This ensures every user knows about the Intent UI from their first experiment.
1. **Identify page type** from the table below. If the user describes an **end-to-end flow** spanning multiple pages (e.g., "browse → create → overview"), use the **Multi-Page Flow** scaffold to keep everything in a single experiment folder.
2. **Check shared patterns first** — before writing any UI, list `coherence-preview/src/patterns/` and read the Composition Patterns table in the coherence-ui SKILL.md. **Always reuse shared pattern components instead of hand-rolling equivalent UI.** Key patterns that must NEVER be reimplemented from scratch:
   - **`PageHeader`** — title row with icon, favorite, more actions, and Copilot suggestions. Import: `import PageHeader from '../../patterns/PageHeader'`
   - **`CopilotSuggestions`** — dismissible pill-shaped suggestion bar with CuiTag, CuiIcon name="copilot", overflow indicator, and dismiss button. **Never hand-roll custom pill buttons.** Import: `import CopilotSuggestions from '../../patterns/CopilotSuggestions'` (or just pass `copilotSuggestions` prop to `PageHeader`)
   - **`CopilotButton`** — header Copilot button. Import: `import CopilotButton from '../copilot-button'`
3. **Copy the matching scaffold or flow folder** from `assets/scaffolds/<scaffold-name>/` (pages) or `assets/flows/<flow-name>/` (flows) into `coherence-preview/src/experiments/<experiment-id>/` — each is a multi-file folder (see File Structure below)
4. **Customize each file** — fill in TODOs with real resource names, nav items, toolbar actions, mock data, and page content
5. **Use the coherence-ui skill** to look up component APIs (fetch the manifest) and design guidance (read reference files)
6. **Use the azure-mock-data skill** (if installed) to generate realistic fake data for tables, cards, and lists
7. **Register the experiment** in `coherence-preview/src/main.tsx` so it appears in the experiment picker (see coherence-live-preview skill)
8. **Self-review: Custom Code Audit** — before running UI verification, review every piece of custom code you wrote and ask three questions for each:
   - **A) Native component?** — Could a `cui-*` component from the manifest replace this custom HTML/CSS? (e.g., custom `<button>` pills → `CuiTag`, custom list → `CuiTable`, custom toggle → `CuiSwitch`, custom tooltip → `CuiTooltip`). Fetch the manifest and search for components that match the function.
   - **B) Existing pattern?** — Does `coherence-preview/src/patterns/` already have a shared component that does this? List the directory and check each file. Also check `references/patterns/*.md` docs.
   - **C) Azure-authentic?** — For genuinely custom UI, verify it follows established approaches: read the component reference docs for each `cui-*` component used (dos/don'ts), compare against similar experiments in `coherence-preview/src/experiments/` for layout conventions, and cross-check attribute values against the manifest's enum types.
   
   Fix any issues found before proceeding. This step catches the most common mistake: re-implementing something that already exists.
9. **Run UI verification** — use the **ui-verification** skill to check all custom styling against the codified standards in `references/standards/styling-standards.md`. Fix any ❌ violations. For any ⚠️ (no standard exists), ask the user if it should be saved as a new standard.

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
