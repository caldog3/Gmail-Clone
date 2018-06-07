import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import moment from 'moment';
import base64 from "base-64";

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
        token: '',
    },
    getters: {
        user: state => state.user,
        messages: state => state.messages,
        getToken: state => state.token,
        loggedIn: state => {
            if (state.token === ''){
                return false;
            }    
            return true;
        }
    },
    mutations: {
        setToken(state, token) {
            state.token = token;
            if (token === ''){
                localStorage.removeItem("token");
            }
            else{
                localStorage.setItem("token", token);
            } 
        },
        addMessage(state, message) {
            state.messages.push(message);
        },
    },
    actions: {
        setToken(context, token) {
            context.commit('setToken', token);
        },
        signOut(context) {
            context.commit('setToken', '');
        },
        initialize(context) {
            let token = localStorage.getItem('token');
            if (token) {
                context.commit("setToken", token);
            }
        },
        initialize(context) {
            let token = localStorage.getItem('token');
            if (token) {
                context.commit("setToken", token);
            }
        },
        getListOfMessages(context) {
            let url = `https://www.googleapis.com/gmail/v1/users/me/messages`;

            axios.get(url, getAuthHeader())
            .then((response) => {
                return response.data.messages;
            }).then((messages) => {
                messages.forEach(message => {
                   context.dispatch('getMessageContent', message.id);
                });
            }).catch((error) => {
                console.log(error);
            });
        },
        getMessageContent(context, id) {
            let url = `https://www.googleapis.com/gmail/v1/users/me/messages/${id}`;

            axios.get(url, getAuthHeader())
            .then((response) => {
                    console.log("JSON");
                    console.log(response.data.labelIds);
                    let headers = response.data.payload.headers;
                    let from, to, subject;
                    for (let i = 0; i < headers.length; i++) {
                        if (headers[i].name === "From") {
                            from = headers[i].value;
                        }
                        else if (headers[i].name === "Delivered-To") {
                            to = headers[i].value;
                        }
                        else if (headers[i].name === "Subject") {
                            subject = headers[i].value;
                        }
                    }
                    let unix = moment.unix(response.data.internalDate / 1000);
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

                    let snippet = response.data.snippet;
                    let id = response.data.id;
                    let body;
                    if (response.data.payload.parts === undefined) {
                        body = atob(response.data.payload.body.data.replace(/-/g, '+').replace(/_/g, '/'));
                    }
                    else {
                        body = atob(response.data.payload.parts[1].body.data.replace(/-/g, '+').replace(/_/g, '/'));
                    }

                    var conciseFrom = from.substr(0, from.indexOf('<'));
                    if (conciseFrom === "") {
                        conciseFrom = from;
                    }

                    let labelIds = response.data.labelIds;

                    if (labelIds.includes("INBOX") && !labelIds.includes("CATEGORY_SOCIAL") && !labelIds.includes("CATEGORY_PROMOTIONS")){
                        labelIds.push("CATEGORY_PRIMARY");
                    }

                    let message = { from, conciseFrom, to, subject, snippet, body, time, id, labelIds };
                    context.commit('addMessage', message);
                }).catch((error) => {
                    console.log(error);
                });
        }        
    }
});