import { combineReducers } from 'redux'

import { login, auth } from '../pages/Login/LoginRedux/reduce'

import { newCompany } from '../pages/Company/CompanyRedux/reduce'

const rootReducer = combineReducers({
  login,
  auth,
  newCompany,
})

export default rootReducer

