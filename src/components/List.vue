<template>
  <div class="list row">
<b-card
    class="b-card"
    title ="Preview"
  >
  <div v-for="(document, i) in documents">
  <iframe id="iframe" height="900px" width="100%" :src="Url" v-if="Url"></iframe>
    <a>
    <b-button class="preview" id="download" v-on:click="select($event, document)" @change="onFileChange" :ref="document">DOWNLOAD</b-button>
    </a>

    </div>
  </b-card>
  </div>
</template>

<script>
import axios from 'axios'

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
      Url: ''
    }
  },
  methods: {
    select: function (ev, i) {
      let filename = i.fileName
      let fileext = i.fileExt
      console.log(filename, fileext)
      axios({
        url: 'http://35.222.99.37/read/?category=foo&sub_category=bar&filename=' + filename + '&fileextn=' + fileext,
        method: 'GET',
        responseType: 'blob'
      }).then((response) => {
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
      }
      reader.readAsDataURL(file)
    }
  },
  mounted () {
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
    var frame = document.getElementById('iframe')
    console.log(frame)
  }
}
</script>

<style scoped>
.b-card{
  margin:auto;
  display:flex;
  /* max-width:90vh; */
  border-color: #0DDBA9;
  border-width: 2px;
  font-family: 'Roboto', serif;
  text-align: left;
  color: #0DDBA9;
}
.preview{
  width:98%;
  height:50px;
  margin-bottom:-13px;
  background-color:  #0DDBA9;
  font-family: 'Roboto', serif;
  border: none;
  font-size: 20px;
  letter-spacing: 2px;
}
.preview:hover{
  background-color:#10BA91; 
}
.buttons{
  background-color:#0DDBA9;
  border: none;
  float: right;
  margin-top:2%;
  /* border-radius: 20px; */
  height: 40px;
  /* width: 110px; */
  font-family: 'Roboto', serif;
  font-weight: bold;
  font-size: 15px;
  letter-spacing: 2px;
}
.buttons:hover{
  background-color:#10BA91; 
}
</style>