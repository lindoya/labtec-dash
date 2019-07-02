import axios from 'axios'
import { BACKEND_URL } from '../var'


const authentic = (values) => {
  return axios.post(`${BACKEND_URL}/oapi/login`, values)
}


export default {
  authentic,
}