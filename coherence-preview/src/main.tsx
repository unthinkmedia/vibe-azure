import { createRoot } from 'react-dom/client';
import { useState, useEffect, lazy, Suspense, ComponentType } from 'react';
import '@charm-ux/cui/dist/themes/cui/theme.css';
import '@charm-ux/cui/dist/themes/cui/reset.css';
import ShareButton from './ShareButton';
import IntentButton from './IntentButton';

// ─── Types ───
type Entry = {
  id: string;
  title: string;
  description: string;
  component: React.LazyExoticComponent<ComponentType<any>>;
  date?: string; // ISO date string for experiments
};

// ─── Hash Routing Helpers ───
// Supports sub-routes for multi-page experiments: "#apim-flow/create" → entry "apim-flow", subRoute "create"
function parseHash(hash: string, entries: Entry[]): { entryId: string | null; subRoute?: string } {
  // Exact match first
  if (entries.find(e => e.id === hash)) return { entryId: hash };
  // Prefix match for sub-routes
  const slashIdx = hash.indexOf('/');
  if (slashIdx > 0) {
    const prefix = hash.slice(0, slashIdx);
    if (entries.find(e => e.id === prefix)) {
      return { entryId: prefix, subRoute: hash.slice(slashIdx + 1) };
    }
  }
  return { entryId: null };
}

// ─── Experiments (with dates, newest first) ───
const experiments: Entry[] = [
  {
    id: 'aks-cluster-overview',
    title: 'AKS Cluster Overview',
    description: 'Azure Kubernetes Service cluster overview with health summary, node pool utilization bars, recent deployments table, and certificate expiry warning',
    component: lazy(() => import('./experiments/aks-cluster-overview')),
    date: '2026-02-18',
  },
  {
    id: 'storage-account-overview',
    title: 'Storage Account Overview',
    description: 'Storage account overview with usage donut chart (blob/file/table/queue), cost-to-date with MoM trend, and access keys with copy-to-clipboard and 90-day rotation warning',
    component: lazy(() => import('./experiments/storage-account-overview')),
    date: '2026-02-18',
  },
  {
    id: 'container-apps-overview',
    title: 'Container Apps Overview',
    description: 'Container App resource page with revisions table, scaling metrics sparklines, and ingress configuration panel',
    component: lazy(() => import('./experiments/container-apps-overview')),
    date: '2026-02-18',
  },
  {
    id: 'functions-overview',
    title: 'Azure Functions Overview',
    description: 'Function App resource page with essentials panel, monitoring metrics cards with sparklines, and functions list table',
    component: lazy(() => import('./experiments/functions-overview')),
    date: '2026-02-18',
  },
  {
    id: 'create-a-resource',
    title: 'Create a Resource',
    description: 'Azure portal "Create a resource" marketplace page with category sidebar, popular services, and marketplace products',
    component: lazy(() => import('./experiments/create-a-resource')),
    date: '2026-02-18',
  },
  {
    id: 'apim-flow',
    title: 'API Management — End-to-End Flow',
    description: 'Multi-page flow: Browse → Create → Resource Overview. Navigate between pages using in-app buttons.',
    component: lazy(() => import('./experiments/apim-flow')),
    date: '2026-02-18',
  },
  {
    id: 'monitor-overview',
    title: 'Monitor | Overview',
    description: 'Azure Monitor service overview with full-width blade header, collapsible sidebar, and service card grid (Service Blade layout)',
    component: lazy(() => import('./experiments/monitor-overview')),
    date: '2026-02-17',
  },
  {
    id: 'readiness-card-variants',
    title: 'Readiness Card Variants',
    description: '4 design explorations of the AI Readiness Score card with prominent, color-coded data values',
    component: lazy(() => import('./experiments/readiness-card-variants')),
    date: '2026-02-17',
  },
  {
    id: 'ai-hub-page',
    title: 'AI Hub Page',
    description: 'Azure Web App AI Hub with Foundry connections card, readiness score, and diagnostic tools',
    component: lazy(() => import('./experiments/ai-hub-page')),
    date: '2026-02-17',
  },
  {
    id: 'app-registration-page',
    title: 'App Registration Page',
    description: 'Azure Entra ID app registration form inside a full App frame with header, side nav, and search',
    component: lazy(() => import('./experiments/app-registration-page')),
    date: '2026-02-17',
  },
  {
    id: 'copilot-button',
    title: 'Copilot Button',
    description: 'Custom Copilot button with gradient sparkle icon for the Azure portal header',
    component: lazy(() => import('./experiments/copilot-button')),
    date: '2026-02-14',
  },
  {
    id: 'key-vault-page',
    title: 'Key Vault Page',
    description: 'Azure Key Vault resource page with essentials overview and secrets table',
    component: lazy(() => import('./experiments/key-vault-page')),
    date: '2026-02-14',
  },
  {
    id: 'apis-page',
    title: 'APIs Page',
    description: 'Azure API Management APIs page with card grid and side panel',
    component: lazy(() => import('./experiments/apis-page')),
    date: '2026-02-13',
  },
  {
    id: 'subscriptions-page',
    title: 'Subscriptions Page',
    description: 'Azure IAM Access Control page with tabs and cards',
    component: lazy(() => import('./experiments/subscriptions-page')),
    date: '2026-02-12',
  },
  {
    id: 'registration-page',
    title: 'Registration Page',
    description: 'Full-page form with app frame, side nav, and inputs',
    component: lazy(() => import('./experiments/registration-page')),
    date: '2026-02-11',
  },
  {
    id: 'color-checkboxes',
    title: 'Color Checkboxes',
    description: 'Checkbox group with selection state',
    component: lazy(() => import('./experiments/color-checkboxes')),
    date: '2026-02-10',
  },
  {
    id: 'azure-function-card',
    title: 'Azure Function Card',
    description: 'Outline card with icon and description',
    component: lazy(() => import('./experiments/azure-function-card')),
    date: '2026-02-09',
  },
  {
    id: 'top-navigation',
    title: 'Top Navigation',
    description: 'Toolbar with menus, buttons, and dividers',
    component: lazy(() => import('./experiments/top-navigation')),
    date: '2026-02-08',
  },
];

// ─── Composition Patterns ───
const patterns: Entry[] = [
  {
    id: 'pattern-page-header',
    title: 'Page Header',
    description: 'Consistent title bar with icon, title, favorite, more actions, and Copilot suggestions',
    component: lazy(() => import('./patterns/PatternPageHeader')),
  },
  {
    id: 'pattern-header',
    title: 'Azure Portal Header',
    description: 'Header bar with search, Copilot button, and avatar popover',
    component: lazy(() => import('./patterns/PatternHeader')),
  },
  {
    id: 'pattern-side-nav',
    title: 'Side Nav with Iconify',
    description: 'Side navigation with regular/filled Iconify icon pairs and section headings',
    component: lazy(() => import('./patterns/PatternSideNav')),
  },
  {
    id: 'pattern-toolbar',
    title: 'Resource Page Toolbar',
    description: 'Horizontal action bar with buttons, dividers, and dropdown menus',
    component: lazy(() => import('./patterns/PatternToolbar')),
  },
  {
    id: 'pattern-resource-shell',
    title: 'Resource Page Shell',
    description: 'Full page scaffold combining header, side nav, breadcrumb, title, and toolbar',
    component: lazy(() => import('./patterns/PatternResourceShell')),
  },
  {
    id: 'pattern-copilot-suggestions',
    title: 'Copilot Suggestions',
    description: 'Pill-shaped prompt suggestions with Copilot icon and +N overflow indicator',
    component: lazy(() => import('./patterns/PatternCopilotSuggestions')),
  },
  {
    id: 'pattern-donut-gauge',
    title: 'Donut Gauge Readiness Card',
    description: 'SVG ring gauge with color-coded arc, centered score, category breakdown, and status badge',
    component: lazy(() => import('./patterns/PatternDonutGauge')),
  },
  {
    id: 'pattern-service-card',
    title: 'Service Card',
    description: 'Outline card with icon, title, description, and bordered action footer (View / More)',
    component: lazy(() => import('./patterns/PatternServiceCard')),
  },
];

// ─── Page Scaffolds ───
const scaffolds: Entry[] = [
  {
    id: 'scaffold-resource-page',
    title: 'Resource Page',
    description: 'Standard Azure resource blade with header, side nav, toolbar, and content area',
    component: lazy(() => import('./patterns/ScaffoldResourcePage')),
  },
  {
    id: 'scaffold-list-page',
    title: 'List Page',
    description: 'Two-column layout with scrollable list panel and detail area',
    component: lazy(() => import('./patterns/ScaffoldListPage')),
  },
  {
    id: 'scaffold-create-flow',
    title: 'Create Flow',
    description: 'Multi-step creation wizard with tabbed form and action bar',
    component: lazy(() => import('./patterns/ScaffoldCreateFlow')),
  },
  {
    id: 'scaffold-overview-page',
    title: 'Overview Page',
    description: 'Resource overview with essentials panel and card sections',
    component: lazy(() => import('./patterns/ScaffoldOverviewPage')),
  },
  {
    id: 'scaffold-service-blade',
    title: 'Service Blade',
    description: 'Alternate layout with full-width title bar above a collapsible service sidebar + content area (matches Monitor, Defender, etc.)',
    component: lazy(() => import('./patterns/ScaffoldServiceBlade')),
  },
  {
    id: 'scaffold-multi-page-flow',
    title: 'Multi-Page Flow',
    description: 'End-to-end flow with Browse → Create → Detail pages in a single experiment using sub-routes',
    component: lazy(() => import('./patterns/ScaffoldMultiPageFlow')),
  },
  {
    id: 'scaffold-marketplace-browse',
    title: 'Marketplace Browse',
    description: 'Categories sidebar with two-column service + marketplace product grid (matches "Create a resource" landing page)',
    component: lazy(() => import('./patterns/ScaffoldMarketplaceBrowse')),
  },
];

// All entries combined for lookup
const allEntries = [...experiments, ...patterns, ...scaffolds];

type TabId = 'experiments' | 'patterns' | 'scaffolds';

const tabDescriptions: Record<TabId, string> = {
  experiments: 'Full-page prototypes exploring specific Azure portal pages and UI ideas. Each is a self-contained demo of a real scenario.',
  patterns: 'Reusable UI building blocks (header, side nav, toolbar, cards) that can be composed together into full pages.',
  scaffolds: 'Starter page templates with pre-wired layout structure. Clone and customize to kick-start a new prototype.',
};

const tabs: { id: TabId; label: string; count: number }[] = [
  { id: 'experiments', label: 'Experiments', count: experiments.length },
  { id: 'patterns', label: 'Patterns', count: patterns.length },
  { id: 'scaffolds', label: 'Scaffolds', count: scaffolds.length },
];

function formatDate(iso: string) {
  const d = new Date(iso + 'T00:00:00');
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function EntryCard({ entry }: { entry: Entry }) {
  return (
    <a
      href={`#${entry.id}`}
      style={{
        display: 'block',
        padding: '16px 20px',
        borderRadius: 8,
        border: '1px solid var(--neutral-stroke2)',
        background: 'var(--neutral-background1)',
        textDecoration: 'none',
        color: 'inherit',
        transition: 'box-shadow 0.15s',
      }}
      onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)')}
      onMouseLeave={e => (e.currentTarget.style.boxShadow = 'none')}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 4 }}>{entry.title}</div>
        {entry.date && (
          <div style={{ fontSize: 12, color: 'var(--neutral-foreground3)', whiteSpace: 'nowrap', marginLeft: 12 }}>
            {formatDate(entry.date)}
          </div>
        )}
      </div>
      <div style={{ fontSize: 13, color: 'var(--neutral-foreground3)' }}>{entry.description}</div>
    </a>
  );
}

function App() {
  const [activeId, setActiveId] = useState<string | null>(() => {
    return parseHash(window.location.hash.slice(1), allEntries).entryId;
  });
  const [subRoute, setSubRoute] = useState<string | undefined>(() => {
    return parseHash(window.location.hash.slice(1), allEntries).subRoute;
  });
  const [activeTab, setActiveTab] = useState<TabId>('experiments');

  useEffect(() => {
    const onHashChange = () => {
      const parsed = parseHash(window.location.hash.slice(1), allEntries);
      setActiveId(parsed.entryId);
      setSubRoute(parsed.subRoute);
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const activeEntry = allEntries.find(e => e.id === activeId);

  if (activeEntry) {
    const Comp = activeEntry.component;
    return (
      <>
        <div style={{
          padding: '8px 16px',
          borderBottom: '1px solid var(--neutral-stroke2)',
          background: 'var(--neutral-background1)',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}>
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); window.location.hash = ''; setActiveId(null); }}
            style={{ fontSize: 14, color: 'var(--brand-foreground-link)' }}
          >
            ← Back
          </a>
          <span style={{ color: 'var(--neutral-foreground3)', fontSize: 14 }}>|</span>
          <span style={{ fontSize: 14, fontWeight: 600 }}>{activeEntry.title}</span>
          <IntentButton experimentId={activeEntry.id} />
          <ShareButton experimentId={activeEntry.id} experimentTitle={activeEntry.title} />
        </div>
        <Suspense fallback={<div style={{ padding: 32 }}>Loading…</div>}>
          <Comp subRoute={subRoute} />
        </Suspense>
      </>
    );
  }

  const tabContent: Record<TabId, Entry[]> = {
    experiments,
    patterns,
    scaffolds,
  };

  const currentEntries = tabContent[activeTab];

  return (
    <div style={{ maxWidth: 720, margin: '0 auto', padding: '48px 24px' }}>
      <h1 style={{ margin: '0 0 4px', fontSize: 24, fontWeight: 600 }}>Coherence Preview</h1>
      <p style={{ margin: '0 0 24px', color: 'var(--neutral-foreground3)', fontSize: 14 }}>
        {allEntries.length} total items
      </p>

      {/* Tab bar */}
      <div style={{
        display: 'flex',
        gap: 0,
        borderBottom: '2px solid var(--neutral-stroke2)',
        marginBottom: 24,
      }}>
        {tabs.map(tab => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '10px 20px',
                fontSize: 14,
                fontWeight: isActive ? 600 : 400,
                color: isActive ? 'var(--brand-foreground-link)' : 'var(--neutral-foreground2)',
                background: 'none',
                border: 'none',
                borderBottom: isActive ? '2px solid var(--brand-foreground-link)' : '2px solid transparent',
                marginBottom: -2,
                cursor: 'pointer',
                transition: 'color 0.15s, border-color 0.15s',
              }}
            >
              {tab.label}
              <span style={{
                marginLeft: 6,
                fontSize: 12,
                color: isActive ? 'var(--brand-foreground-link)' : 'var(--neutral-foreground3)',
                fontWeight: 400,
              }}>
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Tab description */}
      <p style={{ margin: '0 0 16px', fontSize: 13, color: 'var(--neutral-foreground3)', lineHeight: 1.5 }}>
        {tabDescriptions[activeTab]}
      </p>

      {/* Tab content */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {currentEntries.map(entry => (
          <EntryCard key={entry.id} entry={entry} />
        ))}
      </div>
    </div>
  );
}

const root = createRoot(document.getElementById('root')!);
root.render(<App />);
