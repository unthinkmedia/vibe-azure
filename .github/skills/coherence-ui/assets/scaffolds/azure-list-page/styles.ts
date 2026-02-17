// @ts-nocheck
/** Scoped styles for this experiment. */
export const styles = `
  body { margin: 0; }
  [slot='main'] {
    min-width: 320px;
    padding: 0;
    background: var(--neutral-background-2);
  }

  /* Two-column layout */
  .list-layout {
    display: flex;
    height: 100%;
  }
  .list-panel {
    width: 260px;
    min-width: 220px;
    border-right: 1px solid var(--neutral-stroke-2);
    background: var(--neutral-background-1);
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

  /* Page header */
  .page-header {
    display: flex;
    align-items: center;
    gap: 8px;
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
    padding-bottom: 8px;
  }

  /* List panel items */
  .list-heading {
    font-size: var(--font-size-base-300);
    font-weight: var(--font-weight-semibold);
    color: var(--neutral-foreground-1);
    margin: 8px 0 4px;
  }
  .list-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 6px 8px;
    border-radius: var(--border-radius-md);
    font-size: var(--font-size-base-300);
    color: var(--neutral-foreground-1);
    cursor: pointer;
  }
  .list-item:hover {
    background: var(--subtle-background-hover);
  }
`;
