---
name: coherence-live-preview
description: Automate the Coherence preview app workflow — register new experiments in the experiment picker, start the Vite dev server, and hot-reload prototypes. Use when the user says "preview this", "show me this component", "run the preview app", "add this to the experiment picker", "register this experiment", or wants to see a Coherence prototype rendered in the browser. Also use when creating a new prototype .tsx file that should be viewable in the preview app.
---

# Coherence Live Preview

Manage the `coherence-preview/` Vite + React app that renders Coherence UI prototypes.

## Preview App Location

```
coherence-preview/
├── src/
│   ├── main.tsx                  ← experiment registry + router
│   ├── experiments/
│   │   ├── api-management-page/
│   │   │   └── index.tsx
│   │   ├── copilot-button/
│   │   │   └── index.tsx
│   │   └── …more experiments
│   └── patterns/
├── package.json
└── vite.config.ts
```

## Workflow: Adding a New Experiment

After generating a `.tsx` prototype, create a new folder under `coherence-preview/src/experiments/` using the experiment's kebab-case `id` as the folder name, and place the component in an `index.tsx` file inside it:

```
coherence-preview/src/experiments/my-page/index.tsx
```

### 1. Register in the Experiment Array

Open `coherence-preview/src/main.tsx` and add an entry to the `experiments` array:

```tsx
{
  id: 'my-page',                                            // kebab-case, unique
  title: 'My Page',                                          // Display name
  description: 'Short description of the prototype',
  component: lazy(() => import('./experiments/my-page')),     // Folder path (resolves to index.tsx)
},
```

Insert it at the end of the array, before the closing `]`.

### 2. Start the Dev Server

```bash
cd coherence-preview && npx vite
```

Opens at `http://localhost:5173`. Navigate to the experiment by clicking its card or going to `http://localhost:5173#my-page`.

### 3. Hot Reload

Vite HMR updates the browser automatically when you save changes to any `.tsx` file. No restart needed.

## Registry Format

The experiment registry in `main.tsx` follows this exact shape:

```tsx
const experiments: {
  id: string;
  title: string;
  description: string;
  component: React.LazyExoticComponent<ComponentType<any>>;
}[] = [
  // entries here
];
```

**Requirements:**
- `id` must be unique, kebab-case, and URL-safe (used as hash fragment)
- `component` must use `lazy(() => import('./experiments/<folder-name>'))` for code splitting
- The imported file must have a `default` export (function component)

## Conventions

- Each experiment lives in its own folder under `coherence-preview/src/experiments/<experiment-id>/`
- The folder name matches the experiment's `id` (kebab-case)
- The main component file is `index.tsx` inside that folder
- Co-located files (mock data, helpers) go in the same folder
- Each `index.tsx` exports a default function component
- Filenames for the component use `index.tsx`; PascalCase is used for the exported component name
- To import a sibling experiment (e.g., CopilotButton), use a relative path: `import CopilotButton from '../copilot-button'`
- Theme CSS is already imported globally in `main.tsx` — individual experiments do not need to import it
- The experiment picker shows all registered experiments as clickable cards with title and description

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Blank page after navigation | Ensure the component has a `default` export |
| Icons show question mark | Add `import '@charm-ux/cui/dist/project-config.js'` to `main.tsx` if missing |
| Styles not applying | Check that `body { margin: 0; }` is in the component's `<style>` block |
| Dev server won't start | Run `cd coherence-preview && npm install` first |
