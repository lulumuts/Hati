import Vue from 'vue'
import Router from 'vue-router'
import auth from '@/auth'
import Auth from '@okta/okta-vue'
import Dashboard from '@/components/Dashboard.vue'
import Register from '@/components/Register.vue'
import Login from '@/components/Login.vue'
import List from '@/components/List.vue'
import { CardPlugin, LayoutPlugin, FormPlugin, FormInputPlugin, FormTextareaPlugin, FormGroupPlugin, TablePlugin, ButtonPlugin, AlertPlugin, NavbarPlugin, FormFilePlugin, EmbedPlugin, CollapsePlugin } from 'bootstrap-vue'

Vue.use(Router)
Vue.use(CardPlugin)
Vue.use(NavbarPlugin)
Vue.use(LayoutPlugin)
Vue.use(FormPlugin)
Vue.use(FormInputPlugin)
Vue.use(FormTextareaPlugin)
Vue.use(FormGroupPlugin)
Vue.use(TablePlugin)
Vue.use(CollapsePlugin)
Vue.use(EmbedPlugin)
Vue.use(ButtonPlugin)
Vue.use(FormFilePlugin)
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
      name: 'login',
      component: Login
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      beforeEnter: requireAuth
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
      beforeEnter: requireAuth
    },
    {
      path: '/List',
      name: 'list',
      component: List,
      beforeEnter: requireAuth
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
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
  })
}
