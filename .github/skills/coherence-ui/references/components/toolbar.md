# Toolbar

**Tag:** `cui-toolbar`  
**Since:** 1.0.0  
**Status:** Preview  
**Category:** components  
**Source:** https://coherence-ftekb0dcfpcjb3gv.b02.azurefd.net/resources/toolbar/

## Import

```js
import '@charm-ux/cui/dist/components/toolbar/index.js'
```

## Guidance

### Standards

- You must meet the following requirements when using this component.

### Anatomy

Toolbars are a flexible component that can contain a wide variety of controls in various formats. Regardless of what the controls are, toolbars are made up of the following shared elements.


1. Base
2. Content
3. Interactive elements (e.g., buttons, icon buttons, input fields, dropdowns, menu buttons)
4. Vertical divider (optional) 
5. Border bottom (optional)
6. Information (optional)

### Size

- Toolbars can have small, medium, or large spacing around the controls.

### Create logical groupings

- Actions in a toolbar should be logically grouped to help people find related subtasks. Use dividers and white space to communicate groupings.

### Toolbars support the main task

- Place toolbars so that they’re useful when people need them, with the commands that people are most likely to want.

### Behavior

- A toolbar will grow to fit its parent container but will never wrap onto a second line. In cases where there are more options than can fit, use the overflow utility. This changes the last option to an overflow menu button that surfaces the rest of the toolbar options. Use a text label along with the toolbar item icon in the overflow menu.

### Content

- Keep text labels on toolbar buttons or in tooltips brief. They should clearly communicate what will happen if that option is selected. Use sentence case and no end punctuation.

### Accessibility

Every component meets the Microsoft Accessibility Standards (MAS) requirements, which includes headings, keyboard navigation (focus order), screen readers (labels), color contrast, and more. Using our components and following the design standards will get you most of the way to an accessible experience that meets grade C.


To get you the rest of the way to grade C, you’ll need to ensure that experiences composed of multiple components are accessible. We recommend running Accessibility Insight's FastPass tool and manually testing your scenarios end to end with a keyboard and screen reader.

### Identify multiple toolbars

- If an app contains more than one toolbar, each one should be labeled using aria-label or aria-labelledby if there’s an available text label.

### Icons can be used as button labels

- Toolbars can use icons as button labels as a space-saving measure when there are many options to present. It’s important to use icons that are familiar and not force people to guess what each icon does. Make sure to provide text labels with a tooltip for visual users and with aria-labels for people who use screen readers.

### Provide feedback

- Reach out to us if you spot a bug or have a feature request. Your feedback is critical to the success of Coherence and everyone who uses it.
- Contact us on Teams

## API Reference

### Slots

| Slot | Description |
|------|-------------|
| (default) | Default slot for toolbar items. |
| anchor | Slot for anchor element for floating toolbar. |
| content | -Slot for content at the end of the toolbar. |

### Attributes

| Attribute | Type | Description | Default |
|-----------|------|-------------|---------|
| anchor | `Element | string | undefined` |  |  |
| floating | `boolean | undefined` | Creates a floating toolbar |  |
| size | `'small' | 'medium' | 'large' | undefined` | The toolbar's height (default medium) |  |
| toolbar | `boolean` |  | `true` |
| dir | `'ltr' | 'rtl' | 'auto'` | The dir global attribute is an enumerated attribute that indicates the directionality of the element's text. |  |
| label | `string | undefined` | A label to use for the button group's aria-label attribute. |  |
| select | `'single' | 'multiple' | null | undefined` | When set to 'single', only one button in the group can be selected at a time, multiple buttons can be selected when set to 'multiple' |  |
| split | `boolean | undefined` | Splits the buttons in the group by removing gap and border radius |  |
| vertical | `boolean | undefined` | Vertically stacks the buttons in the group |  |

### Events

| Event | Description |
|-------|-------------|
| item-selected | For select toolbars, emitted when an item is selected. |
| change | Listens for change events from child buttons when their state changes. |
| ready | Emitted when the component is ready. |

### CSS Custom Properties

| Property | Description |
|----------|-------------|
| `toolbar-bg-color` | background color of the toolbar |
| `toolbar-button-pressed-bg-color` | background color of selected toolbar buttons |
| `toolbar-button-pressed-fg-color` | foreground color of selected toolbar buttons |
| `toolbar-divider-color` | color of toolbar dividers |
| `toolbar-divider-height` | height of toolbar dividers |
| `toolbar-fg-color` | foreground color of the toolbar |
| `toolbar-group-gap` | space between child button groups |
| `toolbar-padding-x` | toolbar horizontal padding |
| `toolbar-padding-y` | toolbar vertical padding |
| `toolbar-transition-in` | for floating toolbars, the enter transition |
| `toolbar-transition-out` | for floating toolbars, the exit transition |
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
| toolbar-base | Allows for custom styles on toolbar base |
| button-group-base | The component's base wrapper. |
