import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import eventBus from './event_bus.js'
import {
  getAuthHeader,
  getTimeFormat,
  getBody, 
  resolveLabels, 
  getEmailInfo
} from './store-utility-files/email';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    messages: [],
    token: "",
    profileEmail: "",
  },
  getters: {
    user: state => state.user,
    messages: state => state.messages,
    getToken: state => state.token,
    loggedIn: state => {
      if (state.token === "") {
        return false;
      }
      return true;
    }
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
      if (token === "") {
        localStorage.removeItem("token");
      } else {
        localStorage.setItem("token", token);
      }
    },
    addMessage(state, message) {
      state.messages.push(message);
    },
  },
  actions: {
    setToken(context, token) {
      context.commit("setToken", token);
    },
    signOut(context) {
      context.commit("setToken", "");
    },
    initialize(context) {
      let token = localStorage.getItem("token");
      if (token) {
        context.commit("setToken", token);
      }
    },
    getLabels() {
      let url = 'https://www.googleapis.com/gmail/v1/users/me/labels';
      axios.get(url, getAuthHeader())
      .then(response => {
        console.log("Labels");
        console.log(response);
        let unreadCount = response.data.messagesUnread;
        eventBus.$emit('UNREAD_COUNT', unreadCount);
      })
    },
    //This is where the magic happens! But it's not exactly what we want yet
    //..we need more conditionals
  
    getLabelsForUnread() {
      let url = 'https://www.googleapis.com/gmail/v1/users/me/labels/CATEGORY_PERSONAL';
      axios.get(url, getAuthHeader())
      .then(response => {
        let unreadCount = response.data.messagesUnread;
        //I want to filter out archived messages' unreads but haven't found an api call for that yet
        let nextURL = '';

        eventBus.$emit('UNREAD_COUNT', unreadCount);
      })
    },
    getListOfMessages(context) {
      let url = `https://www.googleapis.com/gmail/v1/users/me/messages`;

      if (context.getters.loggedIn) {
        axios.get(url, getAuthHeader())
        .then(response => {
          //console.log("TESTS!!!!");
          //console.log(response);
          return response.data.messages;
        })
        .then(messages => {
          messages.forEach(message => {
            context.dispatch("getMessageContent", message.id);

          });
        })
        .catch(error => {
          console.log(error);
        });
      }
    },
    getMessageContent(context, messageId) {
      let url = `https://www.googleapis.com/gmail/v1/users/me/messages/${messageId}`;

      axios.get(url, getAuthHeader())
      .then(response => {
        const { from, to, subject, detailedFrom } = getEmailInfo(
          response.data.payload.headers
        );
        //console.log(response);
        const { labelIds, unread } = resolveLabels(response.data.labelIds);
        const { time, unixTime } = getTimeFormat(response.data.internalDate);
        const snippet = response.data.snippet;
        const id = response.data.id;
        const {body, attachmentIds} = getBody(response.data.payload);
        const message = {
          messageId,
          from,
          detailedFrom,
          to,
          subject,
          snippet,
          body,
          time,
          id,
          labelIds,
          unread,
          unixTime,
          attachmentIds
        };

        context.commit("addMessage", message);
      })
      .catch(error => {
        console.log(error);
      });
    },
    sendMessage(email) {
      //at some point this will work
      let url = "https://www.googleapis.com/gmail/v1/users/me/messages/send"

      axios.send(url, getAuthHeader())
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
    },
    markAsRead(messageId) {
      let url = `https://www.googleapis.com/gmail/v1/users/me/threads/${messageId}/modify`;
      axios.post(url, getAuthHeader())
      .then(response => {
        console.log(response);
      })
    },
    getProfileEmail() {
      let url = `https://www.googleapis.com/gmail/v1/users/me/profile`;
      axios.get(url, getAuthHeader())
      .then(response => {
        //console.log(response.data.emailAddress);
        eventBus.$emit("PROFILE_EMAIL", response.data.emailAddress);
      })
      .catch(error => {
        console.log(error);
      });
    },
    getAttachments(context, message) {
      if (message.attachmentIds.length !== 0) {
        const messageId = message.messageId;
        message.attachmentIds.map(attachmentId => {
          let url = `https://www.googleapis.com/gmail/v1/users/me/messages/${messageId}/attachments/${attachmentId}`;

          axios.get(url, getAuthHeader())
          .then(response => {
            let attachmentData = response.data;
            // context.commit('addMessageWithAttachments', attachmentData); 
            return attachmentData;
          })
          .catch(error => {
            console.log(error);
          });
        })
      }
    }
  }
});
