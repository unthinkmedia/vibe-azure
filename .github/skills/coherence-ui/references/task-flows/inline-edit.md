# Inline Edit

**Category:** task-flows  
**Source:** https://coherence-ftekb0dcfpcjb3gv.b02.azurefd.net/resources/inline-edit/

Inline edit
With the inline edit flow, people can edit and update items directly, without navigating to a new page or surface. This pre-designed flow describes all steps and interactions required to perform the task. This includes activation of the flow, successful completion, and failure or user cancellation. 


The inline edit flow is comprised of a few key steps:
User arrives at an item’s content page.
User activates the edit flow.
User updates any relevant content fields in form.
User saves changes made to the item.
Item is updated and updates are reflected in the item’s content page.
Standards
You must meet the following requirements when using this flow.
General requirements
A button provides a clear entry point to begin the flow.
Editable content is displayed in a similar layout to its read-only format.
A footer with buttons to save or cancel any changes is available while editing.
Confirmation of completion or error are communicated with a message bar after edits are saved.
Anatomy
Basic components
The following components are required to be able to implement the flow successfully. Each includes a link to guidance specific to that component’s usage.
Breadcrumbs are a secondary navigation aid that helps people keep track of where they are in your app or site. 
Message bars display errors, warnings, or important information about an open app or file.
Toolbars provide easy access to your app's most common tasks. 
Dialogs are temporary pop-ups that take focus from the page or app and requires people to interact with it. 
Drawers are surfaces that overlay the main content area and allows people to complete a quick task or learn about an item’s details.
Forms facilitate the collection of information into a database in a logical fashion. This guidance will help you design the content inside the flow.
Interaction
Step by step
The mockups below show how someone would complete the whole interaction, from initiating the flow to ending the flow. This includes termination of the flow, and any success or error messaging.


This flow follows the same basic structure as the create an item flow, using a full-page form experience.
Full completion flow
Step 1
Using the toolbar at the very top of the page, the flow is initiated by selecting the edit button. 
Step 2
The content page updates and all editable fields turn into their relevant input field (i.e. dropdown, text field). The layout mimics the read-only version of the page.


The toolbar at the top of the page disappears, as those functions are not available while editing. At the bottom of the page, a footer appears containing buttons to save changes or cancel. The save button is disabled until at least one field in the form is changed.
Step 3
After all changes are made, the save button is enabled and can be used to complete the flow.
Step 4
The flow is successfully completed and the user is returned to the now updated content page. At the top of the page, a message bar appears to inform the user that they have successfully saved their edits. It also provides an option to reverse the changes.
Cancellation flow
Step 1
Editing can be cancelled by using the back button linking to the main content page, or by using the cancel button. People can also exit by clicking any navigational items available elsewhere in the app.
Step 2
If any changes have been made, clicking any of those navigational items will prompt a dialog before navigating away from the page. 


The dialog explains that any changes made won’t be saved if they continue. The user then can choose whether to continue or to return to editing. 
Step 3a
When the user chooses to discard their created content, they are then returned to the content page without any edits applied. 
Step 3b
When choosing to continue editing, the dialog closes and the form remains available.
System failure flow
Step 1
After any changes are made, the save changes button at the bottom of the page is enabled and is clicked to complete the flow.
Step 2
If there is a system failure that results in the changes being discarded after full completion of the flow, the user is returned to the content page and a message bar explains the error.
Provide feedback

Reach out to us if you spot a bug or have a feature request. Your feedback is critical to the success of Coherence and everyone who uses it.

Contact us on Teams
Jump links
Standards
General requirements
Anatomy
Basic components
Interaction
Step by step
Full completion flow
Cancellation flow
System failure flow
Provide feedback