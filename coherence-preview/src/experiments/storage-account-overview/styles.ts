// @ts-nocheck
/** Scoped styles for Azure Storage Account overview experiment. */
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

  /* ─── Two-column card row ─── */
  .overview-cards-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    margin-bottom: 24px;
  }
  @media (max-width: 900px) {
    .overview-cards-row { grid-template-columns: 1fr; }
  }

  /* ─── Donut chart ─── */
  .donut-card {
    --card-padding: 20px;
  }
  .donut-body {
    display: flex;
    gap: 24px;
    align-items: center;
  }
  .donut-wrap {
    position: relative;
    width: 140px;
    height: 140px;
    flex-shrink: 0;
  }
  .donut-wrap svg {
    transform: rotate(-90deg);
  }
  .donut-center {
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    pointer-events: none;
  }
  .donut-total {
    font-size: 22px;
    font-weight: 700;
    line-height: 1;
    color: var(--neutral-foreground1);
  }
  .donut-total-label {
    font-size: 11px;
    color: var(--neutral-foreground3);
    margin-top: 2px;
  }
  .donut-legend {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .donut-legend-row {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: var(--font-size-base200);
  }
  .donut-legend-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    flex-shrink: 0;
  }
  .donut-legend-label {
    flex: 1;
    color: var(--neutral-foreground1);
  }
  .donut-legend-value {
    font-weight: 600;
    font-variant-numeric: tabular-nums;
    color: var(--neutral-foreground1);
  }
  .donut-legend-pct {
    color: var(--neutral-foreground3);
    min-width: 40px;
    text-align: right;
  }

  /* ─── Cost card ─── */
  .cost-card {
    --card-padding: 20px;
  }
  .cost-primary {
    font-size: 32px;
    font-weight: 700;
    color: var(--neutral-foreground1);
    line-height: 1.1;
  }
  .cost-period {
    font-size: var(--font-size-base200);
    color: var(--neutral-foreground3);
    margin-top: 4px;
    margin-bottom: 12px;
  }
  .cost-trend {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-size: var(--font-size-base200);
    padding: 2px 8px;
    border-radius: var(--border-radius-sm);
  }
  .cost-trend.up {
    color: var(--status-danger-foreground1);
    background: var(--status-danger-background1);
  }
  .cost-trend.down {
    color: var(--status-success-foreground1);
    background: var(--status-success-background1);
  }
  .cost-breakdown {
    margin-top: 16px;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  .cost-breakdown-row {
    display: flex;
    justify-content: space-between;
    font-size: var(--font-size-base200);
  }
  .cost-breakdown-label {
    color: var(--neutral-foreground2);
  }
  .cost-breakdown-amount {
    font-weight: 600;
    font-variant-numeric: tabular-nums;
    color: var(--neutral-foreground1);
  }

  /* ─── Access keys ─── */
  .keys-section {
    margin-top: 8px;
  }
  .key-block {
    background: var(--neutral-background1);
    border: 1px solid var(--neutral-stroke2);
    border-radius: var(--border-radius-md);
    padding: 16px 20px;
    margin-bottom: 12px;
  }
  .key-block-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 12px;
  }
  .key-block-title {
    font-size: var(--font-size-base300);
    font-weight: var(--font-weight-semi-bold);
    color: var(--neutral-foreground1);
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .key-field {
    display: flex;
    flex-direction: column;
    gap: 4px;
    margin-bottom: 12px;
  }
  .key-field:last-child {
    margin-bottom: 0;
  }
  .key-field-label {
    font-size: var(--font-size-base200);
    color: var(--neutral-foreground3);
  }
  .key-field-row {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .key-field-value {
    flex: 1;
    font-family: var(--font-family-monospace);
    font-size: var(--font-size-base200);
    color: var(--neutral-foreground2);
    background: var(--neutral-background3);
    padding: 6px 12px;
    border-radius: var(--border-radius-sm);
    border: 1px solid var(--neutral-stroke2);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .key-age {
    font-size: var(--font-size-base200);
    color: var(--neutral-foreground3);
  }
  .key-age.stale {
    color: var(--status-danger-foreground1);
    font-weight: var(--font-weight-semi-bold);
  }

  /* ─── Warning banner ─── */
  .key-warning-banner {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 16px;
    margin-bottom: 16px;
    background: #fff4ce;
    border: 1px solid #d97706;
    border-radius: var(--border-radius-sm);
    font-size: var(--font-size-base300);
    color: #78350f;
    line-height: var(--line-height-base-300);
  }

  /* ─── Copied toast ─── */
  .copy-toast {
    position: fixed;
    bottom: 24px;
    right: 24px;
    background: var(--neutral-background1);
    border: 1px solid var(--neutral-stroke2);
    border-radius: var(--border-radius-md);
    padding: 10px 16px;
    font-size: var(--font-size-base200);
    color: var(--neutral-foreground1);
    box-shadow: var(--shadow-8);
    z-index: 1000;
    display: flex;
    align-items: center;
    gap: 8px;
    animation: fadeInUp 0.2s ease;
  }
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(8px); }
    to   { opacity: 1; transform: translateY(0); }
  }
`;
