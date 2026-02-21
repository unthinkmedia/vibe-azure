export const styles = `
  body { margin: 0; }

  [slot='main'] {
    min-width: 320px;
    padding: 0;
    background: var(--neutral-background1);
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  /* ─── Breadcrumb row ─── */
  .fchp-breadcrumb {
    padding: 8px 20px 0;
  }

  /* ─── Blade header ─── */
  .fchp-blade-header {
    display: flex;
    align-items: center;
    padding: 8px 20px 4px;
    gap: 16px;
  }
  .fchp-blade-title {
    margin: 0;
    font-size: var(--font-size-base600);
    font-weight: var(--font-weight-semi-bold);
    color: var(--neutral-foreground1);
    line-height: 32px;
  }
  .fchp-blade-close {
    margin-left: auto;
  }

  /* ─── Content area ─── */
  .fchp-content {
    flex: 1;
    overflow-y: auto;
    padding: 16px 20px 24px;
  }

  /* ─── Section header ─── */
  .fchp-section-title {
    margin: 0 0 4px;
    font-size: var(--font-size-base400);
    font-weight: var(--font-weight-semi-bold);
    color: var(--neutral-foreground1);
    line-height: 22px;
  }
  .fchp-section-desc {
    margin: 0 0 16px;
    font-size: var(--font-size-base200);
    color: var(--neutral-foreground1);
    line-height: 18px;
  }
  .fchp-section-desc a {
    color: var(--brand-foreground-link);
    text-decoration: none;
  }
  .fchp-section-desc a:hover {
    text-decoration: underline;
  }

  /* ─── Comparison Table ─── */
  .fchp-table {
    width: 100%;
    border-collapse: collapse;
    table-layout: fixed;
  }
  .fchp-table th,
  .fchp-table td {
    padding: 16px;
    border: 1px solid var(--neutral-stroke2);
    text-align: left;
    vertical-align: top;
    font-size: var(--font-size-base200);
    line-height: 18px;
    color: var(--neutral-foreground1);
  }

  /* Label column */
  .fchp-table .fchp-label-col {
    width: 160px;
    font-weight: var(--font-weight-regular);
    background: var(--neutral-background1);
  }

  /* Plan header cells */
  .fchp-plan-header {
    vertical-align: top;
    cursor: pointer;
  }
  .fchp-plan-header.fchp-selected {
    border-left: 2px solid var(--brand-stroke1);
    border-right: 2px solid var(--brand-stroke1);
    border-top: 2px solid var(--brand-stroke1);
  }
  .fchp-table .fchp-plan-name {
    margin: 8px 0 8px;
    font-size: var(--font-size-base300);
    font-weight: var(--font-weight-semi-bold);
    color: var(--neutral-foreground1);
    line-height: 20px;
  }
  .fchp-plan-desc {
    margin: 0;
    font-size: var(--font-size-base200);
    color: var(--neutral-foreground1);
    line-height: 18px;
    font-weight: var(--font-weight-regular);
  }

  /* Selected column highlight for data cells */
  .fchp-selected-col {
    border-left: 2px solid var(--brand-stroke1);
    border-right: 2px solid var(--brand-stroke1);
  }
  .fchp-selected-col-last {
    border-left: 2px solid var(--brand-stroke1);
    border-right: 2px solid var(--brand-stroke1);
    border-bottom: 2px solid var(--brand-stroke1);
  }

  /* ─── Feature row (expandable) ─── */
  .fchp-feature-label {
    cursor: pointer;
    user-select: none;
    font-weight: var(--font-weight-regular);

  }
  .fchp-feature-label:hover {
    background: var(--neutral-background1-hover);
  }
  .fchp-feature-label-content {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .fchp-chevron {
    font-size: var(--font-size-base100);
    transition: transform 0.2s ease;
    color: var(--neutral-foreground2);
    flex-shrink: 0;
  }
  .fchp-chevron.fchp-expanded {
    transform: rotate(90deg);
  }
  .fchp-label-text {
    font-size: var(--font-size-base200);
    line-height: 18px;
  }
  .fchp-label-text.fchp-is-link {
    color: var(--brand-foreground-link);
  }

  /* Checkmark */
  .fchp-check {
    color: var(--success-foreground1);
    font-size: var(--font-size-base300);
  }
  .fchp-dash {
    color: var(--neutral-foreground3);
  }

  /* ─── Explanation row ─── */
  .fchp-explanation-row td {
    padding: 0 16px 16px;
    border-top: none;
    font-size: var(--font-size-base200);
    line-height: 16px;
    color: var(--neutral-foreground2);
    background: var(--neutral-background3);
  }
  .fchp-explanation-row .fchp-label-col {
    background: var(--neutral-background3);
  }

  /* ─── Footer bar ─── */
  .fchp-footer {
    display: flex;
    align-items: center;
    padding: 12px 20px;
    border-top: 1px solid var(--neutral-stroke2);
    background: var(--neutral-background1);
    flex-shrink: 0;
  }
`;
