import Vue from 'vue';
import Vuex from 'vuex';
import eventBus from './event_bus'
import { initializeGoogleClient } from './main';
import { getAttachment } from './store-utility-files/gmail-api-calls';
import { getBody, getMessage } from './store-utility-files/email';
import parse from 'parse-gmail-email';

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
    refreshArray: [],
    draftMessage: "", //don't think this is used anymore
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
        //add a check for duplicate messageIds...
        var notDuplicate = true;
        for (var i =0; i < threadMessages[threadId].length; ++i) {
          if (message.messageId === threadMessages[threadId][i].messageId) {
            notDuplicate = false;
          }
        }
        if (notDuplicate) {
          threadMessages[threadId].push(message);
        }
      }
    },
    addLabelId(state, labelId) {
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
      // console.log("In addThreadId/ Payload: ", payload);
      //SETHERE: need to catch a temp array here
      Vue.set(state.threadMessages, threadId, []);
      if (labelId === "refreshArray") {
        // Vue.set(state.refreshArray, threadId, []);
        var labelIdArray = state.refreshArray;
      }
      else {
        var labelIdArray = state.labelMessages[labelId];
      }

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
      Vue.set(state.threadMessages, threadId, messages);
    },
    addAttachmentId(state, payload) {
      Vue.set(state.attachments, payload.attachmentId, {
        messageId: payload.messageId,
        mimeType: payload.mimeType,
        data: null
      });
    },
    setAttachmentData(state, payload) {
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
      // console.log("query checkpoint: 1")
      let labelId = "SEARCH";
      context.commit("addLabelId", labelId);
      gapi.client.load('gmail', 'v1').then(() => {
        gapi.client.gmail.users.threads.list({
          'userId': 'me',
          'maxResults': 50,
          'q': query,
        }).then((response) => {
          // console.log("query checkpoint 2");
          console.log(response);
          if (response.result.threads !== undefined) {
            response.result.threads.forEach(thread => {
              // console.log("query checkpoint 3");
              let threadId = thread.id;
              //addThreadId labelId will be "refreshArray" if refreshing
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
              //addThreadId labelId will be "refreshArray" if refreshing
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
    async getListOfMessages(context, payload) { //payload.labelId / payload.refresh
      //creates the folder if it hasn't been created
      console.log("Payload: ", payload);
      var labelId = payload.label;
      var refresh = payload.refresh;
      console.log("refresh Checkpoint 2:", refresh);
      context.commit("addLabelId", labelId);
      const response = await gapi.client.load('gmail', 'v1')
        .then(async () => {
          return await gapi.client.gmail.users.threads.list({
            'userId': 'me',
            'maxResults': 50,
            'q': `category: ${labelId}`
          });
        });

      const getThreads = async (response) => {
        const nextPageToken = response.result.nextPageToken;
        context.commit("addLabelNextPageToken", { labelId, nextPageToken });
        if (response.result.threads !== undefined) {
          const dataPromise = response.result.threads
            .map(async thread => {
              const threadId = thread.id;
              //addThreadId labelId will be "RefreshArray" if refreshing
              if (refresh === true) {
                console.log("refresh load");
                labelId = "refreshArray";
                context.commit("addThreadId", { threadId, labelId });
              }
              else {
                context.commit("addThreadId", { threadId, labelId });
              }
              // context.commit("addThreadId", { threadId, labelId });
              context.commit("initializeThreadTime", { threadId });

            return await context.dispatch("getThreadData", { threadId, labelId });
          });
          return await Promise.all(dataPromise);
        }
      };
      const threadPromises = await getThreads(response);
      if (refresh === true) {
        eventBus.$emit("REFRESH_RESOLVE");
      }

      return threadPromises;
    },
    //not sure if we even use this function anymore
    getAllMessages(context, labelId) {
      gapi.client.load('gmail', 'v1').then(() => {
        gapi.client.gmail.users.threads.list({
          'userId': 'me',
          'maxResults': 50,
        }).then((response) => {
          if (response.result.threads !== undefined) {
            response.result.threads.forEach(thread => {
              const threadId = thread.id;

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
    getPageListOfMessages(context, labelId) {
      this.state.labelLastPageTokens.push(this.state.labelNextPageTokens[labelId]);

      gapi.client.gmail.users.threads.list({
        'userId': 'me',
        'maxResults': 50,
        'q': `category: ${labelId}`,
        'pageToken': this.state.labelNextPageTokens[labelId]
      }).then((response) => {
        const nextPageToken = response.result.nextPageToken;
        context.commit("addLabelNextPageToken", { labelId, nextPageToken });

        console.log(this.state.labelLastPageTokens);
        console.log(this.state.labelNextPageTokens);

        if (response.result.threads !== undefined) {
          response.result.threads.forEach(thread => {
            const threadId = thread.id;
            //addThreadId labelId will be "refreshArray" if refreshing
            //......But might reevaluate method for next page gathering
            context.commit("addThreadId", { threadId, labelId });
            context.commit("initializeThreadTime", { threadId });

            context.dispatch("getThreadData", { threadId, labelId });
          });
        }
        this.state.currentPage++;
      }).catch((err) => {
        console.log(err);
      });
    },
    // also a work in progress
    getLastPageListOfMessages(context, labelId) {
      const page = this.state.currentPage;
      
      gapi.client.gmail.users.threads.list({
        'userId': 'me',
        'maxResults': 50,
        'q': `category: ${labelId}`,
        'pageToken': this.state.labelLastPageTokens[page - 1],
      }).then((response) => {
        const nextPageToken = response.result.nextPageToken;
        context.commit("addLabelNextPageToken", { labelId, nextPageToken });

        // console.log("LastPage Tokens");
        // console.log(this.state.labelLastPageTokens);
        // console.log("NEXT PAGE TOKEN AFTER");
        // console.log(this.state.labelNextPageTokens);
        if (response.result.threads !== undefined) {
          response.result.threads.forEach(thread => {
            let threadId = thread.id;
            //addThreadId labelId will be "refreshArray" if refreshing
            //......But might reevaluate method for last page gathering
            context.commit("addThreadId", { threadId, labelId });
            context.commit("initializeThreadTime", { threadId });

            context.dispatch("getThreadData", { threadId, labelId });
          });
        }
        this.state.currentPage--;
      }).catch((err) => {
        console.log(err);
      });
    },
    async getThreadData(context, payload) {
      const threadId = payload.threadId;
      const labelId = payload.labelId;
      
      return await gapi.client.gmail.users.threads.get({
        'userId': 'me',
        'id': threadId,
      }).then(async (response) => {
       const dataPromise = response.result.messages.map(async message => {
          let messageId = message.id;

          return await context.dispatch("getMessageContent", { labelId, messageId, threadId });
        });
        
        return await Promise.all(dataPromise);
      }).catch((err) => {
        console.log(err);
      });
    },
    getMessageContent(context, payload) {
      const messageId = payload.messageId;
      const threadId = payload.threadId;
      const labelId = payload.labelId;
      
      return new Promise((resolve) => {
        gapi.client.gmail.users.messages.get({ 'userId': 'me', 'id': messageId })
        .then((response) => {
          const result = response.result;
          let parsedMessage, bodyAndAttachments;
          if (result.payload.body.attachmentId !== undefined && result.payload.body.data === undefined) {
            console.log("In getMessageContent().\nUnfixable email edge-case:----", result);
          }
          if (result.payload.mimeType.includes('text')){
            try {
              bodyAndAttachments = getBody(result.payload);
            } catch (exception) {
              console.log("Result:- ", result)
              console.log("getMessageContent Exception:- ")
              console.log(exception)
            }
          }
          else{
            try {
              parse(result, (err, data) => {
                if (err) {
                  throw (err);
                } else {
                  parsedMessage = data;
                  if (parsedMessage.message === undefined) {
                    bodyAndAttachments = getBody(result.payload);
                  }
                }
              })
            } catch (exception) {
              // console.log("CALLBACK ERROR", exception);
              bodyAndAttachments = getBody(result.payload);
            }
          }

          const message = getMessage(parsedMessage, bodyAndAttachments, {
            labelId,
            threadId,
            result
          });

          context.commit("setThreadTime", {
            unixTime: message.unixTime,
            threadId
          });

          context.commit("addMessage", message);

          return {
            messageId: message.messageId,
            attachmentIds: message.attachmentIds
          };
        }).then((payload) => {
          if (payload.attachmentIds !== undefined) {
            if (payload.attachmentIds.length >= 1) {
              payload.attachmentIds.forEach((attachmentId) => {
                if (attachmentId !== undefined && attachmentId.attachmentId !== undefined) {
                  context.commit("addAttachmentId", {
                    attachmentId: attachmentId.attachmentId,
                    mimeType: attachmentId.mimeType,
                    messageId: payload.messageId,
                    filename: attachmentId.filename
                  });
                }
              });
            }
          }
        }).then(() => resolve()).catch((err) => {
          console.log(err);
          resolve();
        })
      });
    },
    getAttachments(context) {
      const attachments = context.getters.getAttachments;
      const attachmentIds = Object.keys(attachments);
      
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