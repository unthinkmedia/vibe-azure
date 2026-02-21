---
name: mcp-app-creator
description: >-
  Build MCP Apps — interactive UIs that render inline in Claude Desktop, Claude.ai,
  and VS Code chat. Use when the user asks to "create an MCP app", "add a UI to my
  MCP tool", "build an MCP app", "add an interactive view", or wants to display
  charts, forms, dashboards, or any interactive widget inside an MCP tool response.
  Also triggers on "create a new MCP tool with UI", "scaffold an MCP app", or
  "make this tool visual". Covers project setup, server registration, client-side
  View code, theming, app-only tools, vite bundling, and testing. All UI MUST use
  @vscode-elements/elements web components and follow VS Code UX design patterns.
---

# MCP App Creator

Build interactive MCP Apps that render inline in MCP hosts (Claude Desktop,
Claude.ai, VS Code). An MCP App = **Tool + UI Resource**. The tool declares
data logic; the resource contains the HTML View rendered in a sandboxed iframe.

## Key Concepts

- **Tool** — Server-side handler registered with `registerAppTool`. Returns `content` (text for the model) and optionally `structuredContent` (data for the UI).
- **UI Resource** — HTML page registered with `registerAppResource` at a `ui://` URI. Bundled into a single file by Vite.
- **View** — The HTML/JS running in the iframe. Uses the `App` class from `@modelcontextprotocol/ext-apps` to communicate with the host.
- **App-only tools** — Tools with `visibility: ["app"]` that are hidden from the model and callable only by the View (for polling, CRUD, pagination, etc.).

## Workflow

1. **Understand the requirement** — What data does the tool return? What UI interaction is needed?
2. **Scaffold the MCP App** — Create the HTML entry, TypeScript source, register tool + resource on the server.
3. **Build the View** — Use `@vscode-elements/elements` web components exclusively for UI. Wire up `ontoolresult`, `callServerTool`, theming.
4. **Register in Vite** — Add the HTML entry to the build scripts.
5. **Test** — Build and verify the app renders correctly.

## Project Structure (within an existing MCP server)

```
mcp-server/
├── server.ts              ← registerAppTool + registerAppResource
├── main.ts                ← entry point (StdioServerTransport)
├── vite.config.ts         ← Vite config (vite-plugin-singlefile)
├── tsconfig.json          ← Client-side TS config (targets src/)
├── tsconfig.server.json   ← Server-side TS config (targets server.ts, main.ts, lib/)
├── <app-name>.html        ← HTML entry point for the View
├── src/
│   └── <app-name>.ts      ← Client-side View logic (Vite only — NOT compiled by tsc)
├── lib/                   ← Server-side helpers (compiled by tsc, imported by server.ts)
│   └── <data-module>.ts
└── dist/
    └── <app-name>.html    ← Bundled single-file output
```

> **Key rule:** `src/` = client files (Vite handles). `lib/` or root = server files (tsc handles). Never put client View code where `tsconfig.server.json` can see it.

For greenfield projects, see [references/project-setup.md](references/project-setup.md).

## Step 1: Server-Side Registration

In `server.ts`, register both the tool and its resource. They are linked by a shared `ui://` URI.

```typescript
import {
  registerAppResource,
  registerAppTool,
  RESOURCE_MIME_TYPE,
} from "@modelcontextprotocol/ext-apps/server";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import fs from "node:fs/promises";
import path from "node:path";

const DIST_DIR = path.join(import.meta.dirname, "dist");

// 1) Choose a ui:// URI that ties tool ↔ resource
const resourceUri = "ui://my-server/my-app.html";

// 2) Register the model-facing tool
registerAppTool(
  server,
  "my_tool_name",
  {
    title: "My Tool Title",
    description: "What this tool does — shown to the model",
    inputSchema: {
      query: z.string().optional().describe("Optional search query"),
    },
    _meta: {
      ui: { resourceUri },
    },
  },
  async ({ query }) => {
    const data = await fetchData(query);
    return {
      content: [
        { type: "text", text: `Showing ${data.length} results.` },
      ],
      structuredContent: { items: data, query: query ?? null },
    };
  }
);

// 3) Register the HTML resource
registerAppResource(
  server,
  "My Tool UI",
  resourceUri,
  { description: "Interactive UI for my tool" },
  async () => {
    let html: string;
    try {
      html = await fs.readFile(path.join(DIST_DIR, "my-app.html"), "utf-8");
    } catch {
      html = "<html><body><p>App not built. Run <code>npm run build</code>.</p></body></html>";
    }
    return {
      contents: [{ uri: resourceUri, mimeType: RESOURCE_MIME_TYPE, text: html }],
    };
  }
);
```

### App-Only Tools (UI → Server)

For tools the View calls directly (not the model), set `visibility: ["app"]`:

```typescript
registerAppTool(
  server,
  "my_app_save_data",
  {
    description: "Save user selection from the UI",
    inputSchema: {
      itemId: z.string(),
      value: z.number(),
    },
    _meta: {
      ui: {
        resourceUri,           // same URI as the main tool
        visibility: ["app"],   // hidden from model
      },
    },
  },
  async ({ itemId, value }) => {
    const result = await saveItem(itemId, value);
    return {
      content: [{ type: "text", text: `Saved ${itemId}.` }],
      structuredContent: { result },
    };
  }
);
```

## Step 2: Build the View (HTML + TypeScript)

### HTML Entry Point

Create `<app-name>.html` at the project root:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>My App</title>
</head>
<body>
  <div id="app"></div>
  <script type="module" src="/src/my-app.ts"></script>
</body>
</html>
```

### TypeScript View Logic

Create `src/<app-name>.ts`. **All UI MUST use `@vscode-elements/elements` web components.**

```typescript
import { App } from "@modelcontextprotocol/ext-apps";

// ── Types ──
interface MyData {
  items: Array<{ id: string; name: string; value: number }>;
  query: string | null;
}

// ── State ──
let currentData: MyData = { items: [], query: null };
let lastFingerprint = "";

// ── App setup ──
const app = new App({ name: "My App", version: "1.0.0" });
const root = document.getElementById("app")!;
root.innerHTML = buildShell();

// ── Handle initial tool result ──
app.ontoolresult = (result) => {
  const data = result.structuredContent as MyData | undefined;
  if (!data) return;
  const fp = JSON.stringify(data);
  if (fp === lastFingerprint) return; // deduplicate re-deliveries
  lastFingerprint = fp;
  currentData = data;
  render();
};

// ── Theme support ──
app.onhostcontextchanged = (ctx) => {
  if (ctx.theme) {
    document.documentElement.setAttribute("data-theme", ctx.theme);
  }
};

// ── Connect ──
app.connect().then(() => {
  const ctx = app.getHostContext();
  if (ctx?.theme) {
    document.documentElement.setAttribute("data-theme", ctx.theme);
  }
});
```

**CRITICAL: All UI must use `@vscode-elements/elements` web components. See [references/vscode-elements.md](references/vscode-elements.md) for the full component catalog and usage patterns.**

## Step 3: UI with VSCode Elements

Import the bundled distribution or individual components:

```typescript
// Option A: Import all (simpler, slightly larger bundle)
import "@vscode-elements/elements/dist/bundled.js";

// Option B: Import only what you need (smaller bundle)
import "@vscode-elements/elements/dist/vscode-button/index.js";
import "@vscode-elements/elements/dist/vscode-textfield/index.js";
import "@vscode-elements/elements/dist/vscode-table/index.js";
```

Then use them as HTML elements. See [references/vscode-elements.md](references/vscode-elements.md) for the full component reference.

### Minimal Styling

VSCode Elements components inherit VS Code's CSS variables automatically. Add minimal custom CSS only for layout:

```css
:root {
  --bg: var(--vscode-editor-background, #1e1e1e);
  --fg: var(--vscode-editor-foreground, #cccccc);
  --border: var(--vscode-panel-border, #2d2d2d);
  --accent: var(--vscode-focusBorder, #007fd4);
  --input-bg: var(--vscode-input-background, #3c3c3c);
  --input-fg: var(--vscode-input-foreground, #cccccc);
  --input-border: var(--vscode-input-border, #3c3c3c);
}

* { box-sizing: border-box; margin: 0; padding: 0; }

body {
  font-family: var(--vscode-font-family, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif);
  font-size: var(--vscode-font-size, 13px);
  background: var(--bg);
  color: var(--fg);
  padding: 16px;
  line-height: 1.4;
}
```

## Step 4: Vite Configuration

The HTML must be bundled into a **single file** using `vite-plugin-singlefile`. The `INPUT` env var selects the entry:

```typescript
// vite.config.ts
import { defineConfig } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";

export default defineConfig({
  plugins: [viteSingleFile()],
  build: {
    outDir: "dist",
    emptyOutDir: false, // preserve other built apps
    rollupOptions: {
      input: process.env.INPUT || "my-app.html",
    },
  },
});
```

Add to the build script in `package.json`:

```jsonc
{
  "scripts": {
    "build": "tsc --noEmit && tsc -p tsconfig.server.json && cross-env INPUT=my-app.html vite build",
    "start": "concurrently \"cross-env NODE_ENV=development INPUT=my-app.html vite build --watch\" \"tsx watch main.ts\""
  }
}
```

When adding to an existing server with multiple apps, chain builds:

```jsonc
{
  "scripts": {
    "build": "... && cross-env INPUT=my-app.html vite build"
  }
}
```

## Step 5: Patterns

### Polling for Live Data

Use an app-only tool the View polls at intervals:

```typescript
let intervalId: number | null = null;

async function poll() {
  const result = await app.callServerTool({
    name: "my_app_poll_data",
    arguments: {},
  });
  updateUI(result.structuredContent);
}

function startPolling() {
  if (intervalId !== null) return;
  poll();
  intervalId = window.setInterval(poll, 2000);
}

app.onteardown = async () => {
  if (intervalId !== null) clearInterval(intervalId);
  return {};
};
```

### Updating Model Context

Inform the model about user interactions:

```typescript
await app.updateModelContext({
  content: [{ type: "text", text: `User selected item "${selectedItem.name}".` }],
});
```

### Sending Follow-Up Messages

Trigger model responses from the View:

```typescript
await app.sendMessage({
  role: "user",
  content: [{ type: "text", text: "Analyze the selected data" }],
});
```

### Error Handling

Return `isError: true` from tool handlers for validation errors. Use `updateModelContext` for runtime errors in the View:

```typescript
try {
  // risky operation
} catch (err) {
  await app.updateModelContext({
    content: [{ type: "text", text: `Error: ${(err as Error).message}` }],
  });
}
```

### Deduplicate Re-Deliveries

Hosts may re-deliver `ontoolresult` on scroll/resize. Always fingerprint:

```typescript
let lastFingerprint = "";
app.ontoolresult = (result) => {
  const fp = JSON.stringify(result.structuredContent);
  if (fp === lastFingerprint) return;
  lastFingerprint = fp;
  // process data...
};
```

## Dependencies

```bash
# Runtime
npm install @modelcontextprotocol/ext-apps @modelcontextprotocol/sdk zod

# Dev
npm install -D typescript vite vite-plugin-singlefile @types/node tsx concurrently cross-env

# UI components (MANDATORY)
npm install @vscode-elements/elements
```

## References

- **[references/vscode-elements.md](references/vscode-elements.md)** — Full component catalog, usage examples, and VS Code UX design rules
- **[references/project-setup.md](references/project-setup.md)** — Greenfield project scaffolding (tsconfig, package.json, main.ts)
- **[references/patterns.md](references/patterns.md)** — Advanced patterns: CSP/CORS, chunked data, fullscreen, view state persistence, partial streaming
