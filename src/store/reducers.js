import { combineReducers } from 'redux'

import { login, auth } from '../pages/Login/LoginRedux/reduce'

import { newCompany } from '../pages/Company/CompanyRedux/reduce'

import { equip } from '../pages/Equip/EquipRedux/reduce'

const rootReducer = combineReducers({
  login,
  auth,
  newCompany,
  equip,
})

export default rootReducer

