// @ts-nocheck
/** Scoped styles for this experiment. */
export const styles = `
  body { margin: 0; }
  [slot='main'] {
    min-width: 320px;
    padding: 0;
    background: var(--neutral-background2);
  }
  /* Page header styles are provided by the shared PageHeader component */
  .content-area {
    padding: 24px 32px;
  }

  /* Essentials panel */
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
  }
  .essentials-value a {
    color: var(--brand-foreground-link);
    text-decoration: none;
  }

  /* Card sections */
  .section-title {
    font-size: var(--font-size-base400);
    font-weight: var(--font-weight-semi-bold);
    color: var(--neutral-foreground1);
    margin: 0 0 12px;
  }
  .card-row {
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
    margin-bottom: 24px;
  }
  .overview-card {
    flex: 1 1 280px;
    min-width: 260px;
    max-width: 400px;
  }
`;
