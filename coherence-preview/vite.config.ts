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

        // 1. Find the scaffold entry in main.tsx to get the file path
        let mainSrc = fs.readFileSync(mainPath, 'utf-8');

        // Match the full scaffold object block: { id: 'scaffold-xxx', ... },
        const entryRegex = new RegExp(
          `\\{[\\s\\S]*?id:\\s*'${id}'[\\s\\S]*?\\},?\\n`,
        );
        const match = mainSrc.match(entryRegex);
        if (!match) {
          res.statusCode = 404;
          res.end(JSON.stringify({ error: `Scaffold "${id}" not found in main.tsx` }));
          return;
        }

        // Extract the import path from the matched block
        const importMatch = match[0].match(/import\(['"](.+?)['"]\)/);
        let tsxFile: string | null = null;
        if (importMatch) {
          const rel = importMatch[1]; // e.g. './patterns/ScaffoldResourcePage'
          tsxFile = path.resolve(srcDir, rel + '.tsx');
        }

        // 2. Remove the scaffold entry from the scaffolds array in main.tsx
        mainSrc = mainSrc.replace(match[0], '');
        fs.writeFileSync(mainPath, mainSrc, 'utf-8');

        // 3. Remove matching item from PatternsGallery.tsx if it exists
        if (fs.existsSync(galleryPath)) {
          let gallerySrc = fs.readFileSync(galleryPath, 'utf-8');
          const galleryRegex = new RegExp(
            `\\{[\\s\\S]*?id:\\s*'${id}'[\\s\\S]*?\\},?\\n`,
          );
          const galleryMatch = gallerySrc.match(galleryRegex);
          if (galleryMatch) {
            gallerySrc = gallerySrc.replace(galleryMatch[0], '');
            fs.writeFileSync(galleryPath, gallerySrc, 'utf-8');
          }
        }

        // 4. Delete the .tsx file
        const deleted: string[] = [];
        if (tsxFile && fs.existsSync(tsxFile)) {
          fs.unlinkSync(tsxFile);
          deleted.push(path.relative(srcDir, tsxFile));
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
