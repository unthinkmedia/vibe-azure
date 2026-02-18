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
  .form-section {
    padding: 24px 32px;
    max-width: 640px;
  }
  .form-section h3 {
    font-size: var(--font-size-base400);
    font-weight: var(--font-weight-semi-bold);
    color: var(--neutral-foreground1);
    margin: 0 0 16px;
  }
  .field-row {
    display: flex;
    gap: 16px;
    margin-bottom: 16px;
  }
  .field-row > * { flex: 1; }
  .field-single { margin-bottom: 16px; }
  .form-actions {
    display: flex;
    gap: 12px;
    padding: 16px 32px;
    border-top: 1px solid var(--neutral-stroke2);
    background: var(--neutral-background1);
  }
`;
