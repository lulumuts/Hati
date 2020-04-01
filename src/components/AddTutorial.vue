<template>
  <div class="submit-form">
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
            <form v-on:submit.prevent="saveToDo">
            <b-input class="input" v-model="user.name" placeholder="Full Name"></b-input>
            <b-input class="input" v-model="user.email" placeholder="Email"></b-input>
            <b-input class="input" v-model="user.phone" placeholder="Phone Number"></b-input>
          <b-button class="submit" type="submit">SIGNUP</b-button><br>
           </form>
          </b-card-text>
          <a href="">Already have an account? Login</a>
          </b-card>
          <ul>
        <li v-for="user in users">{{ user.name + ' '+ user.email + ' ' + user.phone }}</li>
      </ul>
    </div>
</template>

<script>
const STORAGE_KEY = 'user-storage'
export default {
  name: 'add-tutorial',
  data () {
    return {
      users: [],
      user: {name: '', email: '', phone: ''},
      dataFields: ['users']

    }
  },
  created () {
    this.users = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
  },
  methods: {
    saveToDo () {
      this.users.push(this.user)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.users))
    //  this.$router.push('/dashboard')
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
  height:40.27em;
  padding:20px;
  width: 482px;
  text-align: center;
  margin:auto;
  display:flex;
}
img{
  width:130px;
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