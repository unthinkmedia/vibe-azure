export const styles = `
  body { margin: 0; }

  /* ─── Layout ─── */
  .cost-breadcrumb {
    padding: 4px 16px 0;
  }

  .cost-body {
    display: flex;
    flex: 1;
    overflow: hidden;
  }

  .cost-sidebar {
    width: 220px;
    min-width: 220px;
    border-right: 1px solid var(--neutral-stroke2);
    background: var(--neutral-background1);
    overflow-y: auto;
    transition: width 0.2s ease, min-width 0.2s ease;
  }
  .cost-sidebar.collapsed {
    width: 0;
    min-width: 0;
    overflow: hidden;
    border-right: none;
  }

  .cost-sidebar-toggle {
    position: absolute;
    top: 8px;
    z-index: 1;
  }

  .cost-content {
    flex: 1;
    overflow-y: auto;
    background: var(--neutral-background2);
    position: relative;
  }

  .cost-content-inner {
    padding: 24px 24px 48px;
  }

  /* ─── Section headings ─── */
  .cost-section {
    margin-bottom: 24px;
  }
  .cost-section h2 {
    font-size: 16px;
    font-weight: var(--font-weight-semi-bold);
    color: var(--neutral-foreground1);
    margin: 0 0 4px;
  }
  .cost-section > .cost-section-desc {
    font-size: var(--font-size-base200);
    color: var(--neutral-foreground3);
    margin: 0 0 12px;
  }

  /* ─── Heatmap ─── */
  .heatmap-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 8px;
  }
  @media (max-width: 1100px) {
    .heatmap-grid { grid-template-columns: repeat(3, 1fr); }
  }
  @media (max-width: 800px) {
    .heatmap-grid { grid-template-columns: repeat(2, 1fr); }
  }

  .heatmap-cell {
    border-radius: 6px;
    padding: 12px 14px;
    cursor: default;
    transition: box-shadow 0.15s;
    border: 1px solid transparent;
  }
  .heatmap-cell:hover {
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  }
  .heatmap-cell.severity-low {
    background: #e6f4ea;
    border-color: #b7dfbf;
  }
  .heatmap-cell.severity-medium {
    background: #fff8e1;
    border-color: #ffe082;
  }
  .heatmap-cell.severity-high {
    background: #fdecea;
    border-color: #f5c6cb;
  }

  .heatmap-name {
    font-size: 13px;
    font-weight: var(--font-weight-semi-bold);
    color: var(--neutral-foreground1);
    margin-bottom: 4px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .heatmap-delta {
    font-size: 20px;
    font-weight: var(--font-weight-bold);
    margin-bottom: 2px;
  }
  .heatmap-delta.severity-low { color: #1b7d3a; }
  .heatmap-delta.severity-medium { color: #b8860b; }
  .heatmap-delta.severity-high { color: #c62828; }

  .heatmap-cost {
    font-size: 11px;
    color: var(--neutral-foreground3);
  }

  /* ─── Top Movers Table ─── */
  .movers-table-wrap {
    background: var(--neutral-background1);
    border: 1px solid var(--neutral-stroke2);
    border-radius: 8px;
    overflow: hidden;
  }
  .movers-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 13px;
  }
  .movers-table th {
    text-align: left;
    padding: 10px 14px;
    font-weight: var(--font-weight-semi-bold);
    font-size: 12px;
    color: var(--neutral-foreground3);
    background: var(--neutral-background1);
    border-bottom: 1px solid var(--neutral-stroke2);
    white-space: nowrap;
  }
  .movers-table td {
    padding: 8px 14px;
    color: var(--neutral-foreground1);
    border-bottom: 1px solid var(--neutral-stroke2);
  }
  .movers-table tr:last-child td {
    border-bottom: none;
  }
  .movers-table tr:hover td {
    background: var(--neutral-background1-hover);
  }

  .cause-tag {
    display: inline-block;
    padding: 2px 8px;
    border-radius: 12px;
    font-size: 11px;
    font-weight: var(--font-weight-semi-bold);
    white-space: nowrap;
  }
  .cause-tag.scale-out {
    background: #e3f2fd;
    color: #1565c0;
  }
  .cause-tag.new-deployment {
    background: #e8f5e9;
    color: #2e7d32;
  }
  .cause-tag.idle-but-running {
    background: #fce4ec;
    color: #c62828;
  }
  .cause-tag.storage-growth {
    background: #fff3e0;
    color: #e65100;
  }
  .cause-tag.config-change {
    background: #f3e5f5;
    color: #6a1b9a;
  }
  .cause-tag.traffic-spike {
    background: #e0f7fa;
    color: #00838f;
  }

  .delta-positive {
    color: #c62828;
    font-weight: var(--font-weight-semi-bold);
  }

  /* ─── Timeline ─── */
  .timeline-wrap {
    background: var(--neutral-background1);
    border: 1px solid var(--neutral-stroke2);
    border-radius: 8px;
    padding: 20px;
  }
  .timeline-svg {
    width: 100%;
    height: 220px;
    display: block;
  }
  .timeline-legend {
    display: flex;
    gap: 16px;
    margin-top: 8px;
    font-size: 12px;
    color: var(--neutral-foreground3);
  }
  .timeline-legend-item {
    display: flex;
    align-items: center;
    gap: 4px;
  }
  .timeline-legend-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    display: inline-block;
  }

  .timeline-tooltip {
    position: absolute;
    background: var(--neutral-background1);
    border: 1px solid var(--neutral-stroke2);
    border-radius: 8px;
    padding: 12px 16px;
    box-shadow: 0 4px 16px rgba(0,0,0,0.12);
    z-index: 10;
    max-width: 340px;
    font-size: 13px;
    pointer-events: none;
  }
  .timeline-tooltip-title {
    font-weight: var(--font-weight-semi-bold);
    margin-bottom: 4px;
    color: var(--neutral-foreground1);
  }
  .timeline-tooltip-detail {
    color: var(--neutral-foreground2);
    line-height: 1.4;
  }
  .timeline-tooltip-type {
    display: inline-block;
    padding: 1px 6px;
    border-radius: 4px;
    font-size: 11px;
    font-weight: var(--font-weight-semi-bold);
    margin-bottom: 6px;
  }
  .timeline-tooltip-type.deployment { background: #e8f5e9; color: #2e7d32; }
  .timeline-tooltip-type.config-change { background: #f3e5f5; color: #6a1b9a; }
  .timeline-tooltip-type.traffic-spike { background: #e0f7fa; color: #00838f; }

  /* ─── Recommendations ─── */
  .rec-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 12px;
  }
  .rec-card {
    background: var(--neutral-background1);
    border: 1px solid var(--neutral-stroke2);
    border-radius: 8px;
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .rec-card:hover {
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  }
  .rec-card-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 8px;
  }
  .rec-card-title {
    font-weight: var(--font-weight-semi-bold);
    font-size: 14px;
    color: var(--neutral-foreground1);
  }
  .rec-savings {
    font-size: 18px;
    font-weight: var(--font-weight-bold);
    color: #1b7d3a;
    white-space: nowrap;
  }
  .rec-desc {
    font-size: 13px;
    color: var(--neutral-foreground2);
    line-height: 1.45;
  }
  .rec-resource {
    font-size: 12px;
    color: var(--neutral-foreground3);
  }
  .rec-impact {
    display: inline-block;
    padding: 1px 8px;
    border-radius: 4px;
    font-size: 11px;
    font-weight: var(--font-weight-semi-bold);
  }
  .rec-impact.high { background: #fdecea; color: #c62828; }
  .rec-impact.medium { background: #fff8e1; color: #b8860b; }
  .rec-impact.low { background: #e3f2fd; color: #1565c0; }

  .rec-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: auto;
    padding-top: 4px;
  }
`;
