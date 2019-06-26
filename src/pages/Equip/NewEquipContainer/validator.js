export const masks = (nome, valor) => {
  
  if (nome === 'cnpj') {
    let value = valor
    value = value.replace(/\D/ig, '')
    value = value.slice(0, 14)

    if (value.length > 2 && value.length <= 6) {
      value = value.replace(/(\d{1,4})(\d{2})/, '$1-$2')
    } else if (value.length > 6 && value.length <= 9) {
      value = value.replace(/(\d{1,3})(\d{4})(\d{2})/, '$1/$2-$3')
    } else if (value.length > 9 && value.length <= 12) {
      value = value.replace(/(\d{1,3})(\d{3})(\d{4})(\d{2})/, '$1.$2/$3-$4')
    } else if (value.length > 12) {
      value = value.replace(/(\d{1,2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5')
    }

    return {
      nome,
      valor: value,
    }
  } else if (nome === 'serialNumber') {
      let value = valor
      value = value.replace(/\D/ig, '')

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
  
  if (nome === 'cnpj') {
    if (valor === '') {
      message.cnpj = 'É Obrigatório.'
      fieldFalha.cnpj = true
    } else fieldFalha.cnpj = false

    return {
      fieldFalha,
      message
    }
  } 
  else if (nome === 'serialNumber'){
    if (valor === '') {
      message.serialNumber = 'É Obrigatório.'
      fieldFalha.serialNumber = true
    } else fieldFalha.serialNumber = false

    return {
      fieldFalha,
      message
    }
  }
}