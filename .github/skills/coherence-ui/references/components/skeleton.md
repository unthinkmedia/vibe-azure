# Skeleton

**Tag:** `cui-skeleton`  
**Since:** 1.0.0  
**Status:** Preview  
**Category:** components  
**Source:** https://coherence-ftekb0dcfpcjb3gv.b02.azurefd.net/resources/skeleton/

## Import

```js
import '@charm-ux/cui/dist/components/skeleton/index.js'
```

## Guidance

### Standards

- You must meet the following requirements when using this component.

### Anatomy

- Skeleton

### Behavior

Skeletons have two animation styles: wave and pulse. Wave is the default animation and provides the smoothest transition. In most cases, especially those with a lot of skeletons on screen at once, stick with wave for a fluid experience.  
Whenever possible, make simultaneous calls for data to avoid staggered loading. If a staggered load is unavoidable, make sure the skeleton animations stay in sync. Otherwise, the experience may start to feel busy and fragmented.

### Best practices

Skeleton UI should be built using simple shapes like rectangles and circles. Adding more detail may result in confusion once the UI loads. 


Skeleton should be used to help ease a UI transition. This provides feedback to the user that the application is still functioning when content takes time to load. 


If a load time of more than 10 seconds is expected, use a progress indicator with written details to set expectations for the user.

### Accessibility

- Every component meets the Microsoft Accessibility Standards (MAS) requirements, which includes headings, keyboard navigation (focus order), screen readers (labels), color contrast, and more. Using our components and following the design standards will get you most of the way to an accessible experience that meets grade C.  To get you the rest of the way to grade C, we recommend running Accessibility Insight's FastPass tool and manually testing your scenarios end to end with a keyboard and screen reader.

### Focusable components

- If a loading component is focusable and showing skeleton content, make sure to include an accessible name or label to communicate that it’s loading. After content is loaded, ensure that keyboard focus doesn’t get disrupted.

### Live regions and aria-busy

For larger or more important blocks of skeleton content, consider implementing a live region (aria-live) to inform screen readers when the content is finished loading. Live regions can become disruptive if used incorrectly, so be sure that aren’t too many live regions and set the appropriate politeness level to avoid constantly interrupting the screen reader announcements. 


If you have multiple skeletons in a live region but aren’t sure they will update simultaneously, try aria-busy. You can set aria-busy to true to make screen readers wait until all content is loaded before making an announcement. Once the content is loaded, set aria-busy to false to let screen readers know content is ready.

### Provide feedback

- Reach out to us if you spot a bug or have a feature request. Your feedback is critical to the success of Coherence and everyone who uses it.
- Contact us on Teams

## Code Examples

### Row

You can make more complex wireframes using the basic building blocks of the Skeleton.

```html
<div style="display: grid; grid-template-columns: 20px 20% 20% 15% 15%; grid-template-rows: 20px; gap: 10px;">
      <cui-skeleton shape="circle"></cui-skeleton>
      <cui-skeleton class="br-sm" style="grid-column: 2 / -1; height: 20px;" shape="rect"></cui-skeleton>

      <cui-skeleton shape="circle" animation="pulse"></cui-skeleton>
      <cui-skeleton class="br-sm" shape="rect" style="height: 20px;">
      <cui-skeleton class="br-sm" shape="rect" style="height: 20px;">
      <cui-skeleton class="br-sm" shape="rect" style="height: 20px;">
      <cui-skeleton class="br-sm" shape="rect" style="height: 20px;">

      <cui-skeleton shape="rect"></cui-skeleton>
      <cui-skeleton class="br-sm" shape="rect" style="height: 20px;">
      <cui-skeleton class="br-sm" shape="rect" style="height: 20px;">
      <cui-skeleton class="br-sm" shape="rect" style="height: 20px;">
      <cui-skeleton class="br-sm" shape="rect" style="height: 20px;">
    </div>
```

## API Reference

### Attributes

| Attribute | Type | Description | Default |
|-----------|------|-------------|---------|
| animation | `'wave' | 'pulse' | undefined` |  | `wave` |
| appearance | `'opaque' | 'translucent' | undefined` |  |  |
| dir | `'ltr' | 'rtl' | 'auto'` | The dir global attribute is an enumerated attribute that indicates the directionality of the element's text. |  |
| shape | `'rect' | 'circle' | undefined` | The shape of the Skeleton. |  |

### Events

| Event | Description |
|-------|-------------|
| ready | Emitted when the component is ready. |

### CSS Custom Properties

| Property | Description |
|----------|-------------|
| `--skeleton-animation` | the animation for the skeleton. |
| `--skeleton-bg-color` | the background color for the skeleton. |
| `--skeleton-bg-size` | the background image size for pulse or wave animations. |
| `--skeleton-border-radius` | the border radius for the skeleton. |
| `--skeleton-min-height` | minimum height of the skeleton. |
| `--skeleton-sheen-color` | the background color for the skeleton when there is animation. |
| `--skeleton-width` | the width of the skeleton. |

### CSS Parts

| Part | Description |
|------|-------------|
| skeleton-base | the component's base wrapper |
