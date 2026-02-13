# AI Entry Points

**Category:** guides  
**Source:** https://coherence-ftekb0dcfpcjb3gv.b02.azurefd.net/resources/ai-entry-points/

Entry points
An AI entry point refers to any UI on a page that is used to initiate interactions with the AI chat. The entry points can range from a basic button with simple premade prompts, to a card with an input allowing people to write custom prompts inline. This article will go over various types of entry points and when and how to use them.
Alternate names:
AI chat launch points
inline AI access
initiate AI chat
ask AI
Standards
You must meet the following requirements when using these templates.
General requirements
AI entry points are placed near the specific actions or content they support.
No more than three AI entry points are used on a single page, including in the header.
AI entry points support or simplify the relevant user tasks. 
AI entry points aren't used solely to draw attention to AI.
A generic AI assistant is represented by the sparkle icon.
Accessibility requirements
Include a title to label and provide context for the groups of UI elements, like a group of suggestions.
Anatomy
There are five types of entry points for accessing AI services. Use no more than three entry points on a single page, including header.
Header button
The header button is the only entry point that's available from anywhere in an app. The button is a basic trigger that opens the AI chat. It’s placed within the header component.
Button
A button is used in conjunction with a specific component or group of UI elements. It hosts a single action that will immediately prompt the AI chat based on the content it’s associated with. 


The button itself can be icon-only with a tooltip conveying the action, or include text.


This type is best used when:
People expect the AI to understand highly specific content on the page.
A single action related to AI is repeatedly used and valuable to the user.
Space is constrained.
Menu button
Like the basic button, the menu button as an entry point is used in conjunction with a specific component or group of UI elements. The button directly ties the action to the content. Selecting any prompt from the menu will open the AI chat and immediately send the prompt.


The button itself can be icon-only or include text (such as "Ask AI Assistant"), and upon interaction, the menu that opens can host a variety of prewritten prompts. People are not able to customize prompts without first opening the AI chat.


This type is best used when:
People expect the AI to understand specific content on the page. 
Many prompts need to be surfaced.
Space is constrained.
Step 1
Upon interacting with the menu button, a menu appears. Each menu item has grouped options, such as summarize, create, and ask.


This example also includes an option to view more prompts, which would open the AI chat directly.
Step 2
Once a menu item is selected, it navigates to a nested menu. The nested menu includes prompts relevant to the initial selection. 


In this example, ask was selected, and the menu prompts include prewritten questions to send to the AI chat.
Inline suggestions
A series of suggestions with prewritten prompts can be used with an associated title and placed anywhere on a page. Because it has a title grouping the suggestions, it doesn't need to be used in conjunction with any specific UI. The title adds key context to help people understand the value of using AI in each scenario. 


Like the menu button, people are not able to customize prompts without first opening the AI chat. Selecting any suggestion will open the AI chat and immediately send the prompt.


This type is best used when:
Responses might be less focused on specific page content.
Only a few targeted prompts are surfaced.
Space is constrained.
Prompt cards
A series of cards, grouped with a title, with prewritten prompts in a chat input can be placed anywhere on a page. If using a chat input, people can also change the prompt before sending it to the AI chat, or they can write their own without needing to open the AI chat first. Pressing send immediately opens the AI chat and sends the prompt.


Like inline suggestions, because it has a title grouping the cards, it doesn't need to be used in conjunction with any specific UI. 


This type is best used when:
Responses might be less focused on specific page content.
Only a few targeted prompts are highlighted.
Users may prefer writing their own prompts.
AI interaction is a key priority in an app and space isn't a constraint.
Prompt cards with prewritten prompts
Prompt cards can include prewritten prompts that people can send immediately, or edit before sending.
Prompt card with no written input
A single prompt card can have an input without a prewritten prompt, allowing people to write an entirely custom prompt without having to open the AI chat first.
Layout
Placement inline on a page
When using an AI entry point inline on a page, its main purposes are to:
Showcase skills AI can support that apply to specific content.
Support persistent tasks that relate to the entire surface.
Support dynamic, LLM generated prompt suggestions.
In this example, the menu button is used in conjunction with a content block displaying recommended Azure services. The button can contain prompts or suggestions specific to the Azure services being displayed, or more generally about Azure services.
Placement in a component
When using an AI entry point in a specific component, its main purposes are to:
Showcase skills AI can perform that apply to a highly specific component or block of information.
Only support persistent tasks that relate to the given component.
In this example, a toolbar includes an action specific to Copilot. A data grid contains various pieces of content, and the user has selected two. The AI action is to “Compare with Copilot,” and the subsequent output will be specific to the user’s selection and the specific prompt.
Provide feedback

Reach out to us if you spot a bug or have a feature request. Your feedback is critical to the success of Coherence and everyone who uses it.

Contact us on Teams
Jump links
Standards
General requirements
Accessibility requirements
Anatomy
Header button
Button
Menu button
Inline suggestions
Prompt cards
Layout
Placement inline on a page
Placement in a component
Provide feedback