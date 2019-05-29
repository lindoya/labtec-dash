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