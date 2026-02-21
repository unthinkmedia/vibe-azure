# Pipeline Health Metric Card

Compact KPI card with status-accent icon, metric value, and short context text.

## Problem

Dashboard KPI rows frequently repeated the same markup and status-token wiring for pass/fail/in-progress cards, which made updates inconsistent across experiments.

## Solution

Create a reusable `HealthMetricCard` React pattern in `coherence-preview/src/patterns/PatternHealthMetricCard.tsx` and pass label/value/subtext/icon/accent as props.

### Token Overrides (if applicable)

No token overrides required. The pattern uses standard Coherence semantic tokens:

```css
.pattern-health-metric-card-icon.success {
  background: var(--status-success-background1);
  color: var(--status-success-foreground1);
}
.pattern-health-metric-card-icon.danger {
  background: var(--status-danger-background1);
  color: var(--status-danger-foreground1);
}
.pattern-health-metric-card-icon.brand {
  background: var(--brand-background2);
  color: var(--brand-foreground-link);
}
```

### React Example

```tsx
import { HealthMetricCard } from '../../patterns/PatternHealthMetricCard';

<HealthMetricCard
  label="Passed"
  value={148}
  subtext="Last 24 hours"
  icon="checkmark-circle"
  accent="success"
/>
```

## Key Props

| Prop | Value | Why |
|---|---|---|
| `label` | Short KPI name (`Passed`, `Failed`) | Keeps the card scannable in dense dashboard strips |
| `value` | Numeric or string metric | Supports counts and derived values |
| `subtext` | Timeframe or context | Prevents ambiguity on what the metric represents |
| `icon` | Fluent Iconify key (`checkmark-circle`) | Keeps icon choice data-driven |
| `accent` | `success` \| `danger` \| `brand` | Applies semantic token pair for status emphasis |

## When to Use

- Health/status summary strips in dashboard overviews
- Side-by-side KPI cards with consistent sizing and typography
- Any Azure portal metric cards needing semantic success/failure/active accents