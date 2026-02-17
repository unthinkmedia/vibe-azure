// @ts-nocheck
import {
  CuiDrawer,
  CuiIcon,
  CuiNavItem,
  CuiSideNav,
} from '@charm-ux/cui/react';
import { navItems } from './data';

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
      <CuiSideNav size="small">
        {navItems.map((item) => (
          <CuiNavItem key={item.label} label={item.label} href="#">
            <CuiIcon
              slot="icon"
              url={item.icon}
              selectedUrl={item.iconFilled}
            />
          </CuiNavItem>
        ))}
      </CuiSideNav>
    </CuiDrawer>
  );
}
