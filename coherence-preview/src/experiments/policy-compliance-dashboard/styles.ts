export const styles = `
  body { margin: 0; }

  /* ─── Layout ─── */
  .pcd-breadcrumb {
    padding: 4px 16px 0;
  }

  .pcd-body {
    display: flex;
    flex: 1;
    overflow: hidden;
  }

  .pcd-sidebar {
    width: 220px;
    min-width: 220px;
    border-right: 1px solid var(--neutral-stroke2);
    background: var(--neutral-background1);
    overflow-y: auto;
    transition: width 0.2s ease, min-width 0.2s ease;
  }
  .pcd-sidebar.collapsed {
    width: 0;
    min-width: 0;
    overflow: hidden;
    border-right: none;
  }

  .pcd-sidebar-toggle {
    position: absolute;
    top: 8px;
    z-index: 1;
  }

  .pcd-content {
    flex: 1;
    overflow-y: auto;
    background: var(--neutral-background2);
    position: relative;
  }

  .pcd-content-inner {
    padding: 24px 24px 48px;
  }

  /* ─── Sections ─── */
  .pcd-section {
    margin-bottom: 24px;
  }
  .pcd-section h2 {
    font-size: 16px;
    font-weight: var(--font-weight-semi-bold);
    color: var(--neutral-foreground1);
    margin: 0 0 4px;
  }
  .pcd-section > .pcd-section-desc {
    font-size: var(--font-size-base200);
    color: var(--neutral-foreground3);
    margin: 0 0 12px;
  }

  /* ─── Score + Summary Row ─── */
  .pcd-top-row {
    display: grid;
    grid-template-columns: 320px 1fr;
    gap: 16px;
    margin-bottom: 24px;
  }
  @media (max-width: 900px) {
    .pcd-top-row { grid-template-columns: 1fr; }
  }

  /* ─── Compliance Gauge Card ─── */
  .pcd-gauge-card {
    background: var(--neutral-background1);
    border: 1px solid var(--neutral-stroke2);
    border-radius: 8px;
    padding: 20px;
  }
  .pcd-gauge-card h3 {
    font-size: 14px;
    font-weight: var(--font-weight-semi-bold);
    color: var(--neutral-foreground1);
    margin: 0 0 16px;
  }
  .pcd-gauge-body {
    display: flex;
    gap: 24px;
    align-items: center;
  }
  .pcd-gauge-wrap {
    position: relative;
    width: 120px;
    height: 120px;
    flex-shrink: 0;
  }
  .pcd-gauge-wrap svg {
    transform: rotate(-90deg);
  }
  .pcd-gauge-center {
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    pointer-events: none;
  }
  .pcd-gauge-value {
    font-size: 32px;
    font-weight: var(--font-weight-bold);
    line-height: 1;
    color: var(--success-foreground-1);
  }
  .pcd-gauge-label {
    font-size: 11px;
    color: var(--neutral-foreground3);
    margin-top: 2px;
  }
  .pcd-gauge-cats {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .pcd-gauge-cat-row {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: var(--font-size-base200);
  }
  .pcd-gauge-cat-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    flex-shrink: 0;
  }
  .pcd-gauge-cat-label {
    flex: 1;
    color: var(--neutral-foreground1);
  }
  .pcd-gauge-cat-score {
    font-weight: var(--font-weight-semi-bold);
    font-variant-numeric: tabular-nums;
  }

  /* ─── Summary Strip ─── */
  .pcd-summary-strip {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }

  .pcd-summary-card {
    background: var(--neutral-background1);
    border: 1px solid var(--neutral-stroke2);
    border-radius: 8px;
    padding: 16px;
    display: flex;
    align-items: flex-start;
    gap: 12px;
  }
  .pcd-summary-card:hover {
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  }
  .pcd-summary-icon {
    width: 40px;
    height: 40px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  .pcd-summary-icon.blue { background: #e3f2fd; color: #1565c0; }
  .pcd-summary-icon.red { background: #fdecea; color: #c62828; }
  .pcd-summary-icon.amber { background: #fff8e1; color: #e65100; }
  .pcd-summary-icon.green { background: #e8f5e9; color: #2e7d32; }

  .pcd-summary-label {
    font-size: 12px;
    color: var(--neutral-foreground3);
    margin-bottom: 2px;
    font-weight: var(--font-weight-semi-bold);
    text-transform: uppercase;
    letter-spacing: 0.3px;
  }
  .pcd-summary-value {
    font-size: 28px;
    font-weight: var(--font-weight-bold);
    color: var(--neutral-foreground1);
    line-height: 1.1;
  }
  .pcd-summary-subtext {
    font-size: 12px;
    color: var(--neutral-foreground3);
    margin-top: 2px;
  }

  /* ─── Initiative List ─── */
  .pcd-initiative-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .pcd-initiative-row {
    background: var(--neutral-background1);
    border: 1px solid var(--neutral-stroke2);
    border-radius: 8px;
    overflow: hidden;
    transition: box-shadow 0.15s;
  }
  .pcd-initiative-row:hover {
    box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  }
  .pcd-initiative-header {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 16px;
    cursor: pointer;
    user-select: none;
  }
  .pcd-initiative-header:hover {
    background: var(--neutral-background1-hover);
  }
  .pcd-initiative-chevron {
    transition: transform 0.2s ease;
    flex-shrink: 0;
  }
  .pcd-initiative-chevron.expanded {
    transform: rotate(90deg);
  }
  .pcd-initiative-name {
    flex: 1;
    font-size: 14px;
    font-weight: var(--font-weight-semi-bold);
    color: var(--neutral-foreground1);
  }
  .pcd-initiative-meta {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 12px;
    color: var(--neutral-foreground3);
    white-space: nowrap;
  }
  .pcd-initiative-count {
    font-weight: var(--font-weight-semi-bold);
    color: var(--danger-foreground-1);
    font-size: 14px;
    font-variant-numeric: tabular-nums;
  }

  /* Severity badges */
  .pcd-severity-badge {
    display: inline-block;
    padding: 2px 8px;
    border-radius: 4px;
    font-size: 11px;
    font-weight: var(--font-weight-semi-bold);
    white-space: nowrap;
  }
  .pcd-severity-badge.critical { background: #fdecea; color: #c62828; }
  .pcd-severity-badge.high { background: #fff3e0; color: #e65100; }
  .pcd-severity-badge.medium { background: #fff8e1; color: #b8860b; }
  .pcd-severity-badge.low { background: #e3f2fd; color: #1565c0; }

  /* Expanded resource table */
  .pcd-resource-table-wrap {
    border-top: 1px solid var(--neutral-stroke2);
    padding: 0;
  }
  .pcd-resource-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 13px;
  }
  .pcd-resource-table th {
    text-align: left;
    padding: 8px 16px;
    font-weight: var(--font-weight-semi-bold);
    font-size: 12px;
    color: var(--neutral-foreground3);
    background: var(--neutral-background3);
    border-bottom: 1px solid var(--neutral-stroke2);
  }
  .pcd-resource-table td {
    padding: 8px 16px;
    color: var(--neutral-foreground1);
    border-bottom: 1px solid var(--neutral-stroke2);
  }
  .pcd-resource-table tr:last-child td {
    border-bottom: none;
  }
  .pcd-resource-table tr:hover td {
    background: var(--neutral-background1-hover);
  }
  .pcd-resource-name {
    color: var(--brand-foreground-link);
    font-weight: var(--font-weight-semi-bold);
  }
  .pcd-resource-type {
    font-size: 12px;
    color: var(--neutral-foreground3);
    font-family: var(--font-family-monospace, monospace);
  }
  .pcd-resource-more {
    padding: 8px 16px;
    font-size: 12px;
    color: var(--neutral-foreground3);
    background: var(--neutral-background3);
    text-align: center;
  }

  /* ─── Remediation Table ─── */
  .pcd-table-wrap {
    background: var(--neutral-background1);
    border: 1px solid var(--neutral-stroke2);
    border-radius: 8px;
    overflow: hidden;
  }
  .pcd-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 13px;
  }
  .pcd-table th {
    text-align: left;
    padding: 10px 14px;
    font-weight: var(--font-weight-semi-bold);
    font-size: 12px;
    color: var(--neutral-foreground3);
    background: var(--neutral-background1);
    border-bottom: 1px solid var(--neutral-stroke2);
    white-space: nowrap;
  }
  .pcd-table th.sortable {
    cursor: pointer;
  }
  .pcd-table th.sortable:hover {
    color: var(--neutral-foreground1);
  }
  .pcd-table td {
    padding: 10px 14px;
    color: var(--neutral-foreground1);
    border-bottom: 1px solid var(--neutral-stroke2);
  }
  .pcd-table tr:last-child td {
    border-bottom: none;
  }
  .pcd-table tr:hover td {
    background: var(--neutral-background1-hover);
  }

  /* Status badges */
  .pcd-status-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 2px 10px;
    border-radius: 4px;
    font-size: 12px;
    font-weight: var(--font-weight-semi-bold);
    white-space: nowrap;
  }
  .pcd-status-badge.in-progress { background: #e3f2fd; color: #1565c0; }
  .pcd-status-badge.not-started { background: var(--neutral-background3); color: var(--neutral-foreground2); }
  .pcd-status-badge.failed { background: #fdecea; color: #c62828; }
  .pcd-status-badge.completed { background: #e8f5e9; color: #2e7d32; }

  .pcd-status-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
  }
  .pcd-status-dot.in-progress { background: #1565c0; }
  .pcd-status-dot.not-started { background: var(--neutral-foreground3); }
  .pcd-status-dot.failed { background: #c62828; }
  .pcd-status-dot.completed { background: #2e7d32; }

  /* ─── Filter Bar ─── */
  .pcd-filter-bar {
    display: flex;
    gap: 8px;
    margin-bottom: 12px;
    flex-wrap: wrap;
  }
  .pcd-filter-chip {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 4px 12px;
    border-radius: 16px;
    font-size: 12px;
    border: 1px solid var(--neutral-stroke2);
    background: var(--neutral-background1);
    color: var(--neutral-foreground2);
    cursor: pointer;
    transition: all 0.15s;
  }
  .pcd-filter-chip:hover {
    background: var(--neutral-background1-hover);
  }
  .pcd-filter-chip.active {
    background: var(--brand-background2);
    border-color: var(--brand-stroke1);
    color: var(--brand-foreground-link);
  }

  /* ─── Info bar ─── */
  .pcd-info-bar {
    margin-bottom: 16px;
  }
  .pcd-info-bar cui-message-bar {
    --message-bar-bg-color: var(--brand-background2);
    --message-bar-icon-fg-color: var(--brand-foreground-link);
    --message-bar-border: 1px solid var(--brand-stroke1);
  }
`;
