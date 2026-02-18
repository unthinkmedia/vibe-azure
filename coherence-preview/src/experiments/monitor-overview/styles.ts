export const styles = `
  body { margin: 0; }
  [slot='main'] {
    min-width: 320px;
    padding: 0;
    background: var(--neutral-background-1);
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  /* ─── Full-width blade header area ─── */
  .monitor-breadcrumb {
    padding: 4px 16px 0;
  }
  .monitor-title-bar {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 4px 16px 2px;
  }
  .monitor-title {
    margin: 0;
    font-size: 20px;
    font-weight: var(--font-weight-regular);
    color: var(--neutral-foreground-1);
  }
  .monitor-title-bold {
    font-weight: var(--font-weight-semibold);
  }
  .monitor-subtitle {
    font-size: var(--font-size-base-100);
    color: var(--neutral-foreground-3);
    margin: 0;
    padding: 0 16px 4px;
  }





  /* Info message bar — blue Azure style for intent="info" */
  cui-message-bar[intent='info'] {
    --message-bar-bg-color: var(--brand-background2);
    --message-bar-icon-fg-color: var(--brand-foreground-link);
    --message-bar-border: 1px solid var(--brand-stroke1);
  }

  /* Tabs */
  .monitor-tabs {
    display: flex;
    gap: 0;
    padding: 0;
    border-bottom: 1px solid var(--neutral-stroke-2);
  }
  .monitor-tab {
    padding: 8px 16px;
    font-size: var(--font-size-base-300);
    font-weight: var(--font-weight-regular);
    color: var(--neutral-foreground-2);
    border: none;
    background: none;
    border-bottom: 2px solid transparent;
    cursor: pointer;
    font-family: inherit;
  }
  .monitor-tab.active {
    color: var(--brand-foreground-link);
    border-bottom-color: var(--brand-foreground-link);
    font-weight: var(--font-weight-semibold);
  }

  /* ─── Body: sidebar + content ─── */
  .monitor-body {
    display: flex;
    flex: 1;
    overflow: hidden;
  }

  /* Collapsible sidebar */
  .monitor-sidebar {
    width: 220px;
    min-width: 220px;
    border-right: 1px solid var(--neutral-stroke-2);
    background: var(--neutral-background-1);
    overflow-y: auto;
    transition: width 0.2s ease, min-width 0.2s ease;
  }
  .monitor-sidebar.collapsed {
    width: 0;
    min-width: 0;
    overflow: hidden;
    border-right: none;
  }

  /* Sidebar toggle */
  .monitor-sidebar-toggle {
    position: absolute;
    top: 8px;
    z-index: 1;
  }

  /* Content area */
  .monitor-content {
    flex: 1;
    overflow-y: auto;
    background: var(--neutral-background-1);
    position: relative;
  }
  .monitor-content-inner {
    padding: 24px 24px;
  }

  /* Card sections */
  .monitor-section {
    margin-bottom: 28px;
  }
  .monitor-section h2 {
    font-size: 18px;
    font-weight: var(--font-weight-semibold);
    color: var(--neutral-foreground-1);
    margin: 0 0 4px;
  }
  .monitor-section > p {
    font-size: var(--font-size-base-200);
    color: var(--neutral-foreground-3);
    margin: 0 0 14px;
  }
  .monitor-section > p a {
    color: var(--brand-foreground-link);
    text-decoration: none;
  }

  /* Card grid */
  .monitor-card-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 12px;
  }
  @media (max-width: 1200px) {
    .monitor-card-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  @media (max-width: 700px) {
    .monitor-card-grid {
      grid-template-columns: 1fr;
    }
  }

  /* Service cards */
  .monitor-service-card {
    --card-padding: 16px;
    min-height: 140px;
  }
  .monitor-card-header {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 8px;
  }
  .monitor-card-icon {
    width: 28px;
    height: 28px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  .monitor-card-title {
    font-weight: var(--font-weight-semibold);
    font-size: var(--font-size-base-300);
    color: var(--neutral-foreground-1);
  }
  .monitor-card-desc {
    font-size: var(--font-size-base-200);
    color: var(--neutral-foreground-2);
    margin: 0;
    line-height: 1.5;
  }
  .monitor-card-actions {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 12px;
  }
`;
