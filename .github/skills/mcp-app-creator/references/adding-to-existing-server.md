# Adding an App to an Existing Multi-App Server

Guide for adding a new MCP App to a server that already has one or more apps.

## Step 0: Discover Existing Conventions

**Before writing any code, read these files to understand how the project is already structured:**

1. **`server.ts`** — How are existing apps registered? Look for:
   - Comment style separating app sections (banners, JSDoc, none)
   - How the `ui://` URI is defined (inline string, `const`, config object)
   - Whether tools are grouped with their resource or in separate sections
   - Whether registration is in one file or split across modules

2. **`tsconfig.server.json`** — How is client code excluded?
   - **Separate directories:** `include` lists only `server.ts`, `main.ts`, `lib/**/*.ts` — client code lives in `src/` and is naturally excluded
   - **Flat src/ with excludes:** `include` has `src/**/*.ts` but `exclude` explicitly lists client files

3. **`vite.config.ts`** — How are multiple apps built?
   - **Multi-entry:** `rollupOptions.input` is an object with all app entries
   - **Chained INPUT:** `process.env.INPUT` selects one entry per build pass

4. **`package.json`** — How are builds orchestrated?
   - **Single vite build:** one command builds all entries
   - **Chained commands:** multiple `cross-env INPUT=... vite build` commands

**Follow whatever conventions you find.** The steps below describe the decisions to make — use the project's existing approach for each.

## Checklist

1. Create the server-side data module (if needed)
2. Register the tool + resource in `server.ts`
3. Create the HTML entry + client-side View
4. Ensure client code is excluded from server compilation
5. Add the new entry to the build config
6. Build and test

## Step 1: Server-Side Data Module

If your app needs data logic beyond what fits in the tool handler, create a helper module. **Where to put it depends on the project's existing structure:**

| Project convention | Where to put server modules | How it's included in tsc |
|---|---|---|
| `lib/` directory for server code | `lib/my-data.ts` | Already in `include` via `lib/**/*.ts` |
| Flat `src/` (mixed client+server) | `src/my-data.ts` | Already in `include` via `src/**/*.ts` (not excluded since it's server code) |
| Modules at project root | `my-data.ts` (next to `server.ts`) | Add to `include` array if not covered by a glob |
| Separate `services/` or `data/` dir | Follow existing pattern | Check that the glob or explicit include covers it |

### Data module pattern

```typescript
// my-data.ts — server-side, imported by server.ts

export interface MyItem {
  id: string;
  name: string;
  value: number;
}

// Caching is optional — use if the data source is slow (API, file parse)
const CACHE_TTL_MS = 60 * 60 * 1000;
let cached: MyItem[] | null = null;
let cachedAt = 0;

async function refresh(): Promise<MyItem[]> {
  if (cached && Date.now() - cachedAt < CACHE_TTL_MS) return cached;
  cached = await fetchItems(); // fetch from API, file, or database
  cachedAt = Date.now();
  return cached;
}

export async function searchItems(query: string): Promise<MyItem[]> {
  const items = await refresh();
  const q = query.toLowerCase();
  return items.filter((i) => i.name.toLowerCase().includes(q));
}

export async function getAllItems(): Promise<MyItem[]> {
  return refresh();
}
```

Import in `server.ts` — **use the `.js` extension** (required for ES module resolution):

```typescript
import { searchItems, getAllItems } from "./lib/my-data.js";
// or: from "./src/my-data.js"  — match the project's directory convention
```

## Step 2: Register in server.ts

Match the existing registration style. The core structure is always the same — tool(s) + resource linked by a shared URI:

```typescript
// Adapt the comment style to match existing apps in the file

const myAppUri = "ui://server-name/my-app.html";

// Model-facing tool
registerAppTool(
  server,
  "my_new_tool",
  {
    title: "My New Tool",
    description: "What this tool does — shown to the model",
    inputSchema: {
      query: z.string().optional().describe("Search query"),
    },
    _meta: { ui: { resourceUri: myAppUri } },
  },
  async ({ query }) => {
    const items = query ? await searchItems(query) : await getAllItems();
    return {
      content: [{ type: "text", text: `Found ${items.length} items.` }],
      structuredContent: { items, query: query ?? null },
    };
  }
);

// App-only tools (if the View needs to call the server directly)
registerAppTool(
  server,
  "my_app_refresh",
  {
    description: "Refresh data from the View",
    inputSchema: {},
    _meta: {
      ui: { resourceUri: myAppUri, visibility: ["app"] },
    },
  },
  async () => {
    const items = await getAllItems();
    return {
      content: [{ type: "text", text: `${items.length} items` }],
      structuredContent: { items },
    };
  }
);

// HTML resource
registerAppResource(
  server,
  "My App",
  myAppUri,
  { description: "Interactive UI for my tool" },
  async () => {
    let html: string;
    try {
      html = await fs.readFile(
        path.join(DIST_DIR, "my-app.html"),
        "utf-8"
      );
    } catch {
      html =
        "<html><body><p>App not built. Run <code>npm run build</code>.</p></body></html>";
    }
    return {
      contents: [
        { uri: myAppUri, mimeType: RESOURCE_MIME_TYPE, text: html },
      ],
    };
  }
);
```

**Placement:** Add the new app section before `return server;`. Keep each app's tools and resource grouped together, matching the grouping style of existing apps.

## Step 3: Create HTML Entry + Client View

**`my-app.html`** (at the project root, alongside other `.html` entries):
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

**`src/my-app.ts`** (client-side View):
```typescript
import { App } from "@modelcontextprotocol/ext-apps";
import "@vscode-elements/elements/dist/bundled.js";
// ... View logic (see SKILL.md Step 2)
```

## Step 4: Exclude Client Code from Server Compilation

Client View files use browser APIs (`document`, `window`) that will cause tsc errors if compiled for Node. **How to exclude depends on the project's existing tsconfig approach:**

**If using separate directories** (`lib/` for server, `src/` for client):
- No action needed — `tsconfig.server.json` already includes only `lib/` and root files

**If using flat `src/` with explicit excludes:**
- Add the new client file to the `exclude` array:
```jsonc
{
  "exclude": [
    "node_modules", "dist",
    "src/existing-app.ts",
    "src/my-app.ts"          // ← add this
  ]
}
```

**If you're unsure:** Try `tsc -p tsconfig.server.json --noEmit`. If it fails with `Cannot find name 'document'`, the client file needs to be excluded.

## Step 5: Add to Build Config

**Match the project's existing build approach:**

**If using multi-entry Vite config:**
```typescript
// vite.config.ts — add to the input object
rollupOptions: {
  input: {
    "existing-app": "existing-app.html",
    "my-app": "my-app.html",       // ← add this
  },
}
```

**If using chained INPUT builds:**
```jsonc
// package.json — append to the build chain
{
  "scripts": {
    "build": "... && cross-env INPUT=my-app.html vite build"
  }
}
```
Also append a watch entry to the `start` script if one exists.

**Key detail:** Ensure `emptyOutDir: false` in `vite.config.ts` so builds don't delete each other's output.

## Step 6: Build and Test

```bash
npm run build
npx @modelcontextprotocol/inspector node dist/main.js
```

Verify:
- [ ] New tool appears with correct name and description
- [ ] Calling the tool returns expected `structuredContent` shape
- [ ] Resource is registered at the `ui://` URI
- [ ] Existing tools still work (no regressions)

## Common Mistakes

| Mistake | Symptom | Fix |
|---------|---------|-----|
| Client file compiled by server tsconfig | `Cannot find name 'document'` during build | Exclude it (separate dir or explicit exclude) |
| New app not in build config | HTML not in `dist/`, resource returns fallback | Add to Vite input or build chain |
| Server module imported without `.js` extension | `ERR_MODULE_NOT_FOUND` at runtime | Use `./lib/my-data.js` not `./lib/my-data` |
| Client file imports Node APIs (`fs`, `path`) | Vite build error or runtime crash in iframe | Move to server-side data module |
| `emptyOutDir: true` in Vite config | Only the last-built app survives | Set `emptyOutDir: false` |
