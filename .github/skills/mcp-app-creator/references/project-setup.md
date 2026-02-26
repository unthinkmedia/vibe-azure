# Greenfield MCP App Project Setup

Step-by-step scaffolding for a new MCP App project from scratch.

## 1. Initialize

```bash
mkdir my-mcp-app && cd my-mcp-app
npm init -y
npm pkg set type=module
```

## 2. Install Dependencies

```bash
# Runtime
npm install @modelcontextprotocol/ext-apps@^1.0.1 @modelcontextprotocol/sdk@^1.12.1 zod

# Dev
npm install -D typescript vite@^7 vite-plugin-singlefile@^2 @types/node tsx concurrently cross-env

# UI components (MANDATORY for all MCP App views)
npm install @vscode-elements/elements@^2.5.0
```

## 3. TypeScript Configuration

### tsconfig.json (client-side)

```json
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
```

### tsconfig.server.json (server-side)

The server tsconfig compiles server-side code to Node.js. The critical rule: **client-side View files must be excluded** — they use browser APIs and ES module syntax incompatible with Node16 compilation. Vite handles all client-side TypeScript.

Choose an approach based on how you organize server vs. client code:

#### Option A: Narrow include (explicit server files only)

Best when server modules live at the project root alongside `server.ts`:

```json
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
```

Add each new server helper to `include` as you create it (e.g., `"include": ["server.ts", "main.ts", "data-fetcher.ts"]`).

#### Option B: Broad include with explicit client excludes

Best when server and client files share a directory (e.g., flat `src/`):

```json
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
  "include": ["main.ts", "server.ts", "src/**/*.ts"],
  "exclude": ["node_modules", "dist", "src/my-app.ts"]
}
```

Each new View's client entry must be added to `exclude`. Server helper modules in `src/` are compiled automatically.

## 4. Vite Configuration

Each View is bundled into a self-contained single-file HTML. Two approaches for handling multiple apps:

### Approach A: Multi-entry config

All apps declared in one `rollupOptions.input` object. Adding a new app means adding one line to the config:

```typescript
// vite.config.ts
import { defineConfig } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";

export default defineConfig({
  plugins: [viteSingleFile()],
  build: {
    outDir: "dist",
    emptyOutDir: false,
    rollupOptions: {
      input: {
        "my-app": "my-app.html",
        // "other-app": "other-app.html",  ← add more here
      },
    },
  },
});
```

### Approach B: Environment variable input

A single `INPUT` env var selects which HTML to build. Adding a new app means adding one chained build to the script:

```typescript
// vite.config.ts
import { defineConfig } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";

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

## 5. Entry Point

```typescript
// main.ts
#!/usr/bin/env node
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { createServer } from "./server.js";

const server = createServer();
const transport = new StdioServerTransport();
await server.connect(transport);
```

## 6. Package Scripts

Scripts depend on which Vite approach you chose:

### If using Approach A (multi-entry config)

```jsonc
{
  "scripts": {
    "build": "tsc --noEmit && tsc -p tsconfig.server.json && vite build",
    "start": "concurrently \"vite build --watch\" \"tsx watch main.ts\"",
    "dev": "tsx main.ts"
  }
}
```

### If using Approach B (INPUT env var)

```jsonc
{
  "scripts": {
    "build": "tsc --noEmit && tsc -p tsconfig.server.json && cross-env INPUT=my-app.html vite build",
    "start": "concurrently \"cross-env INPUT=my-app.html vite build --watch\" \"tsx watch main.ts\"",
    "dev": "tsx main.ts"
  }
}
```

#### Multiple Apps with Approach B

Chain vite builds per HTML entry:

```jsonc
{
  "scripts": {
    "build": "tsc --noEmit && tsc -p tsconfig.server.json && rm -rf dist/*.html && cross-env INPUT=app-a.html vite build && cross-env INPUT=app-b.html vite build"
  }
}
```

## 7. File Organization

Two common layouts — choose based on preference:

### Layout A: Separate directories

Server helpers in `lib/`, client Views in `src/`. Clean separation — tsconfig.server.json includes `lib/` and excludes nothing:

```
my-mcp-app/
├── main.ts                ← Server entry (StdioServerTransport)
├── server.ts              ← Tool + resource registration
├── lib/
│   └── data-fetcher.ts   ← Server-side helper modules
├── my-app.html            ← HTML entry for View
├── src/
│   └── my-app.ts          ← Client-side View logic
├── vite.config.ts
├── tsconfig.json
├── tsconfig.server.json
├── package.json
└── dist/
    ├── main.js            ← Compiled server
    ├── server.js
    └── my-app.html        ← Bundled single-file View
```

### Layout B: Flat src/

Server and client files share `src/`. Simpler tree, but requires tsconfig.server.json excludes for client entries:

```
my-mcp-app/
├── main.ts
├── server.ts
├── my-app.html
├── src/
│   ├── my-app.ts          ← Client View (excluded from server tsconfig)
│   └── data-fetcher.ts   ← Server helper (compiled by server tsconfig)
├── vite.config.ts
├── tsconfig.json
├── tsconfig.server.json
├── package.json
└── dist/
    ├── main.js
    ├── server.js
    └── my-app.html
```

## 8. Claude Desktop Configuration

After building, add to `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "my-app": {
      "command": "node",
      "args": ["/absolute/path/to/my-mcp-app/dist/main.js"]
    }
  }
}
```

## 9. VS Code MCP Configuration

Add to `.vscode/mcp.json`:

```json
{
  "servers": {
    "my-app": {
      "type": "stdio",
      "command": "node",
      "args": ["${workspaceFolder}/mcp-server/dist/main.js"]
    }
  }
}
```

## 10. Testing with MCP Inspector

Before wiring into Claude Desktop or VS Code, test the server with the MCP Inspector:

```bash
npm run build
npx @modelcontextprotocol/inspector node dist/main.js
```

The inspector opens at `http://localhost:5173`. Use it to:
- Verify tools are listed with correct names and descriptions
- Call tools and inspect the `structuredContent` returned
- Confirm resources are registered at the expected `ui://` URI

> **Note:** MCP Inspector does not render the HTML View, but it confirms the server contract (tool inputs, content, structuredContent shape) before testing in Claude Desktop.
