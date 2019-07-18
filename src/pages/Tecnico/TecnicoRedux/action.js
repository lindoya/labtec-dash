import action from '../../../store/actions'



  export function redirectAnalyze(value) {
    return dispatch => dispatch({
          type: action.REDIRECT.TESTE,
          payload: value,
        })
    }
    

  