#!/usr/bin/env node
/**
 * sync-patterns.mjs
 *
 * Scans coherence-preview/src/patterns/ for Pattern*.tsx and Scaffold*.tsx files
 * with `export default` and checks that each is registered in main.tsx.
 *
 * Usage:
 *   node scripts/sync-patterns.mjs          # Report only (exit 1 if out-of-sync)
 *   node scripts/sync-patterns.mjs --fix    # Auto-add missing entries to main.tsx
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const srcDir = path.resolve(__dirname, '..', 'src');
const patternsDir = path.resolve(srcDir, 'patterns');
const mainPath = path.resolve(srcDir, 'main.tsx');

const fix = process.argv.includes('--fix');

// ─── 1. Discover all Pattern*.tsx and Scaffold*.tsx with export default ───
function discoverFiles() {
  const files = fs.readdirSync(patternsDir).filter(f => f.endsWith('.tsx'));
  const patternFiles = [];
  const scaffoldFiles = [];

  for (const file of files) {
    const isPattern = file.startsWith('Pattern');
    const isScaffold = file.startsWith('Scaffold');
    if (!isPattern && !isScaffold) continue;

    const content = fs.readFileSync(path.resolve(patternsDir, file), 'utf-8');
    if (!content.includes('export default')) continue;

    const baseName = file.replace('.tsx', '');
    // Convert PascalCase to kebab-case id: PatternNavLink → pattern-nav-link
    const id = baseName
      .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
      .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
      .toLowerCase();

    // Extract title and description from JSDoc or file header
    const jsdocMatch = content.match(/\/\*\*[\s\S]*?\*\//);
    let title = baseName.replace(/^(Pattern|Scaffold)/, '').replace(/([A-Z])/g, ' $1').trim();
    let description = '';
    if (jsdocMatch) {
      const doc = jsdocMatch[0];
      // Look for lines like " * Pattern: Nav Link (Horizontal)" or " * Scaffold: Browse Blade"
      const titleMatch = doc.match(/\*\s*(?:Pattern|Scaffold):\s*(.+)/);
      if (titleMatch) title = titleMatch[1].trim();
      // Description is the next non-empty line after title
      const descMatch = doc.match(/\*\s*(?:Pattern|Scaffold):\s*.+\n\s*\*\s*\n\s*\*\s*(.+)/);
      if (descMatch) description = descMatch[1].trim();
    }

    const entry = { file, baseName, id, title, description };
    if (isPattern) patternFiles.push(entry);
    else scaffoldFiles.push(entry);
  }

  return { patternFiles, scaffoldFiles };
}

// ─── 2. Parse main.tsx to find registered IDs ───
function getRegisteredIds(mainSrc) {
  const ids = new Set();
  const idRegex = /id:\s*'([^']+)'/g;
  let m;
  while ((m = idRegex.exec(mainSrc)) !== null) {
    ids.add(m[1]);
  }
  return ids;
}

// ─── 3. Generate an entry block for a missing pattern/scaffold ───
function generateEntry(entry, type) {
  const importPath = `./patterns/${entry.baseName}`;
  const tags = [];

  if (type === 'pattern') {
    // Derive some basic tags from the title
    const lower = entry.title.toLowerCase();
    if (lower.includes('nav') || lower.includes('header')) tags.push('navigation');
    if (lower.includes('card') || lower.includes('tile')) tags.push('cards');
    if (lower.includes('filter') || lower.includes('toolbar')) tags.push('toolbar');
    if (lower.includes('chart') || lower.includes('donut') || lower.includes('gauge')) tags.push('chart');
    if (lower.includes('copilot')) tags.push('copilot');
    if (tags.length === 0) tags.push('component');
  } else {
    const lower = entry.title.toLowerCase();
    if (lower.includes('browse')) tags.push('browse');
    if (lower.includes('create')) tags.push('create-flow');
    if (lower.includes('home')) tags.push('home');
    if (lower.includes('blade') || lower.includes('sidebar')) tags.push('sidebar');
    if (lower.includes('designer')) tags.push('designer');
    if (lower.includes('marketplace')) tags.push('marketplace');
    if (tags.length === 0) tags.push('layout');
  }

  const desc = entry.description || entry.title;
  return [
    `  {`,
    `    id: '${entry.id}',`,
    `    title: '${entry.title.replace(/'/g, "\\'")}',`,
    `    description: '${desc.replace(/'/g, "\\'")}',`,
    `    component: lazy(() => import('${importPath}')),`,
    `    tags: [${tags.map(t => `'${t}'`).join(', ')}],`,
    `  },`,
  ].join('\n');
}

// ─── 4. Insert missing entries into main.tsx ───
function insertEntries(mainSrc, missing, sectionMarker) {
  // Find the closing `];` of the section array by locating a pattern like:
  //   `]; // end of patterns` or just the `];` after the section marker
  // We look for the comment-based marker or the last entry in the section
  const lines = mainSrc.split('\n');

  // Find the section start
  const markerIdx = lines.findIndex(l => l.includes(sectionMarker));
  if (markerIdx === -1) {
    console.error(`  Could not find section marker: "${sectionMarker}" in main.tsx`);
    return mainSrc;
  }

  // Find the closing `];` after the marker
  let closingIdx = -1;
  for (let i = markerIdx + 1; i < lines.length; i++) {
    if (lines[i].trimStart() === '];') {
      closingIdx = i;
      break;
    }
  }

  if (closingIdx === -1) {
    console.error(`  Could not find closing ]; for section "${sectionMarker}"`);
    return mainSrc;
  }

  // Insert all missing entries before the `];`
  const insertBlock = missing.join('\n');
  lines.splice(closingIdx, 0, insertBlock);

  return lines.join('\n');
}

// ─── Main ───
const { patternFiles, scaffoldFiles } = discoverFiles();
const mainSrc = fs.readFileSync(mainPath, 'utf-8');
const registeredIds = getRegisteredIds(mainSrc);

const missingPatterns = patternFiles.filter(p => !registeredIds.has(p.id));
const missingScaffolds = scaffoldFiles.filter(s => !registeredIds.has(s.id));

const totalMissing = missingPatterns.length + missingScaffolds.length;

if (totalMissing === 0) {
  console.log('✓ All patterns and scaffolds are registered in main.tsx');
  console.log(`  ${patternFiles.length} patterns, ${scaffoldFiles.length} scaffolds`);
  process.exit(0);
}

console.log(`Found ${totalMissing} unregistered entries:\n`);

if (missingPatterns.length > 0) {
  console.log('Missing Patterns:');
  for (const p of missingPatterns) {
    console.log(`  - ${p.id} (${p.file})`);
  }
}

if (missingScaffolds.length > 0) {
  console.log('Missing Scaffolds:');
  for (const s of missingScaffolds) {
    console.log(`  - ${s.id} (${s.file})`);
  }
}

if (!fix) {
  console.log('\nRun with --fix to auto-add these entries to main.tsx');
  process.exit(1);
}

// Apply fixes
console.log('\nApplying fixes...');
let updated = mainSrc;

if (missingPatterns.length > 0) {
  const blocks = missingPatterns.map(p => generateEntry(p, 'pattern'));
  updated = insertEntries(updated, blocks, '// ─── Composition Patterns ───');
  console.log(`  Added ${missingPatterns.length} pattern(s)`);
}

if (missingScaffolds.length > 0) {
  const blocks = missingScaffolds.map(s => generateEntry(s, 'scaffold'));
  updated = insertEntries(updated, blocks, '// ─── Page Scaffolds ───');
  console.log(`  Added ${missingScaffolds.length} scaffold(s)`);
}

fs.writeFileSync(mainPath, updated, 'utf-8');
console.log('✓ main.tsx updated. Review the new entries and adjust titles/descriptions/tags as needed.');
