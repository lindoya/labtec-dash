import React, { Component } from 'react'
import { Select, Input, Button, DatePicker, Icon, Modal } from 'antd'
import { getAllCompany } from '../../../services/company'

import 'antd/dist/antd.css'
import './index.css'


const Search = Input.Search;
const { Option } = Select;

class NewCompany extends Component {

  state = {
    avancado: false,
    modalDetalhesCompany: false,
    companySelected: '',
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

  onChange = (e) => {
    const evento = e.target

    this.setState({
      [evento.name]: evento.value,
    }, () => {
      this.getAll()
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
      total: value
    }, () => {
      console.log(this.state)
      this.getAll()
    })
  }

  getAll = async () => {
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
      page: 1,
      total: 25,
      order: this.state.order,
    }

    await getAllCompany(query).then(
      resposta => this.setState({
        page: resposta.data.page,
        count: resposta.data.count,
        show: resposta.data.show,
        rows: resposta.data.rows,
      })
    )
  }

  openModalDetalhesCompany = (company) => {
    this.setState({
      modalDetalhesCompany: true,
      companySelected: company
    })
  }

  okModalDetalhesCompany = () => {
    this.setState({
      modalDetalhesCompany: false
    })
  }

  cancelModalDetalhesCompany = () => {
    this.setState({
      modalDetalhesCompany: false
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
      onOk={this.okModalDetalhesCompany}
      onCancel={this.cancelModalDetalhesCompany}
    >
      <div className='gercomp-div-form-modal'>
        <h3 className='gercomp-h3-modal'>Dados da empresa</h3>
        <div className='gercomp-div-linhaModal2'>
          <div className='gercomp-div-textCnpj-modal'>
            Cnpj
        <p className='gercomp-p'>{this.state.companySelected.cnpj}</p>
          </div>
          <div className='gercomp-div-textRazaoSocial-modal'>
            Razão social
        <p className='gercomp-p'>{this.state.companySelected.razaoSocial}</p>
          </div>
        </div>
        <h3 className='gercomp-h3-modal'>Dados do registro</h3>
        <div className='gercomp-div-linhaModal'>
          <div className='gercomp-div-textCriado-modal'>
            Criado em
        <p className='gercomp-p'>{this.state.companySelected.createdAt}</p>
          </div>
          <div className='gercomp-div-textAtualizado-modal'>
            Atualizado em
        <p className='gercomp-p'>{this.state.companySelected.updatedAt}</p>
          </div>
        </div>
        <h3 className='gercomp-h3-modal'>Dados para contato</h3>
        <div className='gercomp-div-linhaModal'>
          <div className='gercomp-div-textNome-modal'>
            Nome do responsável
        <p className='gercomp-p'>{this.state.companySelected.nameContact}</p>
          </div>
          <div className='gercomp-div-textTel-modal'>
            Telefone
        <p className='gercomp-p'>{this.state.companySelected.telphone}</p>
          </div>
        </div>
        <Button type="primary">
          Editar
            <Icon type="edit" />
        </Button>
      </div>
    </Modal>
  )


  TableCompanies = () => (
    <div className='gerCmp-div-mainHeader'>
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
      {
        this.state.rows.map((line) =>
          <div className='gerCmp-div-table-list'>
            <div className='gerCmp-div-tableRow' onClick={() => this.openModalDetalhesCompany(line)}>

              <div className='gerCmp-div-table-cel-cnpj'>
                <label className='gerCmp-div-table-label-cel'>
                  {line.cnpj}
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
                  {line.telphone}
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
        <button className='gerCmp-table-buttonFooter'>1</button>
        <button className='gerCmp-table-buttonFooter'>2</button>
        <button className='gerCmp-table-buttonFooter'>3</button>
        <button className='gerCmp-table-buttonFooter'>4</button>
        <button className='gerCmp-table-buttonFooter'>5</button>
      </div>
    </div>
  )

  render() {
    return (
      <div className='gerCmp-div-card'>

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
export default NewCompany
