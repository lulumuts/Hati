import Vue from 'vue'
import Router from 'vue-router'
import auth from '@/auth'
// import Auth from '@okta/okta-vue'
import Dashboard from '@/components/Dashboard.vue'
import Register from '@/components/Register.vue'
import Login from '@/components/Login.vue'
import User from '@/components/User.vue'
import LoggedIn from '@/components/LoggedIn.vue'
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
// Vue.use(Auth, {
//   issuer: 'https://dev-779517/oauth2/default',
//   clientId: '0oa4o7ak3f5XqY2UK4x6',
//   redirectUri: 'http://localhost:8080/implicit/callback',
//   scope: 'openid profile email'
// })

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
      path: '/login',
      name: 'loggedin',
      component: LoggedIn
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
      path: '/List',
      name: 'list',
      component: List,
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
// router.beforeEach((to, from, next) => {
//   if (to.matched.some(record => record.meta.requiresAuth)) {
//     if (localStorage.getItem('jwt') == null) {
//       next({
//         path: '/',
//         params: { nextUrl: to.fullPath }
//       })
//     } else {
//       let user = JSON.parse(localStorage.getItem('user'))
//       if (to.matched.some(record => record.meta.is_admin)) {
//         if (user.is_admin === 1) {
//           next()
//         } else {
//           next({name: 'dashboard'})
//         }
//       } else {
//         next()
//       }
//     }
//   } else if (to.matched.some(record => record.meta.guest)) {
//     if (localStorage.getItem('jwt' == null)) {
//       next()
//     } else {
//       next({ name: '/' })
//     }
//   } else {
//     next()
//   }
// })
export default router
// function requireAuth (to, from, next) {
//   if (!auth.loggedIn()) {
//     next({
//       path: '/login',
//       query: { redirect: to.fullPath }
//     })
//   } else {
//     next()
//   }
// }
// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', () => {
//     navigator.serviceWorker.register('/service-worker.js')
//   })
// }
