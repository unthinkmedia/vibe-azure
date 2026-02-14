# Ready-to-Copy Sample Data

Pre-built TypeScript data arrays for common Azure portal prototype scenarios. Copy directly into components or a shared `mockData.ts` file.

## Resource List (Generic)

```typescript
export const resources = [
  { name: 'app-contoso-prod-eastus', type: 'App Service', resourceGroup: 'rg-contoso-prod', location: 'East US', status: 'Running' },
  { name: 'func-orders-prod-eastus', type: 'Function App', resourceGroup: 'rg-contoso-prod', location: 'East US', status: 'Running' },
  { name: 'vm-web-prod-01', type: 'Virtual Machine', resourceGroup: 'rg-infra-prod', location: 'West US 2', status: 'Running' },
  { name: 'sql-contoso-prod', type: 'SQL Database', resourceGroup: 'rg-data-prod', location: 'East US', status: 'Online' },
  { name: 'stcontosoprod', type: 'Storage Account', resourceGroup: 'rg-contoso-prod', location: 'East US', status: 'Available' },
  { name: 'kv-contoso-prod', type: 'Key Vault', resourceGroup: 'rg-security-prod', location: 'East US', status: 'Available' },
  { name: 'apim-contoso-prod', type: 'API Management', resourceGroup: 'rg-api-prod', location: 'East US', status: 'Online' },
];
```

## IAM Role Assignments

```typescript
export const roleAssignments = [
  { displayName: 'Sarah Chen', type: 'User', role: 'Owner', scope: 'This resource', condition: '—' },
  { displayName: 'Platform Team', type: 'Group', role: 'Contributor', scope: 'Resource group', condition: '—' },
  { displayName: 'Alex Britez', type: 'User', role: 'Contributor', scope: 'This resource', condition: '—' },
  { displayName: 'CI/CD Pipeline', type: 'Service principal', role: 'Contributor', scope: 'Resource group', condition: '—' },
  { displayName: 'app-contoso-prod-identity', type: 'Managed identity', role: 'Reader', scope: 'Subscription', condition: '—' },
  { displayName: 'Security Auditors', type: 'Group', role: 'Reader', scope: 'Subscription', condition: 'View and edit' },
];
```

## API List (API Management)

```typescript
export const apis = [
  { name: 'Orders API', version: 'v2', protocol: 'REST', operations: 12, status: 'Published', description: 'Order management and fulfillment' },
  { name: 'Products API', version: 'v1', protocol: 'REST', operations: 8, status: 'Published', description: 'Product catalog and inventory' },
  { name: 'Users API', version: 'v3', protocol: 'REST', operations: 15, status: 'Published', description: 'User authentication and profiles' },
  { name: 'Payments API', version: 'v1', protocol: 'REST', operations: 6, status: 'Published', description: 'Payment processing and billing' },
  { name: 'Notifications API', version: 'v1', protocol: 'WebSocket', operations: 4, status: 'Preview', description: 'Real-time push notifications' },
  { name: 'Analytics API', version: 'v2', protocol: 'GraphQL', operations: 20, status: 'Published', description: 'Business intelligence and reporting' },
];
```

## Subscriptions

```typescript
export const subscriptions = [
  { displayName: 'Contoso Production', subscriptionId: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', state: 'Enabled', offer: 'Enterprise Agreement' },
  { displayName: 'Contoso Dev/Test', subscriptionId: 'b2c3d4e5-f6a7-8901-bcde-f12345678901', state: 'Enabled', offer: 'Dev/Test' },
  { displayName: 'Platform Engineering', subscriptionId: 'c3d4e5f6-a7b8-9012-cdef-123456789012', state: 'Enabled', offer: 'Pay-As-You-Go' },
  { displayName: 'Sandbox', subscriptionId: 'd4e5f6a7-b8c9-0123-defa-234567890123', state: 'Warned', offer: 'Pay-As-You-Go' },
];
```

## Activity Log Entries

```typescript
export const activityLog = [
  { operation: 'Update Web App', status: 'Succeeded', initiatedBy: 'sarah.chen@contoso.com', time: '2 minutes ago', level: 'Informational' },
  { operation: 'Restart Web App', status: 'Succeeded', initiatedBy: 'alex.britez@contoso.com', time: '1 hour ago', level: 'Informational' },
  { operation: 'Update App Settings', status: 'Succeeded', initiatedBy: 'CI/CD Pipeline', time: '3 hours ago', level: 'Informational' },
  { operation: 'Scale Out App Service Plan', status: 'Succeeded', initiatedBy: 'Autoscale', time: '6 hours ago', level: 'Warning' },
  { operation: 'Delete Deployment Slot', status: 'Failed', initiatedBy: 'sarah.chen@contoso.com', time: '1 day ago', level: 'Error' },
  { operation: 'Create Deployment Slot', status: 'Succeeded', initiatedBy: 'sarah.chen@contoso.com', time: '1 day ago', level: 'Informational' },
];
```

## Tags (Common)

```typescript
export const commonTags: Record<string, string> = {
  Environment: 'Production',
  CostCenter: 'Engineering',
  Owner: 'team-platform',
  Project: 'Contoso Web',
  ManagedBy: 'Terraform',
  CreatedDate: '2024-03-15',
};
```

## Essentials Panel (Overview Page)

```typescript
export const essentials = [
  { label: 'Resource group', value: 'rg-contoso-prod' },
  { label: 'Status', value: 'Running', statusColor: '#0f7b0f' },
  { label: 'Location', value: 'East US' },
  { label: 'Subscription', value: 'Contoso Production' },
  { label: 'Subscription ID', value: 'a1b2c3d4-e5f6-…7890' },
  { label: 'Tags', value: 'Environment: Production, +2 more' },
  { label: 'App Service plan', value: 'asp-contoso-prod (P1v3)' },
  { label: 'URL', value: 'https://app-contoso-prod-eastus.azurewebsites.net', isLink: true },
];
```
