# App Frame

**Tag:** `cui-app-frame`  
**Since:** 1.0.0  
**Status:** Preview  
**Category:** components  
**Source:** https://coherence-ftekb0dcfpcjb3gv.b02.azurefd.net/resources/app-frame/

## Import

```js
import '@charm-ux/cui/dist/components/app-frame/index.js'
```

## Guidance

### Standard components

- Header
- Side navigation
- Content region (hosts content frame or host app content)
- Drawer

### Types

- There are multiple configurations available for app frame slots for e.g. a simple configuration using the header and content region and a complex configuration that adds the use of the side navigation and header command drawers. Choose the configuration that best suits the app complexity.

### Header

- When used together, the app frame provides all page-level functionality and responsiveness for the header.

### Side navigation

- When used together, the app frame provides all page-level functionality and responsiveness for side navigation.

### Content region

- Accommodates any content including a grid system for organizing and rearranging the content.

### Drawer

- When used together with header, the drawer supports app-wide functions that are initiated from header commands and are accessible on any page.

### Accessibility

The app frame doesn't include pre-built keyboard navigation to provide maximum flexibility for skip-to functionality, navigating landmarks, and custom components used in available slots. 


Slots populated with Coherence components meets the Microsoft Accessibility Standards (MAS) requirements, which includes headings, keyboard navigation (focus order), screen readers (labels), color contrast, and more.

### Provide feedback

- Reach out to us if you spot a bug or have a feature request. Your feedback is critical to the success of Coherence and everyone who uses it.
- Contact us on Teams

## Code Examples

### Default

The default app frame represents the most basic layout structure by using two required slots: header and main. While any element can be slotted into the header slot, using the cui-header component is recommended for consistent styling and built-in functionality like navigation controls and search. The main slot contains your primary content area and accepts any HTML content.

```html
<cui-app-frame>
      <cui-header slot="header" hideNavigation>
        <div slot="title" class="font-base400 ps-lg">
          App Title
        </div>
      </cui-header>
      <div
        slot="main"
        class="d-flex align-center justify-center bg-neutral-96"
        style="height: 400px"
      >
        Main content
      </div>
    </cui-app-frame>
```

### Navigation Slot

The navigation slot example demonstrates how to incorporate a navigation panel into the app frame alongside the header and main content. While any content can be placed in the navigation slot, it is recommended to use the CUI Navigation component which is specifically designed to work seamlessly with the app frame's layout and interaction patterns.

```html
<cui-app-frame>
      <cui-header slot="header" hideNavigation>
        <div slot="title" class="font-base400 ps-lg">
          App Title
        </div>
      </cui-header>
      <div
        slot="main"
        class="d-flex align-center justify-center bg-neutral-96"
        style="height: 400px"
      >
        Main content
      </div>
      <div
        slot="navigation"
        class="d-flex align-center justify-center"
        style="height: 400px; width: 200px"
      >
        Navigation
      </div>
    </cui-app-frame>
```

### SideNav Example in Navigation Slot

This example shows how to use the SideNav component with a Drawer in the navigation slot. The SideNav organizes application menus, while the Drawer provides the ability to toggle the menu for better responsiveness. This pattern is particularly useful in applications that require structured, collapsible navigation.

```html
<cui-app-frame>
      <cui-header slot="header">
        <div slot="title" class="font-base400 ps-lg">
          App Title
        </div>
      </cui-header>
      <div
        slot="main"
        class="d-flex align-center justify-center bg-neutral-96"
        style="height: 400px"
      >
        Main content
      </div>
      <cui-drawer
        style="height: 400px"
        slot="navigation" // Position in navigation slot
        inline // Drawer behaves as part of the layout
        open // Keep open by default
      >
        <cui-side-nav>
          <div class="d-flex align-center justify-center" style="padding-top: 50%">
            Side Nav Component
          </div>
        </cui-side-nav>
      </cui-drawer>
    </cui-app-frame>
```

### Aside Slot

The aside slot provides a designated area for additional content on the right side of the app frame. This space can be used for additional context, details, or complementary information that supports the main content area. While any content can be placed in the aside slot, it's commonly used with the CUI Drawer component for a consistent user experience.

```html
<cui-app-frame>
      <cui-header slot="header" hideNavigation>
        <div slot="title" class="font-base400 ps-lg">
          App Title
        </div>
      </cui-header>
      <div
        slot="main"
        class="d-flex align-center justify-center bg-neutral-96"
        style="height: 400px"
      >
        Main content
      </div>
      <div
        slot="aside"
        class="d-flex align-center justify-center"
        style="height: 400px; width: 200px"
      >
        Aside
      </div>
    </cui-app-frame>
```

### Inline and Dialog Drawer Example in Aside Slot

This example highlights the flexibility of the CUI Drawer in the aside slot. By toggling the inline attribute, the drawer can be configured as part of the layout (inline) or as a modal overlay (dialog). This adaptability allows you to choose a style that best fits your application's design and user interaction requirements.

```html
<div class="d-flex flex-column gap-lg">
      <cui-app-frame>
        <cui-header slot="header" hideNavigation>
          <div slot="title" class="font-base400 ps-lg">
            App Title
          </div>
          <cui-button
            slot="overflow-actions"
            appearance="subtle"
            shape="rounded"
            size="large"
            icon-only
            toggles="inline-drawer"
          >
            <cui-icon url="https://api.iconify.design/fluent:board-24-regular.svg"></cui-icon>
          </cui-button>
        </cui-header>
        <div
          slot="main"
          class="d-flex align-center justify-center bg-neutral-96"
          style="height: 400px"
        >
          Main content
        </div>
        <cui-drawer slot="aside" id="inline-drawer" style="height: 400%" inline>
          <div>Inline Drawer</div>
        </cui-drawer>
      </cui-app-frame>

      <cui-app-frame>
        <cui-header slot="header" hideNavigation>
          <div slot="title" class="font-base400 ps-lg">
            App Title
          </div>
          <cui-button
            slot="overflow-actions"
            appearance="subtle"
            shape="rounded"
            size="large"
            icon-only
            toggles="dialog-drawer"
          >
            <cui-icon url="https://api.iconify.design/fluent:board-24-regular.svg"></cui-icon>
          </cui-button>
        </cui-header>
        <div
          slot="main"
          class="d-flex align-center justify-center bg-neutral-96"
          style="height: 400px"
        >
          Main content
        </div>
        <cui-drawer slot="aside" id="dialog-drawer" style="height: 400%" position="end">
          <div>Dialog Drawer</div>
        </cui-drawer>
      </cui-app-frame>
    </div>
```

### Skip To Navigating

The app frame supports keyboard accessibility through skip navigation links. These links allow users to bypass repetitive content and navigate directly to key sections of the application, such as the main content, navigation, or aside panels. By default, a "Skip to main content" link is included, but additional skip links can be easily added through the links slot to accommodate other sections. These links remain visually hidden until focused, ensuring a seamless experience for all users, including those relying on keyboards or screen readers for navigation.

```html
<cui-app-frame skip-to-main-text="Skip to main content">
      <cui-header slot="header" hideNavigation>
        <div slot="title" class="font-base400 ps-lg">
          App Title
        </div>
      </cui-header>
      <div
        slot="navigation"
        id="sideNav"
        tab-index={-1}
        class="d-flex align-center justify-center"
        style="height: 400px; width: 200px"
      >
        Navigation
      </div>
      <div
        slot="main"
        class="d-flex align-center justify-center bg-neutral-96"
        style="height: 400px"
      >
        Main content
      </div>
      <div
        slot="aside"
        id="asideContent"
        tab-index={-1}
        class="d-flex align-center justify-center"
        style="height: 400px; width: 200px"
      >
        Aside content
      </div>
      <a slot="links" href="#sideNav">
        Skip to side navigation
      </a>
      <a slot="links" href="#asideContent">
        Skip to aside content
      </a>
    </cui-app-frame>
```

### Complete App Frame

The Complete App Frame example demonstrates a fully implemented application layout integrating all available slots and components. It features a header with search and user controls, navigation with nested menu items, main content area, and utility drawers for AI assistance and settings. This implementation showcases how the app frame can support complex application structures while maintaining a clean, organized layout.

```html
import {
  CuiAiChat,
  CuiAppFrame,
  CuiAvatar,
  CuiButton,
  CuiCard,
  CuiDivider,
  CuiDrawer,
  CuiHeader,
  CuiIcon,
  CuiNavHeading,
  CuiNavItem,
  CuiPersona,
  CuiPopOver,
  CuiSearchBox,
  CuiSideNav,

  useEffect(() => {
    const drawer = document.getElementById('aichat-drawer') as HTMLElement;

    const handleDrawerShow = () => setIsDrawerOpen(true);
    const handleDrawerHide = () => setIsDrawerOpen(false);

    if (drawer) {
      drawer.addEventListener('drawer-show', handleDrawerShow);
      drawer.addEventListener('drawer-hide', handleDrawerHide);
    }
) => {
      if (drawer) {
        drawer.removeEventListener('drawer-show', handleDrawerShow);
        drawer.removeEventListener('drawer-hide', handleDrawerHide);
      }

  }, []);

  const styles = `
    body {
      margin: 0;
    }
    cui-card {
      flex-grow: 1;
      height: 240px;
    }
    cui-ai-chat::part(ai-chat-message-response-heading) {
      display: none;
    }
    cui-ai-chat::part(ai-chat-message-response),
    cui-ai-chat::part(ai-chat-message) {
      margin-right: 0;
    }
    cui-ai-chat cui-button::part(button-control) {
      justify-content: flex-start;
    }
    .prompt-buttons {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-sm);
    }
    .prompt {
      flex-grow: 1;
      --button-icon-size: var(--font-size-base500);
      --button-subtext-font-size: var(--font-size-base300);
      --button-padding-y: var(--spacing-sm);
    }
    [slot='main'] {
      min-width: 320px;
      padding: 30px 16px;
    }
    @media (min-width: 768px) {
      [slot='main'] {
        padding: 30px 40px;
      }
    }
    @media (min-width: 1024px) {
      [slot='main'] {
        padding: 30px 72px;
      }
    }
  `;
      <cui-app-frame skipToMainText="Skip to main content">
        <cui-header slot="header" navigationIconLabel="toggle navigation">
          <cui-button slot="title" appearance="transparent" id="titleControl">
            <span class="font-base400">C+E Design System</span>
          </cui-button>
          <cui-search-box slot="search" hideLabel placeholder="Search input"></cui-search-box>
          <cui-button
            slot="overflow-actions"
            appearance="subtle"
            shape="rounded"
            size="large"
            icon-only
            pressed={isDrawerOpen}
            toggles="aichat-drawer"
            hides="navigation-drawer"
          >
            <cui-icon url="https://api.iconify.design/fluent:sparkle-24-regular.svg"
              selectedUrl="https://api.iconify.design/fluent:sparkle-24-filled.svg"
              selected={isDrawerOpen}></cui-icon>
            <span class="visually-hidden">AI Assistant</span>
          </cui-button>
          <cui-button
            slot="overflow-actions"
            appearance="subtle"
            shape="rounded"
            size="large"
            icon-only
            shows="settings-drawer"
            hides="navigation-drawer"
          >
            <cui-icon url="https://api.iconify.design/fluent:settings-24-regular.svg"
              selectedUrl="https://api.iconify.design/fluent:settings-24-filled.svg"></cui-icon>
            <span class="visually-hidden">Settings</span>
          </cui-button>
          <cui-button
            slot="overflow-actions"
            appearance="subtle"
            shape="rounded"
            size="large"
            icon-only
            shows="help-drawer"
            hides="navigation-drawer"
          >
            <cui-icon url="https://api.iconify.design/fluent:question-24-regular.svg"
              selectedUrl="https://api.iconify.design/fluent:question-24-filled.svg"></cui-icon>
            <span class="visually-hidden">Help</span>
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
        <cui-avatar size="24" name="Kevin Sturgis">
          <img
            slot="image"
            crossorigin="anonymous"
            src="https://res-1.cdn.office.net/files/fabric-cdn-prod_20230815.002/office-ui-fabric-react-assets/persona-male.png"
            alt="Kevin Sturgis"
          />
        </cui-avatar>
      </cui-button>
      <cui-persona>
        <cui-avatar name="Kevin Sturgis">
          <img
            slot="image"
            crossorigin="anonymous"
            src="https://res-1.cdn.office.net/files/fabric-cdn-prod_20230815.002/office-ui-fabric-react-assets/persona-male.png"
            alt="Kevin Sturgis"
          />
        </cui-avatar>
        <div slot="primary">Kevin Sturgis</div>
        <div slot="secondary">Available</div>
      </cui-persona>
      <cui-divider class="my-xl"></cui-divider>
      <div class="d-flex flex-column align-start">
        <cui-button href="javascript:;" appearance="link">Your profile</cui-button>
        <cui-button href="javascript:;" appearance="link">View account</cui-button>
        <cui-button href="javascript:;" appearance="link">Sign Out</cui-button>
      </div>
    </cui-pop-over>
        </cui-header>
        <cui-drawer
          id="navigation-drawer"
          slot="navigation"
          inline
          position="start"
          breakpoint="686px"
          open
        >
          <cui-side-nav>
            <cui-nav-heading>Home</cui-nav-heading>
            <cui-nav-item label="Dashboard" href="javascript:;" selected>
              <cui-icon slot="icon"
                url="https://api.iconify.design/fluent:board-24-regular.svg"
                selected-url="https://api.iconify.design/fluent:board-24-filled.svg"></cui-icon>
            </cui-nav-item>
            <cui-nav-item label="Announcements" href="javascript:;">
              <cui-icon slot="icon"
                url="https://api.iconify.design/fluent:megaphone-24-regular.svg"
                selected-url="https://api.iconify.design/fluent:megaphone-24-filled.svg"></cui-icon>
            </cui-nav-item>
            <cui-nav-item label="Employee Spotlight" href="javascript:;">
              <cui-icon slot="icon"
                url="https://api.iconify.design/fluent:person-lightbulb-24-regular.svg"
                selected-url="https://api.iconify.design/fluent:person-lightbulb-24-filled.svg"></cui-icon>
            </cui-nav-item>
            <cui-nav-item label="Profile Search" href="javascript:;">
              <cui-icon slot="icon"
                url="https://api.iconify.design/fluent:person-search-24-regular.svg"
                selected-url="https://api.iconify.design/fluent:person-search-24-filled.svg"></cui-icon>
            </cui-nav-item>
            <cui-nav-item label="Performance Reviews" href="javascript:;">
              <cui-icon slot="icon"
                url="https://api.iconify.design/fluent:preview-link-24-regular.svg"
                selected-url="https://api.iconify.design/fluent:preview-link-24-filled.svg"></cui-icon>
            </cui-nav-item>
            <cui-nav-heading>Employment Management</cui-nav-heading>
            <cui-nav-item label="Job Postings">
              <cui-icon slot="icon"
                url="https://api.iconify.design/fluent:note-24-regular.svg"
                selected-url="https://api.iconify.design/fluent:note-24-filled.svg"></cui-icon>
              <cui-nav-item label="Openings" href="javascript:;"></cui-nav-item>
              <cui-nav-item label="Submissions" href="javascript:;"></cui-nav-item>
            </cui-nav-item>
            <cui-nav-item label="Interviews" href="javascript:;">
              <cui-icon slot="icon"
                url="https://api.iconify.design/fluent:people-24-regular.svg"
                selected-url="https://api.iconify.design/fluent:people-24-filled.svg"></cui-icon>
            </cui-nav-item>
          </cui-side-nav>
        </cui-drawer>
        <div slot="main">
          <h1 class="mb-xxl font-base600 font-semi-bold">
            Design System Demo
          </h1>
          <div class="d-flex flex-column gap-xxl">
            <p class="text-lg text-gray-700">
              Explore our comprehensive collection of UI components and
              utilities using the left navigation menu. Test components in
              real-time with our interactive playground, and access detailed
              technical documentation.
            </p>
            <div class="d-flex gap-xxl flex-wrap">
              <cui-card style="max-width: 636px">
                <h2>Additional Resources</h2>
                <div class="d-flex flex-column gap-md align-start mt-md">
                  <cui-button appearance="link" href="#">
                    Browse all UI packages on npm
                  </cui-button>
                  <cui-button appearance="link" href="#">
                    Visit our GitHub repository
                  </cui-button>
                  <cui-button appearance="link" href="#">
                    Read the full documentation
                  </cui-button>
                  <cui-button appearance="link" href="#">
                    Get started with our CLI tool
                  </cui-button>
                </div>
              </cui-card>
            </div>
          </div>
        </div>
        <cui-drawer
          id="aichat-drawer"
          slot="aside"
          inline
          position="end"
          breakpoint="686px"
        >
          <div slot="heading" class="d-flex align-center gap-sm">
            <cui-icon name="sparkle"></cui-icon>
            Assistant
          </div>
          <cui-ai-chat
            label="Full example chat window"
            maxResponseCount="10"
            maxlength="25"
            allowInputOverMaxlength
            promptGuide
          >
            <div slot="response-1-body">
              <p>
                Hi Kat,
                <br />
                Ready to explore? Select one of the suggestions below to get
                started...
              </p>
              <div class="prompt-buttons">
                <cui-button class="prompt">
                  Summarize
                  <span slot="subtext">Review key points in file</span>
                  <cui-icon slot="start" name="person"></cui-icon>
                </cui-button>
                <cui-button class="prompt">
                  Create
                  <span slot="subtext">Write more about...</span>
                  <cui-icon slot="start" name="person"></cui-icon>
                </cui-button>
                <cui-button class="prompt">
                  Ask
                  <span slot="subtext">Tell me about my day</span>
                  <cui-icon slot="start" name="person"></cui-icon>
                </cui-button>
              </div>
            </div>
          </cui-ai-chat>
        </cui-drawer>
        <cui-drawer
          id="settings-drawer"
          slot="aside"
          inline
          position="end"
          breakpoint="686px"
        >
                      <span slot="heading">Settings</span>
            <div class="d-flex flex-column gap-md p-xs mt-lg">
              <div>
                <cui-button appearance="subtle">
                  <cui-icon slot="start" name="mail"></cui-icon>
                  Keyboard shortcuts
                </cui-button>
              </div>
              <div>
                <cui-button appearance="subtle">
                  <cui-icon slot="start" name="clock"></cui-icon>
                  Notifications
                </cui-button>
              </div>
              <div>
                <cui-button appearance="subtle">
                  <cui-icon slot="start" name="phone"></cui-icon>
                  Sounds and haptic
                </cui-button>
              </div>
            </div>        </cui-drawer>
        <cui-drawer
          id="help-drawer"
          slot="aside"
          inline
          position="end"
          breakpoint="686px"
        >
                      <span slot="heading">Help</span>
            <div class="d-flex flex-column gap-md p-xs mt-lg">
              <span class="font-base500">Resources</span>
              <cui-button href="#" appearance="link">
                Get started with designing FAQs
              </cui-button>
              <cui-button href="#" appearance="link">
                Get started with developing FAQs
              </cui-button>
              <cui-divider class="my-xxl"></cui-divider>
              <span class="font-base500">Privacy</span>
              <cui-button href="#" appearance="link">
                Microsoft Privacy Statement
              </cui-button>
            </div>        </cui-drawer>
      </cui-app-frame>
      <style>{styles}</style>```

## API Reference

### Slots

| Slot | Description |
|------|-------------|
| aside | Aside slot on right hand side of main content |
| header | Header slot |
| links | Links inside the skip-to component. |
| main | Main slot in center of app frame |
| navigation | Navigation slot on left hand side of main content |

### Attributes

| Attribute | Type | Description | Default |
|-----------|------|-------------|---------|
| hide-skip-to | `boolean` | Hides the skip to component | `false` |
| skip-to-main-text | `string` | Text for the skip to main content link | `Skip to main content` |

### CSS Custom Properties

| Property | Description |
|----------|-------------|
| `--app-frame-header-height` | Height of the header. |
| `--app-frame-navigation-width` | Width of the navigation. |
| `--app-frame-drawer-bg-color` | Background color of the drawer. |
