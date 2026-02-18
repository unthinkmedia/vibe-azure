---
name: pattern-creator
description: Create, register, and validate new Coherence UI composition patterns. Use when discovering a reusable UI pattern, component workaround, or token override that should be captured for future experiments. Triggers on "save this as a pattern", "create a pattern", "add a composition pattern", "document this pattern", or when a reusable component recipe is identified during prototyping.
---

# Pattern Creator

Capture reusable Coherence UI composition patterns so future experiments automatically use them.

## When to Create a Pattern

A pattern is worth capturing when:
- A component requires **non-obvious configuration** (token overrides, missing intents, workarounds)
- A **multi-component composition** is reused across experiments (header, toolbar, info banner)
- A **design decision** was made that deviates from component defaults to match Azure portal conventions

## Required Steps

Follow all steps in order. **Skipping any step means the pattern won't be discoverable.**

### Step 1: Write the Pattern File

Create a markdown file at:
```
.github/skills/coherence-ui/references/patterns/<pattern-slug>.md
```

Use this structure:

```markdown
# Pattern Name

One-line description of what the pattern solves.

## Problem

Why the default component behavior doesn't match the desired outcome.

## Solution

### Token Overrides (if applicable)

CSS custom property overrides in a fenced code block.

### React Example

Complete, copy-pasteable React snippet using `@charm-ux/cui/react`.

## Key Props

Table of important props, values, and why they're set that way.

## When to Use

Bullet list of scenarios where this pattern applies.
```

**Guidelines:**
- Keep it under 80 lines — patterns are loaded into context
- Include only the **non-obvious** parts. Don't re-document standard component APIs
- Use Coherence design tokens (`--brand-*`, `--neutral-*`, etc.), never hardcoded colors
- The React example must be self-contained and importable

### Step 2: Register in the Skill Index

Add a row to the **Composition Patterns** table in `.github/skills/coherence-ui/SKILL.md`.

Find this section:
```markdown
## Composition Patterns
```

Add a row to the table in alphabetical order:

```markdown
| Pattern Name | Short description | [references/patterns/<slug>.md](references/patterns/<slug>.md) |
```

**This step is critical.** The coherence-ui skill discovers patterns by reading this table. An unregistered pattern file is invisible to the agent.

### Step 3: Save a Memory Note

Add a concise entry to `/memories/coherence-patterns.md` summarizing the gotcha. This ensures the agent remembers the insight across conversations without needing to re-read the full pattern file.

Format: one bullet point with the key takeaway and a reference to the pattern doc path.

### Step 4: Verify Registration

Confirm the pattern is accessible by checking:
1. The file exists at `.github/skills/coherence-ui/references/patterns/<slug>.md`
2. The Composition Patterns table in `SKILL.md` has a row with a working relative link
3. The memory note exists in `/memories/coherence-patterns.md`

## Checklist

Use this to verify nothing was missed:

- [ ] Pattern file created in `references/patterns/`
- [ ] Row added to Composition Patterns table in `coherence-ui/SKILL.md` (alphabetical)
- [ ] Memory note added to `/memories/coherence-patterns.md`
- [ ] Pattern file is under 80 lines
- [ ] React example uses `@charm-ux/cui/react` imports
- [ ] CSS overrides use design tokens, not hardcoded values
- [ ] Pattern file has: Problem, Solution (with code), Key Props table, When to Use

## Example: Info Message Bar

This pattern was the first created using this workflow:

- **Problem:** `cui-message-bar` with `intent="info"` renders grey, not blue
- **Solution:** Override `--message-bar-bg-color`, `--message-bar-icon-fg-color`, `--message-bar-border` with brand tokens
- **File:** `references/patterns/info-message-bar.md`
- **Index entry:** Added to Composition Patterns table in `SKILL.md`
- **Memory:** Saved to `/memories/coherence-patterns.md`
