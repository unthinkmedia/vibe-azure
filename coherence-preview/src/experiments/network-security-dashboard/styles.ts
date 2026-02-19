export const styles = `
  body { margin: 0; }

  /* ─── Layout ─── */
  .nsd-breadcrumb {
    padding: 4px 16px 0;
  }

  .nsd-body {
    display: flex;
    flex: 1;
    overflow: hidden;
  }

  .nsd-sidebar {
    width: 220px;
    min-width: 220px;
    border-right: 1px solid var(--neutral-stroke2);
    background: var(--neutral-background1);
    overflow-y: auto;
    transition: width 0.2s ease, min-width 0.2s ease;
  }
  .nsd-sidebar.collapsed {
    width: 0;
    min-width: 0;
    overflow: hidden;
    border-right: none;
  }

  .nsd-sidebar-toggle {
    position: absolute;
    top: 8px;
    z-index: 1;
  }

  .nsd-content {
    flex: 1;
    overflow-y: auto;
    background: var(--neutral-background2);
    position: relative;
  }

  .nsd-content-inner {
    padding: 24px 24px 48px;
  }

  /* ─── Main layout: content + recommendations panel ─── */
  .nsd-main-layout {
    display: grid;
    grid-template-columns: 1fr 340px;
    gap: 24px;
  }
  @media (max-width: 1200px) {
    .nsd-main-layout { grid-template-columns: 1fr; }
  }

  /* ─── Sections ─── */
  .nsd-section {
    margin-bottom: 24px;
  }
  .nsd-section h2 {
    font-size: var(--font-size-base400);
    font-weight: var(--font-weight-semi-bold);
    color: var(--neutral-foreground1);
    margin: 0 0 4px;
  }
  .nsd-section > .nsd-section-desc {
    font-size: var(--font-size-base200);
    color: var(--neutral-foreground3);
    margin: 0 0 12px;
  }

  /* ─── Threat Summary Strip ─── */
  .nsd-threat-strip {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 12px;
    margin-bottom: 24px;
  }
  @media (max-width: 900px) {
    .nsd-threat-strip { grid-template-columns: repeat(2, 1fr); }
  }

  .nsd-threat-card {
    background: var(--neutral-background1);
    border: 1px solid var(--neutral-stroke2);
    border-radius: 8px;
    padding: 16px;
    display: flex;
    align-items: flex-start;
    gap: 12px;
  }
  .nsd-threat-card:hover {
    box-shadow: var(--shadow-4);
  }

  .nsd-threat-icon {
    width: 40px;
    height: 40px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  .nsd-threat-icon.red { background: var(--status-danger-background1); color: var(--status-danger-foreground1); }
  .nsd-threat-icon.amber { background: var(--status-warning-background1); color: var(--status-warning-foreground1); }
  .nsd-threat-icon.blue { background: var(--brand-background2); color: var(--brand-foreground-link); }
  .nsd-threat-icon.green { background: var(--status-success-background1); color: var(--status-success-foreground1); }

  .nsd-threat-label {
    font-size: var(--font-size-base200);
    color: var(--neutral-foreground3);
    margin-bottom: 2px;
    font-weight: var(--font-weight-semi-bold);
    text-transform: uppercase;
    letter-spacing: 0.3px;
  }
  .nsd-threat-value {
    font-size: var(--font-size-hero700);
    font-weight: var(--font-weight-bold);
    color: var(--neutral-foreground1);
    line-height: 1.1;
  }
  .nsd-threat-subtext {
    font-size: var(--font-size-base200);
    color: var(--neutral-foreground3);
    margin-top: 2px;
  }

  /* ─── Geographic Attack Map ─── */
  .nsd-geo-card {
    background: var(--neutral-background1);
    border: 1px solid var(--neutral-stroke2);
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 24px;
  }
  .nsd-geo-card h3 {
    font-size: var(--font-size-base300);
    font-weight: var(--font-weight-semi-bold);
    color: var(--neutral-foreground1);
    margin: 0 0 4px;
  }
  .nsd-geo-desc {
    font-size: var(--font-size-base200);
    color: var(--neutral-foreground3);
    margin: 0 0 16px;
  }
  .nsd-geo-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
  }
  @media (max-width: 700px) {
    .nsd-geo-grid { grid-template-columns: 1fr; }
  }
  .nsd-geo-row {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 8px 12px;
    border-radius: 6px;
    background: var(--neutral-background2);
  }
  .nsd-geo-row:hover {
    background: var(--neutral-background1-hover);
  }
  .nsd-geo-rank {
    font-size: var(--font-size-base200);
    font-weight: var(--font-weight-semi-bold);
    color: var(--neutral-foreground3);
    width: 20px;
    text-align: center;
    flex-shrink: 0;
  }
  .nsd-geo-flag {
    font-size: 20px;
    flex-shrink: 0;
    line-height: 1;
  }
  .nsd-geo-country {
    flex: 1;
    font-size: var(--font-size-base300);
    font-weight: var(--font-weight-semi-bold);
    color: var(--neutral-foreground1);
  }
  .nsd-geo-attack-type {
    font-size: var(--font-size-base100);
    color: var(--neutral-foreground3);
  }
  .nsd-geo-count {
    font-size: var(--font-size-base300);
    font-weight: var(--font-weight-bold);
    color: var(--danger-foreground-1);
    font-variant-numeric: tabular-nums;
    white-space: nowrap;
  }
  .nsd-geo-bar-wrap {
    width: 80px;
    height: 6px;
    background: var(--neutral-background5);
    border-radius: 3px;
    overflow: hidden;
    flex-shrink: 0;
  }
  .nsd-geo-bar-fill {
    height: 100%;
    border-radius: 3px;
    background: var(--danger-foreground-1);
    transition: width 0.3s ease;
  }

  /* ─── Firewall Events Table ─── */
  .nsd-table-wrap {
    background: var(--neutral-background1);
    border: 1px solid var(--neutral-stroke2);
    border-radius: 8px;
    overflow: hidden;
  }
  .nsd-table {
    width: 100%;
    border-collapse: collapse;
    font-size: var(--font-size-base300);
  }
  .nsd-table th {
    text-align: left;
    padding: 10px 14px;
    font-weight: var(--font-weight-semi-bold);
    font-size: var(--font-size-base200);
    color: var(--neutral-foreground3);
    background: var(--neutral-background1);
    border-bottom: 1px solid var(--neutral-stroke2);
    white-space: nowrap;
  }
  .nsd-table th.sortable {
    cursor: pointer;
  }
  .nsd-table th.sortable:hover {
    color: var(--neutral-foreground1);
  }
  .nsd-table td {
    padding: 10px 14px;
    color: var(--neutral-foreground1);
    border-bottom: 1px solid var(--neutral-stroke2);
  }
  .nsd-table tr:last-child td {
    border-bottom: none;
  }
  .nsd-table tr:hover td {
    background: var(--neutral-background1-hover);
  }

  /* Action badge */
  .nsd-action-badge {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 2px 8px;
    border-radius: 4px;
    font-size: var(--font-size-base200);
    font-weight: var(--font-weight-semi-bold);
    white-space: nowrap;
  }
  .nsd-action-badge.deny { background: var(--status-danger-background1); color: var(--status-danger-foreground1); }
  .nsd-action-badge.allow { background: var(--status-success-background1); color: var(--status-success-foreground1); }

  /* Severity badges */
  .nsd-severity-badge {
    display: inline-block;
    padding: 2px 8px;
    border-radius: 4px;
    font-size: var(--font-size-base100);
    font-weight: var(--font-weight-semi-bold);
    white-space: nowrap;
  }
  .nsd-severity-badge.critical { background: var(--status-danger-background1); color: var(--status-danger-foreground1); }
  .nsd-severity-badge.high { background: var(--status-warning-background1); color: var(--status-warning-foreground1); }
  .nsd-severity-badge.medium { background: var(--status-warning-background1); color: var(--status-warning-foreground1); }
  .nsd-severity-badge.low { background: var(--brand-background2); color: var(--brand-foreground-link); }
  .nsd-severity-badge.info { background: var(--neutral-background3); color: var(--neutral-foreground2); }

  /* ─── Filter Bar ─── */
  .nsd-filter-bar {
    display: flex;
    gap: 8px;
    margin-bottom: 12px;
    flex-wrap: wrap;
  }
  .nsd-filter-chip {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 4px 12px;
    border-radius: 16px;
    font-size: var(--font-size-base200);
    border: 1px solid var(--neutral-stroke2);
    background: var(--neutral-background1);
    color: var(--neutral-foreground2);
    cursor: pointer;
    transition: all 0.15s;
  }
  .nsd-filter-chip:hover {
    background: var(--neutral-background1-hover);
  }
  .nsd-filter-chip.active {
    background: var(--brand-background2);
    border-color: var(--brand-stroke1);
    color: var(--brand-foreground-link);
  }

  /* ─── NSG Recommendations Panel ─── */
  .nsd-rec-panel {
    position: sticky;
    top: 0;
  }
  .nsd-rec-card {
    background: var(--neutral-background1);
    border: 1px solid var(--neutral-stroke2);
    border-radius: 8px;
    overflow: hidden;
  }
  .nsd-rec-header {
    padding: 16px;
    border-bottom: 1px solid var(--neutral-stroke2);
  }
  .nsd-rec-header h3 {
    font-size: var(--font-size-base300);
    font-weight: var(--font-weight-semi-bold);
    color: var(--neutral-foreground1);
    margin: 0 0 4px;
  }
  .nsd-rec-header p {
    font-size: var(--font-size-base200);
    color: var(--neutral-foreground3);
    margin: 0;
  }

  .nsd-rec-group {
    padding: 0;
  }
  .nsd-rec-group-header {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 16px;
    background: var(--neutral-background3);
    border-bottom: 1px solid var(--neutral-stroke2);
    font-size: var(--font-size-base200);
    font-weight: var(--font-weight-semi-bold);
    color: var(--neutral-foreground2);
    text-transform: uppercase;
    letter-spacing: 0.3px;
  }
  .nsd-rec-group-count {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 20px;
    height: 20px;
    border-radius: 10px;
    font-size: var(--font-size-base100);
    font-weight: var(--font-weight-bold);
    padding: 0 6px;
  }
  .nsd-rec-group-count.critical { background: var(--status-danger-background1); color: var(--status-danger-foreground1); }
  .nsd-rec-group-count.high { background: var(--status-warning-background1); color: var(--status-warning-foreground1); }
  .nsd-rec-group-count.medium { background: var(--status-warning-background1); color: var(--status-warning-foreground1); }

  .nsd-rec-item {
    padding: 12px 16px;
    border-bottom: 1px solid var(--neutral-stroke2);
    cursor: pointer;
    transition: background 0.15s;
  }
  .nsd-rec-item:hover {
    background: var(--neutral-background1-hover);
  }
  .nsd-rec-item:last-child {
    border-bottom: none;
  }
  .nsd-rec-item-title {
    font-size: var(--font-size-base300);
    font-weight: var(--font-weight-semi-bold);
    color: var(--neutral-foreground1);
    margin-bottom: 4px;
  }
  .nsd-rec-item-desc {
    font-size: var(--font-size-base200);
    color: var(--neutral-foreground3);
    line-height: 1.4;
    margin-bottom: 6px;
  }
  .nsd-rec-item-meta {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: var(--font-size-base100);
    color: var(--neutral-foreground3);
  }
  .nsd-rec-item-resources {
    font-weight: var(--font-weight-semi-bold);
    color: var(--neutral-foreground2);
  }

  /* ─── Info bar ─── */
  .nsd-info-bar {
    margin-bottom: 16px;
  }
  .nsd-info-bar cui-message-bar {
    --message-bar-bg-color: var(--brand-background2);
    --message-bar-icon-fg-color: var(--brand-foreground-link);
    --message-bar-border: 1px solid var(--brand-stroke1);
  }

  /* ─── Source IP mono ─── */
  .nsd-mono {
    font-family: var(--font-family-monospace, monospace);
    font-size: var(--font-size-base200);
  }
`;
