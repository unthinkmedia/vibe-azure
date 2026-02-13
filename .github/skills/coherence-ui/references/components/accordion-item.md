# Accordion Item

**Tag:** `cui-accordion-item`  
**Since:** 1.0.0  
**Status:** Preview  
**Category:** components  
**Source:** https://coherence-ftekb0dcfpcjb3gv.b02.azurefd.net/resources/accordion-item/

> Web Components

## Import

```js
import '@charm-ux/cui/dist/components/accordion-item/index.js'
```

## Guidance

### Integration

- You will need to install the full Coherence for Fluent 2 code package to use this component. Follow the installation instructions in the developer starter kit.
- And then you'll need to include the following imports in your file:
- import '@charm-ux/cui/dist/components/accordion-item/index.js'

### Composition

- Accordion item leverages the following components:
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
| (default) | The collapsible content of the accordion item. |
| collapse-icon | Custom collapse icon. If no icon is provided, a default icon will be used. |
| end | Content rendered after the content in the toggle element |
| expand-icon | Custom expand icon. If no icon is provided, a default icon will be used. |
| heading | The content of the toggle element. |
| start | Content rendered before the content in the toggle element |

### Attributes

| Attribute | Type | Description | Default |
|-----------|------|-------------|---------|
| dir | `'ltr' | 'rtl' | 'auto'` | The dir global attribute is an enumerated attribute that indicates the directionality of the element's text. |  |
| disabled | `boolean | undefined` | Disables the emitted click event. |  |
| expand-icon-position | `'start' | 'end' | undefined` | Determines whether the expand icon position: 'start' or 'end'. |  |
| heading | `string | undefined` | The content of the toggle element. Can be used in lieu of the slot if only a string is needed. |  |
| heading-level | `HeadingLevel | undefined` | The header level value (1-6) for summary, when summary is rendered as a header. |  |
| open | `boolean` | Indicates whether or not the component is open. Can be used in lieu of show/hide methods. |  |

### Events

| Event | Description |
|-------|-------------|
| accordion-item-open-change | Dispatched when the accordion item is expanded or collapsed. |
| ready | Emitted when the component is ready. |

### CSS Custom Properties

| Property | Description |
|----------|-------------|
| `--accordion-item-border-width` | Sets border width. |
| `--accordion-item-focus-width` | Sets focus width. |
| `--accordion-item-font-size` | Sets font size. |
| `--accordion-item-font-weight` | Sets font weight. |
| `--accordion-item-line-height` | Sets the line height of accordion-item. |
| `--accordion-item-padding-y` | Sets vertical padding. |
| `--accordion-item-padding-x` | Sets horizontal padding. |
| `--accordion-item-bg-color` | Sets background color. |
| `--accordion-item-border-color` | Sets border color. |
| `--accordion-item-fg-color` | Sets foreground color. |
| `--accordion-item-disabled-bg-color` | Sets background color of accordion-item when disabled. |
| `--accordion-item-disabled-border-color` | Sets border color of accordion-item when disabled. |
| `--accordion-item-disabled-fg-color` | Sets foreground color of accordion-item when disabled. |
| `--accordion-item-hover-bg-color` | Sets background color of accordion-item when hovered. |
| `--accordion-item-hover-border-color` | Sets border color of accordion-item when hovered. |
| `--accordion-item-hover-fg-color` | Sets foreground color of accordion-item when hovered. |
| `--accordion-item-focus-bg-color` | Sets background color of accordion-item when focused. |
| `--accordion-item-focus-border-color` | the border color of accordion-item when focused. |
| `--accordion-item-focus-fg-color` | Sets foreground color of accordion-item when focused. |
| `--accordion-item-active-bg-color` | Sets background color of accordion-item when active. |
| `--accordion-item-active-border-color` | Sets border color of accordion-item when active. |
| `--accordion-item-active-fg-color` | Sets foreground color of accordion-item when active. |
| `--accordion-item-indicator-open-transition` | Transition for the icon when opening an accordion item |
| `--accordion-item-indicator-close-transition` | Transition for the icon when closing an accordion item |
| `--accordion-item-open-transition` | Transition for the content when opening an accordion item |
| `--accordion-item-close-transition` | Transition for the content when closing an accordion item |
| `--accordion-item-icon-collapsed-transform` | Sets the transform for the orientation of the icon when collapsed. |
| `--accordion-item-icon-expanded-transform` | Sets the transform for the orientation of the icon when expanded. |
| `--accordion-item-bottom-border-color` | The bottom border color of the accordion item. |
| `--accordion-item-animation-duration` | The duration of the accordion item animation. |
| `--accordion-item-animation-timing-function` | The timing function of the accordion item animation. |
| `--accordion-item-icon-transition` | The transition for the icon when the state changes. |
| `--accordion-item-icon-down-start-transform` | The starting transform for the down icon when the icon position is 'start'. |
| `--accordion-item-icon-down-end-transform` | The starting transform for the down icon when the icon position is 'end'. |

### CSS Parts

| Part | Description |
|------|-------------|
| accordion-item-base | The wrapper element. |
| accordion-item-chevron | The expand/collapse icon. |
| accordion-item-end | The end slot container. |
| accordion-item-heading | The heading element. |
| accordion-item-icon | The wrapper element for the expand/collapse icon. |
| accordion-item-start | The start slot container. |
| accordion-item-summary | The summary element. |
