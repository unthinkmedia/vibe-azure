/**
 * Patterns & Scaffolds Gallery
 *
 * Central catalog of all Azure portal composition patterns and page scaffolds.
 * Each card links to a live preview via hash navigation.
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
          id: 'pattern-donut-gauge',
          title: 'Donut Gauge Readiness Card',
          description: 'SVG ring gauge with color-coded arc, centered score, category breakdown, and status badge.',
          tags: ['CuiCard', 'CuiBadge', 'SVG', 'Gauge'],
        },
        {
          id: 'pattern-service-card',
          title: 'Service Card',
          description: 'Outline card with icon, title, description, and bordered action footer (View / More).',
          tags: ['CuiCard', 'CuiButton', 'CuiIcon', 'ServiceCard'],
        },
      ],
    },
    {
      title: 'Page Scaffolds',
      description: 'Complete Azure portal page templates. Each scaffold is a starting point for a specific page type.',
      items: [
        {
          id: 'scaffold-resource-page',
          title: 'Resource Page',
          description: 'Standard Azure resource blade with header, side nav, breadcrumb, toolbar, and content area.',
          tags: ['Overview', 'Detail', 'Default'],
        },
        {
          id: 'scaffold-list-page',
          title: 'List Page',
          description: 'Two-column layout with scrollable list panel and detail area. For APIs, subscriptions, etc.',
          tags: ['List-Detail', 'Two Column', 'Master-Detail'],
        },
        {
          id: 'scaffold-create-flow',
          title: 'Create Flow',
          description: 'Multi-step creation wizard with tabbed form (Basics, Networking, Tags, Review) and action bar.',
          tags: ['Wizard', 'Form', 'Tabs', 'Create'],
        },
        {
          id: 'scaffold-overview-page',
          title: 'Overview Page',
          description: 'Resource overview with essentials panel (key-value grid) and card sections.',
          tags: ['Essentials', 'Cards', 'Dashboard'],
        },
        {
          id: 'scaffold-service-blade',
          title: 'Service Blade',
          description: 'Alternate layout with full-width title bar above a collapsible service sidebar + content. Matches Monitor, Defender, etc.',
          tags: ['Service', 'Blade', 'Sidebar', 'Monitor'],
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
        <p style={{ margin: '0 0 40px', color: 'var(--neutral-foreground-3)', fontSize: 14 }}>
          {sections.reduce((sum, s) => sum + s.items.length, 0)} previewable patterns and scaffolds for Azure portal prototyping
        </p>

        {sections.map((section) => (
          <div key={section.title} style={{ marginBottom: 48 }}>
            <h2 style={{
              margin: '0 0 4px',
              fontSize: 20,
              fontWeight: 600,
              color: 'var(--neutral-foreground-1)',
            }}>
              {section.title}
            </h2>
            <p style={{
              margin: '0 0 16px',
              color: 'var(--neutral-foreground-3)',
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
                    border: '1px solid var(--neutral-stroke-2)',
                    background: 'var(--neutral-background-1)',
                    textDecoration: 'none',
                    color: 'inherit',
                    transition: 'box-shadow 0.15s, border-color 0.15s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.12)';
                    e.currentTarget.style.borderColor = 'var(--brand-stroke-1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.borderColor = 'var(--neutral-stroke-2)';
                  }}
                >
                  <div style={{
                    fontWeight: 600,
                    fontSize: 15,
                    marginBottom: 6,
                    color: 'var(--neutral-foreground-1)',
                  }}>
                    {item.title}
                  </div>
                  <div style={{
                    fontSize: 13,
                    color: 'var(--neutral-foreground-3)',
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
                          background: 'var(--neutral-background-3)',
                          color: 'var(--neutral-foreground-2)',
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
