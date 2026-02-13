# Menu

**Tag:** `cui-menu`  
**Since:** 1.0.0  
**Status:** Preview  
**Category:** components  
**Source:** https://coherence-ftekb0dcfpcjb3gv.b02.azurefd.net/resources/menu/

## Import

```js
import '@charm-ux/cui/dist/components/menu/index.js'
```

## Guidance

### Standards

- You must meet the following requirements when using this component.

### Anatomy

A menu is a hidden component that’s made visible upon interacting with another component (the trigger), like a button. The menu contains several menu items that initiate specific actions. The menu can optionally include section headers and dividers to group and separate related menu items. 


Menu items are a separate component. They can be customized by adding icons and other functionality, like a nested menu and the ability to select one or multiple menu items.

### Placement by trigger

The menu is placed directly below or next to the component that triggers it opening. Place it based on localization standards, then based on available screen space. 


For right-to-left languages, that means the menu can be placed in two ways: below and aligned to the left side of the trigger, or to the right of and aligned to the top of the trigger. Then, on small screens, the menu can move to wherever it fits in the given window size.

### Submenus

When space allows, place the submenus aligned to the top of the menu item that triggers it. Then, place it based on localization standards. For right-to-left languages, that means the menu is placed directly to the right of the menu.


On small screens, submenus stack directly on top of the menu.

### Section headers and dividers

In menus with many available options, section headers and dividers can be used to help organize the menu items. 


For any menu that is triggered by an icon-only button, a section header can also be used to provide the text label to the button.

### Behavior

By default, the menu treats each menu item as a button that initiates an action. 


Additional selection behavior can be added with the menu item so that one or multiple options in the menu can be selected.


Menu item guidance is coming soon.

### Organizing menu items

Section headers and dividers are both used to organize menu items. They can be used in different ways to create different levels of separation.


Use dividers when additional context might not add value, but the separation helps people scan between options more easily. Use section headers when added context helps people understand the difference between groups of options more easily. Use both in one menu to create the most separation between categories in a menu.

### Provide feedback

- Reach out to us if you spot a bug or have a feature request. Your feedback is critical to the success of Coherence and everyone who uses it.
- Contact us on Teams

## Code Examples

### Secondary Content

```html
<cui-menu>
      <cui-button slot="trigger">Toggle menu</cui-button>
      <cui-menu-item>
        New File
        <div slot="end" class="font-base font-base200 regular fg-neutral-38">
          Ctrl+N
        </div>
      </cui-menu-item>
      <cui-menu-item>
        New Window
        <div slot="end" class="font-base font-base200 regular fg-neutral-38">
          Ctrl+Shift+N
        </div>
      </cui-menu-item>
      <cui-menu-item>
        Open File
        <div slot="end" class="font-base font-base200 regular fg-neutral-38">
          Ctrl+O
        </div>
      </cui-menu-item>
    </cui-menu>
```

### Responsive Nested

```html
const dropdownRef = useRef(null);

  const responsiveStyles = `
    #resizable-container {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 474px;
      height: 406px;
      border: 2px solid var(--brand-background);
      resize: both;
      overflow: hidden;
      padding: 20px 10px 10px;
      position: relative;
    }
    #resizable-container::before {
      content: 'Resizable Area';
      position: absolute;
      top: 0px;
      left: 0px;
      padding: 1px 4px;
      background-color: var(--brand-background);
      color: var(--neutral-foreground-on-brand);
      pointer-events: none;
      letter-spacing: 1px;
      line-height: 1;
      font-family: var(--font-family-base);
      font-weight: 900;
      font-size: 15px;
      font-family: monospace;
    }
  `;

  // Prevent closing the menu when clicking inside the container
  const handleContainerClick = event => {
    if (dropdownRef.current.hasAttribute('open')) {
      event.stopPropagation();
    }

      <style>{responsiveStyles}</style>
      <div id="resizable-container" onClick={handleContainerClick}>
        <cui-menu>
          <cui-button slot="trigger">Menu</cui-button>
          <cui-menu-item>New</cui-menu-item>
          <cui-menu-item>Open Window</cui-menu-item>
          <cui-menu-item ref={dropdownRef}>
            Toggle submenu
            <cui-menu-item>Cut</cui-menu-item>
            <cui-menu-item>Paste</cui-menu-item>
            <cui-menu-item>Edit</cui-menu-item>`{' '}
          </cui-menu-item>
        </cui-menu>
      </div>```

## API Reference

### Slots

| Slot | Description |
|------|-------------|
| (default) | The menu items. |
| trigger | The element which should toggle the menu. |

### Attributes

| Attribute | Type | Description | Default |
|-----------|------|-------------|---------|
| dir | `'ltr' | 'rtl' | 'auto'` | The dir global attribute is an enumerated attribute that indicates the directionality of the element's text. |  |
| fixed-placement | `boolean` | Prevents the menu from being clipped when the component is placed inside a container with `overflow` of 'auto', 'hidden' , or 'scroll'. | `false` |
| open | `boolean` | Indicates whether or not the component is open. Can be used in lieu of show/hide methods. |  |
| placement | `PopupPlacement` | The placement of the menu. | `bottom-start` |
| popup | `` |  |  |

### Events

| Event | Description |
|-------|-------------|
| menu-after-hide | Emitted after the menu content closes and transitions are complete. |
| menu-after-show | Emitted after the menu content is shown and transitions are complete. |
| menu-hide | Emitted when the menu content closes. |
| menu-request-close | Emitted when the user attempts to close the menu. |
| menu-show | Emitted when the menu content is shown. |
| ready | Emitted when the component has completed its initial render. |

### CSS Custom Properties

| Property | Description |
|----------|-------------|
| `--menu-bg-color` | The background color of the menu. |
| `--menu-border-color` | The border color of the menu. |
| `--menu-border-radius` | The border radius of the menu. |
| `--menu-border-style` | The border style of the menu. |
| `--menu-border-width` | The border width of the menu. |
| `--menu-max-width` | The maximum width of the menu. |
| `--menu-min-width` | The minimum width of the menu. |
| `--menu-popup-padding` | The padding to apply to the menu popup. |
| `--menu-shadow` | The shadow of the menu. |
| `--menu-transition` | The transition of the menu. |
| `--menu-width` | The width of the menu. |
| `--menu-z-index` | The z-index of the menu. |

### CSS Parts

| Part | Description |
|------|-------------|
| menu-popup | The popup's base wrapper. |
| menu-popup-base | The popup's internal container. |
