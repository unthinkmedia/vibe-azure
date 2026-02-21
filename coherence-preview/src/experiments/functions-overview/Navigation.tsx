// @ts-nocheck
import {
  CuiDrawer,
  CuiIcon,
  CuiNavHeading,
  CuiNavItem,
  CuiSideNav,
} from '@charm-ux/cui/react';
import { navSections } from './data';

interface NavigationProps {
  activePage: string;
  onNavigate: (id: string) => void;
}

export default function Navigation({ activePage, onNavigate }: NavigationProps) {
  return (
    <CuiDrawer
      slot="navigation"
      id="navigation-drawer"
      inline
      position="start"
      breakpoint="686px"
      open
    >
      <CuiSideNav size="small">
        {navSections.map((section, si) => (
          <div key={si}>
            {section.heading && <CuiNavHeading>{section.heading}</CuiNavHeading>}
            {section.items.map((item) => (
              <CuiNavItem
                key={item.id}
                label={item.label}
                href="javascript:;"
                selected={activePage === item.id || undefined}
                onClick={() => onNavigate(item.id)}
              >
                <CuiIcon
                  slot="icon"
                  url={item.icon}
                  selectedUrl={item.iconFilled}
                />
              </CuiNavItem>
            ))}
          </div>
        ))}
      </CuiSideNav>
    </CuiDrawer>
  );
}
