import fs from "node:fs/promises";
import path from "node:path";

const REPO_ROOT = path.resolve(import.meta.dirname, "../..");
const EXPERIMENTS_DIR = path.join(REPO_ROOT, "coherence-preview", "src", "experiments");

export interface VerificationCriterion {
  id: string;
  criterion: string;
  score: number;
  evidence: string;
  gap: string;
  actionableFeedback: string;
}

export interface VerificationSummary {
  totalCriteria: number;
  fullyMet: number;
  mostlyMet: number;
  partiallyMet: number;
  mostlyMissing: number;
  notImplemented: number;
  notVerifiable: number;
}

export interface VerificationSnapshot {
  experimentId: string;
  intentUpdatedAt: string | null;
  verifiedAt: string;
  overallScore: number;
  effectivenessPercent: number;
  band:
    | "ready-to-share"
    | "strong-needs-minor-refinement"
    | "functional-important-gaps"
    | "significant-rework-needed";
  criteria: VerificationCriterion[];
  summary: VerificationSummary;
}

export interface VerificationReportBundle {
  experimentId: string;
  latest: VerificationSnapshot | null;
  history: VerificationSnapshot[];
}

function sanitizeId(id: string): string {
  return id.replace(/[^a-zA-Z0-9_-]/g, "");
}

function verificationDir(experimentId: string): string {
  return path.join(EXPERIMENTS_DIR, sanitizeId(experimentId), "verification");
}

function latestPath(experimentId: string): string {
  return path.join(verificationDir(experimentId), "success-criteria-latest.json");
}

function historyPath(experimentId: string): string {
  return path.join(verificationDir(experimentId), "success-criteria-history.json");
}

async function readJson<T>(filePath: string): Promise<T | null> {
  try {
    const raw = await fs.readFile(filePath, "utf-8");
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export async function listExperimentFolders(): Promise<string[]> {
  try {
    const entries = await fs.readdir(EXPERIMENTS_DIR, { withFileTypes: true });
    return entries.filter((e) => e.isDirectory()).map((e) => e.name).sort();
  } catch {
    return [];
  }
}

export async function getVerificationReport(
  experimentId: string
): Promise<VerificationReportBundle> {
  const latest = await readJson<VerificationSnapshot>(latestPath(experimentId));
  const history =
    (await readJson<VerificationSnapshot[]>(historyPath(experimentId))) ??
    (latest ? [latest] : []);

  return {
    experimentId: sanitizeId(experimentId),
    latest,
    history,
  };
}

export async function listVerificationExperiments(): Promise<
  Array<{
    experimentId: string;
    runs: number;
    latestVerifiedAt: string | null;
    effectivenessPercent: number | null;
    overallScore: number | null;
  }>
> {
  const folders = await listExperimentFolders();
  const rows: Array<{
    experimentId: string;
    runs: number;
    latestVerifiedAt: string | null;
    effectivenessPercent: number | null;
    overallScore: number | null;
  }> = [];

  for (const experimentId of folders) {
    const latest = await readJson<VerificationSnapshot>(latestPath(experimentId));
    if (!latest) continue;
    const history =
      (await readJson<VerificationSnapshot[]>(historyPath(experimentId))) ?? [latest];

    rows.push({
      experimentId,
      runs: history.length,
      latestVerifiedAt: latest.verifiedAt ?? null,
      effectivenessPercent:
        typeof latest.effectivenessPercent === "number"
          ? latest.effectivenessPercent
          : null,
      overallScore:
        typeof latest.overallScore === "number" ? latest.overallScore : null,
    });
  }

  rows.sort((a, b) => {
    const at = a.latestVerifiedAt ? new Date(a.latestVerifiedAt).getTime() : 0;
    const bt = b.latestVerifiedAt ? new Date(b.latestVerifiedAt).getTime() : 0;
    return bt - at;
  });

  return rows;
}
