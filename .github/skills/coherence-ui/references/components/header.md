# Header

**Tag:** `cui-header`  
**Since:** 1.0.0  
**Status:** Preview  
**Category:** components  
**Source:** https://coherence-ftekb0dcfpcjb3gv.b02.azurefd.net/resources/header/

## Import

```js
import '@charm-ux/cui/dist/components/header/index.js'
```

## Guidance

### Standards

- You must meet the following requirements when using this component.

### Required components

- Application name

### Optional components

- Use these optional elements based on your product requirements.

### Standard global actions

- The header comes with the option to include buttons that initiate to global actions. The standard global actions are notifications, settings, help, and feedback. As many or as few of these standard global actions can be used in an app. These buttons can also be customized to host non-standard global actions based on specific app or site needs.

### Writing guidelines

- The only language element that appears in the header is the app name. When naming your app or site, consider the following requirements:

### Navigation components

The header itself doesn’t enable navigation between pages. Use a secondary component, such as a tablist, alongside the header to enable navigation. 


You can also choose to use the app frame. It does much of the heavy lifting to create a responsive shell with slots available for the header and side navigation components. If you use side navigation, the entry point should be the hamburger menu button in the header.

### Accessibility

Every component meets the Microsoft Accessibility Standards (MAS) requirements, which includes headings, keyboard navigation (focus order), screen readers (labels), color contrast, and more. Using our components and following the design standards will get you most of the way to an accessible experience that meets grade C.


To get you the rest of the way to grade C, you’ll need to ensure that experiences composed of multiple components are accessible. We recommend running Accessibility Insight's FastPass tool and manually testing your scenarios end to end with a keyboard and screen reader.

### Provide feedback

- Reach out to us if you spot a bug or have a feature request. Your feedback is critical to the success of Coherence and everyone who uses it.
- Contact us on Teams

## Code Examples

### Default

```html
import {
  CuiAvatar,
  CuiButton,
  CuiDivider,
  CuiHeader,
  CuiIcon,
  CuiPersona,
  CuiPopOver,
  CuiSearchBox,

<cui-header>
      <cui-button slot="title" appearance="transparent">
        <span class="font-base400">C+E Design System</span>
      </cui-button>
      <cui-search-box slot="search" hideLabel placeholder="Search input"></cui-search-box>
      <cui-button slot="overflow-actions" appearance="subtle" shape="round" size="large" icon-only>
        <cui-icon name="bookmark"></cui-icon>
        <span class="visually-hidden">Bookmark</span>
      </cui-button>
      <cui-button slot="overflow-actions" appearance="subtle" shape="round" size="large" icon-only>
        <cui-icon name="comment"></cui-icon>
        <span class="visually-hidden">Comment</span>
      </cui-button>
      <cui-button slot="overflow-actions" appearance="subtle" shape="round" size="large" icon-only>
        <cui-icon name="history"></cui-icon>
        <span class="visually-hidden">History</span>
      </cui-button>
      <cui-pop-over slot="actions-end" fixed-placement>
        <cui-button
          slot="anchor"
          id="profile-toggle"
          appearance="subtle"
          shape="rounded"
          size="large"
          icon-only
        >
          <cui-avatar size="24">
            <img
              slot="image"
              crossOrigin="anonymous"
              src="https://res-1.cdn.office.net/files/fabric-cdn-prod_20230815.002/office-ui-fabric-react-assets/persona-male.png"
              alt="Kevin Sturgis"
            />
          </cui-avatar>
        </cui-button>
        <cui-persona>
          <cui-avatar size="28">
            <img
              slot="image"
              crossOrigin="anonymous"
              src="https://res-1.cdn.office.net/files/fabric-cdn-prod_20230815.002/office-ui-fabric-react-assets/persona-male.png"
              alt="Kevin Sturgis"
            />
          </cui-avatar>
          <div slot="primary">Kevin Sturgis</div>
          <div slot="secondary">Available</div>
        </cui-persona>
        <cui-divider class="my-xl"></cui-divider>
        <div class="d-flex flex-column align-start">
          <cui-button href="javascript:;" appearance="link">
            Your profile
          </cui-button>
          <cui-button href="javascript:;" appearance="link">
            View account
          </cui-button>
          <cui-button href="javascript:;" appearance="link">
            Sign Out
          </cui-button>
        </div>
      </cui-pop-over>
    </cui-header>
```

### No Navigation

The header component offers the flexibility to hide its navigation control when not required by your application's design pattern. To remove the navigation element, simply apply the hide-navigation attribute to the header component.

```html
import {
  CuiAvatar,
  CuiButton,
  CuiDivider,
  CuiHeader,
  CuiIcon,
  CuiPersona,
  CuiPopOver,
  CuiSearchBox,

<cui-header hideNavigation>
      <cui-button slot="title" appearance="transparent">
        <span class="font-base400">C+E Design System</span>
      </cui-button>
      <cui-search-box slot="search" hideLabel placeholder="Search input"></cui-search-box>
      <cui-button slot="overflow-actions" appearance="subtle" shape="round" size="large" icon-only>
        <cui-icon name="bookmark"></cui-icon>
        <span class="visually-hidden">Bookmark</span>
      </cui-button>
      <cui-button slot="overflow-actions" appearance="subtle" shape="round" size="large" icon-only>
        <cui-icon name="comment"></cui-icon>
        <span class="visually-hidden">Comment</span>
      </cui-button>
      <cui-button slot="overflow-actions" appearance="subtle" shape="round" size="large" icon-only>
        <cui-icon name="history"></cui-icon>
        <span class="visually-hidden">History</span>
      </cui-button>
      <cui-pop-over slot="actions-end" fixed-placement>
        <cui-button
          slot="anchor"
          id="profile-toggle"
          appearance="subtle"
          shape="rounded"
          size="large"
          icon-only
        >
          <cui-avatar size="24">
            <img
              slot="image"
              crossOrigin="anonymous"
              src="https://res-1.cdn.office.net/files/fabric-cdn-prod_20230815.002/office-ui-fabric-react-assets/persona-male.png"
              alt="Kevin Sturgis"
            />
          </cui-avatar>
        </cui-button>
        <cui-persona>
          <cui-avatar size="28">
            <img
              slot="image"
              crossOrigin="anonymous"
              src="https://res-1.cdn.office.net/files/fabric-cdn-prod_20230815.002/office-ui-fabric-react-assets/persona-male.png"
              alt="Kevin Sturgis"
            />
          </cui-avatar>
          <div slot="primary">Kevin Sturgis</div>
          <div slot="secondary">Available</div>
        </cui-persona>
        <cui-divider class="my-xl"></cui-divider>
        <div class="d-flex flex-column align-start">
          <cui-button href="javascript:;" appearance="link">
            Your profile
          </cui-button>
          <cui-button href="javascript:;" appearance="link">
            View account
          </cui-button>
          <cui-button href="javascript:;" appearance="link">
            Sign Out
          </cui-button>
        </div>
      </cui-pop-over>
    </cui-header>
```

## API Reference

### Slots

| Slot | Description |
|------|-------------|
| actions-end | actions end slot |
| overflow-actions | actions overflow slot |
| search | search slot |
| title | title slot |

### Attributes

| Attribute | Type | Description | Default |
|-----------|------|-------------|---------|
| close-search-icon-label | `string | undefined` | The label for the close search control. | `Close search` |
| expanded | `boolean | undefined` | The expanded state of the navigation. |  |
| hide-navigation | `boolean` | Hides the navigation control. | `false` |
| navigation-icon-label | `string | undefined` | The label for the navigation icon. | `Toggle navigation` |
| open-search-icon-label | `string | undefined` | The label for the open search control. | `Open search` |

### Events

| Event | Description |
|-------|-------------|
| header-expanded-change | Emitted when the header expanded state changes |

### CSS Custom Properties

| Property | Description |
|----------|-------------|
| `--header-bg-color` | The background color of the header |
| `--header-height` | The height of the header |
| `--header-navigation-icon-size` | The size of the navigation icon |
| `--header-search-box-width` | The max width of the search container |
| `--header-search-min-width` | The min width of the search container |
| `--header-action-width` | The width of the action button |

### CSS Parts

| Part | Description |
|------|-------------|
| header-navigation-control | The navigation show/hide button. |
