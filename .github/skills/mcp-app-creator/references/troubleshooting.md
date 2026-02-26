# MCP App Troubleshooting

Common problems when building and running MCP Apps, organized by symptom.

## Table of Contents

- [Build Errors](#build-errors)
- [Tool Not Appearing](#tool-not-appearing)
- [Blank / Empty View](#blank--empty-view)
- [View Renders But No Data](#view-renders-but-no-data)
- [Styling / Theme Issues](#styling--theme-issues)
- [Network / CSP Errors](#network--csp-errors)
- [App-Only Tools Not Working](#app-only-tools-not-working)
- [Inspector Works But Host Doesn't](#inspector-works-but-host-doesnt)
- [Build Overwrites Other Apps](#build-overwrites-other-apps)
- [Quick Diagnostic Checklist](#quick-diagnostic-checklist)

---

## Build Errors

### DOM types in server compilation

**Symptom:** `tsc -p tsconfig.server.json` fails with errors like `Cannot find name 'document'`, `Cannot find name 'HTMLElement'`, or `Property 'innerHTML' does not exist`.

**Cause:** A client-side View file (e.g., `src/my-app.ts`) is being included in the server tsconfig. Client files use DOM APIs that don't exist in Node.js.

**Fix:** Ensure the client file is excluded from server compilation:
- **Separate directories:** Move client files to `src/`, keep server files in `lib/` or root. Server tsconfig only includes `lib/` and root files.
- **Flat src/:** Add the client entry to `tsconfig.server.json`'s `"exclude"` array:
  ```json
  "exclude": ["node_modules", "dist", "src/my-app.ts"]
  ```

### Module resolution errors on `.js` imports

**Symptom:** `Cannot find module './server.js'` when importing in `main.ts`.

**Cause:** TypeScript with `"module": "Node16"` requires `.js` extensions in import paths, even though the source files are `.ts`.

**Fix:** Always use `.js` extensions in server-side imports:
```typescript
import { createServer } from "./server.js";       // ✓
import { createServer } from "./server";           // ✗
import { createServer } from "./server.ts";        // ✗
```

### `vite-plugin-singlefile` not found

**Symptom:** `Cannot find package 'vite-plugin-singlefile'` during build.

**Fix:** Install it as a dev dependency:
```bash
npm install -D vite-plugin-singlefile
```

---

## Tool Not Appearing

### Tool doesn't show up in Claude Desktop / VS Code

**Symptom:** The MCP server connects but the tool isn't listed.

**Cause (most common):** The server was built before the tool was registered. The compiled `dist/server.js` doesn't include the new registration.

**Fix:** Rebuild and restart:
```bash
npm run build
```
Then restart the MCP connection in your host (restart Claude Desktop, or reload VS Code).

### Tool not in MCP Inspector

**Symptom:** `npx @modelcontextprotocol/inspector node dist/main.js` shows no tools.

**Causes:**
1. `createServer()` doesn't return the server object
2. Tools are registered after `server.connect()` (registration must happen before connect)
3. Build is stale — run `npm run build` first

---

## Blank / Empty View

### White rectangle with no content

**Symptom:** The tool runs, the iframe appears, but it's completely blank.

**Causes & fixes (check in order):**

1. **HTML not built:** The `dist/<app>.html` file doesn't exist. Run `npm run build`.

2. **Wrong HTML filename:** The `registerAppResource` callback reads a different filename than what Vite produces. Check that the filename in `fs.readFile(path.join(DIST_DIR, "my-app.html"))` matches the Vite input entry name.

3. **Vite input mismatch:** The HTML file referenced in `vite.config.ts` doesn't exist at the project root. Vite will silently produce nothing.

4. **Script src path wrong:** In the HTML file, the `<script>` src must use an absolute path from the project root:
   ```html
   <script type="module" src="/src/my-app.ts"></script>  <!-- ✓ -->
   <script type="module" src="src/my-app.ts"></script>   <!-- ✗ -->
   <script type="module" src="./src/my-app.ts"></script> <!-- ✗ -->
   ```

5. **`app.connect()` not called:** The View code must call `app.connect()` for the host to begin communication.

---

## View Renders But No Data

### UI appears but shows empty/default state

**Symptom:** The HTML loads, components render, but there's no data from the tool.

**Causes:**

1. **`ontoolresult` not set before `connect()`:**
   ```typescript
   // ✗ Wrong order — result may arrive before handler is registered
   app.connect();
   app.ontoolresult = (result) => { ... };

   // ✓ Set handler first
   app.ontoolresult = (result) => { ... };
   app.connect();
   ```

2. **Missing `structuredContent`:** The tool handler returns `content` but no `structuredContent`. The View receives data through `result.structuredContent`, not `result.content`.

3. **Wrong `structuredContent` shape:** The View expects `result.structuredContent.items` but the tool returns `{ data: items }`. Check the exact property names match between server and client.

4. **`resourceUri` mismatch:** The tool's `_meta.ui.resourceUri` must exactly match the resource's registered URI. Even a trailing slash difference will break the link.
   ```typescript
   // These are DIFFERENT URIs:
   "ui://my-server/app.html"
   "ui://my-server/app.html/"
   ```

---

## Styling / Theme Issues

### Components look unstyled or have wrong colors

**Symptom:** `vscode-button`, `vscode-table`, etc. render but look wrong (no colors, wrong font, unstyled borders).

**Cause:** VS Code CSS variables aren't available in the MCP iframe.

**Fix:** Define fallback values for the variables you use:
```css
:root {
  --bg: var(--vscode-editor-background, #1e1e1e);
  --fg: var(--vscode-editor-foreground, #cccccc);
}
body { background: var(--bg); color: var(--fg); }
```

### Theme doesn't update when host switches light/dark

**Fix:** Listen for theme changes:
```typescript
app.onhostcontextchanged = (ctx) => {
  if (ctx.theme) {
    document.documentElement.setAttribute("data-theme", ctx.theme);
  }
};
```

---

## Network / CSP Errors

### `Refused to connect to '...'` in console

**Symptom:** `fetch()` calls from the View fail with CSP errors.

**Cause:** MCP App iframes run in a sandbox. External network requests require explicit domain declarations.

**Fix:** Declare domains when creating the App:
```typescript
const app = new App({
  name: "My App",
  version: "1.0.0",
  connectDomains: ["api.example.com"],     // for fetch/XHR
  resourceDomains: ["cdn.example.com"],    // for images/scripts
});
```

### Images not loading

**Symptom:** `<img>` tags show broken image icons.

**Causes:**
1. External URLs need `resourceDomains` declared (see above)
2. Data URIs (`data:image/...`) work without CSP declarations — convert server-side if possible

---

## App-Only Tools Not Working

### View calls `callServerTool` but nothing happens

**Symptom:** No error, but no response either. Or `callServerTool` rejects.

**Causes:**

1. **Wrong tool name:** The name passed to `callServerTool` must exactly match the name registered with `registerAppTool`:
   ```typescript
   // Server
   registerAppTool(server, "my_app_refresh", ...);

   // Client
   app.callServerTool("my_app_refresh", { ... });  // ✓ exact match
   app.callServerTool("myAppRefresh", { ... });     // ✗
   ```

2. **Missing `visibility: ["app"]`:** Without this, the tool is model-facing and won't respond to View calls. Set it in `_meta.ui`:
   ```typescript
   _meta: {
     ui: {
       resourceUri,
       visibility: ["app"],
     },
   },
   ```

3. **`resourceUri` mismatch:** App-only tools must use the same `resourceUri` as the main tool/resource pair.

---

## Inspector Works But Host Doesn't

### Tool works in MCP Inspector but not in Claude Desktop / VS Code

**Symptom:** Inspector shows correct `structuredContent` and resource content, but Claude Desktop shows a blank view or error.

**Causes:**

1. **`RESOURCE_MIME_TYPE` not used:** The resource must return `mimeType: RESOURCE_MIME_TYPE`, not a hardcoded string:
   ```typescript
   import { RESOURCE_MIME_TYPE } from "@modelcontextprotocol/ext-apps/server";
   // ...
   return { contents: [{ uri, mimeType: RESOURCE_MIME_TYPE, text: html }] };
   ```

2. **HTML not self-contained:** The bundled HTML must be a single file with all JS/CSS inlined. If `vite-plugin-singlefile` didn't inline everything, check Vite warnings during build.

3. **Node path wrong in config:** Claude Desktop config must use an absolute path:
   ```json
   { "command": "node", "args": ["/absolute/path/to/dist/main.js"] }
   ```

---

## Build Overwrites Other Apps

### Building one app removes another app's HTML from dist/

**Symptom:** After running `vite build`, previously built `.html` files in `dist/` disappear.

**Cause:** `emptyOutDir` defaults to `true` in Vite, which clears `dist/` before each build.

**Fix:** Set `emptyOutDir: false` in `vite.config.ts`:
```typescript
build: {
  outDir: "dist",
  emptyOutDir: false,  // ← critical for multi-app servers
}
```

If using chained builds (Approach B), add `rm -rf dist/*.html` once at the start of the build script to clear stale HTML, then build all apps:
```jsonc
{
  "build": "tsc ... && rm -rf dist/*.html && cross-env INPUT=a.html vite build && cross-env INPUT=b.html vite build"
}
```

---

## Quick Diagnostic Checklist

Run through this when something isn't working:

| # | Check | How |
|---|-------|-----|
| 1 | Built recently? | `npm run build` — does it succeed? |
| 2 | HTML exists? | `ls dist/*.html` — is your app's file there? |
| 3 | Inspector works? | `npx @modelcontextprotocol/inspector node dist/main.js` |
| 4 | Tool listed? | In Inspector, check Tools tab — is your tool there? |
| 5 | `structuredContent` present? | Call tool in Inspector — does response include it? |
| 6 | Resource registered? | In Inspector, check Resources tab — is your `ui://` URI there? |
| 7 | URI match? | Compare tool's `resourceUri` with resource's registered URI (exact match?) |
| 8 | `app.connect()` called? | In the View source, verify `connect()` is called |
| 9 | `ontoolresult` set? | Verify handler is assigned before `connect()` |
| 10 | Console errors? | Check browser DevTools console in the MCP host |
