import axios from 'axios'
import { BACKEND_URL } from './var'
import { store } from '../App'


export const add = async (partMock) => {
  // console.log(partMock)
  const storeObject = store.getState()

  const headers = {
    token: storeObject.auth.token,
    username: storeObject.auth.username,
  }

  let response = {}

  await axios.post(`${BACKEND_URL}/api/part`, partMock, { headers: headers }).then(
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

export const getAllParts = async (query) => {
  const storeObject = store.getState()

  const headers = {
    token: storeObject.auth.token,
    username: storeObject.auth.username,
  }

  let response = {}

  await axios.get(`${BACKEND_URL}/api/part`, { headers: headers, params: { query } }).then(
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

// item: 'teclado',
// description: '',
// costPrice: '100,00',
// salePrice: '150,00',
// equipModels: [modelMock.id],

// export const updateByCostPrince = async (custo) => {
//   console.log(custo)
//   const storeObject = store.getState()

//   const headers = {
//     token: storeObject.auth.token,
//     username: storeObject.auth.username,
//   }

//   let response = {}

//   await axios.post(`${BACKEND_URL}/api/part/updateByCostPrince`, custo, { headers: headers }).then(
//     resp => {
//       response = resp
//     }
//   ).catch((error) => {
//     if (error.response) {
//       response = error.response
//     } else {
//       console.log('Error', error.message);
//     }
//   })
//   return response
// } 

// export const updateBySalePrice = async (venda) => {
//   console.log(venda)
//   const storeObject = store.getState()

//   const headers = {
//     token: storeObject.auth.token,
//     username: storeObject.auth.username,
//   }

//   let response = {}

//   await axios.post(`${BACKEND_URL}/api/part/updateBySalePrice`, venda, { headers: headers }).then(
//     resp => {
//       response = resp
//     }
//   ).catch((error) => {
//     if (error.response) {
//       response = error.response
//     } else {
//       console.log('Error', error.message);
//     }
//   })
//   return response
// } 