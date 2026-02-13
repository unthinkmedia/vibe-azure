# Side Navigation

**Tag:** `cui-side-nav`  
**Since:** 1.0.0  
**Status:** Preview  
**Category:** components  
**Source:** https://coherence-ftekb0dcfpcjb3gv.b02.azurefd.net/resources/side-nav/

## Import

```js
import '@charm-ux/cui/dist/components/side-nav/index.js'
```

## Guidance

### Types

- Depending on your individual app requirements, your nav can include two different variants of nav groups.

### Side nav has two primary visual states

- The states are triggered by using the hamburger menu button that acts as a toggle and is part of header or app frame.

### Hierarchy

- Organize a lengthy list of navigation items for better usability.

### Provide feedback

- Reach out to us if you spot a bug or have a feature request. Your feedback is critical to the success of Coherence and everyone who uses it.
- Contact us on Teams

## Code Examples

### Default

```html
<div
      style="max-width: 260px;"
    >
      <cui-side-nav>
        <cui-nav-item label="Dashboard">
          <cui-icon slot="icon" name="bookmark" selectedName="bookmark"></cui-icon>
        </cui-nav-item>
        <cui-nav-item label="Announcements">
          <cui-icon slot="icon" name="bot" selectedName="bot"></cui-icon>
        </cui-nav-item>
        <cui-nav-item label="Interviews">
          <cui-icon slot="icon" name="filter" selectedName="filter"></cui-icon>
        </cui-nav-item>
      </cui-side-nav>
    </div>
```

### Child Nav Item

To create a child item, nest a nav-item element within a parent nav-item. This establishes a hierarchical structure where child items are grouped under their parent item.

```html
<div
      style="max-width: 260px;"
    >
      <cui-side-nav>
        <cui-nav-item label="Dashboard">
          <cui-icon slot="icon" name="bookmark" selectedName="bookmark"></cui-icon>
        </cui-nav-item>
        <cui-nav-item label="Job Posting">
          <cui-icon slot="icon" name="history" selectedName="history"></cui-icon>
          <cui-nav-item label="Openings"></cui-nav-item>
          <cui-nav-item label="Submissions"></cui-nav-item>
        </cui-nav-item>
        <cui-nav-item label="Interviews">
          <cui-icon slot="icon" name="filter" selectedName="filter"></cui-icon>
        </cui-nav-item>
        <cui-divider ></cui-divider>
        <cui-nav-item label="Applications"></cui-nav-item>
      </cui-side-nav>
    </div>
```

### Navigation Item Split Control

The expand control for child items comes in two variations: a single button or a split button. The single button is the default behavior. To use the split button, add the split attribute to the parent nav-item.

```html
<div style="max-width: 260px">
      <cui-side-nav>
        <cui-nav-item label="Dashboard">
          <cui-icon slot="icon" name="bookmark" selectedName="bookmark"></cui-icon>
        </cui-nav-item>
        <cui-nav-item label="Job Posting" toggleLabel="expand" split>
          <cui-icon slot="icon" name="history" selectedName="history"></cui-icon>
          <cui-nav-item label="Openings"></cui-nav-item>
          <cui-nav-item label="Submissions"></cui-nav-item>
        </cui-nav-item>
        <cui-nav-item label="Interviews">
          <cui-icon slot="icon" name="filter" selectedName="filter"></cui-icon>
        </cui-nav-item>
      </cui-side-nav>
    </div>
```

### Side Nav Expand Mode

There are two types of expand modes: multiple and single. By default, the expand mode is set to multiple. This determines whether multiple nav items can be expanded at the same time or only one. To change the expand mode to single, add expand-mode="single" within the side-nav tag.

```html
const sharedDivStyle = {
    maxWidth: '260px',

      <div >
        <p>Multiple expand mode</p>
        <cui-side-nav>
          <cui-nav-item label="Dashboard">
            <cui-icon slot="icon" name="bookmark" selectedName="bookmark"></cui-icon>
          </cui-nav-item>
          <cui-nav-item label="Job Posting">
            <cui-icon slot="icon" name="history" selectedName="history"></cui-icon>
            <cui-nav-item label="Openings"></cui-nav-item>
            <cui-nav-item label="Submissions"></cui-nav-item>
          </cui-nav-item>
          <cui-nav-item label="Retirement">
            <cui-icon slot="icon" name="link" selectedName="link"></cui-icon>
            <cui-nav-item label="Plan Information"></cui-nav-item>
            <cui-nav-item label="Fund Performance"></cui-nav-item>
          </cui-nav-item>
          <cui-nav-item label="Interviews">
            <cui-icon slot="icon" name="filter" selectedName="filter"></cui-icon>
          </cui-nav-item>
        </cui-side-nav>
      </div>
      <br />
      <div >
        <p>Single expand mode</p>
        <cui-side-nav expandMode="single">
          <cui-nav-item label="Dashboard">
            <cui-icon slot="icon" name="bookmark" selectedName="bookmark"></cui-icon>
          </cui-nav-item>
          <cui-nav-item label="Job Posting">
            <cui-icon slot="icon" name="history" selectedName="history"></cui-icon>
            <cui-nav-item label="Openings"></cui-nav-item>
            <cui-nav-item label="Submissions"></cui-nav-item>
          </cui-nav-item>
          <cui-nav-item label="Retirement">
            <cui-icon slot="icon" name="link" selectedName="link"></cui-icon>
            <cui-nav-item label="Plan Information"></cui-nav-item>
            <cui-nav-item label="Fund Performance"></cui-nav-item>
          </cui-nav-item>
          <cui-nav-item label="Interviews">
            <cui-icon slot="icon" name="filter" selectedName="filter"></cui-icon>
          </cui-nav-item>
        </cui-side-nav>
      </div>```

### Nav Item Anchor

By default, the nav-item is rendered as a button. However, if an href attribute is provided, it will render as an anchor link.

```html
<div
      style="max-width: 260px;"
    >
      <cui-side-nav>
        <cui-nav-item label="Dashboard" href="javascript:;">
          <cui-icon slot="icon" name="bookmark" selectedName="bookmark"></cui-icon>
        </cui-nav-item>
        <cui-nav-item label="Announcements" href="javascript:;">
          <cui-icon slot="icon" name="bot" selectedName="bot"></cui-icon>
        </cui-nav-item>
      </cui-side-nav>
    </div>
```

### Nav Item Label

The label for a nav-item can be set in two ways. Preferred: use the label attribute directly within the nav-item tag for simple text labels. Use the label slot when you need to include more complex HTML content, such as badges or other elements.

```html
const sharedDivStyle = {
    maxWidth: '260px',

      <div >
        <cui-side-nav>
          <cui-nav-item label="Dashboard">
            <cui-icon slot="icon" name="bookmark" selectedName="bookmark"></cui-icon>
          </cui-nav-item>
        </cui-side-nav>
      </div>
      <br />
      <div >
        <cui-side-nav>
          <cui-nav-item>
            <cui-icon slot="icon" name="bookmark" selectedName="bookmark"></cui-icon>
            <span slot="label" class="d-flex align-center space-between">
              Dashboard <cui-badge>New</cui-badge>
            </span>
          </cui-nav-item>
        </cui-side-nav>
      </div>```

### Side Nav Heading

Use the nav-heading element within the side-nav component to add headings and visually group related nav-item elements. This helps to organize and structure navigation sections more clearly.

```html
<div
      style="max-width: 260px;"
    >
      <cui-side-nav>
        <cui-nav-heading>Home</cui-nav-heading>
        <cui-nav-item label="Dashboard">
          <cui-icon slot="icon" name="bookmark" selectedName="bookmark"></cui-icon>
        </cui-nav-item>
        <cui-nav-item label="Announcements">
          <cui-icon slot="icon" name="bot" selectedName="bot"></cui-icon>
        </cui-nav-item>
        <cui-nav-item label="Interviews">
          <cui-icon slot="icon" name="filter" selectedName="filter"></cui-icon>
        </cui-nav-item>
        <cui-nav-heading>Benefits</cui-nav-heading>
        <cui-nav-item label="Work Data">
          <cui-icon slot="icon" name="person" selectedName="person"></cui-icon>
        </cui-nav-item>
        <cui-nav-item label="Reports">
          <cui-icon slot="icon" name="share" selectedName="share"></cui-icon>
        </cui-nav-item>
      </cui-side-nav>
    </div>
```

### Side Nav Size

Side nav is available in two sizes: small and medium. The default size for navigation is medium.

```html
<div
      style="max-width: 260px;"
    >
      <cui-side-nav size="small">
        <cui-nav-heading>Home</cui-nav-heading>
        <cui-nav-item label="Dashboard">
          <cui-icon slot="icon" name="bookmark" selectedName="bookmark"></cui-icon>
        </cui-nav-item>
        <cui-nav-item label="Job Posting">
          <cui-icon slot="icon" name="history" selectedName="history"></cui-icon>
          <cui-nav-item label="Openings"></cui-nav-item>
          <cui-nav-item label="Submissions"></cui-nav-item>
        </cui-nav-item>
        <cui-nav-item label="Interviews">
          <cui-icon slot="icon" name="filter" selectedName="filter"></cui-icon>
        </cui-nav-item>
      </cui-side-nav>
    </div>
```

### Heading and Footer Slot

The side-nav component supports both a heading and a footer slot, allowing you to customize the top and bottom sections of the side nav. heading and footer slots are not for nav-item elements.

```html
import {
  CuiDivider,
  CuiIcon,
  CuiNavHeading,
  CuiNavItem,
  CuiSideNav,
  CuiButton,

<div
      style="max-width: 260px;"
    >
      <cui-side-nav>
        <h2 slot="heading" class="m-none font-base500">
          App name
        </h2>
        <cui-nav-heading>Home</cui-nav-heading>
        <cui-nav-item label="Dashboard">
          <cui-icon slot="icon" name="bookmark" selectedName="bookmark"></cui-icon>
        </cui-nav-item>
        <cui-nav-item label="Interviews">
          <cui-icon slot="icon" name="filter" selectedName="filter"></cui-icon>
        </cui-nav-item>
        <div slot="footer">
          <cui-divider ></cui-divider>
          <cui-button appearance="subtle">Footer</cui-button>
        </div>
      </cui-side-nav>
    </div>
```

## API Reference

### Slots

| Slot | Description |
|------|-------------|
| (default) | Utilized for specifying the side nav items. |
| footer | Utilized for specifying the footer of the side nav. |
| heading | Utilized for specifying the heading of the side nav. |

### Attributes

| Attribute | Type | Description | Default |
|-----------|------|-------------|---------|
| expand-mode | `'single' | 'multiple' | undefined` | Represents the expand mode for the side nav. |  |
| selectedItem | `FluentNavItem | undefined` | Represents the currently selected nav item. |  |
| size | `'small' | 'medium' | undefined` | Represents the size of the nav item component. |  |
| dir | `'ltr' | 'rtl' | 'auto'` | The dir global attribute is an enumerated attribute that indicates the directionality of the element's text. |  |

### Events

| Event | Description |
|-------|-------------|
| ready | Emitted when the component is ready. |

### CSS Custom Properties

| Property | Description |
|----------|-------------|
| `--side-nav-bg-color` | The background color of the side nav component. |
| `--side-nav-fg-color` | The foreground color of the side nav component. |
| `--side-nav-padding` | The padding of the side nav component. |
