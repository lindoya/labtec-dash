import axios from 'axios'
import { BACKEND_URL } from './var'

import { store } from '../App'

export const authentic = (values) => {
  return axios.post(`${BACKEND_URL}/oapi/login`, values)
}

export const logout = async (token) => {
  const storeObject = store.getState()

  const headers = {
    token: storeObject.auth.token,
    username: storeObject.auth.username,
  }

  await axios.delete(`${BACKEND_URL}/oapi/logout`, { params: { token }, headers: headers })
  
  return true
} 

