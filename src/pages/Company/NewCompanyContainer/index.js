import React, { Component } from 'react'
import { Input } from 'antd';
import './index.css'

class NewCompany extends Component {

  onChange = e => {

  };

  render() {
    return (
      <div className='teste'>
      <div className='div-main-newCompany'>
      <div>
        <h3 className='h3'>Razão Social:</h3>
        <Input
          className='input-RZ'
          placeholder="Digite a razão social"
          allowClear
          onChange={this.onChange}
        />
        </div>
        <div>
        <h3 className='h3'>Cnpj ou Cpf:</h3>
        <Input
          className='input-Cnpj'
          placeholder="Digite o cnpj ou cpf"
          allowClear
          onChange={this.onChange}
        />
        </div>
      </div>
      </div>
    )
  }
}

export default NewCompany