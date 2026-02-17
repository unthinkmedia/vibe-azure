export interface ReadinessCategory {
  label: string;
  score: number;
  maxScore: number;
}

export const readinessScore = 32;
export const readinessMax = 100;

export const readinessCategories: ReadinessCategory[] = [
  { label: 'Security', score: 8, maxScore: 30 },
  { label: 'Reliability', score: 10, maxScore: 25 },
  { label: 'Observability', score: 6, maxScore: 25 },
  { label: 'Performance', score: 8, maxScore: 20 },
];

/** Return a Coherence semantic color token based on score percentage */
export function getScoreColor(score: number, max: number): string {
  const pct = (score / max) * 100;
  if (pct >= 70) return 'var(--success-foreground-1)';
  if (pct >= 50) return 'var(--warning-foreground-1)';
  return 'var(--danger-foreground-1)';
}

/** Return a Coherence background token (lighter shade) */
export function getScoreBgColor(score: number, max: number): string {
  const pct = (score / max) * 100;
  if (pct >= 70) return 'var(--success-background-1)';
  if (pct >= 50) return 'var(--warning-background-1)';
  return 'var(--danger-background-1)';
}

/** Badge color name for CuiBadge */
export function getBadgeColor(score: number, max: number): 'success' | 'warning' | 'danger' {
  const pct = (score / max) * 100;
  if (pct >= 70) return 'success';
  if (pct >= 50) return 'warning';
  return 'danger';
}

/** Human-readable status label */
export function getStatusLabel(score: number, max: number): string {
  const pct = (score / max) * 100;
  if (pct >= 70) return 'Good';
  if (pct >= 50) return 'Fair';
  return 'Needs Attention';
}
