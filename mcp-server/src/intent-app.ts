/**
 * Design Intent MCP App — Client-side UI
 *
 * Renders an interactive form for capturing design intent before prototyping.
 * Each intent lives as intent.json inside its experiment folder.
 * Communicates with the MCP server via callServerTool for CRUD operations.
 */

import { App } from "@modelcontextprotocol/ext-apps";
import "@vscode-elements/elements/dist/bundled.js";

// ── Types ──

interface DesignIntent {
  experimentId: string;
  title: string;
  vision: string;
  problem: string;
  successCriteria: string[];
  nonGoals: string[];
  constraints: string[];
  figmaUrl?: string;
  figmaMode?: "import" | "reference";
  figmaContext?: string;
  updatedAt: string;
  status: "draft" | "active" | "completed" | "abandoned";
}

interface PrefillData {
  experimentId?: string;
  title?: string;
  vision?: string;
  problem?: string;
  successCriteria?: string[];
  nonGoals?: string[];
  constraints?: string[];
  figmaUrl?: string;
  figmaMode?: "import" | "reference";
  figmaContext?: string;
}

interface IntentListData {
  intents: DesignIntent[];
  experiments: string[];
  prefill?: PrefillData;
}

// ── State ──

let allIntents: DesignIntent[] = [];
let allExperiments: string[] = [];
let editingExperimentId: string | null = null;
/** Fingerprint of last-rendered data to skip redundant re-renders */
let lastDataFingerprint = "";

// ── App setup ──

const app = new App({ name: "Design Intent", version: "1.0.0" });

const root = document.getElementById("app")!;
root.innerHTML = buildShell();

// Cache DOM refs after shell is built
const listEl = document.getElementById("intent-list")!;
const formEl = document.getElementById("intent-form") as HTMLFormElement;
const formTitle = document.getElementById("form-title")!;
const formSection = document.getElementById("form-section")!;
const listSection = document.getElementById("list-section")!;
const countEl = document.getElementById("intent-count")!;

// ── Event wiring ──

// Handle initial tool result (model calls design_intent)
// The host may re-deliver this on scroll/resize — deduplicate to prevent scroll reset.
app.ontoolresult = (result) => {
  const data = result.structuredContent as IntentListData | undefined;
  if (!data) return;
  const fp = JSON.stringify(data);
  if (fp === lastDataFingerprint) return; // identical data — skip re-render
  lastDataFingerprint = fp;
  if (data.intents) allIntents = data.intents;
  if (data.experiments) allExperiments = data.experiments;
  renderList();

  // If prefill data was provided, auto-open the form with those values
  if (data.prefill) {
    showFormWithPrefill(data.prefill);
    // Auto-save prefilled data immediately so intent.json exists right away
    scheduleAutoSave();
  }
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

// ── Data fetching via app-only tools ──

async function fetchIntents(): Promise<void> {
  const result = await app.callServerTool({
    name: "intent_list_data",
    arguments: {},
  });
  const data = result.structuredContent as IntentListData | undefined;
  if (data?.intents) {
    allIntents = data.intents;
  }
  if (data?.experiments) {
    allExperiments = data.experiments;
  }
  renderList();
}

async function saveIntent(intent: Record<string, unknown>): Promise<void> {
  try {
    await app.callServerTool({
      name: "intent_save_data",
      arguments: intent,
    });
    // Refresh the list in the background (don't re-render form)
    const result = await app.callServerTool({
      name: "intent_list_data",
      arguments: {},
    });
    const data = result.structuredContent as IntentListData | undefined;
    if (data?.intents) allIntents = data.intents;
    if (data?.experiments) allExperiments = data.experiments;
  } catch (err) {
    console.error("Failed to save intent:", err);
    throw err;
  }
}

async function deleteIntent(experimentId: string): Promise<void> {
  await app.callServerTool({
    name: "intent_delete_data",
    arguments: { experimentId },
  });
  await fetchIntents();
}

async function updateStatus(
  experimentId: string,
  status: DesignIntent["status"]
): Promise<void> {
  await app.callServerTool({
    name: "intent_save_data",
    arguments: { experimentId, status },
  });
  await fetchIntents();
}

// ── Rendering ──

function renderList(): void {
  // Preserve scroll position across innerHTML replacement
  const scrollY = window.scrollY;

  countEl.textContent = `${allIntents.length} intent${allIntents.length !== 1 ? "s" : ""}`;

  if (allIntents.length === 0) {
    listEl.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">📋</div>
        <p>No design intents yet.</p>
        <p class="hint">Define your intent before prototyping — capture
        the <strong>what</strong>, <strong>why</strong>, and <strong>success criteria</strong>.</p>
      </div>`;
    return;
  }

  listEl.innerHTML = allIntents
    .map(
      (intent) => `
    <div class="intent-card" data-status="${intent.status}">
      <div class="card-header">
        <div class="card-title-row">
          <span class="status-badge status-${intent.status}">${intent.status}</span>
          <strong class="card-title">${esc(intent.title)}</strong>
        </div>
        <div class="card-actions">
          <button class="icon-btn edit-btn" data-id="${intent.experimentId}" title="Edit">✏️</button>
          <button class="icon-btn delete-btn" data-id="${intent.experimentId}" title="Delete">🗑️</button>
        </div>
      </div>
      <span class="experiment-link">📁 ${esc(intent.experimentId)}</span>
      <p class="vision-text">${esc(intent.vision)}</p>
      ${
        intent.figmaUrl
          ? `<div class="figma-link-row">
              <span class="figma-badge figma-badge-${intent.figmaMode || 'import'}">${intent.figmaMode === "reference" ? "🔍 Reference" : "🎨 Import"}</span>
              <a href="${esc(intent.figmaUrl)}" target="_blank" rel="noopener" class="figma-url">${esc(intent.figmaUrl.length > 60 ? intent.figmaUrl.slice(0, 57) + "..." : intent.figmaUrl)}</a>
            </div>`
          : ""
      }
      ${
        intent.successCriteria.length > 0
          ? `<div class="criteria-section">
              <span class="section-label">Success Criteria</span>
              <ul>${intent.successCriteria.map((c) => `<li>${esc(c)}</li>`).join("")}</ul>
            </div>`
          : ""
      }
      <div class="card-footer">
        <span class="date">Updated ${intent.updatedAt.slice(0, 10)}</span>
        <div class="status-actions">
          ${intent.status === "draft" ? `<vscode-button class="activate-btn" data-id="${intent.experimentId}" appearance="secondary">Activate</vscode-button>` : ""}
          ${intent.status === "active" ? `<vscode-button class="complete-btn" data-id="${intent.experimentId}" appearance="secondary">Complete</vscode-button>` : ""}
        </div>
      </div>
    </div>`
    )
    .join("");

  // Wire card buttons
  listEl.querySelectorAll(".edit-btn").forEach((btn) =>
    btn.addEventListener("click", () => {
      const id = (btn as HTMLElement).dataset.id!;
      showForm(allIntents.find((i) => i.experimentId === id) ?? null);
    })
  );
  listEl.querySelectorAll(".delete-btn").forEach((btn) =>
    btn.addEventListener("click", () => {
      const id = (btn as HTMLElement).dataset.id!;
      deleteIntent(id);
    })
  );
  listEl.querySelectorAll(".activate-btn").forEach((btn) =>
    btn.addEventListener("click", () => {
      updateStatus((btn as HTMLElement).dataset.id!, "active");
    })
  );
  listEl.querySelectorAll(".complete-btn").forEach((btn) =>
    btn.addEventListener("click", () => {
      updateStatus((btn as HTMLElement).dataset.id!, "completed");
    })
  );

  // Restore scroll position after DOM update
  requestAnimationFrame(() => window.scrollTo(0, scrollY));
}

// ── Form ──

function showForm(intent: DesignIntent | null): void {
  editingExperimentId = intent?.experimentId ?? null;
  formTitle.textContent = intent ? "Edit Intent" : "New Design Intent";

  const experimentSelect = formEl.querySelector("#f-experiment") as any;
  const experimentInput = formEl.querySelector("#f-experiment-new") as any;

  // Populate experiment dropdown with folders that don't have intents yet (+ current if editing)
  const takenExperiments = new Set(allIntents.map((i) => i.experimentId));
  const availableExperiments = allExperiments.filter(
    (e) => !takenExperiments.has(e) || e === editingExperimentId
  );

  experimentSelect.innerHTML =
    '<vscode-option value="">— Select existing experiment —</vscode-option>' +
    availableExperiments
      .map(
        (e) =>
          `<vscode-option value="${esc(e)}"${e === editingExperimentId ? " selected" : ""}>${esc(e)}</vscode-option>`
      )
      .join("");

  if (intent) {
    experimentSelect.value = intent.experimentId;
    experimentSelect.disabled = true;
    experimentInput.value = "";
    experimentInput.disabled = true;
  } else {
    experimentSelect.disabled = false;
    experimentInput.disabled = false;
    experimentInput.value = "";
  }

  (formEl.querySelector("#f-title") as any).value =
    intent?.title ?? "";
  (formEl.querySelector("#f-vision") as any).value =
    intent?.vision ?? "";
  (formEl.querySelector("#f-problem") as any).value =
    intent?.problem ?? "";
  (formEl.querySelector("#f-criteria") as any).value =
    (intent?.successCriteria ?? []).join("\n");
  (formEl.querySelector("#f-nongoals") as any).value =
    (intent?.nonGoals ?? []).join("\n");
  (formEl.querySelector("#f-constraints") as any).value =
    (intent?.constraints ?? []).join("\n");
  (formEl.querySelector("#f-figma-url") as any).value =
    intent?.figmaUrl ?? "";
  (formEl.querySelector("#f-figma-mode") as any).value =
    intent?.figmaMode ?? "import";
  (formEl.querySelector("#f-figma-context") as any).value =
    intent?.figmaContext ?? "";

  formSection.style.display = "block";
  listSection.style.display = "none";
  requestAnimationFrame(() => initAutoGrowTextareas());
}

/** Open the form pre-populated with data extracted from the conversation */
function showFormWithPrefill(prefill: PrefillData): void {
  editingExperimentId = null;
  formTitle.textContent = "New Design Intent";

  const experimentSelect = formEl.querySelector("#f-experiment") as any;
  const experimentInput = formEl.querySelector("#f-experiment-new") as any;

  // Populate experiment dropdown
  const takenExperiments = new Set(allIntents.map((i) => i.experimentId));
  const availableExperiments = allExperiments.filter(
    (e) => !takenExperiments.has(e)
  );

  experimentSelect.innerHTML =
    '<vscode-option value="">— Select existing experiment —</vscode-option>' +
    availableExperiments
      .map((e) => `<vscode-option value="${esc(e)}">${esc(e)}</vscode-option>`)
      .join("");

  experimentSelect.disabled = false;
  experimentInput.disabled = false;

  // If the prefill has an experimentId, check if it matches an existing folder
  if (prefill.experimentId) {
    if (availableExperiments.includes(prefill.experimentId)) {
      experimentSelect.value = prefill.experimentId;
      experimentInput.value = "";
    } else {
      experimentSelect.value = "";
      experimentInput.value = prefill.experimentId;
    }
  } else {
    experimentSelect.value = "";
    experimentInput.value = "";
  }

  // Fill form fields with prefill data
  (formEl.querySelector("#f-title") as any).value =
    prefill.title ?? "";
  (formEl.querySelector("#f-vision") as any).value =
    prefill.vision ?? "";
  (formEl.querySelector("#f-problem") as any).value =
    prefill.problem ?? "";
  (formEl.querySelector("#f-criteria") as any).value =
    (prefill.successCriteria ?? []).join("\n");
  (formEl.querySelector("#f-nongoals") as any).value =
    (prefill.nonGoals ?? []).join("\n");
  (formEl.querySelector("#f-constraints") as any).value =
    (prefill.constraints ?? []).join("\n");
  (formEl.querySelector("#f-figma-url") as any).value =
    prefill.figmaUrl ?? "";
  (formEl.querySelector("#f-figma-mode") as any).value =
    prefill.figmaMode ?? "import";
  (formEl.querySelector("#f-figma-context") as any).value =
    prefill.figmaContext ?? "";

  formSection.style.display = "block";
  listSection.style.display = "none";
  requestAnimationFrame(() => initAutoGrowTextareas());
}

function hideForm(): void {
  editingExperimentId = null;
  formSection.style.display = "none";
  listSection.style.display = "block";
}

function collectFormData(): Record<string, unknown> | null {
  const experimentSelect = formEl.querySelector("#f-experiment") as any;
  const experimentInput = formEl.querySelector("#f-experiment-new") as any;

  const experimentId =
    experimentInput.value.trim() ||
    experimentSelect.value ||
    editingExperimentId;

  if (!experimentId) {
    alert("Please select an existing experiment or enter a new folder name.");
    return null;
  }

  return {
    experimentId,
    title: ((formEl.querySelector("#f-title") as any).value ?? "").trim(),
    vision: ((formEl.querySelector("#f-vision") as any).value ?? "").trim(),
    problem: ((formEl.querySelector("#f-problem") as any).value ?? "").trim(),
    successCriteria: splitLines(
      (formEl.querySelector("#f-criteria") as any).value ?? ""
    ),
    nonGoals: splitLines(
      (formEl.querySelector("#f-nongoals") as any).value ?? ""
    ),
    constraints: splitLines(
      (formEl.querySelector("#f-constraints") as any).value ?? ""
    ),
    figmaUrl: ((formEl.querySelector("#f-figma-url") as any).value ?? "").trim() || undefined,
    figmaMode: ((formEl.querySelector("#f-figma-mode") as any).value ?? "import") || undefined,
    figmaContext: ((formEl.querySelector("#f-figma-context") as any).value ?? "").trim() || undefined,
  };
}

// ── Auto-save (debounced) ──

let autoSaveTimer: ReturnType<typeof setTimeout> | null = null;
let lastAutoSaveJson = "";

function scheduleAutoSave(): void {
  if (autoSaveTimer) clearTimeout(autoSaveTimer);
  autoSaveTimer = setTimeout(async () => {
    const data = collectFormData();
    if (!data) return;
    const json = JSON.stringify(data);
    if (json === lastAutoSaveJson) return; // no change
    lastAutoSaveJson = json;
    showSaveIndicator("saving");
    try {
      await saveIntent(data);
      showSaveIndicator("saved");
    } catch {
      showSaveIndicator("error");
    }
  }, 800);
}

function showSaveIndicator(state: "saving" | "saved" | "error"): void {
  const el = document.getElementById("auto-save-status");
  if (!el) return;
  if (state === "saving") {
    el.textContent = "Saving...";
    el.className = "save-status save-saving";
  } else if (state === "saved") {
    el.textContent = "Saved ✓";
    el.className = "save-status save-saved";
    setTimeout(() => { el.textContent = ""; el.className = "save-status"; }, 2000);
  } else {
    el.textContent = "Save failed";
    el.className = "save-status save-error";
  }
}

// ── Helpers ──

function splitLines(text: string): string[] {
  return text
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
}

function esc(s: string): string {
  const d = document.createElement("div");
  d.textContent = s;
  return d.innerHTML;
}

// ── Shell HTML ──

function buildShell(): string {
  return `
<style>
  :root {
    --bg: var(--vscode-editor-background, #fff);
    --fg: var(--vscode-editor-foreground, #1a1a1a);
    --muted: var(--vscode-descriptionForeground, #666);
    --border: var(--vscode-panel-border, #e0e0e0);
    --card-bg: var(--vscode-editorWidget-background, #f8f8f8);
    --accent: var(--vscode-focusBorder, #0078d4);
    --accent-hover: var(--vscode-button-hoverBackground, #106ebe);
    --danger: var(--vscode-errorForeground, #d13438);
    --success: var(--vscode-testing-iconPassed, #107c10);
    --warning: var(--vscode-editorWarning-foreground, #ca5010);
    --input-bg: var(--vscode-input-background, #fff);
    --input-border: var(--vscode-input-border, #ccc);
    --radius: 8px; --radius-sm: 6px;
  }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    font-family: var(--vscode-font-family, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif);
    font-size: var(--vscode-font-size, 13px);
    background: var(--bg); color: var(--fg); line-height: 1.5;
  }
  #app { max-width: 640px; margin: 0 auto; padding: 20px 16px; }

  /* Header */
  .app-header {
    display: flex; align-items: center; justify-content: space-between;
    margin-bottom: 16px; gap: 12px;
  }
  .app-header h1 { font-size: 18px; font-weight: 600; }
  .intent-count { font-size: 13px; color: var(--muted); }

  /* Buttons */
  .sm-btn {
    padding: 3px 10px; border: 1px solid var(--border); border-radius: 4px;
    font-size: 11px; cursor: pointer; background: transparent; color: var(--fg);
  }
  .sm-btn:hover { background: var(--card-bg); }
  .icon-btn {
    background: none; border: none; cursor: pointer; font-size: 14px;
    padding: 2px 4px; border-radius: 4px; opacity: 0.6;
  }
  .icon-btn:hover { opacity: 1; background: var(--card-bg); }

  /* Cards */
  .intent-card {
    background: var(--card-bg); border: 1px solid var(--border);
    border-radius: var(--radius); padding: 14px; margin-bottom: 10px;
  }
  .card-header {
    display: flex; align-items: flex-start; justify-content: space-between; gap: 8px;
    margin-bottom: 8px;
  }
  .card-title-row { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
  .card-title { font-size: 15px; }
  .card-actions { display: flex; gap: 2px; flex-shrink: 0; }
  .vision-text { font-size: 13px; color: var(--muted); margin-bottom: 8px; }

  /* Figma link in cards */
  .figma-link-row {
    display: flex; align-items: center; gap: 6px; margin-bottom: 6px;
  }
  .figma-badge {
    display: inline-block; padding: 1px 8px; border-radius: 10px;
    font-size: 11px; font-weight: 500; background: #a259ff; color: #fff;
  }
  .figma-badge-reference {
    background: #0078d4;
  }
  .figma-url {
    font-size: 11px; color: var(--accent); text-decoration: none;
    overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
  }
  .figma-url:hover { text-decoration: underline; }

  /* Figma field in form */
  .figma-field {
    border-top: 1px solid var(--border); padding-top: 14px; margin-top: 6px;
  }
  .card-footer {
    display: flex; align-items: center; justify-content: space-between;
    margin-top: 8px; padding-top: 8px; border-top: 1px solid var(--border);
  }
  .date { font-size: 11px; color: var(--muted); }
  .experiment-link {
    display: inline-block; font-size: 11px; color: var(--accent);
    margin-bottom: 4px;
  }

  /* Status badges */
  .status-badge {
    display: inline-block; padding: 1px 8px; border-radius: 10px;
    font-size: 11px; font-weight: 500; text-transform: uppercase;
  }
  .status-draft { background: var(--border); color: var(--fg); }
  .status-active { background: var(--accent); color: #fff; }
  .status-completed { background: var(--success); color: #fff; }
  .status-abandoned { background: var(--muted); color: #fff; }

  /* Criteria */
  .criteria-section { margin-bottom: 6px; }
  .section-label { font-size: 11px; font-weight: 600; text-transform: uppercase; color: var(--muted); }
  .criteria-section ul { padding-left: 18px; font-size: 13px; margin-top: 2px; }
  .criteria-section li { margin-bottom: 2px; }

  /* Empty state */
  .empty-state { text-align: center; padding: 32px 16px; color: var(--muted); }
  .empty-icon { font-size: 36px; margin-bottom: 8px; }
  .hint { font-size: 13px; margin-top: 6px; }

  /* Form */
  #form-section { display: none; }
  .form-header {
    display: flex; align-items: center; justify-content: space-between;
    margin-bottom: 16px;
  }
  .form-header h2 { font-size: 16px; font-weight: 600; }
  .field { margin-bottom: 14px; }
  .field label {
    display: block; font-size: 12px; font-weight: 600; margin-bottom: 4px;
    color: var(--muted); text-transform: uppercase; letter-spacing: 0.3px;
  }
  .field vscode-textfield, .field vscode-textarea, .field vscode-single-select {
    width: 100%;
  }
  .field vscode-textarea {
    --max-lines: 6;
    max-height: calc(var(--max-lines) * 1.5em + 16px);
    overflow-y: auto;
  }
  .field .helper { font-size: 11px; color: var(--muted); margin-top: 3px; }
  .field-or {
    text-align: center; font-size: 11px; color: var(--muted);
    margin: 6px 0; text-transform: uppercase; letter-spacing: 0.5px;
  }
  /* Save status indicator */
  .save-status {
    font-size: 12px; transition: opacity 0.3s;
  }
  .save-saving { color: var(--muted); }
  .save-saved { color: var(--success); }
  .save-error { color: var(--danger); }

  /* Form actions */
  .form-actions { display: flex; gap: 8px; margin-top: 18px; align-items: center; justify-content: space-between; }

  /* Success state */
  #success-section { display: none; }
  .success-state {
    text-align: center; padding: 40px 16px;
  }
  .success-icon { font-size: 48px; margin-bottom: 12px; }
  .success-state h2 { font-size: 18px; font-weight: 600; margin-bottom: 8px; }
  .success-exp {
    font-size: 13px; color: var(--accent); margin-bottom: 12px;
  }
  .success-hint {
    font-size: 13px; color: var(--muted); line-height: 1.6; margin-bottom: 20px;
  }
  .success-actions { display: flex; justify-content: center; gap: 8px; }

  /* Intent summary in success state */
  .intent-summary {
    text-align: left;
    background: var(--card-bg); border: 1px solid var(--border);
    border-radius: var(--radius); padding: 16px; margin: 16px 0;
    max-width: 540px; margin-left: auto; margin-right: auto;
  }
  .summary-section { margin-bottom: 12px; }
  .summary-section:last-child { margin-bottom: 0; }
  .summary-label {
    display: block; font-size: 11px; font-weight: 600;
    text-transform: uppercase; color: var(--muted);
    letter-spacing: 0.3px; margin-bottom: 2px;
  }
  .summary-section p {
    font-size: 13px; color: var(--fg); line-height: 1.5; margin: 0;
  }
  .summary-section ul {
    padding-left: 18px; font-size: 13px; margin-top: 2px;
  }
  .summary-section li { margin-bottom: 2px; }
</style>

<div class="app-header">
  <div>
    <h1>Design Intent</h1>
    <span class="intent-count" id="intent-count">0 intents</span>
  </div>
</div>

<div id="list-section">
  <div id="intent-list"></div>
</div>

<div id="success-section"></div>

<div id="form-section">
  <div class="form-header">
    <h2 id="form-title">New Design Intent</h2>
  </div>
  <form id="intent-form" autocomplete="off">
    <div class="field">
      <label for="f-experiment">Experiment Folder</label>
      <vscode-single-select id="f-experiment"></vscode-single-select>
      <div class="field-or">or create new</div>
      <vscode-textfield id="f-experiment-new" placeholder="e.g. my-new-experiment"></vscode-textfield>
      <div class="helper">The intent will be saved as intent.json inside this experiment folder.</div>
    </div>
    <div class="field">
      <label for="f-title">Title <span style="font-weight:400;text-transform:none;font-size:11px;color:var(--muted)">(optional — AI will generate if blank)</span></label>
      <vscode-textfield id="f-title" placeholder="Leave blank to auto-generate from experiment name"></vscode-textfield>
    </div>
    <div class="field">
      <label for="f-vision">Vision</label>
      <vscode-textarea id="f-vision" rows="1" placeholder="What are you building? (1-2 sentences)"></vscode-textarea>
      <div class="helper">Describe the outcome, not the implementation.</div>
    </div>
    <div class="field">
      <label for="f-problem">Problem Statement</label>
      <vscode-textarea id="f-problem" rows="1" placeholder="What problem does this solve? Who benefits?"></vscode-textarea>
    </div>
    <div class="field">
      <label for="f-criteria">Success Criteria</label>
      <vscode-textarea id="f-criteria" rows="1" placeholder="One per line, e.g.&#10;Shows resource health at a glance&#10;Supports both list and card views"></vscode-textarea>
      <div class="helper">One criterion per line. How will you know it's right?</div>
    </div>
    <div class="field">
      <label for="f-nongoals">Non-Goals</label>
      <vscode-textarea id="f-nongoals" rows="1" placeholder="One per line — what this will NOT do"></vscode-textarea>
    </div>
    <div class="field">
      <label for="f-constraints">Constraints</label>
      <vscode-textarea id="f-constraints" rows="1" placeholder="One per line, e.g.&#10;Must use Coherence components&#10;Desktop viewport only"></vscode-textarea>
    </div>
    <div class="field figma-field">
      <label for="f-figma-url">🎨 Figma Design <span style="font-weight:400;text-transform:none;font-size:11px;color:var(--muted)">(optional)</span></label>
      <vscode-textfield id="f-figma-url" placeholder="https://www.figma.com/design/..."></vscode-textfield>
    </div>
    <div class="field figma-field">
      <label for="f-figma-mode">Figma Mode</label>
      <vscode-single-select id="f-figma-mode">
        <vscode-option value="import">Import — reproduce pixel-perfect</vscode-option>
        <vscode-option value="reference">Reference — analyze & improve</vscode-option>
      </vscode-single-select>
      <div class="helper">Import: faithfully recreate the Figma design. Reference: use it as a starting point and build something better.</div>
    </div>
    <div class="field figma-field">
      <label for="f-figma-context">Figma Design Spec <span style="font-weight:400;text-transform:none;font-size:11px;color:var(--muted)">(auto-extracted)</span></label>
      <vscode-textarea id="f-figma-context" rows="1" placeholder="Detailed design spec extracted from Figma (layout, components, spacing, colors, typography)..."></vscode-textarea>
      <div class="helper">Auto-populated from your Figma file. Import mode uses this as a pixel-perfect blueprint; Reference mode uses it to identify areas for improvement.</div>
    </div>
    <div class="form-actions">
      <span id="auto-save-status" class="save-status"></span>

    </div>
  </form>
</div>
`;
}



// ── Auto-grow textareas ──

function autoResizeTextarea(el: Element): void {
  const inner = el.shadowRoot?.querySelector('textarea');
  if (!inner) return;
  inner.style.overflowY = 'hidden';
  inner.style.height = 'auto';
  const lineHeight = parseFloat(getComputedStyle(inner).lineHeight) || 20;
  const maxHeight = lineHeight * 6 + 16; // ~6 lines + padding
  if (inner.scrollHeight > maxHeight) {
    inner.style.height = maxHeight + 'px';
    inner.style.overflowY = 'auto';
  } else {
    inner.style.height = inner.scrollHeight + 'px';
  }
}

function initAutoGrowTextareas(): void {
  formEl.querySelectorAll('vscode-textarea').forEach((ta) => {
    autoResizeTextarea(ta);
  });
}

// Wire auto-save on all form fields
formEl.addEventListener("input", (e) => {
  const target = e.target as Element;
  if (target?.tagName?.toLowerCase() === 'vscode-textarea') {
    autoResizeTextarea(target);
  }
  scheduleAutoSave();
});
formEl.addEventListener("change", scheduleAutoSave);
// Prevent default submit (Enter key in text fields)
formEl.addEventListener("submit", (e) => { e.preventDefault(); scheduleAutoSave(); });
