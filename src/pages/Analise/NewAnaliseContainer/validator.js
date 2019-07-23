// import * as cnpjLib from "@fnando/cnpj";
// import * as cpfLib from "@fnando/cpf";

// export const masks = (nome, valor) => {
  
//   if (nome === 'cnpj') {
//     let value = valor
//     value = value.replace(/\D/ig, '')
//     value = value.slice(0, 14)

//     if (value.length === 11) {
//       value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
//     }
//     else if (value.length === 14) {
//       value = value.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5')
//     }

//     return {
//       nome,
//       valor: value,
//     }
//   } else if (nome === 'telphone') {
//       let value = valor
//       value = value.replace(/\D/ig, '')
//       value = value.slice(0, 11)


//       if (value.length > 2 && value.length <= 6) {
//         value = value.replace(/(\d{2})(\d{4})?/, '($1) $2')
//       }
//       if (value.length > 6 && value.length < 11) {
//         value = value.replace(/(\d{2})(\d{4})(\d{1,4})/, '($1) $2-$3')
//       }
//       if (value.length === 11) {
//         value = value.replace(/(\d{2})(\d{5})(\d{1,4})/, '($1) $2-$3')
//       }

//       return {
//         nome,
//         valor: value,
//       }
//     }else if (nome === 'zipCode'){
//       let value = valor
//       value = value.replace(/\D/ig, '')
//       value = value.slice(0, 8)


//       if (value.length > 5) {
//         value = value.replace(/(\d{5})(\d{3})?/, '$1-$2')
//       }

//       return {
//         nome,
//         valor: value,
//       }
//     } else if (nome === 'state') {
//         let value = valor
//         value = value.replace(/\W|\d/g, '')
//         value = value.slice(0, 2)
//         value = value.toUpperCase(0, 2)
  
//         return {
//           nome,
//           valor: value,
//         }
//       } else if (nome === 'number') {
//       let value = valor
//       value = value.replace(/\D/ig, '')

//       return {
//         nome,
//         valor: value,
//       } 
//     } else {
//       return {
//         nome,
//         valor,
//       }
//     }
// }

export const validators = (nome, valor, state) => {
  const { fieldFalha, message } = state
  
  if (nome === 'motivoPausa') {
    if (valor === '') {
        message.motivoPausa = 'É obrigatório.'
        fieldFalha.motivoPausa = true
      } else fieldFalha.motivoPausa = false
  
      return {
        fieldFalha,
        message
      }
  } 
  return {
    fieldFalha,
    message
  }
}