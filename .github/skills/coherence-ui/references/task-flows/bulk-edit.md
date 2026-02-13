# Bulk Edit

**Category:** task-flows  
**Source:** https://coherence-ftekb0dcfpcjb3gv.b02.azurefd.net/resources/bulk-edit/

Bulk edit
With the bulk edit flow, users are able to edit multiple fields on multiple items from one interaction. This pre-designed flow includes all steps and interactions required to perform the task. This includes activation of the flow, successful completion, failure, or user cancellation. 


This flow applies the same edits across multiple items (i.e., if projects have different due dates, using this flow will apply the same due date across projects). For more granularity to edit a single item, use the edit an item task flow.


The bulk edit task flow is comprised of a few key steps:
User selects at least two items to edit.
User activates bulk edit flow.
User selects field(s) to edit.
User makes edit to field(s).
User saves changes to the items.
Updates to items are reflected in main content page.
Standards
You must meet the following requirements when using this component.
General requirements
Place an edit button next to the editable item. For items within a list or data grid, include a checkbox, which on selection then displays an edit button above the content area where the item is located.
A new page or drawer hosts the fields required to edit the item.
If someone has made changes to one or more fields and exits the flow, use a dialog to prevent any unintended loss of information. 
Use a message bar to convey the results of the interaction (success, error, etc.) once the flow is completed. 
Provide links to the new item in message bars conveying success.
Provide explanations of the error in message bars conveying failure.
Automatically populate the form with the item’s existing content.
List editable categories in the dropdown in the same order as they appear in the main content page.
After flow completion, items that were edited remain selected.
Anatomy
Basic components
The following components are required to be able to implement the flow successfully. Each includes a link to guidance specific to that component’s usage.
Breadcrumbs are a secondary navigation aid that helps people keep track of where they are in your app or site. 
Message bars display errors, warnings, or important information about an open app or file.
Toolbars provide easy access to your app's most common tasks. 
Dialogs are temporary pop-ups that take focus from the page or app and requires people to interact with it. 
Drawers are surfaces that overlay the main content area and allows people to complete a quick task or learn about an item’s details.
Forms facilitate the collection of information into a database in a logical fashion. This guidance will help you design the content inside the flow.
Types
There are two ways that the bulk edit flow can be accomplished based on whether the form is hosted in a full-page layout or in an overlay drawer.
Full-page form
In the full-page form example, the create new form is contained in a full-page layout. This type is best used when forms are lengthy and, in some cases, may require multiple steps to complete. 


A breadcrumb is used at the top of the page to let people navigate back to the starting point.
Overlay drawer form
The form used to create a new item can be contained within a drawer that opens upon initiating the flow. This type is best used for forms that are short, requiring only a few fields to complete. 
Interaction
Pair the edit flow with the create flow
The edit flow builds off of the create flow. In any app that features both create and edit functionality, both of these flows should be used. The flows should match in all scenarios across the application, and with other products. 


Go to the create an item task flow.
Step by step
The mockups below show how someone would complete the whole interaction, from initiating the flow to ending the flow. This includes termination of the flow, and any success or error messaging.


This flow follows the same basic structure as the create an item flow, using a full-page form experience.
Completion flow
Step 1
On the main content page, the user selects at least two items in the data grid. Once those items are selected, the bulk edit button becomes available in the command bar.
Step 2
Clicking bulk edit causes a panel or full page form to open where all editing will take place. There is a breadcrumb navigation at the top of the full page that allows users to return to the main content page, as well as maintain context of how they arrived at the current page. 


There is a dropdown where users can first select which category they would like to edit. The categories available in the dropdown directly correlate with the content present in the items themselves.


At the bottom, there is a disabled next button and a cancel button that allows users to return to the main content page.
Step 3
Once the user has selected which category they’d like to edit, an additional input field appears that contains the actual content. The user can then input the changes they want to make. 


Additionally, a button to remove the edits and a button to edit another category appear below the input field. Edit another category would cause Step 2 to repeat below, separated by a divider. Remove edits would remove the category dropdown and its associated input field.


Once the user has input changes to the content, the next button activates and the user can click it to proceed.
Step 4
Before they finalize their changes, a summary view appears. This provides the user with a high-level view of all categories and the changes made.


They can then complete the flow by clicking the save changes button.
Step 5
The flow is successfully completed and the user is returned to the uneditable content page.


At the top of the page, a dismissable message bar appears to inform the user that they have successfully edited the items. It also provides a link to reverse the changes.
Cancellation flow
Step 1
There are two ways a user can navigate away from the create new item page without completing the flow: via breadcrumb by clicking a link to the previous page, or by selecting the cancel button. 


They can also exit by clicking navigational items available elsewhere in the app, such as the side nav.
Step 2
If the user has already filled out any amount of the form, clicking any of those navigational items will prompt a dialog before navigating away from the page. 


The dialog communicates to the user that any content they have added will be deleted if they continue. The user is then able to select discard if they want to continue to the main content page, or continue editing if they want to return to the form.
Step 3a
When the user chooses to discard their created content, they are then returned to the main content page.
Step 3b
When the user chooses to continue editing, the dialog closes and they can resume making changes to the form.
Partial success
Step 1
After the user has made their necessary changes, they can complete the flow by clicking the Finish button at the bottom of the page.
Step 2
If there is a system failure that results in some changes being saved, and some being discarded, two dismissable message bars appear. 


One message bar communicates the successful changes, and provides a link to undo the changes.


The other message bar communicates which changes were unable to save, and can be expanded to show the full details of the failure.
System failure
Step 1
After the user has made their necessary changes, they can complete the flow by clicking the save changes button at the bottom of the page.
Step 2
If there is a system failure that results in the changes being discarded after full completion of the flow, a dismissable message bar appears to inform the user that the changes were unable to save.
Best practices
Adding and removing categories for editing
Buttons appear after an initial category is selected
Removing edits isn’t an available action unless a user has selected a category and filled out the relevant input field, as their is nothing to remove until then. Editing another category is not available to keep the task focused.
The dropdown automatically populates with remaining categories
If a user has already chosen to make edits to one category, it wouldn’t be available to edit again. Removing it from the dropdown when someone adds another category ensures that the user doesn’t fill out the same information twice, and doesn’t cause the system to fail.


For example, the options may be to edit the deadline, status, and tags of a project. If the user has already added edits to deadline, only status and tags will show up in subsequent dropdowns when choosing a category to edit.
Show all failed changes
In cases of accidental failure of the flow, calling out exactly which edits failed to save allows users to easily identify which edits they might need to redo.


These errors can be communicated via a message bar.
Provide feedback

Reach out to us if you spot a bug or have a feature request. Your feedback is critical to the success of Coherence and everyone who uses it.

Contact us on Teams
Jump links
Standards
General requirements
Anatomy
Basic components
Types
Full-page form
Overlay drawer form
Interaction
Pair the edit flow with the create flow
Step by step
Completion flow
Cancellation flow
Partial success
System failure
Best practices
Adding and removing categories for editing
Show all failed changes
Provide feedback