import action from '../../store/actions'
import { logout } from '../../services/auth'


export function Logout(value) {
  return dispatch => {
    logout(value).then(
      resp => dispatch({
        type: action.LOGOUT,
      })
    )
  }
}