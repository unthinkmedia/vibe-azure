/**
 * Reads reference content from the skills directory.
 * This module provides access to component guidance, UX guides, scaffolds,
 * and icon references from the .github/skills/ directory in the repo.
 */

import fs from "node:fs/promises";
import path from "node:path";

// Resolve the skills directory relative to this file
const REPO_ROOT = path.resolve(import.meta.dirname, "..");
const SKILLS_DIR = path.join(REPO_ROOT, ".github", "skills");
const COHERENCE_UI_DIR = path.join(SKILLS_DIR, "coherence-ui");
const PROTOTYPER_DIR = path.join(SKILLS_DIR, "azure-portal-prototyper");
const MOCK_DATA_DIR = path.join(SKILLS_DIR, "azure-mock-data");

// ── Component Guidance ──

export async function getComponentGuidance(
  componentName: string
): Promise<string | null> {
  const slug = componentName
    .toLowerCase()
    .replace(/^cui-/, "")
    .replace(/^cui/, "");
  const filePath = path.join(
    COHERENCE_UI_DIR,
    "references",
    "components",
    `${slug}.md`
  );
  try {
    return await fs.readFile(filePath, "utf-8");
  } catch {
    return null;
  }
}

export async function listComponentGuidanceFiles(): Promise<string[]> {
  const dir = path.join(COHERENCE_UI_DIR, "references", "components");
  try {
    const files = await fs.readdir(dir);
    return files
      .filter((f) => f.endsWith(".md"))
      .map((f) => f.replace(".md", ""));
  } catch {
    return [];
  }
}

// ── UX Guides ──

const UX_GUIDES: Record<string, string> = {
  accessibility: "accessibility.md",
  "ai-basics": "ai-basics.md",
  "ai-entry-points": "ai-entry-points.md",
  "data-visualization": "data-visualization.md",
  illustration: "illustration.md",
  "writing-ui": "writing-ui.md",
};

export async function getUxGuide(guideName: string): Promise<string | null> {
  const filename = UX_GUIDES[guideName.toLowerCase()];
  if (!filename) return null;
  const filePath = path.join(COHERENCE_UI_DIR, "references", "guides", filename);
  try {
    return await fs.readFile(filePath, "utf-8");
  } catch {
    return null;
  }
}

export function listUxGuides(): string[] {
  return Object.keys(UX_GUIDES);
}

// ── Scaffolds ──

const SCAFFOLD_TYPES = [
  "azure-resource-page",
  "azure-list-page",
  "azure-overview-page",
  "azure-marketplace-browse",
] as const;

const FLOW_TYPES = [
  "azure-create-flow",
  "azure-multi-page-flow",
] as const;

export type ScaffoldType = (typeof SCAFFOLD_TYPES)[number];
export type FlowType = (typeof FLOW_TYPES)[number];

export function listScaffoldTypes(): string[] {
  return [...SCAFFOLD_TYPES, ...FLOW_TYPES];
}

export async function getScaffold(
  scaffoldType: string
): Promise<Record<string, string> | null> {
  let dir: string;
  if (SCAFFOLD_TYPES.includes(scaffoldType as ScaffoldType)) {
    dir = path.join(COHERENCE_UI_DIR, "assets", "scaffolds", scaffoldType);
  } else if (FLOW_TYPES.includes(scaffoldType as FlowType)) {
    dir = path.join(COHERENCE_UI_DIR, "assets", "flows", scaffoldType);
  } else {
    return null;
  }

  try {
    const files = await fs.readdir(dir);
    const result: Record<string, string> = {};
    for (const file of files) {
      if (file.endsWith(".ts") || file.endsWith(".tsx")) {
        result[file] = await fs.readFile(path.join(dir, file), "utf-8");
      }
    }
    return result;
  } catch {
    return null;
  }
}

// ── Icons ──

export async function getAzureIconsReference(): Promise<string | null> {
  const filePath = path.join(PROTOTYPER_DIR, "references", "azure-icons.md");
  try {
    return await fs.readFile(filePath, "utf-8");
  } catch {
    return null;
  }
}

// ── Page Types ──

export async function getPageTypesReference(): Promise<string | null> {
  const filePath = path.join(PROTOTYPER_DIR, "references", "page-types.md");
  try {
    return await fs.readFile(filePath, "utf-8");
  } catch {
    return null;
  }
}

// ── Mock Data References ──

export async function getMockDataReference(
  refName: string
): Promise<string | null> {
  const filePath = path.join(MOCK_DATA_DIR, "references", `${refName}.md`);
  try {
    return await fs.readFile(filePath, "utf-8");
  } catch {
    return null;
  }
}

export async function listMockDataReferences(): Promise<string[]> {
  const dir = path.join(MOCK_DATA_DIR, "references");
  try {
    const files = await fs.readdir(dir);
    return files
      .filter((f) => f.endsWith(".md"))
      .map((f) => f.replace(".md", ""));
  } catch {
    return [];
  }
}

// ── Templates ──

export async function getTemplateReference(
  templateName: string
): Promise<string | null> {
  const filePath = path.join(
    COHERENCE_UI_DIR,
    "references",
    "templates",
    `${templateName}.md`
  );
  try {
    return await fs.readFile(filePath, "utf-8");
  } catch {
    return null;
  }
}

export function listTemplates(): string[] {
  return ["dashboard", "form", "settings"];
}

// ── Task Flows ──

export async function getTaskFlowReference(
  flowName: string
): Promise<string | null> {
  const filePath = path.join(
    COHERENCE_UI_DIR,
    "references",
    "task-flows",
    `${flowName}.md`
  );
  try {
    return await fs.readFile(filePath, "utf-8");
  } catch {
    return null;
  }
}

export function listTaskFlows(): string[] {
  return [
    "bulk-edit",
    "create-an-item",
    "edit-an-item",
    "favorites",
    "inline-edit",
    "save-presets",
  ];
}

// ── Composition Patterns ──

export async function getPatternReference(
  patternName: string
): Promise<string | null> {
  const filePath = path.join(
    COHERENCE_UI_DIR,
    "references",
    "patterns",
    `${patternName}.md`
  );
  try {
    return await fs.readFile(filePath, "utf-8");
  } catch {
    return null;
  }
}

export function listPatterns(): string[] {
  return [
    "azure-portal-header",
    "azure-resource-page-shell",
    "resource-page-toolbar",
    "side-nav-with-iconify",
  ];
}
