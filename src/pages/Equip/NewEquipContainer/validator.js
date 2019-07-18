
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
    value = value.slice(0, 17)

    return {
      nome,
      valor: value,
    }
  } else if (nome === 'type') {
    let value = valor
    value = value.replace(/[^a-zA-ZÀ-ú\s]/ig, '')
    value = value.slice(0, 1) + value.slice(1, 25).toLowerCase()
    
    // value = value.replace(/[éèê]/gi, 'e')
    // value = value.replace(/[óòôõ]/gi, 'o')
    // value = value.replace(/[ç]/gi, 'c')

    valor = value
    return {
      nome,
      valor,
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
      message.cnpj = 'É obrigatório.'
      fieldFalha.cnpj = true
    } else fieldFalha.cnpj = false

    return {
      fieldFalha,
      message
    }
  } 
  else if (nome === 'serialNumber'){
    if (valor === '') {
      message.serialNumber = 'É obrigatório.'
      fieldFalha.serialNumber = true
    } else fieldFalha.serialNumber = false

    return {
      fieldFalha,
      message
    }
  }
  else if (nome === 'type'){
    const validatorsType = (valor) => {
      let value = valor

      value = value.toLowerCase()
      value = value.replace(/de/gi, '')
      value = value.replace(/\s/gi, '')
      value = value.replace(/[é]/gi, 'e')
      value = value.replace(/[ó]/gi, 'o')
      value = value.replace(/[ç]/gi, 'c')

      return value
    }

    const valorValido = (validatorsType(valor) !== 'catraca'
    && validatorsType(valor) !== 'relogio'
    && validatorsType(valor) !== 'controleacesso'
    && validatorsType(valor) !== 'peca'
    && validatorsType(valor) !== 'sirene')

    if (valor === '') {
      message.type = 'É obrigatório.'
      fieldFalha.type = true
    } else if (valorValido) {
      message.type = 'tipo inválido.'
      fieldFalha.type = true
    } else fieldFalha.type = false

    return {
      fieldFalha,
      message
    }
  }
  else if (nome === 'mark'){
    
    const arrayMark = state.marksList.map(item => item.mark)
    
    const valorValido = arrayMark.filter(value => value===valor)

    if (valor === '') {
      message.mark = 'É obrigatório.'
      fieldFalha.mark = true
    } else if (valorValido.length===0) {
      message.mark = 'tipo inválido.'
      fieldFalha.mark = true
    } else fieldFalha.mark = false

    return {
      fieldFalha,
      message
    }
  }
  else if (nome === 'model'){
    
    const arraymodel = state.modelsList.map(item => item.model)
    
    const valorValido = arraymodel.filter(value => value===valor)

    if (valor === '') {
      message.model = 'É obrigatório.'
      fieldFalha.model = true
    } else if (valorValido.length===0) {
      message.model = 'tipo inválido.'
      fieldFalha.model = true
    } else fieldFalha.model = false

    return {
      fieldFalha,
      message
    }
  }
  else if (nome === 'readerColor'){

  
    if (valor === '') {
      message.readerColor = 'É obrigatório.'
      fieldFalha.readerColor = true
    } else fieldFalha.readerColor = false

    return {
      fieldFalha,
      message
    }
  }
}