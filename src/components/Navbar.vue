<template>
  <div>
      <b-navbar class="nav">
        <b-navbar-brand href="/"><img src="@/assets/Hati-Logo.png"></b-navbar-brand>
          <b-navbar-nav class="ml-auto">
            <b-nav-item href="#">      
              <div id="mySidenav" class="sidenav">
               <a href="javascript:void(0)" class="closebtn" v-on:click="closeNav">&times;</a>
                  <router-link v-if="loggedIn" to="/logout" class="Auth">LOGOUT</router-link>
                  <router-link v-if="!loggedIn && loggedOut" to="/" class="Auth">LOGIN</router-link>
                  <hr>
                  <router-link v-if="loggedIn && isAdmin" to="/users"><button class="menu-link">REGISTERED DOCTORS</button></router-link>
                  <router-link v-if="loggedIn && isAdmin" to="/dashboard"><button class="menu-link">DASHBOARD</button></router-link>
                  <router-link v-if="loggedIn && isUser" to="/documents"><button class="menu-link">DOCUMENTS</button></router-link>
              </div>
              <span style="font-size:30px;cursor:pointer" v-on:click="openNav">&#9776;</span>
            </b-nav-item>
          </b-navbar-nav>
      </b-navbar>
    <template v-if="$route.matched.length">
      <router-view></router-view>
    </template>
    <template class="logged" v-else>
      <login></login>
    </template>
  </div>
</template>

<script>
import auth from '../auth'
import login from './Login.vue'

export default {
  components: { login },
  data () {
    return {
      loggedIn: auth.loggedIn(),
      show: false,
      users: [],
      searchQuery: ''
    }
  },
  created () {
    auth.onChange = loggedIn => {
      this.loggedIn = loggedIn
    }
  },
  methods: {
    logout: function () {
      this.$store.dispatch('logout').then(() => {
        this.$router.push('/')
      })
    },
    openNav () {
      document.getElementById('mySidenav').style.width = '350px'
    },
    closeNav () {
      document.getElementById('mySidenav').style.width = '0'
    }
  },
  computed: {
    isLoggedIn: function () {
      return this.$store.getters.isLoggedIn
    },
    isAdmin: function () {
      console.log(this.$store.state.user)
      return this.$store.getters.isAdmin
    },
    isUser: function () {
      return this.$store.getters.isUser
    },
    loggedOut: function () {
      return this.$store.dispatch('logout')
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Roboto|Roboto+Slab|Slabo+13px&display=swap');
  .background, h2{
    font-family: 'Oswald', sans-serif;
  }
  .navbar li{
    line-height: 1.5em;
    display: inline;
    text-decoration: none;
  }
  .users{
    height:120px;
    margin: 4%;
    background-color: #F6F6F6;
    border: 0;
  }
  .logged{
    text-align:center;
  }
  .users p{
    height: 10px;
  }
  img{
    width:40%;
    padding: 12px;
  }
  .title{
    font-weight: 150px;
    color:grey;
  }
  a:hover {
    color: #4fc08d;
    text-decoration: none;
  }
  .menu-link{
    width: 250px;
    background-color: #454444;
    border-color: #454444;
    border-left: 4px solid lightgrey;
    color: lightgrey;
    border-radius: 0px;
    font-size: 20px;
    text-align: justify;
    font-weight: 300;
    padding: 15px;
  }
   .menu-link:hover{
    border-radius: 0px;
    border-left: 4px solid #4fc08d;
    color: #4fc08d;
  }
  .menu-link:focus{
    outline: none;
  }
  .Auth {
    margin-left: 20px;
  }
.sidenav {
    z-index: 1000;
    position: fixed;
    right: 250px;
    width: 0;
    height: 100%;
    margin-right: -250px;
    padding-top: 46px;
    font-family: 'Roboto', serif;
    top: 0;
    overflow-y: auto;
    background: #454444;
    -webkit-transition: all 0.5s ease;
    -moz-transition: all 0.5s ease;
    -o-transition: all 0.5s ease;
    transition: all 0.5s ease;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
hr{
  background-color: #fff;
}
.sidenav a {
  padding: 8px 8px 8px 8px;
  text-decoration: none;
  font-size: 20px;
  font-family: 'Roboto', serif;
  color: darkgrey;
  display: block;
  transition: 0.3s;
}

.sidenav a:hover {
  color: #0DDBA9;
}

.sidenav .closebtn {
  position: absolute;
  top: 3%;
  right: 25px;
  font-size: 36px;
  margin-left: 50px;
}
@media only screen and (max-width: 600px) {
  .nav{
      width:29em;
  }
}
</style>