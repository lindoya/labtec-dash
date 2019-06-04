import { combineReducers } from 'redux'

import { login, auth } from '../pages/Login/LoginRedux/reduce'

import { newCompany } from '../pages/Company/CompanyRedux/reduce'

import { equipType } from '../pages/Equip/EquipRedux/reduce'

const rootReducer = combineReducers({
  login,
  auth,
  newCompany,
  equipType,
})

export default rootReducer

