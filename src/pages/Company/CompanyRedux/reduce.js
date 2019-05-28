import actions from '../../../store/actions'
import R from 'ramda'

const INICIAL_STATE_CREATE = {
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
  failed: false,
  fieldFalha: {
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
  },
  message: {
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
  },
}



export function newCompany(state = INICIAL_STATE_CREATE, action) {
  switch (action.type) {
    case actions.COMPANY.CREATE.CHANGE_VALUE:
      return { ...state, [action.payload.name]: action.payload.value }
    case actions.COMPANY.CREATE.SUBMIT:
      let companyRequestState = {
        ...state,
      }
      try {
        console.log(action.payload)
        if (action.payload.status === 200) {
          companyRequestState = {
            ...companyRequestState,
            sucess: true,
            failed: false,
          }
        } else if (action.payload.status === 422) {
          const erro = action.payload.data.fields[0]
          companyRequestState = {
            ...companyRequestState,
            sucess: false,
            failed: false,
            fieldFalha: erro.field,
            message: erro.message,
          }        
        }
        return companyRequestState
      } catch{
        companyRequestState = {
          ...companyRequestState,
          sucess: false,
          failed: true,
        }
        return companyRequestState
      }
    default:
      return state
  }
}

