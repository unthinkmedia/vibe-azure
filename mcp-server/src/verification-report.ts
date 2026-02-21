import { App } from "@modelcontextprotocol/ext-apps";
import "@vscode-elements/elements/dist/bundled.js";

type Band =
  | "ready-to-share"
  | "strong-needs-minor-refinement"
  | "functional-important-gaps"
  | "significant-rework-needed";

interface VerificationCriterion {
  id: string;
  criterion: string;
  score: number;
  evidence: string;
  gap: string;
  actionableFeedback: string;
}

interface VerificationSummary {
  totalCriteria: number;
  fullyMet: number;
  mostlyMet: number;
  partiallyMet: number;
  mostlyMissing: number;
  notImplemented: number;
  notVerifiable: number;
}

interface VerificationSnapshot {
  experimentId: string;
  intentUpdatedAt: string | null;
  verifiedAt: string;
  overallScore: number;
  effectivenessPercent: number;
  band: Band;
  criteria: VerificationCriterion[];
  summary: VerificationSummary;
}

interface VerificationRow {
  experimentId: string;
  runs: number;
  latestVerifiedAt: string | null;
  effectivenessPercent: number | null;
  overallScore: number | null;
}

interface DeltaData {
  hasPrevious: boolean;
  overallDeltaPercent: number;
  improved: Array<{ id: string; delta: number }>;
  regressed: Array<{ id: string; delta: number }>;
  unchanged: number;
  newCriteria: string[];
  removedCriteria: string[];
}

interface VerificationToolData {
  reports: VerificationRow[];
  selectedExperimentId: string | null;
  latest: VerificationSnapshot | null;
  history: VerificationSnapshot[];
  delta: DeltaData;
}

function toVerificationToolData(value: unknown): VerificationToolData {
  const data = (value ?? {}) as Partial<VerificationToolData>;
  return {
    reports: Array.isArray(data.reports) ? data.reports : [],
    selectedExperimentId:
      typeof data.selectedExperimentId === "string" || data.selectedExperimentId === null
        ? data.selectedExperimentId
        : null,
    latest: (data.latest as VerificationSnapshot | null | undefined) ?? null,
    history: Array.isArray(data.history) ? data.history : [],
    delta:
      (data.delta as DeltaData | undefined) ?? {
        hasPrevious: false,
        overallDeltaPercent: 0,
        improved: [],
        regressed: [],
        unchanged: 0,
        newCriteria: [],
        removedCriteria: [],
      },
  };
}

const app = new App({ name: "Verification Report", version: "1.0.0" });

const root = document.getElementById("app");
if (!root) throw new Error("Missing app root");
root.innerHTML = shellHtml();

const experimentSelect = document.getElementById("experiment-select") as any;
const refreshBtn = document.getElementById("refresh-btn") as HTMLButtonElement;
const statusEl = document.getElementById("status") as HTMLDivElement;
const summaryCardsEl = document.getElementById("summary-cards") as HTMLDivElement;
const deltaEl = document.getElementById("delta") as HTMLDivElement;
const criteriaTableEl = document.getElementById("criteria-table") as HTMLDivElement;
const trendTableEl = document.getElementById("trend-table") as HTMLDivElement;

let reports: VerificationRow[] = [];
let selectedExperimentId: string | null = null;
let lastFingerprint = "";

function esc(value: string): string {
  const div = document.createElement("div");
  div.textContent = value;
  return div.innerHTML;
}

function fmtDate(value: string | null): string {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")} ${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
}

function bandLabel(band: Band): string {
  switch (band) {
    case "ready-to-share":
      return "Ready to share";
    case "strong-needs-minor-refinement":
      return "Strong, minor refinement";
    case "functional-important-gaps":
      return "Functional, important gaps";
    case "significant-rework-needed":
      return "Significant rework needed";
    default:
      return band;
  }
}

function scoreClass(score: number): string {
  if (score >= 4) return "score-good";
  if (score >= 3) return "score-mid";
  return "score-bad";
}

function renderExperimentOptions(): void {
  const previous = selectedExperimentId;
  experimentSelect.innerHTML = "";

  if (reports.length === 0) {
    const option = document.createElement("vscode-option") as any;
    option.value = "";
    option.textContent = "No verification reports found";
    experimentSelect.appendChild(option);
    experimentSelect.disabled = true;
    selectedExperimentId = null;
    return;
  }

  experimentSelect.disabled = false;
  for (const report of reports) {
    const option = document.createElement("vscode-option") as any;
    option.value = report.experimentId;
    option.textContent = `${report.experimentId} (${report.effectivenessPercent?.toFixed(1) ?? "-"}%)`;
    experimentSelect.appendChild(option);
  }

  // Hide the dropdown when only one experiment is shown
  const toolbar = document.querySelector(".toolbar") as HTMLElement | null;
  if (toolbar) {
    toolbar.style.display = reports.length <= 1 ? "none" : "flex";
  }

  if (previous && reports.some((r) => r.experimentId === previous)) {
    selectedExperimentId = previous;
  } else {
    selectedExperimentId = reports[0]?.experimentId ?? null;
  }

  if (selectedExperimentId) {
    experimentSelect.value = selectedExperimentId;
  }
}

function renderEmptyState(message: string): void {
  statusEl.textContent = message;
  summaryCardsEl.innerHTML = "";
  deltaEl.innerHTML = "";
  criteriaTableEl.innerHTML = "";
  trendTableEl.innerHTML = "";
}

function renderData(data: VerificationToolData): void {
  const latest = data.latest;
  const history = data.history;

  // Update the title to include experiment name when scoped to one
  const headerTitle = document.querySelector(".header h1") as HTMLElement | null;
  if (headerTitle && data.selectedExperimentId && data.reports.length <= 1) {
    headerTitle.textContent = `Verification: ${data.selectedExperimentId}`;
  } else if (headerTitle) {
    headerTitle.textContent = "Success Criteria Verification Report";
  }

  if (!latest) {
    renderEmptyState("No verification snapshot is available for this experiment yet.");
    return;
  }

  statusEl.textContent = `Last verified: ${fmtDate(latest.verifiedAt)} | Intent updated: ${fmtDate(latest.intentUpdatedAt)}`;

  summaryCardsEl.innerHTML = `
    <div class="card">
      <div class="label">Effectiveness</div>
      <div class="value">${latest.effectivenessPercent.toFixed(1)}%</div>
    </div>
    <div class="card">
      <div class="label">Overall Score</div>
      <div class="value">${latest.overallScore.toFixed(2)} / 5</div>
    </div>
    <div class="card">
      <div class="label">Band</div>
      <div class="value small">${esc(bandLabel(latest.band))}</div>
    </div>
    <div class="card">
      <div class="label">Runs</div>
      <div class="value">${history.length}</div>
    </div>
  `;

  if (data.delta.hasPrevious) {
    const improved = data.delta.improved.length
      ? data.delta.improved.map((x) => `${x.id} (+${x.delta})`).join(", ")
      : "none";
    const regressed = data.delta.regressed.length
      ? data.delta.regressed.map((x) => `${x.id} (${x.delta})`).join(", ")
      : "none";

    deltaEl.innerHTML = `
      <h3>Improvement Since Last Verification</h3>
      <ul>
        <li>Overall effectiveness delta: <strong>${data.delta.overallDeltaPercent >= 0 ? "+" : ""}${data.delta.overallDeltaPercent.toFixed(1)} points</strong></li>
        <li>Improved criteria: ${esc(improved)}</li>
        <li>Regressed criteria: ${esc(regressed)}</li>
        <li>New criteria: ${data.delta.newCriteria.length ? esc(data.delta.newCriteria.join(", ")) : "none"}</li>
        <li>Removed criteria: ${data.delta.removedCriteria.length ? esc(data.delta.removedCriteria.join(", ")) : "none"}</li>
      </ul>
    `;
  } else {
    deltaEl.innerHTML = "<h3>Improvement Since Last Verification</h3><p>This is the first recorded effectiveness snapshot for this experiment.</p>";
  }

  criteriaTableEl.innerHTML = `
    <h3>Success Criteria Scorecard</h3>
    <table>
      <thead>
        <tr>
          <th>Criterion</th>
          <th>Score</th>
          <th>Evidence</th>
          <th>Gap</th>
          <th>Actionable Feedback</th>
        </tr>
      </thead>
      <tbody>
        ${latest.criteria
          .map(
            (criterion) => `
          <tr>
            <td><div class="criterion-title">${esc(criterion.criterion)}</div><div class="criterion-id">${esc(criterion.id)}</div></td>
            <td><span class="score-pill ${scoreClass(criterion.score)}">${criterion.score}</span></td>
            <td>${esc(criterion.evidence)}</td>
            <td>${esc(criterion.gap)}</td>
            <td>${esc(criterion.actionableFeedback)}</td>
          </tr>
        `
          )
          .join("")}
      </tbody>
    </table>
  `;

  const rows = history
    .slice()
    .reverse()
    .slice(0, 12)
    .map((snapshot, index, arr) => {
      const previous = arr[index + 1];
      const delta = previous
        ? snapshot.effectivenessPercent - previous.effectivenessPercent
        : null;
      const deltaText =
        delta === null
          ? "-"
          : `${delta >= 0 ? "+" : ""}${delta.toFixed(1)}`;
      return `
        <tr>
          <td>${fmtDate(snapshot.verifiedAt)}</td>
          <td>${snapshot.effectivenessPercent.toFixed(1)}%</td>
          <td>${snapshot.overallScore.toFixed(2)} / 5</td>
          <td>${esc(bandLabel(snapshot.band))}</td>
          <td>${deltaText}</td>
        </tr>
      `;
    })
    .join("");

  trendTableEl.innerHTML = `
    <h3>Recent Trend</h3>
    <table>
      <thead>
        <tr>
          <th>Verified At</th>
          <th>Effectiveness</th>
          <th>Overall Score</th>
          <th>Band</th>
          <th>Delta</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>
  `;
}

async function loadData(experimentId?: string): Promise<void> {
  try {
    const result = await app.callServerTool({
      name: "verification_report_get_data",
      arguments: experimentId ? { experimentId } : {},
    });
    const data = toVerificationToolData(result.structuredContent as unknown);
    reports = data.reports ?? [];
    if (data.selectedExperimentId) {
      selectedExperimentId = data.selectedExperimentId;
    }
    renderExperimentOptions();
    renderData(data);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to load verification report data.";
    renderEmptyState(message);
  }
}

experimentSelect.addEventListener("change", async () => {
  const next = experimentSelect.value;
  selectedExperimentId = next || null;
  await loadData(selectedExperimentId ?? undefined);
});
experimentSelect.addEventListener("vsc-change", async () => {
  const next = experimentSelect.value;
  selectedExperimentId = next || null;
  await loadData(selectedExperimentId ?? undefined);
});

refreshBtn.addEventListener("click", async () => {
  await loadData(selectedExperimentId ?? undefined);
});

app.ontoolresult = (result) => {
  const fingerprint = JSON.stringify(result.structuredContent);
  if (fingerprint === lastFingerprint) return;
  lastFingerprint = fingerprint;
  const data = toVerificationToolData(result.structuredContent as unknown);
  reports = data.reports ?? [];
  selectedExperimentId = data.selectedExperimentId;
  renderExperimentOptions();
  renderData(data);
};

app.onhostcontextchanged = (ctx) => {
  if (ctx.theme) {
    document.documentElement.setAttribute("data-theme", ctx.theme);
  }
};

app.connect().then(async () => {
  const ctx = app.getHostContext();
  if (ctx?.theme) {
    document.documentElement.setAttribute("data-theme", ctx.theme);
  }
  await loadData();
});

function shellHtml(): string {
  return `
<style>
  :root {
    --bg: var(--vscode-editor-background, #ffffff);
    --fg: var(--vscode-editor-foreground, #1f2933);
    --muted: var(--vscode-descriptionForeground, #5f6b7a);
    --border: var(--vscode-panel-border, #d7dce3);
    --card-bg: var(--vscode-editorWidget-background, #f7f9fc);
    --accent: var(--vscode-button-background, #0a66c2);
    --good: var(--vscode-testing-iconPassed, #0f7b0f);
    --mid: var(--vscode-editorWarning-foreground, #995700);
    --bad: var(--vscode-editorError-foreground, #b42318);
  }

  * { box-sizing: border-box; }

  body {
    margin: 0;
    font-family: var(--vscode-font-family, "Segoe UI", "Helvetica Neue", sans-serif);
    font-size: var(--vscode-font-size, 13px);
    background: var(--bg);
    color: var(--fg);
  }

  #app {
    padding: 16px;
    max-width: 1280px;
    margin: 0 auto;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
    margin-bottom: 12px;
  }

  .header h1 {
    margin: 0;
    font-size: 20px;
  }

  .toolbar {
    display: flex;
    gap: 8px;
    align-items: center;
  }

  .status {
    margin: 8px 0 12px;
    color: var(--muted);
    font-size: 13px;
  }

  .summary-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 10px;
    margin-bottom: 12px;
  }

  .card {
    background: var(--card-bg);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 10px;
  }

  .label {
    font-size: 11px;
    color: var(--muted);
    text-transform: uppercase;
    letter-spacing: 0.3px;
  }

  .value {
    font-size: 22px;
    font-weight: 700;
    margin-top: 4px;
  }

  .value.small {
    font-size: 15px;
    font-weight: 600;
  }

  .panel {
    background: var(--card-bg);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 12px;
    margin-bottom: 12px;
  }

  .panel h3 {
    margin: 0 0 8px;
    font-size: 14px;
  }

  .panel ul {
    margin: 0;
    padding-left: 20px;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 12px;
  }

  th, td {
    border-bottom: 1px solid var(--border);
    vertical-align: top;
    text-align: left;
    padding: 8px 6px;
  }

  th {
    font-size: 11px;
    color: var(--muted);
    text-transform: uppercase;
    letter-spacing: 0.3px;
  }

  .criterion-title {
    font-weight: 600;
    margin-bottom: 4px;
  }

  .criterion-id {
    font-size: 11px;
    color: var(--muted);
    font-family: var(--vscode-editor-font-family, ui-monospace, SFMono-Regular, Menlo, Consolas, monospace);
  }

  .score-pill {
    display: inline-flex;
    min-width: 26px;
    justify-content: center;
    border-radius: 999px;
    padding: 2px 8px;
    font-weight: 700;
    color: #fff;
  }

  .score-good { background: var(--good); }
  .score-mid { background: var(--mid); }
  .score-bad { background: var(--bad); }

  @media (max-width: 900px) {
    .header {
      flex-direction: column;
      align-items: stretch;
    }

    .toolbar {
      flex-wrap: wrap;
    }

    vscode-single-select {
      flex: 1;
      min-width: 220px;
    }
  }
</style>

<div class="header">
  <h1>Success Criteria Verification Report</h1>
  <div class="toolbar">
    <vscode-single-select id="experiment-select"></vscode-single-select>
    <vscode-button id="refresh-btn">Refresh</vscode-button>
  </div>
</div>

<div id="status" class="status"></div>

<div id="summary-cards" class="summary-grid"></div>
<div id="delta" class="panel"></div>
<div id="criteria-table" class="panel"></div>
<div id="trend-table" class="panel"></div>
`;
}
