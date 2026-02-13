# Uploader

**Tag:** `cui-uploader`  
**Category:** components  
**Source:** https://coherence-ftekb0dcfpcjb3gv.b02.azurefd.net/resources/uploader/

## Import

```js
import '@charm-ux/cui/dist/components/uploader/index.js'
```


> An uploader allows someone to select files from their computer and upload them into an app. It offers the ability to drag and drop a file into a field, or to open the computer’s file explorer. It also provides a way for people to immediately manage their uploads.

## Guidance

### Standards

- For the component to be implemented to meet basic accessibility requirements and satisfy user expectations, the following requirements must be true in your app.

### Anatomy

- The uploader is made up of two significant features: the drag and drop field itself, along with upload cards which represent the user's uploaded files. It is built with the following components: input, button, link, card, and progress bar.

### User upload errors

In the case of an error during upload, always explain the cause of the error in the card itself and in a message bar.  


These errors occur when a user tries to upload a file that doesn't meet specified constraints, such as file type, file size, or total number of files. Since this error is enforced by the app, the only actions available are to delete the file from the list of uploads.

### App upload errors

In the case of an unforeseen error, provide a button in the upload card that allows people to retry the upload. 


This is different from a user upload error because the cause of the error is a failure on the app's side and is not related to any constraints known to the user.

### Available actions on uploads

- Depending on the status of the upload, different actions should be available to someone. There are different actions available for files that have completed uploading, those in which the upload is in progress, and those in which the upload has encountered an error.

### Provide feedback

- Reach out to us if you spot a bug or have a feature request. Your feedback is critical to the success of Coherence and everyone who uses it.
- Contact us on Teams

## API Reference
