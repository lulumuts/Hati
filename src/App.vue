<template>
  <div id="app">
      <b-navbar class="background" toggleable="lg">
    <b-navbar-brand href="#"><h1>HATI</h1></b-navbar-brand>
     <ul class="navbar">
      <li>
        <router-link v-if="loggedIn" to="/logout">Log out</router-link>
        <router-link v-if="!loggedIn" to="/login">Log in</router-link>
      </li>
    </ul>
  </b-navbar>

    <template v-if="$route.matched.length">
      <router-view></router-view>
    </template>
    <template v-else>
      <p>You are logged {{ loggedIn ? 'in' : 'out' }}</p>
    </template>
  </div>
</template>

<script>
import auth from './auth'
export default {
  data () {
    return {
      loggedIn: auth.loggedIn()
    }
  },
  created () {
    auth.onChange = loggedIn => {
      this.loggedIn = loggedIn
    }
    this.isAuthenticated()
  },
  methods: {
    async isAuthenticated () {
      this.authenticated = await this.$auth.isAuthenticated()
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Oswald&display=swap');

  .background{
    background-color:#FEFEFE;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    opacity:0.8;
  }
  .background, h2{
    font-family: 'Oswald', sans-serif;
  }
  .navbar li{
    line-height: 1.5em;
    padding-left: 1.5em;
    display: inline;
    text-decoration: none;
  }
  a:hover {
    color: #4fc08d;
    text-decoration: none;
  }
</style>