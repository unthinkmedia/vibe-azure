import { App } from "@modelcontextprotocol/ext-apps";
import "@vscode-elements/elements/dist/bundled.js";

interface Token {
  name: string;
  value: string;
  category: string;
}

interface CategoryInfo {
  category: string;
  count: number;
}

const app = new App({ name: "Token Browser", version: "1.0.0" });

let allTokens: Token[] = [];
let allCategories: CategoryInfo[] = [];
let activeCategory = "";
let lastFingerprint = "";

const root = document.getElementById("app")!;
root.innerHTML = buildShell();

const searchEl = document.getElementById("search") as HTMLInputElement;
const filterEl = document.getElementById("category-filter") as HTMLSelectElement;
const countEl = document.getElementById("count")!;
const tokensEl = document.getElementById("tokens")!;
const copiedEl = document.getElementById("copied")!;

const COLOR_CATEGORIES = new Set([
  "color-palette", "foreground", "background", "brand",
  "status", "stroke", "subtle", "compound-brand", "overlay",
]);

function isColorValue(val: string): boolean {
  return /^(#|rgb|hsl|oklch|color\(|var\()/.test(val.trim()) ||
    /^(transparent|currentColor|inherit)$/i.test(val.trim());
}

function escapeHtml(str: string): string {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function showCopied() {
  copiedEl.classList.add("show");
  setTimeout(() => copiedEl.classList.remove("show"), 1200);
}

function render() {
  const q = (searchEl as any).value?.toLowerCase() ?? "";
  const cat = (filterEl as any).value ?? "";
  const filtered = allTokens.filter((t) => {
    if (cat && t.category !== cat) return false;
    if (q && !t.name.toLowerCase().includes(q) && !t.value.toLowerCase().includes(q)) return false;
    return true;
  });

  const suffix = (cat ? ` in ${cat}` : "") + (q ? ` matching "${q}"` : "");
  countEl.textContent = `${filtered.length} tokens${suffix}`;

  tokensEl.innerHTML = filtered
    .slice(0, 200)
    .map((t) => {
      const showSwatch = isColorValue(t.value) || COLOR_CATEGORIES.has(t.category);
      const isSpacing = t.category === "spacing";
      let swatchHtml = "";
      if (showSwatch) {
        swatchHtml = `<div class="swatch" style="background:${escapeHtml(t.value)}"></div>`;
      } else if (isSpacing) {
        const px = parseInt(t.value, 10) || 4;
        swatchHtml = `<div class="swatch-spacing"><div class="swatch-spacing-bar" style="height:${Math.min(px, 28)}px"></div></div>`;
      }
      return `<div class="token" data-name="${escapeHtml(t.name)}">` +
        swatchHtml +
        `<div class="token-info">` +
          `<div class="token-name">${escapeHtml(t.name)}</div>` +
          `<div class="token-value">${escapeHtml(t.value)}</div>` +
          `<vscode-badge variant="counter" class="category-chip">${escapeHtml(t.category)}</vscode-badge>` +
        `</div></div>`;
    })
    .join("");
}

function populateCategories() {
  filterEl.innerHTML = '<vscode-option value="">All categories</vscode-option>';
  for (const c of allCategories) {
    const optHtml = `<vscode-option value="${escapeHtml(c.category)}"${c.category === activeCategory ? " selected" : ""}>${escapeHtml(c.category)} (${c.count})</vscode-option>`;
    filterEl.insertAdjacentHTML("beforeend", optHtml);
  }
}

// Handle tool results from the server
app.ontoolresult = (result) => {
  const data = result.structuredContent as {
    tokens?: Token[];
    categories?: CategoryInfo[];
    activeCategory?: string | null;
  } | undefined;
  if (!data) return;
  const fp = JSON.stringify(data);
  if (fp === lastFingerprint) return;
  lastFingerprint = fp;
  if (data.tokens) allTokens = data.tokens;
  if (data.categories) allCategories = data.categories;
  activeCategory = data.activeCategory ?? "";
  populateCategories();
  if (activeCategory) filterEl.value = activeCategory;
  render();
};

// Interactive filtering
searchEl.addEventListener("input", render);
searchEl.addEventListener("vsc-input", render);
filterEl.addEventListener("change", render);
filterEl.addEventListener("vsc-change", render);

// Click to copy token name
tokensEl.addEventListener("click", (e) => {
  const tokenEl = (e.target as HTMLElement).closest(".token") as HTMLElement | null;
  if (tokenEl?.dataset.name) {
    navigator.clipboard.writeText(`var(${tokenEl.dataset.name})`).then(showCopied);
  }
});

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
    --swatch-border: var(--vscode-editorWidget-border, #ddd);
    --muted: var(--vscode-descriptionForeground, #888);
  }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    font-family: var(--vscode-font-family, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif);
    font-size: var(--vscode-font-size, 13px);
    background: var(--bg); color: var(--fg); padding: 16px;
    line-height: 1.4;
  }
  h1 { font-size: 18px; font-weight: 600; margin-bottom: 12px; }
  .toolbar {
    display: flex; gap: 8px; margin-bottom: 16px; flex-wrap: wrap; align-items: center;
  }
  .toolbar vscode-textfield { flex: 1; min-width: 200px; }
  .count { font-size: 13px; color: var(--muted); margin-bottom: 12px; }
  .tokens {
    display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 8px;
  }
  .token {
    display: flex; align-items: center; gap: 10px;
    padding: 8px 12px; border-radius: 6px; background: var(--card-bg);
    border: 1px solid var(--border); font-size: 12px;
    cursor: pointer; transition: border-color 0.15s;
  }
  .token:hover { border-color: var(--accent); }
  .swatch {
    width: 28px; height: 28px; border-radius: 4px; border: 1px solid var(--swatch-border);
    flex-shrink: 0;
  }
  .swatch-spacing {
    width: 28px; height: 28px; display: flex; align-items: flex-end; flex-shrink: 0;
  }
  .swatch-spacing-bar {
    background: var(--accent); border-radius: 2px; width: 100%;
  }
  .token-info { overflow: hidden; flex: 1; }
  .token-name { font-weight: 600; font-size: 12px; word-break: break-all; }
  .token-value { color: var(--muted); font-size: 11px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .category-chip { margin-top: 2px; }
  .copied {
    position: fixed; top: 16px; right: 16px; background: var(--accent); color: #fff;
    padding: 6px 16px; border-radius: 6px; font-size: 13px; opacity: 0;
    transition: opacity 0.2s; pointer-events: none;
  }
  .copied.show { opacity: 1; }
</style>

<h1>Coherence Design Tokens</h1>
<div class="toolbar">
  <vscode-textfield id="search" placeholder="Search tokens..."></vscode-textfield>
  <vscode-single-select id="category-filter">
    <vscode-option value="">All categories</vscode-option>
  </vscode-single-select>
</div>
<div class="count" id="count"></div>
<div class="tokens" id="tokens"></div>
<div class="copied" id="copied">Copied!</div>
`;
}
