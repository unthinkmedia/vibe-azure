// @ts-nocheck
/** Scoped styles for Azure Resource Group Overview experiment. */
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

  /* ─── Resource count summary cards ─── */
  .resource-summary-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 12px;
    margin-bottom: 24px;
  }
  @media (max-width: 1100px) {
    .resource-summary-grid { grid-template-columns: repeat(2, 1fr); }
  }
  @media (max-width: 600px) {
    .resource-summary-grid { grid-template-columns: 1fr; }
  }
  .resource-count-card {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 16px;
    background: var(--neutral-background1);
    border: 1px solid var(--neutral-stroke2);
    border-radius: var(--border-radius-md);
    cursor: pointer;
    transition: box-shadow 0.15s;
  }
  .resource-count-card:hover {
    box-shadow: var(--shadow-4);
  }
  .resource-count-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: var(--border-radius-md);
    flex-shrink: 0;
  }
  .resource-count-info {
    display: flex;
    flex-direction: column;
  }
  .resource-count-value {
    font-size: 24px;
    font-weight: 700;
    line-height: 1.1;
    color: var(--neutral-foreground1);
    font-variant-numeric: tabular-nums;
  }
  .resource-count-type {
    font-size: var(--font-size-base200);
    color: var(--neutral-foreground3);
    margin-top: 2px;
  }

  /* ─── Two-column layout ─── */
  .overview-cards-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    margin-bottom: 24px;
  }
  @media (max-width: 900px) {
    .overview-cards-row { grid-template-columns: 1fr; }
  }

  /* ─── Cost donut chart ─── */
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
    width: 160px;
    height: 160px;
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
    font-size: 20px;
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

  /* ─── Activity log ─── */
  .activity-card {
    --card-padding: 20px;
  }
  .activity-table {
    width: 100%;
    border-collapse: collapse;
    font-size: var(--font-size-base200);
  }
  .activity-table th {
    text-align: left;
    padding: 8px 12px;
    font-weight: var(--font-weight-semi-bold);
    color: var(--neutral-foreground3);
    border-bottom: 1px solid var(--neutral-stroke2);
    font-size: var(--font-size-base200);
    white-space: nowrap;
  }
  .activity-table td {
    padding: 8px 12px;
    color: var(--neutral-foreground1);
    border-bottom: 1px solid var(--neutral-stroke2);
    vertical-align: middle;
  }
  .activity-table tr:last-child td {
    border-bottom: none;
  }
  .activity-resource-link {
    color: var(--brand-foreground-link);
    text-decoration: none;
    cursor: pointer;
  }
  .activity-user {
    color: var(--neutral-foreground2);
    max-width: 180px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .activity-timestamp {
    white-space: nowrap;
    color: var(--neutral-foreground3);
  }
  .op-type-badge {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 2px 8px;
    border-radius: var(--border-radius-sm);
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.3px;
  }
  .op-type-badge.create {
    color: var(--status-success-foreground1);
    background: var(--status-success-background1);
  }
  .op-type-badge.modify {
    color: var(--brand-foreground-link);
    background: var(--brand-background2);
  }
  .op-type-badge.delete {
    color: var(--status-danger-foreground1);
    background: var(--status-danger-background1);
  }
  .op-type-badge.read {
    color: var(--neutral-foreground3);
    background: var(--neutral-background3);
  }

  /* ─── Tag compliance ─── */
  .compliance-card {
    --card-padding: 20px;
  }
  .compliance-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
  }
  .compliance-score {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .compliance-pct {
    font-size: 32px;
    font-weight: 700;
    color: var(--neutral-foreground1);
    line-height: 1;
  }
  .compliance-meta {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
  .compliance-label {
    font-size: var(--font-size-base200);
    color: var(--neutral-foreground3);
  }
  .compliance-count {
    font-size: var(--font-size-base200);
    font-weight: 600;
    color: var(--neutral-foreground1);
  }
  .compliance-table {
    width: 100%;
    border-collapse: collapse;
    font-size: var(--font-size-base200);
  }
  .compliance-table th {
    text-align: left;
    padding: 8px 12px;
    font-weight: var(--font-weight-semi-bold);
    color: var(--neutral-foreground3);
    border-bottom: 1px solid var(--neutral-stroke2);
    font-size: var(--font-size-base200);
  }
  .compliance-table td {
    padding: 8px 12px;
    color: var(--neutral-foreground1);
    border-bottom: 1px solid var(--neutral-stroke2);
    vertical-align: middle;
  }
  .compliance-table tr:last-child td {
    border-bottom: none;
  }
  .tag-pass {
    color: var(--status-success-foreground1);
  }
  .tag-fail {
    color: var(--status-danger-foreground1);
  }
  .compliance-resource-type {
    color: var(--neutral-foreground3);
    font-size: 11px;
  }
  .compliance-status-row {
    display: flex;
    align-items: center;
    gap: 4px;
  }
`;
