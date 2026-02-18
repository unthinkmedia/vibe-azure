// @ts-nocheck
/**
 * Data & configuration for this experiment.
 * Keep mock data, types, and constants here — makes it easy to swap for real APIs later.
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

export interface EssentialsRow {
  label: string;
  value: string;
  href?: string;
}

// TODO: Replace with your resource details
export const resourceName = 'myStorageAccount';
export const resourceType = 'Storage account';

// TODO: Replace with Copilot suggestions relevant to your resource type
export const copilotSuggestions = [
  'Show me the health of this resource.',
  'What are the recent changes to this resource?',
];

// TODO: Replace with your resource's key properties
export const essentialsData: EssentialsRow[] = [
  { label: 'Resource group', value: 'rg-production', href: '#' },
  { label: 'Status', value: 'Available' },
  { label: 'Location', value: 'East US' },
  { label: 'Subscription', value: 'Azure subscription 1', href: '#' },
  { label: 'Subscription ID', value: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' },
  { label: 'Tags', value: 'Click here to add tags', href: '#' },
];

// TODO: Customize nav items for your resource type
export const navSections: NavSectionConfig[] = [
  {
    items: [
      {
        label: 'Overview',
        icon: 'https://api.iconify.design/fluent:home-24-regular.svg',
        iconFilled: 'https://api.iconify.design/fluent:home-24-filled.svg',
        selected: true,
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
    ],
  },
  {
    heading: 'Settings',
    items: [
      {
        label: 'Configuration',
        icon: 'https://api.iconify.design/fluent:settings-24-regular.svg',
        iconFilled: 'https://api.iconify.design/fluent:settings-24-filled.svg',
      },
      {
        label: 'Networking',
        icon: 'https://api.iconify.design/fluent:globe-24-regular.svg',
        iconFilled: 'https://api.iconify.design/fluent:globe-24-filled.svg',
      },
      {
        label: 'Properties',
        icon: 'https://api.iconify.design/fluent:info-24-regular.svg',
        iconFilled: 'https://api.iconify.design/fluent:info-24-filled.svg',
      },
    ],
  },
];
