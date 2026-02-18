export const styles = `
  body { margin: 0; }

  [slot='main'] {
    min-width: 320px;
    padding: 0;
    background: var(--neutral-background2);
  }

  .kv-page-header {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 16px 32px 0;
  }

  .kv-resource-title {
    display: flex;
    align-items: center;
    gap: 8px;
    margin: 0;
    font-size: var(--font-size-base500);
    font-weight: var(--font-weight-semi-bold);
    color: var(--neutral-foreground1);
  }

  .kv-resource-subtitle {
    font-size: var(--font-size-base200);
    color: var(--neutral-foreground3);
    margin: 0 0 0 32px;
    padding-bottom: 12px;
  }

  .essentials-panel {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0;
    background: var(--neutral-background1);
    border: 1px solid var(--neutral-stroke2);
    border-radius: var(--border-radius-md);
    padding: 20px 24px;
  }

  .essentials-column {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .essentials-column + .essentials-column {
    border-left: 1px solid var(--neutral-stroke2);
    padding-left: 24px;
  }

  .essentials-row {
    display: flex;
    gap: 8px;
    font-size: var(--font-size-base200);
    line-height: 1.4;
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

  .secrets-table {
    width: 100%;
    border-collapse: collapse;
    font-size: var(--font-size-base200);
    background: var(--neutral-background1);
    border: 1px solid var(--neutral-stroke2);
    border-radius: var(--border-radius-md);
    overflow: hidden;
  }

  .secrets-table th {
    text-align: left;
    padding: 10px 16px;
    font-weight: var(--font-weight-semi-bold);
    color: var(--neutral-foreground2);
    background: var(--neutral-background3);
    border-bottom: 1px solid var(--neutral-stroke2);
  }

  .secrets-table td {
    padding: 10px 16px;
    color: var(--neutral-foreground1);
    border-bottom: 1px solid var(--neutral-stroke2);
  }

  .secrets-table tr:last-child td {
    border-bottom: none;
  }

  .secrets-table tr:hover td {
    background: var(--subtle-background-hover);
  }

  .secret-name-link {
    color: var(--brand-foreground-link);
    text-decoration: none;
    font-weight: var(--font-weight-semi-bold);
  }

  .secret-name-link:hover {
    text-decoration: underline;
  }

  .section-heading {
    font-size: var(--font-size-base400);
    font-weight: var(--font-weight-semi-bold);
    color: var(--neutral-foreground1);
    margin: 0 0 16px;
  }

  .tags-row {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
  }
`;
