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
  } else if (nome === 'modelListCard') {
    if (valor.length === 0) {
      message.modelListCard = 'É Obrigatório.'
      fieldFalha.modelListCard = true
    } else fieldFalha.modelListCard = false

    return {
      fieldFalha,
      message
    }
  }
}