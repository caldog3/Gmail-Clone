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

Vue.use(require("vue-moment"));
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
      let url = 'https://www.googleapis.com/gmail/v1/users/me/labels/INBOX';
      axios.get(url, getAuthHeader())
      .then(response => {
        let unreadCount = response.data.threadsUnread;
        console.log("INBOX UNREAD TOTAL");
        console.log(unreadCount);
        //I want to filter out archived messages' unreads but haven't found an api call for that yet
        let socialURL = 'https://www.googleapis.com/gmail/v1/users/me/labels/CATEGORY_SOCIAL';
        axios.get(socialURL, getAuthHeader())
        .then(response => {
          let socialUnread = response.data.threadsUnread;
          console.log("SOCIAL UNREAD");
          console.log(socialUnread);
          unreadCount -= socialUnread;
          let promoURL = 'https://www.googleapis.com/gmail/v1/users/me/labels/CATEGORY_PROMOTIONS';
          axios.get(promoURL, getAuthHeader())
          .then(response => {
            let promoUnread = response.data.threadsUnread;
            console.log("PROMO UNREAD");
            console.log(promoUnread);
            unreadCount -= promoUnread;
            console.log("UNREAD COUNT");
            console.log(unreadCount);
            eventBus.$emit('UNREAD_COUNT', unreadCount);
          })
        })

      })
    },
    getListOfDrafts() {
      let url = "https://www.googleapis.com/gmail/v1/users/me/drafts";
      axios.get(url, getAuthHeader())
      .then(response => {
        console.log("DRAFTS OBJ");
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
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
        const {body, attachmentId} = getBody(response.data.payload);

        if(attachmentId !== undefined){
          // context.dispatch('getMessageAttachment', { 
          //   messageId: messageId, 
          //   attachmentId: attachmentId 
          // });
        }
        const message = {
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
          unixTime
        };

        context.commit("addMessage", message);
      })
      .catch(error => {
        console.log(error);
      });
    },
    getMessageAttachment(context, payload) {
      let url = `https://www.googleapis.com/gmail/v1/users/me/messages/${payload.messageId}/attachments/${payload.attachmentId}`;
      
      axios.get(url, getAuthHeader())
        .then(response => {
          console.log(response);
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
    }
  }
});