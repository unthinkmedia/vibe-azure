import { App } from "@modelcontextprotocol/ext-apps";

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
  const q = searchEl.value.toLowerCase();
  const cat = filterEl.value;
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
          `<span class="category-chip">${escapeHtml(t.category)}</span>` +
        `</div></div>`;
    })
    .join("");
}

function populateCategories() {
  filterEl.innerHTML = '<option value="">All categories</option>';
  for (const c of allCategories) {
    const opt = document.createElement("option");
    opt.value = c.category;
    opt.textContent = `${c.category} (${c.count})`;
    if (c.category === activeCategory) opt.selected = true;
    filterEl.appendChild(opt);
  }
}

// Handle tool results from the server
app.ontoolresult = (result) => {
  const data = result.structuredContent as {
    tokens?: Token[];
    categories?: CategoryInfo[];
    activeCategory?: string | null;
  } | undefined;
  if (data) {
    allTokens = data.tokens ?? [];
    allCategories = data.categories ?? [];
    activeCategory = data.activeCategory ?? "";
    populateCategories();
    if (activeCategory) filterEl.value = activeCategory;
    render();
  }
};

// Interactive filtering
searchEl.addEventListener("input", render);
filterEl.addEventListener("change", render);

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
