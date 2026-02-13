# Switch

**Tag:** `cui-switch`  
**Since:** 1.0.0  
**Status:** Preview  
**Category:** components  
**Source:** https://coherence-ftekb0dcfpcjb3gv.b02.azurefd.net/resources/switch/

## Import

```js
import '@charm-ux/cui/dist/components/switch/index.js'
```

## Guidance

### Standards

- For the component to be implemented to meet basic accessibility requirements and satisfy user expectations, the following requirements must be true in your app.

### Anatomy

- Switch
- Label

### Types

- Switch can appear alone, in stacked list, or in a table format.

### Content

- Use a noun or short noun phrase for the label that describes the switch setting. Using only nouns in addition to the visual and programmed cues is often enough to infer state.

### Toggle switches are binary and make changes immediately

- Components like checkboxes, radio groups, and dropdowns may require confirmation before changes take place. Toggle switches should never require confirmation.

### Always provide a default selection

- A toggle switch inherently has a default setting. Choose a default setting that makes sense for your user until they choose otherwise.

### Don’t use toggles when you require additional confirmation

- For example, if the user must click a Submit, Next, or Okay button to apply their changes, use a checkbox instead.

### Toggles versus checkboxes

- Avoid toggle switches when there are multiple options available.

### Accessibility

- Every component meets the Microsoft Accessibility Standards (MAS) requirements, which includes headings, keyboard navigation (focus order), screen readers (labels), color contrast, and more. Using our components and following the design standards will get you most of the way to an accessible experience that meets grade C.  To get you the rest of the way to grade C, we recommend running Accessibility Insight's FastPass tool and manually testing your scenarios end to end with a keyboard and screen reader.

### Provide feedback

- Reach out to us if you spot a bug or have a feature request. Your feedback is critical to the success of Coherence and everyone who uses it.
- Contact us on Teams

## API Reference

### Slots

| Slot | Description |
|------|-------------|
| checked-message | The message to display when the toggle is checked. |
| label | The switch's label. |
| unchecked-message | The message to display when the toggle is unchecked. |

### Attributes

| Attribute | Type | Description | Default |
|-----------|------|-------------|---------|
| autofocus | `boolean` | Focus on the input on page load. | `false` |
| checked | `boolean` | Draws the switch in a checked state. |  |
| dir | `'ltr' | 'rtl' | 'auto'` | The dir global attribute is an enumerated attribute that indicates the directionality of the element's text. |  |
| disabled | `boolean` | Disables the input. |  |
| error-message | `string` | The input's error message. |  |
| help-text | `string | undefined` | The input's help text. Alternatively, you can use the help-text slot. |  |
| hide-label | `boolean` | Hides the input label and help text. | `false` |
| invalid | `boolean` | This will be true when the control is in an invalid state. Validity is determined by the `required` prop. | `false` |
| label | `string | undefined` | The input's label. If you need to display HTML, you can use the `label` slot instead. |  |
| label-position | `'end' | 'start' | 'top' | undefined` | The position of the label |  |
| name | `string | undefined` | The input's name attribute. |  |
| readonly | `boolean` | Makes the input readonly. |  |
| required | `boolean` | Makes the input a required field. | `false` |
| validationMessage | `` | Gets the current validation message, if one exists. |  |
| validity | `ValidityState` | Gets the validity of the input. |  |
| value | `string` | The input's value attribute. |  |

### Events

| Event | Description |
|-------|-------------|
| blur | Emitted when the control loses focus. |
| change | Emitted when the control's checked state changes. |
| focus | Emitted when the control gains focus. |
| input | fires when the value of the element has been changed as a direct result of a user action |
| ready | Emitted when the component has completed its initial render. |

### CSS Custom Properties

| Property | Description |
|----------|-------------|
| `--switch-control-active-bg-color` | The background color of the switch control when active. |
| `--switch-control-active-border-color` | The border color of the switch control when active. |
| `--switch-control-bg-color` | The background color of the switch control. |
| `--switch-control-border-color` | The border color of the switch control. |
| `--switch-control-checked-active-bg-color` | The background color of the switch control when checked and active. |
| `--switch-control-checked-active-border-color` | The border color of the switch control when checked and active. |
| `--switch-control-checked-bg-color` | The background color of the switch control when checked. |
| `--switch-control-checked-border-color` | The border color of the switch control when checked. |
| `--switch-control-checked-hover-bg-color` | The background color of the switch control when checked and hovered. |
| `--switch-control-checked-hover-border-color` | The border color of the switch control when checked and hovered. |
| `--switch-control-hover-bg-color` | The background color of the switch control when hovered. |
| `--switch-control-hover-border-color` | The border color of the switch control when hovered. |
| `--switch-control-transition` | The transition effect of the switch control. |
| `--switch-focused-outline` | The outline style of the switch wrapper when the switch is focused. |
| `--switch-height` | The height of the switch. |
| `--switch-thumb-active-bg-color` | The background color of the switch thumb when active. |
| `--switch-thumb-bg-color` | The background color of the switch thumb. |
| `--switch-thumb-checked-active-bg-color` | The background color of the switch thumb when checked and active. |
| `--switch-thumb-checked-bg-color` | The background color of the switch thumb when checked. |
| `--switch-thumb-checked-hover-bg-color` | The background color of the switch thumb when checked and hovered. |
| `--switch-thumb-hover-bg-color` | The background color of the switch thumb when hovered. |
| `--switch-thumb-size` | The size of the thumb. |
| `--switch-thumb-transform` | The shift of the thumb along the x-axis. |
| `--switch-thumb-transition` | The transition effect of the switch thumb. |
| `--switch-width` | The width of the switch. |
| `--default-border` | Determines the border of the control. |
| `--form-control-bg-color` | Determines the background color for the control. |
| `--form-control-border-radius` | Determines the border radius of the control. |
| `--form-control-disabled-bg-color` | Determines the disabled input background color. |
| `--form-control-disabled-border-color` | Determines the disabled input border color. |
| `--form-control-disabled-fg-color` | Determines the disabled input foreground color. |
| `--form-control-disabled-opacity` | Determines the disabled input opacity. |
| `--form-control-fg-color` | Determines the control text color. |
| `--form-control-focus-border-color` | Determines the focused control border color. |
| `--form-control-font-size` | Determines the font size. |
| `--form-control-help-text-fg-color` | Determines the help text color. |
| `--form-control-help-text-font-size` | Determines the help text font size. |
| `--form-control-help-text-font-weight` | Determines the help text font weight. |
| `--form-control-help-text-gap` | Determines the margin after help text. |
| `--form-control-icon-gap` | Determines the margin between start/end icons and the input. |
| `--form-control-input-height` | Determines the input height. |
| `--form-control-invalid-border-color` | Determines the error border color. |
| `--form-control-invalid-message-fg-color` | Determines the error text color. |
| `--form-control-invalid-message-font-size` | Determines the error message font size. |
| `--form-control-label-fg-color` | Determines the label color. |
| `--form-control-label-font-size` | Determines the label font size. |
| `--form-control-label-font-weight` | Determines the label font weight. |
| `--form-control-label-gap` | Determines the margin between label and the control. |
| `--form-control-label-required-indicator-gap` | Determines the margin between the required indicator and the label. |
| `--form-control-padding-x` | Determines the inline padding within the input element. |
| `--form-control-padding-y` | Determines the input block padding within the input element. |
| `--form-control-placeholder-color` | Determines the placeholder text color. |
| `--form-control-range-thumb-size` | Determines thumb size when the input type is range. |
| `--form-control-range-track-margin-top` | Determines the margin-top of the track when the input type is range. |
| `--form-control-range-track-size` | Determines track size when the input type is range. |

### CSS Parts

| Part | Description |
|------|-------------|
| form-control-error-text | The error message container. |
| form-control-error-text-icon | The error message icon. |
| form-control-error-text-message | The error message text. |
| form-control-help-text | The help text container. |
| switch-base | The component's internal wrapper. |
| switch-checked-message | The message to display when the toggle is checked. |
| switch-control | The switch control. |
| switch-label | The switch label. |
| switch-thumb | The switch position indicator. |
| switch-unchecked-message | The message to display when the toggle is unchecked. |
