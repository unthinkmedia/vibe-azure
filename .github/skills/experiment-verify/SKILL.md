---
name: experiment-verify
description: "Verify a built experiment against Coherence styling standards, accessibility rules, and intent success-criteria effectiveness. Only use AFTER the azure-portal-builder skill has produced a compiling experiment. Triggers on: \"verify it\", \"check the UI\", \"run verification\", or when dispatched by the experiment-orchestrator. Delegates to the ui-verification skill for the full check, then grades success criteria with actionable feedback."
---

# Experiment Verify

Gate-checks a built experiment then delegates to the `ui-verification` skill for full styling, accessibility, and visual verification.

## Step 0: Verify Build Exists (HARD GATE)

Check that **both** of these files exist:

1. `coherence-preview/src/experiments/<id>/intent.json`
2. `coherence-preview/src/experiments/<id>/index.tsx`

**If either is missing: STOP.** Tell the user:

> _"Cannot verify — the experiment is not fully built. Say **'build it'** first."_

Also confirm the experiment is registered in `coherence-preview/src/main.tsx` (grep for the experiment id in the `experiments` array).

## Step 1: Confirm Build Compiles

Run a quick build check:

```bash
cd coherence-preview && npx vite build --mode development
```

If it fails, tell the user to fix build errors first. Do NOT fix them yourself — that's the builder skill's job.

## Step 1.5: Ensure Dev Server Is Running

The visual verification in Step 2 requires the `coherence-preview` Vite dev server. **Check whether it is already running before starting a new one.**

1. Run: `lsof -i :5175 2>/dev/null | grep LISTEN`
2. If output shows a process listening → the server is already running. Move on.
3. If no output → start the server as a background process:

```bash
cd coherence-preview && npx vite --port 5175
```

4. Verify it responds: `curl -s -o /dev/null -w "%{http_code}" http://localhost:5175/`
   - If `200` → proceed
   - If not → kill and restart, or check for port conflicts

**Do NOT skip this step.** The ui-verification skill's visual checks (Playwright, Simple Browser) will fail without a running server.

## Step 2: Delegate to ui-verification Skill

Run the **full** `ui-verification` skill workflow (Steps 0–7):

1. **Step 0** — Custom Code Audit (native components, shared patterns, experiment conventions)
2. **Steps 1–5** — Static analysis (styling standards registry + manifest + theme CSS)
3. **Step 6** — Visual verification (Playwright + VS Code Simple Browser)
4. **Step 7** — Final confirmation

Follow all instructions in the `ui-verification` skill exactly. Do not skip steps.

## Step 3: Grade Intent Success Criteria Effectiveness

After UI verification passes, evaluate the experiment against `intent.json` success criteria.

1. Read `coherence-preview/src/experiments/<id>/intent.json`
2. Extract `successCriteria` array
3. For each criterion, grade implementation effectiveness on a 0-5 scale:

| Score | Meaning |
|-------|---------|
| 5 | Fully met, production-ready behavior and polish |
| 4 | Met, minor polish or edge-case gaps |
| 3 | Partially met, notable functionality or UX gaps |
| 2 | Mostly missing, only basic placeholder implementation |
| 1 | Not implemented (criterion intent not represented) |
| 0 | Not verifiable from code/runtime evidence |

For each criterion include:
- **Evidence** (specific file/component/runtime behavior)
- **Gap summary** (what is missing)
- **Actionable feedback** (concrete next fix, not generic advice)

Use this report format:

```markdown
## Success Criteria Effectiveness Scorecard

| # | Success Criterion | Score (0-5) | Evidence | Actionable Feedback |
|---|-------------------|-------------|----------|---------------------|
| 1 | Threat summary bar ... | 4 | `PageContent.tsx` renders 3 KPI cards with counts | Add delta trend and tooltip definitions for each metric |
| 2 | Geographic attack map ... | 3 | Country list exists, no map visualization | Replace list with map panel + legend using existing chart/pattern approach |
```

Then compute an overall score:

- `overallScore = sum(scores) / max(1, numberOfCriteria)`
- `effectivenessPercent = (overallScore / 5) * 100`

Interpretation bands:
- `90-100%`: Ready to share
- `75-89%`: Strong, needs minor refinement
- `50-74%`: Functional but important gaps remain
- `<50%`: Needs significant rework before sharing

If `successCriteria` is empty, report:

> _"No success criteria were defined in intent.json, so effectiveness grading is skipped."_

### Step 3a: Emit Machine-Readable Scorecard

In addition to the markdown table, emit a JSON report that follows:

- Schema: `.github/skills/experiment-verify/success-criteria-scorecard.schema.json`
- Latest snapshot path: `coherence-preview/src/experiments/<id>/verification/success-criteria-latest.json`
- History path: `coherence-preview/src/experiments/<id>/verification/success-criteria-history.json`

Write `success-criteria-latest.json` on every verify run.

Maintain `success-criteria-history.json` as an array of snapshots in chronological order (oldest first).

If `success-criteria-history.json` does not exist, create it with the current snapshot as the first entry.

Required snapshot fields:

| Field | Type | Notes |
|-------|------|-------|
| `experimentId` | string | From folder/id |
| `intentUpdatedAt` | string \| null | From `intent.json.updatedAt` when present |
| `verifiedAt` | string | ISO timestamp for this verify run |
| `overallScore` | number | 0-5 average |
| `effectivenessPercent` | number | 0-100 |
| `band` | string | readiness interpretation band |
| `criteria` | array | One row per success criterion |
| `summary` | object | Counts by score band |

Each `criteria[]` item must include:

| Field | Type | Notes |
|-------|------|-------|
| `id` | string | Stable slug (derive from criterion text) |
| `criterion` | string | Original success criterion text |
| `score` | integer | 0-5 |
| `evidence` | string | Concrete implementation evidence |
| `gap` | string | What is missing |
| `actionableFeedback` | string | Next concrete fix |

### Step 3b: Compute Improvement Delta

If a previous snapshot exists in `success-criteria-history.json`, compute and report:

- Overall delta: `current.effectivenessPercent - previous.effectivenessPercent`
- Per-criterion score delta by matching `criteria.id`
- Newly added criteria and removed criteria

Add a short markdown section:

```markdown
## Improvement Since Last Verification

- Overall effectiveness: +8.0 points (76.0% -> 84.0%)
- Improved: `geographic-attack-map` (+1)
- Regressed: none
- New criteria: none
- Removed criteria: none
```

If no previous snapshot exists, report:

> _"This is the first recorded effectiveness snapshot for this experiment."_

### Step 3c: Open Formatted MCP Report UI

After saving JSON snapshots, open the MCP app:

- Tool: `browse_verification_reports`
- Input: `{ "experimentId": "<id>" }`

This gives the user a formatted, interactive report view (scorecard + trend) suitable for demos and review sessions.

## Step 4: Report & Hand Off

After verification completes, tell the user:

> _"✅ Verification complete. [N] checks passed, [M] violations fixed, [K] new standards saved. Success criteria effectiveness: [P]% ([overallScore]/5)."_
>
> _"A machine-readable scorecard was saved for trend tracking at `verification/success-criteria-latest.json` and appended to `verification/success-criteria-history.json`."_
>
> _Say **'deploy it'** to publish to Azure Static Web Apps, or **'share it'** to get a shareable link."_

## Hard Boundaries

- **Do NOT** create or modify `intent.json`
- **Do NOT** call the `design_intent` MCP tool
- **Do NOT** deploy to Azure Static Web Apps
- **Do NOT** fix build errors — send the user back to the build phase
- You MAY fix styling/accessibility violations found during verification (that's the whole point)
