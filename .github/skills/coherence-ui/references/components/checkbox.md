# Checkbox

**Tag:** `cui-checkbox`  
**Since:** 1.0.0  
**Status:** Preview  
**Category:** components  
**Source:** https://coherence-ftekb0dcfpcjb3gv.b02.azurefd.net/resources/checkbox/

## Import

```js
import '@charm-ux/cui/dist/components/checkbox/index.js'
```

## Guidance

### Standards

- For the component to be implemented to meet basic accessibility requirements and satisfy user expectations, the following requirements must be true in your app.

### Anatomy

- Checkbox
- Label
- Inline message

### Types

- Checkboxes can appear alone or in groups. A collection of checkboxes is called a checkbox group.

### Behavior

If one checkbox can control a subset of options, selecting or clearing the parent checkbox selects or clears all of the children. Use a mixed (indeterminate) state to show when some, but not all, of the options are selected.


Create a visual separation between parent and child checkboxes to increase scannability. For example, indenting the children makes it easy to infer what will happen if someone selects the parent.

### Content

- Use the label to describe a group of checkboxes. If there are selection requirements, include them in the label.
 Try not to repeat words in each option. Instead, include repeated words in the group label to keep the options concise.

### Group options for scannability

- Use the label to describe a group of checkboxes. If there are selection requirements, include them in the label.
 Avoid putting two groups of checkboxes next to each other, as people may read them in the wrong order and get confused.

### Parameters

Checkboxes can serve as an optional or required parameter. Such parameters can save someone time or ensure they follow all steps in a flow.


In this scenario, the checkbox allows you to add an optional parameter, Stay signed in, to the action, Sign in. The next button is active both before and after you check the box.

### Alternate checkboxes

- There are other forms of checkboxes available in the code component, however, the use cases are very specific.

### Accessibility

- Every component meets the Microsoft Accessibility Standards (MAS) requirements, which includes headings, keyboard navigation (focus order), screen readers (labels), color contrast, and more. Using our components and following the design standards will get you most of the way to an accessible experience that meets grade C.To get you the rest of the way to grade C, we recommend running Accessibility Insight's FastPass tool and manually testing your scenarios end to end with a keyboard and screen reader.

### Using fieldset for screen readers

- Whenever possible, group checkboxes using the <fieldset> element with a <legend>. This gives an automatic count of the total options, and the legend serves as the visible label for the group. Its default appearance is a box outline around the included checkboxes and labels, but the outline can be removed using CSS.

### Provide feedback

- Reach out to us if you spot a bug or have a feature request. Your feedback is critical to the success of Coherence and everyone who uses it.
- Contact us on Teams

## Code Examples

### Label Wrapping

The label can be placed before the checkbox.

```html
import { CuiCheckbox } from '@charm-ux/cui/react';

export default () => {
  return (
    <div style="width: 200px;">
      <CuiCheckbox>
        Here is an example of a checkbox with a long label and it starts to wrap to a second line.
      </CuiCheckbox>
    </div>
  );
};
```

## API Reference

### Slots

| Slot | Description |
|------|-------------|
| (default) | Used for the label. |

### Attributes

| Attribute | Type | Description | Default |
|-----------|------|-------------|---------|
| shape | `CheckboxShape` | The shape of the checkbox. | `square` |
| size | `CheckboxSize` | The size of the checkbox. | `medium` |
| autofocus | `boolean` | Focus on the input on page load. | `false` |
| checked | `boolean | undefined` | Draws the checkbox in a checked state. |  |
| dir | `'ltr' | 'rtl' | 'auto'` | The dir global attribute is an enumerated attribute that indicates the directionality of the element's text. |  |
| disabled | `boolean` | Disables the input. |  |
| error-message | `string` | The input's error message. |  |
| help-text | `string | undefined` | The input's help text. Alternatively, you can use the help-text slot. |  |
| hide-label | `boolean` | Hides the input label and help text. | `false` |
| indeterminate | `boolean | undefined` | Draws the checkbox in an indeterminate state. |  |
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
| input | Emitted when the value of the control changes. |
| ready | Emitted when the component is ready. |

### CSS Custom Properties

| Property | Description |
|----------|-------------|
| `--checkbox-active-bg-color-checked` | Background color when checked and active. |
| `--checkbox-active-bg-color-unchecked` | Background color when unchecked and active. |
| `--checkbox-active-border-color` | Border color of checkbox when active. |
| `--checkbox-active-border-color-checked` | Border color of checkbox when checked and active. |
| `--checkbox-active-border-color-unchecked` | Border color of checkbox when unchecked and active. |
| `--checkbox-active-fg-color` | Font color of checkbox when active. |
| `--checkbox-bg-color-checked` | The background color of the checkbox when checked. |
| `--checkbox-bg-color-unchecked` | The background color of the checkbox when unchecked. |
| `--checkbox-border-color-checked` | Border color of checkbox when checked. |
| `--checkbox-border-radius` | The border radius of the checkbox. |
| `--checkbox-disabled-bg-color-checked` | Background color of checkbox when checked and disabled. |
| `--checkbox-disabled-bg-color-unchecked` | Background color of checkbox when unchecked and disabled. |
| `--checkbox-disabled-border-color` | Border color of checkbox when disabled. |
| `--checkbox-disabled-fg-color` | Font color of checkbox when disabled. |
| `--checkbox-fg-color` | Font color of checkbox. |
| `--checkbox-fg-color-checked` | Font color of checkbox when checked. |
| `--checkbox-hover-bg-color-checked` | Background color when checked and hovered over. |
| `--checkbox-hover-bg-color-unchecked` | Background color when unchecked and hovered over. |
| `--checkbox-hover-border-color` | Border color of checkbox while being hovered over. |
| `--checkbox-hover-border-color-checked` | Border color of checkbox when checked and hovered over. |
| `--checkbox-hover-border-color-unchecked` | Border color of checkbox when unchecked and hovered over. |
| `--checkbox-hover-fg-color` | Font color of checkbox when being hovered over. |
| `--checkbox-icon-size` | The size of the checkbox's icon. |
| `--checkbox-size` | The size of the checkbox. |
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
| checkbox | HTML label element, whose purpose is to aid with styling. |
| checkbox-base | The checkbox's base wrapper. |
| checkbox-control | Checkbox visual representation as a span. |
| checkbox-label | The checkbox's label. |
| checkbox-visual-base | Part who parent's the rendered checkbox as a span and its label. |
| form-control-error-text | The error message container. |
| form-control-error-text-icon | The error message icon. |
| form-control-error-text-message | The error message text. |
| form-control-help-text | The help text container. |
