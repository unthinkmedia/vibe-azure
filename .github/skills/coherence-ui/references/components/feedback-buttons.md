# Feedback Buttons

**Tag:** `cui-feedback-buttons`  
**Since:** 1.0.0  
**Status:** Preview  
**Category:** components  
**Source:** https://coherence-ftekb0dcfpcjb3gv.b02.azurefd.net/resources/feedback-buttons/

> Web Components

## Import

```js
import '@charm-ux/cui/dist/components/feedback-buttons/index.js'
```

## Guidance

### Demos

Default
Initial value

The value can be set to like or dislike.

Disabled

The feedback buttons can be disabled.

Custom tooltip

The content of the tooltip can be changed by using like-label and dislike-label attribute.

With dialog

Listen to the feedback-buttons-change event to open dialogs or panels when value is changed.

### Initial value

- The value can be set to like or dislike.

### Disabled

- The feedback buttons can be disabled.

### Custom tooltip

- The content of the tooltip can be changed by using like-label and dislike-label attribute.

### With dialog

- Listen to the feedback-buttons-change event to open dialogs or panels when value is changed.

### Integration

- You will need to install the full Coherence for Fluent 2 code package to use this component. Follow the installation instructions in the developer starter kit.
- And then you'll need to include the following imports in your file:
- import '@charm-ux/cui/dist/components/feedback-buttons/index.js'

### Composition

- Feedback buttons leverages the following components:
Button
Inputs, Forms
A button triggers a single action or event.
Icon
Identifiers
Icons are visual symbols used to represent ideas, objects, or actions and have semantic purpose within a layout. They communicate messages at a glance, provide interactivity, and draw attention to important information.
Tooltip
Surfaces
A tooltip provides supplemental, contextual information elevated near its target component. Tooltips should be used to provide helpful but non-essential, plaintext information. Don't use them to communicate system feedback. A tooltip is not expected to handle interactive content. If this is necessary behavior, or if you need to deliver robust, formatted information, use a popover instead.

### Provide feedback

- Reach out to us if you spot a bug or have a feature request. Your feedback is critical to the success of Coherence and everyone who uses it.
- Contact us on Teams

## API Reference

### Slots

| Slot | Description |
|------|-------------|
| dislike-icon | The slot for the icon of the "dislike" feedback item. |
| dislike-icon-active | The slot for the active icon of the "dislike" feedback item. |
| dislike-label | The slot for the optional text label next to the "dislike" icon. (Defaults to a visually hidden element with the contents of the `dislike-label` attribute.) |
| like-icon | The slot for the icon of the "like" feedback item. |
| like-icon-active | The slot for the active icon of the "like" feedback item. |
| like-label | The slot for the optional text label next to the "like" icon. (Defaults to a visually hidden element with the contents of the `like-label` attribute.) |

### Attributes

| Attribute | Type | Description | Default |
|-----------|------|-------------|---------|
| buttons | `feedbackButtonsValueType | 'both' | undefined` | Which buttons to include. |  |
| disabled | `boolean | undefined` | Disables the feedback-buttons. |  |
| dislike-label | `string` | Label for the "dislike" button for assistive devices. Defaults to text for "Dislike". | `dislike` |
| label | `string` | Label for the feedback buttons group for assistive devices. | `Provide feedback` |
| like-label | `string` | Label for the "like" button for assistive devices. Defaults to text for "Like". | `like` |
| value | `feedbackButtonsValueType | undefined` | Current feedback-buttons value. |  |
| dir | `'ltr' | 'rtl' | 'auto'` | The dir global attribute is an enumerated attribute that indicates the directionality of the element's text. |  |

### Events

| Event | Description |
|-------|-------------|
| feedback-buttons-change | Event emitted when `value` is changed. |
| ready | Emitted when the component is ready. |

### CSS Custom Properties

| Property | Description |
|----------|-------------|
| `--feedback-buttons-gap` | The gap between the feedback buttons. |
| `--feedback-buttons-icon-size` | Size of icons. |

### CSS Parts

| Part | Description |
|------|-------------|
| feedback-buttons-dislike-button | The "dislike" button element. |
| feedback-buttons-dislike-icon | The default "dislike" icon. |
| feedback-buttons-dislike-icon-active | The default active "dislike" icon. |
| feedback-buttons-dislike-label | The "dislike" visually hidden label element. |
| feedback-buttons-like-button | The "like" button element. |
| feedback-buttons-like-icon | The default "like" icon. |
| feedback-buttons-like-icon-active | The default active "like" icon. |
| feedback-buttons-like-label | The "like" visually hidden label element. |
