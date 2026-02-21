// ─── Types ───

export interface NavItemConfig {
  label: string;
  iconName?: string;
  iconUrl?: string;
  selected?: boolean;
}

export interface NavSectionConfig {
  heading?: string;
  items: NavItemConfig[];
}

export type WorkflowNodeType = 'trigger' | 'action' | 'condition' | 'foreach' | 'scope';

export interface WorkflowNode {
  id: string;
  type: WorkflowNodeType;
  title: string;
  subtitle: string;
  icon: string;
  status?: 'success' | 'failed' | 'skipped' | 'running' | 'pending';
  expanded?: boolean;
  children?: WorkflowNode[]; // For branches (conditions, parallel)
  config?: Record<string, string>;
}

// ─── Page Config ───

export const headerTitle = 'Microsoft Azure';
export const pageTitle = 'LogicBritez';
export const breadcrumb = ['Home', 'rg-abritez-3629', 'LogicBritez'];
export const resourceType = 'Logic app';
export const resourceGroup = 'rg-abritez-3629';
export const subscription = 'Azure subscription 1';
export const location = 'East US';

// ─── Nav Sections ───

export const navSections: NavSectionConfig[] = [
  {
    items: [
      { label: 'Overview', iconUrl: 'https://api.iconify.design/fluent:home-24-regular.svg' },
      { label: 'Activity log', iconUrl: 'https://api.iconify.design/fluent:document-text-24-regular.svg' },
      { label: 'Access control (IAM)', iconUrl: 'https://api.iconify.design/fluent:people-24-regular.svg' },
      { label: 'Tags', iconUrl: 'https://api.iconify.design/fluent:tag-24-regular.svg' },
      { label: 'Diagnose and solve problems', iconUrl: 'https://api.iconify.design/fluent:wrench-24-regular.svg' },
    ],
  },
  {
    heading: 'Development Tools',
    items: [
      { label: 'Logic app designer', iconUrl: 'https://api.iconify.design/fluent:design-ideas-24-regular.svg', selected: true },
      { label: 'Logic app code view', iconUrl: 'https://api.iconify.design/fluent:code-24-regular.svg' },
      { label: 'Versions', iconUrl: 'https://api.iconify.design/fluent:history-24-regular.svg' },
      { label: 'API connections', iconUrl: 'https://api.iconify.design/fluent:plug-connected-24-regular.svg' },
    ],
  },
  {
    heading: 'Run History',
    items: [
      { label: 'Runs history', iconUrl: 'https://api.iconify.design/fluent:clock-24-regular.svg' },
      { label: 'Trigger history', iconUrl: 'https://api.iconify.design/fluent:flash-24-regular.svg' },
    ],
  },
  {
    heading: 'Settings',
    items: [
      { label: 'Workflow settings', iconUrl: 'https://api.iconify.design/fluent:settings-24-regular.svg' },
      { label: 'Access keys', iconUrl: 'https://api.iconify.design/fluent:key-24-regular.svg' },
      { label: 'Identity', iconUrl: 'https://api.iconify.design/fluent:person-24-regular.svg' },
      { label: 'Properties', iconUrl: 'https://api.iconify.design/fluent:info-24-regular.svg' },
      { label: 'Locks', iconUrl: 'https://api.iconify.design/fluent:lock-closed-24-regular.svg' },
      { label: 'Export template', iconUrl: 'https://api.iconify.design/fluent:arrow-download-24-regular.svg' },
    ],
  },
];

// ─── Workflow Definition ───

export const workflowNodes: WorkflowNode[] = [
  {
    id: 'trigger-http',
    type: 'trigger',
    title: 'When a HTTP request is received',
    subtitle: 'Request',
    icon: 'https://api.iconify.design/fluent:globe-24-filled.svg',
    status: 'success',
    config: {
      'Method': 'POST',
      'Relative path': '/api/trigger',
    },
  },
  {
    id: 'condition-1',
    type: 'condition',
    title: 'Condition',
    subtitle: 'Control',
    icon: 'https://api.iconify.design/fluent:branch-fork-24-regular.svg',
    status: 'success',
    config: {
      'Expression': "@equals(triggerBody()?['status'], 'approved')",
    },
    children: [
      {
        id: 'action-true',
        type: 'action',
        title: 'Send an email (V2)',
        subtitle: 'Office 365 Outlook',
        icon: 'https://api.iconify.design/fluent:mail-24-filled.svg',
        status: 'success',
        config: {
          'To': 'user@contoso.com',
          'Subject': 'Request Approved',
          'Body': 'Your request has been approved.',
        },
      },
      {
        id: 'action-false',
        type: 'action',
        title: 'Create item',
        subtitle: 'SharePoint',
        icon: 'https://api.iconify.design/fluent:document-add-24-filled.svg',
        status: 'pending',
        config: {
          'Site Address': 'https://contoso.sharepoint.com',
          'List Name': 'PendingRequests',
        },
      },
    ],
  },
  {
    id: 'action-response',
    type: 'action',
    title: 'Response',
    subtitle: 'Request',
    icon: 'https://api.iconify.design/fluent:arrow-reply-24-filled.svg',
    status: 'success',
    config: {
      'Status Code': '200',
      'Body': '{ "status": "complete" }',
    },
  },
];

// ─── Connector Categories (for Add Step panel) ───

export interface ConnectorCategory {
  label: string;
  connectors: { name: string; icon: string }[];
}

export const connectorCategories: ConnectorCategory[] = [
  {
    label: 'Popular',
    connectors: [
      { name: 'HTTP', icon: 'https://api.iconify.design/fluent:globe-24-filled.svg' },
      { name: 'Office 365 Outlook', icon: 'https://api.iconify.design/fluent:mail-24-filled.svg' },
      { name: 'SharePoint', icon: 'https://api.iconify.design/fluent:document-add-24-filled.svg' },
      { name: 'Azure Blob Storage', icon: 'https://api.iconify.design/fluent:storage-24-filled.svg' },
      { name: 'SQL Server', icon: 'https://api.iconify.design/fluent:database-24-filled.svg' },
      { name: 'Teams', icon: 'https://api.iconify.design/fluent:people-team-24-filled.svg' },
    ],
  },
  {
    label: 'Control',
    connectors: [
      { name: 'Condition', icon: 'https://api.iconify.design/fluent:branch-fork-24-regular.svg' },
      { name: 'For each', icon: 'https://api.iconify.design/fluent:arrow-repeat-all-24-regular.svg' },
      { name: 'Switch', icon: 'https://api.iconify.design/fluent:navigation-24-regular.svg' },
      { name: 'Scope', icon: 'https://api.iconify.design/fluent:group-24-regular.svg' },
      { name: 'Terminate', icon: 'https://api.iconify.design/fluent:dismiss-circle-24-regular.svg' },
      { name: 'Delay', icon: 'https://api.iconify.design/fluent:timer-24-regular.svg' },
    ],
  },
];
