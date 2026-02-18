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

  /* ─── Essentials Panel ─── */
  .essentials {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0 32px;
    background: var(--neutral-background1);
    border: 1px solid var(--neutral-stroke2);
    border-radius: var(--border-radius-md);
    padding: 20px 24px;
    margin-bottom: 24px;
  }
  .essentials-row {
    display: flex;
    gap: 8px;
    font-size: var(--font-size-base200);
    line-height: 1.4;
    padding: 4px 0;
  }
  .essentials-label {
    color: var(--neutral-foreground3);
    min-width: 130px;
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
  .essentials-value a:hover {
    text-decoration: underline;
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

  /* ─── Section Heading ─── */
  .section-title {
    font-size: var(--font-size-base400);
    font-weight: var(--font-weight-semi-bold);
    color: var(--neutral-foreground1);
    margin: 0 0 16px;
  }

  /* ─── Cards Row ─── */
  .overview-cards-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    margin-bottom: 24px;
  }
  .overview-cards-row.three-col {
    grid-template-columns: 1fr 1fr 1fr;
  }
  .overview-cards-full {
    margin-bottom: 24px;
  }

  /* ─── Expiry Timeline ─── */
  .expiry-buckets {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
    margin-bottom: 20px;
  }
  .expiry-bucket {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 16px;
    border-radius: var(--border-radius-md);
    border: 1px solid var(--neutral-stroke2);
    background: var(--neutral-background1);
  }
  .expiry-bucket.danger {
    border-color: var(--status-danger-foreground1);
    background: var(--status-danger-background1);
  }
  .expiry-bucket.warning {
    border-color: var(--status-warning-foreground1);
    background: var(--status-warning-background1);
  }
  .expiry-bucket.info {
    border-color: var(--brand-stroke1);
    background: var(--brand-background2);
  }
  .expiry-bucket-count {
    font-size: 32px;
    font-weight: var(--font-weight-bold);
    line-height: 1;
    margin-bottom: 4px;
  }
  .expiry-bucket.danger .expiry-bucket-count { color: var(--status-danger-foreground1); }
  .expiry-bucket.warning .expiry-bucket-count { color: var(--status-warning-foreground1); }
  .expiry-bucket.info .expiry-bucket-count { color: var(--brand-foreground1); }
  .expiry-bucket-label {
    font-size: var(--font-size-base200);
    color: var(--neutral-foreground2);
  }

  .expiry-timeline-bar {
    display: flex;
    height: 8px;
    border-radius: 4px;
    overflow: hidden;
    margin-bottom: 16px;
  }
  .expiry-timeline-segment {
    height: 100%;
    transition: width 0.3s;
  }

  .expiry-list {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  .expiry-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 12px;
    border-radius: var(--border-radius-sm);
    font-size: var(--font-size-base200);
    background: var(--neutral-background1);
    border: 1px solid var(--neutral-stroke2);
  }
  .expiry-item-left {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .expiry-item-name {
    font-weight: var(--font-weight-semi-bold);
    color: var(--brand-foreground-link);
  }
  .expiry-item-right {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: var(--font-size-base200);
    color: var(--neutral-foreground3);
  }

  /* ─── Certificate Health ─── */
  .cert-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }
  .cert-card {
    padding: 16px;
    border-radius: var(--border-radius-md);
    border: 1px solid var(--neutral-stroke2);
    background: var(--neutral-background1);
  }
  .cert-card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 8px;
  }
  .cert-card-name {
    font-weight: var(--font-weight-semi-bold);
    font-size: var(--font-size-base200);
    color: var(--brand-foreground-link);
  }
  .cert-card-subject {
    font-size: var(--font-size-base100);
    color: var(--neutral-foreground3);
    margin-bottom: 12px;
  }
  .cert-card-details {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  .cert-card-row {
    display: flex;
    justify-content: space-between;
    font-size: var(--font-size-base100);
  }
  .cert-card-row-label {
    color: var(--neutral-foreground3);
  }
  .cert-card-row-value {
    color: var(--neutral-foreground1);
  }
  .cert-renewal-indicator {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-size: var(--font-size-base100);
    padding: 2px 8px;
    border-radius: 12px;
  }
  .cert-renewal-indicator.auto {
    background: var(--status-success-background1);
    color: var(--status-success-foreground1);
  }
  .cert-renewal-indicator.manual {
    background: var(--neutral-background4);
    color: var(--neutral-foreground2);
  }
  .cert-summary-row {
    display: flex;
    gap: 16px;
    margin-bottom: 16px;
  }
  .cert-summary-stat {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: var(--font-size-base200);
    color: var(--neutral-foreground2);
  }
  .cert-summary-stat-value {
    font-weight: var(--font-weight-semi-bold);
    font-size: var(--font-size-base300);
  }

  /* ─── Access Policy Cards ─── */
  .policy-group {
    margin-bottom: 20px;
  }
  .policy-group-header {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 12px;
  }
  .policy-group-title {
    font-size: var(--font-size-base300);
    font-weight: var(--font-weight-semi-bold);
    color: var(--neutral-foreground1);
    margin: 0;
  }
  .policy-group-count {
    font-size: var(--font-size-base100);
    color: var(--neutral-foreground3);
    background: var(--neutral-background4);
    padding: 2px 8px;
    border-radius: 10px;
  }
  .policy-cards {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
  }
  .policy-card {
    padding: 14px 16px;
    border-radius: var(--border-radius-md);
    border: 1px solid var(--neutral-stroke2);
    background: var(--neutral-background1);
  }
  .policy-card-name {
    font-weight: var(--font-weight-semi-bold);
    font-size: var(--font-size-base200);
    color: var(--neutral-foreground1);
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .policy-card-perms {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  .policy-perm-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: var(--font-size-base100);
  }
  .policy-perm-label {
    color: var(--neutral-foreground3);
    min-width: 80px;
  }
  .policy-perm-tags {
    display: flex;
    gap: 4px;
    flex-wrap: wrap;
    justify-content: flex-end;
  }

  /* ─── Operations Table ─── */
  .ops-section {
    margin-top: 4px;
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
    padding: 10px 14px;
    font-weight: var(--font-weight-semi-bold);
    color: var(--neutral-foreground2);
    background: var(--neutral-background3);
    border-bottom: 1px solid var(--neutral-stroke2);
    cursor: pointer;
    user-select: none;
    white-space: nowrap;
  }
  .ops-table th:hover {
    background: var(--neutral-background4);
  }
  .ops-table td {
    padding: 10px 14px;
    color: var(--neutral-foreground1);
    border-bottom: 1px solid var(--neutral-stroke2);
  }
  .ops-table tr:last-child td {
    border-bottom: none;
  }
  .ops-table tr:hover td {
    background: var(--subtle-background-hover);
  }
  .sort-indicator {
    margin-left: 4px;
    font-size: 10px;
    color: var(--brand-foreground1);
  }
  .mono-cell {
    font-family: var(--font-family-monospace);
    font-size: var(--font-size-base100);
    color: var(--neutral-foreground2);
  }
  .op-name-cell {
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .op-icon-delete { color: var(--status-danger-foreground1); }
  .op-icon-purge  { color: var(--status-danger-foreground1); }
  .op-icon-recover { color: var(--status-success-foreground1); }
`;
