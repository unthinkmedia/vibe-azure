// @ts-nocheck
/**
 * Combined styles for all pages in this multi-page flow.
 * Organized by page section so you can find/edit styles for each page easily.
 */
export const styles = `
  body { margin: 0; }
  [slot='main'] {
    min-width: 320px;
    padding: 0;
    background: var(--neutral-background2);
  }

  /* ─── Browse page ─── */
  .command-bar {
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 8px 24px;
    border-bottom: 1px solid var(--neutral-stroke2);
    flex-wrap: wrap;
  }
  .empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 80px 24px;
    text-align: center;
  }
  .empty-state h2 {
    margin: 0 0 8px;
    font-size: var(--font-size-base400);
    font-weight: var(--font-weight-semi-bold);
    color: var(--neutral-foreground1);
  }
  .empty-state p {
    margin: 0 0 24px;
    font-size: var(--font-size-base300);
    color: var(--neutral-foreground3);
    max-width: 480px;
  }

  /* ─── Create page ─── */
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
  .field-single {
    margin-bottom: 16px;
    max-width: 400px;
  }
  .field-row {
    display: flex;
    gap: 16px;
    margin-bottom: 16px;
  }
  .field-row > * { flex: 1; }
  .form-actions {
    display: flex;
    gap: 12px;
    padding: 16px 32px;
    border-top: 1px solid var(--neutral-stroke2);
    background: var(--neutral-background1);
    position: sticky;
    bottom: 0;
  }
  .close-button {
    position: absolute;
    top: 16px;
    right: 24px;
  }

  /* ─── Detail page ─── */
  .section-heading {
    font-size: var(--font-size-base400);
    font-weight: var(--font-weight-semi-bold);
    color: var(--neutral-foreground1);
    margin: 0 0 16px;
  }
  /* TODO: Add page-specific styles here */
`;
