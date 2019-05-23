import React, { Component } from 'react'
import { Input, Button } from 'antd';
import './index.css'

class NewCompany extends Component {

  onChange = e => {

  };

  render() {
    return (
      <div className='div-card'>
        <div className='div-primeiraLinha'>
          <div className='div-cnpj'>
            <h2>Cnpj ou Cpf:</h2>
            <Input
              className='input-cnpj'
              placeholder='Digite o cnpj ou cep'
              allowClear
              onChange={this.onChange}
            />
          </div>
          <div className='div-rs'>
            <h2>Razão Social:</h2>
            <Input
              className='input-rs'
              placeholder='Digite a razão social'
              allowClear
              onChange={this.onChange}
            />
          </div>
        </div>
        <div className='div-primeiraLinha'>
          <div className='div-nome'>
            <h2>Nome:</h2>
            <Input
              className='input-nome'
              placeholder='Digite o nome'
              allowClear
              onChange={this.onChange}
            />
          </div>
          <div className='div-email'>
            <h2>E-mail:</h2>
            <Input
              className='input-email'
              placeholder='Digite o email'
              allowClear
              onChange={this.onChange}
            />
          </div>
          <div className='div-tel'>
            <h2>Telefone:</h2>
            <Input
              className='input-tel'
              placeholder='(99)99999-9999'
              allowClear
              onChange={this.onChange}
            />
          </div>
        </div>
        <div className='div-primeiraLinha'>
          <div className='div-cep'>
            <h2>Cep:</h2>
            <Input
              className='input-cep'
              placeholder='Digite o cep'
              allowClear
              onChange={this.onChange}
            />
          </div>
          <div className='div-uf'>
            <h2>Estado:</h2>
            <Input
              className='input-uf'
              placeholder='EX'
              allowClear
              onChange={this.onChange}
            />
          </div>
          <div className='div-rua'>
            <h2>Rua:</h2>
            <Input
              className='input-rua'
              placeholder='Digite a rua'
              allowClear
              onChange={this.onChange}
            />
          </div>
        </div>
        <div className='div-primeiraLinha'>
          <div className='div-city'>
            <h2>Cidade:</h2>
            <Input
              className='input-city'
              placeholder='Digite a cidade'
              allowClear
              onChange={this.onChange}
            />
          </div>
          <div className='div-bairro'>
            <h2>Bairro:</h2>
            <Input
              className='input-bairro'
              placeholder='Digite o bairro'
              allowClear
              onChange={this.onChange}
            />
          </div>
          <div className='div-compl'>
            <h2>Complemento:</h2>
            <Input
              className='input-compl'
              placeholder='Ex: Torre 3'
              allowClear
              onChange={this.onChange}
            />
          </div>
        </div>
        <div className='div-primeiraLinha'>
          <div className='div-numero'>
            <h2>Número:</h2>
            <Input
              className='input-numero'
              placeholder='123456789'
              allowClear
              onChange={this.onChange}
            />
          </div>
          <div className='div-refer'>
            <h2>Ponto de referência:</h2>
            <Input
              className='input-refer'
              placeholder='Digite o ponto de referência'
              allowClear
              onChange={this.onChange}
            />
          </div>
        </div>
        <div className='div-button'>
          <Button type="primary">Salvar</Button>
        </div>
      </div>
    )
  }
}

export default NewCompany