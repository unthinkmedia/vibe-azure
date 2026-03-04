/**
 * Pattern: Blade Sidebar Layout
 *
 * Reusable collapsible sidebar layout used by Service Blade, Browse Blade,
 * and Designer Blade scaffolds. Renders the blade-body flex container with
 * a collapsible <nav> sidebar, a thin toggle strip, and a content area.
 *
 * Usage:
 *   <BladeSidebar navSections={navSections} selectedNav={selected} onNavChange={setSelected}>
 *     <div>...your blade content...</div>
 *   </BladeSidebar>
 */
import { useState, type ReactNode } from 'react';
import {
  CuiButton,
  CuiIcon,
  CuiNavHeading,
  CuiNavItem,
  CuiSideNav,
} from '@charm-ux/cui/react';
import { azureIcon } from './azure-icons';

// ─── Types ───

export interface BladeNavItem {
  label: string;
  /** CuiIcon registered name (e.g. "navigation", "settings") */
  name?: string;
  /** Azure icon key from azure-icons.ts */
  azureIconKey?: string;
  /** Iconify URL — used by DesignerBlade-style nav */
  iconUrl?: string;
}

export interface BladeNavSection {
  heading?: string | null;
  items: BladeNavItem[];
}

interface BladeSidebarProps {
  navSections: BladeNavSection[];
  selectedNav: string;
  onNavChange: (label: string) => void;
  children: ReactNode;
  /** Accessible label for the <nav> element. Default: "Service navigation" */
  ariaLabel?: string;
  /** Background color token for the content area. Default: --neutral-background1 */
  contentBackground?: string;
}

// ─── Component ───

export default function BladeSidebar({
  navSections,
  selectedNav,
  onNavChange,
  children,
  ariaLabel = 'Service navigation',
  contentBackground,
}: BladeSidebarProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="blade-body">
      {/* Collapsible nav sidebar */}
      <nav
        className={`blade-sidebar${sidebarOpen ? '' : ' collapsed'}`}
        aria-label={ariaLabel}
      >
        <CuiSideNav size="small">
          {navSections.map((section, si) => (
            <span key={si}>
              {section.heading && <CuiNavHeading>{section.heading}</CuiNavHeading>}
              {section.items.map((item) => (
                <CuiNavItem
                  key={item.label}
                  label={item.label}
                  href="#"
                  selected={selectedNav === item.label ? true : undefined}
                  onClick={() => onNavChange(item.label)}
                >
                  {item.name ? (
                    <CuiIcon slot="icon" name={item.name} />
                  ) : item.iconUrl ? (
                    <CuiIcon slot="icon" url={item.iconUrl} />
                  ) : item.azureIconKey ? (
                    <CuiIcon slot="icon" url={azureIcon(item.azureIconKey)!} />
                  ) : null}
                </CuiNavItem>
              ))}
            </span>
          ))}
        </CuiSideNav>
      </nav>

      {/* Content area */}
      <div
        className="blade-content"
        style={contentBackground ? { background: `var(--${contentBackground})` } : undefined}
      >
        {/* Toggle strip */}
        <div className="blade-toggle-strip">
          <CuiButton
            appearance="subtle"
            size="small"
            iconOnly
            aria-label={sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <CuiIcon name={sidebarOpen ? 'chevron-left' : 'arrow-right'} />
          </CuiButton>
        </div>

        {/* Child content */}
        {children}
      </div>
    </div>
  );
}

// ─── Shared CSS ───

export const bladeSidebarStyles = `
  /* ─── Body: sidebar + content ─── */
  .blade-body {
    display: flex;
    flex: 1;
    overflow: hidden;
  }

  /* Collapsible sidebar */
  .blade-sidebar {
    width: 220px;
    min-width: 220px;
    border-right: 1px solid var(--neutral-stroke2);
    background: var(--neutral-background1);
    overflow-y: auto;
    transition: width 0.2s ease, min-width 0.2s ease;
  }
  .blade-sidebar.collapsed {
    width: 0;
    min-width: 0;
    overflow: hidden;
    border-right: none;
  }

  /* Toggle strip — thin column between sidebar and content */
  .blade-toggle-strip {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 28px;
    min-width: 28px;
    padding-top: 8px;
    background: var(--neutral-background2);
    border-right: 1px solid var(--neutral-stroke2);
  }

  /* Content area */
  .blade-content {
    flex: 1;
    overflow: hidden;
    background: var(--neutral-background1);
    display: flex;
    flex-direction: row;
  }
`;
