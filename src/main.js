import Vue from 'vue'
import App from './App'
import router from './router'
import VeeValidate from 'vee-validate'
import Axios from 'axios'
import Vuex from 'vuex'
import {store} from './stores.js'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import './registerServiceWorker'

Vue.prototype.$http = Axios
const token = localStorage.getItem('token')
if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = token
}

Vue.config.productionTip = false
Vue.use(VeeValidate)
Vue.use(Vuex)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
export default App
