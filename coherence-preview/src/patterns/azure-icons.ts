/**
 * Azure Service Icons — Official Azure Portal icon map.
 *
 * Source: https://iconcloud.design/browse/Azure%20Icons
 * CDN:    https://github.com/maskati/azure-icons (extracted from Azure Portal)
 *
 * Usage:
 *   import { azureIcon } from '../patterns/azure-icons';
 *   <CuiIcon url={azureIcon('api-management')} />
 *
 * For UI navigation/action icons (home, settings, search, etc.) continue using
 * Fluent icons via `name` attribute or Iconify URLs — those are generic Fluent 2
 * metaphors, not Azure-branded service icons.
 */

const BASE = 'https://raw.githubusercontent.com/maskati/azure-icons/main/svg';

/** Map of Azure service keys → official portal icon SVG URLs */
export const AZURE_ICONS: Record<string, string> = {
  // ─── App Services ───
  'function-app':       `${BASE}/WebsitesExtension/Website.svg`,
  'web-app':            `${BASE}/WebsitesExtension/Webapp.svg`,
  'app-service':        `${BASE}/WebsitesExtension/Website.svg`,
  'app-service-plan':   `${BASE}/WebsitesExtension/WebHostingPlan.svg`,
  'static-web-app':     `${BASE}/WebsitesExtension/StaticSite.svg`,
  'container-app':      `${BASE}/WebsitesExtension/ContainerApp.svg`,
  'container-app-env':  `${BASE}/WebsitesExtension/ContainerAppEnvironment.svg`,

  // ─── API & Integration ───
  'api-management':     `${BASE}/Microsoft_Azure_ApiManagement/Service.svg`,
  'api-center':         `${BASE}/Microsoft_Azure_ApiManagement/Center.svg`,
  'logic-app':          `${BASE}/Microsoft_Azure_EMA/Workflow.svg`,
  'service-bus':        `${BASE}/Microsoft_Azure_ServiceBus/ServiceBus.svg`,
  'event-hub':          `${BASE}/Microsoft_Azure_EventHub/EventHub.svg`,

  // ─── Compute ───
  'virtual-machine':    `${BASE}/Microsoft_Azure_Compute/VirtualMachine.svg`,
  'vm-scale-set':       `${BASE}/Microsoft_Azure_Compute/VirtualMachineScaleSet.svg`,
  'availability-set':   `${BASE}/Microsoft_Azure_Compute/AvailabilitySet.svg`,
  'compute-fleet':      `${BASE}/Microsoft_Azure_AzFleet/AzureFleet.svg`,

  // ─── Containers ───
  'kubernetes':         `${BASE}/Microsoft_Azure_ContainerService/ManagedClusters.svg`,
  'aks':                `${BASE}/Microsoft_Azure_ContainerService/ManagedClusters.svg`,
  'container-registry': `${BASE}/Microsoft_Azure_ContainerRegistries/RegistryResource.svg`,
  'container-instance': `${BASE}/Microsoft_Azure_ContainerService/ContainerGroup.svg`,

  // ─── Data ───
  'cosmos-db':          `${BASE}/Microsoft_Azure_DocumentDB/DocumentDBDatabaseAccount.svg`,
  'sql-database':       `${BASE}/SqlAzureExtension/Database.svg`,
  'sql-server':         `${BASE}/SqlAzureExtension/Server.svg`,
  'sql-managed':        `${BASE}/SqlAzureExtension/ManagedInstance.svg`,
  'data-factory':       `${BASE}/Microsoft_Azure_DataFactory/DataFactoryv2.svg`,
  'databricks':         `${BASE}/Microsoft_Azure_Databricks/Workspace.svg`,
  'data-lake':          `${BASE}/Microsoft_Azure_DataLakeStore/CaboAccount.svg`,

  // ─── Storage ───
  'storage-account':    `${BASE}/Microsoft_Azure_Storage/StorageAccount.svg`,

  // ─── Networking ───
  'virtual-network':    `${BASE}/Microsoft_Azure_Network/VirtualNetwork.svg`,
  'load-balancer':      `${BASE}/Microsoft_Azure_Network/LoadBalancer.svg`,
  'nsg':                `${BASE}/Microsoft_Azure_Network/NetworkSecurityGroup.svg`,
  'public-ip':          `${BASE}/Microsoft_Azure_Network/PublicIpAddress.svg`,
  'private-endpoint':   `${BASE}/Microsoft_Azure_Network/PrivateEndpoint.svg`,
  'nat-gateway':        `${BASE}/Microsoft_Azure_Network/NatGateway.svg`,
  'dns-zone':           `${BASE}/Microsoft_Azure_Network/DnsZone.svg`,
  'front-door':         `${BASE}/Microsoft_Azure_AFDX/FrontdoorProfile.svg`,
  'cdn':                `${BASE}/Microsoft_Azure_Cdn/CdnProfile.svg`,
  'traffic-manager':    `${BASE}/Microsoft_Azure_DNS/TrafficManager.svg`,

  // ─── Security & Identity ───
  'key-vault':          `${BASE}/Microsoft_Azure_KeyVault/KeyVault.svg`,
  'entra-id':           `${BASE}/Microsoft_AAD_IAM/AzureActiveDirectory.svg`,
  'app-registration':   `${BASE}/Microsoft_AAD_RegisteredApps/RegisteredApps.svg`,

  // ─── Monitoring ───
  'monitor':            `${BASE}/Microsoft_Azure_Monitoring/AzureMonitoring.svg`,
  'application-insights': `${BASE}/AppInsightsExtension/ApplicationInsights.svg`,
  'log-analytics':      `${BASE}/Microsoft_OperationsManagementSuite_Workspace/LogAnalytics.svg`,

  // ─── DevOps & Dev Tools ───
  'dev-center':         `${BASE}/Microsoft_Azure_DevCenter/DevCenter.svg`,
  'dev-box':            `${BASE}/Microsoft_Azure_DevCenter/DevCenter.svg`,
  'devops':             `${BASE}/AzureTfsExtension/Organization.svg`,
  'load-testing':       `${BASE}/Microsoft_Azure_CloudNativeTesting/CloudNativeTesting.svg`,

  // ─── AI & ML ───
  'cognitive-services': `${BASE}/Microsoft_Azure_ProjectOxford/CognitiveServices.svg`,
  'bot-service':        `${BASE}/Microsoft_Azure_BotService/BotService.svg`,

  // ─── Portal & Management ───
  'resource-group':     `${BASE}/HubsExtension/ResourceGroups.svg`,
  'subscription':       `${BASE}/Microsoft_Azure_Billing/Subscription.svg`,
  'dashboard':          `${BASE}/HubsExtension/Dashboards.svg`,
  'automation':         `${BASE}/Microsoft_Azure_Automation/Account.svg`,
  'batch':              `${BASE}/Microsoft_Azure_Batch/BatchAccount.svg`,
  'grafana':            `${BASE}/Microsoft_Azure_Dashboard/AzureDashboardGrafanaResource.svg`,

  // ─── Backup & Recovery ───
  'backup-vault':       `${BASE}/Microsoft_Azure_DataProtection/DataProtectionResource.svg`,
  'recovery-vault':     `${BASE}/Microsoft_Azure_RecoveryServices/RecoveryServicesResource.svg`,
};

/**
 * Look up the official Azure service icon URL by key.
 * Returns `undefined` when there is no mapping — caller should fall back
 * to a Fluent icon via the `name` attribute or Iconify URL.
 */
export function azureIcon(key: string): string | undefined {
  return AZURE_ICONS[key];
}
