import Vue from 'vue'
import Router from 'vue-router'
import InboxList from '@/components/InboxList'
import EmailBody from '@/components/EmailBody'

Vue.use(Router)

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "InboxList",
      component: InboxList
    },
    {
      path: "/EmailBody/:id",
      name: "EmailBody",
      component: EmailBody
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      console.log('scroll stuff');
      return { x: 0, y: 0 }
    }
  }
});
