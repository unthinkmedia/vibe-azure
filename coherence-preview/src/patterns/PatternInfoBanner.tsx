// @ts-nocheck
/**
 * PatternInfoBanner — fallback for CuiMessageBar intent="info"
 *
 * CuiMessageBar renders grey by default for intent="info" and its shadow DOM
 * CSS custom properties are unreliable. This plain-HTML banner guarantees the
 * blue background/border/icon that the Azure portal uses.
 */
import { CuiIcon } from '@charm-ux/cui/react';
import type { CSSProperties, ReactNode } from 'react';

const STYLE_ID = 'pattern-info-banner-styles';

export const infoBannerStyles = `
  .pattern-info-banner {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    padding: 12px 16px;
    border-radius: 4px;
    font-size: var(--font-size-base300);
    line-height: var(--line-height-base-300);
    color: var(--neutral-foreground1);
  }

  .pattern-info-banner.info {
    background: var(--brand-background2);
    border: 1px solid var(--brand-stroke1);
  }

  .pattern-info-banner.warning {
    background: var(--status-warning-background1);
    border: 1px solid var(--status-warning-foreground1);
  }

  .pattern-info-banner.success {
    background: var(--status-success-background1);
    border: 1px solid var(--status-success-foreground1);
  }

  .pattern-info-banner.danger {
    background: var(--status-danger-background1);
    border: 1px solid var(--status-danger-foreground1);
  }

  .pattern-info-banner-icon {
    flex-shrink: 0;
    font-size: 20px;
  }

  .pattern-info-banner.info .pattern-info-banner-icon {
    color: var(--brand-foreground-link);
  }

  .pattern-info-banner.warning .pattern-info-banner-icon {
    color: var(--status-warning-foreground1);
  }

  .pattern-info-banner.success .pattern-info-banner-icon {
    color: var(--status-success-foreground1);
  }

  .pattern-info-banner.danger .pattern-info-banner-icon {
    color: var(--status-danger-foreground1);
  }

  .pattern-info-banner-content {
    flex: 1;
    min-width: 0;
  }

  .pattern-info-banner-content a {
    color: var(--brand-foreground-link);
    text-decoration: none;
  }
`;

function ensureStyles(): void {
  if (typeof document === 'undefined') return;
  if (document.getElementById(STYLE_ID)) return;
  const style = document.createElement('style');
  style.id = STYLE_ID;
  style.textContent = infoBannerStyles;
  document.head.appendChild(style);
}

// ─── Icon mapping ───

const INTENT_ICONS: Record<string, string> = {
  info: 'info',
  warning: 'warning',
  success: 'checkmark-circle',
  danger: 'dismiss-circle',
};

// ─── Public interface ───

export type InfoBannerIntent = 'info' | 'warning' | 'success' | 'danger';

export interface InfoBannerProps {
  /** Visual intent — controls background, border, and icon color */
  intent?: InfoBannerIntent;
  /** Override the default icon name */
  icon?: string;
  /** Banner content (text, links, etc.) */
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export function InfoBanner({
  intent = 'info',
  icon,
  children,
  className,
  style,
}: InfoBannerProps) {
  ensureStyles();

  const rootClass = className
    ? `pattern-info-banner ${intent} ${className}`
    : `pattern-info-banner ${intent}`;

  return (
    <div className={rootClass} style={style} role="status">
      <CuiIcon
        name={icon ?? INTENT_ICONS[intent]}
        className="pattern-info-banner-icon"
      />
      <div className="pattern-info-banner-content">{children}</div>
    </div>
  );
}

// ─── Demo (default export for pattern gallery) ───

export default function PatternInfoBanner() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 700, padding: 24 }}>
      <InfoBanner intent="info">
        These keys are used to access your Foundry API. Do not share your keys. Store them securely — for example, using Azure Key Vault.
      </InfoBanner>
      <InfoBanner intent="warning">
        Access key key1 was created 120 days ago. Rotate keys that are older than 90 days for security best practices.
      </InfoBanner>
      <InfoBanner intent="success">
        All resources are operating normally. No issues detected.
      </InfoBanner>
      <InfoBanner intent="danger">
        3 critical alerts require immediate attention. <a href="#">View alerts</a>
      </InfoBanner>
    </div>
  );
}
