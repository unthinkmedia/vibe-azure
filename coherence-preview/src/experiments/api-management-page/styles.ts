export const styles = `
  body { margin: 0; }
  [slot='main'] {
    min-width: 320px;
    padding: 0;
    background: var(--neutral-background-2);
  }
  .apim-page-header {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 16px 32px 0;
  }
  .apim-resource-title {
    display: flex;
    align-items: center;
    gap: 8px;
    margin: 0;
    font-size: var(--font-size-base-500);
    font-weight: var(--font-weight-semibold);
    color: var(--neutral-foreground-1);
  }
  .apim-resource-subtitle {
    font-size: var(--font-size-base-200);
    color: var(--neutral-foreground-3);
    margin: 0 0 0 32px;
    padding-bottom: 8px;
  }
  .apim-header-links {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 0 32px 12px;
    font-size: var(--font-size-base-200);
  }
  .essentials-panel {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0;
    background: var(--neutral-background-1);
    border: 1px solid var(--neutral-stroke-2);
    border-radius: var(--border-radius-md);
    padding: 20px 24px;
  }
  .essentials-column {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  .essentials-column + .essentials-column {
    border-left: 1px solid var(--neutral-stroke-2);
    padding-left: 24px;
  }
  .essentials-row {
    display: flex;
    gap: 8px;
    font-size: var(--font-size-base-200);
    line-height: 1.4;
  }
  .essentials-label {
    color: var(--neutral-foreground-3);
    min-width: 140px;
    flex-shrink: 0;
  }
  .essentials-value {
    color: var(--neutral-foreground-1);
    word-break: break-all;
  }
  .essentials-value a {
    color: var(--brand-foreground-link);
    text-decoration: none;
  }
  .essentials-value a:hover {
    text-decoration: underline;
  }
  .section-heading {
    font-size: var(--font-size-base-400);
    font-weight: var(--font-weight-semibold);
    color: var(--neutral-foreground-1);
    margin: 0 0 16px;
  }
  .tags-row {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
  }
  .apim-table {
    width: 100%;
    border-collapse: collapse;
    font-size: var(--font-size-base-200);
    background: var(--neutral-background-1);
    border: 1px solid var(--neutral-stroke-2);
    border-radius: var(--border-radius-md);
    overflow: hidden;
  }
  .apim-table th {
    text-align: left;
    padding: 10px 16px;
    font-weight: var(--font-weight-semibold);
    color: var(--neutral-foreground-2);
    background: var(--neutral-background-3);
    border-bottom: 1px solid var(--neutral-stroke-2);
  }
  .apim-table td {
    padding: 10px 16px;
    color: var(--neutral-foreground-1);
    border-bottom: 1px solid var(--neutral-stroke-2);
  }
  .apim-table tr:last-child td {
    border-bottom: none;
  }
  .apim-table tr:hover td {
    background: var(--subtle-background-hover);
  }
  .api-name-link {
    color: var(--brand-foreground-link);
    text-decoration: none;
    font-weight: var(--font-weight-semibold);
  }
  .api-name-link:hover {
    text-decoration: underline;
  }
  .stat-cards {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
    margin-bottom: 32px;
  }
  .stat-card {
    --card-padding: 16px;
  }
  .stat-value {
    font-size: var(--font-size-hero-700);
    font-weight: var(--font-weight-semibold);
    color: var(--neutral-foreground-1);
    line-height: 1;
    margin-bottom: 4px;
  }
  .stat-label {
    font-size: var(--font-size-base-200);
    color: var(--neutral-foreground-3);
  }
`;
