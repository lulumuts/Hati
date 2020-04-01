<template>
  <div class="list row">
<b-card
    class="b-card"
    title ="Preview"
  >
  <div v-for="(document, i) in documents">
  <iframe id="iframe" height="900px" width="100%" :src="Url" v-if="Url" :ref="downloads"></iframe>
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
    }
  },
  mounted () {
    axios.get('http://35.222.99.37/documents')
      .then(response => {
        this.documents = response.data.documents
        this.documents.forEach((item) => {
          console.log('found:', item.fileName)
          console.log('extn:', item.fileExt)
          return axios({
            url: 'http://35.222.99.37/read/?category=foo&sub_category=bar&filename=' + item.fileName + '&fileextn=' + item.fileExt,
            method: 'GET',
            responseType: 'blob'
          }).then((response) => {
            console.log('response', response)
            let blob = response.data
            console.log('blob', blob)
            const file = new File([blob], 'FILENAME', {type: 'application/pdf'})
            console.log('FILE', file)
            const reader = new FileReader()
            const that = this
            reader.onload = function (e) {
              that.Url = e.target.result
              console.log('e.target', that.$refs.downloads)
              // console.log('that.URL', response)
            }
            reader.readAsDataURL(file)
          })
        })
      }).catch(error => {
        console.log(error)
      })
    var frame = document.getElementById('iframe')
    console.log(frame)
    // var frameDoc = frame.contentDocument
    // var info = document.getElementById('info')

    // var target = frameDoc.getElementById('overview')
    // frameDoc.scrollingElement.scrollTop = target.offsetTop

    // info.innerText = 'Y offset after scrolling: ' +
    // frame.contentWindow.pageYOffset + ' pixels'
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