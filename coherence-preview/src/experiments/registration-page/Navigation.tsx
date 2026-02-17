import React from 'react';
import { CuiSideNav, CuiNavHeading, CuiNavItem, CuiIcon } from '@charm-ux/cui/react';
import { navSections } from './data';

export const Navigation: React.FC = () => (
  <CuiSideNav>
    {navSections.map((section, si) => (
      <React.Fragment key={si}>
        <CuiNavHeading>{section.heading}</CuiNavHeading>
        {section.items.map((item, ii) => (
          <CuiNavItem
            key={ii}
            label={item.label}
            href="javascript:;"
            selected={item.selected || undefined}
          >
            <CuiIcon slot="icon" name={item.iconName} />
          </CuiNavItem>
        ))}
      </React.Fragment>
    ))}
  </CuiSideNav>
);
