# Breadcrumb Item

**Tag:** `cui-breadcrumb-item`  
**Since:** 1.0.0  
**Status:** Preview  
**Category:** components  
**Source:** https://coherence-ftekb0dcfpcjb3gv.b02.azurefd.net/resources/breadcrumb-item/

> Web Components

## Import

```js
import '@charm-ux/cui/dist/components/breadcrumb-item/index.js'
```

## Guidance

### Integration

- You will need to install the full Coherence for Fluent 2 code package to use this component. Follow the installation instructions in the developer starter kit.
- And then you'll need to include the following imports in your file:
- import '@charm-ux/cui/dist/components/breadcrumb-item/index.js'

### Provide feedback

- Reach out to us if you spot a bug or have a feature request. Your feedback is critical to the success of Coherence and everyone who uses it.
- Contact us on Teams

## API Reference

### Slots

| Slot | Description |
|------|-------------|
| (default) | Breadcrumb item's content. |
| end | A presentational suffix icon or similar element. |
| separator | A separator between breadcrumb items. |
| start | A presentational prefix icon or similar element. |

### Attributes

| Attribute | Type | Description | Default |
|-----------|------|-------------|---------|
| active | `boolean` | Defines active state of the breadcrumb. | `false` |
| size | `'small' | 'medium' | 'large' | undefined` | The size of the breadcrumb. |  |
| autofocus | `boolean` | Auto focuses the component on page load. | `false` |
| current | `'page' | 'step' | undefined` | Sets `aria-current` on the div. |  |
| dir | `'ltr' | 'rtl' | 'auto'` | The dir global attribute is an enumerated attribute that indicates the directionality of the element's text. |  |
| href | `string | undefined` | When set, the underlying button will be rendered as an `<a>` with this `href` instead of a `<button>`. |  |
| referrerpolicy | `| 'no-referrer' | 'no-referrer-when-downgrade' | 'origin' | 'origin-when-cross-origin' | 'same-origin' | 'strict-origin' | 'strict-origin-when-cross-origin' | 'unsafe-url' | (string & {})` | Defining which referrer is sent when fetching the resource. Only applies to links. | `strict-origin-when-cross-origin` |
| separator | `boolean` | When true, will render the separator content. | `true` |
| target | `'_blank' | '_parent' | '_self' | '_top' | (string & {}) | undefined` | Tells the browser where to open the link. Only used when `href` is set. |  |

### Events

| Event | Description |
|-------|-------------|
| ready | Emitted when the component is ready. |

### CSS Custom Properties

| Property | Description |
|----------|-------------|
| `--breadcrumb-item-control-width` | Determines the width of the control. |
| `--breadcrumb-item-gap` | Determines margin around start/end slot and separator. |
| `--breadcrumb-item-padding` | Determines the padding of the breadcrumb item. |
| `--breadcrumb-item-border-width` | Determines the width of the breadcrumb item border. |
| `--breadcrumb-item-bg-color` | Set the background color of the breadcrumb item. |
| `--breadcrumb-item-border-color` | Set the border color of the breadcrumb item. |
| `--breadcrumb-item-fg-color` | Set the foreground color of the breadcrumb item. |
| `--breadcrumb-item-hover-bg-color` | Set the background color of the breadcrumb item when hover. |
| `--breadcrumb-item-hover-border-color` | Set the border color of the breadcrumb item when hover. |
| `--breadcrumb-item-hover-fg-color` | Set the foreground color of the breadcrumb item when hover. |
| `--breadcrumb-item-active-bg-color` | Set the background color of the breadcrumb item when active. |
| `--breadcrumb-item-active-border-color` | Set the border color of the breadcrumb item when active. |
| `--breadcrumb-item-active-fg-color` | Set the foreground color of the breadcrumb item when active. |
| `--breadcrumb-item-focus-bg-color` | Set the background color of the breadcrumb item when focus. |
| `--breadcrumb-item-focus-border-color` | Set the border color of the breadcrumb item when focus. |
| `--breadcrumb-item-focus-fg-color` | Set the foreground color of the breadcrumb item when focus. |
| `--breadcrumb-item-disabled-bg-color` | Set the background color of the breadcrumb item when disabled. |
| `--breadcrumb-item-disabled-border-color` | Set the border color of the breadcrumb item when disabled. |
| `--breadcrumb-item-disabled-fg-color` | Set the foreground color of the breadcrumb item when disabled. |

### CSS Parts

| Part | Description |
|------|-------------|
| breadcrumb-item-base | The component's base wrapper. |
| breadcrumb-item-control | The container for start, default, and end slot. |
| breadcrumb-item-separator | The separator between breadcrumb items. |
| content | The container for the default slot. |
| end | The container for the 'end' slot. |
| start | The container for the 'start' slot. |
