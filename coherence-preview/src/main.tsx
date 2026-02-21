import { createRoot } from 'react-dom/client';
import { useState, useEffect, useRef, lazy, Suspense, ComponentType, useMemo } from 'react';
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
  tags?: string[]; // Filterable tags (page type, service, layout, patterns used)
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
    id: 'logic-app-designer',
    title: 'Logic App Designer',
    description: 'Visual workflow designer with canvas, draggable nodes (triggers/actions/conditions), connector lines, branching UI, config side panel, and code view toggle',
    component: lazy(() => import('./experiments/logic-app-designer')),
    date: '2026-02-21',
    tags: ['designer', 'side-panel', 'logic-apps', 'canvas', 'workflow', 'branching'],
  },
  {
    id: 'resource-group-overview',
    title: 'Azure Resource Group Overview',
    description: 'Resource group overview with resource count summary cards, cost breakdown donut chart, recent activity log, and tag compliance checker',
    component: lazy(() => import('./experiments/resource-group-overview')),
    date: '2026-02-20',
    tags: ['overview', 'side-panel', 'resource-groups', 'donut-chart', 'table', 'cards'],
  },
  {
    id: 'functions-create-hosting-plan',
    title: 'Azure Functions - Create Function App: Hosting Plan Selection',
    description: 'Hosting plan comparison table with expandable feature rows showing educational explanations for each plan capability',
    component: lazy(() => import('./experiments/functions-create-hosting-plan')),
    date: '2026-02-20',
    tags: ['create-flow', 'full-width', 'functions', 'table', 'form'],
  },
  {
    id: 'azure-devops-pipeline-dashboard',
    title: 'Azure DevOps Pipeline Dashboard',
    description: 'Pipeline health summary with success-rate donut, recent runs timeline, slowest stage analytics, agent pool utilization, and failing pipeline alerts',
    component: lazy(() => import('./experiments/azure-devops-pipeline-dashboard')),
    date: '2026-02-19',
    tags: ['dashboard', 'side-panel', 'devops', 'donut-chart', 'table', 'cards', 'chart'],
  },
  {
    id: 'network-security-dashboard',
    title: 'Azure Network Security Dashboard',
    description: 'Threat summary bar, geographic attack map, filterable firewall events table, and NSG recommendations side panel with Copilot suggestions',
    component: lazy(() => import('./experiments/network-security-dashboard')),
    date: '2026-02-19',
    tags: ['dashboard', 'side-panel', 'networking', 'table', 'cards', 'map', 'copilot'],
  },
  {
    id: 'policy-compliance-dashboard',
    title: 'Azure Policy Compliance Dashboard',
    description: 'Overall compliance score donut gauge, non-compliant resources grouped by policy initiative with expandable details, and filterable remediation tasks list with status badges and actions',
    component: lazy(() => import('./experiments/policy-compliance-dashboard')),
    date: '2026-02-18',
    tags: ['dashboard', 'side-panel', 'policy', 'donut-chart', 'table', 'cards', 'filters'],
  },
  {
    id: 'deployment-risk-scorecard',
    title: 'Deployment Risk Scorecard',
    description: 'Assess blast radius and risk level of pending infrastructure deployments with risk summary, deployments queue, dependency graph, risk breakdown, and config diff preview',
    component: lazy(() => import('./experiments/deployment-risk-scorecard')),
    date: '2026-02-18',
    tags: ['dashboard', 'full-width', 'devops', 'cards', 'table', 'chart'],
  },
  {
    id: 'api-health-dashboard',
    title: 'API Health Dashboard',
    description: 'Real-time API endpoint health monitoring with status grid, latency distribution chart, failure log table, and service dependency map',
    component: lazy(() => import('./experiments/api-health-dashboard')),
    date: '2026-02-18',
    tags: ['dashboard', 'side-panel', 'api-management', 'table', 'chart', 'cards', 'map'],
  },
  {
    id: 'cost-anomaly-investigator',
    title: 'Cost Anomaly Investigator',
    description: 'Azure Cost Management diagnostic page with cost delta heatmap, top movers table, anomaly timeline, and recommendations panel',
    component: lazy(() => import('./experiments/cost-anomaly-investigator')),
    date: '2026-02-18',
    tags: ['dashboard', 'side-panel', 'cost-management', 'table', 'chart', 'cards'],
  },
  {
    id: 'key-vault-overview',
    title: 'Key Vault Overview Dashboard',
    description: 'Azure Key Vault overview with secrets expiration timeline (30/60/90-day buckets), certificate health dashboard with auto-renewal indicators, access policy cards grouped by principal type, and sensitive operations log',
    component: lazy(() => import('./experiments/key-vault-overview')),
    date: '2026-02-18',
    tags: ['overview', 'side-panel', 'key-vault', 'table', 'cards', 'chart'],
  },
  {
    id: 'cosmos-db-overview',
    title: 'Cosmos DB Account Overview',
    description: 'Azure Cosmos DB overview with RU/s consumption gauge, partition key heat map, global distribution map with latency indicators, consistency level selector, and recent operations table',
    component: lazy(() => import('./experiments/cosmos-db-overview')),
    date: '2026-02-18',
    tags: ['overview', 'side-panel', 'cosmos-db', 'table', 'cards', 'map', 'chart'],
  },
  {
    id: 'sql-database-overview',
    title: 'SQL Database Overview',
    description: 'Azure SQL Database overview with DTU usage gauge, active connections count, geo-replication status cards, and sortable audit log table',
    component: lazy(() => import('./experiments/sql-database-overview')),
    date: '2026-02-18',
    tags: ['overview', 'side-panel', 'sql', 'table', 'cards', 'chart'],
  },
  {
    id: 'aks-cluster-overview',
    title: 'AKS Cluster Overview',
    description: 'Azure Kubernetes Service cluster overview with health summary, node pool utilization bars, recent deployments table, and certificate expiry warning',
    component: lazy(() => import('./experiments/aks-cluster-overview')),
    date: '2026-02-18',
    tags: ['overview', 'side-panel', 'aks', 'table', 'cards', 'chart'],
  },
  {
    id: 'storage-account-overview',
    title: 'Storage Account Overview',
    description: 'Storage account overview with usage donut chart (blob/file/table/queue), cost-to-date with MoM trend, and access keys with copy-to-clipboard and 90-day rotation warning',
    component: lazy(() => import('./experiments/storage-account-overview')),
    date: '2026-02-18',
    tags: ['overview', 'side-panel', 'storage', 'donut-chart', 'cards'],
  },
  {
    id: 'container-apps-overview',
    title: 'Container Apps Overview',
    description: 'Container App resource page with revisions table, scaling metrics sparklines, and ingress configuration panel',
    component: lazy(() => import('./experiments/container-apps-overview')),
    date: '2026-02-18',
    tags: ['overview', 'side-panel', 'container-apps', 'table', 'chart'],
  },
  {
    id: 'functions-overview',
    title: 'Azure Functions Overview',
    description: 'Function App resource page with essentials panel, monitoring metrics cards with sparklines, and functions list table',
    component: lazy(() => import('./experiments/functions-overview')),
    date: '2026-02-18',
    tags: ['overview', 'side-panel', 'functions', 'table', 'cards', 'chart'],
  },
  {
    id: 'create-a-resource',
    title: 'Create a Resource',
    description: 'Azure portal "Create a resource" marketplace page with category sidebar, popular services, and marketplace products',
    component: lazy(() => import('./experiments/create-a-resource')),
    date: '2026-02-18',
    tags: ['marketplace', 'full-width', 'marketplace', 'cards', 'sidebar'],
  },
  {
    id: 'apim-flow',
    title: 'API Management — End-to-End Flow',
    description: 'Multi-page flow: Browse → Create → Resource Overview. Navigate between pages using in-app buttons.',
    component: lazy(() => import('./experiments/apim-flow')),
    date: '2026-02-18',
    tags: ['multi-page', 'full-width', 'api-management', 'create-flow', 'browse', 'overview'],
  },
  {
    id: 'monitor-overview',
    title: 'Monitor | Overview',
    description: 'Azure Monitor service overview with full-width blade header, collapsible sidebar, and service card grid (Service Blade layout)',
    component: lazy(() => import('./experiments/monitor-overview')),
    date: '2026-02-17',
    tags: ['service-blade', 'full-width', 'monitor', 'cards', 'sidebar'],
  },
  {
    id: 'readiness-card-variants',
    title: 'Readiness Card Variants',
    description: '4 design explorations of the AI Readiness Score card with prominent, color-coded data values',
    component: lazy(() => import('./experiments/readiness-card-variants')),
    date: '2026-02-17',
    tags: ['component', 'cards', 'donut-chart'],
  },
  {
    id: 'ai-hub-page',
    title: 'AI Hub Page',
    description: 'Azure Web App AI Hub with Foundry connections card, readiness score, and diagnostic tools',
    component: lazy(() => import('./experiments/ai-hub-page')),
    date: '2026-02-17',
    tags: ['overview', 'side-panel', 'ai', 'cards', 'copilot'],
  },
  {
    id: 'app-registration-page',
    title: 'App Registration Page',
    description: 'Azure Entra ID app registration form inside a full App frame with header, side nav, and search',
    component: lazy(() => import('./experiments/app-registration-page')),
    date: '2026-02-17',
    tags: ['form', 'side-panel', 'entra-id', 'form'],
  },
  {
    id: 'copilot-button',
    title: 'Copilot Button',
    description: 'Custom Copilot button with gradient sparkle icon for the Azure portal header',
    component: lazy(() => import('./experiments/copilot-button')),
    date: '2026-02-14',
    tags: ['component', 'copilot'],
  },
  {
    id: 'key-vault-page',
    title: 'Key Vault Page',
    description: 'Azure Key Vault resource page with essentials overview and secrets table',
    component: lazy(() => import('./experiments/key-vault-page')),
    date: '2026-02-14',
    tags: ['overview', 'side-panel', 'key-vault', 'table'],
  },
  {
    id: 'apis-page',
    title: 'APIs Page',
    description: 'Azure API Management APIs page with card grid and side panel',
    component: lazy(() => import('./experiments/apis-page')),
    date: '2026-02-13',
    tags: ['browse', 'side-panel', 'api-management', 'cards'],
  },
  {
    id: 'subscriptions-page',
    title: 'Subscriptions Page',
    description: 'Azure IAM Access Control page with tabs and cards',
    component: lazy(() => import('./experiments/subscriptions-page')),
    date: '2026-02-12',
    tags: ['browse', 'full-width', 'iam', 'table', 'cards', 'tabs'],
  },
  {
    id: 'registration-page',
    title: 'Registration Page',
    description: 'Full-page form with app frame, side nav, and inputs',
    component: lazy(() => import('./experiments/registration-page')),
    date: '2026-02-11',
    tags: ['form', 'side-panel'],
  },
  {
    id: 'color-checkboxes',
    title: 'Color Checkboxes',
    description: 'Checkbox group with selection state',
    component: lazy(() => import('./experiments/color-checkboxes')),
    date: '2026-02-10',
    tags: ['component', 'form'],
  },
  {
    id: 'azure-function-card',
    title: 'Azure Function Card',
    description: 'Outline card with icon and description',
    component: lazy(() => import('./experiments/azure-function-card')),
    date: '2026-02-09',
    tags: ['component', 'functions', 'cards'],
  },
  {
    id: 'top-navigation',
    title: 'Top Navigation',
    description: 'Toolbar with menus, buttons, and dividers',
    component: lazy(() => import('./experiments/top-navigation')),
    date: '2026-02-08',
    tags: ['component', 'navigation'],
  },
];

// ─── Composition Patterns ───
const patterns: Entry[] = [
  {
    id: 'pattern-page-header',
    title: 'Page Header',
    description: 'Consistent title bar with icon, title, favorite, more actions, and Copilot suggestions',
    component: lazy(() => import('./patterns/PatternPageHeader')),
    tags: ['header', 'copilot', 'navigation'],
  },
  {
    id: 'pattern-header',
    title: 'Azure Portal Header',
    description: 'Header bar with search, Copilot button, and avatar popover',
    component: lazy(() => import('./patterns/PatternHeader')),
    tags: ['header', 'copilot', 'navigation'],
  },
  {
    id: 'pattern-side-nav',
    title: 'Side Nav with Iconify',
    description: 'Side navigation with regular/filled Iconify icon pairs and section headings',
    component: lazy(() => import('./patterns/PatternSideNav')),
    tags: ['navigation', 'sidebar'],
  },
  {
    id: 'pattern-azure-portal-nav',
    title: 'Azure Portal Global Nav',
    description: 'Portal-wide hamburger menu with Create a resource, Home, Dashboard, All services, and Favorites',
    component: lazy(() => import('./patterns/PatternAzurePortalNav')),
    tags: ['navigation', 'sidebar'],
  },
  {
    id: 'pattern-toolbar',
    title: 'Resource Page Toolbar',
    description: 'Horizontal action bar with buttons, dividers, and dropdown menus',
    component: lazy(() => import('./patterns/PatternToolbar')),
    tags: ['toolbar', 'actions'],
  },
  {
    id: 'pattern-resource-shell',
    title: 'Resource Page Shell',
    description: 'Full page scaffold combining header, side nav, breadcrumb, title, and toolbar',
    component: lazy(() => import('./patterns/PatternResourceShell')),
    tags: ['layout', 'navigation', 'header', 'toolbar'],
  },
  {
    id: 'pattern-copilot-suggestions',
    title: 'Copilot Suggestions',
    description: 'Pill-shaped prompt suggestions with Copilot icon and +N overflow indicator',
    component: lazy(() => import('./patterns/PatternCopilotSuggestions')),
    tags: ['copilot', 'component'],
  },
  {
    id: 'pattern-donut-gauge',
    title: 'Donut Gauge Readiness Card',
    description: 'SVG ring gauge with color-coded arc, centered score, category breakdown, and status badge',
    component: lazy(() => import('./patterns/PatternDonutGauge')),
    tags: ['chart', 'donut-chart', 'cards'],
  },
  {
    id: 'pattern-health-metric-card',
    title: 'Pipeline Health Metric Card',
    description: 'Compact KPI card with semantic status accent icon, large value, and contextual subtext',
    component: lazy(() => import('./patterns/PatternHealthMetricCard')),
    tags: ['cards', 'component'],
  },
  {
    id: 'pattern-service-card',
    title: 'Service Card',
    description: 'Outline card with icon, title, description, and bordered action footer (View / More)',
    component: lazy(() => import('./patterns/PatternServiceCard')),
    tags: ['cards', 'component'],
  },
  {
    id: 'pattern-filter-panel',
    title: 'Filter Panel',
    description: 'Functional filter bar with search, filter pills with multi-select dropdowns, dismissible tags, and filtered data table',
    component: lazy(() => import('./patterns/PatternFilterPanel')),
    tags: ['filters', 'table', 'toolbar'],
  },
];

// ─── Page Scaffolds ───
const scaffolds: Entry[] = [
  {
    id: 'scaffold-create-flow',
    title: 'Create Flow',
    description: 'Multi-step creation wizard with tabbed form and action bar',
    component: lazy(() => import('./patterns/ScaffoldCreateFlow')),
    tags: ['create-flow', 'full-width', 'form', 'tabs'],
  },
  {
    id: 'scaffold-service-blade',
    title: 'Service Blade',
    description: 'Alternate layout with full-width title bar above a collapsible service sidebar + content area (matches Monitor, Defender, etc.)',
    component: lazy(() => import('./patterns/ScaffoldServiceBlade')),
    tags: ['service-blade', 'sidebar', 'layout'],
  },
  {
    id: 'scaffold-marketplace-browse',
    title: 'Marketplace Browse',
    description: 'Categories sidebar with two-column service + marketplace product grid (matches "Create a resource" landing page)',
    component: lazy(() => import('./patterns/ScaffoldMarketplaceBrowse')),
    tags: ['marketplace', 'full-width', 'cards', 'sidebar'],
  },
  {
    id: 'scaffold-home-page',
    title: 'Home Page',
    description: 'Azure portal landing page with service tiles row, resource tabs (Recent/Favorite/Shared), filter toolbar, and resource table',
    component: lazy(() => import('./patterns/ScaffoldHomePage')),
    tags: ['home', 'full-width', 'table', 'tabs'],
  },
  {
    id: 'scaffold-browse-page',
    title: 'Browse Page',
    description: 'Full-width resource browse page with toolbar, filter pills, and data table with checkboxes (matches Subscriptions, All Resources, etc.)',
    component: lazy(() => import('./patterns/ScaffoldBrowsePage')),
    tags: ['browse', 'full-width', 'table', 'filters', 'toolbar'],
  },
  {
    id: 'scaffold-browse-blade',
    title: 'Browse Blade',
    description: 'Browse page with collapsible side panel — toolbar, filter pills, and checkbox data table beside a toggleable service sidebar (matches Cost Management, Defender sub-pages, etc.)',
    component: lazy(() => import('./patterns/ScaffoldBrowseBlade')),
    tags: ['browse', 'sidebar', 'table', 'filters', 'toolbar'],
  },
  {
    id: 'scaffold-designer-blade',
    title: 'Designer Blade',
    description: 'Visual designer canvas with workflow nodes, connector lines, conditional branching, designer/code toggle, and config side panel (matches Logic Apps, Data Factory, Power Automate, etc.)',
    component: lazy(() => import('./patterns/ScaffoldDesignerBlade')),
    tags: ['designer', 'canvas', 'workflow', 'sidebar', 'nodes'],
  },
];

// Initial scaffold list (may shrink at runtime via delete API)
const initialScaffolds = scaffolds;
const initialAllEntries = [...experiments, ...patterns, ...initialScaffolds];

type TabId = 'all' | 'experiments' | 'patterns' | 'scaffolds';

const tabDescriptions: Record<TabId, string> = {
  all: 'Search across all experiments, patterns, and scaffolds to find examples for your next prototype.',
  experiments: 'Full-page prototypes exploring specific Azure portal pages and UI ideas. Each is a self-contained demo of a real scenario.',
  patterns: 'Reusable UI building blocks (header, side nav, toolbar, cards) that can be composed together into full pages.',
  scaffolds: 'Starter page templates with pre-wired layout structure. Clone and customize to kick-start a new prototype.',
};

// Collect all unique tags across all entries for the filter UI
function collectTags(entries: Entry[]): string[] {
  const set = new Set<string>();
  for (const e of entries) {
    e.tags?.forEach(t => set.add(t));
  }
  return [...set].sort();
}

function matchesSearch(entry: Entry, query: string): boolean {
  const q = query.toLowerCase();
  return (
    entry.title.toLowerCase().includes(q) ||
    entry.description.toLowerCase().includes(q) ||
    entry.id.toLowerCase().includes(q) ||
    (entry.tags?.some(t => t.toLowerCase().includes(q)) ?? false)
  );
}

function matchesTags(entry: Entry, activeTags: Set<string>): boolean {
  if (activeTags.size === 0) return true;
  return [...activeTags].every(t => entry.tags?.includes(t));
}

function entryCategory(entry: Entry, allExperiments: Entry[], allPatterns: Entry[], allScaffolds: Entry[]): string {
  if (allExperiments.some(e => e.id === entry.id)) return 'Experiment';
  if (allPatterns.some(e => e.id === entry.id)) return 'Pattern';
  if (allScaffolds.some(e => e.id === entry.id)) return 'Scaffold';
  return '';
}

function formatDate(iso: string) {
  const d = new Date(iso + 'T00:00:00');
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function EntryCard({ entry, onDelete, onUseTemplate, categoryLabel, activeTags, onTagClick }: {
  entry: Entry;
  onDelete?: (id: string) => void;
  onUseTemplate?: (id: string) => void;
  categoryLabel?: string;
  activeTags?: Set<string>;
  onTagClick?: (tag: string) => void;
}) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'stretch',
        borderRadius: 8,
        border: '1px solid var(--neutral-stroke2)',
        background: 'var(--neutral-background1)',
        transition: 'box-shadow 0.15s',
        overflow: 'hidden',
      }}
      onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)')}
      onMouseLeave={e => (e.currentTarget.style.boxShadow = 'none')}
    >
      <a
        href={`#${entry.id}`}
        style={{
          display: 'block',
          padding: '16px 20px',
          flex: 1,
          textDecoration: 'none',
          color: 'inherit',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0 }}>
            <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 0 }}>{entry.title}</div>
            {categoryLabel && (
              <span style={{
                fontSize: 11,
                fontWeight: 500,
                padding: '1px 8px',
                borderRadius: 10,
                background: categoryLabel === 'Experiment' ? 'var(--brand-background2, #e8f0fe)' :
                  categoryLabel === 'Pattern' ? 'var(--status-success-background1, #dff6dd)' :
                    'var(--status-warning-background1, #fff4ce)',
                color: categoryLabel === 'Experiment' ? 'var(--brand-foreground1, #0078d4)' :
                  categoryLabel === 'Pattern' ? 'var(--status-success-foreground1, #107c10)' :
                    'var(--status-warning-foreground1, #835b00)',
                whiteSpace: 'nowrap',
                flexShrink: 0,
              }}>
                {categoryLabel}
              </span>
            )}
          </div>
          {entry.date && (
            <div style={{ fontSize: 12, color: 'var(--neutral-foreground3)', whiteSpace: 'nowrap', marginLeft: 12 }}>
              {formatDate(entry.date)}
            </div>
          )}
        </div>
        <div style={{ fontSize: 13, color: 'var(--neutral-foreground3)', marginTop: 4 }}>{entry.description}</div>
        {entry.tags && entry.tags.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginTop: 8 }}>
            {entry.tags.filter((t, i, a) => a.indexOf(t) === i).map(tag => (
              <span
                key={tag}
                role="button"
                tabIndex={0}
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); onTagClick?.(tag); }}
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); e.stopPropagation(); onTagClick?.(tag); } }}
                style={{
                  fontSize: 11,
                  padding: '2px 8px',
                  borderRadius: 10,
                  border: activeTags?.has(tag)
                    ? '1px solid var(--brand-foreground-link, #0078d4)'
                    : '1px solid var(--neutral-stroke2)',
                  background: activeTags?.has(tag)
                    ? 'var(--brand-background2, #e8f0fe)'
                    : 'var(--neutral-background3, #f5f5f5)',
                  color: activeTags?.has(tag)
                    ? 'var(--brand-foreground-link, #0078d4)'
                    : 'var(--neutral-foreground3)',
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </a>
      {onUseTemplate && (
        <button
          onClick={() => onUseTemplate(entry.id)}
          title={`Use ${entry.title} as template`}
          aria-label={`Use ${entry.title} as template`}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 4,
            padding: '0 12px',
            border: 'none',
            borderLeft: '1px solid var(--neutral-stroke2)',
            background: 'transparent',
            color: 'var(--brand-foreground-link, #0078d4)',
            cursor: 'pointer',
            fontSize: 12,
            fontWeight: 500,
            transition: 'background 0.15s',
            flexShrink: 0,
            whiteSpace: 'nowrap',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'var(--brand-background2, #e8f0fe)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'transparent';
          }}
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
            <path d="M4 1h5.586L13 4.414V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1Zm5 1H4v12h8V5H9V2Z" fill="currentColor"/>
            <path d="M6.5 8.5h3M8 7v3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
          </svg>
          Use Template
        </button>
      )}
      {onDelete && (
        <button
          onClick={() => {
            if (confirm(`Delete scaffold "${entry.title}"?\n\nThis removes the .tsx file and unregisters it. Cannot be undone.`)) {
              onDelete(entry.id);
            }
          }}
          title={`Delete ${entry.title}`}
          aria-label={`Delete ${entry.title}`}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 40,
            border: 'none',
            borderLeft: '1px solid var(--neutral-stroke2)',
            background: 'transparent',
            color: 'var(--neutral-foreground3)',
            cursor: 'pointer',
            fontSize: 16,
            transition: 'background 0.15s, color 0.15s',
            flexShrink: 0,
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'var(--status-danger-background1, #fdf3f4)';
            e.currentTarget.style.color = 'var(--status-danger-foreground1, #b10e1c)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.color = 'var(--neutral-foreground3)';
          }}
        >
          🗑
        </button>
      )}
    </div>
  );
}

function getInitialEntry(entries: Entry[]): { entryId: string | null; subRoute?: string } {
  // Support ?experiment= query parameter (used by agents / direct links)
  const params = new URLSearchParams(window.location.search);
  const qsExperiment = params.get('experiment');
  if (qsExperiment) {
    const match = entries.find(e => e.id === qsExperiment);
    if (match) {
      // Sync hash so back-button works, then clear query param
      window.history.replaceState(null, '', `${window.location.pathname}#${qsExperiment}`);
      return { entryId: qsExperiment };
    }
  }
  // Fallback to hash routing
  return parseHash(window.location.hash.slice(1), entries);
}

function App() {
  const [liveScaffolds, setLiveScaffolds] = useState<Entry[]>(initialScaffolds);
  const allEntries = [...experiments, ...patterns, ...liveScaffolds];
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTags, setActiveTags] = useState<Set<string>>(new Set());

  const [activeId, setActiveId] = useState<string | null>(() => {
    return getInitialEntry(initialAllEntries).entryId;
  });
  const [subRoute, setSubRoute] = useState<string | undefined>(() => {
    return getInitialEntry(initialAllEntries).subRoute;
  });
  const [activeTab, setActiveTab] = useState<TabId>('all');

  const toggleTag = (tag: string) => {
    setActiveTags(prev => {
      const next = new Set(prev);
      if (next.has(tag)) next.delete(tag);
      else next.add(tag);
      return next;
    });
  };

  const allAvailableTags = useMemo(() => collectTags(allEntries), [liveScaffolds]);

  const filterEntries = (entries: Entry[]) =>
    entries.filter(e =>
      (!searchQuery || matchesSearch(e, searchQuery)) &&
      matchesTags(e, activeTags)
    );

  const filteredExperiments = useMemo(() => filterEntries(experiments), [searchQuery, activeTags]);
  const filteredPatterns = useMemo(() => filterEntries(patterns), [searchQuery, activeTags]);
  const filteredScaffolds = useMemo(() => filterEntries(liveScaffolds), [searchQuery, activeTags, liveScaffolds]);
  const filteredAll = useMemo(() => [...filteredExperiments, ...filteredPatterns, ...filteredScaffolds], [filteredExperiments, filteredPatterns, filteredScaffolds]);

  const isFiltering = searchQuery.length > 0 || activeTags.size > 0;

  const handleDeleteScaffold = async (id: string) => {
    try {
      const res = await fetch(`/api/scaffold/${encodeURIComponent(id)}`, { method: 'DELETE' });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        alert(`Failed to delete: ${body.error || res.statusText}`);
        return;
      }
      setLiveScaffolds(prev => prev.filter(s => s.id !== id));
    } catch (err) {
      alert(`Delete failed: ${err}`);
    }
  };

  // ── Use Template modal state ──
  const [useTemplateScaffoldId, setUseTemplateScaffoldId] = useState<string | null>(null);
  const [useTemplateName, setUseTemplateName] = useState('');
  const [useTemplateLoading, setUseTemplateLoading] = useState(false);
  const nameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (useTemplateScaffoldId && nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, [useTemplateScaffoldId]);

  const handleUseTemplate = (scaffoldId: string) => {
    setUseTemplateScaffoldId(scaffoldId);
    setUseTemplateName('');
  };

  const handleUseTemplateSubmit = async () => {
    if (!useTemplateScaffoldId || !useTemplateName) return;
    const name = useTemplateName.trim().toLowerCase().replace(/\s+/g, '-');
    if (!/^[a-z][a-z0-9-]*$/.test(name)) {
      alert('Name must start with a letter and contain only lowercase letters, numbers, and hyphens.');
      return;
    }
    setUseTemplateLoading(true);
    try {
      const res = await fetch(`/api/scaffold/${encodeURIComponent(useTemplateScaffoldId)}/use`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });
      const body = await res.json();
      if (!res.ok) {
        alert(`Failed: ${body.error || res.statusText}`);
        return;
      }
      setUseTemplateScaffoldId(null);
      // Navigate to the new experiment (Vite HMR will pick up the new files)
      window.location.hash = body.id;
      // Force page reload so main.tsx re-evaluates with the new experiment entry
      window.location.reload();
    } catch (err) {
      alert(`Error: ${err}`);
    } finally {
      setUseTemplateLoading(false);
    }
  };

  const UseTemplateModal = () => useTemplateScaffoldId ? (
    <div
      onClick={() => setUseTemplateScaffoldId(null)}
      style={{
        position: 'fixed', inset: 0, zIndex: 10000,
        background: 'rgba(0,0,0,.4)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: 'var(--neutral-background1, #fff)',
          border: '1px solid var(--neutral-stroke1)',
          borderRadius: 8,
          boxShadow: '0 8px 24px rgba(0,0,0,.18)',
          padding: 24,
          width: 420,
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <div style={{ fontSize: 16, fontWeight: 600 }}>New Experiment from Template</div>
          <button
            onClick={() => setUseTemplateScaffoldId(null)}
            style={{ background: 'none', border: 'none', fontSize: 18, cursor: 'pointer', color: 'var(--neutral-foreground3)', padding: '0 2px', lineHeight: 1 }}
            aria-label="Close"
          >✕</button>
        </div>
        <p style={{ fontSize: 13, color: 'var(--neutral-foreground2)', margin: '0 0 12px', lineHeight: 1.5 }}>
          This will copy the <strong>{liveScaffolds.find(s => s.id === useTemplateScaffoldId)?.title}</strong> scaffold
          into a new experiment folder and register it in the picker.
        </p>
        <label style={{ display: 'block', fontSize: 13, fontWeight: 500, marginBottom: 6 }}>
          Experiment name
        </label>
        <input
          ref={nameInputRef}
          type="text"
          value={useTemplateName}
          onChange={e => setUseTemplateName(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') handleUseTemplateSubmit(); }}
          placeholder="e.g. my-service-page"
          style={{
            width: '100%',
            padding: '8px 12px',
            fontSize: 14,
            border: '1px solid var(--neutral-stroke2)',
            borderRadius: 6,
            background: 'var(--neutral-background1)',
            color: 'var(--neutral-foreground1)',
            outline: 'none',
            boxSizing: 'border-box',
            marginBottom: 4,
          }}
          onFocus={e => (e.currentTarget.style.borderColor = 'var(--brand-foreground-link)')}
          onBlur={e => (e.currentTarget.style.borderColor = 'var(--neutral-stroke2)')}
        />
        <div style={{ fontSize: 11, color: 'var(--neutral-foreground3)', marginBottom: 16 }}>
          Lowercase letters, numbers, and hyphens only (e.g. "cost-dashboard")
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
          <button
            onClick={() => setUseTemplateScaffoldId(null)}
            style={{
              padding: '6px 16px', fontSize: 13, borderRadius: 4,
              border: '1px solid var(--neutral-stroke2)',
              background: 'var(--neutral-background1)',
              color: 'var(--neutral-foreground1)',
              cursor: 'pointer',
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleUseTemplateSubmit}
            disabled={useTemplateLoading || !useTemplateName.trim()}
            style={{
              padding: '6px 16px', fontSize: 13, borderRadius: 4,
              border: '1px solid var(--brand-foreground-link, #0078d4)',
              background: 'var(--brand-foreground-link, #0078d4)',
              color: '#fff',
              cursor: useTemplateLoading || !useTemplateName.trim() ? 'not-allowed' : 'pointer',
              opacity: useTemplateLoading || !useTemplateName.trim() ? 0.6 : 1,
              fontWeight: 500,
            }}
          >
            {useTemplateLoading ? 'Creating…' : 'Create Experiment'}
          </button>
        </div>
      </div>
    </div>
  ) : null;

  const tabs: { id: TabId; label: string; count: number }[] = [
    { id: 'all', label: 'All', count: filteredAll.length },
    { id: 'experiments', label: 'Experiments', count: filteredExperiments.length },
    { id: 'patterns', label: 'Patterns', count: filteredPatterns.length },
    { id: 'scaffolds', label: 'Scaffolds', count: filteredScaffolds.length },
  ];

  useEffect(() => {
    const onHashChange = () => {
      const parsed = parseHash(window.location.hash.slice(1), allEntries);
      setActiveId(parsed.entryId);
      setSubRoute(parsed.subRoute);
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  // Determine which tags are relevant to the current tab
  // (must be before any early returns to keep hook count stable)
  const tabTags = useMemo(() => {
    const source = activeTab === 'all' ? allEntries :
      activeTab === 'experiments' ? experiments :
        activeTab === 'patterns' ? patterns : liveScaffolds;
    return collectTags(source);
  }, [activeTab, liveScaffolds]);

  const activeEntry = allEntries.find(e => e.id === activeId);

  if (activeEntry) {
    const Comp = activeEntry.component;
    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
        <div style={{
          padding: '8px 16px',
          borderBottom: '1px solid var(--neutral-stroke2)',
          background: 'var(--neutral-background1)',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          flexShrink: 0,
          position: 'relative',
          zIndex: 2,
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
          {experiments.some(e => e.id === activeEntry.id) && <IntentButton experimentId={activeEntry.id} />}
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}>
            {liveScaffolds.some(s => s.id === activeEntry.id) && (
              <button
                onClick={() => handleUseTemplate(activeEntry.id)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '4px 12px',
                  fontSize: 13,
                  fontWeight: 500,
                  color: 'var(--brand-foreground-link, #0078d4)',
                  background: 'var(--neutral-background3)',
                  border: '1px solid var(--brand-foreground-link, #0078d4)',
                  borderRadius: 4,
                  cursor: 'pointer',
                }}
                aria-label="Use this scaffold as a template"
              >
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
                  <path d="M4 1h5.586L13 4.414V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1Zm5 1H4v12h8V5H9V2Z" fill="currentColor"/>
                  <path d="M6.5 8.5h3M8 7v3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                </svg>
                Use Template
              </button>
            )}
            <ShareButton experimentId={activeEntry.id} experimentTitle={activeEntry.title} />
          </div>
        </div>
        <div style={{ flex: 1, position: 'relative', overflow: 'auto', transform: 'scale(1)' }}>
          <Suspense fallback={<div style={{ padding: 32 }}>Loading…</div>}>
            <Comp subRoute={subRoute} />
          </Suspense>
        </div>
        {useTemplateScaffoldId && <UseTemplateModal />}
      </div>
    );
  }

  const tabContent: Record<TabId, Entry[]> = {
    all: filteredAll,
    experiments: filteredExperiments,
    patterns: filteredPatterns,
    scaffolds: filteredScaffolds,
  };

  const currentEntries = tabContent[activeTab];

  return (
    <div style={{ maxWidth: 1040, margin: '0 auto', padding: '48px 24px' }}>
      <h1 style={{ margin: '0 0 4px', fontSize: 24, fontWeight: 600 }}>Coherence Preview</h1>
      <p style={{ margin: '0 0 20px', color: 'var(--neutral-foreground3)', fontSize: 14 }}>
        {allEntries.length} total items
      </p>

      {/* Search bar */}
      <div style={{ position: 'relative', marginBottom: 16 }}>
        <svg
          style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}
          width="16" height="16" viewBox="0 0 16 16" fill="none"
        >
          <path d="M11.5 7a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Zm-1.06 3.85a5.5 5.5 0 1 1 .71-.71l3.36 3.35a.5.5 0 0 1-.71.71l-3.36-3.35Z" fill="var(--neutral-foreground3)" />
        </svg>
        <input
          type="text"
          placeholder="Search experiments, patterns, scaffolds..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          style={{
            width: '100%',
            padding: '10px 12px 10px 36px',
            fontSize: 14,
            border: '1px solid var(--neutral-stroke2)',
            borderRadius: 6,
            background: 'var(--neutral-background1)',
            color: 'var(--neutral-foreground1)',
            outline: 'none',
            boxSizing: 'border-box',
          }}
          onFocus={e => (e.currentTarget.style.borderColor = 'var(--brand-foreground-link)')}
          onBlur={e => (e.currentTarget.style.borderColor = 'var(--neutral-stroke2)')}
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            aria-label="Clear search"
            style={{
              position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)',
              background: 'none', border: 'none', cursor: 'pointer', fontSize: 16,
              color: 'var(--neutral-foreground3)', padding: '2px 4px', lineHeight: 1,
            }}
          >
            ×
          </button>
        )}
      </div>

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

      {/* Two-column layout: cards left, filter pills right */}
      <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
        {/* Tab content (left) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, flex: 1, minWidth: 0 }}>
          {currentEntries.length === 0 && (
            <div style={{
              textAlign: 'center', padding: '48px 24px',
              color: 'var(--neutral-foreground3)', fontSize: 14,
            }}>
              {isFiltering
                ? 'No results match your search or filters. Try adjusting your criteria.'
                : 'No items in this category.'}
            </div>
          )}
          {currentEntries.map(entry => {
            const isScaffold = liveScaffolds.some(s => s.id === entry.id);
            return (
              <EntryCard
                key={entry.id}
                entry={entry}
                onDelete={activeTab === 'scaffolds' ? handleDeleteScaffold : undefined}
                onUseTemplate={isScaffold ? handleUseTemplate : undefined}
                categoryLabel={activeTab === 'all' ? entryCategory(entry, experiments, patterns, liveScaffolds) : undefined}
                activeTags={activeTags}
                onTagClick={toggleTag}
              />
            );
          })}
        </div>

        {/* Tag filter pills (right column) */}
        {tabTags.length > 0 && (
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 6,
            width: 160,
            flexShrink: 0,
            position: 'sticky',
            top: 24,
            alignContent: 'flex-start',
          }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--neutral-foreground2)', marginBottom: 4 }}>
              Filter by tag
            </div>
            {tabTags.map(tag => {
              const isActive = activeTags.has(tag);
              return (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  style={{
                    fontSize: 12,
                    padding: '4px 12px',
                    borderRadius: 14,
                    border: isActive
                      ? '1px solid var(--brand-foreground-link, #0078d4)'
                      : '1px solid var(--neutral-stroke2)',
                    background: isActive
                      ? 'var(--brand-background2, #e8f0fe)'
                      : 'var(--neutral-background3, #f5f5f5)',
                    color: isActive
                      ? 'var(--brand-foreground-link, #0078d4)'
                      : 'var(--neutral-foreground2)',
                    cursor: 'pointer',
                    fontWeight: isActive ? 600 : 400,
                    transition: 'all 0.15s',
                    textAlign: 'left',
                  }}
                >
                  {tag}
                </button>
              );
            })}
            {activeTags.size > 0 && (
              <button
                onClick={() => setActiveTags(new Set())}
                style={{
                  fontSize: 12, padding: '4px 12px', borderRadius: 14,
                  border: '1px solid var(--status-danger-foreground1, #b10e1c)',
                  background: 'transparent',
                  color: 'var(--status-danger-foreground1, #b10e1c)',
                  cursor: 'pointer', fontWeight: 500,
                  textAlign: 'left',
                }}
              >
                Clear filters
              </button>
            )}
          </div>
        )}
      </div>

      <UseTemplateModal />
    </div>
  );
}

const root = createRoot(document.getElementById('root')!);
root.render(<App />);
