import { combineReducers } from 'redux'

import { login, auth } from '../pages/Login/LoginRedux/reduce'
import { analyze, count } from '../pages/Tecnico/TecnicoRedux/reduce'
import { crono } from '../pages/Analise/AnaliseRedux/reduce'


const appReducer = combineReducers({
  login,
  auth,
  analyze,
  count,
  crono,
})


const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT_AUTH') {
    state = undefined
  }

  return appReducer(state, action)
}


export default rootReducer

