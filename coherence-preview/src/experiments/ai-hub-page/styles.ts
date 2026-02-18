export const styles = `
  body { margin: 0; }
  [slot='main'] {
    min-width: 320px;
    padding: 0;
    background: var(--neutral-background2);
  }
  .aihub-page-header {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 16px 32px 0;
  }
  .aihub-resource-title {
    display: flex;
    align-items: center;
    gap: 8px;
    margin: 0;
    font-size: var(--font-size-base500);
    font-weight: var(--font-weight-semi-bold);
    color: var(--neutral-foreground1);
  }
  .aihub-resource-subtitle {
    font-size: var(--font-size-base200);
    color: var(--neutral-foreground3);
    margin: 0 0 0 32px;
    padding-bottom: 8px;
  }
  .aihub-content {
    padding: 24px 32px;
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  /* ─── Top row: Readiness + Get Started ─── */
  .aihub-top-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }

  /* ─── AI Readiness Score Card (Donut Gauge) ─── */
  .readiness-card {
    --card-padding: 20px;
  }
  .v1-body {
    display: flex;
    gap: 24px;
    align-items: center;
  }
  .v1-donut-wrap {
    position: relative;
    width: 100px;
    height: 100px;
    flex-shrink: 0;
  }
  .v1-donut-wrap svg {
    transform: rotate(-90deg);
  }
  .v1-donut-center {
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    pointer-events: none;
  }
  .v1-donut-value {
    font-size: 28px;
    font-weight: 700;
    line-height: 1;
  }
  .v1-donut-max {
    font-size: 11px;
    color: var(--neutral-foreground3);
  }
  .v1-cats {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  .v1-cat-row {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: var(--font-size-base200);
  }
  .v1-cat-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    flex-shrink: 0;
  }
  .v1-cat-label {
    flex: 1;
    color: var(--neutral-foreground1);
  }
  .v1-cat-score {
    font-weight: 600;
    font-variant-numeric: tabular-nums;
  }

  /* ─── Foundry Connections Card ─── */
  .connections-card {
    --card-padding: 0;
  }
  .connections-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 20px 12px;
  }
  .connections-title {
    font-size: var(--font-size-base400);
    font-weight: var(--font-weight-semi-bold);
    color: var(--neutral-foreground1);
    margin: 0;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .connections-actions {
    display: flex;
    gap: 8px;
    align-items: center;
  }
  .connection-list {
    display: flex;
    flex-direction: column;
  }
  .connection-item {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 12px;
    padding: 14px 20px;
    border-top: 1px solid var(--neutral-stroke2);
    align-items: start;
  }
  .connection-item:hover {
    background: var(--subtle-background-hover);
  }
  .connection-details {
    display: flex;
    flex-direction: column;
    gap: 4px;
    min-width: 0;
  }
  .connection-project {
    font-size: var(--font-size-base300);
    font-weight: var(--font-weight-semi-bold);
    color: var(--brand-foreground-link);
    text-decoration: none;
    cursor: pointer;
  }
  .connection-project:hover {
    text-decoration: underline;
  }
  .connection-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    font-size: var(--font-size-base200);
    color: var(--neutral-foreground3);
  }
  .connection-meta-item {
    display: flex;
    align-items: center;
    gap: 4px;
    min-width: 0;
  }
  .connection-meta-label {
    color: var(--neutral-foreground3);
    flex-shrink: 0;
  }
  .connection-meta-value {
    color: var(--neutral-foreground1);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .connection-item-actions {
    display: flex;
    gap: 4px;
    align-items: center;
    flex-shrink: 0;
    padding-top: 2px;
  }
  .connections-footer {
    padding: 12px 20px 16px;
    border-top: 1px solid var(--neutral-stroke2);
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  /* ─── Features Section ─── */
  .section-heading {
    font-size: var(--font-size-base400);
    font-weight: var(--font-weight-semi-bold);
    color: var(--neutral-foreground1);
    margin: 0;
  }
  .features-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }
  .feature-card {
    --card-padding: 20px;
  }
  .feature-card-title {
    font-size: var(--font-size-base300);
    font-weight: var(--font-weight-semi-bold);
    color: var(--neutral-foreground1);
    margin: 0 0 4px;
  }
  .feature-card-desc {
    font-size: var(--font-size-base200);
    color: var(--neutral-foreground3);
    margin: 0 0 12px;
  }
  .feature-status {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: var(--font-size-base200);
    color: var(--neutral-foreground3);
    margin-bottom: 4px;
  }
  .feature-status-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    border: 1px solid var(--neutral-foreground3);
    background: transparent;
  }
  .feature-status-dot--active {
    border-color: var(--success-foreground-1);
    background: var(--success-foreground-1);
  }
  .feature-hint {
    font-size: var(--font-size-base200);
    color: var(--neutral-foreground3);
    margin: 4px 0 12px;
  }

  /* ─── Diagnostics Section ─── */
  .diagnostics-row {
    display: grid;
    grid-template-columns: auto auto 1fr;
    gap: 16px;
    align-items: start;
  }
  .diagnostics-card {
    --card-padding: 16px;
    min-width: 160px;
  }
  .diagnostics-card-title {
    font-size: var(--font-size-base300);
    font-weight: var(--font-weight-semi-bold);
    color: var(--neutral-foreground1);
    margin: 0 0 8px;
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .diagnostics-hint {
    font-size: var(--font-size-base200);
    color: var(--neutral-foreground3);
    margin: 0;
  }

  @media (max-width: 960px) {
    .aihub-top-row,
    .features-row {
      grid-template-columns: 1fr;
    }
    .diagnostics-row {
      grid-template-columns: 1fr 1fr;
    }
  }
`;
