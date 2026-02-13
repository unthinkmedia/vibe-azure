# AI Chat

**Tag:** `cui-ai-chat`  
**Since:** 1.0.0  
**Status:** Preview  
**Category:** components  
**Source:** https://coherence-ftekb0dcfpcjb3gv.b02.azurefd.net/resources/ai-chat/

## Import

```js
import '@charm-ux/cui/dist/components/ai-chat/index.js'
```

## Guidance

### Standards

- You must meet the following requirements when using this component.

### Understanding the hierarchy

The topmost category of the generative AI framework is the product or tool. That’s branded Copilot and its nonbranded version, Assistant. In every instance, branded and nonbranded products are currently implemented as either a sidecar or immersive experience. And nested within both sidecar and immersive is the AI chat component. The AI chat component consists of the chat thread and chat input components including many additional features.


This article focuses on the sidecar experience. And will be expanded in future to include guidance on implementing immersive UI, which uses the full navigable page and dedicates full attention to the AI interfaces.

### Not every AI chat is Copilot

- Fulfills all engineering criteria (see below).
- Is external facing or engages directly with external partners.
- Fails to fulfill all Copilot engineering criteria.
- Is used solely for internal tools and interactions.

### Engineering criteria for AI

- Is this an interactive, chat-based (future: multi-modal including images, speech, etc.), generative AI experience built on a large language model (LLM) or other state-of-the-art foundational model?
- Does this experience respond to natural language to empower people to achieve tasks that would otherwise require substantial cognitive load or creativity, and therefore time? Examples of these tasks include:
Generating content.
Commanding product functionality.
Providing answers and summaries.
Providing suggestions and notifications.
Enhancing collaboration.
- Generating content.
- Commanding product functionality.
- Providing answers and summaries.
- Providing suggestions and notifications.
- Enhancing collaboration.
- Does this experience support extensibility? For example, does it use the plugins standard for interoperability—defined by OpenAI and used by Microsoft Copilot offerings?

### Sidecar anatomy

- In a sidecar experience, AI chat occupies a small, shared space in the UI on the right-hand side of the screen. This allows you to keep focus on the app’s main content without having the chat window get in the way, while also making it readily available.

### Sidecar is part of the app frame

- The app frame hosts the shell UI that consists of the header, header commands and settings, and other optional components such as side nav. Inside of the app frame is the content frame. It hosts an app’s individual content in the content region. For example, the content header, body copy, and form components.

### AI experiences are defined by a foundational set of core components

- It is imperative to incorporate the specified components in every AI experience utilizing the sidecar pattern. This ensures product experiences are consistent and predictable in both appearance and behavior.

### Customization requirements

- While recommended, these features are not mandatory for every AI chat. However, it is required to incorporate the specified components as defined when the need arises.

### Suggestion types

- Make use of a variety of suggestion types to enhance the quality, effectiveness, and efficiency of conversational experiences.

### Curated suggestions

- Curated suggestions (versus AI-generated suggestions) are predefined by product makers to guide people with thoughtfully tailored suggestions for specific situations. They prioritize accuracy and offer a higher degree of control over the conversation path and should be used when precision, consistency, or sensitivity is essential.

### Suggestions in main content region

- Suggestions in the main content region can reveal additional AI capabilities that are related to the surrounding content.

### Illustrates the dialogue

- It encompasses all the conversational aspects that illustrate the back and forth dialogue with the system. The chat thread is an essential part of any AI chat experience, whether sidecar,  immersive, or other AI design apps.

### Chat thread required components

- AI experiences are defined by a foundational set of core components. It is imperative to incorporate the specified components in every AI experience utilizing the chat thread pattern. This ensures product experiences are consistent and predictable in both appearance and behavior.

### Chat thread optional components

- While recommended, these features are not mandatory for every AI chat. However, it is required to incorporate the specified components as defined when the need arises.

### Ensure accurate outputs and smooth conversation

- A follow-up dialog can be used to gather more specific info, provide options, gain clarity, or direct the conversation towards a particular goal. Avoid overwhelming the reader with too many questions at a time. Instead, strike a balance between guiding the conversation and allowing them to take the lead.

### Confirmation for workflows

- Reduce the risk of error during impactful, destructive, and permanent operations by requiring confirmation.

### Confirmation for utilities

- Improve clarity and build trust for select output utilities by providing confirmation.

### Enable new chats

- Allow people to start a new chat especially when a response count is active.

### Formatting options for outputs

- Organize content to show hierarchy, emphasize key points, and support quick understanding at a glance.

### Progressive disclosure for outputs

- Manage complexity by revealing information gradually using progressive disclosure patterns and controls.

### Overall output length

- Create order, reduce scrolling, and provide more context by optimizing output length.

### Design scalable prompt starters

- Ensure prompt starters can scale by using flexible structures, reusable variables, and adaptable phrasing across experiences. Also, refer to the content guidance on how to structure effective prompts and suggestions.

### Writing guidelines

- How to talk about AI in UI

### How AI chat responds

- Voice and tone:

### How to structure prompts and suggestions

- Proactive:

### Keep error messages high level

- Providing specific information about what went wrong—and how to fix it—is a standard design best practice. But divulging too much info can allow bad actors to find and use potential weaknesses in the system, creating a security risk. Responsible AI guidelines require that messaging be generic, actionable, and non-judgmental.

### Follow up with suggestions

- Suggestions offer the next logical steps someone might take, task they might do, or questions they might ask after a response.

### Motion

- Motion design guides people through the interface using movement, making it easier to follow. The following studies showcase how motion design and component state orchestration are applied to AI chat through detailed end-to-end scenarios. Motion design comes pre-built into the AI chat component and its subsequent features.

### Performance challenges

- Slow response times, latency, and scalability issues make it difficult for AI to give quick and accurate information, which can erode trust and lead to a poor experience. To help with these problems, we can use certain design patterns and components in the UI, but they should not be viewed as long-term solutions.

### Standard response times

- Instant acknowledgment: The system should acknowledge or respond to inputs within 100 milliseconds.
- Optimal processing notification: If processing takes longer than expected, AI should indicate it’s working on the request within one second.
- Timely status updates: If processing extends beyond five seconds, provide frequent and clear status updates to inform the person about the ongoing processing.

### Performance driven capabilities

- Summarization: Efficiently condenses long texts or data for quick comprehension.
- Content creation: Generates articles and reports, saving time.
- Information retrieval: Proficiently retrieves and presents relevant data.
- Generate insights: Analyzes data to provide insights and solutions, aiding decision making.
- Task automation: Automates repetitive tasks, enhancing efficiency.
- Translation: Accurately translates text across languages, promoting global communication.

### Guide people to performant scenarios

- Providing an intuitive and clear path to performant scenarios using standard UI helps people navigate and achieve the best outcomes.

### Give alternative approaches for outputs

- These strategies should be used cautiously and as temporary solutions, only when the AI fails to meet urgent needs or effectively resolve critical performance issues.

### Provide feedback

- Reach out to us if you spot a bug or have a feature request. Your feedback is critical to the success of Coherence and everyone who uses it.
- Contact us on Teams

## Code Examples

### Slotting content for specific prompt

Prompt IDs are used to distinguish prompts from each other. They use used to create unique references for things like dynamic slots within each of the prompts. They follow a consistent pattern - inputs from users are input-{input prompt number} and responses are response-{response prompt number}. The current input and prompt numbers can be retrieved from the component using the inputCount and responseCount properties.

```html
const aiChatRef = useRef<cui-ai-chat-element>(null);

    useEffect(() => {
        aiChatRef.current!.addResponse({});
    }, [aiChatRef]);
      <cui-ai-chat
        ref={aiChatRef}
        label="response content example chat window"
      >
        <div slot="response-1-body">
          <p>
            Mona said that Summit Center project is set to start
            pre-construction planning and site preparation for the new arena in
            Atlanta April 2023. The project is set to go into the following
            year.
          </p>

          <p>Summit Center Estimated Timeline:</p>
          <ul>
            <li>April-June: Pre-construction planning and site preparation</li>
            <li>July-September: Construction begins</li>
            <li>October-December: structural work</li>
            <li>
              January - April (Next Year): Completion of finishes and fixtures
            </li>
            <li>
              May - August (Next Year): Commissioning and testing of systems,
              final site work, and obtaining final approvals for the arena.
            </li>
          </ul>
        </div>
      </cui-ai-chat>```

### Prompt guide

Add the prompt-guide attribute to show the book icon that will emit the ai-chat-prompt-guide event when clicked. This event can be used to show a dialog with a prompt library.

```html
const [promptLibraryOpen, setPromptLibraryOpen] = useState(false);
  const styles = `
    .cards{
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-auto-rows: 1fr;
      gap: var(--spacing-md);
      place-items: center;
      align-items: stretch;
    }
  `;

  // Define card titles and content
  const cardsData = [
    {
      title: 'Multi-step example',
      content:
        'I need to write a proposal about X, can you create an outline? Now, please draft the first section and...',
    },
    {
      title: 'Understand the document',
      content:
        'Please summarize the key takeaways from the document, with the following points in mind:',
    },
    {
      title: 'Generate 5 ideas',
      content: 'Write an article for my team on the importance of showing up to meetings on time.',
    },
    {
      title: 'Brainstorm ideas',
      content:
        'Write a 2-page article about the importance of wellbeing in English, word limit 200 characters.',
    },
  ];
      <cui-ai-chat
        label="prompt guide example chat window"
        promptGuide
        onAiChatPromptGuide={() => setPromptLibraryOpen(true)}
      />
      <cui-dialog
        heading="More prompts to try"
        open={promptLibraryOpen}
        onDialogHide={() => setPromptLibraryOpen(false)}
      >
        <div class="cards">
          {cardsData.map((card, index) => (
            <cui-card key={index} appearance="filled">
              <div slot="media" class="d-flex align-center gap-sm font-base400">
                <cui-icon
                  class="card-icon"
                  url="https://api.iconify.design/fluent:edit-line-horizontal-3-24-regular.svg"
                ></cui-icon>
                <span class="font-semi-bold">{card.title}</span>
              </div>
              <p class="font-base300">{card.content}</p>
            </cui-card>
          ))}
        </div>
        <cui-button slot="footer" appearance="subtle" href="http://bing.com" target="_blank">
          Go to AI Chat Lab
        </cui-button>
      </cui-dialog>
      <style>{styles}</style>```

### Prompt starter

The prompt starter can be used to achieve the zero prompt experience. The prompt button is a button with help-text.

```html
const styles = `
    .prompt-buttons {
      display: flex;
      gap: var(--spacing-sm);
      flex-wrap: wrap;
    }

    .prompt {
      flex-grow: 1;
      --button-icon-size: var(--font-size-base500);
      --button-subtext-font-size: var(--font-size-base300);
    }
`;

  const aiChatRef = useRef<cui-ai-chat-element>(null);

  const sampletResponse = {
    hideAiDisclaimer: true,
    hideFeedback: true,

  const handlePromptClick = (e) => {
    aiChatRef.current!.addText(e.target.querySelector('[slot="subtext"]').innerText);

  useEffect(() => {
    aiChatRef.current!.addResponse(sampletResponse);
  }, [aiChatRef]);
      <cui-ai-chat ref={aiChatRef} label="prompt starter example chat window">
        <div slot="response-1-body">
          <p>
            Hi Kat, <br /> Ready to explore? Select one of the suggestions below
            to get started...
          </p>

          <div class="prompt-buttons">
            <cui-button
              class="prompt"
              onClick={(e) => handlePromptClick(e)}
            >
              Summarize
              <span slot="subtext">Review key points in file</span>
              <cui-icon slot="start" name="person"></cui-icon>
            </cui-button>

            <cui-button
              class="prompt"
              onClick={(e) => handlePromptClick(e)}
            >
              Create
              <span slot="subtext">Write more about...</span>
              <cui-icon slot="start" name="person"></cui-icon>
            </cui-button>

            <cui-button
              class="prompt"
              onClick={(e) => handlePromptClick(e)}
            >
              Ask
              <span slot="subtext">Tell me about my day</span>
              <cui-icon slot="start" name="person"></cui-icon>
            </cui-button>
          </div>
        </div>
      </cui-ai-chat>
      <style>{styles}</style>```

## API Reference

### Slots

| Slot | Description |
|------|-------------|
| [promptId]-body | A dynamic slot use to add rich content to a response body in place of a response `value`. |
| [promptId]-feedback | A dynamic slot use to add rich content to a response in place of the default feedback control. |
| [promptId]-response-count-message | A dynamic slot for adding your own content for the response count. |
| [promptId]-response-footer | A dynamic slot for adding additional content at the end of the response. |
| ai-message | A slot use to add rich content to a response in place of the default AI disclaimer. |
| input-footer-actions | The actions button in the input footer. |
| loading-content | Content that is displayed while loading. |
| loading-progress-text | Content of loading progress text. |

### Attributes

| Attribute | Type | Description | Default |
|-----------|------|-------------|---------|
| allow-input-over-maxlength | `boolean | undefined` | Allows user to type in input when the input length is longer than the maxlength. |  |
| citation-label | `string` | The label of the citation button with a number in it used by assistive technologies. | `citation` |
| disable-input | `boolean | undefined` | Disables the input and submission button so that users are not able to add input to the chat window. |  |
| error-message | `string | undefined` | The error message of the input. |  |
| heading | `string | undefined` | The heading in the response chat. |  |
| hide-response-count-until-remaining | `number | undefined` | The number of remaining responses in the conversation before the reponse count start showing. |  |
| hide-stop-generation-button | `boolean | undefined` | Hides empty state. |  |
| inputCount | `number` | The number of user inputs that have occurred in this conversation. |  |
| inputLabel | `string` | The label used by assistive technologies for the input field. | `Ask a question or request info` |
| label | `string` | The label used by assistive technologies. | `AI Chat Window` |
| loading | `boolean` | Enables the loading state of the component. |  |
| loading-label | `string` | The default progress text in loading. | `Looking for references...` |
| maxlength | `number | undefined` | The maximum number of characters allowed for the input. |  |
| max-response-count | `number | undefined` | The maximum number of responses in the conversation. |  |
| message-label | `string` | The label for the AI Chat messages for assistive technologies before reading the content of the message. | `AI Chat says` |
| placeholder | `string` | The placeholder text for the input. | `Ask a question or request info` |
| prompt-guide | `boolean | undefined` | Show the prompt guide button. This will also hide the refresh button. |  |
| regenerate-button-label | `string` | The label of the regeneration button after the loading state. | `Regenerate` |
| responseCount | `number` | The number of responses that have occurred in this conversation. |  |
| save-transcript | `boolean | undefined` | Save the in sessionStorage and restore it when the component is reloaded. |  |
| send-icon-label | `string` | The label of the send icon in the input used by assistive technologies. | `send` |
| loading-stop-generation-button-label | `string` | The label of the stop generation button in the loading state. | `Stop generating` |
| suggestions | `string[] | undefined` | The placeholder text for the input. |  |
| suggestions-label | `string` | The label for the suggestions for assistive technologies before reading the content of the suggestions. | `Suggested responses` |
| transcript | `AiChatPrompt[]` | A record of the conversation. |  |
| dir | `'ltr' | 'rtl' | 'auto'` | The dir global attribute is an enumerated attribute that indicates the directionality of the element's text. |  |

### Events

| Event | Description |
|-------|-------------|
| ai-chat-action | Emitted when the user clicks on an actionable insight. |
| ai-chat-cancel | Emitted when the user clicks on the stop generation button. |
| ai-chat-feedback | Emitted when the user clicks on feedback options. |
| ai-chat-input | Emitted when the user submits a question or request. |
| ai-chat-prompt-guide | Emitted when the user clicks the prompt guide button. |
| ai-chat-regenerate | Emitted when the user clicks on the regenerate button. |
| ready | Emitted when the component is ready. |
