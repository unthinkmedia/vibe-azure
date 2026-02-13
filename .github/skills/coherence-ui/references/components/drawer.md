# Drawer

**Tag:** `cui-drawer`  
**Since:** 1.0.0  
**Status:** Preview  
**Category:** components  
**Source:** https://coherence-ftekb0dcfpcjb3gv.b02.azurefd.net/resources/drawer/

## Import

```js
import '@charm-ux/cui/dist/components/drawer/index.js'
```

## Guidance

### Standards

- You must meet the following requirements when using this component.

### Header (required)

- The header contains a descriptive drawer title, a close button, and any top-level quick actions, like back or refresh.

### Body (required)

- The body contains the content in the drawer. It’s flexible and can accommodate many types of components and content.

### Footer (optional)

- The footer contains any prominent action buttons, such as Submit or Next. Make sure to place primary buttons to the left of other buttons.

### Overlay drawer

- An overlay drawer appears on top of the whole page. By default, it blocks the content it was accessed from and doesn't allow the user to interact outside of the drawer until it's dismissed.

### Inline drawer

An inline drawer appears within the main content of the page. It doesn't block the user from interacting with any content on the rest of the page. It has three additional implementation options that aren’t available with an overlay drawer:


Collapsible: enables temporary dismissal of the drawer
Use a collapsible inline drawer when the content of the drawer is secondary and non-essential to the main content of the page, and/or when the content is dense and additional screen space is valuable to the user.


Always open: removes ability to dismiss drawer, but allows minimizing
Use an always open inline drawer when the content of the drawer is frequently accessed and is necessary to provide the user with a streamlined workflow.


Resizable: allows the user to adjust the width of the drawer
Use a resizable inline drawer when the content of the drawer is dense, and the user is likely to interact with that content to the same degree as they would the main content of the page.

### Allow scrolling

- Scrolling is inevitable on any web page: it's entirely dependent on what device the app is being presented on, the size of the window the user has opened, and the amount of zoom that’s been applied. Allow scrolling in drawers so that all the content inside of it is available. Don't increase the width of the drawer just because one element doesn't fit within the height of the drawer.

### Choose width based on amount of content

There are four default drawer widths: small, medium, large, and full width. There is no right or wrong width to use, and custom widths are available if needed. 


Make sure to use a width that is proportionate to the amount of content that will be shown in the drawer. As an example, a small drawer might be suitable for brief content with a few pieces of information, while a medium or larger drawer might be suitable for a detailed form.

### Use an internal grid

- An internal grid can help to establish hierarchy and structure. A full-width drawer might use a 12-column grid, while a small drawer might use a 4-column grid. Standard gutters (space between columns) are 16 or 24 pixels wide. Use smaller gutters when your app has a lot of content, but space is constrained. Always use the same gutter in every drawer in a single app or site.

### Place drawer based on information priority and reading order

- Drawers are always attached to the very left or right edge of the window. Decide which side the drawer should be based on the priority of information and based on reading order. For languages read from left to right, frequently accessed and high-priority information (such as a navigation) typically goes on the left, while supplemental information that's less essential goes on the right. The inverse is true for languages read right to left.

### Behavior

In any experience, it's likely that multiple types of drawers will be used on a single page. Typically, only one drawer will be visible on the page at a time. Below are the defined interactions between drawer types: how they're accessed, and how they might affect any drawers that are already open on the page.


Note: the word global refers to any piece of UI that can be accessed from any part of the experience. Page-level refers to any piece of UI that is accessed via a specific page.

### Use footer buttons in drawers that enable action

- Only use footers when there is a direct action available that affects the content of the drawer. An example would be a form where the user inputs data. An action associated with that data input might be "save" or "submit." Make sure not to use buttons when providing navigation via a link—use a link inline with the rest of the content instead.

### Be consistent with drawer placement

- Drawers with the same content type or the same access point should open in a predictable way. This helps set user expectations and create a predictable user experience, making the app easier to use.

### Accessibility

Every component meets the Microsoft Accessibility Standards (MAS) requirements, which includes headings, keyboard navigation (focus order), screen readers (labels), color contrast, and more. Using our components and following the design standards will get you most of the way to an accessible experience that meets grade C.


To get you the rest of the way to grade C, you’ll need to ensure that experiences composed of multiple components are accessible. We recommend running Accessibility Insight's FastPass tool and manually testing your scenarios end to end with a keyboard and screen reader.

### Drawer with app help content

- This example shows a drawer being used to host general help content. It features a set of links and provides access for someone to submit a support ticket.

### Drawer with form

- This example shows a form field inside the drawer, using several input fields that let someone provide custom data to the app.

### Provide feedback

- Reach out to us if you spot a bug or have a feature request. Your feedback is critical to the success of Coherence and everyone who uses it.
- Contact us on Teams

## Code Examples

### Inline

Inline drawer is often used for navigation that is not dismissible. As it is on the same level as the main surface, users can still interact with other UI elements. This could be useful for swapping between different items in the main surface. You can use the inline attribute to make a drawer inline.

```html
      <div style="display: grid; grid-template-columns: minmax(0; auto) 1fr">
        <cui-drawer inline id="inline-drawer">
          <div slot="heading">Heading</div>
          <p>Push pane content</p>
        </cui-drawer>

        <div>
          <cui-button appearance="outline" toggles="inline-drawer">
            Toggle pane
          </cui-button>
          <p>
            Integer nec nulla vitae lacus ultricies euismod. Integer libero nulla, ultricies ut
            rhoncus vestibulum, pulvinar vitae metus. Ut rhoncus felis id condimentum pretium.
            Curabitur ipsum mi, venenatis a quam ut, auctor dapibus sem. Proin magna sem, malesuada
            at lacinia eget, ornare ac erat. Pellentesque nec arcu feugiat, luctus justo sit amet,
            bibendum sem. Ut pellentesque malesuada molestie.
          </p>
          <p>
            Fusce euismod massa at nisi congue, id tempor libero congue. Sed congue elit ac magna
            efficitur, at placerat libero suscipit. Nunc ullamcorper sed ligula sed rutrum. Lorem
            ipsum dolor sit amet, consectetur adipiscing elit. Mauris ultricies tempor orci sit amet
            molestie. In venenatis vitae nibh sed ultricies. Curabitur porttitor justo lectus, et
            hendrerit tortor egestas quis. Suspendisse vel ante ut nisi porta maximus consectetur
            vitae urna. Suspendisse id nunc scelerisque, porta nunc ut, pulvinar lorem. Curabitur ac
            nibh ut ex pellentesque lacinia ut et erat. Proin ultricies, justo id vehicula rhoncus,
            nibh tortor fermentum mauris, vel hendrerit diam mi pulvinar sem. Sed vitae arcu
            suscipit, cursus diam cursus, fringilla enim. Integer luctus pellentesque leo non
            rutrum. Nulla a tortor tincidunt libero tincidunt pulvinar. Integer vitae semper neque.
            Morbi sit amet orci ante.
          </p>
          <p>
            Sed congue mauris vel dui viverra maximus. Praesent quis aliquam velit, at scelerisque
            metus. Nam fringilla placerat velit quis egestas. In magna ligula, dictum id lorem eu,
            auctor faucibus risus. Praesent lacinia tincidunt maximus. Etiam libero tellus,
            fermentum eget ligula id, vestibulum pharetra nunc. Curabitur imperdiet nisi non leo
            iaculis, eu consequat lacus ornare. Praesent consequat laoreet turpis a tincidunt. Sed
            quam neque, scelerisque quis elit a, egestas suscipit enim.
          </p>
        </div>
      </div>```

### Separator

When the drawer is inline, you can use the --push-pane-divider-color to adjust the styles of the line separator between the drawer and the content.

```html
const styles = `
    .drawer-seperator{
      display: grid;
      grid-template-columns: minmax(0, auto) 1fr;
    }

    [drawer]::part(drawer-inline){
        --push-pane-divider-color: var(--neutral-background3);
    }
  `;
      <div class="drawer-seperator">
        <cui-drawer inline id="separator-drawer">
          <div slot="heading">Heading</div>

          <p>Push pane content</p>
        </cui-drawer>

        <div>
          <cui-button appearance="outline" toggles="separator-drawer">
            Toggle pane
          </cui-button>
          <p>
            Integer nec nulla vitae lacus ultricies euismod. Integer libero nulla, ultricies ut
            rhoncus vestibulum, pulvinar vitae metus. Ut rhoncus felis id condimentum pretium.
            Curabitur ipsum mi, venenatis a quam ut, auctor dapibus sem. Proin magna sem, malesuada
            at lacinia eget, ornare ac erat. Pellentesque nec arcu feugiat, luctus justo sit amet,
            bibendum sem. Ut pellentesque malesuada molestie.
          </p>
          <p>
            Fusce euismod massa at nisi congue, id tempor libero congue. Sed congue elit ac magna
            efficitur, at placerat libero suscipit. Nunc ullamcorper sed ligula sed rutrum. Lorem
            ipsum dolor sit amet, consectetur adipiscing elit. Mauris ultricies tempor orci sit amet
            molestie. In venenatis vitae nibh sed ultricies. Curabitur porttitor justo lectus, et
            hendrerit tortor egestas quis. Suspendisse vel ante ut nisi porta maximus consectetur
            vitae urna. Suspendisse id nunc scelerisque, porta nunc ut, pulvinar lorem. Curabitur ac
            nibh ut ex pellentesque lacinia ut et erat. Proin ultricies, justo id vehicula rhoncus,
            nibh tortor fermentum mauris, vel hendrerit diam mi pulvinar sem. Sed vitae arcu
            suscipit, cursus diam cursus, fringilla enim. Integer luctus pellentesque leo non
            rutrum. Nulla a tortor tincidunt libero tincidunt pulvinar. Integer vitae semper neque.
            Morbi sit amet orci ante.
          </p>
          <p>
            Sed congue mauris vel dui viverra maximus. Praesent quis aliquam velit, at scelerisque
            metus. Nam fringilla placerat velit quis egestas. In magna ligula, dictum id lorem eu,
            auctor faucibus risus. Praesent lacinia tincidunt maximus. Etiam libero tellus,
            fermentum eget ligula id, vestibulum pharetra nunc. Curabitur imperdiet nisi non leo
            iaculis, eu consequat lacus ornare. Praesent consequat laoreet turpis a tincidunt. Sed
            quam neque, scelerisque quis elit a, egestas suscipit enim.
          </p>
        </div>
      </div>
      <style>{styles}</style>```

### Hide close button

Use the hide-close-button attribute to hide the close button. This button will still appear when being focused.

```html
      <div style="display: grid; grid-template-columns: minmax(0; auto) 1fr">
        <cui-drawer inline open hide-close-button>
          <div slot="heading">Heading</div>
          <p>Push pane content</p>
        </cui-drawer>

        <div>
          <p>
            Integer nec nulla vitae lacus ultricies euismod. Integer libero nulla, ultricies ut
            rhoncus vestibulum, pulvinar vitae metus. Ut rhoncus felis id condimentum pretium.
            Curabitur ipsum mi, venenatis a quam ut, auctor dapibus sem. Proin magna sem, malesuada
            at lacinia eget, ornare ac erat. Pellentesque nec arcu feugiat, luctus justo sit amet,
            bibendum sem. Ut pellentesque malesuada molestie.
          </p>
        </div>
      </div>```

### Position

The position of the drawer can be start(default), end, top, or bottom.

```html
<div>
      <cui-drawer position="end" id="position-drawer">
        <span slot="heading">Drawer title</span>
        <p>Drawer Content</p>
      </cui-drawer>
      <cui-button appearance="outline" shows="position-drawer">
        Open drawer
      </cui-button>
    </div>
```

### Scroll

By default, the drawer will not scroll its content when it overflows. To enable this behavior, the DrawerBody component can be used to wrap the content of the drawer.

```html
<div>
      <cui-drawer id="scroll-drawer">
        <span slot="heading">Drawer title</span>
        <div style="max-height: 300px; height: fit-content; margin-block-end: 18px">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam exercitationem cumque
            repellendus eaque est dolor eius expedita nulla ullam? Tenetur reprehenderit aut
            voluptatum impedit voluptates in natus iure cumque eaque?
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam exercitationem cumque
            repellendus eaque est dolor eius expedita nulla ullam? Tenetur reprehenderit aut
            voluptatum impedit voluptates in natus iure cumque eaque?
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam exercitationem cumque
            repellendus eaque est dolor eius expedita nulla ullam? Tenetur reprehenderit aut
            voluptatum impedit voluptates in natus iure cumque eaque?
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam exercitationem cumque
            repellendus eaque est dolor eius expedita nulla ullam? Tenetur reprehenderit aut
            voluptatum impedit voluptates in natus iure cumque eaque?
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam exercitationem cumque
            repellendus eaque est dolor eius expedita nulla ullam? Tenetur reprehenderit aut
            voluptatum impedit voluptates in natus iure cumque eaque?
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam exercitationem cumque
            repellendus eaque est dolor eius expedita nulla ullam? Tenetur reprehenderit aut
            voluptatum impedit voluptates in natus iure cumque eaque?
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam exercitationem cumque
            repellendus eaque est dolor eius expedita nulla ullam? Tenetur reprehenderit aut
            voluptatum impedit voluptates in natus iure cumque eaque?
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam exercitationem cumque
            repellendus eaque est dolor eius expedita nulla ullam? Tenetur reprehenderit aut
            voluptatum impedit voluptates in natus iure cumque eaque?
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam exercitationem cumque
            repellendus eaque est dolor eius expedita nulla ullam? Tenetur reprehenderit aut
            voluptatum impedit voluptates in natus iure cumque eaque?
          </p>
        </div>

        <cui-button slot="footer" appearance="outline" hides="scroll-drawer">
          Close
        </cui-button>
        <cui-button slot="footer" appearance="primary">
          Do Something
        </cui-button>
      </cui-drawer>
      <cui-button appearance="outline" shows="scroll-drawer">
        Open Drawer
      </cui-button>
    </div>
```

## API Reference

### Attributes

| Attribute | Type | Description | Default |
|-----------|------|-------------|---------|
| breakpoint | `` | The breakpoint at which the drawer changes from inline to overlay. |  |
| close-button-label | `string | undefined` | The label for the push pane close button. |  |
| heading | `string | undefined` | The heading to display at the top of the pane opposite the close button. |  |
| hide-close-button | `boolean | undefined` | Hides the close button when it is not focused. |  |
| inline | `boolean | undefined` | Indicates whether or not the component is inline. |  |
| no-header | `boolean | undefined` | Removes the header. This will also remove the default close button. If using prevent default on drawer-request-close please provide a way for the user to close the drawer. |  |
| open | `` |  |  |
| position | `'start' | 'end' | 'bottom' | undefined` | Position of the dialog. |  |
| size | `'small' | 'medium' | 'large' | 'full' | undefined` | Controls the size of the drawer. |  |
| dir | `'ltr' | 'rtl' | 'auto'` | The dir global attribute is an enumerated attribute that indicates the directionality of the element's text. |  |

### Events

| Event | Description |
|-------|-------------|
| drawer-after-hide | Emitted after the drawer closes and all transitions are complete. |
| drawer-after-show | Emitted after the drawer opens and all transitions are complete. |
| drawer-hide | Emitted when the drawer closes. |
| drawer-request-close | Emitted when the user attempts to close the dialog. If the event is canceled, the dialog will not close. |
| drawer-show | Emitted when the drawer opens. |
| ready | Emitted when the component is ready. |

### CSS Custom Properties

| Property | Description |
|----------|-------------|
| `--drawer-dialog-header-flex-direction` | The flex direction of the dialog header. |
| `--drawer-padding-x` | The padding on the x-axis of the drawer. |
| `--drawer-padding-y` | The padding on the y-axis of the drawer. |
| `--drawer-bg-color` | The background color of the drawer. |
| `--drawer-fg-color` | The foreground color of the drawer. |
| `--drawer-body-font-size` | The font size of the drawer body. |
| `--drawer-body-font-weight` | The font weight of the drawer body. |
| `--drawer-body-height` | The height of the drawer body. |
| `--drawer-body-line-height` | The line height of the drawer body. |
| `--drawer-header-font-size` | The font size of the drawer header. |
| `--drawer-header-font-weight` | -The font weight of the drawer header. |
| `--drawer-header-line-height` | The line height of the drawer header. |
| `--drawer-body-spacing-top` | Spacing between drawer header and body. |
| `--drawer-dialog-toolbar-height` | The height of the dialog toolbar. |
| `--drawer-push-pane-body-margin-inline` | The margin on the inline axis of the push pane body. |
| `--drawer-push-pane-closed-button` | The display of the push pane close button. |
| `--drawer-dialog-backdrop-color` | The backdrop color of the dialog. |

### CSS Parts

| Part | Description |
|------|-------------|
| drawer-inline | The push pane element. |
| drawer-overlay | The dialog element. |
