// @ts-nocheck
import { CuiIcon } from '@charm-ux/cui/react';
import { useState, type CSSProperties } from 'react';

const STYLE_ID = 'pattern-essentials-accordion-styles';

export const essentialsAccordionStyles = `
  .pattern-essentials-accordion {
    border-bottom: 1px solid var(--neutral-stroke2);
  }

  .pattern-essentials-accordion-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 32px;
    cursor: pointer;
    user-select: none;
  }

  .pattern-essentials-accordion-header-left {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: var(--font-size-base300);
    font-weight: var(--font-weight-semi-bold);
    color: var(--neutral-foreground1);
  }

  .pattern-essentials-accordion-header-right a {
    color: var(--brand-foreground-link);
    text-decoration: none;
    font-size: var(--font-size-base300);
  }

  .pattern-essentials-accordion-body {
    overflow: hidden;
    transition: max-height 0.25s ease;
  }

  .pattern-essentials-accordion-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0;
    padding: 4px 32px 16px;
  }

  .pattern-essentials-accordion-row {
    display: flex;
    padding: 4px 0;
    font-size: var(--font-size-base300);
    line-height: var(--line-height-base-300);
  }

  .pattern-essentials-accordion-label {
    color: var(--neutral-foreground3);
    min-width: 180px;
    flex-shrink: 0;
  }

  .pattern-essentials-accordion-sep {
    color: var(--neutral-foreground3);
    margin: 0 8px;
  }

  .pattern-essentials-accordion-value {
    color: var(--neutral-foreground1);
    word-break: break-all;
  }

  .pattern-essentials-accordion-value a {
    color: var(--brand-foreground-link);
    text-decoration: none;
  }

  .pattern-essentials-accordion-status-dot {
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    margin-right: 6px;
    vertical-align: middle;
  }

  .pattern-essentials-accordion-status-dot.success {
    background: var(--status-success-foreground1);
  }
  .pattern-essentials-accordion-status-dot.warning {
    background: var(--status-warning-foreground1);
  }
  .pattern-essentials-accordion-status-dot.error {
    background: var(--status-danger-foreground1);
  }
`;

function ensureStyles(): void {
  if (typeof document === 'undefined') return;
  if (document.getElementById(STYLE_ID)) return;
  const style = document.createElement('style');
  style.id = STYLE_ID;
  style.textContent = essentialsAccordionStyles;
  document.head.appendChild(style);
}

// ─── Public interface ───

export interface EssentialsRow {
  label: string;
  value: string;
  href?: string;
  status?: 'success' | 'warning' | 'error';
}

export interface EssentialsAccordionProps {
  rows: EssentialsRow[];
  defaultOpen?: boolean;
  showJsonView?: boolean;
  title?: string;
  className?: string;
  style?: CSSProperties;
}

export function EssentialsAccordion({
  rows,
  defaultOpen = true,
  showJsonView = true,
  title = 'Essentials',
  className,
  style,
}: EssentialsAccordionProps) {
  ensureStyles();
  const [open, setOpen] = useState(defaultOpen);

  const rootClass = className
    ? `pattern-essentials-accordion ${className}`
    : 'pattern-essentials-accordion';

  return (
    <div className={rootClass} style={style}>
      <div
        className="pattern-essentials-accordion-header"
        onClick={() => setOpen(!open)}
        role="button"
        tabIndex={0}
        aria-expanded={open}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setOpen(!open);
          }
        }}
      >
        <span className="pattern-essentials-accordion-header-left">
          <CuiIcon
            name="chevron-down"
            style={{
              fontSize: 12,
              transition: 'transform 0.2s',
              transform: open ? 'rotate(0deg)' : 'rotate(-90deg)',
            }}
          />
          {title}
        </span>
        {showJsonView && (
          <span className="pattern-essentials-accordion-header-right">
            <a href="#">JSON View</a>
          </span>
        )}
      </div>
      <div
        className="pattern-essentials-accordion-body"
        style={{ maxHeight: open ? '400px' : '0' }}
      >
        <div className="pattern-essentials-accordion-grid">
          {rows.map((row) => (
            <div key={row.label} className="pattern-essentials-accordion-row">
              <span className="pattern-essentials-accordion-label">{row.label}</span>
              <span className="pattern-essentials-accordion-sep">:</span>
              <span className="pattern-essentials-accordion-value">
                {row.status && (
                  <span className={`pattern-essentials-accordion-status-dot ${row.status}`} />
                )}
                {row.href ? <a href={row.href}>{row.value}</a> : row.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Demo (default export for pattern gallery) ───

const demoRows: EssentialsRow[] = [
  { label: 'Resource group', value: 'my-resource-group', href: '#' },
  { label: 'Status', value: 'Running', status: 'success' },
  { label: 'Location', value: 'East US' },
  { label: 'Subscription', value: 'Visual Studio Enterprise', href: '#' },
  { label: 'Subscription ID', value: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx' },
  { label: 'Pricing tier', value: 'S0 (Standard)' },
];

export default function PatternEssentialsAccordion() {
  return (
    <div style={{ maxWidth: 900, background: 'var(--neutral-background1)', padding: 0 }}>
      <EssentialsAccordion rows={demoRows} />
    </div>
  );
}
