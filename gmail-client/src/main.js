// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from "./store";

//Bootstrap Import
import BootstrapVue from "bootstrap-vue/dist/bootstrap-vue.esm"
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
Vue.use(BootstrapVue);
//Font Awesome Icons
import fontawesome from "@fortawesome/fontawesome";
import faBars from "@fortawesome/fontawesome-free-solid/faBars";
import faSearch from "@fortawesome/fontawesome-free-solid/faSearch";
import faAngleDown from "@fortawesome/fontawesome-free-solid/faAngleDown";
import faInbox from "@fortawesome/fontawesome-free-solid/faInbox";
import faStar from "@fortawesome/fontawesome-free-solid/faStar";
import faClockO from "@fortawesome/fontawesome-free-solid/faClock";
import faArrowRight from "@fortawesome/fontawesome-free-solid/faArrowRight";
import faPaperPlane from "@fortawesome/fontawesome-free-solid/faPaperPlane";
import faFile from "@fortawesome/fontawesome-free-solid/faFile";
import faTrash from "@fortawesome/fontawesome-free-solid/faTrash";
import faExclamationCircle from "@fortawesome/fontawesome-free-solid/faExclamationCircle";
import faArchive from "@fortawesome/fontawesome-free-solid/faArchive";
import faEnvelopeOpen from "@fortawesome/fontawesome-free-solid/faEnvelopeOpen";
import faArrowCircleRight from "@fortawesome/fontawesome-free-solid/faArrowCircleRight";
import faTag from "@fortawesome/fontawesome-free-solid/faTag";
import faRetweet from "@fortawesome/fontawesome-free-solid/faRetweet";
import faSquareO from "@fortawesome/fontawesome-free-solid/faSquare";
import faCheckSquareO from "@fortawesome/fontawesome-free-solid/faCheckSquare";
import faArrowLeft from "@fortawesome/fontawesome-free-solid/faArrowLeft";
import faEllipsisV from "@fortawesome/fontawesome-free-solid/faEllipsisV";
import faReply from "@fortawesome/fontawesome-free-solid/faReply";
import faLongArrowAltRight from "@fortawesome/fontawesome-free-solid/faLongArrowAltRight";
import faReplyAll from "@fortawesome/fontawesome-free-solid/faReplyAll";

fontawesome.library.add(faBars, faSearch, faInbox, faStar, faClockO, faArrowRight, faPaperPlane,
  faFile, faTrash, faExclamationCircle, faArchive, faEnvelopeOpen, faArrowCircleRight, faTag,
  faRetweet, faSquareO, faCheckSquareO, faArrowLeft, faEllipsisV, faReply, faLongArrowAltRight, faReplyAll);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  components: { App },
  render: h => h(App),
  beforeCreate() {
      this.$store.dispatch("initialize");
  }
});
