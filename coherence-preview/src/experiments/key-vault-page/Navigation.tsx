import React from 'react';
import {
  CuiSideNav,
  CuiNavItem,
  CuiNavHeading,
} from '@charm-ux/cui/react';
import { navSections } from './data';

export const Navigation: React.FC = () => (
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
);
