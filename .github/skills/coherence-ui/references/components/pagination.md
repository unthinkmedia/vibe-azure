# Pagination

**Tag:** `cui-pagination`  
**Since:** 1.0.0  
**Status:** Preview  
**Category:** components  
**Source:** https://coherence-ftekb0dcfpcjb3gv.b02.azurefd.net/resources/pagination/

## Import

```js
import '@charm-ux/cui/dist/components/pagination/index.js'
```

## Guidance

### Standards

- You must meet the following requirements when using this component.

### Anatomy

- Tablist
- Overflow button (included in tablist)
- Button, icon-only
- Dropdown
- Label

### Placement of pagination and items per page

- Pagination should be located at the bottom of a table or dataset, and centered within the content area. When the items per page control is used in combination with pagination, the two should be vertically aligned with each other, and items per page should be aligned to the right side of the relating dataset.

### Pagination and items per page reflow

- Screen width limit for standard pagination and items per page layout
- Pagination truncates and stacks on top of items per page component at smaller screen width

### Provide feedback

- Reach out to us if you spot a bug or have a feature request. Your feedback is critical to the success of Coherence and everyone who uses it.
- Contact us on Teams

## API Reference

### Slots

| Slot | Description |
|------|-------------|
| next-icon | Next icon slot |
| previous-icon | Previous icon slot |

### Attributes

| Attribute | Type | Description | Default |
|-----------|------|-------------|---------|
| current-items-per-page | `number` | Options for the "Items per page" dropdown | `15` |
| current-page | `number` | Current page number | `1` |
| hide-items-per-page | `boolean` | Hides the "Items per page" label and dropdown | `false` |
| hide-overflow-combobox | `boolean` | Disallows manual entry for pages in overflow | `false` |
| items-per-page-options | `number[]` | Options for the "Items per page" dropdown | `[5, 10, 15, 20]` |
| items-per-page-text | `string` | "Items per page" label | `Items per page` |
| landmark-label | `string` | Landmark label | `pagination` |
| next-button-title | `string` | Next button title | `Next page` |
| overflow-input-aria-label | `string` | Message to display if the overflow combox input is invalid | `Desired page` |
| overflow-input-error-text | `string` | Message to display if the overflow combox input is invalid | `No results` |
| overflow-trigger-button-title | `string` | Overflow trigger button title | `More pages` |
| page-number-title-template | `string` | Page number button title template | `Page {n}` |
| previous-button-title | `string` | Previous button title | `Previous page` |
| total-pages | `number` | Total number of pages | `5` |

### Events

| Event | Description |
|-------|-------------|
| items-per-page-change | Emitted when the current number of items per page is changed |
| items-per-page-menu-open | Emitted when the "items per page" menu is opened |
| next-button-click | Emitted when the next button is clicked |
| overflow-menu-open | Emitted when the overflow menu is opened |
| overflow-page-click | Emitted when an option in the overflow menu is selected |
| overflow-value-entered | Emitted when a value is entered in the overflow combobox |
| page-change | Emitted when the current page changes, regardless of method |
| previous-button-click | Emitted when the previous button is clicked |

### CSS Parts

| Part | Description |
|------|-------------|
| item-per-page | The "items per page" container |
| items-per-page-select | The "items per page" select |
| next-button | The next button |
| overflow-input | The overflow input (if combobox is enabled) |
| overflow-menu | The overflow menu |
| overflow-trigger | The overflow trigger button |
| page-numbers | The parent container to the page numbers (excluding overflow) |
| page-selector | The page selector container |
| previous-button | The previous button |
