import { combineReducers } from 'redux'

import { login, auth } from '../pages/Login/LoginRedux/reduce'
import { analyze, count } from '../pages/Tecnico/TecnicoRedux/reduce'


const rootReducer = combineReducers({
  login,
  auth,
  analyze,
  count,
})

export default rootReducer

