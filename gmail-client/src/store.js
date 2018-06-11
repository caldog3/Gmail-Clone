import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import moment from 'moment';
import base64js from 'base64-js';

Vue.use(require("vue-moment"));
Vue.use(Vuex);

const getAuthHeader = () => {
    return { 
        headers: { 
            Authorization: `Bearer ${localStorage.getItem("token")}` 
        }
    };
}

const Base64Decode = (str, encoding = "utf-8") => {
  var bytes = base64js.toByteArray(str);
  return new (TextDecoder || TextDecoderLite)(encoding).decode(bytes);
}

const getTimeFormat = (internalDate) => {
    let unix = moment.unix(internalDate / 1000);
    let currentUnix = moment().unix();
    currentUnix = moment.unix(currentUnix);
    let time;
    if (currentUnix.format("MMM D") === unix.format("MMM D")) {
        time = unix.format("h:mm a");
    }
    else if (currentUnix.format("YYYY") === unix.format("YYYY")) {
        time = unix.format("MMM D");
    }
    else {
        time = unix.format("DD/MM/YY");
    }
    let unixTime = internalDate / 1000;

    return {time, unixTime};
}

const getBody = (payload) => {
    let body;
    if (payload.parts === undefined) {
        body = Base64Decode(payload.body.data);
    }
    else {
        let htmlPart = payload.parts[1];
        if (htmlPart !== undefined) {
            let htmlBodyData = htmlPart.body.data;
            if (htmlBodyData !== undefined) {
                body = Base64Decode(htmlBodyData);
            }
        }
    }
    return body;
}

const resolveLabels = (tempLabelIds) => {
    let labelIds = tempLabelIds;

    if (labelIds.includes("INBOX") && !labelIds.includes("CATEGORY_SOCIAL") && !labelIds.includes("CATEGORY_PROMOTIONS")) {
        labelIds.push("CATEGORY_PRIMARY");
    }

    let unread = true;
    if (labelIds.includes("UNREAD")) {
        unread = false;
    }
    return {labelIds, unread};
}

const getEmailInfo = (headers) => {
    let from, to, subject;
    for (let i = 0; i < headers.length; i++) {
        if (headers[i].name === "From") {
            let tempFrom = headers[i].value;
            
            from = tempFrom.substr(0, tempFrom.indexOf('<'));
            if (from === "") {
                from = tempFrom;
            }
        }
        else if (headers[i].name === "Delivered-To") {
            to = headers[i].value;
        }
        else if (headers[i].name === "Subject") {
            subject = headers[i].value;
        }
    }
    return {from, to, subject};
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
        axios
          .get(url, getAuthHeader())
          .then(response => {
            return response.data.messages;
          })
          .then(messages => {
            messages.forEach(message => {
              context.dispatch("getMessageContent", message.id);
            });
          })
        //   .then(() => {
        //     let messagesFinal = context.getters.messages;
        //     messagesFinal.slice().sort((firstMessage, secondMessage) => {
        //         return secondMessage.unixTime - firstMessage.unixTime;
        //     });
        //     if(JSON.stringify(context.getters.messages) === JSON.stringify(messagesFinal)){
        //         console.log("Sorting didn't happen");
        //         return;
        //     }
        //     context.commit("setMessagesArray", messagesFinal);
        //   })
          .catch(error => {
            console.log(error);
          });
      }
    },
    getMessageContent(context, id) {
      let url = `https://www.googleapis.com/gmail/v1/users/me/messages/${id}`;

      axios
        .get(url, getAuthHeader())
        .then(response => {
          const { from, to, subject } = getEmailInfo(
            response.data.payload.headers
          );

          const { labelIds, unread } = resolveLabels(response.data.labelIds);
          const { time, unixTime } = getTimeFormat(response.data.internalDate);
          const snippet = response.data.snippet;
          const id = response.data.id;
          const body = getBody(response.data.payload);

          const message = {
            from,
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
    }
  }
});