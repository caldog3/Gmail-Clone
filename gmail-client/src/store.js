import Vue from 'vue';
import Vuex from 'vuex';
import { initializeGoogleClient } from './main';
import {
  getTimeFormat,
  getBody, 
  resolveLabels, 
  getEmailInfo
} from './store-utility-files/email';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    labelMessages: {},
    threadMessages: {},
    latestThreadMessageTime: {},
    labelNextPageTokens: {},
    token: "",
    currentUser: null,
    currentUserProfile: null,
    googleAuth: {},
    sessionExpiration: null
  },
  getters: {
    getLabelMessages: state => state.labelMessages,
    getThreadMessages: state => state.threadMessages,
    getLabelNextPageTokens: state => state.labelNextPageTokens,
    getLatestThreadMessageTime: state => state.latestThreadMessageTime,

    googleAuth: state => state.googleAuth,
    getCurrentUserProfile: state => state.currentUserProfile,
    getCurrentUser: state => state.currentUser,
    getSessionExpiration: state => state.sessionExpiration,
    getToken: state => state.token,
    loggedIn: state => {
      if (state.token === "") {
        return false;
      }
      return true;
    },
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
      let threadId = message.threadId;
      const threadMessages = state.threadMessages;

      if (threadMessages[threadId] !== undefined) {
        threadMessages[threadId].push(message);
      }
    },
    addLabelId(state, labelId) {
      console.log("LabelMessages: ", labelId);
      if (state.labelMessages[labelId] === undefined){
        Vue.set(state.labelMessages, labelId, []);
      }
    },
    addLabelNextPageToken(state, payload) {
      Vue.set(state.labelNextPageTokens, payload.labelId, payload.nextPageToken);
    },
    addThreadId(state, payload) {
      const labelId = payload.labelId;
      const threadId = payload.threadId;

      Vue.set(state.threadMessages, threadId, []);
      const labelIdArray = state.labelMessages[labelId];

      if (labelIdArray !== undefined){
        if (labelIdArray.threadId === undefined){
          labelIdArray.push(threadId);
        }
      }
    },
    initializeThreadTime(state, payload) {
      const threadId = payload.threadId;
      Vue.set(state.latestThreadMessageTime, threadId, 0);
    },
    setThreadTime(state, payload) {
      const threadId = payload.threadId;
      const newUnixTime = payload.unixTime;

      if (newUnixTime > state.latestThreadMessageTime[threadId]){
        Vue.set(state.latestThreadMessageTime, threadId, newUnixTime);
      }
    },
    setThreadMessages(state, messages) {
      // console.log("WHATS GOING ON:")
      // console.log(messages);
      Vue.set(state.threadMessages, threadId, messages);

    },
    currentUser(state, payload) {
      state.currentUser = payload;
    },
    currentUserProfile(state, payload) {
      state.currentUserProfile = payload;
    },
    googleAuth(state, payload) {
      state.googleAuth = payload;
    },
    sessionExpiration(state, payload) {
      state.sessionExpiration = payload;
    },
    signOut(state) {
      if (state.googleAuth.isSignedIn.get()){
        state.googleAuth.signOut();
      }

      state.messages = [],
      state.currentUser = null
      state.currentUserProfile = null
      state.googleAuth = {}
      state.sessionExpiration = null

      //Initialize Google Api Client for next sign-in
      initializeGoogleClient();
    }
  },
  actions: {
    setToken(context, token) {
      context.commit("setToken", token);
    },
    signOut(context) {
      context.commit("signOut");
      context.commit("setToken", "");
    },
    initialize(context) {
      let token = localStorage.getItem("token");
      if (token) {
        context.commit("setToken", token);
      }
    },  
    
    getFolderListOfMessages(context, labelId) {
      context.commit("addLabelId", labelId);
      gapi.client.load('gmail', 'v1').then(() => {
        console.log("Its at the DRAFTS");
        gapi.client.gmail.users.threads.list({
          'userId': 'me',
          'labelIds': labelId,
          'maxResults': 10,
        }).then((response) => {
          console.log("Draft test" + response);
          if (response.result.threads !== undefined) {
            response.result.threads.forEach(thread => {
              let threadId = thread.id;
              context.commit("addThreadId", { threadId, labelId });
              context.commit("initializeThreadTime", { threadId });

              context.dispatch("getThreadData", { threadId, labelId });
            });
          }
        });  
      }).catch((err) => {
        console.log(err);
      });
    },
    getListOfMessages(context, labelId) {
      let label = labelId;
      // if (labelId === 'PRIMARY') {
      //   label = "PERSONAL";
      // }
      context.commit("addLabelId", labelId);
      gapi.client.load('gmail', 'v1').then(() => {
        gapi.client.gmail.users.threads.list({
          'userId': 'me',
          // 'labelIds': "CATEGORY_" + label,
          'maxResults': 50,
          'q': `category: ${label}`,
        }).then((response) => {
          let nextPageToken = response.result.nextPageToken;
          context.commit("addLabelNextPageToken", { labelId, nextPageToken });

          if (response.result.threads !== undefined) {
            response.result.threads.forEach(thread => {
              let threadId = thread.id;

              context.commit("addThreadId", { threadId, labelId });
              context.commit("initializeThreadTime", { threadId });
              
              context.dispatch("getThreadData", { threadId, labelId });
            });
          }          
        });
      }).catch((err) => {
        console.log(err);
      });
    },
    getThreadData(context, payload) {
      const threadId = payload.threadId;
      const labelId = payload.labelId;
      
      gapi.client.gmail.users.threads.get({
        'userId': 'me',
        'id': threadId,
      }).then((response) => {
        response.result.messages.forEach(message => {
          let messageId = message.id;
          context.dispatch("getMessageContent", { labelId, messageId, threadId });
        });
      }).catch((err) => {
        console.log(err);
      });
    },
    getMessageContent(context, payload) {
      const threadId = payload.threadId;
      const messageId = payload.messageId;
      const labelId = payload.labelId;

      gapi.client.gmail.users.messages.get({
        'userId': 'me',
        'id': messageId,
      }).then((response) => {
        const { from, to, cc, subject, detailedFrom } = getEmailInfo(
          response.result.payload.headers
        );
        
        const { time, unixTime } = getTimeFormat(response.result.internalDate);
        context.commit("setThreadTime", { threadId, unixTime });

        const { body, attachmentIds } = getBody(response.result.payload);
        const { unread, starred } = resolveLabels(response.result.labelIds);
        const snippet = response.result.snippet;
        const id = response.result.id;
        const message = {
          threadId,
          messageId,
          from,
          detailedFrom,
          to,
          cc,
          subject,
          snippet,
          body,
          time,
          id,
          labelId,
          unread,
          starred,
          unixTime,
          attachmentIds
        };
        context.commit("addMessage", message);
      }).catch((err) => {
        // console.log("but first: " + from);
        console.log(err);
      });
    },
  }
});
