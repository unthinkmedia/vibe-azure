# Tab

**Tag:** `cui-tab`  
**Since:** 1.0.0  
**Status:** Preview  
**Category:** components  
**Source:** https://coherence-ftekb0dcfpcjb3gv.b02.azurefd.net/resources/tab/

> Web Components

## Import

```js
import '@charm-ux/cui/dist/components/tab/index.js'
```

## Guidance

### Integration

- You will need to install the full Coherence for Fluent 2 code package to use this component. Follow the installation instructions in the developer starter kit.
- And then you'll need to include the following imports in your file:
- import '@charm-ux/cui/dist/components/tab/index.js'

### Provide feedback

- Reach out to us if you spot a bug or have a feature request. Your feedback is critical to the success of Coherence and everyone who uses it.
- Contact us on Teams

## API Reference

### Slots

| Slot | Description |
|------|-------------|
| (default) | Tab's content. |
| end | Content to show after the tab's content. |
| start | Content to show before the tab's content. |

### Attributes

| Attribute | Type | Description | Default |
|-----------|------|-------------|---------|
| dir | `'ltr' | 'rtl' | 'auto'` | The dir global attribute is an enumerated attribute that indicates the directionality of the element's text. |  |
| disabled | `boolean | undefined` | Disables the component on page load. |  |
| selected | `boolean | undefined` | Enables a selected tab. |  |

### Events

| Event | Description |
|-------|-------------|
| ready | Emitted when the component is ready. |

### CSS Custom Properties

| Property | Description |
|----------|-------------|
| `--tab-hover-indicator-active-bg-color` | The background color of the hover indicator when the tab is active. |
| `--tab-hover-indicator-bg-color` | The background color of the hover indicator when the tab is hovered. |
| `--tab-hover-indicator-border-radius` | The border radius of the hover indicator. |
| `--tab-hover-indicator-thickness` | The thickness of the hover indicator. |
| `--tab-active-bg-color` | The background color of the tab when active. |
| `--tab-active-border-color` | The border color of the tab when active. |
| `--tab-active-fg-color` | The foreground color of the tab when active. |
| `--tab-active-font-weight` | The font weight of the tab when active. |
| `--tab-bg-color` | The background color of the tab. |
| `--tab-border-color` | The border color of the tab. |
| `--tab-border-radius` | The border radius of the tab. |
| `--tab-border-width` | The width of the tab's border. |
| `--tab-border-style` | The style of the tab's border. |
| `--tab-disabled-bg-color` | The background color of the tab when disabled. |
| `--tab-disabled-border-color` | The border color of the tab when disabled. |
| `--tab-disabled-fg-color` | The foreground color of the tab when disabled. |
| `--tab-disabled-opacity` | The opacity of the tab when disabled. |
| `--tab-fg-color` | The foreground color of the tab. |
| `--tab-focus-bg-color` | The background color of the tab when focused. |
| `--tab-focus-border-color` | The border color of the tab when focused. |
| `--tab-focus-fg-color` | The foreground color of the tab when focused. |
| `--tab-font-size` | The font size of the tab. |
| `--tab-font-weight` | The font weight of the tab. |
| `--tab-gap` | The gap between elements inside the tab. |
| `--tab-hover-bg-color` | The background color of the tab when hovered. |
| `--tab-hover-border-color` | The border color of the tab when hovered. |
| `--tab-hover-fg-color` | The foreground color of the tab when hovered. |
| `--tab-icon-gap` | The gap between an icon and text in the tab. |
| `--tab-icon-size` | The size of icons in the tab. |
| `--tab-padding-x` | The component's inline padding. |
| `--tab-padding-y` | The component's block padding. |
| `--tab-transition` | The transition effect for tab state changes. |

### CSS Parts

| Part | Description |
|------|-------------|
| tab-base | The component's internal wrapper. |
