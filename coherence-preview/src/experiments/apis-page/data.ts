export interface NavItemConfig {
  label: string;
  icon: string;
  iconFilled: string;
  selected?: boolean;
}

export interface NavSectionConfig {
  heading?: string;
  dividerBefore?: boolean;
  items: NavItemConfig[];
}

export const resourceName = 'alexbritezFeb6';
export const pageTitle = 'APIs';
export const resourceType = 'API Management service';

export const navSections: NavSectionConfig[] = [
  {
    items: [
      {
        label: 'Overview',
        icon: 'https://api.iconify.design/fluent:home-24-regular.svg',
        iconFilled: 'https://api.iconify.design/fluent:home-24-filled.svg',
      },
      {
        label: 'Activity log',
        icon: 'https://api.iconify.design/fluent:document-24-regular.svg',
        iconFilled: 'https://api.iconify.design/fluent:document-24-filled.svg',
      },
      {
        label: 'Access control (IAM)',
        icon: 'https://api.iconify.design/fluent:person-24-regular.svg',
        iconFilled: 'https://api.iconify.design/fluent:person-24-filled.svg',
      },
      {
        label: 'Tags',
        icon: 'https://api.iconify.design/fluent:tag-24-regular.svg',
        iconFilled: 'https://api.iconify.design/fluent:tag-24-filled.svg',
      },
      {
        label: 'Diagnose and solve problems',
        icon: 'https://api.iconify.design/fluent:stethoscope-24-regular.svg',
        iconFilled: 'https://api.iconify.design/fluent:stethoscope-24-filled.svg',
      },
      {
        label: 'Resource visualizer',
        icon: 'https://api.iconify.design/fluent:diagram-24-regular.svg',
        iconFilled: 'https://api.iconify.design/fluent:diagram-24-filled.svg',
      },
      {
        label: 'Events',
        icon: 'https://api.iconify.design/fluent:flash-24-regular.svg',
        iconFilled: 'https://api.iconify.design/fluent:flash-24-filled.svg',
      },
    ],
  },
  {
    heading: 'APIs',
    items: [
      {
        label: 'Workspaces',
        icon: 'https://api.iconify.design/fluent:folder-24-regular.svg',
        iconFilled: 'https://api.iconify.design/fluent:folder-24-filled.svg',
      },
      {
        label: 'APIs',
        icon: 'https://api.iconify.design/fluent:plug-connected-24-regular.svg',
        iconFilled: 'https://api.iconify.design/fluent:plug-connected-24-filled.svg',
        selected: true,
      },
      {
        label: 'MCP Servers',
        icon: 'https://api.iconify.design/fluent:server-24-regular.svg',
        iconFilled: 'https://api.iconify.design/fluent:server-24-filled.svg',
      },
      {
        label: 'Products',
        icon: 'https://api.iconify.design/fluent:box-24-regular.svg',
        iconFilled: 'https://api.iconify.design/fluent:box-24-filled.svg',
      },
      {
        label: 'Subscriptions',
        icon: 'https://api.iconify.design/fluent:key-24-regular.svg',
        iconFilled: 'https://api.iconify.design/fluent:key-24-filled.svg',
      },
      {
        label: 'Named values',
        icon: 'https://api.iconify.design/fluent:grid-24-regular.svg',
        iconFilled: 'https://api.iconify.design/fluent:grid-24-filled.svg',
      },
      {
        label: 'Backends',
        icon: 'https://api.iconify.design/fluent:cloud-24-regular.svg',
        iconFilled: 'https://api.iconify.design/fluent:cloud-24-filled.svg',
      },
      {
        label: 'Policy fragments',
        icon: 'https://api.iconify.design/fluent:puzzle-piece-24-regular.svg',
        iconFilled: 'https://api.iconify.design/fluent:puzzle-piece-24-filled.svg',
      },
      {
        label: 'API Tags',
        icon: 'https://api.iconify.design/fluent:tag-24-regular.svg',
        iconFilled: 'https://api.iconify.design/fluent:tag-24-filled.svg',
      },
      {
        label: 'Schemas',
        icon: 'https://api.iconify.design/fluent:database-24-regular.svg',
        iconFilled: 'https://api.iconify.design/fluent:database-24-filled.svg',
      },
      {
        label: 'Credential manager',
        icon: 'https://api.iconify.design/fluent:shield-24-regular.svg',
        iconFilled: 'https://api.iconify.design/fluent:shield-24-filled.svg',
      },
      {
        label: 'API Center',
        icon: 'https://api.iconify.design/fluent:center-horizontal-24-regular.svg',
        iconFilled: 'https://api.iconify.design/fluent:center-horizontal-24-filled.svg',
      },
      {
        label: 'Power Platform',
        icon: 'https://api.iconify.design/fluent:power-24-regular.svg',
        iconFilled: 'https://api.iconify.design/fluent:power-24-filled.svg',
      },
    ],
  },
  {
    dividerBefore: true,
    items: [
      {
        label: 'Developer portal',
        icon: 'https://api.iconify.design/fluent:globe-24-regular.svg',
        iconFilled: 'https://api.iconify.design/fluent:globe-24-filled.svg',
      },
    ],
  },
];
