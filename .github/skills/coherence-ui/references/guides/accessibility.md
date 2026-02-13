# Accessibility

**Category:** guides  
**Source:** https://coherence-ftekb0dcfpcjb3gv.b02.azurefd.net/resources/accessibility/

Accessibility
Accessibility refers to the design of products and experiences for people of different backgrounds, perspectives, and abilities. As product makers, we have a significant role in creating products that meet people's unique needs.


The Microsoft Accessibility Standard (MAS) specifies the baseline requirements products at Microsoft must meet for accessibility compliance. All our components meet the MAS requirements by default. They include defined headings, tab stops for keyboard navigation, screen reader labels, and appropriate color contrast. 


By using the design system components and adhering to the standards listed below and on each component's page, you can ensure your app is largely compliant with MAS grade C requirements.


Learn more about accessibility in C+AI
Building inclusive experiences
When building an app, it's crucial to identify potential barriers to accessing its content, and how we can leverage assistive tools to remove those barriers.


Six main human functions can influence app interaction: 
Cognition (information processing)
Mobility (physical movement)
Vision
Hearing
Verbal and nonverbal communication (such as sign language)
Perception (detecting and understanding sensations like touch) 


Any condition, temporary or permanent, that impairs these functions can significantly impact how someone uses an app. For example, permanent vision loss can make screens nearly unusable, while a temporary condition like a broken hand might necessitate alternative input methods. 


The recommendations below explain how we can design apps for various assistive tools to ensure accessibility for all.
Screen readers and keyboards
People using screen readers access content through hearing, and may also navigate an app through touch, using a keyboard. Screen readers convert text into audible speech and braille output, while people use keyboards commands and shortcuts to navigate across an app (an alternative to mouse-based input). Together, these tools accommodate a range of people: those with vision loss, impairments to their mobility, or those who prefer alternative input methods.


Here are some ways you can ensure your app is appropriately designed for screen readers and keyboards. Note that all our components have ARIA labels, tab stops, and keyboard shortcuts built in unless otherwise specified.
Assign headings and landmarks (ARIA labels) to create hierarchy that can be conveyed via the screen reader.
Write text that conveys all information without needing associated visual content.
Add alternative text (alt text) to all visual content. If the visual is not essential, assign the alt text as decorative.
Assign a tab stop to every interactive element.
Provide keyboard shortcuts that let people easily skim through content, such as skip to main.
Announcements are added to any data loading states to communicate progress through to completion.
Responsive behavior and zoom
Designing responsive layouts is crucial not only for adapting to different screen sizes, but also for accommodating those who either require or opt for larger text and image display.


An effective responsive layout accommodates screen sizes from 1920 pixels (desktop) down to 320 pixels (mobile). Designing to the smallest scale also ensures that your app can be viewed at up to a 400% zoom level when viewed on screens of 1280 pixels wide and larger.


To meet these requirements, the following design system components can be used together to create a foundational, responsive layout:
App frame
A component designed to provide a responsive framework for all app content hosted within the browser window. 


Go to app frame guidance
Content frame
A component designed to provide a responsive framework for app content hosted within the app frame. It contains the bulk of the app's content and hosts any custom layouts.


Go to content frame guidance
Grid
An underlying structure that guides the placement of all elements on a page to help form a logical and organized layout.


Grid guidance is coming soon.
Visual styles and images
For people with varying amounts of functioning vision, visual styles—like color—may not always be obvious. By default, design system components and styles are designed to meet basic requirements for color contrast and text legibility, but there are additional steps you can take to ensure that this is true across your app.
Pair imagery like colored icons with text to convey the full meaning without relying solely on visual cues. 
Provide informative and concise alt text to images. If the image doesn't convey additional information, mark the image as decorative.
Give the option to disable any motion, such as on auto-playing videos or repeating GIFs.
Include captions in any video where sound is essential to the message.
Include an audio-described track for videos where the imagery is essential to the message.
Provide text-based summaries of complex visualizations like charts or graphs. This can be achieved through alt text or by restructuring the content in tables.
Animation and motion
Motion can take many forms in apps, such as loading patterns, responsive feedback, or animated GIFs and video. Animation can enhance the user experience, but when used incorrectly can cause accessibility issues. People with vestibular disorders can be plagued with dizziness, vertigo, or nausea based on UI motion. To meet basic accessibility requirements, adhere to the following guides.
Limit motion design to take up less than one-third of a viewport.
Avoid auto-play and instead allow people to control of when content plays.
Allow content that moves, scrolls, or blinks automatically to be paused, stopped, or hidden.
Use subtle motion or none at all for repetitive tasks.
Creating design specs
A design spec details exactly what interactions, components, styles, and more a product must implement when moving from design to build. Interactions designed for assistive tools are represented in design specs in four markup types: focus order (also referred to as tab stops and keyboarding), labels, landmarks, and headings.


The Fluent Accessible Design Toolkit provides a set of annotation components that you can use when creating your design spec. The A11y - Focus order plugin in Figma is also available to use and automatically applies the focus order annotations over your design. Be sure to review the output as it’s not always 100% accurate.
Focus order
Focus order refers to the sequence in which a screen reader announces content on the page, based on selection via keyboarding. 


In a design spec, the focus order is shown by numbering each interactive element and outlining any shortcuts, such as when someone can use the arrow keys to quickly move between groups of interactive elements. Any non-interactive elements are automatically read by a screen reader and don't need to receive focus.
Labels
Labels provide semantic information on interactive elements and are read by the screen reader when the element receives focus. On-screen changes, notifications, and any urgent alerts can be described by announcements. Announcements are read by the screen reader regardless of focus position, so use them sparingly to avoid interrupting the workflow.


In a design spec, labels are shown in a list alongside the associated tab stop. Every interactive element on a page must be labeled with a name, role, and state. 


For example, a button that says Save would have the following labels:
Name: Save 
Role: Button 
State: Enabled
Landmarks
Landmarks are used to describe a page's overall structure semantically. They describe significant areas of a page and the interactions they provide. In a design spec, landmarks are marked by rectangular outlines over an area with the name of the landmark provided.


Common landmarks include:
Banner: Used for site-oriented content at the beginning of each page, such as a header.
Navigation: Used for a set of links that move people through an app.
Main: Used for the primary content of the page. All app pages use a main landmark.
Complementary: Used for supporting or secondary content.
Content info: Used to identify common information at the end of each page, such as a footer.
Search: Used when multiple interactive elements together create complex search functionality.
Form: Used for a group of components that require custom input or selection.
Region: Used for any other groups of content. Regions include a label to help describe the content and can be nested within main or complementary landmarks.
Headings
Headings convey information hierarchy, with the most important and broadest content labeled as h1, decreasing in priority and specificity down to h6. Only one h1 tag is used on a page, and no heading level is skipped.
In a design spec, headings are denoted through a visual label on any plain text at a heading level. 
Writing alt text
Alt text is provided to describe any non-text content, like images, graphs, and videos. This text is read out by screen readers and is shown when the visual content fails to load. Visual content and alt text can be used to aid comprehension, but the bulk of the information should be communicated through text-based content.


All visual content requires alt text, even when the image doesn't convey any additional information. If an image doesn’t help people understand the full context of the information, mark it as decorative. This denotes to the screen reader that the content can be skipped.


Here are some tips to keep in mind when writing alt text.
Be concise and informative. Aim to keep alt text below 150 characters.
Skip terms like image of or video of in alt text. Screen readers automatically read image of... before any visual content.
Don't add more details about image type (photograph, illustration, etc.) unless the context may influence how someone understands the information.
Review and edit automatic alt text to ensure it conveys the appropriate information based on the context it's read in. 
Don't repeat text-based content in the alt text. Instead, use the text to convey the information and mark the image as decorative.
Provide feedback

Reach out to us if you spot a bug or have a feature request. Your feedback is critical to the success of Coherence and everyone who uses it.

Contact us on Teams
Jump links
Building inclusive experiences
Screen readers and keyboards
Responsive behavior and zoom
Visual styles and images
Animation and motion
Creating design specs
Focus order
Labels
Landmarks
Headings
Writing alt text
Provide feedback