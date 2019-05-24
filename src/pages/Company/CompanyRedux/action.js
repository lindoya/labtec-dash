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
    newCompany(value).then(
      resp => dispatch({
        type: action.COMPANY.CREATE.SUBMIT,
        payload: resp,
      })
    )
  }
}