import action from '../../../store/actions'



export function setCrono(value) {
  return dispatch => dispatch({
        type: action.CRONO.SET,
        payload: value,
      })
  }
  

  