---
name: azure-mock-data
description: Generate realistic mock data for Azure portal prototypes — resource lists, subscription metadata, IAM role assignments, metrics, activity logs, tags, and status indicators. Use when the user needs fake/sample Azure data to populate tables, cards, lists, or detail panels in a prototype. Also triggers on "generate test data", "mock Azure resources", "sample data for my prototype", or "populate this with realistic data".
---

# Azure Mock Data

Generate realistic fake data for Azure portal UI prototypes. Produces typed TypeScript arrays/objects that can be directly imported into Coherence preview components.

## Workflow

1. Identify what data the prototype needs (table rows, card items, form options, etc.)
2. Consult the reference files below for realistic field names, values, and patterns
3. Generate a typed data file (e.g., `mockData.ts`) or inline the data in the component
4. Use Azure naming conventions, real region names, realistic IDs, and proper status values

## References

- [references/resource-types.md](references/resource-types.md) — Common Azure resource schemas with field names and realistic values
- [references/sample-data.md](references/sample-data.md) — Ready-to-copy data arrays for common scenarios
- [references/status-patterns.md](references/status-patterns.md) — Status indicators, health states, and their visual representations

## Data Generation Rules

### Naming Conventions

- **Resource groups:** `rg-{project}-{env}` (e.g., `rg-contoso-prod`, `rg-webapp-dev`)
- **Resources:** `{type}-{project}-{env}-{region}` (e.g., `app-contoso-prod-eastus`)
- **Subscriptions:** `{Company} {Purpose}` (e.g., `Contoso Production`, `Dev/Test`)
- **Tags:** Use realistic key-value pairs: `Environment:Production`, `CostCenter:Engineering`, `Owner:team-platform`

### IDs and GUIDs

Generate realistic-looking (but fake) Azure resource IDs:

```typescript
// Subscription ID format
const subscriptionId = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890';

// Resource ID format
const resourceId = `/subscriptions/${subscriptionId}/resourceGroups/rg-contoso-prod/providers/Microsoft.Web/sites/app-contoso-prod`;
```

### Regions

Use real Azure region names:

| Display Name | Region Code |
|---|---|
| East US | `eastus` |
| East US 2 | `eastus2` |
| West US 2 | `westus2` |
| West US 3 | `westus3` |
| Central US | `centralus` |
| West Europe | `westeurope` |
| North Europe | `northeurope` |
| Southeast Asia | `southeastasia` |
| UK South | `uksouth` |
| Japan East | `japaneast` |

### Dates

Use ISO 8601 format. Generate dates within realistic ranges:

```typescript
// Created dates: 1-18 months ago
// Last modified: 0-30 days ago
// Expiration: 30-365 days from now
```

## Output Format

Generate data as typed TypeScript:

```typescript
interface AzureResource {
  id: string;
  name: string;
  type: string;
  resourceGroup: string;
  location: string;
  status: string;
  tags: Record<string, string>;
}

export const resources: AzureResource[] = [
  // ... items
];
```

Keep arrays to 5-8 items for prototypes — enough to look realistic without bloating the file.
