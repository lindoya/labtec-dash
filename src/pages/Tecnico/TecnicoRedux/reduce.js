import actions from '../../../store/actions'


const INICIAL_STATE_REDIRECT ={
  serialNumber: '',
  razaoSocial: '',
  type: '',
  mark: '',
  model: '',
  leitor: '',
  defect: '',
}



export function analyze(state = INICIAL_STATE_REDIRECT, action) {
  
  switch(action.type){
    case actions.REDIRECT.TESTE:
      return {...state,
        ...action.payload,
      }
    default:
      return state
  }
}
