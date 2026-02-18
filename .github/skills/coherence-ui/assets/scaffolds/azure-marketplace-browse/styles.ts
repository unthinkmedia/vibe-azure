// @ts-nocheck
export const styles = `
  body { margin: 0; }

  /* ─── Page Layout ─── */
  .create-resource-page {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  /* ─── Breadcrumb + Title Area ─── */
  .page-header-area {
    padding: 16px 24px 0;
    background: var(--neutral-background1);
  }

  .page-breadcrumb {
    font-size: var(--font-size-base200);
    color: var(--neutral-foreground3);
    margin: 0 0 8px;
  }

  .page-header-bar {
    padding-bottom: 8px;
  }

  /* ─── Body Layout ─── */
  .page-body {
    display: flex;
    flex: 1;
    min-height: 0;
    background: var(--neutral-background1);
  }

  /* ─── Categories Sidebar ─── */
  .categories-sidebar {
    width: 200px;
    min-width: 200px;
    padding: 12px 0 24px 24px;
    overflow-y: auto;
  }

  .category-link {
    display: block;
    padding: 4px 12px;
    font-size: var(--font-size-base300);
    color: var(--neutral-foreground2);
    text-decoration: none;
    cursor: pointer;
    border-radius: 4px;
    line-height: 1.6;
  }

  .category-link:hover {
    background: var(--subtle-background-hover);
    color: var(--neutral-foreground1);
  }

  .category-link.active {
    font-weight: 600;
    color: var(--neutral-foreground1);
    background: var(--subtle-background-selected);
  }

  .category-heading {
    font-size: var(--font-size-base200);
    font-weight: 600;
    color: var(--neutral-foreground3);
    padding: 12px 12px 8px;
    margin: 0;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    border-bottom: 1px solid var(--neutral-stroke1);
    margin-right: 12px;
    margin-bottom: 4px;
  }

  /* ─── Main Content ─── */
  .content-area {
    flex: 1;
    padding: 16px 32px 32px;
    overflow-y: auto;
  }

  .search-row {
    display: flex;
    align-items: center;
    gap: 16px;
    margin: 0 0 24px;
  }

  .search-row cui-search-box {
    max-width: 400px;
    flex: 1;
  }

  .quickstart-link {
    font-size: var(--font-size-base200);
    color: var(--neutral-foreground3);
  }

  .quickstart-link a {
    color: var(--brand-foreground-link);
    text-decoration: none;
  }

  .quickstart-link a:hover {
    text-decoration: underline;
  }

  /* ─── Columns ─── */
  .columns-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 48px;
  }

  @media (max-width: 960px) {
    .columns-container {
      grid-template-columns: 1fr;
      gap: 32px;
    }
  }

  .column-header {
    display: flex;
    align-items: baseline;
    gap: 12px;
    padding-bottom: 12px;
    margin: 0 0 4px;
    border-bottom: 1px solid var(--neutral-stroke1);
  }

  .column-title {
    font-size: var(--font-size-base400);
    font-weight: 600;
    color: var(--neutral-foreground1);
    margin: 0;
  }

  .column-see-more {
    font-size: var(--font-size-base200);
    color: var(--brand-foreground-link);
    text-decoration: none;
    cursor: pointer;
  }

  .column-see-more:hover {
    text-decoration: underline;
  }

  /* ─── Service Row ─── */
  .service-list {
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  .service-row {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 10px 0;
  }

  .service-icon {
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .service-icon img {
    width: 32px;
    height: 32px;
  }

  .service-info {
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-width: 0;
  }

  .service-name {
    font-size: var(--font-size-base300);
    font-weight: 600;
    color: var(--neutral-foreground1);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .service-actions {
    display: flex;
    gap: 8px;
  }

  .service-actions a {
    font-size: var(--font-size-base200);
    color: var(--brand-foreground-link);
    text-decoration: none;
    cursor: pointer;
  }

  .service-actions a:hover {
    text-decoration: underline;
  }

  .service-actions .separator {
    color: var(--neutral-foreground4);
    font-size: var(--font-size-base200);
  }

  /* ─── Marketplace Row ─── */
  .marketplace-row {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 8px 0;
  }

  .marketplace-icon {
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    border-radius: 4px;
  }

  .marketplace-icon img {
    width: 32px;
    height: 32px;
  }

  .marketplace-info {
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-width: 0;
    flex: 1;
  }

  .marketplace-name {
    font-size: var(--font-size-base300);
    color: var(--neutral-foreground1);
    line-height: 1.3;
  }

  /* ─── Feedback Link ─── */
  .feedback-link {
    position: fixed;
    bottom: 12px;
    right: 16px;
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: var(--font-size-base200);
    color: var(--neutral-foreground3);
    cursor: pointer;
    text-decoration: none;
    z-index: 10;
  }

  .feedback-link:hover {
    color: var(--brand-foreground-link);
  }
`;
