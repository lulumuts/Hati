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
    <ul>
      <li v-for="document in documents">
        <embed width="400" height="600" :src="Url" v-if="Url" style="margin-left:-50px;">
        <p>{{document.fileName}}</p>
        <a id="download" :href="'http://35.222.99.37/read/?category=foo&sub_category=bar&filename=' + document.fileName + '&fileextn=' + document.fileExt" download>
        <b-button v-on:click="select()">Download</b-button>
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
      promises: [],
      downloads: [],
      name: '',
      doc: '',
      attachment: {
        name: null,
        file: null
      },
      previewUrl: '',
      Url: '',
      filename: '',
      fileextn: ''

    }
  },
  methods: {
    select: function (event) {
      let u = document.getElementById('download').href
      document.body.appendChild(u)
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
        })
        console.log(this.documents)
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