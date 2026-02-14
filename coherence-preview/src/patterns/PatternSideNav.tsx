/**
 * Pattern Demo: Side Nav with Iconify Icons
 * Isolated preview of Azure-style side navigation with icon pairs.
 */
import {
  CuiDivider,
  CuiDrawer,
  CuiIcon,
  CuiNavHeading,
  CuiNavItem,
  CuiSideNav,
} from '@charm-ux/cui/react';
import { useState } from 'react';

const navItems = [
  { label: 'Overview', icon: 'home', section: null },
  { label: 'Activity log', icon: 'document', section: null },
  { label: 'Access control (IAM)', icon: 'person', section: null },
  { label: 'Tags', icon: 'tag', section: null },
  { label: 'Diagnose and solve problems', icon: 'stethoscope', section: null },
  { label: 'APIs', icon: 'plug-connected', section: 'APIs' },
  { label: 'Products', icon: 'box', section: 'APIs' },
  { label: 'Subscriptions', icon: 'key', section: 'APIs' },
  { label: 'Configuration', icon: 'settings', section: 'Settings' },
  { label: 'Properties', icon: 'info', section: 'Settings' },
  { label: 'Networking', icon: 'globe', section: 'Settings' },
];

export default function PatternSideNav() {
  const [selected, setSelected] = useState('Overview');
  let lastSection: string | null = null;

  return (
    <>
      <div style={{ display: 'flex', height: '100vh' }}>
        <CuiDrawer
          id="nav-demo"
          inline
          position="start"
          open
          style={{ borderRight: '1px solid var(--neutral-stroke-2)' }}
        >
          <CuiSideNav size="small">
            {navItems.map((item, i) => {
              const sectionHeader =
                item.section && item.section !== lastSection ? (
                  <CuiNavHeading key={`h-${i}`}>{item.section}</CuiNavHeading>
                ) : null;
              if (item.section) lastSection = item.section;
              return (
                <span key={item.label}>
                  {sectionHeader}
                  <CuiNavItem
                    label={item.label}
                    href="#"
                    selected={selected === item.label ? true : undefined}
                    onClick={() => {
                      setSelected(item.label);
                    }}
                  >
                    <CuiIcon
                      slot="icon"
                      url={`https://api.iconify.design/fluent:${item.icon}-24-regular.svg`}
                      selectedUrl={`https://api.iconify.design/fluent:${item.icon}-24-filled.svg`}
                    />
                  </CuiNavItem>
                </span>
              );
            })}
            <CuiDivider />
            <CuiNavItem label="Developer portal" href="#">
              <CuiIcon
                slot="icon"
                url="https://api.iconify.design/fluent:globe-24-regular.svg"
                selectedUrl="https://api.iconify.design/fluent:globe-24-filled.svg"
              />
            </CuiNavItem>
          </CuiSideNav>
        </CuiDrawer>

        <div style={{ flex: 1, padding: 32, color: 'var(--neutral-foreground-2)' }}>
          <h2 style={{ marginTop: 0 }}>Side Nav with Iconify Icons Pattern</h2>
          <p>
            Selected: <strong style={{ color: 'var(--neutral-foreground-1)' }}>{selected}</strong>
          </p>
          <p>Components: <code>CuiDrawer</code>, <code>CuiSideNav</code>, <code>CuiNavItem</code>, <code>CuiNavHeading</code>, <code>CuiIcon</code></p>
          <h3>Icon URL Pattern</h3>
          <pre style={{
            background: 'var(--neutral-background-3)',
            padding: 12,
            borderRadius: 6,
            fontSize: 13,
            overflow: 'auto',
          }}>
{`Regular:  https://api.iconify.design/fluent:{name}-24-regular.svg
Filled:   https://api.iconify.design/fluent:{name}-24-filled.svg`}
          </pre>
          <h3>Key Features</h3>
          <ul style={{ lineHeight: 1.8 }}>
            <li>Regular/filled icon pairs toggle on selection via <code>url</code> / <code>selectedUrl</code></li>
            <li><code>CuiNavHeading</code> creates labeled section groups</li>
            <li><code>CuiDivider</code> separates major sections</li>
            <li><code>inline</code> + <code>breakpoint</code> collapses to hamburger on small screens</li>
          </ul>
        </div>
      </div>
      <style>{`body { margin: 0; }`}</style>
    </>
  );
}
