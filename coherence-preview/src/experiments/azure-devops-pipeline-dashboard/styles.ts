export const styles = `
  body { margin: 0; }

  .apd-breadcrumb {
    padding: 4px 16px 0;
  }

  .apd-body {
    display: flex;
    flex: 1;
    overflow: hidden;
  }

  .apd-sidebar {
    width: 220px;
    min-width: 220px;
    border-right: 1px solid var(--neutral-stroke2);
    background: var(--neutral-background1);
    overflow-y: auto;
    transition: width 0.2s ease, min-width 0.2s ease;
  }
  .apd-sidebar.collapsed {
    width: 0;
    min-width: 0;
    overflow: hidden;
    border-right: none;
  }

  .apd-sidebar-toggle {
    position: absolute;
    top: 8px;
    z-index: 1;
  }

  .apd-content {
    flex: 1;
    overflow-y: auto;
    background: var(--neutral-background2);
    position: relative;
  }

  .apd-content-inner {
    padding: 24px 24px 48px;
  }

  .apd-alert-bar {
    margin-bottom: 16px;
  }

  .apd-grid {
    display: grid;
    grid-template-columns: 1fr 380px;
    gap: 20px;
  }

  .apd-section {
    margin-bottom: 20px;
  }

  .apd-section h2 {
    margin: 0 0 4px;
    font-size: var(--font-size-base400);
    color: var(--neutral-foreground1);
    font-weight: var(--font-weight-semi-bold);
  }

  .apd-section-desc {
    margin: 0 0 10px;
    color: var(--neutral-foreground3);
    font-size: var(--font-size-base200);
  }

  .apd-card {
    border: 1px solid var(--neutral-stroke2);
    background: var(--neutral-background1);
    border-radius: 8px;
    padding: 12px;
  }

  .apd-health-layout {
    display: grid;
    grid-template-columns: 1fr 220px;
    gap: 12px;
  }

  .apd-health-strip {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 12px;
  }

  .apd-donut-card {
    border: 1px solid var(--neutral-stroke2);
    background: var(--neutral-background1);
    border-radius: 8px;
    padding: 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }

  .apd-donut-card h3 {
    margin: 0;
    font-size: var(--font-size-base200);
    color: var(--neutral-foreground2);
    font-weight: var(--font-weight-semi-bold);
  }

  .apd-donut-wrap {
    position: relative;
    width: 128px;
    height: 128px;
  }

  .apd-donut-center {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    pointer-events: none;
  }

  .apd-donut-value {
    font-size: var(--font-size-hero700);
    color: var(--status-success-foreground1);
    font-weight: var(--font-weight-bold);
    line-height: 1;
  }

  .apd-donut-label {
    font-size: var(--font-size-base100);
    color: var(--neutral-foreground3);
  }

  .apd-timeline-list,
  .apd-agent-list {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .apd-timeline-item,
  .apd-agent-item {
    display: grid;
    grid-template-columns: 1fr 180px;
    gap: 12px;
    padding: 10px 8px;
    border-bottom: 1px solid var(--neutral-stroke2);
  }

  .apd-timeline-item:last-child,
  .apd-agent-item:last-child {
    border-bottom: none;
  }

  .apd-run-title-row {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 3px;
  }

  .apd-run-name {
    font-size: var(--font-size-base300);
    font-weight: var(--font-weight-semi-bold);
    color: var(--neutral-foreground1);
  }

  .apd-run-meta,
  .apd-run-commit,
  .apd-agent-meta {
    font-size: var(--font-size-base100);
    color: var(--neutral-foreground3);
  }

  .apd-run-commit {
    margin-top: 2px;
    color: var(--neutral-foreground2);
  }

  .apd-status-pill {
    font-size: var(--font-size-base100);
    border-radius: 10px;
    padding: 2px 8px;
    font-weight: var(--font-weight-semi-bold);
  }

  .apd-status-pill.succeeded {
    background: var(--status-success-background1);
    color: var(--status-success-foreground1);
  }

  .apd-status-pill.failed {
    background: var(--status-danger-background1);
    color: var(--status-danger-foreground1);
  }

  .apd-status-pill.inProgress {
    background: var(--brand-background2);
    color: var(--brand-foreground-link);
  }

  .apd-run-duration {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 5px;
  }

  .apd-duration-top {
    text-align: right;
    color: var(--neutral-foreground2);
    font-size: var(--font-size-base100);
    font-variant-numeric: tabular-nums;
  }

  .apd-duration-track,
  .apd-stage-track,
  .apd-agent-track {
    height: 8px;
    border-radius: 999px;
    background: var(--neutral-background5);
    overflow: hidden;
  }

  .apd-duration-fill,
  .apd-stage-fill,
  .apd-agent-fill {
    height: 100%;
    border-radius: inherit;
  }

  .apd-duration-fill.succeeded,
  .apd-agent-fill {
    background: var(--status-success-foreground1);
  }

  .apd-duration-fill.failed {
    background: var(--status-danger-foreground1);
  }

  .apd-duration-fill.inProgress,
  .apd-stage-fill {
    background: var(--brand-foreground-link);
  }

  .apd-table {
    width: 100%;
    border-collapse: collapse;
    font-size: var(--font-size-base200);
  }

  .apd-table th {
    text-align: left;
    padding: 8px;
    color: var(--neutral-foreground3);
    border-bottom: 1px solid var(--neutral-stroke2);
    font-weight: var(--font-weight-semi-bold);
    font-size: var(--font-size-base100);
  }

  .apd-table td {
    padding: 8px;
    border-bottom: 1px solid var(--neutral-stroke2);
    color: var(--neutral-foreground1);
    vertical-align: middle;
  }

  .apd-table tr:last-child td {
    border-bottom: none;
  }

  .apd-stage-cell {
    display: grid;
    gap: 6px;
  }

  .apd-agent-name {
    font-size: var(--font-size-base300);
    color: var(--neutral-foreground1);
    font-weight: var(--font-weight-semi-bold);
    margin-bottom: 2px;
  }

  .apd-agent-utilization {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 5px;
    font-size: var(--font-size-base100);
    color: var(--neutral-foreground2);
  }

  @media (max-width: 1200px) {
    .apd-grid {
      grid-template-columns: 1fr;
    }

    .apd-health-layout {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 920px) {
    .apd-health-strip {
      grid-template-columns: 1fr;
    }

    .apd-timeline-item,
    .apd-agent-item {
      grid-template-columns: 1fr;
    }

    .apd-duration-top {
      text-align: left;
    }
  }
`;
