import { Base64Encode } from './email';
import eventBus from './../event_bus.js';

const sendMessage = (headers, message) => {
  let email = '';
  for (let header in headers){
    email += header;
    email += ": " + headers[header] + "\r\n";
  }
  email += "\r\n" + message;

  gapi.client.gmail.users.messages.send({
    'userId': 'me',
    'resource': {
      'raw': Base64Encode(email)
    }
  }).then((response) => {
    console.log(`Email Sent. Response =>:`, response);
  }).catch((err) => {
    console.log(err);
  });
}

const markAsRead = (messageId) => {
  gapi.client.gmail.users.messages.modify({
    'userId': 'me',
    'id': messageId,
    'removeLabelIds': ['UNREAD']
  }).then((response) => {
    console.log(`MarkedAsRead`, response);
  }).catch((err) => {
    console.log(err);
  });
}
const markAsUnread = (messageId) => {
  gapi.client.gmail.users.messages.modify({
    'userId': 'me',
    'id': messageId,
    'addLabelIds': ['UNREAD']
  }).then((response) => {
    console.log(`MarkedAsUnread`, response);
  }).catch((err) => {
    console.log(err);
  });
}

const markAsStarred = (messageId) => {
  gapi.client.gmail.users.threads.modify({
    'userId': 'me',
    'id': messageId,
    'addLabelIds': ['STARRED']
  }).then((response) => {
    console.log(`markAsStarred`, response);
  }).catch((err) => {
    console.log(err);
  });
}
const unMarkAsStarred = (messageId) => {
  gapi.client.gmail.users.threads.modify({
    'userId': 'me',
    'id': messageId,
    'removeLabelIds': ['STARRED']
  }).then((response) => {
    console.log(`unMarkAsStarred`, response);
  }).catch((err) => {
    console.log(err);
  });
}

const getLabels = () => {
  gapi.client.load('gmail', 'v1').then(() => {
  gapi.client.gmail.users.labels.list({
    'userId': 'me'
  }).then(response => {
      console.log("Labels");
      let allLabels = response.result.labels;
      console.log(allLabels);
      var customLabels = [];
      for (var i = 0; i < allLabels.length; i+=1) {
        if (allLabels[i].id.startsWith("Label_")) {
          let customLabel = {name: allLabels[i].name, id: allLabels[i].id};
          // console.log(customLabel);
          customLabels.push(customLabel);
        }
      }
      // console.log(customLabels);
      eventBus.$emit("CUSTOM_FOLDERS", customLabels);

    })
  });
}
//This is where the magic happens! But it's not exactly what we want yet
//..we need more conditionals

//Getting the number of messages for the utility bar
const getNumberOfMessages = (folder) => {
  gapi.client.load('gmail', 'v1').then(() => {
    folder = folder.toUpperCase();
    console.log("THE TOTAL NUMBER OF MESSAGES FOLDER IS:");
    console.log(folder);
    gapi.client.gmail.users.labels.get({
      'userId': 'me',
      'id': folder,
    }).then((response) => {
      let totalInboxEmailCount = response.result.threadsTotal;
      console.log("still alive");
      return totalInboxEmailCount;
    });
  });
}

const getLabelsForUnread = () => {
  gapi.client.load('gmail', 'v1').then(() => {
    gapi.client.gmail.users.labels.get({
    'userId': 'me',
    'id': 'INBOX',
    // 'q': 'category:primary',
    }).then((response) => {
      // console.log(response);
      let unreadCount = response.result.threadsUnread;
      eventBus.$emit('UNREAD_COUNT', unreadCount);
    });
  });
}

const getAttachment = (payload) => {
  return new Promise((resolve) => {
      gapi.client.gmail.users.messages.attachments.get({
        'userId': 'me',
        'messageId': payload.messageId,
        'id': payload.attachmentId
      }).then((response) => {
        resolve(response.result.data);
      }).catch((err) => {
        console.log(err);
      });
  });
}

export {
  sendMessage,
  markAsRead,
  markAsUnread,
  markAsStarred,
  unMarkAsStarred,
  getProfileEmail,
  getLabels,
  getLabelsForUnread,
  getNumberOfMessages,
  getAttachment
};