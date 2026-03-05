#!/usr/bin/env bash
set -euo pipefail

# VibeAzure Developer Setup
# Installs all dependencies — no private feed auth required.
# Coherence (CUI) components are loaded from the public CDN at runtime.
# Usage:
#   ./setup.sh          # Full setup (check + install)
#   ./setup.sh --check  # Check prerequisites only (no changes made)

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CHECK_ONLY=false
if [[ "${1:-}" == "--check" ]]; then
  CHECK_ONLY=true
fi

# ──────────────────────────────────────────────
# Prerequisite Check
# ──────────────────────────────────────────────

run_checks() {
  local pass=0
  local fail=0
  local warn=0

  echo ""
  echo "╔══════════════════════════════════════════╗"
  echo "║   VibeAzure — Environment Check            ║"
  echo "╚══════════════════════════════════════════╝"
  echo ""

  # ── Git ──
  if command -v git &>/dev/null; then
    echo "  ✅  git $(git --version | sed 's/git version //')"
    ((pass++))
  else
    echo "  ❌  git — not installed"
    echo "      Install: https://git-scm.com/downloads"
    ((fail++))
  fi

  # ── Node.js ──
  if command -v node &>/dev/null; then
    local nv
    nv=$(node -v | sed 's/v//')
    local major
    major=$(echo "$nv" | cut -d. -f1)
    if [ "$major" -ge 18 ]; then
      echo "  ✅  node v$nv"
      ((pass++))
    else
      echo "  ❌  node v$nv — requires >= 18.14.1"
      echo "      Upgrade: nvm install 18  or  https://nodejs.org"
      ((fail++))
    fi
  else
    echo "  ❌  node — not installed"
    echo "      Install: https://nodejs.org or nvm (https://github.com/nvm-sh/nvm)"
    ((fail++))
  fi

  # ── npm ──
  if command -v npm &>/dev/null; then
    echo "  ✅  npm $(npm -v)"
    ((pass++))
  else
    echo "  ❌  npm — not installed (comes with Node.js)"
    ((fail++))
  fi

  # ── coherence-preview node_modules ──
  if [ -d "$SCRIPT_DIR/coherence-preview/node_modules" ]; then
    echo "  ✅  coherence-preview — dependencies installed (CUI loaded from CDN)"
    ((pass++))
  else
    echo "  ❌  coherence-preview — dependencies not installed"
    echo "      Run: cd coherence-preview && npm install"
    ((fail++))
  fi

  # ── mcp-server node_modules ──
  if [ -d "$SCRIPT_DIR/mcp-server/node_modules" ]; then
    echo "  ✅  mcp-server — dependencies installed"
    ((pass++))
  else
    echo "  ❌  mcp-server — dependencies not installed"
    echo "      Run: cd mcp-server && npm install"
    ((fail++))
  fi

  # ── mcp-server build ──
  if [ -f "$SCRIPT_DIR/mcp-server/dist/main.js" ]; then
    echo "  ✅  mcp-server — built (dist/main.js exists)"
    ((pass++))
  else
    echo "  ⚠️   mcp-server — not built (dist/main.js missing)"
    echo "      Run: cd mcp-server && npm run build"
    ((warn++))
  fi

  # ── Optional: pnpm ──
  if command -v pnpm &>/dev/null; then
    local pv
    pv=$(pnpm -v)
    local pmajor
    pmajor=$(echo "$pv" | cut -d. -f1)
    if [ "$pmajor" -eq 9 ]; then
      echo "  ✅  pnpm v$pv (for charm-pilot source builds)"
    else
      echo "  ⚠️   pnpm v$pv — charm-pilot requires v9"
      echo "      Upgrade: npm i -g pnpm@latest-9"
      ((warn++))
    fi
  else
    echo "  ⚠️   pnpm — not installed (only needed for charm-pilot source builds)"
    ((warn++))
  fi

  # ── Optional: Figma token ──
  if [ -n "${FIGMA_ACCESS_TOKEN:-}" ]; then
    echo "  ✅  FIGMA_ACCESS_TOKEN — set"
  else
    echo "  ⚠️   FIGMA_ACCESS_TOKEN — not set (optional, for Figma MCP integration)"
    echo "      Set in your shell profile: export FIGMA_ACCESS_TOKEN=your-token"
    ((warn++))
  fi

  # ── MCP servers (informational) ──
  echo ""
  echo "  MCP Server Status:"

  # Playwright MCP — verify npx can resolve the package
  if npx -y @playwright/mcp@latest --help &>/dev/null 2>&1; then
    echo "  ✅  Playwright MCP — available (@playwright/mcp)"
  else
    echo "  ⚠️   Playwright MCP — not cached yet (will auto-install on first MCP start via npx)"
    ((warn++))
  fi

  echo "  ✅  Coherence Prototyper MCP — configured via .vscode/mcp.json"
  echo "  ✅  Figma MCP — configured via .vscode/mcp.json (requires FIGMA_ACCESS_TOKEN)"

  # ── Summary ──
  echo ""
  echo "────────────────────────────────────────────"
  if [ "$fail" -eq 0 ]; then
    echo "  ✅  All required checks passed ($pass passed, $warn optional warnings)"
    echo "      Environment is ready!"
  else
    echo "  ❌  $fail required check(s) failed ($pass passed, $warn optional warnings)"
    echo "      Fix the items above, then re-run:  ./setup.sh --check"
  fi
  echo "────────────────────────────────────────────"
  echo ""

  return "$fail"
}

# If --check flag, run checks and exit
if $CHECK_ONLY; then
  run_checks || true
  exit 0
fi

# ──────────────────────────────────────────────
# Full Setup
# ──────────────────────────────────────────────

echo ""
echo "╔══════════════════════════════════════════╗"
echo "║   VibeAzure — Developer Environment Setup  ║"
echo "╚══════════════════════════════════════════╝"
echo ""

# ──────────────────────────────────────────────
# 1. Check prerequisites
# ──────────────────────────────────────────────

check_command() {
  if ! command -v "$1" &>/dev/null; then
    echo "❌  $1 is required but not installed."
    echo "   $2"
    exit 1
  fi
}

check_command node "Install via https://nodejs.org or nvm (https://github.com/nvm-sh/nvm)"
check_command npm  "Comes with Node.js — install Node first"

NODE_VERSION=$(node -v | sed 's/v//')
NODE_MAJOR=$(echo "$NODE_VERSION" | cut -d. -f1)
if [ "$NODE_MAJOR" -lt 18 ]; then
  echo "❌  Node.js >= 18.14.1 required (found v$NODE_VERSION)"
  exit 1
fi
echo "✅  Node.js v$NODE_VERSION"

# ──────────────────────────────────────────────
# 2. Install coherence-preview (no private feed — CUI loaded from CDN)
# ──────────────────────────────────────────────

echo ""
echo "📦  Installing coherence-preview dependencies..."
cd "$SCRIPT_DIR/coherence-preview"
npm install
echo "✅  coherence-preview ready"

# ──────────────────────────────────────────────
# 3. Install mcp-server
# ──────────────────────────────────────────────

echo ""
echo "📦  Installing mcp-server dependencies..."
cd "$SCRIPT_DIR/mcp-server"
npm install
echo "✅  mcp-server ready"

# ──────────────────────────────────────────────
# 4. Build mcp-server
# ──────────────────────────────────────────────

echo ""
echo "🔨  Building mcp-server..."
npm run build
echo "✅  mcp-server built"

# ──────────────────────────────────────────────
# Done
# ──────────────────────────────────────────────

echo ""
echo "════════════════════════════════════════════"
echo "  Setup complete! Next steps:"
echo ""
echo "  Preview app:   cd coherence-preview && npm run dev"
echo "  MCP server:    Restart VS Code — it auto-starts via .vscode/mcp.json"
echo ""
echo "  (Optional) charm-pilot library:"
echo "    npm i -g pnpm@latest-9"
echo "    cd charm-pilot && pnpm install && pnpm build"
echo "════════════════════════════════════════════"
