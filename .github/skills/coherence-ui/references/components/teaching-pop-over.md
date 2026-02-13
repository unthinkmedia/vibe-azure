# Teaching Pop Over

**Tag:** `cui-teaching-pop-over`  
**Category:** components  
**Source:** https://coherence-ftekb0dcfpcjb3gv.b02.azurefd.net/resources/teaching-pop-over/

> Web Components

## Import

```js
import '@charm-ux/cui/dist/components/teaching-pop-over/index.js'
```

## Guidance

### Demos

Teaching Pop Over

The Teaching Pop Over is a flexible overlay UI component designed to onboard users and explain new features. It wraps the existing pop-over component and provides a structured, extensible interface with predefined content areas.

Default
Click for tips
With Imagery
Show feature guide
With Custom Header Icon
Icon tip
Minimal Version
Quick tip
Appearance Variants
Default appearanceBrand appearanceInverted appearance

### Teaching Pop Over

- The Teaching Pop Over is a flexible overlay UI component designed to onboard users and explain new features. It wraps the existing pop-over component and provides a structured, extensible interface with predefined content areas.

### Default

- Click for tips

### With Imagery

- Show feature guide

### With Custom Header Icon

- Icon tip

### Minimal Version

- Quick tip

### Appearance Variants

- Default appearanceBrand appearanceInverted appearance

### Integration

- You will need to install the full Coherence for Fluent 2 code package to use this component. Follow the installation instructions in the developer starter kit.
- And then you'll need to include the following imports in your file:
- import '@charm-ux/cui/dist/components/teaching-pop-over/index.js'

### Provide feedback

- Reach out to us if you spot a bug or have a feature request. Your feedback is critical to the success of Coherence and everyone who uses it.
- Contact us on Teams

## Code Examples

### Default

```html
<cui-teaching-popover headerText="Tips">
      <cui-button slot="anchor">Click for tips</cui-button>
      <div slot="heading">Teaching pop over header</div>
      Teaching pop over body text <a href="#">Learn more</a>
      <div slot="footer">
        <cui-button appearance="primary" size="large">
          Try it now
        </cui-button>
        <cui-button size="large">Got it</cui-button>
      </div>
    </cui-teaching-popover>
```

### With Imagery

```html
<cui-teaching-popover headerText="Feature Guide">
      <cui-button slot="anchor">Show feature guide</cui-button>
      <div slot="imagery">
        <div
          style="width: 200px; height: 120px; background: linear-gradient(135deg; #667eea 0%; #764ba2 100%); border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: 600; font-size: 16px;"
        >
          Feature Preview
        </div>
      </div>
      <div slot="heading">Feature preview heading</div>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
      labore et dolore magna aliqua.
      <div slot="footer">
        <cui-button appearance="primary" size="large">
          Primary action
        </cui-button>
        <cui-button size="large">Secondary action</cui-button>
      </div>
    </cui-teaching-popover>
```

### With Custom Header Icon

```html
<cui-teaching-popover headerText="Feature Tip" placement="bottom-start">
      <cui-button slot="anchor">Icon tip</cui-button>
      <span slot="header-icon">
        <svg
          width="16"
          height="17"
          viewBox="0 0 16 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4.5 7C4.5 5.067 6.067 3.5 8 3.5C9.933 3.5 11.5 5.067 11.5 7C11.5 7.97709 11.1003 8.85991 10.4542 9.49541C10.2612 9.68524 10.0912 9.93189 10.0095 10.2314L9.66356 11.5H6.33644L5.99046 10.2314C5.90878 9.93189 5.73883 9.68524 5.54584 9.49541C4.89973 8.85991 4.5 7.97709 4.5 7ZM6.60917 12.5H9.39083L9.21859 13.1316C9.15926 13.3491 8.96168 13.5 8.7362 13.5H7.2638C7.03832 13.5 6.84074 13.3491 6.78141 13.1316L6.60917 12.5ZM8 2.5C5.51472 2.5 3.5 4.51472 3.5 7C3.5 8.25601 4.01523 9.39258 4.8446 10.2083C4.94136 10.3035 5.00044 10.4019 5.02569 10.4945L5.81665 13.3947C5.99463 14.0473 6.58737 14.5 7.2638 14.5H8.7362C9.41263 14.5 10.0054 14.0473 10.1834 13.3947L10.9743 10.4945C10.9996 10.4019 11.0586 10.3035 11.1554 10.2083C11.9848 9.39258 12.5 8.25601 12.5 7C12.5 4.51472 10.4853 2.5 8 2.5Z"
            fill="#616161"
          />
        </svg>
      </span>
      <div slot="heading">Custom header icon</div>
      This teaching pop over uses a custom icon in the header.
      <div slot="footer">
        <cui-button appearance="primary" size="large">
          Got it
        </cui-button>
      </div>
    </cui-teaching-popover>
```

### Minimal Version

```html
<cui-teaching-popover placement="bottom">
      <cui-button slot="anchor">Quick tip</cui-button>
      <div slot="heading">Quick tip</div>
      You can use keyboard shortcuts to navigate faster. Press Ctrl+K to open the command palette.
      <div slot="footer">
        <cui-button appearance="primary" size="large">
          Got it
        </cui-button>
      </div>
    </cui-teaching-popover>
```

### Appearance Variants

```html
<div
      style="display: flex; flex-direction: column; justify-content: space-between; gap: 12rem; width: 320px;"
    >
      {/* Default appearance */}
      <cui-teaching-popover headerText="Tips" appearance="default">
        <cui-button slot="anchor">Default appearance</cui-button>
        <div slot="heading">Default appearance</div>
        This teaching pop over uses the default appearance.
        <div slot="footer">
          <cui-button appearance="primary" size="large">
            Primary
          </cui-button>
          <cui-button appearance="outline" size="large">
            Secondary
          </cui-button>
        </div>
      </cui-teaching-popover>

      {/* Brand appearance */}
      <cui-teaching-popover headerText="Tips" appearance="brand">
        <cui-button slot="anchor">Brand appearance</cui-button>
        <div slot="heading">Brand appearance</div>
        This teaching pop over uses the brand appearance.
        <div slot="footer">
          <cui-button appearance="primary" size="large">
            Primary
          </cui-button>
          <cui-button appearance="outline" size="large">
            Secondary
          </cui-button>
        </div>
      </cui-teaching-popover>

      {/* Inverted appearance */}
      <cui-teaching-popover headerText="Tips" appearance="inverted">
        <cui-button slot="anchor">Inverted appearance</cui-button>
        <div slot="heading">Inverted appearance</div>
        This teaching pop over uses the inverted appearance.
        <div slot="footer">
          <cui-button appearance="primary" size="large">
            Primary
          </cui-button>
          <cui-button appearance="outline" size="large">
            Secondary
          </cui-button>
        </div>
      </cui-teaching-popover>
    </div>
```

## API Reference

### Slots

| Slot | Description |
|------|-------------|
| (default) | Default content slot, including inline links. |
| anchor | Required. The element the teaching popover is anchored to. Extended from pop-over. |
| footer | Required. Button layout for actions. |
| header-icon | Optional. Icon displayed in the header. |
| header-text | Optional string. Displays "Tips" (or similar) in the caption1 strong style. |
| heading | Required. Appears in subtitle2 style as the title. |
| imagery | Optional. Centered image area (288px max width). |

### Attributes

| Attribute | Type | Description | Default |
|-----------|------|-------------|---------|
| appearance | `'default' | 'brand' | 'inverted' | undefined` | Appearance of the pop over. |  |
| arrow | `boolean` |  | `true` |
| arrow-offset | `number | undefined` | The amount of space between the arrow and the edges of the dialog. |  |
| distance | `number` |  | `13` |
| fixed-placement | `boolean | undefined` | Set the popup to use a fixed position strategy. The default strategy works well in most cases, but if overflow is clipped, using a fixed position strategy can often workaround it. |  |
| flip | `boolean` |  | `true` |
| flip-fallback-strategy | `string` |  | `best-fit` |
| flip-padding | `number` |  | `20` |
| header-text | `string | undefined` | The header text. Displays a string like "Tips" in caption1 strong style. | `Tips` |
| heading | `string | undefined` | The heading text. Alternatively, you can use the `he ading` slot. |  |
| hide-arrow | `boolean` | Hides the arrow. | `false` |
| placement | `string` |  | `bottom-start` |
| shift | `boolean` |  | `true` |
| shift-padding | `number` |  | `20` |
| strategy | `string` |  | `absolute` |
| viewport-threshold | `number | undefined` | The minimum amount of space allowed between the edge of the dialog and the edge of the viewport. |  |
| anchor | `Element | string | undefined` | The element the popup will be anchored to. If the anchor lives outside of the popup, you can provide its `id` or a reference to it here. If the anchor lives inside the popup, use the `anchor` slot instead. |  |
| arrow-padding | `number` | The amount of padding between the arrow and the edges of the popup. If the popup has a border-radius, for example, this will prevent it from overflowing the corners. | `10` |
| arrow-placement | `'start' | 'end' | 'center' | 'anchor' | undefined` | The placement of the arrow. |  |
| auto-size | `'horizontal' | 'vertical' | 'both' | undefined` | When set, this will cause the popup to automatically resize itself to prevent it from overflowing. |  |
| autoSizeBoundary | `Element | Element[] | undefined` | The auto-size boundary describes clipping element(s) that overflow will be checked relative to when resizing. By default, the boundary includes overflow ancestors that will cause the element to be clipped. If needed, you can change the boundary by passing a reference to one or more elements to this property. |  |
| auto-size-padding | `number | undefined` | The amount of padding, in pixels, to exceed before the auto-size behavior will occur. |  |
| content-role | `string` | Sets the role of the overlay content. | `dialog` |
| dir | `'ltr' | 'rtl' | 'auto'` | The dir global attribute is an enumerated attribute that indicates the directionality of the element's text. |  |
| flipBoundary | `Element | Element[] | undefined` | The flip boundary describes clipping element(s) that overflow will be checked relative to when flipping. By default, the boundary includes overflow ancestors that will cause the element to be clipped. If needed, you can change the boundary by passing a reference to one or more elements to this property. |  |
| flip-fallback-placements | `string` | If the preferred placement doesn't fit, popup will be tested in these fallback placements until one fits. Must be a string of any number of placements separated by a space, e.g. "top bottom left". If no placement fits, the flip fallback strategy will be used instead. |  |
| focus-trap | `boolean` | Provides keyboard focus trapping within the overlay content. | `false` |
| label | `string | undefined` | The `aria-label` of the popup for assistive technologies. | `popup` |
| open | `boolean` | Indicates whether or not the component is open. Can be used in lieu of show/hide methods. |  |
| shiftBoundary | `Element | Element[] | undefined` | The shift boundary describes clipping element(s) that overflow will be checked relative to when shifting. By default, the boundary includes overflow ancestors that will cause the element to be clipped. If needed, you can change the boundary by passing a reference to one or more elements to this property. |  |
| skidding | `number` | The distance in pixels from which to offset the panel along its anchor. | `0` |
| sync | `'width' | 'height' | 'both' | undefined` | Syncs the popup's width or height to that of the anchor element. |  |

### Events

| Event | Description |
|-------|-------------|
| pop-over-after-hide | Emitted after the pop-over is closed and all transitions are complete. |
| pop-over-after-show | Emitted after the pop-over is visible and all transitions are complete. |
| pop-over-hide | Emitted when the pop-over closes. |
| pop-over-show | Emitted when the pop-over is shown. |
| popup-after-hide | @ignore |
| popup-after-show | @ignore |
| popup-hide | @ignore |
| popup-request-close | Emitted before the pop-over is closed. This may occur by clicking the document outside of the pop-over, clicking the trigger button, pressing the escape key, or clicking the close button. |
| popup-show | @ignore |
| teaching-popover-after-hide | Emitted after the teaching popover is closed and all transitions are complete. |
| teaching-popover-after-show | Emitted after the teaching popover is visible and all transitions are complete. |
| teaching-popover-hide | Emitted when the teaching popover closes. |
| teaching-popover-request-close | Emitted before the teaching popover is closed. |
| teaching-popover-show | Emitted when the teaching popover is shown. |
| popup-reposition | PopupRepositionEvent. Emitted when the popup is repositioned. This event can fire a lot, so avoid putting expensive operations in your listener or consider debouncing it. |
| ready | Emitted when the component is ready. |

### CSS Custom Properties

| Property | Description |
|----------|-------------|
| `--teaching-popover-width` | Width of the teaching popover (default: 320px). |
| `--teaching-popover-padding` | Padding of the teaching popover (default: 16px). |
| `--teaching-popover-border-radius` | Border radius of the teaching popover (default: 4px). |
| `--teaching-popover-imagery-max-width` | Maximum width of the imagery section (default: 288px). |
| `--teaching-popover-shadow` | Box shadow of the teaching popover (default: var(--shadow-16)). |
| `--teaching-popover-header-bottom-spacing` | Bottom spacing for the header section (default: 8px). |
| `--teaching-popover-imagery-bottom-spacing` | Bottom spacing for the imagery section (default: 12px). |
| `--teaching-popover-heading-bottom-spacing` | Bottom spacing for the heading section (default: 8px). |
| `--teaching-popover-footer-top-spacing` | Top spacing for the footer section (default: 24px). |
| `--teaching-popover-arrow-size` | Size of the arrow (inherited from pop-over). |
| `--teaching-popover-bg-color` | The background color of the pop-over and arrow (inherited from pop-over). |
| `--teaching-popover-fg-color` | The foreground color of the dialog (inherited from pop-over). |
| `--teaching-popover-max-height` | Maximum height of pop-over (inherited from pop-over). |
| `--teaching-popover-hide-transition` | Transition for hiding the pop-over (inherited from pop-over). |
| `--teaching-popover-show-transition` | Transition for showing the pop-over (inherited from pop-over). |
| `--pop-over-arrow-size` | Size of the arrow. |
| `--pop-over-border-radius` | Border radius of dialog. |
| `--pop-over-box-shadow` | Box shadow of dialog. |
| `--pop-over-bg-color` | The background color of the pop-over and arrow. |
| `--pop-over-fg-color` | The foreground color of the dialog. |
| `--pop-over-padding` | Padding of pop-over. |
| `--pop-over-max-height` | Maximum height of pop-over. |
| `--pop-over-hide-transition` | Transition for hiding the pop-over. |
| `--pop-over-show-transition:` | Transition for showing the pop-over. |
| `--pop-over-width` | Width of pop-over. |
| `--popup-arrow-color` | The color of the arrow. |
| `--popup-arrow-size` | The size of the arrow. Note that an arrow won't be shown unless the `arrow` attribute is used. |
| `--popup-auto-size-available-height` | A read-only custom property that determines the amount of height the popup can be before overflowing. Useful for positioning child elements that need to overflow. This property is only available when using `auto-size`. |
| `--popup-auto-size-available-width` | A read-only custom property that determines the amount of width the popup can be before overflowing. Useful for positioning child elements that need to overflow. This property is only available when using `auto-size`. |
| `--popup-drop-shadow` | The shadow of the popup, using CSS filter drop-shadow approach, enabling shadowing on non-rectangular shapes. |
| `--popup-hide-transition` | animation when the overlay is hidden. |
| `--popup-show-transition` | animation when the overlay is shown. |
| `--popup-z-index` | controls the CSS z-index value for the overlay content. |

### CSS Parts

| Part | Description |
|------|-------------|
| pop-over-arrow | The arrow's container. Avoid setting `top|bottom|left|right` properties, as these values are assigned dynamically as the popup moves. This is most useful for applying a background color to match the popup, and maybe a border or box shadow. |
| pop-over-base | The component's base container. |
| pop-over-body | Body content of the pop-over. |
| pop-over-content | Container with the main content. |
| pop-over-dialog | The dialog component. |
| pop-over-dialog-wrapper | The dialog's wrapper. |
| pop-over-heading | Container of the heading text. |
| pop-over-overlay | The overlay that covers the screen when the pop-over is open. |
| teaching-popover-body-text | Wraps the body copy. |
| teaching-popover-footer | Wraps footer layout and buttons. |
| teaching-popover-header | Wraps icon + header text + dismiss button. |
| teaching-popover-heading | Wraps the title text. |
| teaching-popover-imagery | Wraps image or animation content. |
| popup-arrow | The arrow's container. Avoid setting `top|bottom|left|right` properties, as these values are assigned dynamically as the popup moves. This is most useful for applying a background color to match the popup, and maybe a border or box shadow. |
| popup-base | The popup's container. Useful for setting a background color, box shadow, etc. |
