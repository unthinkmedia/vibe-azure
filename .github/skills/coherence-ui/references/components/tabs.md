# Tabs

**Tag:** `cui-tabs`  
**Since:** 1.0.0  
**Status:** Preview  
**Category:** components  
**Source:** https://coherence-ftekb0dcfpcjb3gv.b02.azurefd.net/resources/tabs/

## Import

```js
import '@charm-ux/cui/dist/components/tabs/index.js'
```

## Guidance

### Standards

- You must meet the following requirements when using this component.

### Anatomy

- Tab
- Selected tab
- Overflow button

### Layout

Tablists have a horizontal layout by default but can be laid out vertically. Tabs in a horizontal tablist won’t scroll or wrap to the next line. This means they are limited by the width of their container.  Tab labels may be text-only, text with an icon, or icon-only. Choose a single format that works for all tabs in the tablist. 


Tablists are less effective in smaller layouts that push several tabs into an overflow menu. When space is limited, consider other options for switching content views, like an accordion or dropdown component.

### Default selection

- By default, one tab—usually the first—is always active on first render. Keep this in mind when ordering your content.

### Moving tabs to overflow

- As screen sizes reduce, not all tabs may fit within the provided screen real estate. The tabs furthest to the right collapse into the overflow once space becomes too constrained.

### Provide feedback

- Reach out to us if you spot a bug or have a feature request. Your feedback is critical to the success of Coherence and everyone who uses it.
- Contact us on Teams

## API Reference

### Slots

| Slot | Description |
|------|-------------|
| (default) | where the tab list is displayed. |
| tabpanel | where the content that belongs to a individual Tab is displayed. |

### Attributes

| Attribute | Type | Description | Default |
|-----------|------|-------------|---------|
| appearance | `'subtle' | 'transparent' | undefined` | Tabs supports 'transparent' and 'subtle' appearance. 'subtle': Minimizes emphasis to blend into the background until hovered or focused. 'transparent': No background and border styling The appearance affects each of the contained tabs. |  |
| disable-animation | `boolean | undefined` | Disabled the sliding animation. |  |
| size | `'small' | 'medium' | 'large' | undefined` | A set of tabs can be one of several preset sizes. |  |
| active-id | `` | Refers to the currently active tab. |  |
| dir | `'ltr' | 'rtl' | 'auto'` | The dir global attribute is an enumerated attribute that indicates the directionality of the element's text. |  |
| layout | `'horizontal' | 'vertical' | undefined` | Whether to render the tabs in a column or row fashion. The default value is a `horizontal` layout. |  |
| manual-activation | `boolean | undefined` | Set this if you do not want to navigate to a new tab with arrow keys, users will need to push "space" or "enter" to navigate. |  |

### Events

| Event | Description |
|-------|-------------|
| ready | Emitted when the component is ready. |
| tabs-change | Emitted when the active tab changes. |

### CSS Custom Properties

| Property | Description |
|----------|-------------|
| `--tabs-active-indicator-active-bg-color` | The active indicator's background when the tab is active. |
| `--tabs-active-indicator-bg-color` | The active's indicator background. |
| `--tabs-active-indicator-disabled-bg-color` | The active indicator's background when the tab is disabled. |
| `--tabs-active-indicator-focus-bg-color` | The active indicator's background when the tab is focused. |
| `--tabs-active-indicator-hover-bg-color` | The active indicator's background when the tab is hovered. |
| `--tabs-active-indicator-length` | The active's indicator size depending on the tabs orientation. |
| `--tabs-active-indicator-thickness` | The height or width of the active indicator depending on the tabs orientation. |
| `--tabs-active-indicator-transition` | The active's indicator css transition. |
| `--tabs-align` | The alignment of the tabs ('start', 'center', or 'end'). |
| `--tabs-bg-color` | The background color of the tabs container. |
| `--tabs-border-color` | The border color of the tabs container. |
| `--tabs-border-radius` | The border radius of the tabs container. |
| `--tabs-border-style` | The border style of the tabs container. |
| `--tabs-border-width` | The border width of the tabs container. |
| `--tabs-gap` | The gap between each tab. |
| `--tabs-padding-x` | The horizontal padding of the tabs container. |
| `--tabs-padding-y` | The vertical padding of the tabs container. |
| `--tabs-tablist-spacing` | The spacing between the tablist and tab panels. |
| `--tabs-vertical-min-width` | The minimum width for tabs in vertical layout. |

### CSS Parts

| Part | Description |
|------|-------------|
| tabs-active-indicator | The active indicator. |
| tabs-tablist | The tab list container. |
