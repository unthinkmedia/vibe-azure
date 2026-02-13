# Dialog

**Tag:** `cui-dialog`  
**Since:** 1.0.0  
**Status:** Preview  
**Category:** components  
**Source:** https://coherence-ftekb0dcfpcjb3gv.b02.azurefd.net/resources/dialog/

## Import

```js
import '@charm-ux/cui/dist/components/dialog/index.js'
```

## Guidance

### Standards

- You must meet the following requirements when using this component.

### Anatomy

- Surface
- Header
- Body content (optional)
- Footer (optional)
- Title
- Dismiss icon (optional)
- Primary button
- Secondary button (optional)
- Overlay (optional)

### Overlay

- An overlay is used behind the dialog to prevent people from interacting with other areas of the app or soft-dismissing the dialog. The overlay color variable is Neutral/Background/Overlay/Rest and is a part of the Fluent Web Variables Figma library.

### Layout

- Dialogs always appear on top of the entire app, regardless of what transient UI may be open. Dialog placement always stays the same in a full-page layout.

### Scrolling

- By default, headers (including dialog title and dismiss icon) and footers (including any button actions) remain persistent at the top and bottom of the dialog container, even on scroll. Overflow body content scrolls behind.

### Forms in dialogs

- Fields can be placed in dialogs to ask people for information that’s related to their current task. Keep forms within dialogs focused and relevant to the main goal. If dialog forms are too long, people may forget the context of their initial task.

### Use button labels that indicate the outcome

- The buttons indicate the impending action. Text like OK is vague. Specific action verbs are clearer in communicating the action.

### Options

- Provide options for errors. Critical errors significantly impact functionality of an app. Provide options for people to take when possible, whether it’s submitting feedback, such as reporting bugs, or learning more about the error.

### Unavailable or blocked actions

Acknowledge unavailable or blocked actions. If an action is blocked for any reason, a dialog can be used to communicate why. This type of dialog typically only has one button. 


For example a dialog that says “This document has been deleted and is no longer available” would have one button to dismiss it.

### Success notifications

- If applicable, let people know if their dialog interaction was successful. This can be done in a variety of ways, such as a status indicator in a data grid or a toast notification.

### Simple vs. complex tasks

- Provide quick, simple information. Dialogs are best for providing contextual information or tasks that can be handled quickly. Do not use dialogs for repetitive tasks as it interrupts the app experience. They also should not be used for complex tasks.

### Partially finished tasks

- Help people complete partially finished tasks. A dialog can prevent people from abandoning a required task, or offer help to someone who tries to complete an interaction that is blocked. Note that a dialog is unnecessary for tasks that are always available not urgent.

### Accessibility

Every component meets the Microsoft Accessibility Standards (MAS) requirements, which includes headings, keyboard navigation (focus order), screen readers (labels), color contrast, and more. Using our components and following the design standards will get you most of the way to an accessible experience that meets grade C.


To get you the rest of the way to grade C, you’ll need to ensure that experiences composed of multiple components are accessible. We recommend running Accessibility Insight's FastPass tool and manually testing your scenarios end to end with a keyboard and screen reader.

### Dialogs and JavaScript

- Don't use browser alert or confirm dialogs. They are limited in functionality and are problematic in conveying information.

### Return the focus after dismissing a dialog

- Fluent v9 will automatically return focus back to the dialog's trigger, which is a best practice. However, there are cases when focus will need to be moved elsewhere after dismissal, such as to a resulting notification.

### Screen reader for system-triggered dialogs

When a dialog is triggered by the system, focus is automatically moved to the dialog with an announcement if aria-labelledby is used.


For more information on building accessible dialogs with ARIA, please visit the W3C site.

### Provide feedback

- Reach out to us if you spot a bug or have a feature request. Your feedback is critical to the success of Coherence and everyone who uses it.
- Contact us on Teams

## API Reference

### Slots

| Slot | Description |
|------|-------------|
| (default) | The dialog's body. |
| actions | The dialog's header actions, usually a back button. |
| footer | The dialog's footer, usually one or more buttons representing various options. |
| heading | The dialog's heading. |

### Attributes

| Attribute | Type | Description | Default |
|-----------|------|-------------|---------|
| size | `'small' | 'medium' | 'large' | 'full' | undefined` | The size of the dialog when the `position` is not center. |  |
| alert | `boolean | undefined` | Indicates whether the dialog can only be closed programmatically or by clicking the close button. |  |
| close-button-label | `string` | The label for the close button. | `close` |
| dir | `'ltr' | 'rtl' | 'auto'` | The dir global attribute is an enumerated attribute that indicates the directionality of the element's text. |  |
| heading | `string | undefined` | The optional header of the dialog. |  |
| hide-close-button | `boolean | undefined` | Hides the close button when it is not focused. |  |
| no-header | `boolean | undefined` | Removes the header. This will also remove the default close button. If using prevent default on dialog-request-close please provide a way for the user to close the dialog. |  |
| open | `boolean` | Indicates whether or not the component is open. Can be used in lieu of show/hide methods. |  |
| position | `'start' | 'end' | 'top' | 'bottom' | 'center' | undefined` | Position of the dialog. |  |

### Events

| Event | Description |
|-------|-------------|
| dialog-after-hide | Emitted after the dialog closes and all transitions are complete. |
| dialog-after-show | Emitted after the dialog opens and all transitions are complete. |
| dialog-hide | Emitted when the dialog closes. |
| dialog-request-close | Emitted when the user attempts to close the dialog. If the event is canceled, the dialog will not close. |
| dialog-show | Emitted when the dialog opens. |
| ready | Emitted when the component is ready. |

### CSS Custom Properties

| Property | Description |
|----------|-------------|
| `--dialog-size-small` | The size of the dialog when the `size` is small. |
| `--dialog-size-medium` | The size of the dialog when the `size` is medium. |
| `--dialog-size-large` | The size of the dialog when the `size` is large. |
| `--dialog-size-full` | The size of the dialog when the `size` is full. |
| `--dialog-backdrop-color` | determines dialog's backdrop background. |
| `--dialog-bg-color` | determines dialog's background color. |
| `--dialog-border-color` | border color of the dialog element. |
| `--dialog-border-radius` | determines dialog's radius. |
| `--dialog-border-width` | border width of the dialog element. |
| `--dialog-close-button-active-bg-color` | determines close button active background color. |
| `--dialog-close-button-active-border-color` | determines close button active border color. |
| `--dialog-close-button-active-fg-color` | determines close button active foreground color. |
| `--dialog-close-button-bg-color` | determines close button background color. |
| `--dialog-close-button-border-color` | determines close button border color. |
| `--dialog-close-button-border-radius` | determines close button's border radius. |
| `--dialog-close-button-border-width` | determines close button border width. |
| `--dialog-close-button-fg-color` | determines close button foreground color. |
| `--dialog-close-button-focus-bg-color` | determines close button focus background color. |
| `--dialog-close-button-focus-border-color` | determines close button focus border color. |
| `--dialog-close-button-focus-fg-color` | determines close button focus foreground color. |
| `--dialog-close-button-hover-bg-color` | determines close button hover background color. |
| `--dialog-close-button-hover-border-color` | determines close button hover border color. |
| `--dialog-close-button-hover-fg-color` | determines close button hover foreground color. |
| `--dialog-close-button-padding` | determines close X button padding. |
| `--dialog-fg-color` | determines dialog's foreground color. |
| `--dialog-footer-button-gap` | determines gap between buttons in the footer slot. |
| `--dialog-header-toolbar-gap` | determines gap between dialog header items. |
| `--dialog-margin-top` | determines dialog's top margin when it has a header or footer. |
| `--dialog-max-height` | determines dialog's max height. |
| `--dialog-max-width` | determines dialog's max width. |
| `--dialog-padding-x` | determines dialog's inline padding. |
| `--dialog-padding-y` | determines dialog's block padding. |
| `--dialog-shadow` | determines dialog's shadow. |
| `--dialog-size` | determines dialog's size. |
| `--dialog-toolbar-button-gap` | determines gap between buttons in the actions slot. |
| `--dialog-transition` | determines dialog's transform. |
| `--dialog-position-transition` | determines dialog's transform when position is set. |

### CSS Parts

| Part | Description |
|------|-------------|
| dialog-actions | The component's actions slot. |
| dialog-base | The component's dialog element. |
| dialog-body | The component's body slot. |
| dialog-close-button | The component's close X button. |
| dialog-close-button-icon | The close button icon. |
| dialog-footer | The component's footer slot. |
| dialog-header | The component's header slot. |
| dialog-header-base | The component's header base. |
| dialog-toolbar | The component's toolbar which contains action slot and close button. |
| dialog-wrapper | The component's base wrapper. |
