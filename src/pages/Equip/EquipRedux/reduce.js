import actions from '../../../store/actions'


const INICIAL_STATE ={
  cadastroType:{
    type: '',
    mark: '',
    model: '',
  }
}



export function equip(state = INICIAL_STATE, action) {
  switch(action.type){
    case actions.EQUIP.TYPE.NEW:
      console.log(action.payload)
      const newCadastroType = {
        ...state.cadastroType,
        [action.payload.name]: action.payload.value,
      }
      return { ...state, cadastroType: newCadastroType }
    // case actions.COMPANY.CREATE.SUBMIT:
    //   let companyRequestState = {
    //     ...state,
    //   }
    //   if (action.payload.status === 200){
    //     companyRequestState = {
    //       ...companyRequestState,
    //       sucess: true,
    //     }
    //   }
    //   return companyRequestState
    default:
      return state
  }
}
