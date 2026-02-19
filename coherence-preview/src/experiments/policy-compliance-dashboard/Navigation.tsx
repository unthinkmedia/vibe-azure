import { useState } from 'react';
import {
  CuiIcon,
  CuiNavHeading,
  CuiNavItem,
  CuiSideNav,
} from '@charm-ux/cui/react';
import { navSections } from './data';

export default function Navigation() {
  const [selected, setSelected] = useState('Compliance');

  return (
    <CuiSideNav size="small">
      {navSections.map((section, si) => (
        <span key={si}>
          {section.heading && <CuiNavHeading>{section.heading}</CuiNavHeading>}
          {section.items.map((item) => (
            <CuiNavItem
              key={item.label}
              label={item.label}
              href="#"
              selected={selected === item.label ? true : undefined}
              onClick={() => setSelected(item.label)}
            >
              <CuiIcon
                slot="icon"
                url={`https://api.iconify.design/fluent:${item.icon}-24-regular.svg`}
                selectedUrl={`https://api.iconify.design/fluent:${item.icon}-24-filled.svg`}
              />
            </CuiNavItem>
          ))}
        </span>
      ))}
    </CuiSideNav>
  );
}
