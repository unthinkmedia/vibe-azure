import {
  CuiIcon,
  CuiNavHeading,
  CuiNavItem,
  CuiSideNav,
} from '@charm-ux/cui/react';
import { navSections } from './data';

export function Navigation() {
  return (
    <CuiSideNav size="small">
      {navSections.map((section, si) => (
        <span key={si}>
          {section.heading && <CuiNavHeading>{section.heading}</CuiNavHeading>}
          {section.items.map((item, ii) => (
            <CuiNavItem
              key={ii}
              label={item.label}
              href="#"
              selected={item.selected || undefined}
            >
              {item.iconUrl && (
                <CuiIcon slot="icon" url={item.iconUrl} />
              )}
              {item.iconName && (
                <CuiIcon slot="icon" name={item.iconName} />
              )}
            </CuiNavItem>
          ))}
        </span>
      ))}
    </CuiSideNav>
  );
}
