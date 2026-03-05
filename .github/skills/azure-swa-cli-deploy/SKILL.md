---
name: azure-swa-cli-deploy
description: Deploy to Azure Static Web Apps using the SWA CLI with a deployment token — no GitHub OAuth required. Use when the user says "deploy with CLI", "deploy without GitHub", "SWA CLI deploy", "deploy with token", or encounters GitHub Enterprise Managed User (EMU) errors like "As an Enterprise Managed User, you cannot access this content" when trying to connect GitHub to Azure. Also triggers on "deploy to Azure Static Web Apps", "I can't connect GitHub to Azure", or "deploy from terminal".
---

# Azure SWA CLI Deploy

Deploy the `coherence-preview/` Vite app to Azure Static Web Apps using the SWA CLI and a deployment token. This bypasses the GitHub OAuth connection entirely — ideal for Enterprise Managed User (EMU) accounts that cannot authorize third-party GitHub Apps.

## HARD RULE: User Confirmation Before Creating Azure Resources

⚠️ **Before creating ANY Azure resource (resource group, Static Web App, etc.), you MUST:**

1. **State exactly what will be created:** resource name, resource type, subscription, resource group, region, and pricing tier (e.g. Free)
2. **STOP. END YOUR TURN.** Wait for the user to explicitly confirm.

Example:

> _"I'm about to create the following Azure resources:_
> - _Resource Group: `coherence-preview-rg` (East US 2)_
> - _Static Web App: `coherence-preview` (Free tier, East US 2)_
> - _Subscription: `<subscription name>`_
>
> _This will create billable resources in your Azure subscription. Proceed?"_

**Do NOT run `az group create` or `az staticwebapp create` until the user says yes.** This applies to every resource creation command, not just the first one.

**Why this rule exists:** On 2026-03-05, the agent created Azure resources without user approval as part of an auto-advancing pipeline.

## Prerequisites

Before starting, verify the user has:
- An Azure subscription (run `az account show` to check)
- Node.js installed (run `node --version`)

If `az` is not installed, install it:
```bash
brew install azure-cli
```

## Walkthrough

Execute these steps interactively — run each command, confirm output with the user, then proceed.

### Step 1: Log in to Azure

```bash
az login
```

If the user has multiple subscriptions, help them pick one:
```bash
az account list --output table
az account set --subscription "<subscription-id>"
```

### Step 2: Create a Resource Group (if needed)

Check for existing groups first:
```bash
az group list --output table
```

If the user needs a new one:
```bash
az group create --name coherence-preview-rg --location eastus2
```

Let the user choose the name and region. Default suggestion: `coherence-preview-rg` / `eastus2`.

### Step 3: Create the Static Web App Resource

Create without GitHub integration by omitting `--source`:
```bash
az staticwebapp create \
  --name coherence-preview \
  --resource-group <RESOURCE_GROUP> \
  --location eastus2 \
  --sku Free
```

Confirm the resource was created:
```bash
az staticwebapp show --name coherence-preview --resource-group <RESOURCE_GROUP> --query "defaultHostname" -o tsv
```

Save the hostname — this will be the deployment URL.

### Step 4: Get the Deployment Token

```bash
az staticwebapp secrets list \
  --name coherence-preview \
  --resource-group <RESOURCE_GROUP> \
  --query "properties.apiKey" -o tsv
```

**Important:** Tell the user to save this token. Suggest setting it as an environment variable:
```bash
export SWA_CLI_DEPLOYMENT_TOKEN="<token>"
```

For persistence, suggest adding it to `~/.zshrc` or `~/.bashrc`.

### Step 5: Install the SWA CLI

```bash
npm install -g @azure/static-web-apps-cli
```

Verify installation:
```bash
swa --version
```

### Step 6: Build the App

```bash
cd coherence-preview && npm install && npm run build
```

Verify the `dist/` folder was created:
```bash
ls coherence-preview/dist/
```

### Step 7: Deploy

If the env var is set:
```bash
swa deploy ./coherence-preview/dist --deployment-token "$SWA_CLI_DEPLOYMENT_TOKEN"
```

Or with the token inline:
```bash
swa deploy ./coherence-preview/dist --deployment-token <token>
```

After deployment, the app is live at:
```
https://<default-hostname>
```

### Step 8: Copy Static Web App Config (Optional)

If the user wants SPA routing support (so direct links / refresh work), ensure `staticwebapp.config.json` exists in `coherence-preview/` with at minimum:

```json
{
  "navigationFallback": {
    "rewrite": "/index.html"
  }
}
```

This file is already present in the repo. It also includes Azure AD auth config — if the user doesn't need auth, tell them to keep only the `navigationFallback` section.

After updating the config, rebuild and redeploy (repeat Steps 6–7).

## Redeploying

For subsequent deploys, only Steps 6–7 are needed:

```bash
cd coherence-preview && npm run build
swa deploy ./dist --deployment-token "$SWA_CLI_DEPLOYMENT_TOKEN"
```

## Troubleshooting

| Issue | Fix |
|-------|-----|
| `az: command not found` | `brew install azure-cli` |
| `swa: command not found` | `npm install -g @azure/static-web-apps-cli` |
| `AADSTS` login error | Try `az login --use-device-code` for environments with browser restrictions |
| Blank page after deploy | Ensure `staticwebapp.config.json` has `navigationFallback` and is in `dist/` |
| 401 Unauthorized on site | Auth is enabled in config — remove `routes`/`auth`/`responseOverrides` sections or complete AAD setup |
| Token expired | Re-run Step 4 to get a fresh token |
| EMU error persists | This is a GitHub error, not Azure — the CLI deploy doesn't use GitHub at all, so this shouldn't occur during CLI deploy. If seen in the Azure Portal, ignore it and use the CLI path. |
