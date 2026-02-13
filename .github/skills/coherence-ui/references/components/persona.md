# Persona

**Tag:** `cui-persona`  
**Since:** 1.0.0  
**Status:** Preview  
**Category:** components  
**Source:** https://coherence-ftekb0dcfpcjb3gv.b02.azurefd.net/resources/persona/

## Import

```js
import '@charm-ux/cui/dist/components/persona/index.js'
```

## Guidance

### Standards

- You must meet the following requirements when using this component.

### Anatomy

- The persona displays an avatar paired with associated text, such as the person or group’s name, contact information, and more. It can optionally include up to three lines of information, in addition to the name.

### Customization options

- The persona can be structured with the avatar stacked above the text with everything aligned to the center, or with the avatar on the left or right of left-aligned text.

### Presence-only persona

- When space is constrained, the avatar can be replaced with just a presence (status) badge to simplify the persona.

### Provide feedback

- Reach out to us if you spot a bug or have a feature request. Your feedback is critical to the success of Coherence and everyone who uses it.
- Contact us on Teams

## Code Examples

### Text alignment

A Persona supports two text alignments, start and center. The default is start.

```html
<div class="d-flex gap-lg">
      <cui-persona>
        <cui-avatar name="Kevin Sturgis">
          <img
            slot="image"
            crossOrigin="anonymous"
            src="https://res-1.cdn.office.net/files/fabric-cdn-prod_20230815.002/office-ui-fabric-react-assets/persona-male.png"
            alt="Kevin Sturgis"
          />
        </cui-avatar>
        <cui-badge size="extra-small" status="available" slot="status-indicator"></cui-badge>
        <span slot="primary">Kevin Sturgis</span>
        <span slot="secondary">Available</span>
        <span slot="tertiary">Software Engineer</span>
        <span slot="quaternary">Microsoft</span>
      </cui-persona>
      <cui-persona textAlignment="center">
        <cui-avatar name="Kevin Sturgis">
          <img
            slot="image"
            crossOrigin="anonymous"
            src="https://res-1.cdn.office.net/files/fabric-cdn-prod_20230815.002/office-ui-fabric-react-assets/persona-male.png"
            alt="Kevin Sturgis"
          />
        </cui-avatar>
        <span slot="primary">Kevin Sturgis</span>
        <span slot="secondary">Available</span>
        <span slot="tertiary">Software Engineer</span>
        <span slot="quaternary">Microsoft</span>
      </cui-persona>
    </div>
```

### Text position

Persona supports three text positions, after, before, and below. The default is after.

```html
<div class="d-flex gap-lg">
      <cui-persona>
        <cui-avatar name="Kevin Sturgis">
          <img
            slot="image"
            crossOrigin="anonymous"
            src="https://res-1.cdn.office.net/files/fabric-cdn-prod_20230815.002/office-ui-fabric-react-assets/persona-male.png"
            alt="Kevin Sturgis"
          />
        </cui-avatar>
        <cui-badge slot="status-indicator" size="extra-small" status="available"></cui-badge>
        <span slot="primary">Kevin Sturgis</span>
        <span slot="secondary">Available</span>
      </cui-persona>
      <cui-persona textPosition="below">
        <cui-avatar name="Kevin Sturgis">
          <img
            slot="image"
            crossOrigin="anonymous"
            src="https://res-1.cdn.office.net/files/fabric-cdn-prod_20230815.002/office-ui-fabric-react-assets/persona-male.png"
            alt="Kevin Sturgis"
          />
        </cui-avatar>
        <cui-badge slot="status-indicator" size="extra-small" status="available"></cui-badge>
        <span slot="primary">Kevin Sturgis</span>
        <span slot="secondary">Available</span>
      </cui-persona>
      <cui-persona textPosition="before">
        <cui-avatar name="Kevin Sturgis">
          <img
            slot="image"
            crossOrigin="anonymous"
            src="https://res-1.cdn.office.net/files/fabric-cdn-prod_20230815.002/office-ui-fabric-react-assets/persona-male.png"
            alt="Kevin Sturgis"
          />
        </cui-avatar>
        <cui-badge slot="status-indicator" size="extra-small" status="available"></cui-badge>
        <span slot="primary">Kevin Sturgis</span>
        <span slot="secondary">Available</span>
      </cui-persona>
    </div>
```

### status size

```html
<div class="d-flex flex-column gap-lg">
      <cui-persona>
        <cui-badge size="extra-small" status="available"></cui-badge>
        <span slot="primary">Kevin Sturgis</span>
        <span slot="secondary">Available</span>
      </cui-persona>
      <cui-persona>
        <cui-badge size="small" status="available"></cui-badge>
        <span slot="primary">Kevin Sturgis</span>
        <span slot="secondary">Available</span>
      </cui-persona>
      <cui-persona>
        <cui-badge size="medium" status="available"></cui-badge>
        <span slot="primary">Kevin Sturgis</span>
        <span slot="secondary">Available</span>
      </cui-persona>
      <cui-persona>
        <cui-badge size="large" status="available"></cui-badge>
        <span slot="primary">Kevin Sturgis</span>
        <span slot="secondary">Available</span>
      </cui-persona>
      <cui-persona>
        <cui-badge size="extra-large" status="available"></cui-badge>
        <span slot="primary">Kevin Sturgis</span>
        <span slot="secondary">Available</span>
      </cui-persona>
    </div>
```

### Avatar size

```html
<div class="d-flex flex-column gap-lg">
      <cui-persona size="small">
        <cui-avatar name="Kevin Sturgis">
          <img
            slot="image"
            crossOrigin="anonymous"
            src="https://res-1.cdn.office.net/files/fabric-cdn-prod_20230815.002/office-ui-fabric-react-assets/persona-male.png"
            alt="Kevin Sturgis"
          />
          <cui-badge slot="status-indicator" size="extra-small" status="available"></cui-badge>
        </cui-avatar>
        <span slot="primary">Kevin Sturgis</span>
        <span slot="secondary">Available</span>
      </cui-persona>
      <cui-persona size="medium">
        <cui-avatar name="Kevin Sturgis">
          <img
            slot="image"
            crossOrigin="anonymous"
            src="https://res-1.cdn.office.net/files/fabric-cdn-prod_20230815.002/office-ui-fabric-react-assets/persona-male.png"
            alt="Kevin Sturgis"
          />
          <cui-badge slot="status-indicator" size="extra-small" status="available"></cui-badge>
        </cui-avatar>
        <span slot="primary">Kevin Sturgis</span>
        <span slot="secondary">Available</span>
      </cui-persona>
      <cui-persona size="large">
        <cui-avatar name="Kevin Sturgis">
          <img
            slot="image"
            crossOrigin="anonymous"
            src="https://res-1.cdn.office.net/files/fabric-cdn-prod_20230815.002/office-ui-fabric-react-assets/persona-male.png"
            alt="Kevin Sturgis"
          />
          <cui-badge slot="status-indicator" size="extra-small" status="available"></cui-badge>
        </cui-avatar>
        <span slot="primary">Kevin Sturgis</span>
        <span slot="secondary">Available</span>
      </cui-persona>
      <cui-persona size="extra-large">
        <cui-avatar name="Kevin Sturgis">
          <img
            slot="image"
            crossOrigin="anonymous"
            src="https://res-1.cdn.office.net/files/fabric-cdn-prod_20230815.002/office-ui-fabric-react-assets/persona-male.png"
            alt="Kevin Sturgis"
          />
          <cui-badge slot="status-indicator" size="small" status="available"></cui-badge>
        </cui-avatar>
        <span slot="primary">Kevin Sturgis</span>
        <span slot="secondary">Available</span>
      </cui-persona>
      <cui-persona size="huge">
        <cui-avatar name="Kevin Sturgis">
          <img
            slot="image"
            crossOrigin="anonymous"
            src="https://res-1.cdn.office.net/files/fabric-cdn-prod_20230815.002/office-ui-fabric-react-assets/persona-male.png"
            alt="Kevin Sturgis"
          />
          <cui-badge slot="status-indicator" size="large" status="available"></cui-badge>
        </cui-avatar>
        <span slot="primary">Kevin Sturgis</span>
        <span slot="secondary">Available</span>
      </cui-persona>
    </div>
```

## API Reference

### Slots

| Slot | Description |
|------|-------------|
| default | Utilized for specifying the default element, typically an avatar component. |
| primary | Utilized for specifying the primary text. |
| quaternary | Utilized for specifying the quaternary text. |
| secondary | Utilized for specifying the secondary text. |
| tertiary | Utilized for specifying the tertiary text. |

### Attributes

| Attribute | Type | Description | Default |
|-----------|------|-------------|---------|
| out-of-office | `boolean` |  | `false` |
| presence | `PresenceType | undefined` |  |  |
| presence-only | `boolean` |  | `false` |
| size | `PersonaSize | undefined` |  |  |
| text-alignment | `PersonaTextAlignment | undefined` |  |  |
| text-position | `PersonaTextPosition | undefined` |  |  |
| dir | `'ltr' | 'rtl' | 'auto'` | The dir global attribute is an enumerated attribute that indicates the directionality of the element's text. |  |

### Events

| Event | Description |
|-------|-------------|
| ready | Emitted when the component is ready. |

### CSS Custom Properties

| Property | Description |
|----------|-------------|
| `--persona-image-spacing-x` | The horizontal spacing between the persona image and the text. |
| `--persona-image-spacing-y` | The vertical spacing between the persona image and the text. |
