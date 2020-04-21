import Vue from 'vue'
import Router from 'vue-router'
import auth from '@/auth'
import Dashboard from '@/components/Dashboard.vue'
import Register from '@/components/Register.vue'
import Login from '@/components/Login.vue'
import {store} from '../stores.js'
import axios from 'axios'
import User from '@/components/User.vue'
import Table from '@/components/Table.vue'
import Documents from '@/components/Documents.vue'
import { CardPlugin, LayoutPlugin, FormPlugin, FormInputPlugin, FormGroupPlugin, TablePlugin, ButtonPlugin, NavbarPlugin, FormFilePlugin, EmbedPlugin, PaginationPlugin, SpinnerPlugin, AlertPlugin } from 'bootstrap-vue'

Vue.use(Router)
Vue.use(CardPlugin)
Vue.use(NavbarPlugin)
Vue.use(FormPlugin)
Vue.use(FormInputPlugin)
Vue.use(FormGroupPlugin)
Vue.use(TablePlugin)
Vue.use(LayoutPlugin)
Vue.use(EmbedPlugin)
Vue.use(PaginationPlugin)
Vue.use(AlertPlugin)
Vue.use(ButtonPlugin)
Vue.use(FormFilePlugin)
Vue.use(PaginationPlugin)
Vue.use(SpinnerPlugin)

let router = new Router({
  mode: 'history',
  base: __dirname,
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/users',
      name: 'table',
      component: Table
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      meta: {
        requiresAuth: true,
        is_admin: true
      }
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
      meta: {
        requiresAuth: true,
        guest: true
      }
    },
    {
      path: '/documents',
      name: 'documents',
      component: Documents,
      meta: {
        requiresAuth: true,
        guest: true
      }
    },
    {
      path: '/user',
      name: 'user',
      component: User,
      meta: {
        requiresAuth: true,
        is_admin: true
      }
    },
    {
      path: '/logout',
      beforeEnter (to, from, next) {
        auth.logout()
        next('/')
      }
    }
  ]
})
axios.interceptors.response.use(function (response) {
  return response
}, function (error) {
  console.log(error.response.data)
  if (error.response.status === 401 || error.response.status === 403) {
    store.dispatch('logout')
    router.push('/')
  }
  return Promise.reject(error)
})
export default router
