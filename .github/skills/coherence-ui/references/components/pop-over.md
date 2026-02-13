# Pop Over

**Tag:** `cui-pop-over`  
**Since:** 1.0.0  
**Status:** Preview  
**Category:** components  
**Source:** https://coherence-ftekb0dcfpcjb3gv.b02.azurefd.net/resources/pop-over/

## Import

```js
import '@charm-ux/cui/dist/components/pop-over/index.js'
```

## Guidance

### Standards

- You must meet the following requirements when using this component.

### Anatomy

- The popover is a container that can host simple content layouts and basic UI elements like a button or link. It can optionally use a small beak attached to the main container, to visually indicate the popover's connection to the related information on the page.

### Types

- The popover comes with three style options: default, brand, and inverted. The default style is most commonly used for everyday scenarios where people may come across the information often and don’t rely on the content in the popover. The brand and inverted styles stand out from the rest of the app content, so they can be used to call attention to important information.

### Triggering popover by an icon

- When inline on a page, popovers are most often attached to and accessed by an information icon. The icon is placed alongside the content it references—it typically appears directly next to a text string.

### Dismissing popovers

- Popovers are closed automatically when someone interacts with any UI element outside of the popover itself. A close button can also be used to provide another option that dismisses it. In a sequential popover where it uses multiple pages of content, a button indicating completion, like done or finish, can also be used.

### Customization options

- Popovers can contain a variety of different layouts. In general, the content in any popover is kept brief and simple overall, but they’re flexible with the types of content they contain. They can contain text, images, buttons, and links.

### Limit use of popovers

- Overuse of popovers can be detrimental to an experience. If popovers consistently contain information that doesn’t add to the person’s contextual knowledge, they may begin to ignore them. While popovers are intended to host nonessential information, they should at least convey meaning that is timely and helpful to people and their workflows to ensure the popovers remain valuable.

### Use brand and inverted popovers for high-impact opportunities

- Brand and inverted popovers visually stand out from the rest of an app page, so they can be used strategically to draw attention to important content or functionality. They should be used sparingly to ensure they continue to stand out.

### Provide feedback

- Reach out to us if you spot a bug or have a feature request. Your feedback is critical to the success of Coherence and everyone who uses it.
- Contact us on Teams

## Code Examples

### Breaking out of containers

By default, the callout is positioned using an absolute positioning strategy. However, if your anchor is fixed or exists within a container that has overflow: auto|hidden, the callout risks being clipped. To work around this, you can use a fixed positioning strategy by setting the strategy attribute to fixed.

```html
<div
      style="display: flex; flex-wrap: wrap; align-items: center; gap: var(--spacing-lg); padding: var(--spacing-lg); border: 2px dashed var(--default-border-color); overflow: hidden; position: relative;"
    >
      <cui-pop-over fixed-placement heading="Pop over with `fixed-placement`">
        <cui-button slot="anchor">Pop over with `fixed-placement`</cui-button>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla lectus lectus, facilisis
          laoreet justo in, hendrerit aliquam justo. Etiam tempus dolor vel orci condimentum.
        </p>
      </cui-pop-over>

      <cui-pop-over heading="Pop over clipped">
        <cui-button slot="anchor">Pop over clipped</cui-button>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla lectus lectus, facilisis
          laoreet justo in, hendrerit aliquam justo. Etiam tempus dolor vel orci condimentum.
        </p>
      </cui-pop-over>
    </div>
```

## API Reference

### Slots

| Slot | Description |
|------|-------------|
| (default) | The content of the dialog. |
| anchor | The element the pop-over is anchored to. Clicking this element will trigger it's visibility by default. |
| heading | The pop-over heading text. Alternatively, you can use the `heading` attribute. |

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
| popup-reposition | PopupRepositionEvent. Emitted when the popup is repositioned. This event can fire a lot, so avoid putting expensive operations in your listener or consider debouncing it. |
| ready | Emitted when the component is ready. |

### CSS Custom Properties

| Property | Description |
|----------|-------------|
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
| popup-arrow | The arrow's container. Avoid setting `top|bottom|left|right` properties, as these values are assigned dynamically as the popup moves. This is most useful for applying a background color to match the popup, and maybe a border or box shadow. |
| popup-base | The popup's container. Useful for setting a background color, box shadow, etc. |
