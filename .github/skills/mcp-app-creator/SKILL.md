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
  DO NOT USE FOR: building standard MCP servers/tools without UI, general web apps
  (React/Vue/Svelte), Copilot Extensions (use azure-hosted-copilot-sdk), or
  Azure portal prototypes (use azure-experiment-orchestrator).
---

# MCP App Creator

Build interactive MCP Apps that render inline in MCP hosts (Claude Desktop,
Claude.ai, VS Code). An MCP App = **Tool + UI Resource**. The tool declares
data logic; the resource contains the HTML View rendered in a sandboxed iframe.

## Key Concepts

- **Tool** — Server-side handler registered with `registerAppTool`. Returns `content` (text for the model — **required**) and optionally `structuredContent` (data for the UI — omit if the tool has no View to update).
- **UI Resource** — HTML page registered with `registerAppResource` at a `ui://` URI. Bundled into a single file by Vite.
- **View** — The HTML/JS running in the iframe. Uses the `App` class from `@modelcontextprotocol/ext-apps` to communicate with the host.
- **App-only tools** — Tools with `visibility: ["app"]` that are hidden from the model and callable only by the View (for polling, CRUD, pagination, etc.).

## Workflow

1. **Discover existing conventions** — If adding to an existing server, read `server.ts`, `package.json`, `tsconfig.server.json`, and `vite.config.ts` first. Match the project's established patterns for file organization, naming, build scripts, and registration style.
2. **Understand the requirement** — What data does the tool return? What UI interaction is needed?
3. **Scaffold the MCP App** — For greenfield projects, run `scripts/scaffold.sh <app-name>` to generate a complete working starter. For existing servers, create the HTML entry, TypeScript source, register tool + resource on the server.
4. **Build the View** — Use `@vscode-elements/elements` web components exclusively for UI. Wire up `ontoolresult`, `callServerTool`, theming.
5. **Register in Vite** — Add the HTML entry to the build config, following the project's existing build approach.
6. **Test** — Build and verify the app renders correctly.

## Project Structure

MCP App projects need a clear separation between server code (compiled by tsc) and client View code (bundled by Vite). Two common layouts exist:

**Option A: Separate directories** (cleaner — no exclude lists needed)
```
mcp-server/
├── server.ts              ← registerAppTool + registerAppResource
├── main.ts                ← entry point (StdioServerTransport)
├── lib/                   ← Server-side helpers (compiled by tsc)
│   └── <data-module>.ts
├── src/                   ← Client-side Views only (Vite handles)
│   └── <app-name>.ts
├── <app-name>.html        ← HTML entry point for the View
└── dist/
```

**Option B: Flat src/ with explicit excludes** (simpler for small projects)
```
mcp-server/
├── server.ts
├── main.ts
├── src/                   ← Both client + server files, client excluded from tsconfig.server.json
│   ├── <app-name>.ts      ← CLIENT (excluded from server tsconfig)
│   └── <data-module>.ts   ← SERVER (imported by server.ts)
├── <app-name>.html
└── dist/
```

> **Key rule:** Client View code must never be compiled by the server tsconfig. Use either directory separation (Option A) or explicit `exclude` entries (Option B). When adding to an existing project, **read `tsconfig.server.json` to determine which approach is already in use.**

For greenfield projects, see [references/project-setup.md](references/project-setup.md). For adding a new app to an existing multi-app server, see [references/adding-to-existing-server.md](references/adding-to-existing-server.md).

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
import "@vscode-elements/elements/dist/bundled.js";

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
root.innerHTML = "<p>Loading…</p>";

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

The HTML must be bundled into a **single file** using `vite-plugin-singlefile`. Two multi-app build approaches exist — **check the project's existing `vite.config.ts` and `package.json` to determine which is in use:**

**Approach A: Multi-entry config** (builds all apps in one pass)
```typescript
export default defineConfig({
  plugins: [viteSingleFile()],
  build: {
    outDir: "dist",
    emptyOutDir: false,
    rollupOptions: {
      input: {
        "app-a": "app-a.html",
        "app-b": "app-b.html",
        "my-app": "my-app.html",  // ← add new entry here
      },
    },
  },
});
```

**Approach B: INPUT env var** (builds one app per invocation, chained in scripts)
```typescript
export default defineConfig({
  plugins: [viteSingleFile()],
  build: {
    outDir: "dist",
    emptyOutDir: false,
    rollupOptions: {
      input: process.env.INPUT || "my-app.html",
    },
  },
});
```

With Approach B, chain the new app onto the existing build script:
```jsonc
{
  "scripts": {
    "build": "... && cross-env INPUT=my-app.html vite build"
  }
}
```

See **[references/project-setup.md](references/project-setup.md)** for full Vite config and build script details.

## Step 5: Common Patterns

The View communicates with the server and host through several key APIs:

- **Polling** — Use an app-only tool + `setInterval` for live data updates
- **Model context** — Call `app.updateModelContext()` to inform the model about user interactions
- **Follow-up messages** — Call `app.sendMessage()` to trigger model responses from the View
- **Error handling** — Return `isError: true` from tool handlers; use `updateModelContext` for View-side errors
- **Deduplication** — Fingerprint `ontoolresult` payloads (hosts may re-deliver on scroll/resize)
- **CSP/CORS** — Declare `connectDomains`/`resourceDomains` for network requests from the iframe
- **Chunked loading** — Paginate large payloads with app-only tools
- **Fullscreen** — Toggle via `app.requestDisplayMode()`
- **State persistence** — Use `localStorage` keyed by server-generated `viewUUID`
- **Streaming preview** — Use `ontoolinputpartial` for progressive rendering during argument streaming

See **[references/patterns.md](references/patterns.md)** for full code examples of all patterns above.

## Dependencies

See **[references/project-setup.md](references/project-setup.md)** Step 2 for the full install commands. In summary:

- **Runtime:** `@modelcontextprotocol/ext-apps`, `@modelcontextprotocol/sdk`, `zod`
- **Dev:** `typescript`, `vite`, `vite-plugin-singlefile`, `@types/node`, `tsx`, `concurrently`, `cross-env`
- **UI (mandatory):** `@vscode-elements/elements`

## References

- **[references/vscode-elements.md](references/vscode-elements.md)** — Full component catalog, usage examples, and VS Code UX design rules
- **[references/project-setup.md](references/project-setup.md)** — Greenfield project scaffolding (tsconfig, package.json, main.ts, Vite config, build scripts)
- **[references/adding-to-existing-server.md](references/adding-to-existing-server.md)** — Adding a new app to a multi-app server: registration, build chaining, data modules, tsconfig excludes
- **[references/patterns.md](references/patterns.md)** — All patterns: polling, model context, error handling, deduplication, CSP/CORS, chunked data, fullscreen, state persistence, streaming
- **[references/troubleshooting.md](references/troubleshooting.md)** — Symptoms → causes → fixes for build errors, blank views, missing data, CSP issues, and more
- **[references/example-app.md](references/example-app.md)** — Complete counter app showing the full data round-trip: Tool → View → App-Only Tool → Model context update
- **[scripts/scaffold.sh](scripts/scaffold.sh)** — Generate a complete working MCP App project from a single command
