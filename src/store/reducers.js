import { combineReducers } from 'redux'

import { login, auth } from '../pages/Login/LoginRedux/reduce'


const rootReducer = combineReducers({
  login,
  auth,
})

export default rootReducer

