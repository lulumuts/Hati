import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import { CardPlugin, LayoutPlugin, FormPlugin, FormInputPlugin } from 'bootstrap-vue'

Vue.use(Router)
Vue.use(CardPlugin)
Vue.use(LayoutPlugin)
Vue.use(FormPlugin)
Vue.use(FormInputPlugin)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    }
  ]
})
