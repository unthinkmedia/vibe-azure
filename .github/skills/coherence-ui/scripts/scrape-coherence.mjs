#!/usr/bin/env node
/**
 * Scrapes Coherence design system documentation and writes structured reference
 * markdown files optimized for LLM consumption (Claude Opus / Sonnet).
 *
 * For components: extracts Guidance, Code, and API tabs.
 * For templates/guides/task-flows: extracts the single-page content.
 *
 * Content is in: main > div > section > div:nth-child(3) (the 3rd child of <section>)
 * Tabs are navigated via URL params: ?tab=guidance, ?tab=code, ?tab=api
 *
 * Usage: node scrape-coherence.mjs
 */
import { chromium } from 'playwright';
import { writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const BASE_URL = 'https://coherence-ftekb0dcfpcjb3gv.b02.azurefd.net';
const REFS_DIR = join(__dirname, '..', 'references');

const RESOURCES = [
  // Components (have Guidance / Code / API tabs)
  { slug: 'ai-chat', name: 'AI Chat', category: 'components', tag: 'cui-ai-chat' },
  { slug: 'accordion', name: 'Accordion', category: 'components', tag: 'cui-accordion' },
  { slug: 'accordion-item', name: 'Accordion Item', category: 'components', tag: 'cui-accordion-item' },
  { slug: 'app-frame', name: 'App Frame', category: 'components', tag: 'cui-app-frame' },
  { slug: 'avatar', name: 'Avatar', category: 'components', tag: 'cui-avatar' },
  { slug: 'badge', name: 'Badge', category: 'components', tag: 'cui-badge' },
  { slug: 'banner', name: 'Banner', category: 'components', tag: 'cui-banner' },
  { slug: 'breadcrumb', name: 'Breadcrumb', category: 'components', tag: 'cui-breadcrumb' },
  { slug: 'breadcrumb-item', name: 'Breadcrumb Item', category: 'components', tag: 'cui-breadcrumb-item' },
  { slug: 'button', name: 'Button', category: 'components', tag: 'cui-button' },
  { slug: 'button-group', name: 'Button Group', category: 'components', tag: 'cui-button-group' },
  { slug: 'card', name: 'Card', category: 'components', tag: 'cui-card' },
  { slug: 'carousel', name: 'Carousel', category: 'components', tag: 'cui-carousel' },
  { slug: 'character-counter', name: 'Character Counter', category: 'components', tag: 'cui-character-counter' },
  { slug: 'checkbox', name: 'Checkbox', category: 'components', tag: 'cui-checkbox' },
  { slug: 'content-frame', name: 'Content Frame', category: 'components', tag: 'cui-content-frame' },
  { slug: 'data-grid', name: 'Data Grid', category: 'components', tag: 'cui-data-grid' },
  { slug: 'dialog', name: 'Dialog', category: 'components', tag: 'cui-dialog' },
  { slug: 'disclosure', name: 'Disclosure', category: 'components', tag: 'cui-disclosure' },
  { slug: 'divider', name: 'Divider', category: 'components', tag: 'cui-divider' },
  { slug: 'drawer', name: 'Drawer', category: 'components', tag: 'cui-drawer' },
  { slug: 'feedback-buttons', name: 'Feedback Buttons', category: 'components', tag: 'cui-feedback-buttons' },
  { slug: 'feedback-for-ai', name: 'Feedback for AI', category: 'components', tag: 'cui-feedback-for-ai' },
  { slug: 'header', name: 'Header', category: 'components', tag: 'cui-header' },
  { slug: 'icon', name: 'Icon', category: 'components', tag: 'cui-icon' },
  { slug: 'info-label', name: 'Info Label', category: 'components', tag: 'cui-info-label' },
  { slug: 'input', name: 'Input', category: 'components', tag: 'cui-input' },
  { slug: 'label', name: 'Label', category: 'components', tag: 'cui-label' },
  { slug: 'link', name: 'Link', category: 'components', tag: 'cui-link' },
  { slug: 'menu', name: 'Menu', category: 'components', tag: 'cui-menu' },
  { slug: 'menu-item', name: 'Menu Item', category: 'components', tag: 'cui-menu-item' },
  { slug: 'menu-list', name: 'Menu List', category: 'components', tag: 'cui-menu-list' },
  { slug: 'message-bar', name: 'Message Bar', category: 'components', tag: 'cui-message-bar' },
  { slug: 'microfeedback', name: 'Microfeedback', category: 'components', tag: 'cui-microfeedback' },
  { slug: 'nav-heading', name: 'Navigation Heading', category: 'components', tag: 'cui-nav-heading' },
  { slug: 'nav-item', name: 'Navigation Item', category: 'components', tag: 'cui-nav-item' },
  { slug: 'overflow', name: 'Overflow', category: 'components', tag: 'cui-overflow' },
  { slug: 'pagination', name: 'Pagination', category: 'components', tag: 'cui-pagination' },
  { slug: 'persona', name: 'Persona', category: 'components', tag: 'cui-persona' },
  { slug: 'pop-over', name: 'Pop Over', category: 'components', tag: 'cui-pop-over' },
  { slug: 'profile', name: 'Profile', category: 'components', tag: 'cui-profile' },
  { slug: 'progress-bar', name: 'Progress Bar', category: 'components', tag: 'cui-progress-bar' },
  { slug: 'quick-nav', name: 'Quick Nav', category: 'components', tag: 'cui-quick-nav' },
  { slug: 'radio', name: 'Radio', category: 'components', tag: 'cui-radio' },
  { slug: 'radio-group', name: 'Radio Group', category: 'components', tag: 'cui-radio-group' },
  { slug: 'rich-text-editor', name: 'Rich Text Editor', category: 'components', tag: 'cui-rich-text-editor' },
  { slug: 'search-box', name: 'Search Box', category: 'components', tag: 'cui-search-box' },
  { slug: 'select', name: 'Select', category: 'components', tag: 'cui-select' },
  { slug: 'side-nav', name: 'Side Navigation', category: 'components', tag: 'cui-side-nav' },
  { slug: 'skeleton', name: 'Skeleton', category: 'components', tag: 'cui-skeleton' },
  { slug: 'skip-to', name: 'Skip To', category: 'components', tag: 'cui-skip-to' },
  { slug: 'slider', name: 'Slider', category: 'components', tag: 'cui-slider' },
  { slug: 'spinner', name: 'Spinner', category: 'components', tag: 'cui-spinner' },
  { slug: 'switch', name: 'Switch', category: 'components', tag: 'cui-switch' },
  { slug: 'tab', name: 'Tab', category: 'components', tag: 'cui-tab' },
  { slug: 'tab-panel', name: 'Tab Panel', category: 'components', tag: 'cui-tab-panel' },
  { slug: 'table', name: 'Table', category: 'components', tag: 'cui-table' },
  { slug: 'tabs', name: 'Tabs', category: 'components', tag: 'cui-tabs' },
  { slug: 'tag', name: 'Tag', category: 'components', tag: 'cui-tag' },
  { slug: 'teaching-pop-over', name: 'Teaching Pop Over', category: 'components', tag: 'cui-teaching-pop-over' },
  { slug: 'text-area', name: 'Text Area', category: 'components', tag: 'cui-text-area' },
  { slug: 'toolbar', name: 'Toolbar', category: 'components', tag: 'cui-toolbar' },
  { slug: 'tooltip', name: 'Tooltip', category: 'components', tag: 'cui-tooltip' },
  { slug: 'top-nav', name: 'Top Navigation', category: 'components', tag: 'cui-top-nav' },
  { slug: 'tree', name: 'Tree', category: 'components', tag: 'cui-tree' },
  { slug: 'uploader', name: 'Uploader', category: 'components', tag: 'cui-uploader' },
  // Templates (have Guidance / Code tabs, no API)
  { slug: 'dashboard', name: 'Dashboard', category: 'templates' },
  { slug: 'form', name: 'Form', category: 'templates' },
  { slug: 'settings', name: 'Settings', category: 'templates' },
  // Task Flows (single-page content, no tabs)
  { slug: 'bulk-edit', name: 'Bulk Edit', category: 'task-flows' },
  { slug: 'create-an-item', name: 'Create an Item', category: 'task-flows' },
  { slug: 'edit-an-item', name: 'Edit an Item', category: 'task-flows' },
  { slug: 'favorites', name: 'Favorites', category: 'task-flows' },
  { slug: 'inline-edit', name: 'Inline Edit', category: 'task-flows' },
  { slug: 'save-presets', name: 'Save Presets', category: 'task-flows' },
  // UX Guides (single-page content, no tabs)
  { slug: 'ai-basics', name: 'AI Basics', category: 'guides' },
  { slug: 'accessibility', name: 'Accessibility', category: 'guides' },
  { slug: 'data-visualization', name: 'Data Visualization', category: 'guides' },
  { slug: 'ai-entry-points', name: 'AI Entry Points', category: 'guides' },
  { slug: 'illustration', name: 'Illustration', category: 'guides' },
  { slug: 'writing-ui', name: 'Writing for UI', category: 'guides' },
];

// ---------------------------------------------------------------------------
// Helpers: wait for main content to load (not "Loading" spinner)
// ---------------------------------------------------------------------------
async function waitForContent(page) {
  await page.waitForTimeout(1500);
  // Poll for actual content (max 10s)
  for (let i = 0; i < 20; i++) {
    const ready = await page.evaluate(() => {
      const main = document.querySelector('main');
      if (!main) return false;
      const text = main.innerText;
      return text.length > 50 && !text.includes('Loading');
    });
    if (ready) return;
    await page.waitForTimeout(500);
  }
}

// ---------------------------------------------------------------------------
// Extract content area (the 3rd child of main>div>section, or full main text)
// ---------------------------------------------------------------------------
async function getContentAreaText(page) {
  return page.evaluate(() => {
    // Components/templates: main > div > section > div (3rd child = content)
    const section = document.querySelector('main > div > section');
    if (section && section.children.length >= 3) {
      return section.children[2].innerText || '';
    }
    // Fallback: full main innerText (for guides, task-flows)
    const main = document.querySelector('main');
    return main ? main.innerText : '';
  });
}

// ---------------------------------------------------------------------------
// Extract structured guidance data
// ---------------------------------------------------------------------------
async function extractGuidance(page, slug) {
  await page.goto(`${BASE_URL}/resources/${slug}/?tab=guidance`, {
    waitUntil: 'networkidle', timeout: 30000,
  });
  await waitForContent(page);

  return page.evaluate(() => {
    const section = document.querySelector('main > div > section');
    const content = section && section.children.length >= 3
      ? section.children[2] : document.querySelector('main');
    if (!content) return null;

    // Extract header info (version, status) from section header
    let version = '';
    let status = '';
    if (section && section.children[0]) {
      const hdr = section.children[0].innerText;
      const vMatch = hdr.match(/Since ([\d.]+)/);
      if (vMatch) version = vMatch[1];
      if (hdr.includes('Preview')) status = 'Preview';
      else if (hdr.includes('Stable')) status = 'Stable';
    }

    // Description: first paragraph-like element
    let description = '';
    const firstDiv = content.querySelector('div');
    if (firstDiv) {
      // Get first meaningful text block
      const walker = document.createTreeWalker(firstDiv, NodeFilter.SHOW_TEXT);
      const texts = [];
      let node;
      while ((node = walker.nextNode())) {
        const t = node.textContent.trim();
        if (t.length > 10) texts.push(t);
      }
      description = texts[0] || '';
    }

    // Alternate names
    let alternateNames = [];
    const altContainer = content.querySelector('div');
    if (altContainer) {
      const all = content.querySelectorAll('div');
      for (const d of all) {
        if (d.innerText.startsWith('Alternate names:')) {
          const items = d.querySelectorAll('li');
          alternateNames = Array.from(items).map(li => li.innerText.trim());
          break;
        }
      }
    }

    // Extract sections by h2/h3 headings
    const headings = content.querySelectorAll('h2, h3');
    const sections = {};
    for (const h of headings) {
      const title = h.innerText.trim();
      // Collect content until the next heading or separator
      const items = [];
      let sibling = h.nextElementSibling || h.parentElement?.nextElementSibling;
      while (sibling) {
        if (sibling.tagName === 'H2' || sibling.tagName === 'H3' ||
            sibling.getAttribute('role') === 'separator') break;
        // Check for list items
        const lis = sibling.querySelectorAll('li');
        if (lis.length > 0) {
          for (const li of lis) items.push(li.innerText.trim());
        } else {
          const text = sibling.innerText.trim();
          if (text) items.push(text);
        }
        sibling = sibling.nextElementSibling;
        if (!sibling) {
          // Try parent's next sibling
          const parent = h.closest('div');
          if (parent) sibling = parent.nextElementSibling;
          break;
        }
      }
      if (items.length > 0) sections[title] = items;
    }

    return { version, status, description, alternateNames, sections };
  });
}

// ---------------------------------------------------------------------------
// Extract code examples from Code tab
// ---------------------------------------------------------------------------
async function extractCode(page, slug) {
  await page.goto(`${BASE_URL}/resources/${slug}/?tab=code`, {
    waitUntil: 'networkidle', timeout: 30000,
  });
  await waitForContent(page);

  return page.evaluate(() => {
    const section = document.querySelector('main > div > section');
    const content = section && section.children.length >= 3
      ? section.children[2] : document.querySelector('main');
    if (!content) return null;

    const examples = [];
    const headings = content.querySelectorAll('h3');

    for (const h of headings) {
      const title = h.innerText.trim();
      let description = '';
      let codes = [];
      let sibling = h.nextElementSibling;
      while (sibling) {
        if (sibling.tagName === 'H3' || sibling.tagName === 'H2' ||
            sibling.getAttribute('role') === 'separator') break;

        // Paragraph descriptions
        if (sibling.tagName === 'P' || (sibling.tagName === 'DIV' && !sibling.querySelector('code'))) {
          const pText = sibling.innerText.trim();
          if (pText && !description) description = pText;
        }

        // List descriptions
        if (sibling.tagName === 'UL' || sibling.tagName === 'OL') {
          const items = Array.from(sibling.querySelectorAll('li')).map(li => li.innerText.trim());
          if (items.length && !description) description = items.join('\n');
        }

        // Code blocks - first one in a container is Web Component, second is React
        const codeEls = sibling.querySelectorAll('code');
        for (const c of codeEls) {
          const text = c.innerText.trim();
          if (text.length > 5) codes.push(text);
        }

        sibling = sibling.nextElementSibling;
      }

      // Filter: first code is Web Component HTML, second is React
      const webComponent = codes.find(c => c.includes('<cui-') || c.includes('<div'));
      if (title && webComponent) {
        examples.push({ title, description, code: webComponent });
      }
    }

    // Extract import path
    let importPath = '';
    const importCode = content.querySelector('code');
    const allGroups = content.querySelectorAll('[role="group"]');
    for (const g of allGroups) {
      const c = g.querySelector('code');
      if (c && c.innerText.includes("import '")) {
        importPath = c.innerText.trim();
        break;
      }
    }
    // Fallback: search all code
    if (!importPath) {
      const allCodes = content.querySelectorAll('code');
      for (const c of allCodes) {
        if (c.innerText.includes("import '") && c.innerText.includes('/dist/')) {
          importPath = c.innerText.trim();
          break;
        }
      }
    }

    return { examples, importPath };
  });
}

// ---------------------------------------------------------------------------
// Extract API reference from API tab
// ---------------------------------------------------------------------------
async function extractAPI(page, slug) {
  await page.goto(`${BASE_URL}/resources/${slug}/?tab=api`, {
    waitUntil: 'networkidle', timeout: 30000,
  });
  await waitForContent(page);

  return page.evaluate(() => {
    const section = document.querySelector('main > div > section');
    const content = section && section.children.length >= 3
      ? section.children[2] : document.querySelector('main');
    if (!content) return null;

    function parseTable(table) {
      const rows = [];
      const headerCells = table.querySelectorAll('thead th, thead td');
      const headers = Array.from(headerCells).map(c => c.innerText.trim());
      const bodyRows = table.querySelectorAll('tbody tr');
      for (const tr of bodyRows) {
        const cells = Array.from(tr.querySelectorAll('td')).map(c => c.innerText.trim());
        const row = {};
        headers.forEach((h, i) => { row[h] = cells[i] || ''; });
        rows.push(row);
      }
      return { headers, rows };
    }

    const result = { slots: [], attributes: [], events: [], cssProperties: [], parts: [] };

    const headings = content.querySelectorAll('h2, h3');
    for (const h of headings) {
      const title = h.innerText.trim().toLowerCase();
      // Find the next table after this heading
      let sibling = h.nextElementSibling || h.parentElement?.nextElementSibling;
      let table = null;
      while (sibling && !table) {
        if (sibling.tagName === 'TABLE') {
          table = sibling;
        } else {
          table = sibling.querySelector('table');
        }
        if (!table) sibling = sibling.nextElementSibling;
      }
      if (!table) continue;

      const parsed = parseTable(table);
      if (title === 'slots') result.slots = parsed.rows;
      else if (title === 'attributes') result.attributes = parsed.rows;
      else if (title === 'events') result.events = parsed.rows;
      else if (title === 'properties') result.cssProperties = parsed.rows;
      else if (title === 'parts') result.parts = parsed.rows;
    }

    return result;
  });
}

// ---------------------------------------------------------------------------
// Extract single-page content (for guides, task-flows, templates without tabs)
// ---------------------------------------------------------------------------
async function extractSinglePage(page, slug) {
  await page.goto(`${BASE_URL}/resources/${slug}/`, {
    waitUntil: 'networkidle', timeout: 30000,
  });
  await waitForContent(page);
  return page.evaluate(() => {
    const main = document.querySelector('main');
    if (!main) return '';
    return main.innerText;
  });
}

// ---------------------------------------------------------------------------
// Build structured Markdown for a component
// ---------------------------------------------------------------------------
function buildComponentMarkdown(res, guidance, codeData, api) {
  const lines = [];

  // Header
  lines.push(`# ${res.name}`);
  lines.push('');
  lines.push(`**Tag:** \`${res.tag}\`  `);
  if (guidance?.version) lines.push(`**Since:** ${guidance.version}  `);
  if (guidance?.status) lines.push(`**Status:** ${guidance.status}  `);
  lines.push(`**Category:** ${res.category}  `);
  lines.push(`**Source:** ${BASE_URL}/resources/${res.slug}/`);
  lines.push('');

  if (guidance?.description) {
    lines.push(`> ${guidance.description}`);
    lines.push('');
  }

  if (guidance?.alternateNames?.length) {
    lines.push(`**Alternate names:** ${guidance.alternateNames.join(', ')}`);
    lines.push('');
  }

  // Import
  if (codeData?.importPath) {
    lines.push('## Import');
    lines.push('');
    lines.push('```js');
    lines.push(codeData.importPath);
    lines.push('```');
    lines.push('');
  }

  // Guidance sections
  if (guidance?.sections && Object.keys(guidance.sections).length > 0) {
    lines.push('## Guidance');
    lines.push('');
    for (const [heading, items] of Object.entries(guidance.sections)) {
      lines.push(`### ${heading}`);
      lines.push('');
      for (const item of items) {
        // Multi-line items become paragraphs, single-line become bullets
        if (item.includes('\n')) {
          lines.push(item);
        } else {
          lines.push(`- ${item}`);
        }
      }
      lines.push('');
    }
  }

  // Code examples
  if (codeData?.examples?.length) {
    lines.push('## Code Examples');
    lines.push('');
    for (const ex of codeData.examples) {
      lines.push(`### ${ex.title}`);
      lines.push('');
      if (ex.description) {
        lines.push(ex.description);
        lines.push('');
      }
      lines.push('```html');
      lines.push(ex.code);
      lines.push('```');
      lines.push('');
    }
  }

  // API
  if (api) {
    lines.push('## API Reference');
    lines.push('');

    if (api.slots?.length) {
      lines.push('### Slots');
      lines.push('');
      lines.push('| Slot | Description |');
      lines.push('|------|-------------|');
      for (const s of api.slots) {
        lines.push(`| ${s.Slot || s.slot || Object.values(s)[0] || ''} | ${s.Description || s.description || Object.values(s)[1] || ''} |`);
      }
      lines.push('');
    }

    if (api.attributes?.length) {
      lines.push('### Attributes');
      lines.push('');
      lines.push('| Attribute | Type | Description | Default |');
      lines.push('|-----------|------|-------------|---------|');
      for (const a of api.attributes) {
        const attr = a.Attribute || a.attribute || Object.values(a)[0] || '';
        const type = a.Type || a.type || Object.values(a)[1] || '';
        const desc = a.Description || a.description || Object.values(a)[2] || '';
        const def = a.Default || a.default || Object.values(a)[3] || '';
        lines.push(`| ${attr} | \`${type}\` | ${desc} | ${def ? `\`${def}\`` : ''} |`);
      }
      lines.push('');
    }

    if (api.events?.length) {
      lines.push('### Events');
      lines.push('');
      lines.push('| Event | Description |');
      lines.push('|-------|-------------|');
      for (const e of api.events) {
        lines.push(`| ${e.Event || e.event || Object.values(e)[0] || ''} | ${e.Description || e.description || Object.values(e)[1] || ''} |`);
      }
      lines.push('');
    }

    if (api.cssProperties?.length) {
      lines.push('### CSS Custom Properties');
      lines.push('');
      lines.push('| Property | Description |');
      lines.push('|----------|-------------|');
      for (const p of api.cssProperties) {
        lines.push(`| \`${p.Property || p.property || Object.values(p)[0] || ''}\` | ${p.Description || p.description || Object.values(p)[1] || ''} |`);
      }
      lines.push('');
    }

    if (api.parts?.length) {
      lines.push('### CSS Parts');
      lines.push('');
      lines.push('| Part | Description |');
      lines.push('|------|-------------|');
      for (const p of api.parts) {
        lines.push(`| ${p.Part || p.part || Object.values(p)[0] || ''} | ${p.Description || p.description || Object.values(p)[1] || ''} |`);
      }
      lines.push('');
    }
  }

  return lines.join('\n');
}

// ---------------------------------------------------------------------------
// Build Markdown for single-page resources (guides, task-flows, templates)
// ---------------------------------------------------------------------------
function buildSinglePageMarkdown(res, content) {
  const lines = [];
  lines.push(`# ${res.name}`);
  lines.push('');
  lines.push(`**Category:** ${res.category}  `);
  lines.push(`**Source:** ${BASE_URL}/resources/${res.slug}/`);
  lines.push('');
  if (content) {
    lines.push(content);
  }
  return lines.join('\n');
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
async function main() {
  // Use a persistent profile so SSO auth is remembered across runs.
  // First run: sign in manually. Subsequent runs reuse the session.
  const userDataDir = join(__dirname, '..', '.browser-profile');
  console.log('Launching browser with persistent profile (SSO will be remembered)...');
  console.log(`Profile dir: ${userDataDir}`);

  const context = await chromium.launchPersistentContext(userDataDir, {
    headless: false,
    channel: 'chrome',               // use system Chrome so SSO / keychain works
    args: ['--disable-blink-features=AutomationControlled'],
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  });
  const page = context.pages()[0] || await context.newPage();

  // Navigate to the site
  console.log('Navigating to Coherence site - please sign in if prompted...');
  await page.goto(`${BASE_URL}/resources/button/`, { waitUntil: 'commit', timeout: 60000 });

  // Wait until main element appears (means auth is done and SPA rendered)
  console.log('Waiting for page render (sign in if prompted - you have 5 min)...');
  try {
    await page.waitForSelector('main', { timeout: 300000 });
    console.log('Page loaded! Starting scrape...\n');
  } catch {
    console.error('Timed out waiting for page to load. Please sign in when prompted.');
    await context.close();
    process.exit(1);
  }

  let successCount = 0;
  let failCount = 0;

  for (const res of RESOURCES) {
    console.log(`Scraping: ${res.name} (${res.slug}) [${res.category}]...`);

    try {
      let markdown;

      if (res.category === 'components') {
        // Components have 3 tabs
        const guidance = await extractGuidance(page, res.slug);
        const codeData = await extractCode(page, res.slug);
        const api = await extractAPI(page, res.slug);

        const contentLen = (guidance?.description?.length || 0) +
          (codeData?.examples?.length || 0) +
          (api?.attributes?.length || 0);

        if (contentLen === 0) {
          console.log(`  ⚠ Warning: No content extracted for ${res.name}, trying fallback...`);
          // Fallback: just get the full page text
          const fallback = await extractSinglePage(page, res.slug);
          markdown = buildSinglePageMarkdown(res, fallback);
        } else {
          markdown = buildComponentMarkdown(res, guidance, codeData, api);
        }
      } else if (res.category === 'templates') {
        // Templates may have Guidance + Code tabs
        const guidance = await extractGuidance(page, res.slug).catch(() => null);
        const codeData = await extractCode(page, res.slug).catch(() => null);
        if (guidance || codeData) {
          markdown = buildComponentMarkdown(
            { ...res, tag: `cui-${res.slug}` },
            guidance, codeData, null
          );
        } else {
          const content = await extractSinglePage(page, res.slug);
          markdown = buildSinglePageMarkdown(res, content);
        }
      } else {
        // Guides and task-flows are single-page
        const content = await extractSinglePage(page, res.slug);
        markdown = buildSinglePageMarkdown(res, content);
      }

      // Write file
      const outDir = join(REFS_DIR, res.category);
      mkdirSync(outDir, { recursive: true });
      const outPath = join(outDir, `${res.slug}.md`);
      writeFileSync(outPath, markdown, 'utf-8');

      const sizeKB = (Buffer.byteLength(markdown, 'utf-8') / 1024).toFixed(1);
      console.log(`  ✓ Written: ${res.slug}.md (${sizeKB} KB)`);
      successCount++;
    } catch (err) {
      console.error(`  ✗ Failed: ${res.name} - ${err.message}`);
      failCount++;
    }
  }

  await context.close();
  console.log(`\nDone! Success: ${successCount}, Failed: ${failCount}`);
}

main().catch(console.error);
