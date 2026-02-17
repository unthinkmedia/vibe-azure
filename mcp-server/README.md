# Coherence Prototyper MCP Server

An MCP server (with MCP App) that gives Claude the same Azure portal prototyping knowledge as the VS Code skills — accessible from **Claude Desktop**, **Claude.ai**, or any MCP-compatible host.

## How It Complements the VS Code Skills

| Capability | VS Code Skills | This MCP Server |
|---|---|---|
| **Where it runs** | Inside VS Code Copilot | Claude Desktop, Claude.ai, any MCP host |
| **Component API lookup** | Reads manifest docs on demand | `lookup_component` tool — fetches + parses live CDN manifest |
| **Design tokens** | Reads theme CSS docs | `get_design_tokens` + `browse_design_tokens` MCP App with visual swatches |
| **Scaffolds** | Copies template files | `get_scaffold` tool — returns all scaffold files ready to paste |
| **Design guidance** | Reads reference markdown | `get_component_guidance`, `get_ux_guide`, etc. |
| **Icon lookup** | Reads icon reference | `lookup_azure_icon` — search by name or purpose |
| **Composition patterns** | Reads pattern docs | `get_composition_pattern` tool |
| **Mock data** | Reads sample data refs | `get_mock_data_patterns` tool |

## Tools (14 total)

### Knowledge Tools (text-based)

| Tool | Description |
|---|---|
| `lookup_component` | Look up a component's full API (attributes, events, slots, CSS properties) from the live CDN manifest |
| `search_components` | Search components by keyword across names, descriptions, and attributes |
| `list_components` | List all ~70 Coherence UI components |
| `get_component_guidance` | Get design guidance: when to use, dos/don'ts, accessibility, anatomy, code examples |
| `get_design_tokens` | Search/filter design tokens by category or keyword |
| `get_scaffold` | Get complete starter scaffold files for a page type |
| `get_ux_guide` | Get cross-cutting UX guidance (accessibility, AI, writing, data viz) |
| `lookup_azure_icon` | Search Azure portal icons (Fluent 2 via Iconify) |
| `get_page_type_guidance` | Get anatomy + rules for Azure portal page types |
| `get_composition_pattern` | Get reusable multi-component patterns (header, shell, toolbar, side nav) |
| `get_template` | Get page layout template guidance (dashboard, form, settings) |
| `get_task_flow` | Get task flow guidance (bulk edit, create, inline edit, etc.) |
| `get_mock_data_patterns` | Get reference patterns for generating realistic Azure mock data |

### MCP App (visual UI)

| Tool | Description |
|---|---|
| `browse_design_tokens` | Interactive visual token browser with color swatches, search, and category filtering — renders inline in Claude |

## Setup

### Claude Desktop

Add to your `claude_desktop_config.json` (Settings → Developer → Edit Config):

```json
{
  "mcpServers": {
    "coherence-prototyper": {
      "command": "node",
      "args": ["/absolute/path/to/vibe-azure/mcp-server/dist/main.js"]
    }
  }
}
```

Replace `/absolute/path/to/vibe-azure` with the actual path to your clone.

### VS Code (MCP)

Add to `.vscode/mcp.json`:

```json
{
  "servers": {
    "coherence-prototyper": {
      "command": "node",
      "args": ["${workspaceFolder}/mcp-server/dist/main.js"]
    }
  }
}
```

## Development

```bash
cd mcp-server

# Install dependencies
npm install

# Type-check
npx tsc --noEmit

# Build everything (server + MCP App UI)
npm run build

# Dev mode with watch (server + UI rebuild on change)
npm start
```

## Architecture

```
mcp-server/
├── main.ts                    # stdio entry point
├── server.ts                  # MCP server: 14 tools + 1 MCP App resource
├── token-browser.html         # MCP App view (Vite entry)
├── src/
│   ├── manifest-cache.ts      # Fetches + caches Coherence manifest from CDN
│   ├── theme-cache.ts         # Fetches + caches theme CSS, parses tokens
│   ├── content.ts             # Reads reference files from .github/skills/
│   └── token-browser.ts       # Client-side App for token browser UI
├── dist/                      # Build output
│   ├── main.js                # Compiled server
│   ├── server.js
│   ├── src/
│   └── token-browser.html     # Bundled single-file MCP App
```

### Data Flow

- **Live from CDN** (cached 1hr): Component manifest JSON + theme CSS
- **Read from repo** (at runtime): Component guidance, UX guides, scaffolds, icons, patterns, mock data references from `.github/skills/`

This means the MCP server always reflects the latest Coherence release (via CDN) while using the same curated design guidance that the VS Code skills use.

## Example Prompts

Once connected, try these in Claude:

- *"Look up the CuiDataGrid component API"*
- *"Show me all status color tokens"*
- *"Get the scaffold for an Azure overview page"*
- *"What's the accessibility guidance for Coherence?"*
- *"Search for components that support the appearance attribute"*
- *"Get the composition pattern for the Azure portal header"*
- *"Browse design tokens"* (opens the interactive MCP App)
