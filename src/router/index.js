import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import auth from '@/auth'
import Auth from '@okta/okta-vue'
import Dashboard from '@/components/Dashboard.vue'
import AddTutorial from '@/components/AddTutorial.vue'
import Login from '@/components/Login.vue'
import List from '@/components/List.vue'
import { CardPlugin, LayoutPlugin, FormPlugin, FormInputPlugin, FormTextareaPlugin, FormGroupPlugin, TablePlugin, ButtonPlugin, AlertPlugin, NavbarPlugin } from 'bootstrap-vue'

Vue.use(Router)
Vue.use(CardPlugin)
Vue.use(NavbarPlugin)
Vue.use(LayoutPlugin)
Vue.use(FormPlugin)
Vue.use(FormInputPlugin)
Vue.use(FormTextareaPlugin)
Vue.use(FormGroupPlugin)
Vue.use(TablePlugin)
Vue.use(ButtonPlugin)
Vue.use(AlertPlugin)
Vue.use(Auth, {
  issuer: 'https://dev-779517/oauth2/default',
  clientId: '0oa4o7ak3f5XqY2UK4x6',
  redirectUri: 'http://localhost:8080/implicit/callback',
  scope: 'openid profile email'
})

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
      name: 'dashboard',
      component: Dashboard,
      beforeEnter: requireAuth
    },
    {
      path: '/addtutorial',
      name: 'addtutorial',
      component: AddTutorial,
      beforeEnter: requireAuth
    },
    {
      path: '/List',
      name: 'list',
      component: List,
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
