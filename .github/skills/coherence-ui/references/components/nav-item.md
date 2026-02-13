# Navigation Item

**Tag:** `cui-nav-item`  
**Since:** 1.0.0  
**Status:** Preview  
**Category:** components  
**Source:** https://coherence-ftekb0dcfpcjb3gv.b02.azurefd.net/resources/nav-item/

> Web Components

## Import

```js
import '@charm-ux/cui/dist/components/nav-item/index.js'
```

## Guidance

### Integration

- You will need to install the full Coherence for Fluent 2 code package to use this component. Follow the installation instructions in the developer starter kit.
- And then you'll need to include the following imports in your file:
- import '@charm-ux/cui/dist/components/nav-item/index.js'

### Provide feedback

- Reach out to us if you spot a bug or have a feature request. Your feedback is critical to the success of Coherence and everyone who uses it.
- Contact us on Teams

## API Reference

### Slots

| Slot | Description |
|------|-------------|
| collapse-icon | Utilized for specifying the collapse icon of the nav item. |
| expand-icon | Utilized for specifying the expand icon of the nav item. |
| icon | Utilized for specifying the icon of the nav item. |
| label | Utilized for specifying the label of the nav item. |

### Attributes

| Attribute | Type | Description | Default |
|-----------|------|-------------|---------|
| disabled | `boolean | undefined` | Represents whether the nav item is currently disabled. |  |
| expanded | `boolean` | Sets the expanded state of the nav item. |  |
| href | `string | undefined` | Represents the href of the nav item. |  |
| label | `string | undefined` | Represents the label of the nav item. |  |
| selected | `boolean` | Sets the selected state of the nav item |  |
| split | `boolean | undefined` | Represents whether the nav item is split control. |  |
| target | `TargetTypes | undefined` | Represents the target of the nav item. |  |
| toggle-label | `string | undefined` | Label for the expand toggle button |  |
| dir | `'ltr' | 'rtl' | 'auto'` | The dir global attribute is an enumerated attribute that indicates the directionality of the element's text. |  |

### Events

| Event | Description |
|-------|-------------|
| nav-item-expand | Dispatched when the nav item is expanded. |
| nav-item-select | Dispatched when the nav item is selected. |
| ready | Emitted when the component is ready. |

### CSS Custom Properties

| Property | Description |
|----------|-------------|
| `--nav-item-width` | The width of the nav item. |
| `--nav-item-height` | The height of the nav item. |
| `--nav-item-indicator-color` | The color of the active indicator of the nav item. |
| `--nav-item-indicator-transition` | The transition of the nav item indicator. |
| `--nav-item-transition` | The transition of the nav item. |
| `--nav-item-bg-color` | The background color of the nav item. |
| `--nav-item-fg-color` | The foreground color of the nav item. |
| `--nav-item-hover-bg-color` | The background color of the nav item when hovered. |
| `--nav-item-hover-fg-color` | The foreground color of the nav item when hovered. |
| `--nav-item-active-bg-color` | The background color of the nav item when active. |
| `--nav-item-active-fg-color` | The foreground color of the nav item when active. |
| `--nav-item-icon-size` | The size of the icon of the nav item. |
