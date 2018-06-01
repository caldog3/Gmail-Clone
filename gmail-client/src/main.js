// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

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
fontawesome.library.add(faBars, faSearch);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
