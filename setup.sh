#!/usr/bin/env bash
set -euo pipefail

# VibeAzure Developer Setup
# Configures npm auth for the private @charm-ux feed, then installs all dependencies.
# Usage:
#   ./setup.sh          # Full setup (check + install)
#   ./setup.sh --check  # Check prerequisites only (no changes made)

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CHECK_ONLY=false
if [[ "${1:-}" == "--check" ]]; then
  CHECK_ONLY=true
fi

FEED_URL="pkgs.dev.azure.com/charm-pilot/charm-pilot/_packaging/charm-feed/npm"
NPMRC="$HOME/.npmrc"

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

  # ── Azure Artifacts feed auth ──
  local npmrc_found=false
  if grep -q "$FEED_URL" "$NPMRC" 2>/dev/null; then
    npmrc_found=true
  elif grep -q "$FEED_URL" "$SCRIPT_DIR/coherence-preview/.npmrc" 2>/dev/null; then
    npmrc_found=true
  fi
  if $npmrc_found; then
    echo "  ✅  Azure Artifacts feed credentials — configured"
    ((pass++))
  else
    echo "  ❌  Azure Artifacts feed credentials — not found"
    echo "      You need a PAT from https://dev.azure.com/charm-pilot/_usersSettings/tokens"
    echo "      The setup script (./setup.sh) will configure this for you"
    ((fail++))
  fi

  # ── coherence-preview node_modules ──
  if [ -d "$SCRIPT_DIR/coherence-preview/node_modules/@charm-ux" ]; then
    local cui_ver
    cui_ver=$(node -e "console.log(require('$SCRIPT_DIR/coherence-preview/node_modules/@charm-ux/cui/package.json').version)" 2>/dev/null || echo "unknown")
    echo "  ✅  coherence-preview — installed (@charm-ux/cui v$cui_ver)"
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
    ((warn++))
  fi

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
# 2. Configure npm auth for @charm-ux feed
# ──────────────────────────────────────────────

FEED_URL="pkgs.dev.azure.com/charm-pilot/charm-pilot/_packaging/charm-feed/npm"
NPMRC="$HOME/.npmrc"

# Check if auth is already configured
if grep -q "$FEED_URL" "$NPMRC" 2>/dev/null; then
  echo "✅  Azure Artifacts feed already configured in ~/.npmrc"
else
  echo ""
  echo "The @charm-ux/cui package lives in a private Azure Artifacts feed."
  echo "You need a Personal Access Token (PAT) with Packaging > Read scope."
  echo ""
  echo "  1. Go to: https://dev.azure.com/charm-pilot/_usersSettings/tokens"
  echo "  2. Create a token with Packaging → Read"
  echo "  3. Paste it below"
  echo ""
  read -rsp "PAT> " PAT
  echo ""

  if [ -z "$PAT" ]; then
    echo "❌  No PAT provided. Exiting."
    exit 1
  fi

  B64=$(echo -n "$PAT" | base64)

  # Append to ~/.npmrc
  {
    echo ""
    echo "; ── @charm-ux Azure Artifacts feed (added by VibeAzure setup) ──"
    echo "//$FEED_URL/registry/:username=azdo"
    echo "//$FEED_URL/registry/:_password=$B64"
    echo "//$FEED_URL/registry/:email=setup@vibeazure"
    echo "//$FEED_URL/registry/:always-auth=true"
    echo "//$FEED_URL/:username=azdo"
    echo "//$FEED_URL/:_password=$B64"
    echo "//$FEED_URL/:email=setup@vibeazure"
    echo "//$FEED_URL/:always-auth=true"
  } >> "$NPMRC"

  echo "✅  Azure Artifacts credentials written to ~/.npmrc"
fi

# ──────────────────────────────────────────────
# 3. Write project-level .npmrc files (registry only, no secrets)
# ──────────────────────────────────────────────

PREVIEW_NPMRC="$SCRIPT_DIR/coherence-preview/.npmrc"
cat > "$PREVIEW_NPMRC" <<EOF
@charm-ux:registry=https://$FEED_URL/registry/
always-auth=true
EOF
echo "✅  coherence-preview/.npmrc written (registry pointer)"

# ──────────────────────────────────────────────
# 4. Install coherence-preview
# ──────────────────────────────────────────────

echo ""
echo "📦  Installing coherence-preview dependencies..."
cd "$SCRIPT_DIR/coherence-preview"
npm install
echo "✅  coherence-preview ready"

# ──────────────────────────────────────────────
# 5. Install mcp-server
# ──────────────────────────────────────────────

echo ""
echo "📦  Installing mcp-server dependencies..."
cd "$SCRIPT_DIR/mcp-server"
npm install
echo "✅  mcp-server ready"

# ──────────────────────────────────────────────
# 6. Build mcp-server
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
