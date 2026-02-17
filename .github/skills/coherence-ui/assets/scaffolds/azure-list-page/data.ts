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

// TODO: Replace with your list item type
export interface ListItem {
  id: string;
  name: string;
}

// TODO: Replace with your resource and page details
export const resourceName = 'myResource';
export const pageTitle = 'Items';
export const resourceType = 'Service type';

// TODO: Populate with your list items
export const listItems: ListItem[] = [
  { id: '1', name: 'Item 1' },
  { id: '2', name: 'Item 2' },
];

// TODO: Customize nav items
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
    ],
  },
  {
    heading: 'Resources',
    items: [
      {
        label: 'Items',
        icon: 'https://api.iconify.design/fluent:list-24-regular.svg',
        iconFilled: 'https://api.iconify.design/fluent:list-24-filled.svg',
        selected: true,
      },
    ],
  },
];
