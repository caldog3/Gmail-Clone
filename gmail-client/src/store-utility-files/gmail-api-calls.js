import { Base64Encode } from './email';
import eventBus from './../event_bus.js';
import base64url from 'base64url';
import store from '../store';

const sendMessage = (headers, message) => {
  console.log("In compose message api call");
  let email = '';
  for (let header in headers){
    email += header;
    email += ": " + headers[header] + "\r\n";
  }
  email += "\r\n" + message;

  console.log("Now in Base64: ", Base64Encode(email));
  console.log("Base64URL: ", base64url(email));
  gapi.client.gmail.users.messages.send({
    'userId': 'me',
    'resource': {
      // 'raw': Base64Encode(email),
      'raw': base64url(email),
    }
  }).then((response) => {
    console.log(`Email Sent. Response =>:`, response);
  }).catch((err) => {
    console.log(err);
  });
}

const sendReply = (headers, message, threadId) => {
  console.log("In API response call");
  let email = '';
  for (let header in headers) {
    email += header;
    email += ": " + headers[header] + "\r\n";
  }
  email += "\r\n" + message;
  console.log("Now in Base64: ", Base64Encode(email));
  console.log("Base64URL: ", base64url(email));
  gapi.client.gmail.users.messages.send({
    'userId': 'me',
    'resource': {
      // 'raw': Base64Encode(email),
      'raw': base64url(email),
      'threadId': threadId,
    }
  }).then((response) => {
    console.log(`Reply Sent. Response =>:`, response);
  }).catch((err) => {
    console.log(err);
  });
}

const sendDraft = (headers, message, threadId) => {
  console.log("In the sendDraft API call");
  let email = '';
  for (let header in headers) {
    email += header;
    email += ": " + headers[header] + "\r\n";
  }
  email += "\r\n" + message;
  gapi.client.gmail.users.drafts.send({ //just need to get all of these resource elements to work 
    'userId': 'me',
    'resource': {
      // 'raw': base64url(email),
      'id': threadId,  //I think we NEEED a draft id and not a message type id
      'message': {
        'raw': base64url(email),
      }
      // instead of threadId need a draftId just called 'id': ______
      //'id': 
    }
  }).then((response) => {
    console.log(`Reply Sent. Response =>:`, response);
  }).catch((err) => {
    console.log(err);
  });
}

const getDraftListOfIds = () => {
  // context.commit("addLabelId", labelId);
  gapi.client.load('gmail', 'v1').then(() => {
    gapi.client.gmail.users.drafts.list({
      'userId': 'me',
      // 'maxResults': 50,
    }).then((response) => { //response gives an array of objects for each draft with all 3 associated ids
      console.log("DRAFT API", response.result);
      if (response.result.drafts !== undefined) {
        //probably want to commit these values into the store or something
        //FIXME: need Devon for including the store's state in this file
        store.state.threadIdsArray = response.result.drafts;
        console.log("THE STORE DRAFTIDS: ", this.$store.state.threadIdsArray);
      }
    });  
  }).catch((err) => {
    console.log(err);
  });
}





// OUR GMAIL ACCOUNTS CANT USE '.create' b/c we don't have 'domain wide authority'
// const forwardRequest = () => {
//   console.log("REQUESTING FOR CREATE FORWARD");
//   gapi.client.gmail.users.settings.forwardingAddresses.create({
//     'userId': 'me',
//   }).then((response) => {
//     console.log("SUCCESS: response is - ", response);
//   }).catch((err) => {
//     console.log(err);
//   })
// }

const sendForward = (headers, message,threadId) => {
  console.log("In API forwarding call");
  let email = '';
  for (let header in headers) {
    email += header;
    email += ": " + headers[header] + "\r\n";
  }
  email += "\r\n" + message;
  gapi.client.gmail.users.messages.send({
    'userId': 'me',
    'resource': {
      'raw': Base64Encode(email),
      'threadId': threadId, 
    }
  }).then((response) => {
    console.log(`Forward Sent. Response =>:`, response);
  }).catch((err) => {
    console.log(err);
  });
}

const forwardMessage = (forwardEmail, messageBody) => {
  console.log("forwarding Request starting");
  gapi.client.gmail.users.settings.forwardingAddresses.get({
    'userId': 'me',
    //hard coding in values currently for testing
    'verificationStatus': 'verificationStatusUnspecified',
    'forwardingEmail': forwardEmail,
    //'forwardingEmail': forwardEmail,
  }).then((response) => {
    console.log('ForwardEmail: ', response);
  }).catch((err) => {
    console.log(err);
  })
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
  // testing stuff
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
const archiveMessage = (messageId) => {
  gapi.client.gmail.users.threads.modify({
    'userId': 'me',
    'id': messageId,
    'removeLabelIds': ['INBOX']
  }).then((response) => {
    console.log('Trying to archive', response);
  }).catch((err) => {
    console.log(err);
  });
}

const markSpam = (threadId) => {
  console.log("Marking the spam in api");
  gapi.client.gmail.users.threads.modify({
    'userId': 'me',
    'id': threadId,
    'addLabelIds': ['SPAM'],
    'removeLabelIds': ['INBOX', 'CATEGORY_SOCIAL', 'CATEGORY_PROMOTIONS', 'CATEGORY_PERSONAL'],

  }).then((response) => {
    console.log("Marking as Spam", response);
  });
}

const trashMessage = (threadId) => {
  console.log("In the trash message api call");
  gapi.client.gmail.users.threads.trash({
    'userId': 'me',
    'id': threadId,
  }).then((response) => {
    console.log("Trashing...:", response);
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
      let allLabels = response.result.labels;
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
    gapi.client.gmail.users.labels.get({
      'userId': 'me',
      'id': folder,
    }).then((response) => {
      let totalInboxEmailCount = response.result.threadsTotal;
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
        return base64url.toBase64(response.result.data);
      }).then((base64Data) => {
        resolve(base64Data);
      }).catch((err) => {
        console.log(err);
      });
  });
}

export {
  sendMessage,
  sendReply,
  archiveMessage,
  markAsRead,
  markAsUnread,
  markAsStarred,
  unMarkAsStarred,
  getLabels,
  getLabelsForUnread,
  getNumberOfMessages,
  getAttachment,
  trashMessage,
  markSpam,
  forwardMessage,
  sendForward,
  sendDraft,
  getDraftListOfIds,
};