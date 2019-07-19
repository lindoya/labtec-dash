import action from '../../../store/actions'



export function redirectAnalyze(value) {
  return dispatch => dispatch({
        type: action.REDIRECT.TESTE,
        payload: value,
      })
  }
  
export function count(value) {
  return dispatch => dispatch({
        type: action.COUNT,
        payload: value,
      })
  }

  