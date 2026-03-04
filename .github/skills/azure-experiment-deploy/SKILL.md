---
name: azure-experiment-deploy
description: "Deploy a verified experiment to Azure Static Web Apps via pull request. Only use AFTER the coherence-experiment-verify skill has confirmed all checks pass. Triggers on: \"deploy it\", \"publish it\", \"share it\", \"host it\", \"get a shareable link\", or when dispatched by the azure-experiment-orchestrator. Creates a PR to GitHub, where GitHub Actions builds and deploys a staging preview. Merging the PR promotes to production."
---

# Experiment Deploy

Create a pull request with the experiment files. GitHub Actions deploys a **staging preview** automatically. Merging the PR promotes to the production gallery.

## Architecture

```
Skill creates branch + PR via GitHub MCP tools
       ↓
GitHub repo (experiment/<id> branch)
       ↓
GitHub Actions detects PR with coherence-preview/** changes
       ↓
Vite build → Azure SWA staging environment
       ↓
Staging preview: https://thankful-mud-0be9d9a1e-<PR_NUMBER>.westus2.1.azurestaticapps.net/#<id>
       ↓
User reviews → merges PR → production gallery
       ↓
Production: https://thankful-mud-0be9d9a1e-preview.westus2.1.azurestaticapps.net/#<id>
```

## Step 0: Verify Experiment Is Ready (HARD GATE)

Check that **all** of these exist locally:

1. `<EXP_ROOT>/experiments/<id>/intent.json` — intent captured
2. `<EXP_ROOT>/experiments/<id>/index.tsx` — experiment built

**If any is missing: STOP.** Tell the user which phase is incomplete:

| Missing | Message |
|---------|---------|
| `intent.json` | _"No design intent found. Say **'create an intent'** first."_ |
| `index.tsx` | _"Experiment not built. Say **'build it'** first."_ |

### Workspace Detection

Detect whether we're in the monorepo or a standalone workspace:

| Signal | Workspace Type | `<EXP_ROOT>` |
|--------|---------------|---------------|
| `coherence-preview/src/experiments/<id>/` exists locally | **Monorepo** | `coherence-preview/src` |
| `experiments/<id>/` or `src/experiments/<id>/` exists locally | **Standalone** | `.` or `src` |

For **standalone workspaces**, the local path `experiments/<id>/` maps to `coherence-preview/src/experiments/<id>/` in the repo.

## Step 1: Collect Experiment Files

Read the experiment folder to gather all files to push:

```
<EXP_ROOT>/experiments/<id>/
  index.tsx
  data.ts          (if exists)
  styles.ts        (if exists)
  intent.json
  Navigation.tsx   (if exists)
  PageContent.tsx  (if exists)
  pages/           (if exists — multi-page flows)
    *.tsx
```

Read each file's content.

## Step 2: Create Branch and Push Experiment Files

### 2a: Create a feature branch

Use `mcp_github_github_create_branch` to create a branch from `main`:

```
owner: "unthinkmedia"
repo: "vibe-azure"
branch: "experiment/<id>"
from: "main"
```

If the branch already exists (e.g. a previous deploy attempt), that's fine — reuse it.

### 2b: Push experiment files to the branch

Use `mcp_github_github_push_files` to push all experiment files in a single commit:

```
owner: "unthinkmedia"
repo: "vibe-azure"
branch: "experiment/<id>"
message: "feat: add experiment <id>"
files: [
  { path: "coherence-preview/src/experiments/<id>/index.tsx", content: "<file content>" },
  { path: "coherence-preview/src/experiments/<id>/data.ts", content: "<file content>" },
  { path: "coherence-preview/src/experiments/<id>/styles.ts", content: "<file content>" },
  { path: "coherence-preview/src/experiments/<id>/intent.json", content: "<file content>" },
  ...additional files
]
```

**Path mapping for standalone workspaces:** Always push to `coherence-preview/src/experiments/<id>/...` regardless of local path layout.

## Step 3: Update main.tsx Registration on the Branch

Use `mcp_github_github_get_file_contents` to read the current `coherence-preview/src/main.tsx` from the **`main`** branch (the branch base).

Check if the experiment is already registered. If not, add the entry to the experiments array and push the updated file **to the feature branch**:

```
mcp_github_github_create_or_update_file:
  owner: "unthinkmedia"
  repo: "vibe-azure"
  path: "coherence-preview/src/main.tsx"
  branch: "experiment/<id>"
  message: "feat: register experiment <id>"
  content: <updated main.tsx content>
  sha: <sha from get_file_contents on the feature branch>
```

**Important:** After pushing experiment files in Step 2b, the branch has a new commit. You must get the SHA of `main.tsx` **from the feature branch** (not `main`) when updating it. Use `ref: "experiment/<id>"` in `get_file_contents`.

The entry should follow the standard format:

```tsx
{
  id: '<experiment-id>',
  title: '<Title from intent>',
  description: '<Description from intent>',
  component: lazy(() => import('./experiments/<experiment-id>')),
  date: '<today YYYY-MM-DD>',
  tags: [<tags from intent>],
},
```

## Step 4: Create Pull Request

Use `mcp_github_github_create_pull_request` to open a PR:

```
owner: "unthinkmedia"
repo: "vibe-azure"
title: "experiment: <Title from intent>"
body: |
  ## New Experiment: <Title>

  **ID:** `<id>`
  **Description:** <description from intent>

  ### Preview
  Once the SWA staging deployment completes, preview at:
  `https://thankful-mud-0be9d9a1e-<PR_NUMBER>.westus2.1.azurestaticapps.net/#<id>`

  ### Files
  - `coherence-preview/src/experiments/<id>/index.tsx`
  - (list other files)

  ---
  _Auto-generated by the experiment deploy skill._
head: "experiment/<id>"
base: "main"
```

Capture the PR number from the response.

## Step 5: Report Staging Preview URL

After creating the PR, GitHub Actions will:
1. Detect the PR with changes in `coherence-preview/**`
2. Run `npm install && npm run build` in `coherence-preview/`
3. Deploy to a **staging environment** on Azure Static Web Apps

Tell the user:

> _"✅ Pull request created! GitHub Actions is building a staging preview._
>
> _**PR:** https://github.com/unthinkmedia/vibe-azure/pull/<PR_NUMBER>_
>
> _**Staging preview** (available after build completes):_
> _`https://thankful-mud-0be9d9a1e-<PR_NUMBER>.westus2.1.azurestaticapps.net/#<id>`_
>
> _When you're happy with the preview, **merge the PR** to publish to the production gallery:_
> _`https://thankful-mud-0be9d9a1e-preview.westus2.1.azurestaticapps.net/#<id>`_
>
> _Build status: https://github.com/unthinkmedia/vibe-azure/actions"_

## Hard Boundaries

- **Do NOT** push directly to `main` — always create a branch + PR
- **Do NOT** create or modify `intent.json`
- **Do NOT** call the `design_intent` MCP tool
- **Do NOT** build experiment code (no creating `.tsx` files)
- **Do NOT** run UI verification
- **Do NOT** use `swa deploy` or Azure CLI — push to GitHub and let Actions handle deployment
- Your only job is gating + creating a PR with the experiment files
