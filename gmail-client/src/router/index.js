import Vue from 'vue'
import Router from 'vue-router'
import InboxList from '@/components/InboxList'

Vue.use(Router)

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "InboxList",
      component: InboxList
    }
  ]
});
