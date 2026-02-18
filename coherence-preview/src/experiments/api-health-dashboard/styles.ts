export const styles = `
  body { margin: 0; }

  /* ─── Layout ─── */
  .health-breadcrumb {
    padding: 4px 16px 0;
  }

  .health-body {
    display: flex;
    flex: 1;
    overflow: hidden;
  }

  .health-sidebar {
    width: 220px;
    min-width: 220px;
    border-right: 1px solid var(--neutral-stroke2);
    background: var(--neutral-background1);
    overflow-y: auto;
    transition: width 0.2s ease, min-width 0.2s ease;
  }
  .health-sidebar.collapsed {
    width: 0;
    min-width: 0;
    overflow: hidden;
    border-right: none;
  }

  .health-sidebar-toggle {
    position: absolute;
    top: 8px;
    z-index: 1;
  }

  .health-content {
    flex: 1;
    overflow-y: auto;
    background: var(--neutral-background2);
    position: relative;
  }

  .health-content-inner {
    padding: 24px 24px 48px;
  }

  /* ─── Section Headings ─── */
  .health-section {
    margin-bottom: 24px;
  }
  .health-section h2 {
    font-size: 16px;
    font-weight: var(--font-weight-semi-bold);
    color: var(--neutral-foreground1);
    margin: 0 0 4px;
  }
  .health-section > .health-section-desc {
    font-size: var(--font-size-base200);
    color: var(--neutral-foreground3);
    margin: 0 0 12px;
  }

  /* ─── Summary Bar ─── */
  .summary-bar {
    display: flex;
    gap: 16px;
    margin-bottom: 20px;
    flex-wrap: wrap;
  }
  .summary-chip {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 6px 14px;
    border-radius: 6px;
    background: var(--neutral-background1);
    border: 1px solid var(--neutral-stroke2);
    font-size: 13px;
    font-weight: var(--font-weight-semi-bold);
    color: var(--neutral-foreground1);
  }
  .summary-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
  }
  .summary-dot.healthy { background: #1b7d3a; }
  .summary-dot.degraded { background: #b8860b; }
  .summary-dot.down { background: #c62828; }

  /* ─── Status Grid ─── */
  .status-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: 12px;
  }

  .status-card {
    background: var(--neutral-background1);
    border: 1px solid var(--neutral-stroke2);
    border-radius: 8px;
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    transition: box-shadow 0.15s;
  }
  .status-card:hover {
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  }

  .status-card-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }

  .status-card-name {
    font-weight: var(--font-weight-semi-bold);
    font-size: 14px;
    color: var(--neutral-foreground1);
  }

  .status-badge {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 2px 8px;
    border-radius: 12px;
    font-size: 11px;
    font-weight: var(--font-weight-semi-bold);
    text-transform: uppercase;
    letter-spacing: 0.3px;
  }
  .status-badge.healthy {
    background: #e6f4ea;
    color: #1b7d3a;
  }
  .status-badge.degraded {
    background: #fff8e1;
    color: #b8860b;
  }
  .status-badge.down {
    background: #fdecea;
    color: #c62828;
  }

  .status-card-path {
    font-size: 12px;
    color: var(--neutral-foreground3);
    font-family: var(--font-family-monospace, 'Cascadia Code', 'Consolas', monospace);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .status-card-method {
    display: inline-block;
    font-size: 10px;
    font-weight: var(--font-weight-bold);
    padding: 1px 5px;
    border-radius: 3px;
    margin-right: 4px;
    color: #fff;
  }
  .status-card-method.GET { background: #1565c0; }
  .status-card-method.POST { background: #2e7d32; }
  .status-card-method.PUT { background: #e65100; }
  .status-card-method.DELETE { background: #c62828; }
  .status-card-method.PATCH { background: #6a1b9a; }

  .status-card-metrics {
    display: flex;
    gap: 16px;
    margin-top: 4px;
  }

  .status-metric {
    display: flex;
    flex-direction: column;
  }
  .status-metric-label {
    font-size: 11px;
    color: var(--neutral-foreground3);
    margin-bottom: 2px;
  }
  .status-metric-value {
    font-size: 16px;
    font-weight: var(--font-weight-bold);
    color: var(--neutral-foreground1);
  }
  .status-metric-value.warn {
    color: #b8860b;
  }
  .status-metric-value.crit {
    color: #c62828;
  }

  /* ─── Latency Chart ─── */
  .latency-wrap {
    background: var(--neutral-background1);
    border: 1px solid var(--neutral-stroke2);
    border-radius: 8px;
    padding: 20px;
  }

  .latency-controls {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 12px;
    flex-wrap: wrap;
  }

  .latency-toggle {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 4px 12px;
    border-radius: 6px;
    font-size: 12px;
    cursor: pointer;
    border: 1px solid var(--neutral-stroke2);
    background: var(--neutral-background1);
    color: var(--neutral-foreground2);
    transition: all 0.15s;
  }
  .latency-toggle.active {
    background: var(--brand-background2);
    border-color: var(--brand-stroke1);
    color: var(--brand-foreground-link);
    font-weight: var(--font-weight-semi-bold);
  }

  .latency-svg {
    width: 100%;
    height: 260px;
    display: block;
  }

  .latency-legend {
    display: flex;
    gap: 20px;
    margin-top: 10px;
    font-size: 12px;
    color: var(--neutral-foreground3);
  }
  .latency-legend-item {
    display: flex;
    align-items: center;
    gap: 4px;
  }
  .latency-legend-line {
    width: 16px;
    height: 2px;
    display: inline-block;
  }

  /* ─── Failure Log Table ─── */
  .failure-table-wrap {
    background: var(--neutral-background1);
    border: 1px solid var(--neutral-stroke2);
    border-radius: 8px;
    overflow: hidden;
  }
  .failure-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 13px;
  }
  .failure-table th {
    text-align: left;
    padding: 10px 14px;
    font-weight: var(--font-weight-semi-bold);
    font-size: 12px;
    color: var(--neutral-foreground3);
    background: var(--neutral-background1);
    border-bottom: 1px solid var(--neutral-stroke2);
    white-space: nowrap;
  }
  .failure-table td {
    padding: 8px 14px;
    color: var(--neutral-foreground1);
    border-bottom: 1px solid var(--neutral-stroke2);
  }
  .failure-table tr:last-child td {
    border-bottom: none;
  }
  .failure-table tr:hover td {
    background: var(--neutral-background1-hover);
  }

  .http-status-badge {
    display: inline-block;
    padding: 1px 6px;
    border-radius: 4px;
    font-size: 11px;
    font-weight: var(--font-weight-semi-bold);
    font-family: var(--font-family-monospace, 'Cascadia Code', 'Consolas', monospace);
  }
  .http-status-badge.s4xx {
    background: #fff8e1;
    color: #b8860b;
  }
  .http-status-badge.s5xx {
    background: #fdecea;
    color: #c62828;
  }

  .correlation-id {
    font-family: var(--font-family-monospace, 'Cascadia Code', 'Consolas', monospace);
    font-size: 11px;
    color: var(--neutral-foreground3);
    cursor: pointer;
  }
  .correlation-id:hover {
    color: var(--brand-foreground-link);
    text-decoration: underline;
  }

  .error-message {
    max-width: 280px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 12px;
    color: var(--neutral-foreground2);
  }

  /* ─── Dependency Map ─── */
  .depmap-wrap {
    background: var(--neutral-background1);
    border: 1px solid var(--neutral-stroke2);
    border-radius: 8px;
    padding: 20px;
    position: relative;
  }

  .depmap-svg {
    width: 100%;
    height: 400px;
    display: block;
  }

  .depmap-legend {
    display: flex;
    gap: 16px;
    margin-top: 10px;
    font-size: 12px;
    color: var(--neutral-foreground3);
    flex-wrap: wrap;
  }
  .depmap-legend-item {
    display: flex;
    align-items: center;
    gap: 4px;
  }
  .depmap-legend-icon {
    width: 12px;
    height: 12px;
    border-radius: 3px;
    border: 1px solid var(--neutral-stroke2);
  }
`;
