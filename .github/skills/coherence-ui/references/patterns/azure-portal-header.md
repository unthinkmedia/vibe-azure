# Azure Portal Header

Standardized header bar used across all Azure portal pages.

## Structure

```
CuiHeader
├── slot="title"              → CuiButton (transparent) with app name text
├── slot="search"             → CuiSearchBox (hideLabel, placeholder with keyboard shortcut)
├── slot="overflow-actions"   → 6 global action buttons (left to right):
│   ├── Copilot               → CuiIcon name="bot"
│   ├── Cloud Shell            → CuiIcon url (fluent:terminal-24-regular)
│   ├── Notifications          → CuiIcon name="alert"
│   ├── Settings               → CuiIcon url (fluent:settings-24-regular)
│   ├── Help + support         → CuiIcon url (fluent:question-circle-24-regular)
│   └── Feedback               → CuiIcon name="person-feedback"
└── slot="actions-end"        → CuiPopOver (fixedPlacement)
    ├── slot="anchor"          → CuiButton (subtle, iconOnly) with CuiAvatar
    └── body                   → CuiPersona + CuiDivider + link buttons (profile, account, sign out)
```

## React Example

```tsx
import {
  CuiAvatar,
  CuiButton,
  CuiDivider,
  CuiHeader,
  CuiIcon,
  CuiPersona,
  CuiPopOver,
  CuiSearchBox,
} from '@charm-ux/cui/react';

function AzurePortalHeader() {
  return (
    <CuiHeader slot="header" navigationIconLabel="toggle navigation">
      <CuiButton slot="title" appearance="transparent">
        <span className="font-base400">Microsoft Azure</span>
      </CuiButton>

      <CuiSearchBox
        slot="search"
        hideLabel
        placeholder="Search resources, services, and docs (G+/)"
      />

      <CuiButton slot="overflow-actions" appearance="subtle" shape="rounded" size="large" iconOnly aria-label="Copilot">
        <CuiIcon name="bot" />
      </CuiButton>
      <CuiButton slot="overflow-actions" appearance="subtle" shape="rounded" size="large" iconOnly aria-label="Cloud Shell">
        <CuiIcon url="https://api.iconify.design/fluent:terminal-24-regular.svg" />
      </CuiButton>
      <CuiButton slot="overflow-actions" appearance="subtle" shape="rounded" size="large" iconOnly aria-label="Notifications">
        <CuiIcon name="alert" />
      </CuiButton>
      <CuiButton slot="overflow-actions" appearance="subtle" shape="rounded" size="large" iconOnly aria-label="Settings">
        <CuiIcon name="settings" />
      </CuiButton>
      <CuiButton slot="overflow-actions" appearance="subtle" shape="rounded" size="large" iconOnly aria-label="Help + support">
        <CuiIcon url="https://api.iconify.design/fluent:question-circle-24-regular.svg" />
      </CuiButton>
      <CuiButton slot="overflow-actions" appearance="subtle" shape="rounded" size="large" iconOnly aria-label="Feedback">
        <CuiIcon name="person-feedback" />
      </CuiButton>

      <CuiPopOver slot="actions-end" fixedPlacement>
        <CuiButton slot="anchor" appearance="subtle" shape="rounded" size="large" iconOnly>
          <CuiAvatar size={24} name="Alex Britez" />
        </CuiButton>
        <CuiPersona>
          <CuiAvatar name="Alex Britez" />
          <div slot="primary">Alex Britez</div>
          <div slot="secondary">Available</div>
        </CuiPersona>
        <CuiDivider className="my-xl" />
        <div className="d-flex flex-column align-start">
          <CuiButton appearance="link">Your profile</CuiButton>
          <CuiButton appearance="link">View account</CuiButton>
          <CuiButton appearance="link">Sign Out</CuiButton>
        </div>
      </CuiPopOver>
    </CuiHeader>
  );
}
```

## Key Details

- `navigationIconLabel` on `CuiHeader` enables the hamburger toggle for the side nav drawer.
- Search placeholder follows the Azure convention: includes `(G+/)` keyboard shortcut hint.
- Six global action buttons in `overflow-actions` match the real Azure portal (Copilot, Cloud Shell, Notifications, Settings, Help + support, Feedback).
- Each icon-only button uses `aria-label` on the button for accessibility — no visible text labels.
- Avatar uses `size={24}` inside the header button; full-size avatar inside the popover persona.
- The popover body uses a `CuiPersona` for the user card, followed by a divider and link-appearance buttons for navigation actions.

## Customization Points

| Element | What to change |
|---------|---------------|
| App name | Text inside `slot="title"` button — e.g. `"Microsoft Azure"`, `"Microsoft Azure (Preview)"` |
| User name | `name` prop on both `CuiAvatar` instances and persona primary text |
| Secondary text | Persona `slot="secondary"` — email, org, or status |
| Search placeholder | Adjust search scope description |
| Global action buttons | Remove any of the 6 `overflow-actions` buttons not needed for your app |
| Profile links | Add/remove link buttons after the divider |
