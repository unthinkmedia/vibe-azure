# Save Presets

**Category:** task-flows  
**Source:** https://coherence-ftekb0dcfpcjb3gv.b02.azurefd.net/resources/save-presets/

Save presets
Saving presets helps people save time by allowing people to seamlessly save and reapply past selections, reducing repetitive interactions. 


This is a flow that works in hand with filtering, data grid column management, and other areas where settings can be applied and saved. It lets people save previously applied filters or settings as a preset, so they can easily apply those settings elsewhere.
Alternate names:
filter sets
Standards
You must meet the following requirements when using this flow.
General requirements
All functionality (create, apply, manage) is accessible via a button or link.
Users are able to apply settings without having to also save them as a preset.
All settings are available to the user at any part of the flow with a back button.
Preset management is included.
Anatomy 
Basic components
The following components are required to be able to implement the flow successfully. Each includes a link to guidance specific to that component’s usage.
Tags represent a value that someone has picked, like recipients for an email or security clearance levels.
Message bars display errors, warnings, or important information about an open app or file.
Toolbars and buttons provide easy access to your app's most common tasks. 
Dialogs are temporary pop-ups that take focus from the page or app and requires people to interact with it. 
Drawers are surfaces that overlay the main content area and allows people to complete a quick task or learn about an item’s details.
Menus are hidden lists of options shown when someone interacts with a trigger component, like a button.
Checkboxes give people a way to select one or more items from a group.
Radio groups let people select a single item from a short list. 
Text areas allow people to enter long, free-form text data.
Interaction
The following examples demonstrate the interaction pattern in the context of saving filter presets on content within a data grid. However, the flows are designed to work for data grid column management or other view settings that can be applied in an app. 


The button used to access the settings drawer and the content of the drawer need to change accordingly based on the context it’s used, but the baseline flow is kept the same.
Creating a preset
This flow demonstrates the creation of a preset from scratch. In this example, no view settings have been applied to the content, and no other presets have been created prior.
Step 1
Begin at a content page with no custom view settings applied. In this example, the content being adjusted is in a data grid, and the button used to access the saving presets flows is the filter split button in the toolbar.
Step 2
After interacting with the filter button, a menu appears. From this menu, people have multiple options. To create a preset, select create filter preset. 


There are two disabled menu items: apply filter preset and manage filter presets. They’re disabled because no presets have been saved prior to this interaction.
Step 3
A drawer containing all the filter options opens. From here, select any relevant filters to scope the content.
Step 4
Once selections are made, the next button at the footer of the drawer is available. Select it to continue.
Step 5
In the next page, provide a name for the preset. All selected filters are also available in a summary view so that people can review and remove filters as needed at this stage as well.


To add more filters, a back button becomes available at the top of the drawer.
Step 6
Once a name is provided, the filter preset can be saved and applied with the button in the drawer footer. This button both saves the preset to be accessed later, and applies the selections to the content immediately.
Step 7
The content page updates to reflect the selections made in the new preset. Only items that match the selected filters are shown. A clear all link is provided next to the filter tags, which when used, removes all applied filters. 
Adding settings when a preset is applied
This flow picks up from the end of the flow demonstrated above. The content page has a saved preset applied already.
Step 1
From the filter menu, select apply filters to begin applying different or additional filters. 


Additionally, the previously disabled options in the menu are enabled now, as a preset has previously been created and saved.
Step 2
The drawer containing all the filter options opens. Any filters that are currently applied show as selected in the drawer.
Step 3
Select any number of additional filters to be applied to the content and choose apply to save the new selections. 


From here, multiple actions can be taken. People can simply apply the new selections, or save a new preset, or do both actions at once. 
Step 4
The filter drawer closes and the content page updates to reflect the added selections.


In addition to the ability to clear all, you can now also create a filter preset. This allows you to create a preset based on the settings applied. This link is specific to the filtering flows.
Creating a preset from applied settings
This flow picks up from the end of the flow demonstrated above. The content page has filters applied (that have not yet been saved as a preset), and one saved preset.
Step 1
There are two ways to create a preset from the applied settings:
The create filter preset link, which is unique to the filter flow.
The create filter preset menu item accessed from the button in the command bar.


Interacting with either leads to the same experience. This example demonstrates the interaction with the menu item.
Step 2
The drawer opens to the second page of the preset flow, where the preset is named. All selected filters are also available in a summary view so that people can review and remove filters as needed at this stage as well.


To add more filters, a back button becomes available at the top of the drawer.
Step 3
Once a name is provided, the filter preset can be saved and applied with the button in the drawer footer. This button both saves the preset to be accessed later, and applies the selections to the content immediately.
Step 4
The content page updates to reflect the selections made in the new preset. Only items that match the selected filters are shown. The option to create a filter preset is no longer available, as the applied settings are already saved as a preset.
Applying saved presets
This flow starts from the very beginning, where the content hasn’t had any view settings applied. However, there are now several saved presets.


This flow works whether or not view settings have been applied. When applying a preset after any view settings have already been applied, the preset overrides existing settings to apply the preset’s settings.
Step 1
From the filter menu, selecting apply filter preset pulls up a nested menu that lists the saved presets. Select any of the menu items to apply the preset view settings.
Step 2
Upon selecting the preset, the page content instantly updates to reflect the view settings associated with that preset.
Managing presets
This flow demonstrates how to edit and delete previously saved presets. It starts from the very beginning, where the content hasn’t had any view settings applied. However, there are now several saved presets. 
Step 1
From the filter menu, select manage filter presets.
Step 2
A drawer opens containing a list of all previously saved presets, along with edit and delete buttons next to each listed preset. Select edit to make changes to any preset.


There are no buttons on the drawer at this point.
Step 3
The app’s filter drawer opens, with a few adjustments. There’s now a back button, which takes you back to the list of presets. The title of the drawer reads Edit preset.
Step 4
From here, people can choose to make any additional selections. The next button is enabled regardless of if changes are made or not, as there are more edits available on the next page.
Step 5
After pressing next, the drawer opens to the naming and summary page of the preset flow. The name of the preset can be changed here. Saving returns to the preset management drawer.
Step 6
From the preset management drawer, presets can also be deleted by using the delete button next to each preset.
Step 7
Upon pressing delete, a dialog appears to get confirmation from the users. 
Step 8
Once deleted successfully, the drawer returns to the management page and a message bar communicates that the preset was deleted successfully.
Provide feedback

Reach out to us if you spot a bug or have a feature request. Your feedback is critical to the success of Coherence and everyone who uses it.

Contact us on Teams
Jump links
Standards
General requirements
Anatomy
Basic components
Interaction
Creating a preset
Adding settings when a preset is applied
Creating a preset from applied settings
Applying saved presets
Managing presets
Provide feedback