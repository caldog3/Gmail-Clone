import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import {
  Base64Decode,
  getTimeFormat,
  getBody, 
  resolveLabels, 
  getEmailInfo
} from './store-utility-files/email';

Vue.use(require("vue-moment"));
Vue.use(Vuex);

const getAuthHeader = () => {
  return { 
    headers: { 
        Authorization: `Bearer ${localStorage.getItem("token")}` 
    }
};
}

export default new Vuex.Store({
  state: {
    messages: [],
    token: ""
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
    setMessagesArray(state, newMessageArray) {
      state.messages = newMessageArray;
    }
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
    getListOfMessages(context) {
      let url = `https://www.googleapis.com/gmail/v1/users/me/messages`;
      console.log(context.getters.loggedIn);
      if (context.getters.loggedIn) {
        axios.get(url, getAuthHeader())
        .then(response => {
          return response.data.messages;
        })
        .then(messages => {
          messages.forEach(message => {
            context.dispatch("getMessageContent", message.id);
          });
        })
        // .then(() => {
        //   let messagesFinal = context.getters.messages;
        //   messagesFinal.slice().sort((firstMessage, secondMessage) => {
        //       return secondMessage.unixTime - firstMessage.unixTime;
        //   });
        //   if(JSON.stringify(context.getters.messages) === JSON.stringify(messagesFinal)){
        //       console.log("Sorting didn't happen");
        //       return;
        //   }
        //   context.commit("setMessagesArray", messagesFinal);
        // })
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
        console.log(response);
        const { labelIds, unread } = resolveLabels(response.data.labelIds);
        const { time, unixTime } = getTimeFormat(response.data.internalDate);
        const snippet = response.data.snippet;
        const id = response.data.id;
        const {body, attachmentId} = getBody(response.data.payload);

        if(attachmentId !== undefined){
          context.dispatch('getMessageAttachment', { 
            messageId: messageId, 
            attachmentId: attachmentId 
          });
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
  }
});