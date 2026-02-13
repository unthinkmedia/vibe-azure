# Tooltip

**Tag:** `cui-tooltip`  
**Since:** 1.0.0  
**Status:** Preview  
**Category:** components  
**Source:** https://coherence-ftekb0dcfpcjb3gv.b02.azurefd.net/resources/tooltip/

## Import

```js
import '@charm-ux/cui/dist/components/tooltip/index.js'
```

## Guidance

### Standards

- You must meet the following requirements when using this component.

### Anatomy

- Directional beak/Arrow
- Tooltip content

### Behavior

The tooltip remains in view until it’s actively dismissed, or is no longer valid. 


Once a tooltip is dismissed, it doesn’t reappear on subsequent hovers. This is important for people using zoom, trying to center their view on a specific area without triggering the tooltip and obscuring content.


For those using a keyboard, however, tabbing off and then tabbing back on triggers the tooltip every time while in focus.

### Layout

- Specify the best beak positioning for readability within the context of the UI without blocking interactive elements or other important content. The example on the right shows the tooltip incorrectly blocking a checkbox, creating a usability issue. The component intelligently flips sides if space is too limited on the originally defined side.

### Content

Use the imperative verb form in a tooltip for interactive elements. For example, the tooltip on a checkbox that selects all contacts from a list should read Select all contacts. This is preferable over a declarative verb form, like Selects all contacts.


Be concise, aim to limit the copy to five words or less to avoid text wrapping.

### Communicate information clearly

- Tooltips can’t compensate for incorrect use of color or broken reflows. Follow best practices for color usage and reflow. Don’t use tooltips to communicate information that should be visible on the screen at all times.

### Use operating system tooltips wisely

- Don’t rely on operating system tooltips. Operating system tooltips rely on title attributes, and you won’t reliably know when the tooltip is shown. Using a Fluent tooltip allows for nuanced behavior, such as displaying a tooltip only when text is truncated.

### Accessibility

- Every component meets the Microsoft Accessibility Standards (MAS) requirements, which includes headings, keyboard navigation (focus order), screen readers (labels), color contrast, and more. Using our components and following the design standards gets you most of the way to an accessible experience that meets grade C.  To get you the rest of the way to grade C, run Accessibility Insight's FastPass tool and manually test your scenarios end to end with a keyboard and screen reader.

### Challenges

Tooltips should be used sparingly and for describing elements that can cause confusion on a semantic level (such as to help understanding the meaning of an icon).


Tooltips don’t scale, so they aren’t that helpful to people with low vision. They move away from any mouse movement so they can’t be used with magnification. They also don't appear on keyboard focus for someone who may have a mobility or dexterity disability navigating by keyboard. If you use the title attribute to duplicate link text, screen readers announce them twice.


An accessible tooltip (not relying on the title attribute) uses tab stops. However, each tooltip is a tab (unless the reader disables them) in the screen-reading mode that may significantly slow down the reader.

### ARIA label

The tooltip uses exactly the same text as the ARIA label. Otherwise, it’s read twice. It’s OK to use it if there is a need for additional context, but use caution. For example, a combination of a tooltip that reads Close and an ARIA label Close button is read as Close button close.


For best practices in implementation, tie the tooltip content to the tooltip anchor (associated element) via `aria-describedby` if it is supplemental content, OR use `aria-labelledby` for an icon-only situation that is using the tooltip for a label.

### Provide feedback

- Reach out to us if you spot a bug or have a feature request. Your feedback is critical to the success of Coherence and everyone who uses it.
- Contact us on Teams

## API Reference

### Slots

| Slot | Description |
|------|-------------|
| (default) | The element to anchor the tooltip to. |
| content | The tooltip's content. You can also use the `content` attribute. |

### Attributes

| Attribute | Type | Description | Default |
|-----------|------|-------------|---------|
| appearance | `'inverted' | 'normal' | undefined` | The tooltip's visual appearance. |  |
| anchor | `string | Element | undefined` | When the anchor element is separate from the popup, provide its ID or a reference to the anchor element. |  |
| arrow | `boolean | undefined` | Attaches an arrow pointing to the tooltip. |  |
| content | `string | undefined` | The content to display inside the tooltip. You can use `content` slot instead if you need text formatting. |  |
| dir | `'ltr' | 'rtl' | 'auto'` | The dir global attribute is an enumerated attribute that indicates the directionality of the element's text. |  |
| disabled | `boolean` | Disables/enables the tooltip |  |
| distance | `number | undefined` | The distance in pixels from which to offset the tooltip away from its target. |  |
| fixed-placement | `boolean` | Enable this option to prevent the tooltip from being clipped when the component is placed inside a container with `overflow: auto|hidden|scroll`. |  |
| open | `boolean` | Indicates whether or not the component is open. Can be used in lieu of show/hide methods. |  |
| placement | `PopupPlacement | undefined` | The preferred placement of the tooltip. Note that the actual placement may vary as needed to keep the tooltip inside of the viewport. |  |
| skidding | `number | undefined` | The distance in pixels from which to offset the tooltip along its target. |  |
| trigger | `string` | Controls how the tooltip is activated. Possible options include `click`, `hover`, `focus`, and `manual`. Multiple options can be passed by separating them with a space. When manual is used, the tooltip must be activated programmatically. | `hover focus` |

### Events

| Event | Description |
|-------|-------------|
| ready | Emitted when the component has completed its initial render. |
| tooltip-after-hide | Emitted after the tooltip has hidden and all animations are complete. |
| tooltip-after-show | Emitted after the tooltip has shown and all animations are complete. |
| tooltip-hide | Emitted when the tooltip begins to hide. |
| tooltip-show | Emitted when the tooltip begins to show. |

### CSS Custom Properties

| Property | Description |
|----------|-------------|
| `--tooltip-arrow-border-color` | The border color of the tooltip arrow |
| `--tooltip-arrow-size` | The size of the tooltip arrow |
| `--tooltip-bg-color` | The background color of the tooltip |
| `--tooltip-border-color` | The border color of the tooltip |
| `--tooltip-border-radius` | The border radius of the tooltip |
| `--tooltip-border-style` | The border style of the tooltip |
| `--tooltip-border-width` | The border width of the tooltip |
| `--tooltip-box-shadow` | The box shadow of the tooltip |
| `--tooltip-fg-color` | The foreground color of the tooltip |
| `--tooltip-hide-delay` | The amount of time to wait before hiding the tooltip when hovering. |
| `--tooltip-max-width` | The maximum width of the tooltip. |
| `--tooltip-padding` | The padding of the tooltip |
| `--tooltip-show-delay` | The amount of time to wait before showing the tooltip when hovering. |
| `--tooltip-show-transition` | The transition effect when opening the tooltip |

### CSS Parts

| Part | Description |
|------|-------------|
| body | The tooltip's body. |
| popup-arrow | The popup's `arrow` part. Use this to target the tooltip's arrow. |
| popup-base | The popup's `popup` part. Use this to target the tooltip's popup container. |
| tooltip-base | The component's base wrapper, a `<ch-popup>` element. |
