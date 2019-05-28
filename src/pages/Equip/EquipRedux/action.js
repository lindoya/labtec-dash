import action from '../../../store/actions'
import { newCompany } from '../../../services/company'

export function changeValue(e) {
  return {
    type: action.EQUIP.TYPE.NEW,
    payload: e.target,
  }
}

export function select(e, name) {
  const payload = {
    name,
    value: e,
  }
  return {
    type: action.EQUIP.TYPE.NEW,
    payload,
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