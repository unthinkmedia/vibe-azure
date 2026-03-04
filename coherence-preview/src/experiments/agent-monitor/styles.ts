export const styles = `
  body { margin: 0; }

  [slot='main'] {
    min-width: 320px;
    padding: 0;
    background: var(--neutral-background2);
  }

  .am-content {
    overflow-y: auto;
    height: 100%;
  }

  .am-centered {
    max-width: 1200px;
    margin: 0 auto;
    padding: 16px 32px 48px;
  }

  /* ── KPI summary row ── */
  .am-kpi-row {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 12px;
    margin-bottom: 24px;
  }

  /* ── Agent cards grid ── */
  .am-section-title {
    font-size: var(--font-size-base400);
    font-weight: var(--font-weight-semi-bold);
    color: var(--neutral-foreground1);
    margin: 0 0 12px;
  }

  .am-agents-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 12px;
    margin-bottom: 28px;
  }

  .am-agent-card {
    background: var(--neutral-background1);
    border: 1px solid var(--neutral-stroke2);
    border-radius: 8px;
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .am-agent-card-header {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .am-agent-status-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    flex-shrink: 0;
  }
  .am-agent-status-dot.healthy { background: var(--status-success-foreground1); }
  .am-agent-status-dot.degraded { background: var(--status-warning-foreground1); }
  .am-agent-status-dot.offline { background: var(--neutral-foreground-disabled); }

  .am-agent-name {
    font-size: var(--font-size-base300);
    font-weight: var(--font-weight-semi-bold);
    color: var(--neutral-foreground1);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .am-agent-status-badge {
    margin-left: auto;
    font-size: var(--font-size-base100);
    font-weight: var(--font-weight-semi-bold);
    text-transform: uppercase;
    letter-spacing: 0.3px;
    padding: 2px 8px;
    border-radius: var(--border-radius-md);
    flex-shrink: 0;
  }
  .am-agent-status-badge.healthy {
    background: var(--status-success-background1);
    color: var(--status-success-foreground1);
  }
  .am-agent-status-badge.degraded {
    background: var(--status-warning-background1);
    color: var(--status-warning-foreground1);
  }
  .am-agent-status-badge.offline {
    background: var(--neutral-background-disabled);
    color: var(--neutral-foreground-disabled);
  }

  .am-agent-desc {
    font-size: var(--font-size-base200);
    color: var(--neutral-foreground2);
    line-height: 1.4;
  }

  .am-agent-meta {
    display: flex;
    gap: 16px;
    font-size: var(--font-size-base100);
    color: var(--neutral-foreground3);
    margin-top: auto;
    padding-top: 4px;
    border-top: 1px solid var(--neutral-stroke2);
  }

  .am-agent-meta-item {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  /* ── Activity table ── */
  .am-activity-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 13px;
    table-layout: auto;
    background: var(--neutral-background1);
    border: 1px solid var(--neutral-stroke2);
    border-radius: 8px;
    overflow: hidden;
  }

  .am-activity-table th {
    text-align: left;
    padding: 8px 12px;
    font-weight: var(--font-weight-semi-bold);
    color: var(--neutral-foreground2);
    border-bottom: 1px solid var(--neutral-stroke1);
    white-space: nowrap;
    font-size: 12px;
    background: var(--neutral-background1);
  }

  .am-activity-table td {
    padding: 8px 12px;
    color: var(--neutral-foreground1);
    border-bottom: 1px solid var(--neutral-stroke2);
    vertical-align: middle;
  }

  .am-activity-table tr:last-child td {
    border-bottom: none;
  }

  .am-activity-table tr:hover td {
    background: var(--subtle-background-hover);
  }

  .am-result-badge {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-size: 12px;
    font-weight: var(--font-weight-semi-bold);
    padding: 2px 8px;
    border-radius: var(--border-radius-md);
  }
  .am-result-badge.success {
    background: var(--status-success-background1);
    color: var(--status-success-foreground1);
  }
  .am-result-badge.failure {
    background: var(--status-danger-background1);
    color: var(--status-danger-foreground1);
  }
  .am-result-badge.timeout {
    background: var(--status-warning-background1);
    color: var(--status-warning-foreground1);
  }

  .am-duration {
    font-variant-numeric: tabular-nums;
    color: var(--neutral-foreground3);
  }

  .am-summary {
    max-width: 400px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  /* ── Toolbar row ── */
  .am-toolbar {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 12px;
  }

  .am-toolbar-spacer {
    flex: 1;
  }

  .am-filter-pills {
    display: flex;
    gap: 6px;
  }

  .am-filter-pill {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 4px 10px;
    border: 1px solid var(--neutral-stroke1);
    border-radius: var(--border-radius-md);
    background: var(--neutral-background1);
    font-size: 12px;
    color: var(--neutral-foreground2);
    cursor: pointer;
    white-space: nowrap;
    font-family: inherit;
  }
  .am-filter-pill:hover {
    border-color: var(--neutral-stroke1-hover);
    background: var(--subtle-background-hover);
  }
  .am-filter-pill.active {
    border-color: var(--brand-stroke1);
    background: var(--brand-background2);
    color: var(--brand-foreground-link);
  }
`;
