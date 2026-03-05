// @ts-nocheck
/** Scoped styles for Azure Cognitive Services (Speech) overview experiment. */
export const styles = `
  body { margin: 0; }
  [slot='main'] {
    min-width: 320px;
    padding: 0;
    background: var(--neutral-background1);
  }

  .content-area {
    padding: 0 32px 24px;
  }

  /* ─── Section headings ─── */
  .section-title {
    font-size: var(--font-size-base400);
    font-weight: var(--font-weight-semi-bold);
    color: var(--neutral-foreground1);
    margin: 0 0 12px;
  }

  /* ─── Tabs ─── */
  .tabs-wrapper {
    margin-bottom: 24px;
  }

  /* ─── Get Started ─── */
  .get-started-section {
    display: flex;
    flex-direction: column;
    gap: 24px;
    padding-top: 16px;
  }
  .speech-studio-section {
    padding: 0;
  }
  .speech-studio-section h3 {
    margin: 0 0 12px;
    font-size: var(--font-size-base500);
    font-weight: var(--font-weight-semi-bold);
    color: var(--neutral-foreground1);
  }
  .speech-studio-row {
    display: flex;
    align-items: flex-start;
    gap: 16px;
    margin-bottom: 8px;
  }
  .speech-studio-row p {
    margin: 0;
    font-size: var(--font-size-base300);
    color: var(--neutral-foreground2);
  }
  .keys-section {
    padding: 0;
    margin-top: 8px;
  }
  .keys-section h3 {
    margin: 0 0 16px;
    font-size: var(--font-size-base500);
    font-weight: var(--font-weight-semi-bold);
    color: var(--neutral-foreground1);
  }

  /* ─── KPI Metrics grid ─── */
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

  /* ─── Call volume chart ─── */
  .volume-chart-panel {
    padding: 0;
    margin-bottom: 24px;
  }
  .volume-chart-panel h3 {
    margin: 0 0 16px;
    font-size: var(--font-size-base400);
    font-weight: var(--font-weight-semi-bold);
    color: var(--neutral-foreground1);
  }
  .volume-legend {
    display: flex;
    gap: 20px;
    margin-bottom: 12px;
    font-size: var(--font-size-base200);
    color: var(--neutral-foreground2);
  }
  .legend-dot {
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    margin-right: 6px;
    vertical-align: middle;
  }
  .volume-chart-svg {
    width: 100%;
    height: 160px;
    display: block;
  }

  /* ─── Quota bars ─── */
  .quota-panel {
    padding: 0;
    margin-bottom: 24px;
  }
  .quota-panel h3 {
    margin: 0 0 16px;
    font-size: var(--font-size-base400);
    font-weight: var(--font-weight-semi-bold);
    color: var(--neutral-foreground1);
  }
  .quota-row {
    margin-bottom: 16px;
  }
  .quota-row:last-child {
    margin-bottom: 0;
  }
  .quota-label-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 6px;
    font-size: var(--font-size-base300);
  }
  .quota-label {
    color: var(--neutral-foreground1);
    font-weight: var(--font-weight-semi-bold);
  }
  .quota-values {
    color: var(--neutral-foreground3);
  }
  .quota-track {
    height: 8px;
    border-radius: 4px;
    background: var(--neutral-background3);
    overflow: hidden;
  }
  .quota-fill {
    height: 100%;
    border-radius: 4px;
    transition: width 0.3s ease;
  }
  .quota-fill.green  { background: var(--status-success-foreground1); }
  .quota-fill.amber  { background: var(--status-warning-foreground1); }
  .quota-fill.red    { background: var(--status-danger-foreground1); }
  .quota-warning {
    margin-top: 4px;
    font-size: var(--font-size-base200);
    color: var(--status-warning-foreground1);
    display: flex;
    align-items: center;
    gap: 4px;
  }

  /* ─── Errors table ─── */
  .errors-table {
    width: 100%;
    border-collapse: collapse;
    font-size: var(--font-size-base300);
    background: var(--neutral-background1);
    border: 1px solid var(--neutral-stroke2);
    border-radius: var(--border-radius-md);
    overflow: hidden;
  }
  .errors-table th {
    text-align: left;
    padding: 10px 16px;
    font-weight: var(--font-weight-semi-bold);
    font-size: var(--font-size-base200);
    color: var(--neutral-foreground3);
    background: var(--neutral-background3);
    border-bottom: 1px solid var(--neutral-stroke2);
  }
  .errors-table td {
    padding: 10px 16px;
    color: var(--neutral-foreground1);
    border-bottom: 1px solid var(--neutral-stroke2);
  }
  .errors-table tr:last-child td {
    border-bottom: none;
  }
  .errors-table tr:hover td {
    background: var(--neutral-background1-hover);
  }
  .error-code-badge {
    display: inline-flex;
    align-items: center;
    padding: 2px 8px;
    border-radius: var(--border-radius-sm);
    font-family: var(--font-family-monospace);
    font-size: var(--font-size-base200);
    font-weight: var(--font-weight-semi-bold);
  }
  .error-code-badge.client {
    background: var(--status-warning-background1);
    color: var(--status-warning-foreground1);
  }
  .error-code-badge.server {
    background: var(--status-danger-background1);
    color: var(--status-danger-foreground1);
  }
  .view-logs-link {
    color: var(--brand-foreground-link);
    text-decoration: none;
    font-size: var(--font-size-base200);
  }
`;
