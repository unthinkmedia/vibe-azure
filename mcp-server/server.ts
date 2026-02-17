/**
 * Coherence Prototyper MCP Server
 *
 * Provides tools for Azure portal prototyping with Coherence UI.
 * Complements the VS Code skills — same knowledge, accessible via MCP
 * from Claude Desktop, Claude.ai, or any MCP-compatible host.
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
  lookupComponent,
  listComponents,
  searchComponents,
  type ComponentAPI,
} from "./src/manifest-cache.js";
import {
  searchTokens,
  getTokensByCategory,
  getTokenCategories,
  getAllTokens,
} from "./src/theme-cache.js";
import {
  getComponentGuidance,
  listComponentGuidanceFiles,
  getUxGuide,
  listUxGuides,
  getScaffold,
  listScaffoldTypes,
  getAzureIconsReference,
  getPageTypesReference,
  getMockDataReference,
  listMockDataReferences,
  getTemplateReference,
  listTemplates,
  getTaskFlowReference,
  listTaskFlows,
  getPatternReference,
  listPatterns,
} from "./src/content.js";

const DIST_DIR = path.join(import.meta.dirname, "dist");

function formatComponentAPI(c: ComponentAPI): string {
  let out = `# ${c.tagName} (${c.className})\n\n`;
  if (c.description) out += `${c.description}\n\n`;
  if (c.superclass) out += `**Extends:** ${c.superclass}\n\n`;

  if (c.attributes.length > 0) {
    out += `## Attributes\n\n| Name | Type | Default | Description |\n|------|------|---------|-------------|\n`;
    for (const a of c.attributes) {
      out += `| \`${a.name}\` | \`${a.type?.text ?? "string"}\` | ${a.default ?? "—"} | ${a.description ?? ""} |\n`;
    }
    out += "\n";
  }

  if (c.events.length > 0) {
    out += `## Events\n\n| Name | Type | Description |\n|------|------|-------------|\n`;
    for (const e of c.events) {
      out += `| \`${e.name}\` | \`${e.type?.text ?? ""}\` | ${e.description ?? ""} |\n`;
    }
    out += "\n";
  }

  if (c.slots.length > 0) {
    out += `## Slots\n\n| Name | Description |\n|------|-------------|\n`;
    for (const s of c.slots) {
      out += `| \`${s.name || "(default)"}\` | ${s.description ?? ""} |\n`;
    }
    out += "\n";
  }

  if (c.cssProperties.length > 0) {
    out += `## CSS Custom Properties\n\n| Name | Default | Description |\n|------|---------|-------------|\n`;
    for (const p of c.cssProperties) {
      out += `| \`${p.name}\` | ${p.default ?? "—"} | ${p.description ?? ""} |\n`;
    }
    out += "\n";
  }

  if (c.cssParts.length > 0) {
    out += `## CSS Parts\n\n| Name | Description |\n|------|-------------|\n`;
    for (const p of c.cssParts) {
      out += `| \`${p.name}\` | ${p.description ?? ""} |\n`;
    }
    out += "\n";
  }

  return out;
}

export function createServer(): McpServer {
  const server = new McpServer({
    name: "Coherence Prototyper",
    version: "1.0.0",
  });

  // ════════════════════════════════════════════════════════
  // Tool 1: lookup_component — Fetch component API from manifest
  // ════════════════════════════════════════════════════════

  server.tool(
    "lookup_component",
    "Look up a Coherence UI component's API (attributes, events, slots, CSS properties) from the live manifest. Use the tag name (e.g. 'button', 'cui-button') or class name (e.g. 'CuiButton').",
    { name: z.string().describe("Component name: tag (button, cui-button), class (CuiButton), or slug (data-grid)") },
    async ({ name }) => {
      const component = await lookupComponent(name);
      if (!component) {
        const all = await listComponents();
        const suggestions = all
          .filter((c) => c.tagName.includes(name.toLowerCase()) || c.className.toLowerCase().includes(name.toLowerCase()))
          .slice(0, 5)
          .map((c) => c.tagName);
        return {
          content: [
            {
              type: "text",
              text: `Component "${name}" not found.${suggestions.length > 0 ? ` Did you mean: ${suggestions.join(", ")}?` : ""}\n\nUse list_components to see all available components.`,
            },
          ],
        };
      }
      return {
        content: [{ type: "text", text: formatComponentAPI(component) }],
      };
    }
  );

  // ════════════════════════════════════════════════════════
  // Tool 2: search_components — Search components by keyword
  // ════════════════════════════════════════════════════════

  server.tool(
    "search_components",
    "Search Coherence UI components by keyword across names, descriptions, and attribute names. Returns matching component APIs.",
    { query: z.string().describe("Search query (e.g. 'table', 'appearance', 'menu')") },
    async ({ query }) => {
      const results = await searchComponents(query);
      if (results.length === 0) {
        return {
          content: [
            {
              type: "text",
              text: `No components matched "${query}". Try broader terms or use list_components.`,
            },
          ],
        };
      }
      let text = `# Search Results: "${query}" (${results.length} matches)\n\n`;
      for (const c of results.slice(0, 10)) {
        text += `## ${c.tagName} (${c.className})\n${c.description}\n- ${c.attributes.length} attributes, ${c.events.length} events, ${c.slots.length} slots\n\n`;
      }
      if (results.length > 10) {
        text += `…and ${results.length - 10} more. Narrow your query for details.\n`;
      }
      return { content: [{ type: "text", text }] };
    }
  );

  // ════════════════════════════════════════════════════════
  // Tool 3: list_components — List all available components
  // ════════════════════════════════════════════════════════

  server.tool(
    "list_components",
    "List all Coherence UI components with their tag names and descriptions.",
    {},
    async () => {
      const components = await listComponents();
      let text = `# Coherence UI Components (${components.length})\n\n| Tag | Class | Description |\n|-----|-------|-------------|\n`;
      for (const c of components) {
        text += `| \`${c.tagName}\` | ${c.className} | ${c.description.slice(0, 80)}${c.description.length > 80 ? "…" : ""} |\n`;
      }
      return { content: [{ type: "text", text }] };
    }
  );

  // ════════════════════════════════════════════════════════
  // Tool 4: get_component_guidance — Design docs for a component
  // ════════════════════════════════════════════════════════

  server.tool(
    "get_component_guidance",
    "Get design guidance for a Coherence UI component: when to use, dos/don'ts, accessibility, anatomy, and code examples. Available for 66 components.",
    { component: z.string().describe("Component name (e.g. 'button', 'data-grid', 'dialog')") },
    async ({ component }) => {
      const guidance = await getComponentGuidance(component);
      if (!guidance) {
        const available = await listComponentGuidanceFiles();
        return {
          content: [
            {
              type: "text",
              text: `No design guidance found for "${component}". Available: ${available.join(", ")}`,
            },
          ],
        };
      }
      return { content: [{ type: "text", text: guidance }] };
    }
  );

  // ════════════════════════════════════════════════════════
  // Tool 5: get_design_tokens — Search/filter design tokens
  // ════════════════════════════════════════════════════════

  server.tool(
    "get_design_tokens",
    "Search or filter Coherence design tokens (CSS custom properties) from the theme. Filter by category or search by name/value. Categories: color-palette, foreground, background, brand, status, stroke, typography, spacing, border, shadow, animation, focus, component-button, component-form, and more.",
    {
      query: z.string().optional().describe("Search query to filter tokens by name or value"),
      category: z.string().optional().describe("Filter by category: color-palette, foreground, background, brand, status, stroke, typography, spacing, border, shadow, animation, focus"),
    },
    async ({ query, category }) => {
      if (!query && !category) {
        const categories = await getTokenCategories();
        let text = `# Design Token Categories\n\n| Category | Count |\n|----------|-------|\n`;
        for (const c of categories) {
          text += `| ${c.category} | ${c.count} |\n`;
        }
        text += `\nUse \`category\` to filter or \`query\` to search.`;
        return { content: [{ type: "text", text }] };
      }

      let tokens: Awaited<ReturnType<typeof searchTokens>>;
      if (category) {
        tokens = await getTokensByCategory(category);
      } else if (query) {
        tokens = await searchTokens(query);
      } else {
        tokens = [];
      }

      if (tokens.length === 0) {
        return {
          content: [
            {
              type: "text",
              text: `No tokens found for ${category ? `category "${category}"` : `query "${query}"`}.`,
            },
          ],
        };
      }

      let text = `# Design Tokens${category ? ` — ${category}` : ""}${query ? ` — "${query}"` : ""} (${tokens.length})\n\n| Token | Value | Category |\n|-------|-------|----------|\n`;
      for (const t of tokens.slice(0, 100)) {
        text += `| \`${t.name}\` | \`${t.value}\` | ${t.category} |\n`;
      }
      if (tokens.length > 100) {
        text += `\n…and ${tokens.length - 100} more. Narrow your search.\n`;
      }
      return { content: [{ type: "text", text }] };
    }
  );

  // ════════════════════════════════════════════════════════
  // Tool 6: get_scaffold — Get starter files for a page type
  // ════════════════════════════════════════════════════════

  server.tool(
    "get_scaffold",
    "Get the complete starter scaffold for an Azure portal page type. Returns all files (index.tsx, data.ts, styles.ts, Navigation.tsx, PageContent.tsx) ready to customize. Types: azure-resource-page, azure-list-page, azure-create-flow, azure-overview-page.",
    { type: z.string().describe("Scaffold type: azure-resource-page, azure-list-page, azure-create-flow, azure-overview-page") },
    async ({ type }) => {
      const scaffold = await getScaffold(type);
      if (!scaffold) {
        return {
          content: [
            {
              type: "text",
              text: `Unknown scaffold type "${type}". Available: ${listScaffoldTypes().join(", ")}`,
            },
          ],
        };
      }

      let text = `# Scaffold: ${type}\n\nFiles to copy to \`coherence-preview/src/experiments/<experiment-id>/\`:\n\n`;
      for (const [filename, content] of Object.entries(scaffold)) {
        text += `## ${filename}\n\n\`\`\`tsx\n${content}\n\`\`\`\n\n`;
      }
      return { content: [{ type: "text", text }] };
    }
  );

  // ════════════════════════════════════════════════════════
  // Tool 7: get_ux_guide — Cross-cutting UX guidance
  // ════════════════════════════════════════════════════════

  server.tool(
    "get_ux_guide",
    "Get Coherence UX design guidance. Guides: accessibility, ai-basics, ai-entry-points, data-visualization, illustration, writing-ui.",
    { guide: z.string().describe("Guide name: accessibility, ai-basics, ai-entry-points, data-visualization, illustration, writing-ui") },
    async ({ guide }) => {
      const content = await getUxGuide(guide);
      if (!content) {
        return {
          content: [
            {
              type: "text",
              text: `Guide "${guide}" not found. Available: ${listUxGuides().join(", ")}`,
            },
          ],
        };
      }
      return { content: [{ type: "text", text: content }] };
    }
  );

  // ════════════════════════════════════════════════════════
  // Tool 8: lookup_azure_icon — Search Azure/Fluent icons
  // ════════════════════════════════════════════════════════

  server.tool(
    "lookup_azure_icon",
    "Search the Azure portal icon reference (Fluent 2 via Iconify). Returns icon names and URLs for navigation, resources, and content areas.",
    { query: z.string().optional().describe("Optional search term to filter icons") },
    async ({ query }) => {
      const ref = await getAzureIconsReference();
      if (!ref) {
        return {
          content: [
            { type: "text", text: "Azure icons reference not available." },
          ],
        };
      }
      if (query) {
        const lines = ref.split("\n");
        const matches = lines.filter((l) =>
          l.toLowerCase().includes(query.toLowerCase())
        );
        if (matches.length === 0) {
          return {
            content: [
              {
                type: "text",
                text: `No icons matched "${query}". Showing full reference:\n\n${ref}`,
              },
            ],
          };
        }
        return {
          content: [
            {
              type: "text",
              text: `# Azure Icons matching "${query}"\n\n${matches.join("\n")}`,
            },
          ],
        };
      }
      return { content: [{ type: "text", text: ref }] };
    }
  );

  // ════════════════════════════════════════════════════════
  // Tool 9: get_page_type_guidance — Page type anatomy + rules
  // ════════════════════════════════════════════════════════

  server.tool(
    "get_page_type_guidance",
    "Get detailed anatomy, customization guidance, and rules for Azure portal page types (resource page, list page, create flow, overview page).",
    {},
    async () => {
      const ref = await getPageTypesReference();
      return {
        content: [
          {
            type: "text",
            text: ref ?? "Page types reference not available.",
          },
        ],
      };
    }
  );

  // ════════════════════════════════════════════════════════
  // Tool 10: get_composition_pattern — Reusable multi-component patterns
  // ════════════════════════════════════════════════════════

  server.tool(
    "get_composition_pattern",
    "Get a reusable composition pattern for Azure portal UIs. Patterns: azure-portal-header, azure-resource-page-shell, resource-page-toolbar, side-nav-with-iconify.",
    { pattern: z.string().describe("Pattern name: azure-portal-header, azure-resource-page-shell, resource-page-toolbar, side-nav-with-iconify") },
    async ({ pattern }) => {
      const content = await getPatternReference(pattern);
      if (!content) {
        return {
          content: [
            {
              type: "text",
              text: `Pattern "${pattern}" not found. Available: ${listPatterns().join(", ")}`,
            },
          ],
        };
      }
      return { content: [{ type: "text", text: content }] };
    }
  );

  // ════════════════════════════════════════════════════════
  // Tool 11: get_template — Page layout template guidance
  // ════════════════════════════════════════════════════════

  server.tool(
    "get_template",
    "Get Coherence page template guidance (layout patterns). Templates: dashboard, form, settings.",
    { template: z.string().describe("Template name: dashboard, form, settings") },
    async ({ template }) => {
      const content = await getTemplateReference(template);
      if (!content) {
        return {
          content: [
            {
              type: "text",
              text: `Template "${template}" not found. Available: ${listTemplates().join(", ")}`,
            },
          ],
        };
      }
      return { content: [{ type: "text", text: content }] };
    }
  );

  // ════════════════════════════════════════════════════════
  // Tool 12: get_task_flow — Multi-step interaction patterns
  // ════════════════════════════════════════════════════════

  server.tool(
    "get_task_flow",
    "Get task flow guidance for multi-step interactions. Flows: bulk-edit, create-an-item, edit-an-item, favorites, inline-edit, save-presets.",
    { flow: z.string().describe("Task flow name: bulk-edit, create-an-item, edit-an-item, favorites, inline-edit, save-presets") },
    async ({ flow }) => {
      const content = await getTaskFlowReference(flow);
      if (!content) {
        return {
          content: [
            {
              type: "text",
              text: `Task flow "${flow}" not found. Available: ${listTaskFlows().join(", ")}`,
            },
          ],
        };
      }
      return { content: [{ type: "text", text: content }] };
    }
  );

  // ════════════════════════════════════════════════════════
  // Tool 13: get_mock_data_patterns — Mock data generation help
  // ════════════════════════════════════════════════════════

  server.tool(
    "get_mock_data_patterns",
    "Get reference data patterns for generating realistic Azure mock data. References: resource-types, sample-data, status-patterns.",
    { reference: z.string().describe("Reference: resource-types, sample-data, status-patterns") },
    async ({ reference }) => {
      const content = await getMockDataReference(reference);
      if (!content) {
        const available = await listMockDataReferences();
        return {
          content: [
            {
              type: "text",
              text: `Reference "${reference}" not found. Available: ${available.join(", ")}`,
            },
          ],
        };
      }
      return { content: [{ type: "text", text: content }] };
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
