---
name: azure-portal-builder
description: "Build an Azure portal prototype from a confirmed intent.json. Only use AFTER the design-intent skill has captured and the user has confirmed intent.json. Triggers on: \"build it\", \"implement the experiment\", \"start building\", or when explicitly dispatched by the experiment-orchestrator. Do NOT call the design_intent MCP tool — that is the design-intent skill's job."
---

# Azure Portal Builder

Build complete Azure portal page prototypes from a confirmed design intent. Produces ready-to-run `.tsx` files for the `coherence-preview/` app.

## Step 0: Verify Intent (HARD GATE — MANDATORY FILESYSTEM CHECK)

⚠️ **This step is NON-NEGOTIABLE. You MUST perform it before writing ANY code.**

**Action:** Use a tool to check whether `coherence-preview/src/experiments/<id>/intent.json` exists on disk. Do NOT assume it exists — actually verify with `list_dir` or `read_file`.

**If it does NOT exist: STOP IMMEDIATELY.** Do not create any `.ts` or `.tsx` files. Tell the user:

> _"No design intent found for this experiment. Please say 'create an intent for \<description\>' first."_

**Do NOT call the `design_intent` MCP tool. Do NOT create intent.json yourself.** That is the `design-intent` skill's exclusive responsibility.

**If it exists:** Read the full document and use it as the **PRIMARY INSTRUCTION SOURCE** for all build decisions. Every component choice, layout decision, and mock data selection should trace back to a field in the intent.

**Why this gate exists:** Without it, experiments get built without user review, wasting effort if the design direction was wrong. This gate was added after a real incident where the build phase ran before intent capture.

## Step 1: Identify Page Type

| Page Type | Scaffold | When to Use |
|-----------|----------|-------------|
| Resource Page | `assets/scaffolds/azure-resource-page/` | Default for any Azure resource |
| List Page | `assets/scaffolds/azure-list-page/` | Selectable list + detail layout |
| Overview Page | `assets/scaffolds/azure-overview-page/` | Resource overview/dashboard |
| Marketplace Browse | `assets/scaffolds/azure-marketplace-browse/` | Service catalog, marketplace |
| Create Flow | `assets/flows/azure-create-flow/` | Multi-step creation wizard |
| Multi-Page Flow | `assets/flows/azure-multi-page-flow/` | End-to-end user journeys |

See [references/page-types.md](references/page-types.md) for detailed anatomy.

## Step 2: Check Shared Patterns

**Before writing any UI**, list `coherence-preview/src/patterns/` and check what's available. Mandatory shared patterns — NEVER reimplement:

| Pattern | Import | What it handles |
|---------|--------|-----------------|
| `PageHeader` | `../../patterns/PageHeader` | Title row with icon, star, more-actions, Copilot suggestions |
| `CopilotSuggestions` | `../../patterns/CopilotSuggestions` | Dismissible pill bar (or use `copilotSuggestions` prop on PageHeader) |
| `CopilotButton` | `../copilot-button` | Header Copilot button |

Also read the Composition Patterns table in the coherence-ui SKILL.md.

## Step 3: Build the Experiment

Create the experiment folder at `coherence-preview/src/experiments/<experiment-id>/` with the standard file structure:

### Single-Page Experiments

```
<experiment-id>/
  index.tsx          # CuiAppFrame + Header + Navigation + PageContent
  data.ts            # Types, interfaces, mock data, nav config
  styles.ts          # Scoped CSS as exported string
  Navigation.tsx     # CuiDrawer + CuiSideNav
  PageContent.tsx    # Toolbar + page body
```

### Multi-Page Flow Experiments

```
<experiment-id>/
  index.tsx          # Router switching on subRoute prop
  data.ts            # Shared types & mock data
  styles.ts          # Combined CSS
  pages/
    BrowsePage.tsx
    CreatePage.tsx
    DetailPage.tsx
```

Use the `coherence-ui` skill to look up component APIs (fetch the manifest) and the `azure-mock-data` skill for realistic fake data.

## Step 4: Register the Experiment

Add an entry to the `experiments` array in `coherence-preview/src/main.tsx`:

```tsx
{
  id: '<experiment-id>',
  title: '<Title from intent>',
  description: '<Description from intent>',
  component: lazy(() => import('./experiments/<experiment-id>')),
  date: '<today YYYY-MM-DD>',
},
```

## Step 5: Custom Code Audit

Before handing off to verification, review every piece of custom code:

- **A) Native component?** Could a `cui-*` component replace this? Fetch the manifest and check.
- **B) Existing pattern?** Does `src/patterns/` or `references/patterns/*.md` already handle this?
- **C) Azure-authentic?** Does it follow established experiment conventions?

Fix any issues found.

## Step 6: Build Verification

Run a Vite build to confirm the experiment compiles:

```bash
cd coherence-preview && npx vite build --mode development
```

Fix any compilation errors.

## Step 7: STOP — Hand Off to Verify Phase

Tell the user:

> _"Build complete. The experiment compiles and is registered. Say **'verify it'** to run UI verification, or navigate to `http://localhost:5173#<experiment-id>` to preview."_

**Do NOT run UI verification yourself.** That is the `experiment-verify` skill's job.

## Hard Boundaries

- **Do NOT** call the `design_intent` MCP tool
- **Do NOT** create or modify `intent.json`
- **Do NOT** run UI verification (Steps 1–7 of ui-verification skill)
- **Do NOT** deploy to Azure Static Web Apps
- Your job ends when the experiment compiles and is registered in `main.tsx`

## Output Conventions

- React with `@charm-ux/cui/react` wrappers
- `export default function` in `index.tsx` for lazy loading
- Styles exported as string from `styles.ts`
- Include `body { margin: 0; }` in styles
- Self-contained folders — never import from other experiments
- Iconify URLs for icons (see [references/azure-icons.md](references/azure-icons.md))
- Multi-page flows accept `{ subRoute?: string }` prop, navigate via `window.location.hash`

## Common Customizations

### Standard Side Nav Sections

- **Top:** Overview, Activity log, Access control (IAM), Tags, Diagnose and solve problems
- **Middle:** Resource-specific items
- **Bottom:** Settings (Configuration, Properties, Locks, Export template)

### Azure Terminology

| Element | Label |
|---------|-------|
| Primary action | "Create", "Add", "Save" |
| Destructive action | "Delete", "Remove" |
| Search placeholder | "Search resources, services, and docs (G+/)" |
| Nav toggle aria-label | "toggle navigation" |
| Breadcrumb root | "Home" |
