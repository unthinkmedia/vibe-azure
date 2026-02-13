# Text Area

**Tag:** `cui-text-area`  
**Since:** 1.0.0  
**Status:** Preview  
**Category:** components  
**Source:** https://coherence-ftekb0dcfpcjb3gv.b02.azurefd.net/resources/text-area/

## Import

```js
import '@charm-ux/cui/dist/components/text-area/index.js'
```

## Guidance

### Standards

- You must meet the following requirements when using this component.

### Anatomy

- Text area is a larger horizontal container that people select to type their own custom, long-form input. Before any user input, it can optionally use placeholder text. Icons, buttons, or text-based content can also optionally be used at the start or end of the input.

### Button placement

- Buttons are placed at the end of text area below all inputs, not before. Placing completion buttons above inputs could result in forms being incomplete.

### Setting the size

- The height and width of the text area should be the approximate length of the content that you expect people to enter. If the text area has a high character limit, then enable the resize handler. The resize handler allows people to enlarge the size of the text box to see more of what they have written.

### Provide feedback

- Reach out to us if you spot a bug or have a feature request. Your feedback is critical to the success of Coherence and everyone who uses it.
- Contact us on Teams

## Code Examples

### Appearance

The Textarea component offers appearance styles such as outline, filled-darker, and filled-lighter, each providing distinct visual presentations.

```html
<div class="d-flex flex-column gap-md">
      <cui-text-area label="Textarea with Outline appearance" appearance="outline"></cui-text-area>;
      <div class="bg-neutral-0 p-md">
        <cui-text-area label="Textarea with Filled Darker appearance" appearance="outline"></cui-text-area>;
      </div>
      <div class="bg-neutral-0 p-md">
        <cui-text-area label="Textarea with Filled Lighter appearance" appearance="outline"></cui-text-area>;
      </div>
    </div>
```

### Resize

The Textarea component demonstrates different resize options, including none, vertical, horizontal, and both directions.

```html
<div class="d-flex flex-column gap-md">
      <cui-text-area label='Textarea with resize set to "none"' resize="none"></cui-text-area>;
      <cui-text-area label='Textarea with resize set to "vertical"' resize="vertical"></cui-text-area>;
      <cui-text-area label='Textarea with resize set to "horizontal"' resize="horizontal"></cui-text-area>;
      <cui-text-area label='Textarea with resize set to "both"' resize="both"></cui-text-area>;
    </div>
```

### Size

The Textarea component is shown in small, medium, and large sizes to fit various use cases.

```html
<div class="d-flex flex-column gap-md">
      <cui-text-area label="Small Textarea" size="small"></cui-text-area>;
      <cui-text-area label="Medium Textarea" size="medium"></cui-text-area>;
      <cui-text-area label="Large Textarea" size="large"></cui-text-area>;
    </div>
```

## API Reference

### Attributes

| Attribute | Type | Description | Default |
|-----------|------|-------------|---------|
| appearance | `'outline' | 'filled-darker' | 'filled-lighter'` | The `appearance` prop can change how the text area is filled | `outline` |
| rows | `number` |  | `2` |
| size | `'small' | 'medium' | 'large' | undefined` |  |  |
| autocapitalize | `'off' | 'none' | 'on' | 'sentences' | 'words' | 'characters'` | Controls whether and how text input is automatically capitalized as it is entered/edited by the user. | `none` |
| autocomplete | `'off' | 'on' | undefined` | This attribute specifies whether the browser can automatically fill in the control's value. |  |
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
| maxlength | `number | undefined` | The maximum length of input that will be considered valid. |  |
| minlength | `number | undefined` | The minimum length of input that will be considered valid. |  |
| name | `string | undefined` | The input's name attribute. |  |
| placeholder | `string | undefined` | The textarea's placeholder text. |  |
| readonly | `boolean` | Makes the input readonly. |  |
| required | `boolean` | Makes the input a required field. | `false` |
| resize | `'none' | 'horizontal' | 'vertical' | 'both' | undefined` | Controls how the textarea can be resized. |  |
| validationMessage | `` | Gets the current validation message, if one exists. |  |
| validity | `ValidityState` | Gets the validity of the input. |  |
| value | `string` | The input's value attribute. |  |

### Events

| Event | Description |
|-------|-------------|
| blur | Emitted when the control loses focus. |
| change | Emitted when an alteration to the control's value is committed by the user. |
| focus | Emitted when the control gains focus. |
| input | Emitted when the control receives input and its value changes. |
| keydown | Emitted when a key is pressed down while the control is focused. |
| ready | Emitted when the component is ready. |

### CSS Custom Properties

| Property | Description |
|----------|-------------|
| `--textarea-control-input-line-height` | The line-height of the textarea control input. |
| `--textarea-control-input-min-height` | The min-height of the textarea control input. |
| `--textarea-control-input-min-width` | The min-width of the textarea control input. |
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
| textarea-base | The component's base wrapper. |
| textarea-control | The textarea control. |
| textarea-control-input | The textarea input. |
| textarea-label | The textarea label. |
