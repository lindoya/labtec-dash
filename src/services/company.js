import axios from 'axios'
import { BACKEND_URL } from './var'
import { store } from '../App'

export const newCompany = async (values) => {
  const storeObject = store.getState()

  const headers = {
    token: storeObject.auth.token,
    username: storeObject.auth.username,
  }

  let response = {}

  await axios.post(`${BACKEND_URL}/api/company`, values, { headers: headers }).then(
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


export const getAllCompany = async (query) => {
  const storeObject = store.getState()

  const headers = {
    token: storeObject.auth.token,
    username: storeObject.auth.username,
  }

  let response = {}

  await axios.get(`${BACKEND_URL}/api/company`, { headers: headers, params: { query } }).then(
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

export const getOneByCnpj = async (cnpj) => {
  const storeObject = store.getState()

  const headers = {
    token: storeObject.auth.token,
    username: storeObject.auth.username,
  }

  let response = {}

  await axios.get(`${BACKEND_URL}/api/company/getOneByCnpj`, { headers: headers, params: { cnpj } }).then(
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

export const updateCompany = async (values) => {
  const storeObject = store.getState()

  const headers = {
    token: storeObject.auth.token,
    username: storeObject.auth.username,
  }

  let response = {}

  await axios.put(`${BACKEND_URL}/api/company/update`, values, { headers: headers }).then(
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


 const url = zipCode => `https://viacep.com.br/ws/${zipCode}/json/`

 export const getAddressByZipCode = (zipCode) => {
  return axios.get(url(zipCode.replace(/\D+/g, '')))
}