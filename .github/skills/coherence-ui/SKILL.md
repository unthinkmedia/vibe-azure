---
name: coherence-ui
description: Comprehensive reference for building UIs with the Coherence Design System (Microsoft's internal design system for C+AI). Use when building UI with Coherence components (`cui-*` web components from `@charm-ux/cui`), or when the user asks about Coherence component usage, guidance, accessibility, or API. Also use when composing pages with Coherence templates (dashboard, form, settings), task flows (bulk edit, inline edit, favorites, save presets), or following Coherence UX guides (accessibility, AI patterns, data visualization, writing for UI). Also use when the user asks about Coherence design tokens, theming, colors, spacing, typography, shadows, CSS custom properties, or any `--color-*`, `--spacing-*`, `--font-*` variable. Triggers: any mention of Coherence, `cui-` components, `@charm-ux/cui`, design tokens, theme CSS, or building UI that should follow the Coherence design system.
---

# Coherence UI Skill

Build UIs using the Coherence Design System — Microsoft's component library for C+AI products.

> **Default output: React.** Always generate React components using the `@charm-ux/cui/react` wrappers unless the user explicitly asks for plain HTML web components or another format.

## Quick Reference

- **Package:** `@charm-ux/cui`
- **React import (preferred):** `import { CuiButton } from '@charm-ux/cui/react'`
- **Web component import (alternate):** `import '@charm-ux/cui/dist/components/<name>/index.js'`
- **Tag prefix (web components):** `cui-` (e.g. `cui-button`, `cui-dialog`)
- **React naming convention:** `Cui` + PascalCase component name (e.g. `CuiButton`, `CuiCard`, `CuiDialog`)
- **Design system site:** https://coherence-ftekb0dcfpcjb3gv.b02.azurefd.net

## Data Sources

Three complementary sources provide a complete picture of every component and the design system. **Consult the relevant source(s) for the task at hand.**

### 1. Live API Manifest (primary — source of truth for API)

**URL:** https://coherence-ftekb0dcfpcjb3gv.b02.azurefd.net/cdn/latest/custom-elements.json

Fetch this URL to get the machine-readable API for any component. It follows the [Custom Elements Manifest](https://custom-elements-manifest.open-wc.org/) schema. For each component it provides:
- **Attributes** — exact names, types, defaults, descriptions
- **Events** — names, detail types
- **Slots** — names, descriptions
- **CSS Custom Properties** — all themeable hooks
- **CSS Parts** — all styleable internal parts
- **Dependencies** — which sub-components are auto-registered
- **Class hierarchy** — superclass and inherited members

**How to look up a component:** Find the module whose `path` matches `src/components/<slug>/<slug>.ts`, then read its `declarations` array for the entry with `customElement: true`.

Example: to look up `cui-button`, find the module with `path: "src/components/button/button.ts"` → its declaration is `CuiButton`.

### 2. Theme CSS — Design Tokens (source of truth for theming, colors, spacing, typography)

**URL:** https://coherence-ftekb0dcfpcjb3gv.b02.azurefd.net/cdn/latest/themes/cui/theme.css

Fetch this URL when answering questions about **design tokens, theming, colors, spacing, typography, shadows, borders, animation timing, or component-level CSS variables**. This auto-generated CSS file defines all CSS custom properties on `:root` / `:host` and is the single source of truth for token names and values.

**What it contains:**

| Category | Token prefix / examples | Description |
|----------|------------------------|-------------|
| **Color palette** | `--color-brand-{10–160}`, `--color-neutral-{0–100}`, `--color-danger-*`, `--color-success-*`, `--color-warning-*`, `--color-caution-*` | Raw color scale with `-alt` contrast pairs |
| **Semantic colors** | `--neutral-foreground{1–4}`, `--neutral-background{1–6}`, `--brand-foreground*`, `--brand-background*`, `--subtle-background*`, `--compound-brand-*` | Role-based color tokens with hover/pressed/selected/disabled states |
| **Status colors** | `--danger-background*`, `--danger-foreground*`, `--success-*`, `--warning-*`, `--severe-*` | Semantic status indicators |
| **Stroke / border colors** | `--neutral-stroke{1–3}`, `--neutral-stroke-accessible*`, `--neutral-stroke-subtle`, `--brand-stroke*`, `--compound-brand-stroke*`, `--stroke-focus{1,2}`, `--transparent-stroke*` | Semantic border/stroke tokens |
| **Overlay / scrollbar** | `--background-overlay`, `--scrollbar-overlay` | Modal overlay and scrollbar colors |
| **Typography** | `--font-family-base`, `--font-family-numeric`, `--font-family-monospace`, `--font-size-base{100–600}`, `--font-size-hero{700–1000}`, `--font-weight-*`, `--line-height-*` | Type scale and font stacks |
| **Spacing** | `--spacing-none` through `--spacing-xxxl` | Layout spacing scale (0–32 px) |
| **Borders** | `--border-radius-{none,sm,md,lg,xl,circular}`, `--border-width-{none,thin,thick,thicker,thickest}` | Border radius and width tokens |
| **Default border** | `--default-border`, `--default-border-size`, `--default-border-style`, `--default-border-color` | Shorthand border defaults used by many components |
| **Shadows** | `--shadow-{0,2,4,8,16,28,64}`, `--drop-shadow-*` | Elevation / shadow tokens |
| **Animation** | `--duration-{ultra-fast…ultra-slow}`, `--timing-function-{accelerate,decelerate,easy-ease,linear}-*` | Motion timing tokens |
| **Focus** | `--focus-outline`, `--focus-outline-color`, `--focus-outline-offset`, `--focus-outline-size`, `--focus-outline-style` | Global focus ring styling |
| **Component defaults** | `--button-*`, `--form-control-*`, `--link-*`, `--heading-*`, `--body-*` | Pre-composed component-level variables that reference the above tokens |

**How the theme CSS relates to component reference docs:**

The theme CSS defines **global defaults** for ~578 tokens. Of those, about 51 are also documented in component reference files (mainly `--button-*`, `--form-control-*`, and `--default-border`). Component reference docs additionally list **component-specific** CSS custom properties (e.g. `--accordion-item-*`, `--card-*`, `--dialog-*`, `--checkbox-*`) that are *not* in the theme CSS — those are defined inside individual component stylesheets and can still be overridden. Use both sources together: the theme CSS for token values/names and the component refs for per-component override hooks.

**When to fetch:** Any time the user asks about available colors, spacing values, font sizes, shadow levels, how to theme a component, what CSS variables exist, or when you need the exact token name/value for a style.

### 3. Design Guidance References (supplementary — design, UX, and examples)

The reference docs below contain information the manifest does **not** have:
- When to use / when not to use a component
- Anatomy diagrams and layout rules
- Dos and don'ts
- Accessibility guidance specific to the component
- Code examples showing composition patterns
- Content/writing guidelines

## Workflow

When the user asks to build UI or use a Coherence component:

1. **Identify the component(s) needed** from the index below or the manifest
2. **Fetch the manifest** to get the precise API (attributes, types, defaults, slots, events, CSS properties, dependencies)
3. **Read the component reference file** (if one exists) for design guidance, dos/don'ts, accessibility rules, and code examples
4. **Combine both** — use guidance to decide *how* to compose the UI; use the manifest as the source of truth for *exact attribute names, types, and values*
5. **If no reference file exists**, the manifest alone is sufficient for API usage — apply general Coherence accessibility and layout rules from the guides below
6. **For theming, colors, spacing, typography, or shadows** — fetch the theme CSS to get the exact token names and values
7. **Output React by default** — generate a React component (`.tsx`) using `@charm-ux/cui/react` wrappers. Only output plain HTML web components (`<cui-*>`) if the user explicitly requests it.

When composing a full page or layout, also read the relevant template and task flow references. **For Azure portal pages specifically**, start with the composition patterns in `references/patterns/` — especially the Resource Page Shell — to avoid rebuilding the standard Azure chrome from scratch.

## Component Index

Reference files contain **design guidance and code examples only** — not API details. Always fetch the manifest for API data.

Components with a reference file (66 — guidance available):

| Component | Tag | Reference |
|-----------|-----|-----------|
| Accordion | `cui-accordion` | [references/components/accordion.md](references/components/accordion.md) |
| Accordion Item | `cui-accordion-item` | [references/components/accordion-item.md](references/components/accordion-item.md) |
| AI Chat | `cui-ai-chat` | [references/components/ai-chat.md](references/components/ai-chat.md) |
| App Frame | `cui-app-frame` | [references/components/app-frame.md](references/components/app-frame.md) |
| Avatar | `cui-avatar` | [references/components/avatar.md](references/components/avatar.md) |
| Badge | `cui-badge` | [references/components/badge.md](references/components/badge.md) |
| Banner | `cui-banner` | [references/components/banner.md](references/components/banner.md) |
| Breadcrumb | `cui-breadcrumb` | [references/components/breadcrumb.md](references/components/breadcrumb.md) |
| Breadcrumb Item | `cui-breadcrumb-item` | [references/components/breadcrumb-item.md](references/components/breadcrumb-item.md) |
| Button | `cui-button` | [references/components/button.md](references/components/button.md) |
| Button Group | `cui-button-group` | [references/components/button-group.md](references/components/button-group.md) |
| Card | `cui-card` | [references/components/card.md](references/components/card.md) |
| Carousel | `cui-carousel` | [references/components/carousel.md](references/components/carousel.md) |
| Character Counter | `cui-character-counter` | [references/components/character-counter.md](references/components/character-counter.md) |
| Checkbox | `cui-checkbox` | [references/components/checkbox.md](references/components/checkbox.md) |
| Content Frame | `cui-content-frame` | [references/components/content-frame.md](references/components/content-frame.md) |
| Data Grid | `cui-data-grid` | [references/components/data-grid.md](references/components/data-grid.md) |
| Dialog | `cui-dialog` | [references/components/dialog.md](references/components/dialog.md) |
| Disclosure | `cui-disclosure` | [references/components/disclosure.md](references/components/disclosure.md) |
| Divider | `cui-divider` | [references/components/divider.md](references/components/divider.md) |
| Drawer | `cui-drawer` | [references/components/drawer.md](references/components/drawer.md) |
| Feedback Buttons | `cui-feedback-buttons` | [references/components/feedback-buttons.md](references/components/feedback-buttons.md) |
| Feedback for AI | `cui-feedback-for-ai` | [references/components/feedback-for-ai.md](references/components/feedback-for-ai.md) |
| Header | `cui-header` | [references/components/header.md](references/components/header.md) |
| Icon | `cui-icon` | [references/components/icon.md](references/components/icon.md) |
| Info Label | `cui-info-label` | [references/components/info-label.md](references/components/info-label.md) |
| Input | `cui-input` | [references/components/input.md](references/components/input.md) |
| Label | `cui-label` | [references/components/label.md](references/components/label.md) |
| Link | `cui-link` | [references/components/link.md](references/components/link.md) |
| Menu | `cui-menu` | [references/components/menu.md](references/components/menu.md) |
| Menu Item | `cui-menu-item` | [references/components/menu-item.md](references/components/menu-item.md) |
| Menu List | `cui-menu-list` | [references/components/menu-list.md](references/components/menu-list.md) |
| Message Bar | `cui-message-bar` | [references/components/message-bar.md](references/components/message-bar.md) |
| Microfeedback | `cui-microfeedback` | [references/components/microfeedback.md](references/components/microfeedback.md) |
| Navigation Heading | `cui-nav-heading` | [references/components/nav-heading.md](references/components/nav-heading.md) |
| Navigation Item | `cui-nav-item` | [references/components/nav-item.md](references/components/nav-item.md) |
| Overflow | `cui-overflow` | [references/components/overflow.md](references/components/overflow.md) |
| Pagination | `cui-pagination` | [references/components/pagination.md](references/components/pagination.md) |
| Persona | `cui-persona` | [references/components/persona.md](references/components/persona.md) |
| Pop Over | `cui-pop-over` | [references/components/pop-over.md](references/components/pop-over.md) |
| Profile | `cui-profile` | [references/components/profile.md](references/components/profile.md) |
| Progress Bar | `cui-progress-bar` | [references/components/progress-bar.md](references/components/progress-bar.md) |
| Quick Nav | `cui-quick-nav` | [references/components/quick-nav.md](references/components/quick-nav.md) |
| Radio | `cui-radio` | [references/components/radio.md](references/components/radio.md) |
| Radio Group | `cui-radio-group` | [references/components/radio-group.md](references/components/radio-group.md) |
| Rich Text Editor | `cui-rich-text-editor` | [references/components/rich-text-editor.md](references/components/rich-text-editor.md) |
| Search Box | `cui-search-box` | [references/components/search-box.md](references/components/search-box.md) |
| Select | `cui-select` | [references/components/select.md](references/components/select.md) |
| Side Navigation | `cui-side-nav` | [references/components/side-nav.md](references/components/side-nav.md) |
| Skeleton | `cui-skeleton` | [references/components/skeleton.md](references/components/skeleton.md) |
| Skip To | `cui-skip-to` | [references/components/skip-to.md](references/components/skip-to.md) |
| Slider | `cui-slider` | [references/components/slider.md](references/components/slider.md) |
| Spinner | `cui-spinner` | [references/components/spinner.md](references/components/spinner.md) |
| Switch | `cui-switch` | [references/components/switch.md](references/components/switch.md) |
| Tab | `cui-tab` | [references/components/tab.md](references/components/tab.md) |
| Tab Panel | `cui-tab-panel` | [references/components/tab-panel.md](references/components/tab-panel.md) |
| Table | `cui-table` | [references/components/table.md](references/components/table.md) |
| Tabs | `cui-tabs` | [references/components/tabs.md](references/components/tabs.md) |
| Tag | `cui-tag` | [references/components/tag.md](references/components/tag.md) |
| Teaching Pop Over | `cui-teaching-pop-over` | [references/components/teaching-pop-over.md](references/components/teaching-pop-over.md) |
| Text Area | `cui-text-area` | [references/components/text-area.md](references/components/text-area.md) |
| Toolbar | `cui-toolbar` | [references/components/toolbar.md](references/components/toolbar.md) |
| Tooltip | `cui-tooltip` | [references/components/tooltip.md](references/components/tooltip.md) |
| Top Navigation | `cui-top-nav` | [references/components/top-nav.md](references/components/top-nav.md) |
| Tree | `cui-tree` | [references/components/tree.md](references/components/tree.md) |
| Uploader | `cui-uploader` | [references/components/uploader.md](references/components/uploader.md) |

Components in the manifest only (API-only — no design guidance doc yet):

| Component | Tag | Manifest path |
|-----------|-----|---------------|
| Button Group Overflow | `cui-button-group-overflow` | `src/components/button-group-overflow/button-group-overflow.ts` |
| Menu Group | `cui-menu-group` | `src/components/menu-group/menu-group.ts` |
| Push Pane | `cui-push-pane` | `src/components/push-pane/push-pane.ts` |
| Teaching Popover | `cui-teaching-popover` | `src/components/teaching-popover/teaching-popover.ts` |
| Tree Item | `cui-tree-item` | `src/components/tree-item/tree-item.ts` |

## Templates

Page-level layout patterns. Read before composing full pages.

| Template | Reference |
|----------|-----------|
| Dashboard | [references/templates/dashboard.md](references/templates/dashboard.md) |
| Form | [references/templates/form.md](references/templates/form.md) |
| Settings | [references/templates/settings.md](references/templates/settings.md) |

## Task Flows

Multi-step interaction patterns. Read when implementing these specific user flows.

| Task Flow | Reference |
|-----------|-----------|
| Bulk Edit | [references/task-flows/bulk-edit.md](references/task-flows/bulk-edit.md) |
| Create an Item | [references/task-flows/create-an-item.md](references/task-flows/create-an-item.md) |
| Edit an Item | [references/task-flows/edit-an-item.md](references/task-flows/edit-an-item.md) |
| Favorites | [references/task-flows/favorites.md](references/task-flows/favorites.md) |
| Inline Edit | [references/task-flows/inline-edit.md](references/task-flows/inline-edit.md) |
| Save Presets | [references/task-flows/save-presets.md](references/task-flows/save-presets.md) |

## Composition Patterns

Reusable multi-component patterns extracted from real Azure portal prototypes. Read when composing Azure-style pages to avoid re-inventing common layouts.

| Pattern | Description | Reference |
|---------|-------------|-----------|
| Azure Portal Header | Header with search, Copilot button, avatar popover | [references/patterns/azure-portal-header.md](references/patterns/azure-portal-header.md) |
| Azure Resource Page Shell | Full page scaffold: app frame + header + side nav + breadcrumb + title + toolbar | [references/patterns/azure-resource-page-shell.md](references/patterns/azure-resource-page-shell.md) |
| Info Message Bar (Blue) | Blue info banner with token overrides for `cui-message-bar intent="info"` | [references/patterns/info-message-bar.md](references/patterns/info-message-bar.md) |
| Side Nav with Iconify Icons | Side navigation using Iconify SVG URLs with regular/filled pairs | [references/patterns/side-nav-with-iconify.md](references/patterns/side-nav-with-iconify.md) |
| Resource Page Toolbar | Horizontal action bar with buttons, dividers, and dropdown menus | [references/patterns/resource-page-toolbar.md](references/patterns/resource-page-toolbar.md) |

When building an Azure portal page prototype, **start with the Resource Page Shell** pattern and customize it. It composes the Header, Side Nav, and Toolbar patterns together.

### Shared Pattern Components (MUST USE — never re-implement)

These live React components exist in `coherence-preview/src/patterns/` and **must be imported** instead of hand-building equivalent UI. Re-implementing them from scratch is a recurring mistake that produces inconsistent, non-dismissible, unstyleable results.

| Component | Import path (from experiment root) | What it does | When to use |
|-----------|-----------------------------------|--------------|-------------|
| **PageHeader** | `../../patterns/PageHeader` | Title row: icon + h1 + star + more actions + CopilotSuggestions | **Every page** that has a title. Pass `copilotSuggestions={[...]}` prop to include Copilot pills. |
| **CopilotSuggestions** | `../../patterns/CopilotSuggestions` | Dismissible pill bar with `CuiIcon name="copilot"`, `CuiTag` pills, `+N` overflow, dismiss button | Automatically used when you pass `copilotSuggestions` to `PageHeader`. Import directly only if placing suggestions outside the title row. |
| **CopilotButton** | `../copilot-button` | White pill button for the header's `slot="search"` area | **Every page** with an Azure portal header. |

**Anti-pattern:** Do NOT create custom `<button>`, `<div>`, or `<span>` elements styled to look like Copilot suggestion pills. Always use the `CopilotSuggestions` pattern or pass the `copilotSuggestions` prop to `PageHeader`.

## Page Scaffolds

Complete starter files for common Azure portal page types. Copy a scaffold to `coherence-preview/src/` and customize the TODOs.

| Scaffold | Description | Asset |
|----------|-------------|-------|
| Resource Page | Standard resource blade with header, side nav, breadcrumb, toolbar, content area | [assets/scaffolds/azure-resource-page/](assets/scaffolds/azure-resource-page/) |
| List Page | Two-column list + detail layout (APIs, Subscriptions, etc.) | [assets/scaffolds/azure-list-page/](assets/scaffolds/azure-list-page/) |
| Overview Page | Essentials panel + card grid sections | [assets/scaffolds/azure-overview-page/](assets/scaffolds/azure-overview-page/) |
| Marketplace Browse | Categories sidebar with service + marketplace grid | [assets/scaffolds/azure-marketplace-browse/](assets/scaffolds/azure-marketplace-browse/) |

## Flow Scaffolds

Multi-step or multi-page flow templates. These involve navigation between steps or pages.

| Flow | Description | Asset |
|------|-------------|-------|
| Create Flow | Multi-step wizard with tabbed form and action bar | [assets/flows/azure-create-flow/](assets/flows/azure-create-flow/) |
| Multi-Page Flow | End-to-end flow with multiple pages (Browse → Create → Detail) | [assets/flows/azure-multi-page-flow/](assets/flows/azure-multi-page-flow/) |

**Usage:** Copy the scaffold or flow folder, rename it, fill in the TODO sections, and register it as an experiment in the preview app.

## UX Guides

Cross-cutting design guidance. Read when the topic is relevant.

| Guide | Reference |
|-------|-----------|
| Accessibility | [references/guides/accessibility.md](references/guides/accessibility.md) |
| AI Basics | [references/guides/ai-basics.md](references/guides/ai-basics.md) |
| AI Entry Points | [references/guides/ai-entry-points.md](references/guides/ai-entry-points.md) |
| Data Visualization | [references/guides/data-visualization.md](references/guides/data-visualization.md) |
| Illustration | [references/guides/illustration.md](references/guides/illustration.md) |
| Writing for UI | [references/guides/writing-ui.md](references/guides/writing-ui.md) |

## Styling Standards & Verification

Codified spacing, typography, color, border, shadow, state, layout, and accessibility rules extracted from the Coherence component library, manifest API, theme CSS, and all established patterns. **Read before building custom UI** and use the **ui-verification** skill to check compliance after.

| Resource | Reference |
|----------|-----------|
| Styling Standards Registry | [references/styling-standards.md](references/styling-standards.md) |
| UI Verification Skill (checklist) | `../../ui-verification/SKILL.md` |

The verification skill cross-references three sources: the standards registry, the live API manifest, and the theme CSS. When it encounters a styling decision with no established standard, it asks the user whether to save it as a new rule.

## Common Patterns

### React Component Usage (default)

```tsx
import { CuiButton } from '@charm-ux/cui/react';

export function SaveButton() {
  return <CuiButton appearance="primary">Save</CuiButton>;
}
```

### Slots in React

Web component slots map to React props with the same name. Use the `slot` attribute on child elements:

```tsx
import { CuiButton, CuiIcon } from '@charm-ux/cui/react';

export function AddItemButton() {
  return (
    <CuiButton>
      <CuiIcon slot="start" name="add" />
      Add item
    </CuiButton>
  );
}
```

### Event Handling in React

Coherence React wrappers expose events as camelCase callback props. Use the `onEventName` pattern:

```tsx
import { CuiDialog, CuiButton } from '@charm-ux/cui/react';
import { useRef } from 'react';

export function ConfirmDialog() {
  const dialogRef = useRef<HTMLElement>(null);

  return (
    <CuiDialog
      ref={dialogRef}
      heading="Confirm"
      onDialogRequestClose={(e) => {
        // Optionally prevent close: e.preventDefault();
      }}
    >
      <p>Are you sure?</p>
      <CuiButton slot="footer" appearance="primary">Yes</CuiButton>
      <CuiButton slot="footer">Cancel</CuiButton>
    </CuiDialog>
  );
}
```

### Show/Hide with Triggers

```tsx
import { CuiButton, CuiDrawer } from '@charm-ux/cui/react';

export function SettingsDrawer() {
  return (
    <>
      <CuiButton shows="my-drawer">Open Drawer</CuiButton>
      <CuiDrawer id="my-drawer" heading="Settings">
        <p>Drawer content</p>
      </CuiDrawer>
    </>
  );
}
```

### CSS Custom Properties

Override component styling via CSS custom properties (same in React and HTML):

```css
cui-button {
  --button-bg-color: var(--colorBrandBackground);
  --button-fg-color: var(--colorNeutralForegroundOnBrand);
  --button-border-radius: 8px;
}
```

### Web Component Usage (alternate — only when explicitly requested)

```html
<script type="module">
  import '@charm-ux/cui/dist/components/button/index.js';
</script>
<cui-button appearance="primary">Save</cui-button>
```

## Accessibility Rules

Every component meets the Microsoft Accessibility Standards (MAS). When composing UIs:

1. Use `cui-skip-to` as the first tab stop on every page
2. Assign landmarks (`<main>`, `<nav>`, `<header>`) for skip-to navigation
3. Every interactive element must have a keyboard-accessible equivalent
4. All button text must pass 4.5:1 contrast; icons must pass 3:1
5. Labels cannot be substituted with placeholder text
6. Use `aria-label` or heading text for dialogs and drawers
7. Read [references/guides/accessibility.md](references/guides/accessibility.md) for comprehensive guidance

## Previewing Components

A Vite + React preview app is set up at `coherence-preview/`. Use it to render any generated `.tsx` component in the browser.

### Quick Start

1. **Import the component** in `coherence-preview/src/main.tsx`:
   ```tsx
   import '@charm-ux/cui/dist/themes/cui/theme.css';
   import '@charm-ux/cui/dist/themes/cui/reset.css';
   import MyComponent from '../../MyComponent';
   ```
2. **Start the dev server**: `cd coherence-preview && npx vite`
3. **Open** the URL printed by Vite (usually `http://localhost:5173`)

The theme CSS imports provide all Coherence design tokens. The `@charm-ux/cui/react` wrappers auto-register their underlying web component definitions on first render.

### Adding New Components to Preview

Edit `coherence-preview/src/main.tsx` — replace or add the component import and render it inside the root `<div>`. Vite HMR will update the browser automatically.

## Icons & Fluent 2 Dependency

The `cui-icon` component relies on the **Fluent 2** icon set. Icons referenced by `name` attribute must be registered first.

### Critical: Import the Project Config

When generating code that uses `<cui-icon name="...">` (or `<CuiIcon name="...">` in React), you **must** ensure the project configuration is imported. Without it, icons will show a fallback question-mark and log a console warning.

**For web components / plain HTML:**
```js
import '@charm-ux/cui/dist/project-config.js';
import '@charm-ux/cui/dist/components/icon/index.js';
```

**For React:** No extra import needed — the `@charm-ux/cui/react` wrappers auto-register icons.

**For the preview app (`coherence-preview/`):** Add this import to `main.tsx`:
```tsx
import '@charm-ux/cui/dist/project-config.js';
```

### Available Icon Names

After importing the project config, ~120 Fluent 2 icons are available. **Simple names** (prefer these — no network request needed): `accessibility`, `add`, `alert`, `attach`, `bookmark`, `bot`, `calendar`, `chat`, `checkmark`, `clock`, `comment`, `copilot`, `copy`, `cut`, `delete`, `dislike`, `dismiss`, `edit`, `emoji`, `eye`, `filter`, `history`, `hourglass`, `info`, `like`, `link`, `location`, `mail`, `navigation`, `open`, `options`, `paste`, `pause`, `person`, `phone`, `pin`, `play`, `prohibited`, `resize`, `save`, `search`, `send`, `settings`, `share`, `snooze`, `star`, `stop`, `warning`. **Compound names**: `arrow-clockwise`, `arrow-download`, `arrow-left`, `arrow-maximize`, `arrow-minimize`, `arrow-move`, `arrow-redo-regular`, `arrow-reply`, `arrow-right`, `arrow-sort-down`, `arrow-sort-up`, `arrow-sync`, `arrow-undo-regular`, `arrow-upload`, `bookmark-filled`, `calendar-clock`, `checkmark-circle`, `chevron-double-left`, `chevron-double-right`, `chevron-down`, `chevron-left`, `chevron-up`, `circle-half-fill`, `code-regular`, `contact-card`, `copy-filled`, `cut-filled`, `dislike-filled`, `dismiss-circle`, `document-checkmark`, `document-edit`, `document-ribbon`, `emoji-meh`, `emoji-sad`, `error-circle`, `eye-off`, `filter-filled`, `highlight-regular`, `like-filled`, `link-edit-regular`, `link-regular`, `lock-closed`, `lock-open`, `more-horizontal`, `paste-filled`, `person-feedback`, `pin-filled`, `star-filled`, `start-line-horizontal`, `subtract-circle`, `tap-single`, `task-list`, `text-*-regular` (all rich text icons), `zoom-in`, `zoom-out`.

> **Always prefer `name` over `url`** when the icon exists in the registered set. Only fall back to Iconify URLs or `url` attribute for icons not available natively (e.g. `terminal`, `stethoscope`, `globe`, `folder`, `server`, `database`, etc.).

See [references/components/icon.md](references/components/icon.md) for the full list and custom icon registration.

## Mapping to charm-pilot

When working in the local `charm-pilot` codebase (`@charm-ux/core`):

| Coherence (`cui-*`) | charm-pilot (`ch-*`) |
|---------------------|---------------------|
| `cui-button` | `ch-button` |
| `cui-dialog` | `ch-dialog` |
| `cui-input` | `ch-input` |
| ... | ... |

The design guidance, slots, attributes, events, and CSS properties documented in the Coherence references apply to both. The `ch-*` components in charm-pilot are built following the same Coherence specifications.
