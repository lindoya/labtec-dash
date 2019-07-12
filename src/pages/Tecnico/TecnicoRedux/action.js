import action from '../../../store/actions'



  export function redirectTest(value) {
    return dispatch => dispatch({
          type: action.REDIRECT.TESTE,
          payload: value,
        })
    }
    

  