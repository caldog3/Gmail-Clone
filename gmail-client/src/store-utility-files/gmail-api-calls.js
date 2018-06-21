import { getAuthHeader, Base64Encode } from './email';
import eventBus from './../event_bus.js';
// import nodemailer from 'nodemailer';
import axios from 'axios';

const sendMessage = (headers, message) => {
  // const url = "https://www.googleapis.com/gmail/v1/users/me/messages/send"

  // let transporter = nodemailer.createTransport({
  //   host: 'smtp.gmail.com',
  //   port: 465,
  //   secure: true,
  //   auth: {
  //     type: 'OAuth2',
  //     user: 'me',
  //     accessToken: localStorage.getItem("token")
  //   }
  // });

  // let mailOptions = {
  //   from: '"Ammon" <foo@example.com>', // sender address
  //   to: 'amugimu@example.com',
  //   subject: 'Hello ✔',
  //   text: 'Hello world? sadf', // plain text body
  //   html: '<b>Hello world?</b>' // html body
  // };

  // // send mail with defined transport object
  // transporter.sendMail(mailOptions, (error, info) => {
  //   if (error) {
  //     return console.log(error);
  //   }
  //   console.log('Message sent: %s', info.messageId);
  //   console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  // });
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