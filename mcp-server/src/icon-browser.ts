/**
 * Icon Browser MCP App — Client-side UI
 *
 * Interactive visual browser for all Azure & Coherence icons.
 * Renders icons as a visual grid with search, source/category filtering,
 * and a "Use this icon" selection flow that saves the choice to disk
 * so the model can read it.
 */

import { App } from "@modelcontextprotocol/ext-apps";
import "@vscode-elements/elements/dist/bundled.js";

interface IconEntry {
  id: string;
  name: string;
  source: "azure-portal" | "cui-builtin" | "curated" | "icon-collection";
  category: string;
  url: string | null;
  /** Data URI resolved server-side for webview CSP compatibility */
  displayUrl?: string;
  cuiName?: string;
  usage: string;
}

interface SourceInfo {
  source: string;
  count: number;
}

interface CategoryInfo {
  category: string;
  count: number;
}

const app = new App({ name: "Icon Browser", version: "1.0.0" });

let allIcons: IconEntry[] = [];
let allSources: SourceInfo[] = [];
let allCategories: CategoryInfo[] = [];
let totalCount = 0;
let selectedIcon: IconEntry | null = null;
let lastFingerprint = "";

// Currently loaded page (for lazy loading)
let displayLimit = 100;

const root = document.getElementById("app")!;
root.innerHTML = buildShell();

const searchEl = document.getElementById("search") as HTMLInputElement;
const sourceFilterEl = document.getElementById("source-filter") as HTMLSelectElement;
const categoryFilterEl = document.getElementById("category-filter") as HTMLSelectElement;
const countEl = document.getElementById("count")!;
const iconsEl = document.getElementById("icons")!;
const copiedEl = document.getElementById("copied")!;
const loadMoreEl = document.getElementById("load-more") as HTMLButtonElement;
const selectedEl = document.getElementById("selected-panel")!;
const selectedIconEl = document.getElementById("selected-icon")!;
const selectedNameEl = document.getElementById("selected-name")!;
const selectedSourceEl = document.getElementById("selected-source")!;
const selectedCategoryEl = document.getElementById("selected-category")!;
const selectedUsageEl = document.getElementById("selected-usage")!;
const copyBtnEl = document.getElementById("copy-btn") as HTMLButtonElement;
const useBtnEl = document.getElementById("use-btn") as HTMLButtonElement;
const closePanelEl = document.getElementById("close-panel") as HTMLButtonElement;
const confirmationEl = document.getElementById("confirmation")!;
const newSearchEl = document.getElementById("new-search") as HTMLButtonElement;

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function showCopied(msg: string) {
  copiedEl.textContent = msg;
  copiedEl.classList.add("show");
  setTimeout(() => copiedEl.classList.remove("show"), 1500);
}

const SOURCE_LABELS: Record<string, string> = {
  curated: "★ Curated",
  "cui-builtin": "Fluent UI",
  "azure-portal": "Azure Portal",
  "icon-collection": "Community",
};

const SOURCE_COLORS: Record<string, string> = {
  curated: "#0078d4",
  "cui-builtin": "#8764b8",
  "azure-portal": "#107c10",
  "icon-collection": "#ca5010",
};

function getFiltered(): IconEntry[] {
  const q = ((searchEl as any).value ?? "").toLowerCase();
  const src = (sourceFilterEl as any).value ?? "";
  const cat = (categoryFilterEl as any).value ?? "";
  return allIcons.filter((icon) => {
    if (src && icon.source !== src) return false;
    if (cat && icon.category !== cat) return false;
    if (q && !icon.name.toLowerCase().includes(q) && !icon.category.toLowerCase().includes(q) && !icon.id.toLowerCase().includes(q)) return false;
    return true;
  });
}

function render() {
  const filtered = getFiltered();

  const q = (searchEl as any).value ?? "";
  const src = (sourceFilterEl as any).value ?? "";
  const cat = (categoryFilterEl as any).value ?? "";
  const suffix =
    (src ? ` from ${SOURCE_LABELS[src] ?? src}` : "") +
    (cat ? ` in "${cat}"` : "") +
    (q ? ` matching "${q}"` : "");
  countEl.textContent = `${filtered.length} icons${suffix}`;

  const visible = filtered.slice(0, displayLimit);

  iconsEl.innerHTML = visible
    .map((icon) => {
      const sourceColor = SOURCE_COLORS[icon.source] ?? "#666";
      const sourceLabel = SOURCE_LABELS[icon.source] ?? icon.source;

      let imgHtml: string;
      const imgSrc = icon.displayUrl ?? icon.url;
      if (imgSrc) {
        imgHtml = `<img src="${escapeHtml(imgSrc)}" alt="${escapeHtml(icon.name)}" loading="lazy" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'" /><div class="icon-fallback" style="display:none">?</div>`;
      } else {
        // For cui-builtin icons, show placeholder with the name
        imgHtml = `<div class="icon-cui-name">${escapeHtml(icon.cuiName ?? icon.name)}</div>`;
      }

      return `<div class="icon-card" data-id="${escapeHtml(icon.id)}" data-idx="${allIcons.indexOf(icon)}">
  <div class="icon-preview">${imgHtml}</div>
  <div class="icon-label">${escapeHtml(icon.name)}</div>
  <div class="icon-source" style="background:${sourceColor}">${escapeHtml(sourceLabel)}</div>
</div>`;
    })
    .join("");

  // Show/hide load more button
  if (filtered.length > displayLimit) {
    loadMoreEl.style.display = "block";
    loadMoreEl.textContent = `Load more (${filtered.length - displayLimit} remaining)`;
  } else {
    loadMoreEl.style.display = "none";
  }
}

function populateFilters() {
  // Sources
  sourceFilterEl.innerHTML = '<vscode-option value="">All sources</vscode-option>';
  for (const s of allSources) {
    const label = `${SOURCE_LABELS[s.source] ?? s.source} (${s.count})`;
    sourceFilterEl.insertAdjacentHTML("beforeend",
      `<vscode-option value="${escapeHtml(s.source)}">${escapeHtml(label)}</vscode-option>`);
  }

  // Categories
  categoryFilterEl.innerHTML = '<vscode-option value="">All categories</vscode-option>';
  for (const c of allCategories) {
    categoryFilterEl.insertAdjacentHTML("beforeend",
      `<vscode-option value="${escapeHtml(c.category)}">${escapeHtml(c.category)} (${c.count})</vscode-option>`);
  }
}

function showSelected(icon: IconEntry) {
  selectedIcon = icon;
  selectedEl.classList.add("visible");

  const detailSrc = icon.displayUrl ?? icon.url;
  if (detailSrc) {
    selectedIconEl.innerHTML = `<img src="${escapeHtml(detailSrc)}" alt="${escapeHtml(icon.name)}" />`;
  } else {
    selectedIconEl.innerHTML = `<div class="selected-cui-name">${escapeHtml(icon.cuiName ?? icon.name)}</div>`;
  }

  selectedNameEl.textContent = icon.name;
  selectedSourceEl.textContent = SOURCE_LABELS[icon.source] ?? icon.source;
  selectedSourceEl.style.background = SOURCE_COLORS[icon.source] ?? "#666";
  selectedCategoryEl.textContent = icon.category;
  selectedUsageEl.textContent = icon.usage;

  copyBtnEl.onclick = () => {
    navigator.clipboard.writeText(icon.usage).then(() => showCopied("Copied usage!"));
  };

  useBtnEl.onclick = () => selectIcon(icon);
}

function hideSelected() {
  selectedEl.classList.remove("visible");
}

// ─── Event Listeners ───

searchEl.addEventListener("input", () => {
  displayLimit = 100;
  render();
});
searchEl.addEventListener("vsc-input", () => {
  displayLimit = 100;
  render();
});

sourceFilterEl.addEventListener("change", () => {
  displayLimit = 100;
  render();
});
sourceFilterEl.addEventListener("vsc-change", () => {
  displayLimit = 100;
  render();
});

categoryFilterEl.addEventListener("change", () => {
  displayLimit = 100;
  render();
});
categoryFilterEl.addEventListener("vsc-change", () => {
  displayLimit = 100;
  render();
});

loadMoreEl.addEventListener("click", () => {
  displayLimit += 100;
  render();
});

iconsEl.addEventListener("click", (e) => {
  const card = (e.target as HTMLElement).closest(".icon-card") as HTMLElement | null;
  if (!card) return;
  const idx = parseInt(card.dataset.idx ?? "-1", 10);
  if (idx >= 0 && idx < allIcons.length) {
    showSelected(allIcons[idx]);
  }
});

closePanelEl.addEventListener("click", hideSelected);

newSearchEl.addEventListener("click", async () => {
  newSearchEl.disabled = true;
  newSearchEl.textContent = "Searching...";
  try {
    const args: Record<string, string> = {};
    const q = (searchEl as any).value;
    const src = (sourceFilterEl as any).value;
    const cat = (categoryFilterEl as any).value;
    if (q) args.query = q;
    if (src) args.source = src;
    if (cat) args.category = cat;
    const result = await app.callServerTool({ name: "browse_icons", arguments: args });
    if (result) handleIconData(result.structuredContent);
  } catch (err) {
    console.error("Search failed:", err);
    showCopied("Search failed \u2014 try again");
  } finally {
    newSearchEl.disabled = false;
    newSearchEl.textContent = "\ud83d\udd0d Search";
  }
});

searchEl.addEventListener("keydown", (e) => {
  if (e.key === "Enter") newSearchEl.click();
});

// ─── Icon Selection ───

async function selectIcon(icon: IconEntry) {
  useBtnEl.disabled = true;
  useBtnEl.textContent = "Saving...";
  try {
    await app.callServerTool({
      name: "icon_select_data",
      arguments: {
        id: icon.id,
        name: icon.name,
        source: icon.source,
        category: icon.category,
        url: icon.url,
        cuiName: icon.cuiName,
        usage: icon.usage,
      },
    });
    // Show confirmation
    hideSelected();
    showConfirmation(icon);
  } catch (err) {
    console.error("Failed to save icon selection:", err);
    showCopied("Selection failed — try again");
  } finally {
    useBtnEl.disabled = false;
    useBtnEl.textContent = "✓ Use this icon";
  }
}

function showConfirmation(icon: IconEntry) {
  let imgHtml: string;
  const confirmSrc = icon.displayUrl ?? icon.url;
  if (confirmSrc) {
    imgHtml = `<img src="${escapeHtml(confirmSrc)}" alt="${escapeHtml(icon.name)}" style="max-width:64px;max-height:64px;" />`;
  } else {
    imgHtml = `<div style="font-size:14px;color:var(--accent);font-weight:600;width:64px;height:64px;display:flex;align-items:center;justify-content:center;border:1px dashed var(--accent);border-radius:8px;">${escapeHtml(icon.cuiName ?? icon.name)}</div>`;
  }

  confirmationEl.innerHTML = `
    <div class="confirmation-content">
      <div class="confirmation-icon">${imgHtml}</div>
      <div class="confirmation-check">✓</div>
      <div class="confirmation-title">Icon Selected!</div>
      <div class="confirmation-name">${escapeHtml(icon.name)}</div>
      <div class="confirmation-usage">${escapeHtml(icon.usage)}</div>
      <div class="confirmation-hint">Your selection has been saved. You can tell the assistant to use this icon now.</div>
      <vscode-button id="browse-again" appearance="secondary">Browse more icons</vscode-button>
    </div>`;
  confirmationEl.style.display = "flex";

  document.getElementById("browse-again")!.addEventListener("click", () => {
    confirmationEl.style.display = "none";
  });
}

// ─── MCP App Integration ───

interface IconResultData {
  icons?: IconEntry[];
  total?: number;
  sources?: SourceInfo[];
  categories?: CategoryInfo[];
  prefillQuery?: string | null;
  prefillSource?: string | null;
  prefillCategory?: string | null;
}

function handleIconData(raw: unknown) {
  const data = raw as IconResultData | undefined;
  if (!data) return;
  allIcons = data.icons ?? [];
  totalCount = data.total ?? allIcons.length;
  allSources = data.sources ?? [];
  allCategories = data.categories ?? [];
  populateFilters();

  if (data.prefillQuery) {
    searchEl.value = data.prefillQuery;
  }
  if (data.prefillSource) {
    sourceFilterEl.value = data.prefillSource;
  }
  if (data.prefillCategory) {
    categoryFilterEl.value = data.prefillCategory;
  }

  displayLimit = 100;
  confirmationEl.style.display = "none";
  render();
}

app.ontoolresult = (result) => {
  const fp = JSON.stringify(result.structuredContent);
  if (fp === lastFingerprint) return;
  lastFingerprint = fp;
  handleIconData(result.structuredContent);
};

// Theme support
app.onhostcontextchanged = (ctx) => {
  if (ctx.theme) {
    document.documentElement.setAttribute("data-theme", ctx.theme);
  }
};

app.connect().then(() => {
  const ctx = app.getHostContext();
  if (ctx?.theme) {
    document.documentElement.setAttribute("data-theme", ctx.theme);
  }
});

function buildShell(): string {
  return `
<style>
  :root {
    --bg: var(--vscode-editor-background, #fff);
    --fg: var(--vscode-editor-foreground, #1a1a1a);
    --border: var(--vscode-panel-border, #e0e0e0);
    --accent: var(--vscode-focusBorder, #0078d4);
    --card-bg: var(--vscode-editorWidget-background, #f5f5f5);
    --card-hover: var(--vscode-list-hoverBackground, #e8e8e8);
    --panel-bg: var(--vscode-editorWidget-background, #fff);
    --panel-shadow: var(--vscode-widget-shadow, rgba(0,0,0,0.15));
    --muted: var(--vscode-descriptionForeground, #888);
    --success: var(--vscode-testing-iconPassed, #107c10);
  }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    font-family: var(--vscode-font-family, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif);
    font-size: var(--vscode-font-size, 13px);
    background: var(--bg); color: var(--fg); padding: 16px;
    line-height: 1.4;
  }

  /* ─── Header ─── */
  .header { display: flex; align-items: center; gap: 10px; margin-bottom: 12px; }
  .header h1 { font-size: 18px; font-weight: 600; }
  .header .subtitle { font-size: 12px; color: var(--muted); }

  /* ─── Toolbar ─── */
  .toolbar {
    display: flex; gap: 8px; margin-bottom: 12px; flex-wrap: wrap; align-items: center;
  }
  .toolbar vscode-textfield { flex: 1; min-width: 200px; }

  /* ─── Count ─── */
  .count { font-size: 13px; color: var(--muted); margin-bottom: 12px; }

  /* ─── Icon Grid ─── */
  .icons {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: 8px;
  }
  .icon-card {
    display: flex; flex-direction: column; align-items: center;
    padding: 12px 8px 8px; border-radius: 8px; background: var(--card-bg);
    border: 1px solid var(--border); cursor: pointer;
    transition: border-color 0.15s, background 0.15s, transform 0.1s;
    text-align: center; overflow: hidden;
  }
  .icon-card:hover {
    border-color: var(--accent); background: var(--card-hover);
    transform: translateY(-1px);
  }

  .icon-preview {
    width: 40px; height: 40px; display: flex; align-items: center;
    justify-content: center; margin-bottom: 6px; flex-shrink: 0;
  }
  .icon-preview img {
    max-width: 40px; max-height: 40px; object-fit: contain;
  }
  .icon-fallback {
    width: 40px; height: 40px; align-items: center; justify-content: center;
    font-size: 20px; color: var(--muted); border: 1px dashed var(--border); border-radius: 4px;
  }
  .icon-cui-name {
    font-size: 10px; color: var(--accent); font-weight: 600;
    display: flex; align-items: center; justify-content: center;
    width: 40px; height: 40px; border: 1px dashed var(--accent);
    border-radius: 4px; opacity: 0.8; word-break: break-all;
    text-align: center; line-height: 1.2; padding: 2px;
  }

  .icon-label {
    font-size: 11px; font-weight: 500; word-break: break-all;
    max-height: 28px; overflow: hidden; line-height: 1.3;
  }
  .icon-source {
    display: inline-block; padding: 1px 6px; border-radius: 8px;
    font-size: 9px; color: #fff; margin-top: 4px; white-space: nowrap;
  }

  /* ─── Load More ─── */
  #load-more { display: none; margin: 16px auto; }

  /* ─── Detail Panel ─── */
  .selected-panel {
    position: fixed; bottom: -200px; left: 16px; right: 16px;
    background: var(--panel-bg); border: 1px solid var(--border);
    border-radius: 12px 12px 0 0; padding: 16px 20px;
    box-shadow: 0 -4px 20px var(--panel-shadow);
    transition: bottom 0.25s ease;
    z-index: 100; display: flex; align-items: center; gap: 16px;
  }
  .selected-panel.visible { bottom: 0; }

  .selected-preview {
    width: 48px; height: 48px; display: flex; align-items: center;
    justify-content: center; flex-shrink: 0;
  }
  .selected-preview img {
    max-width: 48px; max-height: 48px; object-fit: contain;
  }
  .selected-cui-name {
    font-size: 12px; color: var(--accent); font-weight: 600;
    display: flex; align-items: center; justify-content: center;
    width: 48px; height: 48px; border: 1px dashed var(--accent);
    border-radius: 6px; word-break: break-all; text-align: center;
  }

  .selected-info { flex: 1; min-width: 0; }
  .selected-name { font-size: 14px; font-weight: 600; }
  .selected-meta { display: flex; gap: 8px; align-items: center; margin: 4px 0; flex-wrap: wrap; }
  .selected-source-chip {
    display: inline-block; padding: 2px 8px; border-radius: 8px;
    font-size: 10px; color: #fff;
  }
  .selected-category-chip {
    font-size: 11px; color: var(--muted);
  }
  .selected-usage {
    font-family: var(--vscode-editor-font-family, 'SF Mono', 'Fira Code', 'Consolas', monospace);
    font-size: 11px; background: var(--card-bg); padding: 6px 10px;
    border-radius: 4px; border: 1px solid var(--border);
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    margin-top: 6px; max-width: 100%;
  }

  .selected-actions { display: flex; gap: 8px; flex-shrink: 0; }

  /* ─── Toast ─── */
  .copied {
    position: fixed; top: 16px; right: 16px; background: var(--accent); color: #fff;
    padding: 6px 16px; border-radius: 6px; font-size: 13px; opacity: 0;
    transition: opacity 0.2s; pointer-events: none; z-index: 200;
  }
  .copied.show { opacity: 1; }

  /* ─── Confirmation Overlay ─── */
  .confirmation-overlay {
    display: none; position: fixed; inset: 0; z-index: 150;
    background: var(--bg); align-items: center; justify-content: center;
  }
  .confirmation-content {
    text-align: center; padding: 32px; max-width: 400px;
  }
  .confirmation-icon { margin-bottom: 12px; }
  .confirmation-check {
    font-size: 32px; color: var(--success); margin-bottom: 8px;
  }
  .confirmation-title {
    font-size: 18px; font-weight: 600; margin-bottom: 4px;
  }
  .confirmation-name {
    font-size: 14px; color: var(--muted); margin-bottom: 12px;
  }
  .confirmation-usage {
    font-family: var(--vscode-editor-font-family, 'SF Mono', 'Fira Code', 'Consolas', monospace);
    font-size: 12px; background: var(--card-bg); padding: 8px 14px;
    border-radius: 6px; border: 1px solid var(--border);
    margin-bottom: 16px; word-break: break-all;
  }
  .confirmation-hint {
    font-size: 13px; color: var(--muted); margin-bottom: 16px; line-height: 1.5;
  }
</style>

<div class="header">
  <h1>Icon Browser</h1>
  <span class="subtitle">Browse all Azure & Coherence icons</span>
</div>

<div class="toolbar">
  <vscode-textfield id="search" placeholder="Search icons by name, category, or extension..."></vscode-textfield>
  <vscode-single-select id="source-filter">
    <vscode-option value="">All sources</vscode-option>
  </vscode-single-select>
  <vscode-single-select id="category-filter">
    <vscode-option value="">All categories</vscode-option>
  </vscode-single-select>
  <vscode-button id="new-search" title="Fetch new results from server">Search</vscode-button>
</div>

<div class="count" id="count">Loading icons...</div>
<div class="icons" id="icons"></div>
<vscode-button id="load-more" appearance="secondary" style="display:none;margin:16px auto;">Load more</vscode-button>

<!-- Detail panel -->
<div class="selected-panel" id="selected-panel">
  <div class="selected-preview" id="selected-icon"></div>
  <div class="selected-info">
    <div class="selected-name" id="selected-name"></div>
    <div class="selected-meta">
      <span class="selected-source-chip" id="selected-source"></span>
      <span class="selected-category-chip" id="selected-category"></span>
    </div>
    <div class="selected-usage" id="selected-usage"></div>
  </div>
  <div class="selected-actions">
    <vscode-button id="use-btn">Use this icon</vscode-button>
    <vscode-button id="copy-btn" appearance="secondary">Copy usage</vscode-button>
    <vscode-button id="close-panel" appearance="icon">✕</vscode-button>
  </div>
</div>

<div class="copied" id="copied">Copied!</div>

<!-- Confirmation overlay -->
<div class="confirmation-overlay" id="confirmation"></div>
`;
}
