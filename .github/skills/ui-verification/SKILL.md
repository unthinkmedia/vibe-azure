---
name: ui-verification
description: "Verify custom UI components against Coherence styling standards before finalizing. Automatically runs after creating or modifying custom UI (non-standard components, custom layouts, token overrides). Checks spacing, typography, colors, borders, shadows, interaction states, accessibility, and layout conventions against three authoritative sources: the styling standards registry, the live API manifest, and the theme CSS. Includes a visual verification step using Playwright (browser_navigate, browser_snapshot, browser_take_screenshot, browser_evaluate) and VS Code's Simple Browser to confirm rendered output matches standards at runtime. When no standard exists for a decision, asks the user whether to save it as a new standard for future components."
---

# UI Verification

Two-phase verification for any custom UI built with Coherence components:

1. **Custom Code Audit** (Step 0) — scan for custom HTML/CSS that should use native components, existing patterns, or established experiment approaches
2. **Static analysis** (Steps 1–5) — scan source code against the styling standards registry, manifest API, and theme CSS
3. **Visual verification** (Step 6) — render the component in the Playwright browser and VS Code Simple Browser, then extract computed styles, check the accessibility tree, take screenshots, and test interactive states

Ensures consistency with established standards and captures new decisions for future use.

## When This Skill Triggers

Run this verification **every time** custom UI is created or modified, including:
- New experiment files in `coherence-preview/src/experiments/`
- New pattern files in `.github/skills/coherence-ui/references/patterns/`
- Any custom component, layout, or composition using `@charm-ux/cui` components
- Token overrides or custom CSS applied to Coherence components

## Data Sources (Consult All Three)

Verification requires cross-referencing **all three sources** — not just the standards file:

| Source | What it provides | How to access |
|--------|-----------------|---------------|
| **1. Styling Standards Registry** | Codified spacing/color/typography/border/state/layout/a11y rules | Read `.github/skills/coherence-ui/references/styling-standards.md` |
| **2. Live API Manifest** | Exact component attributes, CSS custom properties (with names & types), slots, events, dependencies | Fetch `https://coherence-ftekb0dcfpcjb3gv.b02.azurefd.net/cdn/latest/custom-elements.json` |
| **3. Theme CSS** | All 578+ design token names and values (colors, fonts, spacing, shadows, borders, animation) | Fetch `https://coherence-ftekb0dcfpcjb3gv.b02.azurefd.net/cdn/latest/themes/cui/theme.css` |

Additionally, consult these when relevant:

| Source | When to use | Location |
|--------|-------------|----------|
| **Component Reference Docs** | Dos/don'ts, anatomy, accessibility rules, code examples for a specific component | `.github/skills/coherence-ui/references/components/<component>.md` |
| **Existing Patterns** | Verify against proven compositions (header, toolbar, side nav, service card, info bar) | `.github/skills/coherence-ui/references/patterns/<pattern>.md` |
| **Template Guidance** | Layout rules for dashboard, form, settings page types | `.github/skills/coherence-ui/references/templates/<template>.md` |
| **UX Guides** | Accessibility, AI patterns, data viz, writing guidelines | `.github/skills/coherence-ui/references/guides/<guide>.md` |

## Required Steps

### Step 0: Custom Code Audit — "Should This Be Custom?"

Before checking styling standards, audit every piece of custom code for **unnecessary reinvention**. This is the most impactful check — it catches the #1 recurring mistake (building custom UI when a native component or shared pattern already exists).

#### 0a. Scan for Custom HTML That Should Be a Native Component

Read through each file in the experiment. For every custom HTML element (`<div>`, `<span>`, `<button>`, `<ul>`, `<table>`, etc.) that renders visible UI, ask: **"Does a `cui-*` component already do this?"**

Fetch the manifest and search for components whose description or tag matches the function. Common misses:

| Custom code pattern | Should be | Component |
|---|---|---|
| Custom pill/chip `<button>` or `<span>` with `border-radius` | `CuiTag` (circular, outline) | `cui-tag` |
| Custom toggle switch | `CuiSwitch` | `cui-switch` |
| Custom tooltip `<div>` on hover | `CuiTooltip` | `cui-tooltip` |
| Custom dropdown/select `<div>` | `CuiSelect` or `CuiMenu` | `cui-select` / `cui-menu` |
| Custom progress indicator | `CuiProgressBar` or `CuiSpinner` | `cui-progress-bar` / `cui-spinner` |
| Custom tab bar | `CuiTabs` + `CuiTab` + `CuiTabPanel` | `cui-tabs` |
| Custom data table `<table>` | `CuiTable` or `CuiDataGrid` | `cui-table` / `cui-data-grid` |
| Custom dialog/modal `<div>` | `CuiDialog` | `cui-dialog` |
| Custom icon `<img>` or `<svg>` | `CuiIcon` (with name or url) | `cui-icon` |
| Custom badge/status indicator | `CuiBadge` | `cui-badge` |
| Custom search input | `CuiSearchBox` | `cui-search-box` |
| Custom accordion/collapsible | `CuiAccordion` + `CuiAccordionItem` | `cui-accordion` |
| Custom breadcrumb trail | `CuiBreadcrumb` + `CuiBreadcrumbItem` | `cui-breadcrumb` |
| Custom message/alert banner | `CuiMessageBar` | `cui-message-bar` |

**Action:** For each match, replace the custom code with the native component. Read the component's reference doc for correct usage.

#### 0b. Scan for Code That Should Use a Shared Pattern

List `coherence-preview/src/patterns/` and check whether any shared pattern component already handles what you built. Key patterns to check:

| Custom code pattern | Shared pattern | Import path |
|---|---|---|
| Title row with icon/star/actions | `PageHeader` | `../../patterns/PageHeader` |
| Copilot suggestion pills | `CopilotSuggestions` (or `copilotSuggestions` prop on `PageHeader`) | `../../patterns/CopilotSuggestions` |
| Header Copilot button | `CopilotButton` | `../copilot-button` |
| Resource card with icon + title + action footer | `ServiceCard` pattern | Check `PatternServiceCard.tsx` |
| SVG donut/gauge chart | `DonutGauge` pattern | Check `PatternDonutGauge.tsx` |

Also read the `references/patterns/*.md` docs from the coherence-ui skill to check for documented patterns that may not have a shared component yet.

**Action:** Replace custom implementations with the shared pattern. If no shared pattern exists but the code is reusable, consider creating one via the pattern-creator skill.

#### 0c. Compare Against Similar Experiments

Browse `coherence-preview/src/experiments/` and identify experiments with similar page structure or content. Read their code to check:

- **Layout approach** — Do similar pages use the same grid/flex structure? If existing experiments use a 2-column grid with `grid-template-columns: 1fr 1fr`, don't invent a different approach.
- **Component composition** — Do existing experiments compose the same components the same way? Follow established patterns.
- **Data modeling** — Do existing `data.ts` files export the same shape (e.g., `navSections`, `copilotSuggestions`)? Follow the convention.
- **Style organization** — Do existing `styles.ts` files use the same class naming and structure?

**Action:** Align with existing experiment conventions wherever possible. Diverge only when the page genuinely requires a different approach.

#### 0d. Report Audit Findings

Present the audit as a table:

```markdown
## Custom Code Audit

| Custom code | File:Line | Verdict | Action |
|---|---|---|---|
| `<button className="copilot-pill">` | index.tsx:85 | ❌ Should be `CuiTag` via `CopilotSuggestions` pattern | Replace with `PageHeader copilotSuggestions={[...]}` |
| `<div className="service-row">` | PageContent.tsx:42 | ✅ No native component for this layout | Keep — verified against apis-page experiment |
| Custom sidebar category links | PageContent.tsx:15 | ⚠️ Could use `CuiSideNav` | Evaluate — sidebar here is categories, not navigation |
```

Fix all ❌ items before proceeding to Step 1.

### Step 1: Load All Sources

1. Read the **styling standards registry** at `.github/skills/coherence-ui/references/styling-standards.md`
2. For any `cui-*` component used in the custom UI, look up its **CSS Custom Properties** in the manifest — verify that custom code isn't redefining properties the component already exposes
3. If the custom UI uses colors, spacing, or typography values, confirm they exist in the **theme CSS** token list
4. If a specific component has a **reference doc** (66 components do), read it for dos/don'ts and accessibility requirements

### Step 2: Run the Verification Checklist

For each piece of custom UI, verify **every category** below. Report a table of findings with ✅ (pass), ⚠️ (no standard exists), or ❌ (violates standard).

#### 2a. CSS Custom Property Naming

Cross-reference against the **manifest** to check for conflicts.

| What to check | Expected | Source |
|----------------|----------|--------|
| Token follows naming pattern | `--{component}-{subpart?}-{state?}-{css-property}` | Standards §1 |
| Suffix uses standard abbreviations | `-bg-color`, `-fg-color`, `-border-color`, `-padding-x/y`, `-font-size`, `-font-weight`, `-line-height`, `-border-radius`, `-shadow` | Standards §1 |
| No camelCase in names | kebab-case only | Standards §1 |
| Not duplicating manifest property | Fetch manifest → check component's `cssProperties` array | Manifest |
| Reusable component tokens default to | `inherit` on `:host` | Standards §1 |

#### 2b. Color Check

Cross-reference against both the **standards** and **theme CSS** token list.

| What to check | Expected | Source |
|----------------|----------|--------|
| No hardcoded colors | No `#hex`, `rgb()`, `hsl()`, named colors | Standards §2 |
| Text color hierarchy | `--neutral-foreground-{1,2,3}` for primary/secondary/tertiary | Standards §2 + Theme CSS |
| Background surfaces | `--neutral-background-{1-6}` appropriately | Standards §2 + Theme CSS |
| Token actually exists | Verify token name in theme CSS — typos cause silent failures | Theme CSS |
| State triad complete | `bg-color` + `fg-color` + `border-color` for rest/hover/focus/active/disabled | Standards §2 |
| High-contrast support | `@media (forced-colors: active)` for interactive custom elements | Standards §2 |
| Contrast ratios | Text ≥ 4.5:1, icons ≥ 3:1 against background | Accessibility guide |

#### 2c. Typography Check

Cross-reference against **theme CSS** font token names.

| What to check | Expected | Source |
|----------------|----------|--------|
| Page titles | `var(--font-size-base500)` + `var(--font-weight-semi-bold)` | Standards §3 |
| Section headings | `var(--font-size-base400)` + `var(--font-weight-semi-bold)` | Standards §3 |
| Card/item titles | `var(--font-size-base300)` + `var(--font-weight-semi-bold)` | Standards §3 |
| Caption/secondary text | `var(--font-size-base200)` | Standards §3 |
| No hardcoded font-size | Use `var(--font-size-base-*)` or `var(--font-size-hero-*)` | Standards §3 + Theme CSS |
| No hardcoded font-weight | Use `var(--font-weight-*)` tokens | Standards §3 + Theme CSS |
| font-family never set | Inherited from `--body-font-family` / `--font-family-base` | Standards §3 |
| Interactive controls | `line-height: 1` internally | Standards §3 |
| Token exists in theme | Verify spelling: `--font-size-base300` not `--font-size-300` | Theme CSS |

#### 2d. Spacing Check

| What to check | Expected | Source |
|----------------|----------|--------|
| Spacing values on-scale | `4px`, `8px`, `12px`, `16px`, `24px`, `32px` | Standards §4 |
| Page horizontal gutters | `32px` consistently | Standards §4 (Resource Page Shell) |
| Breadcrumb padding | `8px 32px 0` | Standards §4 |
| Page header padding | `16px 32px 0` | Standards §4 |
| Toolbar padding | `0 32px` | Standards §4 |
| Content area padding | `24px 32px` | Standards §4 |
| Card internal padding | `16px` via `--card-padding` | Standards §4 |
| Card grid gap | `12px` or `16px` | Standards §4 |
| Button-to-button gap | `12px` | Button reference |
| Uses `gap` not child margins | Flex/grid containers use `gap` property | Standards §4 |
| Directional margins | `margin-inline-*` not `margin-left/right` | Standards §4 |

#### 2e. Borders & Radius

| What to check | Expected | Source |
|----------------|----------|--------|
| Borders use tokens | `--default-border-*` or `--{component}-border-*` | Standards §5 |
| No hardcoded borders | No `border: 1px solid #ccc` | Standards §5 |
| Dividers | `1px solid var(--neutral-stroke2)` or `CuiDivider` | Standards §5 |
| Border-radius per component | `--{component}-border-radius` | Standards §5 |
| Circular shapes | `--border-radius-circular` | Standards §5 |

#### 2f. Shadows & Elevation

| What to check | Expected | Source |
|----------------|----------|--------|
| No hardcoded box-shadow | Use `var(--shadow-*)` tokens | Standards §6 + Theme CSS |
| Elevation appropriate | Cards: `--shadow-2/4`, Dialogs: `--shadow-28/64` | Standards §6 |
| Token exists | Verify in theme CSS: `--shadow-{0,2,4,8,16,28,64}` | Theme CSS |

#### 2g. Focus & Interaction States

Cross-reference against both **standards** and **manifest** (component may already handle states).

| What to check | Expected | Source |
|----------------|----------|--------|
| Focus ring | `var(--focus-outline)` + `var(--focus-outline-offset)` | Standards §7 |
| Uses `:focus-visible` | Not `:focus` (keyboard-only outlines) | Standards §7 |
| Hover guard | `:hover:not([disabled])` | Standards §7 |
| Disabled pattern | `cursor: not-allowed` + inner `pointer-events: none` | Standards §7 |
| Component already handles states? | Check manifest `cssProperties` — don't re-implement | Manifest |
| All 5 states covered | rest, hover, focus, active, disabled | Standards §7 |

#### 2h. Component Convention Check

Cross-reference against **component reference docs** and **manifest**.

| What to check | Expected | Source |
|----------------|----------|--------|
| Toolbar buttons | `appearance="subtle"` + `size="small"` | Standards §10 |
| Icon-only buttons | `aria-label` or `label` on `CuiIcon` | Button ref + Accessibility guide |
| Leading button icons | `slot="start"` | Button ref |
| Cards | `appearance="outline"` for resource/service cards | Standards §10 |
| Side nav size | `size="small"` | Side Nav pattern |
| Dividers after toolbar | Full-width, `margin: 0` | Resource Page Shell |
| Valid attribute values | Cross-check `appearance`, `size`, `shape` against manifest enum types | Manifest |
| Valid slot names | Verify slot names against manifest `slots` array | Manifest |

#### 2i. Layout & Structure

| What to check | Expected | Source |
|----------------|----------|--------|
| `body { margin: 0 }` | Present in full-page prototypes | Standards §8 |
| Main surface color | `var(--neutral-background2)` for Azure pages | Standards §8 + §10 |
| Card grids | `display: grid` with `auto-fill` / `minmax()` | Standards §8 |
| Flex rows | `align-items: center` for horizontal alignment | Standards §8 |
| Form controls | `width: 100%` | Standards §8 |
| Page title format | `"Resource Name \| Section"` | Standards §10 |

#### 2j. Accessibility

Cross-reference against the **accessibility guide** and **component reference docs**.

| What to check | Expected | Source |
|----------------|----------|--------|
| `cui-skip-to` | First element on full-page prototypes | Accessibility guide |
| Landmark elements | `<main>`, `<nav>`, `<header>` used | Accessibility guide |
| Icon-only button labels | `aria-label` or `label` on CuiIcon | Accessibility guide + Button ref |
| Dialog/drawer headings | `heading` attribute or `aria-label` | Dialog ref, Drawer ref |
| Image alt text | All `<img>` have `alt`; decorative: `alt=""` | Accessibility guide |
| No placeholder-only labels | Visual label required | Form template |
| Toolbar label | `label` attribute on `CuiToolbar` | Toolbar ref |
| Required form fields | Marked with asterisk | Form template |

### Step 3: Report Findings

Present the verification results as a summary:

```markdown
## UI Verification Results

### ✅ Passing
- [list each passing category with brief note]

### ⚠️ No Standard Exists
- [styling decisions where standards registry has no rule]
- For each: "Used `[value]` for `[property]`. No standard exists. Save as standard?"

### ❌ Violations (must fix)
- [rule broken — include exact line/value and corrected version]

| Category | Check | Status | Detail |
|----------|-------|--------|--------|
| Spacing | Card padding | ✅ | Uses 16px via --card-padding |
| Typography | Title font size | ❌ | Uses `18px` — should be `var(--font-size-base500)` |
| Color | Background | ✅ | Uses --neutral-background2 |
| States | Icon button a11y | ⚠️ | No standard for this context |
```

### Step 4: Handle ❌ Violations

For each violation:
1. Show the offending code with file path and line
2. Show the expected standard with source reference
3. **Fix the violation** in the code immediately
4. Re-verify the fix

### Step 5: Handle ⚠️ Missing Standards

For each styling decision where **no existing standard applies**:

1. Clearly describe what was decided and the context
2. **Ask the user**: _"No existing standard covers [description]. Should I save this as a standard for future components?"_
3. If the user says **yes**:
   - Add the new rule to `.github/skills/coherence-ui/references/styling-standards.md` under the appropriate section table
   - If the pattern is complex enough (multi-component, reusable), also trigger the **pattern-creator** skill workflow:
     1. Create a pattern file in `references/patterns/`
     2. Register in the Composition Patterns table in `coherence-ui/SKILL.md`
     3. Add a memory note to `/memories/coherence-patterns.md`
4. If the user says **no**, note it as an intentional deviation and move on

### Step 6: Visual Verification (Playwright + VS Code Browser)

After static checks pass, **render the component and verify visually** using the Playwright browser tools and VS Code's integrated browser. This catches issues that static analysis cannot: token values resolving incorrectly, layout overflow, missing icons, wrong colors at runtime.

#### 6a. Ensure Dev Server Is Running

**Check whether the dev server is already running before starting a new one:**

1. Run: `lsof -i :5175 2>/dev/null | grep LISTEN`
2. If a process is listening → the server is already running. Skip to 6b.
3. If nothing is listening → start the server as a background process:

```bash
cd coherence-preview && npx vite --port 5175
```

4. Verify it responds: `curl -s -o /dev/null -w "%{http_code}" http://localhost:5175/`
   - If `200` → proceed to 6b
   - If not `200` → kill the process and restart. Check for port conflicts with `lsof -i :5175`.

The app runs at `http://localhost:5175`. Navigate to the experiment via hash: `http://localhost:5175#<experiment-id>`.

#### 6b. Open in VS Code Simple Browser

Use the `open_simple_browser` tool to show the rendered component in VS Code's integrated browser panel:

```
URL: http://localhost:5175#<experiment-id>
```

This gives the user an immediate visual preview alongside the code.

#### 6c. Navigate with Playwright

Use the `browser_navigate` tool to open the experiment URL in Playwright's headless browser:

```
URL: http://localhost:5175#<experiment-id>
```

#### 6d. Take a Snapshot (Accessibility Tree)

Use the `browser_snapshot` tool to capture the **accessibility tree** of the rendered page. This reveals:
- Whether all landmark regions are present (`main`, `nav`, `header`)
- Whether icon-only buttons have accessible names
- Whether headings follow the correct hierarchy (h1 → h2 → etc.)
- Whether form controls have labels
- Whether skip-to navigation is present

Compare the snapshot against the accessibility checks in Step 2j.

#### 6e. Take a Screenshot

Use the `browser_take_screenshot` tool to capture a visual screenshot. Review for:
- **Color correctness** — backgrounds, text, and borders render with expected Coherence tokens (grey surface, correct foreground hierarchy)
- **Typography** — font sizes visually match the expected hierarchy (title largest, then section headings, then body, then captions)
- **Spacing** — gutters, padding, and gaps look proportional and consistent
- **Layout** — no overflow, no collapsed containers, no misaligned elements
- **Icons** — all icons render (no question-mark fallbacks)
- **Component rendering** — all `cui-*` components are visible and styled (no FOUC or unstyled custom elements)

#### 6f. Extract Computed Styles (Runtime Verification)

Use the `browser_evaluate` tool to run JavaScript in the page and extract **computed CSS values** from rendered elements. This confirms that design tokens actually resolve to the expected values at runtime.

Example scripts to run:

**Check page background color:**
```js
getComputedStyle(document.querySelector('[slot="main"]') || document.body).backgroundColor
```

**Check title font-size and weight:**
```js
const title = document.querySelector('h1, .resource-title, .page-title');
if (title) {
  const s = getComputedStyle(title);
  JSON.stringify({ fontSize: s.fontSize, fontWeight: s.fontWeight, color: s.color });
}
```

**Check spacing values:**
```js
const content = document.querySelector('[slot="main"] > div:last-child') || document.querySelector('.content-area');
if (content) {
  const s = getComputedStyle(content);
  JSON.stringify({ paddingTop: s.paddingTop, paddingLeft: s.paddingLeft });
}
```

**Check for hardcoded colors (scan all elements):**
```js
const hardcoded = [];
document.querySelectorAll('*').forEach(el => {
  const s = el.style;
  ['color','backgroundColor','borderColor'].forEach(p => {
    if (s[p] && !s[p].includes('var(')) hardcoded.push({ tag: el.tagName, class: el.className, prop: p, value: s[p] });
  });
});
JSON.stringify(hardcoded.slice(0, 20));
```

**Check for missing icons (question-mark fallbacks):**
```js
const icons = document.querySelectorAll('cui-icon');
const broken = [];
icons.forEach(icon => {
  const svg = icon.shadowRoot?.querySelector('svg');
  if (!svg || svg.innerHTML.includes('question')) broken.push(icon.getAttribute('name') || icon.getAttribute('url'));
});
JSON.stringify(broken);
```

#### 6g. Test Interactive States (Optional)

Use `browser_hover` and `browser_click` to verify hover/focus/active states render correctly:

1. **Hover** over a button → take screenshot → verify hover background appears
2. **Click** a toolbar button → verify active state
3. **Tab** through the page (via `browser_press_key` with `Tab`) → verify focus rings appear using `--focus-outline` tokens

#### 6h. Responsive Check (Optional)

Use `browser_resize` to test at common breakpoints:

| Breakpoint | Width | What to check |
|-----------|-------|---------------|
| Desktop | 1920 | Full layout, all columns visible |
| Tablet | 1024 | Side nav may collapse, content reflows |
| Nav breakpoint | 686 | Drawer collapses to hamburger toggle |
| Mobile | 375 | Content stacks vertically, no horizontal overflow |

#### 6i. Report Visual Findings

Add a **Visual Verification** section to the report:

```markdown
### 🖥️ Visual Verification

| Check | Status | Detail |
|-------|--------|--------|
| Page renders without errors | ✅ | No console errors |
| All icons visible | ✅ | 12 icons, 0 fallbacks |
| Background color correct | ✅ | rgb(242,242,242) matches --neutral-background2 |
| Title font-size | ✅ | 20px matches --font-size-base500 |
| Accessibility tree | ⚠️ | Missing landmark on sidebar |
| Responsive @ 686px | ✅ | Nav collapses to hamburger |
```

### Step 7: Final Confirmation

After all violations are fixed and new standards are optionally saved:
1. Re-run the full checklist to confirm everything passes
2. Report: _"✅ UI verification complete. All [N] checks pass. [M] new standards saved."_

## Integration with Other Skills

| Skill / Tool | How it connects |
|-------|-----------------|
| **coherence-ui** | Provides the manifest, theme CSS, component references, and pattern docs used for verification |
| **azure-portal-prototyper** | Verification runs automatically after any prototype is generated |
| **pattern-creator** | Triggered when a new standard is saved as a reusable pattern |
| **coherence-live-preview** | Dev server startup + experiment registration for visual verification |
| **Playwright MCP tools** | `browser_navigate`, `browser_snapshot`, `browser_take_screenshot`, `browser_evaluate`, `browser_hover`, `browser_click`, `browser_press_key`, `browser_resize` — used in Step 6 for runtime visual/a11y verification |
| **VS Code Simple Browser** | `open_simple_browser` — shows the rendered component inline in VS Code for the user to see |

## Quick Reference: Anti-Patterns

Never allow these in verified UI:

| Anti-pattern | Fix |
|-------------|-----|
| Hardcoded hex/rgb colors (`#333`, `rgb(0,0,0)`) | Use `var(--neutral-foreground1)` etc. |
| Hardcoded pixel font sizes (`font-size: 14px`) | Use `var(--font-size-base300)` |
| Hardcoded font weights (`font-weight: 600`) | Use `var(--font-weight-semi-bold)` |
| Missing `aria-label` on icon-only buttons | Add `label="Description"` to `CuiIcon` |
| Missing `body { margin: 0 }` in full-page layouts | Add to styles string |
| Inline color literal (`style={{ color: '#0078d4' }}`) | Use CSS class with token variable |
| Non-standard spacing (`gap: 10px`, `padding: 15px`) | Use scale: `8/12/16/24/32px` |
| Custom property re-inventing manifest property | Check manifest `cssProperties` first |
| Invalid attribute value (e.g., `size="xl"`) | Check manifest `attributes` enum |
| `outline: none` on interactive elements | Use `--focus-outline-*` tokens to customize |

## Extending Standards

When the standards file grows, keep it organized:
- Each table row must include a **Source** column citing where the rule was derived
- New categories can be added as new `##` sections
- The standards file and this checklist should stay in sync — a new standards category means a new verification check
