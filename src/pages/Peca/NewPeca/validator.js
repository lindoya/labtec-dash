import * as cnpjLib from "@fnando/cnpj";
import * as cpfLib from "@fnando/cpf";

export const masks = (nome, valor) => {
  
  if (nome === 'costPrice') {
    let value = valor
    value = value.replace(/\D/ig, '')
    value = value.slice(0, 9)

    if (value.length <= 2) {
      value = value.replace(/(\d{2}?)/, '$1')
    } else if (value.length > 2 && value.length <= 5) {
      value = value.replace(/(\d{1,3})(\d{2})/, '$1,$2')
    }else if (value.length > 5 && value.length <= 8) {
      value = value.replace(/(\d{1,3})(\d{3})(\d{2})/, '$1.$2,$3')
    }else if (value.length > 8) {
      value = value.replace(/(\d{1})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3,$4')
    }

    return {
      nome,
      valor: value,
    }
  } else if (nome === 'salePrice') {
    let value = valor
    value = value.replace(/\D/ig, '')
    value = value.slice(0, 9)

    if (value.length <= 2) {
      value = value.replace(/(\d{2}?)/, '$1')
    } else if (value.length > 2 && value.length <= 5) {
      value = value.replace(/(\d{1,3})(\d{2})/, '$1,$2')
    }else if (value.length > 5 && value.length <= 8) {
      value = value.replace(/(\d{1,3})(\d{3})(\d{2})/, '$1.$2,$3')
    }else if (value.length > 8) {
      value = value.replace(/(\d{1})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3,$4')
    }

      return {
        nome,
        valor: value,
      }
    }else if (nome === 'zipCode'){
      let value = valor
      value = value.replace(/\D/ig, '')
      value = value.slice(0, 8)


      if (value.length > 5) {
        value = value.replace(/(\d{5})(\d{3})?/, '$1-$2')
      }

      return {
        nome,
        valor: value,
      }
    // } else if (nome === 'state') {
    //     let value = valor
    //     value = value.replace(/\W|\d/g, '')
    //     value = value.slice(0, 2)
    //     value = value.toUpperCase(0, 2)
  
    //     return {
    //       nome,
    //       valor: value,
    //     }
    //   } else if (nome === 'number') {
    //   let value = valor
    //   value = value.replace(/\D/ig, '')

    //   return {
    //     nome,
    //     valor: value,
    //   } 
    } else {
      return {
        nome,
        valor,
      }
    }
}

export const validators = (nome, valor, state) => {
  const { fieldFalha, message } = state
  
  if (nome === 'item') {
    if (valor === '') {
      message.item = 'É Obrigatório.'
      fieldFalha.item = true
    } else fieldFalha.item = false

    return {
      fieldFalha,
      message
    }
  } 
  else if (nome === 'description'){
    if (valor === '') {
      message.description = 'É Obrigatório.'
      fieldFalha.description = true
    } else fieldFalha.description = false

    return {
      fieldFalha,
      message
    }
  } else if (nome === 'costPrice') {
    if (valor === '') {
      message.costPrice = 'É Obrigatório.'
      fieldFalha.costPrice = true
    } else fieldFalha.costPrice = false

    return {
      fieldFalha,
      message
    }
  } else if (nome === 'salePrice') {
    if (valor === '') {
      message.salePrice = 'É Obrigatório.'
      fieldFalha.salePrice = true
    } else fieldFalha.salePrice = false

    return {
      fieldFalha,
      message
    }
  // } else if (nome === 'state') {
  //   if (valor === '') {
  //     message.state = 'É Obrigatório.'
  //     fieldFalha.state = true
  //   } else fieldFalha.state = false

  //   return {
  //     fieldFalha,
  //     message
  //   }
  // } else if (nome === 'city') {
  //   if (valor === '') {
  //     message.city = 'É Obrigatório.'
  //     fieldFalha.city = true
  //   } else fieldFalha.city = false

  //   return {
  //     fieldFalha,
  //     message
  //   }
  // } else if (nome === 'neighborhood') {
  //   if (valor === '') {
  //     message.neighborhood = 'É Obrigatório.'
  //     fieldFalha.neighborhood = true
  //   } else fieldFalha.neighborhood = false

  //   return {
  //     fieldFalha,
  //     message
  //   }
  // } else if (nome === 'street') {
  //   if (valor === '') {
  //     message.street = 'É Obrigatório.'
  //     fieldFalha.street = true
  //   } else fieldFalha.street = false

  //   return {
  //     fieldFalha,
  //     message
  //   }
  // } else if (nome === 'number') {
  //   if (valor === '') {
  //     message.number = 'É Obrigatório.'
  //     fieldFalha.number = true
  //   } else fieldFalha.number = false

  //   return {
  //     fieldFalha,
  //     message
  //   }
  }
}