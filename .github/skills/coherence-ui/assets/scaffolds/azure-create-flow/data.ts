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

// TODO: Replace with your resource type
export const resourceTypeLabel = 'Storage account';

// TODO: Add/remove tabs for your resource
export const tabIds = ['basics', 'networking', 'advanced', 'tags', 'review'] as const;
export type TabId = (typeof tabIds)[number];

export const tabLabels: Record<TabId, string> = {
  basics: 'Basics',
  networking: 'Networking',
  advanced: 'Advanced',
  tags: 'Tags',
  review: 'Review + create',
};

export const navItems: NavItemConfig[] = [
  {
    label: 'Home',
    icon: 'https://api.iconify.design/fluent:home-24-regular.svg',
    iconFilled: 'https://api.iconify.design/fluent:home-24-filled.svg',
  },
];
