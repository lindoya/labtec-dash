import action from '../../../store/actions'
import authService from '../../../services/auth'

export function changeValue(e) {
  return {
    type: action.LOGIN.CHANGE_VALUE,
    payload: e.target,
  }
}

export function onSubmit(value) {
  return dispatch => {
    authService.authentic(value).then(
      resp => dispatch({
        type: action.LOGIN.AUTH,
        payload: resp,
      })
    )
  }
}