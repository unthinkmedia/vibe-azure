# Disclosure

**Tag:** `cui-disclosure`  
**Since:** 1.0.0  
**Status:** Preview  
**Category:** components  
**Source:** https://coherence-ftekb0dcfpcjb3gv.b02.azurefd.net/resources/disclosure/

> Web Components

## Import

```js
import '@charm-ux/cui/dist/components/disclosure/index.js'
```

## Guidance

### Demos

Default

Add disclosure heading and trigger to the trigger slot. The content region is set to the default slot.

Heading
Content expand region
Open

The content region is expanded by setting the open attribute in the <cui-disclosure> element

Heading
Content region
Open direction

By default, the content region expands upwards. To modify the expansion direction to downwards, add the content-below attribute to the <cui-disclosure> element.

Heading
Content region
Preview Mode

The disclosure component can show a preview of the content when closed by setting the --disclosure-closed-max-height CSS custom property to a value other than 0px (the default).

Show More
This is a disclosure with --disclosure-closed-max-height set to a non-zero value. When closed, only a few lines of this text will be shown due to the max-height constraint. When open, all of the content will become visible. You can use this to create collapsible previews for long sections of content without hiding them entirely. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
Transition

The disclosure component supports smooth open/close animations using CSS transitions. Enable animations by setting the --disclosure-show-transition and/or --disclosure-hide-transition custom CSS properties.

Show More
This is a disclosure with --disclosure-closed-max-height set to a non-zero value. When closed, only a few lines of this text will be shown due to the max-height constraint. When open, all of the content will become visible. You can use this to create collapsible previews for long sections of content without hiding them entirely. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

### Default

- Add disclosure heading and trigger to the trigger slot. The content region is set to the default slot.
Heading
Content expand region

### Open

- The content region is expanded by setting the open attribute in the <cui-disclosure> element
Heading
Content region

### Open direction

- By default, the content region expands upwards. To modify the expansion direction to downwards, add the content-below attribute to the <cui-disclosure> element.
Heading
Content region

### Preview Mode

- The disclosure component can show a preview of the content when closed by setting the --disclosure-closed-max-height CSS custom property to a value other than 0px (the default).
Show More
This is a disclosure with --disclosure-closed-max-height set to a non-zero value. When closed, only a few lines of this text will be shown due to the max-height constraint. When open, all of the content will become visible. You can use this to create collapsible previews for long sections of content without hiding them entirely. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

### Show More

const componentTransition = document.querySelector('#disclosure-preview-transition');
    componentTransition.addEventListener('disclosure-show', () => {
      const buttonText = document.querySelector('.button-text-transition');
      if (buttonText) buttonText.textContent = 'Show Less';
    });
    componentTransition.addEventListener('disclosure-hide', () => {
      const buttonText = document.querySelector('.button-text-transition');
      if (buttonText) buttonText.textContent = 'Show More';
    });

### Transition

- The disclosure component supports smooth open/close animations using CSS transitions. Enable animations by setting the --disclosure-show-transition and/or --disclosure-hide-transition custom CSS properties.
Show More
This is a disclosure with --disclosure-closed-max-height set to a non-zero value. When closed, only a few lines of this text will be shown due to the max-height constraint. When open, all of the content will become visible. You can use this to create collapsible previews for long sections of content without hiding them entirely. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

### Integration

- You will need to install the full Coherence for Fluent 2 code package to use this component. Follow the installation instructions in the developer starter kit.
- And then you'll need to include the following imports in your file:
- import '@charm-ux/cui/dist/components/disclosure/index.js'

### Composition

- Disclosure leverages the following components:
Icon
Identifiers
Icons are visual symbols used to represent ideas, objects, or actions and have semantic purpose within a layout. They communicate messages at a glance, provide interactivity, and draw attention to important information.

### Provide feedback

- Reach out to us if you spot a bug or have a feature request. Your feedback is critical to the success of Coherence and everyone who uses it.
- Contact us on Teams

## Code Examples

### Open

The content region is expanded by setting the open attribute in the <cui-disclosure> element

```html
<cui-disclosure>
```

### Open direction

By default, the content region expands upwards. To modify the expansion direction to downwards, add the content-below attribute to the <cui-disclosure> element.

```html
<cui-disclosure>
```

### Preview Mode

The disclosure component can show a preview of the content when closed by setting the --disclosure-closed-max-height CSS custom property to a value other than 0px (the default).

```html
const [isOpen, setIsOpen] = useState(false);
      <div style="max-width: 600px">
        <cui-disclosure
          class="preview-mode"
          onDisclosureHide={() => setIsOpen(false)}
          onDisclosureShow={() => setIsOpen(true)}
        >
          <h3 slot="trigger">
            <cui-button class="disclosure-button">
              <cui-icon slot="start" class="chevron" name="chevron-down"></cui-icon>
              <span class="button-text">{isOpen ? 'Show Less' : 'Show More'}</span>
            </cui-button>
          </h3>
          This is a disclosure with --disclosure-closed-max-height set to a non-zero value. When
          closed, only a few lines of this text will be shown due to the max-height constraint. When
          open, all of the content will become visible. You can use this to create collapsible
          previews for long sections of content without hiding them entirely. Lorem ipsum dolor sit
          amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </cui-disclosure>
      </div>
      <style>
        {`.preview-mode {
          --disclosure-closed-max-height: 4rem;
          --disclosure-gap: 8px;
        }
        .disclosure-button::part(button-control),
        .disclosure-button::part(button-control):hover,
        .disclosure-button::part(button-control):focus {
          color: var(--body-fg-color);
          background-color: transparent;
          border: none;
          box-shadow: none;
        }
        cui-disclosure[open] .chevron {
          transform: rotate(-180deg);
        }`}
      </style>```

### Transition

The disclosure component supports smooth open/close animations using CSS transitions. Enable animations by setting the --disclosure-show-transition and/or --disclosure-hide-transition custom CSS properties.

```html
const [isOpen, setIsOpen] = useState(false);
      <div style="max-width: 600px">
        <cui-disclosure
          class="transition-example"
          onDisclosureShow={() => setIsOpen(true)}
          onDisclosureHide={() => setIsOpen(false)}
        >
          <h3 slot="trigger">
            <cui-button class="disclosure-button">
              <cui-icon slot="start" class="chevron" name="chevron-down"></cui-icon>
              <span class="button-text">{isOpen ? 'Show Less' : 'Show More'}</span>
            </cui-button>
          </h3>
          This is a disclosure with --disclosure-closed-max-height set to a non-zero value. When
          closed, only a few lines of this text will be shown due to the max-height constraint. When
          open, all of the content will become visible. You can use this to create collapsible
          previews for long sections of content without hiding them entirely. Lorem ipsum dolor sit
          amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </cui-disclosure>
      </div>
      <style>
        {`
        .transition-example {
          --disclosure-closed-max-height: 4rem;
          --disclosure-opened-max-height: 16rem;
          --disclosure-gap: 8px;
          --disclosure-show-transition: max-height 0.5s ease-in-out;
          --disclosure-hide-transition: max-height 0.5s ease-in-out;
        }
        .disclosure-button::part(button-control),
        .disclosure-button::part(button-control):hover,
        .disclosure-button::part(button-control):focus {
          color: var(--body-fg-color);
          background-color: transparent;
          border: none;
          box-shadow: none;
        }
        [disclosure][open] .chevron {
          transform: rotate(-180deg);
        }`}
      </style>```

## API Reference

### Slots

| Slot | Description |
|------|-------------|
| (default) | default - Content to be toggled. |

### Attributes

| Attribute | Type | Description | Default |
|-----------|------|-------------|---------|
| content-below | `boolean | undefined` | Controls the expand direction of the component. |  |
| dir | `'ltr' | 'rtl' | 'auto'` | The dir global attribute is an enumerated attribute that indicates the directionality of the element's text. |  |
| open | `boolean` | Indicates whether or not the component is open. Can be used in lieu of show/hide methods. |  |

### Events

| Event | Description |
|-------|-------------|
| disclosure-after-hide | Emitted after the disclosure has hidden and all animations are complete. |
| disclosure-after-show | Emitted after the disclosure has shown and all animations are complete. |
| disclosure-hide | Emitted when the disclosure begins to hide. |
| disclosure-show | Emitted when the disclosure begins to show. |
| ready | Emitted when the component is ready. |

### CSS Custom Properties

| Property | Description |
|----------|-------------|
| `--disclosure-gap` | controls the space between the trigger and the expandable content. |
| `--disclosure-content-border` | controls the border styles of expanded region. |
| `--disclosure-content-border-radius` | controls the border styles of expanded region. |
| `--disclosure-bg-color` | controls the background color of the expanded region. |
| `--disclosure-fg-color` | controls the text color of the expanded region. |
| `--disclosure-closed-max-height` | controls the height of the collapsed region when it's closed (default is 0). |
| `--disclosure-opened-max-height` | controls the height of the collapsed region when it's opened. |
| `--disclosure-open-transition` | Transition for the content when opening. |
| `--disclosure-close-transition` | Transition for the content when closing, |

### CSS Parts

| Part | Description |
|------|-------------|
| disclosure-base | The component's base wrapper. |
| disclosure-content | Wrapper around the main slotted content. |
