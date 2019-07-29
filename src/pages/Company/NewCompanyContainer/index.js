import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Input, Button, message } from 'antd';
import * as R from 'ramda'
import { newCompany, getAddressByZipCode } from '../../../services/company'
import { validators, masks } from './validator'


import './index.css'

class NewCompany extends Component {

  state = {
    message: {
      razaoSocial: '',
      cnpj: '',
      street: '',
      number: '',
      city: '',
      state: '',
      neighborhood: '',
      referencePoint: '',
      zipCode: '',
      telphone: '',
      email: '',
      nameContact: '',
    },
    fieldFalha: {
      razaoSocial: false,
      cnpj: false,
      street: false,
      number: false,
      city: false,
      state: false,
      neighborhood: false,
      referencePoint: false,
      zipCode: false,
      telphone: false,
      email: false,
      nameContact: false,
    },
    razaoSocial: '',
    cnpj: '',
    street: '',
    number: '',
    city: '',
    state: '',
    neighborhood: '',
    referencePoint: '',
    zipCode: '',
    telphone: '',
    email: '',
    nameContact: '',
    complement: '',
    messageError: false,
    messageSuccess: false
  }

  saveTargetNewCompany = async () => {
    const values = {
      razaoSocial: this.state.razaoSocial,
      cnpj: this.state.cnpj,
      street: this.state.street,
      number: this.state.number,
      city: this.state.city,
      state: this.state.state,
      neighborhood: this.state.neighborhood,
      referencePoint: this.state.referencePoint,
      zipCode: this.state.zipCode,
      telphone: this.state.telphone,
      email: this.state.email,
      nameContact: this.state.nameContact,
      complement: this.state.complement,
      responsibleUser: this.props.username,
    }

    const resposta = await newCompany(values)

    console.log(resposta)

    if (resposta.status === 422) {

      this.setState({
        messageError: true,
        fieldFalha: resposta.data.fields[0].field,
        message: resposta.data.fields[0].message,
      })
      await this.error()
      this.setState({
        messageError: false,
        loading: false
      })
    } if (resposta.status === 200) {

      this.setState({
        razaoSocial: '',
        cnpj: '',
        street: '',
        number: '',
        city: '',
        state: '',
        neighborhood: '',
        referencePoint: '',
        zipCode: '',
        telphone: '',
        email: '',
        nameContact: '',
        complement: '',
        messageSuccess: true,
      })
      await this.success()
      this.setState({
        messageSuccess: false
      })
    }
  }

  success = () => {
    message.success('Empresa cadastrada com sucesso');
  };

  error = () => {
    message.error('O cadastro está inválido.');
  };

  onChange = (e) => {
    const { nome,
      valor,
    } = masks(e.target.name, e.target.value)

    const { fieldFalha } = this.state

    if (nome === 'cnpj') fieldFalha.cnpj = false
    if (nome === 'razaoSocial') fieldFalha.razaoSocial = false
    if (nome === 'nameContact') fieldFalha.nameContact = false
    if (nome === 'email') fieldFalha.email = false
    if (nome === 'telphone') fieldFalha.telphone = false
    if (nome === 'zipCode') fieldFalha.zipCode = false
    if (nome === 'state') fieldFalha.state = false
    if (nome === 'city') fieldFalha.city = false
    if (nome === 'neighborhood') fieldFalha.neighborhood = false
    if (nome === 'street') fieldFalha.street = false
    if (nome === 'number') fieldFalha.number = false
    if (nome === 'referencePoint') fieldFalha.referencePoint = false

    this.setState({
      [nome]: valor,
      fieldFalha,
    })
  }

  onBlurValidator = (e) => {
    const {
      nome,
      valor,
      fieldFalha,
      message,
    } = validators(e.target.name, e.target.value, this.state)

    this.setState({
      [nome]: valor,
      fieldFalha,
      message
    })
  }

  getAddress = async (e) => {
    const zipCode = e.target.value
    try {
      const { fieldFalha, message } = this.state

      fieldFalha.state = false
      fieldFalha.city = false
      fieldFalha.neighborhood = false
      fieldFalha.street = false
      const address = await getAddressByZipCode(zipCode)

      // console.log(address)

      if (R.has('erro', address.data)) {
        fieldFalha.zipCode = true
        message.zipCode = 'Cep não encontrado.'

        this.setState({
          fieldFalha,
          message,
        })
      } else {
        this.setState({
          street: address.data.logradouro,
          city: address.data.localidade,
          neighborhood: address.data.bairro,
          state: address.data.uf,
        })
      }

    } catch (error) {
      const { fieldFalha, message } = this.state

      fieldFalha.zipCode = true
      message.zipCode = 'Cep inválido.'

      this.setState({
        fieldFalha,
        message
      })
    }
  }


  render() {
    // console.log(this.state)
    return (
      <div className='div-comp-card'>

        <div className='div-comp-Linha div-comp-header'>
          <h1 className='div-comp-title'>Cadastro de empresa</h1>
        </div>

        <div className='div-comp-form'>

          <div className='div-comp-Linha'>

            <div className='div-comp-cnpj'>
              <h2 className={
                this.state.fieldFalha.cnpj ?
                  'div-comp-labelError' :
                  'div-comp-label'
              }>Cnpj ou Cpf:</h2>
              <Input
                className={
                  this.state.fieldFalha.cnpj ?
                    'div-comp-inputError' :
                    ''}
                placeholder='Digite o cnpj ou cpf'
                name='cnpj'
                value={this.state.cnpj}
                onChange={this.onChange}
                onBlur={this.onBlurValidator}
                onFocus={this.onChange}
              />
              {this.state.fieldFalha.cnpj ?
                <p className='div-comp-feedbackError'>
                  {this.state.message.cnpj}
                </p> : null}
            </div>

            <div className='div-comp-rs'>
              <h2 className={
                this.state.fieldFalha.razaoSocial ?
                  'div-comp-labelError' :
                  'div-comp-label'
              }>Razão Social:</h2>
              <Input
                className={
                  this.state.fieldFalha.razaoSocial ?
                    'div-comp-inputError' :
                    ''}
                placeholder='Digite a razão social'
                name='razaoSocial'
                value={this.state.razaoSocial}
                onChange={this.onChange}
                onBlur={this.onBlurValidator}
                onFocus={this.onChange}
              />
              {this.state.fieldFalha.razaoSocial ?
                <p className='div-comp-feedbackError'>
                  {this.state.message.razaoSocial}
                </p> : null}
            </div>
          </div>


          <div className='div-comp-Linha'>

            <div className='div-comp-nome'>
              <h2 className={
                this.state.fieldFalha.nameContact ?
                  'div-comp-labelError' :
                  'div-comp-label'
              }>Nome:</h2>
              <Input
                className={
                  this.state.fieldFalha.nameContact ?
                    'div-comp-inputError' :
                    ''}
                placeholder='Digite o nome'
                name='nameContact'
                value={this.state.nameContact}
                onChange={this.onChange}
                onBlur={this.onBlurValidator}
                onFocus={this.onChange}
              />
              {this.state.fieldFalha.nameContact ?
                <p className='div-comp-feedbackError'>
                  {this.state.message.nameContact}
                </p> : null}
            </div>

            <div className='div-comp-email'>
              <h2 className={
                this.state.fieldFalha.email ?
                  'div-comp-labelError' :
                  'div-comp-label'
              }>E-mail:</h2>
              <Input
                className={
                  this.state.fieldFalha.email ?
                    'div-comp-inputError' :
                    ''}
                placeholder='Digite o email'
                name='email'
                value={this.state.email}
                onChange={this.onChange}
                onBlur={this.onBlurValidator}
                onFocus={this.onChange}
              />
              {this.state.fieldFalha.nameContact ?
                <p className='div-comp-feedbackError'>
                  {this.state.message.nameContact}
                </p> : null}
            </div>

            <div className='div-comp-tel'>
              <h2 className={
                this.state.fieldFalha.telphone ?
                  'div-comp-labelError' :
                  'div-comp-label'
              }>Telefone:</h2>
              <Input
                className={
                  this.state.fieldFalha.telphone ?
                    'div-comp-inputError' :
                    ''}
                placeholder='(99)99999-9999'
                name='telphone'
                value={this.state.telphone}
                onChange={this.onChange}
                onBlur={this.onBlurValidator}
                onFocus={this.onChange}
              />
              {this.state.fieldFalha.telphone ?
                <p className='div-comp-feedbackError'>
                  {this.state.message.telphone}
                </p> : null}

            </div>
          </div>

          <div className='div-comp-Linha'>

            <div className='div-comp-cep'>
              <h2 className={
                this.state.fieldFalha.zipCode ?
                  'div-comp-labelError' :
                  'div-comp-label'
              }>Cep:</h2>
              <Input
                className={
                  this.state.fieldFalha.zipCode ?
                    'div-comp-inputError' :
                    ''}
                placeholder='Digite o cep'
                name='zipCode'
                value={this.state.zipCode}
                onChange={this.onChange}
                onBlur={this.getAddress}
                onFocus={this.onChange}
              />
              {this.state.fieldFalha.zipCode ?
                <p className='div-comp-feedbackError'>
                  {this.state.message.zipCode}
                </p> : null}
            </div>

            <div className='div-comp-uf'>
              <h2 className={
                this.state.fieldFalha.state ?
                  'div-comp-labelError' :
                  'div-comp-label'
              }>Estado:</h2>
              <Input
                className={
                  this.state.fieldFalha.state ?
                    'div-comp-inputError' :
                    ''}
                placeholder='EX'
                name='state'
                value={this.state.state}
                onChange={this.onChange}
                onBlur={this.onBlurValidator}
                onFocus={this.onChange}
              />
              {this.state.fieldFalha.state ?
                <p className='div-comp-feedbackError'>
                  {this.state.message.state}
                </p> : null}
            </div>

            <div className='div-comp-city'>
              <h2 className={
                this.state.fieldFalha.city ?
                  'div-comp-labelError' :
                  'div-comp-label'
              }>Cidade:</h2>
              <Input
                className={
                  this.state.fieldFalha.city ?
                    'div-comp-inputError' :
                    ''}
                placeholder='Digite a cidade'
                name='city'
                value={this.state.city}
                onChange={this.onChange}
                onBlur={this.onBlurValidator}
                onFocus={this.onChange}
              />
              {this.state.fieldFalha.city ?
                <p className='div-comp-feedbackError'>
                  {this.state.message.city}
                </p> : null}
            </div>

            <div className='div-comp-bairro'>
              <h2 className={
                this.state.fieldFalha.neighborhood ?
                  'div-comp-labelError' :
                  'div-comp-label'
              }>Bairro:</h2>
              <Input
                className={
                  this.state.fieldFalha.neighborhood ?
                    'div-comp-inputError' :
                    ''}
                placeholder='Digite o bairro'
                name='neighborhood'
                value={this.state.neighborhood}
                onChange={this.onChange}
                onBlur={this.onBlurValidator}
                onFocus={this.onChange}
              />
              {this.state.fieldFalha.neighborhood ?
                <p className='div-comp-feedbackError'>
                  {this.state.message.neighborhood}
                </p> : null}
            </div>
          </div>

          <div className='div-comp-Linha'>

            <div className='div-comp-rua'>
              <h2 className={
                this.state.fieldFalha.street ?
                  'div-comp-labelError' :
                  'div-comp-label'
              }>Rua:</h2>
              <Input
                className={
                  this.state.fieldFalha.street ?
                    'div-comp-inputError' :
                    ''}
                placeholder='Digite a rua'
                name='street'
                value={this.state.street}
                onChange={this.onChange}
                onBlur={this.onBlurValidator}
                onFocus={this.onChange}
              />
              {this.state.fieldFalha.street ?
                <p className='div-comp-feedbackError'>
                  {this.state.message.street}
                </p> : null}
            </div>

            <div className='div-comp-numero'>
              <h2 className={
                this.state.fieldFalha.number ?
                  'div-comp-labelError' :
                  'div-comp-label'
              }>Número:</h2>
              <Input
                className={
                  this.state.fieldFalha.number ?
                    'div-comp-inputError' :
                    ''}
                placeholder='123456789'
                name='number'
                value={this.state.number}
                onChange={this.onChange}
                onBlur={this.onBlurValidator}
                onFocus={this.onChange}
              />
              {this.state.fieldFalha.number ?
                <p className='div-comp-feedbackError'>
                  {this.state.message.number}
                </p> : null}
            </div>
          </div>

          <div className='div-comp-Linha'>

            <div className='div-comp-compl'>

              <h2 className='div-comp-label'>Complemento (opcional):</h2>
              <Input
                name='complement'
                placeholder='Ex: Bloco 3, Torre 1'
                value={this.state.complement}
                onChange={this.onChange}
                onFocus={this.onChange}
              />
            </div>

            <div className='div-comp-refer'>
              <h2 className='div-comp-label'>Ponto de referência (opcional):</h2>
              <Input
                className='input-refer'
                placeholder='Digite o ponto de referência'
                name='referencePoint'
                value={this.state.referencePoint}
                onChange={this.onChange}
                onFocus={this.onChange}
              />
            </div>
          </div>

          <div className='div-comp-button'>
            <Button
              className='comp-button'
              onClick={this.saveTargetNewCompany}
              type="primary">Salvar
            </Button>
          </div>

        </div>
      </div>
    )
  }
}


function mapStateToProps(state) {
  return {
    username: state.auth.username,
  }
}


export default connect(mapStateToProps)(NewCompany)