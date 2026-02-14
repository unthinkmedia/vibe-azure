# Page Types — Detailed Anatomy

Detailed customization guidance for each Azure portal page scaffold.

## Resource Page (`azure-resource-page.tsx`)

The default Azure resource blade. Use for any single-resource view.

### Anatomy

```
┌──────────────────────────────────────────────┐
│ Header (Microsoft Azure + search + avatar)    │
├──────────┬───────────────────────────────────┤
│ Side Nav │ Breadcrumb: Home > resourceName    │
│          │ Icon + resourceName | pageTitle ★  │
│ Overview │ resourceType subtitle              │
│ Activity │ ──── Toolbar (Add | Refresh | …) ──│
│ IAM      │ ──── Divider ─────────────────────│
│ Tags     │                                    │
│ ───────  │   Page content area                │
│ Settings │   (cards, tables, forms, etc.)     │
│ Config   │                                    │
│ Props    │                                    │
└──────────┴───────────────────────────────────┘
```

### Customization Checklist

- [ ] Set `resourceName`, `pageTitle`, `resourceType` variables
- [ ] Replace nav items with resource-specific pages
- [ ] Update page icon to match resource type
- [ ] Add toolbar actions relevant to the page
- [ ] Fill content area with appropriate components

### Common Resource Types and Icons

| Resource | Icon | Type subtitle |
|----------|------|---------------|
| App Service | `app-generic` | Web App |
| Function App | `flash` | Function App |
| Virtual Machine | `desktop` | Virtual machine |
| Storage Account | `database` | Storage account |
| SQL Database | `database` | SQL database |
| Cosmos DB | `globe` | Azure Cosmos DB account |
| Key Vault | `shield` | Key vault |
| Container App | `box` | Container App |

---

## List Page (`azure-list-page.tsx`)

Two-column layout with selectable list on the left and detail area on the right.

### Anatomy

```
┌──────────────────────────────────────────────┐
│ Header                                        │
├──────────┬──────────────┬────────────────────┤
│ Side Nav │ List Panel   │ Detail Area         │
│          │ ┌──────────┐ │                     │
│          │ │ Search   │ │  Selected item      │
│          │ ├──────────┤ │  details, actions,  │
│          │ │ Item 1 ← │ │  sub-content        │
│          │ │ Item 2   │ │                     │
│          │ │ Item 3   │ │                     │
│          │ │ …        │ │                     │
│          │ └──────────┘ │                     │
└──────────┴──────────────┴────────────────────┘
```

### Customization Checklist

- [ ] Define your list item type (interface)
- [ ] Populate the items array with real/mock data
- [ ] Customize the list item rendering (title, subtitle, badges)
- [ ] Build the detail panel content for selected items
- [ ] Add filtering/search within the list panel

---

## Create Flow (`azure-create-flow.tsx`)

Multi-step creation wizard with tabbed form and bottom action bar.

### Anatomy

```
┌──────────────────────────────────────────────┐
│ Header                                        │
├──────────┬───────────────────────────────────┤
│ Side Nav │ Breadcrumb + Title                 │
│          │                                    │
│          │ ┌─ Tabs ─────────────────────────┐ │
│          │ │ Basics │ Network │ Tags │ Review │
│          │ ├─────────────────────────────────┤ │
│          │ │                                 │ │
│          │ │  Form fields for active tab     │ │
│          │ │                                 │ │
│          │ ├─────────────────────────────────┤ │
│          │ │ [Review + create]    [< Prev]   │ │
│          │ │                      [Next >]   │ │
│          │ └─────────────────────────────────┘ │
└──────────┴───────────────────────────────────┘
```

### Customization Checklist

- [ ] Define tab names for your resource type
- [ ] Add form fields per tab (inputs, selects, radio groups)
- [ ] Connect Review tab to display a summary of all inputs
- [ ] Wire up the Create button to show a success/failure banner
- [ ] Replace `resourceType` label

### Common Tab Configurations

| Resource | Tabs |
|----------|------|
| App Service | Basics, Docker, Networking, Monitoring, Tags, Review |
| Virtual Machine | Basics, Disks, Networking, Management, Advanced, Tags, Review |
| Storage Account | Basics, Advanced, Networking, Data protection, Encryption, Tags, Review |
| Function App | Basics, Storage, Networking, Monitoring, Deployment, Tags, Review |

---

## Overview Page (`azure-overview-page.tsx`)

Resource overview with essentials panel and card grid sections.

### Anatomy

```
┌──────────────────────────────────────────────┐
│ Header                                        │
├──────────┬───────────────────────────────────┤
│ Side Nav │ Breadcrumb + Title + Toolbar       │
│          │                                    │
│          │ ┌─ Essentials ───────────────────┐ │
│          │ │ Resource group │ Status         │ │
│          │ │ Location       │ Subscription   │ │
│          │ │ Subscription ID│ Tags           │ │
│          │ └────────────────────────────────┘ │
│          │                                    │
│          │ ── Section Title ─────────────────│ │
│          │ ┌────────┐ ┌────────┐ ┌────────┐ │ │
│          │ │ Card 1 │ │ Card 2 │ │ Card 3 │ │ │
│          │ └────────┘ └────────┘ └────────┘ │ │
└──────────┴───────────────────────────────────┘
```

### Customization Checklist

- [ ] Fill essentials panel key-value pairs for your resource
- [ ] Add section cards (Monitoring, Capabilities, Recommendations)
- [ ] Add status badge/indicator
- [ ] Add "Get started" or "Quickstart" cards if appropriate
