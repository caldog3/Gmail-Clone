import Vue from 'vue'
import Router from 'vue-router'
import GmailApi from '@/components/GmailApi'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'GmailApi',
      component: GmailApi
    }
  ]
})
