/**
 * Icon data aggregator — pulls from all available icon datasources:
 *
 * 1. Azure Portal Icons (maskati/azure-icons): ~1427 official portal SVGs
 * 2. CuiIcon built-in names: ~120 Fluent 2 icons registered via project config
 * 3. Curated azure-icons.ts mappings: friendly aliases used in experiments
 * 4. benc-uk/icon-collection extras (function-app, home)
 */

import fs from "node:fs/promises";
import path from "node:path";
import { resolveIconUrls } from "./svg-cache.js";

const AZURE_ICONS_BASE =
  "https://raw.githubusercontent.com/maskati/azure-icons/main/svg";

export interface IconEntry {
  /** Unique id for deduplication */
  id: string;
  /** Display name */
  name: string;
  /** Source datasource */
  source: "azure-portal" | "cui-builtin" | "curated" | "icon-collection";
  /** Category / extension grouping */
  category: string;
  /** SVG URL (null for cui-builtin icons rendered via name attr) */
  url: string | null;
  /** For cui-builtin: the name attribute to use */
  cuiName?: string;
  /** Usage hint for the model */
  usage: string;
}

// ─── Curated icons from azure-icons.ts ───

const CURATED_ICONS: Record<string, { url: string; category: string }> = {
  overview: { url: `${AZURE_ICONS_BASE}/Microsoft_AAD_IAM/Overview.svg`, category: "Navigation" },
  "activity-log": { url: `${AZURE_ICONS_BASE}/Microsoft_Azure_ActivityLog/ActivityLogAsset.svg`, category: "Navigation" },
  tags: { url: `${AZURE_ICONS_BASE}/HubsExtension/Tag.svg`, category: "Navigation" },
  diagnostics: { url: `${AZURE_ICONS_BASE}/Microsoft_AAD_IAM/DiagnosticsHome.svg`, category: "Navigation" },
  policy: { url: `${AZURE_ICONS_BASE}/Microsoft_Azure_Policy/PolicyHub.svg`, category: "Navigation" },
  compliance: { url: `${AZURE_ICONS_BASE}/Microsoft_Azure_AppComplianceAutomation/AppComplianceAutomation.svg`, category: "Navigation" },
  security: { url: `${AZURE_ICONS_BASE}/Microsoft_AAD_IAM/Security.svg`, category: "Security" },
  identity: { url: `${AZURE_ICONS_BASE}/Microsoft_AAD_IAM/AzureActiveDirectory.svg`, category: "Security" },
  "resource-groups": { url: `${AZURE_ICONS_BASE}/HubsExtension/ResourceGroups.svg`, category: "Management" },
  "all-resources": { url: `${AZURE_ICONS_BASE}/HubsExtension/BrowseAllResources.svg`, category: "Management" },
  deployments: { url: `${AZURE_ICONS_BASE}/HubsExtension/Deployments.svg`, category: "Management" },
  "audit-logs": { url: `${AZURE_ICONS_BASE}/Microsoft_AAD_IAM/AuditLogs.svg`, category: "Security" },
  "sign-in-logs": { url: `${AZURE_ICONS_BASE}/Microsoft_AAD_IAM/SignInLogs.svg`, category: "Security" },
  "user-management": { url: `${AZURE_ICONS_BASE}/Microsoft_AAD_IAM/UserManagement.svg`, category: "Security" },
  groups: { url: `${AZURE_ICONS_BASE}/Microsoft_AAD_IAM/GroupsManagement.svg`, category: "Security" },
  roles: { url: `${AZURE_ICONS_BASE}/Microsoft_AAD_IAM/AllRolesBlade.svg`, category: "Security" },
  lockbox: { url: `${AZURE_ICONS_BASE}/Microsoft_Azure_Lockbox/AzureLockbox.svg`, category: "Security" },
  properties: { url: `${AZURE_ICONS_BASE}/Microsoft_AAD_IAM/TenantProperties.svg`, category: "Management" },
  "portal-settings": { url: `${AZURE_ICONS_BASE}/Microsoft_AAD_IAM/Settings.svg`, category: "Management" },
  "cost-alerts": { url: `${AZURE_ICONS_BASE}/Microsoft_Azure_CostManagement/CostAlerts.svg`, category: "Cost Management" },
  "security-alerts": { url: `${AZURE_ICONS_BASE}/Microsoft_Azure_Security/SecurityAlerts.svg`, category: "Security" },
  workbooks: { url: `${AZURE_ICONS_BASE}/AppInsightsExtension/Workbooks.svg`, category: "Monitoring" },
  "function-app": { url: "https://raw.githubusercontent.com/benc-uk/icon-collection/master/azure-icons/Function-Apps.svg", category: "App Services" },
  "web-app": { url: `${AZURE_ICONS_BASE}/WebsitesExtension/Webapp.svg`, category: "App Services" },
  "app-service": { url: `${AZURE_ICONS_BASE}/WebsitesExtension/Website.svg`, category: "App Services" },
  "app-service-plan": { url: `${AZURE_ICONS_BASE}/WebsitesExtension/WebHostingPlan.svg`, category: "App Services" },
  "static-web-app": { url: `${AZURE_ICONS_BASE}/WebsitesExtension/StaticSite.svg`, category: "App Services" },
  "container-app": { url: `${AZURE_ICONS_BASE}/WebsitesExtension/ContainerApp.svg`, category: "App Services" },
  "container-app-env": { url: `${AZURE_ICONS_BASE}/WebsitesExtension/ContainerAppEnvironment.svg`, category: "App Services" },
  "api-management": { url: `${AZURE_ICONS_BASE}/Microsoft_Azure_ApiManagement/Service.svg`, category: "API & Integration" },
  "api-center": { url: `${AZURE_ICONS_BASE}/Microsoft_Azure_ApiManagement/Center.svg`, category: "API & Integration" },
  "logic-app": { url: `${AZURE_ICONS_BASE}/Microsoft_Azure_EMA/Workflow.svg`, category: "API & Integration" },
  "service-bus": { url: `${AZURE_ICONS_BASE}/Microsoft_Azure_ServiceBus/ServiceBus.svg`, category: "API & Integration" },
  "event-hub": { url: `${AZURE_ICONS_BASE}/Microsoft_Azure_EventHub/EventHub.svg`, category: "API & Integration" },
  "virtual-machine": { url: `${AZURE_ICONS_BASE}/Microsoft_Azure_Compute/VirtualMachine.svg`, category: "Compute" },
  "vm-scale-set": { url: `${AZURE_ICONS_BASE}/Microsoft_Azure_Compute/VirtualMachineScaleSet.svg`, category: "Compute" },
  "availability-set": { url: `${AZURE_ICONS_BASE}/Microsoft_Azure_Compute/AvailabilitySet.svg`, category: "Compute" },
  "compute-fleet": { url: `${AZURE_ICONS_BASE}/Microsoft_Azure_AzFleet/AzureFleet.svg`, category: "Compute" },
  kubernetes: { url: `${AZURE_ICONS_BASE}/Microsoft_Azure_ContainerService/ManagedClusters.svg`, category: "Containers" },
  aks: { url: `${AZURE_ICONS_BASE}/Microsoft_Azure_ContainerService/ManagedClusters.svg`, category: "Containers" },
  "container-registry": { url: `${AZURE_ICONS_BASE}/Microsoft_Azure_ContainerRegistries/RegistryResource.svg`, category: "Containers" },
  "container-instance": { url: `${AZURE_ICONS_BASE}/Microsoft_Azure_ContainerService/ContainerGroup.svg`, category: "Containers" },
  "cosmos-db": { url: `${AZURE_ICONS_BASE}/Microsoft_Azure_DocumentDB/DocumentDBDatabaseAccount.svg`, category: "Data" },
  "sql-database": { url: `${AZURE_ICONS_BASE}/SqlAzureExtension/Database.svg`, category: "Data" },
  "sql-server": { url: `${AZURE_ICONS_BASE}/SqlAzureExtension/Server.svg`, category: "Data" },
  "sql-managed": { url: `${AZURE_ICONS_BASE}/SqlAzureExtension/ManagedInstance.svg`, category: "Data" },
  "data-factory": { url: `${AZURE_ICONS_BASE}/Microsoft_Azure_DataFactory/DataFactoryv2.svg`, category: "Data" },
  databricks: { url: `${AZURE_ICONS_BASE}/Microsoft_Azure_Databricks/Workspace.svg`, category: "Data" },
  "data-lake": { url: `${AZURE_ICONS_BASE}/Microsoft_Azure_DataLakeStore/CaboAccount.svg`, category: "Data" },
  "storage-account": { url: `${AZURE_ICONS_BASE}/Microsoft_Azure_Storage/StorageAccount.svg`, category: "Storage" },
  "virtual-network": { url: `${AZURE_ICONS_BASE}/Microsoft_Azure_Network/VirtualNetwork.svg`, category: "Networking" },
  "load-balancer": { url: `${AZURE_ICONS_BASE}/Microsoft_Azure_Network/LoadBalancer.svg`, category: "Networking" },
  nsg: { url: `${AZURE_ICONS_BASE}/Microsoft_Azure_Network/NetworkSecurityGroup.svg`, category: "Networking" },
  "public-ip": { url: `${AZURE_ICONS_BASE}/Microsoft_Azure_Network/PublicIpAddress.svg`, category: "Networking" },
  "private-endpoint": { url: `${AZURE_ICONS_BASE}/Microsoft_Azure_Network/PrivateEndpoint.svg`, category: "Networking" },
  "nat-gateway": { url: `${AZURE_ICONS_BASE}/Microsoft_Azure_Network/NatGateway.svg`, category: "Networking" },
  "dns-zone": { url: `${AZURE_ICONS_BASE}/Microsoft_Azure_Network/DnsZone.svg`, category: "Networking" },
  "front-door": { url: `${AZURE_ICONS_BASE}/Microsoft_Azure_AFDX/FrontdoorProfile.svg`, category: "Networking" },
  cdn: { url: `${AZURE_ICONS_BASE}/Microsoft_Azure_Cdn/CdnProfile.svg`, category: "Networking" },
  "traffic-manager": { url: `${AZURE_ICONS_BASE}/Microsoft_Azure_DNS/TrafficManager.svg`, category: "Networking" },
  "key-vault": { url: `${AZURE_ICONS_BASE}/Microsoft_Azure_KeyVault/KeyVault.svg`, category: "Security" },
  "entra-id": { url: `${AZURE_ICONS_BASE}/Microsoft_AAD_IAM/AzureActiveDirectory.svg`, category: "Security" },
  "app-registration": { url: `${AZURE_ICONS_BASE}/Microsoft_AAD_RegisteredApps/RegisteredApps.svg`, category: "Security" },
  monitor: { url: `${AZURE_ICONS_BASE}/Microsoft_Azure_Monitoring/AzureMonitoring.svg`, category: "Monitoring" },
  "application-insights": { url: `${AZURE_ICONS_BASE}/AppInsightsExtension/ApplicationInsights.svg`, category: "Monitoring" },
  "log-analytics": { url: `${AZURE_ICONS_BASE}/Microsoft_OperationsManagementSuite_Workspace/LogAnalytics.svg`, category: "Monitoring" },
  "dev-center": { url: `${AZURE_ICONS_BASE}/Microsoft_Azure_DevCenter/DevCenter.svg`, category: "DevOps" },
  "dev-box": { url: `${AZURE_ICONS_BASE}/Microsoft_Azure_DevCenter/DevCenter.svg`, category: "DevOps" },
  devops: { url: `${AZURE_ICONS_BASE}/AzureTfsExtension/Organization.svg`, category: "DevOps" },
  "load-testing": { url: `${AZURE_ICONS_BASE}/Microsoft_Azure_CloudNativeTesting/CloudNativeTesting.svg`, category: "DevOps" },
  "cognitive-services": { url: `${AZURE_ICONS_BASE}/Microsoft_Azure_ProjectOxford/CognitiveServices.svg`, category: "AI & ML" },
  "bot-service": { url: `${AZURE_ICONS_BASE}/Microsoft_Azure_BotService/BotService.svg`, category: "AI & ML" },
  advisor: { url: `${AZURE_ICONS_BASE}/Microsoft_Azure_Expert/Advisor.svg`, category: "Management" },
  defender: { url: `${AZURE_ICONS_BASE}/Microsoft_Azure_Security/SecurityCenter.svg`, category: "Security" },
  "cost-management": { url: `${AZURE_ICONS_BASE}/Microsoft_Azure_CostManagement/CostManagement.svg`, category: "Cost Management" },
  "resource-group": { url: `${AZURE_ICONS_BASE}/HubsExtension/ResourceGroups.svg`, category: "Management" },
  subscription: { url: `${AZURE_ICONS_BASE}/Microsoft_Azure_Billing/Subscription.svg`, category: "Management" },
  dashboard: { url: `${AZURE_ICONS_BASE}/Microsoft_Azure_PortalDashboard/Dashboards.svg`, category: "Management" },
  home: { url: "https://raw.githubusercontent.com/benc-uk/icon-collection/master/azure-cds/general-17-Home.svg", category: "Management" },
  automation: { url: `${AZURE_ICONS_BASE}/Microsoft_Azure_Automation/Account.svg`, category: "Management" },
  batch: { url: `${AZURE_ICONS_BASE}/Microsoft_Azure_Batch/BatchAccount.svg`, category: "Compute" },
  grafana: { url: `${AZURE_ICONS_BASE}/Microsoft_Azure_Dashboard/AzureDashboardGrafanaResource.svg`, category: "Monitoring" },
  "backup-vault": { url: `${AZURE_ICONS_BASE}/Microsoft_Azure_DataProtection/DataProtectionResource.svg`, category: "Backup & Recovery" },
  "recovery-vault": { url: `${AZURE_ICONS_BASE}/Microsoft_Azure_RecoveryServices/RecoveryServicesResource.svg`, category: "Backup & Recovery" },
};

// ─── CuiIcon built-in names ───

const CUI_SIMPLE_NAMES = [
  "accessibility", "add", "alert", "attach", "bookmark", "bot", "calendar",
  "chat", "checkmark", "clock", "comment", "copilot", "copy", "cut", "delete",
  "dislike", "dismiss", "edit", "emoji", "eye", "filter", "history", "hourglass",
  "info", "like", "link", "location", "mail", "navigation", "open", "options",
  "paste", "pause", "person", "phone", "pin", "play", "prohibited", "resize",
  "save", "search", "send", "settings", "share", "snooze", "star", "stop", "warning",
];

const CUI_COMPOUND_NAMES = [
  "arrow-clockwise", "arrow-download", "arrow-left", "arrow-maximize",
  "arrow-minimize", "arrow-move", "arrow-redo-regular", "arrow-reply",
  "arrow-right", "arrow-sort-down", "arrow-sort-up", "arrow-sync",
  "arrow-undo-regular", "arrow-upload", "bookmark-filled", "calendar-clock",
  "checkmark-circle", "chevron-double-left", "chevron-double-right",
  "chevron-down", "chevron-left", "chevron-up", "circle-half-fill",
  "code-regular", "contact-card", "copy-filled", "cut-filled", "dislike-filled",
  "dismiss-circle", "document-checkmark", "document-edit", "document-ribbon",
  "emoji-meh", "emoji-sad", "error-circle", "eye-off", "filter-filled",
  "highlight-regular", "like-filled", "link-edit-regular", "link-regular",
  "lock-closed", "lock-open", "more-horizontal", "paste-filled",
  "person-feedback", "pin-filled", "star-filled", "start-line-horizontal",
  "subtract-circle", "tap-single", "task-list", "text-align-center-regular",
  "text-align-left-regular", "text-align-right-regular", "text-bold-regular",
  "text-bullet-list-regular", "text-clear-formatting-regular",
  "text-color-regular", "text-font-regular", "text-font-size-regular",
  "text-header-1-regular", "text-header-2-regular", "text-header-3-regular",
  "text-header-4-regular", "text-header-5-regular", "text-header-6-regular",
  "text-indent-decrease-regular", "text-indent-increase-regular",
  "text-italic-regular", "text-number-list-ltr-regular", "text-quote-regular",
  "text-strikethrough-regular", "text-subscript-regular",
  "text-superscript-regular", "text-t-regular", "text-underline-regular",
  "zoom-in", "zoom-out",
];

/**
 * Parse the azure-icons-inventory.md to extract all ~1427 Azure portal icons.
 * Reads from the full icon list table section.
 */
async function parseAzureIconInventory(): Promise<IconEntry[]> {
  const inventoryPath = path.join(
    import.meta.dirname,
    "..",
    "..",
    "azure-icons-inventory.md"
  );
  let content: string;
  try {
    content = await fs.readFile(inventoryPath, "utf-8");
  } catch {
    return [];
  }

  const icons: IconEntry[] = [];
  const lines = content.split("\n");

  // Find the "Full Icon List" section
  let inTable = false;
  let headerSkipped = false;

  for (const line of lines) {
    if (line.includes("## Full Icon List")) {
      inTable = true;
      continue;
    }
    if (!inTable) continue;

    // Skip the table header line and separator
    if (line.startsWith("| #") || line.startsWith("|---")) {
      headerSkipped = true;
      continue;
    }

    // Stop at next heading
    if (line.startsWith("##")) break;

    if (!headerSkipped || !line.startsWith("|")) continue;

    // Parse: | # | Icon Name | Category | Extension | CDN URL |
    const cells = line.split("|").map((c) => c.trim()).filter(Boolean);
    if (cells.length < 5) continue;

    const iconName = cells[1];
    const category = cells[2];
    const extension = cells[3].replace(/`/g, "");
    // Extract URL from markdown link: [SVG](url)
    const urlMatch = cells[4].match(/\((https?:\/\/[^)]+)\)/);
    if (!urlMatch) continue;

    const url = urlMatch[1];
    const id = `azure-portal:${extension}/${iconName}`;

    icons.push({
      id,
      name: iconName,
      source: "azure-portal",
      category,
      url,
      usage: `<CuiIcon url="${url}" label="${iconName}" />`,
    });
  }

  return icons;
}

/**
 * Build the full icon list from all sources.
 */
export async function getAllIcons(): Promise<{
  icons: IconEntry[];
  sources: { source: string; count: number }[];
  categories: { category: string; count: number }[];
}> {
  // 1. Curated icons (highest priority, shown first)
  const curated: IconEntry[] = Object.entries(CURATED_ICONS).map(([key, val]) => ({
    id: `curated:${key}`,
    name: key,
    source: "curated" as const,
    category: val.category,
    url: val.url,
    usage: `azureIcon('${key}')`,
  }));

  // 2. CuiIcon built-in names
  const cuiIcons: IconEntry[] = [
    ...CUI_SIMPLE_NAMES.map((name) => ({
      id: `cui-builtin:${name}`,
      name,
      source: "cui-builtin" as const,
      category: "Fluent UI — Simple",
      url: null,
      cuiName: name,
      usage: `<CuiIcon name="${name}" />`,
    })),
    ...CUI_COMPOUND_NAMES.map((name) => ({
      id: `cui-builtin:${name}`,
      name,
      source: "cui-builtin" as const,
      category: "Fluent UI — Compound",
      url: null,
      cuiName: name,
      usage: `<CuiIcon name="${name}" />`,
    })),
  ];

  // 3. Full Azure portal inventory
  const portalIcons = await parseAzureIconInventory();

  // Combine — curated first, then cui, then portal
  const icons = [...curated, ...cuiIcons, ...portalIcons];

  // Build source counts
  const sourceCounts = new Map<string, number>();
  const categoryCounts = new Map<string, number>();
  for (const icon of icons) {
    sourceCounts.set(icon.source, (sourceCounts.get(icon.source) ?? 0) + 1);
    categoryCounts.set(icon.category, (categoryCounts.get(icon.category) ?? 0) + 1);
  }

  return {
    icons,
    sources: [...sourceCounts.entries()]
      .map(([source, count]) => ({ source, count }))
      .sort((a, b) => b.count - a.count),
    categories: [...categoryCounts.entries()]
      .map(([category, count]) => ({ category, count }))
      .sort((a, b) => a.category.localeCompare(b.category)),
  };
}

/**
 * Search/filter icons by query and optional filters.
 */
export async function searchIcons(opts: {
  query?: string;
  source?: string;
  category?: string;
  limit?: number;
}): Promise<{
  icons: IconEntry[];
  total: number;
  sources: { source: string; count: number }[];
  categories: { category: string; count: number }[];
}> {
  const all = await getAllIcons();
  let filtered = all.icons;

  if (opts.source) {
    filtered = filtered.filter((i) => i.source === opts.source);
  }
  if (opts.category) {
    filtered = filtered.filter((i) => i.category === opts.category);
  }
  if (opts.query) {
    const q = opts.query.toLowerCase();
    filtered = filtered.filter(
      (i) =>
        i.name.toLowerCase().includes(q) ||
        i.category.toLowerCase().includes(q) ||
        i.id.toLowerCase().includes(q)
    );
  }

  const total = filtered.length;
  const limit = opts.limit ?? 200;
  const page = filtered.slice(0, limit);

  // Resolve external SVG URLs to data URIs for webview CSP compatibility
  const urls = page.filter((i) => i.url).map((i) => i.url!);
  const resolved = await resolveIconUrls(urls);

  const icons = page.map((icon) => {
    if (icon.url && resolved.has(icon.url)) {
      const dataUri = resolved.get(icon.url);
      if (dataUri) {
        return { ...icon, displayUrl: dataUri };
      }
    }
    return icon;
  });

  return {
    icons,
    total,
    sources: all.sources,
    categories: all.categories,
  };
}
