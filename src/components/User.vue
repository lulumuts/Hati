<template>
<div>
    <div v-if="submitted">
    <b-card
        img-alt="Image"
        img-top
        tag="article"
        class="mb-2 b-card pass-reset"
        > 
        <p id="passResetTitle"><span>Received your Code?</span><br>Set your new Password</p>
        <b-input class="input" type="text" placeholder="Code" v-model="Code"></b-input>
        <b-input class="input" type="password" placeholder="New password" v-model="newPassword"></b-input>
        <b-button class="submit" type="submit" @click="passReset()">CHANGE PASSWORD</b-button>
        <router-link to="/"><p id="login">Login</p></router-link>
    </b-card>
    </div>
    <div v-else>
        <b-card
            img-alt="Image"
            img-top
            tag="article"
            class="mb-2 b-card"
            > 
        <p id="title"><span>Forgotten your password?</span><br>Provide us with your registration ID and you will receive an SMS code to proceed!</p>
        <b-input class="input" placeholder="Registration ID" v-model="reg_id"></b-input>
        <b-button class="submit" type="submit" @click="userReset()">GET CODE</b-button>
        </b-card>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import swal from 'sweetalert2'

export default {
  data () {
    return {
      reg_id: '',
      Code: '',
      newPassword: '',
      submitted: false
    }
  },
  methods: {
    userReset () {
      let ID = this.reg_id
      this.submitted = true
      axios.get('http://35.222.99.37/user/reset/?reg_id=' + ID)
    },
    passReset () {
      axios({
        url: 'http://35.222.99.37/user/reset/confirm/?code=' + this.Code,
        data: {
          registrationID: this.reg_id,
          password: this.newPassword
        },
        method: 'post'
      }).then(response => {
        swal.fire({
          text: response.data.message,
          icon: 'success',
          showCloseButton: true
        }).catch(error => {
          swal.fire({
            text: error.response.data.message,
            icon: 'error',
            showCloseButton: true
          })
        })
      })
    }
  }
}
</script>

<style scoped>
h1{
  color:#BDBDBD;
  margin-bottom: 50px;
}
.input{
  width: 50%;
}
#title{
    margin-bottom: 60px;
}
.b-card{
  border-color: #0DDBA9;
  font-family: 'Roboto', serif;
  border-width: 3px;
  border-radius: 10px;
  height:23.27em;
  padding:20px;
  width: 482px;
  margin:auto;
  display:flex;
  top:150px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.16);
}
span{
    font-size:30px;
}
.input{
  border-radius: 20px;
  height:45px;
  background-color: #F6F6F6;
  border: 0px;
  color: lightgrey;
  font-family: 'Roboto', serif;
  letter-spacing: 0.9px;
  margin-bottom: 20px;
  width:390px;
}
.input[type=text]{
  color: #BDBDBD;
}
.input::placeholder {
  color:#BDBDBD;
  font-family: 'Roboto', serif;
  letter-spacing: 0.9px;
}
.pass-reset .input{
  margin:0px 0 10px 0;
}
.pass-reset {
    height:40vh;
}
.pass-reset #passResetTitle{
    margin-bottom: 3em;
}
p{
    color:grey;
    font-size: 18px;
}

#login{
    padding: 10px;
    float:right;
    margin-top:15px;
}
#login:hover{
    color: #0DDBA9;
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