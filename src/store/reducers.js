import { combineReducers } from 'redux'

import { login, auth } from '../pages/Login/LoginRedux/reduce'
// import { teste } from '../pages/Tecnico/TecnicoRedux/reduce'


const rootReducer = combineReducers({
  login,
  auth,
  // teste,
})

export default rootReducer

