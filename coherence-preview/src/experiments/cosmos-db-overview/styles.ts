// @ts-nocheck
/** Scoped styles for Azure Cosmos DB account overview experiment. */
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

  /* ─── RU Gauge ─── */
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
  .gauge-value {
    font-size: var(--font-size-base600);
    font-weight: var(--font-weight-bold);
    line-height: 1;
    color: var(--neutral-foreground1);
  }
  .gauge-value-label {
    font-size: var(--font-size-base100);
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

  /* ─── Partition key heat map ─── */
  .heatmap-card {
    --card-padding: 20px;
  }
  .heatmap-rows {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .heatmap-row {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: var(--font-size-base200);
  }
  .heatmap-key {
    min-width: 180px;
    color: var(--neutral-foreground2);
    font-family: var(--font-family-monospace);
    font-size: var(--font-size-base100);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .heatmap-bar-track {
    flex: 1;
    height: 16px;
    background: var(--neutral-background5);
    border-radius: var(--border-radius-sm);
    overflow: hidden;
    position: relative;
  }
  .heatmap-bar-fill {
    height: 100%;
    border-radius: var(--border-radius-sm);
    transition: width 0.3s ease;
  }
  .heatmap-pct {
    min-width: 40px;
    text-align: right;
    font-weight: 600;
    font-variant-numeric: tabular-nums;
    color: var(--neutral-foreground1);
  }
  .heatmap-meta {
    min-width: 120px;
    text-align: right;
    color: var(--neutral-foreground3);
    font-size: var(--font-size-base100);
  }

  /* ─── Global distribution map ─── */
  .map-card {
    --card-padding: 20px;
  }
  .map-container {
    position: relative;
    width: 100%;
    height: 260px;
    background: var(--neutral-background3);
    border-radius: var(--border-radius-md);
    overflow: hidden;
  }
  .map-svg {
    width: 100%;
    height: 100%;
  }
  .map-region-dot {
    cursor: pointer;
  }
  .map-region-label {
    position: absolute;
    padding: 4px 8px;
    background: var(--neutral-background1);
    border: 1px solid var(--neutral-stroke2);
    border-radius: var(--border-radius-sm);
    font-size: var(--font-size-base100);
    white-space: nowrap;
    pointer-events: none;
    box-shadow: var(--shadow-4);
    z-index: 2;
  }
  .map-region-name {
    font-weight: var(--font-weight-semi-bold);
    color: var(--neutral-foreground1);
  }
  .map-region-detail {
    color: var(--neutral-foreground3);
    margin-top: 2px;
  }
  .map-legend {
    display: flex;
    gap: 16px;
    margin-top: 12px;
    font-size: var(--font-size-base100);
    color: var(--neutral-foreground3);
  }
  .map-legend-item {
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .map-legend-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    flex-shrink: 0;
  }

  /* ─── Consistency selector ─── */
  .consistency-card {
    --card-padding: 20px;
  }
  .consistency-levels {
    display: flex;
    gap: 0;
    margin-bottom: 12px;
    border: 1px solid var(--neutral-stroke2);
    border-radius: var(--border-radius-md);
    overflow: hidden;
  }
  .consistency-level {
    flex: 1;
    padding: 10px 8px;
    text-align: center;
    font-size: var(--font-size-base100);
    color: var(--neutral-foreground3);
    background: var(--neutral-background1);
    border-right: 1px solid var(--neutral-stroke2);
    cursor: default;
    position: relative;
    transition: background 0.15s;
  }
  .consistency-level:last-child {
    border-right: none;
  }
  .consistency-level.active {
    background: var(--brand-background2);
    color: var(--brand-foreground1);
    font-weight: var(--font-weight-semi-bold);
  }
  .consistency-level.recommended::after {
    content: '★';
    position: absolute;
    top: 2px;
    right: 4px;
    font-size: 10px;
    color: var(--status-warning-foreground1);
  }
  .consistency-desc {
    font-size: var(--font-size-base200);
    color: var(--neutral-foreground2);
    line-height: 1.5;
    padding: 8px 0;
  }
  .consistency-meta {
    display: flex;
    gap: 24px;
    font-size: var(--font-size-base200);
    margin-top: 8px;
  }
  .consistency-meta-item {
    display: flex;
    align-items: center;
    gap: 6px;
    color: var(--neutral-foreground3);
  }
  .consistency-meta-value {
    font-weight: 600;
    color: var(--neutral-foreground1);
  }

  /* ─── Operations table ─── */
  .ops-section {
    margin-top: 0;
  }
  .ops-table {
    width: 100%;
    border-collapse: collapse;
    font-size: var(--font-size-base200);
    background: var(--neutral-background1);
    border: 1px solid var(--neutral-stroke2);
    border-radius: var(--border-radius-md);
    overflow: hidden;
  }
  .ops-table th {
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
  .ops-table th:hover {
    background: var(--neutral-background3-hover);
  }
  .ops-table td {
    padding: 8px 16px;
    color: var(--neutral-foreground1);
    border-bottom: 1px solid var(--neutral-stroke2);
    white-space: nowrap;
  }
  .ops-table tr:last-child td {
    border-bottom: none;
  }
  .ops-table .mono-cell {
    font-family: var(--font-family-monospace);
    font-size: var(--font-size-base100);
    color: var(--neutral-foreground2);
  }
  .sort-indicator {
    margin-left: 4px;
    font-size: 10px;
    color: var(--neutral-foreground3);
  }
  .ru-high {
    color: var(--status-danger-foreground1);
    font-weight: 600;
  }
  .ru-med {
    color: var(--status-warning-foreground1);
    font-weight: 600;
  }
  .ru-low {
    color: var(--status-success-foreground1);
  }
  .latency-high {
    color: var(--status-danger-foreground1);
    font-weight: 600;
  }
  .latency-med {
    color: var(--status-warning-foreground1);
  }
`;
