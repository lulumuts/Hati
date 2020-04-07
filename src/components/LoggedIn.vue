<template>
  <div class="two">
    <!-- <img class="ellipse" src="@/assets/Ellipse.svg"> -->
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
        <form @submit.prevent="login">
          <b-input placeholder="Email" v-model="email" style="margin:20px 0 20px 0;"></b-input>
          <b-input placeholder="Password" v-model="password" type="password" style="margin:20px 0 20px 0;"></b-input>
          <b-button class="submit" type="submit">LOGIN</b-button><br>
        </form>
          </b-card-text>
          <router-link to="/register">Don't have an account? Sign up</router-link>
          </b-card>
        </b-row>
 
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login () {
      axios({
        method: 'POST',
        url: 'http://35.222.99.37/login',
        data: {
          email: this.email,
          password: this.password
        }
      }).then(response => {
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
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>