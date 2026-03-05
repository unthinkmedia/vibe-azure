---
name: visual-ingest
description: "Ingest a visual reference from a live web page or Figma URL to create a starting-point replica before entering the intent phase. Supports both brownfield (URL provided) and greenfield (no URL) scenarios. Triggers on: any request that includes a URL to azure.microsoft.com, portal.azure.com, or figma.com, OR when the orchestrator dispatches with a referenceUrl. Also triggers on: 'ingest this page', 'use this as a starting point', 'replicate this page', 'capture this page', 'import from URL'. Do NOT build anything — produce a structured visual reference document that feeds into the intent phase."
---

# Visual Ingest

**YOUR ONLY GOAL: Capture a structured visual reference from a URL and hand it to the intent phase. Do NOT write any experiment code.**

You are a pre-phase in the experiment lifecycle. When the user provides a URL (web page or Figma), you capture the visual design, analyze its structure, map elements to Coherence components, and produce a reference document that pre-populates the intent form. In greenfield mode (no URL), you are skipped entirely — the orchestrator goes straight to the intent phase.

## URL Classification

Classify the input URL to determine the capture strategy:

| URL Pattern | Type | Capture Method | Auth Required? |
|-------------|------|----------------|----------------|
| `figma.com/design/*`, `figma.com/file/*` | Figma | Figma MCP tools | No (MCP handles auth) |
| `figma.com/board/*` | FigJam | `mcp_figma_get_figjam` | No |
| `portal.azure.com/*` | Azure Portal | agent-browser (interactive auth) | **Yes** — user logs in manually |
| `azure.microsoft.com/*` | Azure Marketing | agent-browser (public or auth) | Maybe — some pages are public |
| `*.azure.com/*` | Azure Service | agent-browser (interactive auth) | **Yes** |
| Any other URL | Generic Web | agent-browser | Depends on site |

## Workflow

### Step 0: Detect Input Type

Parse the user's message for URLs. If multiple URLs are provided, process only the first one and ask about the rest.

- **No URL found** → This skill does not apply. Tell the orchestrator to proceed with greenfield INTENT.
- **Figma URL found** → Go to Step 1A (Figma Capture)
- **Web URL found** → Go to Step 1B (Web Capture)

### Step 1A: Figma Capture

Use the existing Figma MCP tools. This path is well-established:

1. Call `mcp_figma_get_design_context` with the extracted `fileKey` and `nodeId`
2. Call `mcp_figma_get_screenshot` for a pixel-level visual reference
3. Optionally call `mcp_figma_get_metadata` for file overview and node names
4. Proceed to Step 2 (Analysis) with the Figma data

**URL Parsing:**
- `figma.com/design/:fileKey/:fileName?node-id=:nodeId` → convert `-` to `:` in nodeId
- `figma.com/design/:fileKey/branch/:branchKey/:fileName` → use branchKey as fileKey

### Step 1B: Web Capture (agent-browser)

Use `agent-browser` CLI to capture the live web page. Azure pages require Microsoft Entra ID (AAD) authentication, which **will not work inside VS Code's embedded Simple Browser** due to Microsoft's internal security policies. The browser **must** open externally as a standalone Chromium window.

#### ⚠️ CRITICAL: External Browser Required for Azure Auth

Microsoft's SSO and Entra ID authentication flows are blocked in embedded webviews (VS Code Simple Browser, iframe-based browsers, electron webviews). You **MUST** use `agent-browser --headed` which launches a real, external Chromium browser window that supports:
- Microsoft Entra ID / AAD login
- Multi-factor authentication (MFA / Authenticator prompts)
- Conditional access policies
- Certificate-based authentication

**NEVER** use VS Code's Simple Browser, `open_browser_page`, or any embedded browser for Azure URL captures. Always use `agent-browser --headed`.

#### 1B.1: Open the Page in External Browser

```bash
# MUST use --headed to open a real external Chromium window (not embedded in VS Code)
# MUST use --session to persist auth state across captures
agent-browser --session azure-ingest --headed open "<url>"
```

> _"I'm opening an external browser window for `<url>`. Since this is an Azure page, you'll need to authenticate with your Microsoft account. Please log in when the browser opens — I'll wait for you."_

**STOP AND WAIT** for the user to confirm they've logged in. Do NOT proceed until they confirm.

#### 1B.2: Confirm Authentication

After the user confirms they've logged in:

```bash
# Wait for the page to finish loading after auth
agent-browser --session azure-ingest wait --load networkidle
```

Then verify the page loaded successfully (not stuck on a login screen):

```bash
agent-browser --session azure-ingest get url
```

Check the returned URL:
- If it contains `login.microsoftonline.com`, `login.live.com`, `adfs`, or `devicelogin` → auth is not complete. Tell the user:
  > _"It looks like authentication isn't complete yet — the browser is still on the login page. Please finish logging in and let me know."_
- If it matches the original target URL (or a portal/service URL) → auth succeeded, proceed to capture.

**Session persistence:** The `azure-ingest` session persists cookies and auth tokens. Once the user authenticates once, subsequent captures in the same session skip the login flow — the external browser reopens already authenticated.

#### 1B.3: Capture the Page

Once the page is loaded and authenticated:

```bash
# Full-page screenshot for visual reference
agent-browser --session azure-ingest screenshot --full /tmp/visual-ingest-capture.png

# Annotated screenshot with numbered element labels
agent-browser --session azure-ingest screenshot --annotate /tmp/visual-ingest-annotated.png

# Accessibility tree with interactive elements (structured DOM representation)
agent-browser --session azure-ingest snapshot -i > /tmp/visual-ingest-snapshot.txt

# Page title and URL (may have redirected)
agent-browser --session azure-ingest get title
agent-browser --session azure-ingest get url
```

#### 1B.4: Capture Additional Sections (if needed)

For pages with tabs, collapsible sections, or scrollable areas:

```bash
# Scroll to capture below-the-fold content
agent-browser --session azure-ingest scroll down 800
agent-browser --session azure-ingest screenshot /tmp/visual-ingest-scrolled.png
agent-browser --session azure-ingest snapshot -i > /tmp/visual-ingest-snapshot-scrolled.txt
```

#### 1B.5: Extract Structured Data

```bash
# Get all visible text content
agent-browser --session azure-ingest get text body > /tmp/visual-ingest-text.txt
```

#### 1B.6: Keep the Session Alive

Do NOT close the browser. The session stays open so:
- The user can re-capture after navigating to a sub-page
- Auth state is preserved for future captures
- The builder skill can reference back to the live page if needed

### Step 2: Structural Analysis

Analyze the captured data (from either Figma or web capture) to produce a structured reference document. Walk through the visual reference systematically:

#### 2A: Page Layout Analysis

Determine the high-level page structure:

- **Layout type:** Side panel (resource page with section nav) vs Full width (home, create, browse)
- **Grid structure:** How many columns? Sidebar width? Content area divisions?
- **Vertical sections:** Header → breadcrumb → title → toolbar → content → footer
- **Responsive behavior:** (if visible from the capture)

#### 2B: Component Inventory

For every visible UI element, identify:

1. **What it is** — description (e.g., "navigation sidebar with 12 items grouped into 3 sections")
2. **Nearest `cui-*` component** — the Coherence component that would render this (e.g., `CuiSideNav` + `CuiNavItem` + `CuiNavGroup`)
3. **Position in layout** — where it sits in the page hierarchy
4. **Interaction state** — is it selected, expanded, disabled, loading?

Use this mapping table for common Azure portal elements:

| Azure Portal Element | Coherence Component |
|----------------------|---------------------|
| Left resource navigation | `CuiSideNav` + `CuiNavItem` inside `slot="main"` flex |
| Top command bar / toolbar | `CuiToolbar` + `CuiButton` |
| Resource header with icon | Shared `PageHeader` pattern |
| Breadcrumb trail | `CuiBreadcrumb` + `CuiBreadcrumbItem` |
| Properties / essentials panel | Custom grid with `CuiLabel` |
| Data grid / table | `CuiDataGrid` or `CuiTable` |
| Tab strip | `CuiTabs` + `CuiTab` + `CuiTabPanel` |
| Status badges (Running, Stopped) | `CuiTag` or `CuiBadge` |
| Message bars / banners | `CuiMessageBar` or `CuiBanner` |
| Filter/search box | `CuiSearchBox` |
| Dropdown selectors | `CuiSelect` or `CuiComboBox` |
| Toggle switches | `CuiSwitch` |
| Cards / tiles | `CuiCard` |
| Dialog / modal | `CuiDialog` |
| Charts / metrics | Custom with Coherence tokens |
| Action menu / context menu | `CuiMenu` + `CuiMenuItem` |
| Tree view / hierarchy | `CuiTree` + `CuiTreeItem` |
| Pagination | `CuiPagination` |

#### 2C: Content Extraction

Extract the actual content visible on the page:

- **Navigation items** — exact labels, groupings, icons
- **Table columns** — headers, sample data rows
- **Metric values** — KPI names, values, units
- **Labels and headings** — text content at each level
- **Status indicators** — what statuses are shown, their visual treatment
- **Action buttons** — labels, placement, primary vs secondary

#### 2D: Visual Properties (from screenshots)

Note visual properties that map to Coherence design tokens:

- **Colors** — backgrounds, text, borders, status colors → nearest Coherence token
- **Spacing** — gaps between sections, padding within cards → nearest Coherence spacing token
- **Typography** — heading sizes, body text, labels → nearest Coherence font token
- **Shadows** — card elevation, dropdown shadows → nearest Coherence shadow token
- **Borders** — separator lines, card borders → nearest Coherence stroke token

### Step 3: Build the Reference Document

Assemble the analysis into a structured reference document. This document is the primary input for the intent phase.

```json
{
  "sourceType": "web" | "figma",
  "sourceUrl": "<original URL>",
  "capturedAt": "<ISO timestamp>",
  "screenshotPath": "/tmp/visual-ingest-capture.png",
  "annotatedScreenshotPath": "/tmp/visual-ingest-annotated.png",

  "layout": {
    "type": "side-panel" | "full-width" | "service-blade",
    "description": "Resource overview page with 220px section nav on the left, content area fills remaining width",
    "gridStructure": "flex row: nav (220px fixed) + content (flex: 1)"
  },

  "componentInventory": [
    {
      "element": "Left navigation sidebar",
      "cuiComponent": "CuiSideNav + CuiNavItem",
      "details": "12 items in 3 groups: Overview, Settings (5 items), Monitoring (6 items)",
      "position": "Left column, full height below header"
    }
  ],

  "content": {
    "title": "my-web-app - Overview",
    "breadcrumb": ["Home", "App Services", "my-web-app"],
    "navigationItems": [
      { "group": null, "items": ["Overview", "Activity log", "Access control (IAM)"] },
      { "group": "Settings", "items": ["Configuration", "Authentication", "Networking"] }
    ],
    "tableColumns": ["Name", "Status", "Region", "Resource Group"],
    "metrics": [{ "name": "Requests", "value": "1.2K", "trend": "up" }],
    "actions": ["Start", "Stop", "Restart", "Delete", "Swap"]
  },

  "visualProperties": {
    "colors": { "headerBg": "var(--neutral-background1)", "navBg": "var(--neutral-background2)" },
    "spacing": { "navWidth": "220px", "contentPadding": "24px", "cardGap": "16px" },
    "typography": { "pageTitle": "var(--font-size-base500) semibold", "sectionLabel": "var(--font-size-base200) uppercase" }
  }
}
```

### Step 4: Generate Intent Prefill Values

From the reference document, derive the prefill values for the `design_intent` MCP tool:

| Intent Field | Derived From |
|--------------|-------------|
| `prefillExperimentId` | URL path segment or page title, kebab-cased |
| `prefillTitle` | Page title from capture |
| `prefillVision` | "A Coherence-based replica of [page title] featuring [key components list]" |
| `prefillProblem` | "Need a prototype starting point based on the existing [source] design" |
| `prefillSuccessCriteria` | One criterion per major UI section identified |
| `prefillConstraints` | Layout constraint + "Brownfield: replicate existing [source] design as starting point" |

**For web captures**, use the new web reference fields:
| Field | Value |
|-------|-------|
| `prefillWebUrl` | The original URL |
| `prefillWebContext` | The full reference document (JSON stringified from Step 3) |

**For Figma captures**, use the existing Figma reference fields:
| Field | Value |
|-------|-------|
| `prefillFigmaUrl` | The Figma URL |
| `prefillFigmaMode` | `"import"` (brownfield always starts as import — user can change to reference in the intent form) |
| `prefillFigmaContext` | The Figma-specific design spec |

### Step 5: Hand Off to Intent Phase

Pass all prefill values to the orchestrator/design-intent skill. The intent form opens pre-populated with the visual reference data. The user reviews, adjusts, and confirms.

> _"I've captured and analyzed the page at `<url>`. The intent form is pre-populated with the page structure, components, and content I found. Review and adjust the intent — changes are auto-saved."_

**STOP HERE.** This skill's job is done. The intent phase takes over.

## Hard Boundaries

- **Do NOT** create `.tsx`, `.ts`, or `.css` experiment files
- **Do NOT** edit `main.tsx`
- **Do NOT** write mock data files
- **Do NOT** skip to building — you only produce the reference document and prefill values
- **Do NOT** close the browser session after capture (keep it for re-reference)
- **Do NOT** store or log any authentication credentials — the user authenticates interactively

## Session Persistence

The `azure-ingest` browser session persists auth state across captures. If the user wants to capture multiple pages from the same Azure subscription, subsequent captures skip the auth flow.

To clear the session:
```bash
agent-browser state clear azure-ingest
```

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Auth fails in VS Code browser | **NEVER use VS Code's Simple Browser for Azure URLs.** Always use `agent-browser --headed` which opens an external Chromium window. Microsoft Entra ID blocks embedded webviews. |
| Page requires MFA | User completes MFA in the external browser window (Authenticator push, SMS, etc.), then confirms in chat |
| Conditional Access blocks login | The external Chromium window supports CA policies. If blocked, the user may need to use a compliant device or network |
| Page loads slowly | Increase wait: `agent-browser --session azure-ingest wait 5000` then re-snapshot |
| Snapshot is a login page | Auth didn't complete. Ask user to finish login, wait for confirmation, check URL, re-snapshot |
| Page has dynamic content (loading spinners) | Wait for network idle: `agent-browser --session azure-ingest wait --load networkidle` |
| Figma URL malformed | Check URL parsing rules in Step 1A |
| Screenshot is blank | Page may use canvas rendering — fall back to snapshot-only analysis |
| Portal uses iframe-heavy layout | Snapshot each iframe separately if needed |
| Session expired between captures | User re-authenticates in the external browser — session cookies auto-update |
