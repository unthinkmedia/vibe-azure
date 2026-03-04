/**
 * CLI init command — scaffolds a standalone Coherence experiment workspace.
 * Reuses the same logic as the init_workspace MCP tool but runs directly
 * from the command line without needing the MCP server.
 *
 * Usage: npx @unthinkmedia/coherence-prototyper-mcp init [target-dir]
 */

import { existsSync } from "node:fs";
import fsp from "node:fs/promises";
import path from "node:path";
import { execSync } from "node:child_process";

const GITHUB_REPO = "unthinkmedia/vibe-azure";
const PATTERNS_PATH = "coherence-preview/src/patterns";

async function githubFetch(apiPath: string): Promise<any> {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github.v3+json",
    "User-Agent": "coherence-prototyper-mcp",
  };
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `token ${process.env.GITHUB_TOKEN}`;
  }
  const res = await fetch(
    `https://api.github.com/repos/${GITHUB_REPO}/${apiPath}`,
    { headers }
  );
  if (!res.ok) throw new Error(`GitHub API ${res.status}: ${res.statusText}`);
  return res.json();
}

async function githubGetFileContent(filePath: string): Promise<string> {
  const data = await githubFetch(`contents/${filePath}`);
  if (data.encoding === "base64" && data.content) {
    return Buffer.from(data.content, "base64").toString("utf-8");
  }
  throw new Error(`Unexpected response for ${filePath}`);
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

  // Fetch patterns from GitHub
  let patternFiles: string[] = [];
  try {
    const listing = await githubFetch(`contents/${PATTERNS_PATH}`);
    patternFiles = (listing as any[])
      .filter((f: any) => f.type === "file")
      .map((f: any) => f.name);
  } catch {
    warnings.push(
      "Could not fetch pattern list from GitHub. You may need a GITHUB_TOKEN for API access."
    );
  }

  const patterns: Array<{ name: string; content: string }> = [];
  if (patternFiles.length > 0) {
    process.stdout.write(`   Fetching ${patternFiles.length} shared patterns...`);
    for (const pf of patternFiles) {
      try {
        const content = await githubGetFileContent(`${PATTERNS_PATH}/${pf}`);
        patterns.push({ name: pf, content });
      } catch {
        // skip
      }
    }
    console.log(` ✓`);
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

  // .npmrc — try local monorepo first, then GitHub
  let npmrc = "";
  const monorepoNpmrc = path.resolve(
    import.meta.dirname,
    "../../coherence-preview/.npmrc"
  );
  if (existsSync(monorepoNpmrc)) {
    try {
      npmrc = await fsp.readFile(monorepoNpmrc, "utf-8");
    } catch {
      /* fall through */
    }
  }
  if (!npmrc) {
    try {
      npmrc = await githubGetFileContent("coherence-preview/.npmrc");
    } catch {
      warnings.push(
        "Could not find .npmrc for @charm-ux registry. Copy it from a team member or the monorepo's coherence-preview/.npmrc."
      );
    }
  }

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
          "../copilot-button": ["./src/patterns/CopilotSuggestions"],
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
        "coherence-prototyper": {
          type: "stdio",
          command: "npx",
          args: ["-y", "@unthinkmedia/coherence-prototyper-mcp"],
        },
      },
    },
    null,
    2
  );

  // Write all files
  process.stdout.write(`   Writing project files...`);
  await writeFile(absDir, "package.json", packageJson, created);
  if (npmrc) {
    await writeFile(absDir, ".npmrc", npmrc, created);
  }
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

  // Install dependencies
  if (npmrc) {
    process.stdout.write(`   Installing dependencies...`);
    try {
      execSync("npm install", { cwd: absDir, stdio: "pipe" });
      console.log(` ✓`);
    } catch (e: any) {
      console.log(` ✗`);
      warnings.push(`npm install failed: ${e.message}`);
    }
  } else {
    warnings.push(
      "Skipped npm install — .npmrc not found. Add it manually then run npm install."
    );
  }

  // Summary
  console.log(`\n✅ Workspace ready!\n`);
  console.log(`   Next steps:`);
  console.log(`   1. Open in VS Code:  code ${absDir}`);
  console.log(`   2. Say to Copilot:   "build me an Azure page"`);
  console.log(`   3. Preview locally:  npm run dev`);
  console.log(`   4. Deploy:           "deploy it"\n`);

  if (warnings.length > 0) {
    console.log(`   ⚠️  Warnings:`);
    for (const w of warnings) {
      console.log(`   - ${w}`);
    }
    console.log();
  }
}
