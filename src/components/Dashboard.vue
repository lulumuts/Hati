<template>
  <div class="edit-form">
        <template v-if="isLoading">
    <b-spinner class="spinner" type="grow"  label="Loading..."></b-spinner>
    </template>
    <template v-else> 
  <b-row>
  <b-col lg="6" sm="12">
<p></p>
 <b-card
    class="b-card"
    title ="Preview"
  >
  <div v-for="(document, i) in documents" v-bind:key="i">
  <iframe height="900px" width="100%" :src="Url" v-if="Url" :ref="downloads"></iframe>
  <b-row style="text-align:center;">
    <b-col lg="6" style="padding:0px;">
    <a>
    <b-button class="preview" id="download" v-on:click="select($event, document)" @change="onFileChange" :ref="document">DOWNLOAD</b-button>
    </a>
    </b-col>
    <b-col lg="6" style="padding:0px;">
      <a>
      <b-button class="preview" v-on:click="deleteFile($event, document)">DELETE</b-button>
    </a>
    </b-col>
    </b-row>
    </div>

  </b-card>
    </b-col>
    <b-col lg="6" sm="12">
      <b-card
        class="mb-2 b-card"
        >
        <b-form-file class="form-file" id="file-large" multiple type="file" ref="file" name="file" @change="onFileChange" accept="/"></b-form-file>
        <a>
        <b-button class="buttons" v-on:click="this.submitFile">UPLOAD</b-button>
        </a>
        </b-card>
      </b-col>
    </b-row>
    </template>
  </div>
</template>

<script>
import axios from 'axios'
import swal from 'sweetalert2'
export default {
  name: 'dashboard',
  data () {
    return {
      documents: [],
      src: null,
      attachment: {
        name: null,
        file: null
      },
      previewUrl: '',
      Url: '',
      downloads: 'downloads',
      isLoading: false,
      User: ''
    }
  },
  props: ['file', 'ext'],
  methods: {
    deleteFile: function (ev, i) {
      swal.fire({
        text: 'Are you sure you want to delete this file?',
        icon: 'question',
        showConfirmButton: true,
        showCancelButton: true
      }).then((result) => {
        if (result.value) {
          this.isLoading = true
          let filename = i.fileName
          let fileext = i.fileExt
          console.log(filename, fileext)
          axios({
            url: 'http://35.222.99.37/delete/?category=foo&sub_category=bar&filename=' + filename + '&fileextn=' + fileext,
            method: 'GET',
            responseType: 'blob'
          }).then(response => {
            this.isLoading = false
            window.location.reload()
          })
        }
      })
    },
    select: function (ev, i) {
      this.isLoading = true
      let filename = i.fileName
      let fileext = i.fileExt
      console.log(filename, fileext)
      axios({
        url: 'http://35.222.99.37/read/?category=foo&sub_category=bar&filename=' + filename + '&fileextn=' + fileext,
        method: 'GET',
        responseType: 'blob'
      }).then((response) => {
        this.isLoading = false
        var fileURL = window.URL.createObjectURL(new Blob([response.data]))
        var fileLink = document.createElement('a')
        fileLink.href = fileURL
        fileLink.setAttribute('download', 'MoH.pdf')
        document.body.appendChild(fileLink)
        fileLink.click()
      })
    },
    onFileChange (event) {
      this.attachment.file = event.target.files[0]
      this.attachment.name = event.target.files[0].name
      console.log(this.attachment.file.name)
    },
    createImage (file) {
      var reader = new FileReader()
      var vm = this

      reader.onload = (e) => {
        vm.image = file.toString('base64')
        console.log('is it this', vm.image)
      }
      reader.readAsDataURL(file)
    },
    submitFile () {
      this.isLoading = true
      let formData = new FormData()
      formData.append('document', this.attachment.file)
      axios({ method: 'post',
        url: 'http://35.222.99.37/upload/?category=foo&sub_category=bar',
        data: formData
      }).then(result => {
        this.isLoading = false
        const reader = new FileReader()
        const that = this
        reader.onload = function (e) {
          that.previewUrl = e.target.result
        }
        reader.readAsDataURL(this.attachment.file)
        console.log(result.data)
      })
        .then(function (result) {
          console.log(result)
          window.location.reload()
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  },
  created: function () {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token')
    axios.get('http://35.222.99.37/documents')
      .then(response => {
        this.documents = response.data.documents
        this.documents.forEach((item) => {
          return axios({
            url: 'http://35.222.99.37/read/?category=foo&sub_category=bar&filename=' + item.fileName + '&fileextn=' + item.fileExt,
            method: 'GET',
            responseType: 'blob'
          }).then((response) => {
            let blob = response.data
            const file = new File([blob], 'FILENAME', {type: 'application/pdf'})
            const reader = new FileReader()
            const that = this
            reader.onload = function (e) {
              that.Url = e.target.result
            }
            reader.readAsDataURL(file)
          })
        })
      }).catch(error => {
        console.log(error)
      })
  },
  mounted: function () {
    this.User = JSON.parse(localStorage.getItem('user')).firstName
    console.log(this.User)
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Roboto|Roboto+Slab|Slabo+13px&display=swap');

.edit-form{
  text-align: center;
  margin-bottom: 100px;
}
p{
  font-size:40px;
}
iframe{
 padding:5%;
 border: none;
}
.form-file{
  border-radius: 70px;
}
.b-card{
  margin:auto;
  display:flex;
  max-width:65vh;
  border-color: #0DDBA9;
  border-width: 2px;
  font-family: 'Roboto', serif;
  text-align: left;
  color: #0DDBA9;
  margin-top: 15px;
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
.preview{
  width:98%;
  height:50px;
  margin-bottom:-13px;
  background-color:  #0DDBA9;
  font-family: 'Roboto', serif;
  border: none;
  margin-top:15px;
  font-size: 20px;
  letter-spacing: 2px;
}
.preview:hover{
  background-color:#10BA91; 
}
.buttons{
  background-color:#0DDBA9;
  border-color: white;
  border-width: 2px;
  float: right;
  margin-top:2%;
  height: 40px;
  width: 110px;
  font-family: 'Roboto', serif;
  font-weight: bold;
  font-size: 15px;
  letter-spacing: 2px;
}
.buttons:hover{
  background-color:#10BA91; 
}
output embed {
  max-width: 1000px;
  height:600px;
}
output p {
  background: #f7f7f7;
  border-radius: 4px;
  padding: 2rem;
  text-align: center;
}
</style>
