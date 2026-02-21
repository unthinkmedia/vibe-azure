# VibeAzure Demo Script

> **What this app does:** You describe an Azure portal page in plain English, and the AI agent builds a pixel-perfect prototype using Microsoft's Coherence design system — complete with real components, design tokens, mock data, and accessibility baked in. The full lifecycle is: **Intent → Build → Verify → Deploy**.

---

## Pre-Demo Setup

1. Make sure the preview server is running:
   ```bash
   cd coherence-preview && npx vite --port 5175
   ```
2. Open the preview at `http://localhost:5175` — show the gallery of 25+ existing experiments, patterns, and scaffolds.
3. Have VS Code open with GitHub Copilot chat visible.

---

## Demo Prompt (Copy & Paste This)

Paste this into the Copilot chat panel:

---

### Option A: "Network Security Dashboard" (Best for wow-factor)

```
Build me an Azure Network Security Dashboard page.

It should have:
- A threat summary bar at the top showing blocked attacks (last 24h), active DDoS mitigations, and open NSG rule violations
- A geographic attack map showing top source countries with threat counts
- A filterable table of recent firewall events with columns: timestamp, source IP, destination, action (allow/deny), rule name, and severity badge
- A side panel showing NSG recommendations grouped by priority (critical, high, medium)
- Copilot suggestions like "Which NSG rules are too permissive?" and "Show me denied traffic from the last hour"
```

---

### Option B: "VM Fleet Manager" (Good for resource management story)

```
Build me an Azure Virtual Machines fleet overview page.

I want:
- Summary cards showing total VMs, running vs stopped count, and monthly compute cost
- A table of all VMs with columns: name, resource group, region, size, status badge, OS, and CPU/memory utilization sparklines
- Bulk action toolbar: start, stop, restart, resize, and delete with multi-select
- A "Right-sizing Recommendations" panel showing VMs that are over/under-provisioned with potential savings
- Copilot suggestions like "Which VMs have been idle for over 7 days?" and "Show me VMs without backup enabled"
```

---

### Option C: "DevOps Pipeline Dashboard" (Good for developer audience)

```
Build me an Azure DevOps Pipelines dashboard page.

It should show:
- Pipeline health summary with pass/fail/in-progress counts and overall success rate donut chart
- A timeline view of recent pipeline runs with duration bars, status indicators, and commit messages
- A "Slowest Stages" breakdown showing which pipeline stages take the longest with avg duration
- Build agent pool utilization showing online/offline/busy agents
- An alert banner for any pipelines that have been failing for more than 24 hours
- Copilot suggestions like "Why did the last deploy pipeline fail?" and "Which pipelines have the most flaky tests?"
```

---

### Option D: "Quick 2-Minute Demo" (Simpler, faster build)

```
Build me an Azure Resource Group overview page with a resource count summary, cost breakdown donut chart, recent activity log, and a tag compliance checker showing which resources are missing required tags.
```

---

## What to Narrate During the Demo

### Phase 1: Intent Capture (~30 seconds)
> "I just described what I want in plain English. The agent is now opening the **Intent App** — a structured form that captures the vision, problem statement, and success criteria. This ensures alignment before any code is written. I can review, edit, and accept."

### Phase 2: Build (~2-3 minutes)
> "Now the agent is generating the full prototype — React components using Microsoft's **Coherence design system** (the same component library used in the real Azure portal). It's creating mock data, wiring up interactions, and composing reusable patterns like the page header, side nav, and toolbar."

### Phase 3: Validate (~45 seconds)
> "Now I run validation. The agent audits styling and accessibility, then reads the intent's success criteria and grades each one on effectiveness from 0 to 5. For every criterion, it gives concrete evidence and actionable next-step feedback so we know exactly what to improve."

### Phase 4: Preview (Instant)
> "And there it is — a fully interactive Azure portal page, built from a single prompt. It uses real Coherence components, design tokens for theming, and follows all Azure portal UX conventions. I can click through tabs, sort tables, and interact with every element."

### Phase 5: Share (Optional, ~10 seconds)
> "If I want to share this with my team for feedback, I hit **Share** — it triggers a GitHub Actions workflow that deploys this experiment to Azure Static Web Apps. Anyone with the link can see the prototype in their browser."

---

## Talking Points

- **Not screenshots, not Figma** — these are real, interactive React components using the production Coherence library
- **25+ experiments built so far** — from Cosmos DB to AKS to API Management, each generated from a single prompt
- **Reusable patterns** — the system learns composition patterns (page headers, nav, donut gauges, service cards) and reuses them automatically
- **Design intent as spec** — the intent.json acts as a lightweight design doc that drives all build decisions
- **Full lifecycle** — intent → build → verify (styling + accessibility + success-criteria effectiveness scorecard) → deploy to Azure Static Web Apps
- **MCP-powered** — uses Model Context Protocol for Coherence component discovery, icon browsing, and design token lookup

---

## Audience-Specific Angles

| Audience | Lead With |
|----------|-----------|
| **Designers** | "Describe a page, get an interactive prototype in minutes — not days" |
| **PMs** | "Validate your spec before engineering starts — iterate in real-time" |
| **Engineers** | "Production Coherence components, proper tokens, accessibility built in" |
| **Leadership** | "Reduce portal page prototyping from weeks to minutes" |
