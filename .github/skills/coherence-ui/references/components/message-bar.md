# Message Bar

**Tag:** `cui-message-bar`  
**Since:** 1.0.0  
**Category:** components  
**Source:** https://coherence-ftekb0dcfpcjb3gv.b02.azurefd.net/resources/message-bar/

## Import

```js
import '@charm-ux/cui/dist/components/message-bar/index.js'
```

## Guidance

### Standards

- You must meet the following requirements when using this component.

### Anatomy

- Container
- Icon
- Title
- Description
- Link
- Button
- Close

### Message severity

- Info: Communicates helpful information that doesn’t require immediate action but that could improve an experience.
- Success: Communicates that something went right related to the surface where it appears, the whole app, or a task someone just completed.
- Warning: Communicates temporary states, like connectivity issues, or states that could become harmful or destructive.
- Error: Communicates when something goes wrong that needs to be addressed before continuing.

### Responsiveness

- The container for message bars is flexible, allowing growth in both height and width to accommodate the content and the surface the message bar is on. Message bar content never truncates. For a cleaner layout, reflow after the second line pushes a message bar’s actions below the body.

### Layout

- A message bar includes a container with text and an icon. It appears inline with the rest of the page content, and pushes the content below it to fit.

### Placement in surfaces

- If the message relates to a particular section of the app, or is contained by a surface like a panel or modal, the message bar is used within the content area. The message bar aligns to the margins of the surface it’s in.

### Placement in cards

- Because card controls are already so constrained in size, when using a message bar in a card, it spans the whole width of the card.

### Help people resolve the issue

- When the message bar refers to a specific input field, document, or part of the app, add a link that allows the reader to easily resolve the message. This is particularly valuable for message bars conveying warnings, errors, or blockers.

### Use an inline status message

An inline status message can be used to provide instant feedback to the reader, such as when they enter incorrect data into a form field. When this is available, use an inline message.


If sharing instant feedback is not possible, or if the reader tries to continue through a flow without fixing an error, use a message bar to identify the error and prevent skipping over required form fields.

### Push other content down

- App content should reflow to accommodate larger messages. Expanded message bars should expand inside of the layout, pushing other content down instead of blocking it. The content that the message bar relates to needs to always be visible so that people can easily refer between the two, without dismissing the message bar.

### Accessibility

- Every component meets the Microsoft Accessibility Standards (MAS) requirements, which includes headings, keyboard navigation (focus order), screen readers (labels), color contrast, and more. Using our components and following the design standards will get you most of the way to an accessible experience that meets grade C.  To get you the rest of the way to grade C, we recommend running Accessibility Insight's FastPass tool and manually testing your scenarios end to end with a keyboard and screen reader.

### Provide feedback

- Reach out to us if you spot a bug or have a feature request. Your feedback is critical to the success of Coherence and everyone who uses it.
- Contact us on Teams

## Code Examples

### Intent

The "Intent" example shows how the Message Bar component uses the intent property to convey different message types like info, warning, error, and success through distinct icons and styles. This helps users quickly understand the tone and purpose of the message. Message Bar components come built-in with preset intents that determine the design and aria live announcement, While it is recommended to use the preset intents, it's possible to configure the aria live politeness with the politeness prop.

```html
<div class="d-flex flex-column gap-lg">
      <cui-message-bar heading="Intent info" intent="info" open>
        <cui-icon slot="icon" name="info-filled" label="info"></cui-icon>
        Message providing information to the user with actionable insights.
      </cui-message-bar>
      <cui-message-bar heading="Intent warning" intent="warning" open>
        <cui-icon slot="icon" name="warning-filled" label="warning"></cui-icon>
        Message providing information to the user with actionable insights.
      </cui-message-bar>
      <cui-message-bar heading="Intent error" intent="error" open>
        <cui-icon slot="icon" name="dismiss-circle-filled" label="error"></cui-icon>
        Message providing information to the user with actionable insights.
      </cui-message-bar>
      <cui-message-bar heading="Intent success" intent="success" open>
        <cui-icon slot="icon" name="checkmark-circle-filled" label="success"></cui-icon>
        Message providing information to the user with actionable insights.
      </cui-message-bar>
    </div>
```

### Shape

The "Shape" example showcases how the Message Bar component can be styled with either rounded or square corners using the shape property, with rounded being the default. Rounded corners are typically suited for component-level message bars, while square corners are ideal for page or app-level message bars.

```html
<div class="d-flex flex-column gap-lg">
      <cui-message-bar heading="Descriptive title" open>
        This message has rounded shape.
        <cui-icon slot="icon" name="info-filled" label="info"></cui-icon>
      </cui-message-bar>
      <cui-message-bar heading="Descriptive title" open shape="square">
        This message has square shape.
        <cui-icon slot="icon" name="info-filled" label="info"></cui-icon>
      </cui-message-bar>
    </div>
```

### Dismiss

The "Dismiss" example shows how the Message Bar component can be made dismissible, allowing users to close the message with a close button. This feature provides a smooth transition effect when the message is dismissed.

```html
const styles = `
    cui-message-bar {
      --message-bar-transition: opacity 0.4s ease;
    }
  `;
      <div>
        <cui-button appearance="primary" class="mb-md" shows="messageBar">
          Add message
        </cui-button>
        <cui-message-bar id="messageBar" heading="Descriptive title" dismissible open>
          Message providing information to the user with actionable insights.
          <cui-icon slot="icon" name="info-filled" label="info"></cui-icon>
          <cui-button slot="action">Action</cui-button>
          <cui-button slot="action">Action</cui-button>
        </cui-message-bar>
      </div>
      <style>{styles}</style>```

### Animation

The "Animation" example demonstrates how the Message Bar component can be animated using CSS transitions and transforms. The example applies a fade-in and slide-down effect when the message appears. The --message-bar-transition CSS variable controls the opacity and transform animations, while --message-bar-translate-y-start and --message-bar-translate-y-end define the vertical movement. This ensures a smooth visual effect, enhancing the user experience by making the appearance and dismissal of messages feel more natural.

```html
const styles = `
    cui-message-bar {
      --message-bar-transition: opacity 0.4s ease, transform 0.3s ease;
      --message-bar-translate-y-start: translateY(-20px);
      --message-bar-translate-y-end: translateY(0);
    }
  `;
      <div>
        <cui-button appearance="primary" class="mb-md" shows="message-bar">
          Add message
        </cui-button>
        <cui-message-bar id="message-bar" heading="Descriptive title" dismissible>
          Message providing information to the user with actionable insights.
          <cui-icon slot="icon" name="info-filled" label="info"></cui-icon>
          <cui-button slot="action">Action</cui-button>
          <cui-button slot="action">Action</cui-button>
        </cui-message-bar>
      </div>
      <style>{styles}</style>```

### Manual Layout

The "Manual Layout" example shows how the layout of the Message Bar can be controlled using the layout prop, allowing you to choose between single-line or multi-line layouts. This gives you flexibility to manage the layout without relying on automatic reflow, which is helpful for applications with their own responsive design mechanisms.

```html
import {
  CuiButton,
  CuiIcon,
  CuiMessageBar,
  CuiSwitch,

  const handleSwitchChange = (event: Event) => {

      <cui-switch
        label-position="end"
        class="mb-md"
        checked
        
      >
        <div slot="label">
          Single line layout
        </div>
      </cui-switch>
      <cui-message-bar
        heading="Descriptive title"
        dismissible
        open
        layout={layout}
      >
        Message providing information to the user with actionable insights.
        <cui-icon slot="icon" name="info-filled" label="info"></cui-icon>
        <cui-button slot="action">
          Action
        </cui-button>
        <cui-button slot="action">
          Action
        </cui-button>
      </cui-message-bar>```

## API Reference

### Slots

| Slot | Description |
|------|-------------|
| (default) | The message content of the alert. |
| action | Optional action button to display for the alert. |
| heading | Optional heading for the alert. |
| icon | Optional icon. |

### Attributes

| Attribute | Type | Description | Default |
|-----------|------|-------------|---------|
| intent | `'success' | 'warning' | 'error' | 'info' | undefined` | The intent of the message bar. |  |
| layout | `'single' | 'multi' | undefined` | The layout type of the message bar. |  |
| shape | `'rounded' | 'square' | undefined` | The shape of the message bar. |  |
| closeLabel | `string` | The label for the close button. | `Close` |
| dir | `'ltr' | 'rtl' | 'auto'` | The dir global attribute is an enumerated attribute that indicates the directionality of the element's text. |  |
| dismissible | `boolean` | Shows the close button. | `false` |
| heading | `string | undefined` | The heading of the alert. |  |
| open | `boolean` | Indicates whether or not the component is open. Can be used in lieu of show/hide methods. |  |
| politeness | `PolitenessType` | If set, it will add the `aria-live` attribute with the value on the element where `role="alert"` is set. |  |

### Events

| Event | Description |
|-------|-------------|
| message-bar-after-hide | Emitted after the alert is closed and the transitions are complete. |
| message-bar-after-show | Emitted after the alert is opened and the transitions are complete. |
| message-bar-hide | Emitted when the alert is closed. |
| message-bar-show | Emitted when the alert is opened. |
| alert-after-hide | Emitted after the alert is closed and the transitions are complete. |
| alert-after-show | Emitted after the alert is opened and the transitions are complete. |
| alert-hide | Emitted when the alert is closed. |
| alert-show | Emitted when the alert is opened. |
| ready | Emitted when the component is ready. |

### CSS Custom Properties

| Property | Description |
|----------|-------------|
| `--message-bar-actions-gap` | The gap between the message bar actions. |
| `--message-bar-bg-color` | The background color of the message bar. |
| `--message-bar-border` | The border of the message bar. |
| `--message-bar-button-bg-color` | The background color of the message bar button. |
| `--message-bar-button-border` | The border of the message bar button. |
| `--message-bar-button-font-size` | The font size of the message bar button. |
| `--message-bar-button-padding` | The padding of the message bar button. |
| `--message-bar-fg-color` | The foreground color of the message bar. |
| `--message-bar-font-size` | The font size of the message bar. |
| `--message-bar-font-weight` | The font weight of the message bar. |
| `--message-bar-heading-font-size` | The font size of the message bar heading. |
| `--message-bar-heading-font-weight` | The font weight of the message bar heading. |
| `--message-bar-icon-fg-color` | The foreground color of the message bar icon. |
| `--message-bar-icon-margin` | The margin of the message bar icon. |
| `--message-bar-icon-size` | The size of the message bar icon. |
| `--message-bar-message-margin` | The margin of the message bar message. |
| `--message-bar-padding` | The padding of the message bar. |
| `--message-bar-transition` | The transition of the message bar. |
| `--message-bar-min-height` | The minimum height of the message bar. |
| `--message-bar-border-radius` | The border radius of the message bar. |
| `--message-bar-translate-y-start` | The start of the y translation of the message bar. |
| `--message-bar-translate-y-end` | The end of the y translation of the message bar. |
| `--alert-actions-gap` | The gap between the actions buttons. |
| `--alert-bg-color` | The background color of the alert container. |
| `--alert-border` | The border of the alert container. |
| `--alert-button-bg-color` | The background color of the dismiss button. |
| `--alert-button-border` | The border of the dismiss button. |
| `--alert-button-font-size` | The font size of the dismiss button. |
| `--alert-button-padding` | The padding of the dismiss button. |
| `--alert-fg-color` | The foreground color of the alert container. |
| `--alert-font-size` | The font size of the alert. |
| `--alert-font-weight` | The font weight of the alert. |
| `--alert-heading-font-size` | The font size of the heading. |
| `--alert-heading-font-weight` | The font weight of the heading. |
| `--alert-icon-fg-color` | The foreground color of the icon. |
| `--alert-icon-margin` | The margin of the icon. |
| `--alert-icon-size` | The size of the icon. |
| `--alert-message-margin` | The margin of the alert's message container. |
| `--alert-padding` | The padding of the alert container. |
| `--alert-transition` | The transition of the alert. |

### CSS Parts

| Part | Description |
|------|-------------|
| alert-actions | The container for the action slot. |
| alert-base | The component's base wrapper. |
| alert-content | The content container of the alert. |
| alert-dismiss-button | The dismiss button. |
| alert-icon | The icon of the alert. |
| alert-message | The base of the message portion of the alert. |
