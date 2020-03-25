import axios from 'axios'

export default axios.create({
  baseURL: 'http://35.222.99.37',
  headers: {
    'Content-type': 'application/json'
  }
})
