/**
 * Styles for Azure Cost Management + Billing Dashboard
 */

export const costManagementStyles = `
  /* ─── Dashboard grid ─── */
  .cm-dashboard {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    padding: 0 32px 32px;
  }

  .cm-card {
    background: var(--neutral-background1);
    border: 1px solid var(--neutral-stroke2);
    border-radius: 8px;
    padding: 16px;
  }

  .cm-card-title {
    font-size: var(--font-size-base400);
    font-weight: var(--font-weight-semi-bold);
    color: var(--neutral-foreground1);
    margin: 0 0 16px;
  }

  .cm-full-width {
    grid-column: 1 / -1;
  }

  /* ─── Donut Chart ─── */
  .cm-donut-layout {
    display: flex;
    gap: 32px;
    align-items: center;
  }

  .cm-donut-wrap {
    position: relative;
    width: 160px;
    height: 160px;
    flex-shrink: 0;
  }

  .cm-donut-wrap svg {
    transform: rotate(-90deg);
  }

  .cm-donut-center {
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .cm-donut-total {
    font-size: var(--font-size-hero700);
    font-weight: var(--font-weight-bold);
    color: var(--neutral-foreground1);
    line-height: 1;
  }

  .cm-donut-label {
    font-size: var(--font-size-base100);
    color: var(--neutral-foreground3);
    margin-top: 2px;
  }

  .cm-donut-legend {
    display: flex;
    flex-direction: column;
    gap: 8px;
    flex: 1;
  }

  .cm-legend-item {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: var(--font-size-base300);
    color: var(--neutral-foreground1);
  }

  .cm-legend-swatch {
    width: 12px;
    height: 12px;
    border-radius: 2px;
    flex-shrink: 0;
  }

  .cm-legend-cost {
    margin-left: auto;
    font-weight: var(--font-weight-semi-bold);
    font-variant-numeric: tabular-nums;
  }

  .cm-legend-pct {
    color: var(--neutral-foreground3);
    font-size: var(--font-size-base200);
    width: 40px;
    text-align: right;
  }

  /* ─── Bar Chart ─── */
  .cm-bar-chart {
    display: flex;
    align-items: flex-end;
    gap: 2px;
    height: 160px;
    position: relative;
    margin-top: 8px;
  }

  .cm-bar-col {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    justify-content: flex-end;
    position: relative;
  }

  .cm-bar {
    width: 100%;
    max-width: 14px;
    border-radius: 2px 2px 0 0;
    transition: opacity 0.15s;
    cursor: default;
  }

  .cm-bar:hover {
    opacity: 0.8;
  }

  .cm-bar-label {
    font-size: var(--font-size-base100);
    color: var(--neutral-foreground3);
    margin-top: 4px;
    text-align: center;
    white-space: nowrap;
  }

  .cm-budget-line {
    position: absolute;
    left: 0;
    right: 0;
    border-top: 2px dashed var(--status-danger-foreground1);
    pointer-events: none;
  }

  .cm-budget-tag {
    position: absolute;
    right: 0;
    font-size: var(--font-size-base100);
    color: var(--status-danger-foreground1);
    font-weight: var(--font-weight-semi-bold);
    white-space: nowrap;
  }

  /* ─── Resource Group Table ─── */
  .cm-table-wrap {
    overflow-x: auto;
  }

  .cm-table {
    width: 100%;
    border-collapse: collapse;
    font-size: var(--font-size-base300);
  }

  .cm-table th {
    text-align: left;
    font-weight: var(--font-weight-semi-bold);
    color: var(--neutral-foreground3);
    font-size: var(--font-size-base200);
    padding: 8px 12px;
    border-bottom: 1px solid var(--neutral-stroke2);
    white-space: nowrap;
  }

  .cm-table td {
    padding: 10px 12px;
    border-bottom: 1px solid var(--neutral-stroke2);
    color: var(--neutral-foreground1);
    vertical-align: middle;
  }

  .cm-table tr:last-child td {
    border-bottom: none;
  }

  .cm-rg-name {
    font-weight: var(--font-weight-semi-bold);
    color: var(--brand-foreground-link);
    cursor: pointer;
  }

  .cm-change-up {
    color: var(--status-danger-foreground1);
    font-weight: var(--font-weight-semi-bold);
  }

  .cm-change-down {
    color: var(--status-success-foreground1);
    font-weight: var(--font-weight-semi-bold);
  }

  .cm-anomaly-badge {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    background: var(--status-danger-background1);
    color: var(--status-danger-foreground1);
    font-size: var(--font-size-base100);
    font-weight: var(--font-weight-semi-bold);
    padding: 2px 8px;
    border-radius: 4px;
    white-space: nowrap;
  }

  /* ─── Budget Alerts ─── */
  .cm-budget-list {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .cm-budget-item {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .cm-budget-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
  }

  .cm-budget-name {
    font-size: var(--font-size-base300);
    font-weight: var(--font-weight-semi-bold);
    color: var(--neutral-foreground1);
  }

  .cm-budget-amount {
    font-size: var(--font-size-base200);
    color: var(--neutral-foreground3);
    font-variant-numeric: tabular-nums;
  }

  .cm-progress-track {
    height: 8px;
    background: var(--neutral-background3);
    border-radius: 4px;
    overflow: hidden;
  }

  .cm-progress-fill {
    height: 100%;
    border-radius: 4px;
    transition: width 0.3s ease;
  }

  .cm-progress-fill.success {
    background: var(--status-success-foreground1);
  }

  .cm-progress-fill.warning {
    background: var(--status-warning-foreground1);
  }

  .cm-progress-fill.danger {
    background: var(--status-danger-foreground1);
  }

  .cm-budget-pct {
    font-size: var(--font-size-base100);
    font-weight: var(--font-weight-semi-bold);
  }

  .cm-budget-pct.success { color: var(--status-success-foreground1); }
  .cm-budget-pct.warning { color: var(--status-warning-foreground1); }
  .cm-budget-pct.danger  { color: var(--status-danger-foreground1); }

  /* ─── Recommendations ─── */
  .cm-rec-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .cm-rec-item {
    display: flex;
    gap: 12px;
    align-items: flex-start;
    padding: 12px;
    border-radius: 6px;
    background: var(--neutral-background2);
  }

  .cm-rec-icon {
    width: 32px;
    height: 32px;
    border-radius: 6px;
    background: var(--status-success-background1);
    color: var(--status-success-foreground1);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    font-size: 16px;
  }

  .cm-rec-body {
    flex: 1;
    min-width: 0;
  }

  .cm-rec-title {
    font-size: var(--font-size-base300);
    font-weight: var(--font-weight-semi-bold);
    color: var(--neutral-foreground1);
    margin-bottom: 2px;
  }

  .cm-rec-desc {
    font-size: var(--font-size-base200);
    color: var(--neutral-foreground3);
    line-height: 1.4;
  }

  .cm-rec-savings {
    font-size: var(--font-size-base300);
    font-weight: var(--font-weight-bold);
    color: var(--status-success-foreground1);
    white-space: nowrap;
    align-self: center;
  }

  /* ─── Sparkline ─── */
  .cm-sparkline {
    display: inline-block;
    vertical-align: middle;
  }
`;
