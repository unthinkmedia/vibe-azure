# Settings

**Tag:** `cui-settings`  
**Category:** templates  
**Source:** https://coherence-ftekb0dcfpcjb3gv.b02.azurefd.net/resources/settings/

> Settings is a pattern that provides people with access to a set of adjustments that can be made to an app. Examples of common app settings include display settings (i.e. toggle between light or dark mode, change the display language), notification settings (i.e., allow notifications, adjust notification frequency), or profile settings (i.e. change contact email, upload profile picture).

## Guidance

### Standards

- You must meet the following requirements when using this component.

### Components for simple settings

- Radio: use for a small group of options where only one can be selected (i.e. dark mode vs. light mode).
- Checkbox: use for a group of options where multiple can be selected (i.e. send notifications for comments, direct tags, or others).
- Switch: use when two opposing options can be switched on or off (i.e. notifications on or off).
- Slider: use when any value can be selected within a defined range and doesn't need to be precise (i.e., volume).
- Dropdown: use in a large group of options where only one can be selected (i.e., display language)
- Spin button: use when any value can be selected within a defined range and needs to be precise (i.e., font size).

### Components for complex settings

- All the components listed for simple settings.
- Input: use when simple, short-form custom input is required (i.e., email address).
- Text area: use when custom input is required and may involve multiple sentences (i.e., "About" section on their profile)

### Settings without save

- Settings that are adjusted via simple components, such as a radio button or checkbox, can be immediately implemented without requiring people to save. This is because the components because the components leave little chance for error, and in the case of an incorrect selection, the decision can easily be corrected. As such, the simple settings drawer doesn't need a footer with a save or apply changes CTA.

### Settings that need to be saved

Settings that are adjusted via complex settings require people to save their changes for them to be implemented. This is because the inputs in these components can vary significantly, and as such, there's a higher risk of losing data.


These settings always appear as read-only by default. Place a link next to any individual field that requires editing, and place a button above a group of fields that require editing. People can then edit these fields by clicking the button or link, which will navigate to the level two (L2) drawer that contains the editable fields. A footer with a save or apply changes CTA is available on the L2 page, and upon saving their changes, the drawer returns to the original settings page.

### Editing mixed settings

- In some cases, simple components and complex components are needed within the same area, meaning that some adjust immediately and others and others need a separate edit interaction. In those cases, group the settings as best as possible and use a button to initiate the adjustment flow for all types of settings.

### Editing one field vs. multiple fields

- When there is only one editable field in a group of settings, use a link directly next to the content that enables editing. When there are multiple editable fields, use a button inline with the group header that enables editing. Both of these will function in the same way, where clicking the link or button navigates to the drawer's L2 page hosting the editable fields.

### Categorizing settings

- Use the tab list to categorize broad groups of settings, such as app-related settings vs. user-related settings.

### Microsoft-connected accounts

- When an app-specific account is also connected to a Microsoft account, make both the app-specific settings and Microsoft-specific settings available as two separate links in the profile. Be sure to label each link with the associated account, such as, View Microsoft profile with an external link icon, and View [app name] profile.

### Accessibility

Every component meets the Microsoft Accessibility Standards (MAS) requirements, which includes headings, keyboard navigation (focus order), screen readers (labels), color contrast, and more. Using our components and following the design standards will get you most of the way to an accessible experience that meets grade C.


To get you the rest of the way to grade C, you’ll need to ensure that experiences composed of multiple components are accessible. We recommend running Accessibility Insight's FastPass tool and manually testing your scenarios end to end with a keyboard and screen reader.

### Provide feedback

- Reach out to us if you spot a bug or have a feature request. Your feedback is critical to the success of Coherence and everyone who uses it.
- Contact us on Teams
