# Breadcrumb

**Tag:** `cui-breadcrumb`  
**Since:** 1.0.0  
**Status:** Preview  
**Category:** components  
**Source:** https://coherence-ftekb0dcfpcjb3gv.b02.azurefd.net/resources/breadcrumb/

## Import

```js
import '@charm-ux/cui/dist/components/breadcrumb/index.js'
```

## Guidance

### Standards

- You must meet the following requirements when using this component.

### Basic structure

- The breadcrumb component is made up of nodes separated by chevrons. Each node is a hyperlink to a page in the flow. Moving in reading order, the parent node precedes the child node.

### Responsive guidelines

- Responsive layout techniques allow your app page elements and designs that use flexible layouts to render optimally in different window sizes and orientations. Refer to the existing responsive layout article for an overview of how components and patterns behave.

### Writing guidelines

- The naming of breadcrumbs is succinct, descriptive, and easy to read or scan. Breadcrumbs paint a picture of where you are at any given moment.

### Provide feedback

- Reach out to us if you spot a bug or have a feature request. Your feedback is critical to the success of Coherence and everyone who uses it.
- Contact us on Teams

## API Reference

### Slots

| Slot | Description |
|------|-------------|
| (default) | Breadcrumb's contents, which should typically be a breadcrumb-item. |

### Attributes

| Attribute | Type | Description | Default |
|-----------|------|-------------|---------|
| size | `'small' | 'medium' | 'large' | undefined` | The size of the breadcrumb. |  |
| dir | `'ltr' | 'rtl' | 'auto'` | The dir global attribute is an enumerated attribute that indicates the directionality of the element's text. |  |
| label | `string | undefined` | The `aria-label` for the entire breadcrumb. Will not be displayed, but is required for accessibility. | `breadcrumb` |

### Events

| Event | Description |
|-------|-------------|
| ready | Emitted when the component is ready. |

### CSS Parts

| Part | Description |
|------|-------------|
| breadcrumb-base | The component's base wrapper. |
| breadcrumb-list | Default slot's wrapper. |
