---
name: azure-experiment-orchestrator
description: "Orchestrate the full Azure portal experiment lifecycle: [ingest →] intent → build → verify → deploy. Supports both greenfield (no URL — start from scratch) and brownfield (URL provided — replicate an existing page first). Use when the user asks to build, create, prototype, or mock an Azure portal page. Also triggers on: \"build me an Azure page\", \"create an Azure portal prototype\", \"prototype a resource blade\", or any request that includes a URL to azure.microsoft.com, portal.azure.com, or figma.com. Detects the current phase automatically and dispatches to the correct phase-specific skill."
---

# Experiment Orchestrator

State machine that manages the full lifecycle of an Azure portal experiment. Supports two scenarios:

- **Greenfield** (no reference URL): Start from scratch → INTENT → BUILD → VERIFY → DEPLOY
- **Brownfield** (reference URL provided): Capture existing page → pre-populate intent → BUILD → VERIFY → DEPLOY

Each phase is handled by a dedicated skill with hard boundaries — the orchestrator never performs phase work itself.

## Phase Map

```
                    ┌─────────────────────────────┐
                    │  User provides a URL?        │
                    └──────────┬──────────────────-┘
                         │              │
                        YES             NO
                         │              │
                         ▼              │
                      INGEST            │
                    (visual-            │
                     ingest             │
                     skill)             │
                         │              │
                         ▼              ▼
                      INTENT  ←────────┘
                    (coherence-design-intent)
                         │
                         ▼
                       BUILD
                    (azure-portal-builder)
                         │
                         ▼
                      VERIFY
                    (coherence-experiment-verify)
                         │
                         ▼
                      DEPLOY
                    (azure-experiment-deploy)
```

**INGEST is optional.** It only runs when the user provides a reference URL (Figma or web). In greenfield mode, the orchestrator skips directly to INTENT.

## Step 1: Identify the Experiment

Extract the experiment ID from the user's request:

- If the user names a specific experiment, use that ID (kebab-case)
- If the user describes a new page to build, derive an ID from the description (e.g., "Azure Key Vault overview" → `key-vault-overview`)
- If ambiguous, ask the user: _"Which experiment? [list recent experiments from main.tsx]"_

### Detect Reference URL (Brownfield vs Greenfield)

Check if the user's message contains ANY URL. This determines the scenario:

| URL Pattern | Scenario | Capture Method |
|-------------|----------|----------------|
| `figma.com/design/*` or `figma.com/file/*` | Brownfield (Figma) | Figma MCP tools (existing path) |
| `figma.com/board/*` | Brownfield (FigJam) | `mcp_figma_get_figjam` |
| `portal.azure.com/*` | Brownfield (Azure Portal) | `visual-ingest` skill via agent-browser |
| `azure.microsoft.com/*` | Brownfield (Azure Marketing) | `visual-ingest` skill via agent-browser |
| `*.azure.com/*` | Brownfield (Azure Service) | `visual-ingest` skill via agent-browser |
| Any other web URL | Brownfield (Generic Web) | `visual-ingest` skill via agent-browser |
| No URL | **Greenfield** | Skip INGEST, go straight to INTENT |

#### Greenfield Path (No URL)

No reference URL → skip INGEST entirely. Proceed to Step 2 (Phase Detection) and dispatch to INTENT as usual. This is the existing behavior — nothing changes for users who don't provide a URL.

#### Brownfield Path — Figma URL

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

#### Brownfield Path — Web URL (Azure Portal, Azure Marketing, or any web page)

If the user's message contains a web URL (not Figma), dispatch to the **visual-ingest** skill:

> _"I see a web URL — switching to brownfield mode. I'll capture the page and use it as the starting point for your experiment."_

**Step A: Dispatch to visual-ingest skill.**

The `visual-ingest` skill handles the entire capture pipeline:
1. Opens the page in an **external Chromium browser** (NOT VS Code's embedded browser — Microsoft Entra ID auth is blocked in embedded webviews)
2. User authenticates manually in the external browser window (MFA, Conditional Access, etc.)
3. Takes screenshots and accessibility snapshots after auth completes
4. Analyzes the page structure and maps elements to Coherence components
5. Produces a structured reference document
6. Generates prefill values for the intent form

**Step B: Receive the reference document from visual-ingest.**

The visual-ingest skill returns:
- `webUrl` — the original URL
- `webContext` — the structured reference document (layout, component inventory, content, visual properties)
- Derived prefill values for all intent fields

**Step C: Determine the mode from the user's prompt.**

| Mode | Signal words in prompt | What it means |
|------|----------------------|---------------|
| **import** | "build this", "reproduce", "replicate", "recreate", "make this", "copy this", or just a URL with no qualifying language | Replica of the existing page using Coherence components |
| **reference** | "improve", "redesign", "do something better", "use as inspiration", "as a starting point to improve", "analyze" | Use the page as reference, build something better |

**Default:** `import` — brownfield's primary use case is replicating what exists.

**Step D: Pass the reference to the intent phase** via `prefillWebUrl` and `prefillWebContext` on the `design_intent` tool call, along with all derived prefill values.

The intent form opens pre-populated with the captured page structure. The user reviews, adjusts (e.g., changes mode from import to reference, removes sections they don't want), and confirms.

**⚠️ HARD STOP after INGEST:** After the visual-ingest skill completes and the intent form is open:

> _"I've captured the page and pre-populated the intent form. Review and adjust — changes are auto-saved. Do you accept this intent?"_

**STOP. END YOUR TURN.** Wait for user confirmation before proceeding to BUILD.

## Step 2: Detect Current Phase

### Step 2a: Workspace Detection

Before checking files, determine which workspace layout you're in:

| Check | Workspace Type | Experiment Path |
|-------|---------------|-----------------|
| `coherence-preview/src/experiments/` folder exists | **Monorepo** | `coherence-preview/src/experiments/<id>/` |
| `experiments/` folder exists (no `coherence-preview/` prefix) | **Standalone** | `experiments/<id>/` |
| Neither exists | **Standalone (fresh)** | `experiments/<id>/` (will be created) |

Set `EXP_ROOT` to the detected experiment path prefix for all subsequent filesystem checks.

**If standalone:** Also check if `main.tsx` exists locally for registration checks. If not, use the `list_experiments` MCP tool to check if the experiment is already registered in the repo.

### Step 2b: Phase Detection

⚠️ **CRITICAL: You MUST actually check the filesystem using tools (list_dir, read_file) — do NOT skip this step or assume a phase. A "build me a page" request from the user does NOT mean you're in the BUILD phase — it almost always starts at INTENT.**

Check the filesystem to determine which phase the experiment is in:

| Check | Phase |
|-------|-------|
| `<EXP_ROOT>/<id>/` folder does **not** exist | **INTENT** — nothing started |
| `intent.json` exists but `index.tsx` does **not** | **BUILD** — intent captured, ready to build |
| `index.tsx` exists and experiment is registered | **VERIFY** — built, ready to verify |
| All above exist and build compiles | **DEPLOY** — verified, ready to deploy |

Run these checks in order:

```
1. Does <EXP_ROOT>/<id>/intent.json exist?
   NO  → Phase = INTENT
   YES → continue

2. Does <EXP_ROOT>/<id>/index.tsx exist?
   NO  → Phase = BUILD
   YES → continue

3. Is <id> registered?
   - Monorepo: check coherence-preview/src/main.tsx experiments array
   - Standalone: use list_experiments MCP tool to check repo
   NO  → Phase = BUILD  (partially built, registration missing)
   YES → continue

4. Does the build succeed?
   - Monorepo: cd coherence-preview && npx vite build --mode development
   - Standalone: skip (build runs on GitHub Actions after push)
   NO  → Phase = BUILD  (build broken)
   YES → Phase = VERIFY  (or DEPLOY if user explicitly asked to deploy/share)
```

**Exception:** If the user explicitly says "deploy", "share", "publish", or "host", and the experiment is at VERIFY or later, jump to Phase = DEPLOY.

## Step 3: Dispatch to Phase Skill

Based on the detected phase, delegate to the appropriate skill:

### Phase: INTENT

> _"Starting design intent capture for `<id>`..."_

Invoke the **coherence-design-intent** skill. This will:
1. Call the `design_intent` MCP tool with the user's description
2. Wait for user to click **Accept** in the intent UI
3. Save `intent.json` to the experiment folder

**After completion:** Re-run Step 2 to detect the next phase. If `intent.json` now exists:

> _"Design intent captured and confirmed. Ready to build the experiment? Say **'build it'** to proceed."_

**⚠️ STOP HERE. END YOUR TURN.** Do not auto-advance to BUILD. Wait for the user's explicit confirmation before proceeding.

**Why this gate exists:** On 2026-03-05, the agent barreled through INTENT → BUILD → DEPLOY in a single turn without any user confirmation at phase boundaries. Every phase transition is now a hard stop requiring explicit user approval.

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

Invoke the **coherence-experiment-verify** skill. This will:
1. Run the custom code audit
2. Run static analysis against standards, manifest, and theme CSS
3. Run visual verification via Playwright
4. Fix any violations found
5. Grade all intent success criteria (0-5) with actionable feedback
6. Report results

**After completion:** Tell the user:

> _"✅ Verification complete. Say **'deploy it'** to publish, **'verify again'** to re-check, or **'audit patterns'** to check for cross-experiment duplication."_
>
> _"The verification report now includes a Success Criteria Effectiveness Scorecard with per-criterion grades, trend deltas vs the previous run, and machine-readable JSON snapshots for tracking improvement over time."_

**If user says "audit patterns":** Dispatch the **Coherence Pattern Audit** sub-agent:

```
runSubagent("Coherence Pattern Audit",
  "Audit experiment <id> at <EXP_ROOT>/<id>/.
   Cross-reference shared patterns, check mandatory imports,
   compare against similar experiments, identify extraction candidates.")
```

Present the audit report to the user. If extraction candidates are found, offer to create shared patterns via the `coherence-pattern-creator` skill.

### Phase: DEPLOY

> _"Deploying experiment `<id>` to Azure Static Web Apps..."_

Invoke the **azure-experiment-deploy** skill. This will:
1. Create a feature branch `experiment/<id>` and push experiment files
2. Open a pull request targeting `main`
3. GitHub Actions deploys a **staging preview** on the PR
4. Return the PR link and staging preview URL

The user reviews the staging preview, then **merges the PR** to publish to the production gallery.

**After completion:** Report the URL and end.

## Step 4: Phase Transition

After each phase skill completes, **always re-run Step 2** to detect the current phase. This handles:

- Phases that complete successfully → advance to next phase
- Phases that fail or require user input → stay in current phase
- User manually fixing files between phases → correct detection

**⚠️ HARD RULE: Every phase transition is a MANDATORY HARD STOP.**

| Scenario | Action |
|----------|--------|
| INTENT completed | **STOP. END YOUR TURN.** Ask: _"Intent captured. Ready to build?"_ Wait for explicit confirmation. |
| BUILD completed | **STOP. END YOUR TURN.** Ask: _"Build complete. Want me to run verification?"_ Wait for explicit confirmation. |
| VERIFY completed | **STOP. END YOUR TURN.** Ask: _"Verification complete. Want to deploy?"_ Wait for explicit confirmation. |
| User's original request implies full pipeline | Still stop at EVERY boundary. "Build me a page" means start at INTENT, stop, wait, then BUILD on confirmation, stop, wait, etc. |

**Never auto-advance between ANY phases.** Every transition requires the user to explicitly say "yes", "go ahead", "build it", "verify it", "deploy it", or equivalent.

**Why this rule exists (2026-03-05 incident):** The agent received "build me a page" and executed the entire pipeline — intent capture, code generation, PR creation, and cloud deployment — in a single turn without stopping once. The user never reviewed the intent, never previewed the build, and never approved the deployment. All phase gates now require the agent to END ITS TURN and yield to the user.

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

| User says | Scenario | Dispatches to |
|-----------|----------|---------------|
| "Build me an Azure X page" | Greenfield | Phase detection → likely INTENT |
| "Build using this Figma URL" | Brownfield (Figma) | Figma extraction → INTENT (import mode) |
| "Take a look at this Figma and improve it" | Brownfield (Figma) | Figma extraction → INTENT (reference mode) |
| "Replicate this Azure portal page" + URL | Brownfield (Web) | visual-ingest → INTENT (import mode) |
| "Use this page as a starting point" + URL | Brownfield (Web) | visual-ingest → INTENT (import mode) |
| "Improve on this page" + URL | Brownfield (Web) | visual-ingest → INTENT (reference mode) |
| "Ingest this page" + URL | Brownfield (Web) | visual-ingest → INTENT |
| Just a URL with no other context | Brownfield | Detect URL type → visual-ingest or Figma → INTENT (import mode) |
| "Create an intent for X" | Greenfield | INTENT (coherence-design-intent skill) |
| "Build it" / "Implement it" | Either | BUILD (azure-portal-builder skill) |
| "Verify it" / "Check the UI" | Either | VERIFY (coherence-experiment-verify skill) |
| "Deploy it" / "Share it" | Either | DEPLOY (azure-experiment-deploy skill) |
| "Start over" | Either | Delete experiment folder, re-detect → INTENT |
