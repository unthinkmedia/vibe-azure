# VSCode Elements — Component Reference for MCP Apps

All MCP App UIs **MUST** use `@vscode-elements/elements` web components to match VS Code's native look and feel. These are Lit-based web components that inherit VS Code's CSS custom properties.

## Installation

```bash
npm install @vscode-elements/elements
```

## Import Strategy

```typescript
// Full bundle (simplest — ~100KB gzipped)
import "@vscode-elements/elements/dist/bundled.js";

// Individual components (tree-shakeable, smaller builds)
import "@vscode-elements/elements/dist/vscode-button/index.js";
import "@vscode-elements/elements/dist/vscode-textfield/index.js";
```

## Component Catalog

### Buttons

```html
<!-- Primary button -->
<vscode-button>Save</vscode-button>

<!-- Secondary button -->
<vscode-button secondary>Cancel</vscode-button>

<!-- Icon button (uses Codicon names) -->
<vscode-button icon="add">Add Item</vscode-button>

<!-- Icon-only button -->
<vscode-button icon="close" appearance="icon"></vscode-button>
```

**Button Group** — arrange related buttons:
```html
<vscode-button-group>
  <vscode-button>Option A</vscode-button>
  <vscode-button>Option B</vscode-button>
  <vscode-button>Option C</vscode-button>
</vscode-button-group>
```

### Text Input

```html
<!-- Single-line text field -->
<vscode-textfield placeholder="Search..." value="">
  <label slot="label">Search</label>
</vscode-textfield>

<!-- With icon -->
<vscode-textfield placeholder="Type to filter...">
  <span slot="content-before">
    <vscode-icon name="search"></vscode-icon>
  </span>
</vscode-textfield>

<!-- Multi-line textarea -->
<vscode-textarea rows="5" resize="vertical" placeholder="Enter description...">
  <label slot="label">Description</label>
</vscode-textarea>
```

### Select / Dropdown

```html
<!-- Single select -->
<vscode-single-select>
  <vscode-option value="opt1">Option 1</vscode-option>
  <vscode-option value="opt2" selected>Option 2</vscode-option>
  <vscode-option value="opt3">Option 3</vscode-option>
</vscode-single-select>

<!-- Multi select -->
<vscode-multi-select>
  <vscode-option value="a">Alpha</vscode-option>
  <vscode-option value="b">Beta</vscode-option>
  <vscode-option value="c">Gamma</vscode-option>
</vscode-multi-select>
```

### Checkbox & Radio

```html
<!-- Checkbox -->
<vscode-checkbox-group>
  <vscode-checkbox label="Enable feature" checked></vscode-checkbox>
  <vscode-checkbox label="Show details"></vscode-checkbox>
</vscode-checkbox-group>

<!-- Radio group -->
<vscode-radio-group>
  <vscode-radio label="Light" value="light"></vscode-radio>
  <vscode-radio label="Dark" value="dark" checked></vscode-radio>
  <vscode-radio label="Auto" value="auto"></vscode-radio>
</vscode-radio-group>
```

### Badge

```html
<vscode-badge>42</vscode-badge>
<vscode-badge variant="counter">99+</vscode-badge>
<vscode-badge variant="activity-bar-counter">3</vscode-badge>
```

### Icon

Uses Microsoft Codicon icon set:
```html
<vscode-icon name="search"></vscode-icon>
<vscode-icon name="file"></vscode-icon>
<vscode-icon name="folder"></vscode-icon>
<vscode-icon name="check"></vscode-icon>
<vscode-icon name="close"></vscode-icon>
<vscode-icon name="warning"></vscode-icon>
<vscode-icon name="error"></vscode-icon>
<vscode-icon name="info"></vscode-icon>
<vscode-icon name="refresh"></vscode-icon>
<vscode-icon name="settings-gear"></vscode-icon>
```

Full icon list: https://microsoft.github.io/vscode-codicons/dist/codicon.html

### Label

```html
<vscode-label>Field Label</vscode-label>
<vscode-label required>Required Field</vscode-label>
```

### Divider

```html
<vscode-divider></vscode-divider>
```

### Collapsible / Accordion

```html
<vscode-collapsible title="Advanced Settings" open>
  <p>Content shown when expanded</p>
</vscode-collapsible>

<vscode-collapsible title="Details">
  <vscode-badge variant="counter" slot="decorations">5</vscode-badge>
  <p>Collapsed by default</p>
</vscode-collapsible>
```

### Tabs

```html
<vscode-tabs>
  <vscode-tab-header slot="header">Overview</vscode-tab-header>
  <vscode-tab-panel>
    <p>Overview content here</p>
  </vscode-tab-panel>

  <vscode-tab-header slot="header">Details</vscode-tab-header>
  <vscode-tab-panel>
    <p>Details content here</p>
  </vscode-tab-panel>

  <vscode-tab-header slot="header">
    <vscode-icon name="settings-gear"></vscode-icon>
    Settings
  </vscode-tab-header>
  <vscode-tab-panel>
    <p>Settings content here</p>
  </vscode-tab-panel>
</vscode-tabs>
```

Listen for tab changes:
```typescript
const tabs = document.querySelector("vscode-tabs")!;
tabs.addEventListener("vsc-tabs-select", (e) => {
  const detail = (e as CustomEvent).detail;
  console.log("Selected tab index:", detail.selectedIndex);
});
```

### Table

```html
<vscode-table>
  <vscode-table-header slot="header">
    <vscode-table-header-cell>Name</vscode-table-header-cell>
    <vscode-table-header-cell>Status</vscode-table-header-cell>
    <vscode-table-header-cell>Score</vscode-table-header-cell>
  </vscode-table-header>
  <vscode-table-body slot="body">
    <vscode-table-row>
      <vscode-table-cell>Item A</vscode-table-cell>
      <vscode-table-cell>Active</vscode-table-cell>
      <vscode-table-cell>95</vscode-table-cell>
    </vscode-table-row>
    <vscode-table-row>
      <vscode-table-cell>Item B</vscode-table-cell>
      <vscode-table-cell>Inactive</vscode-table-cell>
      <vscode-table-cell>72</vscode-table-cell>
    </vscode-table-row>
  </vscode-table-body>
</vscode-table>
```

### Tree View

```html
<vscode-tree id="my-tree"></vscode-tree>

<script>
const tree = document.getElementById("my-tree");
tree.data = [
  {
    label: "src",
    icons: { branch: "folder", leaf: "file", open: "folder-opened" },
    subItems: [
      { label: "index.ts", icons: { leaf: "file-code" } },
      { label: "utils.ts", icons: { leaf: "file-code" } },
    ],
  },
  {
    label: "package.json",
    icons: { leaf: "file" },
  },
];

tree.addEventListener("vsc-select", (e) => {
  console.log("Selected:", e.detail.label);
});
</script>
```

### Scrollable Container

```html
<vscode-scrollable style="height: 300px;">
  <!-- Long content here -->
</vscode-scrollable>
```

### Progress Indicators

```html
<!-- Indeterminate progress bar -->
<vscode-progress-bar></vscode-progress-bar>

<!-- Progress ring (spinner) -->
<vscode-progress-ring></vscode-progress-ring>
```

### Split Layout

```html
<vscode-split-layout style="height: 400px;">
  <div slot="start">Left panel</div>
  <div slot="end">Right panel</div>
</vscode-split-layout>
```

### Context Menu

```html
<vscode-context-menu id="my-menu">
  <vscode-context-menu-item label="Copy" keybinding="Ctrl+C"></vscode-context-menu-item>
  <vscode-context-menu-item label="Paste" keybinding="Ctrl+V"></vscode-context-menu-item>
  <vscode-context-menu-item separator></vscode-context-menu-item>
  <vscode-context-menu-item label="Delete"></vscode-context-menu-item>
</vscode-context-menu>
```

### Toolbar

```html
<vscode-toolbar-container>
  <vscode-toolbar-button icon="add" label="New"></vscode-toolbar-button>
  <vscode-toolbar-button icon="refresh" label="Refresh"></vscode-toolbar-button>
  <vscode-toolbar-button icon="trash" label="Delete"></vscode-toolbar-button>
</vscode-toolbar-container>
```

### Form Layout

```html
<vscode-form-container>
  <vscode-form-group>
    <vscode-label>Name</vscode-label>
    <vscode-textfield id="name-field" placeholder="Enter name"></vscode-textfield>
    <vscode-form-helper>A unique identifier for the item</vscode-form-helper>
  </vscode-form-group>

  <vscode-form-group>
    <vscode-label>Category</vscode-label>
    <vscode-single-select id="category-select">
      <vscode-option value="a">Category A</vscode-option>
      <vscode-option value="b">Category B</vscode-option>
    </vscode-single-select>
  </vscode-form-group>

  <vscode-form-group>
    <vscode-checkbox label="Make public"></vscode-checkbox>
  </vscode-form-group>

  <vscode-button>Submit</vscode-button>
</vscode-form-container>
```

## VS Code UX Design Rules

### Layout

- Use **16px** padding on the body/root container
- Use **8px** gap between related elements, **16px** between sections
- Keep forms single-column with labels above inputs
- Use `vscode-collapsible` for progressive disclosure (hide advanced options)
- Use `vscode-tabs` to organize distinct content areas
- Use `vscode-split-layout` for master-detail patterns
- Prefer vertical scrolling over horizontal — use `vscode-scrollable` for overflow

### Typography

- Inherit `var(--vscode-font-family)` and `var(--vscode-font-size)` — never set custom font families
- Use `var(--vscode-editor-font-family)` for code/monospace content
- Headers: use native `<h2>`, `<h3>` tags — keep text small (14-16px max for headings)
- VS Code UI is information-dense — avoid large text or excessive whitespace

### Colors

- **Always** use VS Code CSS variables — never hardcode colors
- Key variables:
  - `--vscode-editor-background` / `--vscode-editor-foreground` — main bg/fg
  - `--vscode-input-background` / `--vscode-input-foreground` / `--vscode-input-border` — inputs
  - `--vscode-focusBorder` — focus rings and accent
  - `--vscode-panel-border` — borders and dividers
  - `--vscode-badge-background` / `--vscode-badge-foreground` — badges
  - `--vscode-button-background` / `--vscode-button-foreground` — buttons
  - `--vscode-errorForeground` — error text
  - `--vscode-list-activeSelectionBackground` — selected item highlight
  - `--vscode-list-hoverBackground` — hover states
  - `--vscode-sideBar-background` — sidebar panels

### Interaction

- Use hover states on interactive elements (cards, list items)
- Show focus indicators — never suppress `outline`
- Use `vscode-progress-ring` for loading states
- Use `vscode-progress-bar` for determinate progress
- Disable buttons during async operations, re-enable on completion
- For destructive actions, use secondary buttons and require confirmation

### Accessibility

- All interactive elements need keyboard access
- Use semantic HTML (`<button>`, `<label>`, `<h2>`) — vscode-elements handles ARIA internally
- Provide `label` attributes on form inputs
- Ensure sufficient contrast — VS Code variables handle this automatically
- Test in both light and dark themes

### Dark/Light Theme Support

The `onhostcontextchanged` callback provides theme info. Use `[data-theme="dark"]` CSS selectors for any custom styling that must differ by theme:

```css
:root {
  --custom-card-bg: var(--vscode-editor-background);
  --custom-card-border: var(--vscode-panel-border);
}

.card {
  background: var(--custom-card-bg);
  border: 1px solid var(--custom-card-border);
  border-radius: 4px;
  padding: 12px;
}
```

## Complete Example

A minimal data browser MCP App using vscode-elements:

```typescript
import { App } from "@modelcontextprotocol/ext-apps";
import "@vscode-elements/elements/dist/bundled.js";

interface BrowserData {
  items: Array<{ id: string; name: string; status: string }>;
}

const app = new App({ name: "Data Browser", version: "1.0.0" });
const root = document.getElementById("app")!;
let lastFp = "";

root.innerHTML = `
  <style>
    body {
      font-family: var(--vscode-font-family, system-ui);
      background: var(--vscode-editor-background, #1e1e1e);
      color: var(--vscode-editor-foreground, #ccc);
      padding: 16px;
    }
    .toolbar { display: flex; gap: 8px; margin-bottom: 12px; align-items: center; }
    .toolbar vscode-textfield { flex: 1; }
    .count { font-size: 12px; color: var(--vscode-descriptionForeground, #888); margin-bottom: 8px; }
  </style>
  <h2>Data Browser</h2>
  <div class="toolbar">
    <vscode-textfield id="search" placeholder="Search...">
      <span slot="content-before"><vscode-icon name="search"></vscode-icon></span>
    </vscode-textfield>
    <vscode-button id="refresh-btn" icon="refresh">Refresh</vscode-button>
  </div>
  <div class="count" id="count"></div>
  <vscode-table id="data-table">
    <vscode-table-header slot="header">
      <vscode-table-header-cell>Name</vscode-table-header-cell>
      <vscode-table-header-cell>Status</vscode-table-header-cell>
    </vscode-table-header>
    <vscode-table-body slot="body" id="table-body"></vscode-table-body>
  </vscode-table>
`;

const searchEl = root.querySelector<HTMLElement>("#search")! as any;
const countEl = root.querySelector("#count")!;
const bodyEl = root.querySelector("#table-body")!;
const refreshBtn = root.querySelector("#refresh-btn")!;

let allItems: BrowserData["items"] = [];

function render() {
  const q = (searchEl.value || "").toLowerCase();
  const filtered = allItems.filter(
    (i) => !q || i.name.toLowerCase().includes(q) || i.status.toLowerCase().includes(q)
  );
  countEl.textContent = `${filtered.length} items`;
  bodyEl.innerHTML = filtered
    .map(
      (i) => `
      <vscode-table-row>
        <vscode-table-cell>${i.name}</vscode-table-cell>
        <vscode-table-cell>
          <vscode-badge>${i.status}</vscode-badge>
        </vscode-table-cell>
      </vscode-table-row>`
    )
    .join("");
}

searchEl.addEventListener("input", render);

refreshBtn.addEventListener("click", async () => {
  const result = await app.callServerTool({
    name: "my_app_refresh",
    arguments: {},
  });
  allItems = (result.structuredContent as BrowserData)?.items ?? [];
  render();
});

app.ontoolresult = (result) => {
  const fp = JSON.stringify(result.structuredContent);
  if (fp === lastFp) return;
  lastFp = fp;
  const data = result.structuredContent as BrowserData | undefined;
  allItems = data?.items ?? [];
  render();
};

app.onhostcontextchanged = (ctx) => {
  if (ctx.theme) document.documentElement.setAttribute("data-theme", ctx.theme);
};

app.connect().then(() => {
  const ctx = app.getHostContext();
  if (ctx?.theme) document.documentElement.setAttribute("data-theme", ctx.theme);
});
```
