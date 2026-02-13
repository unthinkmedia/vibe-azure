# Label

**Tag:** `cui-label`  
**Since:** 1.0.0  
**Status:** Preview  
**Category:** components  
**Source:** https://coherence-ftekb0dcfpcjb3gv.b02.azurefd.net/resources/label/

## Import

```js
import '@charm-ux/cui/dist/components/label/index.js'
```

## Guidance

Labels give a name to a component or group of components. Pair them with components like checkboxes and inputs to prompt someone to enter certain information, or with plain text to categorize information.

When using a label with a form component to gather information, use the asterisk to indicate whether the information is required before moving on.

Labels are typically included in components such as input by default.

> Go to label in the toolkit
**Alternate names:**
title
header
description

### Standards

You must meet the following requirements when using this component.

#### General requirements

Placed in close proximity to the component it describes.
Brief and descriptive.
Includes an asterisk (*) at the end of the label for required inputs.
In narrow viewports, longer labels wrap to the next line instead of truncating.

#### Accessibility requirements

Labels cannot be substituted with placeholder text.

### Anatomy

Labels are simple components that are used in a wide variety of more complex components.

#### Label is included by default

Most components that typically need a label already have it included in the code package. Such components include—but are not limited to—the following:
Checkbox
> Go to checkbox guidance
Input
> Go to input guidance
Radio group
> Go to radio guidance
Select
> Go to select guidance
Slider
> Go to slider guidance
Switch
> Go to switch guidance

### Layout

Generally, a label should go above a component. However it can also appear inline where layouts allow.
In this example, the first label sits above the input for setting a meeting location. The switch for Microsoft Teams meeting has a label inline with the switch.

#### Forms

Labels are frequently used in forms. Refer to the guidance on how to best use labels in forms.

> Go to the form design guidance

### Behavior

#### Disabled state

In addition to its rest state, a label can display a disabled state if the component it’s naming is also disabled. This is common for components with the label built in, like switch, checkbox, or radio groups.

In the disabled state, labels don’t need to meet color contrast requirements.
In this example, both the checkbox and its label are in a disabled state.

### Content

Labels provide a brief description of the information you’re looking for or action you should take. Usually, a short phrase works best. When necessary, labels can be phrased as a question. Otherwise, avoid full sentences or overly instructive text.
Use sentence-style capitalization. Only capitalize the first word.
Don’t use end punctuation unless the label forms a question.
Don’t use colons after labels.
Be brief and clear.
