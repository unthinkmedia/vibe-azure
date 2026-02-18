// @ts-nocheck
/** Scoped styles for this experiment. */
export const styles = `
  body { margin: 0; }
  [slot='main'] {
    min-width: 320px;
    padding: 0;
    background: var(--neutral-background2);
  }

  /* Two-column layout */
  .list-layout {
    display: flex;
    height: 100%;
  }
  .list-panel {
    width: 260px;
    min-width: 220px;
    border-right: 1px solid var(--neutral-stroke2);
    background: var(--neutral-background1);
    padding: 12px 16px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    overflow-y: auto;
  }
  .main-content {
    flex: 1;
    padding: 24px 32px;
    overflow-y: auto;
  }

  /* Page header styles are provided by the shared PageHeader component */

  /* List panel items */
  .list-heading {
    font-size: var(--font-size-base300);
    font-weight: var(--font-weight-semi-bold);
    color: var(--neutral-foreground1);
    margin: 8px 0 4px;
  }
  .list-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 6px 8px;
    border-radius: var(--border-radius-md);
    font-size: var(--font-size-base300);
    color: var(--neutral-foreground1);
    cursor: pointer;
  }
  .list-item:hover {
    background: var(--subtle-background-hover);
  }
`;
