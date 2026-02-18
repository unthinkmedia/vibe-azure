/**
 * Design Intent Store
 *
 * Persists lightweight "intent documents" inspired by the Specflow methodology.
 * Each intent captures the What / Why / Success Criteria / Non-Goals for a
 * prototype *before* building begins.
 *
 * Storage: coherence-preview/src/experiments/<experimentId>/intent.json
 */

import fs from "node:fs/promises";
import path from "node:path";

// Go up two levels: src/ → mcp-server/ → workspace-root/
const REPO_ROOT = path.resolve(import.meta.dirname, "../..");
const EXPERIMENTS_DIR = path.join(
  REPO_ROOT,
  "coherence-preview",
  "src",
  "experiments"
);

// ── Types ──

export interface DesignIntent {
  /** The experiment folder name — serves as the primary key */
  experimentId: string;
  title: string;
  vision: string;
  problem: string;
  successCriteria: string[];
  nonGoals: string[];
  constraints: string[];
  /** ISO date string */
  createdAt: string;
  /** ISO date string */
  updatedAt: string;
  status: "draft" | "active" | "completed" | "abandoned";
}

export type CreateIntentInput = Pick<
  DesignIntent,
  "experimentId" | "vision"
> &
  Partial<
    Pick<DesignIntent, "title" | "problem" | "successCriteria" | "nonGoals" | "constraints">
  >;

export type UpdateIntentInput = Partial<
  Omit<DesignIntent, "experimentId" | "createdAt" | "updatedAt">
>;

// ── Helpers ──

function sanitizeId(id: string): string {
  return id.replace(/[^a-zA-Z0-9_-]/g, "");
}

function intentPath(experimentId: string): string {
  const safe = sanitizeId(experimentId);
  return path.join(EXPERIMENTS_DIR, safe, "intent.json");
}

/** Generate a human-readable title from an experiment folder name */
function titleFromId(id: string): string {
  return id
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

/** List experiment folder names that exist on disk */
export async function listExperimentFolders(): Promise<string[]> {
  try {
    const entries = await fs.readdir(EXPERIMENTS_DIR, { withFileTypes: true });
    return entries.filter((e) => e.isDirectory()).map((e) => e.name).sort();
  } catch {
    return [];
  }
}

// ── CRUD ──

export async function createIntent(
  input: CreateIntentInput
): Promise<DesignIntent> {
  const safe = sanitizeId(input.experimentId);
  // Ensure experiment folder exists
  await fs.mkdir(path.join(EXPERIMENTS_DIR, safe), { recursive: true });
  const now = new Date().toISOString();
  const intent: DesignIntent = {
    experimentId: safe,
    title: input.title || titleFromId(safe),
    vision: input.vision,
    problem: input.problem ?? "",
    successCriteria: input.successCriteria ?? [],
    nonGoals: input.nonGoals ?? [],
    constraints: input.constraints ?? [],
    createdAt: now,
    updatedAt: now,
    status: "draft",
  };
  await fs.writeFile(intentPath(safe), JSON.stringify(intent, null, 2));
  return intent;
}

export async function getIntent(
  experimentId: string
): Promise<DesignIntent | null> {
  try {
    const raw = await fs.readFile(intentPath(experimentId), "utf-8");
    return JSON.parse(raw) as DesignIntent;
  } catch {
    return null;
  }
}

export async function listIntents(): Promise<DesignIntent[]> {
  const folders = await listExperimentFolders();
  const intents: DesignIntent[] = [];
  for (const folder of folders) {
    try {
      const raw = await fs.readFile(
        path.join(EXPERIMENTS_DIR, folder, "intent.json"),
        "utf-8"
      );
      intents.push(JSON.parse(raw) as DesignIntent);
    } catch {
      // No intent.json in this experiment — skip
    }
  }
  return intents.sort(
    (a, b) =>
      new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );
}

export async function updateIntent(
  experimentId: string,
  updates: UpdateIntentInput
): Promise<DesignIntent | null> {
  const existing = await getIntent(experimentId);
  if (!existing) return null;
  const updated: DesignIntent = {
    ...existing,
    ...updates,
    experimentId: existing.experimentId,
    createdAt: existing.createdAt,
    updatedAt: new Date().toISOString(),
  };
  await fs.writeFile(
    intentPath(experimentId),
    JSON.stringify(updated, null, 2)
  );
  return updated;
}

export async function deleteIntent(experimentId: string): Promise<boolean> {
  try {
    await fs.unlink(intentPath(experimentId));
    return true;
  } catch {
    return false;
  }
}

// ── Formatting ──

export function formatIntent(intent: DesignIntent): string {
  let md = `# Design Intent: ${intent.title}\n\n`;
  md += `**Status:** ${intent.status} | **Experiment:** ${intent.experimentId}`;
  md += `\n**Created:** ${intent.createdAt.slice(0, 10)} | **Updated:** ${intent.updatedAt.slice(0, 10)}\n\n`;

  md += `## Vision\n${intent.vision}\n\n`;
  md += `## Problem Statement\n${intent.problem}\n\n`;

  if (intent.successCriteria.length > 0) {
    md += `## Success Criteria\n`;
    for (const c of intent.successCriteria) md += `- [ ] ${c}\n`;
    md += "\n";
  }

  if (intent.nonGoals.length > 0) {
    md += `## Non-Goals\n`;
    for (const ng of intent.nonGoals) md += `- ${ng}\n`;
    md += "\n";
  }

  if (intent.constraints.length > 0) {
    md += `## Constraints\n`;
    for (const con of intent.constraints) md += `- ${con}\n`;
    md += "\n";
  }

  return md;
}

export function formatIntentSummary(intent: DesignIntent): string {
  return `| ${intent.experimentId} | ${intent.title} | ${intent.status} | ${intent.updatedAt.slice(0, 10)} |`;
}
