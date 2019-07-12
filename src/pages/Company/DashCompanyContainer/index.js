import React, { Component } from 'react'
import { Select, Input, Button, DatePicker, Icon, Modal, message, Spin} from 'antd'
import { getAllCompany, updateCompany } from '../../../services/company'

import 'antd/dist/antd.css'
import './index.css'


const Search = Input.Search;
const { Option } = Select;

class NewCompany extends Component {
  
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

  onChangeEditar = (e) => {
    this.setState({
      compSelected:{
        ...this.state.compSelected,
        [e.target.name]: e.target.value
      }
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

  buttonEditar = () => {
    this.setState({
      editar: !this.state.editar
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
      page: 1,
      total: 25,
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

    console.log(resposta)    

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
        compSelected:{
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
        messageSuccess: false
      })
    }
  }


  openModalDetalhesCompany = (company) => {
     this.setState({
      modalDetalhesCompany: true,
      compSelected: company
    })
  }

  okModalDetalhesCompany = () => {
    this.setState({
      modalDetalhesCompany: false
    })
  }

  formatCnpj = () => {
    const cnpj = this.state.compSelected.cnpj
    const cnpjFormated = cnpj.replace(/\D/ig, '')


    if (cnpjFormated.length === 14) {
      cnpjFormated.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5')
    }

    this.setState({
      compSelected: {
        ...this.state.compSelected,
        cnpj: cnpjFormated
      }
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
        {this.state.editar === false ? <p className='gercomp-p'>{this.state.compSelected.cnpj}</p> : <Input
              onChange={this.onChangeEditar}
              name='cnpj'
              className='gerComp-inputModal'
              value={this.state.compSelected.cnpj}
            />}
          </div>
          <div className='gercomp-div-textRazaoSocial-modal'>
            Razão social
            {this.state.editar === false ? <p className='gercomp-p'>{this.state.compSelected.razaoSocial}</p> : <Input
          onChange={this.onChangeEditar}
          name='razaoSocial'
              className='gerComp-inputModal'
              value={this.state.compSelected.razaoSocial}

            />}
          </div>
        </div>
        <div className='gercomp-div-linhaModal'>
          <div className='gercomp-div-textCep-modal'>
            Cep
            {this.state.editar === false ? <p className='gercomp-p'>{this.state.compSelected.zipCode}</p> : <Input
          onChange={this.onChangeEditar}
          name='zipCode'
          className='gerComp-inputModal'
          value={this.state.compSelected.zipCode}
        />}
          </div>
          <div className='gercomp-div-textRua-modal'>
            Rua
            {this.state.editar === false ? <p className='gercomp-p'>{this.state.compSelected.street}</p> : <Input
          onChange={this.onChangeEditar}
          name='street'
          className='gerComp-inputModal'
          value={this.state.compSelected.street}
        />}
          </div>
          <div className='gercomp-div-textNumero-modal'>
            Número
            {this.state.editar === false ? <p className='gercomp-p'>{this.state.compSelected.number}</p> : <Input
          onChange={this.onChangeEditar}
          name='number'
          className='gerComp-inputModal'
          value={this.state.compSelected.number}
        />}
          </div>
          <div className='gercomp-div-textBairro-modal'>
            Bairro
            {this.state.editar === false ? <p className='gercomp-p'>{this.state.compSelected.neighborhood}</p> : <Input
          onChange={this.onChangeEditar}
          name='neighborhood'
          className='gerComp-inputModal'
          value={this.state.compSelected.neighborhood}
        />}
          </div>
        </div>
        <div className='gercomp-div-linhaModal'>
          <div className='gercomp-div-textCity-modal'>
            Cidade
            {this.state.editar === false ? <p className='gercomp-p'>{this.state.compSelected.city}</p> : <Input
          onChange={this.onChangeEditar}
          name='city'
          className='gerComp-inputModal'
          value={this.state.compSelected.city}
        />}
          </div>
          <div className='gercomp-div-textState-modal'>
            Estado
            {this.state.editar === false ? <p className='gercomp-p'>{this.state.compSelected.state}</p> : <Input
          onChange={this.onChangeEditar}
          name='state'
          className='gerComp-inputModal'
          value={this.state.compSelected.state}
        />}
          </div>
          <div className='gercomp-div-textRef-modal'>
            Ponto de referência
        {this.state.editar === false ? <p className='gercomp-p'>{this.state.compSelected.referencePoint === null ? '-' : this.state.compSelected.referencePoint}</p> : <Input
          onChange={this.onChangeEditar}
          name='referencePoint'
          className='gerComp-inputModal'
          value={this.state.compSelected.referencePoint}
        />}
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
            {this.state.editar === false ? <p className='gercomp-p'>{this.state.compSelected.nameContact}</p> : <Input
          onChange={this.onChangeEditar}
          name='nameContact'
          className='gerComp-inputModal'
          value={this.state.compSelected.nameContact}
        />}
          </div>
          <div className='gercomp-div-textTel-modal'>
            Telefone
            {this.state.editar === false ? <p className='gercomp-p'>{this.state.compSelected.telphone}</p> : <Input
          onChange={this.onChangeEditar}
          name='telphone'
          className='gerComp-inputModal'
          value={this.state.compSelected.telphone}
        />}
          </div>
          <div className='gercomp-div-textEmail-modal'>
            Email
            {this.state.editar === false ? <p className='gercomp-p'>{this.state.compSelected.email}</p> : <Input
          onChange={this.onChangeEditar}
          name='email'
          className='gerComp-inputModal'
          value={this.state.compSelected.email}
        />}
          </div>
        </div>
        {this.state.editar === false ? <Button
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
        </Button>
      }
        
      </div>
    </Modal>
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
      {this.state.loading ? <div className='gerCmp-spin'><Spin spinning={this.state.loading}/></div> : null}
      {
        this.state.rows.map((line) =>
          <div className='gerCmp-div-table-list' >
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
        <Button type="primary">1</Button>
        <Button type="primary">2</Button>
        <Button type="primary">3</Button>
        <Button type="primary">4</Button>
        <Button type="primary">5</Button>
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
export default NewCompany
