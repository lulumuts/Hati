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
          <a href="">Don't have an account? Sign up</a>
          </b-card>
        </b-row>
    </b-form>
  </div>
</template>

<script>
import auth from '../auth'
export default {
  data () {
    return {
      email: '',
      pass: '',
      error: false
    }
  },
  methods: {
    login () {
      auth.login(this.email, this.pass, loggedIn => {
        if (!loggedIn) {
          this.error = true
        } else {
          this.$router.replace(this.$route.query.redirect || '/dashboard')
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