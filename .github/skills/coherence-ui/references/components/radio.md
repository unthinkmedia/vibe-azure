# Radio

**Tag:** `cui-radio`  
**Since:** 1.0.0  
**Status:** Preview  
**Category:** components  
**Source:** https://coherence-ftekb0dcfpcjb3gv.b02.azurefd.net/resources/radio/

> Web Components

## Import

```js
import '@charm-ux/cui/dist/components/radio/index.js'
```

## Guidance

### Demos

Default
Banana
Label subtext

Radio's label supports any formatted text. In this example, smaller text is below the main label text.

Banana

This is an example subtext of the first option
Pear

This is some more example subtext
Checked

A Radio button can be set as checked.

Checked radio
Disabled

A Radio button can be set as disabled.

Disabled radio

### Default

- Banana

### Label subtext

- Radio's label supports any formatted text. In this example, smaller text is below the main label text.
Banana

This is an example subtext of the first option
Pear

This is some more example subtext

### Checked

- A Radio button can be set as checked.
- Checked radio

### Disabled

- A Radio button can be set as disabled.
- Disabled radio

### Integration

- You will need to install the full Coherence for Fluent 2 code package to use this component. Follow the installation instructions in the developer starter kit.
- And then you'll need to include the following imports in your file:
- import '@charm-ux/cui/dist/components/radio/index.js'

### Composition

- Radio leverages the following components:
Icon
Identifiers
Icons are visual symbols used to represent ideas, objects, or actions and have semantic purpose within a layout. They communicate messages at a glance, provide interactivity, and draw attention to important information.

### Provide feedback

- Reach out to us if you spot a bug or have a feature request. Your feedback is critical to the success of Coherence and everyone who uses it.
- Contact us on Teams

## Code Examples

### Label subtext

Radio's label supports any formatted text. In this example, smaller text is below the main label text.

```html
const subtextStyle = {
    fontSize: 'var(--font-size-base200)';
    color: 'var(--neutral-foreground3)';

<cui-radio>Banana
      <br />
      <div>
        <cui-icon name="warning"></cui-icon>
        <span >This is an example subtext of the first option</span>
      </div>
    </cui-radio>
    <cui-radio>Pear
      <br />
      <div >This is some more example subtext</div>
    </cui-radio>
```

## API Reference

### Slots

| Slot | Description |
|------|-------------|
| (default) | The radio's label. |

### Attributes

| Attribute | Type | Description | Default |
|-----------|------|-------------|---------|
| autofocus | `boolean` | Focus on the radio on page load. | `false` |
| checked | `boolean | undefined` | This toggles the selected status for the radio and is for use when a radio button is used outside of a radio group. When used within a radio group, this value be overridden by the radio group's value. |  |
| dir | `'ltr' | 'rtl' | 'auto'` | The dir global attribute is an enumerated attribute that indicates the directionality of the element's text. |  |
| disabled | `boolean | undefined` | Disables the radio. |  |
| hide-label | `boolean | undefined` | Hides the input label. |  |
| label | `string | undefined` | The input's label. Alternatively, you can use the default slot. |  |
| readonly | `boolean | undefined` | Makes the input readonly. |  |
| value | `string | undefined` | The radio's value attribute. |  |
| vertical | `boolean | undefined` | The layout direction of the radio. |  |

### Events

| Event | Description |
|-------|-------------|
| blur | Emitted when the control loses focus. |
| focus | Emitted when the control gains focus. |
| ready | Emitted when the component has completed its initial render. |
| selected | Emitted when the radio is selected. |

### CSS Custom Properties

| Property | Description |
|----------|-------------|
| `--radio-active-bg-color` | The background color of the radio control when active. |
| `--radio-active-border-color-checked` | The border color of the checked radio control when active. |
| `--radio-active-border-color-unchecked` | The border color of the unchecked radio control when active. |
| `--radio-bg-color` | The color of the icon inside radio control when the radio is checked. |
| `--radio-border-color` | The border color of the radio control. |
| `--radio-checked-border-color` | The border color of the radio control when the radio is checked. |
| `--radio-control-size` | The size of the radio button. |
| `--radio-disabled-bg-color` | The background color of the radio control when disabled. |
| `--radio-disabled-border-color` | The border color of the radio control when disabled. |
| `--radio-hover-bg-color` | The background color of the radio control when hovered. |
| `--radio-hover-border-color-checked` | The border color of the checked radio control when hovered. |
| `--radio-hover-border-color-unchecked` | The border color of the unchecked radio control when hovered. |
| `--radio-indicator-size` | The size of the checked indicator inside radio control. |
| `--radio-label-active-fg-color` | The color of the radio label when active. |
| `--radio-label-checked-fg-color` | The color of the radio label when the radio is checked. |
| `--radio-label-checked-hover-fg-color` | The color of the radio label when the radio is checked and hovered. |
| `--radio-label-disabled-color` | The color of the radio label when disabled. |
| `--radio-label-unchecked-hover-fg-color` | The color of the radio label when the radio is unchecked and hovered. |

### CSS Parts

| Part | Description |
|------|-------------|
| radio-base | The component's internal wrapper. |
| radio-checked-icon | The container the wraps the checked icon. |
| radio-control | The radio control. |
| radio-label | The radio label. |
