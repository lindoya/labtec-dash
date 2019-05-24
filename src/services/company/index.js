import axios from 'axios'
import { BACKEND_URL } from '../var'
import { store } from '../../App'

export const newCompany = (values) => {
  const storeObject = store.getState()

  const headers = {
    token: storeObject.auth.token,
    username: storeObject.auth.username,
  }
  return axios.post(`${BACKEND_URL}/api/company`, values, {headers: headers})
}
