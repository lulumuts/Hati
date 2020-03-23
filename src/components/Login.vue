<template>
  <div id="wave">
    <b-form @submit.prevent="login" autocomplete="off">
          <b-row align-h="center" align-v="center">
            <b-card
              img-alt="Image"
              img-top
              tag="article"
              style="max-width: 30rem;"
              class="mb-2 b-card"
            > 
            <img src="@/assets/1200px-Coat_of_arms_of_Kenya_(Official).svg.png">
          <b-card-text class="text">
            <h2>Login</h2>
            <p v-if="$route.query.redirect">
              You need to login first.
            </p>
            <b-input v-model="email" placeholder="Email" style="margin:14px 0 14px 0;"></b-input>
          <b-input v-model="pass" placeholder="Password" style="margin:14px 0 14px 0;"></b-input>
          <b-button class="submit" type="submit">LOGIN</b-button>
           <p v-if="error" class="error">Bad login information</p>
          </b-card-text>
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

<style>
.error {
  color: red;
}
img{
  width:40%;
  margin:auto;
  display:flex;
}
.text{
  margin-top:100px;
}
.b-card{
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  border-color: #006810;
  border-width: 2px;
  height:35em;
  padding:10px;
  margin:7vw;

}

 .submit{
   float:right;
   height:50px;
   width:120px;
   background-color:#006810; 
 }
</style>