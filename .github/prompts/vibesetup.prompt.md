---
description: 'Set up the VibeAzure prototyping environment from scratch'
---

# VibeAzure Setup Guide

You are guiding a developer through setting up the **VibeAzure** workspace — an Azure portal prototyping environment built on the Coherence Design System.

## Before You Start: Network Access

Coherence resources (CDN, docs, npm feed, source repo) are hosted on the Microsoft corporate network. You need one of the following:

- **Azure VPN Client** — connect to the Microsoft network from outside corpnet
- **Corpnet access** — if you're already on the Microsoft network

Once connected, verify access by opening this page in your browser:
<https://coherence-ftekb0dcfpcjb3gv.b02.azurefd.net/start-developing/installation-guide/>

If that page loads, you're good to proceed.

## Two Ways to Use Coherence

### Option A: CDN (Simplest — no npm, no build tools)

For standalone HTML pages, quick prototypes, or any project where you don't want a build pipeline, you can load Coherence directly from the CDN. Add these two lines to your HTML:

```html
<!-- Theme CSS (colors, spacing, typography tokens) -->
<link rel="stylesheet" href="https://coherence-ftekb0dcfpcjb3gv.b02.azurefd.net/cdn/latest/themes/cui/theme.css" />

<!-- Lazy loader — auto-registers any cui-* component found on the page -->
<script type="module" src="https://coherence-ftekb0dcfpcjb3gv.b02.azurefd.net/cdn/latest/lazy-loader.js"></script>
```

That's it. Write `<cui-button>Click me</cui-button>` and it works — the lazy loader detects which components are on the page and loads only what's needed.

You can also manually import individual components if you prefer:

```html
<script type="module" src="https://coherence-ftekb0dcfpcjb3gv.b02.azurefd.net/cdn/latest/components/cui-button/cui-button.js"></script>
```

For more details and a live playground: <https://coherence-ftekb0dcfpcjb3gv.b02.azurefd.net/start-developing/try-it-out/>

**React 19 note:** React 19 supports web components natively, so the CDN approach works even in React apps. If you need TypeScript types for JSX, add this type declaration file to your project:

```
https://coherence-ftekb0dcfpcjb3gv.b02.azurefd.net/cdn/latest/custom-element-jsx.d.ts
```

### Option B: npm Package (Used by this workspace)

The `coherence-preview` app in this workspace uses the `@charm-ux/cui` npm package for deeper integration with React wrappers and build-time imports:

```tsx
import { CuiButton, CuiIcon } from '@charm-ux/cui/react';
```

This requires authenticating with the private Azure Artifacts feed. The setup script handles this automatically.

## Full Workspace Setup

Run these commands to clone and set up everything:

```bash
git clone https://github.com/unthinkmedia/vibe-azure.git
cd vibe-azure
./setup.sh
```

The setup script will:
1. Check that Node.js >= 18 and npm are installed
2. Prompt for your Azure DevOps PAT (Packaging > Read scope) — get one at <https://dev.azure.com/charm-pilot/_usersSettings/tokens>
3. Base64-encode the PAT and write feed credentials to `~/.npmrc`
4. Install dependencies for `coherence-preview` and `mcp-server`
5. Build the MCP server

After setup completes:

```bash
cd coherence-preview && npm run dev
```

This starts the preview app at `http://localhost:5173`.

### Check Your Environment

At any time, run this to see what's ready and what's missing:

```bash
./setup.sh --check
```

## Optional: Charm-Pilot Source Repository

Most developers do **not** need this. The published `@charm-ux/cui` package is installed automatically from the npm feed.

Only clone the source if you need to modify the Coherence components themselves:

```bash
git clone https://charm-pilot@dev.azure.com/charm-pilot/charm-pilot/_git/charm-pilot
cd charm-pilot
npm install -g pnpm@latest-9
pnpm install
pnpm build
```

This requires Azure VPN / corpnet access to reach the ADO git server.

## What's in the Workspace

| Directory | Purpose |
|---|---|
| `coherence-preview/` | Vite + React prototype preview app with experiments, patterns, and scaffolds |
| `mcp-server/` | MCP server giving AI assistants access to Coherence APIs, tokens, icons, and scaffolds |
| `.github/skills/` | AI skill definitions for Copilot (component lookup, prototyping workflow, verification) |
| `charm-pilot/` | (Optional) Coherence component library source — gitignored, cloned separately |

## Troubleshooting

- **`npm install` fails with 401/403** — Your PAT is expired or missing Packaging > Read scope. Re-run `./setup.sh` to reconfigure.
- **CDN/docs site won't load** — Check your VPN connection. These resources require Microsoft corpnet access.
- **`@charm-ux/cui` not found** — Make sure `~/.npmrc` or `coherence-preview/.npmrc` has the feed credentials. Run `./setup.sh --check` to verify.
- **pnpm version mismatch** — charm-pilot requires pnpm v9. Run `npm i -g pnpm@latest-9`.
