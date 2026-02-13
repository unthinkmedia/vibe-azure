# Badge

**Tag:** `cui-badge`  
**Since:** 1.0.0  
**Status:** Preview  
**Category:** components  
**Source:** https://coherence-ftekb0dcfpcjb3gv.b02.azurefd.net/resources/badge/

## Import

```js
import '@charm-ux/cui/dist/components/badge/index.js'
```

## Guidance

### Standards

- You must meet the following requirements when using this component.

### Anatomy

- The badge is a small container, which can be used with both an icon and text, or either an icon or text. The icon can be placed on either the text’s left or right side.

### Types

- There are two types of badges, default and presence badges. Unlike default badges, presence badges never have associated text, and have standard color and icon pairings specifically related to online activity status.

### Appearance types

- Badges come with four appearance types: filled (default), tint, outline, and subtle. Different appearances can be used to draw attention to more important information, and allow less important information to decrease in visual significance.

### Layout

- Badges are placed on or near the component they describe. They should be close enough that people can make intuitive connections between a badge and its associated component.

### Limit the number of associated badges

- When using multiple badges to add context to a single component, limit the total number to no more than four. While badges are great for providing small, easily digestible pieces of content, using too many can have the opposite effect.

### Create hierarchy with several connected badges

Some badges may convey more important information than others. In a set of badges all attached to the same component, creating hierarchy lets people scan the most important ones first.


Use the filled appearance type on badges that are essential, and any other appearance type for those that are secondary. The filled appearance has the most contrast with the rest of the page and stands out, allowing people to easily find the most important information at a glance.

### Provide feedback

- Reach out to us if you spot a bug or have a feature request. Your feedback is critical to the success of Coherence and everyone who uses it.
- Contact us on Teams

## API Reference

### Slots

| Slot | Description |
|------|-------------|
| (default) | The content of the badge. |

### Attributes

| Attribute | Type | Description | Default |
|-----------|------|-------------|---------|
| appearance | `'filled' | 'ghost' | 'outline' | 'tint' | undefined` | Determines the visual appearance of the badge. | `filled` |
| color | `'brand' | 'danger' | 'important' | 'informative' | 'severe' | 'subtle' | 'success' | 'warning' | undefined` | Determines the background color of the badge. |  |
| out-of-office | `boolean | undefined` | Determines presence out-of-office state. |  |
| shape | `'circular' | 'rounded' | 'square' | undefined` | Determines the shape of the badge. |  |
| size | `'tiny' | 'extra-small' | 'small' | 'medium' | 'large' | 'extra-large' | undefined` | Determines the size of the badge. |  |
| status | `BadgeStatus | undefined` | Determines status visual rendering of badge. |  |
| dir | `'ltr' | 'rtl' | 'auto'` | The dir global attribute is an enumerated attribute that indicates the directionality of the element's text. |  |

### Events

| Event | Description |
|-------|-------------|
| ready | Emitted when the component is ready. |

### CSS Custom Properties

| Property | Description |
|----------|-------------|
| `--badge-bg-color` | determines the background color. |
| `--badge-border-color` | determines the border color. |
| `--badge-border-radius` | override css property `--badge-shape` if customs are needed. |
| `--badge-border-style` | determines border style. |
| `--badge-border-width` | determines the border. |
| `--badge-fg-color` | determines the color of the text. |
| `--badge-padding` | determines the padding. |
| `--badge-size` | used to size the badge in relation to the font. |

### CSS Parts

| Part | Description |
|------|-------------|
| badge-icon | The status icon of the badge. |
| badge-base | The component's base wrapper. |
