
import Vue from 'vue';

export default {
    setToken(state, token) {
        state.token = token;
        if (token === "") {
          localStorage.removeItem("token");
        } else {
          localStorage.setItem("token", token);
        }
      },
      addMessage(state, message) {
        const threadMessages = state.threadMessages;
        const thread = threadMessages[message.threadId];
  
        if (thread !== undefined) {
          const duplcateMessages = thread.filter((threadMessage)=>{
            return message.messageId === threadMessage.messageId;
          });
          
          if (duplcateMessages.length === 0) {
            thread.push(message);
          }
        }
      },
      addLabelId(state, labelId) {
        Vue.set(state.labelMessages, labelId, []);
      },
      addLabelNextPageToken(state, { labelId, nextPageToken }) {
        Vue.set(state.labelNextPageTokens, labelId, nextPageToken);
      },
      addThreadId(state, { labelId, threadId }) {
        Vue.set(state.threadMessages, threadId, []);
        const labelIdArray = state.labelMessages[labelId];
  
        if (labelIdArray !== undefined && !labelIdArray.includes(threadId)){
          labelIdArray.push(threadId);
        }
      },
      initializeThreadTime(state, { threadId }) {
        Vue.set(state.latestThreadMessageTime, threadId, 0);
      },
      setThreadTime(state, { threadId, unixTime }) {
        if (unixTime > state.latestThreadMessageTime[threadId]){
          Vue.set(state.latestThreadMessageTime, threadId, unixTime);
        }
      },
      setThreadMessages(state, messages) {
        Vue.set(state.threadMessages, threadId, messages);
      },
      addAttachmentId(state, { attachmentId, messageId, mimeType }) {
        Vue.set(state.attachments, attachmentId, {
          messageId,
          mimeType,
          data: null
        });
      },
      setAttachmentData(state, { attachmentId, data }) {
        state.attachments[attachmentId].data = data;
      },
      setDraftIdsArray(state, data) {
        state.draftIdsArray = data;
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
      },
      clearStore(state) {
        const initialState = {
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
          draftIdsArray: [],
        }
        
        for (let property in state){
          Vue.set(state, property, initialState[property]);
        }
      }
}