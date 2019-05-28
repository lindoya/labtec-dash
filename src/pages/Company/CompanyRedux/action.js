import action from '../../../store/actions'
import { newCompany } from '../../../services/company'

export function changeValueCompany(e) {
  return {
    type: action.COMPANY.CREATE.CHANGE_VALUE,
    payload: e.target,
  }
}

export function onSubmit(value) {
  return dispatch => {
    const response = newCompany(value)
    return dispatch({
      type: action.COMPANY.CREATE.SUBMIT,
      payload: response,
    })
  }
}