import Vue from 'vue'
import Router from 'vue-router'
import InboxList from '@/components/InboxList'
import ThreadBody from '@/components/ThreadBody'
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
      path: "/ThreadBody/:id",
      name: "ThreadBody",
      component: ThreadBody
    },
    {
      path: "/Folder/:labelId",
      name: "FolderEmailList",
      component: FolderEmailList
    }
  ]
});
