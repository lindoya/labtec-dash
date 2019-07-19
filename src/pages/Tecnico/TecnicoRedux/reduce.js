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

const INICIAL_COUNT = {
  analise: '',
  fabrica: '',
  revisao: '',
  aprovacao: '',
  revisaoFinal: '',
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

export function count(state = INICIAL_COUNT, action) {
  
  switch(action.type){
    case actions.COUNT:
      return {...state,
        ...action.payload,
      }
    default:
      return state
  }
}