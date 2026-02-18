/** Scoped styles for the Access Control (IAM) experiment. */
export const styles = `
  body { margin: 0; }
  [slot='main'] {
    min-width: 320px;
    padding: 0;
    background: var(--neutral-background2);
  }
  .iam-content {
    padding: 24px 32px;
  }
  .iam-page-header {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 16px 32px 0;
  }
  .iam-resource-title {
    display: flex;
    align-items: center;
    gap: 8px;
    margin: 0;
    font-size: var(--font-size-base500);
    font-weight: var(--font-weight-semi-bold);
    color: var(--neutral-foreground1);
  }
  .iam-resource-subtitle {
    font-size: var(--font-size-base200);
    color: var(--neutral-foreground3);
    margin: 0 0 0 32px;
    padding-bottom: 12px;
  }
  .section-card {
    flex: 1 1 300px;
    min-width: 280px;
    max-width: 420px;
  }
  .card-grid {
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
    margin-top: 20px;
  }
`;
