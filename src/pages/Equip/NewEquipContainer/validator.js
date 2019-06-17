export const validators = (nome, valor, state) => {
  const { fieldFalha, message } = state
  if (nome === 'cnpj') {
    let value = valor
    value = value.replace(/\D/ig, '')
    value = value.slice(0, 14)

    if (value.length === 14) {
      value = value.slice(0, 2) + '.' + value.slice(2, 5) + '.' + value.slice(5, 8) + '/' + value.slice(8, 12) + '-' + value.slice(12, 14)
    }

    fieldFalha.cnpj = true
    message.cnpj = 'Cnpj inválido'

    return {
      nome,
      valor: value,
      fieldFalha,
      message
    }

  } else if (nome === 'serialNumber') {
    let value = valor
    value = value.replace(/\D/ig, '')
    value = value.slice(0, 17)

    fieldFalha.serialNumber = true
    message.serialNumber = 'Número de série inválido'

    return {
      nome,
      valor: value,
      fieldFalha,
      message
    }

  } 
  
  else {
    return {
      nome,
      valor,
      fieldFalha,
      message
    }
  }
}