# Overflow

**Tag:** `cui-overflow`  
**Since:** 1.0.0  
**Status:** Preview  
**Category:** components  
**Source:** https://coherence-ftekb0dcfpcjb3gv.b02.azurefd.net/resources/overflow/

## Import

```js
import '@charm-ux/cui/dist/components/overflow/index.js'
```

## Guidance

### Standards

- You must meet the following requirements when using this component.

### Anatomy

- Overflow icon button
- Menu

### Layout

- Overflow is a simple component that is often a part of other more complex components such as contextual menu, command bar, tab list, breadcrumb, and pagination.

### Provide feedback

- Reach out to us if you spot a bug or have a feature request. Your feedback is critical to the success of Coherence and everyone who uses it.
- Contact us on Teams

## API Reference

### Slots

| Slot | Description |
|------|-------------|
| (default) | Default slot that should contain multiple elements. These elements will be hidden or shown during resize. |
| end | End slot that can be used for static content. |
| menu | Slot that can be used to provide a custom menu for overflowed items. |
| start | Start slot that can be used for static content. |

### Attributes

| Attribute | Type | Description | Default |
|-----------|------|-------------|---------|
| ignore-keydowns | `boolean` |  | `false` |
| overflow-menu-placement | `string | undefined` |  |  |
| dir | `'ltr' | 'rtl' | 'auto'` | The dir global attribute is an enumerated attribute that indicates the directionality of the element's text. |  |
| fixed-placement | `boolean` | Enable this option to prevent the overflow menu from being clipped when the component is placed inside a container with `overflow: auto|hidden|scroll`. | `false` |
| label | `string` | Label for the icon button in the overflow menu. | `More options` |
| menu-position | `'start' | 'end' | 'none'` | Location of overflow menu. Default is end. | `end` |
| min | `number` | Minimum number of values to always display, even if they overflow the container. | `0` |
| overflow-direction | `'start' | 'end' | undefined` | Side to start hiding/adding elements when collapsing/expanding. |  |
| overflowing | `` | Whether or not there are overflowing elements. Readonly. |  |

### Events

| Event | Description |
|-------|-------------|
| overflow | Emitted when an resize causes items to overflow or to no longer overflow. |
| ready | Emitted when the component is ready. |

### CSS Custom Properties

| Property | Description |
|----------|-------------|
| `--overflow-submenu-icon-size` | Size of icons in overflow submenus. |
| `--overflow-item-gap` | Sets the gap between items in the overflow container. |
| `--overflow-collapsing-container-display` | Sets the display property of the collapsing container. |

### CSS Parts

| Part | Description |
|------|-------------|
| overflow-base | The component's base wrapper. |
| overflow-content | The container for the default slot. |
| overflow-end | The end slot. |
| overflow-menu | The menu for overflowed items. |
| overflow-menu-item | The menu item for overflowed items. |
| overflow-start | The start slot. |
| overflow-trigger | The trigger button for the overflow menu. |
