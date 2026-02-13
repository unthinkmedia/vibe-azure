# Icon

**Tag:** `cui-icon`  
**Since:** 1.0.0  
**Status:** Preview  
**Category:** components  
**Source:** https://coherence-ftekb0dcfpcjb3gv.b02.azurefd.net/resources/icon/

## Import

```js
import '@charm-ux/cui/dist/components/icon/index.js'
```

## Fluent 2 Icon Dependency

The `cui-icon` component uses icons sourced from the **Fluent 2 Icon Library** (IconCloud). When using the `name` attribute to reference icons by name, the icons must first be **registered** via the project configuration.

### Icon Registration (Required)

The Coherence package ships with only a handful of default icons (checkmark-circle, chevron-down, chevron-right, error-circle, warning-shield). To access the full set of ~80 Fluent 2 icons, you **must** import the project configuration file:

**Web components:**
```js
import '@charm-ux/cui/dist/project-config.js';
```

**React (automatic):** The React wrappers (`@charm-ux/cui/react`) auto-register the project config, so no extra import is needed when using React.

**CDN:**
```html
<script type="module" src="https://coherence-ftekb0dcfpcjb3gv.b02.azurefd.net/cdn/latest/project-config.js"></script>
```

Without importing the project config, using `<cui-icon name="search">` will show a fallback question-mark icon and log a console warning: *"The icon 'search' was used but not registered."*

### Available Registered Icon Names

After importing the project config, the following icon names are available for the `name` attribute:

`accessibility`, `add`, `alert`, `arrow-clockwise`, `arrow-download`, `arrow-left`, `arrow-maximize`, `arrow-minimize`, `arrow-move`, `arrow-redo-regular`, `arrow-reply`, `arrow-right`, `arrow-sort-down`, `arrow-sort-up`, `arrow-sync`, `arrow-undo-regular`, `arrow-upload`, `attach`, `bookmark`, `bookmark-filled`, `bot`, `calendar`, `calendar-clock`, `chat`, `checkmark`, `checkmark-circle`, `chevron-double-left`, `chevron-double-right`, `chevron-down`, `chevron-left`, `chevron-up`, `circle-half-fill`, `clock`, `code-regular`, `comment`, `contact-card`, `copy-filled`, `cut-filled`, `dislike-filled`, `dismiss-circle`, `document-checkmark`, `document-edit`, `document-ribbon`, `emoji-meh`, `emoji-sad`, `error-circle`, `eye-off`, `filter-filled`, `highlight-regular`, `like-filled`, `link-edit-regular`, `link-regular`, `lock-closed`, `lock-open`, `more-horizontal`, `paste-filled`, `person-feedback`, `pin-filled`, `star-filled`, `start-line-horizontal`, `subtract-circle`, `tap-single`, `task-list`, `text-align-center-regular`, `text-align-left-regular`, `text-align-right-regular`, `text-bold-regular`, `text-bullet-list-regular`, `text-clear-formatting-regular`, `text-color-regular`, `text-font-regular`, `text-font-size-regular`, `text-header-1-regular`, `text-header-2-regular`, `text-header-3-regular`, `text-header-4-regular`, `text-header-5-regular`, `text-header-6-regular`, `text-indent-decrease-regular`, `text-indent-increase-regular`, `text-italic-regular`, `text-number-list-ltr-regular`, `text-quote-regular`, `text-strikethrough-regular`, `text-subscript-regular`, `text-superscript-regular`, `text-t-regular`, `text-underline-regular`, `zoom-in`, `zoom-out`

### Custom Icons

If you need an icon not in the registered set, you have two options:
1. **Slot an SVG directly** into the `cui-icon` default slot (see Slots example below)
2. **Use the `url` attribute** to point to an external SVG file
3. **Register custom icons** via `project.updateProject({ icons: { 'my-icon': '<svg>...</svg>' } })` — import `project` from `@charm-ux/fui`

### Browsing Available Icons

Browse the full Fluent 2 icon library at: https://iconcloud.design/browse/Fluent%20System%20Library/Fluent%20Regular

## Guidance

### Standards

- You must meet the following requirements when using this component.

### Anatomy

- Container
- SVG path

### Regular and filled icons

Regular icons are used primarily as a wayfinding device to help people identify and select available actions.


Filled icons are used for highlighting selected states or for smaller moments that need a little more weight and readabililty.

### Color

- Icons paired with text can have color lock-ups depending whether they are stand-alone element, a part of a group, navigation, link, or a button.

### Size

- Icon size varies based on use case and platform. Smaller icons can give information or reinforce an idea, but should not be used for interaction. When choosing size, consider the way someone might move through an experience. The more precise the tool at hand, the smaller the icon can be.

### Standard metaphors

- Use system icons for the following concepts and metaphors. These metaphors are the common and consistent across Fluent apps. Search the IconCloud Fluent System Library for concepts that are not included in this document.

### Accessibility

- Avoid using tooltips alone
. Instead, use the hidden text supplied via the label attribute to describe icon buttons. 
The screen reader reads the label twice if you use tooltips without appropriate labeling.

### Provide feedback

- Reach out to us if you spot a bug or have a feature request. Your feedback is critical to the success of Coherence and everyone who uses it.
- Contact us on Teams

## Code Examples

### Slots

Slots can be used to provide assets by using the default slot or selected slot. The slotted items should typically be <svg/> elements. Providing a name or url property will override the slotted items. Use the selected attribute on Icon to toggle between the two slotted elements.

```html
const [selected, setSelected] = useState(false);

  const handleSwitchChange = () => setSelected(!selected);
<div class="d-flex flex-column gap-sm">
      <cui-icon selected={selected} label="Slotted icon example (circled checkmark)">
        <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M20.5 0C31.5456 0 40.5 8.9543 40.5 20C40.5 31.0456 31.5456 40 20.5 40C9.4543 40 0.5 31.0456 0.5 20C0.5 8.9543 9.4543 0 20.5 0ZM20.5 3C11.1112 3 3.5 10.6112 3.5 20C3.5 29.3888 11.1112 37 20.5 37C29.8888 37 37.5 29.3888 37.5 20C37.5 10.6112 29.8888 3 20.5 3ZM18 22.8786L26.9394 13.9393C27.5252 13.3536 28.4748 13.3536 29.0606 13.9393C29.5932 14.4719 29.6416 15.3052 29.2058 15.8924L29.0606 16.0606L19.0606 26.0606C18.5282 26.5932 17.6948 26.6416 17.1076 26.2058L16.9394 26.0606L11.9393 21.0606C11.3536 20.4748 11.3536 19.5252 11.9393 18.9394C12.4719 18.4068 13.3052 18.3584 13.8924 18.7942L14.0607 18.9394L18 22.8786L26.9394 13.9393L18 22.8786Z"
            fill="#212121"
          />
        </svg>
        <svg
          slot="selected"
          fill="currentColor"
          viewBox="0 0 12 12"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M1 6a5 5 0 1 1 10 0A5 5 0 0 1 1 6Zm7.35-.9a.5.5 0 1 0-.7-.7L5.5 6.54 4.35 5.4a.5.5 0 1 0-.7.7l1.5 1.5c.2.2.5.2.7 0l2.5-2.5Z" />
        </svg>
      </cui-icon>
      <cui-switch onChange={handleSwitchChange}
        label={selected ? 'Selected' : 'Not Selected'}
        labelPosition="end"></cui-switch>
    </div>
```

### Name Attributes

Use the name and selected-name attributes slots to show an icon and selected icon from the default icons provided via the project config. Use the selected attribute on Icon to toggle between the two named icons.

```html
const [selected, setSelected] = useState(false);

  const handleSwitchChange = () => setSelected(!selected);
<div class="d-flex flex-column gap-sm">
      <cui-icon selected={selected}
        name="dismiss"
        selectedName="checkmark"
        label="Name attribute icon example (dismiss or checkmark when selected)"></cui-icon>
      <cui-switch onChange={handleSwitchChange}
        label={selected ? 'Selected' : 'Not Selected'}
        labelPosition="end"></cui-switch>
    </div>
```

### Url Attributes

You can choose to use an icon CDN URL, or host icons alongside your application and use the local URL. Use the url and selected-url property with no name property. name will override url. Use the selected attribute on Icon to toggle between the two URL assets.

```html
<div class="d-flex flex-column gap-sm">
      <cui-icon selected={selected}
        url="https://harmony.azureedge.net/npm/@harmony/enablers/6.3.1/icons/errorbadge.svg"
        selectedUrl="https://harmony.azureedge.net/npm/@harmony/enablers/6.3.1/icons/completed.svg"
        label="URL attribute icon example (error badge or completed icon when selected)"></cui-icon>
      <cui-switch onChange={handleSwitchChange}
        label={selected ? 'Selected' : 'Not Selected'}
        labelPosition="end"></cui-switch>
    </div>
```

## API Reference

### Attributes

| Attribute | Type | Description | Default |
|-----------|------|-------------|---------|
| selected | `boolean` | Determines if selected icon is displayed - requires slotted `selected-icon` or `selectedUrl` to be set | `false` |
| selected-name | `string | undefined` | the name of the selected icon to draw |  |
| selected-url | `string | undefined` | A string that points to a selected icon URL |  |
| dir | `'ltr' | 'rtl' | 'auto'` | The dir global attribute is an enumerated attribute that indicates the directionality of the element's text. |  |
| label | `string | undefined` | Label of the icon for assertive technologies. This is required for accessibility. |  |
| name | `string | undefined` | The name of the icon to draw. |  |
| url | `string | undefined` | A string that points to an external SVG. |  |

### Events

| Event | Description |
|-------|-------------|
| icon-error | Emitted when the icon fails to load. |
| icon-load | Emitted when the icon has loaded. |
| ready | Emitted when the component is ready. |

### CSS Parts

| Part | Description |
|------|-------------|
| icon-base | The base of the icon. |
