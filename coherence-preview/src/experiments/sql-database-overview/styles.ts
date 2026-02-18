// @ts-nocheck
/** Scoped styles for Azure SQL Database overview experiment. */
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

  /* ─── DTU Gauge ─── */
  .gauge-card {
    --card-padding: 20px;
  }
  .gauge-body {
    display: flex;
    gap: 24px;
    align-items: center;
  }
  .gauge-wrap {
    position: relative;
    width: 140px;
    height: 140px;
    flex-shrink: 0;
  }
  .gauge-wrap svg {
    transform: rotate(-90deg);
  }
  .gauge-center {
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    pointer-events: none;
  }
  .gauge-percent {
    font-size: 28px;
    font-weight: 700;
    line-height: 1;
    color: var(--neutral-foreground1);
  }
  .gauge-percent-label {
    font-size: 11px;
    color: var(--neutral-foreground3);
    margin-top: 2px;
  }
  .gauge-details {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .gauge-detail-row {
    display: flex;
    justify-content: space-between;
    font-size: var(--font-size-base200);
  }
  .gauge-detail-label {
    color: var(--neutral-foreground3);
  }
  .gauge-detail-value {
    font-weight: 600;
    font-variant-numeric: tabular-nums;
    color: var(--neutral-foreground1);
  }
  .gauge-threshold {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: var(--font-size-base100);
    color: var(--neutral-foreground3);
  }
  .gauge-threshold-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    flex-shrink: 0;
  }

  /* ─── Connections card ─── */
  .connections-card {
    --card-padding: 20px;
  }
  .connections-primary {
    font-size: 40px;
    font-weight: 700;
    color: var(--neutral-foreground1);
    line-height: 1.1;
  }
  .connections-label {
    font-size: var(--font-size-base200);
    color: var(--neutral-foreground3);
    margin-top: 4px;
    margin-bottom: 12px;
  }
  .connections-stats {
    margin-top: 16px;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  .connections-stat-row {
    display: flex;
    justify-content: space-between;
    font-size: var(--font-size-base200);
  }
  .connections-stat-label {
    color: var(--neutral-foreground2);
  }
  .connections-stat-value {
    font-weight: 600;
    font-variant-numeric: tabular-nums;
    color: var(--neutral-foreground1);
  }

  /* ─── Geo-replication ─── */
  .geo-section {
    margin-bottom: 24px;
  }
  .geo-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 12px;
  }
  .geo-card {
    --card-padding: 16px;
  }
  .geo-card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 8px;
  }
  .geo-card-region {
    font-size: var(--font-size-base300);
    font-weight: var(--font-weight-semi-bold);
    color: var(--neutral-foreground1);
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .geo-card-body {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  .geo-card-row {
    display: flex;
    justify-content: space-between;
    font-size: var(--font-size-base200);
  }
  .geo-card-label {
    color: var(--neutral-foreground3);
  }
  .geo-card-value {
    color: var(--neutral-foreground1);
  }

  /* ─── Audit log table ─── */
  .audit-section {
    margin-top: 0;
  }
  .audit-table {
    width: 100%;
    border-collapse: collapse;
    font-size: var(--font-size-base200);
    background: var(--neutral-background1);
    border: 1px solid var(--neutral-stroke2);
    border-radius: var(--border-radius-md);
    overflow: hidden;
  }
  .audit-table th {
    text-align: left;
    padding: 10px 16px;
    font-weight: var(--font-weight-semi-bold);
    color: var(--neutral-foreground2);
    background: var(--neutral-background3);
    border-bottom: 1px solid var(--neutral-stroke2);
    cursor: pointer;
    user-select: none;
    white-space: nowrap;
  }
  .audit-table th:hover {
    background: var(--neutral-background3-hover);
  }
  .audit-table td {
    padding: 8px 16px;
    color: var(--neutral-foreground1);
    border-bottom: 1px solid var(--neutral-stroke2);
    white-space: nowrap;
  }
  .audit-table tr:last-child td {
    border-bottom: none;
  }
  .audit-table .statement-cell {
    max-width: 300px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-family: var(--font-family-monospace);
    font-size: var(--font-size-base100);
    color: var(--neutral-foreground2);
  }
  .sort-indicator {
    margin-left: 4px;
    font-size: 10px;
    color: var(--neutral-foreground3);
  }
`;
