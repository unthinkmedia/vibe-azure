/**
 * Navigation config + type definitions for the Access Control (IAM) experiment.
 *
 * Separating data from presentation makes it easy to swap mock data for
 * real API responses when handing off to dev.
 */

export interface NavItemConfig {
  label: string;
  icon: string;
  iconFilled: string;
  selected?: boolean;
}

export interface NavSectionConfig {
  heading?: string;
  items: NavItemConfig[];
}

export const resourceName = 'alexbritezFeb6';
export const pageTitle = 'Access control (IAM)';
export const resourceType = 'API Management service';

/** Side navigation structure */
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
        selected: true,
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
    ],
  },
];
