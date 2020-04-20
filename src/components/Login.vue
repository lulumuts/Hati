<template>
  <div class="two">
    <template v-if="isLoading">
     <b-spinner class="spinner" type="grow"  label="Loading..."></b-spinner>
     </template>

    <template v-else>
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
            <p><span>Ministry of  Health<br>Document Reader</span></p>
          <b-card-text class="text">
          <b-input v-model="user.email" placeholder="Email"></b-input>
          <b-input v-model="user.password" placeholder="Password" type="password"></b-input>
          <router-link id="password" to="/user">Forget your password?</router-link>
          <br>
          <b-button class="submit" type="submit">LOGIN</b-button>
          <br>
          </b-card-text>
          <router-link id="register" to="/register"><p>Don't have an account? Sign up</p></router-link>
          </b-card>
        </b-row>
    </b-form>
    </template>

  </div>
</template>

<script>
import swal from 'sweetalert2'

export default {
  data () {
    return {
      user: {email: '', password: ''},
      error: false,
      messages: [],
      reg_id: '',
      isLoading: false
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
      this.isLoading = true
      this.$validator.validateAll().then(isValid => {
        console.log('state', this.$store.state)
        if (this.user.email && this.user.password) {
          this.$store.dispatch('login', this.user)
            .then((response) => {
              this.loading = false
              const role = response.data.userDetails
              if (role.userRole === 'admin') {
                this.$router.push('/dashboard')
                this.$router.go('/dashboard')
              } else {
                this.$router.push('/list')
                this.$router.go('/list')
              }
            }).catch(error => {
              let result = error.response.data.message
              this.messages.push(result)
              console.log(this.user)
              swal.fire({
                text: error.response.data.message,
                icon: 'error',
                showCloseButton: true
              })
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
.spinner {
  position: fixed;
  z-index: 999;
  height: 4em;
  width: 4em;
  overflow: visible;
  margin: auto;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  color:#0DDBA9;
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
  margin: 20px 0 20px 0;
}
input[type=text]{
  color: grey;
}
::placeholder {
  color:#BDBDBD;
  font-family: 'Roboto', serif;
  letter-spacing: 0.9px;
}
span {
  font-family: 'Slabo 13px', serif;
}
#register p{
  font-size:16px;
  margin: 5px 0 0 0;
  padding:16px;
  font-weight:lighter;
}
#password{
  font-size:16px;
  margin-top: -12px;
}
p{
  text-align: center;
  padding:5%;
  font-family: 'Roboto', serif;
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
  padding:18px;
  width: 482px;
  margin-top:-635.5px;
}
 .submit{
   float:right;
   height:50px;
   width:100%;
   /* width:120px; */
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