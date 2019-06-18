import * as cnpjLib from "@fnando/cnpj";
import * as cpfLib from "@fnando/cpf";

export const masks = (nome, valor) => {
  
  if (nome === 'cnpj') {
    let value = valor
    value = value.replace(/\D/ig, '')
    value = value.slice(0, 14)

    if (value.length === 11) {
      value = value.slice(0, 3) +
        '.' + value.slice(3, 6) +
        '.' + value.slice(6, 9) +
        '-' + value.slice(9, 11)
    }
    else if (value.length === 14) {
      value = value.slice(0, 2) +
        '.' + value.slice(2, 5) +
        '.' + value.slice(5, 8) +
        '/' + value.slice(8, 12) +
        '-' + value.slice(12, 14)
    }

    return {
      nome,
      valor: value,
    }

    // } else if (nome === 'zipCode') {
    //   let value = valor
    //   value = value.replace(/\D/ig, '')
    //   value = value.slice(0, 8)

    //   if (value.length === 8) {
    //     value = value.slice(0, 5) + '-' + value.slice(5, 8)
    //   }

    //   fieldFalha.zipCode = true
    //   message.zipCode = 'Cep inválido'

    //   return {
    //     nome,
    //     valor: value,
    //     fieldFalha,
    //     message
    //   }

    // } else if (nome === 'telphone') {
    //   let value = valor
    //   value = value.replace(/\D/ig, '')
    //   value = value.slice(0, 11)

    //   if (value.length === 10) {
    //     value = '(' + value.slice(0, 2) + ')' + value.slice(2, 6) + '-' + value.slice(6, 10)
    //   }
    //   else if (value.length === 11) {
    //     value = '(' + value.slice(0, 2) + ')' + value.slice(2, 7) + '-' + value.slice(7, 11)
    //   }

    //   fieldFalha.telphone = true
    //   message.telphone = 'Telefone inválido'

    //   return {
    //     nome,
    //     valor: value,
    //     fieldFalha,
    //     message
    //   }

    // } else if (nome === 'state') {
    //   let value = valor
    //   value = value.replace(/\W|\d/g, '')
    //   value = value.slice(0, 2)
    //   value = value.toUpperCase(0, 2)

    //   fieldFalha.state = true
    //   message.state = 'Estado inválido'

    //   return {
    //     nome,
    //     valor: value,
    //     fieldFalha,
    //     message
    //   }

    // } else if (nome === 'number') {
    //   let value = valor
    //   value = value.replace(/\D/ig, '')

    //   fieldFalha.number = true
    //   message.number = 'Número inválido'

    //   return {
    //     nome,
    //     valor: value,
    //     fieldFalha,
    //     message
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
      message.razaoSocial = 'É Obrigatório.'
      fieldFalha.razaoSocial = true
    } else fieldFalha.razaoSocial = false

    return {
      fieldFalha,
      message
    }
  }
}