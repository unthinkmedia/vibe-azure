import { useState } from 'react';
import {
  CuiDrawer,
  CuiIcon,
  CuiNavHeading,
  CuiNavItem,
  CuiSideNav,
} from '@charm-ux/cui/react';
import { navSections } from './data';

export default function Navigation() {
  const [selectedNav, setSelectedNav] = useState('register');

  return (
    <CuiDrawer slot="navigation" inline open position="start" breakpoint="686px">
      <CuiSideNav>
        {navSections.map((section) => (
          <div key={section.heading}>
            <CuiNavHeading>{section.heading}</CuiNavHeading>
            {section.items.map((item) => (
              <CuiNavItem
                key={item.id}
                label={item.label}
                href="javascript:;"
                selected={selectedNav === item.id}
                onClick={() => setSelectedNav(item.id)}
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
