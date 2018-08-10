import Vue from 'vue';
import Vuex from 'vuex';
import { initializeGoogleClient } from './main';
import { getAttachment } from './store-utility-files/gmail-api-calls';
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
    labelLastPageTokens: [],
    token: "",
    currentUser: null,
    currentUserProfile: null,
    googleAuth: {},
    sessionExpiration: null,
    currentPage: 1,
    currentFolder: "INBOX",
    attachments: {},
    viewFolder: "Inbox",
    totalMessages: "0",
  },
  getters: {
    getLabelMessages: state => state.labelMessages,
    getThreadMessages: state => state.threadMessages,
    getLabelNextPageTokens: state => state.labelNextPageTokens,
    getLatestThreadMessageTime: state => state.latestThreadMessageTime,
    getAttachments: state => state.attachments,
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
    addAttachmentId(state, payload) {
      // console.log(payload);
      Vue.set(state.attachments, payload.attachmentId, {
        messageId: payload.messageId,
        mimeType: payload.mimeType,
        data: null
      });
    },
    setAttachmentData(state, payload) {
      // console.log(payload);
      state.attachments[payload.attachmentId].data = payload.data;
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
    unreadEmails(folder) {
      gapi.client.load('gmail', 'v1').then(() => {
        gapi.client.gmail.users.labels.get({
        'userId': 'me',
        'id': folder,
        // 'q': 'category:primary',
        }).then((response) => {
          console.log(response);
          let unreadCount = response.result.threadsUnread;
          return unreadCount;
        });
      });
    },
    getQueryListOfMessages(context, query) {
      console.log("query checkpoint: 1")
      let labelId = "SEARCH";
      context.commit("addLabelId", labelId);
      gapi.client.load('gmail', 'v1').then(() => {
        gapi.client.gmail.users.threads.list({
          'userId': 'me',
          'maxResults': 5,
          'q': query,
        }).then((response) => {
          console.log("query checkpoint 2");
          console.log(response);
          if (response.result.threads !== undefined) {
            response.result.threads.forEach(thread => {
              console.log("query checkpoint 3");
              let threadId = thread.id;
              context.commit("addThreadId", { threadId, labelId });
              context.commit("initializeThreadTime", { threadId });
              context.dispatch("getThreadData", { threadId, labelId });
            });
          }
        })
      })
    },
    getFolderListOfMessages(context, labelId) {
      context.commit("addLabelId", labelId);
      gapi.client.load('gmail', 'v1').then(() => {
        gapi.client.gmail.users.threads.list({
          'userId': 'me',
          'labelIds': labelId,
          'maxResults': 50,
        }).then((response) => {
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
    //working on this
    getPageListOfMessages(context, labelId) {
      //this doesn't really work....
      this.state.labelLastPageTokens.push(this.state.labelNextPageTokens[labelId]);
      let label = labelId;
      context.commit("addLabelId", labelId);
      gapi.client.load('gmail', 'v1').then(() => {
        gapi.client.gmail.users.threads.list({
          'userId': 'me',
          'maxResults': 50,
          'q': `category: ${label}`,
          'pageToken': this.state.labelNextPageTokens[labelId]
        }).then((response) => {
          
          let nextPageToken = response.result.nextPageToken;
          context.commit("addLabelNextPageToken", { labelId, nextPageToken });
          console.log(this.state.labelLastPageTokens);
          console.log(this.state.labelNextPageTokens);
          if (response.result.threads !== undefined) {
            response.result.threads.forEach(thread => {
              let threadId = thread.id;

              context.commit("addThreadId", { threadId, labelId });
              context.commit("initializeThreadTime", { threadId });
              
              context.dispatch("getThreadData", { threadId, labelId });
            });
          }
          this.state.currentPage += 1;          
        });
      }).catch((err) => {
        console.log(err);
      });
    },
    // also a work in progress
    getLastPageListOfMessages(context, labelId) {
      let page = this.state.currentPage;
      let label = labelId;
      context.commit("addLabelId", labelId);
      gapi.client.load('gmail', 'v1').then(() => {
        gapi.client.gmail.users.threads.list({
          'userId': 'me',
          'maxResults': 50,
          'q': `category: ${label}`,
          'pageToken': this.state.labelLastPageTokens[page - 1],
        }).then((response) => {
          let nextPageToken = response.result.nextPageToken;
          context.commit("addLabelNextPageToken", { labelId, nextPageToken });
          // console.log("LastPage Tokens");
          // console.log(this.state.labelLastPageTokens);
          // console.log("NEXT PAGE TOKEN AFTER");
          // console.log(this.state.labelNextPageTokens);
          if (response.result.threads !== undefined) {
            response.result.threads.forEach(thread => {
              let threadId = thread.id;

              context.commit("addThreadId", { threadId, labelId });
              context.commit("initializeThreadTime", { threadId });
              
              context.dispatch("getThreadData", { threadId, labelId });
            });
          }    
          this.state.currentPage -= 1;      
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
        const { from, to, conciseTo, cc, subject, detailedFrom } = getEmailInfo(
          response.result.payload.headers
        );
        
        const { time, unixTime } = getTimeFormat(response.result.internalDate);
        context.commit("setThreadTime", { threadId, unixTime });

        const { body, attachmentIds } = getBody(response.result.payload);
        //sanitize/split body method
        const { unread, starred } = resolveLabels(response.result.labelIds);
        const snippet = response.result.snippet;
        const id = response.result.id;
        const message = {
          threadId,
          messageId,
          from,
          detailedFrom,
          to,
          conciseTo,
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

        return { messageId, attachmentIds };
      }).then((payload) => {
        if (payload.attachmentIds.length >= 1) {
          payload.attachmentIds.forEach((attachmentId) => {
            context.commit("addAttachmentId", {
              attachmentId: attachmentId.attachmentId,
              mimeType: attachmentId.mimeType,
              messageId: payload.messageId              
            });
          });
        }
      }).catch((err) => {
        // console.log("but first: " + from);
        console.log(err);
      });
    },
    getAttachments(context) {
      const attachments = context.getters.getAttachments;
      const attachmentIds = Object.keys(attachments);
      console.log("Attachments from getter", attachments);
      
      for (const attachmentId of attachmentIds) {
        const messageId = attachments[attachmentId].messageId;

        getAttachment({ attachmentId, messageId })
          .then((attachmentData) => {
            context.commit("setAttachmentData", {
              attachmentId: attachmentId,
              data: attachmentData
            });
          }
        );
      }
    },
  }
});
