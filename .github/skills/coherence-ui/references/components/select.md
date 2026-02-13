# Select

**Tag:** `cui-select`  
**Since:** 1.0.0  
**Status:** Preview  
**Category:** components  
**Source:** https://coherence-ftekb0dcfpcjb3gv.b02.azurefd.net/resources/select/

## Import

```js
import '@charm-ux/cui/dist/components/select/index.js'
```

## Guidance

### Standards

- You must meet the following requirements when using this component.

### Anatomy

- The select is made up of an input and a list. The input includes an arrow icon on the right that indicates that more content is available. Interacting with the input opens the list of options that people can choose from.

### Behavior

When an option is selected from a list of options, the list closes. 


The selected text replaces the helper text unless the selections exceed the width of the container. In that case, the text truncates to the width of the component.

### Know the differences

- Select uses the native browser select component, and works best for making simple, single choice options. Because it uses the native browser functionality, it works well across all devices, including mobile.
- Dropdown allows multiple selections and can also support rich formatting, such as bold, italic, headers, etc.
- Combobox is the most complex component of the three. Along with supporting multiselect, it can filter options, autocomplete, and accept custom inputs.

### Use a decision tree

- Use a select component if there’s only one option to choose.
- Use a dropdown component if it’s a multiselect and/or the options require rich formatting.
- Use a combobox component if it’s a mutiselect and/or needs filters, autocomplete, or other custom options.

### Provide feedback

- Reach out to us if you spot a bug or have a feature request. Your feedback is critical to the success of Coherence and everyone who uses it.
- Contact us on Teams

## Code Examples

### Appearance

Select can have different appearances. The colors adjacent to the input should have a sufficient contrast. Particularly, the color of input with filled darker and lighter styles needs to provide greater than than 3:1 contrast ratio against the immediate surrounding color to pass accessibility requirements.

```html
<div>
      <cui-select appearance="outline" label="Outline">
        <option value="1">Option One</option>
        <option value="2">Option Two</option>
        <option value="3">Option Three</option>
      </cui-select>

      <br />

      <cui-select appearance="underline" label="Underline">
        <option value="1">Option One</option>
        <option value="2">Option Two</option>
        <option value="3">Option Three</option>
      </cui-select>

      <br />

      <cui-select appearance="filled-lighter" label="Filled Lighter">
        <option value="1">Option One</option>
        <option value="2">Option Two</option>
        <option value="3">Option Three</option>
      </cui-select>

      <br />

      <cui-select appearance="filled-darker" label="Filled Darker">
        <option value="1">Option One</option>
        <option value="2">Option Two</option>
        <option value="3">Option Three</option>
      </cui-select>
    </div>
```

## API Reference

### Slots

| Slot | Description |
|------|-------------|
| (default) | A hidden slot for the options provided to the control. |
| end | A slot for content to be placed at the end of the select. |
| label | A placeholder for the select's label. |
| start | A slot for content to be placed at the start of the select. |

### Attributes

| Attribute | Type | Description | Default |
|-----------|------|-------------|---------|
| appearance | `| 'outline' | 'underline' | 'filled-darker' | 'filled-lighter' | undefined` |  |  |
| placeholder | `string` |  |  |
| select-size | `'small' | 'medium' | 'large' | undefined` |  |  |
| autofocus | `boolean` | Focus on the input on page load. | `false` |
| dir | `'ltr' | 'rtl' | 'auto'` | The dir global attribute is an enumerated attribute that indicates the directionality of the element's text. |  |
| disabled | `boolean` | Disables the input. |  |
| error-message | `string` | The input's error message. |  |
| help-text | `string | undefined` | The input's help text. Alternatively, you can use the help-text slot. |  |
| hide-label | `boolean` | Hides the input label and help text. | `false` |
| invalid | `boolean` | This will be true when the control is in an invalid state. Validity is determined by the `required` prop. | `false` |
| label | `string | undefined` | The input's label. If you need to display HTML, you can use the `label` slot instead. |  |
| label-position | `'end' | 'start' | 'top' | undefined` | The position of the label |  |
| multiple | `boolean` | This Boolean attribute indicates that multiple options can be selected in the list. * | `false` |
| name | `string | undefined` | The input's name attribute. |  |
| readonly | `boolean` | Makes the input readonly. |  |
| required | `boolean` | Makes the input a required field. | `false` |
| size | `number | undefined` | This attribute represents the number of rows in the list that should be visible at one time * |  |
| validationMessage | `` | Gets the current validation message, if one exists. |  |
| validity | `ValidityState` | Gets the validity of the input. |  |
| value | `string` | The input's value attribute. |  |

### Events

| Event | Description |
|-------|-------------|
| change | Custom event that indicates a new selection has been made through e.target.value. |
| input | Custom event that indicates a new selection has been made through e.target.value. |
| ready | Emitted when the component is ready. |

### CSS Custom Properties

| Property | Description |
|----------|-------------|
| `--select-placeholder-fg-color` | sets the color for placeholder text. |
| `--select-icon-size` | Determines the chevron size. |
| `--select-option-bg-color` | Determines the background color of the options. |
| `--select-option-fg-color` | Determines the foreground color of the options. |
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
| end | Container for the end slot content. |
| form-control-error-text | The error message container. |
| form-control-error-text-icon | The error message icon. |
| form-control-error-text-message | The error message text. |
| form-control-help-text | The help text container. |
| select-base | The component's base wrapper. |
| select-control | The component's select control. |
| select-control-wrapper | The component's select control wrapper. |
| select-icon | The component's select icon. |
| select-label | The component's label. |
| start | Container for the start slot content. |
