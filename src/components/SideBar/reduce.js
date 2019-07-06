import actions from '../../store/actions'


const INICIAL_STATE_AUTH ={
  token: null,
  userId: null,
  username: 'userName',
  email: 'email',
  validTonken: false,
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

export function logout(state = INICIAL_STATE_AUTH, action) {

  switch(action.type){
    case actions.LOGOUT:
      let auth = {
        token: null,
        userId: null,
        username: 'userName',
        email: 'email',
        validTonken: false,
      }

      return auth
    default:
      return state
  }
}

