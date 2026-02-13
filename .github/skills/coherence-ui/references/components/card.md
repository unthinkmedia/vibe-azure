# Card

**Tag:** `cui-card`  
**Since:** 1.0.0  
**Status:** Preview  
**Category:** components  
**Source:** https://coherence-ftekb0dcfpcjb3gv.b02.azurefd.net/resources/card/

## Import

```js
import '@charm-ux/cui/dist/components/card/index.js'
```

## Guidance

### Standards

- You must meet the following requirements when using this component.

### Cards vs. surfaces

- While similar, cards and surfaces have different uses.

### Basic elements

- Cards feature three customizable content slots: header, preview, and footer. While subcomponents are not automatically included within these slots, they offer a flexible area for customization to suit your product's needs.

### Header anatomy

- Contains information that represents the full contents of the card.
- Contains the card title and an optional subtitle.
- Optionally contains a small image, icon, or logo.
- Optionally contains a button with actions you can take on the card itself.
- Doesn’t usually contain any other components.

### Preview (body) anatomy

- Contains the preview information from the original concept.
- The most flexible part of the card: it can contain text, images, and additional components.
- When the preview contains only an image, it can be placed above or below the header.
- When it contains any other mix of content types (image + text, text only, etc.), the preview is placed below the header.

### Footer anatomy

- Contains actions available related to the highlighted content. Actions can be through buttons, links, or other action-oriented components.
- Can also contain secondary information that isn’t essential to understand the rest of the card’s contents. Content can be plain text using secondary font styles, badges, or other components.

### Hero cards

- A hero card has unique styling to make it stand out from the rest of the content on a page. A hero card is typically the largest card on the page, and only one or two exist on a single page. It might also use larger font sizes, a featured image, a primary button in the footer, or all three.

### Card grids

- In large cards or in cards that contain lots of information, use an internal grid to establish hierarchy and structure. The standard internal card grid is four columns, as shown below. Standard gutters (space between columns) are 16-pixels and 24-pixels wide. Use smaller gutters when your app has a lot of content, but space is constrained. Always use the same gutter in every card in a single app.

### Cards on a page

- Cards can appear in the same surface as other content on a page.

### Content

- Card content can vary widely from card to card. Be sure to evaluate the effectiveness of language in each card, and as a group of cards. The following language requirements are standard across cards:

### Standardize card layouts by topic

- When topics with similar content follow the same layout pattern, it creates consistency and predictability in your app, which can help people comprehend the information more quickly.

### Organize cards in priority order

- Put cards in order of what information is most important. Hero cards are always first in the reading order, while cards with less relevant information are placed further down the page.

### Define height by largest card

The largest card or the card with the most content in a row can be used to determine the heights of all cards in a row. The cards with less content can stretch to fit the height of the largest card, leaving white space between the header or preview slots and the footer slot.


The same applies for cards with mixed heights: two stacked cards might fit in the same footprint as one large card in the same row. If the stacked cards together are larger in height than one large card, the stacked cards set the height for the row and the large card’s white space grows to span the same height.

### Limit to two hero cards

- Hero cards are designed to stand out visually, creating hierarchy on a page and drawing attention to the most important topics. If more than two hero cards are used on a page, they’re no longer visually distinct and they lose their effect as a hero element.

### Link to full content when truncating

- In scenarios where there’s more text than fits within the card’s fixed height, text truncation might be necessary. Truncate text after two lines and always provide a link so that people can access the full information.

### Accessibility

Every component meets the Microsoft Accessibility Standards (MAS) requirements, which includes headings, keyboard navigation (focus order), screen readers (labels), color contrast, and more. Using our components and following the design standards gets you most of the way to an accessible experience that meets grade C.


To get you the rest of the way to grade C, run the Accessibility Insight's FastPass tool and manually test your scenarios end to end with a keyboard and screen reader.

### Founders Hub home

- Founders Hub’s home page uses cards on the dashboard, including two large hero cards and four smaller cards.

### Founders Hub benefits

- Founders Hub uses three similar inline cards on the benefits page with call-to-action buttons at the top of the page. It also includes a set of three simple cards below under a heading for all benefits.

### Provide feedback

- Reach out to us if you spot a bug or have a feature request. Your feedback is critical to the success of Coherence and everyone who uses it.
- Contact us on Teams

## Code Examples

### Default

```html
<cui-card>
      <cui-persona slot="media-start">
        <span slot="primary">
          <b>Kevin Sturgis</b> mentioned you
        </span>
        <span slot="secondary">5h ago · About us - Overview</span>
        <cui-avatar name="Lydia Bauer">
          <img
            slot="image"
            crossOrigin="anonymous"
            src="https://res-1.cdn.office.net/files/fabric-cdn-prod_20230815.002/office-ui-fabric-react-assets/persona-male.png"
            alt="Kevin Sturgis"
          />
        </cui-avatar>
      </cui-persona>
      <img
        slot="media"
        style="margin: 0 -12px; max-width: unset"
        src="https://raw.githubusercontent.com/microsoft/fluentui/master/packages/react-components/react-card/stories/src/assets/doc_template.png"
        alt="About Us Chapter 01"
      />
      <div slot="footer" class="d-flex align-center gap-md">
        <cui-button>
          <cui-icon name="arrow-reply" slot="start"></cui-icon>
          Reply
        </cui-button>
        <cui-button>
          <cui-icon name="share" slot="start"></cui-icon>
          Share
        </cui-button>
      </div>
    </cui-card>
```

### Size

The Card component offers three size options: small, medium, and large. The primary difference between these sizes is the spacing of the content within the card. Each size adjusts the internal padding and layout to accommodate different amounts of content while maintaining a consistent design across various card dimensions.

```html
      <cui-card size="small" style="max-width: 300px">
        <div slot="media">
          <img
            class="br-md"
            width="32px"
            height="32px"
            src="https://raw.githubusercontent.com/microsoft/fluentui/master/packages/react-components/react-card/stories/src/assets/logo.svg"
            alt="image1 alt text"
          />
          <img
            class="br-md"
            width="32px"
            height="32px"
            src="https://raw.githubusercontent.com/microsoft/fluentui/master/packages/react-components/react-card/stories/src/assets/logo2.svg"
            alt="image2 alt text"
          />
        </div>
        <div slot="heading">Alert in Teams when a new document is uploaded in channel</div>
        <div slot="subheading">By Microsoft</div>
        <div slot="footer" class="d-flex align-center space-between">
          <span class="font-base300">Automated</span>
          <span class="font-base300">3290</span>
        </div>
      </cui-card>
      <br />
      <br />
      <cui-card size="medium" style="max-width: 300px">
        <div slot="media">
          <img
            class="br-md"
            width="32px"
            height="32px"
            src="https://raw.githubusercontent.com/microsoft/fluentui/master/packages/react-components/react-card/stories/src/assets/logo.svg"
            alt="image1 alt text"
          />
          <img
            class="br-md"
            width="32px"
            height="32px"
            src="https://raw.githubusercontent.com/microsoft/fluentui/master/packages/react-components/react-card/stories/src/assets/logo2.svg"
            alt="image2 alt text"
          />
        </div>
        <div slot="heading">Alert in Teams when a new document is uploaded in channel</div>
        <div slot="subheading">By Microsoft</div>
        <div slot="footer" class="d-flex align-center space-between">
          <span class="font-base300">Automated</span>
          <span class="font-base300">3290</span>
        </div>
      </cui-card>
      <br />
      <br />
      <cui-card size="large" style="max-width: 300px">
        <div slot="media">
          <img
            class="br-md"
            width="32px"
            height="32px"
            src="https://raw.githubusercontent.com/microsoft/fluentui/master/packages/react-components/react-card/stories/src/assets/logo.svg"
            alt="image1 alt text"
          />
          <img
            class="br-md"
            width="32px"
            height="32px"
            src="https://raw.githubusercontent.com/microsoft/fluentui/master/packages/react-components/react-card/stories/src/assets/logo2.svg"
            alt="image2 alt text"
          />
        </div>
        <div slot="heading">Alert in Teams when a new document is uploaded in channel</div>
        <div slot="subheading">By Microsoft</div>
        <div slot="footer" class="d-flex align-center space-between">
          <span class="font-base300">Automated</span>
          <span class="font-base300">3290</span>
        </div>
      </cui-card>```

### Appearance

The Card component offers four appearances: filled, filled-alternative, outline and subtle.

```html
      <cui-card appearance="filled" style="width: 360px">
        <div slot="media-start">
          <div class="d-flex align-center">
            <img
              class="me-md br-md"
              width="44px"
              height="44px"
              src="https://raw.githubusercontent.com/microsoft/fluentui/master/packages/react-components/react-card/stories/src/assets/app_logo.svg"
              alt="image alt text"
            />
            <div>
              <div class="font-base300 font-semi-bold">App Name</div>
              <div class="font-base200 fg-neutral-38">Developer</div>
            </div>
            <cui-button appearance="transparent" icon-only class="ml-auto">
              <cui-icon name="more-horizontal" label="more"></cui-icon>
            </cui-button>
          </div>
        </div>
        <div class="font-base300">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis animi quis, accusamus
          neque ut eaque.
        </div>
      </cui-card>
      <br />
      <br />
      <cui-card appearance="filled-alternative" style="width: 360px">
        <div slot="media-start">
          <div class="d-flex align-center">
            <img
              class="me-md br-md"
              width="44px"
              height="44px"
              src="https://raw.githubusercontent.com/microsoft/fluentui/master/packages/react-components/react-card/stories/src/assets/app_logo.svg"
              alt="image alt text"
            />
            <div>
              <div class="font-base300 font-semi-bold">App Name</div>
              <div class="font-base200 fg-neutral-38">Developer</div>
            </div>
            <cui-button appearance="transparent" icon-only class="ml-auto">
              <cui-icon name="more-horizontal" label="more"></cui-icon>
            </cui-button>
          </div>
        </div>
        <div class="font-base300">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis animi quis, accusamus
          neque ut eaque.
        </div>
      </cui-card>
      <br />
      <br />
      <cui-card appearance="outline" style="width: 360px">
        <div slot="media-start">
          <div class="d-flex align-center">
            <img
              class="me-md br-md"
              width="44px"
              height="44px"
              src="https://raw.githubusercontent.com/microsoft/fluentui/master/packages/react-components/react-card/stories/src/assets/app_logo.svg"
              alt="image alt text"
            />
            <div>
              <div class="font-base300 font-semi-bold">App Name</div>
              <div class="font-base200 fg-neutral-38">Developer</div>
            </div>
            <cui-button appearance="transparent" icon-only class="ml-auto">
              <cui-icon name="more-horizontal" label="more"></cui-icon>
            </cui-button>
          </div>
        </div>
        <div class="font-base300">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis animi quis, accusamus
          neque ut eaque.
        </div>
      </cui-card>
      <br />
      <br />
      <cui-card appearance="subtle" style="width: 360px">
        <div slot="media-start">
          <div class="d-flex align-center">
            <img
              class="me-md br-md"
              width="44px"
              height="44px"
              src="https://raw.githubusercontent.com/microsoft/fluentui/master/packages/react-components/react-card/stories/src/assets/app_logo.svg"
              alt="image alt text"
            />
            <div>
              <div class="font-base300 font-semi-bold">App Name</div>
              <div class="font-base200 fg-neutral-38">Developer</div>
            </div>
            <cui-button appearance="transparent" icon-only class="ml-auto">
              <cui-icon name="more-horizontal" label="more"></cui-icon>
            </cui-button>
          </div>
        </div>
        <div class="font-base300">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis animi quis, accusamus
          neque ut eaque.
        </div>
      </cui-card>```

### Template

Cards can be combined with other components to create rich, dynamic elements that enhance the content of a page.

```html
<cui-card style="width: 280px">
      <div slot="media">
        <cui-badge
          shape="rounded"
          appearance="tint"
          color="danger"
          style="--badge-border-radius: 4px"
        >
          Red
        </cui-badge>
        <cui-badge
          shape="rounded"
          appearance="tint"
          color="success"
          style="--badge-border-radius: 4px"
        >
          Green
        </cui-badge>
        <cui-badge
          shape="rounded"
          appearance="tint"
          color="brand"
          style="--badge-border-radius: 4px"
        >
          Blue
        </cui-badge>
      </div>
      <div>
        <cui-checkbox>
          <div class="fg-neutral-0 mb-xs font-base300 font-semi-bold">Task title</div>
          <div class="font-base200 fg-neutral-2">
            Donut chocolate bar oat cake. Dragée tiramisu lollipop bear claw. Marshmallow pastry
            jujubes toffee sugar plum.
          </div>
        </cui-checkbox>
        <cui-checkbox>
          <div class="fg-neutral-0 mb-xs font-base300 font-semi-bold">Task title</div>
          <div class="font-base200 fg-neutral-2">
            Donut chocolate bar oat cake. Dragée tiramisu lollipop bear claw. Marshmallow pastry
            jujubes toffee sugar plum.
          </div>
        </cui-checkbox>
      </div>
      <div slot="footer" class="d-flex align-center gap-md">
        <cui-icon name="attach"></cui-icon>
        <cui-icon name="checkmark-circle"></cui-icon>
        <cui-icon name="comment"></cui-icon>
      </div>
    </cui-card>
```

## API Reference

### Slots

| Slot | Description |
|------|-------------|
| media-start | Utilized for specifying the media content at the start of the card. |
| (default) | The card's main content. |
| footer | The card's footer. |
| heading | Wraps the heading element. |
| media | A presentational slot for media such as an image or icon. |
| subheading | Wraps the subheading element. |

### Attributes

| Attribute | Type | Description | Default |
|-----------|------|-------------|---------|
| appearance | `'filled' | 'filled-alternative' | 'outline' | 'subtle' | undefined` | The appearance property defines the visual style of the component. |  |
| size | `'small' | 'medium' | 'large' | undefined` |  |  |
| dir | `'ltr' | 'rtl' | 'auto'` | The dir global attribute is an enumerated attribute that indicates the directionality of the element's text. |  |
| heading | `string | undefined` | Provides a heading for the card. |  |
| media-position | `'top' | 'bottom' | 'start' | 'end' | undefined` | A flag used to change visual positioning of any media (default 'top'). |  |
| subheading | `string | undefined` | Provides a subheading for the card. |  |

### Events

| Event | Description |
|-------|-------------|
| ready | Emitted when the component is ready. |

### CSS Custom Properties

| Property | Description |
|----------|-------------|
| `--card-bg-color` | Sets the background color for the card. |
| `--card-body-padding-x` | Controls the horizontal padding of the card body. |
| `--card-body-padding-y` | Controls the vertical padding of the card body. |
| `--card-border-color` | Sets the border color for the card. |
| `--card-border-radius` | Sets border-radius for the card. |
| `--card-border-size` | Sets the border width for the card. |
| `--card-border-style` | Sets the border style for the card. |
| `--card-box-shadow` | Sets the style of the shadowing for the card. |
| `--card-content-gap` | Determines the spacing between the slots. |
| `--card-fg-color` | Sets the foreground color (text color) for the card. |
| `--card-footer-padding-x` | Controls the horizontal padding of the card footer. |
| `--card-footer-padding-y` | Controls the vertical padding of the card footer. |
| `--card-heading-gap` | Controls the gap between the heading and subheading. |
| `--card-heading-padding-x` | Controls the horizontal padding of the card heading. |
| `--card-heading-padding-y` | Controls the vertical padding of the card heading. |
| `--card-heading-size` | Controls the font size of the heading. |
| `--card-heading-weight` | Controls the font weight of the heading. |
| `--card-padding` | Sets the padding for the card. |
| `--card-subheading-size` | Controls the font size of the subheading. |
| `--card-subheading-weight` | Controls the font weight of the subheading. |

### CSS Parts

| Part | Description |
|------|-------------|
| card-base | The component's base wrapper. |
| card-content | The card's main content. |
| card-footer | The card's footer. |
| card-header | The card's header. |
| card-heading | The card's heading element. |
| card-media | The card's media. |
| card-subheading | The card's subheading element. |
