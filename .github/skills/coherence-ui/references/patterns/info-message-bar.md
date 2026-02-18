# Info Message Bar (Blue)

Page-level informational banner matching the Azure portal's blue info bar style.

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

## React Example

```tsx
import {
  CuiButton,
  CuiIcon,
  CuiMessageBar,
} from '@charm-ux/cui/react';

<CuiMessageBar intent="info" shape="square" dismissible open>
  <CuiIcon slot="icon" name="info-filled" label="info" />
  The Log Analytics agents, used by VM Insights, won't be supported
  as of August 31, 2024. Plan to migrate to VM Insights on Azure
  Monitor agent prior to this date.
  <CuiButton slot="action" appearance="link" href="#">→</CuiButton>
</CuiMessageBar>
```

## Key Props

| Prop | Value | Why |
|---|---|---|
| `intent` | `"info"` | Semantically correct intent (blue styling added via CSS) |
| `shape` | `"square"` | Page-level banners use square corners |
| `dismissible` | `true` | Adds built-in close button |
| `open` | bound to state | Controls visibility; use `onMessageBarHide` for dismiss |

## When to Use

- Page-level informational notices (deprecation warnings, migration prompts)
- Non-blocking messages that persist until dismissed
- Use `shape="square"` for full-width page banners, `shape="rounded"` inside cards or panels
