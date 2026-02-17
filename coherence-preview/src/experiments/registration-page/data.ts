export interface NavItemConfig {
  label: string;
  iconName: string;
  selected?: boolean;
}

export interface NavSectionConfig {
  heading: string;
  items: NavItemConfig[];
}

export const headerTitle = 'Registration Portal';

export const navSections: NavSectionConfig[] = [
  {
    heading: 'Account',
    items: [
      { label: 'Register', iconName: 'person', selected: true },
      { label: 'Sign In', iconName: 'lock-closed' },
    ],
  },
];
