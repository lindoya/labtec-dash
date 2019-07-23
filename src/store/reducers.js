import { combineReducers } from 'redux'

import { login, auth } from '../pages/Login/LoginRedux/reduce'
import { analyze, count } from '../pages/Tecnico/TecnicoRedux/reduce'
import { crono } from '../pages/Analise/AnaliseRedux/reduce'


const rootReducer = combineReducers({
  login,
  auth,
  analyze,
  count,
  crono,
})

export default rootReducer

