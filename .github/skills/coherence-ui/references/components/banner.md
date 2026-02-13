# Banner

**Tag:** `cui-banner`  
**Category:** components  
**Source:** https://coherence-ftekb0dcfpcjb3gv.b02.azurefd.net/resources/banner/

## Import

```js
import '@charm-ux/cui/dist/components/banner/index.js'
```

## Guidance

### Standards

- You must meet the following requirements when using this component.

### Anatomy

- The banner is a container that spans the area it’s placed in. In its simplest form, it includes a title and a button, but can accommodate an additional text string, button, link, and unique feature content.

### Types

In addition to the default blue banner, several additional styles are available to fit the context of where the banner is placed, or to show that the banner is specifically highlighting features related to Copilot. 


The styles include brand, informative, filled, filled-alt, outline, and Copilot.

### Feature content

- The feature content slot can display one of three options: display text, a badge, or an icon.

### Layout

- The banner has three layout options: center-aligned with stacked buttons, left-aligned with stacked buttons, and left-aligned with split buttons.

### Multiple banners on one page

While using multiple banners on a page is not generally recommended, it can be done if the banners are placed strategically to avoid reducing the impact of each banner. When using multiple banners, be sure that each one is separated by at least one other section of app content.


However, because banners can be similar to advertisements, it’s still best to use one banner on a page. This is so that people aren’t overwhelmed by options and can remain focused on their tasks if they choose to.

### Provide feedback

- Reach out to us if you spot a bug or have a feature request. Your feedback is critical to the success of Coherence and everyone who uses it.
- Contact us on Teams

## Code Examples

### Default

By default, the banner has only a heading and a single button. For basic banners, only the card-banner class is needed.

```html
<cui-card class="card-banner">
      <div slot="heading">Complete signup and get full access to Azure</div>
      <div slot="footer">
        <cui-button appearance="primary">Button</cui-button>
      </div>
    </cui-card>
```

### Optional Elements

Optionally, a caption, feature content text (or badge or icon), a secondary button, and a link can be added to the banner.

```html
<cui-card class="card-banner">
      <div slot="media" class="card-banner-media-text">
        $20,680
      </div>
      <div slot="heading">Complete signup and get full access to Azure</div>
      You're almost there! Complete your sign-up to unlock all the benefits and features waiting for
      you. Join us today and get started in just a few clicks!
      <div slot="footer">
        <cui-button appearance="primary">Button</cui-button>
        <cui-button>Button</cui-button>
        <cui-button appearance="link" href="#">
          Learn more
        </cui-button>
      </div>
    </cui-card>
```

### Badge

This example shows how to add a badge to the banner using the media slot.

```html
<cui-card class="card-banner">
      <cui-badge slot="media">UPGRADE AVAILABLE</cui-badge>
      <div slot="heading">Complete signup and get full access to Azure</div>
      You're almost there! Complete your sign-up to unlock all the benefits and features waiting for
      you. Join us today and get started in just a few clicks!
      <div slot="footer">
        <cui-button appearance="primary">Button</cui-button>
        <cui-button>Button</cui-button>
        <cui-button appearance="link" href="#">
          Learn more
        </cui-button>
      </div>
    </cui-card>
```

### Icon

This example shows how to add an icon to the banner using the media slot.

```html
<cui-card class="card-banner">
      <cui-icon slot="media" name="sparkle" style="width: 24px; height: 24px"></cui-icon>
      <div slot="heading">Complete signup and get full access to Azure</div>
      You're almost there! Complete your sign-up to unlock all the benefits and features waiting for
      you. Join us today and get started in just a few clicks!
      <div slot="footer">
        <cui-button appearance="primary">Button</cui-button>
        <cui-button>Button</cui-button>
        <cui-button appearance="link" href="#">
          Learn more
        </cui-button>
      </div>
    </cui-card>
```

### Appearance

The banner supports brand (the default), informative, outline, neutral, neutral-alt, and copilot appearances.

```html
<cui-card class="card-banner card-banner-informative">
      <div slot="media" class="card-banner-media-text">
        $20,680
      </div>
      <div slot="heading">Complete signup and get full access to Azure</div>
      You're almost there! Complete your sign-up to unlock all the benefits and features waiting for
      you. Join us today and get started in just a few clicks!
      <div slot="footer">
        <cui-button appearance="primary">Button</cui-button>
        <cui-button>Button</cui-button>
        <cui-button appearance="link" href="#">
          Learn more
        </cui-button>
      </div>
    </cui-card>
```

### Layout

The banner supports left (the default), centered, and split layouts. The split banner will automatically switch to left layout at widths below 1024 pixels.

```html
<cui-card class="card-banner">
      <div slot="media" class="card-banner-media-text">
        $20,680
      </div>
      <div slot="heading">Complete signup and get full access to Azure</div>
      You're almost there! Complete your sign-up to unlock all the benefits and features waiting for
      you. Join us today and get started in just a few clicks!
      <div slot="footer">
        <cui-button appearance="primary">Button</cui-button>
        <cui-button>Button</cui-button>
        <cui-button appearance="link" href="#">
          Learn more
        </cui-button>
      </div>
    </cui-card>
```

## API Reference
