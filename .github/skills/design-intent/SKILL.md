---
name: design-intent
description: "Capture design intent for a new Coherence experiment. Triggers on: \"build me a...\", \"prototype a...\", \"create an Azure page\", \"scaffold a...\", or any request to build a new Azure portal UI. Do NOT build anything — only capture intent and get user confirmation. Your job is done when intent.json exists and the user has confirmed."
---

# Design Intent Capture

**YOUR ONLY GOAL: Create an intent.json and get user confirmation. Do NOT write any code.**

You are the first phase of the experiment lifecycle. Your job is to translate the user's natural-language request into a structured intent document via the MCP Design Intent UI, then wait for the user to review and confirm it. You produce **zero code files**.

## Workflow

### 0. Detect Figma URL (if present) — Figma Mode

If the user's message or the orchestrator's dispatch includes a Figma URL (`figma.com/design/` or `figma.com/file/`), the Figma design will be used as a starting point. The **mode** determines HOW:

- **import** — reproduce the Figma pixel-perfect using Coherence components (default)
- **reference** — analyze the Figma design, identify what's wrong, and build something better

The orchestrator passes the mode via `prefillFigmaMode`. If not set, default to `import`.

#### Common to both modes:

1. **Extract a detailed design spec** by calling the Figma MCP tools:
   - `mcp_figma_get_design_context` — extracts exact layout structure, component hierarchy, spacing values, colors, typography
   - `mcp_figma_get_screenshot` — captures a pixel-level visual reference
   - Optionally `mcp_figma_get_metadata` — gets node names and file overview
2. **Build a comprehensive, actionable spec** including:
   - Exact layout structure (grid, sidebar, content areas with widths/heights)
   - Every visible component and its type — **map each to the likely Coherence `cui-*` component**
   - Spacing values (margins, padding, gaps in pixels) — note closest Coherence spacing tokens
   - Colors (backgrounds, borders, text, status colors, accents) — note closest Coherence color tokens
   - Typography (heading levels, sizes, weights, labels) — note closest Coherence font tokens
   - Data content (column names, metric labels, chart types)
   - Interaction patterns (selected states, hover states, toggles)

#### Import mode specifics:

3. **Derive ALL prefill values from the Figma spec:**
   - `prefillVision` — describe the page as seen in Figma, mentioning which Coherence components will be used to recreate it
   - `prefillSuccessCriteria` — one criterion per major UI section visible in the design
   - `prefillConstraints` — include "Pixel-perfect recreation of Figma design using Coherence components and design tokens" as the first constraint
4. **Pass the URL, mode, and full spec** via `prefillFigmaUrl`, `prefillFigmaMode` (`"import"`), and `prefillFigmaContext`

#### Reference mode specifics:

3. **Analyze the Figma design for issues and improvement opportunities:**
   - Identify UX problems: poor information hierarchy, crowded layouts, inconsistent spacing, unclear CTAs, missing accessibility affordances, non-standard patterns
   - Note what works well (keep these in the improved version)
   - Propose specific improvements using Coherence components and patterns
4. **Derive prefill values that describe the IMPROVED design:**
   - `prefillVision` — describe what the improved version will look like and why it's better
   - `prefillProblem` — describe the UX issues found in the current Figma design
   - `prefillSuccessCriteria` — criteria that measure improvement (e.g. "Clearer information hierarchy", "Better whitespace usage", "Proper Coherence component usage")
   - `prefillConstraints` — include "Use Figma design as reference only — build an improved solution using Coherence best practices" as the first constraint
5. **Pass the URL, mode, and full spec** via `prefillFigmaUrl`, `prefillFigmaMode` (`"reference"`), and `prefillFigmaContext`

The goal in **both** modes: after intent confirmation, the builder has enough detail to proceed without needing to re-call Figma tools. The key difference is whether it reproduces or improves.

This step is optional — skip it if no Figma URL is provided.

### 1. Extract Prefill Values

Parse the user's description and map to these fields:

| Field | Source | Example |
|-------|--------|---------|
| `prefillVision` | What they want to build | "A Key Vault overview page with secrets expiration timeline..." |
| `prefillProblem` | The problem it solves | "Admins can't see expiring secrets at a glance" |
| `prefillSuccessCriteria` | What "done" looks like (array) | ["30/60/90-day expiry buckets", "Certificate health cards"] |
| `prefillConstraints` | Any stated limits (array) | ["Single page", "Mock data only"] |
| `prefillExperimentId` | kebab-case folder name | "key-vault-overview" |
| `prefillFigmaUrl` | Figma URL from user (if any) | "https://www.figma.com/design/51UVR..." |
| `prefillFigmaMode` | "import" or "reference" (if Figma URL present) | "reference" |
| `prefillFigmaContext` | Detailed design spec from Figma (if any) | "Layout: left sidebar 240px, content area with 3-column card grid (gap: 16px). Cards: 320x180px with icon header, metric value, sparkline chart..." |

Generate a title automatically from the description — do NOT ask the user for one.

#### Determine Layout (Side Panel vs Full Width)

Before calling the MCP tool, determine the correct page layout from the user's description. This ensures the builder picks the right scaffold.

**Decision rule:** "Is the user looking at a specific deployed resource or service?"

| Signal in user request | Layout | Add to constraints |
|------------------------|--------|-------------------|
| "overview page", "resource page", "settings page", mentions a specific resource name/type | **Side Panel** | `"Layout: side-panel (resource-scoped page with CuiSideNav)"` |
| "home page", "create flow", "marketplace", "browse page", "landing page", "wizard" | **Full Width** | `"Layout: full-width (portal-level page, no section nav)"` |
| Mentions "section nav", "left navigation", "side navigation" | **Side Panel** | `"Layout: side-panel"` |
| Service blade (Monitor, Defender, etc.) | **Side Panel (collapsible)** | `"Layout: service-blade (collapsible sidebar)"` |

Add the layout constraint to `prefillConstraints` so it persists into `intent.json` and the builder can read it without guessing.

### 2. Call the `design_intent` MCP Tool

Call `design_intent` with all prefill parameters. This opens the interactive Intent App UI in the user's browser with your best guesses pre-populated.

### 3. Ask the User for Acceptance

The MCP UI auto-saves all edits to intent.json in real-time — there are no Save or Accept buttons. Once the form is open, tell the user:

> _"The Intent App is open with your experiment pre-filled. Feel free to review and edit the vision, problem, success criteria, and constraints — changes are saved automatically. Do you accept this intent?"_

**STOP HERE.** Do not proceed until the user confirms acceptance in chat.

### 4. Verify intent.json Exists

Read `coherence-preview/src/experiments/<experimentId>/intent.json` to confirm it was created.

- **If it exists:** Tell the user: _"Your design intent is accepted. Moving to the build phase now."_ Then immediately proceed to the BUILD phase — do not wait for the user to say "build it".
- **If it does NOT exist:** Tell the user: _"I don't see the intent.json yet. Please click Accept in the Intent App, or let me re-open it."_ Re-call the `design_intent` MCP tool.

### 5. STOP

Your phase is complete. Do not proceed to building.

## Hard Boundaries

These restrictions define what this skill can and cannot do:

- **Do NOT** create `.tsx`, `.ts`, or `.css` files
- **Do NOT** edit `main.tsx`
- **Do NOT** call `create_file` for anything except verifying/fixing `intent.json` location
- **Do NOT** write mock data, styles, components, or page content
- **Do NOT** proceed to implementation — that is the `azure-portal-builder` skill's job
- **Do NOT** generate intent.json manually — always use the `design_intent` MCP tool so the user gets the interactive UI

## Troubleshooting

| Issue | Fix |
|-------|-----|
| intent.json at wrong path (e.g., `mcp-server/...`) | Copy it to `coherence-preview/src/experiments/<id>/intent.json` |
| User says "just build it, skip the intent" | Explain the intent is the primary instruction source and takes 30 seconds. Re-open the form. |
| User already has an intent.json | Read it, confirm it matches their request, and tell them to say "build it" |
