# Tree

**Tag:** `cui-tree`  
**Since:** 1.0.0  
**Status:** Preview  
**Category:** components  
**Source:** https://coherence-ftekb0dcfpcjb3gv.b02.azurefd.net/resources/tree/

> Web Components

## Import

```js
import '@charm-ux/cui/dist/components/tree/index.js'
```

## Guidance

### Demos

- select(value: string): Programmatically select an item. In multiselect mode, selecting a parent also selects all descendants. Respects selectable="leaf".
- deselect(value: string): Programmatically deselect an item. In multiselect mode, deselecting a parent also deselects all descendants.
- toggle(value: string): Toggle selection for the given item (equivalent to select/deselect based on current state).
- clearSelection(): Clear all selections.
- getSelectedValues(): string[] Returns the selected item values in document order.

### Default

Level 1, Item 1
Level 1, Item 2
Level 1, Item 3

### Appearance

- The Tree component supports multiple appearance variations to fit different design contexts.
Subtle (default)
Level 1, Item 1
Level 1, Item 2
Level 1, Item 3
Subtle Alpha
Level 1, Item 1
Level 1, Item 2
Level 1, Item 3
Transparent
Level 1, Item 1
Level 1, Item 2
Level 1, Item 3

### Size

- The Tree component supports different sizes to accommodate various layout requirements.
Medium (default)
Level 1, Item 1
Small
Level 1, Item 1

### Selection

- Configure selection behavior to allow single or multiple selection, and choose whether all items or only leaf items are selectable.
- Public selection API (methods on the cui-tree element):
- select(value: string): Programmatically select an item. In multiselect mode, selecting a parent also selects all descendants. Respects selectable="leaf".
- deselect(value: string): Programmatically deselect an item. In multiselect mode, deselecting a parent also deselects all descendants.
- toggle(value: string): Toggle selection for the given item (equivalent to select/deselect based on current state).
- clearSelection(): Clear all selections.
- getSelectedValues(): string[] Returns the selected item values in document order.
Single Selection — All
Level 1, Item 1
Level 2, Item 1
Level 2, Item 2
Level 1, Item 2
Level 2, Item 3
Level 3, Item 1
Level 1, Item 3
Single Selection — Leaf
Level 1, Item 1
Level 2, Item 1
Level 2, Item 2
Level 1, Item 2
Level 2, Item 3
Level 3, Item 1
Level 1, Item 3
Multiselect — All
Level 1, Item 1
Level 2, Item 1
Level 2, Item 2
Level 1, Item 2
Level 2, Item 3
Level 3, Item 1
Level 1, Item 3
Multiselect — Leaf
Level 1, Item 1
Level 2, Item 1
Level 2, Item 2
Level 1, Item 2
Level 2, Item 3
Level 3, Item 1
Level 1, Item 3

### With Icons

- Tree items can include icons to provide visual context and improve usability.
Documents
Pictures

### Open Items

- Expand tree items to show nested content by default using the open attribute.
Level 1, Item 1 (Open)
Level 2, Item 1
Level 2, Item 2 (Open)
Level 3, Item 1
Level 1, Item 2

### Disabled

- Disable the entire tree to prevent user interaction.
Disabled Parent
Disabled Child 1
Disabled Child 2
Another Disabled Root Item

### Integration

- You will need to install the full Coherence for Fluent 2 code package to use this component. Follow the installation instructions in the developer starter kit.
- And then you'll need to include the following imports in your file:
- import '@charm-ux/cui/dist/components/tree/index.js'

### Composition

- Tree leverages the following components:
Checkbox
Inputs
Checkboxes give people a way to select one or more items from a group, or switch between two mutually exclusive options (such as accepting terms and conditions or signing up for e-mail notifications). Checkboxes usually require a confirmation step (such as save or apply) before the change takes effect.
Icon
Identifiers
Icons are visual symbols used to represent ideas, objects, or actions and have semantic purpose within a layout. They communicate messages at a glance, provide interactivity, and draw attention to important information.
Radio
Inputs, Forms
Choice group or radio group is a type of input component that allows people to select from a range of choices. Radio groups are best suited for input scenarios where there are two to seven options and only one selection is allowed.
Tree
Navigation
Displays a hierarchical view of nested data that can expand or collapse. It's useful for representing a menu structure, folder hierarchy, or nested categories at a glance.

### Provide feedback

- Reach out to us if you spot a bug or have a feature request. Your feedback is critical to the success of Coherence and everyone who uses it.
- Contact us on Teams

## Code Examples

### Appearance

The Tree component supports multiple appearance variations to fit different design contexts.

```html
<div class="d-flex flex-column gap-lg">
      <div>
        <h4>Subtle (default)</h4>
        <cui-tree appearance="subtle">
          <cui-tree-item>
            Level 1, Item 1<cui-tree-item>Level 2, Item 1</cui-tree-item>
          </cui-tree-item>
          <cui-tree-item>
            Level 1, Item 2<cui-tree-item>Level 2, Item 1</cui-tree-item>
          </cui-tree-item>
          <cui-tree-item>
            Level 1, Item 3<cui-tree-item>Level 2, Item 1</cui-tree-item>
          </cui-tree-item>
        </cui-tree>
      </div>
      <div style="position: relative">
        <div
          style="position: absolute; inset: 0; z-index: 0; background:               linear-gradient(137deg; rgba(217; 248; 250; 0.40) 16.38%; rgba(210; 205; 241; 0.40) 84.61%); #-f5-f5-f5; padding: 10px;"
          aria-hidden="true"
        ></div>
        <div class="d-flex flex-column gap-lg" style="position: relative; z-index: 1">
          <h4>Subtle Alpha</h4>
          <cui-tree appearance="subtle-alpha">
            <cui-tree-item>
              Level 1, Item 1<cui-tree-item>Level 2, Item 1</cui-tree-item>
            </cui-tree-item>
            <cui-tree-item>
              Level 1, Item 2<cui-tree-item>Level 2, Item 1</cui-tree-item>
            </cui-tree-item>
            <cui-tree-item>
              Level 1, Item 3<cui-tree-item>Level 2, Item 1</cui-tree-item>
            </cui-tree-item>
          </cui-tree>
        </div>
      </div>
      <div>
        <h4>Transparent</h4>
        <cui-tree appearance="transparent">
          <cui-tree-item>
            Level 1, Item 1<cui-tree-item>Level 2, Item 1</cui-tree-item>
          </cui-tree-item>
          <cui-tree-item>
            Level 1, Item 2<cui-tree-item>Level 2, Item 1</cui-tree-item>
          </cui-tree-item>
          <cui-tree-item>
            Level 1, Item 3<cui-tree-item>Level 2, Item 1</cui-tree-item>
          </cui-tree-item>
        </cui-tree>
      </div>
    </div>
```

### Size

The Tree component supports different sizes to accommodate various layout requirements.

```html
<div style="display: flex; flex-direction: column; gap: 1rem">
      <div>
        <h4>Medium (default)</h4>
        <cui-tree size="medium">
          <cui-tree-item>
            Level 1, Item 1<cui-tree-item>Level 2, Item 1</cui-tree-item>
          </cui-tree-item>
        </cui-tree>
      </div>
      <div>
        <h4>Small</h4>
        <cui-tree size="small">
          <cui-tree-item>
            Level 1, Item 1<cui-tree-item>Level 2, Item 1</cui-tree-item>
          </cui-tree-item>
        </cui-tree>
      </div>
    </div>
```

### Selection

Configure selection behavior to allow single or multiple selection, and choose whether all items or only leaf items are selectable.

```html
<div class="d-flex flex-column gap-lg">
      <div>
        <h4>Single Selection — All</h4>
        <cui-tree selectionMode="single" selectable="all">
          <cui-tree-item value="1" open>
            Level 1, Item 1<cui-tree-item value="1.1">Level 2, Item 1</cui-tree-item>
            <cui-tree-item value="1.2">Level 2, Item 2</cui-tree-item>
          </cui-tree-item>
          <cui-tree-item value="2" open>
            Level 1, Item 2
            <cui-tree-item value="2.1" open>
              Level 2, Item 3<cui-tree-item value="2.1.1">Level 3, Item 1</cui-tree-item>
            </cui-tree-item>
          </cui-tree-item>
          <cui-tree-item value="3">Level 1, Item 3</cui-tree-item>
        </cui-tree>
      </div>

      <div>
        <h4>Single Selection — Leaf</h4>
        <cui-tree selectionMode="single" selectable="leaf">
          <cui-tree-item value="1" open>
            Level 1, Item 1<cui-tree-item value="1.1">Level 2, Item 1</cui-tree-item>
            <cui-tree-item value="1.2">Level 2, Item 2</cui-tree-item>
          </cui-tree-item>
          <cui-tree-item value="2" open>
            Level 1, Item 2
            <cui-tree-item value="2.1" open>
              Level 2, Item 3<cui-tree-item value="2.1.1">Level 3, Item 1</cui-tree-item>
            </cui-tree-item>
          </cui-tree-item>
          <cui-tree-item value="3">Level 1, Item 3</cui-tree-item>
        </cui-tree>
      </div>

      <div>
        <h4>Multiselect — All</h4>
        <cui-tree selectionMode="multiselect" selectable="all">
          <cui-tree-item value="1" open>
            Level 1, Item 1<cui-tree-item value="1.1">Level 2, Item 1</cui-tree-item>
            <cui-tree-item value="1.2">Level 2, Item 2</cui-tree-item>
          </cui-tree-item>
          <cui-tree-item value="2" open>
            Level 1, Item 2
            <cui-tree-item value="2.1" open>
              Level 2, Item 3<cui-tree-item value="2.1.1">Level 3, Item 1</cui-tree-item>
            </cui-tree-item>
          </cui-tree-item>
          <cui-tree-item value="3">Level 1, Item 3</cui-tree-item>
        </cui-tree>
      </div>

      <div>
        <h4>Multiselect — Leaf</h4>
        <cui-tree selectionMode="multiselect" selectable="leaf">
          <cui-tree-item value="1" open>
            Level 1, Item 1<cui-tree-item value="1.1">Level 2, Item 1</cui-tree-item>
            <cui-tree-item value="1.2">Level 2, Item 2</cui-tree-item>
          </cui-tree-item>
          <cui-tree-item value="2" open>
            Level 1, Item 2
            <cui-tree-item value="2.1" open>
              Level 2, Item 3<cui-tree-item value="2.1.1">Level 3, Item 1</cui-tree-item>
            </cui-tree-item>
          </cui-tree-item>
          <cui-tree-item value="3">Level 1, Item 3</cui-tree-item>
        </cui-tree>
      </div>
    </div>
```

## API Reference

### Slots

| Slot | Description |
|------|-------------|
| tree-item | Automatically slotted tree items. Selection: - Set `selection-mode` to "single" or "multiselect" to enable selection - Set `selectable` to "all" (default) or "leaf" to control which items can be selected - In multiselect mode, parent selection propagates to children and vice versa - Use the selection API methods: select(), deselect(), toggle(), clearSelection(), getSelectedValues() Accessibility and keyboard navigation: - This element renders the tree container with role="tree" and manages top-level ARIA set metadata. - Keyboard navigation and item-level ARIA (e.g., aria-expanded, aria-selected) are managed by individual `fui-tree-item` elements. - In single-select mode, uses aria-selected; in multiselect mode, relies on checkbox semantics |

### Attributes

| Attribute | Type | Description | Default |
|-----------|------|-------------|---------|
| appearance | `TreeAppearance` | The visual appearance of the tree. | `subtle` |
| disabled | `boolean` | Whether the tree is disabled. | `false` |
| isUpdatingSelection | `boolean` | Flag to prevent re-entrant selection updates during sync operations | `false` |
| selectable | `TreeSelectable` | Which tree items can be selected (`all` items or only `leaf` items). | `all` |
| selection-mode | `TreeSelectionMode` | The selection mode for tree items. | `none` |
| size | `TreeSize` | The size of the tree items. | `medium` |
| dir | `'ltr' | 'rtl' | 'auto'` | The dir global attribute is an enumerated attribute that indicates the directionality of the element's text. |  |

### Events

| Event | Description |
|-------|-------------|
| ready | Emitted when the component is ready. |

### CSS Custom Properties

| Property | Description |
|----------|-------------|
| `--tree-vertical-spacing` | Vertical spacing between adjacent tree items and nested groups. |
| `--tree-indentation` | Horizontal indentation applied per nesting level for child items. |
| `--tree-background-color` | Background color of the tree container. |
