import React, { Component } from 'react'
import { Select, Input, Button, Icon } from 'antd'

import './index.css'

const { Search } = Input;
const { Option } = Select;


class DashEquip extends Component {

  state = {
    searchAvancado: false,
    order: {
      field: 'peca',
      acendent: true,
    },
    global: '',
    serialNumber: '',
    cnpj: '',
    razaoSocial: '',
    type: 'Escolha o tipo',
    mark: '',
    model: '',
    leitor: 'Escolha o leitor',
    page: 1,
    total: 25,
    count: 0,
    show: 0,
    rows: [],
   
    obj: [{
      serialNumber : '11111111111111111',
      cnpj : '87.787.165/0001-33',
      razaoSocial : 'Panificadora Jose',
      type : 'Controle de acesso',
      mark : 'nao sei',
      model : 'sei la',
    }],
  }

  // getAll = async () => {
  //   const query = {
  //     filters: {
  //       part: {
  //         global: {
  //           fields: ['item', 'description'],
  //           value: this.state.global,
  //         },
  //         specific: {
  //           item: this.state.peca,
  //           description: this.state.descricao,
  //           costPrice: this.state.precoCusto,
  //           salePrice: this.state.precoVenda,
  //         }
  //       }
  //     },
  //     page: 1,
  //     total: 25,
  //     order: this.state.order,
  //   }

  //   await getAllParts(query).then(
  //     resposta => this.setState({
  //       page: resposta.data.page,
  //       count: resposta.data.count,
  //       show: resposta.data.show,
  //       rows: resposta.data.rows,
  //     })
  //   )
  // }

  // componentDidMount = () => {
  //   this.getAll()
  // }

  buttonAvancado = () => {
    this.setState({
      searchAvancado: !this.state.searchAvancado
    })
  }

  buttonLimpar = () => {
    this.setState({
      global: '',
      serialNumber: '',
      cnpj: '',
      razaoSocial: '',
      type: 'Escolha o tipo',
      mark: '',
      model: '',
      leitor: 'Escolha o leitor',
    })
  }

  changeTotal = (value) => {
    this.setState({
      total: value
    })
  }

  onChange = (e) => {
    const evento = e.target

    this.setState({
      [evento.name]: evento.value,
    })
  }

  changeOrder = (field) => {
    this.setState({
      order: {
        field,
        acendent: !this.state.order.acendent,
      }
    })
  }

  onChangeTipo = (valueSelected) => {
    this.setState({
      type: valueSelected
    })
  }

  onChangeLeitor = (value) => {
    this.setState({
      leitor: value
    })
  }


  SearchAdvanced = () => (
    <div className='div-searchAdvanced-dashEquip'>
      <div className='div-advanced-dashEquip'>

        <div className='div-avancado-serialNumber-dashEquip'>
          <h2 className='gerCmp-div-label'>Número de série:</h2>
          <Input
            allowClear
            name='serialNumber'
            // className='input-cnpjCompany'
            placeholder="Digite o número"
            value={this.state.serialNumber}
            onChange={this.onChange}
          />
        </div>
        <div className='div-avancado-cnpj-dashEquip'>
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
        <div className='div-avancado-razaoSocial-dashEquip'>
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
      </div>
      <div className='div-advanced-dashEquip'>
        <div className='div-avancado-tipo-dashEquip'>
          <h2 className='gerCmp-div-label'>Tipo:</h2>
          <Select
            defaultValue={this.state.type}
            value={this.state.type}
            style={{ width: '100%' }} 
            onChange={this.onChangeTipo}
          >
            <Option value="Todos">Todos</Option>
            <Option value="Relogio">Relógio</Option>
            <Option value="Catraca">Catraca</Option>
            <Option value="ControleAcesso">Controle de Acesso</Option>
            <Option value="Peca">Peça</Option>
            <Option value="Sirene">Sirene</Option>
          </Select>
        </div>
        <div className='div-avancado-marca-dashEquip'>
          <h2 className='gerCmp-div-label'>Marca:</h2>
          <Input
            allowClear
            name='mark'
            className='input-cnpjCompany'
            placeholder="Digite a marca"
            value={this.state.mark}
            onChange={this.onChange}
          />
        </div>

        <div className='div-avancado-modelo-dashEquip'>
          <h2 className='gerCmp-div-label'>Modelo:</h2>
          <Input
            allowClear
            name='model'
            className='input-cnpjCompany'
            placeholder="Digite o modelo"
            value={this.state.model}
            onChange={this.onChange}
          />
        </div>
        <div className='div-avancado-leitor-dashEquip'>
          <h2 className='gerCmp-div-label'>Leitor:</h2>
          <Select defaultValue={this.state.leitor} style={{ width: '100%' }} value={this.state.leitor} onChange={(value) => this.onChangeLeitor(value)}>
            <Option value="Todos">Todos</Option>
            <Option value="Branco">Branco</Option>
            <Option value="Vermelho">Vermelho</Option>
            <Option value="Azul">Azul</Option>
            <Option value="Verde">Verde</Option>
            <Option value="DedoVivo">Dedo vivo</Option>
            <Option value="BioLFD">BioLFD</Option>
            <Option value="BioLC">BioLC</Option>
            <Option value="NaoSeAplica">Não se aplica</Option>
          </Select>
        </div>
      </div>
    </div>
  )


  TableCompanies = () => (
    <div className='div-mainHeader-dashEquip'>
      <div className='div-table-information-dashEquip'>
        <div className='div-table-information-total-dashEquip'>
          <label className='label-table-information-dashEquip'>
            Quantidade por página:
          </label>
          <Select
            defaultValue="25"
            onChange={this.changeTotal}
            size='small'
          >
            <Option value="10">10</Option>
            <Option value="25">25</Option>
            <Option value="50">50</Option>
            <Option value="100">100</Option>
          </Select>
        </div>
        <div className='div-table-information-count-dashEquip'>
          <label className='label-table-information-dashEquip'>
            Mostrando sla quantos
            {/* {`Mostrando ${this.state.show}/${this.state.count} empresas.`} */}
          </label>
        </div>
      </div>
      <div className='div-table-separeteLineMain-dashEquip' />
      <div className='div-table-header-dashEquip'>
        <div className='div-table-cel-serialNumber-dashEquip'
          onClick={() => this.changeOrder('serialNumber')}
        >
          {this.state.order.field === 'serialNumber' ?
            <div className='div-icon-dashEquip'>
              {this.state.order.acendent ?
                <Icon type="caret-down" /> :
                <Icon type="caret-up" />}
            </div>
            : <div className='div-icon-dashEquip'></div>}
          <h2 className='div-table-label-dashEquip'>Número de série</h2>
        </div>
        <div className='div-table-cel-cnpj-dashEquip'
          onClick={() => this.changeOrder('cnpj')}>
          {this.state.order.field === 'cnpj' ?
            <div className='div-icon-dashEquip'>
              {this.state.order.acendent ?
                <Icon type="caret-down" /> :
                <Icon type="caret-up" />}
            </div>
            : <div className='div-icon-dashEquip'></div>}
          <h2 className='div-table-label-dashEquip'>Cnpj</h2>
        </div>
        <div className='div-table-cel-razaoSocial-dashEquip'
          onClick={() => this.changeOrder('razaoSocial')}>
          {this.state.order.field === 'razaoSocial' ?
            <div className='div-icon-dashEquip'>
              {this.state.order.acendent ?
                <Icon type="caret-down" /> :
                <Icon type="caret-up" />}
            </div>
            : <div className='div-icon-dashEquip'></div>}
          <h2 className='div-table-label-dashEquip'>Razao social</h2>
        </div>
        <div className='div-table-cel-tipo-dashEquip'
          onClick={() => this.changeOrder('tipo')}>
          {this.state.order.field === 'tipo' ?
            <div className='div-icon-dashEquip'>
              {this.state.order.acendent ?
                <Icon type="caret-down" /> :
                <Icon type="caret-up" />}
            </div>
            : <div className='div-icon-dashEquip'></div>}
          <h2 className='div-table-label-dashEquip'>Tipo</h2>
        </div>
        <div className='div-table-cel-marca-dashEquip'
          onClick={() => this.changeOrder('marca')}>
          {this.state.order.field === 'marca' ?
            <div className='div-icon-dashEquip'>
              {this.state.order.acendent ?
                <Icon type="caret-down" /> :
                <Icon type="caret-up" />}
            </div>
            : <div className='div-icon-dashEquip'></div>}
          <h2 className='div-table-label-dashEquip'>Marca</h2>
        </div>
        <div className='div-table-cel-modelo-dashEquip'
          onClick={() => this.changeOrder('modelo')}>
          {this.state.order.field === 'modelo' ?
            <div className='div-icon-dashEquip'>
              {this.state.order.acendent ?
                <Icon type="caret-down" /> :
                <Icon type="caret-up" />}
            </div>
            : <div className='div-icon-dashEquip'></div>}
          <h2 className='div-table-label-dashEquip'>Modelo</h2>
        </div>
      </div>
     <div className='div-table-separeteLineMain-dashEquip' /> 
       {
         this.state.obj.map((teste) =>
          <div className='div-table-list-dashEquip'>
            <div className='div-tableRow-dashEquip'>
              <div className='div-table-cel-serialNumber-dashEquip'>
                <label className='div-table-label-cel-dashEquip'>
                  {teste.serialNumber}
                </label>
              </div>
              <div className='div-table-cel-cnpj-dashEquip'>
                <label className='div-table-label-cel-dashEquip'>
                  {teste.cnpj}
                </label>
              </div>
              <div className='div-table-cel-razaoSocial-dashEquip'>
                <label className='div-table-label-cel-dashEquip'>
                  {teste.razaoSocial}
                </label>
              </div>
              <div className='div-table-cel-tipo-dashEquip'>
                <label className='div-table-label-cel-dashEquip'>
                  {teste.type}
                </label>
              </div>
              <div className='div-table-cel-marca-dashEquip'>
                <label className='div-table-label-cel-dashEquip'>
                  {teste.mark}
                </label>
              </div>
              <div className='div-table-cel-modelo-dashEquip'>
                <label className='div-table-label-cel-dashEquip'>
                  {teste.model}
                </label>
              </div>
            </div>
            <div className='div-table-separeteLinerow-dashEquip' />
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
    console.log(this.state)
    return (
      <div className='div-comp-card'>

        <div className='div-comp-Linha div-comp-header'>
          <h1 className='div-comp-title'>Gerenciar equipamentos</h1>
        </div>

        <div className='div-searchMain-dashEquip'>

          <Search className='searchMain-dashEquip'
            placeholder="Digite o que deseja procurar"
            // onSearch={value => console.log(value)}
            size='large'
            name='global'
            value={this.state.global}
            onChange={this.onChange}
          />

          <Button
            type="primary"
            className='buttonAvancado-dashEquip'
            onClick={this.buttonLimpar}
          >
            Limpar
          </Button>

          {this.state.searchAvancado ?
            <Button
              type="primary"
              className='buttonAvancado-dashEquip'
              onClick={this.buttonAvancado}
            >
              Ocultar
          </Button> :
            <Button
              type="primary"
              className='buttonAvancado-dashEquip'
              onClick={this.buttonAvancado}
            >
              Avançado
          </Button>}
        </div>
        {this.state.searchAvancado ? <this.SearchAdvanced /> : null}
        <this.TableCompanies />

      </div>
    )
  }
}

export default DashEquip