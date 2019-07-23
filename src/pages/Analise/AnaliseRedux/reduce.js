import actions from '../../../store/actions'



const INICIAL_CRONO = {
  currenMilliseconds: 0,
  pausa: true,
  date: '',
  initDate: '',
}

export function crono(state = INICIAL_CRONO, action) {
  
  switch(action.type){
    case actions.CRONO.SET:
      return {...state,
        ...action.payload,
      }
    default:
      return state
  }
}
