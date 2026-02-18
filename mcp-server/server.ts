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
import fs from "node:fs/promises";
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

const DIST_DIR = path.join(import.meta.dirname, "dist");

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
        "The user reviews and edits the form, then clicks 'Make This' to confirm. " +
        "After this tool returns, READ the intent.json file from coherence-preview/src/experiments/<experimentId>/intent.json " +
        "to get the finalized intent document — use the full intent as PRIMARY INSTRUCTION SOURCE for building. " +
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
      },
      _meta: {
        ui: { resourceUri: intentAppUri },
      },
    },
    async ({ experimentId, prefillTitle, prefillVision, prefillProblem, prefillSuccessCriteria, prefillNonGoals, prefillConstraints }) => {
      const experiments = await listExperimentFolders();

      // Build prefill object if any prefill params were provided
      const hasPrefill = prefillTitle || prefillVision || prefillProblem ||
        (prefillSuccessCriteria && prefillSuccessCriteria.length > 0) ||
        (prefillNonGoals && prefillNonGoals.length > 0) ||
        (prefillConstraints && prefillConstraints.length > 0);
      const prefill = hasPrefill ? {
        experimentId: experimentId ?? "",
        title: prefillTitle ?? "",
        vision: prefillVision ?? "",
        problem: prefillProblem ?? "",
        successCriteria: prefillSuccessCriteria ?? [],
        nonGoals: prefillNonGoals ?? [],
        constraints: prefillConstraints ?? [],
      } : null;

      if (experimentId) {
        const intent = await getIntent(experimentId);
        if (!intent) {
          return {
            content: [
              { type: "text", text: `No intent found for "${experimentId}" yet. The form is open for the user to fill in and click "Make This". After they do, read coherence-preview/src/experiments/${experimentId}/intent.json for the full intent document.` },
            ],
            structuredContent: { intents: [], experiments, ...(prefill ? { prefill } : {}) },
          };
        }
        return {
          content: [
            { type: "text", text: formatIntent(intent) + "\n\n---\nThe user is reviewing this intent. If they click 'Make This', the intent.json will be updated. Read coherence-preview/src/experiments/" + experimentId + "/intent.json for the finalized version." },
          ],
          structuredContent: { intents: [intent], experiments },
        };
      }
      const intents = await listIntents();
      let text: string;
      if (intents.length === 0) {
        text = "No design intents yet. The form is open for the user to define their intent and click 'Make This'. After they do, read the intent.json file from the experiment folder for full context.";
      } else {
        text = `# Design Intents (${intents.length})\n\n| Experiment | Title | Status | Updated |\n|------------|-------|--------|--------|\n`;
        for (const i of intents) {
          text += formatIntentSummary(i) + "\n";
        }
        text += "\n---\nThe user is reviewing intents. If they click 'Make This' on a new or edited intent, read the corresponding intent.json file for the finalized version.";
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
        html = await fs.readFile(
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
        html = await fs.readFile(
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
