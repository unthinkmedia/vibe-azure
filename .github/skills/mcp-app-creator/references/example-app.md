# End-to-End Example: Counter App

A minimal but complete MCP App that demonstrates the full data round-trip:
**Tool → View → App-Only Tool → View update → Model context update**.

This is the smallest example that exercises all core APIs. Use it as a reference for how the pieces connect.

## Table of Contents

- [What It Does](#what-it-does)
- [Architecture](#architecture)
- [server.ts — Tool & Resource Registration](#serverts--tool--resource-registration)
- [counter.html — HTML Entry Point](#counterhtml--html-entry-point)
- [src/counter.ts — Client View](#srccounterts--client-view)
- [Data Flow Walkthrough](#data-flow-walkthrough)
- [Build & Test](#build--test)

---

## What It Does

1. Model calls `show_counter` → tool returns initial count
2. View renders a counter with + / − buttons using `vscode-button`
3. User clicks + → View calls `counter_increment` (app-only tool) → server returns new count
4. View re-renders with updated count
5. View calls `app.updateModelContext()` so the model knows the current value

## Architecture

```
┌─────────────────────────────────────┐
│  MCP Host (Claude Desktop / VS Code)│
│                                     │
│  ┌────────────┐   ┌──────────────┐  │
│  │   Model     │──▶│ show_counter │  │
│  │             │   │   (tool)     │  │
│  └─────▲──────┘   └──────┬───────┘  │
│        │                  │          │
│   updateModel      structuredContent │
│   Context               │           │
│        │          ┌──────▼───────┐   │
│        └──────────│   View       │   │
│                   │ (counter.ts) │   │
│                   └──────┬───────┘   │
│                          │           │
│                   callServerTool     │
│                          │           │
│                   ┌──────▼────────┐  │
│                   │counter_       │  │
│                   │increment      │  │
│                   │(app-only tool)│  │
│                   └───────────────┘  │
└─────────────────────────────────────┘
```

---

## server.ts — Tool & Resource Registration

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

export function createServer(): McpServer {
  const server = new McpServer({
    name: "Counter",
    version: "1.0.0",
  });

  // In-memory state (per server process)
  let count = 0;

  const resourceUri = "ui://counter/counter.html";

  // ── Model-facing tool: opens the counter UI ──

  registerAppTool(
    server,
    "show_counter",
    {
      title: "Show Counter",
      description: "Display an interactive counter",
      inputSchema: {
        startValue: z.number().optional().describe("Initial counter value"),
      },
      _meta: { ui: { resourceUri } },
    },
    async ({ startValue }) => {
      count = startValue ?? 0;
      return {
        content: [
          { type: "text", text: `Counter is at ${count}.` },
        ],
        structuredContent: { count },
      };
    }
  );

  // ── App-only tool: called by the View, hidden from model ──

  registerAppTool(
    server,
    "counter_increment",
    {
      description: "Increment or decrement the counter",
      inputSchema: {
        delta: z.number().describe("Amount to add (negative to subtract)"),
      },
      _meta: {
        ui: {
          resourceUri,
          visibility: ["app"],   // ← hidden from model
        },
      },
    },
    async ({ delta }) => {
      count += delta;
      return {
        content: [
          { type: "text", text: `Counter is now ${count}.` },
        ],
        structuredContent: { count },
      };
    }
  );

  // ── HTML resource ──

  registerAppResource(
    server,
    "Counter UI",
    resourceUri,
    { description: "Interactive counter" },
    async () => {
      let html: string;
      try {
        html = await fs.readFile(
          path.join(DIST_DIR, "counter.html"),
          "utf-8"
        );
      } catch {
        html = "<html><body><p>Not built. Run <code>npm run build</code>.</p></body></html>";
      }
      return {
        contents: [
          { uri: resourceUri, mimeType: RESOURCE_MIME_TYPE, text: html },
        ],
      };
    }
  );

  return server;
}
```

**Key points:**
- `show_counter` is model-facing — the model calls it to display the UI
- `counter_increment` is app-only (`visibility: ["app"]`) — only the View can call it
- Both share the same `resourceUri`, linking them to the same View
- State (`count`) lives server-side; the View receives it via `structuredContent`

---

## counter.html — HTML Entry Point

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Counter</title>
</head>
<body>
  <div id="app"></div>
  <script type="module" src="/src/counter.ts"></script>
</body>
</html>
```

---

## src/counter.ts — Client View

```typescript
import { App } from "@modelcontextprotocol/ext-apps";
import "@vscode-elements/elements/dist/bundled.js";

// ── Types ──

interface CounterData {
  count: number;
}

// ── State ──

let currentCount = 0;
let lastFingerprint = "";

// ── App setup ──

const app = new App({ name: "Counter", version: "1.0.0" });
const root = document.getElementById("app")!;

// ── Render ──

function render() {
  root.innerHTML = `
    <style>
      :root {
        --bg: var(--vscode-editor-background, #1e1e1e);
        --fg: var(--vscode-editor-foreground, #cccccc);
        --accent: var(--vscode-focusBorder, #007fd4);
      }
      * { box-sizing: border-box; margin: 0; padding: 0; }
      body {
        font-family: var(--vscode-font-family, sans-serif);
        font-size: var(--vscode-font-size, 13px);
        background: var(--bg);
        color: var(--fg);
        padding: 16px;
      }
      .counter-display {
        font-size: 48px;
        font-weight: 600;
        text-align: center;
        margin: 24px 0;
        font-variant-numeric: tabular-nums;
      }
      .controls {
        display: flex;
        gap: 8px;
        justify-content: center;
      }
      .status {
        text-align: center;
        margin-top: 16px;
        color: var(--vscode-descriptionForeground, #888);
        font-size: 12px;
      }
    </style>
    <h2>Counter</h2>
    <div class="counter-display">${currentCount}</div>
    <div class="controls">
      <vscode-button id="dec-btn">− 1</vscode-button>
      <vscode-button id="inc-btn">+ 1</vscode-button>
    </div>
    <div class="status" id="status"></div>
  `;

  // ── Wire up buttons ──

  document.getElementById("dec-btn")!.addEventListener("click", () => {
    updateCounter(-1);
  });

  document.getElementById("inc-btn")!.addEventListener("click", () => {
    updateCounter(1);
  });
}

// ── Call app-only tool to update server state ──

async function updateCounter(delta: number) {
  const statusEl = document.getElementById("status");

  try {
    // 1. Call the app-only tool on the server
    const result = await app.callServerTool({ name: "counter_increment", arguments: { delta } });

    // 2. Extract new data from response
    const data = result.structuredContent as CounterData | undefined;
    if (data) {
      currentCount = data.count;
      render();
    }

    // 3. Tell the model about the new state
    app.updateModelContext(`User changed the counter to ${currentCount}.`);
  } catch (err) {
    if (statusEl) {
      statusEl.textContent = `Error: ${err instanceof Error ? err.message : String(err)}`;
    }
  }
}

// ── Handle initial tool result from model ──

app.ontoolresult = (result) => {
  const data = result.structuredContent as CounterData | undefined;
  if (!data) return;

  // Deduplicate re-deliveries (hosts may replay on scroll/resize)
  const fp = JSON.stringify(data);
  if (fp === lastFingerprint) return;
  lastFingerprint = fp;

  currentCount = data.count;
  render();
};

// ── Theme support ──

app.onhostcontextchanged = (ctx) => {
  if (ctx.theme) {
    document.documentElement.setAttribute("data-theme", ctx.theme);
  }
};

// ── Connect to host ──

app.connect().then(() => {
  const ctx = app.getHostContext();
  if (ctx?.theme) {
    document.documentElement.setAttribute("data-theme", ctx.theme);
  }
});
```

**Key points:**
- `ontoolresult` is set **before** `connect()` — this ensures the initial data isn't missed
- `callServerTool({ name: "counter_increment", arguments: { ... } })` calls the app-only tool by exact name
- `updateModelContext(...)` informs the model that the user changed something
- Fingerprint deduplication prevents double-renders from host re-deliveries
- All UI uses `vscode-button` from `@vscode-elements/elements`
- CSS uses VS Code variables with fallbacks for non-VS Code hosts

---

## Data Flow Walkthrough

Here's the exact sequence of events:

```
1. User asks "show me a counter"
2. Model calls show_counter({ startValue: 5 })
3. Server sets count = 5
4. Server returns:
     content: [{ type: "text", text: "Counter is at 5." }]
     structuredContent: { count: 5 }
5. Host renders the iframe with counter.html
6. View's app.connect() fires
7. Host delivers tool result → app.ontoolresult fires
8. View reads result.structuredContent.count → renders "5"
9. User clicks "+ 1"
10. View calls app.callServerTool({ name: "counter_increment", arguments: { delta: 1 } })
11. Server sets count = 6, returns structuredContent: { count: 6 }
12. View reads response, renders "6"
13. View calls app.updateModelContext("User changed the counter to 6.")
14. Model now knows the counter is at 6
```

---

## Build & Test

```bash
npm run build
npx @modelcontextprotocol/inspector node dist/main.js
```

In the Inspector:
1. **Tools tab** → You should see `show_counter` and `counter_increment`
2. Call `show_counter` → Verify `structuredContent: { count: 0 }` in the response
3. Call `counter_increment` with `{ "delta": 1 }` → Verify `structuredContent: { count: 1 }`

Then wire into Claude Desktop or VS Code to test the actual rendered View.
