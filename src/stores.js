import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)
export const store = new Vuex.Store({
  state: {
    status: '',
    token: localStorage.getItem('jwt') || '',
    user: {},
    error: ''
  },
  mutations: {
    auth_request (state) {
      state.status = 'loading'
    },
    auth_success (state, token, user) {
      state.status = 'success'
      state.token = token
      state.user = user
    },
    auth_error (state) {
      state.status = 'error'
    },
    logout (state) {
      state.status = ''
      state.token = ''
    }
  },
  actions: {
    login ({ commit }, user) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token')
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({
          url: 'http://35.222.99.37/login',
          data: user,
          method: 'POST'
        }).then(response => {
          const token = response.data.token
          const user = response.data.userDetails
          const error = response.data.error
          localStorage.setItem('error', error)
          localStorage.setItem('token', token)
          localStorage.setItem('user', JSON.stringify(user))
          commit('auth_success', token, user)
          resolve(response)
        }).catch(err => {
          commit('auth_error')
          localStorage.removeItem('token')
          reject(err)
        })
      })
    },
    logout () {
      localStorage.removeItem('user')
    }
  },
  getters: {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
    isAdmin () {
      let activeUser = JSON.parse(localStorage.getItem('user')) || 'default'
      return activeUser.userRole === 'admin'
    },
    isUser () {
      let activeUser = JSON.parse(localStorage.getItem('user')) || 'default'
      return activeUser.userRole === 'user' || activeUser.userRole === 'admin'
    }
  }

})
