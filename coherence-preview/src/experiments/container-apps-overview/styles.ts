// @ts-nocheck
/** Scoped styles for Azure Container Apps overview experiment. */
export const styles = `
  body { margin: 0; }
  [slot='main'] {
    min-width: 320px;
    padding: 0;
    background: var(--neutral-background2);
  }

  .content-area {
    padding: 24px 32px;
  }

  /* ─── Essentials panel ─── */
  .essentials {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0;
    margin-bottom: 24px;
    padding: 16px 20px;
    background: var(--neutral-background1);
    border: 1px solid var(--neutral-stroke2);
    border-radius: var(--border-radius-md);
  }
  .essentials-row {
    display: flex;
    padding: 6px 0;
    font-size: var(--font-size-base300);
    line-height: var(--line-height-base-300);
  }
  .essentials-label {
    color: var(--neutral-foreground3);
    min-width: 160px;
    flex-shrink: 0;
  }
  .essentials-value {
    color: var(--neutral-foreground1);
    word-break: break-all;
  }
  .essentials-value a {
    color: var(--brand-foreground-link);
    text-decoration: none;
  }
  .status-dot {
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    margin-right: 6px;
    vertical-align: middle;
  }
  .status-dot.success { background: var(--status-success-foreground1); }
  .status-dot.warning { background: var(--status-warning-foreground1); }
  .status-dot.error   { background: var(--status-danger-foreground1); }

  /* ─── Section headings ─── */
  .section-title {
    font-size: var(--font-size-base400);
    font-weight: var(--font-weight-semi-bold);
    color: var(--neutral-foreground1);
    margin: 0 0 12px;
  }

  /* ─── Scaling metrics grid ─── */
  .metrics-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
    margin-bottom: 24px;
  }
  @media (max-width: 1100px) {
    .metrics-grid { grid-template-columns: repeat(2, 1fr); }
  }
  @media (max-width: 600px) {
    .metrics-grid { grid-template-columns: 1fr; }
  }

  .metric-card {
    --card-padding: 16px;
  }
  .metric-header {
    font-size: var(--font-size-base200);
    color: var(--neutral-foreground3);
    margin: 0 0 4px;
  }
  .metric-value {
    font-size: 28px;
    font-weight: var(--font-weight-semi-bold);
    color: var(--neutral-foreground1);
    line-height: 1.2;
  }
  .metric-unit {
    font-size: var(--font-size-base200);
    color: var(--neutral-foreground3);
    margin-left: 4px;
    font-weight: var(--font-weight-regular);
  }
  .metric-trend {
    display: flex;
    align-items: center;
    gap: 4px;
    margin-top: 4px;
    font-size: var(--font-size-base200);
  }
  .metric-trend.up   { color: var(--status-success-foreground1); }
  .metric-trend.down { color: var(--status-success-foreground1); }
  .metric-trend.flat { color: var(--neutral-foreground3); }

  /* ─── Sparkline ─── */
  .sparkline-container {
    margin-top: 12px;
    height: 40px;
  }
  .sparkline-container svg {
    display: block;
    width: 100%;
    height: 40px;
  }

  /* ─── Revisions table ─── */
  .revisions-table {
    width: 100%;
    border-collapse: collapse;
    font-size: var(--font-size-base300);
    background: var(--neutral-background1);
    border: 1px solid var(--neutral-stroke2);
    border-radius: var(--border-radius-md);
    overflow: hidden;
  }
  .revisions-table th {
    text-align: left;
    padding: 10px 16px;
    font-weight: var(--font-weight-semi-bold);
    font-size: var(--font-size-base200);
    color: var(--neutral-foreground3);
    background: var(--neutral-background3);
    border-bottom: 1px solid var(--neutral-stroke2);
  }
  .revisions-table td {
    padding: 10px 16px;
    color: var(--neutral-foreground1);
    border-bottom: 1px solid var(--neutral-stroke2);
  }
  .revisions-table tr:last-child td {
    border-bottom: none;
  }
  .revisions-table tr:hover td {
    background: var(--neutral-background1-hover);
  }
  .revision-name-link {
    color: var(--brand-foreground-link);
    text-decoration: none;
    font-weight: var(--font-weight-semi-bold);
    font-family: var(--font-family-monospace);
    font-size: var(--font-size-base200);
  }
  .status-running {
    color: var(--status-success-foreground1);
  }
  .status-provisioning {
    color: var(--status-warning-foreground1);
  }
  .status-degraded {
    color: var(--status-danger-foreground1);
  }
  .status-inactive {
    color: var(--neutral-foreground3);
  }
  .traffic-bar {
    display: inline-flex;
    align-items: center;
    gap: 8px;
  }
  .traffic-fill {
    display: inline-block;
    height: 6px;
    border-radius: 3px;
    background: var(--brand-foreground-link);
    min-width: 2px;
  }
  .traffic-fill.zero {
    background: var(--neutral-stroke2);
    width: 40px;
  }

  /* ─── Ingress config panel ─── */
  .ingress-panel {
    background: var(--neutral-background1);
    border: 1px solid var(--neutral-stroke2);
    border-radius: var(--border-radius-md);
    padding: 20px;
  }
  .ingress-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0;
  }
  .ingress-row {
    display: flex;
    padding: 8px 0;
    font-size: var(--font-size-base300);
    line-height: var(--line-height-base-300);
  }
  .ingress-label {
    color: var(--neutral-foreground3);
    min-width: 180px;
    flex-shrink: 0;
  }
  .ingress-value {
    color: var(--neutral-foreground1);
  }
  .ingress-value a {
    color: var(--brand-foreground-link);
    text-decoration: none;
  }
  .ingress-badge-enabled {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    color: var(--status-success-foreground1);
    font-weight: var(--font-weight-semi-bold);
    font-size: var(--font-size-base200);
  }
  .ingress-badge-disabled {
    color: var(--neutral-foreground3);
    font-size: var(--font-size-base200);
  }
`;
