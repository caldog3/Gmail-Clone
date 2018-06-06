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

fontawesome.library.add(faBars, faSearch, faInbox, faStar, faClockO, faArrowRight, faPaperPlane,
 faFile, faTrash, faExclamationCircle);

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
    this.$store.dispatch("getListOfMessages");
  }
});
