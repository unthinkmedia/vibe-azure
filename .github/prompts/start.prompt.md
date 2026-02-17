---
description: 'Onboard and start a new prototyping session in this workspace'
---

# Start

Welcome to the **VibeAzure** workspace — an Azure portal prototyping environment built on the Coherence Design System (`@charm-ux/cui`).

## What this workspace contains

- **coherence-preview/** — Vite + React app for viewing experiments, composition patterns, and page scaffolds
- **charm-pilot/** — The Coherence (Charm) component library source (core components, theming, demo, docsite)
- **mcp-server/** — MCP server for AI-assisted prototyping with Coherence UI
- **.github/skills/** — Agent skills for Coherence UI, Azure portal prototyping, mock data, and deployment

## Quick start

1. Start the preview dev server: `cd coherence-preview && npm run dev`
2. Open the local URL shown in the terminal
3. Ask me to build an Azure portal page prototype — I'll use the `coherence-ui` and `azure-portal-prototyper` skills

## What I can help with

- **Prototype an Azure page** — "Build me a Virtual Machines overview page"
- **Use Coherence components** — I'll fetch the live API manifest for exact component APIs
- **Generate mock data** — Realistic Azure resource data for tables, cards, and lists
- **Deploy & share** — Publish a prototype via Azure Static Web Apps
- **Explore patterns** — Browse existing composition patterns and scaffolds in the preview app

## Key rules

- I always consult the **coherence-ui skill** for component APIs — never guess at attributes/slots/events
- I use **design tokens** from the theme CSS — never hardcode colors or spacing
- New experiments go in `coherence-preview/src/experiments/` and get registered in `main.tsx`
