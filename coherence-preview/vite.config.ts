import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';

/**
 * Vite plugin: local dev API for scaffold management.
 * DELETE /api/scaffold/:id       — removes the scaffold .tsx file + unregisters from main.tsx & PatternsGallery.tsx
 * POST   /api/scaffold/:id/use   — copies scaffold into a new experiment folder and registers in main.tsx
 */
function scaffoldApi() {
  return {
    name: 'scaffold-api',
    configureServer(server: any) {
      server.middlewares.use((req: any, res: any, next: any) => {
        // ── POST /api/scaffold/:id/use — create experiment from scaffold ──
        if (req.method === 'POST' && req.url?.match(/^\/api\/scaffold\/[^/]+\/use/)) {
          const urlParts = req.url.replace('/api/scaffold/', '').split('/');
          const scaffoldId = decodeURIComponent(urlParts[0]);

          // Read request body
          let body = '';
          req.on('data', (chunk: Buffer) => { body += chunk.toString(); });
          req.on('end', () => {
            try {
              const { name } = JSON.parse(body);
              if (!name || !/^[a-z][a-z0-9-]*$/.test(name)) {
                res.statusCode = 400;
                res.end(JSON.stringify({ error: 'Invalid experiment name. Use lowercase letters, numbers, and hyphens (e.g. "my-new-page").' }));
                return;
              }

              const srcDir = path.resolve(__dirname, 'src');
              const mainPath = path.resolve(srcDir, 'main.tsx');
              const experimentsDir = path.resolve(srcDir, 'experiments', name);

              // Check experiment doesn't already exist
              if (fs.existsSync(experimentsDir)) {
                res.statusCode = 409;
                res.end(JSON.stringify({ error: `Experiment "${name}" already exists.` }));
                return;
              }

              // Find the scaffold's source file path from main.tsx
              const mainSrc = fs.readFileSync(mainPath, 'utf-8');
              const idPattern = new RegExp(`id:\\s*'${scaffoldId.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}'`);
              const lines = mainSrc.split('\n');
              const idLineIdx = lines.findIndex(l => idPattern.test(l));
              if (idLineIdx === -1) {
                res.statusCode = 404;
                res.end(JSON.stringify({ error: `Scaffold "${scaffoldId}" not found in main.tsx` }));
                return;
              }

              // Walk forward to find import() path
              let importPath: string | null = null;
              for (let i = idLineIdx; i < Math.min(idLineIdx + 10, lines.length); i++) {
                const m = lines[i].match(/import\(['"](.+?)['"]\)/);
                if (m) { importPath = m[1]; break; }
              }
              if (!importPath) {
                res.statusCode = 500;
                res.end(JSON.stringify({ error: 'Could not find scaffold import path' }));
                return;
              }

              // Read the scaffold source
              const scaffoldFile = path.resolve(srcDir, importPath + '.tsx');
              if (!fs.existsSync(scaffoldFile)) {
                res.statusCode = 404;
                res.end(JSON.stringify({ error: `Scaffold file not found: ${importPath}.tsx` }));
                return;
              }
              const scaffoldContent = fs.readFileSync(scaffoldFile, 'utf-8');

              // Find the scaffold entry to get title/description/tags
              let startIdx = idLineIdx;
              while (startIdx > 0 && !lines[startIdx].trimStart().startsWith('{')) startIdx--;
              let endIdx = idLineIdx;
              while (endIdx < lines.length - 1 && !lines[endIdx].trimStart().startsWith('}')) endIdx++;
              const block = lines.slice(startIdx, endIdx + 1).join('\n');
              const titleMatch = block.match(/title:\s*'([^']+)'/);
              const descMatch = block.match(/description:\s*'([^']+)'/);
              const tagsMatch = block.match(/tags:\s*\[([^\]]*)\]/);
              const scaffoldTitle = titleMatch ? titleMatch[1] : name;
              const scaffoldDesc = descMatch ? descMatch[1] : '';
              const scaffoldTags = tagsMatch ? tagsMatch[1] : '';

              // Create experiment directory and index.tsx
              fs.mkdirSync(experimentsDir, { recursive: true });
              fs.writeFileSync(path.resolve(experimentsDir, 'index.tsx'), scaffoldContent, 'utf-8');

              // Format experiment name as title: "my-new-page" → "My New Page"
              const prettyTitle = name.split('-').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
              const today = new Date().toISOString().slice(0, 10);

              // Register in main.tsx experiments array (insert at top)
              const experimentsArrayLine = lines.findIndex(l => /^const experiments:\s*Entry\[\]\s*=\s*\[/.test(l));
              if (experimentsArrayLine !== -1) {
                const newEntry = [
                  `  {`,
                  `    id: '${name}',`,
                  `    title: '${prettyTitle}',`,
                  `    description: '${scaffoldDesc} (from ${scaffoldTitle} template)',`,
                  `    component: lazy(() => import('./experiments/${name}')),`,
                  `    date: '${today}',`,
                  `    tags: [${scaffoldTags}],`,
                  `  },`,
                ].join('\n');
                lines.splice(experimentsArrayLine + 1, 0, newEntry);
                fs.writeFileSync(mainPath, lines.join('\n'), 'utf-8');
              }

              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ ok: true, id: name, title: prettyTitle }));
            } catch (e: any) {
              res.statusCode = 500;
              res.end(JSON.stringify({ error: e.message }));
            }
          });
          return;
        }

        if (req.method !== 'DELETE' || !req.url?.startsWith('/api/scaffold/')) return next();

        const id = decodeURIComponent(req.url.replace('/api/scaffold/', ''));
        if (!id || !/^scaffold-[\w-]+$/.test(id)) {
          res.statusCode = 400;
          res.end(JSON.stringify({ error: 'Invalid scaffold id' }));
          return;
        }

        const srcDir = path.resolve(__dirname, 'src');
        const mainPath = path.resolve(srcDir, 'main.tsx');
        const galleryPath = path.resolve(srcDir, 'PatternsGallery.tsx');

        /**
         * Safe line-based removal: find the line containing `id: '<id>'`,
         * walk backwards to the opening `{` and forwards to the closing `},`
         * and remove only those lines.
         */
        function removeEntryBlock(filePath: string, targetId: string): string | null {
          const src = fs.readFileSync(filePath, 'utf-8');
          const lines = src.split('\n');
          const idPattern = new RegExp(`id:\\s*'${targetId}'`);

          // Find the line with the matching id
          const idLineIdx = lines.findIndex(l => idPattern.test(l));
          if (idLineIdx === -1) return null;

          // Walk backward to find opening `{` (line that starts with whitespace + `{`)
          let startIdx = idLineIdx;
          while (startIdx > 0 && !lines[startIdx].trimStart().startsWith('{')) {
            startIdx--;
          }

          // Walk forward to find closing `},` or `}` (line that starts with whitespace + `}`)
          let endIdx = idLineIdx;
          while (endIdx < lines.length - 1 && !lines[endIdx].trimStart().startsWith('}')) {
            endIdx++;
          }

          // Extract the import path before removal
          const block = lines.slice(startIdx, endIdx + 1).join('\n');
          const importMatch = block.match(/import\(['"](.+?)['"]\)/);
          const importPath = importMatch ? importMatch[1] : null;

          // Remove the lines
          lines.splice(startIdx, endIdx - startIdx + 1);
          fs.writeFileSync(filePath, lines.join('\n'), 'utf-8');

          return importPath;
        }

        // 1. Remove from main.tsx
        const importPath = removeEntryBlock(mainPath, id);
        if (importPath === null && !fs.readFileSync(mainPath, 'utf-8').includes(`'${id}'`)) {
          res.statusCode = 404;
          res.end(JSON.stringify({ error: `Scaffold "${id}" not found in main.tsx` }));
          return;
        }

        // 2. Remove from PatternsGallery.tsx if present
        if (fs.existsSync(galleryPath)) {
          removeEntryBlock(galleryPath, id);
        }

        // 3. Delete the .tsx file
        const deleted: string[] = [];
        if (importPath) {
          const tsxFile = path.resolve(srcDir, importPath + '.tsx');
          if (fs.existsSync(tsxFile)) {
            fs.unlinkSync(tsxFile);
            deleted.push(path.relative(srcDir, tsxFile));
          }
        }

        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ ok: true, id, deleted }));
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), scaffoldApi()],
});
