import Vue from 'vue'
import Router from 'vue-router'
import InboxList from '@/components/InboxList'
import EmailBody from '@/components/EmailBody'
import FolderEmailList from '@/components/FolderEmailList'

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
    },
    {
      path: "/Folder/:labelId",
      name: "FolderEmailList",
      component: FolderEmailList
    }

  ],
  // scrollBehavior(to, from, savedPosition) {
  //   if (savedPosition) {
  //     return savedPosition;
  //   }
  //   console.log(to);
  //   if (to.hash) {
  //     console.log(to.hash);
  //     return { selector: to.hash};
  //   }
  //   return {x: 0, y: 0};
  // }
});
