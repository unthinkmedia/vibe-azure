# Info Message Bar (Blue) — Callout Pattern

Page-level informational banner matching the Azure portal's blue info bar style.
Supports **dismissible** (X button) and **arrow action** (navigation) variants — these
are mutually exclusive and never appear at the same time.

## Problem

`cui-message-bar` with `intent="info"` renders with a **neutral grey** background by default.
The Azure portal uses a **blue** info bar. There is no built-in blue intent in the component,
so CSS custom property overrides are required.

## Token Overrides

```css
cui-message-bar[intent='info'] {
  --message-bar-bg-color: var(--brand-background2);
  --message-bar-icon-fg-color: var(--brand-foreground-link);
  --message-bar-border: 1px solid var(--brand-stroke1);
}
```

| Token | Purpose | Light value |
|---|---|---|
| `--brand-background2` | Light blue background | `#ebf3fc` |
| `--brand-foreground-link` | Blue icon color | Azure brand blue |
| `--brand-stroke1` | Blue border | Azure brand stroke |

These tokens adapt automatically in dark mode.

## Variants

### 1. Dismissible (X button)

Use when the callout is informational and the user can close it. No arrow action.

```tsx
<CuiMessageBar intent="info" shape="square" dismissible open={visible}
  onMessageBarHide={() => setVisible(false)}>
  <CuiIcon slot="icon" name="info-filled" label="info" />
  The Log Analytics agents, used by VM Insights, won't be supported
  as of August 31, 2024.
</CuiMessageBar>
```

### 2. Arrow action (navigable)

Use when the callout links to a detail page or action. Not dismissible — the user
navigates instead of closing.

```tsx
<CuiMessageBar intent="info" shape="square" open>
  <CuiIcon slot="icon" name="info-filled" label="info" />
  The Log Analytics agents, used by VM Insights, won't be supported
  as of August 31, 2024. Plan to migrate to VM Insights on Azure
  Monitor agent prior to this date.
  <CuiButton slot="action" appearance="link" href="/migrate"
    aria-label="Learn about migration">→</CuiButton>
</CuiMessageBar>
```

### 3. Dismissible + inline link

Use when the callout can be dismissed but also contains a text link for more info.

```tsx
<CuiMessageBar intent="info" shape="square" dismissible open={visible}
  onMessageBarHide={() => setVisible(false)}>
  <CuiIcon slot="icon" name="info-filled" label="info" />
  The Log Analytics agents won't be supported as of August 31, 2024.{' '}
  <CuiButton appearance="link" href="/migrate">Learn more</CuiButton>
</CuiMessageBar>
```

### 4. With heading

Use for callouts that need a bold title above the body text.

```tsx
<CuiMessageBar intent="info" shape="square" heading="Migration required"
  dismissible open={visible} onMessageBarHide={() => setVisible(false)}>
  <CuiIcon slot="icon" name="info-filled" label="info" />
  Plan to migrate to VM Insights on Azure Monitor agent prior to August 31, 2024.
</CuiMessageBar>
```

### 5. Warning / Error / Success intents

The same patterns work for other intents — only the icon and intent change:

```tsx
{/* Warning — dismissible */}
<CuiMessageBar intent="warning" shape="square" dismissible open>
  <CuiIcon slot="icon" name="warning-filled" label="warning" />
  Your subscription will expire in 7 days.
</CuiMessageBar>

{/* Error — with arrow action */}
<CuiMessageBar intent="error" shape="square" open>
  <CuiIcon slot="icon" name="dismiss-circle-filled" label="error" />
  3 resources have configuration errors.
  <CuiButton slot="action" appearance="link" href="/errors"
    aria-label="View errors">→</CuiButton>
</CuiMessageBar>

{/* Success — dismissible */}
<CuiMessageBar intent="success" shape="square" dismissible open>
  <CuiIcon slot="icon" name="checkmark-circle-filled" label="success" />
  Migration completed successfully.
</CuiMessageBar>
```

## Full React Helper Component

```tsx
import { useState } from 'react';
import {
  CuiButton,
  CuiIcon,
  CuiMessageBar,
} from '@charm-ux/cui/react';

type CalloutIntent = 'info' | 'warning' | 'error' | 'success';
type CalloutAction = 'dismiss' | 'arrow';

interface CalloutProps {
  intent?: CalloutIntent;
  /** 'dismiss' shows X button; 'arrow' shows → navigation link. Mutually exclusive. */
  action?: CalloutAction;
  /** URL for arrow action. Required when action is 'arrow'. */
  href?: string;
  /** Accessible label for the arrow action. */
  arrowLabel?: string;
  heading?: string;
  shape?: 'square' | 'rounded';
  children: React.ReactNode;
  /** Controlled visibility. */
  open?: boolean;
  onDismiss?: () => void;
}

const intentIcons: Record<CalloutIntent, { name: string; label: string }> = {
  info:    { name: 'info-filled',            label: 'info' },
  warning: { name: 'warning-filled',         label: 'warning' },
  error:   { name: 'dismiss-circle-filled',  label: 'error' },
  success: { name: 'checkmark-circle-filled', label: 'success' },
};

export function Callout({
  intent = 'info',
  action = 'dismiss',
  href,
  arrowLabel = 'Learn more',
  heading,
  shape = 'square',
  children,
  open = true,
  onDismiss,
}: CalloutProps) {
  const icon = intentIcons[intent];

  return (
    <CuiMessageBar
      intent={intent}
      shape={shape}
      heading={heading}
      dismissible={action === 'dismiss'}
      open={open}
      onMessageBarHide={onDismiss}
    >
      <CuiIcon slot="icon" name={icon.name} label={icon.label} />
      {children}
      {action === 'arrow' && (
        <CuiButton slot="action" appearance="link" href={href}
          aria-label={arrowLabel}>→</CuiButton>
      )}
    </CuiMessageBar>
  );
}
```

## Key Props

| Prop | Value | Why |
|---|---|---|
| `intent` | `"info"` / `"warning"` / `"error"` / `"success"` | Sets semantic intent; info needs CSS overrides for blue |
| `shape` | `"square"` | Page-level banners use square corners |
| `dismissible` | `true` when action is dismiss | Adds built-in close (X) button |
| `open` | bound to state | Controls visibility; use `onMessageBarHide` for dismiss |
| `slot="action"` | `CuiButton` with `→` | Navigation arrow — omit when `dismissible` is set |

## Rules

- **Never show both** the dismiss X and arrow → at the same time — pick one per callout
- `dismissible` = user can close it; `slot="action"` arrow = user navigates to detail
- Use `shape="square"` for full-width page banners, `shape="rounded"` inside cards/panels
- Warning/error/success intents use their built-in colors; only `info` needs CSS overrides
