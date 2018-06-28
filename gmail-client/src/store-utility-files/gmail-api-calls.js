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

const getLabels = () => {
  gapi.client.load('gmail', 'v1').then(() => {
  gapi.client.gmail.users.labels.list({
    'userId': 'me'
  }).then(response => {
      console.log("Labels");
      console.log(response);
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
    'id': 'CATEGORY_PERSONAL',
    }).then((response) => {
      let unreadCount = response.result.threadsUnread;
      eventBus.$emit('UNREAD_COUNT', unreadCount);

      //Attemps to get the correct number of unread....didn't work...gave me numbers just barely in the negatives
      // console.log("INBOX UNREAD TOTAL");
      // console.log(unreadCount);
      // //I want to filter out archived messages' unreads but haven't found an api call for that yet
      // let socialURL = 'https://www.googleapis.com/gmail/v1/users/me/labels/CATEGORY_SOCIAL';
      // axios.get(socialURL, getAuthHeader())
      // .then(response => {
      //   let socialUnread = response.data.threadsUnread;
      //   console.log("SOCIAL UNREAD");
      //   console.log(socialUnread);
      //   unreadCount -= socialUnread;
      //   let promoURL = 'https://www.googleapis.com/gmail/v1/users/me/labels/CATEGORY_PROMOTIONS';
      //   axios.get(promoURL, getAuthHeader())
      //   .then(response => {
      //     let promoUnread = response.data.threadsUnread;
      //     console.log("PROMO UNREAD");
      //     console.log(promoUnread);
      //     unreadCount -= promoUnread;
      //     console.log("UNREAD COUNT");
      //     console.log(unreadCount);
      //     eventBus.$emit('UNREAD_COUNT', unreadCount);
      //   })
      // })
    });
  });
}

// const getListOfDrafts =() => {
//   let url = "https://www.googleapis.com/gmail/v1/users/me/drafts";
//   axios.get(url, getAuthHeader())
//     .then(response => {
//       console.log("DRAFTS OBJ");
//       console.log(response);
//     })
//     .catch(error => {
//       console.log(error);
//     });
// }

// const getAttachments = (message) => {
//   if (message.attachmentIds.length !== 0) {
//     const messageId = message.messageId;
//     message.attachmentIds.map(attachmentId => {
//       let url = `https://www.googleapis.com/gmail/v1/users/me/messages/${messageId}/attachments/${attachmentId}`;

//       axios.get(url, getAuthHeader())
//         .then(response => {
//           let attachmentData = response.data;
//           return attachmentData;
//         })
//         .catch(error => {
//           console.log(error);
//         });
//     })
//   }
// }

export {
  sendMessage,
  markAsRead,
  getProfileEmail,
  getLabels,
  getLabelsForUnread,
  getNumberOfMessages,
  getAttachments
};