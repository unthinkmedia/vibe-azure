export const styles = `
  body { margin: 0; }

  /* ─── Layout ─── */
  [slot='main'] {
    min-width: 320px;
    padding: 0;
    background: var(--neutral-background2);
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  /* ─── Body: sidebar + content ─── */
  .blade-body {
    display: flex;
    flex: 1;
    overflow: hidden;
  }

  /* Collapsible sidebar */
  .blade-sidebar {
    width: 220px;
    min-width: 220px;
    border-right: 1px solid var(--neutral-stroke2);
    background: var(--neutral-background1);
    overflow-y: auto;
    transition: width 0.2s ease, min-width 0.2s ease;
  }
  .blade-sidebar.collapsed {
    width: 0;
    min-width: 0;
    overflow: hidden;
    border-right: none;
  }

  /* Toggle strip — thin column between sidebar and content */
  .blade-toggle-strip {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 28px;
    min-width: 28px;
    padding-top: 8px;
    background: var(--neutral-background2);
    border-right: 1px solid var(--neutral-stroke2);
  }

  /* Content area */
  .blade-content {
    flex: 1;
    overflow: hidden;
    background: var(--neutral-background2);
    display: flex;
    flex-direction: row;
  }

  /* ─── Toolbar no-wrap ─── */
  cui-toolbar {
    flex-wrap: nowrap;
  }
  cui-toolbar cui-button,
  cui-toolbar cui-menu cui-button {
    white-space: nowrap;
  }
  cui-toolbar cui-button::part(button-control),
  cui-toolbar cui-menu cui-button::part(button-control) {
    white-space: nowrap;
    flex-wrap: nowrap;
  }

  /* ─── Designer Canvas ─── */
  .designer-toolbar {
    padding: 0 16px;
    border-bottom: 1px solid var(--neutral-stroke2);
    background: var(--neutral-background1);
  }
  .designer-view-toggle {
    display: flex;
    gap: 0;
    margin-left: auto;
  }
  .designer-view-toggle button {
    border-radius: 0;
  }
  .canvas-container {
    flex: 1;
    overflow: auto;
    background: var(--neutral-background3);
    position: relative;
  }
  .canvas-grid {
    background-image:
      radial-gradient(circle, var(--neutral-stroke3) 1px, transparent 1px);
    background-size: 20px 20px;
    min-height: 100%;
    min-width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 40px 20px 80px;
  }

  /* ─── Workflow Nodes ─── */
  .workflow-node {
    width: 340px;
    background: var(--neutral-background1);
    border: 1.5px solid var(--neutral-stroke2);
    border-radius: var(--border-radius-lg);
    overflow: visible;
    box-shadow: var(--shadow4);
    cursor: pointer;
    transition: border-color 0.15s, box-shadow 0.15s, outline-color 0.15s;
    outline: 2px solid transparent;
    outline-offset: 1px;
  }
  .workflow-node:hover {
    border-color: var(--brand-stroke1);
    box-shadow: var(--shadow8);
  }
  .workflow-node:active {
    border-color: var(--brand-stroke1);
    outline: 2px solid var(--brand-stroke1);
  }
  .workflow-node.selected {
    border-color: var(--brand-stroke1);
    outline: 2px solid var(--brand-stroke1);
    box-shadow: var(--shadow8);
  }
  .workflow-node.trigger .node-header {
    background: var(--neutral-background1);
    border-bottom: 1px solid var(--neutral-stroke2);
  }
  .workflow-node.action .node-header {
    background: var(--neutral-background1);
    border-bottom: 1px solid var(--neutral-stroke2);
  }
  .workflow-node.condition .node-header {
    background: var(--neutral-background1);
    border-bottom: 1px solid var(--neutral-stroke2);
  }
  .node-header {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 14px;
  }
  .node-icon {
    width: 28px;
    height: 28px;
    border-radius: var(--border-radius-md);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  .trigger .node-icon {
    background: var(--brand-background1);
    color: white;
  }
  .action .node-icon {
    background: var(--neutral-background4);
  }
  .condition .node-icon {
    background: #4285f4;
    color: white;
  }
  .node-title {
    flex: 1;
    min-width: 0;
  }
  .node-title-text {
    font-size: var(--font-size-base300);
    font-weight: var(--font-weight-semi-bold);
    color: var(--neutral-foreground1);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .node-subtitle {
    font-size: var(--font-size-base100);
    color: var(--neutral-foreground3);
  }
  .node-status {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    flex-shrink: 0;
  }
  .node-status.success { background: var(--status-success-foreground1); }
  .node-status.failed { background: var(--status-danger-foreground1); }
  .node-status.running { background: var(--status-warning-foreground1); animation: pulse 1.5s infinite; }
  .node-status.pending { background: var(--neutral-foreground4); }
  .node-status.skipped { background: var(--neutral-foreground4); }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.4; }
  }

  .node-body {
    padding: 12px 14px;
    font-size: var(--font-size-base200);
    color: var(--neutral-foreground2);
  }
  .node-config-row {
    display: flex;
    gap: 8px;
    padding: 3px 0;
  }
  .node-config-label {
    color: var(--neutral-foreground3);
    font-weight: var(--font-weight-semi-bold);
    min-width: 80px;
    flex-shrink: 0;
  }
  .node-config-value {
    color: var(--neutral-foreground1);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .node-collapse-btn {
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 6px 14px;
    font-size: var(--font-size-base100);
    color: var(--brand-foreground-link);
    cursor: pointer;
    border: none;
    background: none;
  }
  .node-collapse-btn:hover {
    text-decoration: underline;
  }

  /* ─── Connector Lines ─── */
  .connector-line {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    height: 48px;
  }
  .connector-line .line {
    width: 2px;
    flex: 1;
    background: var(--neutral-stroke1);
  }
  .connector-add-btn {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 24px;
    height: 24px;
    border-radius: 50%;
    border: 2px solid var(--neutral-stroke1);
    background: var(--neutral-background1);
    color: var(--neutral-foreground2);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 16px;
    font-weight: bold;
    transition: all 0.15s;
    z-index: 1;
    padding: 0;
    line-height: 1;
  }
  .connector-add-btn:hover {
    border-color: var(--brand-stroke1);
    color: var(--brand-foreground1);
    background: var(--brand-background2);
    box-shadow: var(--shadow4);
  }

  /* ─── Condition Branch ─── */
  .condition-branch-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
  .branch-lanes {
    display: flex;
    gap: 40px;
    justify-content: center;
    position: relative;
    width: 100%;
  }
  .branch-lane {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 340px;
  }
  .branch-label {
    font-size: var(--font-size-base200);
    font-weight: var(--font-weight-semi-bold);
    color: var(--neutral-foreground2);
    padding: 4px 16px;
    border-radius: var(--border-radius-md);
    background: var(--neutral-background1);
    border: 1px solid var(--neutral-stroke2);
    margin-bottom: 0;
  }
  .branch-label.true-branch {
    color: var(--status-success-foreground1);
    border-color: var(--status-success-foreground1);
  }
  .branch-label.false-branch {
    color: var(--status-danger-foreground1);
    border-color: var(--status-danger-foreground1);
  }

  /* ─── Branch Connector SVG ─── */
  .branch-connector-svg {
    width: 100%;
    height: 40px;
    overflow: visible;
  }
  .branch-merge-svg {
    width: 100%;
    height: 40px;
    overflow: visible;
  }

  /* ─── Canvas Tools (bottom-left) ─── */
  .canvas-tools {
    position: absolute;
    bottom: 16px;
    left: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0;
    background: var(--neutral-background1);
    border: 1px solid var(--neutral-stroke2);
    border-radius: var(--border-radius-md);
    padding: 0;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.14), 0 0 2px rgba(0, 0, 0, 0.12);
    width: 44px;
    overflow: hidden;
  }
  .canvas-tools cui-button {
    width: 44px;
    height: 45px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .canvas-tools cui-button::part(button-control) {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0;
  }
  .canvas-tools-divider {
    width: 100%;
    height: 1px;
    background: var(--neutral-stroke2);
    flex-shrink: 0;
  }

  /* ─── Config Panel (side) ─── */
  .config-panel {
    width: 360px;
    border-left: 1px solid var(--neutral-stroke2);
    background: var(--neutral-background1);
    overflow-y: auto;
    display: flex;
    flex-direction: column;
  }
  .config-panel-header {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 14px 16px;
    border-bottom: 1px solid var(--neutral-stroke2);
  }
  .config-panel-title {
    font-size: var(--font-size-base400);
    font-weight: var(--font-weight-semi-bold);
    color: var(--neutral-foreground1);
    flex: 1;
  }
  .config-panel-body {
    padding: 16px;
    flex: 1;
  }
  .config-field {
    margin-bottom: 16px;
  }
  .config-field label {
    display: block;
    font-size: var(--font-size-base200);
    font-weight: var(--font-weight-semi-bold);
    color: var(--neutral-foreground2);
    margin-bottom: 4px;
  }
`;
