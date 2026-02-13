# Avatar

**Tag:** `cui-avatar`  
**Since:** 1.0.0  
**Status:** Preview  
**Category:** components  
**Source:** https://coherence-ftekb0dcfpcjb3gv.b02.azurefd.net/resources/avatar/

## Import

```js
import '@charm-ux/cui/dist/components/avatar/index.js'
```

## Guidance

### Standards

- You must meet the following requirements when using this component.

### Types

- There are two types of avatars for representing different entities. Circular avatars represent an individual, while square avatars represent any group, like an organization or company.

### Iconography

- Icon properties are not directly included with the component, but you can achieve the same outcome and visual consistency by inserting the icon component.

### Status and activity

- When avatars represent an individual, they can also display their status represented by an icon, or a ring around the entire circle.

### Sizes

Avatars come in a range of sizes, with the smallest measuring 16 pixels and the largest measuring 120 pixels. 


Smaller sizes can be used in areas of a screen where space is constrained and the image isn’t essential to understanding information, while a larger size can be used to draw attention to itself.

### Behavior

- Avatars aren’t interactive by default. However, in scenarios where it’s helpful to show nonessential information associated with the avatar, interactions can be added. Components like popovers can be used to host this kind of secondary information.

### Provide feedback

- Reach out to us if you spot a bug or have a feature request. Your feedback is critical to the success of Coherence and everyone who uses it.
- Contact us on Teams

## API Reference

### Slots

| Slot | Description |
|------|-------------|
| (default) | Utilized for specifying the default element, typically an icon. |
| image | Utilized for specifying a custom image to be used as the avatar. |
| status-indicator | Provides an indicator on the avatar, commonly using a badge or an icon element. This component should have a `label` provided for assistive technologies. |

### Attributes

| Attribute | Type | Description | Default |
|-----------|------|-------------|---------|
| active | `AvatarActive | undefined` | Indicates whether the avatar is in an active state. |  |
| active-appearance | `AvatarActiveAppearance | undefined` |  |  |
| color | `AvatarColor | undefined` | Defines the color theme of the avatar. |  |
| id-for-color | `string | undefined` | Property to determine the color based on an ID |  |
| name | `string` | The name of the avatar user |  |
| shape | `AvatarShape | undefined` | Specifies the shape of the avatar. |  |
| size | `16 | 20 | 24 | 28 | 32 | 36 | 40 | 48 | 56 | 64 | 72 | 96 | 120 | 128 | undefined` | Controls the size of the avatar. |  |
| dir | `'ltr' | 'rtl' | 'auto'` | The dir global attribute is an enumerated attribute that indicates the directionality of the element's text. |  |
| image | `string | undefined` | The image URL for the user's avatar. |  |
| initials | `string | undefined` | The initials of the represented user. |  |
| label | `string | undefined` | The alt text for the avatar. |  |

### Events

| Event | Description |
|-------|-------------|
| ready | Emitted when the component is ready. |

### CSS Custom Properties

| Property | Description |
|----------|-------------|
| `--avatar-font-size` | determine the avatar font size. |
| `--avatar-bg-color` | determine the background color. |
| `--avatar-size` | determine the avatar size. |
| `--avatar-border-radius` | determine a round or square shape of the avatar. |
| `--avatar-indicator-bg-color` | determine the background color of the status indicator. |
| `--avatar-indicator-border-width` | determine the border width of the status indicator. |
| `--avatar-indicator-border-color` | determine the border color of the status indicator. |
| `--avatar-indicator-border-radius` | determine the border radius of the status indicator. |
| `--avatar-indicator-color` | determine the color of the status indicator. |
| `--avatar-indicator-size` | determine the size of the status indicator. |
| `--avatar-indicator-padding` | determine the padding of the status indicator. |

### CSS Parts

| Part | Description |
|------|-------------|
| avatar-background | A wrapper around the default slot and image. |
| avatar-base | A wrapper for the entire avatar. |
| avatar-image | The image tag for the avatar. |
| avatar-initials | A wrapper for the user initials. |
| avatar-status-container | A wrapper for the status indicator. |
