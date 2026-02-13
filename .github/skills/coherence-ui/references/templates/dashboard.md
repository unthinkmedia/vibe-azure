# Dashboard

**Tag:** `cui-dashboard`  
**Category:** templates  
**Source:** https://coherence-ftekb0dcfpcjb3gv.b02.azurefd.net/resources/dashboard/

> A dashboard is a page layout that curates the most valuable information from across an app inside of cards. It surfaces actionable insights or content based on people’s needs.

## Guidance

### Standards

- You must meet the following requirements when using this component.

### Cards

Dashboards are made up of a group of cards. They might vary in content types and size, but at a baseline, every dashboard is formed using cards. 


Check out the guidance for cards

### Rows

The simplest way to structure a dashboard is by using rows of cards of all the same height. Card width and height between rows can vary, but when they all are the same height in a row, the reading order is predictable and straightforward. This type of layout is best for dashboards with highly consistent content patterns within cards.


When all cards in a row follow the same exact layout, the row can also make use of a carousel. This allows a single row to highlight several more cards than the amount that fit within the screen’s visible footprint.

### Stacking in a row

- This type of layout is more visually complex and works best for dashboards with cards that have more content and size variability. This comes at the expense of comprehension. The more complicated the layout and the content is, the harder it is to digest the available information.

### Establishing row height

The largest card or the card with the most content in a row can be used to determine the heights of all cards in a row. The cards with less content can stretch to fit the height of the largest card, leaving white space between the header or preview slots and the footer slot.


The same applies for cards with mixed heights: two stacked cards might fit in the same footprint as one large card in the same row. If the stacked cards together are larger in height than one large card, the stacked cards set the height for the row and the large card’s white space grows to span the same height.

### Establishing card width

- Card widths align to the page’s underlying grid. This ensures that each card reflows properly when the screen size changes. The default grid is 12 columns at a 1920-pixel screen width. The most common card widths are 3, 4, and 6-column wide cards.

### Sections and categorizing cards

In some cases, patterns emerge in dashboards where there are multiple cards with similar content and layouts. Those cards can be grouped into sections using a header on the surface of the page.


Always create sections from the top to the bottom of the page. Variations in screen size and the use of vertical surfaces, such as a drawer (previously panel), can cause unexpected changes to the page’s reading order.

### Responsive behavior

- Cards in a dashboard reflow first from left to right, then from top to bottom. As screen size reduces and the page rearranges itself, the card order still mirrors the original organization structure. The most important information appears at the top of the page.

### Use goal-oriented content

The overall hierarchy of your dashboard design can be defined by the goals of your audience. For example, if you know people typically complete three main tasks upon opening your app, you can surface three cards at the top of your dashboard. You can extend this framework to the content in the cards themselves. If you know what information they need to be able to confidently complete those three main tasks, put that information in the cards.


This method of building a dashboard layout requires flexibility. Not every piece of data available in the app is going to be relevant for someone to complete their top three goals. That may mean hiding data that could be useful in other scenarios for the sake of prioritizing task completion.

### Serve up information based on need

- There might be several groups who have different goals in mind when using the same app. Tailor the dashboard content and layout hierarchy to surface whatever information is relevant to the specific needs. Information that’s important to a designer might be irrelevant to a developer for instance, and vice versa.

### Display up to 12 total cards

Too many cards on a page reduces people’s overall comprehension of the information. The more information that’s presented, the less likely it is that they’re able to digest it quickly and act on it. To ensure the dashboard stays actionable, limit the total number of cards based on what’s most important.


The exceptions to this rule are search results pages or browsing experiences. In these experiences, each card has the same layout and people intentionally scan the entire contents of the page to find something specific. In this scenario, make all relevant cards available.

### Tab stops

- A card is its own tab stop. If the card has interactive elements within it, tabbing again moves focus to the next interactive element.

### Provide feedback

- Reach out to us if you spot a bug or have a feature request. Your feedback is critical to the success of Coherence and everyone who uses it.
- Contact us on Teams
