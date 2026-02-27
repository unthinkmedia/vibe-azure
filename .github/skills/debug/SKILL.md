---
name: debug
description: "A simple debugging skill for troubleshooting issues. Use when the user asks to debug, troubleshoot, diagnose, or investigate problems in their code or environment."
---

# Debug Skill

## Purpose
Help the user systematically debug and troubleshoot issues.

## Workflow

1. **Identify the problem** — Ask the user to describe the issue, error message, or unexpected behavior.
2. **Gather context** — Read relevant files, check error logs, and inspect configuration.
3. **Form a hypothesis** — Based on the evidence, determine the most likely cause.
4. **Test the hypothesis** — Run commands, add logging, or inspect state to confirm.
5. **Apply the fix** — Make the minimal change needed to resolve the issue.
6. **Verify** — Confirm the fix works and no regressions were introduced.

## Tips
- Start with the error message — read it carefully before diving into code.
- Check recent changes first — the bug is often in what changed last.
- Use `console.log`, `print()`, or equivalent to trace execution flow.
- Simplify — isolate the problem by removing complexity until the issue is clear.
- Don't guess — gather evidence before making changes.
