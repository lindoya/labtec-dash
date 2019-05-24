import action from '../../../store/actions'

export function changeValueCompany(e) {
  return {
    type: action.COMPANY.CREATE.CHANGE_VALUE,
    payload: e.target,
  }
}

// export function onSubmit(value) {
//   return dispatch => {
//     authService.authentic(value).then(
//       resp => dispatch({
//         type: action.LOGIN.AUTH,
//         payload: resp,
//       })
//     )
//   }
// }