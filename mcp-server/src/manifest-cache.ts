/**
 * Fetches and caches the Coherence custom elements manifest from CDN.
 * Provides structured lookup for component APIs.
 */

const MANIFEST_URL =
  "https://coherence-ftekb0dcfpcjb3gv.b02.azurefd.net/cdn/latest/custom-elements.json";
const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour

interface ManifestAttribute {
  name: string;
  type?: { text: string };
  default?: string;
  description?: string;
  fieldName?: string;
}

interface ManifestEvent {
  name: string;
  type?: { text: string };
  description?: string;
}

interface ManifestSlot {
  name: string;
  description?: string;
}

interface ManifestCssProp {
  name: string;
  description?: string;
  default?: string;
}

interface ManifestCssPart {
  name: string;
  description?: string;
}

interface ManifestDeclaration {
  kind: string;
  name: string;
  tagName?: string;
  customElement?: boolean;
  description?: string;
  attributes?: ManifestAttribute[];
  events?: ManifestEvent[];
  slots?: ManifestSlot[];
  cssProperties?: ManifestCssProp[];
  cssParts?: ManifestCssPart[];
  superclass?: { name: string; module?: string };
  members?: Array<{
    kind: string;
    name: string;
    type?: { text: string };
    default?: string;
    description?: string;
    privacy?: string;
  }>;
}

interface ManifestModule {
  kind: string;
  path: string;
  declarations: ManifestDeclaration[];
}

interface Manifest {
  schemaVersion: string;
  modules: ManifestModule[];
}

let cachedManifest: Manifest | null = null;
let cachedAt = 0;

export async function getManifest(): Promise<Manifest> {
  if (cachedManifest && Date.now() - cachedAt < CACHE_TTL_MS) {
    return cachedManifest;
  }
  const res = await fetch(MANIFEST_URL);
  if (!res.ok) throw new Error(`Failed to fetch manifest: ${res.status}`);
  cachedManifest = (await res.json()) as Manifest;
  cachedAt = Date.now();
  return cachedManifest;
}

export interface ComponentAPI {
  tagName: string;
  className: string;
  description: string;
  attributes: ManifestAttribute[];
  events: ManifestEvent[];
  slots: ManifestSlot[];
  cssProperties: ManifestCssProp[];
  cssParts: ManifestCssPart[];
  superclass?: string;
}

export async function lookupComponent(
  query: string
): Promise<ComponentAPI | null> {
  const manifest = await getManifest();
  const q = query.toLowerCase().replace(/^cui-/, "");

  for (const mod of manifest.modules) {
    for (const decl of mod.declarations) {
      if (!decl.customElement || !decl.tagName) continue;
      const tag = decl.tagName.toLowerCase();
      const slug = tag.replace("cui-", "");
      if (slug === q || tag === query.toLowerCase() || decl.name.toLowerCase() === query.toLowerCase()) {
        return {
          tagName: decl.tagName,
          className: decl.name,
          description: decl.description ?? "",
          attributes: decl.attributes ?? [],
          events: decl.events ?? [],
          slots: decl.slots ?? [],
          cssProperties: decl.cssProperties ?? [],
          cssParts: decl.cssParts ?? [],
          superclass: decl.superclass?.name,
        };
      }
    }
  }
  return null;
}

export async function listComponents(): Promise<
  Array<{ tagName: string; className: string; description: string }>
> {
  const manifest = await getManifest();
  const components: Array<{
    tagName: string;
    className: string;
    description: string;
  }> = [];
  for (const mod of manifest.modules) {
    for (const decl of mod.declarations) {
      if (!decl.customElement || !decl.tagName) continue;
      components.push({
        tagName: decl.tagName,
        className: decl.name,
        description: decl.description ?? "",
      });
    }
  }
  return components.sort((a, b) => a.tagName.localeCompare(b.tagName));
}

export async function searchComponents(
  query: string
): Promise<ComponentAPI[]> {
  const manifest = await getManifest();
  const q = query.toLowerCase();
  const results: ComponentAPI[] = [];

  for (const mod of manifest.modules) {
    for (const decl of mod.declarations) {
      if (!decl.customElement || !decl.tagName) continue;
      const text = [
        decl.tagName,
        decl.name,
        decl.description ?? "",
        ...(decl.attributes ?? []).map((a) => a.name),
      ]
        .join(" ")
        .toLowerCase();
      if (text.includes(q)) {
        results.push({
          tagName: decl.tagName,
          className: decl.name,
          description: decl.description ?? "",
          attributes: decl.attributes ?? [],
          events: decl.events ?? [],
          slots: decl.slots ?? [],
          cssProperties: decl.cssProperties ?? [],
          cssParts: decl.cssParts ?? [],
          superclass: decl.superclass?.name,
        });
      }
    }
  }
  return results;
}
