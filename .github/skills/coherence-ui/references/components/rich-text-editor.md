# Rich Text Editor

**Tag:** `cui-rich-text-editor`  
**Category:** components  
**Source:** https://coherence-ftekb0dcfpcjb3gv.b02.azurefd.net/resources/rich-text-editor/

> Web Components

## Import

```js
import '@charm-ux/cui/dist/components/rich-text-editor/index.js'
```

## Guidance

### Demos

Rich Text Editor

The Rich Text Editor (RTE) is a multi-line input component that supports both plain text and formatted text entry. It allows users to create, edit, and format content within a constrained surface, such as forms, drawers, or full-page authoring experiences.

Disabled

The Rich Text Editor component can be disabled, preventing user interaction.

Placeholder

The Rich Text Editor component displays a placeholder text, guiding the user to type into the field.

Resize

The Rich Text Editor component demonstrates different resize options, including none, vertical, horizontal, and both directions.

Character Counter

A character counter feature may be displayed by adding the (soft) character limit to character-counter-limit.

Custom Tool

Tools may be disabled with exclude-built-in-{tool} and the custom-toolbar-buttons slot may be used to add your own.

### Rich Text Editor

- The Rich Text Editor (RTE) is a multi-line input component that supports both plain text and formatted text entry. It allows users to create, edit, and format content within a constrained surface, such as forms, drawers, or full-page authoring experiences.

### Disabled

- The Rich Text Editor component can be disabled, preventing user interaction.

### Placeholder

- The Rich Text Editor component displays a placeholder text, guiding the user to type into the field.

### Resize

- The Rich Text Editor component demonstrates different resize options, including none, vertical, horizontal, and both directions.

### Character Counter

- A character counter feature may be displayed by adding the (soft) character limit to character-counter-limit.

### Custom Tool

- Tools may be disabled with exclude-built-in-{tool} and the custom-toolbar-buttons slot may be used to add your own.

### Integration

- You will need to install the full Coherence for Fluent 2 code package to use this component. Follow the installation instructions in the developer starter kit.
- And then you'll need to include the following imports in your file:
- import '@charm-ux/cui/dist/components/rich-text-editor/index.js'

### Provide feedback

- Reach out to us if you spot a bug or have a feature request. Your feedback is critical to the success of Coherence and everyone who uses it.
- Contact us on Teams

## Code Examples

### Resize

The Rich Text Editor component demonstrates different resize options, including none, vertical, horizontal, and both directions.

```html
<div class="d-flex flex-column gap-md">
      <cui-rich-text-editor label='RTE with resize set to "none"' resize="none"></cui-rich-text-editor>;
      <cui-rich-text-editor label='RTE with resize set to "vertical"' resize="vertical"></cui-rich-text-editor>;
      <cui-rich-text-editor label='RTE with resize set to "horizontal"' resize="horizontal"></cui-rich-text-editor>;
      <cui-rich-text-editor label='RTE with resize set to "both"' resize="both"></cui-rich-text-editor>;
    </div>
```

## API Reference

### Attributes

| Attribute | Type | Description | Default |
|-----------|------|-------------|---------|
| colors | `string` | Available colors. |  |
| event-prefix | `string` | Event prefix (optional). |  |
| size | `'small' | 'large'` | Controls the number of colors in a row (5 vs 8). | `large` |
