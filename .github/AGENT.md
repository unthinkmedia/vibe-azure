# Agent Instructions

This workspace includes agent skills under `.github/skills/`. **Always check if a skill applies before answering from general knowledge.** Skill-provided context is more accurate and up-to-date than training data.

## coherence-ui

**Trigger:** Any mention of Coherence, `cui-*` or `ch-*` components, `@charm-ux/cui`, design tokens, theming, CSS custom properties (`--color-*`, `--spacing-*`, `--font-*`), or building UI that should follow the Coherence design system.

**What it provides:**
- Live API manifest URL for exact component attributes, slots, events, and CSS properties
- Theme CSS URL with all 578+ design tokens (colors, spacing, typography, shadows, animation)
- Design guidance, dos/don'ts, accessibility rules, and code examples for 66 components
- Page templates (dashboard, form, settings) and task flow patterns (bulk edit, inline edit, favorites)
- UX guides for accessibility, AI patterns, data visualization, and writing for UI
- **Composition patterns** — reusable multi-component recipes and token overrides extracted from real prototypes

**How to use it:** Read `.github/skills/coherence-ui/SKILL.md` first. It will direct you to fetch the manifest, theme CSS, or specific reference files as needed. Never guess at component APIs — the manifest is the source of truth.

## pattern-creator

**Trigger:** "save this as a pattern", "create a pattern", "add a composition pattern", "document this pattern", or when a reusable component recipe, workaround, or token override is discovered during prototyping.

**What it provides:**
- Step-by-step workflow for creating new composition patterns
- Template for pattern file structure
- Checklist ensuring all registration points are updated (pattern file, SKILL.md index, memory note)

**How to use it:** Read `.github/skills/pattern-creator/SKILL.md` and follow all four steps. Skipping the registration step means the pattern is invisible to future sessions.

## design-intent

**Trigger:** Any time a designer describes what they want to build, starts a new experiment, mentions prototyping a new page, or explicitly asks about "design intent", "intent", or "capture the goals".

**What it provides:**
- An interactive Design Intent capture form (MCP App UI) that records What, Why, Success Criteria, and Non-Goals for a prototype
- Intent files are stored as `intent.json` inside each experiment folder and can be reviewed from the preview app header
- Inspired by the Specflow methodology — keeps prototypes goal-oriented

**How it works in the prototyping workflow:**
1. When a designer describes what they want to build, **immediately call the `design_intent` MCP tool** with prefill parameters extracted from their prompt — map their description to `prefillVision`, `prefillProblem`, `prefillSuccessCriteria`, `prefillConstraints`, and a kebab-case `experimentId`
2. The Intent form opens pre-populated with the AI's best guesses for all fields
3. The designer reviews, edits the form, and clicks **"Make This"** to confirm (or "Save Draft" to save without building yet)
4. After the tool returns, **read the finalized `intent.json`** from `coherence-preview/src/experiments/<experimentId>/intent.json`
5. Use the full intent document (vision, problem, success criteria, non-goals, constraints) as **primary context** for all build decisions
6. The intent is viewable anytime via the **Intent** button in the preview app header bar (next to Share)

**Key principle:** The intent form is the designer's chance to review and refine the AI's interpretation of their request before building begins. The AI always makes a best guess from the prompt — the designer confirms or adjusts, then clicks "Make This" to kick off the build with full context.

## Guidance

1. **UI questions → use coherence-ui skill.** If someone asks how to build a page, use a component, style with tokens, or follow accessibility rules, load the coherence-ui skill and consult its references rather than relying on general knowledge.
2. **Component API → fetch the manifest.** Never guess attributes, slots, events, or CSS properties. The skill provides the manifest URL.
3. **Theming/tokens → fetch the theme CSS.** The skill provides the URL. Don't invent token names.
4. **Accessibility → read the guide.** The skill has a dedicated accessibility reference at `references/guides/accessibility.md`.
5. **New components → follow existing patterns.** Look at existing components in `packages/core/src/components/` and use the Plop templates.
