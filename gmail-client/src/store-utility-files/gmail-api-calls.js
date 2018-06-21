import { getAuthHeader, Base64Encode } from './email';
import eventBus from './../event_bus.js';
import axios from 'axios';

const sendMessage = (headers, message) => {
  let email = '';
  for (let header in headers){
    email += header;
    email += ": " + headers[header] + "\r\n";
  }
  email += "\r\n" + message;
  const token = localStorage.getItem("token");
  const rawEmail = Base64Encode(email);

  const dataObject = {
    raw: rawEmail, //We'll use message: { raw: rawEmail } when we send attachments.
    headers: {
      'Content-Type': 'message/rfc822',
      Authorization: `Bearer ${token}`
    }
  }
  const url = "https://www.googleapis.com/gmail/v1/users/me/messages/send";
  axios.post(url, dataObject)
    .then((response) => {
      console.log(`RESPONSE!!: ${response}`);
  }).catch((err) => {
    console.log(err);
  });
}

const markAsRead = (messageId) => {
  let url = `https://www.googleapis.com/gmail/v1/users/me/threads/${messageId}/modify`;
  axios.post(url, getAuthHeader())
    .then(response => {
      console.log(response);
    })
}

const getProfileEmail = () => {
  let url = `https://www.googleapis.com/gmail/v1/users/me/profile`;
  axios.get(url, getAuthHeader())
    .then(response => {
      //console.log(response.data.emailAddress);
      eventBus.$emit("PROFILE_EMAIL", response.data.emailAddress);
    })
    .catch(error => {
      console.log(error);
    });
}

const getLabels = () => {
  let url = 'https://www.googleapis.com/gmail/v1/users/me/labels';
  axios.get(url, getAuthHeader())
    .then(response => {
      console.log("Labels");
      console.log(response);
      let unreadCount = response.data.messagesUnread;
      eventBus.$emit('UNREAD_COUNT', unreadCount);
    })
}

//This is where the magic happens! But it's not exactly what we want yet
//..we need more conditionals

const getLabelsForUnread = () => {
  let url = 'https://www.googleapis.com/gmail/v1/users/me/labels/CATEGORY_PERSONAL';
  axios.get(url, getAuthHeader())
    .then(response => {
      let unreadCount = response.data.messagesUnread;
      //I want to filter out archived messages' unreads but haven't found an api call for that yet
      let nextURL = '';

      eventBus.$emit('UNREAD_COUNT', unreadCount);
    })
}

const getAttachments = (message) => {
  if (message.attachmentIds.length !== 0) {
    const messageId = message.messageId;
    message.attachmentIds.map(attachmentId => {
      let url = `https://www.googleapis.com/gmail/v1/users/me/messages/${messageId}/attachments/${attachmentId}`;

      axios.get(url, getAuthHeader())
        .then(response => {
          let attachmentData = response.data;
          return attachmentData;
        })
        .catch(error => {
          console.log(error);
        });
    })
  }
}

export {
  sendMessage,
  markAsRead,
  getProfileEmail,
  getLabels,
  getLabelsForUnread,
  getAttachments
};