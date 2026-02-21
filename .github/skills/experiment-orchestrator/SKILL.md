---
name: experiment-orchestrator
description: "Orchestrate the full Azure portal experiment lifecycle: intent → build → verify → deploy. Use when the user asks to build, create, prototype, or mock an Azure portal page. Also triggers on: \"build me an Azure page\", \"create an Azure portal prototype\", \"prototype a resource blade\", or any request that would have previously triggered the azure-portal-prototyper skill. Detects the current phase automatically and dispatches to the correct phase-specific skill."
---

# Experiment Orchestrator

State machine that manages the full lifecycle of an Azure portal experiment across four phases. Each phase is handled by a dedicated skill with hard boundaries — the orchestrator never performs phase work itself.

## Phase Map

```
INTENT  →  BUILD  →  VERIFY  →  DEPLOY
  ↑          ↑         ↑          ↑
  │          │         │          │
design-   azure-    experiment-  experiment-
intent    portal-   verify       deploy
skill     builder                skill
          skill
```

## Step 1: Identify the Experiment

Extract the experiment ID from the user's request:

- If the user names a specific experiment, use that ID (kebab-case)
- If the user describes a new page to build, derive an ID from the description (e.g., "Azure Key Vault overview" → `key-vault-overview`)
- If ambiguous, ask the user: _"Which experiment? [list recent experiments from main.tsx]"_

### Detect Figma URL

If the user's message contains a Figma URL (matching `figma.com/design/` or `figma.com/file/`):

**Step A: Determine the Figma Mode from the user's prompt.**

The mode controls the ENTIRE downstream pipeline — get it right.

| Mode | Signal words in prompt | What it means |
|------|----------------------|---------------|
| **import** | "build this", "reproduce", "import", "recreate", "make this", "implement this design", or just a Figma link with no qualifying language | Pixel-perfect reproduction using Coherence components |
| **reference** | "take a look", "help me design better", "improve", "what's wrong", "redesign", "do something better", "use as inspiration", "as a starting point to improve", "analyze" | Analyze the Figma, identify issues, and build a better solution |

**If ambiguous** (e.g. "use this Figma for my experiment"), default to **import** — that's the most common intent. The user can change the mode in the Intent App form.

**Step B: Extract a detailed design spec from Figma** before entering the INTENT phase:

1. Call `mcp_figma_get_design_context` with the Figma URL to extract the exact layout structure, component hierarchy, spacing values, colors, and typography
2. Call `mcp_figma_get_screenshot` with the Figma URL to capture a pixel-level visual reference
3. Optionally call `mcp_figma_get_metadata` for file-level overview and node names

**Step C: Build a comprehensive design spec** (not a loose summary — an actionable spec) covering:
   - Exact page layout (grid columns, sidebar widths, content area structure)
   - Every UI component and its placement — **identify the likely Coherence `cui-*` component** for each element (e.g. "left sidebar → CuiDrawer + CuiSideNav", "data table → CuiDataGrid", "tab bar → CuiTabs")
   - Spacing between elements (margins, padding, gaps — with pixel values when available)
   - Colors observed (backgrounds, text, borders, status indicators, accents) — **note the closest Coherence design token** when obvious
   - Typography (headings, body, labels — sizes, weights)
   - Interaction patterns (tabs, toggles, filters, dropdowns, etc.)
   - Data shown (table columns, metric names, chart types)

**In reference mode, ALSO add:**
   - **UX issues** observed (poor information hierarchy, crowded layouts, inconsistent spacing, missing affordances, accessibility concerns, unclear CTAs, etc.)
   - **Improvement opportunities** — what would make this better using Coherence best practices
   - **Anti-patterns** — things the Figma does that violate Coherence guidelines or Azure portal conventions

**Step D: Derive prefill values based on the mode:**

For **import** mode:
   - `prefillVision` — describe the page as seen in Figma, mentioning which Coherence components will be used to recreate it
   - `prefillSuccessCriteria` — one criterion per major UI section visible in the design
   - `prefillConstraints` — include "Pixel-perfect recreation of Figma design using Coherence components and design tokens" as the first constraint

For **reference** mode:
   - `prefillVision` — describe the IMPROVED version of the page, noting what will be different/better
   - `prefillProblem` — describe the UX issues identified in the Figma design
   - `prefillSuccessCriteria` — criteria that measure improvement over the reference (e.g. "Clearer information hierarchy than reference", "Better use of whitespace")
   - `prefillConstraints` — include "Use Figma design as reference only — build an improved solution using Coherence best practices" as the first constraint

**Step E: Determine Layout from Figma structure:**

Examine the Figma design to determine whether the page uses a side panel or full width:
- If the Figma shows a left sidebar with resource/service navigation items → layout is **side-panel**
- If the Figma is full width (home, create wizard, browse) → layout is **full-width**
- If the Figma shows a collapsible service sidebar → layout is **service-blade**
- Add the layout constraint (e.g. `"Layout: side-panel"`) to `prefillConstraints`

See the full decision guide: `coherence-ui/references/patterns/page-layout-decision.md`

**Step F: Pass both the URL, mode, and detailed spec** to the INTENT phase via `prefillFigmaUrl`, `prefillFigmaMode`, and `prefillFigmaContext` on the `design_intent` tool call.

The intent form opens pre-populated. The user reviews, tweaks if needed, and confirms.

## Step 2: Detect Current Phase

⚠️ **CRITICAL: You MUST actually check the filesystem using tools (list_dir, read_file) — do NOT skip this step or assume a phase. A "build me a page" request from the user does NOT mean you're in the BUILD phase — it almost always starts at INTENT.**

Check the filesystem to determine which phase the experiment is in:

| Check | Phase |
|-------|-------|
| `coherence-preview/src/experiments/<id>/` folder does **not** exist | **INTENT** — nothing started |
| `intent.json` exists but `index.tsx` does **not** | **BUILD** — intent captured, ready to build |
| `index.tsx` exists and experiment is in `main.tsx` | **VERIFY** — built, ready to verify |
| All above exist and build compiles | **DEPLOY** — verified, ready to deploy |

Run these checks in order:

```
1. Does coherence-preview/src/experiments/<id>/intent.json exist?
   NO  → Phase = INTENT
   YES → continue

2. Does coherence-preview/src/experiments/<id>/index.tsx exist?
   NO  → Phase = BUILD
   YES → continue

3. Is <id> registered in coherence-preview/src/main.tsx experiments array?
   NO  → Phase = BUILD  (partially built, registration missing)
   YES → continue

4. Does `cd coherence-preview && npx vite build --mode development` succeed?
   NO  → Phase = BUILD  (build broken)
   YES → Phase = VERIFY  (or DEPLOY if user explicitly asked to deploy/share)
```

**Exception:** If the user explicitly says "deploy", "share", "publish", or "host", and the experiment is at VERIFY or later, jump to Phase = DEPLOY.

## Step 3: Dispatch to Phase Skill

Based on the detected phase, delegate to the appropriate skill:

### Phase: INTENT

> _"Starting design intent capture for `<id>`..."_

Invoke the **design-intent** skill. This will:
1. Call the `design_intent` MCP tool with the user's description
2. Wait for user to click **Accept** in the intent UI
3. Save `intent.json` to the experiment folder

**After completion:** Re-run Step 2 to detect the next phase. If `intent.json` now exists, **auto-advance to BUILD immediately** — the user's Accept click is the explicit confirmation.

### Phase: BUILD

> _"Intent confirmed. Building experiment `<id>`..."_

Invoke the **azure-portal-builder** skill. This will:
1. Read `intent.json` as the primary instruction source
2. Identify page type and check shared patterns
3. Generate all experiment files
4. Register in `main.tsx`
5. Run a build check

**After completion:** Re-run Step 2. If `index.tsx` exists, is registered, and compiles, the phase advances to VERIFY.

### Phase: VERIFY

> _"Build complete. Running UI verification for `<id>`..."_

Invoke the **experiment-verify** skill. This will:
1. Run the custom code audit
2. Run static analysis against standards, manifest, and theme CSS
3. Run visual verification via Playwright
4. Fix any violations found
5. Grade all intent success criteria (0-5) with actionable feedback
6. Report results

**After completion:** Tell the user:

> _"✅ Verification complete. Say **'deploy it'** to publish, or make changes and say **'verify again'**."_
>
> _"The verification report now includes a Success Criteria Effectiveness Scorecard with per-criterion grades, trend deltas vs the previous run, and machine-readable JSON snapshots for tracking improvement over time."_

### Phase: DEPLOY

> _"Deploying experiment `<id>` to Azure Static Web Apps..."_

Invoke the **experiment-deploy** skill. This will:
1. Run the share-experiment workflow
2. Return the shareable URL

**After completion:** Report the URL and end.

## Step 4: Phase Transition

After each phase skill completes, **always re-run Step 2** to detect the current phase. This handles:

- Phases that complete successfully → advance to next phase
- Phases that fail or require user input → stay in current phase
- User manually fixing files between phases → correct detection

**Auto-advance rules:**

| Scenario | Action |
|----------|---------|
| INTENT completed (user clicked Accept) | **Always** auto-advance to BUILD |
| BUILD completed | Pause. Ask user if they want to verify. |
| VERIFY completed with 0 violations | Tell user they can deploy. Do not auto-deploy. |
| User's original request implies full pipeline | Advance through INTENT → BUILD (auto after Accept), then pause at VERIFY |

**Never auto-advance to DEPLOY.** Always require explicit user confirmation before deploying.

## Handling Edge Cases

### User Asks to Skip a Phase

> _"I don't need the intent, just build it."_

**Do not skip INTENT.** The intent phase ensures user review via the MCP UI. Say:

> _"The intent step takes ~30 seconds and ensures we're building the right thing. Let me capture it quickly."_

### User Asks to Redo a Phase

> _"The intent is wrong, let me redo it."_

Delete or move the existing `intent.json` and re-run phase detection. The orchestrator will drop back to INTENT.

### Experiment Already Exists at a Later Phase

> _"Build me an Azure Key Vault page" (but key-vault-overview already exists with index.tsx)_

Detect the phase as VERIFY (or DEPLOY). Tell the user:

> _"The experiment `key-vault-overview` already exists and is built. Current phase: VERIFY. Want to run verification, or start a new experiment with a different ID?"_

### Multiple Experiments in One Session

Track each experiment independently by ID. If the user switches topics, re-run Step 1 to identify the new experiment and Step 2 to detect its phase.

## Quick Reference

| User says | Dispatches to |
|-----------|---------------|
| "Build me an Azure X page" | Phase detection → likely INTENT |
| "Build using this Figma URL" | Figma extraction → INTENT (import mode — pixel-perfect) |
| "Take a look at this Figma and improve it" | Figma extraction → INTENT (reference mode — analyze & improve) |
| "Create an intent for X" | INTENT (design-intent skill) |
| "Build it" / "Implement it" | BUILD (azure-portal-builder skill) |
| "Verify it" / "Check the UI" | VERIFY (experiment-verify skill) |
| "Deploy it" / "Share it" | DEPLOY (experiment-deploy skill) |
| "Start over" | Delete experiment folder, re-detect → INTENT |
