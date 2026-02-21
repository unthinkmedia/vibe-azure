import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';

/**
 * Vite plugin: local dev API for scaffold management.
 * DELETE /api/scaffold/:id  — removes the scaffold .tsx file + unregisters from main.tsx & PatternsGallery.tsx
 */
function scaffoldApi() {
  return {
    name: 'scaffold-api',
    configureServer(server: any) {
      server.middlewares.use((req: any, res: any, next: any) => {
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
