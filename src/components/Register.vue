<template>
  <div class="submit-form">
     <template v-if="isLoading">
    <b-spinner class="spinner" type="grow"  label="Loading..."></b-spinner>
    </template>
          <template v-if="Submitted">
          <b-card
              img-alt="Image"
              img-top
              tag="article"
              class="mb-2 b-card"
              id="template-2"
            > 
            <img class="logo" src="@/assets/Hati-Logo.png">
            <p>Ministry of  Health<br>Document Reader</p>
          <b-card-text class="text">  
            <b-input class="input" v-model="userCode" placeholder="Your code"></b-input>
          <b-button class="submit" type="submit" @click="verify()">VERIFY</b-button><br>
    <b-alert
      :show="dismissCountDown"
      v-if="showAlert"
      dismissible
      variant="warning"
      class="alert"
      @dismissed="dismissCountDown=0"
      @dismiss-count-down="countDownChanged"
    >
      The code sent to your phone number will expire in {{ dismissCountDown }} seconds...  
    </b-alert>
          <a @dismiss-count-down="countDownChanged" v-on:click="newOTP()">Didn't receive a code?</a>
          </b-card-text>
          </b-card>
          </template>

          <template v-else>
            <form name="form" @submit.prevent="register">
              <div v-if="!successful">
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
            <b-input class="input" type="text" v-model="user.firstName" name="firstName" placeholder="First Name"></b-input>
            <b-input class="input" type="text" v-model="user.lastName" name ="lastName" placeholder="Last Name"></b-input>
            <b-input class="input" type="email" v-model="user.email" name="email" placeholder="Email"></b-input>
            <b-input class="input" type="password" v-model="user.password" name="password" placeholder="Password"></b-input>
            <b-input class="input" type="text" v-model="user.phoneNumber" name="phoneNumber" placeholder="Phone Number"></b-input>
            <b-input class="input" type="text" v-model="user.registrationID" name="registrationID" placeholder="Registration ID"></b-input>
            <b-input class="input" type="text" v-model="user.facilityName" name="facilityName" placeholder="Facility Name"></b-input>
         <b-input class="input" type="text" v-model="user.facilityAddress" name="facilityAddress" placeholder="Facility Address"></b-input>
          <b-button class="submit" type="submit" @click="showAlert()">SIGNUP</b-button><br>
          </b-card-text>
          <router-link to="/"><p class="login">Already have an account? Login</p></router-link>
          </b-card>
          </div>
          </form>
           <div
        v-if="message"
        class="alert"
        :class="successful ? 'alert-success' : 'alert-danger'"
      >{{message}}</div>
          </template>
    </div>
</template>


<script>
import axios from 'axios'
import User from '../models/user'
import swal from 'sweetalert2'

const STORAGE_KEY = 'user-storage'
export default {
  data () {
    return {
      user: new User('', '', '', '', '', '', '', ''),
      message: '',
      successful: false,
      users: [],
      userId: '',
      userCode: '',
      is_admin: null,
      dataFields: ['users'],
      Submitted: false,
      verified: false,
      dismissSecs: 60,
      dismissCountDown: 0,
      isLoading: false
    }
  },
  computed: {
    loggedIn () {
      return this.$store.state.status.loggedIn
    }
  },
  created () {
    this.users = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
  },
  mounted () {
    if (this.loggedIn) {
      this.$router.push('/dashboard')
    }
  },
  methods: {
    register () {
      this.isLoading = true
      axios({
        method: 'POST',
        url: 'http://35.222.99.37/signup',
        data: this.user
      }).then(response => {
        this.isLoading = false
        localStorage.setItem('user', JSON.stringify(response.data.user))
        localStorage.setItem('jwt', response.data.token)
        this.userId = response.data.user.id
        console.log('USERID', this.userId)
        this.Submitted = true
      }).catch(error => {
        console.log(error)
        swal.fire({
          text: error.response.data.message,
          icon: 'error',
          showCloseButton: true
        })
      })
    },
    newOTP () {
      axios.get('http://35.222.99.37/newotp/?id=' + this.userId)
    },
    verify () {
      axios.get('http://35.222.99.37/verify/?id=' + this.userId + '&code=' + this.userCode)
        .then(function (response) {
          swal.fire({
            text: 'You have successfully registered your account!',
            icon: 'success',
            showCloseButton: true
          }).then(function () {
            window.location.href = '/'
          })
        }).catch((error) => {
          swal.fire({
            text: error.response.data.message,
            icon: 'error',
            showCloseButton: true
          })
        })
    },
    checkStorage (key) {
      if (localStorage.getItem(key)) {
        try {
          this[key] = JSON.parse(localStorage.getItem(key))
        } catch (e) {
          localStorage.removeItem(key)
        }
      }
    },
    countDownChanged (dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },
    showAlert () {
      this.dismissCountDown = this.dismissSecs
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Roboto|Roboto+Slab|Slabo+13px&display=swap');

.b-card{
  border-color: #0DDBA9;
  border-width: 3px;
  border-radius: 10px;
  height:50em;
  padding:18px;
  width: 482px;
  text-align: center;
  margin:auto;
  display:flex;
}
img{
  width:80px;
}
.text{
  margin-top: -35px;
}
#template-2{
  max-width: 30rem;
  height:25em;
  margin:auto;
  display:flex;
  margin-top: 15vh;
}
p{
  text-align: center;
  padding:15px;
  font-family: 'Slabo 13px', serif;
  font-size: 16px;
  color: #A9A8A8;
}

.login{
  margin-top: -48px;
  margin-left: -65px;
  text-align: right;
}
p:hover{
  color:#0DDBA9;
}

a{
  color: #A9A8A8;
  font-size: 16px;
  position: absolute;
  z-index: 1;
  margin-top: 50px;
  margin-left: 40%;
}
.alert{
  position: absolute;
  z-index: 2;
  margin-top: 45px;
  font-size: 15px;
  width: 474px;
  margin-left: -53px;
  font-family: 'Roboto', serif;
  cursor: pointer; 
  cursor: hand;
}
a:hover{
  color:#0DDBA9;
  text-decoration: none;
}
.input{
  border-radius: 20px;
  height:45px;
  background-color: #F6F6F6;
  border: 0px;
  color: lightgrey;
  font-family: 'Roboto', serif;
  letter-spacing: 0.9px;
  margin:10px 0 10px 0;
}
.input[type=text]{
  color: grey;
}
::placeholder {
  color:#BDBDBD;
  font-family: 'Roboto', serif;
  letter-spacing: 0.9px;
}
 .submit{
   float:right;
   height:50px;
   width:100%;
   background-color:#0DDBA9; 
   border: 0px;
   margin-top:10px;
   border-radius: 24px;
   font-size: 18px;
   font-family: 'Roboto', sans-serif;
   letter-spacing: 1px;
 }
 .submit:hover{
   background-color: #10BA91;
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
</style>

<!-------- 
<template>
  <div class="submit-form">
          <template v-if="Submitted">
          <b-card
              img-alt="Image"
              img-top
              tag="article"
              class="mb-2 b-card"
              id="template-2"
            > 
            <img class="logo" src="@/assets/Hati-Logo.png">
            <p>Ministry of  Health<br>Document Reader</p>
          <b-card-text class="text">  
            <b-input class="input" v-model="userCode" placeholder="Your code"></b-input>
          <b-button class="submit" type="submit"  v-on:click="verify()">VERIFY</b-button><br>
          </b-card-text>
          </b-card>
          </template>
          <template v-else>
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
            <b-input class="input" v-model="user.firstName" placeholder="First Name"></b-input>
            <b-input class="input" v-model="user.lastName" placeholder="Last Name"></b-input>
            <b-input class="input" v-model="user.email" placeholder="Email"></b-input>
            <b-input class="input" v-model="user.password" placeholder="Password"></b-input>
            <b-input class="input" v-model="user.phoneNumber" placeholder="Phone Number"></b-input>
            <b-input class="input" v-model="user.registrationID" placeholder="Registration ID"></b-input>
            <b-input class="input" v-model="user.facilityName" placeholder="Facility Name"></b-input>
         <b-input class="input" v-model="user.facilityAddress" placeholder="Facility Address"></b-input>
          <b-button class="submit" type="submit"  v-on:click="submit()">SIGNUP</b-button><br>
          </b-card-text>
          <router-link to="/"><p>Already have an account? Login</p></router-link>
          </b-card>
          </template>
    </div>
</template>


<script>
import axios from 'axios'

const STORAGE_KEY = 'user-storage'
export default {
  name: 'add-tutorial',
  data () {
    return {
      users: [],
      userId: '',
      userCode: '',
      user: {firstName: '', lastName: '', email: '', phoneNumber: '', password: '', registrationID: '', facilityName: '', facilityAddress: ''},
      dataFields: ['users'],
      Submitted: false
    }
  },
  created () {
    this.users = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
  },
  methods: {
    submit () {
      axios({
        method: 'POST',
        url: 'http://35.222.99.37/signup',
        data: this.user
      }).then(response => {
        this.userId = response.data.user.id
        console.log('USERID', this.userId)
        this.Submitted = true
      }).catch(error => {
        console.log(error)
      })
    },
    newOTP () {
      axios.get('http://35.222.99.37/newotp/?id=' + this.userId)
    },
    verify () {
      axios.get('http://35.222.99.37/verify/?id=' + this.userId + '&code=' + this.userCode).then(function (response) {
        if (response.status === 200) {
          this.$router.push({path: '/'})
        }
      })
    },
    checkStorage (key) {
      if (localStorage.getItem(key)) {
        try {
          this[key] = JSON.parse(localStorage.getItem(key))
        } catch (e) {
          localStorage.removeItem(key)
        }
      }
    }
  },
  mounted () {
    this.dataFields.forEach(field => this.checkStorage(field))
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Roboto|Roboto+Slab|Slabo+13px&display=swap');

.b-card{
  border-color: #0DDBA9;
  border-width: 3px;
  border-radius: 10px;
  height:50em;
  padding:18px;
  width: 482px;
  text-align: center;
  margin:auto;
  display:flex;
}
img{
  width:80px;
}
.text{
  margin-top: -35px;
}
#template-2{
  max-width: 30rem;
  height:40vh;
  margin:auto;
  display:flex;
}
p{
  text-align: center;
  padding:15px;
  font-family: 'Slabo 13px', serif;
  font-size: 18px;
  color: #A9A8A8;
}
p:hover{
  color:#0DDBA9;
}

a{
  float:right;
  color: #A9A8A8;
}
a:hover{
  color:#0DDBA9;
  text-decoration: none;
}
.input{
  border-radius: 20px;
  height:45px;
  background-color: #F6F6F6;
  border: 0px;
  color: lightgrey;
  font-family: 'Roboto', serif;
  letter-spacing: 0.9px;
  margin:10px 0 10px 0;
}
.input[type=text]{
  color: grey;
}
::placeholder {
  color:#BDBDBD;
  font-family: 'Roboto', serif;
  letter-spacing: 0.9px;
}
 .submit{
   float:right;
   height:50px;
   width:100%;
   background-color:#0DDBA9; 
   border: 0px;
   margin-top:10px;
   border-radius: 24px;
   font-size: 18px;
   font-family: 'Roboto', sans-serif;
   letter-spacing: 1px;
 }
 .submit:hover{
   background-color: #10BA91;
 }
</style>
---->