import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Login from '../views/console/login'
import Admin from '../views/console/admin'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'base',
      component: Login
    },
    {
      path: '/console/login',
      name: 'login',
      component: Login
    },
    {
      path: '/console',
      name: 'admin',
      component: Admin
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
