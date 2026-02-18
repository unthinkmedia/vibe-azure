import React from 'react';
import {
  CuiSideNav,
  CuiNavItem,
  CuiNavHeading,
  CuiDrawer,
} from '@charm-ux/cui/react';
import { navSections } from './data';

export default function Navigation() {
  return (
    <CuiDrawer
      slot="navigation"
      id="navigation-drawer"
      inline
      position="start"
      breakpoint="686px"
      open
    >
      <CuiSideNav>
        {navSections.map((section, si) => (
          <React.Fragment key={si}>
            {section.heading && <CuiNavHeading>{section.heading}</CuiNavHeading>}
            {section.items.map((item, ii) => (
              <CuiNavItem
                key={ii}
                href="javascript:;"
                selected={item.selected || undefined}
              >
                <img slot="icon" src={item.icon} alt="" width="20" height="20" />
                <img slot="icon-filled" src={item.iconFilled} alt="" width="20" height="20" />
                {item.label}
              </CuiNavItem>
            ))}
          </React.Fragment>
        ))}
      </CuiSideNav>
    </CuiDrawer>
  );
}
