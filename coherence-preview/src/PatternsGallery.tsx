/**
 * Patterns & Scaffolds Gallery
 *
 * Central catalog of all Azure portal composition patterns and page scaffolds.
 * Each card links to a live preview via hash navigation.
 *
 * NOTE: This file is kept in sync with the patterns/scaffolds arrays in main.tsx.
 * The vite.config.ts delete API also removes entries from this file.
 */

export default function PatternsGallery() {
  const sections: {
    title: string;
    description: string;
    items: { id: string; title: string; description: string; tags: string[] }[];
  }[] = [
    {
      title: 'Composition Patterns',
      description: 'Focused demos of individual Azure portal UI patterns. Each pattern can be composed into full pages.',
      items: [
        {
          id: 'pattern-page-header',
          title: 'Page Header',
          description: 'Consistent title bar with icon, title, favorite, more actions, and Copilot suggestions.',
          tags: ['Header', 'Copilot', 'Navigation'],
        },
        {
          id: 'pattern-header',
          title: 'Azure Portal Header',
          description: 'Header bar with search, Copilot button, and avatar popover with persona card.',
          tags: ['CuiHeader', 'CuiSearchBox', 'CuiAvatar', 'CuiPopOver'],
        },
        {
          id: 'pattern-side-nav',
          title: 'Side Nav with Iconify Icons',
          description: 'Side navigation using Iconify SVG URLs with regular/filled icon pairs and section headings.',
          tags: ['CuiDrawer', 'CuiSideNav', 'CuiNavItem', 'CuiIcon'],
        },
        {
          id: 'pattern-azure-portal-nav',
          title: 'Azure Portal Global Nav',
          description: 'Portal-wide hamburger menu with Create a resource, Home, Dashboard, All services, and Favorites.',
          tags: ['Navigation', 'Sidebar', 'Global'],
        },
        {
          id: 'pattern-toolbar',
          title: 'Resource Page Toolbar',
          description: 'Horizontal action bar with subtle buttons, vertical dividers, and dropdown menus.',
          tags: ['CuiToolbar', 'CuiButton', 'CuiMenu', 'CuiDivider'],
        },
        {
          id: 'pattern-resource-shell',
          title: 'Resource Page Shell',
          description: 'Full page scaffold combining all patterns: app frame, header, side nav, breadcrumb, title, and toolbar.',
          tags: ['CuiAppFrame', 'All Patterns'],
        },
        {
          id: 'pattern-copilot-suggestions',
          title: 'Copilot Suggestions',
          description: 'Pill-shaped prompt suggestions with Copilot icon and +N overflow indicator.',
          tags: ['Copilot', 'Component'],
        },
        {
          id: 'pattern-donut-gauge',
          title: 'Donut Gauge Readiness Card',
          description: 'SVG ring gauge with color-coded arc, centered score, category breakdown, and status badge.',
          tags: ['Chart', 'Donut', 'Cards'],
        },
        {
          id: 'pattern-health-metric-card',
          title: 'Pipeline Health Metric Card',
          description: 'Compact KPI card with semantic status accent icon, large value, and contextual subtext.',
          tags: ['Cards', 'Component'],
        },
        {
          id: 'pattern-service-card',
          title: 'Service Card',
          description: 'Outline card with icon, title, description, and bordered action footer (View / More).',
          tags: ['Cards', 'Component'],
        },
        {
          id: 'pattern-filter-panel',
          title: 'Filter Panel',
          description: 'Functional filter bar with search, filter pills with multi-select dropdowns, dismissible tags, and filtered data table.',
          tags: ['Filters', 'Table', 'Toolbar'],
        },
        {
          id: 'pattern-nav-link',
          title: 'Nav Link (Horizontal)',
          description: 'Azure portal home page navigation link — horizontal layout with icon on left and label on right.',
          tags: ['Navigation', 'Component', 'Home'],
        },
        {
          id: 'pattern-service-tile',
          title: 'Service Tile (Vertical)',
          description: 'Azure portal home page service tile — vertical layout with icon on top and label below.',
          tags: ['Cards', 'Component', 'Home'],
        },
      ],
    },
    {
      title: 'Page Scaffolds',
      description: 'Complete Azure portal page templates. Each scaffold is a starting point for a specific page type.',
      items: [
        {
          id: 'scaffold-create-flow',
          title: 'Create Flow',
          description: 'Multi-step creation wizard with tabbed form (Basics, Networking, Tags, Review) and action bar.',
          tags: ['Wizard', 'Form', 'Tabs', 'Create'],
        },
        {
          id: 'scaffold-service-blade',
          title: 'Service Blade',
          description: 'Alternate layout with full-width title bar above a collapsible service sidebar + content. Matches Monitor, Defender, etc.',
          tags: ['Service', 'Blade', 'Sidebar', 'Monitor'],
        },
        {
          id: 'scaffold-marketplace-browse',
          title: 'Marketplace Browse',
          description: 'Categories sidebar with two-column service + marketplace product grid (matches "Create a resource" landing page).',
          tags: ['Marketplace', 'Cards', 'Sidebar'],
        },
        {
          id: 'scaffold-home-page',
          title: 'Home Page',
          description: 'Azure portal landing page with service tiles, resource tabs, filter toolbar, and resource table.',
          tags: ['Home', 'Landing', 'Services', 'Resources Table'],
        },
        {
          id: 'scaffold-browse-page',
          title: 'Browse Page',
          description: 'Full-width resource browse page with toolbar, filter pills, and data table with checkboxes.',
          tags: ['Browse', 'Table', 'Filters', 'Toolbar'],
        },
        {
          id: 'scaffold-browse-blade',
          title: 'Browse Blade',
          description: 'Browse page with collapsible side panel — toolbar, filter pills, and checkbox data table beside a toggleable sidebar.',
          tags: ['Browse', 'Sidebar', 'Table', 'Filters'],
        },
        {
          id: 'scaffold-designer-blade',
          title: 'Designer Blade',
          description: 'Visual designer canvas with workflow nodes, connector lines, branching UI, and config side panel.',
          tags: ['Designer', 'Canvas', 'Workflow', 'Nodes'],
        },
      ],
    },
  ];

  return (
    <>
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '48px 24px' }}>
        <h1 style={{ margin: '0 0 4px', fontSize: 28, fontWeight: 700 }}>
          Patterns & Scaffolds
        </h1>
        <p style={{ margin: '0 0 40px', color: 'var(--neutral-foreground3)', fontSize: 14 }}>
          {sections.reduce((sum, s) => sum + s.items.length, 0)} previewable patterns and scaffolds for Azure portal prototyping
        </p>

        {sections.map((section) => (
          <div key={section.title} style={{ marginBottom: 48 }}>
            <h2 style={{
              margin: '0 0 4px',
              fontSize: 20,
              fontWeight: 600,
              color: 'var(--neutral-foreground1)',
            }}>
              {section.title}
            </h2>
            <p style={{
              margin: '0 0 16px',
              color: 'var(--neutral-foreground3)',
              fontSize: 13,
            }}>
              {section.description}
            </p>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: 16,
            }}>
              {section.items.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '20px',
                    borderRadius: 8,
                    border: '1px solid var(--neutral-stroke2)',
                    background: 'var(--neutral-background1)',
                    textDecoration: 'none',
                    color: 'inherit',
                    transition: 'box-shadow 0.15s, border-color 0.15s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.12)';
                    e.currentTarget.style.borderColor = 'var(--brand-stroke1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.borderColor = 'var(--neutral-stroke2)';
                  }}
                >
                  <div style={{
                    fontWeight: 600,
                    fontSize: 15,
                    marginBottom: 6,
                    color: 'var(--neutral-foreground1)',
                  }}>
                    {item.title}
                  </div>
                  <div style={{
                    fontSize: 13,
                    color: 'var(--neutral-foreground3)',
                    marginBottom: 12,
                    flex: 1,
                  }}>
                    {item.description}
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          fontSize: 11,
                          padding: '2px 8px',
                          borderRadius: 4,
                          background: 'var(--neutral-background3)',
                          color: 'var(--neutral-foreground2)',
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
