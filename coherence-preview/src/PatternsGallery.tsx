/**
 * Patterns & Scaffolds Gallery
 *
 * Central catalog of all Azure portal composition patterns and page scaffolds.
 * Each card links to a live preview via hash navigation.
 */

export default function PatternsGallery()         {
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
        {
          id: 'scaffold-home-page',
          title: 'Home Page',
          description: 'Azure portal landing page with service tiles, resource tabs, filter toolbar, and resource table.',
          tags: ['Home', 'Landing', 'Services', 'Resources Table'],
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
