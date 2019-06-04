import action from '../../../store/actions'
import { newCompany } from '../../../services/company'

export function changeValueCompany(e) {
  if(e.target.name === 'cnpj'){
    let value = e.target.value
    value = value.replace(/\D/ig, '')
    value= value.slice(0,14)

    if(value.length === 11){
      value = value.slice(0,3) + '.' + value.slice(3,6) + '.' +  value.slice(6,9) + '-' +  value.slice(9,11)
    }
    else if(value.length === 14){
      value = value.slice(0,2) + '.' + value.slice(2,5) + '.' +  value.slice(5,8) + '/' +  value.slice(8,12) + '-' + value.slice(12,14)
    }
    const payload = {
      name: 'cnpj',
      value,
    }
    return{
      type: action.COMPANY.CREATE.CHANGE_VALUE,
      payload,
    }
  }
  if(e.target.name === 'zipCode'){
    let value = e.target.value
    value = value.replace(/\D/ig, '')
    value= value.slice(0,8)
    
    if(value.length === 8){
      value = value.slice(0,5) + '-' + value.slice(5,8) 
    }
    const payload = {
      name: 'zipCode',
      value,
    }
    return{
      type: action.COMPANY.CREATE.CHANGE_VALUE,
      payload,
    }
  }
  if(e.target.name === 'telphone'){
    let value = e.target.value
    value = value.replace(/\D/ig, '')
    value= value.slice(0,11)

    if(value.length === 10){
      value = '(' + value.slice(0,2) + ')' + value.slice(2,6) + '-' +  value.slice(6,10)
    }
    else if(value.length === 11){
      value = '(' + value.slice(0,2) + ')' + value.slice(2,7) + '-' +  value.slice(7,11)
    }
    const payload = {
      name: 'telphone',
      value,
    }
    return{
      type: action.COMPANY.CREATE.CHANGE_VALUE,
      payload,
    }
  }
  if(e.target.name === 'state'){
    let value = e.target.value
    value = value.replace(/\W|\d/g, '')
    value= value.slice(0,2)
    value = value.toUpperCase(0,2)

    const payload = {
      name: 'state',
      value,
    }
    return{
      type: action.COMPANY.CREATE.CHANGE_VALUE,
      payload,
    }
  }
  if(e.target.name === 'number'){
    let value = e.target.value
    value = value.replace(/\D/ig, '')

    const payload = {
      name: 'number',
      value,
    }
    return{
      type: action.COMPANY.CREATE.CHANGE_VALUE,
      payload,
    }
  }
  return {
    type: action.COMPANY.CREATE.CHANGE_VALUE,
    payload: e.target,
  }
}

export function onSubmit(value) {
  return dispatch => {
    const response = newCompany(value)
    return dispatch({
      type: action.COMPANY.CREATE.SUBMIT,
      payload: response,
    })
  }
}