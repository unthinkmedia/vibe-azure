# Coherence Styling Standards Registry

Canonical styling rules extracted from the Coherence component library, manifest API, theme CSS, and existing patterns. The agent **must** verify custom UI against these standards before finalizing any component.

> When a rule has no established standard, the agent must flag it and ask the user whether to save the decision as a new standard in this file.

---

## 1. CSS Custom Property Naming

| Rule | Standard | Source |
|------|----------|--------|
| Token pattern | `--{component}-{subpart?}-{state?}-{css-property}` | All charm-pilot component styles |
| Property suffixes | `-bg-color`, `-fg-color`, `-border-color`, `-padding-x`, `-padding-y`, `-font-size`, `-font-weight`, `-line-height`, `-border-radius`, `-border-size`, `-border-style`, `-shadow` | Button, Card, Dialog, Tabs styles |
| Token defaults | All set to `inherit` on `:host` — theme provides actual values | All charm-pilot components |
| Fallback syntax | `var(--component-token, <fallback-value>)` — only use Coherence tokens or `px`/`rem` values as fallbacks | All charm-pilot components |

**Violation examples:**
- `--myComp-backgroundColor` → should be `--my-comp-bg-color`
- `background: #f0f0f0` → should use `var(--neutral-background-2)` or similar token
- `--card-textColor` → should be `--card-fg-color`

---

## 2. Color Usage

| Rule | Standard | Source |
|------|----------|--------|
| Never hardcode colors | Use design tokens: `--neutral-foreground-{1-4}`, `--neutral-background-{1-6}`, `--brand-foreground-*`, `--brand-background-*` | Theme CSS |
| Color triad per state | Every component state needs `bg-color`, `fg-color`, `border-color` | Button, Tab, Menu-Item styles |
| State progression | rest → hover → focus → active → disabled (5 states) | All interactive components |
| Text contrast | Body text: 4.5:1 ratio minimum. Icons: 3:1 ratio minimum | Accessibility guide, Button guidance |
| Disabled state | Use opacity `var(--form-control-disabled-opacity, 40%)` or dedicated `-disabled-*` tokens | Switch, Form-control styles |
| High contrast | Include `@media (forced-colors: active)` for interactive elements | Alert, Tab, Switch, Checkbox |

**Token quick reference:**

| Purpose | Token |
|---------|-------|
| Primary text | `var(--neutral-foreground-1)` |
| Secondary text | `var(--neutral-foreground-2)` |
| Tertiary/caption text | `var(--neutral-foreground-3)` |
| Disabled text | `var(--neutral-foreground-disabled)` |
| Page surface | `var(--neutral-background-2)` |
| Card/panel surface | `var(--neutral-background-1)` |
| Elevated surface | `var(--neutral-background-3)` |
| Brand primary | `var(--brand-background-1)` |
| Brand text | `var(--brand-foreground-link)` |
| Danger/error | `var(--danger-foreground-1)` |
| Success | `var(--success-foreground-1)` |
| Warning | `var(--warning-foreground-1)` |
| Borders | `var(--neutral-stroke-1)`, `var(--neutral-stroke-2)` |

---

## 3. Typography

| Rule | Standard | Source |
|------|----------|--------|
| Font family | Never set explicitly — inherited from `--body-font-family` / `--font-family-base` | All components |
| Font size scale | `--font-size-base-{100-600}` for body, `--font-size-hero-{700-1000}` for heroes | Theme CSS |
| Page title | `--font-size-base-500` + `--font-weight-semibold` | Resource Page Shell pattern |
| Section heading | `--font-size-base-400` + `--font-weight-semibold` | Dashboard template |
| Card title | `--font-size-base-300` + `--font-weight-semi-bold` | Service Card pattern, Card reference |
| Body text | `--font-size-base-300` (14px) — default, no override needed | Theme CSS |
| Caption/secondary text | `--font-size-base-200` (12px) | Service Card, Card reference |
| Line-height on controls | `line-height: 1` on interactive elements (button, tab, input) | Button, Tab, Form-control styles |
| No hardcoded font-size | Use `var(--font-size-base-*)` tokens, never `14px` or `0.875rem` directly | All components |

**Font weight tokens:**

| Token | Typical use |
|-------|-------------|
| `--font-weight-regular` | Body text |
| `--font-weight-semi-bold` | Card titles, section headings, labels |
| `--font-weight-semibold` | Page titles, emphasis |
| `--font-weight-bold` | Hero text, strong emphasis |

---

## 4. Spacing

| Rule | Standard | Source |
|------|----------|--------|
| Use component tokens | `--{component}-padding-x`, `--{component}-padding-y`, `--{component}-content-gap` | All components |
| Page side padding | `32px` (consistent across breadcrumb, header, toolbar, content) | Resource Page Shell |
| Breadcrumb top padding | `8px 32px 0` | Resource Page Shell |
| Page header padding | `16px 32px 0` | Resource Page Shell |
| Toolbar padding | `0 32px` | Resource Page Shell |
| Content area padding | `24px 32px` | Resource Page Shell |
| Card grid gap | `12px` or `16px` between cards | Service Card, Dashboard template |
| Card internal padding | `16px` (via `--card-padding`) | Service Card pattern |
| Card footer negative margin | `margin: 12px -16px -16px` to extend footer edge-to-edge | Service Card pattern |
| Button horizontal spacing | `12px` between sibling buttons | Button guidance |
| Flex stack gap | Use `gap` property with tokens, not `margin` on children | All components |
| Slot start/end margins | `margin-inline-start` / `margin-inline-end` with component gap token | Button, Menu-item, Tab styles |

**Common spacing values:**

| Value | Usage |
|-------|-------|
| `4px` | Button icon padding, close-button padding, form label gap |
| `8px` | Tab padding-y, menu-item padding, dialog gaps, icon gap |
| `12px` | Button padding-x, tab padding-x, card grid gap, button-to-button gap |
| `16px` | Dialog padding, card internal padding |
| `24px` | Content area vertical padding |
| `32px` | Page horizontal padding (main content gutters) |

---

## 5. Borders

| Rule | Standard | Source |
|------|----------|--------|
| Default border | `var(--default-border-size) var(--default-border-style) var(--default-border-color)` | Theme CSS, all components |
| Component override | `--{component}-border-size`, `--{component}-border-style`, `--{component}-border-color` | Card, Button, Input, Tab |
| Divider borders | `1px solid var(--neutral-stroke-2)` | Service Card footer border |
| Border-radius | Per-component token: `--{component}-border-radius` | All components |
| No shared radius scale | Each component defines its own radius — don't assume a global value | All components |
| Circular shape | `--border-radius-circular` (50%) for pill shapes | Switch, Avatar |

---

## 6. Shadows & Elevation

| Rule | Standard | Source |
|------|----------|--------|
| Shadow tokens | `--shadow-{0,2,4,8,16,28,64}` — increasing elevation | Theme CSS |
| Component shadow | `--{component}-shadow` or `--{component}-box-shadow` | Card, Button, Dialog |
| No hardcoded shadows | Use `var(--shadow-4)` etc., never `box-shadow: 0 2px 4px rgba(...)` | Theme CSS |

---

## 7. Focus & Interaction States

| Rule | Standard | Source |
|------|----------|--------|
| Focus outline | `outline: var(--focus-outline)` + `outline-offset: var(--focus-outline-offset)` | All interactive components |
| Hover selector | `:host(:hover:not([disabled]))` or `.control:hover` | Button, Tab, Menu-item |
| Active selector | `:host(:not([disabled])) .control:active` | Button, Tab |
| Disabled pattern | `:host([disabled])` → `cursor: not-allowed` + inner `pointer-events: none` | All interactive components |
| Focus-visible | Use `:focus-visible` (not `:focus`) for keyboard-only outlines | All interactive components |
| No outline:none | Never remove focus outlines — override style only via `--focus-outline-*` tokens | Accessibility guide |

---

## 8. Layout & Structure

| Rule | Standard | Source |
|------|----------|--------|
| Host display | `inline-block` (button, card, avatar), `block` (alert, form-control), `grid` (switch, tabs) | Component styles |
| Flex for containers | `display: flex` + `gap` for horizontal/vertical stacks | Card, Dialog, Alert |
| Grid for complex layout | `display: grid` with named areas for tabs, form-control | Tabs, Form-control |
| Full-width forms | Form controls use `width: 100%` | Input, Select, Text-area |
| Card height stretch | `height: 100%` on `.base` to fill grid rows | Card styles |
| Overflow hidden | On dialog body, accordion base | Dialog, Accordion styles |
| body {margin:0} | Always include in page-level prototypes | Resource Page Shell |

---

## 9. Accessibility

| Rule | Standard | Source |
|------|----------|--------|
| Skip-to nav | `cui-skip-to` as first tab stop on every page | Accessibility guide |
| Landmarks | Assign `<main>`, `<nav>`, `<header>` regions | Accessibility guide |
| Keyboard access | Every interactive element must be keyboard-reachable | Accessibility guide |
| aria-label | Required on dialogs, drawers, icon-only buttons, toolbars | Dialog, Drawer, Button, Toolbar refs |
| Alt text on images | All images need `alt` text; decorative images get `alt=""` | Accessibility guide |
| No placeholder-only labels | Labels cannot be substituted with placeholder text | Form template |
| Required fields | Mark with asterisk (`*`) | Form template |

---

## 10. Azure Portal Conventions

| Rule | Standard | Source |
|------|----------|--------|
| Main surface color | `var(--neutral-background-2)` (grey) for `[slot='main']` | Resource Page Shell |
| Card appearance | `appearance="outline"` for service cards | Service Card pattern |
| Card action footer | border-top `1px solid var(--neutral-stroke-2)`, padding `4px 8px` | Service Card pattern |
| Title convention | `"Resource Name \| Page Title"` (pipe separator) | Resource Page Shell |
| Primary action labels | "Create", "Add", "Save" | Portal Prototyper conventions |
| Destructive action labels | "Delete", "Remove" | Portal Prototyper conventions |
| Icon source priority | 1. Built-in `name` attribute, 2. Iconify URL via `url` attribute | Icon reference |
| Nav icon pairs | `regular` + `filled` via `url` / `selectedUrl` on `CuiIcon` | Side Nav pattern |
| Toolbar size | `size="small"` with `appearance="subtle"` buttons | Resource Page Toolbar pattern |

---

## Adding New Standards

When the verification skill encounters a styling decision with **no established rule** in this file:

1. Flag the decision to the user with the specific property/value in question
2. Explain what was used and why there's no standard yet
3. Ask: _"Should I save this as a standard for future components?"_
4. If yes, add a row to the appropriate section table above
5. Follow the pattern-creator checklist if it qualifies as a full composition pattern
