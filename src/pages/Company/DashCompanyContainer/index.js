import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Select, Input, Button, DatePicker, Icon, Modal, message, Spin } from 'antd'
import { getAllCompany, updateCompany } from '../../../services/company'
import { validators, masks } from './validator'

import 'antd/dist/antd.css'
import './index.css'


const Search = Input.Search;
const { Option } = Select;

class dashCompany extends Component {

  state = {
    loading: false,
    messageError: false,
    messageSuccess: false,
    avancado: false,
    modalDetalhesCompany: false,
    editar: false,
    compSelected: {
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
      updatedAt: '',
      createdAt: '',
    },
    fieldFalha: {
      nameContact: false,
      razaoSocial: false,
      zipCode: false,
      state: false,
      number: false,
      telphone: false,
      email: false,
      city: false,
      neighborhood: false,
      street: false,
      referencePoint: false
    },
    message: {
      nameContact: '',
      razaoSocial: '',
      zipCode: '',
      state: '',
      number: '',
      telphone: '',
      email: '',
      city: '',
      neighborhood: '',
      street: '',
      referencePoint: ''
    },
    order: {
      field: 'createdAt',
      acendent: true,
    },
    global: '',
    cnpj: '',
    razaoSocial: '',
    nameContact: '',
    telphone: '',
    createdAt: '',
    page: 1,
    total: 25,
    count: 0,
    show: 0,
    rows: [],
  }

  success = () => {
    message.success('Dados alterados com sucesso');
  };

  error = () => {
    message.error('Seus dados não foram alterados');
  };


  onChange = (e) => {
    const { nome,
      valor,
    } = masks(e.target.name, e.target.value)

    const { fieldFalha } = this.state

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
      // compSelected: {
      //   ...this.state.compSelected,
        [nome]: valor,
      // },
      fieldFalha,
    }, () => {
      this.getAll()
    })
  }

  onBlurValidator = async (e) => {
    const {
      nome,
      valor,
      fieldFalha,
      message,
    } = validators(e.target.name, e.target.value, this.state)

    await this.setState({
      [nome]: valor,
      fieldFalha,
      message
    })
  }

  changeOrder = (field) => {
    this.setState({
      order: {
        field,
        acendent: !this.state.order.acendent,
      }
    }, () => {
      this.getAll()
    })

  }

  buttonAvancado = () => {
    this.setState({
      avancado: !this.state.avancado
    })
  }

  changePages = (pages) => {
    this.setState({
      page: pages
    }, () => {
      this.getAll()
    }
    )
  }

  onChangeEditar = (e) => {
    const { nome,
      valor,
    } = masks(e.target.name, e.target.value)

    const { fieldFalha } = this.state

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
      compSelected: {
        ...this.state.compSelected,
        [nome]: valor,
      },
      fieldFalha,
    })
  }

  buttonLimpar = () => {
    this.setState({
      global: '',
      cnpj: '',
      razaoSocial: '',
      nameContact: '',
      telphone: '',
      createdAt: '',
    }, () => {
      this.getAll()
    })
  }

  componentDidMount = () => {
    this.getAll()
  }

  changeTotal = (value) => {
    this.setState({
      page: 1,
      total: value
    }, () => {
      this.getAll()
    })
  }

  buttonEditar = () => {
    this.setState({
      editar: !this.state.editar
    })
  }

  handleOk = () => {
    this.setState({
      modalDetalhesCompany: !this.state.modalDetalhesCompany,
      editar: false,
    })
  }

  getAll = async () => {
    this.setState({
      loading: true,
    })

    const query = {
      filters: {
        company: {
          global: {
            fields: ['cnpj', 'razaoSocial', 'nameContact', 'telphone'],
            value: this.state.global,
          },
          specific: {
            cnpj: this.state.cnpj,
            razaoSocial: this.state.razaoSocial,
            nameContact: this.state.nameContact,
            telphone: this.state.telphone,
          }
        }
      },
      page: this.state.page,
      total: this.state.total,
      order: this.state.order,
    }

    await getAllCompany(query).then(
      resposta => this.setState({
        loading: false,
        page: resposta.data.page,
        count: resposta.data.count,
        show: resposta.data.show,
        rows: resposta.data.rows,
      })
    )

  }

  saveTargetUpdateCompany = async () => {
    this.setState({
      loading: true
    })
    const values = {
      razaoSocial: this.state.compSelected.razaoSocial,
      cnpj: this.state.compSelected.cnpj,
      street: this.state.compSelected.street,
      number: this.state.compSelected.number,
      city: this.state.compSelected.city,
      state: this.state.compSelected.state,
      neighborhood: this.state.compSelected.neighborhood,
      referencePoint: this.state.compSelected.referencePoint,
      zipCode: this.state.compSelected.zipCode,
      telphone: this.state.compSelected.telphone,
      email: this.state.compSelected.email,
      nameContact: this.state.compSelected.nameContact,
    }

    const resposta = await updateCompany(values)

    if (resposta.status === 422) {

      this.setState({
        messageError: true,
      })
      await this.error()
      this.setState({
        messageError: false
      })
    } if (resposta.status === 200) {

      this.setState({
        compSelected: {
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
        messageSuccess: true,
        editar: !this.state.editar,
        modalDetalhesCompany: false
      })
      await this.success()
      this.setState({
        messageSuccess: false,
        loading: false,
      })
      await this.getAll()
    }
  }


  openModalDetalhesCompany = async (company) => {
    await this.setState({
      modalDetalhesCompany: true,
      compSelected: company
    })

    const cnpj = this.state.compSelected.cnpj
    const cnpjFormated = cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5')

    await this.setState({
      compSelected:
      {
        ...this.state.compSelected,
        cnpj: cnpjFormated
      }
    })
  }

  // okModalDetalhesCompany = () => {
  //   this.setState({
  //     modalDetalhesCompany: false
  //   })
  // }


  cancelModalDetalhesCompany = () => {
    this.setState({
      modalDetalhesCompany: false,
      editar: false,
    })
  }

  SearchAdvanced = () => (
    <div className='gerCmp-div-advanced'>

      <div className='gerCmp-div-left'>
        <h2 className='gerCmp-div-label'>Cnpj:</h2>
        <Input
          allowClear
          name='cnpj'
          className='input-cnpjCompany'
          placeholder="Digite o cnpj"
          value={this.state.cnpj}
          onChange={this.onChange}
        />
      </div>
      <div className='gerCmp-div-left'>
        <h2 className='gerCmp-div-label'>Razão social:</h2>
        <Input
          allowClear
          name='razaoSocial'
          className='input-cnpjCompany'
          placeholder="Digite a razão social"
          value={this.state.razaoSocial}
          onChange={this.onChange}
        />
      </div>
      <div className='gerCmp-div-left'>
        <h2 className='gerCmp-div-label'>Nome contato:</h2>
        <Input
          allowClear
          name='nameContact'
          className='input-cnpjCompany'
          placeholder="Digite o nome"
          value={this.state.nameContact}
          onChange={this.onChange}
        />
      </div>
      <div className='gerCmp-div-left'>
        <h2 className='gerCmp-div-label'>Telefone:</h2>
        <Input
          allowClear
          name='telphone'
          className='input-cnpjCompany'
          placeholder="Digite o tel"
          value={this.state.telphone}
          onChange={this.onChange}
        />
      </div>
      <div className='gerCmp-div-right'>
        <h2 className='gerCmp-div-label'>Criado em:</h2>
        <DatePicker.RangePicker
          placeholder='Digite a data'
          format='DD/MM/YYYY'
          dropdownClassName='poucas'
        />
      </div>
    </div>
  )

  ModalDetalhes = () => (
    <Modal
      title="Detalhes da empresa"
      visible={this.state.modalDetalhesCompany}
      // onOk={this.okModalDetalhesCompany}
      onCancel={this.cancelModalDetalhesCompany}
      footer={this.props.auth.addCompany ? (
        <div className='gercomp-div-button-modal'>
          {this.state.editar === false ?
            <div className='gercomp-div-button-editFalse-modal'>
              <Button
                type="primary"
                onClick={this.buttonEditar}
              >
                Editar
                  <Icon type="edit" />
              </Button>
              <Button key="submit" type="primary" onClick={this.handleOk}>
                OK
            </Button>
            </div>
            :
            <div className='gercomp-div-button-editTrue-modal'>
              <Button onClick={this.handleOk}>
                Cancelar
              </Button>
              <Button
                type="primary"
                onClick={this.saveTargetUpdateCompany}
                loading={this.state.loading}
              >
                Salvar
                <Icon type="check" />
              </Button>
            </div>
          }
        </div>
      )
        : null}
    >


      <div className='gercomp-div-form-modal'>
        <h3 className='gercomp-h3-modal'>Dados da empresa</h3>
        <div className='gercomp-div-linhaModal2'>
          <div className='gercomp-div-textCnpj-modal'>
            Cnpj
        <p className='gercomp-p'>{this.state.compSelected.cnpj}</p>
          </div>
          <div className='gercomp-div-textRazaoSocial-modal'>
            Razão social
            {this.state.editar === false ? <p className='gercomp-p'>{this.state.compSelected.razaoSocial}</p> : <div><Input
              onBlur={this.onBlurValidator}
              onChange={this.onChangeEditar}
              onFocus={this.onChangeEditar}
              name='razaoSocial'
              className={
                this.state.fieldFalha.razaoSocial ?
                  'div-comp-inputError' :
                  'gerComp-inputModal'}
              value={this.state.compSelected.razaoSocial}
            />
              {this.state.fieldFalha.razaoSocial ?
                <p className='div-comp-feedbackError'>
                  {this.state.message.razaoSocial}
                </p> : null}
            </div>}
          </div>
        </div>
        <div className='gercomp-div-linhaModal'>
          <div className='gercomp-div-textCep-modal'>
            Cep
            {this.state.editar === false ? <p className='gercomp-p'>{this.state.compSelected.zipCode.replace(/(\d{5})(\d{3})?/, '$1-$2')}</p> : <div><Input
              onBlur={this.onBlurValidator}
              onFocus={this.onChangeEditar}
              onChange={this.onChangeEditar}
              name='zipCode'
              className={
                this.state.fieldFalha.zipCode ?
                  'div-comp-inputError' :
                  'gerComp-inputModal'}
              value={this.state.compSelected.zipCode}
            />
              {this.state.fieldFalha.zipCode ?
                <p className='div-comp-feedbackError'>
                  {this.state.message.zipCode}
                </p> : null}
            </div>}
          </div>
          <div className='gercomp-div-textRua-modal'>
            Rua
            {this.state.editar === false ? <p className='gercomp-p'>{this.state.compSelected.street}</p> : <div><Input
              onBlur={this.onBlurValidator}
              onFocus={this.onChangeEditar}
              onChange={this.onChangeEditar}
              name='street'
              className={
                this.state.fieldFalha.street ?
                  'div-comp-inputError' :
                  'gerComp-inputModal'}
              value={this.state.compSelected.street}
            />
              {this.state.fieldFalha.street ?
                <p className='div-comp-feedbackError'>
                  {this.state.message.street}
                </p> : null}
            </div>}
          </div>
          <div className='gercomp-div-textNumero-modal'>
            Número
            {this.state.editar === false ? <p className='gercomp-p'>{this.state.compSelected.number}</p> : <div><Input
              onBlur={this.onBlurValidator}
              onChange={this.onChangeEditar}
              name='number'
              className={
                this.state.fieldFalha.number ?
                  'div-comp-inputError' :
                  'gerComp-inputModal'}
              value={this.state.compSelected.number}
            />
              {this.state.fieldFalha.number ?
                <p className='div-comp-feedbackError'>
                  {this.state.message.number}
                </p> : null}
            </div>}
          </div>
          <div className='gercomp-div-textBairro-modal'>
            Bairro
            {this.state.editar === false ? <p className='gercomp-p'>{this.state.compSelected.neighborhood}</p> : <div><Input
              onBlur={this.onBlurValidator}
              onFocus={this.onChangeEditar}
              onChange={this.onChangeEditar}
              name='neighborhood'
              className={
                this.state.fieldFalha.neighborhood ?
                  'div-comp-inputError' :
                  'gerComp-inputModal'}
              value={this.state.compSelected.neighborhood}
            />
              {this.state.fieldFalha.neighborhood ?
                <p className='div-comp-feedbackError'>
                  {this.state.message.neighborhood}
                </p> : null}
            </div>}
          </div>
        </div>
        <div className='gercomp-div-linhaModal'>
          <div className='gercomp-div-textCity-modal'>
            Cidade
            {this.state.editar === false ? <p className='gercomp-p'>{this.state.compSelected.city}</p> : <div><Input
              onBlur={this.onBlurValidator}
              onFocus={this.onChangeEditar}
              onChange={this.onChangeEditar}
              name='city'
              className={
                this.state.fieldFalha.city ?
                  'div-comp-inputError' :
                  'gerComp-inputModal'}
              value={this.state.compSelected.city}
            />
              {this.state.fieldFalha.city ?
                <p className='div-comp-feedbackError'>
                  {this.state.message.city}
                </p> : null}
            </div>}
          </div>
          <div className='gercomp-div-textState-modal'>
            Estado
            {this.state.editar === false ? <p className='gercomp-p'>{this.state.compSelected.state}</p> : <div><Input
              onBlur={this.onBlurValidator}
              onFocus={this.onChangeEditar}
              onChange={this.onChangeEditar}
              name='state'
              className={
                this.state.fieldFalha.state ?
                  'div-comp-inputError' :
                  'gerComp-inputModal'}
              value={this.state.compSelected.state}
            />
              {this.state.fieldFalha.state ?
                <p className='div-comp-feedbackError'>
                  {this.state.message.state}
                </p> : null}
            </div>}
          </div>
          <div className='gercomp-div-textRef-modal'>
            Ponto de referência
        {this.state.editar === false ? <p className='gercomp-p'>{this.state.compSelected.referencePoint === null ? '-' : this.state.compSelected.referencePoint}</p> : <div><Input
              onBlur={this.onBlurValidator}
              onFocus={this.onChangeEditar}
              onChange={this.onChangeEditar}
              name='referencePoint'
              className={
                this.state.fieldFalha.referencePoint ?
                  'div-comp-inputError' :
                  'gerComp-inputModal'}
              value={this.state.compSelected.referencePoint}
            />
              {this.state.fieldFalha.referencePoint ?
                <p className='div-comp-feedbackError'>
                  {this.state.message.referencePoint}
                </p> : null}
            </div>}
          </div>
        </div>
        <h3 className='gercomp-h3-modal'>Dados do registro</h3>
        <div className='gercomp-div-linhaModal'>
          <div className='gercomp-div-textCriado-modal'>
            Criado em
          <p className='gercomp-p'>{this.state.compSelected.createdAt}</p>
          </div>
          <div className='gercomp-div-textAtualizado-modal'>
            Atualizado em
            <p className='gercomp-p'>{this.state.compSelected.updatedAt}</p>
          </div>
        </div>
        <h3 className='gercomp-h3-modal'>Dados para contato</h3>
        <div className='gercomp-div-linhaModal'>
          <div className='gercomp-div-textNome-modal'>
            Nome
            {this.state.editar === false ? <p className='gercomp-p'>{this.state.compSelected.nameContact}</p> : <div><Input
              onBlur={this.onBlurValidator}
              onFocus={this.onChangeEditar}
              onChange={this.onChangeEditar}
              name='nameContact'
              className={
                this.state.fieldFalha.nameContact ?
                  'div-comp-inputError' :
                  'gerComp-inputModal'}
              value={this.state.compSelected.nameContact}
            />
              {this.state.fieldFalha.nameContact ?
                <p className='div-comp-feedbackError'>
                  {this.state.message.nameContact}
                </p> : null}
            </div>}
          </div>
          <div className='gercomp-div-textTel-modal'>
            Telefone
            {this.state.editar === false ? <p className='gercomp-p'>{this.state.compSelected.telphone}</p> : <div><Input
              onBlur={this.onBlurValidator}
              onFocus={this.onChangeEditar}
              onChange={this.onChangeEditar}
              name='telphone'
              className={
                this.state.fieldFalha.telphone ?
                  'div-comp-inputError' :
                  'gerComp-inputModal'}
              value={this.state.compSelected.telphone}
            />
              {this.state.fieldFalha.telphone ?
                <p className='div-comp-feedbackError'>
                  {this.state.message.telphone}
                </p> : null}
            </div>}
          </div>
          <div className='gercomp-div-textEmail-modal'>
            Email
            {this.state.editar === false ? <p className='gercomp-p'>{this.state.compSelected.email}</p> : <div><Input
              onBlur={this.onBlurValidator}
              onChange={this.onChangeEditar}
              onFocus={this.onChangeEditar}
              name='email'
              className={
                this.state.fieldFalha.email ?
                  'div-comp-inputError' :
                  'gerComp-inputModal'}
              value={this.state.compSelected.email}
            />
              {this.state.fieldFalha.email ?
                <p className='div-comp-feedbackError'>
                  {this.state.message.email}
                </p> : null}
            </div>}
          </div>
        </div>

        {/* {true?<div>
        {this.state.editar === false ?  <Button
            type="primary"
            onClick={this.buttonEditar}
          >
            Editar
              <Icon type="edit" />
          </Button> : <Button
            type="primary"
            onClick={this.saveTargetUpdateCompany}
          >
            Salvar
            <Icon type="check" />
          </Button>}
        </div> :''} */}


      </div>
    </Modal>
  )

  Pages = () => (

    <div className='gerCmp-div-table-footer'>
      {Math.ceil(this.state.count / this.state.total) >= 5 && Math.ceil(this.state.count / this.state.total) - this.state.page < 1 ? <Button type="primary" onClick={() => this.changePages(this.state.page - 4)}>{this.state.page - 4}</Button> : ''}
      {Math.ceil(this.state.count / this.state.total) >= 4 && Math.ceil(this.state.count / this.state.total) - this.state.page < 2 && this.state.page > 3 ? <Button type="primary" onClick={() => this.changePages(this.state.page - 3)}>{this.state.page - 3}</Button> : ''}
      {this.state.page >= 3 ? <Button type="primary" onClick={() => this.changePages(this.state.page - 2)}>{this.state.page - 2}</Button> : ''}
      {this.state.page >= 2 ? <Button type="primary" onClick={() => this.changePages(this.state.page - 1)}>{this.state.page - 1}</Button> : ''}
      <div className='div-buttonSelected-dashComp' type="primary">{this.state.page}</div>
      {this.state.page < (this.state.count / this.state.total) ? <Button type="primary" onClick={() => this.changePages(this.state.page + 1)}>{this.state.page + 1}</Button> : ''}
      {this.state.page + 1 < (this.state.count / this.state.total) ? <Button type="primary" onClick={() => this.changePages(this.state.page + 2)}>{this.state.page + 2}</Button> : ''}
      {this.state.page + 2 < (this.state.count / this.state.total) && this.state.page < 3 ? <Button type="primary" onClick={() => this.changePages(this.state.page + 3)}>{this.state.page + 3}</Button> : ''}
      {this.state.page + 3 < (this.state.count / this.state.total) && this.state.page < 2 ? <Button type="primary" onClick={() => this.changePages(this.state.page + 4)}>{this.state.page + 4}</Button> : ''}
    </div>
  )

  TableCompanies = () => (
    <div className='gerCmp-div-mainHeader' >
      <div className='gerCmp-div-table-information'>
        <div className='gerCmp-div-table-information-total'>
          <label className='gerCmp-label-table-information'>
            Quantidade por página:
          </label>
          <Select defaultValue="25" onChange={this.changeTotal} size='small'>
            <Option value="10">10</Option>
            <Option value="25">25</Option>
            <Option value="50">50</Option>
            <Option value="100">100</Option>
          </Select>
        </div>
        <div className='gerCmp-div-table-information-count'>
          <label className='gerCmp-label-table-information'>
            {`Mostrando ${this.state.show}/${this.state.count} empresas.`}
          </label>
        </div>
      </div>
      <div className='gerCmp-div-table-separeteLineMain' />
      <div className='gerCmp-div-table-header'>
        <div className='gerCmp-div-table-cel-cnpj'
          onClick={() => this.changeOrder('cnpj')}>
          {this.state.order.field === 'cnpj' ?
            <div className='gerCmp-div-icon'>
              {this.state.order.acendent ?
                <Icon type="caret-down" /> :
                <Icon type="caret-up" />}
            </div>
            : <div className='gerCmp-div-icon'></div>}
          <h2 className='gerCmp-div-table-label'>Cnpj</h2>
        </div>
        <div className='gerCmp-div-table-cel-rs'
          onClick={() => this.changeOrder('razaoSocial')}>
          {this.state.order.field === 'razaoSocial' ?
            <div className='gerCmp-div-icon'>
              {this.state.order.acendent ?
                <Icon type="caret-down" /> :
                <Icon type="caret-up" />}
            </div>
            : <div className='gerCmp-div-icon'></div>}
          <h2 className='gerCmp-div-table-label'>Razão Social</h2>
        </div>
        <div className='gerCmp-div-table-cel-nameContact'
          onClick={() => this.changeOrder('nameContact')}>
          {this.state.order.field === 'nameContact' ?
            <div className='gerCmp-div-icon'>
              {this.state.order.acendent ?
                <Icon type="caret-down" /> :
                <Icon type="caret-up" />}
            </div>
            : <div className='gerCmp-div-icon'></div>}
          <h2 className='gerCmp-div-table-label'>Nome Contato</h2>
        </div>
        <div className='gerCmp-div-table-cel-tel'
          onClick={() => this.changeOrder('telphone')}>
          {this.state.order.field === 'telphone' ?
            <div className='gerCmp-div-icon'>
              {this.state.order.acendent ?
                <Icon type="caret-down" /> :
                <Icon type="caret-up" />}
            </div>
            : <div className='gerCmp-div-icon'></div>}
          <h2 className='gerCmp-div-table-label'>Telefone</h2>
        </div>
        <div className='gerCmp-div-table-cel-createdAt'
          onClick={() => this.changeOrder('createdAt')}>
          {this.state.order.field === 'createdAt' ?
            <div className='gerCmp-div-icon'>
              {this.state.order.acendent ?
                <Icon type="caret-down" /> :
                <Icon type="caret-up" />}
            </div>
            : <div className='gerCmp-div-icon'></div>}
          <h2 className='gerCmp-div-table-label'>Criado em</h2>
        </div>
      </div>
      <div className='gerCmp-div-table-separeteLineMain' />
      {this.state.loading ? <div className='gerCmp-spin'><Spin spinning={this.state.loading} /></div> : null}
      {
        this.state.rows.map((line) =>
          <div className='gerCmp-div-table-list' >
            <div className='gerCmp-div-tableRow' onClick={() => this.openModalDetalhesCompany(line)}>

              <div className='gerCmp-div-table-cel-cnpj'>
                <label className='gerCmp-div-table-label-cel'>
                  {line.cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5')}
                </label>
              </div>
              <div className='gerCmp-div-table-cel-rs'>
                <label className='gerCmp-div-table-label-cel'>
                  {line.razaoSocial}
                </label>
              </div>
              <div className='gerCmp-div-table-cel-nameContact'>
                <label className='gerCmp-div-table-label-cel'>
                  {line.nameContact}
                </label>
              </div>
              <div className='gerCmp-div-table-cel-tel'>
                <label className='gerCmp-div-table-label-cel'>
                  {line.telphone.length === 10 ? line.telphone.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3') : line.telphone.replace(/(\d{2})(\d{5})(\d{1,4})/, '($1) $2-$3')}
                </label>
              </div>
              <div className='gerCmp-div-table-cel-createdAt'>
                <label className='gerCmp-div-table-label-cel'>
                  {line.createdAt}
                </label>
              </div>
            </div>
            <div className='gerCmp-div-table-separeteLinerow' />
          </div>
        )
      }
      <div className='gerCmp-div-table-footer'>
        <this.Pages />
      </div>
    </div>
  )

  render() {
    console.log(this.state)
    return (
      <div className='gerCmp-div-card' >
        <this.ModalDetalhes />

        <div className='gerCmp-div-header'>
          <h1 className='gerCmp-div-title'>Gerenciar empresas</h1>
        </div>

        <div className='gerCmp-div-buttonAndSearch'>

          <Search className='gerCmp-search'
            placeholder="Digite o que deseja procurar"
            onSearch={value => console.log(value)}
            size='large'
            name='global'
            value={this.state.global}
            onChange={this.onChange}
          />

          <Button
            onClick={this.buttonLimpar}
            className='gerCmp-button-dashCompany'
            type='primary'
          >Limpar
          </Button>

          {this.state.avancado ?
            <Button
              onClick={this.buttonAvancado}
              className='gerCmp-button-dashCompany'
              type='primary'
            >Ocultar
          </Button> :
            <Button
              onClick={this.buttonAvancado}
              className='gerCmp-button-dashCompany'
              type='primary'
            >Avançado
          </Button>}
        </div>
        {this.state.avancado ? <this.SearchAdvanced /> : null}
        <this.TableCompanies />
      </div>
    )

  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  }
}

export default connect(mapStateToProps)(dashCompany)
