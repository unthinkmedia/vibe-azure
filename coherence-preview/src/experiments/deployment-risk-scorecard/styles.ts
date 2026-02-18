export const styles = `
  body { margin: 0; }

  /* ─── Layout ─── */
  .drs-breadcrumb {
    padding: 4px 16px 0;
  }

  .drs-body {
    display: flex;
    flex: 1;
    overflow: hidden;
  }

  .drs-sidebar {
    width: 220px;
    min-width: 220px;
    border-right: 1px solid var(--neutral-stroke2);
    background: var(--neutral-background1);
    overflow-y: auto;
    transition: width 0.2s ease, min-width 0.2s ease;
  }
  .drs-sidebar.collapsed {
    width: 0;
    min-width: 0;
    overflow: hidden;
    border-right: none;
  }

  .drs-sidebar-toggle {
    position: absolute;
    top: 8px;
    z-index: 1;
  }

  .drs-content {
    flex: 1;
    overflow-y: auto;
    background: var(--neutral-background2);
    position: relative;
  }

  .drs-content-inner {
    padding: 24px 24px 48px;
  }

  /* ─── Sections ─── */
  .drs-section {
    margin-bottom: 24px;
  }
  .drs-section h2 {
    font-size: 16px;
    font-weight: var(--font-weight-semi-bold);
    color: var(--neutral-foreground1);
    margin: 0 0 4px;
  }
  .drs-section > .drs-section-desc {
    font-size: var(--font-size-base200);
    color: var(--neutral-foreground3);
    margin: 0 0 12px;
  }

  /* ─── Summary Strip ─── */
  .drs-summary-strip {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 12px;
    margin-bottom: 24px;
  }
  @media (max-width: 1000px) {
    .drs-summary-strip { grid-template-columns: repeat(2, 1fr); }
  }

  .drs-summary-card {
    background: var(--neutral-background1);
    border: 1px solid var(--neutral-stroke2);
    border-radius: 8px;
    padding: 16px;
    display: flex;
    align-items: flex-start;
    gap: 12px;
  }
  .drs-summary-card:hover {
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  }
  .drs-summary-icon {
    width: 40px;
    height: 40px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  .drs-summary-icon.blue { background: #e3f2fd; color: #1565c0; }
  .drs-summary-icon.red { background: #fdecea; color: #c62828; }
  .drs-summary-icon.amber { background: #fff8e1; color: #e65100; }
  .drs-summary-icon.green { background: #e8f5e9; color: #2e7d32; }

  .drs-summary-label {
    font-size: 12px;
    color: var(--neutral-foreground3);
    margin-bottom: 2px;
    font-weight: var(--font-weight-semi-bold);
    text-transform: uppercase;
    letter-spacing: 0.3px;
  }
  .drs-summary-value {
    font-size: 28px;
    font-weight: var(--font-weight-bold);
    color: var(--neutral-foreground1);
    line-height: 1.1;
  }
  .drs-summary-subtext {
    font-size: 12px;
    color: var(--neutral-foreground3);
    margin-top: 2px;
  }

  /* ─── Deployments Table ─── */
  .drs-table-wrap {
    background: var(--neutral-background1);
    border: 1px solid var(--neutral-stroke2);
    border-radius: 8px;
    overflow: hidden;
  }
  .drs-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 13px;
  }
  .drs-table th {
    text-align: left;
    padding: 10px 14px;
    font-weight: var(--font-weight-semi-bold);
    font-size: 12px;
    color: var(--neutral-foreground3);
    background: var(--neutral-background1);
    border-bottom: 1px solid var(--neutral-stroke2);
    white-space: nowrap;
    cursor: default;
    user-select: none;
  }
  .drs-table th.sortable {
    cursor: pointer;
  }
  .drs-table th.sortable:hover {
    color: var(--neutral-foreground1);
  }
  .drs-table td {
    padding: 10px 14px;
    color: var(--neutral-foreground1);
    border-bottom: 1px solid var(--neutral-stroke2);
  }
  .drs-table tr:last-child td {
    border-bottom: none;
  }
  .drs-table tr:hover td {
    background: var(--neutral-background1-hover);
  }
  .drs-table tr.selected td {
    background: var(--brand-background2);
  }
  .drs-table tr {
    cursor: pointer;
  }

  .drs-source-badge {
    display: inline-block;
    padding: 2px 8px;
    border-radius: 4px;
    font-size: 11px;
    font-weight: var(--font-weight-semi-bold);
    white-space: nowrap;
  }
  .drs-source-badge.ARM { background: #e3f2fd; color: #1565c0; }
  .drs-source-badge.Bicep { background: #e8f5e9; color: #2e7d32; }
  .drs-source-badge.Terraform { background: #f3e5f5; color: #6a1b9a; }

  .drs-env-badge {
    display: inline-block;
    padding: 2px 8px;
    border-radius: 4px;
    font-size: 11px;
    font-weight: var(--font-weight-semi-bold);
    white-space: nowrap;
  }
  .drs-env-badge.prod { background: #fdecea; color: #c62828; }
  .drs-env-badge.staging { background: #fff8e1; color: #e65100; }
  .drs-env-badge.dev { background: #e3f2fd; color: #1565c0; }

  .drs-resource-triple {
    font-size: 12px;
    font-family: var(--font-family-monospace, monospace);
    white-space: nowrap;
  }
  .drs-triple-created { color: #2e7d32; }
  .drs-triple-modified { color: #e65100; }
  .drs-triple-deleted { color: #c62828; }

  .drs-risk-score {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-weight: var(--font-weight-semi-bold);
    font-size: 14px;
  }
  .drs-risk-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
  }
  .drs-risk-dot.risk-low { background: #2e7d32; }
  .drs-risk-dot.risk-medium { background: #e65100; }
  .drs-risk-dot.risk-high { background: #c62828; }

  /* ─── Detail Panels (Blast Radius + Risk + Diff) ─── */
  .drs-detail-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    margin-bottom: 24px;
  }
  @media (max-width: 1100px) {
    .drs-detail-grid { grid-template-columns: 1fr; }
  }

  .drs-panel {
    background: var(--neutral-background1);
    border: 1px solid var(--neutral-stroke2);
    border-radius: 8px;
    padding: 20px;
  }
  .drs-panel h3 {
    font-size: 14px;
    font-weight: var(--font-weight-semi-bold);
    color: var(--neutral-foreground1);
    margin: 0 0 12px;
  }

  /* ─── Blast Radius SVG ─── */
  .drs-graph-svg {
    width: 100%;
    height: 340px;
    display: block;
  }
  .drs-graph-legend {
    display: flex;
    gap: 16px;
    margin-top: 8px;
    font-size: 12px;
    color: var(--neutral-foreground3);
  }
  .drs-graph-legend-item {
    display: flex;
    align-items: center;
    gap: 4px;
  }
  .drs-graph-legend-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
  }

  /* ─── Risk Breakdown ─── */
  .drs-risk-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .drs-risk-row {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 10px 12px;
    border-radius: 6px;
    border: 1px solid var(--neutral-stroke2);
  }
  .drs-risk-row-icon {
    width: 32px;
    height: 32px;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    font-size: 16px;
  }
  .drs-risk-row-body {
    flex: 1;
    min-width: 0;
  }
  .drs-risk-row-cat {
    font-size: 13px;
    font-weight: var(--font-weight-semi-bold);
    color: var(--neutral-foreground1);
  }
  .drs-risk-row-exp {
    font-size: 12px;
    color: var(--neutral-foreground3);
    margin-top: 1px;
    line-height: 1.3;
  }

  .drs-severity-badge {
    display: inline-block;
    padding: 2px 8px;
    border-radius: 4px;
    font-size: 11px;
    font-weight: var(--font-weight-semi-bold);
    white-space: nowrap;
    flex-shrink: 0;
  }
  .drs-severity-badge.critical { background: #fdecea; color: #c62828; }
  .drs-severity-badge.high { background: #fff3e0; color: #e65100; }
  .drs-severity-badge.medium { background: #fff8e1; color: #b8860b; }
  .drs-severity-badge.low { background: #e3f2fd; color: #1565c0; }
  .drs-severity-badge.none { background: #e8f5e9; color: #2e7d32; }

  /* ─── Diff Preview ─── */
  .drs-diff-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 12px;
    font-family: var(--font-family-monospace, monospace);
  }
  .drs-diff-table th {
    text-align: left;
    padding: 8px 10px;
    font-weight: var(--font-weight-semi-bold);
    font-size: 11px;
    color: var(--neutral-foreground3);
    border-bottom: 1px solid var(--neutral-stroke2);
    font-family: var(--font-family-base);
  }
  .drs-diff-table td {
    padding: 6px 10px;
    border-bottom: 1px solid var(--neutral-stroke2);
    color: var(--neutral-foreground1);
    vertical-align: top;
  }
  .drs-diff-table tr:last-child td {
    border-bottom: none;
  }
  .drs-diff-before {
    background: #fdecea;
    color: #c62828;
    text-decoration: line-through;
    padding: 1px 4px;
    border-radius: 2px;
  }
  .drs-diff-after {
    background: #e8f5e9;
    color: #2e7d32;
    padding: 1px 4px;
    border-radius: 2px;
  }
  .drs-diff-added {
    background: #e8f5e9;
  }
  .drs-diff-removed {
    background: #fdecea;
  }
  .drs-diff-change-tag {
    display: inline-block;
    padding: 1px 6px;
    border-radius: 3px;
    font-size: 10px;
    font-weight: var(--font-weight-semi-bold);
    font-family: var(--font-family-base);
  }
  .drs-diff-change-tag.modified { background: #fff8e1; color: #b8860b; }
  .drs-diff-change-tag.added { background: #e8f5e9; color: #2e7d32; }
  .drs-diff-change-tag.removed { background: #fdecea; color: #c62828; }

  /* ─── Message Bar ─── */
  .drs-warning-bar {
    margin-bottom: 16px;
  }
  .drs-warning-bar cui-message-bar {
    --message-bar-bg-color: #fff8e1;
    --message-bar-icon-fg-color: #e65100;
    --message-bar-border: 1px solid #ffe082;
  }
`;
