import { getParsedMessageAndBody, getMessage } from './../store-utility-files/email';
import { 
  getAttachment, 
  searchThreads, 
  getLabelMessages,
  getDraftListOfIds, 
  getNextPageThreads,
  getMessages,
  getMessageContent,
  getThreads
 } from './../store-utility-files/gmail-api-calls';
import eventBus from '../event_bus';
import { initializeGoogleClient } from '../main';
import { fireGetMessagesByLabel } from '../firebase/firebase';

export default {
    setToken({ commit }, token) {
      commit("setToken", token);
    },
    signOut({ commit }) {
      commit("signOut");
      commit("clearStore");
      commit("setToken", "");
      initializeGoogleClient();
      eventBus.$emit("RESET_APP_STATE");
    },
    initialize({ commit }) {
      let token = localStorage.getItem("token");
      if (token) {
        commit("setToken", token);
      }
    },
    async getQueryListOfMessages({ commit, dispatch }, query) {
      const labelId = "SEARCH";
      commit("addLabelId", labelId);
      
      const threads = await searchThreads(query);
      dispatch("getThreads", { threads, labelId });
    },
    async getFolderListOfMessages({ commit, dispatch }, labelId) {
      commit("addLabelId", labelId);
      
      fireGetMessagesByLabel(labelId);
      const threads = await getLabelMessages(labelId);
      dispatch("getThreads", { threads, labelId });
    },
    async getListOfDraftIds({ commit }) {
      const data = await getDraftListOfIds();
      commit("setDraftIdsArray", data);
      
      const threads = await getLabelMessages(labelId);
      dispatch("getThreads", { threads, labelId });
    },
    async getThreads({ commit, dispatch }, { threads, labelId }) {
      if (threads !== undefined) {
        const dataPromise = threads.map(async (thread) => {
          const threadId = thread.id;

          commit("addThreadId", { threadId, labelId });
          commit("initializeThreadTime", { threadId });

          return await dispatch("getThreadData", { threadId, labelId });
        });
        return await Promise.all(dataPromise);
      }
    },
    async getListOfMessages({ commit, dispatch }, labelId) {
      commit("addLabelId", labelId);
      const { threads, nextPageToken } = await getThreads(labelId);

      commit("addLabelNextPageToken", { labelId, nextPageToken });

      return await dispatch("getThreads", { threads, labelId });
    },
    async getPageListOfMessages({ commit, dispatch }, labelId) {
      const token = this.state.labelNextPageTokens[labelId];
      this.state.labelLastPageTokens.push(token);
      
      const { threads, nextPageToken } = await getNextPageThreads({ labelId, token });

      commit("addLabelNextPageToken", { labelId, nextPageToken });
      dispatch("getThreads", { threads, labelId });

      this.state.currentPage++;
    },
    async getLastPageListOfMessages({ commit, dispatch }, labelId) {
      const page = this.state.currentPage;
      const token = this.state.labelLastPageTokens[page - 1];

      const { threads, nextPageToken } = await getNextPageThreads({ labelId, token });

      commit("addLabelNextPageToken", { labelId, nextPageToken });
      dispatch("getThreads", { threads, labelId });

      this.state.currentPage--;
    },
    async getThreadData({ dispatch }, { threadId, labelId }) {
      const messages = await getMessages(threadId);
      const dataPromise = messages.map(async (message) => {
        let messageId = message.id;
        return await dispatch("getMessageContent", { labelId, messageId, threadId });
      });
      
      return await Promise.all(dataPromise);
    },
    addAttachmentIds({ commit }, { messageId, attachmentIds }){
      if (attachmentIds !== undefined && attachmentIds.length >= 1) {
        attachmentIds.forEach((attachmentIdObject) => {
          let { attachmentId, mimeType, filename } = attachmentIdObject;
          if (attachmentIdObject !== undefined && attachmentId !== undefined) {
            commit("addAttachmentId", { messageId, attachmentId, mimeType, filename });
          }
        });
      }
    },
    async getMessageContent({ commit, dispatch }, { messageId, threadId, labelId }) {
      const result = await getMessageContent(messageId);
      const { parsedMessage, bodyAndAttachments } = getParsedMessageAndBody(result);

      const message = getMessage(parsedMessage, bodyAndAttachments, { labelId, threadId, result });
      commit("addMessage", message);

      const { unixTime, attachmentIds } = message;
      commit("setThreadTime", { unixTime, threadId });

      dispatch("addAttachmentIds", { messageId, attachmentIds });
    },
    getAttachments({ getters, commit }, attachmentIdsObjectArray) {
      if (attachmentIdsObjectArray !== undefined){
        const attachments = getters.getAttachments;
        attachmentIdsObjectArray.forEach((attachmentIdObject)=>{
          const { attachmentId } = attachmentIdObject;
          const attachment = attachments[attachmentId];
          
          if (attachment !== undefined){
            const messageId = attachment.messageId;
  
            getAttachment({ attachmentId, messageId })
            .then((data) => {
              commit("setAttachmentData", { attachmentId, data });
            });
          }        
        });
      }
    },
  }