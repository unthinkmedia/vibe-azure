// @ts-nocheck
import { CuiButton, CuiIcon } from '@charm-ux/cui/react';
import { useState, useCallback, type CSSProperties, type ReactNode } from 'react';

const STYLE_ID = 'pattern-keys-endpoint-styles';

export const keysEndpointStyles = `
  .pattern-keys-endpoint {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .pattern-keys-endpoint-toggle {
    align-self: flex-start;
  }

  .pattern-key-field {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .pattern-key-field-label {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: var(--font-size-base300);
    font-weight: var(--font-weight-semi-bold);
    color: var(--neutral-foreground1);
  }

  .pattern-key-field-label cui-icon {
    font-size: 14px;
    color: var(--neutral-foreground3);
    cursor: help;
  }

  .pattern-key-field-input {
    display: flex;
    align-items: center;
    gap: 0;
  }

  .pattern-key-field-value {
    flex: 1;
    font-family: var(--font-family-monospace);
    font-size: var(--font-size-base200);
    color: var(--neutral-foreground2);
    background: var(--neutral-background3);
    padding: 7px 12px;
    border: 1px solid var(--neutral-stroke2);
    border-radius: var(--border-radius-sm);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    line-height: var(--line-height-base-200);
  }

  .pattern-key-field-copy {
    flex-shrink: 0;
    margin-left: 4px;
  }
`;

function ensureStyles(): void {
  if (typeof document === 'undefined') return;
  if (document.getElementById(STYLE_ID)) return;
  const style = document.createElement('style');
  style.id = STYLE_ID;
  style.textContent = keysEndpointStyles;
  document.head.appendChild(style);
}

// ─── Public interfaces ───

export interface KeyFieldConfig {
  /** Label shown above the field */
  label: string;
  /** The raw value (shown when revealed or when not masked) */
  value: string;
  /** Whether this field should be masked when hidden (default: true) */
  masked?: boolean;
  /** Show an info (i) icon next to the label with tooltip text */
  infoTooltip?: string;
  /** Whether the field is copyable (default: true) */
  copyable?: boolean;
}

export interface KeysEndpointProps {
  /** Array of key/endpoint fields to display */
  fields: KeyFieldConfig[];
  /** Label for the show button (default: "Show Keys") */
  showLabel?: string;
  /** Label for the hide button (default: "Hide Keys") */
  hideLabel?: string;
  /** Optional callback when a value is copied */
  onCopy?: (field: KeyFieldConfig) => void;
  /** Optional header content (e.g. MessageBar) rendered above the toggle */
  header?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

// ─── KeyField sub-component (exported for reuse) ───

export interface KeyFieldProps {
  label: string;
  value: string;
  displayValue?: string;
  infoTooltip?: string;
  copyable?: boolean;
  onCopy?: () => void;
}

export function KeyField({
  label,
  value,
  displayValue,
  infoTooltip,
  copyable = true,
  onCopy,
}: KeyFieldProps) {
  ensureStyles();

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(value);
    onCopy?.();
  }, [value, onCopy]);

  return (
    <div className="pattern-key-field">
      <span className="pattern-key-field-label">
        {label}
        {infoTooltip && (
          <CuiIcon name="info" style={{ fontSize: 14 }} title={infoTooltip} />
        )}
      </span>
      <div className="pattern-key-field-input">
        <span className="pattern-key-field-value">
          {displayValue ?? value}
        </span>
        {copyable && (
          <CuiButton
            className="pattern-key-field-copy"
            appearance="subtle"
            size="small"
            iconOnly
            aria-label={`Copy ${label}`}
            onClick={handleCopy}
          >
            <CuiIcon name="copy" />
          </CuiButton>
        )}
      </div>
    </div>
  );
}

// ─── Main component ───

const MASK = '••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••';

export function KeysEndpoint({
  fields,
  showLabel = 'Show Keys',
  hideLabel = 'Hide Keys',
  onCopy,
  header,
  className,
  style,
}: KeysEndpointProps) {
  ensureStyles();
  const [revealed, setRevealed] = useState(false);

  const hasMaskedFields = fields.some((f) => f.masked !== false);

  const rootClass = className
    ? `pattern-keys-endpoint ${className}`
    : 'pattern-keys-endpoint';

  return (
    <div className={rootClass} style={style}>
      {header}

      {hasMaskedFields && (
        <CuiButton
          className="pattern-keys-endpoint-toggle"
          appearance="primary"
          size="small"
          onClick={() => setRevealed(!revealed)}
        >
          {revealed ? hideLabel : showLabel}
        </CuiButton>
      )}

      {fields.map((field) => {
        const isMasked = field.masked !== false;
        const displayValue = isMasked && !revealed ? MASK : field.value;

        return (
          <KeyField
            key={field.label}
            label={field.label}
            value={field.value}
            displayValue={displayValue}
            infoTooltip={field.infoTooltip}
            copyable={field.copyable !== false}
            onCopy={() => onCopy?.(field)}
          />
        );
      })}
    </div>
  );
}

// ─── Demo (default export for pattern gallery) ───

const demoFields: KeyFieldConfig[] = [
  { label: 'KEY 1', value: 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6', masked: true },
  { label: 'KEY 2', value: 'z9y8x7w6v5u4t3s2r1q0p9o8n7m6l5k4', masked: true },
  { label: 'Location/Region', value: 'eastus', masked: false, infoTooltip: 'The Azure region where this resource is deployed' },
  { label: 'Endpoint', value: 'https://eastus.api.cognitive.microsoft.com/', masked: false },
];

export default function PatternKeysEndpoint() {
  return (
    <div style={{ maxWidth: 700, padding: 24, background: 'var(--neutral-background1)' }}>
      <KeysEndpoint fields={demoFields} />
    </div>
  );
}
