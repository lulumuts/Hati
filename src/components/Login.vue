<template>
  <div class="two">
    <img class="ellipse" src="@/assets/Ellipse.svg">
    <b-form @submit.prevent="login" autocomplete="off">
          <b-row align-h="center" align-v="center">
            <b-card
              img-alt="Image"
              img-top
              tag="article"
              style="max-width: 30rem;"
              class="mb-2 b-card"
            > 
            <img class="logo" src="@/assets/Hati-Logo.png">
            <p>Ministry of  Health<br>Document Reader</p>
          <b-card-text class="text">
          <b-input v-model="user.email" placeholder="Email" style="margin:20px 0 20px 0;"></b-input>
          <b-input v-model="user.password" placeholder="Password" type="password" style="margin:20px 0 20px 0;"></b-input>
          <b-button class="submit" type="submit">LOGIN</b-button><br>

           <div v-if="message" class="alert alert-danger" role="alert">{{message}}</div>
          
          </b-card-text>
          <router-link to="/register">Don't have an account? Sign up</router-link>
          </b-card>
        </b-row>
    </b-form>
  </div>
</template>

<script>
// import auth from '../auth'
// import User from '../models/user'
// import axios from 'axios'
export default {
  data () {
    return {
      // user: new User('', ''),
      user: {email: '', password: ''},
      message: '',
      error: false
    }
  },
  computed: {
    loggedIn () {
      return this.$store.state.status.loggedIn
    }
  },
  created () {
    if (this.loggedIn) {
      this.$router.push('/dashboard')
    }
  },
  methods: {
    login () {
      this.$validator.validateAll().then(isValid => {
        console.log('USER', this.user)
        if (this.user.email && this.user.password) {
          this.$store.dispatch('login', this.user)
            .then((response) => {
              this.$router.push('dashboard')
              this.$router.go('dashboard')
            }).catch(function (error) {
              console.log(error)
              this.message = (error.response && error.response.data) || error.message || error.toString()
            })
        }
      })
    }
  }
}
</script>

<style scoped>

@import url('https://fonts.googleapis.com/css?family=Roboto|Roboto+Slab|Slabo+13px&display=swap');

.error {
  color: red;
}
.logo{
  width:35%;
  margin:auto;
  display:flex;
}
.ellipse{
  margin:auto;
  display:flex;
  z-index: -1;
  position: relative;
  margin-top: 8vh;
}
input{
  border-radius: 20px;
  height:45px;
  background-color: #F6F6F6;
  border: 0px;
  color: lightgrey;
  font-family: 'Roboto', serif;
  letter-spacing: 0.9px;
}
input[type=text]{
  color: grey;
}
::placeholder {
  color:#BDBDBD;
  font-family: 'Roboto', serif;
  letter-spacing: 0.9px;
}
p{
  text-align: center;
  padding:5%;
  font-family: 'Slabo 13px', serif;
  font-size: 18px;
  color: #048364;
}
.text{
  margin-top:30px;
}
a{
  float:right;
  color: #A9A8A8;
}
a:hover{
  color:#0DDBA9;
  text-decoration: none;
}
.b-card{
  border-color: #0DDBA9;
  border-width: 3px;
  border-radius: 10px;
  height:40.27em;
  padding:20px;
  width: 482px;
  margin-top:-65vh;
}
 .submit{
   float:right;
   height:50px;
   width:120px;
   background-color:#0DDBA9; 
   border: 0px;
   border-radius: 24px;
   font-size: 18px;
   font-family: 'Roboto', sans-serif;
   letter-spacing: 1px;
 }
 .submit:hover{
   background-color: #10BA91;
 }
</style>

<!------ 

    login () {
      axios.post('http://35.222.99.37/login', this.user).then(response => {
        let userRole = response.data.user.userRole
        localStorage.setItem('user', JSON.stringify(response.data.user))
        localStorage.setItem('jwt', response.data.token)
        console.log('token', response.data.token)
        if (localStorage.getItem('jwt') != null) {
          this.$emit('loggedIn')
          if (this.$route.params.nextUrl != null) {
            this.$router.push(this.$route.params.nextUrl)
          } else {
            if (userRole === 'admin') {
              this.$router.push('dashboard')
            } else {
              this.$router.push('list')
            }
          }
        }
      }).catch(function (error) {
        console.error(error.response)
      })
    }


    login () {
      auth.login(this.email, this.pass, loggedIn => {
        if (!loggedIn) {
          this.error = true
        } else {
          this.$router.replace(this.$route.query.redirect || '/dashboard')
        }
      })
    }

<template>
  <div class="two">
    <img class="ellipse" src="@/assets/Ellipse.svg">
    <b-form @submit.prevent="login" autocomplete="off">
          <b-row align-h="center" align-v="center">
            <b-card
              img-alt="Image"
              img-top
              tag="article"
              style="max-width: 30rem;"
              class="mb-2 b-card"
            > 
            <img class="logo" src="@/assets/Hati-Logo.png">
            <p>Ministry of  Health<br>Document Reader</p>
          <b-card-text class="text">
          <b-input v-model="email" placeholder="Email" style="margin:20px 0 20px 0;"></b-input>
          <b-input v-model="pass" placeholder="Password" type="password" style="margin:20px 0 20px 0;"></b-input>
          <b-button class="submit" type="submit">LOGIN</b-button><br>
          
           <p v-if="error" class="error">Bad login information</p>
          
          </b-card-text>
          <router-link to="/register">Don't have an account? Sign up</router-link>
          </b-card>
        </b-row>
    </b-form>
  </div>
</template>

------>