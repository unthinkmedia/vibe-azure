/**
 * Shared CSS for Azure portal scaffolds.
 *
 * Reusable style blocks exported as template literal strings.
 * Import and include in your scaffold's <style> tag:
 *
 *   import { toolbarNoWrapStyles } from './scaffold-styles';
 *   <style>{`${toolbarNoWrapStyles} ... your styles ...`}</style>
 */

/** Prevents toolbar buttons from wrapping text (::part pierces shadow DOM). */
export const toolbarNoWrapStyles = `
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
`;

/** Blue info message bar override — Coherence intent="info" is grey by default. */
export const infoMessageBarStyles = `
  cui-message-bar[intent='info'] {
    --message-bar-bg-color: var(--brand-background2);
    --message-bar-icon-fg-color: var(--brand-foreground-link);
    --message-bar-border: 1px solid var(--brand-stroke1);
  }
`;

/** Custom tab bar that matches Azure portal service page tabs. */
export const bladeTabStyles = `
  .blade-tabs {
    display: flex;
    gap: 0;
    padding: 0;
    border-bottom: 1px solid var(--neutral-stroke2);
  }
  .blade-tab {
    padding: 8px 16px;
    font-size: var(--font-size-base300);
    font-weight: var(--font-weight-regular);
    color: var(--neutral-foreground2);
    border: none;
    background: none;
    border-bottom: 2px solid transparent;
    cursor: pointer;
    font-family: inherit;
  }
  .blade-tab.active {
    color: var(--brand-foreground-link);
    border-bottom-color: var(--brand-foreground-link);
    font-weight: var(--font-weight-semi-bold);
  }
`;
