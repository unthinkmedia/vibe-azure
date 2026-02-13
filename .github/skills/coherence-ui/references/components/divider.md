# Divider

**Tag:** `cui-divider`  
**Since:** 1.0.0  
**Status:** Preview  
**Category:** components  
**Source:** https://coherence-ftekb0dcfpcjb3gv.b02.azurefd.net/resources/divider/

## Import

```js
import '@charm-ux/cui/dist/components/divider/index.js'
```

## Guidance

### Standards

- You must meet the following requirements when using this component.

### Anatomy

- The divider is a thin line that spans the width of the container it’s placed in. It can be used with text or an icon. When text or an icon is used, it can be aligned to the center (default), start, or end of the divider.

### Types

- There are two types of dividers: block and inset.

### Appearance types

- There are four types of appearances available for dividers: default, subtle, strong, and brand.

### Orientation

- The divider also supports vertical orientation. It can be used to separate content on either side of it horizontally, but is less common due to responsive design constraints.

### Microsoft Teams

The Microsoft Teams app uses a brand type divider to separate previously read messages from new, unread messages, with text in the divider reading “Last read.”


The brand appearance divider is useful here because it immediately clarifies to the reader what messages they can ignore, making it easier to understand the new information.

### App settings

- This example shows an app's settings with sections for basic information and security. A simple, text-free divider visually separates the sections. The default decorative divider helps people quickly scan and locate specific information without being obtrusive.

### Provide feedback

- Reach out to us if you spot a bug or have a feature request. Your feedback is critical to the success of Coherence and everyone who uses it.
- Contact us on Teams

## API Reference

### Attributes

| Attribute | Type | Description | Default |
|-----------|------|-------------|---------|
| appearance | `'strong' | 'brand' | 'subtle' | 'default'` | A divider can have one of the preset appearances. When not specified, the divider has its default appearance. | `default` |
| align-content | `'center' | 'start' | 'end' | undefined` | Determines the alignment of the content within the divider. |  |
| dir | `'ltr' | 'rtl' | 'auto'` | The dir global attribute is an enumerated attribute that indicates the directionality of the element's text. |  |
| inset | `boolean | undefined` | Adds padding to the beginning and end of the divider. |  |
| orientation | `'horizontal' | 'vertical' | undefined` | The divider's orientation. |  |
| presentation | `boolean | undefined` | Renders the divider as a presentational element instead of a content separator when set to true. |  |

### Events

| Event | Description |
|-------|-------------|
| ready | Emitted when the component is ready. |

### CSS Custom Properties

| Property | Description |
|----------|-------------|
| `--divider-border` | The border of the divider line. |
| `--divider-inset` | The padding of the divider in the direction of the inset. |
| `--divider-text-gap` | The gap between the divider and the text. |
| `--divider-text-offset` | The amount of space to offset the text in the divider when it is aligned. |
| `--divider-vertical-min-height` | The minimum height of the divider when it is vertical. |

### CSS Parts

| Part | Description |
|------|-------------|
| divider-line | The divider's line. |
| divider-text | The divider's text. |
