# Service Card

Azure portal service card with icon, title, description, and a bordered action footer containing View + More buttons. Used in service overview pages (Monitor, Defender, etc.) for linking to sub-services.

## Import

```tsx
import { ServiceCard } from '../patterns/PatternServiceCard';
```

## Structure

```
CuiCard (appearance="outline", --card-padding: 0, --card-content-gap: 0)
├── div.service-card-body (padding: 16px 16px 12px)
│   ├── div.service-card-header (flex, gap: 8px)
│   ├── div.service-card-icon (28×28, centered)
│   │   └── CuiIcon (24px, Iconify URL)
│   │   └── span.service-card-title (semibold, base-300)
│   └── p.service-card-desc (base-200, neutral-foreground-2)
└── div.service-card-actions (border-top: 1px solid neutral-stroke2, padding: 4px 8px)
    ├── CuiButton (link, small) "View" with open icon
    ├── CuiButton (subtle, small, iconOnly) "..." more-horizontal
    └── CuiButton (link, small) "More"
```

## React Example

```tsx
import { ServiceCard } from '../patterns/PatternServiceCard';

// Basic usage
<ServiceCard
  title="Application Insights"
  description="Monitor your app's availability, performance, errors, and usage."
  icon="app-generic"
/>

// With callbacks
<ServiceCard
  title="Container Insights"
  description="Gain visibility into the performance and health of your controllers, nodes, and containers."
  icon="box"
  onView={() => navigate('/container-insights')}
  onMore={() => openPanel('container-insights')}
/>

// With custom icon URL
<ServiceCard
  title="Custom Service"
  description="Description text."
  iconUrl="https://example.com/my-icon.svg"
/>

// With fully custom icon node
<ServiceCard
  title="Custom Icon"
  description="Uses a custom React node for the icon."
  iconSlot={<img src="/my-icon.png" alt="" width={24} height={24} />}
/>
```

## Card Grid Usage

```tsx
<div style={{
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
  gap: 12,
}}>
  {cards.map(card => (
    <ServiceCard key={card.title} {...card} />
  ))}
</div>
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `title` | `string` | Yes | Card title text |
| `description` | `string` | Yes | Card description text |
| `icon` | `string` | No | Fluent icon name (e.g. `"app-generic"`). Resolved via Iconify. |
| `iconUrl` | `string` | No | Direct icon URL (overrides `icon`) |
| `iconSlot` | `ReactNode` | No | Custom icon node (overrides both `icon` and `iconUrl`) |
| `onView` | `() => void` | No | Callback when "View" is clicked |
| `onMore` | `() => void` | No | Callback when "More" is clicked |
| `className` | `string` | No | Additional className on the outer `CuiCard` |
| `style` | `CSSProperties` | No | Inline style on the outer `CuiCard` |

## Key Design Details

- Card uses `--card-padding: 0` and `--card-content-gap: 0`; body div gets `padding: 16px 16px 12px`
- Action footer has `border-top: 1px solid var(--neutral-stroke2)` and `padding: 4px 8px`
- Title uses `--font-weight-semi-bold` and `--font-size-base300`
- Description uses `--font-size-base200` and `--neutral-foreground2`
- "View" button uses `appearance="link"` with an open icon in `slot="start"`
- "..." button uses `appearance="subtle"` with `iconOnly`
- "More" button uses `appearance="link"`
- Styles are auto-injected once via `<style>` tag (id: `pattern-service-card-styles`)

## When to Use

- Service overview pages listing sub-services (Monitor, Defender, Security Center)
- Any card grid where each card links to a separate Azure service or feature
- Resource pages that display related services with View/More actions
