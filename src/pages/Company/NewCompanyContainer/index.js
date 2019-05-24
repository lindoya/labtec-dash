import React, { Component } from 'react'
import { Input, Button } from 'antd';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { changeValueCompany } from '../CompanyRedux/action'
import './index.css'

class NewCompany extends Component {
  

  render() {
    return (
      <div className='div-comp-card'>
          <div className='div-comp-primeiraLinha div-comp-header'>
            <h1 className='div-comp-title'>Cadastro Empresa</h1>
          </div>
        <div className='div-comp-form'>
          <div className='div-comp-primeiraLinha'>
            <div className='div-comp-cnpj'>
              <h2 className='div-comp-label'>Cnpj ou Cpf:</h2>
              <Input
                className='input-cnpj'
                placeholder='Digite o cnpj ou cep'
                
                name='cnpj'
                value={this.props.value.cnpj} 
                onChange={this.props.changeValueCompany}
              />
            </div>
            <div className='div-comp-rs'>
              <h2 className='div-comp-label'>Razão Social:</h2>
              <Input
                className='input-rs'
                placeholder='Digite a razão social'
                
                name='razaoSocial'
                value={this.props.value.razaoSocial} 
                onChange={this.props.changeValueCompany}
              />
            </div>
          </div>
          <div className='div-comp-primeiraLinha'>
            <div className='div-comp-nome'>
              <h2 className='div-comp-label'>Nome:</h2>
              <Input
                className='input-nome'
                placeholder='Digite o nome'
                
                name='nameContact'
                value={this.props.value.nameContact} 
                onChange={this.props.changeValueCompany}
              />
            </div>
            <div className='div-comp-email'>
              <h2 className='div-comp-label'>E-mail:</h2>
              <Input
                className='input-email'
                placeholder='Digite o email'
                
                name='email'
                value={this.props.value.email} 
                onChange={this.props.changeValueCompany}
              />
            </div>
            <div className='div-comp-tel'>
              <h2 className='div-comp-label'>Telefone:</h2>
              <Input
                className='input-tel'
                placeholder='(99)99999-9999'
                
                name='telphone'
                value={this.props.value.telphone} 
                onChange={this.props.changeValueCompany}
              />
            </div>
          </div>
          <div className='div-comp-primeiraLinha'>
            <div className='div-comp-cep'>
              <h2 className='div-comp-label'>Cep:</h2>
              <Input
                className='input-cep'
                placeholder='Digite o cep'
                
                name='zipCode'
                value={this.props.value.zipCode} 
                onChange={this.props.changeValueCompany}
              />
            </div>
            <div className='div-comp-uf'>
              <h2 className='div-comp-label'>Estado:</h2>
              <Input
                className='input-uf'
                placeholder='EX'
                
                name='state'
                value={this.props.value.state} 
                onChange={this.props.changeValueCompany}
              />
            </div>
            <div className='div-comp-city'>
              <h2 className='div-comp-label'>Cidade:</h2>
              <Input
                className='input-city'
                placeholder='Digite a cidade'
                
                name='city'
                value={this.props.value.city} 
                onChange={this.props.changeValueCompany}
              />
            </div>
            <div className='div-comp-bairro'>
              <h2 className='div-comp-label'>Bairro:</h2>
              <Input
                className='input-bairro'
                placeholder='Digite o bairro'
                
                name='neighborhood'
                value={this.props.value.neighborhood} 
                onChange={this.props.changeValueCompany}
              />
            </div>
          </div>
          <div className='div-comp-primeiraLinha'>
            <div className='div-comp-rua'>
              <h2 className='div-comp-label'>Rua:</h2>
              <Input
                className='input-rua'
                placeholder='Digite a rua'
                
                name='street'
                value={this.props.value.street} 
                onChange={this.props.changeValueCompany}
              />
            </div>
            <div className='div-comp-numero'>
              <h2 className='div-comp-label'>Número:</h2>
              <Input
                className='input-numero'
                placeholder='123456789'
                
                name='number'
                value={this.props.value.number} 
                onChange={this.props.changeValueCompany}
              />
            </div>
          </div>
          <div className='div-comp-primeiraLinha'>
            <div className='div-comp-compl'>
              <h2 className='div-comp-label'>Complemento:</h2>
              <Input
                className='input-compl'
                placeholder='Ex: Torre 3'
                
                name='complement'
                value={this.props.value.complement} 
                onChange={this.props.changeValueCompany}
              />
            </div>
            <div className='div-comp-refer'>
              <h2 className='div-comp-label'>Ponto de referência:</h2>
              <Input
                className='input-refer'
                placeholder='Digite o ponto de referência'
                
                name='referencePoint'
                value={this.props.value.referencePoint} 
                onChange={this.props.changeValueCompany}
              />
            </div>
          </div>
          <div className='div-comp-button'>
            <Button className='comp-button' type="primary">Salvar</Button>
          </div>
        </div>
      </div>
    )
  }
}

function mapDispacthToProps(dispach) {
  return bindActionCreators ({ changeValueCompany }, dispach)
}

function mapStateToProps (state) {
  return {
    value: state.newCompany,
  }
}

export default connect ( mapStateToProps, mapDispacthToProps)(NewCompany)
