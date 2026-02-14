# Status Patterns

How to visually represent Azure resource states in Coherence UI prototypes.

## Status Dot + Text Pattern

The most common Azure status indicator is a colored dot with text. Implement as an inline flex container:

```tsx
function StatusIndicator({ status, color }: { status: string; color: string }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
      <span style={{
        width: 8, height: 8, borderRadius: '50%',
        backgroundColor: color, flexShrink: 0,
      }} />
      {status}
    </span>
  );
}
```

## Status Color Map

| Status | Color Token | Hex Fallback | Context |
|--------|-------------|--------------|---------|
| Running | `--success-foreground-1` | `#0f7b0f` | App Service, VM, Function App |
| Available | `--success-foreground-1` | `#0f7b0f` | Storage, Key Vault |
| Online | `--success-foreground-1` | `#0f7b0f` | SQL Database, API Management |
| Succeeded | `--success-foreground-1` | `#0f7b0f` | Deployments, Operations |
| Enabled | `--success-foreground-1` | `#0f7b0f` | Subscriptions, Features |
| Stopped | `--neutral-foreground-3` | `#707070` | App Service, VM |
| Stopped (deallocated) | `--neutral-foreground-3` | `#707070` | VM |
| Disabled | `--neutral-foreground-3` | `#707070` | Subscriptions |
| Starting | `--warning-foreground-1` | `#c4750c` | App Service, VM |
| Updating | `--warning-foreground-1` | `#c4750c` | Any resource |
| Warned | `--warning-foreground-1` | `#c4750c` | Subscriptions |
| Failed | `--danger-foreground-1` | `#b10e1c` | Deployments, Operations |
| Error | `--danger-foreground-1` | `#b10e1c` | Health checks |
| Degraded | `--severe-foreground-1` | `#d13438` | Health |
| PastDue | `--danger-foreground-1` | `#b10e1c` | Subscriptions |
| Preview | `--brand-foreground-1` | `#0078d4` | Feature flags, APIs |

## Badge Pattern

Use `CuiBadge` for compact status labels in tables and card lists:

```tsx
<CuiBadge appearance="filled" color="success">Running</CuiBadge>
<CuiBadge appearance="filled" color="danger">Failed</CuiBadge>
<CuiBadge appearance="filled" color="warning">Starting</CuiBadge>
<CuiBadge appearance="tint" color="informative">Preview</CuiBadge>
<CuiBadge appearance="ghost" color="subtle">Stopped</CuiBadge>
```

## Health State Indicators

For resource health / monitoring dashboards:

| State | Icon | Color |
|-------|------|-------|
| Healthy | `checkmark-circle` | success |
| Degraded | `warning` | warning |
| Unavailable | `error-circle` | danger |
| Unknown | `question-circle` | neutral |

```tsx
<span style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--success-foreground-1)' }}>
  <CuiIcon name="checkmark" style={{ fontSize: 16 }} />
  Healthy
</span>
```

## Provisioning State (Create Flows)

After a create operation, show provisioning progress:

| State | Display |
|-------|---------|
| Accepted | Spinner + "Submitting…" |
| Creating | Spinner + "Creating resources…" |
| Succeeded | Checkmark + "Deployment complete" |
| Failed | Error icon + "Deployment failed" + error message |

```tsx
// In-progress
<div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
  <CuiSpinner size="tiny" />
  <span>Creating resources…</span>
</div>

// Completed
<CuiMessageBar intent="success">
  <span slot="body">Deployment complete. Go to resource.</span>
</CuiMessageBar>
```
