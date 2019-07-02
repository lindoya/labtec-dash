import axios from 'axios'
import { BACKEND_URL } from '../var'

export const authentic = (values) => {
  return axios.post(`${BACKEND_URL}/oapi/login`, values)
}

export const logout = async (token) => {

  return axios.delete(`${BACKEND_URL}/oapi/logout`, { params: { token } })
} 
