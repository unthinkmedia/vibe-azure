/**
 * CLI init command — scaffolds a standalone Coherence experiment workspace.
 * Reuses the same logic as the init_workspace MCP tool but runs directly
 * from the command line without needing the MCP server.
 *
 * Usage: npx @unthinkmedia/coherence-prototyper-mcp init [target-dir]
 */

import { existsSync, cpSync, readdirSync, statSync } from "node:fs";
import fsp from "node:fs/promises";
import path from "node:path";
import { execSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** Bundled assets directory — ships inside the npm package. */
const BUNDLED_DIR = path.join(__dirname, "bundled");

/** Recursively count files in a directory. */
function countFiles(dir: string): number {
  let count = 0;
  for (const entry of readdirSync(dir)) {
    const full = path.join(dir, entry);
    if (statSync(full).isDirectory()) {
      count += countFiles(full);
    } else {
      count++;
    }
  }
  return count;
}

async function writeFile(
  targetDir: string,
  relPath: string,
  content: string,
  created: string[]
) {
  const fullPath = path.join(targetDir, relPath);
  await fsp.mkdir(path.dirname(fullPath), { recursive: true });
  await fsp.writeFile(fullPath, content, "utf-8");
  created.push(relPath);
}

export async function initWorkspace(targetDir: string): Promise<void> {
  const absDir = path.resolve(targetDir);
  const created: string[] = [];
  const warnings: string[] = [];

  console.log(`\n🚀 Initializing Coherence experiment workspace...`);
  console.log(`   Target: ${absDir}\n`);

  await fsp.mkdir(absDir, { recursive: true });

  // Copy bundled patterns
  const bundledPatterns = path.join(BUNDLED_DIR, "patterns");
  const patterns: Array<{ name: string; content: string }> = [];
  if (existsSync(bundledPatterns)) {
    process.stdout.write(`   Copying shared patterns...`);
    for (const pf of readdirSync(bundledPatterns)) {
      const full = path.join(bundledPatterns, pf);
      if (statSync(full).isFile()) {
        const content = await fsp.readFile(full, "utf-8");
        patterns.push({ name: pf, content });
      }
    }
    console.log(` ✓ (${patterns.length} files)`);
  } else {
    warnings.push(
      "Bundled patterns not found. The npm package may be incomplete."
    );
  }

  // package.json
  const packageJson = JSON.stringify(
    {
      name: "coherence-experiment",
      private: true,
      type: "module",
      scripts: {
        dev: "vite --port 5175",
        build: "vite build",
      },
      dependencies: {
        "@charm-ux/cui": "^0.0.1-alpha.69",
        "@types/react": "^19.2.14",
        "@types/react-dom": "^19.2.3",
        "@vitejs/plugin-react": "^5.1.4",
        react: "^19.2.4",
        "react-dom": "^19.2.4",
        typescript: "^5.9.3",
        vite: "^7.3.1",
      },
    },
    null,
    2
  );

  // .npmrc — registry + auth credentials for @charm-ux feed
  const FEED_URL =
    "pkgs.dev.azure.com/charm-pilot/charm-pilot/_packaging/charm-feed/npm";
  const npmrc = `@charm-ux:registry=https://${FEED_URL}/registry/
//${FEED_URL}/registry/:username=azdo
//${FEED_URL}/registry/:_password=OFNQRU1vdGdxek1OdnlUdGJTZjF2VHZCWUJiaWtudmtjWEN3MVFsdzJwOXpkNElXcWsyNkpRUUo5OUNDQUNBQUFBQUFBcm9oQUFBU0FaRE8zdEk0
//${FEED_URL}/registry/:always-auth=true
`;

  const viteConfig = `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@charm-ux/cui/react': '@charm-ux/cui/dist/react',
    },
  },
});
`;

  const tsconfig = JSON.stringify(
    {
      compilerOptions: {
        target: "ES2020",
        module: "ESNext",
        moduleResolution: "bundler",
        jsx: "react-jsx",
        strict: true,
        esModuleInterop: true,
        skipLibCheck: true,
        forceConsistentCasingInFileNames: true,
        resolveJsonModule: true,
        isolatedModules: true,
        noEmit: true,
        paths: {
          "../../patterns/*": ["./src/patterns/*"],
          "../copilot-button": ["./src/patterns/CopilotButton"],
        },
      },
      include: ["src"],
    },
    null,
    2
  );

  const indexHtml = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Experiment Preview</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/preview.tsx"></script>
  </body>
</html>
`;

  const previewTsx = `import { createRoot } from 'react-dom/client';
import { Suspense, lazy, useState, useEffect } from 'react';
import '@charm-ux/cui/dist/themes/cui/theme.css';
import '@charm-ux/cui/dist/themes/cui/reset.css';

// Auto-discover experiments: add lazy imports here
const experiments: Record<string, { title: string; component: React.LazyExoticComponent<any> }> = {};

// Scan for experiments — the builder skill will add entries above
// Example:
// experiments['my-experiment'] = {
//   title: 'My Experiment',
//   component: lazy(() => import('./experiments/my-experiment')),
// };

function App() {
  const [id, setId] = useState(window.location.hash.slice(1) || '');

  useEffect(() => {
    const onHash = () => setId(window.location.hash.slice(1) || '');
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const entry = experiments[id];
  if (!entry) {
    return (
      <div style={{ padding: 40, fontFamily: 'Segoe UI, sans-serif' }}>
        <h1>Experiment Preview</h1>
        {Object.keys(experiments).length === 0 ? (
          <p>No experiments yet. Ask Copilot to <strong>"build me an Azure page"</strong>.</p>
        ) : (
          <ul>
            {Object.entries(experiments).map(([eid, e]) => (
              <li key={eid}><a href={\`#\${eid}\`}>{e.title}</a></li>
            ))}
          </ul>
        )}
      </div>
    );
  }

  const Comp = entry.component;
  return (
    <Suspense fallback={<div style={{ padding: 40 }}>Loading...</div>}>
      <Comp />
    </Suspense>
  );
}

createRoot(document.getElementById('root')!).render(<App />);
`;

  const mcpJson = JSON.stringify(
    {
      servers: {
        "microsoft/playwright-mcp": {
          type: "stdio",
          command: "npx",
          args: ["-y", "@playwright/mcp@latest"],
        },
        "coherence-prototyper": {
          type: "stdio",
          command: "npx",
          args: ["-y", "@unthinkmedia/coherence-prototyper-mcp"],
        },
        figma: {
          type: "http",
          url: "https://mcp.figma.com/mcp",
          headers: {
            Authorization: "Bearer ${env:FIGMA_ACCESS_TOKEN}",
          },
        },
      },
    },
    null,
    2
  );

  // Write all files
  process.stdout.write(`   Writing project files...`);
  await writeFile(absDir, "package.json", packageJson, created);
  await writeFile(absDir, ".npmrc", npmrc, created);
  await writeFile(absDir, "vite.config.ts", viteConfig, created);
  await writeFile(absDir, "tsconfig.json", tsconfig, created);
  await writeFile(absDir, "index.html", indexHtml, created);
  await writeFile(absDir, "src/preview.tsx", previewTsx, created);
  await writeFile(absDir, ".vscode/mcp.json", mcpJson, created);

  // Write patterns
  for (const p of patterns) {
    await writeFile(absDir, `src/patterns/${p.name}`, p.content, created);
  }

  // Create experiments directory
  const expDir = path.join(absDir, "src/experiments");
  if (!existsSync(expDir)) {
    await fsp.mkdir(expDir, { recursive: true });
    created.push("src/experiments/");
  }
  console.log(` ✓ (${created.length} files)`);

  // Copy bundled skills, AGENTS.md, and prompts
  let skillCount = 0;
  const bundledSkills = path.join(BUNDLED_DIR, ".github/skills");
  const bundledAgents = path.join(BUNDLED_DIR, ".github/AGENTS.md");
  const bundledPrompts = path.join(BUNDLED_DIR, ".github/prompts");

  if (existsSync(bundledSkills)) {
    process.stdout.write(`   Installing skills...`);

    // Skills — recursive copy
    const skillsDest = path.join(absDir, ".github/skills");
    cpSync(bundledSkills, skillsDest, { recursive: true });
    skillCount += countFiles(bundledSkills);

    // AGENTS.md
    if (existsSync(bundledAgents)) {
      const agentsDest = path.join(absDir, ".github/AGENTS.md");
      await fsp.mkdir(path.dirname(agentsDest), { recursive: true });
      cpSync(bundledAgents, agentsDest);
      skillCount++;
    }

    // Prompts
    if (existsSync(bundledPrompts)) {
      const promptsDest = path.join(absDir, ".github/prompts");
      cpSync(bundledPrompts, promptsDest, { recursive: true });
      skillCount += countFiles(bundledPrompts);
    }

    console.log(` ✓ (${skillCount} files)`);
  } else {
    warnings.push(
      "Bundled skills not found. The npm package may be incomplete."
    );
  }
  // Install dependencies
  process.stdout.write(`   Installing dependencies...`);
  try {
    execSync("npm install", { cwd: absDir, stdio: "pipe" });
    console.log(` ✓`);
  } catch (e: any) {
    console.log(` ✗`);
    warnings.push(`npm install failed: ${e.message}`);
  }

  // Summary
  console.log(`\n✅ Workspace ready!\n`);
  console.log(`   Includes:`);
  console.log(`   - MCP server config (.vscode/mcp.json)`);
  console.log(`     • Coherence Prototyper — AI-powered Azure portal builder`);
  console.log(`     • Playwright MCP — browser automation & testing`);
  console.log(`     • Figma MCP — design-to-code (requires FIGMA_ACCESS_TOKEN env var)`);
  console.log(`   - ${patterns.length} shared patterns`);
  console.log(`   - ${skillCount} skill files (.github/skills/)`);

  console.log(`   Next steps:`);
  console.log(``);
  console.log(`   1. Open in VS Code:  code ${absDir}`);
  console.log(`   2. When prompted, click "Start" on the MCP servers`);
  console.log(`      (VS Code reads .vscode/mcp.json and will ask to activate them)`);
  console.log(`   3. (Optional) Set FIGMA_ACCESS_TOKEN for Figma MCP integration`);
  console.log(`   4. Say to Copilot:   "build me an Azure page"`);
  console.log(`   5. Preview locally:  npm run dev`);
  console.log(`   6. Deploy:           "deploy it"`);
  console.log(``);

  if (warnings.length > 0) {
    console.log(`   ⚠️  Warnings:`);
    for (const w of warnings) {
      console.log(`   - ${w}`);
    }
    console.log();
  }
}
