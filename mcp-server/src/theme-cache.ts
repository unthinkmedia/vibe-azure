/**
 * Fetches and caches the Coherence theme CSS from CDN.
 * Parses CSS custom properties into structured design tokens.
 */

const THEME_URL =
  "https://coherence-ftekb0dcfpcjb3gv.b02.azurefd.net/cdn/latest/themes/cui/theme.css";
const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour

export interface DesignToken {
  name: string;
  value: string;
  category: string;
}

let cachedTokens: DesignToken[] | null = null;
let cachedRawCss: string | null = null;
let cachedAt = 0;

function categorizeToken(name: string): string {
  if (/^--color-/.test(name)) return "color-palette";
  if (/^--neutral-foreground/.test(name)) return "foreground";
  if (/^--neutral-background/.test(name)) return "background";
  if (/^--brand-/.test(name)) return "brand";
  if (/^--subtle-/.test(name)) return "subtle";
  if (/^--compound-brand/.test(name)) return "compound-brand";
  if (/^--(danger|success|warning|severe|caution)-/.test(name)) return "status";
  if (/^--(neutral-stroke|brand-stroke|compound-brand-stroke|stroke-focus|transparent-stroke)/.test(name)) return "stroke";
  if (/^--background-overlay|^--scrollbar/.test(name)) return "overlay";
  if (/^--font-/.test(name)) return "typography";
  if (/^--line-height/.test(name)) return "typography";
  if (/^--spacing-/.test(name)) return "spacing";
  if (/^--border-/.test(name)) return "border";
  if (/^--default-border/.test(name)) return "border";
  if (/^--shadow-|^--drop-shadow/.test(name)) return "shadow";
  if (/^--duration-|^--timing-function/.test(name)) return "animation";
  if (/^--focus-/.test(name)) return "focus";
  if (/^--button-/.test(name)) return "component-button";
  if (/^--form-control/.test(name)) return "component-form";
  if (/^--link-/.test(name)) return "component-link";
  if (/^--heading-/.test(name)) return "component-heading";
  if (/^--body-/.test(name)) return "component-body";
  return "other";
}

function parseTokensFromCss(css: string): DesignToken[] {
  const tokens: DesignToken[] = [];
  const regex = /(--[\w-]+)\s*:\s*([^;]+)/g;
  let match;
  while ((match = regex.exec(css)) !== null) {
    const name = match[1];
    const value = match[2].trim();
    tokens.push({ name, value, category: categorizeToken(name) });
  }
  return tokens;
}

async function fetchAndCache(): Promise<void> {
  if (cachedTokens && Date.now() - cachedAt < CACHE_TTL_MS) return;
  const res = await fetch(THEME_URL);
  if (!res.ok) throw new Error(`Failed to fetch theme CSS: ${res.status}`);
  cachedRawCss = await res.text();
  cachedTokens = parseTokensFromCss(cachedRawCss);
  cachedAt = Date.now();
}

export async function getAllTokens(): Promise<DesignToken[]> {
  await fetchAndCache();
  return cachedTokens!;
}

export async function getTokensByCategory(
  category: string
): Promise<DesignToken[]> {
  const tokens = await getAllTokens();
  return tokens.filter((t) => t.category === category);
}

export async function searchTokens(query: string): Promise<DesignToken[]> {
  const tokens = await getAllTokens();
  const q = query.toLowerCase();
  return tokens.filter(
    (t) =>
      t.name.toLowerCase().includes(q) ||
      t.value.toLowerCase().includes(q) ||
      t.category.toLowerCase().includes(q)
  );
}

export async function getTokenCategories(): Promise<
  Array<{ category: string; count: number }>
> {
  const tokens = await getAllTokens();
  const counts = new Map<string, number>();
  for (const t of tokens) {
    counts.set(t.category, (counts.get(t.category) ?? 0) + 1);
  }
  return Array.from(counts.entries())
    .map(([category, count]) => ({ category, count }))
    .sort((a, b) => a.category.localeCompare(b.category));
}

export async function getRawThemeCss(): Promise<string> {
  await fetchAndCache();
  return cachedRawCss!;
}
