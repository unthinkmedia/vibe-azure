---
name: share-experiment
description: Deploy and share Coherence preview experiments via Azure Static Web Apps. Use when the user says "deploy", "publish", "share", or "host" in combination with experiment, preview, or prototype. Also triggers on "share this with my team", "deploy to Azure", "make this accessible", or "get a shareable link".
---

# Share Experiment

Deploy the `coherence-preview/` app to Azure Static Web Apps so experiments are accessible via a permanent URL with Azure AD authentication.

## Architecture

```
GitHub repo (push/PR) → GitHub Actions → Build Vite app → Deploy to Azure Static Web Apps
                                                            ↓
                                         https://<app-name>.azurestaticapps.net/#<experiment-id>
```

- Hash-based routing (`#experiment-id`) means direct links to any experiment work without server config
- PR preview environments are created automatically — each PR gets a unique staging URL
- Azure AD restricts access to `@microsoft.com` users

## First-Time Setup

Complete these steps in order. Steps 1–3 are one-time setup.

### 1. Create the Azure Static Web App Resource

Run in terminal:

```bash
az staticwebapp create \
  --name coherence-preview \
  --resource-group <RESOURCE_GROUP> \
  --source https://github.com/unthinkmedia/vibe-azure \
  --branch main \
  --app-location "coherence-preview/dist" \
  --login-with-aad
```

If the user doesn't know their resource group, help them find one:

```bash
az group list --output table
```

Or create one:

```bash
az group create --name coherence-preview-rg --location westus2
```

After creation, retrieve the deployment token:

```bash
az staticwebapp secrets list --name coherence-preview --query "properties.apiKey" -o tsv
```

### 2. Add the Deployment Token to GitHub

Add the token as a GitHub Actions secret named `AZURE_STATIC_WEB_APPS_API_TOKEN`:

1. Go to `https://github.com/unthinkmedia/vibe-azure/settings/secrets/actions`
2. Click "New repository secret"
3. Name: `AZURE_STATIC_WEB_APPS_API_TOKEN`
4. Value: the token from step 1

### 3. Copy Config Files into the Repo

Copy from this skill's assets into the repo:

```
assets/azure-static-web-apps-deploy.yml → .github/workflows/azure-static-web-apps-deploy.yml
assets/staticwebapp.config.json         → coherence-preview/staticwebapp.config.json
```

Use `read_file` on the asset files and `create_file` to place them in the correct locations.

### 4. Deploy

Push to `main` or open a PR. The GitHub Actions workflow handles the rest.

## Azure AD Authentication (Optional)

The `staticwebapp.config.json` asset includes Azure AD auth configuration using the Microsoft corporate tenant (`72f988bf-86f1-41af-91ab-2d7cd011db47`). This restricts access to `@microsoft.com` users.

To enable it:

1. Register an app in Azure AD (portal.azure.com → App registrations → New registration)
2. Set redirect URI to `https://<app-name>.azurestaticapps.net/.auth/login/aad/callback`
3. Add the client ID and secret as app settings in the Static Web App:

```bash
az staticwebapp appsettings set --name coherence-preview \
  --setting-names AAD_CLIENT_ID=<client-id> AAD_CLIENT_SECRET=<client-secret>
```

To skip auth, remove the `routes`, `auth`, and `responseOverrides` sections from `staticwebapp.config.json` before copying it — keep only the `navigationFallback`.

## Sharing a Direct Link

After deployment, construct links using the hash fragment:

```
https://<app-name>.azurestaticapps.net/#<experiment-id>
```

The experiment ID is the `id` field from the experiment registry in `coherence-preview/src/main.tsx`.

Examples:
- `https://coherence-preview.azurestaticapps.net/#key-vault-page`
- `https://coherence-preview.azurestaticapps.net/#subscriptions-page`
- `https://coherence-preview.azurestaticapps.net/#copilot-button`

For PR preview environments, the URL is:
```
https://<app-name>-<PR-number>.<region>.azurestaticapps.net/#<experiment-id>
```

## Troubleshooting

| Issue | Fix |
|-------|-----|
| 401 on page load | Azure AD not configured — remove auth config or complete AAD setup |
| 404 on refresh | Ensure `staticwebapp.config.json` has `navigationFallback` |
| Workflow fails | Check `AZURE_STATIC_WEB_APPS_API_TOKEN` secret is set |
| Blank page | Ensure `vite build` produces output in `coherence-preview/dist/` |
| PR env not created | Verify workflow `paths` filter includes `coherence-preview/**` |
