# Button

**Tag:** `cui-button`  
**Since:** 1.0.0  
**Status:** Preview  
**Category:** components  
**Source:** https://coherence-ftekb0dcfpcjb3gv.b02.azurefd.net/resources/button/

## Import

```js
import '@charm-ux/cui/dist/components/button/index.js'
```

## Guidance

### Standards

- You must meet the following requirements when using this component.

### Anatomy

- Container
- Label
- Icon
- Chevron
- Dropdown
- Image
- Secondary text

### Spacing

- Horizontal spacing between buttons is 12 pixels.

### Maintain a consistent order

Primary buttons come first in reading order. 


An exception to this rule is when next and back actions are used. For example, in a wizard flow. Because the flow itself is sequential, the primary button, next, can be placed after the secondary button, back.

### Place single buttons at the bottom left

- This is to maintain the reading order of the page. This also makes the buttons easier to find for some assistive technology users.

### Accessibility

- Every component meets the Microsoft Accessibility Standards (MAS) requirements, which includes headings, keyboard navigation (focus order), screen readers (labels), color contrast, and more. Using our components and following the design standards gets you most of the way to an accessible experience that meets grade C.To get you the rest of the way to grade C, run the Accessibility Insight's FastPass tool and manually test your scenarios end to end with a keyboard and screen reader.

### Toggle button actions and states

- Toggle buttons communicate two pieces of complementary information—the current status of a component and what happens when someone interacts with the component. When possible, use text as well as a change in visible indicator, like a change in icon or color, to convey both pieces of information.

### Color contrast on buttons

To ensure buttons are visually accessible, any button text must pass 4.5:1 and icons must pass 3:1 contrast against their background in all interactive states. As long as text and icons within buttons meet the contrast requirement, there’s no contrast requirement for the button stroke. 


Disabled buttons aren’t interactive and don’t need to pass color contrast.

### Provide feedback

- Reach out to us if you spot a bug or have a feature request. Your feedback is critical to the success of Coherence and everyone who uses it.
- Contact us on Teams

## Code Examples

### Appearance

(undefined): the button appears with the default style.
primary: emphasizes the button as a primary action.
outline: removes background styling.
subtle: minimizes emphasis to blend into the background until hovered or focused.
transparent: removes background and border styling.

```html
import { CuiButton } from '@charm-ux/cui/react';

export default () => {
  return (
    <div className="d-flex gap-md">
      <CuiButton>Default</CuiButton>
      <CuiButton appearance="primary">Primary</CuiButton>
      <CuiButton appearance="outline">Outline</CuiButton>
      <CuiButton appearance="subtle">Subtle</CuiButton>
      <CuiButton appearance="transparent">Transparent</CuiButton>
    </div>
  );
};
```

### Shape

A button can be rounded, circular, or square.
s
```html
import { CuiButton } from '@charm-ux/cui/react';

export default () => {
  return (
    <div className="d-flex gap-md">
        <CuiButton shape="rounded">Rounded</CuiButton>
        <CuiButton shape="circular">Circular</CuiButton>
        <CuiButton shape="square">Square</CuiButton>
    <div/>
  );
};
```

### Size

A button supports small, medium and large size. Default size is medium.

```html
import { CuiButton, CuiIcon } from '@charm-ux/cui/react';

export default () => {
  return (
    <div className="d-flex gap-md">
      <CuiButton size="small">Small</CuiButton>
      <CuiButton size="small">
        Small with icon <CuiIcon slot="start" name="person" />
      </CuiButton>
      <CuiButton size="small" iconOnly>
        <CuiIcon name="person" label="user" />
      </CuiButton>
      <CuiButton size="medium">Medium</CuiButton>
      <CuiButton size="medium">
        Medium with icon <CuiIcon slot="start" name="person" />
      </CuiButton>
      <CuiButton size="medium" iconOnly>
        <CuiIcon name="person" label="user" />
      </CuiButton>
      <CuiButton size="large">Large</CuiButton>
      <CuiButton size="large">
        Large with icon <CuiIcon slot="start" name="person" />
      </CuiButton>
      <CuiButton size="large" iconOnly>
        <CuiIcon name="person" label="user" />
      </CuiButton>
    </div>
  );
};
```

### Icon Position

An icon can be positioned before or after text content within a button.

```html
import { CuiButton } from '@charm-ux/cui/react';

export default () => {
  return (
    <div className="d-flex gap-lg">
      <CuiButton><CuiIcon name="person" slot="start"/>Icon start</CuiButton>
      <CuiButton><CuiIcon name="person" slot="end"/>Icon end</CuiButton>
    <div/>
  );
};
```

### Long Text

Text wraps after it hits the max width of the component.

```html
import { CuiButton } from '@charm-ux/cui/react';

export default () => {
  return (
    <div style={{"width: 300px;"}}>
      <CuiButton>Long text wraps after it hits the max width of the component</CuiButton>
    </div>
  );
};
```

### Toggle Button

A button can be used as a toggle button, which can be clicked on and off.

```html
import { CuiButton } from '@charm-ux/cui/react';

export default () => {
  return (
    <div class="d-flex gap-md">
      <CuiButton toggle>Default</CuiButton>
      <CuiButton toggle appearance="primary">
        Primary
      </CuiButton>
      <CuiButton toggle appearance="outline">
        Outline
      </CuiButton>
      <CuiButton toggle appearance="subtle">
        Subtle
      </CuiButton>
      <CuiButton toggle appearance="transparent">
        Transparent
      </CuiButton>
    </div>
  );
};
```

### Compound Button

Add text to the subtext slot to create a "compound button". Since both primary and secondary textual contents are part of a compound button's name they should be kept concise.

```html
import { CuiButton, CuiIcon } from '@charm-ux/cui/react';

export default () => {
  return (
    <div className="d-flex flex-wrap gap-lg">
      <CuiButton>
        Default Text<span slot="subtext">Secondary content</span>
      </CuiButton>

      <CuiButton>
        With icon<span slot="subtext">Secondary content</span>
        <CuiIcon slot="start" name="search" />
      </CuiButton>

      <CuiButton appearance="primary">
        Primary<span slot="subtext">Secondary content</span>
      </CuiButton>

      <CuiButton appearance="primary">
        Primary<span slot="subtext">Secondary content</span>
        <CuiIcon slot="start" name="search" />
      </CuiButton>
      <CuiButton appearance="outline">
        Outline<span slot="subtext">Secondary content</span>
      </CuiButton>

      <CuiButton appearance="subtle">
        Suble<span slot="subtext">Secondary content</span>
      </CuiButton>
      <CuiButton appearance="transparent">
        Transparent<span slot="subtext">Secondary content</span>
      </CuiButton>
      <CuiButton appearance="primary" disabled>
        Primary<span slot="subtext">Secondary content</span>
      </CuiButton>
    </div>
  );
};
```

## API Reference

### Slots

| Slot | Description |
|------|-------------|
| subtext | The subtext of the button. |
| (default) | The button's content. |
| end | A presentational suffix icon or similar element. |
| start | A presentational prefix icon or similar element. |

### Attributes

| Attribute | Type | Description | Default |
|-----------|------|-------------|---------|
| appearance | `'default' | 'primary' | 'outline' | 'subtle' | 'transparent' | 'link' | 'subtle-link' | undefined` | Appearance of the button | `default` |
| shape | `'rounded' | 'circular' | 'square' | undefined` | Shape of the button | `rounded` |
| size | `'small' | 'medium' | 'large' | undefined` | Size of the button | `medium` |
| allow-wrap | `boolean` | An optional toggle that allows text to wrap. Helper for longer text scenarios. | `false` |
| autofocus | `boolean` | Auto focuses the component on page load. | `false` |
| current | `'page' | 'step' | 'location' | 'date' | 'time' | 'true' | 'false' | null | undefined` | Sets "aria-current" on the internal button or link. |  |
| dir | `'ltr' | 'rtl' | 'auto'` | The dir global attribute is an enumerated attribute that indicates the directionality of the element's text. |  |
| disabled | `boolean | undefined` | Disables the component on page load. |  |
| download | `string | undefined` | Downloads the linked file as the filename. Only used when `href` is set. |  |
| expanded | `boolean | undefined` | Sets "aria-expanded" on the internal button or link. |  |
| hides | `string | undefined` | referencing a dismissible element's ID, this button will hide it when clicked |  |
| href | `string | undefined` | When set, the underlying button will be rendered as an `<a>` with this `href` instead of a `<button>`. |  |
| icon-only | `boolean | undefined` | Allows component to render using only the icon as visual element. Optional, default is false, associated attribute is 'icon-only' |  |
| name | `string | undefined` | An optional name for the button. Ignored when `href` is set. |  |
| pressed | `boolean | undefined` | Sets "aria-pressed" on the internal button or link. |  |
| referrerpolicy | `| 'no-referrer' | 'no-referrer-when-downgrade' | 'origin' | 'origin-when-cross-origin' | 'same-origin' | 'strict-origin' | 'strict-origin-when-cross-origin' | 'unsafe-url' | (string & {})` | Defining which referrer is sent when fetching the resource. Only applies to links. | `strict-origin-when-cross-origin` |
| shows | `string | undefined` | referencing a dismissible element's ID, this button will show it when clicked |  |
| target | `'_blank' | '_parent' | '_self' | '_top' | (string & {}) | undefined` | Tells the browser where to open the link. Only used when `href` is set. |  |
| toggle | `boolean` | Allows a toggling behavior on the component that emits change event if not disabled. Only when is a button. | `false` |
| toggles | `string | undefined` | referencing a dismissible element's ID, this button will show/hide it when clicked |  |
| type | `'button' | 'submit' | 'reset'` | Allows the component to be treated standalone or part of a form. The type of button. When the type is `submit`, the button will submit the surrounding form. Note that the default value is `button` instead of `submit`, which is opposite of how native `<button>` elements behave. | `button` |
| value | `string | undefined` | An optional value for the button. Ignored when `href` is set. |  |

### Events

| Event | Description |
|-------|-------------|
| button-compound-change | Emitted when the compound state of the button changes. |
| blur | Custom event that indicates when focus is lost. |
| change | Custom event that indicates the current toggling state through e.target.pressed. |
| focus | Custom event that indicates when focus is gained. |
| ready | Emitted when the component is ready. |

### CSS Custom Properties

| Property | Description |
|----------|-------------|
| `--button-subtext-fg-color` | The foreground color of the subtext. |
| `--button-subtext-font-size` | The font size of the subtext. |
| `--button-active-bg-color` | Sets the background color of the button when active. |
| `--button-active-border-color` | Sets the border color of the button when active. |
| `--button-active-fg-color` | Sets button's text color when active. |
| `--button-active-shadow` | Sets button's box-shadow when active. |
| `--button-bg-color` | Sets the background color of the button. |
| `--button-border-color` | Sets the border color of the button. |
| `--button-border-radius` | Sets button's border-radius. |
| `--button-border-size` | Sets the border width of the button. |
| `--button-border-style` | Sets the border style of the button. |
| `--button-content-gap` | Determines the spacing between the slots. |
| `--button-disabled-bg-color` | Sets the background color of the button when disabled. |
| `--button-disabled-border-color` | Sets the border color of the button when disabled. |
| `--button-disabled-fg-color` | Sets button's text color when disabled. |
| `--button-disabled-shadow` | Sets button's box-shadow when disabled. |
| `--button-fg-color` | Sets button's text color. |
| `--button-focus-bg-color` | Sets the background color of the button when focused. |
| `--button-focus-border-color` | Sets the border color of the button when focused. |
| `--button-focus-fg-color` | Sets button's text color when focused. |
| `--button-focus-shadow` | Sets button's box-shadow when focused. |
| `--button-hover-bg-color` | Sets the background color of the button when hovered. |
| `--button-hover-border-color` | Sets the border color of the button when hovered. |
| `--button-hover-fg-color` | Sets button's text color when hovered. |
| `--button-hover-shadow` | Sets button's box-shadow when hovered. |
| `--button-icon-size` | Sets the height and width of the slotted icon and svg. |
| `--button-padding-x` | Determines left and right padding. |
| `--button-padding-y` | Determines top and bottom padding. |
| `--button-shadow` | Sets button's box-shadow. |
| `--button-pressed-bg-color` | Sets the background color of the button when toggled. |
| `--button-pressed-border` | Sets the border of the button when toggled. |
| `--button-pressed-fg-color` | Sets button's text color when toggled. |

### CSS Parts

| Part | Description |
|------|-------------|
| subtext | The subtext of the button. |
| button-control | The component's base wrapper. |
| content | The button's label. |
| end | The container that wraps the suffix. |
| start | The container that wraps the prefix. |
