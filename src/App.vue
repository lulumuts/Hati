<template>
  <div id="app">
      <b-navbar class="background" toggleable="lg">
    <b-navbar-brand href="#"><h1>HATI</h1></b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
    
        <b-navbar-nav right>
          <!-- Using 'button-content' slot -->
           <router-link v-if="loggedIn" to="/logout">
          <b-nav-item href="#">Logout</b-nav-item>
          </router-link>
          <router-link v-if="!loggedIn" to="/login">
          <b-nav-item href="#">Login</b-nav-item>
          </router-link>
        </b-navbar-nav>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
  <!----
    <ul>
      <li>
        <router-link v-if="loggedIn" to="/logout">Log out</router-link>
        <router-link v-if="!loggedIn" to="/login">Log in</router-link>
      </li>
      <li>
        <router-link to="/about">About</router-link>
      </li>
      <li>
        <router-link to="/dashboard">Dashboard</router-link>
        (authenticated)
      </li>
    </ul>----->
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
    
  }
  .background, h2{
    font-family: 'Oswald', sans-serif;
  }

  a:hover {
    color: #4fc08d;
  }
</style>