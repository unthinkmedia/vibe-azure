// @ts-nocheck
/**
 * Section-level side navigation (rendered inside slot="main" flex container).
 * The global portal nav (AzurePortalNav) owns slot="navigation" — section nav
 * must NOT use CuiDrawer slot="navigation" to avoid two-drawer conflicts.
 */
import {
  CuiIcon,
  CuiNavHeading,
  CuiNavItem,
  CuiSideNav,
} from '@charm-ux/cui/react';
import { navSections } from './data';

export default function Navigation() {
  return (
    <nav style={{ width: 220, minWidth: 220, borderRight: '1px solid var(--neutral-stroke2)', background: 'var(--neutral-background1)', overflowY: 'auto', flexShrink: 0 }}>
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
    </nav>
  );
}
