# Tab Panel

**Tag:** `cui-tab-panel`  
**Since:** 1.0.0  
**Status:** Preview  
**Category:** components  
**Source:** https://coherence-ftekb0dcfpcjb3gv.b02.azurefd.net/resources/tab-panel/

> Web Components

## Import

```js
import '@charm-ux/cui/dist/components/tab-panel/index.js'
```

## Guidance

### Integration

- You will need to install the full Coherence for Fluent 2 code package to use this component. Follow the installation instructions in the developer starter kit.
- And then you'll need to include the following imports in your file:
- import '@charm-ux/cui/dist/components/tab-panel/index.js'

### Provide feedback

- Reach out to us if you spot a bug or have a feature request. Your feedback is critical to the success of Coherence and everyone who uses it.
- Contact us on Teams

## API Reference

### Slots

| Slot | Description |
|------|-------------|
| (default) | The tab panel's content. |

### Attributes

| Attribute | Type | Description | Default |
|-----------|------|-------------|---------|
| dir | `'ltr' | 'rtl' | 'auto'` | The dir global attribute is an enumerated attribute that indicates the directionality of the element's text. |  |

### Events

| Event | Description |
|-------|-------------|
| ready | Emitted when the component is ready. |
| tab-after-hide | Emitted when the tab panel is hidden and the transition is finished. |
| tab-after-show | Emitted when the tab panel is shown and the transition is finished. |
| tab-hide | Emitted when the tab panel is hidden. |
| tab-show | Emitted when the tab panel is shown. |

### CSS Custom Properties

| Property | Description |
|----------|-------------|
| `--tab-panel-padding-x` | The component's inline padding. |
| `--tab-panel-padding-y` | The component's block padding. |
| `--tab-panel-transition` | The transition when showing/hiding. |
| `--tab-panel-border-color` | The border color of the tab panel. |
| `--tab-panel-border-width` | The border width of the tab panel. |
| `--tab-panel-border-style` | The border style of the tab panel. |
| `--tab-panel-border-radius` | The border radius of the tab panel. |
| `--tab-panel-min-height` | The minimum height of the tab panel. |
| `--tab-panel-box-shadow` | The box shadow of the tab panel. |
| `--tab-panel-bg-color` | The background color of the tab panel. |
| `--tab-panel-fg-color` | The foreground color of the tab panel. |

### CSS Parts

| Part | Description |
|------|-------------|
| tab-panel-base | The component's internal wrapper. |
