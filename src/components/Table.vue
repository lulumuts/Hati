<template>
  <div class="two">
    <b-card
     class="mb-2 b-card" style="overflow-x:auto;">
     <h3>Your users</h3>
     <br>
     <b-table    
     head-variant="light"
     :per-page="perPage"
     selectable
     :select-mode="selectMode"
     :current-page="currentPage" 
     :items="users" 
     :fields="fields"
     @row-selected="onRowSelected"
     class="c1"
     >
        <template v-slot:cell(selected)="{ rowSelected }">
        <template v-if="rowSelected">
          <span aria-hidden="true">&check;</span>
          <span class="sr-only">Selected</span>
        </template>
        <template v-else>
          <span aria-hidden="true">&nbsp;</span>
          <span class="sr-only">Not selected</span>
        </template>
      </template>
     </b-table>
      <b-pagination
      class="customPagination"
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      aria-controls="my-table"
      align="fill"
    ></b-pagination>
    </b-card>
  </div>
</template>

<script>
import axios from 'axios'
import swal from 'sweetalert2'

export default {
  data () {
    return {
      users: [],
      fields: [
        { key: 'id', sortable: true },
        { key: 'firstName', sortable: true },
        { key: 'lastName', sortable: true },
        { key: 'email', sortable: true },
        { key: 'phoneNumber', sortable: true },
        { key: 'registrationID', sortable: true },
        { key: 'facilityName', sortable: true },
        { key: 'facilityAddress', sortable: true },
        { key: 'isActive', sortable: true }
      ],
      perPage: 10,
      currentPage: 1,
      selected: [],
      selectMode: 'single',
      isActive: '',
      userId: ''
    }
  },
  props: ['testprop'],
  created: function () {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token')
    axios.get('http://35.222.99.37/users')
      .then(response => {
        this.users = response.data.users.sort()
      }).catch(error => {
        console.log(error)
      })
  },
  methods: {
    fullName (value) {
      return `${value.firstName} ${value.lastName}`
    },

    onRowSelected (items) {
      this.selected = items
      console.log(this.selected[0].id)
      this.isActive = this.selected[0].isActive
      this.userId = this.selected[0].id
      console.log(this.userId)
      if (!this.isActive) {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token')
        swal.fire({
          text: 'Do you want to activate this user?',
          icon: 'question',
          showConfirmButton: true,
          showCancelButton: true
        }).then((result) => {
          if (result.value) {
            axios({
              method: 'POST',
              url: 'http://35.222.99.37/user/status',
              data: {
                'id': this.userId,
                'userStatus': 'activate'
              }
            }).then((res) => {
              window.location.reload()
              console.log('SUCCESSFULLY')
            })
          }
        })
      } else {
        swal.fire({
          text: 'Do you want to deactivate this user?',
          icon: 'question',
          showConfirmButton: true,
          showCancelButton: true
        }).then((result) => {
          if (result.value) {
            axios({
              method: 'POST',
              url: 'http://35.222.99.37/user/status',
              data: {
                'id': this.userId,
                'userStatus': 'deactivate'
              }
            }).then((res) => {
              window.location.reload()
            })
          }
        })
      }
    }
  },
  computed: {
    rows () {
      return this.users.length
    }
  }
}
</script>
<style scoped>
h3{
  text-align:left;
}
p{
  text-align: center;
}
.b-card{
  width:80%;
  height:750px;
  display:flex;
  margin:auto;
  border-color: #0DDBA9;
  border-width: 3px;
  border-radius: 10px;
  padding:20px;
}
.c1 {cursor: pointer; cursor: hand;}
</style>