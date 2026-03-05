/**
 * Bundle assets from the monorepo into dist/bundled/ so they ship with
 * the npm package.  Customers get skills, patterns, AGENTS.md, and prompt
 * files without needing a GITHUB_TOKEN or any GitHub API calls.
 */

import { cpSync, existsSync, mkdirSync, rmSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "../.."); // monorepo root
const dest = path.resolve(__dirname, "../dist/bundled");

// Wipe previous bundle
if (existsSync(dest)) rmSync(dest, { recursive: true });
mkdirSync(dest, { recursive: true });

const assets = [
  { src: ".github/skills", dst: ".github/skills" },
  { src: ".github/AGENTS.md", dst: ".github/AGENTS.md" },
  { src: ".github/prompts", dst: ".github/prompts" },
  { src: "coherence-preview/src/patterns", dst: "patterns" },
];

// Files/dirs to skip
const EXCLUDE = new Set([
  ".browser-profile",
  ".skill-organizer.manifest.json",
  ".DS_Store",
  "__pycache__",
]);

let fileCount = 0;

for (const { src, dst } of assets) {
  const srcPath = path.join(root, src);
  const dstPath = path.join(dest, dst);

  if (!existsSync(srcPath)) {
    console.warn(`  ⚠ skipping ${src} (not found)`);
    continue;
  }

  cpSync(srcPath, dstPath, {
    recursive: true,
    filter: (source) => {
      const name = path.basename(source);
      if (EXCLUDE.has(name) || name.endsWith(".pyc")) return false;
      return true;
    },
  });
  fileCount++;
}

console.log(`  ✓ Bundled ${fileCount} asset groups into dist/bundled/`);
