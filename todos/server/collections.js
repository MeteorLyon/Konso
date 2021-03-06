/*
 Dialogs Schema
 {
 name: String
 ownerId: Id
 created: Timestamp
 channelId: Id of a channel, if channels dialog
 userIds: Array of ids
 type: Enum of DialogType
 }
 */
Dialogs = new Mongo.Collection("dialogs");
/*
 Messages Schema
 {
 created: Timestamp
 ownerId: Id
 text: String
 attachments: Id of Upload,
 mentions: [Object {text, id}]
 dialogId: Id
 removed: Boolean
 removedContent:{
     text,
     attachment,
     mentions
   }
 */
Messages = new Mongo.Collection("messages");
/*
Uploads
 */
Uploads = new FS.Collection("uploads", {
 stores: [new FS.Store.FileSystem("uploads", {
  path: Meteor.settings.public.uploadsDir,
  transformWrite: function (file, readStream, writeStream) {
   readStream.pipe(writeStream);
   var transformer = gm(readStream, file.name());
   transformer.size({bufferStream: true}, FS.Utility.safeCallback(function (err, size) {
    if (err) {
     // handle the error
    } else {
     file.update({$set: {'metadata.width': size.width, 'metadata.height': size.height}});
    }
   }));
  }

 })]
});