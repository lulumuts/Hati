<template>
  <div id="app">
      <b-navbar>
        <b-navbar-brand href="#"><img src="@/assets/Hati-Logo.png"></b-navbar-brand>
          <b-navbar-nav class="ml-auto">
            <b-nav-item href="#">      
              <div id="mySidenav" class="sidenav">
                
               <a href="javascript:void(0)" class="closebtn" v-on:click="closeNav">&times;</a>
                  <router-link v-if="loggedIn" to="/logout">Log out</router-link>
                  <router-link v-if="!loggedIn" to="/">Log in</router-link>
                  <hr>
                  <!-- <a>Profile</a> -->
                  <a>Registered Doctors</a>
                  <a>Registered Doctors</a>
              </div>
              <span style="font-size:30px;cursor:pointer" v-on:click="openNav">&#9776;</span>
            </b-nav-item>
          </b-navbar-nav>
      </b-navbar>
    <template v-if="$route.matched.length">
      <router-view></router-view>
    </template>
    <template class="logged" v-else>
      <register></register>
    </template>
  </div>
</template>

<script>
import auth from './auth'
// import axios from 'axios'
import register from './components/Register.vue'

export default {
  components: { register },
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
    // this.isAuthenticated()
    window.addEventListener('offline', () => {
      this.connectivityStatus = false
      this.connectivityText = 'You seem to be offline. Connect to see latest order status'
    })
    window.addEventListener('online', () => {
      console.log('asd')
      this.connectivityStatus = true
    })
  },
  methods: {
    logout: function () {
      this.$store.dispatch('logout').then(() => {
        this.$router.push('/')
      })
    },
    // async isAuthenticated () {
    //   this.authenticated = await this.$auth.isAuthenticated()
    // },
    handleToggleDrawer () {
      this.$refs.drawerLayout.toggle()
    },
    openNav () {
      document.getElementById('mySidenav').style.width = '350px'
    },
    closeNav () {
      document.getElementById('mySidenav').style.width = '0'
    }
  },
  computed: {
    resultQuery () {
      return this.users.filter(item => {
        console.log(item)
        return !this.searchQuery || item.firstName.toLowerCase().indexOf(this.searchQuery.toLowerCase()) > -1 || item.lastName.toLowerCase().indexOf(this.searchQuery.toLowerCase()) > -1
      })
    },
    isLoggedIn: function () {
      return this.$store.getters.isLoggedIn
    }
  }
  // mounted () {
  //   axios.get('http://35.222.99.37/users')
  //     .then(response => {
  //       this.users = response.data.users
  //       console.log('user', this.users)
  //     }).catch(error => {
  //       console.log(error)
  //     })
  // }
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
    background: #FFFFFF;
    -webkit-transition: all 0.5s ease;
    -moz-transition: all 0.5s ease;
    -o-transition: all 0.5s ease;
    transition: all 0.5s ease;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
hr{
  width:250px;
  background-color: #0DDBA9;
}
.sidenav a {
  padding: 8px 8px 8px 32px;
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

@media screen and (max-height: 450px) {
  .sidenav {padding-top: 15px;}
  .sidenav a {font-size: 18px;}
}
</style>
<!------- 
     <div v-for="user in users">
                  <b-card
                    class="users"
                  >
                    <h6>{{user.firstName}} {{user.lastName}}</h6>
                    <p><span class="title">Facility:</span> {{user.facilityName}}</p>
                    <p><span class="title">Address:</span> {{user.facilityAddress}}</p>
                  </b-card>
                </div>
---->