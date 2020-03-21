import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import auth from '@/auth'
import Dashboard from '@/components/Dashboard.vue'
import Login from '@/components/Login.vue'
import { CardPlugin, LayoutPlugin, FormPlugin, FormInputPlugin } from 'bootstrap-vue'

Vue.use(Router)
Vue.use(CardPlugin)
Vue.use(LayoutPlugin)
Vue.use(FormPlugin)
Vue.use(FormInputPlugin)

export default new Router({
  mode: 'history',
  base: __dirname,
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/dashboard',
      component: Dashboard,
      beforeEnter: requireAuth
    },
    {
      path: '/login',
      component: Login
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
function requireAuth (to, from, next) {
  if (!auth.loggedIn()) {
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  } else {
    next()
  }
}
