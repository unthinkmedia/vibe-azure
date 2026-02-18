---
name: design-intent
description: "Capture design intent for a new Coherence experiment. Triggers on: \"build me a...\", \"prototype a...\", \"create an Azure page\", \"scaffold a...\", or any request to build a new Azure portal UI. Do NOT build anything — only capture intent and get user confirmation. Your job is done when intent.json exists and the user has confirmed."
---

# Design Intent Capture

**YOUR ONLY GOAL: Create an intent.json and get user confirmation. Do NOT write any code.**

You are the first phase of the experiment lifecycle. Your job is to translate the user's natural-language request into a structured intent document via the MCP Design Intent UI, then wait for the user to review and confirm it. You produce **zero code files**.

## Workflow

### 1. Extract Prefill Values

Parse the user's description and map to these fields:

| Field | Source | Example |
|-------|--------|---------|
| `prefillVision` | What they want to build | "A Key Vault overview page with secrets expiration timeline..." |
| `prefillProblem` | The problem it solves | "Admins can't see expiring secrets at a glance" |
| `prefillSuccessCriteria` | What "done" looks like (array) | ["30/60/90-day expiry buckets", "Certificate health cards"] |
| `prefillConstraints` | Any stated limits (array) | ["Single page", "Mock data only"] |
| `prefillExperimentId` | kebab-case folder name | "key-vault-overview" |

Generate a title automatically from the description — do NOT ask the user for one.

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
