// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from "./store";
//Register QuillEditor
import 'quill/dist/quill.snow.css';
//vGallery Import
import vGallery from 'v-gallery';
Vue.use(vGallery);
//Bootstrap Import
import BootstrapVue from "bootstrap-vue/dist/bootstrap-vue.esm"
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
Vue.use(BootstrapVue);
//Font Awesome Icons
import {
  library,
  dom
} from '@fortawesome/fontawesome-svg-core'

import {
  faBars,
  faSearch,
  faAngleDown,
  faInbox,
  faStar,
  faClock,
  faArrowRight,
  faPaperPlane,
  faFile,
  faTrash,
  faExclamationCircle,
  faArchive,
  faEnvelopeOpen,
  faArrowCircleRight,
  faTag,
  faRetweet,
  faSquare,
  faCheckSquare,
  faArrowLeft,
  faEllipsisV,
  faReply,
  faLongArrowAltRight,
  faReplyAll,
  faCog,
  faKeyboard,
  faCaretDown,
  faChevronRight,
  faChevronLeft,
  faPlus,
  faEnvelope,
  faPrint,
  faFolder,
  faUsers
} from '@fortawesome/free-solid-svg-icons'

//Devon code starts: Initialize Firebase
// import * as firebase from "firebase/app";

// // Add the Firebase services that you want to use
// import "firebase/auth";
// import "firebase/database";
// var config = {
//   apiKey: "AIzaSyDrpz2BFRzaIWpqYXn5eUviFi6NZRkqv50",
//   authDomain: "byu--clone.firebaseapp.com",
//   databaseURL: "https://byu--clone.firebaseio.com",
//   projectId: "byu-gmail-clone",
//   storageBucket: "byu-gmail-clone.appspot.com",
//   messagingSenderId: "68568085108"
// };
// firebase.initializeApp(config);
//Devon code ends

library.add(faBars, faSearch, faInbox, faStar, faClock, faArrowRight, faPaperPlane,
  faFile, faTrash, faExclamationCircle, faArchive, faEnvelopeOpen, faArrowCircleRight, faTag,
  faRetweet, faSquare, faCheckSquare, faArrowLeft, faEllipsisV, faReply, faLongArrowAltRight, faReplyAll,
  faCog, faKeyboard, faCaretDown, faChevronRight, faChevronLeft, faPlus, faEnvelope, faPrint, faFolder,
  faUsers, faTag);

dom.watch()

Vue.config.productionTip = false

export function initializeGoogleClient() {
  let scope = "profile email https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/gmail.send https://www.googleapis.com/auth/gmail.modify";

  return new Promise((resolve) => {
    let script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://apis.google.com/js/api.js';
    script.onload = (e) => {
      gapi.load('client:auth2', () => {
        gapi.client.init({
          apiKey: process.env.API_KEY,
          clientId: process.env.CLIENT_ID,
          scope: scope,
        }).then(() => {
          let googleAuth = gapi.auth2.getAuthInstance();
          store.commit('googleAuth', googleAuth);
          resolve();
        })
      });
    }
    document.getElementsByTagName('head')[0].appendChild(script);
  })
}

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  components: { App },
  render: h => h(App),
  beforeCreate() {
    initializeGoogleClient();
  },
});
