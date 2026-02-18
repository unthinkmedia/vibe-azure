# Azure Portal Header

Standardized header bar used across all Azure portal pages.

## Structure

```
CuiHeader
├── slot="title"              → CuiButton (transparent) with app name text
├── slot="search"             → CuiSearchBox (hideLabel, placeholder with keyboard shortcut)
│                             → CopilotButton (white pill, 12px left margin from search)
├── slot="overflow-actions"   → 5 global action buttons (left to right):
│   ├── Cloud Shell            → CuiIcon url (fluent:terminal-24-regular)
│   ├── Notifications          → CuiIcon name="alert"
│   ├── Settings               → CuiIcon name="settings"
│   ├── Help + support         → CuiIcon url (fluent:question-circle-24-regular)
│   └── Feedback               → CuiIcon name="person-feedback"
└── slot="actions-end"        → CuiPopOver (fixedPlacement)
    ├── slot="anchor"          → CuiButton (subtle, iconOnly) with CuiAvatar
    └── body                   → CuiPersona + CuiDivider + link buttons (profile, account, sign out)
```

## Copilot Button

The Copilot button sits in `slot="search"` — immediately to the right of the search box — **not** in `overflow-actions`.

Import from `../experiments/copilot-button` (or `'../copilot-button'` from sibling experiments).

### Styling spec (matches real Azure portal)

| Property | Value |
|----------|-------|
| `size` | `medium` |
| `shape` | `square` |
| Background | `#ffffff` (opaque white) via `--button-bg-color` |
| Text color | `#242424` via `--button-fg-color` |
| Border | transparent via `--button-border-color` |
| Hover bg | `#f0f0f0` via `--button-hover-bg-color` |
| Border radius | `3px` via `--button-border-radius` |
| Horizontal padding | `12px` via `--button-padding-x` |
| Content gap | `5px` via `--button-content-gap` |
| Left margin | `12px` (standard Coherence button spacing) |
| Icon | `CuiIcon` with `name="copilot"` in `slot="start"` |
| Label | `"Copilot"` (visible text) |

### Do

- Place in `slot="search"` so it centers with the search box
- Use `size="medium"` to match the search input height
- Use CSS custom properties (`--button-*`) for styling — no `::part` hacks or `!important`
- Keep 12px margin-left gap from the search box

### Don't

- Don't put in `overflow-actions` (it gets grouped with the right-side icon buttons)
- Don't use `size="large"` or `size="small"` — it won't match the search box height
- Don't use `appearance="outline"` — use default appearance with `--button-bg-color: #ffffff`
- Don't add a second Copilot button elsewhere in the header
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
import CopilotButton from '../experiments/copilot-button';

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
      <CopilotButton slot="search" />

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
- **Copilot button** lives in `slot="search"` next to the search box — uses `CopilotButton` component with 12px left margin, `size="medium"`, white background, 3px border-radius. See "Copilot Button" section above.
- Five global action buttons in `overflow-actions` match the real Azure portal (Cloud Shell, Notifications, Settings, Help + support, Feedback).
- Each icon-only button uses `aria-label` on the button for accessibility — no visible text labels.
- Standard Coherence button spacing: **12px** between horizontally adjacent buttons.
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
