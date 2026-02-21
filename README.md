# VibeAzure — Azure Portal Prototyping with Coherence UI

A rapid prototyping environment for Azure portal pages using the **Coherence Design System** (Microsoft's internal C+AI design system). It combines three sub-projects:

| Project | Purpose |
|---|---|
| **charm-pilot/** | The Coherence UI component library (`@charm-ux/cui`) — web components, theming, and docs |
| **coherence-preview/** | A Vite + React app for viewing and developing prototype experiments |
| **mcp-server/** | An MCP server that gives AI assistants (VS Code Copilot, Claude) access to component APIs, design tokens, icons, and scaffolds |

---

## Network Access

Coherence resources (docs, npm feed, source repo) are hosted on the Microsoft corporate network. You need **Azure VPN Client** or **corpnet access**.

> **Why do I need this?** The Coherence design system is an internal Microsoft project. The documentation site, npm package feed, and source repository are all behind the corporate network. Without VPN or corpnet access, none of these URLs will resolve.

Verify by opening: <https://coherence-ftekb0dcfpcjb3gv.b02.azurefd.net/start-developing/installation-guide/>

If that page loads, you're good to proceed.

---

## Quick Start (Recommended)

The fastest way to get up and running:

**Option 1: Copilot guided setup** — Open VS Code Copilot chat and type `/vibesetup`. The agent will walk you through the entire setup interactively.

**Option 2: Run the setup script** — Requires **Node.js ≥ 18** and an **Azure DevOps PAT** with `Packaging > Read` scope ([create one here](https://dev.azure.com/charm-pilot/_usersSettings/tokens)).

```bash
git clone https://github.com/unthinkmedia/vibe-azure.git
cd vibe-azure
./setup.sh
```

The script will:
1. Prompt for your ADO PAT (input is hidden)
2. Base64-encode it and write credentials to `~/.npmrc`
3. Install dependencies for `coherence-preview` and `mcp-server`
4. Build the MCP server

When it's done:

```bash
cd coherence-preview && npm run dev    # Opens at http://localhost:5173
```

### Check Prerequisites Only

Run with `--check` to scan your environment without making any changes. It reports what's ready and what's missing:

```bash
./setup.sh --check
```

Example output:

```
  ✅  git 2.43.0
  ✅  node v22.18.0
  ✅  npm 10.9.2
  ❌  ~/.npmrc — no Azure Artifacts feed credentials
  ❌  coherence-preview — dependencies not installed
  ❌  mcp-server — dependencies not installed
  ⚠️   pnpm — not installed (only needed for charm-pilot source builds)
  ⚠️   FIGMA_ACCESS_TOKEN — not set (optional, for Figma MCP integration)
```

> **Note:** `charm-pilot/` is a separate repository containing the Coherence component library source. Most developers don't need to clone or build it — the published `@charm-ux/cui` package is installed automatically from the private feed. See [Section 5](#5-optional-building-the-coherence-library-from-source-charm-pilot) if you need to work on the components themselves.

---

## Prerequisites

| Prerequisite | Why do I need this? |
|---|---|
| **Node.js** ≥ 18.14.1 | Runtime for the Vite dev server, MCP server, and build tools. Recommend [nvm](https://github.com/nvm-sh/nvm) or [nvm-windows](https://github.com/coreybutler/nvm-windows) to manage versions. |
| **npm** | Package manager used by `coherence-preview` and `mcp-server` to install dependencies. Comes bundled with Node.js. |
| **Git** | Cloning this repo and (optionally) the charm-pilot source repo. |
| **Azure DevOps PAT** | The `@charm-ux/cui` npm package lives in a **private** Azure Artifacts feed — not on public npm. The PAT authenticates npm so it can download the package. [Create one here](https://dev.azure.com/charm-pilot/_usersSettings/tokens) with `Packaging > Read` scope. |
| **Azure VPN / corpnet** | The private feed and docs are on the Microsoft corporate network. Without network access, npm install will fail. |
| **pnpm** v9 *(optional)* | Only needed if you want to build the `charm-pilot` component library from source (see Section 5). Most developers don't need this. |

---

## Manual Setup (Step by Step)

If you prefer not to use the setup script, or you're on Windows, follow these steps.

### 1. Clone the Repository

```bash
git clone https://github.com/unthinkmedia/vibe-azure.git
cd vibe-azure
```

### 2. Configure npm Authentication for the @charm-ux Feed

The `@charm-ux/cui` package (including `@charm-ux/cui/react` React wrappers) is hosted on a private Azure Artifacts feed — not on the public npm registry. You need to give npm credentials so it can download the package.

> **Why do I need this?** Without feed credentials, running `npm install` in `coherence-preview/` will fail with a 401/403 error because npm can't authenticate with the private feed.

#### 2a. Get an Azure DevOps Personal Access Token (PAT)

1. Go to <https://dev.azure.com/charm-pilot/_usersSettings/tokens>
2. Click **+ New Token**, name it (e.g. "VibeAzure feed")
3. Set expiration (up to 1 year)
4. Under **Scopes**, select **Custom defined**, expand **Packaging**, check **Read**
5. Click **Create** and **copy the token immediately** — you won't see it again

#### 2b. Add Credentials to ~/.npmrc

##### macOS / Linux

1. Base64-encode your PAT:

   ```bash
   node -e "require('readline').createInterface({input:process.stdin,output:process.stdout,historySize:0}).question('PAT> ',p=>{b64=Buffer.from(p.trim()).toString('base64');console.log(b64);process.exit();})"
   ```

2. Add the following to your **home** `~/.npmrc` file (create it if it doesn't exist). Replace the placeholder values:

   ```ini
   ; begin auth token
   //pkgs.dev.azure.com/charm-pilot/charm-pilot/_packaging/charm-feed/npm/registry/:username=AnyNonEmptyValue
   //pkgs.dev.azure.com/charm-pilot/charm-pilot/_packaging/charm-feed/npm/registry/:_password=YOUR_BASE64_PAT
   //pkgs.dev.azure.com/charm-pilot/charm-pilot/_packaging/charm-feed/npm/registry/:email=npm requires email to be set but doesn't use the value
   //pkgs.dev.azure.com/charm-pilot/charm-pilot/_packaging/charm-feed/npm/:username=AnyNonEmptyValue
   //pkgs.dev.azure.com/charm-pilot/charm-pilot/_packaging/charm-feed/npm/:_password=YOUR_BASE64_PAT
   //pkgs.dev.azure.com/charm-pilot/charm-pilot/_packaging/charm-feed/npm/:email=npm requires email to be set but doesn't use the value
   ; end auth token
   ```

##### Windows

```powershell
npm i -g vsts-npm-auth
vsts-npm-auth -config .npmrc
```

### 3. Set Up the Preview App (coherence-preview)

The preview app is where all prototype experiments live. It's a standalone Vite + React app that consumes the published `@charm-ux/cui` package from the private feed you configured above.

```bash
cd coherence-preview
npm install
```

This installs `@charm-ux/cui` (which includes `@charm-ux/cui/react` React wrappers), React, Vite, and TypeScript. Experiments import components like:

```tsx
import { CuiButton, CuiIcon, CuiMessageBar } from '@charm-ux/cui/react';
```

#### Start the Dev Server

```bash
npm run dev
```

This starts a local Vite dev server (default: `http://localhost:5173`). The app shows three tabs:

- **Experiments** — Full-page Azure portal prototypes
- **Patterns** — Reusable UI building blocks (header, side nav, toolbar, cards)
- **Scaffolds** — Starter page templates to clone for new prototypes

#### Build for Production

```bash
npm run build
npm run preview   # serves the built output locally
```

### 4. Set Up the MCP Server (mcp-server)

> **Why do I need this?** The MCP server is what makes the AI assistant (VS Code Copilot, Claude) aware of Coherence — it can look up component APIs, browse design tokens, search icons, and manage design intents. Without it, the AI has no access to live Coherence data and will guess at component usage.

The MCP server provides AI assistants with programmatic access to Coherence component APIs, design tokens, icons, scaffolds, and design intent management. It includes visual MCP Apps (Token Browser, Icon Browser, Intent Form, Verification Reports) that render inline in compatible hosts.

```bash
cd mcp-server
npm install
```

### Build

```bash
npm run build
```

This compiles the TypeScript server and bundles the MCP App HTML files into `dist/`.

### Development Mode

```bash
# Watch mode: rebuilds server + UI on file changes
npm start

# Or run just the server (no UI rebuild):
npm run dev
```

### Register with VS Code

The workspace already includes `.vscode/mcp.json` which registers the server. If you need to adjust the node path, edit that file:

```json
{
  "servers": {
    "coherence-prototyper": {
      "type": "stdio",
      "command": "npx",
      "args": ["tsx", "${workspaceFolder}/mcp-server/main.ts"]
    }
  }
}
```

### Register with Claude Desktop

Add to your `claude_desktop_config.json` (Settings → Developer → Edit Config):

```json
{
  "mcpServers": {
    "coherence-prototyper": {
      "command": "node",
      "args": ["/absolute/path/to/vibe-azure/mcp-server/dist/main.js"]
    }
  }
}
```

---

## 5. (Optional) Building the Coherence Library from Source (charm-pilot)

Most developers **do not need this step**. The published `@charm-ux/cui` package is installed automatically from the private feed. Only follow this section if you need to modify the Coherence components themselves.

`charm-pilot/` is a separate repository hosted on Azure DevOps (requires VPN/corpnet). Clone it into the workspace root if it's not already there:

```bash
# Clone into the workspace (the directory is gitignored)
git clone https://charm-pilot@dev.azure.com/charm-pilot/charm-pilot/_git/charm-pilot
```

### Install pnpm and Dependencies

```bash
npm install -g pnpm@latest-9
cd charm-pilot
pnpm install
```

### Build the Library

```bash
# Build all packages (theming → core → demo → docsite)
pnpm build

# Or build individual packages:
pnpm build:theming
pnpm build:core
pnpm build:demo
```

### Run Storybook or Docsite

```bash
pnpm dev:core      # Storybook for core components
pnpm dev:demo      # Storybook for demo components
pnpm dev:docsite   # Documentation site
```

---

## 6. AI Skills & Agent Configuration

> **Why do I need this?** The skills are pre-written instructions that tell VS Code Copilot *how* to build Azure portal prototypes correctly — which components to use, which tokens to apply, how to structure experiments, and when to verify. They're loaded automatically; no setup required. This section is informational.

The workspace includes a set of Copilot skills under `.github/skills/` that give the AI assistant deep knowledge of the Coherence design system and the prototyping workflow. These are loaded automatically by VS Code Copilot when relevant.

### Key Skills

| Skill | What It Does |
|---|---|
| `coherence-ui` | Component APIs, design tokens, theming, accessibility guides |
| `design-intent` | Captures What/Why/Success Criteria before building a prototype |
| `azure-portal-builder` | Builds experiments from a confirmed intent.json |
| `experiment-orchestrator` | Routes through the full lifecycle: intent → build → verify → deploy |
| `experiment-verify` | Checks experiments against Coherence styling and a11y standards |
| `experiment-deploy` | Deploys experiments to Azure Static Web Apps |
| `azure-mock-data` | Generates realistic fake Azure data for prototypes |
| `ui-verification` | Visual verification using Playwright browser automation |
| `pattern-creator` | Creates and registers reusable composition patterns |

### Workflow for Building a New Experiment

The AI follows this lifecycle when you ask it to build an Azure portal page:

1. **Intent** — The `design_intent` MCP tool opens an interactive form to capture goals, success criteria, and constraints. The result is saved as `intent.json` in the experiment folder.
2. **Build** — The `azure-portal-builder` skill generates the experiment files (data, styles, component) using the intent as the primary instruction source.
3. **Verify** — The `experiment-verify` skill checks the built UI against Coherence standards and grades success criteria.
4. **Deploy** — The `experiment-deploy` skill publishes to Azure Static Web Apps for sharing.

---

## 7. Additional MCP Servers

The workspace also connects to these external MCP servers (configured in `.vscode/mcp.json`):

| Server | Purpose |
|---|---|
| **Playwright MCP** | Browser automation for visual UI verification |
| **Figma MCP** | Pulls design context from Figma files for prototyping |

These require their own credentials:
- **Figma**: Set the `FIGMA_ACCESS_TOKEN` environment variable with a Figma personal access token
- **Playwright**: No additional auth needed (runs locally)

---

## Quick Reference

### Common Commands

```bash
# ─── charm-pilot ───
cd charm-pilot
pnpm install              # Install dependencies
pnpm build                # Build all packages
pnpm dev:core             # Storybook for core components
pnpm test:core            # Run core tests

# ─── coherence-preview ───
cd coherence-preview
npm install               # Install dependencies
npm run dev               # Start dev server (localhost:5173)
npm run build             # Production build

# ─── mcp-server ───
cd mcp-server
npm install               # Install dependencies
npm run build             # Compile server + bundle MCP Apps
npm run dev               # Run server in dev mode
```

### Project Structure

```
vibe-azure/
├── setup.sh                     # One-command developer setup
├── .github/skills/              # AI skill definitions for Copilot
├── .vscode/mcp.json             # MCP server registrations
├── charm-pilot/                 # Coherence UI component library
│   ├── packages/core/           #   Web components source
│   ├── packages/demo/           #   Demo components & stories
│   ├── packages/theming/        #   Theme tokens & CSS
│   └── packages/docsite/        #   Documentation site (Astro)
├── coherence-preview/           # Prototype preview app (Vite + React)
│   └── src/
│       ├── experiments/         #   Individual prototype experiments
│       ├── patterns/            #   Reusable composition patterns
│       └── main.tsx             #   App entry with routing
├── mcp-server/                  # MCP server for AI tooling
│   ├── server.ts                #   Tool & resource definitions
│   ├── main.ts                  #   stdio entry point
│   └── src/                     #   Data fetching, caches, MCP App UIs
└── figma-plugin/                # Figma plugin for design extraction
```
