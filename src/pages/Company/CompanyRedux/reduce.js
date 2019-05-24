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
}



export function newCompany(state = INICIAL_STATE_CREATE, action) {
  switch(action.type){
    case actions.COMPANY.CREATE.CHANGE_VALUE:
      return { ...state, [action.payload.name]: action.payload.value  }
    default:
      return state
  }
}

// export function auth(state = INICIAL_STATE_AUTH, action) {
//   switch(action.type){
//     case actions.LOGIN.AUTH:
//       let auth = {
//         ...state
//       }
//       if (action.payload.status === 200){
//         if (action.payload.data.token) {
//           auth = {
//             ...auth,
//             ...action.payload.data,
//           }
//         }
//       }

//       return auth
//     default:
//       return state
//   }
// }

