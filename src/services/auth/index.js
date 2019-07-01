import axios from 'axios'
import { BACKEND_URL } from '../var'
import { store } from '../../App'

export const authentic = (values) => {
  return axios.post(`${BACKEND_URL}/oapi/login`, values)
}

// export const logout = (value) => {
//   return axios.put(`${BACKEND_URL}/oapi/logout`, { value })
// }


export const logout = async (token) => {
  const storeObject = store.getState()

  const headers = {
    token: storeObject.auth.token,
    username: storeObject.auth.username,
  }

  let response = {}

  const params = {
    token,
  }

  await axios.delete(`${BACKEND_URL}/oapi/logout`, { headers: headers, params }).then(
    resp => {
      response = resp
    }
  ).catch((error) => {
    if (error.response) {
      response = error.response
    } else {
      console.log('Error', error.message);
    }
  })
  return response
} 