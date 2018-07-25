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
      // console.log("Labels");
      // console.log(response);
      // let unreadCount = response.data.messagesUnread;
      // eventBus.$emit('UNREAD_COUNT', unreadCount);
    })
  });
}
//This is where the magic happens! But it's not exactly what we want yet
//..we need more conditionals

//Getting the number of messages for the utility bar
const getNumberOfMessages = () => {
  gapi.client.load('gmail', 'v1').then(() => {
    gapi.client.gmail.users.labels.get({
      'userId': 'me',
      'id': 'INBOX',
    }).then((response) => {
      // console.log("NUM MESSAGES STUFF");
      // console.log(response);
      let totalInboxEmailCount = response.result.threadsTotal;
      gapi.client.gmail.users.labels.get({
        'userId': 'me',
        'id': 'CATEGORY_PROMOTIONS',
      }).then((response) => {
        let totalEmailCount = totalInboxEmailCount - response.result.threadsTotal;
          gapi.client.gmail.users.labels.get({
            'userId': 'me',
            'id': 'CATEGORY_SOCIAL',
          }).then((response) => {
            totalEmailCount = totalEmailCount - response.result.threadsTotal;
            eventBus.$emit('TOTAL_EMAIL_COUNT', totalEmailCount);
          });
      });
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
  gapi.client.gmail.users.messages.attachments.get({
    'userId': 'me',
    'messageId': payload.messageId,
    'id': payload.attachmentId
  }).then((response) => {
    return response.result.data;
  }).catch((err) => {
    console.log(err);
  });
}

export {
  sendMessage,
  markAsRead,
  markAsStarred,
  unMarkAsStarred,
  getProfileEmail,
  getLabels,
  getLabelsForUnread,
  getNumberOfMessages,
  getAttachment
};