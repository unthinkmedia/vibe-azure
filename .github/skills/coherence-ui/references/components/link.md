# Link

**Tag:** `cui-link`  
**Since:** 1.0.0  
**Status:** Preview  
**Category:** components  
**Source:** https://coherence-ftekb0dcfpcjb3gv.b02.azurefd.net/resources/link/

## Import

```js
import '@charm-ux/cui/dist/components/link/index.js'
```

## Guidance

A link is interactive text that lets people navigate somewhere else, either within an experience or to a different app or site.

Don't use links for triggering actions other than navigation. To create a secondary action with low visual emphasis, render a button to appear as a link with subtle styling applied.

> Go to link in the toolkit
**Alternate names:**
hyperlink
subtle button

### Standards

You must meet the following requirements when using this component.

#### General requirements

Used for navigation between pages or applications. Is not used to trigger actions.
Displayed with hyperlink defined colors.
Underlined when used in body text.

#### Accessibility requirements

Uses descriptive text, which clearly conveys the destination of the link.
Has two or more visual indications that they are interactive.
Link text is short and descriptive.

### Anatomy

Out of the box, links can have the default, subtle, or overbrand styling. Across these styles, links can have icons and/or inline behavior, which underlines a link at rest.

By default, all links show an underline in the hover, focus, and pressed states.
Inline links are the most accessible, and should be used over standalone links as much as possible.
Types
Default
Default links are styled with the theme color. These are the most accessible link style and should be used most of the time.
Subtle
Subtle links are the same color as body copy and are much less accessible than default links. Use subtle links along with other cues to show that they’re selectable, like an icon and/or underline.
Inline
Inline links include an underline in the rest and visited states. Use the inline behavior to maximize visual cues that a link is present and interactive, especially if it appears next to other body text.
Standalone
Standalone links are usually used in navigation components such as drawers and footers. Separate standalone links from body text. By default, all links show an underline in the hover, focus, and pressed states.

### Best practices

Use links to navigate
Links navigate people between pages or applications. They do not trigger actions. If an action button is needed with lightweight UI, style a subtle button instead.
Correct
In this example, a link is used to correctly navigate someone to a subscription management page.
Incorrect
Avoid using links to perform actions such as unsubscribing from a newsletter.
Correct
A subtle button can be used instead of a link to perform an action such as unsubscribing from a newsletter.
Use subtle links with caution
In most cases, the default link type is the best option for ensuring people can easily scan and recognize links within an interface.

Use subtle links with caution. Out of the box, they don’t have any visual indications that they’re interactive. Unless someone hovers or focuses on subtle links, they might miss them.
Incorrect
Subtle links don’t indicate interaction until hover or focus and are not accessible unless other indicators are used.
Use caution
In rare cases, standalone subtle links can be used in parts of the UI dedicated to navigation, like footers. These are common UI patterns where links are expected.
Provide visual cues with icons
Using icons in addition to link text can give people hints about what will happen if they select a link, like the open icon signifying an external link destination. Icons, like a chevron pointing right, can also provide additional visual cues that a link is selectable if the inline treatment isn’t used.

The coded link component doesn’t include an icon slot by default. To include an icon in your link, place an <i> or <span> as a child of the <Link> component.
Adding the open icon to the end of the text signifies that the link navigates to an external page.
Adding a chevron to a link signifies that the text is interactive.
Space links out
Keep discrete links far enough apart that people can tell they lead to different places. Spacing out links also helps people with reduced motor skills select the right one easily.
Incorrect
Links that are too close together can be hard to distinguish and select.
Correct
Allow plenty of space between links so they are easy to understand and interact with.
Avoid multiple identical links
Multiple access points to the same destination from one page can cause confusion, especially if the link text is different. Similarly, avoid creating different link destinations with the identical link text.
Incorrect
In this example, all links lead to the same destination even though the descriptions are different. Destinations all leading to the same place causes confusion and frustration.
Correct
Write your body text to provide one link per destination.

### Content

Make it short, descriptive, and actionable
People should be able to accurately predict the purpose of a link based on its link text. Don’t use URLs or generic text like “click here” to label links.

Avoid using “learn more” or “get more info” links without specifying what someone will learn more about. Consider dropping the word “more” in cases where you need to save space.
Correct
The following examples are of well written link text.
To learn more about writing content, go to the Microsoft Writing Style Guide.
Don’t use end punctuation in headlines. Learn about punctuation use at Microsoft
Get more info about bias-free communication
Incorrect
The following examples are of poorly written link text that is unclear or vague.
To learn more about writing content, click here.
Don’t use end punctuation in headlines. Learn more.
Get more info about bias-free communication: https://learn.microsoft.com/en-us/style-guide/bias-free-communication
Writing guidelines
Link text should be short and specific.
When linking to a document, the link text should describe the content or align with the document title. For example, Copilot research readout.
Use sentence style capitalization—only capitalize the first word. For more info, go to Capitalization in the Microsoft Writing Style Guide.
If linking within a body of text, don’t include punctuation in the link. 
Don’t punctuate standalone links, even if they’re full sentences. 

### Accessibility

Use multiple visual cues
To be accessible, links must have at least two visual indications that they’re interactive. Be sure to use a combination of cues like color, underline, icons, focus, and cursor change to let people know they can select a link. Use underlined links where applicable to meet Grade B accessibility standards.
Write for assistive technology
People who use assistive technology can navigate by accessing a list of all links on a page, so link text must make sense when taken out of context. Be careful when embedding links in sentences since sentence parts read in isolation can be confusing. Additionally, links within sentences may be harder to localize since sentence structures vary across languages.

If you can’t avoid vague link text in the UI, be sure to include a more descriptive aria-label that identifies the link’s destination.

Steer clear of multiple identical links on a page. They can create ambiguity for everyone and complicate navigation for some people, like those who use voice control.
Indicate when navigating to new contexts
Use caution when using a link to navigate to a new context as it can be disorienting. If a link opens in a new tab or window, be sure to inform people beforehand. Add a visual cue, like the open icon, and an aria-label indicating the link goes to a new tab or window.
