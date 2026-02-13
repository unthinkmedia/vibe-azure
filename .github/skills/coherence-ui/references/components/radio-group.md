# Radio Group

**Tag:** `cui-radio-group`  
**Since:** 1.0.0  
**Status:** Preview  
**Category:** components  
**Source:** https://coherence-ftekb0dcfpcjb3gv.b02.azurefd.net/resources/radio-group/

## Import

```js
import '@charm-ux/cui/dist/components/radio-group/index.js'
```

## Guidance

### Standards

- For the component to be implemented to meet basic accessibility requirements and satisfy user expectations, the following requirements must be true in your app.

### Anatomy

- Label
- Radio buttons

### Provide feedback

- Reach out to us if you spot a bug or have a feature request. Your feedback is critical to the success of Coherence and everyone who uses it.
- Contact us on Teams

## API Reference

### Slots

| Slot | Description |
|------|-------------|
| (default) | The default slot where radio controls are placed. |
| help-text | Help text that describes how to use the input. Alternatively, you can use the `help-text` attribute. |
| label | The radio group label. Required for proper accessibility. Alternatively, you can use the `label` attribute. |

### Attributes

| Attribute | Type | Description | Default |
|-----------|------|-------------|---------|
| autofocus | `boolean` | Focus on the input on page load. | `false` |
| dir | `'ltr' | 'rtl' | 'auto'` | The dir global attribute is an enumerated attribute that indicates the directionality of the element's text. |  |
| disabled | `boolean` | Disables the input. |  |
| error-message | `string` | The input's error message. |  |
| help-text | `string | undefined` | The input's help text. Alternatively, you can use the help-text slot. |  |
| hide-label | `boolean` | Hides the input label and help text. | `false` |
| invalid | `boolean` | This will be true when the control is in an invalid state. Validity is determined by the `required` prop. | `false` |
| label | `string | undefined` | The input's label. If you need to display HTML, you can use the `label` slot instead. |  |
| label-position | `'end' | 'start' | 'top' | undefined` | The position of the label |  |
| layout | `'horizontal' | 'vertical' | 'horizontal-stacked' | undefined` | How the radio items are laid out in the group. |  |
| name | `string | undefined` | The input's name attribute. |  |
| readonly | `boolean` | Makes the input readonly. |  |
| required | `boolean` | Makes the input a required field. | `false` |
| validationMessage | `` | Gets the current validation message, if one exists. |  |
| validity | `ValidityState` | Gets the validity of the input. |  |
| value | `string` | The input's value attribute. |  |

### Events

| Event | Description |
|-------|-------------|
| blur | Emitted when the radio group loses focus. |
| change | Emitted when the radio group's selected value changes. |
| focus | Emitted when the radio group gains focus. |
| input | fires when the value of the element has been changed as a direct result of a user action |
| ready | Emitted when the component is ready. |

### CSS Custom Properties

| Property | Description |
|----------|-------------|
| `--radio-group-radio-gap` | The gap between radio buttons. |
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
| form-control-error-text | The control's error text's wrapper. |
| form-control-error-text-icon | The error message icon. |
| form-control-error-text-message | The error message text. |
| form-control-help-text | The help text container. |
| radio-group-base | The component's internal wrapper. |
| radio-group-help-text | The help text's wrapper. |
| radio-group-label | The radio group's label. |
| radio-group-radios | Wrapper around the default slot. |
