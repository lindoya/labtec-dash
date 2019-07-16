import * as cnpjLib from "@fnando/cnpj";
import * as cpfLib from "@fnando/cpf";

export const masks = (nome, valor) => {
  
  if (nome === 'cnpj') {
    let value = valor
    value = value.replace(/\D/ig, '')
    value = value.slice(0, 14)

    if (value.length === 11) {
      value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
    }
    else if (value.length === 14) {
      value = value.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5')
    }

    return {
      nome,
      valor: value,
    }
 
  }else if (nome === 'numeroSerie'){
    let value = valor
    value = value.replace(/\D/ig, '')
    value = value.slice(0, 17)

    return {
      nome,
      valor: value,
    }
  }else if (nome === 'rg'){
    let value = valor
    value = value.toUpperCase(0, 9)
    value = value.replace(/[^\dX]/ig, '')
    value = value.slice(0, 9)
    value = (value.slice(0, 8)).replace(/\D/ig, '') + (value.slice(8, 9)).replace(/[^\dX]/ig, '')

    if (value.length > 1 && value.length <= 4) {
      value = value.replace(/(\d{1,3})(\d{1})/, '$1-$2')
    }
    if (value.length > 4 && value.length <= 8) {
      value = value.replace(/(\d{1,3})(\d{3})(\d{1})/, '$1.$2-$3')
    } 
    if (value.length === 9) {
      value = value.replace(/(\d{1,2})(\d{3})(\d{3})(\w{1})/, '$1.$2.$3-$4')
    }


    return {
      nome,
      valor: value,
    }
  }else if (nome === 'cpf'){
    let value = valor
    value = value.replace(/\D/ig, '')
    value = value.slice(0, 11)

    if (value.length > 2 && value.length <= 5) {
      value = value.replace(/(\d{1,3})(\d{2})/, '$1-$2')
    }
    if (value.length > 5 && value.length <= 9) {
      value = value.replace(/(\d{1,3})(\d{3})(\d{2})/, '$1.$2-$3')
    } 
    if (value.length > 9) {
      value = value.replace(/(\d{1,3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
    }

    return {
      nome,
      valor: value,
    }
  }else if (nome === 'cep'){
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
  } else if (nome === 'state') {
    let value = valor
    value = value.replace(/\W|\d/g, '')
    value = value.slice(0, 2)
    value = value.toUpperCase(0, 2)

    return {
      nome,
      valor: value,
    }
  } else if (nome === 'number') {
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
    if (!cnpjLib.isValid(valor) && !cpfLib.isValid(valor)) {
      if (valor.length === 14) message.cnpj = 'Cpf inválido.'
      else if (valor.length === 18) message.cnpj = 'Cnpj inválido.'
      else message.cnpj = 'Número incompleto.'
      fieldFalha.cnpj = true
  
    } else {
      fieldFalha.cnpj = false
      message.cnpj = ''
    }
  
    return {
      fieldFalha,
      message
    }
  }else if (nome === 'razaoSocial') {
    if (valor === '') {
      message.razaoSocial = 'É obrigatório.'
      fieldFalha.razaoSocial = true
    } else fieldFalha.razaoSocial = false

    return {
      fieldFalha,
      message
    }
  } 
  else if (nome === 'numeroSerie'){
    if (valor === '') {
      message.numeroSerie = 'É obrigatório.'
      fieldFalha.numeroSerie = true
    } else fieldFalha.numeroSerie = false

    return {
      fieldFalha,
      message
    }
  } else if (nome === 'corLeitor') {
    if (valor === '') {
      message.corLeitor = 'É obrigatório.'
      fieldFalha.corLeitor = true
    } else fieldFalha.corLeitor = false

    return {
      fieldFalha,
      message
    }
  } else if (nome === 'tipo') {
    if (valor === '') {
      message.tipo = 'É obrigatório.'
      fieldFalha.tipo = true
    } else fieldFalha.tipo = false

    return {
      fieldFalha,
      message
    }
  } else if (nome === 'marca') {
    if (valor === '') {
      message.marca = 'É obrigatório.'
      fieldFalha.marca = true
    } else fieldFalha.marca = false

    return {
      fieldFalha,
      message
    }
  } else if (nome === 'modelo') {
    if (valor === '') {
      message.modelo = 'É obrigatório.'
      fieldFalha.modelo = true
    } else fieldFalha.modelo = false

    return {
      fieldFalha,
      message
    }
  } else if (nome === 'defeito') {
    if (valor === '') {
      message.defeito = 'É obrigatório.'
      fieldFalha.defeito = true
    } else fieldFalha.defeito = false

    return {
      fieldFalha,
      message
    }
  } else if (nome === 'descricao') {
    fieldFalha.descricao = false

    return {
      fieldFalha,
      message
    }
  } else if (nome === 'danos') {
    if (valor === '') {
      message.danos = 'É obrigatório.'
      fieldFalha.danos = true
    } else fieldFalha.danos = false

    return {
      fieldFalha,
      message
    }
  } else if (nome === 'nameCliente') {
    if (valor === '') {
      message.nameCliente = 'É obrigatório.'
      fieldFalha.nameCliente = true
    } else fieldFalha.nameCliente = false

    return {
      fieldFalha,
      message
    }
  } else if (nome === 'rg') {
    if (valor === '') {
      message.rg = 'É obrigatório.'
      fieldFalha.rg = true
    } else {
      let value = valor
      value = value.replace(/\W/ig, '')
      value = value.slice(0, 9)
      if (!(/\d{9}|(\d{8}(X))/.test(value))) {
        message.rg = 'RG inválido.'
        fieldFalha.rg = true
      } else fieldFalha.rg = false
    }
      return {
        fieldFalha,
        message
      }
    } else if (nome === 'cpf') {
      if (valor === '') {
        message.cpf = 'É obrigatório.'
        fieldFalha.cpf = true
      } else fieldFalha.cpf = false

    return {
      fieldFalha,
      message
    }
  } else if (nome === 'devEmbalado') {
    if (valor === '') {
      message.devEmbalado = 'É obrigatório.'
      fieldFalha.devEmbalado = true
    } else fieldFalha.devEmbalado = false

    return {
      fieldFalha,
      message
    }
  } else if (nome === 'nameExterno') {
    if (valor === '') {
      message.nameExterno = 'É obrigatório.'
      fieldFalha.nameExterno = true
    } else fieldFalha.nameExterno = false

    return {
      fieldFalha,
      message
    }
     } else if (nome === 'nameRemetente') {
    if (valor === '') {
      message.nameRemetente = 'É obrigatório.'
      fieldFalha.nameRemetente = true
    } else fieldFalha.nameRemetente = false

    return {
      fieldFalha,
      message
    }
  } else if (nome === 'cep') {
    if (valor === '') {
      message.cep = 'É obrigatório.'
      fieldFalha.cep = true
    } else fieldFalha.cep = false

    return {
      fieldFalha,
      message
    }
  } else if (nome === 'state') {
    if (valor === '') {
      message.state = 'É obrigatório.'
      fieldFalha.state = true
    } else fieldFalha.state = false

    return {
      fieldFalha,
      message
    }
  } else if (nome === 'city') {
    if (valor === '') {
      message.city = 'É obrigatório.'
      fieldFalha.city = true
    } else fieldFalha.city = false

    return {
      fieldFalha,
      message
    }
  } else if (nome === 'neighborhood') {
    if (valor === '') {
      message.neighborhood = 'É obrigatório.'
      fieldFalha.neighborhood = true
    } else fieldFalha.neighborhood = false

    return {
      fieldFalha,
      message
    }
  } else if (nome === 'street') {
    if (valor === '') {
      message.street = 'É obrigatório.'
      fieldFalha.street = true
    } else fieldFalha.street = false

    return {
      fieldFalha,
      message
    }
  } else if (nome === 'number') {
    if (valor === '') {
      message.number = 'É obrigatório.'
      fieldFalha.number = true
    } else fieldFalha.number = false

    return {
      fieldFalha,
      message
    }
  } else if (nome === 'nameMotoboy') {
    if (valor === '') {
      message.nameMotoboy = 'É obrigatório.'
      fieldFalha.nameMotoboy = true
    } else fieldFalha.nameMotoboy = false

    return {
      fieldFalha,
      message
    }
  } else if (nome === 'nameResponsavel') {
    if (valor === '') {
      message.nameResponsavel = 'É obrigatório.'
      fieldFalha.nameResponsavel = true
    } else fieldFalha.nameResponsavel = false

    return {
      fieldFalha,
      message
    }
  }
}