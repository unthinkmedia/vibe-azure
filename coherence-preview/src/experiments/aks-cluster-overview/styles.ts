// @ts-nocheck
/** Scoped styles for Azure Kubernetes Service (AKS) cluster overview experiment. */
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

  /* ─── Message bar ─── */
  .cert-warning-bar {
    margin: 0 32px 16px;
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
    word-break: break-all;
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
  .status-dot.success { background: var(--success-foreground1); }
  .status-dot.warning { background: var(--warning-foreground3); }
  .status-dot.error   { background: var(--danger-foreground1); }

  /* ─── Section headings ─── */
  .section-title {
    font-size: var(--font-size-base400);
    font-weight: var(--font-weight-semi-bold);
    color: var(--neutral-foreground1);
    margin: 0 0 12px;
  }

  /* ─── Cluster health summary ─── */
  .health-card {
    --card-padding: 20px;
    margin-bottom: 24px;
  }
  .health-grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 24px;
  }
  @media (max-width: 900px) {
    .health-grid { grid-template-columns: repeat(3, 1fr); }
  }
  @media (max-width: 600px) {
    .health-grid { grid-template-columns: repeat(2, 1fr); }
  }
  .health-metric {
    text-align: center;
  }
  .health-metric-label {
    font-size: var(--font-size-base200);
    color: var(--neutral-foreground3);
    margin: 0 0 4px;
  }
  .health-metric-value {
    font-size: 24px;
    font-weight: var(--font-weight-semi-bold);
    color: var(--neutral-foreground1);
    line-height: 1.2;
  }
  .health-metric-sub {
    font-size: var(--font-size-base100);
    color: var(--neutral-foreground3);
    margin-top: 2px;
  }
  .health-status-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-weight: var(--font-weight-semi-bold);
    font-size: 16px;
  }
  .health-status-badge.healthy { color: var(--success-foreground1); }
  .health-status-badge.warning { color: var(--warning-foreground3); }
  .health-status-badge.critical { color: var(--danger-foreground1); }

  /* ─── Node pool utilization ─── */
  .nodepool-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 16px;
    margin-bottom: 24px;
  }
  .nodepool-card {
    --card-padding: 16px;
  }
  .nodepool-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
  }
  .nodepool-name {
    font-weight: var(--font-weight-semi-bold);
    font-size: var(--font-size-base300);
    color: var(--neutral-foreground1);
  }
  .nodepool-mode-badge {
    font-size: var(--font-size-base100);
    padding: 2px 8px;
    border-radius: var(--border-radius-circular);
    font-weight: var(--font-weight-semi-bold);
  }
  .nodepool-mode-badge.system {
    background: var(--brand-background2);
    color: var(--brand-foreground1);
  }
  .nodepool-mode-badge.user {
    background: var(--neutral-background4);
    color: var(--neutral-foreground2);
  }
  .nodepool-meta {
    display: flex;
    gap: 16px;
    font-size: var(--font-size-base200);
    color: var(--neutral-foreground3);
    margin-bottom: 12px;
  }
  .nodepool-bar-group {
    margin-bottom: 8px;
  }
  .nodepool-bar-label {
    display: flex;
    justify-content: space-between;
    font-size: var(--font-size-base200);
    color: var(--neutral-foreground2);
    margin-bottom: 4px;
  }
  .nodepool-bar-track {
    height: 8px;
    border-radius: 4px;
    background: var(--neutral-background4);
    overflow: hidden;
  }
  .nodepool-bar-fill {
    height: 100%;
    border-radius: 4px;
    transition: width 0.3s ease;
  }
  .nodepool-bar-fill.low { background: var(--success-foreground1); }
  .nodepool-bar-fill.medium { background: var(--warning-foreground3); }
  .nodepool-bar-fill.high { background: var(--danger-foreground1); }
  .nodepool-status {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: var(--font-size-base200);
    margin-top: 8px;
  }
  .nodepool-status.ready { color: var(--success-foreground1); }
  .nodepool-status.scaling { color: var(--warning-foreground3); }
  .nodepool-status.notready { color: var(--danger-foreground1); }

  /* ─── Deployments table ─── */
  .deployments-table {
    width: 100%;
    border-collapse: collapse;
    font-size: var(--font-size-base300);
    background: var(--neutral-background1);
    border: 1px solid var(--neutral-stroke2);
    border-radius: var(--border-radius-md);
    overflow: hidden;
  }
  .deployments-table th {
    text-align: left;
    padding: 10px 16px;
    font-weight: var(--font-weight-semi-bold);
    font-size: var(--font-size-base200);
    color: var(--neutral-foreground3);
    background: var(--neutral-background3);
    border-bottom: 1px solid var(--neutral-stroke2);
  }
  .deployments-table td {
    padding: 10px 16px;
    color: var(--neutral-foreground1);
    border-bottom: 1px solid var(--neutral-stroke2);
  }
  .deployments-table tr:last-child td {
    border-bottom: none;
  }
  .deployments-table tr:hover td {
    background: var(--neutral-background1-hover);
  }
  .deployment-name-link {
    color: var(--brand-foreground-link);
    text-decoration: none;
    font-weight: var(--font-weight-semi-bold);
  }
  .deploy-badge {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-size: var(--font-size-base200);
    font-weight: var(--font-weight-semi-bold);
    padding: 2px 10px;
    border-radius: var(--border-radius-circular);
  }
  .deploy-badge.succeeded {
    background: var(--success-background2);
    color: var(--success-foreground1);
  }
  .deploy-badge.in-progress {
    background: var(--brand-background2);
    color: var(--brand-foreground1);
  }
  .deploy-badge.failed {
    background: var(--danger-background3);
    color: var(--danger-foreground1);
  }
  .deploy-badge.pending {
    background: var(--neutral-background4);
    color: var(--neutral-foreground3);
  }
  .namespace-tag {
    font-size: var(--font-size-base200);
    color: var(--neutral-foreground3);
    background: var(--neutral-background4);
    padding: 1px 8px;
    border-radius: var(--border-radius-sm);
  }
`;
