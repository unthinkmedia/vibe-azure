# Menu Item

**Tag:** `cui-menu-item`  
**Since:** 1.0.0  
**Status:** Preview  
**Category:** components  
**Source:** https://coherence-ftekb0dcfpcjb3gv.b02.azurefd.net/resources/menu-item/

> Web Components

## Import

```js
import '@charm-ux/cui/dist/components/menu-item/index.js'
```

## Guidance

### Integration

- You will need to install the full Coherence for Fluent 2 code package to use this component. Follow the installation instructions in the developer starter kit.
- And then you'll need to include the following imports in your file:
- import '@charm-ux/cui/dist/components/menu-item/index.js'

### Composition

- Menu item leverages the following components:
Icon
Identifiers
Icons are visual symbols used to represent ideas, objects, or actions and have semantic purpose within a layout. They communicate messages at a glance, provide interactivity, and draw attention to important information.

### Provide feedback

- Reach out to us if you spot a bug or have a feature request. Your feedback is critical to the success of Coherence and everyone who uses it.
- Contact us on Teams

## API Reference

### Slots

| Slot | Description |
|------|-------------|
| (default) | The menu item's content. |
| anchor | The anchor element when the menu item has a submenu. |
| checkbox-indicator | The checkbox indicator icon. |
| end | A presentational suffix icon or similar element. |
| radio-indicator | The radio indicator icon. |
| start | A presentational prefix icon or similar element. |
| trigger | The trigger element when the menu item has a submenu. |

### Attributes

| Attribute | Type | Description | Default |
|-----------|------|-------------|---------|
| ignore-keydowns | `boolean` |  | `false` |
| checked | `boolean | undefined` | Indicates whether the menu item is checked. |  |
| current | `'page' | 'step' | 'location' | 'date' | 'time' | 'true' | 'false' | null | undefined` | Sets `aria-current` on the internal link. |  |
| dir | `'ltr' | 'rtl' | 'auto'` | The dir global attribute is an enumerated attribute that indicates the directionality of the element's text. |  |
| disabled | `boolean | undefined` | Disables the emitted click event. |  |
| expanded | `boolean | undefined` | Expands the menu item to reveal a submenu. |  |
| hasSubmenu | `boolean` | Indicates whether the menu item contains a submenu. | `false` |
| href | `string | undefined` | When set, the underlying menu item will be rendered as an `<a>` with this `href` instead of a `<span>`. |  |
| role | `string | null` | The role of the menu item. | `null` |
| sub-menu-placement | `string` | Controls the placement of the submenu popup. | `right-start` |
| target | `'_blank' | '_parent' | '_self' | '_top' | (string & {}) | undefined` | Tells the browser where to open the link. Only used when `href` is set. |  |

### Events

| Event | Description |
|-------|-------------|
| expanded-change | Emitted when the item's expanded state changes. |
| menu-item-change | Emitted when the menu item is change. |
| ready | Emitted when the component is ready. |

### CSS Custom Properties

| Property | Description |
|----------|-------------|
| `--menu-sub-item-padding-x` | Inline padding inside submenu items. |
| `--menu-sub-item-padding-y` | Block padding inside submenu items. |
| `--menu-sub-item-hover-bg-color` | Background color for submenu items on hover. |
| `--menu-item-border-radius` | Determines the border radius of the menu item. |
| `--menu-item-padding-x` | Determines list item's inline padding. |
| `--menu-item-padding-y` | Determines list item's block padding. |
| `--menu-item-submenu-item-icon-size` | Determines the size of the submenu icon. |
| `--menu-item-submenu-item-icon-rotation` | Determines the rotation of the submenu icon on expanded. |
| `--menu-item-margin-x` | Determines the inline margin of the menu item. |
| `--menu-item-input-container-width` | Determines the width of the input container. |
| `--menu-item-radio-bg-color` | Determines the background color of the radio indicator. |
| `--menu-item-radio-border-color` | Determines the border color of the radio indicator. |
| `--menu-item-radio-hover-bg-color` | Determines the background color of the radio indicator when hovered. |
| `--menu-item-radio-hover-border-color` | Determines the border color of the radio indicator when hovered. |
| `--menu-item-radio-active` | Determines the background color of the radio indicator when active. |
| `--menu-item-radio-active-border-color` | Determines the border color of the radio indicator when active. |
| `--menu-item-bg-color` | Determines the background color. |
| `--menu-item-border-color` | -Determines the border color. |
| `--menu-item-fg-color` | Determines the foreground color. |
| `--menu-item-hover-bg-color` | Determines the background color when hovered. |
| `--menu-item-hover-border-color` | Determines the border color when hovered. |
| `--menu-item-hover-fg-color` | Determines the foreground color when hovered. |
| `--menu-item-active-bg-color` | Determines the background color when active. |
| `--menu-item-active-border-color` | Determines the border color when active. |
| `--menu-item-active-fg-color` | Determines the foreground color when active. |
| `--menu-item-disabled-bg-color` | Determines the background color when disabled. |
| `--menu-item-disabled-border-color` | Determines the border color when disabled. |
| `--menu-item-disabled-fg-color` | Determines the foreground color when disabled. |
| `--menu-item-focus-outline-color` | Determines the outline color when focused. |
| `--menu-item-focus-outline-offset` | Determines the outline offset when focused. |
| `--menu-item-checkbox-icon-size` | Determines the size of the checkbox icon. |
| `--menu-item-input-size` | Determines the size of the input (checkbox or radio). |
| `--menu-item-input-hover-bg-color` | Determines the background color of the input container when hovered. |

### CSS Parts

| Part | Description |
|------|-------------|
| menu-item-base | The control's base. |
| menu-item-checkbox | The control's checkbox. |
| menu-item-checkbox-container | The control's checkbox container. |
| menu-item-checkbox-icon | The control's checkbox icon. |
| menu-item-radio | The control's radio. |
| menu-item-radio-container | The control's radio container. |
| menu-item-radio-indicator | The control's radio indicator. |
| menu-item-submenu-item-icon | The control's submenu icon. |
| menu-item-submenu-item-icon-expanded | The control's submenu icon when expanded. |
