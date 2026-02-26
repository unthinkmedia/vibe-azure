#!/usr/bin/env bash
#
# scaffold.sh — Generate a working MCP App project from scratch.
#
# Usage:
#   bash scaffold.sh                    # Interactive prompts
#   bash scaffold.sh my-app             # App name from argument
#   bash scaffold.sh my-app my-mcp-app  # App name + project directory
#
# Creates a complete project with server, client View, Vite config,
# dual tsconfigs, package.json, and test script — ready to build & run.
#

set -euo pipefail

# ── Input ──

APP_NAME="${1:-}"
PROJECT_DIR="${2:-}"

if [[ -z "$APP_NAME" ]]; then
  printf "App name (kebab-case, e.g. icon-browser): "
  read -r APP_NAME
fi

if [[ -z "$APP_NAME" ]]; then
  echo "Error: App name is required." >&2
  exit 1
fi

if [[ -z "$PROJECT_DIR" ]]; then
  PROJECT_DIR="$APP_NAME"
fi

# Derive identifiers
TOOL_NAME="${APP_NAME//-/_}"                  # icon-browser → icon_browser
TITLE=$(echo "$APP_NAME" | tr '-' ' ' | awk '{for(i=1;i<=NF;i++) $i=toupper(substr($i,1,1)) substr($i,2)} 1')
SERVER_NAME="${APP_NAME}"                      # used as McpServer name

echo "Scaffolding MCP App: $TITLE"
echo "  Directory: $PROJECT_DIR/"
echo "  Tool name: $TOOL_NAME"
echo ""

# ── Create project ──

mkdir -p "$PROJECT_DIR/src"
cd "$PROJECT_DIR"

# ── package.json ──

cat > package.json << JSONEOF
{
  "name": "$APP_NAME",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "build": "tsc --noEmit && tsc -p tsconfig.server.json && vite build",
    "start": "concurrently \"vite build --watch\" \"tsx watch main.ts\"",
    "dev": "tsx main.ts",
    "test": "npm run build && npx @modelcontextprotocol/inspector node dist/main.js"
  },
  "dependencies": {
    "@modelcontextprotocol/ext-apps": "^1.0.1",
    "@modelcontextprotocol/sdk": "^1.12.1",
    "@vscode-elements/elements": "^2.5.0",
    "zod": "^3.24.1"
  },
  "devDependencies": {
    "@types/node": "^22.10.2",
    "concurrently": "^9.1.0",
    "cross-env": "^7.0.3",
    "tsx": "^4.19.2",
    "typescript": "^5.7.2",
    "vite": "^7.3.1",
    "vite-plugin-singlefile": "^2.0.6"
  }
}
JSONEOF

# ── tsconfig.json (client-side, noEmit) ──

cat > tsconfig.json << 'JSONEOF'
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ES2022",
    "moduleResolution": "bundler",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "lib": ["ES2022", "DOM", "DOM.Iterable"]
  },
  "include": ["src/**/*.ts", "*.ts"],
  "exclude": ["node_modules", "dist"]
}
JSONEOF

# ── tsconfig.server.json (server-side, compiles to dist/) ──

cat > tsconfig.server.json << 'JSONEOF'
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "Node16",
    "moduleResolution": "Node16",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "outDir": "dist",
    "rootDir": ".",
    "declaration": true,
    "sourceMap": true,
    "lib": ["ES2022"]
  },
  "include": ["server.ts", "main.ts"],
  "exclude": ["node_modules", "dist"]
}
JSONEOF

# ── vite.config.ts ──

cat > vite.config.ts << TSEOF
import { defineConfig } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";

export default defineConfig({
  plugins: [viteSingleFile()],
  build: {
    outDir: "dist",
    emptyOutDir: false,
    rollupOptions: {
      input: {
        "$APP_NAME": "$APP_NAME.html",
      },
    },
  },
});
TSEOF

# ── main.ts (entry point) ──

cat > main.ts << 'TSEOF'
#!/usr/bin/env node
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { createServer } from "./server.js";

const server = createServer();
const transport = new StdioServerTransport();
await server.connect(transport);
TSEOF

# ── server.ts ──

cat > server.ts << TSEOF
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
    name: "$SERVER_NAME",
    version: "1.0.0",
  });

  const resourceUri = "ui://$APP_NAME/$APP_NAME.html";

  // Model-facing tool
  registerAppTool(
    server,
    "$TOOL_NAME",
    {
      title: "$TITLE",
      description: "TODO: Describe what this tool does",
      inputSchema: {
        query: z.string().optional().describe("Optional search query"),
      },
      _meta: { ui: { resourceUri } },
    },
    async ({ query }) => {
      // TODO: Replace with real data fetching
      const items = [
        { id: "1", name: "Example Item", value: 42 },
        { id: "2", name: "Another Item", value: 17 },
      ];
      return {
        content: [
          { type: "text", text: \`Showing \${items.length} items.\` },
        ],
        structuredContent: { items, query: query ?? null },
      };
    }
  );

  // HTML resource
  registerAppResource(
    server,
    "$TITLE UI",
    resourceUri,
    { description: "Interactive UI for $TOOL_NAME" },
    async () => {
      let html: string;
      try {
        html = await fs.readFile(
          path.join(DIST_DIR, "$APP_NAME.html"),
          "utf-8"
        );
      } catch {
        html =
          "<html><body><p>App not built. Run <code>npm run build</code>.</p></body></html>";
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
TSEOF

# ── HTML entry point ──

cat > "$APP_NAME.html" << HTMLEOF
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>$TITLE</title>
</head>
<body>
  <div id="app"></div>
  <script type="module" src="/src/$APP_NAME.ts"></script>
</body>
</html>
HTMLEOF

# ── Client-side View ──

cat > "src/$APP_NAME.ts" << 'TSEOF'
import { App } from "@modelcontextprotocol/ext-apps";
import "@vscode-elements/elements/dist/bundled.js";

// ── Types ──

interface AppData {
  items: Array<{ id: string; name: string; value: number }>;
  query: string | null;
}

// ── State ──

let currentData: AppData = { items: [], query: null };
let lastFingerprint = "";

// ── App setup ──

const app = new App({ name: "My App", version: "1.0.0" });
const root = document.getElementById("app")!;

// ── Render ──

function render() {
  const { items, query } = currentData;
  root.innerHTML = `
    <style>
      :root {
        --bg: var(--vscode-editor-background, #1e1e1e);
        --fg: var(--vscode-editor-foreground, #cccccc);
        --border: var(--vscode-panel-border, #2d2d2d);
        --accent: var(--vscode-focusBorder, #007fd4);
      }
      * { box-sizing: border-box; margin: 0; padding: 0; }
      body {
        font-family: var(--vscode-font-family, sans-serif);
        font-size: var(--vscode-font-size, 13px);
        background: var(--bg);
        color: var(--fg);
        padding: 16px;
        line-height: 1.4;
      }
      h2 { margin-bottom: 12px; font-weight: 600; }
      .header { margin-bottom: 16px; }
      .count { color: var(--vscode-descriptionForeground, #888); margin-top: 4px; }
    </style>
    <div class="header">
      <h2>${query ? `Results for "${query}"` : "All Items"}</h2>
      <div class="count">${items.length} item${items.length !== 1 ? "s" : ""}</div>
    </div>
    <vscode-table zebra bordered-columns>
      <vscode-table-header slot="header">
        <vscode-table-header-cell>Name</vscode-table-header-cell>
        <vscode-table-header-cell>Value</vscode-table-header-cell>
      </vscode-table-header>
      <vscode-table-body slot="body">
        ${items.map(item => `
          <vscode-table-row>
            <vscode-table-cell>${escapeHtml(item.name)}</vscode-table-cell>
            <vscode-table-cell>${item.value}</vscode-table-cell>
          </vscode-table-row>
        `).join("")}
      </vscode-table-body>
    </vscode-table>
  `;
}

// ── Handle tool result ──

app.ontoolresult = (result) => {
  const data = result.structuredContent as AppData | undefined;
  if (!data) return;
  const fp = JSON.stringify(data);
  if (fp === lastFingerprint) return;
  lastFingerprint = fp;
  currentData = data;
  render();
};

// ── Theme ──

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

// ── Helpers ──

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
TSEOF

# ── Done ──

echo ""
echo "✓ Project scaffolded in $PROJECT_DIR/"
echo ""
echo "Next steps:"
echo "  cd $PROJECT_DIR"
echo "  npm install"
echo "  npm run build"
echo "  npm test          # Opens MCP Inspector"
echo ""
echo "Then add to your MCP client config:"
echo "  node $(pwd)/dist/main.js"
