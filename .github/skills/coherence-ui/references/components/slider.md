# Slider

**Tag:** `cui-slider`  
**Since:** 1.0.0  
**Status:** Preview  
**Category:** components  
**Source:** https://coherence-ftekb0dcfpcjb3gv.b02.azurefd.net/resources/slider/

## Import

```js
import '@charm-ux/cui/dist/components/slider/index.js'
```

## Guidance

### Standards

- You must meet the following requirements when using this component.

### Anatomy

- Label
- Control knob or thumb
- Track bar
- Min/max values

### Layout

- Slider can be laid out either horizontally or vertically.

### Place values where they can be seen

- Poor placement can result in the wrong selection as fingers or styluses can block values that sit below the track bar on smaller devices.

### Keep values simple

- Making ranges too broad or getting too granular can create frustration for people.

### Accessibility

- Every component meets the Microsoft Accessibility Standards (MAS) requirements, which includes headings, keyboard navigation (focus order), screen readers (labels), color contrast, and more. Using our components and following the design standards will get you most of the way to an accessible experience that meets grade C.  To get you the rest of the way to grade C, we recommend running Accessibility Insight's FastPass tool and manually testing your scenarios end to end with a keyboard and screen reader.

### Provide feedback

- Reach out to us if you spot a bug or have a feature request. Your feedback is critical to the success of Coherence and everyone who uses it.
- Contact us on Teams

## API Reference

### Slots

| Slot | Description |
|------|-------------|
| (default) | The options in the datalist. |
| end | A presentational suffix icon or similar element. |
| label | The input's label. Alternatively, you can use the label prop. |
| start | A presentational prefix icon or similar element. |

### Attributes

| Attribute | Type | Description | Default |
|-----------|------|-------------|---------|
| max | `number` | The input's maximum value. | `10` |
| min | `number` | The input's minimum value. | `0` |
| orientation | `'vertical' | 'horizontal' | undefined` | Orientation of the slider. |  |
| size | `'small' | 'medium' | undefined` | The size of the slider. |  |
| step | `number | undefined` | Stepping interval to specify the level of granularity allowed for value. |  |
| type | `'range'` |  | `range` |
| value | `string` | Value of the slider. |  |
| autocapitalize | `'off' | 'none' | 'on' | 'sentences' | 'words' | 'characters'` | Controls whether and how text input is automatically capitalized as it is entered/edited by the user. | `off` |
| autocomplete | `string | undefined` | Permission the user agent has to provide automated assistance in filling out form field values and the type of information expected in the field. |  |
| autofocus | `boolean` | Focus on the input on page load. | `false` |
| dir | `'ltr' | 'rtl' | 'auto'` | The dir global attribute is an enumerated attribute that indicates the directionality of the element's text. |  |
| disabled | `boolean` | Disables the input. |  |
| enterkeyhint | `'enter' | 'done' | 'go' | 'next' | 'previous' | 'search' | 'send' | undefined` | Used to customize the label or icon of the Enter key on virtual keyboards. |  |
| error-message | `string` | The input's error message. |  |
| help-text | `string | undefined` | The input's help text. Alternatively, you can use the help-text slot. |  |
| hide-label | `boolean` | Hides the input label and help text. | `false` |
| inputmode | `'none' | 'text' | 'decimal' | 'numeric' | 'tel' | 'search' | 'email' | 'url' | undefined` | Hints at the type of data that might be entered by the user while editing the element or its contents. |  |
| invalid | `boolean` | This will be true when the control is in an invalid state. Validity is determined by the `required` prop. | `false` |
| label | `string | undefined` | The input's label. If you need to display HTML, you can use the `label` slot instead. |  |
| label-position | `'end' | 'start' | 'top' | undefined` | The position of the label |  |
| maxlength | `number | undefined` | The input's maxlength attribute. |  |
| minlength | `number | undefined` | The input's minlength attribute. |  |
| name | `string | undefined` | The input's name attribute. |  |
| pattern | `string | undefined` | A pattern to validate input against. |  |
| placeholder | `string | undefined` | The input's placeholder text. |  |
| readonly | `boolean` | Makes the input readonly. |  |
| required | `boolean` | Makes the input a required field. | `false` |
| spellcheck | `boolean` | Enables spell checking on the input. | `false` |
| validationMessage | `` | Gets the current validation message, if one exists. |  |
| validity | `ValidityState` | Gets the validity of the input. |  |
| valueAsDate | `` | Gets or sets the current value as a `Date` object. Only valid when `type` is `date`. |  |
| valueAsNumber | `` | Gets or sets the current value as a number. |  |

### Events

| Event | Description |
|-------|-------------|
| change | Emitted when an alteration to the control's value is committed by the user. |
| input | Emitted when the value is being changed by the user. |
| ready | Emitted when the component is ready. |

### CSS Custom Properties

| Property | Description |
|----------|-------------|
| `--slider-ticks-thickness` | The thickness of the slider's ticks. |
| `--slider-thumb-outline` | The outline of the slider's thumb. |
| `--vertical-slider-height` | Slider height in vertical orientation. |
| `--input-range-active-bg-color` | The background color of the progress track and thumb when the input is active and the input type is `range`. |
| `--input-range-active-fg-color` | The foreground color of the progress track and thumb when the input is active and the input type is `range`. |
| `--input-range-disabled-bg-color` | The background color of the progress track and thumb when the input is disabled and the input type is `range`. |
| `--input-range-disabled-fg-color` | The foreground color of the progress track and thumb when the input is disabled and the input type is `range`. |
| `--input-range-hover-bg-color` | The background color of the progress track and thumb when the input is hovered and the input type is `range`. |
| `--input-range-hover-fg-color` | The foreground color of the progress track and thumb when the input is hovered and the input type is `range`. |
| `--input-range-progress-color` | The color of the slider's track that represents the selected range. |
| `--input-range-thumb-color` | The color of the slider's thumb. |
| `--input-range-track-color` | The color of the slider's track. |
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
| slider-input-control-wrapper | The wrapper of the start slot, form control input, and end slot. |
| end | Container for end slot. |
| form-control-error-text | The error message container. |
| form-control-error-text-icon | The error message icon. |
| form-control-error-text-message | The error message text. |
| form-control-help-text | The help text container. |
| input | The native input element. |
| input-base | The component's base wrapper. |
| input-control | The wrapper for start, input, and end. |
| input-label | The label. |
| start | Container for start slot. |
