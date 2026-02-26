# MCP App Patterns

## Table of Contents

- [Polling for Live Data](#polling-for-live-data)
- [Updating Model Context](#updating-model-context)
- [Sending Follow-Up Messages](#sending-follow-up-messages)
- [Error Handling](#error-handling)
- [Deduplicate Re-Deliveries](#deduplicate-re-deliveries)
- [CSP and CORS](#csp-and-cors)
- [Chunked Data Loading](#chunked-data-loading)
- [Fullscreen Mode](#fullscreen-mode)
- [View State Persistence](#view-state-persistence)
- [Streaming / Partial Tool Input](#streaming--partial-tool-input)
- [Pausing When Offscreen](#pausing-when-offscreen)

## Polling for Live Data

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

## Updating Model Context

Inform the model about user interactions:

```typescript
await app.updateModelContext({
  content: [{ type: "text", text: `User selected item "${selectedItem.name}".` }],
});
```

## Sending Follow-Up Messages

Trigger model responses from the View:

```typescript
await app.sendMessage({
  role: "user",
  content: [{ type: "text", text: "Analyze the selected data" }],
});
```

## Error Handling

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

## Deduplicate Re-Deliveries

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

## CSP and CORS

MCP Apps run in sandboxed iframes. Any network requests need CSP declarations.

### Declaring CSP

Set `_meta.ui.csp` in the resource contents (not in `registerAppResource` config):

```typescript
registerAppResource(
  server,
  "My Dashboard",
  "ui://dashboard/view.html",
  { description: "Dashboard with external API" },
  async () => ({
    contents: [
      {
        uri: "ui://dashboard/view.html",
        mimeType: RESOURCE_MIME_TYPE,
        text: dashboardHtml,
        _meta: {
          ui: {
            csp: {
              connectDomains: ["https://api.example.com"],    // fetch/XHR/WebSocket
              resourceDomains: ["https://cdn.example.com"],   // scripts, styles, images
            },
          },
        },
      },
    ],
  })
);
```

## Chunked Data Loading

For large payloads (PDFs, datasets), use app-only tools with pagination:

### Server

```typescript
const MAX_CHUNK_BYTES = 500 * 1024;

registerAppTool(
  server,
  "read_data_chunk",
  {
    description: "Load data in chunks",
    inputSchema: {
      id: z.string(),
      offset: z.number().min(0).default(0),
      byteCount: z.number().default(MAX_CHUNK_BYTES),
    },
    _meta: { ui: { visibility: ["app"] } },
  },
  async ({ id, offset, byteCount }) => {
    const { data, totalBytes } = await loadDataSlice(id, offset, byteCount);
    const bytes = Buffer.from(data).toString("base64");
    return {
      content: [{ type: "text", text: "chunk" }],
      structuredContent: {
        bytes,
        offset,
        byteCount: data.length,
        totalBytes,
        hasMore: offset + data.length < totalBytes,
      },
    };
  }
);
```

### Client

```typescript
async function loadAllChunks(id: string): Promise<Uint8Array> {
  const CHUNK_SIZE = 500 * 1024;
  const chunks: Uint8Array[] = [];
  let offset = 0;
  let hasMore = true;

  while (hasMore) {
    const result = await app.callServerTool({
      name: "read_data_chunk",
      arguments: { id, offset, byteCount: CHUNK_SIZE },
    });
    const chunk = result.structuredContent as {
      bytes: string; offset: number; byteCount: number;
      totalBytes: number; hasMore: boolean;
    };
    const decoded = Uint8Array.from(atob(chunk.bytes), (c) => c.charCodeAt(0));
    chunks.push(decoded);
    offset += chunk.byteCount;
    hasMore = chunk.hasMore;
  }

  const total = chunks.reduce((s, c) => s + c.length, 0);
  const combined = new Uint8Array(total);
  let pos = 0;
  for (const c of chunks) {
    combined.set(c, pos);
    pos += c.length;
  }
  return combined;
}
```

## Fullscreen Mode

```typescript
// Toggle fullscreen
async function toggleFullscreen() {
  const ctx = app.getHostContext();
  const newMode = ctx?.displayMode === "inline" ? "fullscreen" : "inline";
  if (ctx?.availableDisplayModes?.includes(newMode)) {
    const result = await app.requestDisplayMode({ mode: newMode });
    document.body.classList.toggle("fullscreen", result.mode === "fullscreen");
  }
}

// React to display mode changes from host
app.onhostcontextchanged = (ctx) => {
  if (ctx.displayMode) {
    document.body.classList.toggle("fullscreen", ctx.displayMode === "fullscreen");
  }
};
```

## View State Persistence

Use `localStorage` keyed by a server-generated `viewUUID`:

### Server

```typescript
import { randomUUID } from "node:crypto";

// In tool handler:
return {
  content: [{ type: "text", text: "Loaded viewer" }],
  structuredContent: { /* data */ },
  _meta: { viewUUID: randomUUID() },
};
```

### Client

```typescript
let viewUUID: string | undefined;

app.ontoolresult = (result) => {
  viewUUID = result._meta?.viewUUID ? String(result._meta.viewUUID) : undefined;

  // Restore saved state
  if (viewUUID) {
    const saved = localStorage.getItem(viewUUID);
    if (saved) applyState(JSON.parse(saved));
  }
};

function saveState(state: unknown) {
  if (viewUUID) localStorage.setItem(viewUUID, JSON.stringify(state));
}
```

## Streaming / Partial Tool Input

Show progressive preview while the model streams arguments:

```typescript
app.ontoolinputpartial = (params) => {
  // Healed JSON — may have truncated last values
  const preview = params.arguments as Record<string, unknown>;
  showPreview(preview);
};

app.ontoolinput = (params) => {
  // Complete arguments — safe to use
  hidePreview();
  processInput(params.arguments);
};
```

## Pausing When Offscreen

For CPU-intensive views (animations, WebGL), pause when scrolled away:

```typescript
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      startRendering();
    } else {
      pauseRendering();
    }
  });
});
observer.observe(document.getElementById("main")!);

app.onteardown = async () => {
  observer.disconnect();
  pauseRendering();
  return {};
};
```

## Binary Resources

Serve binary content (video, images) via MCP resources:

### Server

```typescript
import { ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";

server.registerResource(
  "Video",
  new ResourceTemplate("video://{id}", { list: undefined }),
  { description: "Video data", mimeType: "video/mp4" },
  async (uri, { id }) => {
    const buffer = await getVideoData(String(id));
    return {
      contents: [{
        uri: uri.href,
        mimeType: "video/mp4",
        blob: Buffer.from(buffer).toString("base64"),
      }],
    };
  }
);
```

### Client

```typescript
import { ReadResourceResultSchema } from "@modelcontextprotocol/sdk/types.js";

const result = await app.request(
  { method: "resources/read", params: { uri: `video://${videoId}` } },
  ReadResourceResultSchema,
);
const content = result.contents[0];
if (content && "blob" in content) {
  videoEl.src = `data:${content.mimeType!};base64,${content.blob}`;
}
```

## Safe Area Insets

Apply padding for device notches and system UI:

```typescript
app.onhostcontextchanged = (ctx) => {
  if (ctx.safeAreaInsets) {
    const main = document.getElementById("main")!;
    main.style.paddingTop = `${ctx.safeAreaInsets.top}px`;
    main.style.paddingRight = `${ctx.safeAreaInsets.right}px`;
    main.style.paddingBottom = `${ctx.safeAreaInsets.bottom}px`;
    main.style.paddingLeft = `${ctx.safeAreaInsets.left}px`;
  }
};
```

## Host Style Variables

Apply host-provided CSS variables and fonts:

```typescript
import {
  applyDocumentTheme,
  applyHostStyleVariables,
  applyHostFonts,
} from "@modelcontextprotocol/ext-apps";

app.onhostcontextchanged = (ctx) => {
  if (ctx.theme) applyDocumentTheme(ctx.theme);
  if (ctx.styles?.variables) applyHostStyleVariables(ctx.styles.variables);
  if (ctx.styles?.css?.fonts) applyHostFonts(ctx.styles.css.fonts);
};
```
