---
name: experiment-deploy
description: "Deploy a verified experiment to Azure Static Web Apps. Only use AFTER the experiment-verify skill has confirmed all checks pass. Triggers on: \"deploy it\", \"publish it\", \"share it\", \"host it\", \"get a shareable link\", or when dispatched by the experiment-orchestrator. Delegates to the share-experiment skill for the actual deployment."
---

# Experiment Deploy

Gate-checks a verified experiment then delegates to the `share-experiment` skill for deployment.

## Step 0: Verify Experiment Is Ready (HARD GATE)

Check that **all** of these exist:

1. `coherence-preview/src/experiments/<id>/intent.json` — intent captured
2. `coherence-preview/src/experiments/<id>/index.tsx` — experiment built
3. Experiment is registered in `coherence-preview/src/main.tsx`

**If any is missing: STOP.** Tell the user which phase is incomplete:

| Missing | Message |
|---------|---------|
| `intent.json` | _"No design intent found. Say **'create an intent'** first."_ |
| `index.tsx` | _"Experiment not built. Say **'build it'** first."_ |
| Not in `main.tsx` | _"Experiment not registered. Say **'build it'** to complete registration."_ |

Also confirm the build compiles:

```bash
cd coherence-preview && npx vite build --mode development
```

## Step 1: Delegate to share-experiment Skill

Run the **full** `share-experiment` skill workflow:

1. First-time setup (if not already done): create Azure Static Web App resource, add deployment token, copy config files
2. Deploy via push or PR
3. Construct the shareable link: `https://<app-name>.azurestaticapps.net/#<experiment-id>`

Follow all instructions in the `share-experiment` skill exactly.

## Step 2: Report

After deployment:

> _"✅ Deployed! Your experiment is live at:_
>
> _`https://<app-name>.azurestaticapps.net/#<experiment-id>`"_

## Hard Boundaries

- **Do NOT** create or modify `intent.json`
- **Do NOT** call the `design_intent` MCP tool
- **Do NOT** build experiment code (no creating `.tsx` files)
- **Do NOT** run UI verification
- Your only job is gating + delegating to `share-experiment`
