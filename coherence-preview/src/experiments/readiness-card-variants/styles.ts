export const styles = `
  body { margin: 0; }

  .variants-page {
    padding: 32px;
    background: var(--neutral-background2);
    min-height: 100vh;
  }
  .variants-page h1 {
    font-size: var(--font-size-base500);
    font-weight: var(--font-weight-semi-bold);
    color: var(--neutral-foreground1);
    margin: 0 0 4px;
  }
  .variants-page .subtitle {
    font-size: var(--font-size-base200);
    color: var(--neutral-foreground3);
    margin: 0 0 28px;
  }
  .variants-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
  }

  /* ───────────────────────────────────────
     Shared card base
  ─────────────────────────────────────── */
  .variant-label {
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: var(--neutral-foreground3);
    margin-bottom: 8px;
  }

  /* ───────────────────────────────────────
     Variant 1: Donut Gauge
  ─────────────────────────────────────── */
  .v1-body {
    display: flex;
    gap: 24px;
    align-items: center;
  }
  .v1-donut-wrap {
    position: relative;
    width: 100px;
    height: 100px;
    flex-shrink: 0;
  }
  .v1-donut-wrap svg {
    transform: rotate(-90deg);
  }
  .v1-donut-center {
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    pointer-events: none;
  }
  .v1-donut-value {
    font-size: 28px;
    font-weight: 700;
    line-height: 1;
  }
  .v1-donut-max {
    font-size: 11px;
    color: var(--neutral-foreground3);
  }
  .v1-cats {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  .v1-cat-row {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: var(--font-size-base200);
  }
  .v1-cat-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    flex-shrink: 0;
  }
  .v1-cat-label {
    flex: 1;
    color: var(--neutral-foreground1);
  }
  .v1-cat-score {
    font-weight: 600;
    font-variant-numeric: tabular-nums;
  }

  /* ───────────────────────────────────────
     Variant 2: Horizontal Bars
  ─────────────────────────────────────── */
  .v2-hero {
    display: flex;
    align-items: baseline;
    gap: 6px;
    margin-bottom: 16px;
  }
  .v2-hero-value {
    font-size: 40px;
    font-weight: 700;
    line-height: 1;
  }
  .v2-hero-max {
    font-size: 16px;
    color: var(--neutral-foreground3);
    font-weight: 400;
  }
  .v2-bars {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .v2-bar-row {
    display: flex;
    flex-direction: column;
    gap: 3px;
  }
  .v2-bar-header {
    display: flex;
    justify-content: space-between;
    font-size: var(--font-size-base200);
  }
  .v2-bar-label {
    color: var(--neutral-foreground1);
  }
  .v2-bar-score {
    font-weight: 600;
    font-variant-numeric: tabular-nums;
  }
  .v2-bar-track {
    height: 6px;
    border-radius: 3px;
    background: var(--neutral-background5);
    overflow: hidden;
  }
  .v2-bar-fill {
    height: 100%;
    border-radius: 3px;
    transition: width 0.4s ease;
  }

  /* ───────────────────────────────────────
     Variant 3: Gradient Hero Score
  ─────────────────────────────────────── */
  .v3-hero-area {
    text-align: center;
    padding: 12px 0 8px;
  }
  .v3-hero-value {
    font-size: 56px;
    font-weight: 800;
    line-height: 1;
    letter-spacing: -1px;
  }
  .v3-hero-label {
    font-size: 13px;
    color: var(--neutral-foreground3);
    margin-top: 2px;
  }
  .v3-badges {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    justify-content: center;
    margin-top: 16px;
  }
  .v3-badge-item {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 5px 12px;
    border-radius: 16px;
    font-size: 12px;
    font-weight: 600;
  }
  .v3-badge-label {
    opacity: 0.85;
    font-weight: 400;
  }

  /* ───────────────────────────────────────
     Variant 4: Segmented Meter
  ─────────────────────────────────────── */
  .v4-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
  }
  .v4-score-group {
    display: flex;
    align-items: baseline;
    gap: 4px;
  }
  .v4-score-value {
    font-size: 36px;
    font-weight: 700;
    line-height: 1;
  }
  .v4-score-max {
    font-size: 14px;
    color: var(--neutral-foreground3);
  }
  .v4-segments {
    display: flex;
    gap: 3px;
    height: 16px;
    border-radius: 8px;
    overflow: hidden;
    margin-bottom: 16px;
  }
  .v4-segment {
    border-radius: 4px;
    transition: flex 0.3s ease;
  }
  .v4-legend {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .v4-legend-row {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: var(--font-size-base200);
  }
  .v4-legend-swatch {
    width: 12px;
    height: 12px;
    border-radius: 3px;
    flex-shrink: 0;
  }
  .v4-legend-label {
    flex: 1;
    color: var(--neutral-foreground1);
  }
  .v4-legend-score {
    font-weight: 600;
    font-variant-numeric: tabular-nums;
  }
  .v4-legend-bar {
    width: 48px;
    height: 4px;
    border-radius: 2px;
    background: var(--neutral-background5);
    overflow: hidden;
  }
  .v4-legend-bar-fill {
    height: 100%;
    border-radius: 2px;
  }

  @media (max-width: 960px) {
    .variants-grid {
      grid-template-columns: 1fr;
    }
  }
`;
