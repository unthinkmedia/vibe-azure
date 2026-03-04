# Coherence Prototyper MCP Server

An MCP server with interactive MCP Apps that gives Claude Azure portal prototyping capabilities — accessible from **Claude Desktop**, **Claude.ai**, **VS Code**, or any MCP-compatible host.

> **Note:** Text-based design guidance (component docs, UX guides, scaffolds, patterns, mock data references) is provided by the VS Code skills when working in-editor. This MCP server focuses on **visual interactive apps** and **remote reference access** for environments without a local repo clone.

## Tools (13 total)

### MCP Apps (interactive visual UI)

| Tool | Description |
|---|---|
| `design_intent` | Interactive form to capture What / Why / Success Criteria / Non-Goals before prototyping |
| `browse_design_tokens` | Visual token browser with color swatches, search, and category filtering |
| `browse_icons` | Searchable grid of ~1500 Azure portal + Fluent UI icons — click to select |
| `browse_verification_reports` | Success-criteria scorecard viewer with trend deltas across verification runs |

### Remote Reference Tools

| Tool | Description |
|---|---|
| `list_experiments` | List all experiments with title, description, tags, and date |
| `get_experiment` | Fetch full source files (index.tsx, data.ts, styles.ts, intent.json) of an experiment from GitHub |
| `get_pattern` | Fetch shared pattern source code (PageHeader, CopilotSuggestions, etc.) from GitHub |
| `init_workspace` | Bootstrap a standalone workspace with package.json, Vite config, and shared patterns |

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
├── main.ts                    # stdio entry point + `init` CLI command
├── server.ts                  # MCP server: 13 tools (4 Apps + 5 app helpers + 4 reference)
├── init.ts                    # Workspace bootstrapper (fetches patterns from GitHub)
├── icon-browser.html          # MCP App view (Vite entry)
├── token-browser.html         # MCP App view (Vite entry)
├── intent-app.html            # MCP App view (Vite entry)
├── verification-report.html   # MCP App view (Vite entry)
├── src/
│   ├── content.ts             # Reads reference files from .github/skills/
│   ├── icon-browser.ts        # Client-side App for icon browser UI
│   ├── icon-data.ts           # Curated Azure icon catalog
│   ├── intent-app.ts          # Client-side App for intent capture UI
│   ├── intent-store.ts        # Reads/writes intent.json files
│   ├── manifest-cache.ts      # Fetches + caches Coherence manifest from CDN
│   ├── svg-cache.ts           # Fetches + caches SVG icons
│   ├── theme-cache.ts         # Fetches + caches theme CSS, parses tokens
│   ├── token-browser.ts       # Client-side App for token browser UI
│   ├── verification-report.ts # Client-side App for scorecard UI
│   └── verification-scorecard-store.ts # Reads verification snapshots/history
```

### Data Flow

- **Live from CDN** (cached 1hr): Component manifest JSON + theme CSS
- **From GitHub API** (on demand): Experiment source files, shared patterns, experiment registry
- **From local disk**: Intent documents, verification reports (via `EXPERIMENTS_DIR` env var)

## Example Prompts

Once connected, try these in Claude:

- *"Browse design tokens"* — opens the interactive token browser
- *"Find an icon for networking"* — opens the visual icon picker
- *"Open the verification report for network-security-dashboard"* — opens the scorecard viewer
- *"Show me the PageHeader pattern"* — fetches shared pattern source from GitHub
- *"List all experiments"* — shows available prototypes with metadata
- *"Get the source for the cost-management experiment"* — fetches full experiment files
- *"Initialize a new workspace"* — bootstraps a standalone project with Vite + shared patterns
