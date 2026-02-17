export const styles = `
  body { margin: 0; }
  [slot='main'] {
    min-width: 320px;
    padding: 0;
    background: var(--neutral-background-2);
  }

  /* ─── Two-column layout: API list panel + main content ─── */
  .apis-layout {
    display: flex;
    height: 100%;
  }
  .apis-list-panel {
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
  .apis-main-content {
    flex: 1;
    padding: 24px 32px;
    overflow-y: auto;
  }

  /* ─── Page header ─── */
  .apis-page-header {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 16px 32px 0;
  }
  .apis-resource-title {
    display: flex;
    align-items: center;
    gap: 8px;
    margin: 0;
    font-size: var(--font-size-base-500);
    font-weight: var(--font-weight-semibold);
    color: var(--neutral-foreground-1);
  }
  .apis-resource-subtitle {
    font-size: var(--font-size-base-200);
    color: var(--neutral-foreground-3);
    margin: 0 0 0 32px;
    padding-bottom: 8px;
  }
  .apis-header-links {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 0 32px 12px;
    font-size: var(--font-size-base-200);
  }

  /* ─── API list panel items ─── */
  .api-list-heading {
    font-size: var(--font-size-base-300);
    font-weight: var(--font-weight-semibold);
    color: var(--neutral-foreground-1);
    margin: 8px 0 4px;
  }
  .api-list-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 6px 8px;
    border-radius: var(--border-radius-md);
    font-size: var(--font-size-base-300);
    color: var(--neutral-foreground-1);
    cursor: pointer;
  }
  .api-list-item:hover {
    background: var(--subtle-background-hover);
  }

  /* ─── Card grid sections ─── */
  .api-section-title {
    font-size: var(--font-size-base-500);
    font-weight: var(--font-weight-semibold);
    color: var(--neutral-foreground-1);
    margin: 0 0 16px;
  }
  .api-card-grid {
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
    margin-bottom: 32px;
  }
  .api-card {
    width: 200px;
    min-width: 180px;
    cursor: pointer;
    position: relative;
    --card-padding: 0;
    --card-content-gap: 0;
  }
  .api-card-icon-area {
    height: 120px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--border-radius-md) var(--border-radius-md) 0 0;
    position: relative;
  }
  .api-card-icon-area svg,
  .api-card-icon-area img {
    width: 48px;
    height: 48px;
  }
  .api-card-icon-area .new-badge {
    position: absolute;
    top: 8px;
    right: 8px;
  }
  .api-card-body {
    padding: 12px;
  }
  .api-card-title {
    font-size: var(--font-size-base-300);
    font-weight: var(--font-weight-semibold);
    color: var(--neutral-foreground-1);
    margin: 0 0 4px;
  }
  .api-card-desc {
    font-size: var(--font-size-base-200);
    color: var(--neutral-foreground-3);
    margin: 0;
    line-height: 1.4;
  }

  /* Icon area color themes */
  .bg-teal { background: linear-gradient(135deg, #0e7a6e 0%, #14967a 100%); }
  .bg-purple { background: linear-gradient(135deg, #5c2d91 0%, #7b3fb5 100%); }
  .bg-blue { background: linear-gradient(135deg, #0063b1 0%, #007acc 100%); }
  .bg-pink { background: linear-gradient(135deg, #c4237b 0%, #e3308a 100%); }
  .bg-orange { background: linear-gradient(135deg, #ca5010 0%, #e06a23 100%); }
  .bg-darkblue { background: linear-gradient(135deg, #003f6e 0%, #005a9a 100%); }
`;
