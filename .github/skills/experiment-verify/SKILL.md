---
name: experiment-verify
description: "Verify a built experiment against Coherence styling standards and accessibility rules. Only use AFTER the azure-portal-builder skill has produced a compiling experiment. Triggers on: \"verify it\", \"check the UI\", \"run verification\", or when dispatched by the experiment-orchestrator. Delegates to the ui-verification skill for the full check."
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

## Step 2: Delegate to ui-verification Skill

Run the **full** `ui-verification` skill workflow (Steps 0–7):

1. **Step 0** — Custom Code Audit (native components, shared patterns, experiment conventions)
2. **Steps 1–5** — Static analysis (styling standards registry + manifest + theme CSS)
3. **Step 6** — Visual verification (Playwright + VS Code Simple Browser)
4. **Step 7** — Final confirmation

Follow all instructions in the `ui-verification` skill exactly. Do not skip steps.

## Step 3: Report & Hand Off

After verification completes, tell the user:

> _"✅ Verification complete. [N] checks passed, [M] violations fixed, [K] new standards saved."_
>
> _Say **'deploy it'** to publish to Azure Static Web Apps, or **'share it'** to get a shareable link."_

## Hard Boundaries

- **Do NOT** create or modify `intent.json`
- **Do NOT** call the `design_intent` MCP tool
- **Do NOT** deploy to Azure Static Web Apps
- **Do NOT** fix build errors — send the user back to the build phase
- You MAY fix styling/accessibility violations found during verification (that's the whole point)
