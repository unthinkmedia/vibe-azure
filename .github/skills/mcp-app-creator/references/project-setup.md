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
npm install @modelcontextprotocol/ext-apps @modelcontextprotocol/sdk zod

# Dev
npm install -D typescript vite vite-plugin-singlefile @types/node tsx concurrently cross-env

# UI components (MANDATORY for all MCP App views)
npm install @vscode-elements/elements
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

> **Important:** `tsconfig.server.json` must NOT include `src/**/*.ts`. Client-side View files in `src/` use browser APIs and ES module syntax incompatible with Node16 compilation. Vite handles all client-side TypeScript — tsc only handles the server files.

## 4. Vite Configuration

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

```jsonc
{
  "scripts": {
    "build": "tsc --noEmit && tsc -p tsconfig.server.json && cross-env INPUT=my-app.html vite build",
    "start": "concurrently \"cross-env NODE_ENV=development INPUT=my-app.html vite build --watch\" \"tsx watch main.ts\"",
    "dev": "tsx main.ts"
  }
}
```

### Multiple Apps

When one server has multiple Views, chain vite builds:

```jsonc
{
  "scripts": {
    "build": "tsc --noEmit && tsc -p tsconfig.server.json && rm -rf dist/*.html && cross-env INPUT=app-a.html vite build && cross-env INPUT=app-b.html vite build && cross-env INPUT=app-c.html vite build"
  }
}
```

## 7. Final Directory Structure

```
my-mcp-app/
├── main.ts                ← Server entry (StdioServerTransport)
├── server.ts              ← Tool + resource registration
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

## Server Helper Files

If server-side helper modules are needed (e.g., API clients, data fetchers), place them at the project root or in a `lib/` directory — NOT in `src/`. Add them explicitly to `tsconfig.server.json`'s `include` array.

```
my-mcp-app/
├── main.ts
├── server.ts
├── lib/
│   └── api-client.ts    ← server helper (add to tsconfig.server.json include)
├── my-app.html
├── src/
│   └── my-app.ts        ← client View (Vite only — NOT in tsconfig.server.json)
```
