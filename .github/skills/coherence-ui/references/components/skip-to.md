# Skip To

**Tag:** `cui-skip-to`  
**Since:** 1.0.0  
**Status:** Preview  
**Category:** components  
**Source:** https://coherence-ftekb0dcfpcjb3gv.b02.azurefd.net/resources/skip-to/

## Import

```js
import '@charm-ux/cui/dist/components/skip-to/index.js'
```

## Guidance

Skip-to is a functional tab stop that’s placed first in the focus order on any page. It allows people who use keyboard navigation to jump between regions of the page defined by landmarks. It’s a fundamental component for creating an accessible app.

To learn more about landmarks and accessibility best practices, go to our accessibility guidance.

Skip-to is only visible as a link when in keyboard focus, so there's no Figma toolkit component.
**Alternate names:**
landmark navigation
content skip

### Standards

You must meet the following requirements when using this component.

#### General requirements

Landmarks are ordered logically in the tab order based on what people are most likely to want to access first.

#### Accessibility requirements

Skip-to is the first tab stop on every page.
A skip-to is used if there are many tab stops prior to the main content.
Every page has at least one region outside of the header (banner landmark) that can be navigated to, like main content.

### Behavior

The purpose of a skip-to link is to make keyboard navigation more efficient. Generally, a single skip-to link is sufficient, although sometimes more can be beneficial for more complex pages.

Once someone selects (presses enter on the keyboard) a skip-to link, the focus moves to the first interactive element in the selected landmark. If someone tabs through all the skip-to without making a selection, focus moves to the first interactive element on the page after the skip-to.

#### Landmarks

Landmarks are used to describe a page's overall structure semantically. They describe significant areas of a page and the interactions they provide. Skip-to references the landmarks to define the available tab stops. There are defined HTML elements that implicitly map to most of the roles listed below.

Common landmarks include:
Banner: used for site-oriented content at the beginning of each page, such as a header.
Navigation: used for a set of links that move people through an app.
Main: used for the primary content of the page. All app pages will use a main landmark.
Complementary: used for supporting or secondary content.
Content info: used to identify common information at the end of each page, such as a footer.
Search: used when multiple interactive elements together create complex search functionality.
Form: used for a group of components that require custom input or selection.
Region: used for any other groups of content. Regions include a label to help describe the content and can be nested within main or complementary landmarks.
