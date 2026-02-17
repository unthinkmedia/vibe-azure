// @ts-nocheck
/** Scoped styles for this experiment. */
export const styles = `
  body { margin: 0; }
  [slot='main'] {
    min-width: 320px;
    padding: 0;
    background: var(--neutral-background-2);
  }
  .page-header {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 16px 32px 0;
  }
  .resource-title {
    display: flex;
    align-items: center;
    gap: 8px;
    margin: 0;
    font-size: var(--font-size-base-500);
    font-weight: var(--font-weight-semibold);
    color: var(--neutral-foreground-1);
  }
  .resource-subtitle {
    font-size: var(--font-size-base-200);
    color: var(--neutral-foreground-3);
    margin: 0 0 0 32px;
    padding-bottom: 12px;
  }
`;
