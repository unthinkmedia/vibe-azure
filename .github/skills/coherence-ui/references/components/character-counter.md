# Character Counter

**Tag:** `cui-character-counter`  
**Category:** components  
**Source:** https://coherence-ftekb0dcfpcjb3gv.b02.azurefd.net/resources/character-counter/

## Import

```js
import '@charm-ux/cui/dist/components/character-counter/index.js'
```

## Guidance

### Standards

- You must meet the following requirements when using this component.

### Anatomy

- Total number of characters entered
- Total number of characters allowed

### Relationship with the text area

- Input label
- Text area
- Character counter

### Additional field components

- Label
- Text area
- Character counter
- Warning message
- Helper text

### Format validation

- Label
- Text area
- Character counter
- Warning message
- Helper text

### Types

- There are two fundamental variants of the character counter: default state and error state.

### Status messages for text counter

- Following are examples of status messages to use with the character counter to help set expectations and provide actionable feedback appropriately.

### Status messages for text format

- Use the following status messages to set formatting expectations.

### Meeting requirements

- Ensure content submission meets requirements. The character counter operates in real-time, aiding people as they compose content. Upon surpassing character limits and triggering an error state in the text input, it must inhibit submission of the content until the requirements are met.

### Identifying appropriate character limitations

- Imposing character limitations may not be necessary or may even be counterproductive for writing and communication platforms, note-taking apps, and email.
- Allowing for more characters when it’s required helps to convey critical info such as social media/blog posts or legal, medical, and technical specifications.

### Guiding input with helper text

- Providing content requirements and suggestions.
- Instructions on format and prohibited characters.

### Accessibility

Every component meets the Microsoft Accessibility Standards (MAS) requirements, which includes headings, keyboard navigation (focus order), screen readers (labels), color contrast, and more. Using our components and following the design standards will get you most of the way to an accessible experience that meets grade C.


To get you the rest of the way to grade C, you’ll need to ensure that experiences composed of multiple components are accessible. We recommend running Accessibility Insight's FastPass tool and manually testing your scenarios end to end with a keyboard and screen reader.

### Microfeedback for Copilot

- Character counter is used with the text box field to capture feedback on Copilot.

### Provide feedback

- Reach out to us if you spot a bug or have a feature request. Your feedback is critical to the success of Coherence and everyone who uses it.
- Contact us on Teams

## Code Examples

### Text Area

```html
const CHAR_LIMIT = 10;
  const CHAR_NEAR_LIMIT = 8;
  const [value, setValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [warning, setWarning] = useState('');

  const handleChange = e => {
    const currChars = e.target.value.length;
    setValue(e.target.value);
    if (currChars > CHAR_LIMIT) {
      setErrorMessage('The entry exceeds the character limit. Please shorten it.');
      setWarning('');
    } else {
      setErrorMessage('');
      if (currChars === CHAR_LIMIT) {
        setWarning('You reached the character limit. Consider shortening it.');
      } else if (currChars >= CHAR_NEAR_LIMIT) {
        setWarning("You're nearing the character limit.");
      } else {
        setWarning('');
      }
    }

<div>
      <cui-text-area label="Text area character counter example"
        characterCounterLimit={CHAR_LIMIT}
        value={value}
        onChange={handleChange}
        errorMessage={errorMessage}></cui-text-area>
      {warning && (
        <div style="display: flex; align-items: center; margin-top: 2">
          <span style="color: #bc4b09; font-size: 14; margin-right: 4">⚠️</span>
          <span style="color: #616161; font-size: 14">{warning}</span>
        </div>
      )}
    </div>
```

### Input

```html
const CHAR_LIMIT = 10;
  const CHAR_NEAR_LIMIT = 8;
  const [value, setValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [warning, setWarning] = useState('');

  const handleChange = e => {
    const currChars = e.target.value.length;
    setValue(e.target.value);
    if (currChars > CHAR_LIMIT) {
      setErrorMessage('The entry exceeds the character limit. Please shorten it.');
      setWarning('');
    } else {
      setErrorMessage('');
      if (currChars === CHAR_LIMIT) {
        setWarning('You reached the character limit. Consider shortening it.');
      } else if (currChars >= CHAR_NEAR_LIMIT) {
        setWarning("You're nearing the character limit.");
      } else {
        setWarning('');
      }
    }

<div>
      <cui-input label="Input character counter example"
        characterCounterLimit={CHAR_LIMIT}
        value={value}
        onChange={handleChange}
        errorMessage={errorMessage}></cui-input>
      {warning && (
        <div style="display: flex; align-items: center; margin-top: 2">
          <span style="color: #bc4b09; font-size: 14; margin-right: 4">⚠️</span>
          <span style="color: #616161; font-size: 14">{warning}</span>
        </div>
      )}
    </div>
```

## API Reference
