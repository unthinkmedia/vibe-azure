import { createRoot } from 'react-dom/client';
import { useState, useEffect, lazy, Suspense, ComponentType } from 'react';
import '@charm-ux/cui/dist/themes/cui/theme.css';
import '@charm-ux/cui/dist/themes/cui/reset.css';

// ─── Experiment Registry ───
// Add new experiments here. Each entry becomes a menu item.
const experiments: { id: string; title: string; description: string; component: React.LazyExoticComponent<ComponentType<any>> }[] = [
  {
    id: 'top-navigation',
    title: 'Top Navigation',
    description: 'Toolbar with menus, buttons, and dividers',
    component: lazy(() => import('./TopNavigation')),
  },
  {
    id: 'azure-function-card',
    title: 'Azure Function Card',
    description: 'Outline card with icon and description',
    component: lazy(() => import('./AzureFunctionCard')),
  },
  {
    id: 'color-checkboxes',
    title: 'Color Checkboxes',
    description: 'Checkbox group with selection state',
    component: lazy(() => import('./ColorCheckboxes')),
  },
  {
    id: 'registration-page',
    title: 'Registration Page',
    description: 'Full-page form with app frame, side nav, and inputs',
    component: lazy(() => import('./RegistrationPage')),
  },
  {
    id: 'subscriptions-page',
    title: 'Subscriptions Page',
    description: 'Azure IAM Access Control page with tabs and cards',
    component: lazy(() => import('./SubscriptionsPage')),
  },
  {
    id: 'apis-page',
    title: 'APIs Page',
    description: 'Azure API Management APIs page with card grid and side panel',
    component: lazy(() => import('./APIsPage')),
  },
  {
    id: 'key-vault-page',
    title: 'Key Vault Page',
    description: 'Azure Key Vault resource page with essentials overview and secrets table',
    component: lazy(() => import('./KeyVaultPage')),
  },
  // ─── Patterns Gallery ───
  {
    id: 'patterns-gallery',
    title: '📐 Patterns & Scaffolds Gallery',
    description: 'Browse all composition patterns and page scaffolds in one place',
    component: lazy(() => import('./PatternsGallery')),
  },
  // ─── Composition Patterns ───
  {
    id: 'pattern-header',
    title: 'Pattern: Azure Portal Header',
    description: 'Header bar with search, Copilot button, and avatar popover',
    component: lazy(() => import('./patterns/PatternHeader')),
  },
  {
    id: 'pattern-side-nav',
    title: 'Pattern: Side Nav with Iconify',
    description: 'Side navigation with regular/filled Iconify icon pairs and section headings',
    component: lazy(() => import('./patterns/PatternSideNav')),
  },
  {
    id: 'pattern-toolbar',
    title: 'Pattern: Resource Page Toolbar',
    description: 'Horizontal action bar with buttons, dividers, and dropdown menus',
    component: lazy(() => import('./patterns/PatternToolbar')),
  },
  {
    id: 'pattern-resource-shell',
    title: 'Pattern: Resource Page Shell',
    description: 'Full page scaffold combining header, side nav, breadcrumb, title, and toolbar',
    component: lazy(() => import('./patterns/PatternResourceShell')),
  },
  // ─── Page Scaffolds ───
  {
    id: 'scaffold-resource-page',
    title: 'Scaffold: Resource Page',
    description: 'Standard Azure resource blade with header, side nav, toolbar, and content area',
    component: lazy(() => import('./patterns/ScaffoldResourcePage')),
  },
  {
    id: 'scaffold-list-page',
    title: 'Scaffold: List Page',
    description: 'Two-column layout with scrollable list panel and detail area',
    component: lazy(() => import('./patterns/ScaffoldListPage')),
  },
  {
    id: 'scaffold-create-flow',
    title: 'Scaffold: Create Flow',
    description: 'Multi-step creation wizard with tabbed form and action bar',
    component: lazy(() => import('./patterns/ScaffoldCreateFlow')),
  },
  {
    id: 'scaffold-overview-page',
    title: 'Scaffold: Overview Page',
    description: 'Resource overview with essentials panel and card sections',
    component: lazy(() => import('./patterns/ScaffoldOverviewPage')),
  },
];

function App() {
  const [activeId, setActiveId] = useState<string | null>(() => {
    const hash = window.location.hash.slice(1);
    return experiments.find(e => e.id === hash)?.id ?? null;
  });

  useEffect(() => {
    const onHashChange = () => {
      const hash = window.location.hash.slice(1);
      setActiveId(experiments.find(e => e.id === hash)?.id ?? null);
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const activeExperiment = experiments.find(e => e.id === activeId);

  if (activeExperiment) {
    const Comp = activeExperiment.component;
    return (
      <>
        <div style={{
          padding: '8px 16px',
          borderBottom: '1px solid var(--neutral-stroke-2)',
          background: 'var(--neutral-background-1)',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}>
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); window.location.hash = ''; setActiveId(null); }}
            style={{ fontSize: 14, color: 'var(--brand-foreground-link)' }}
          >
            ← Back to experiments
          </a>
          <span style={{ color: 'var(--neutral-foreground-3)', fontSize: 14 }}>|</span>
          <span style={{ fontSize: 14, fontWeight: 600 }}>{activeExperiment.title}</span>
        </div>
        <Suspense fallback={<div style={{ padding: 32 }}>Loading…</div>}>
          <Comp />
        </Suspense>
      </>
    );
  }

  return (
    <div style={{ maxWidth: 720, margin: '0 auto', padding: '48px 24px' }}>
      <h1 style={{ margin: '0 0 4px', fontSize: 24, fontWeight: 600 }}>Coherence Experiments</h1>
      <p style={{ margin: '0 0 32px', color: 'var(--neutral-foreground-3)', fontSize: 14 }}>
        {experiments.length} experiments
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {experiments.map(exp => (
          <a
            key={exp.id}
            href={`#${exp.id}`}
            style={{
              display: 'block',
              padding: '16px 20px',
              borderRadius: 8,
              border: '1px solid var(--neutral-stroke-2)',
              background: 'var(--neutral-background-1)',
              textDecoration: 'none',
              color: 'inherit',
              transition: 'box-shadow 0.15s',
            }}
            onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)')}
            onMouseLeave={e => (e.currentTarget.style.boxShadow = 'none')}
          >
            <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 4 }}>{exp.title}</div>
            <div style={{ fontSize: 13, color: 'var(--neutral-foreground-3)' }}>{exp.description}</div>
          </a>
        ))}
      </div>
    </div>
  );
}

const root = createRoot(document.getElementById('root')!);
root.render(<App />);
