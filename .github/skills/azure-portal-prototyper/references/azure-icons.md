# Azure Icons — Iconify Fluent 2 Reference

Complete icon map for Azure portal prototypes. All icons use the Iconify API with the Fluent 2 set.

## URL Pattern

```
Regular:  https://api.iconify.design/fluent:{name}-24-regular.svg
Filled:   https://api.iconify.design/fluent:{name}-24-filled.svg
```

Use `url` for regular variant, `selectedUrl` for filled variant on `CuiIcon`.

## Navigation Icons

| Label | Icon name | Used in |
|-------|-----------|---------|
| Home / Overview | `home` | All resources |
| Activity log | `document` | All resources |
| Access control (IAM) | `person` | All resources |
| Tags | `tag` | All resources |
| Diagnose and solve problems | `stethoscope` | All resources |
| Resource visualizer | `diagram` | Resource groups |
| Events | `flash` | Event-driven resources |
| Configuration | `settings` | Settings section |
| Properties | `info` | Settings section |
| Locks | `lock-closed` | Settings section |
| Export template | `arrow-download` | Settings section |
| Networking | `globe` | Network settings |
| Security | `shield` | Security section |
| Monitoring | `pulse` | Monitoring section |
| Alerts | `alert` | Monitoring |
| Metrics | `data-bar-vertical` | Monitoring |
| Logs | `notebook` | Monitoring |
| Deployments | `rocket` | Deployment section |
| Scale up/out | `arrow-maximize` | Performance |

## Resource Type Icons

| Resource | Icon name |
|----------|-----------|
| App Service / Web App | `app-generic` |
| Function App | `flash` |
| Virtual Machine | `desktop` |
| Storage Account | `database` |
| Container App | `box` |
| Key Vault | `shield` |
| API Management | `plug-connected` |
| Cosmos DB | `globe` |
| SQL Database | `database` |
| Logic App | `flow` |
| Service Bus | `send` |
| Event Hub | `flash` |
| Kubernetes | `cube` |
| CDN | `globe` |
| Front Door | `door` |

## Content Area Icons

| Purpose | Icon name |
|---------|-----------|
| Add / Create | `add` |
| Delete / Remove | `delete` |
| Edit | `edit` |
| Refresh | `arrow-clockwise` |
| Search | `search` |
| Filter | `filter` |
| Download | `arrow-download` |
| Upload | `arrow-upload` |
| Copy | `copy` |
| Share | `share` |
| Link | `link` |
| Open external | `open` |
| More actions | `more-horizontal` |
| Star / Favorite | `star` |
| Checkmark / Success | `checkmark-circle` |
| Warning | `warning` |
| Error | `error-circle` |
| Info | `info` |
| Status running | `play` |
| Status stopped | `stop` |

## Toolbar Button Icons

Common toolbar icon pairings:

```tsx
// Add button
<CuiButton appearance="subtle" size="small">
  <CuiIcon slot="start" name="add" /> Add
</CuiButton>

// Delete button
<CuiButton appearance="subtle" size="small">
  <CuiIcon slot="start" url="https://api.iconify.design/fluent:delete-24-regular.svg" /> Delete
</CuiButton>

// Refresh (text only is standard in Azure)
<CuiButton appearance="subtle" size="small">Refresh</CuiButton>

// Edit columns
<CuiButton appearance="subtle" size="small">
  <CuiIcon slot="start" url="https://api.iconify.design/fluent:column-edit-24-regular.svg" /> Edit columns
</CuiButton>
```
