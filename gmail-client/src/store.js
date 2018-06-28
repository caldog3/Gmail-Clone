import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
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
    messages: [],
    token: "",
    currentUser: null,
    currentUserProfile: null,
    googleAuth: {},
    sessionExpiration: null
  },
  getters: {
    messages: state => state.messages,
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
      state.messages.push(message);
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
    getListOfMessages(context) {
      gapi.client.load('gmail', 'v1').then(() => {
        gapi.client.gmail.users.messages.list({
          'userId': 'me',
          'labelIds': 'INBOX',
          'maxResults': 100
        }).then((response) => {
          console.log(response);
          response.result.messages.forEach(message => {
            context.dispatch("getMessageContent", message.id);
          });
        });
      }).catch((err) => {
        console.log(err);
      });
    },
    getMessageContent(context, messageId) {
        gapi.client.gmail.users.messages.get({
          'userId': 'me',
          'id': messageId,
        }).then((response) => {
          console.log(response.result.payload.headers);
          const { from, to, cc, subject, detailedFrom } = getEmailInfo(
            response.result.payload.headers
          );
          const { labelIds, unread } = resolveLabels(response.result.labelIds);
          const { time, unixTime } = getTimeFormat(response.result.internalDate);
          const snippet = response.result.snippet;
          const id = response.result.id;
          const { body, attachmentIds } = getBody(response.result.payload);
          const message = {
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
            labelIds,
            unread,
            unixTime,
            attachmentIds
          };
          context.commit("addMessage", message);
        }).catch((err) => {
          console.log(err);
        });
    },
  }
});
