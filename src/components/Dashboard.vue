<template>
  <div class="edit-form">
    <h4>Tutorial</h4>
  <div>
    <br />
    <br>
     <div class="container">
    <div style="margin-left:-50px;">
      <label>File
        <b-form-file multiple type="file" ref="file" name="file" @change="onFileChange" accept="/"></b-form-file>
        
      </label>
      <a>
        <b-button v-on:click="this.submitFile">Submit</b-button>
        </a>
    </div>
  </div>
    
  <embed width="400" height="600" :src="previewUrl" v-if="previewUrl" style="margin-left:-50px;">
    <h2 style="text-align:center">All</h2>
    <ul id="documents">
      <li v-for="(document, i) in documents">
        <p>{{document.fileName}}</p>
        <p>{{document.fileExt}}</p>
        <embed width="400" height="600" :src="Url" v-if="Url" :ref="downloads"  style="margin-left:-50px;">
        <a >
        <b-button id="download" v-on:click="select($event, document)" @change="onFileChange" :ref="document"><p>DOWNLOAD</p></b-button>
        </a>
        <a>
        <b-button v-on:click="deleteFile($event, document)"><p>DELETE</p></b-button>
        </a>
      </li>
    </ul>
  </div>
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
      Url: '',
      downloads: 'downloads'
    }
  },
  props: ['file', 'ext'],
  methods: {
    deleteFile: function (ev, i) {
      let filename = i.fileName
      let fileext = i.fileExt
      console.log(filename, fileext)
      axios({
        url: 'http://35.222.99.37/delete/?category=foo&sub_category=bar&filename=' + filename + '&fileextn=' + fileext,
        method: 'GET',
        responseType: 'blob'
      }).then(window.location.reload())
    },
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
        console.log('is it this', vm.image)
      }
      reader.readAsDataURL(file)
    },
    submitFile () {
      let formData = new FormData()
      formData.append('document', this.attachment.file)
      axios({ method: 'post',
        url: 'http://35.222.99.37/upload/?category=foo&sub_category=bar',
        data: formData
      }).then(result => {
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
        })
        .catch(function (error) {
          console.log(error)
        })
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
  }
}
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
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
<!-------


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
            reader.onload = function () {
              // that.Url = that.$refs.target.result
              console.log('e.target', that.$refs)
              console.log('that.URL', response)
            }
            reader.readAsDataURL(file)
          })
        })
      }).catch(error => {
        console.log(error)
      })

    axios.get('http://35.222.99.37/documents')
      .then(response => {
        this.documents = response.data.documents
        this.documents.forEach((item) => {
          console.log('found:', item.fileName)
          console.log('extn:', item.fileExt)
          this.promises.push('http://35.222.99.37/read/?category=foo&sub_category=bar' + item.fileName + item.fileExt)
            .then(resp => {
              this.downloads.push(resp)
              console.log('this.downloads', this.downloads)
            })
        })
        console.log(this.documents)
      }).catch(error => {
        console.log(error)
      })

axios({
  url: 'http://api.dev/file-download',
  method: 'GET',
  responseType: 'blob', // important
}).then((response) => {
   const url = window.URL.createObjectURL(new Blob([response.data]));
   const link = document.createElement('a');
   link.href = url;
   link.setAttribute('download', 'file.pdf'); //or any other extension
   document.body.appendChild(link);
   link.click();
})
axios({
  url: 'http://api.dev/file-download',
  method: 'GET',
  responseType: 'blob', // important
}).then((response) => {
   const url = window.URL.createObjectURL(new Blob([response.data]));
   const link = document.createElement('a');
   link.href = url;
   link.setAttribute('download', 'file.pdf'); //or any other extension
   document.body.appendChild(link);
   link.click();
});

axios({
  url: 'http://35.222.99.37/read/?category=foo&sub_category=bar',
  method: 'GET',
  responseType: 'blob'
}).then((item) => {
  const url = window.URL.createObjectURL(item)
  const link = document.createElement('a')
  link.href = url
  link.setAttribute(item.fileName, item.fileExt)
  document.body.appendChild(link)
  link.click()
})
-------->