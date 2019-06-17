import actions from '../../../store/actions'


const INICIAL_STATE_CREATE ={
  razaoSocial: '',
  cnpj: '',
  street: '',
  number: '',
  complement: '',
  city: '',
  state: '',
  neighborhood: '',
  referencePoint: '',
  zipCode: '',
  telphone: '',
  email: '',
  nameContact: '',
  sucess: false,
  RG:'',
}



export function newCompany(state = INICIAL_STATE_CREATE, action) {
  switch(action.type){
    case actions.COMPANY.CREATE.CHANGE_VALUE:
      return { ...state, [action.payload.name]: action.payload.value }
    case actions.COMPANY.CREATE.SUBMIT:
      let companyRequestState = {
        ...state,
      }
      if (action.payload.status === 200){
        companyRequestState = {
          ...companyRequestState,
          sucess: true,
        }
      }
      return companyRequestState
    default:
      return state
  }
}
