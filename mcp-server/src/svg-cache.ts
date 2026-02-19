/**
 * SVG Cache — fetches external SVG URLs and caches them locally as data URIs.
 *
 * This is needed because MCP App webviews have a strict CSP that blocks
 * loading images from external domains. By fetching server-side and
 * converting to data URIs, the icons render correctly in the webview.
 */

import fs from "node:fs/promises";
import path from "node:path";

const CACHE_DIR = path.join(import.meta.dirname, "..", ".icon-cache");

/** In-memory LRU to avoid repeated disk reads within a session */
const memCache = new Map<string, string>();

/** Ensure cache directory exists */
let dirReady = false;
async function ensureCacheDir() {
  if (dirReady) return;
  await fs.mkdir(CACHE_DIR, { recursive: true });
  dirReady = true;
}

/** Convert a URL to a safe filename */
function urlToFilename(url: string): string {
  // Use a simple hash-like approach: replace non-alphanumeric chars
  return url
    .replace(/^https?:\/\//, "")
    .replace(/[^a-zA-Z0-9._-]/g, "_")
    .slice(0, 200) + ".b64";
}

/**
 * Fetch an SVG from a URL and return as a data URI.
 * Results are cached to disk and memory.
 */
async function fetchAndCache(url: string): Promise<string | null> {
  // Check memory cache first
  const cached = memCache.get(url);
  if (cached) return cached;

  await ensureCacheDir();
  const filename = urlToFilename(url);
  const cachePath = path.join(CACHE_DIR, filename);

  // Check disk cache
  try {
    const data = await fs.readFile(cachePath, "utf-8");
    memCache.set(url, data);
    return data;
  } catch {
    // Not cached yet
  }

  // Fetch from network
  try {
    const resp = await fetch(url, {
      signal: AbortSignal.timeout(5000),
    });
    if (!resp.ok) return null;

    const svgText = await resp.text();
    if (!svgText.includes("<svg")) return null;

    const dataUri = `data:image/svg+xml;base64,${Buffer.from(svgText).toString("base64")}`;

    // Cache to disk (fire and forget)
    fs.writeFile(cachePath, dataUri).catch(() => {});
    memCache.set(url, dataUri);
    return dataUri;
  } catch {
    return null;
  }
}

/**
 * Resolve an array of icon URLs to data URIs.
 * Fetches in parallel with concurrency limit.
 * Returns a Map from original URL to data URI (or null if fetch failed).
 */
export async function resolveIconUrls(
  urls: string[],
  concurrency = 20
): Promise<Map<string, string | null>> {
  const results = new Map<string, string | null>();
  const unique = [...new Set(urls.filter(Boolean))];

  // Process in batches
  for (let i = 0; i < unique.length; i += concurrency) {
    const batch = unique.slice(i, i + concurrency);
    const settled = await Promise.allSettled(
      batch.map(async (url) => {
        const dataUri = await fetchAndCache(url);
        return { url, dataUri };
      })
    );
    for (const result of settled) {
      if (result.status === "fulfilled") {
        results.set(result.value.url, result.value.dataUri);
      }
    }
  }

  return results;
}
