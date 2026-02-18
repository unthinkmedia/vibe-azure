import { CuiBadge, CuiButton, CuiCard, CuiIcon } from '@charm-ux/cui/react';
import {
  readinessScore,
  readinessMax,
  readinessCategories,
  getScoreColor,
  getScoreBgColor,
  getBadgeColor,
  getStatusLabel,
} from './data';
import { styles } from './styles';

/* ─── Helpers ─── */
const overallColor = getScoreColor(readinessScore, readinessMax);
const overallBadge = getBadgeColor(readinessScore, readinessMax);
const overallStatus = getStatusLabel(readinessScore, readinessMax);

/* ═══════════════════════════════════════
   Variant 1 — Donut Gauge
   SVG ring with color-coded arc + score in center
   ═══════════════════════════════════════ */
function DonutGaugeCard() {
  const pct = (readinessScore / readinessMax) * 100;
  const r = 40;
  const circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;

  return (
    <div>
      <div className="variant-label">Variant 1 — Donut Gauge</div>
      <CuiCard appearance="outline" heading="AI Readiness Score">
        <div className="v1-body">
          <div className="v1-donut-wrap">
            <svg width="100" height="100" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r={r} fill="none" stroke="var(--neutral-background5)" strokeWidth="8" />
              <circle
                cx="50" cy="50" r={r}
                fill="none"
                stroke={overallColor}
                strokeWidth="8"
                strokeDasharray={circ}
                strokeDashoffset={offset}
                strokeLinecap="round"
              />
            </svg>
            <div className="v1-donut-center">
              <span className="v1-donut-value" style={{ color: overallColor }}>{readinessScore}</span>
              <span className="v1-donut-max">/ {readinessMax}</span>
            </div>
          </div>
          <div className="v1-cats">
            {readinessCategories.map((cat) => {
              const c = getScoreColor(cat.score, cat.maxScore);
              return (
                <div key={cat.label} className="v1-cat-row">
                  <span className="v1-cat-dot" style={{ background: c }} />
                  <span className="v1-cat-label">{cat.label}</span>
                  <span className="v1-cat-score" style={{ color: c }}>
                    {cat.score}/{cat.maxScore}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
        <div slot="footer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <CuiBadge appearance="tint" color={overallBadge} size="small">{overallStatus}</CuiBadge>
          <CuiButton appearance="subtle" size="small">
            <CuiIcon slot="start" name="open" />View Recommendations
          </CuiButton>
        </div>
      </CuiCard>
    </div>
  );
}

/* ═══════════════════════════════════════
   Variant 2 — Horizontal Bars
   Large hero number + colored progress bars per category
   ═══════════════════════════════════════ */
function HorizontalBarsCard() {
  return (
    <div>
      <div className="variant-label">Variant 2 — Progress Bars</div>
      <CuiCard appearance="outline" heading="AI Readiness Score">
        <div className="v2-hero">
          <span className="v2-hero-value" style={{ color: overallColor }}>{readinessScore}</span>
          <span className="v2-hero-max">/ {readinessMax}</span>
          <CuiBadge appearance="tint" color={overallBadge} size="small" style={{ marginLeft: 'auto' }}>
            {overallStatus}
          </CuiBadge>
        </div>
        <div className="v2-bars">
          {readinessCategories.map((cat) => {
            const c = getScoreColor(cat.score, cat.maxScore);
            const pct = (cat.score / cat.maxScore) * 100;
            return (
              <div key={cat.label} className="v2-bar-row">
                <div className="v2-bar-header">
                  <span className="v2-bar-label">{cat.label}</span>
                  <span className="v2-bar-score" style={{ color: c }}>{cat.score}/{cat.maxScore}</span>
                </div>
                <div className="v2-bar-track">
                  <div className="v2-bar-fill" style={{ width: `${pct}%`, background: c }} />
                </div>
              </div>
            );
          })}
        </div>
        <div slot="footer">
          <CuiButton appearance="subtle" size="small">
            <CuiIcon slot="start" name="open" />View Recommendations
          </CuiButton>
        </div>
      </CuiCard>
    </div>
  );
}

/* ═══════════════════════════════════════
   Variant 3 — Gradient Hero Score
   Bold centered number with category pill badges
   ═══════════════════════════════════════ */
function GradientHeroCard() {
  return (
    <div>
      <div className="variant-label">Variant 3 — Hero + Badges</div>
      <CuiCard appearance="outline" heading="AI Readiness Score">
        <div className="v3-hero-area">
          <div className="v3-hero-value" style={{ color: overallColor }}>{readinessScore}</div>
          <div className="v3-hero-label">out of {readinessMax} · {overallStatus}</div>
        </div>
        <div className="v3-badges">
          {readinessCategories.map((cat) => {
            const bg = getScoreBgColor(cat.score, cat.maxScore);
            const fg = getScoreColor(cat.score, cat.maxScore);
            return (
              <div key={cat.label} className="v3-badge-item" style={{ background: bg, color: fg }}>
                <span className="v3-badge-label">{cat.label}</span>
                {cat.score}/{cat.maxScore}
              </div>
            );
          })}
        </div>
        <div slot="footer" style={{ textAlign: 'center' }}>
          <CuiButton appearance="subtle" size="small">
            <CuiIcon slot="start" name="open" />View Recommendations
          </CuiButton>
        </div>
      </CuiCard>
    </div>
  );
}

/* ═══════════════════════════════════════
   Variant 4 — Segmented Meter
   Stacked segment bar + legend with mini bars
   ═══════════════════════════════════════ */
function SegmentedMeterCard() {
  const totalMax = readinessCategories.reduce((s, c) => s + c.maxScore, 0);

  return (
    <div>
      <div className="variant-label">Variant 4 — Segmented Meter</div>
      <CuiCard appearance="outline" heading="AI Readiness Score">
        <div className="v4-top">
          <div className="v4-score-group">
            <span className="v4-score-value" style={{ color: overallColor }}>{readinessScore}</span>
            <span className="v4-score-max">/ {readinessMax}</span>
          </div>
          <CuiBadge appearance="filled" color={overallBadge} size="small">{overallStatus}</CuiBadge>
        </div>
        <div className="v4-segments">
          {readinessCategories.map((cat) => {
            const c = getScoreColor(cat.score, cat.maxScore);
            const flex = cat.maxScore / totalMax;
            const fillPct = (cat.score / cat.maxScore) * 100;
            return (
              <div
                key={cat.label}
                className="v4-segment"
                style={{
                  flex,
                  background: `linear-gradient(to right, ${c} ${fillPct}%, var(--neutral-background5) ${fillPct}%)`,
                }}
                title={`${cat.label}: ${cat.score}/${cat.maxScore}`}
              />
            );
          })}
        </div>
        <div className="v4-legend">
          {readinessCategories.map((cat) => {
            const c = getScoreColor(cat.score, cat.maxScore);
            const pct = (cat.score / cat.maxScore) * 100;
            return (
              <div key={cat.label} className="v4-legend-row">
                <span className="v4-legend-swatch" style={{ background: c }} />
                <span className="v4-legend-label">{cat.label}</span>
                <div className="v4-legend-bar">
                  <div className="v4-legend-bar-fill" style={{ width: `${pct}%`, background: c }} />
                </div>
                <span className="v4-legend-score" style={{ color: c }}>{cat.score}/{cat.maxScore}</span>
              </div>
            );
          })}
        </div>
        <div slot="footer">
          <CuiButton appearance="subtle" size="small">
            <CuiIcon slot="start" name="open" />View Recommendations
          </CuiButton>
        </div>
      </CuiCard>
    </div>
  );
}

/* ═══════════════════════════════════════
   Page — renders all 4 variants in a 2×2 grid
   ═══════════════════════════════════════ */
export default function ReadinessCardVariants() {
  return (
    <>
      <style>{styles}</style>
      <div className="variants-page">
        <h1>AI Readiness Score — Card Variants</h1>
        <p className="subtitle">4 design explorations with prominent, color-coded data values</p>
        <div className="variants-grid">
          <DonutGaugeCard />
          <HorizontalBarsCard />
          <GradientHeroCard />
          <SegmentedMeterCard />
        </div>
      </div>
    </>
  );
}
