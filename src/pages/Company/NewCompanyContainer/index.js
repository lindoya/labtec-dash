import React, { Component } from 'react'
import { Input, Modal, Button } from 'antd';

import * as R from 'ramda'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { changeValueCompany, onSubmit } from '../CompanyRedux/action'
import './index.css'

class NewCompany extends Component {
  onSubmit = () => {
    const body = R.omit(['sucess'], this.props.value)
    this.props.onSubmit(body)
  }

  render() {
    if (this.props.value.sucess) {
      Modal.success({
        title: 'Sucesso',
        content: `A empresa foi cadastrada com sucesso`,
      })
    }

    return (
      <div className='div-comp-card'>

        <div className='div-comp-Linha div-comp-header'>
          <h1 className='div-comp-title'>Cadastro Empresa</h1>
        </div>

        <div className='div-comp-form'>

          <div className='div-comp-Linha'>

            <div className='div-comp-cnpj'>
              <h2 className={
                this.props.value.fieldFalha.cnpj ?
                  'div-comp-labelError' :
                  'div-comp-label'
              }>Cnpj ou Cpf:</h2>
              <Input
                className={
                  this.props.value.fieldFalha.cnpj ?
                    'div-comp-inputError' :
                    ''}
                placeholder='Digite o cnpj ou cpf'
                name='cnpj'
                value={this.props.value.cnpj}
                onChange={this.props.changeValueCompany}
              />
              {this.props.value.fieldFalha.cnpj ?
                <p className='div-comp-feedbackError'>
                  {this.props.value.message.cnpj}
                </p> : null}
            </div>

            <div className='div-comp-rs'>
              <h2 className={
                this.props.value.fieldFalha.razaoSocial ?
                  'div-comp-labelError' :
                  'div-comp-label'
              }>Razão Social:</h2>
              <Input
                className={
                  this.props.value.fieldFalha.razaoSocial ?
                    'div-comp-inputError' :
                    ''}
                placeholder='Digite a razão social'
                name='razaoSocial'
                value={this.props.value.razaoSocial}
                onChange={this.props.changeValueCompany}
              />
              {this.props.value.fieldFalha.razaoSocial ?
                <p className='div-comp-feedbackError'>
                  {this.props.value.message.razaoSocial}
                </p> : null}
            </div>
          </div>


          <div className='div-comp-Linha'>

            <div className='div-comp-nome'>
              <h2 className={
                this.props.value.fieldFalha.nameContact ?
                  'div-comp-labelError' :
                  'div-comp-label'
              }>Nome:</h2>
              <Input
                className={
                  this.props.value.fieldFalha.nameContact ?
                    'div-comp-inputError' :
                    ''}
                placeholder='Digite o nome'
                name='nameContact'
                value={this.props.value.nameContact}
                onChange={this.props.changeValueCompany}
              />
              {this.props.value.fieldFalha.nameContact ?
                <p className='div-comp-feedbackError'>
                  {this.props.value.message.nameContact}
                </p> : null}
            </div>

            <div className='div-comp-email'>
              <h2 className={
                this.props.value.fieldFalha.email ?
                  'div-comp-labelError' :
                  'div-comp-label'
              }>E-mail:</h2>
              <Input
                className={
                  this.props.value.fieldFalha.email ?
                    'div-comp-inputError' :
                    ''}
                placeholder='Digite o email'
                name='email'
                value={this.props.value.email}
                onChange={this.props.changeValueCompany}
              />
              {this.props.value.fieldFalha.nameContact ?
                <p className='div-comp-feedbackError'>
                  {this.props.value.message.nameContact}
                </p> : null}
            </div>

            <div className='div-comp-tel'>
              <h2 className={
                this.props.value.fieldFalha.telphone ?
                  'div-comp-labelError' :
                  'div-comp-label'
              }>Telefone:</h2>
              <Input
                className={
                  this.props.value.fieldFalha.telphone ?
                    'div-comp-inputError' :
                    ''}
                placeholder='(99)99999-9999'
                name='telphone'
                value={this.props.value.telphone}
                onChange={this.props.changeValueCompany}
              />
              {this.props.value.fieldFalha.telphone ?
                <p className='div-comp-feedbackError'>
                  {this.props.value.message.telphone}
                </p> : null}

            </div>
          </div>

          <div className='div-comp-Linha'>

            <div className='div-comp-cep'>
              <h2 className={
                this.props.value.fieldFalha.zipCode ?
                  'div-comp-labelError' :
                  'div-comp-label'
              }>Cep:</h2>
              <Input
                className={
                  this.props.value.fieldFalha.zipCode ?
                    'div-comp-inputError' :
                    ''}
                placeholder='Digite o cep'
                name='zipCode'
                value={this.props.value.zipCode}
                onChange={this.props.changeValueCompany}
              />
              {this.props.value.fieldFalha.zipCode ?
                <p className='div-comp-feedbackError'>
                  {this.props.value.message.zipCode}
                </p> : null}
            </div>

            <div className='div-comp-uf'>
              <h2 className={
                this.props.value.fieldFalha.state ?
                  'div-comp-labelError' :
                  'div-comp-label'
              }>Estado:</h2>
              <Input
                className={
                  this.props.value.fieldFalha.state ?
                    'div-comp-inputError' :
                    ''}
                placeholder='EX'
                name='state'
                value={this.props.value.state}
                onChange={this.props.changeValueCompany}
              />
              {this.props.value.fieldFalha.state ?
                <p className='div-comp-feedbackError'>
                  {this.props.value.message.state}
                </p> : null}
            </div>

            <div className='div-comp-city'>
              <h2 className={
                this.props.value.fieldFalha.city ?
                  'div-comp-labelError' :
                  'div-comp-label'
              }>Cidade:</h2>
              <Input
                className={
                  this.props.value.fieldFalha.city ?
                    'div-comp-inputError' :
                    ''}
                placeholder='Digite a cidade'
                name='city'
                value={this.props.value.city}
                onChange={this.props.changeValueCompany}
              />
              {this.props.value.fieldFalha.city ?
                <p className='div-comp-feedbackError'>
                  {this.props.value.message.city}
                </p> : null}
            </div>

            <div className='div-comp-bairro'>
              <h2 className={
                this.props.value.fieldFalha.neighborhood ?
                  'div-comp-labelError' :
                  'div-comp-label'
              }>Bairro:</h2>
              <Input
                className={
                  this.props.value.fieldFalha.neighborhood ?
                    'div-comp-inputError' :
                    ''}
                placeholder='Digite o bairro'
                name='neighborhood'
                value={this.props.value.neighborhood}
                onChange={this.props.changeValueCompany}
              />
              {this.props.value.fieldFalha.neighborhood ?
                <p className='div-comp-feedbackError'>
                  {this.props.value.message.neighborhood}
                </p> : null}
            </div>
          </div>

          <div className='div-comp-Linha'>

            <div className='div-comp-rua'>
              <h2 className={
                this.props.value.fieldFalha.street ?
                  'div-comp-labelError' :
                  'div-comp-label'
              }>Rua:</h2>
              <Input
                className={
                  this.props.value.fieldFalha.street ?
                    'div-comp-inputError' :
                    ''}
                placeholder='Digite a rua'
                name='street'
                value={this.props.value.street}
                onChange={this.props.changeValueCompany}
              />
              {this.props.value.fieldFalha.street ?
                <p className='div-comp-feedbackError'>
                  {this.props.value.message.street}
                </p> : null}
            </div>

            <div className='div-comp-numero'>
              <h2 className={
                this.props.value.fieldFalha.number ?
                  'div-comp-labelError' :
                  'div-comp-label'
              }>Número:</h2>
              <Input
                className={
                  this.props.value.fieldFalha.number ?
                    'div-comp-inputError' :
                    ''}
                placeholder='123456789'
                name='number'
                value={this.props.value.number}
                onChange={this.props.changeValueCompany}
              />
              {this.props.value.fieldFalha.number ?
                <p className='div-comp-feedbackError'>
                  {this.props.value.message.number}
                </p> : null}
            </div>
          </div>

          <div className='div-comp-Linha'>

            <div className='div-comp-compl'>

              <h2 className='div-comp-label'>Complemento:</h2>
              <Input
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
            <Button
              className='comp-button'
              onClick={this.onSubmit}
              type="primary">Salvar
            </Button>
          </div>

        </div>
      </div>
    )
  }
}

function mapDispacthToProps(dispach) {
  return bindActionCreators({ changeValueCompany, onSubmit }, dispach)
}

function mapStateToProps(state) {
  return {
    value: state.newCompany,
  }
}

export default connect(mapStateToProps, mapDispacthToProps)(NewCompany)
