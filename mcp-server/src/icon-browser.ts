/**
 * Icon Browser MCP App — Client-side UI
 *
 * Interactive visual browser for all Azure & Coherence icons.
 * Renders icons as a visual grid with search, source/category filtering,
 * and a "Use this icon" selection flow that saves the choice to disk
 * so the model can read it.
 */

import { App } from "@modelcontextprotocol/ext-apps";

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

// Currently loaded page (for lazy loading)
let displayLimit = 100;

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
  const q = searchEl.value.toLowerCase();
  const src = sourceFilterEl.value;
  const cat = categoryFilterEl.value;
  return allIcons.filter((icon) => {
    if (src && icon.source !== src) return false;
    if (cat && icon.category !== cat) return false;
    if (q && !icon.name.toLowerCase().includes(q) && !icon.category.toLowerCase().includes(q) && !icon.id.toLowerCase().includes(q)) return false;
    return true;
  });
}

function render() {
  const filtered = getFiltered();

  const q = searchEl.value;
  const src = sourceFilterEl.value;
  const cat = categoryFilterEl.value;
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
  sourceFilterEl.innerHTML = '<option value="">All sources</option>';
  for (const s of allSources) {
    const opt = document.createElement("option");
    opt.value = s.source;
    opt.textContent = `${SOURCE_LABELS[s.source] ?? s.source} (${s.count})`;
    sourceFilterEl.appendChild(opt);
  }

  // Categories
  categoryFilterEl.innerHTML = '<option value="">All categories</option>';
  for (const c of allCategories) {
    const opt = document.createElement("option");
    opt.value = c.category;
    opt.textContent = `${c.category} (${c.count})`;
    categoryFilterEl.appendChild(opt);
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

sourceFilterEl.addEventListener("change", () => {
  displayLimit = 100;
  render();
});

categoryFilterEl.addEventListener("change", () => {
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
    if (searchEl.value) args.query = searchEl.value;
    if (sourceFilterEl.value) args.source = sourceFilterEl.value;
    if (categoryFilterEl.value) args.category = categoryFilterEl.value;
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
      <button class="confirmation-browse-btn" id="browse-again">Browse more icons</button>
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
