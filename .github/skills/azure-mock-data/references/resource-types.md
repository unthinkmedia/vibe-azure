# Azure Resource Type Schemas

Common Azure resource types with their fields and realistic sample values for prototyping.

## App Service / Web App

```typescript
interface AppService {
  name: string;           // 'app-contoso-prod-eastus'
  status: string;         // 'Running' | 'Stopped' | 'Starting'
  appServicePlan: string; // 'asp-contoso-prod'
  sku: string;            // 'P1v3' | 'S1' | 'B1' | 'F1'
  url: string;            // 'https://app-contoso-prod-eastus.azurewebsites.net'
  runtime: string;        // '.NET 8' | 'Node 20 LTS' | 'Python 3.12' | 'Java 17'
  os: string;             // 'Linux' | 'Windows'
  location: string;       // 'East US'
  resourceGroup: string;
  subscriptionId: string;
  ftpState: string;       // 'Disabled' | 'AllAllowed' | 'FtpsOnly'
  httpsOnly: boolean;
  alwaysOn: boolean;
}
```

## Function App

```typescript
interface FunctionApp {
  name: string;           // 'func-orders-prod-eastus'
  status: string;         // 'Running' | 'Stopped'
  runtime: string;        // '.NET 8 (Isolated)' | 'Node.js 20' | 'Python 3.11'
  plan: string;           // 'Consumption' | 'Premium (EP1)' | 'Dedicated (P1v3)'
  functions: number;      // 3-12
  location: string;
  resourceGroup: string;
  storageAccount: string; // 'stfuncordersprod'
  appInsights: string;    // 'appi-orders-prod'
}
```

## Virtual Machine

```typescript
interface VirtualMachine {
  name: string;           // 'vm-web-prod-01'
  status: string;         // 'Running' | 'Stopped (deallocated)' | 'Starting'
  size: string;           // 'Standard_D4s_v5' | 'Standard_B2ms' | 'Standard_E4as_v5'
  os: string;             // 'Ubuntu 22.04 LTS' | 'Windows Server 2022'
  publicIp: string;       // '20.42.105.67' or '—'
  privateIp: string;      // '10.0.1.4'
  vnet: string;           // 'vnet-prod-eastus'
  disk: string;           // '128 GiB Premium SSD'
  location: string;
  resourceGroup: string;
}
```

## Storage Account

```typescript
interface StorageAccount {
  name: string;           // 'stcontosoprod'
  kind: string;           // 'StorageV2' | 'BlobStorage'
  performance: string;    // 'Standard' | 'Premium'
  replication: string;    // 'LRS' | 'GRS' | 'ZRS' | 'RA-GRS'
  accessTier: string;     // 'Hot' | 'Cool'
  location: string;
  resourceGroup: string;
  endpoint: string;       // 'https://stcontosoprod.blob.core.windows.net'
}
```

## SQL Database

```typescript
interface SqlDatabase {
  name: string;           // 'sqldb-contoso-prod'
  server: string;         // 'sql-contoso-prod.database.windows.net'
  status: string;         // 'Online' | 'Offline' | 'Paused'
  tier: string;           // 'General Purpose' | 'Business Critical' | 'Hyperscale'
  compute: string;        // 'Serverless, Gen5, 2 vCores' | 'Provisioned, Gen5, 4 vCores'
  maxSize: string;        // '32 GB' | '100 GB'
  location: string;
  resourceGroup: string;
  elasticPool: string | null;
}
```

## API Management Service

```typescript
interface ApiManagement {
  name: string;           // 'apim-contoso-prod'
  gatewayUrl: string;     // 'https://apim-contoso-prod.azure-api.net'
  tier: string;           // 'Developer' | 'Standard' | 'Premium' | 'Consumption'
  apis: number;           // 4-15
  products: number;       // 2-6
  subscriptions: number;  // 8-25
  location: string;
  resourceGroup: string;
}
```

## Subscription

```typescript
interface Subscription {
  displayName: string;    // 'Contoso Production'
  subscriptionId: string; // 'a1b2c3d4-e5f6-7890-abcd-ef1234567890'
  state: string;          // 'Enabled' | 'Disabled' | 'Warned' | 'PastDue'
  offer: string;          // 'Pay-As-You-Go' | 'Enterprise Agreement' | 'Dev/Test'
  spendingLimit: string;  // '$500.00 / month' | 'No limit'
}
```

## Role Assignment (IAM)

```typescript
interface RoleAssignment {
  displayName: string;    // 'Sarah Chen'
  type: string;           // 'User' | 'Group' | 'Service principal' | 'Managed identity'
  role: string;           // 'Owner' | 'Contributor' | 'Reader' | 'User Access Administrator'
  scope: string;          // 'This resource' | 'Resource group' | 'Subscription'
  condition: string;      // '—' | 'View and edit'
}
```
