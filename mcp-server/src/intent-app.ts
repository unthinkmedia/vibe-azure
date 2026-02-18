/**
 * Design Intent MCP App — Client-side UI
 *
 * Renders an interactive form for capturing design intent before prototyping.
 * Each intent lives as intent.json inside its experiment folder.
 * Communicates with the MCP server via callServerTool for CRUD operations.
 */

import { App } from "@modelcontextprotocol/ext-apps";

// ── Types ──

interface DesignIntent {
  experimentId: string;
  title: string;
  vision: string;
  problem: string;
  successCriteria: string[];
  nonGoals: string[];
  constraints: string[];
  createdAt: string;
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
const newBtn = document.getElementById("new-btn")!;
const cancelBtn = document.getElementById("cancel-btn")!;
const formSection = document.getElementById("form-section")!;
const listSection = document.getElementById("list-section")!;
const countEl = document.getElementById("intent-count")!;

// ── Event wiring ──

newBtn.addEventListener("click", () => showForm(null));
cancelBtn.addEventListener("click", () => hideForm());
formEl.addEventListener("submit", handleSubmit);

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
  await app.callServerTool({
    name: "intent_save_data",
    arguments: intent,
  });
  await fetchIntents();
  hideForm();
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
          ${intent.status === "draft" ? `<button class="sm-btn activate-btn" data-id="${intent.experimentId}">Activate</button>` : ""}
          ${intent.status === "active" ? `<button class="sm-btn complete-btn" data-id="${intent.experimentId}">Complete</button>` : ""}
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

  const experimentSelect = formEl.querySelector("#f-experiment") as HTMLSelectElement;
  const experimentInput = formEl.querySelector("#f-experiment-new") as HTMLInputElement;

  // Populate experiment dropdown with folders that don't have intents yet (+ current if editing)
  const takenExperiments = new Set(allIntents.map((i) => i.experimentId));
  const availableExperiments = allExperiments.filter(
    (e) => !takenExperiments.has(e) || e === editingExperimentId
  );

  experimentSelect.innerHTML =
    '<option value="">— Select existing experiment —</option>' +
    availableExperiments
      .map(
        (e) =>
          `<option value="${esc(e)}"${e === editingExperimentId ? " selected" : ""}>${esc(e)}</option>`
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

  (formEl.querySelector("#f-title") as HTMLInputElement).value =
    intent?.title ?? "";
  (formEl.querySelector("#f-vision") as HTMLTextAreaElement).value =
    intent?.vision ?? "";
  (formEl.querySelector("#f-problem") as HTMLTextAreaElement).value =
    intent?.problem ?? "";
  (formEl.querySelector("#f-criteria") as HTMLTextAreaElement).value =
    (intent?.successCriteria ?? []).join("\n");
  (formEl.querySelector("#f-nongoals") as HTMLTextAreaElement).value =
    (intent?.nonGoals ?? []).join("\n");
  (formEl.querySelector("#f-constraints") as HTMLTextAreaElement).value =
    (intent?.constraints ?? []).join("\n");

  formSection.style.display = "block";
  listSection.style.display = "none";
}

/** Open the form pre-populated with data extracted from the conversation */
function showFormWithPrefill(prefill: PrefillData): void {
  editingExperimentId = null;
  formTitle.textContent = "New Design Intent";

  const experimentSelect = formEl.querySelector("#f-experiment") as HTMLSelectElement;
  const experimentInput = formEl.querySelector("#f-experiment-new") as HTMLInputElement;

  // Populate experiment dropdown
  const takenExperiments = new Set(allIntents.map((i) => i.experimentId));
  const availableExperiments = allExperiments.filter(
    (e) => !takenExperiments.has(e)
  );

  experimentSelect.innerHTML =
    '<option value="">— Select existing experiment —</option>' +
    availableExperiments
      .map((e) => `<option value="${esc(e)}">${esc(e)}</option>`)
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
  (formEl.querySelector("#f-title") as HTMLInputElement).value =
    prefill.title ?? "";
  (formEl.querySelector("#f-vision") as HTMLTextAreaElement).value =
    prefill.vision ?? "";
  (formEl.querySelector("#f-problem") as HTMLTextAreaElement).value =
    prefill.problem ?? "";
  (formEl.querySelector("#f-criteria") as HTMLTextAreaElement).value =
    (prefill.successCriteria ?? []).join("\n");
  (formEl.querySelector("#f-nongoals") as HTMLTextAreaElement).value =
    (prefill.nonGoals ?? []).join("\n");
  (formEl.querySelector("#f-constraints") as HTMLTextAreaElement).value =
    (prefill.constraints ?? []).join("\n");

  formSection.style.display = "block";
  listSection.style.display = "none";
}

function hideForm(): void {
  editingExperimentId = null;
  formSection.style.display = "none";
  listSection.style.display = "block";
}

async function handleSubmit(e: Event): Promise<void> {
  e.preventDefault();
  const experimentSelect = formEl.querySelector("#f-experiment") as HTMLSelectElement;
  const experimentInput = formEl.querySelector("#f-experiment-new") as HTMLInputElement;

  // Prefer the new-name input; fall back to dropdown selection; fall back to editing ID
  const experimentId =
    experimentInput.value.trim() ||
    experimentSelect.value ||
    editingExperimentId;

  if (!experimentId) {
    alert("Please select an existing experiment or enter a new folder name.");
    return;
  }

  const data: Record<string, unknown> = {
    experimentId,
    title: (formEl.querySelector("#f-title") as HTMLInputElement).value.trim(),
    vision: (
      formEl.querySelector("#f-vision") as HTMLTextAreaElement
    ).value.trim(),
    problem: (
      formEl.querySelector("#f-problem") as HTMLTextAreaElement
    ).value.trim(),
    successCriteria: splitLines(
      (formEl.querySelector("#f-criteria") as HTMLTextAreaElement).value
    ),
    nonGoals: splitLines(
      (formEl.querySelector("#f-nongoals") as HTMLTextAreaElement).value
    ),
    constraints: splitLines(
      (formEl.querySelector("#f-constraints") as HTMLTextAreaElement).value
    ),
  };
  await saveIntent(data);
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
    --bg: #fff; --fg: #1a1a1a; --muted: #666; --border: #e0e0e0;
    --card-bg: #f8f8f8; --accent: #0078d4; --accent-hover: #106ebe;
    --danger: #d13438; --success: #107c10; --warning: #ca5010;
    --input-bg: #fff; --input-border: #ccc;
    --radius: 8px; --radius-sm: 6px;
  }
  [data-theme="dark"] {
    --bg: #1e1e1e; --fg: #e0e0e0; --muted: #999; --border: #333;
    --card-bg: #252525; --accent: #4da6ff; --accent-hover: #6db8ff;
    --danger: #f47067; --success: #3fb950; --warning: #d29922;
    --input-bg: #2d2d2d; --input-border: #444;
  }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    font-family: var(--font-sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif);
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
  .btn {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 7px 14px; border: none; border-radius: var(--radius-sm);
    font-size: 13px; font-weight: 500; cursor: pointer; transition: background 0.15s;
  }
  .btn-primary { background: var(--accent); color: #fff; }
  .btn-primary:hover { background: var(--accent-hover); }
  .btn-secondary {
    background: transparent; color: var(--fg); border: 1px solid var(--border);
  }
  .btn-secondary:hover { background: var(--card-bg); }
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
  .field input, .field textarea, .field select {
    width: 100%; padding: 8px 10px; border: 1px solid var(--input-border);
    border-radius: var(--radius-sm); font-size: 13px;
    background: var(--input-bg); color: var(--fg); font-family: inherit;
    resize: vertical;
  }
  .field input:focus, .field textarea:focus, .field select:focus {
    outline: none; border-color: var(--accent);
    box-shadow: 0 0 0 2px color-mix(in srgb, var(--accent) 25%, transparent);
  }
  .field .helper { font-size: 11px; color: var(--muted); margin-top: 3px; }
  .field-or {
    text-align: center; font-size: 11px; color: var(--muted);
    margin: 6px 0; text-transform: uppercase; letter-spacing: 0.5px;
  }
  .form-actions { display: flex; gap: 8px; margin-top: 18px; }
</style>

<div class="app-header">
  <div>
    <h1>Design Intent</h1>
    <span class="intent-count" id="intent-count">0 intents</span>
  </div>
  <button class="btn btn-primary" id="new-btn">+ New Intent</button>
</div>

<div id="list-section">
  <div id="intent-list"></div>
</div>

<div id="form-section">
  <div class="form-header">
    <h2 id="form-title">New Design Intent</h2>
    <button class="btn btn-secondary" id="cancel-btn">Cancel</button>
  </div>
  <form id="intent-form" autocomplete="off">
    <div class="field">
      <label for="f-experiment">Experiment Folder</label>
      <select id="f-experiment"></select>
      <div class="field-or">or create new</div>
      <input id="f-experiment-new" type="text" placeholder="e.g. my-new-experiment" />
      <div class="helper">The intent will be saved as intent.json inside this experiment folder.</div>
    </div>
    <div class="field">
      <label for="f-title">Title</label>
      <input id="f-title" type="text" placeholder="e.g. Azure Functions Overview Redesign" required />
    </div>
    <div class="field">
      <label for="f-vision">Vision</label>
      <textarea id="f-vision" rows="2" placeholder="What are you building? (1-2 sentences)" required></textarea>
      <div class="helper">Describe the outcome, not the implementation.</div>
    </div>
    <div class="field">
      <label for="f-problem">Problem Statement</label>
      <textarea id="f-problem" rows="2" placeholder="What problem does this solve? Who benefits?"></textarea>
    </div>
    <div class="field">
      <label for="f-criteria">Success Criteria</label>
      <textarea id="f-criteria" rows="3" placeholder="One per line, e.g.&#10;Shows resource health at a glance&#10;Supports both list and card views"></textarea>
      <div class="helper">One criterion per line. How will you know it's right?</div>
    </div>
    <div class="field">
      <label for="f-nongoals">Non-Goals</label>
      <textarea id="f-nongoals" rows="2" placeholder="One per line — what this will NOT do"></textarea>
    </div>
    <div class="field">
      <label for="f-constraints">Constraints</label>
      <textarea id="f-constraints" rows="2" placeholder="One per line, e.g.&#10;Must use Coherence components&#10;Desktop viewport only"></textarea>
    </div>
    <div class="form-actions">
      <button type="submit" class="btn btn-primary">Save Intent</button>
      <button type="button" class="btn btn-secondary" id="cancel-btn-form">Cancel</button>
    </div>
  </form>
</div>
`;
}

// Wire the second cancel button inside the form
document.getElementById("cancel-btn-form")?.addEventListener("click", hideForm);
