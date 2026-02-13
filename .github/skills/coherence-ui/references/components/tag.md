# Tag

**Tag:** `cui-tag`  
**Since:** 1.0.0  
**Status:** Preview  
**Category:** components  
**Source:** https://coherence-ftekb0dcfpcjb3gv.b02.azurefd.net/resources/tag/

## Import

```js
import '@charm-ux/cui/dist/components/tag/index.js'
```

## Guidance

### Standards

- You must meet the following requirements when using this component.

### Tag

The default tag comes with two shape options: circular and rounded square. They always include a primary text string, and can optionally include a secondary text string and an icon or avatar.


The default tag is used any time that the tag isn’t editable, such as when viewing recipients of an email in an inbox.

### Interaction tag

The interaction tag has the same elements as the default tag, but also includes the options to add a dismiss button and a secondary customizable interaction. 


The interaction tag is used any time that the tag is editable, such as when writing an email and choosing the recipients.

### Secondary interaction

- A common example of a secondary interaction on a tag is adding a popover with more details associated with the tag content. A tag referencing a person might have a secondary interaction that displays the person’s email and working location.

### Overflow

- An interaction tag showing the number of additional tags can be used when the entire set of tags doesn’t fit into the designated container. On click or hover, the remaining tags appear in a menu.

### Email recipients

- In an email app, someone sending an email can type recipients’ emails into an input field. The selected recipients appear in tags.

### Provide feedback

- Reach out to us if you spot a bug or have a feature request. Your feedback is critical to the success of Coherence and everyone who uses it.
- Contact us on Teams

## Code Examples

### Start slot

A tag can have an icon or avatar in its start slot.

```html
<div class="d-flex gap-s-nudge">
      <cui-tag>
        Avatar
        <cui-avatar slot="start" shape="square" name="Lydia Bauer">
          <cui-badge slot="status-indicator" size="extra-small" status="available"></cui-badge>
        </cui-avatar>
      </cui-tag>
      <cui-tag>
        Icon
        <cui-icon slot="start" name="person"></cui-icon>
      </cui-tag>
    </div>
```

## API Reference

### Slots

| Slot | Description |
|------|-------------|
| default | The primary content of the tag. |
| dismiss-icon | Slot for the dismiss icon. |
| start | Visual prefix icon or similar element. |

### Attributes

| Attribute | Type | Description | Default |
|-----------|------|-------------|---------|
| appearance | `'brand' | 'filled' | 'outline' | undefined` | A Tag can have filled, outline, or brand experience |  |
| disabled | `boolean | undefined` | A tag can be disabled |  |
| dismissible | `boolean | undefined` | A Tag can be dismissible |  |
| dismiss-label | `string | undefined` |  |  |
| secondary-text | `string | undefined` | A tag can have secondary text |  |
| shape | `'circular' | 'rounded' | undefined` | A Tag can have rounded or circular shape |  |
| size | `'medium' | 'small' | 'extra-small' | undefined` | A Tag has three sizes |  |
| autofocus | `boolean` | Auto focuses the component on page load. | `false` |
| dir | `'ltr' | 'rtl' | 'auto'` | The dir global attribute is an enumerated attribute that indicates the directionality of the element's text. |  |

### Events

| Event | Description |
|-------|-------------|
| dismiss | custom event that indicates when the dismiss icon has been clicked |
| ready | Emitted when the component is ready. |

### CSS Custom Properties

| Property | Description |
|----------|-------------|
| `--tag-avatar-size` | determines the size of the avatar if present. |
| `--tag-avatar-font-size` | determines the font size of the avatar if present. |
| `--tag-bg-color` | determines the background color. |
| `--tag-border-color` | determines the border color. |
| `--tag-border-radius` | determines the border radius. |
| `--tag-border-style` | determines the border style. |
| `--tag-border-width` | determines the border width. |
| `--tag-fg-color` | determines the foreground color. |
| `--tag-disabled-bg-color` | determines the background color when disabled. |
| `--tag-disabled-border-color` | determines the border color when disabled. |
| `--tag-disabled-fg-color` | determines the foreground color when disabled. |
| `--tag-hover-bg-color` | determines the background color when hovered. |
| `--tag-hover-border-color` | determines the border color when hovered. |
| `--tag-hover-fg-color` | determines the foreground color when hovered. |
| `--tag-focus-bg-color` | determines the background color when focused. |
| `--tag-focus-border-color` | determines the border color when focused. |
| `--tag-focus-fg-color` | determines the foreground color when focused. |
| `--tag-active-bg-color` | determines the background color when active. |
| `--tag-active-border-color` | determines the border color when active. |
| `--tag-active-fg-color` | determines the foreground color when active. |
| `--tag-dismiss-fg-hover-color` | determines the border radius. |
| `--tag-dismiss-fg-active-color` | determines the border radius. |

### CSS Parts

| Part | Description |
|------|-------------|
| tag-base | The component's base wrapper. |
| tag-dismiss-icon | The container that wraps the dismiss icon. |
| tag-primary | The container for the primary content. |
| tag-secondary | The container for the secondary content. |
| tag-start | The container that wraps the prefix. |
