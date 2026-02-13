# Button Group

**Tag:** `cui-button-group`  
**Since:** 1.0.0  
**Status:** Preview  
**Category:** components  
**Source:** https://coherence-ftekb0dcfpcjb3gv.b02.azurefd.net/resources/button-group/

> Web Components

## Import

```js
import '@charm-ux/cui/dist/components/button-group/index.js'
```

## Guidance

### Demos

Button Group

Button groups can be used to group related buttons into sections.

Left
Center
Right
Styles

Button Group can reflect the appearance style of its Buttons: primary, outline, subtle, and transparent.

Left
Center
Right
Left
Center
Right
Left
Center
Right
Left
Center
Right
Left
Center
Right
Menu

Any member of a Button Group can contain a menu dropdown.

Button
Button
Dropdown
Vertical

Button Groups can be displayed vertically by setting the vertical attribute.

First
Inner
Inner
Last
Split

Button Groups can be displayed as a single button with sections by setting the split attribute.

First
Accept
Dropdown
Select

The select attribute can be used to create a button group that allows for single or multiple selections.

Single Selection
First
Inner
Last
Multiple Selection
First
Inner
Last
Toolbar

Adding the toolbar attribute enhances button groups with keyboard navigation and the "toolbar" role.

Overflow

Button groups can be made responsive by wrapping them in a ButtonGroupOverflow component.

Home
About
Contact
Account
Settings
Help

### Button Group

- Button groups can be used to group related buttons into sections.
Left
Center
Right

### Styles

- Button Group can reflect the appearance style of its Buttons: primary, outline, subtle, and transparent.
Left
Center
Right
Left
Center
Right
Left
Center
Right
Left
Center
Right
Left
Center
Right

### Menu

- Any member of a Button Group can contain a menu dropdown.
Button
Button
Dropdown

### Vertical

- Button Groups can be displayed vertically by setting the vertical attribute.
First
Inner
Inner
Last

### Split

- Button Groups can be displayed as a single button with sections by setting the split attribute.
First
Accept
Dropdown

### Select

- The select attribute can be used to create a button group that allows for single or multiple selections.
Single Selection
First
Inner
Last
Multiple Selection
First
Inner
Last

### Toolbar

- Adding the toolbar attribute enhances button groups with keyboard navigation and the "toolbar" role.

### Overflow

- Button groups can be made responsive by wrapping them in a ButtonGroupOverflow component.
Home
About
Contact
Account
Settings
Help

### Integration

- You will need to install the full Coherence for Fluent 2 code package to use this component. Follow the installation instructions in the developer starter kit.
- And then you'll need to include the following imports in your file:
- import '@charm-ux/cui/dist/components/button-group/index.js'

### Provide feedback

- Reach out to us if you spot a bug or have a feature request. Your feedback is critical to the success of Coherence and everyone who uses it.
- Contact us on Teams

## Code Examples

### Styles

Button Group can reflect the appearance style of its Buttons: primary, outline, subtle, and transparent.

```html
<div class="d-flex flex-column gap-md">
      <cui-button-group>
        <cui-button appearance="primary">Left</cui-button>
        <cui-button appearance="primary">Center</cui-button>
        <cui-button appearance="primary">Right</cui-button>
      </cui-button-group>

      <cui-button-group>
        <cui-button appearance="outline">Left</cui-button>
        <cui-button appearance="outline">Center</cui-button>
        <cui-button appearance="outline">Right</cui-button>
      </cui-button-group>

      <cui-button-group>
        <cui-button appearance="subtle">
          <cui-icon slot="start" name="warning"></cui-icon>
          Left
        </cui-button>
        <cui-button appearance="subtle">
          <cui-icon slot="start" name="warning"></cui-icon>
          Center
        </cui-button>
        <cui-button appearance="subtle">
          <cui-icon slot="start" name="warning"></cui-icon>
          Right
        </cui-button>
      </cui-button-group>

      <cui-button-group>
        <cui-button appearance="transparent">Left</cui-button>
        <cui-button appearance="transparent">Center</cui-button>
        <cui-button appearance="transparent">Right</cui-button>
      </cui-button-group>

      <cui-button-group>
        <cui-button
          href="https://fluent2.microsoft.design/components/web/react/button/code"
          target="_blank"
        >
          Left
        </cui-button>
        <cui-button
          href="https://fluent2.microsoft.design/components/web/react/button/code"
          target="_blank"
        >
          Center
        </cui-button>
        <cui-button
          href="https://fluent2.microsoft.design/components/web/react/button/code"
          target="_blank"
        >
          Right
        </cui-button>
      </cui-button-group>

      <cui-button-group>
        <cui-button>
          <cui-icon name="warning" label="Left"></cui-icon>
        </cui-button>
        <cui-button>
          <cui-icon name="warning" label="Center"></cui-icon>
        </cui-button>
        <cui-button>
          <cui-icon name="warning" label="Right"></cui-icon>
        </cui-button>
      </cui-button-group>
    </div>
```

## API Reference

### Slots

| Slot | Description |
|------|-------------|
| (default) | One or more Button or Menu elements to display in the button group. |

### Attributes

| Attribute | Type | Description | Default |
|-----------|------|-------------|---------|
| dir | `'ltr' | 'rtl' | 'auto'` | The dir global attribute is an enumerated attribute that indicates the directionality of the element's text. |  |
| label | `string | undefined` | A label to use for the button group's aria-label attribute. |  |
| select | `'single' | 'multiple' | null | undefined` | When set to 'single', only one button in the group can be selected at a time, multiple buttons can be selected when set to 'multiple' |  |
| split | `boolean | undefined` | Splits the buttons in the group by removing gap and border radius |  |
| toolbar | `boolean | undefined` | When set, the button group will behave like a toolbar with a roving tab index, arrow keyboard interaction, and a role of toolbar |  |
| vertical | `boolean | undefined` | Vertically stacks the buttons in the group |  |

### Events

| Event | Description |
|-------|-------------|
| change | Listens for change events from child buttons when their state changes. |
| ready | Emitted when the component is ready. |

### CSS Custom Properties

| Property | Description |
|----------|-------------|
| `--button-group-divider-color` | Sets the divider color when the button is in a button group, defaults to --button-fg-color. |
| `--button-group-divider-height` | Sets the divider height when the button is in a button group, defaults to 100% for horizontal button groups, 1px for vertical groups. |
| `--button-group-divider-width` | Sets the divider width when the button is in a button group, defaults to 100% for vertical button groups, 1px for horizontal groups. |
| `--button-group-gap` | Sets the gap between each button. |
| `--button-pressed-bg-color` | Sets the pressed background color of each button. |
| `--button-pressed-border` | Sets the pressed border of each button. |
| `--button-bg-color` | Sets the background color of the button group when split. |
| `--button-border-color` | Sets the border color of the button group when split. |
| `--button-border-radius` | Sets border radius for the button group when split. |
| `--button-border-size` | Sets the border width of the button group when split. |
| `--button-border-style` | Sets the border style of the button group when split. |
| `--button-focus-border-color` | Sets the border color when focused and split. |
| `--button-hover-border-color` | Sets the border color when hovered and split. |
| `--button-disabled-border-color` | Sets the border color when disabled and split. |

### CSS Parts

| Part | Description |
|------|-------------|
| button-group-base | The component's base wrapper. |
