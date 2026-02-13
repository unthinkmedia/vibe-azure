# Data Visualization

**Category:** guides  
**Source:** https://coherence-ftekb0dcfpcjb3gv.b02.azurefd.net/resources/data-visualization/

Data visualization
Data visualizations compare data sets in the form of graphics. Displaying information in this way can help viewers better understand data at a glance. Follow the Fluent style and best practices to ensure the data is displayed in an accurate and understandable manner.


Fluent 2 data visualization templates are in production and will be provided here when ready. In the meantime, follow this guide to learn how to pick and display the best visualization for your data set.
Alternate names:
charts
infographics
Standards
You must meet the following requirements when using this component.
General requirements
Follows data formatting guidelines from the writing for UI article.
Communicates information in the title that isn’t clear from the key or visualization.
Clearly displays unobstructed values of chart numbers.
Uses 10 or fewer words for key labels.
Accessibility requirements
All elements meet the WCAG AA standards of minimum contrast ratios for text and visual elements.
Adjacent colors need to have a minimum contrast ratio of 3:1.
Status isn’t conveyed with color alone.
A text alternative description that is available for everyone is provided if a chart or graph is overly complex or uses uncommon abbreviations.
Library recommendations
Fluent 1
Microsoft has provided many chart options for Fluent UI version 8. Check out the Fluent UI v8 chart collection which includes over a dozen types of charts, and is recommended for anyone using Fluent 1.
Fluent 2
Fluent 2 charts are under development. For Fluent 2 color libraries, go to the Fluent data visualization color library in Figma.
Third-party apps
Some designers have had success using third-party chart libraries. If your project requires a charting solution outside of React, consider the following options. Please note that Coherence cannot provide troubleshooting support for third-party libraries.


Apache eCharts
eCharts is a third-party library known for it’s flexibility. It is open source, using an Apache license.
Go to eCharts


Highcharts
Highcharts is a third-party library with a lot of customization. It requires a perpetual or annual license.
Go to Highcharts
Anatomy
The most common data visualizations take the form of charts. Despite the variety of chart types available, the following elements are found in most charts and should be used consistently.
Chart title
Use concise wording that clearly describes what data is presented on the chart. For charts with only one category, the chart title needs to refer to that category. 
Card menu (optional)
For charts displayed in cards, the options menu allows functions such as resizing, bookmarking, or changing settings. As cards are meant to show highlights of information, keep functionality simple and limited.
X-axis and y-axis
Axes provide context and anchor points to interpret data presented on charts. Numerical data should always start at zero to avoid any distortion. Generally values from axes x and y can be swapped but certain types of data such as time is always located on the x-axis.


The density should be appropriate for the size and detail of chart visualization, with consistent increments. 
Chart frame
Use appropriate guideline density on one axis only (typically y-axis).
Threshold line (optional)
This visual aid establishes the relationship of the data to a key point. Implement it only when helpful and relevant.
Data label
A data label is often inside of a tooltip. When hovering over a data point (or press-and-holding on touch devices) the data label appears with additional information. 
Key
The key (also known as a legend) explains what the colors, shapes, and patterns used in the chart represent. An effective key is succinct, clear, and avoids acronyms. Order key categories in reading order as they appear. A key is not needed if the chart only presents one category.
Time stamp (optional)
A time stamp is helpful when the cards update at irregular times or different intervals. Include a time stamp only if it provides value.
Filtering (optional)
Tag filtering is recommended for simple, one-category filtering. Dropdown filtering is recommended for more complex filtering. Use sparingly because the filtering in a card should never be too complex. 
Color
Color guidelines for charts are under development. Get the latest emerging color guidance in the Fluent data viz color library on Figma.
Chart types
Area charts
Used to visualize data sets over a period of time to show trends and compare parts to whole.
Bar charts
Used mainly for comparisons of one or more data sets. They could present data over time or in relationship to a whole.
Stacked bar charts
Used to show comparisons between categories of data, with the ability to break down and compare parts of a whole. Each bar in the chart represents a whole. Segments in the bar represent different parts or categories of that whole.
Donut charts
Used to show proportion, which expresses a partial value in comparison to a total value.
Gauge charts
A radial gauge chart uses a circular arc to show how a single value progresses toward a goal or a key performance indicator (KPI). The shading and gauge line (or needle) represent the current progress towards the goal or target value.
Heat map charts
A heatmap is a 2D visualization that uses color to represent magnitude or intensity of values in the dataset.
Line charts
Also known as line graphs, these are used to visualize datasets over a period of time to show trends and compare different datasets.
Pie charts
A pie chart is a circular visual representation used to illustrate the composition or distribution of a single data set. It divides the whole data into segments, resembling slices of a pie, where each slice represents a distinct category or component. The size of each slice is directly proportional to the quantity it represents within the entire dataset.
Sankey charts
A Sankey chart visualizes a flow from one entity to another. Its goal is to clearly show the path of a depicted property.
Scatter plots
Used to show pairs of values that illustrate relationships between two variables.
Sparkline chart
A sparkline is a very small area chart without axes or coordinates. It is useful for quick and high-level evaluation of trends.
Tree chart
Also known as org chart, a tree diagram is used to represent hierarchy in a tree-like structure. A tree chart starts with a parent node. Edges, or lines, connect to nodes to represent the relationship between them. Finally, leaf nodes are members that have no child nodes.
How to choose a chart
In order to choose the right chart, a designer must understand the function and insight the data represents. There are four common chart functions, and the best visualization depends on the data within those functions.


Follow a system of questions to guide you to the component you need using the decision tree in Figma.
Trends
Trend charts show data over a period of time. 
Recommended: Line, area, and bar charts.
Comparisons
Charts that compare data between a set of categories.
Recommended: Line and bar charts.
Compositions
Also known as part-in-whole, these charts show how partial elements add up to a total. Recommended: Donut, area, and bar charts.
Correlations
Charts that show correlation between two or more variables.
Recommended: Scatter plots and column-and-line charts.
Behavior
Adapting charts to small devices
A stretch grid is recommended for responsive cards. When scaling down the chart, apply the following behavior in this order:
Chart width scales down proportionally.
Density of the values is reduced as needed.
Categories fall into an overflow as needed.
Truncated chart
On a truncated chart, people can swipe left or right to reveal more of the chart.
Scaled down chart
When scaling down, scale the width of the bars proportionately.
KPI values
Keep KPIs as is, and only reduce the chart area. This is because reducing size of the KPI area would result in values being cut off.
Truncated key
When reducing the number of values in the key, include a view more/less mechanism for expanding/truncating the key. 
Best practices
Don’t present redundant information. Use the title to communicate information that isn’t clear from the key or visualization.
Don’t make the bars in a bar chart wider just because there is space. 
Chart titles are always above the chart. Don’t put titles inside donut charts.
Donut charts must have between two to six parts.
Charts with missing or incomplete data
Missing data points
Communicate missing data by placing a no-data pattern over the range of absent data points. For screen readers this pattern is decorative.
Missing category
If an entire category of data is missing, include it in the key and make it clear there is no data for that category.
Irregular intervals
Irregular intervals can be expressed via the density of labels on the x-axis. 
Irrelevant data in a donut chart
For donut charts, use neutral background grey if omitted data is irrelevant and don’t call it out in the key. Consider using a bar chart instead.
Missing information in a donut chart
Use a neutral foreground grey color that meets accessibility contrast ratios when missing data conveys information. For example, data that is still being collected.
Accessibility
Every component meets the Microsoft Accessibility Standards (MAS) requirements, which includes headings, keyboard navigation (focus order), screen readers (labels), color contrast, and more. Using our components and following the design standards will get you most of the way to an accessible experience that meets grade C.


To get you the rest of the way to grade C, you’ll need to ensure that experiences composed of multiple components are accessible. We recommend running Accessibility Insight's FastPass tool and manually testing your scenarios end to end with a keyboard and screen reader. 
Keyboarding
Screen reader
Demo video of audio announcements in High Charts of a line chart.
Watch video on Youtube
Screen reader labels
Name: [card name] menu, Role: button
Name: chart legend, Role: button, Value: category [1]
Name: chart description, Role: interactive chart
Name: April with total of $40k, Role: image, Value: Category 1 3k, Category 2 10k, Category 3 12k, Hint: One of 7 bars
Name: May with total of $35k, Role: image, Value: Category 1 3k, Category 2 10k, Category 3 12k, Hint: Two of seven bars
Name: June with total of $12k, Role: image, Value: Category 1 3k, Category 2 10k, Category 3 12k, Hint: Three of seven bars
Contrast ratio alternatives
If for any reason it’s not possible to maintain the 3:1 color ratio for adjacent colors, separate color blocks with a white line, or use elements other than color.
Use white line (one pixel minimum) to separate colors. Use appropriate labels to avoid confusion.
Use labels to show values so users don’t have to rely on a color key, or introduce shapes along with color.
Avoid embedding static images of charts or graphs
Static images of charts such as screenshots cannot be customized based to the person’s needs (such as high contrast mode) and will become blurry when magnified. Instead, use responsive chart components.
Incorrect
Charts embedded as images don’t change based on personalization such as high contrast. 
Provide feedback

Reach out to us if you spot a bug or have a feature request. Your feedback is critical to the success of Coherence and everyone who uses it.

Contact us on Teams
Jump links
Standards
General requirements
Accessibility requirements
Library recommendations
Fluent 1
Fluent 2
Third-party apps
Anatomy
Color
Chart types
How to choose a chart
Behavior
Adapting charts to small devices
Best practices
Charts with missing or incomplete data
Accessibility
Keyboarding
Screen reader
Contrast ratio alternatives
Avoid embedding static images of charts or graphs
Provide feedback