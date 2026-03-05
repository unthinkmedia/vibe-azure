// @ts-nocheck
import {
  CuiIcon,
  CuiNavHeading,
  CuiNavItem,
  CuiSideNav,
} from '@charm-ux/cui/react';
import { navSections } from './data';

export default function Navigation() {
  return (
    <CuiSideNav size="small">
      {navSections.map((section, si) => (
        <div key={si}>
          {section.heading && <CuiNavHeading>{section.heading}</CuiNavHeading>}
          {section.items.map((item) => (
            <CuiNavItem
              key={item.label}
              label={item.label}
              href="#"
              selected={item.selected || undefined}
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
  );
}
