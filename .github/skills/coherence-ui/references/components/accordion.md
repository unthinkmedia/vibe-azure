# Accordion

**Tag:** `cui-accordion`  
**Since:** 1.0.0  
**Status:** Preview  
**Category:** components  
**Source:** https://coherence-ftekb0dcfpcjb3gv.b02.azurefd.net/resources/accordion/

## Import

```js
import '@charm-ux/cui/dist/components/accordion/index.js'
```

## Guidance

### Standards

- You must meet the following requirements when using this component.

### Anatomy

- Accordions are comprised of a title, an icon indicating the expandability, and an optional decorative icon. When activated, they expand to reveal additional content. They can be used alone or in a group of multiple accordions.

### Sizes

- Accordions come in a range of sizes, with the text increasing in size and weight as it gets larger.

### Closed by default

- By default, accordion items are closed. If it’s helpful to give information prominence and have it be seen automatically, specify which accordion items should be open by default.

### Multiple open items

- Accordion items automatically close when another is opened. Sometimes, people may prefer to have multiple items open at once. Allow this in scenarios where multiple open items won’t be overwhelming.

### Group accordions with a title

- Titles give broad context to the accordion content below it. This lets people skim the contents of the page more easily.

### Provide feedback

- Reach out to us if you spot a bug or have a feature request. Your feedback is critical to the success of Coherence and everyone who uses it.
- Contact us on Teams

## API Reference

### Slots

| Slot | Description |
|------|-------------|
| (default) | The default slot where accordion items are placed. |

### Attributes

| Attribute | Type | Description | Default |
|-----------|------|-------------|---------|
| size | `'small' | 'medium' | 'large' | 'extra-large' | undefined` | Sets the size of the accordion and accepts predefined size values. It reflects its value to the attribute for styling purposes. The available sizes are: - 'small': Sets the accordion to a small size. - 'medium': Sets the accordion to a medium size. This is the default size. - 'large': Sets the accordion to a large size. - 'extra-large': Sets the accordion to an extra-large size. |  |
| dir | `'ltr' | 'rtl' | 'auto'` | The dir global attribute is an enumerated attribute that indicates the directionality of the element's text. |  |
| open-single | `boolean | undefined` | If set, allows only one child accordion-item to be open at a time. | `false` |

### Events

| Event | Description |
|-------|-------------|
| ready | Emitted when the component is ready. |

### CSS Custom Properties

| Property | Description |
|----------|-------------|
| `--accordion-top-border-color` | Sets the border top color of the accordion. |
