<template>
  <div id="app">
      <b-navbar>
    <b-navbar-brand href="#"><img src="@/assets/Hati-Logo.png"></b-navbar-brand>

      <b-navbar-nav class="ml-auto">
        <b-nav-item href="#">        
          <router-link v-if="loggedIn" to="/logout">Log out</router-link>
        <router-link v-if="!loggedIn" to="/login">Log in</router-link>
        </b-nav-item>
      </b-navbar-nav>
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

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Oswald&display=swap');
  .background, h2{
    font-family: 'Oswald', sans-serif;
  }
  .navbar li{
    line-height: 1.5em;
    display: inline;
    text-decoration: none;
  }
  img{
    width:40%;
    padding: 12px;
  }
  a:hover {
    color: #4fc08d;
    text-decoration: none;
  }
</style>