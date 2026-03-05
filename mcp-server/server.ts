/**
 * Coherence Prototyper MCP Server
 *
 * MCP Apps only — interactive UIs that render inline in Claude Desktop/Claude.ai.
 * All reference tools (components, tokens, scaffolds, guides, etc.) are handled
 * by VS Code skills which are always prioritized.
 */

import {
  registerAppResource,
  registerAppTool,
  RESOURCE_MIME_TYPE,
} from "@modelcontextprotocol/ext-apps/server";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { existsSync } from "node:fs";
import fsp from "node:fs/promises";
import path from "node:path";

import {
  searchTokens,
  getTokensByCategory,
  getTokenCategories,
  getAllTokens,
} from "./src/theme-cache.js";
import {
  createIntent,
  getIntent,
  listIntents,
  listExperimentFolders,
  updateIntent,
  deleteIntent,
  formatIntent,
  formatIntentSummary,
  type CreateIntentInput,
} from "./src/intent-store.js";
import { getAllIcons, searchIcons } from "./src/icon-data.js";
import {
  getVerificationReport,
  listVerificationExperiments,
  type VerificationSnapshot,
  type VerificationCriterion,
} from "./src/verification-scorecard-store.js";

// When running from source (tsx server.ts), import.meta.dirname is mcp-server/
// and the built HTML files live in mcp-server/dist/.
// When running from the published npm package (dist/server.js),
// import.meta.dirname is already the dist/ folder where the HTML files live.
const DIST_DIR = existsSync(path.join(import.meta.dirname, "dist"))
  ? path.join(import.meta.dirname, "dist")
  : import.meta.dirname;

export function createServer(): McpServer {
  const server = new McpServer({
    name: "Coherence Prototyper",
    version: "1.0.0",
  });

  // ════════════════════════════════════════════════════════
  // MCP App: Design Intent — interactive intent capture UI
  // ════════════════════════════════════════════════════════

  const intentAppUri = "ui://coherence-prototyper/intent-app.html";

  // Model-facing tool: opens the Intent App UI
  registerAppTool(
    server,
    "design_intent",
    {
      title: "Design Intent",
      description:
        "Open the Design Intent app to capture What, Why, Success Criteria, and Non-Goals before prototyping. " +
        "THIS IS MANDATORY — intent.json is the primary instruction source for the entire build. " +
        "ALWAYS TRIGGER THIS TOOL when the user describes what they want to build — extract their prompt into the prefill fields " +
        "(vision, problem, success criteria, constraints) so the intent form opens pre-populated with best guesses. " +
        "The user's edits are AUTO-SAVED to intent.json in real-time — there are no Save/Accept buttons in the UI. " +
        "After this tool returns, wait a moment for the user to review/edit the form, then ASK the user in chat: " +
        "'Do you accept this intent?' — once they confirm, READ coherence-preview/src/experiments/<experimentId>/intent.json " +
        "and use the full intent as PRIMARY INSTRUCTION SOURCE for building. " +
        "If intent.json does not exist after calling this tool, DO NOT proceed with building — re-call this tool. " +
        "Also tell the user they can view/edit intents anytime via the Intent button in the preview header or by calling this tool again. " +
        "Also trigger when the user explicitly asks to open the intent form, manage intents, or says 'let me define the intent'.",
      inputSchema: {
        experimentId: z
          .string()
          .optional()
          .describe("Optional experiment folder name to view/edit a specific intent"),
        prefillTitle: z
          .string()
          .optional()
          .describe("Pre-fill the title field when the user has already described what they want to build"),
        prefillVision: z
          .string()
          .optional()
          .describe("Pre-fill the vision field extracted from what the user has already said about the experiment"),
        prefillProblem: z
          .string()
          .optional()
          .describe("Pre-fill the problem statement extracted from the user's description"),
        prefillSuccessCriteria: z
          .array(z.string())
          .optional()
          .describe("Pre-fill success criteria extracted from the user's description"),
        prefillNonGoals: z
          .array(z.string())
          .optional()
          .describe("Pre-fill non-goals extracted from the user's description"),
        prefillConstraints: z
          .array(z.string())
          .optional()
          .describe("Pre-fill constraints extracted from the user's description"),
        prefillFigmaUrl: z
          .string()
          .optional()
          .describe("Figma file URL to use as design starting point."),
        prefillFigmaMode: z
          .enum(["import", "reference"])
          .optional()
          .describe("'import' = reproduce the Figma pixel-perfect using Coherence. 'reference' = analyze the Figma design and build something better."),
        prefillFigmaContext: z
          .string()
          .optional()
          .describe("Detailed design spec extracted from the Figma file (exact layout, components, spacing, colors, typography, data content). This is the pixel-perfect blueprint the builder will follow."),
        prefillWebUrl: z
          .string()
          .optional()
          .describe("Web page URL captured via visual-ingest as a brownfield design starting point (e.g. portal.azure.com, azure.microsoft.com)."),
        prefillWebContext: z
          .string()
          .optional()
          .describe("Structured reference document from visual-ingest containing layout analysis, component inventory, content extraction, and visual properties mapped to Coherence components. JSON string."),
      },
      _meta: {
        ui: { resourceUri: intentAppUri },
      },
    },
    async ({ experimentId, prefillTitle, prefillVision, prefillProblem, prefillSuccessCriteria, prefillNonGoals, prefillConstraints, prefillFigmaUrl, prefillFigmaMode, prefillFigmaContext, prefillWebUrl, prefillWebContext }) => {
      const experiments = await listExperimentFolders();

      // Build prefill object if any prefill params were provided
      const hasPrefill = prefillTitle || prefillVision || prefillProblem ||
        (prefillSuccessCriteria && prefillSuccessCriteria.length > 0) ||
        (prefillNonGoals && prefillNonGoals.length > 0) ||
        (prefillConstraints && prefillConstraints.length > 0) ||
        prefillFigmaUrl || prefillFigmaContext ||
        prefillWebUrl || prefillWebContext;
      const prefill = hasPrefill ? {
        experimentId: experimentId ?? "",
        title: prefillTitle ?? "",
        vision: prefillVision ?? "",
        problem: prefillProblem ?? "",
        successCriteria: prefillSuccessCriteria ?? [],
        nonGoals: prefillNonGoals ?? [],
        constraints: prefillConstraints ?? [],
        figmaUrl: prefillFigmaUrl ?? "",
        figmaMode: prefillFigmaMode ?? "",
        figmaContext: prefillFigmaContext ?? "",
        webUrl: prefillWebUrl ?? "",
        webContext: prefillWebContext ?? "",
      } : null;

      if (experimentId) {
        const intent = await getIntent(experimentId);
        if (!intent) {
          return {
            content: [
              { type: "text", text: `No intent found for "${experimentId}" yet. The Intent form is now open for the user to fill in — edits are auto-saved to intent.json in real-time. ASK the user in chat: "Do you accept this intent?" Once they confirm, read coherence-preview/src/experiments/${experimentId}/intent.json for the full intent document. If the file does not exist, re-call this tool.` },
            ],
            structuredContent: { intents: [], experiments, ...(prefill ? { prefill } : {}) },
          };
        }
        return {
          content: [
            { type: "text", text: formatIntent(intent) + "\n\n---\nThe user is reviewing this intent in the Intent MCP UI. Edits are auto-saved to intent.json in real-time. ASK the user in chat: 'Do you accept this intent?' Once they confirm, read coherence-preview/src/experiments/" + experimentId + "/intent.json for the finalized version. DO NOT start building until the user confirms acceptance in chat." },
          ],
          structuredContent: { intents: [intent], experiments },
        };
      }
      const intents = await listIntents();
      let text: string;
      if (intents.length === 0) {
        text = "No design intents yet. The Intent form is now open for the user to define their intent — edits are auto-saved in real-time. ASK the user in chat: 'Do you accept this intent?' Once they confirm, read the intent.json file from the experiment folder for full context. If the file does not exist, re-call this tool.";
      } else {
        text = `# Design Intents (${intents.length})\n\n| Experiment | Title | Status | Updated |\n|------------|-------|--------|--------|\n`;
        for (const i of intents) {
          text += formatIntentSummary(i) + "\n";
        }
        text += "\n---\nThe user is reviewing intents in the Intent MCP UI. Edits are auto-saved in real-time. ASK the user in chat: 'Do you accept this intent?' Once they confirm, read the corresponding intent.json file for the finalized version. DO NOT start building until the user confirms acceptance in chat.";
      }
      return {
        content: [{ type: "text", text }],
        structuredContent: { intents, experiments, ...(prefill ? { prefill } : {}) },
      };
    }
  );

  // App-only tool: list intents (called by the UI)
  registerAppTool(
    server,
    "intent_list_data",
    {
      description: "List all design intents and available experiment folders",
      inputSchema: {},
      _meta: {
        ui: {
          resourceUri: intentAppUri,
          visibility: ["app"],
        },
      },
    },
    async () => {
      const intents = await listIntents();
      const experiments = await listExperimentFolders();
      return {
        content: [
          { type: "text", text: `${intents.length} intents, ${experiments.length} experiments` },
        ],
        structuredContent: { intents, experiments },
      };
    }
  );

  // App-only tool: save (create or update) an intent
  registerAppTool(
    server,
    "intent_save_data",
    {
      description: "Create or update a design intent. experimentId is the experiment folder name and serves as the key.",
      inputSchema: {
        experimentId: z.string().describe("Experiment folder name (required — serves as the intent key)"),
        title: z.string().optional(),
        vision: z.string().optional(),
        problem: z.string().optional(),
        successCriteria: z.array(z.string()).optional(),
        nonGoals: z.array(z.string()).optional(),
        constraints: z.array(z.string()).optional(),
        figmaUrl: z.string().optional().describe("Figma file URL used as design reference"),
        figmaMode: z.enum(["import", "reference"]).optional().describe("'import' = pixel-perfect reproduction; 'reference' = analyze & improve"),
        figmaContext: z.string().optional().describe("Extracted Figma design context"),
        status: z
          .enum(["draft", "active", "completed", "abandoned"])
          .optional(),
      },
      _meta: {
        ui: {
          resourceUri: intentAppUri,
          visibility: ["app"],
        },
      },
    },
    async (args) => {
      let intent;
      const existing = await getIntent(args.experimentId);
      if (existing) {
        intent = await updateIntent(args.experimentId, args);
        if (!intent) {
          return {
            isError: true,
            content: [
              { type: "text", text: `Failed to update intent for "${args.experimentId}".` },
            ],
          };
        }
      } else {
        if (!args.vision) {
          return {
            isError: true,
            content: [
              {
                type: "text",
                text: "Vision and experimentId are required to create an intent.",
              },
            ],
          };
        }
        intent = await createIntent(args as CreateIntentInput);
      }
      return {
        content: [
          { type: "text", text: formatIntent(intent) },
        ],
        structuredContent: { intent },
      };
    }
  );

  // App-only tool: delete an intent
  registerAppTool(
    server,
    "intent_delete_data",
    {
      description: "Delete a design intent (removes intent.json from the experiment folder)",
      inputSchema: {
        experimentId: z.string().describe("Experiment folder name whose intent to delete"),
      },
      _meta: {
        ui: {
          resourceUri: intentAppUri,
          visibility: ["app"],
        },
      },
    },
    async ({ experimentId }) => {
      const success = await deleteIntent(experimentId);
      return {
        content: [
          {
            type: "text",
            text: success
              ? `Intent for "${experimentId}" deleted.`
              : `No intent found for "${experimentId}".`,
          },
        ],
      };
    }
  );

  // Resource: Intent App HTML
  registerAppResource(
    server,
    "Design Intent",
    intentAppUri,
    {
      description:
        "Interactive design intent capture form — define What, Why, Success Criteria, and Non-Goals before prototyping",
    },
    async () => {
      let html: string;
      try {
        html = await fsp.readFile(
          path.join(DIST_DIR, "intent-app.html"),
          "utf-8"
        );
      } catch {
        html =
          "<html><body><p>Intent app not built. Run <code>npm run build</code> in mcp-server/.</p></body></html>";
      }
      return {
        contents: [
          {
            uri: intentAppUri,
            mimeType: RESOURCE_MIME_TYPE,
            text: html,
          },
        ],
      };
    }
  );

  // ════════════════════════════════════════════════════════
  // MCP App: browse_verification_reports — Validation scorecard UI
  // ════════════════════════════════════════════════════════

  const verificationReportUri = "ui://coherence-prototyper/verification-report.html";

  function computeVerificationDelta(
    latest: VerificationSnapshot | null,
    history: VerificationSnapshot[]
  ) {
    if (!latest || history.length < 2) {
      return {
        hasPrevious: false,
        overallDeltaPercent: 0,
        improved: [] as Array<{ id: string; delta: number }>,
        regressed: [] as Array<{ id: string; delta: number }>,
        unchanged: 0,
        newCriteria: [] as string[],
        removedCriteria: [] as string[],
      };
    }

    const previous = history[history.length - 2];
    const previousById = new Map<string, VerificationCriterion>(
      previous.criteria.map((item) => [item.id, item])
    );
    const latestById = new Map<string, VerificationCriterion>(
      latest.criteria.map((item) => [item.id, item])
    );

    const improved: Array<{ id: string; delta: number }> = [];
    const regressed: Array<{ id: string; delta: number }> = [];
    let unchanged = 0;

    for (const item of latest.criteria) {
      const prev = previousById.get(item.id);
      if (!prev) continue;
      const delta = item.score - prev.score;
      if (delta > 0) improved.push({ id: item.id, delta });
      else if (delta < 0) regressed.push({ id: item.id, delta });
      else unchanged += 1;
    }

    const newCriteria = latest.criteria
      .filter((item) => !previousById.has(item.id))
      .map((item) => item.id);

    const removedCriteria = previous.criteria
      .filter((item) => !latestById.has(item.id))
      .map((item) => item.id);

    return {
      hasPrevious: true,
      overallDeltaPercent:
        latest.effectivenessPercent - previous.effectivenessPercent,
      improved,
      regressed,
      unchanged,
      newCriteria,
      removedCriteria,
    };
  }

  registerAppTool(
    server,
    "browse_verification_reports",
    {
      title: "Verification Report Browser",
      description:
        "Open a formatted MCP App UI for success-criteria verification reports, including per-criterion scores, evidence, actionable feedback, and trend deltas across runs.",
      inputSchema: {
        experimentId: z
          .string()
          .optional()
          .describe("Optional experiment id to open directly"),
      },
      _meta: {
        ui: { resourceUri: verificationReportUri },
      },
    },
    async ({ experimentId }) => {
      const allReports = await listVerificationExperiments();
      const selectedExperimentId =
        experimentId ?? allReports[0]?.experimentId ?? null;

      // Only include the current experiment's report row
      const reports = selectedExperimentId
        ? allReports.filter((r) => r.experimentId === selectedExperimentId)
        : allReports;

      const report = selectedExperimentId
        ? await getVerificationReport(selectedExperimentId)
        : { latest: null, history: [] };

      const delta = computeVerificationDelta(report.latest, report.history);

      return {
        content: [
          {
            type: "text",
            text: selectedExperimentId
              ? `Opened verification report UI for "${selectedExperimentId}".`
              : "Opened verification report UI. No reports found yet.",
          },
        ],
        structuredContent: {
          reports,
          selectedExperimentId,
          latest: report.latest,
          history: report.history,
          delta,
        },
      };
    }
  );

  registerAppTool(
    server,
    "verification_report_get_data",
    {
      description: "Load verification scorecard data for the MCP App UI",
      inputSchema: {
        experimentId: z
          .string()
          .optional()
          .describe("Optional experiment id to load"),
      },
      _meta: {
        ui: {
          resourceUri: verificationReportUri,
          visibility: ["app"],
        },
      },
    },
    async ({ experimentId }) => {
      const allReports = await listVerificationExperiments();
      const selectedExperimentId =
        experimentId ?? allReports[0]?.experimentId ?? null;

      // Only include the current experiment's report row
      const reports = selectedExperimentId
        ? allReports.filter((r) => r.experimentId === selectedExperimentId)
        : allReports;

      const report = selectedExperimentId
        ? await getVerificationReport(selectedExperimentId)
        : { latest: null, history: [] };
      const delta = computeVerificationDelta(report.latest, report.history);

      return {
        content: [
          {
            type: "text",
            text: selectedExperimentId
              ? `Loaded verification data for "${selectedExperimentId}".`
              : "No verification reports found yet.",
          },
        ],
        structuredContent: {
          reports,
          selectedExperimentId,
          latest: report.latest,
          history: report.history,
          delta,
        },
      };
    }
  );

  registerAppResource(
    server,
    "Verification Report Browser",
    verificationReportUri,
    { description: "Interactive success-criteria verification report viewer" },
    async () => {
      let html: string;
      try {
        html = await fsp.readFile(
          path.join(DIST_DIR, "verification-report.html"),
          "utf-8"
        );
      } catch {
        html =
          "<html><body><p>Verification report app not built. Run <code>npm run build</code> in mcp-server/.</p></body></html>";
      }
      return {
        contents: [
          {
            uri: verificationReportUri,
            mimeType: RESOURCE_MIME_TYPE,
            text: html,
          },
        ],
      };
    }
  );

  // ════════════════════════════════════════════════════════
  // MCP App: browse_design_tokens — Visual token browser
  // ════════════════════════════════════════════════════════

  const tokenBrowserUri = "ui://coherence-prototyper/token-browser.html";

  registerAppTool(
    server,
    "browse_design_tokens",
    {
      title: "Design Token Browser",
      description:
        "Open an interactive visual browser for Coherence design tokens — colors, spacing, typography, shadows, and more. Renders swatches and values inline.",
      inputSchema: {
        category: z
          .string()
          .optional()
          .describe(
            "Optional category to pre-filter: color-palette, foreground, background, brand, status, stroke, typography, spacing, border, shadow, animation, focus"
          ),
      },
      _meta: {
        ui: { resourceUri: tokenBrowserUri },
      },
    },
    async ({ category }) => {
      const tokens = category
        ? await getTokensByCategory(category)
        : await getAllTokens();
      const categories = await getTokenCategories();
      return {
        content: [
          {
            type: "text",
            text: `Showing ${tokens.length} design tokens${category ? ` in category "${category}"` : ""}.`,
          },
        ],
        structuredContent: {
          tokens: tokens.slice(0, 200),
          categories,
          activeCategory: category ?? null,
        },
      };
    }
  );

  registerAppResource(
    server,
    "Design Token Browser",
    tokenBrowserUri,
    { description: "Interactive Coherence design token browser with visual swatches" },
    async () => {
      let html: string;
      try {
        html = await fsp.readFile(
          path.join(DIST_DIR, "token-browser.html"),
          "utf-8"
        );
      } catch {
        html = getFallbackTokenBrowserHtml();
      }
      return {
        contents: [
          {
            uri: tokenBrowserUri,
            mimeType: RESOURCE_MIME_TYPE,
            text: html,
          },
        ],
      };
    }
  );

  // ════════════════════════════════════════════════════════
  // MCP App: browse_icons — Visual icon browser
  // ════════════════════════════════════════════════════════

  const iconBrowserUri = "ui://coherence-prototyper/icon-browser.html";

  registerAppTool(
    server,
    "browse_icons",
    {
      title: "Icon Browser",
      description:
        "Open an interactive visual browser for all Azure portal icons, Coherence/Fluent UI icons, and curated icon mappings. " +
        "Shows icon images in a searchable grid. ALWAYS extract the icon keyword from the user's request and pass it as the `query` param " +
        "(e.g. 'Help me find a Home icon' → query='Home'). The UI opens pre-filtered so the user can visually browse and click \"Use this icon\" " +
        "to confirm their selection. After this tool returns, tell the user to browse and select their icon in the UI. " +
        "Once the user confirms their selection, READ mcp-server/.icon-selection.json for the full icon details (name, source, url, usage snippet) " +
        "and use that icon in subsequent code. If the file doesn't exist, the user hasn't selected yet — ask them to pick one.",
      inputSchema: {
        query: z
          .string()
          .optional()
          .describe("Search query extracted from user's request — e.g. 'Home', 'storage', 'key vault'. ALWAYS extract this from the user's message."),
        source: z
          .enum(["curated", "cui-builtin", "azure-portal", "icon-collection"])
          .optional()
          .describe("Optional source filter: curated (friendly aliases), cui-builtin (Fluent UI), azure-portal (full inventory)"),
        category: z
          .string()
          .optional()
          .describe("Optional category to pre-filter, e.g. 'Networking', 'Compute', 'Security', 'Fluent UI — Simple'"),
      },
      _meta: {
        ui: { resourceUri: iconBrowserUri },
      },
    },
    async ({ query, source, category }) => {
      const result = await searchIcons({ query, source, category, limit: 500 });
      return {
        content: [
          {
            type: "text",
            text: `Showing ${result.icons.length} of ${result.total} icons${query ? ` matching "${query}"` : ""}${source ? ` from ${source}` : ""}${category ? ` in "${category}"` : ""}. The Icon Browser is now open — the user can browse, search, and click "Use this icon" to select one. After they select, read mcp-server/.icon-selection.json for the chosen icon details.`,
          },
        ],
        structuredContent: {
          icons: result.icons,
          total: result.total,
          sources: result.sources,
          categories: result.categories,
          prefillQuery: query ?? null,
          prefillSource: source ?? null,
          prefillCategory: category ?? null,
        },
      };
    }
  );

  // App-only tool: save icon selection (called by the UI when user clicks "Use this icon")
  registerAppTool(
    server,
    "icon_select_data",
    {
      description: "Save the user's icon selection to .icon-selection.json",
      inputSchema: {
        id: z.string().describe("Icon id"),
        name: z.string().describe("Icon display name"),
        source: z.string().describe("Icon source: curated, cui-builtin, azure-portal, icon-collection"),
        category: z.string().describe("Icon category"),
        url: z.string().nullable().describe("SVG URL or null for cui-builtin icons"),
        cuiName: z.string().optional().describe("CuiIcon name attribute for cui-builtin icons"),
        usage: z.string().describe("Code snippet showing how to use this icon"),
      },
      _meta: {
        ui: {
          resourceUri: iconBrowserUri,
          visibility: ["app"],
        },
      },
    },
    async (args) => {
      const selection = {
        ...args,
        selectedAt: new Date().toISOString(),
      };
      const selectionPath = path.join(import.meta.dirname, ".icon-selection.json");
      await fsp.writeFile(selectionPath, JSON.stringify(selection, null, 2));
      return {
        content: [
          {
            type: "text",
            text: `Icon "${args.name}" selected. Usage: ${args.usage}`,
          },
        ],
        structuredContent: { selection },
      };
    }
  );

  registerAppResource(
    server,
    "Icon Browser",
    iconBrowserUri,
    { description: "Interactive visual browser for Azure & Coherence icons" },
    async () => {
      let html: string;
      try {
        html = await fsp.readFile(
          path.join(DIST_DIR, "icon-browser.html"),
          "utf-8"
        );
      } catch {
        html =
          "<html><body><p>Icon browser not built. Run <code>npm run build</code> in mcp-server/.</p></body></html>";
      }
      return {
        contents: [
          {
            uri: iconBrowserUri,
            mimeType: RESOURCE_MIME_TYPE,
            text: html,
          },
        ],
      };
    }
  );

  // ════════════════════════════════════════════════════════
  // Reference tools: Experiment browsing (works remotely via GitHub API)
  // ════════════════════════════════════════════════════════

  const GITHUB_REPO = "unthinkmedia/vibe-azure";
  const EXPERIMENTS_PATH = "coherence-preview/src/experiments";
  const MAIN_TSX_PATH = "coherence-preview/src/main.tsx";
  const PATTERNS_PATH = "coherence-preview/src/patterns";

  async function githubFetch(apiPath: string): Promise<any> {
    const headers: Record<string, string> = {
      Accept: "application/vnd.github.v3+json",
      "User-Agent": "coherence-prototyper-mcp",
    };
    if (process.env.GITHUB_TOKEN) {
      headers.Authorization = `token ${process.env.GITHUB_TOKEN}`;
    }
    const res = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/${apiPath}`, { headers });
    if (!res.ok) throw new Error(`GitHub API ${res.status}: ${res.statusText}`);
    return res.json();
  }

  async function githubGetFileContent(filePath: string): Promise<string> {
    const data = await githubFetch(`contents/${filePath}`);
    if (data.encoding === "base64" && data.content) {
      return Buffer.from(data.content, "base64").toString("utf-8");
    }
    throw new Error(`Unexpected response for ${filePath}`);
  }

  // Parse main.tsx to extract experiment metadata
  function parseExperimentsFromMainTsx(source: string): Array<{
    id: string;
    title: string;
    description: string;
    date?: string;
    tags?: string[];
  }> {
    const results: Array<{ id: string; title: string; description: string; date?: string; tags?: string[] }> = [];
    // Match each object in the experiments array
    const entryRegex = /\{\s*id:\s*'([^']+)',\s*title:\s*'([^']*)',\s*description:\s*'([^']*)'[^}]*?(?:date:\s*'([^']*)')?[^}]*?(?:tags:\s*\[([^\]]*)\])?[^}]*\}/g;
    let match;
    while ((match = entryRegex.exec(source)) !== null) {
      const tags = match[5]
        ? match[5].split(",").map((t: string) => t.trim().replace(/^'|'$/g, "")).filter(Boolean)
        : undefined;
      results.push({
        id: match[1],
        title: match[2],
        description: match[3],
        date: match[4] || undefined,
        tags: tags && tags.length > 0 ? tags : undefined,
      });
    }
    return results;
  }

  server.tool(
    "list_experiments",
    "List all experiments in the coherence-preview gallery, with their titles, descriptions, dates, and tags. " +
      "Fetches live metadata from the GitHub repo so it works from any workspace. " +
      "Use this to discover existing experiments, find examples of specific page types, or reference prior work.",
    {
      tags: z.array(z.string()).optional().describe("Filter by tags (e.g. ['side-panel', 'overview'])"),
      query: z.string().optional().describe("Search filter — matches against id, title, description"),
    },
    async ({ tags, query }) => {
      const mainTsx = await githubGetFileContent(MAIN_TSX_PATH);
      let experiments = parseExperimentsFromMainTsx(mainTsx);

      if (tags && tags.length > 0) {
        experiments = experiments.filter((e) =>
          e.tags && tags.some((t) => e.tags!.includes(t))
        );
      }
      if (query) {
        const q = query.toLowerCase();
        experiments = experiments.filter(
          (e) =>
            e.id.includes(q) ||
            e.title.toLowerCase().includes(q) ||
            e.description.toLowerCase().includes(q)
        );
      }

      let text = `# Experiments (${experiments.length})\n\n`;
      text += "| ID | Title | Date | Tags |\n|-----|-------|------|------|\n";
      for (const e of experiments) {
        text += `| ${e.id} | ${e.title} | ${e.date ?? ""} | ${e.tags?.join(", ") ?? ""} |\n`;
      }
      return { content: [{ type: "text" as const, text }] };
    }
  );

  server.tool(
    "get_experiment",
    "Get the full source files of a specific experiment from the GitHub repo. " +
      "Returns index.tsx, data.ts, styles.ts, and intent.json (if they exist). " +
      "Use this to study how existing experiments are structured, learn conventions, or reference patterns.",
    {
      experimentId: z.string().describe("Experiment folder name (e.g. 'logic-app-designer')"),
      files: z
        .array(z.string())
        .optional()
        .describe("Specific files to fetch (default: ['index.tsx', 'data.ts', 'styles.ts', 'intent.json'])"),
    },
    async ({ experimentId, files }) => {
      const filesToFetch = files ?? ["index.tsx", "data.ts", "styles.ts", "intent.json"];
      const results: Array<{ file: string; content: string }> = [];

      for (const file of filesToFetch) {
        try {
          const content = await githubGetFileContent(`${EXPERIMENTS_PATH}/${experimentId}/${file}`);
          results.push({ file, content });
        } catch {
          // File doesn't exist — skip
        }
      }

      if (results.length === 0) {
        return {
          content: [{ type: "text" as const, text: `No files found for experiment "${experimentId}".` }],
        };
      }

      let text = `# Experiment: ${experimentId}\n\n`;
      for (const r of results) {
        const ext = r.file.split(".").pop() ?? "";
        text += `## ${r.file}\n\n\`\`\`${ext === "json" ? "json" : "tsx"}\n${r.content}\n\`\`\`\n\n`;
      }
      return { content: [{ type: "text" as const, text }] };
    }
  );

  server.tool(
    "get_pattern",
    "Get the source code of a shared pattern or scaffold component from coherence-preview/src/patterns/. " +
      "Use this to read PageHeader, CopilotSuggestions, ScaffoldBrowseBlade, or any other shared pattern " +
      "when building experiments from a remote workspace that doesn't have the repo cloned.",
    {
      filename: z.string().describe("Pattern filename (e.g. 'PageHeader.tsx', 'ScaffoldBrowseBlade.tsx', 'azure-icons.ts')"),
    },
    async ({ filename }) => {
      try {
        const content = await githubGetFileContent(`${PATTERNS_PATH}/${filename}`);
        const ext = filename.split(".").pop() ?? "";
        return {
          content: [{ type: "text" as const, text: `# Pattern: ${filename}\n\n\`\`\`${ext === "json" ? "json" : "tsx"}\n${content}\n\`\`\`` }],
        };
      } catch {
        // Try listing available patterns
        try {
          const listing = await githubFetch(`contents/${PATTERNS_PATH}`);
          const files = (listing as any[]).map((f: any) => f.name).join(", ");
          return {
            content: [{ type: "text" as const, text: `Pattern "${filename}" not found. Available patterns: ${files}` }],
          };
        } catch {
          return {
            content: [{ type: "text" as const, text: `Pattern "${filename}" not found.` }],
          };
        }
      }
    }
  );

  // ════════════════════════════════════════════════════════
  // Workspace scaffolding: local preview for standalone workspaces
  // ════════════════════════════════════════════════════════

  server.tool(
    "init_workspace",
    "Initialize a standalone workspace for local experiment development and preview. " +
      "Writes package.json, vite.config.ts, tsconfig.json, index.html, src/preview.tsx, and shared patterns " +
      "directly to the target directory. Run this once in a new workspace before building experiments.",
    {
      targetDir: z
        .string()
        .describe("Absolute path to the workspace directory to initialize"),
      installDeps: z
        .boolean()
        .optional()
        .describe("If true, also run npm install after scaffolding (default: false)"),
    },
    async ({ targetDir, installDeps }) => {
      const instructions: string[] = [];
      const created: string[] = [];

      // Fetch the list of all patterns from the repo
      let patternFiles: string[] = [];
      try {
        const listing = await githubFetch(`contents/${PATTERNS_PATH}`);
        patternFiles = (listing as any[])
          .filter((f: any) => f.type === "file")
          .map((f: any) => f.name);
      } catch {
        instructions.push("⚠️ Could not fetch pattern list from GitHub. You may need a GITHUB_TOKEN for API access.");
      }

      // Fetch each pattern's content
      const patterns: Array<{ name: string; content: string }> = [];
      for (const pf of patternFiles) {
        try {
          const content = await githubGetFileContent(`${PATTERNS_PATH}/${pf}`);
          patterns.push({ name: pf, content });
        } catch {
          // skip
        }
      }

      const packageJson = JSON.stringify(
        {
          name: "coherence-experiment",
          private: true,
          type: "module",
          scripts: {
            dev: "vite --port 5175",
            build: "vite build",
          },
          dependencies: {
            "@charm-ux/cui": "^0.0.1-alpha.69",
            "@types/react": "^19.2.14",
            "@types/react-dom": "^19.2.3",
            "@vitejs/plugin-react": "^5.1.4",
            react: "^19.2.4",
            "react-dom": "^19.2.4",
            typescript: "^5.9.3",
            vite: "^7.3.1",
          },
        },
        null,
        2
      );

      // .npmrc — registry + auth credentials for @charm-ux feed
      const FEED_URL = "pkgs.dev.azure.com/charm-pilot/charm-pilot/_packaging/charm-feed/npm";
      let npmrc = "";
      // Try to copy from local monorepo first
      const monorepoNpmrc = path.resolve(import.meta.dirname, "../../coherence-preview/.npmrc");
      if (existsSync(monorepoNpmrc)) {
        try {
          npmrc = await fsp.readFile(monorepoNpmrc, "utf-8");
        } catch { /* fall through */ }
      }
      if (!npmrc) {
        // Fallback: generate inline with embedded credentials
        npmrc = `@charm-ux:registry=https://${FEED_URL}/registry/\n//${FEED_URL}/registry/:username=azdo\n//${FEED_URL}/registry/:_password=OFNQRU1vdGdxek1OdnlUdGJTZjF2VHZCWUJiaWtudmtjWEN3MVFsdzJwOXpkNElXcWsyNkpRUUo5OUNDQUNBQUFBQUFBcm9oQUFBU0FaRE8zdEk0\n//${FEED_URL}/registry/:always-auth=true\n`;
      }

      const viteConfig = `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@charm-ux/cui/react': '@charm-ux/cui/dist/react',
    },
  },
});
`;

      const tsconfig = JSON.stringify(
        {
          compilerOptions: {
            target: "ES2020",
            module: "ESNext",
            moduleResolution: "bundler",
            jsx: "react-jsx",
            strict: true,
            esModuleInterop: true,
            skipLibCheck: true,
            forceConsistentCasingInFileNames: true,
            resolveJsonModule: true,
            isolatedModules: true,
            noEmit: true,
            paths: {
              "../../patterns/*": ["./src/patterns/*"],
              "../copilot-button": ["./src/patterns/CopilotButton"],
            },
          },
          include: ["src"],
        },
        null,
        2
      );

      const indexHtml = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Experiment Preview</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/preview.tsx"></script>
  </body>
</html>
`;

      const previewTsx = `import { createRoot } from 'react-dom/client';
import { Suspense, lazy, useState, useEffect } from 'react';
import '@charm-ux/cui/dist/themes/cui/theme.css';
import '@charm-ux/cui/dist/themes/cui/reset.css';

// Auto-discover experiments: add lazy imports here
const experiments: Record<string, { title: string; component: React.LazyExoticComponent<any> }> = {};

// Scan for experiments — the builder skill will add entries above
// Example:
// experiments['my-experiment'] = {
//   title: 'My Experiment',
//   component: lazy(() => import('./experiments/my-experiment')),
// };

function App() {
  const [id, setId] = useState(window.location.hash.slice(1) || '');

  useEffect(() => {
    const onHash = () => setId(window.location.hash.slice(1) || '');
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const entry = experiments[id];
  if (!entry) {
    return (
      <div style={{ padding: 40, fontFamily: 'Segoe UI, sans-serif' }}>
        <h1>Experiment Preview</h1>
        {Object.keys(experiments).length === 0 ? (
          <p>No experiments yet. Ask Copilot to <strong>"build me an Azure page"</strong>.</p>
        ) : (
          <ul>
            {Object.entries(experiments).map(([eid, e]) => (
              <li key={eid}><a href={\`#\${eid}\`}>{e.title}</a></li>
            ))}
          </ul>
        )}
      </div>
    );
  }

  const Comp = entry.component;
  return (
    <Suspense fallback={<div style={{ padding: 40 }}>Loading...</div>}>
      <Comp />
    </Suspense>
  );
}

createRoot(document.getElementById('root')!).render(<App />);
`;

      // Helper to write a file (creating parent dirs as needed)
      const writeFile = async (relPath: string, content: string) => {
        const fullPath = path.join(targetDir, relPath);
        await fsp.mkdir(path.dirname(fullPath), { recursive: true });
        await fsp.writeFile(fullPath, content, "utf-8");
        created.push(relPath);
      };

      await writeFile("package.json", packageJson);
      if (npmrc) {
        await writeFile(".npmrc", npmrc);
      }
      await writeFile("vite.config.ts", viteConfig);
      await writeFile("tsconfig.json", tsconfig);
      await writeFile("index.html", indexHtml);
      await writeFile("src/preview.tsx", previewTsx);

      if (patterns.length > 0) {
        for (const p of patterns) {
          await writeFile(`src/patterns/${p.name}`, p.content);
        }
      }

      // Create experiments directory
      const expDir = path.join(targetDir, "src/experiments");
      if (!existsSync(expDir)) {
        await fsp.mkdir(expDir, { recursive: true });
        created.push("src/experiments/");
      }

      let text = `# ✅ Workspace Initialized\n\n`;
      text += `**Directory:** ${targetDir}\n\n`;
      text += `**Files created:** ${created.length}\n\n`;
      text += created.map(f => `- ${f}`).join("\n") + "\n\n";

      if (installDeps) {
        text += `## Running npm install...\n\n`;
        try {
          const { execSync } = await import("child_process");
          execSync("npm install", { cwd: targetDir, stdio: "pipe" });
          text += `✅ Dependencies installed.\n\n`;
        } catch (e: any) {
          text += `⚠️ npm install failed: ${e.message}\n\n`;
        }
      } else {
        text += `## Next Steps\n\n1. \`cd ${targetDir}\`\n2. \`npm install\`\n3. \`npm run dev\` → preview at http://localhost:5175\n`;
      }

      if (instructions.length > 0) {
        text += `\n## Warnings\n\n${instructions.join("\n")}\n`;
      }

      return { content: [{ type: "text" as const, text }] };
    }
  );

  return server;
}

/** Inline fallback if the Vite-built HTML isn't available */
function getFallbackTokenBrowserHtml(): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Design Token Browser</title>
  <style>
    :root {
      --bg: #fff; --fg: #1a1a1a; --border: #e0e0e0; --accent: #0078d4;
      --card-bg: #f5f5f5; --swatch-border: #ddd;
    }
    [data-theme="dark"] {
      --bg: #1e1e1e; --fg: #e0e0e0; --border: #333; --accent: #4da6ff;
      --card-bg: #2d2d2d; --swatch-border: #555;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: var(--font-sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif);
      background: var(--bg); color: var(--fg); padding: 16px;
    }
    h1 { font-size: 18px; font-weight: 600; margin-bottom: 12px; }
    .toolbar {
      display: flex; gap: 8px; margin-bottom: 16px; flex-wrap: wrap;
    }
    .toolbar input {
      flex: 1; min-width: 200px; padding: 6px 10px; border: 1px solid var(--border);
      border-radius: 6px; font-size: 13px; background: var(--bg); color: var(--fg);
    }
    .toolbar select {
      padding: 6px 10px; border: 1px solid var(--border); border-radius: 6px;
      font-size: 13px; background: var(--bg); color: var(--fg);
    }
    .count { font-size: 13px; color: #888; margin-bottom: 12px; }
    .tokens {
      display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
      gap: 8px;
    }
    .token {
      display: flex; align-items: center; gap: 10px;
      padding: 8px 12px; border-radius: 6px; background: var(--card-bg);
      border: 1px solid var(--border); font-size: 12px;
    }
    .swatch {
      width: 28px; height: 28px; border-radius: 4px; border: 1px solid var(--swatch-border);
      flex-shrink: 0;
    }
    .token-info { overflow: hidden; }
    .token-name { font-weight: 600; font-size: 12px; word-break: break-all; }
    .token-value { color: #888; font-size: 11px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .category-chip {
      display: inline-block; padding: 2px 8px; border-radius: 10px;
      font-size: 11px; background: var(--accent); color: #fff; margin-top: 2px;
    }
  </style>
</head>
<body>
  <h1>Coherence Design Tokens</h1>
  <div class="toolbar">
    <input id="search" type="text" placeholder="Search tokens..." />
    <select id="category-filter"><option value="">All categories</option></select>
  </div>
  <div class="count" id="count"></div>
  <div class="tokens" id="tokens"></div>

  <script type="module">
    import { App } from "@modelcontextprotocol/ext-apps";
    const app = new App({ name: "Token Browser", version: "1.0.0" });

    let allTokens = [];
    let allCategories = [];
    let activeCategory = "";

    const searchEl = document.getElementById("search");
    const filterEl = document.getElementById("category-filter");
    const countEl = document.getElementById("count");
    const tokensEl = document.getElementById("tokens");

    function isColorValue(val) {
      return /^(#|rgb|hsl|oklch|color\(|var\()/.test(val.trim()) ||
        /^(transparent|currentColor|inherit)$/i.test(val.trim());
    }

    function render() {
      const q = searchEl.value.toLowerCase();
      const cat = filterEl.value;
      const filtered = allTokens.filter(t => {
        if (cat && t.category !== cat) return false;
        if (q && !t.name.toLowerCase().includes(q) && !t.value.toLowerCase().includes(q)) return false;
        return true;
      });

      countEl.textContent = filtered.length + " tokens" + (cat ? " in " + cat : "") + (q ? " matching "" + q + """ : "");
      tokensEl.innerHTML = filtered.slice(0, 200).map(t => {
        const showSwatch = isColorValue(t.value) || t.category === "color-palette" || t.category === "foreground" || t.category === "background" || t.category === "brand" || t.category === "status" || t.category === "stroke";
        return '<div class="token">' +
          (showSwatch ? '<div class="swatch" style="background:' + t.value.replace(/"/g, '') + '"></div>' : '') +
          '<div class="token-info">' +
            '<div class="token-name">' + t.name + '</div>' +
            '<div class="token-value">' + t.value + '</div>' +
            '<span class="category-chip">' + t.category + '</span>' +
          '</div></div>';
      }).join("");
    }

    function populateCategories() {
      filterEl.innerHTML = '<option value="">All categories</option>';
      for (const c of allCategories) {
        const opt = document.createElement("option");
        opt.value = c.category;
        opt.textContent = c.category + " (" + c.count + ")";
        if (c.category === activeCategory) opt.selected = true;
        filterEl.appendChild(opt);
      }
    }

    app.ontoolresult = (result) => {
      const data = result.structuredContent;
      if (data) {
        allTokens = data.tokens || [];
        allCategories = data.categories || [];
        activeCategory = data.activeCategory || "";
        populateCategories();
        if (activeCategory) filterEl.value = activeCategory;
        render();
      }
    };

    searchEl.addEventListener("input", render);
    filterEl.addEventListener("change", render);

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
  </script>
</body>
</html>`;
}
