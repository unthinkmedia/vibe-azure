// @ts-nocheck
/** Scoped styles for Azure Functions overview experiment. */
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

  /* ─── Metrics grid ─── */
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
  .metric-trend.error-up { color: var(--status-danger-foreground1); }

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

  /* ─── Functions table ─── */
  .functions-table {
    width: 100%;
    border-collapse: collapse;
    font-size: var(--font-size-base300);
    background: var(--neutral-background1);
    border: 1px solid var(--neutral-stroke2);
    border-radius: var(--border-radius-md);
    overflow: hidden;
  }
  .functions-table th {
    text-align: left;
    padding: 10px 16px;
    font-weight: var(--font-weight-semi-bold);
    font-size: var(--font-size-base200);
    color: var(--neutral-foreground3);
    background: var(--neutral-background3);
    border-bottom: 1px solid var(--neutral-stroke2);
  }
  .functions-table td {
    padding: 10px 16px;
    color: var(--neutral-foreground1);
    border-bottom: 1px solid var(--neutral-stroke2);
  }
  .functions-table tr:last-child td {
    border-bottom: none;
  }
  .functions-table tr:hover td {
    background: var(--neutral-background1-hover);
  }
  .function-name-link {
    color: var(--brand-foreground-link);
    text-decoration: none;
    font-weight: var(--font-weight-semi-bold);
  }
  .trigger-badge {
    font-size: var(--font-size-base200);
    color: var(--neutral-foreground2);
    padding: 2px 8px;
    background: var(--neutral-background3);
    border-radius: var(--border-radius-sm);
  }
  .status-enabled {
    color: var(--status-success-foreground1);
  }
  .status-disabled {
    color: var(--neutral-foreground3);
  }
  .error-count {
    color: var(--status-danger-foreground1);
    font-weight: var(--font-weight-semi-bold);
  }
`;
