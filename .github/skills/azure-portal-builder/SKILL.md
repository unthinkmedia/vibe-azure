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

**If intent includes `figmaUrl` + `figmaContext`:** Check `figmaMode` to determine behavior.

---

### FIGMA IMPORT MODE (`figmaMode` = `"import"` or unset)

This is a pixel-perfect import. The Figma design IS the design spec. Your job is to **recreate the entire Figma design using Coherence components and design tokens**.

#### Figma-to-Coherence Mapping Process

Walk through the `figmaContext` spec element by element and map each one to Coherence:

**A) Map every Figma element to a `cui-*` component:**

For each UI element in the Figma design:
1. Read the **coherence-ui** skill's Component Index to find the matching `cui-*` component
2. Fetch the **live API manifest** to get exact attributes, slots, events, and CSS custom properties
3. Read the **component reference doc** for dos/don'ts, accessibility, and composition examples
4. If the Figma element maps to a known **Composition Pattern** (Resource Page Shell, Toolbar, Side Nav, PageHeader, etc.) — use the shared pattern, not a custom rebuild

**Common Figma → Coherence mappings:**

| Figma Element | Coherence Component |
|---------------|---------------------|
| Side navigation / left rail | `CuiDrawer` + `CuiSideNav` + `CuiNavItem` + `CuiNavHeading` |
| Top header bar | `CuiHeader` (or shared `PageHeader` pattern) |
| Breadcrumb trail | `CuiBreadcrumb` + `CuiBreadcrumbItem` |
| Toolbar / action bar | `CuiToolbar` + `CuiButton` + `CuiButtonGroup` |
| Data table | `CuiDataGrid` or `CuiTable` |
| Cards / tiles | `CuiCard` |
| Tabs | `CuiTabs` + `CuiTab` + `CuiTabPanel` |
| Dialog / modal | `CuiDialog` |
| Search box | `CuiSearchBox` |
| Dropdown / select | `CuiSelect` |
| Toggle switch | `CuiSwitch` |
| Message banner | `CuiMessageBar` or `CuiBanner` |
| Tag / chip / badge | `CuiTag` or `CuiBadge` |
| Accordion / collapsible | `CuiAccordion` + `CuiAccordionItem` |
| Text input / form field | `CuiInput` or `CuiTextArea` |
| Progress indicator | `CuiProgressBar` or `CuiSpinner` |
| Tooltip | `CuiTooltip` |
| Menu / context menu | `CuiMenu` + `CuiMenuList` + `CuiMenuItem` |
| Avatar / persona | `CuiAvatar` or `CuiPersona` |
| Tree / hierarchy | `CuiTree` + `CuiTreeItem` |
| Page frame / layout | `CuiAppFrame` + `CuiContentFrame` |
| Pagination | `CuiPagination` |
| Icon | `CuiIcon` (name or Iconify URL) |
| Divider / separator | `CuiDivider` |
| Link | `CuiLink` |
| Checkbox | `CuiCheckbox` |
| Radio buttons | `CuiRadioGroup` + `CuiRadio` |

**B) Map every color, spacing, and typography value to Coherence design tokens:**

- Fetch the **theme CSS** from the coherence-ui skill to find exact token names
- Never hardcode hex colors — use `var(--neutral-foreground1)`, `var(--brand-background1)`, etc.
- Never hardcode font sizes — use `var(--font-size-base300)`, `var(--font-weight-semibold)`, etc.
- Never hardcode spacing — use `var(--spacing-s)`, `var(--spacing-m)`, `var(--spacing-l)`, etc.
- Never hardcode shadows — use `var(--shadow-4)`, `var(--shadow-8)`, etc.
- Never hardcode border radius — use `var(--border-radius-md)`, etc.

**C) Use Coherence composition patterns for page structure:**

- Check `coherence-preview/src/patterns/` for shared components (PageHeader, CopilotSuggestions, etc.)
- Check the coherence-ui skill's **Templates** section (Dashboard, Form, Settings) for page layouts
- Check the coherence-ui skill's **Task Flows** section for multi-step interactions
- Check the coherence-ui skill's **Page Scaffolds** for starter structures

**D) Only use custom HTML/CSS as a last resort:**

If a Figma element does NOT map to any `cui-*` component:
1. First check if a combination of Coherence components can achieve the same result
2. If truly no component exists, build a custom implementation using ONLY Coherence design tokens for styling
3. Document the custom element with a comment: `{/* Custom: no cui-* equivalent for [description] */}`

**E) Match the Figma layout pixel-perfect:**

- Reproduce exact grid structure, column widths, sidebar widths
- Match spacing between elements using Coherence spacing tokens (snap to nearest token value)
- Match colors using Coherence semantic color tokens (find the closest token match)
- Match typography using Coherence font tokens
- Recreate all data content shown in the Figma (table columns, metric values, chart types, labels)

**F) You may call Figma MCP tools during build:**

Call `mcp_figma_get_design_context` or `mcp_figma_get_screenshot` to reference specific details not captured in the initial extraction. Use this when the `figmaContext` is ambiguous about a particular element's exact appearance.

**Priority order for Figma imports:** figmaContext (detailed spec) → Coherence component match → intent vision/criteria → page type scaffolds.

---

### FIGMA REFERENCE MODE (`figmaMode` = `"reference"`)

The Figma design is a **reference to improve upon**, NOT a blueprint to reproduce. Your job is to **analyze what's wrong and build something better** using Coherence components and best practices.

#### How Reference Mode differs from Import Mode:

| Aspect | Import Mode | Reference Mode |
|--------|-------------|----------------|
| Goal | Pixel-perfect recreation | Improved redesign |
| Figma spec usage | Follow it exactly | Understand it, then deviate intentionally |
| Layout decisions | Match Figma layout | Use Coherence templates/scaffolds for better structure |
| Component choices | Map Figma element → `cui-*` 1:1 | Choose the BEST `cui-*` component, even if Figma used something else |
| Spacing/colors | Snap Figma values to nearest token | Use proper Coherence tokens for the context |
| UX issues noted in spec | N/A | Address every one of them |
| Success criteria | "Matches Figma" | "Improves over Figma" |

#### Reference Mode Build Process:

1. **Read `figmaContext` to understand what EXISTS** — the current design, its layout, data shown, and interaction patterns
2. **Read the UX issues / improvement opportunities** noted in the spec by the orchestrator/intent phase
3. **Read the `vision` and `successCriteria`** — these describe the IMPROVED version, not the Figma
4. **Design a better solution** using:
   - Coherence page templates (Dashboard, Form, Settings) for proper structure
   - Coherence composition patterns for standard page elements
   - Shared patterns from `coherence-preview/src/patterns/`
   - Azure portal conventions (standard nav sections, toolbar patterns, breadcrumbs)
5. **Keep what works well** from the Figma — don't change things that are already good
6. **Fix what's broken** — address every UX issue noted in the spec:
   - Better information hierarchy → restructure content with proper heading levels
   - Crowded layouts → apply Coherence spacing tokens, add whitespace
   - Inconsistent patterns → use standard `cui-*` components throughout
   - Missing accessibility → add aria-labels, proper focus order, screen reader support
   - Non-standard UI → replace with established Coherence patterns
7. **Data content**: use the same data topics from the Figma (table columns, metric types) but present them in a better-organized way

**Priority order for Figma references:** intent vision/criteria (the IMPROVED design) → Coherence best practices → figmaContext (what to keep/improve) → page type scaffolds.

**Why this gate exists:** Without it, experiments get built without user review, wasting effort if the design direction was wrong. This gate was added after a real incident where the build phase ran before intent capture.

## Step 1: Identify Page Type

**In Figma Import Mode:** Skip the scaffold table — the Figma design defines the page structure. Read the `figmaContext` to determine the layout instead. Still use the scaffolds as a reference for file structure conventions.

**In Figma Reference Mode:** Use the scaffold table normally — pick the page type that best fits the IMPROVED design, not necessarily what the Figma used.

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

**In Figma Import Mode:** Also read the coherence-ui skill's full Component Index and fetch the live API manifest. You will need to look up exact attributes, slots, and CSS custom properties for each component you map from the Figma design.

**In Figma Reference Mode:** Read the composition patterns and templates to find better alternatives to what the Figma used. Focus on which patterns will address the UX issues identified in the spec.

## Step 3: Build the Experiment

**In Figma Import Mode:** Follow the Figma-to-Coherence Mapping Process from Step 0 above. Build the experiment by systematically walking through the Figma spec and recreating each section using `cui-*` components. Use the coherence-ui skill to look up every component's API before using it.

**In Figma Reference Mode:** Build the experiment from the intent's `vision` and `successCriteria` — these describe the improved design. Use the `figmaContext` to understand the data domain and context (what tables show, what metrics matter), but make your own layout and UX decisions. Where the Figma had issues, build better alternatives.

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
- **D) Design tokens?** Are all colors, spacing, typography, shadows, and borders using Coherence design tokens? No hardcoded values.

**In Figma Import Mode — stricter rules:**
- Every custom HTML element MUST have a comment explaining why no `cui-*` component was used
- Zero hardcoded hex colors, pixel font sizes, or pixel spacing — all must use Coherence tokens
- Compare the built output against the Figma screenshot — call `mcp_figma_get_screenshot` and visually verify the layout matches

**In Figma Reference Mode — different audit focus:**
- Verify every UX issue from the `figmaContext` was addressed (don't just reproduce the problems)
- Confirm the built output is meaningfully DIFFERENT from the Figma in the areas flagged for improvement
- Verify the data domain matches (same types of metrics, table columns, etc.) even if the presentation is different
- All design token and component rules still apply

Fix any issues found.

## Step 6: Build Verification

Run a Vite build to confirm the experiment compiles:

```bash
cd coherence-preview && npx vite build --mode development
```

Fix any compilation errors.

## Step 7: Ensure Dev Server & Hand Off to Verify Phase

**Before telling the user to preview, ensure the dev server is running:**

1. Run: `lsof -i :5175 2>/dev/null | grep LISTEN`
2. If a process is listening → server is already running.
3. If nothing is listening → start the server as a background process:

```bash
cd coherence-preview && npx vite --port 5175
```

4. Verify it responds: `curl -s -o /dev/null -w "%{http_code}" http://localhost:5175/`

Then tell the user:

> _"Build complete. The experiment compiles and is registered. Say **'verify it'** to run UI verification, or navigate to `http://localhost:5175#<experiment-id>` to preview."_

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
