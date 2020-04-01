<template>
  <div id="app">
      <b-navbar>
        <b-navbar-brand href="#"><img src="@/assets/Hati-Logo.png"></b-navbar-brand>
          <b-navbar-nav class="ml-auto">
            <b-nav-item href="#">      
                  <div id="mySidenav" class="sidenav">
                  <a href="javascript:void(0)" class="closebtn" v-on:click="closeNav">&times;</a>
                  <router-link v-if="loggedIn" to="/logout">Log out</router-link>
                  <router-link v-if="!loggedIn" to="/login">Log in</router-link>
                  <a href="#">About</a>
                  <a href="#">Services</a>
                  <a href="#">Clients</a>
                  <a href="#">Contact</a>
                </div>
                <span style="font-size:30px;cursor:pointer" v-on:click="openNav">&#9776;</span>
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
      loggedIn: auth.loggedIn(),
      show: false
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
    },
    handleToggleDrawer () {
      this.$refs.drawerLayout.toggle()
    },
    openNav () {
      document.getElementById('mySidenav').style.width = '250px'
    },
    closeNav () {
      document.getElementById('mySidenav').style.width = '0'
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
.sidenav {
    z-index: 1000;
    position: fixed;
    right: 250px;
    width: 0;
    height: 100%;
    margin-right: -250px;
    padding-top: 6%;
    top: 0;
    overflow-y: auto;
    background: #000;
    -webkit-transition: all 0.5s ease;
    -moz-transition: all 0.5s ease;
    -o-transition: all 0.5s ease;
    transition: all 0.5s ease;
}

.sidenav a {
  padding: 8px 8px 8px 32px;
  text-decoration: none;
  font-size: 25px;
  color: #818181;
  display: block;
  transition: 0.3s;
}

.sidenav a:hover {
  color: #f1f1f1;
}

.sidenav .closebtn {
  position: absolute;
  top: 3%;
  right: 25px;
  font-size: 36px;
  margin-left: 50px;
}

@media screen and (max-height: 450px) {
  .sidenav {padding-top: 15px;}
  .sidenav a {font-size: 18px;}
}
</style>