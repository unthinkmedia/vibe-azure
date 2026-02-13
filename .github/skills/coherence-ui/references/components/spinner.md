# Spinner

**Tag:** `cui-spinner`  
**Since:** 1.0.0  
**Status:** Preview  
**Category:** components  
**Source:** https://coherence-ftekb0dcfpcjb3gv.b02.azurefd.net/resources/spinner/

## Import

```js
import '@charm-ux/cui/dist/components/spinner/index.js'
```

## Guidance

### Standards

- You must meet the following requirements when using this component.

### Anatomy

- The spinner is made up of a donut-shaped icon with a rotating stroke of color within it and a label to describe the process.

### Layout

- The label can be placed at the bottom, top, left, or right of the spinner icon.

### In context

- The spinner doesn’t include a title. The title of the page or container associated with the spinner clarifies which section of the page is in the process of loading.

### One spinner per page

- If multiple sections of content on a page are loading, display one spinner to represent that the entire page is loading. Multiple spinners throughout a page can be visually distracting because they’re animated. It can also be more frustrating for people to be waiting for multiple spinners to finish loading instead of just one.

### Provide feedback

- Reach out to us if you spot a bug or have a feature request. Your feedback is critical to the success of Coherence and everyone who uses it.
- Contact us on Teams

## Code Examples

### Size

Spinner can have a specified size. Medium is default.

```html
<div class="d-flex flex-column align-start">
      <cui-spinner labelPosition="after" size="extra-tiny" label="Extra tiny"></cui-spinner>
      <br />
      <cui-spinner labelPosition="after" size="tiny" label="Tiny"></cui-spinner>
      <br />
      <cui-spinner labelPosition="after" size="extra-small" label="Extra small"></cui-spinner>
      <br />
      <cui-spinner labelPosition="after" size="small" label="Small"></cui-spinner>
      <br />
      <cui-spinner labelPosition="after" size="medium" label="Medium"></cui-spinner>
      <br />
      <cui-spinner labelPosition="after" size="large" label="Large"></cui-spinner>
      <br />
      <cui-spinner labelPosition="after" size="extra-large" label="Extra large"></cui-spinner>
      <br />
      <cui-spinner labelPosition="after" size="huge" label="Huge"></cui-spinner>
    </div>
```

### Appearance

```html
const invertedStyle = { backgroundColor: 'var(--brand-background-static)' };
      <cui-spinner label="Default spinner"></cui-spinner>
      <div >
        <br />
        <cui-spinner appearance="inverted" label="Inverted spinner"></cui-spinner>
        <br />
      </div>```

## API Reference

### Slots

| Slot | Description |
|------|-------------|
| (default) | A label to show next to the spinner when the `label` attribute is not provided. |

### Attributes

| Attribute | Type | Description | Default |
|-----------|------|-------------|---------|
| appearance | `'primary' | 'inverted' | undefined` | Controls the appearance of the input |  |
| size | `'extra-tiny' | 'tiny' | 'extra-small' | 'small' | 'medium' | 'large' | 'extra-large' | 'huge' | undefined` | Controls the size of the input |  |
| dir | `'ltr' | 'rtl' | 'auto'` | The dir global attribute is an enumerated attribute that indicates the directionality of the element's text. |  |
| label | `string | undefined` | A custom label rendered under the progress ring. |  |
| label-position | `'below' | 'before' | 'after' | 'above' | undefined` | The position of the progress label. |  |

### Events

| Event | Description |
|-------|-------------|
| ready | Emitted when the component is ready. |

### CSS Custom Properties

| Property | Description |
|----------|-------------|
| `--spinner-stroke-dasharray` | The stroke dash array of the spinner. |
| `--spinner-stroke-dashoffset` | The stroke dash offset of the spinner. |
| `--spinner-gap` | Gap between the ring and the label. |
| `--spinner-image-animation` | Animation for the spinner ring. |
| `--spinner-indicator-animation` | Animation for the spinner indicator. |
| `--spinner-indicator-color` | Color of the shaded in track. |
| `--spinner-label-color` | Font color of the label text. |
| `--spinner-label-font-size` | Font size of the label text. |
| `--spinner-label-font-weight` | Font weight of the label text. |
| `--spinner-label-line-height` | Line height of the label text. |
| `--spinner-ring-size` | Spinner ring's width and height. |
| `--spinner-track-color` | Color of the unshaded track. |
| `--spinner-track-width` | Width of the progress ring indicator. |

### CSS Parts

| Part | Description |
|------|-------------|
| spinner-base | The component's base wrapper. |
| spinner-container | The spinner's container. |
| spinner-image | The spinner's SVG element. |
| spinner-indicator | The spinner's indicator. |
| spinner-label | The spinner's label. |
| spinner-track | The spinner's track. |
