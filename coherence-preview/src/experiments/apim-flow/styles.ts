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
  .filter-bar {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px 24px;
    flex-wrap: wrap;
  }
  .filter-input {
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 4px 10px;
    border-radius: 4px;
    border: 1px solid var(--neutral-stroke2);
    background: var(--neutral-background1);
    font-size: 13px;
    color: var(--neutral-foreground3);
    min-width: 140px;
  }
  .filter-pill {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 4px 10px;
    border-radius: 4px;
    background: var(--brand-background2);
    color: var(--brand-foreground-link);
    font-size: 13px;
    font-weight: 600;
    white-space: nowrap;
  }
  .filter-pill-remove {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 16px;
    height: 16px;
    border: none;
    background: none;
    color: var(--brand-foreground-link);
    cursor: pointer;
    font-size: 14px;
    padding: 0;
    line-height: 1;
  }
  .add-filter {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 4px 10px;
    border: 1px dashed var(--neutral-stroke2);
    border-radius: 4px;
    background: none;
    color: var(--neutral-foreground2);
    font-size: 13px;
    cursor: pointer;
  }
  .empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 80px 24px;
    text-align: center;
  }
  .empty-state-icon {
    width: 120px;
    height: 120px;
    margin-bottom: 24px;
    opacity: 0.5;
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
  .browse-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 24px;
    border-top: 1px solid var(--neutral-stroke2);
    font-size: 13px;
    color: var(--neutral-foreground3);
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: var(--neutral-background1);
  }
  .group-by {
    display: flex;
    align-items: center;
    gap: 4px;
    margin-left: auto;
    font-size: 13px;
    color: var(--neutral-foreground2);
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
  .field-row {
    display: flex;
    gap: 16px;
    margin-bottom: 16px;
  }
  .field-row > * { flex: 1; }
  .field-single {
    margin-bottom: 16px;
    max-width: 400px;
  }
  .field-wide {
    margin-bottom: 16px;
  }
  .form-actions {
    display: flex;
    gap: 12px;
    padding: 16px 32px;
    border-top: 1px solid var(--neutral-stroke2);
    background: var(--neutral-background1);
    position: sticky;
    bottom: 0;
  }
  .create-new-link {
    font-size: 13px;
    color: var(--brand-foreground-link);
    text-decoration: none;
    cursor: pointer;
    margin-top: -8px;
    margin-bottom: 16px;
    display: inline-block;
  }
  .create-new-link:hover {
    text-decoration: underline;
  }
  .pricing-description {
    font-size: var(--font-size-base300);
    color: var(--neutral-foreground2);
    line-height: 1.5;
    margin: 0 0 16px;
    max-width: 560px;
  }
  .learn-more-link {
    color: var(--brand-foreground-link);
    text-decoration: none;
    font-size: 13px;
  }
  .learn-more-link:hover {
    text-decoration: underline;
  }
  .pricing-note {
    font-size: var(--font-size-base300);
    color: var(--neutral-foreground2);
    margin-top: 16px;
    line-height: 1.5;
  }
  .close-button {
    position: absolute;
    top: 16px;
    right: 24px;
  }

  /* ─── Overview page ─── */
  .apim-header-links {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 0 32px 12px;
    font-size: var(--font-size-base200);
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
    min-width: 140px;
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
  .apim-table {
    width: 100%;
    border-collapse: collapse;
    font-size: var(--font-size-base200);
    background: var(--neutral-background1);
    border: 1px solid var(--neutral-stroke2);
    border-radius: var(--border-radius-md);
    overflow: hidden;
  }
  .apim-table th {
    text-align: left;
    padding: 10px 16px;
    font-weight: var(--font-weight-semi-bold);
    color: var(--neutral-foreground2);
    background: var(--neutral-background3);
    border-bottom: 1px solid var(--neutral-stroke2);
  }
  .apim-table td {
    padding: 10px 16px;
    color: var(--neutral-foreground1);
    border-bottom: 1px solid var(--neutral-stroke2);
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
    font-weight: var(--font-weight-semi-bold);
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
    font-size: var(--font-size-hero700);
    font-weight: var(--font-weight-semi-bold);
    color: var(--neutral-foreground1);
    line-height: 1;
    margin-bottom: 4px;
  }
  .stat-label {
    font-size: var(--font-size-base200);
    color: var(--neutral-foreground3);
  }
`;
