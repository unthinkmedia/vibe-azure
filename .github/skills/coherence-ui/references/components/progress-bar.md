# Progress Bar

**Tag:** `cui-progress-bar`  
**Since:** 1.0.0  
**Status:** Preview  
**Category:** components  
**Source:** https://coherence-ftekb0dcfpcjb3gv.b02.azurefd.net/resources/progress-bar/

## Import

```js
import '@charm-ux/cui/dist/components/progress-bar/index.js'
```

## Guidance

### Standards

- You must meet the following requirements when using this component.

### Anatomy

- The progress bar alone is made up of a gray container that’s gradually filled with the brand color, demonstrating the amount of progress made. It’s used with a label and helper text.

### Types

- There are two types of progress bars, determinate and indeterminate, and each is used for different purposes. In most cases, a determinate progress bar should be used.

### Metered progress bar

- Applying the ‘meter’ role to a progress bar indicates that it measures a specific value (10 of 50 GB storage available) instead of progress towards a specific task (uploaded 10 of 50 GB).

### Cancel button

- If the task can be canceled, place a close button in the upper right, aligned with the baseline of the progress bar label.

### Progress announcements

At a minimum, include progress announcements that occur on process completion. Additional announcements can be included based on specific scenarios. A typically long upload process (several minutes or longer) might announce updates more frequently than a typically short upload process that might only take a few seconds.


Especially in long processes, additional announcements help to reassure people that rely on screen readers that the process is continuing, even while doing other tasks. However, too many announcements can be interruptive. Find a balance that makes sense for your audience and the length of the processes at hand.

### Provide feedback

- Reach out to us if you spot a bug or have a feature request. Your feedback is critical to the success of Coherence and everyone who uses it.
- Contact us on Teams

## Code Examples

### Default Slot

Items slotted to the default slot will take the place of the label, but will be overridden if label is provided. The default slot can be used to pass an icon ato the label as well.

```html
<cui-progress-bar value="70" label="Upload Progress">
      <cui-icon name="warning"></cui-icon> Error Progress Bar
    </cui-progress-bar>
```

## API Reference

### Slots

| Slot | Description |
|------|-------------|
| (default) | A label to show inside the indicator when the `label` attribute is not provided. |
| help-text | The progress bar's help text. |

### Attributes

| Attribute | Type | Description | Default |
|-----------|------|-------------|---------|
| color | `'brand' | 'error' | 'warning' | 'success' | undefined` | Defines the color theme of the progress bar. |  |
| shape | `'rounded' | 'square' | undefined` | The shape of the bar and track. |  |
| thickness | `'medium' | 'large' | undefined` | The thickness of the progress bar. |  |
| dir | `'ltr' | 'rtl' | 'auto'` | The dir global attribute is an enumerated attribute that indicates the directionality of the element's text. |  |
| help-text | `string | undefined` | The input's help text. Alternatively, you can use the help-text slot. |  |
| hide-label | `boolean | undefined` | Hides the input label and help text. |  |
| indeterminate | `boolean | undefined` | When true, percentage is ignored, the label is hidden, and the progress bar is drawn in an indeterminate state. |  |
| label | `string | undefined` | A custom label for the progress bar's aria label. |  |
| max | `number | undefined` | The maximum value, which indicates the task is complete.. |  |
| meter | `boolean | undefined` | Update the role of the progress bar from 'progressbar' to 'meter' to indicate that it measures a specific value instead of progress towards a specific task. |  |
| value | `number | undefined` | The current progress, 0 to `max` or 100 if max is not defined. |  |

### Events

| Event | Description |
|-------|-------------|
| ready | Emitted when the component is ready. |

### CSS Custom Properties

| Property | Description |
|----------|-------------|
| `--form-control-invalid-border-color` | Determines the error border color. |
| `--form-control-invalid-message-fg-color` | Determines the error text color. |
| `--form-control-invalid-message-font-size` | Determines the error message font size. |
| `--form-control-label-fg-color` | Determines the label color. |
| `--form-control-label-font-size` | Determines the label font size. |
| `--form-control-label-font-weight` | Determines the label font weight. |
| `--form-control-label-gap` | Determines the margin between label and the control. |
| `--progress-bar-animation` | The animation for the indeterminate state. |
| `--progress-bar-border-radius` | The border radius of the track. |
| `--progress-bar-height` | The progress bar's track's height. |
| `--progress-bar-icon-color` | The color of the icon in the default slot. |
| `--progress-bar-indicator-color` | The background color of the indicator. |
| `--progress-bar-track-color` | The track color. |
| `--progress-bar-transition` | The transition for the indicator. |

### CSS Parts

| Part | Description |
|------|-------------|
| progress-bar-base | The component's internal wrapper. |
| progress-bar-help-text | The progress bar's help text. |
| progress-bar-indicator | The progress bar indicator. |
| progress-bar-label | The progress bar label. |
| progress-bar-track | The progress bar's track. |
