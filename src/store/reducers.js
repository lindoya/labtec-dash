import { combineReducers } from 'redux'

import { login, auth } from '../pages/Login/LoginRedux/reduce'
import { analyze } from '../pages/Tecnico/TecnicoRedux/reduce'


const rootReducer = combineReducers({
  login,
  auth,
  analyze,
})

export default rootReducer

