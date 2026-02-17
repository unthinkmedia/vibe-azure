export interface NavItemConfig {
  label: string;
  icon: string;
  iconFilled: string;
  id: string;
}

export interface NavSectionConfig {
  heading: string;
  items: NavItemConfig[];
}

export const pageTitle = 'Register an application';
export const headerTitle = 'Microsoft Entra ID';

export const navSections: NavSectionConfig[] = [
  {
    heading: 'Manage',
    items: [
      {
        label: 'App registrations',
        icon: 'https://api.iconify.design/fluent:app-generic-24-regular.svg',
        iconFilled: 'https://api.iconify.design/fluent:app-generic-24-filled.svg',
        id: 'register',
      },
      {
        label: 'Enterprise applications',
        icon: 'https://api.iconify.design/fluent:building-24-regular.svg',
        iconFilled: 'https://api.iconify.design/fluent:building-24-filled.svg',
        id: 'enterprise',
      },
      {
        label: 'Certificates & secrets',
        icon: 'https://api.iconify.design/fluent:certificate-24-regular.svg',
        iconFilled: 'https://api.iconify.design/fluent:certificate-24-filled.svg',
        id: 'certs',
      },
    ],
  },
  {
    heading: 'Security',
    items: [
      {
        label: 'Authentication',
        icon: 'https://api.iconify.design/fluent:lock-closed-24-regular.svg',
        iconFilled: 'https://api.iconify.design/fluent:lock-closed-24-filled.svg',
        id: 'auth',
      },
      {
        label: 'API permissions',
        icon: 'https://api.iconify.design/fluent:key-24-regular.svg',
        iconFilled: 'https://api.iconify.design/fluent:key-24-filled.svg',
        id: 'api',
      },
    ],
  },
  {
    heading: 'Support',
    items: [
      {
        label: 'Overview',
        icon: 'https://api.iconify.design/fluent:info-24-regular.svg',
        iconFilled: 'https://api.iconify.design/fluent:info-24-filled.svg',
        id: 'overview',
      },
    ],
  },
];
