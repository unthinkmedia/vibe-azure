// @ts-nocheck
/**
 * Shared data & configuration for all pages in this multi-page flow.
 * Keep mock data, types, and constants here — makes it easy to swap for real APIs later.
 * All pages import from this single file.
 */

// ─── Shared Types ───
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

// TODO: Replace with your resource type
export const resourceTypeLabel = 'Resource';

// TODO: Replace with your experiment ID (used for hash navigation)
export const experimentId = 'my-flow';

// ─── Browse Page Data ───
// TODO: Customize browse page title and suggestions
export const browseTitle = 'Resources';
export const browseSubtitle = 'Microsoft (microsoft.onmicrosoft.com)';
export const copilotSuggestions = [
  'Show me non-compliant resources.',
  'How many resources do I have?',
];

// ─── Create Page Data ───
export const tabIds = ['basics', 'networking', 'tags', 'review'] as const;
export type TabId = (typeof tabIds)[number];

export const tabLabels: Record<TabId, string> = {
  basics: 'Basics',
  networking: 'Networking',
  tags: 'Tags',
  review: 'Review + create',
};

// ─── Detail/Overview Page Data ───
// TODO: Replace with your resource details
export const resourceName = 'my-resource-01';
export const detailTitle = 'Overview';
export const resourceType = 'Resource type';

export const detailNavSections: NavSectionConfig[] = [
  {
    items: [
      { label: 'Overview', icon: 'https://api.iconify.design/fluent:home-24-regular.svg', iconFilled: 'https://api.iconify.design/fluent:home-24-filled.svg', selected: true },
      { label: 'Activity log', icon: 'https://api.iconify.design/fluent:document-24-regular.svg', iconFilled: 'https://api.iconify.design/fluent:document-24-filled.svg' },
      { label: 'Access control (IAM)', icon: 'https://api.iconify.design/fluent:person-24-regular.svg', iconFilled: 'https://api.iconify.design/fluent:person-24-filled.svg' },
      { label: 'Tags', icon: 'https://api.iconify.design/fluent:tag-24-regular.svg', iconFilled: 'https://api.iconify.design/fluent:tag-24-filled.svg' },
    ],
  },
  // TODO: Add resource-specific nav sections
];
