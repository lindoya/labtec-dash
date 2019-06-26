import React, { Component } from 'react'
import { Select, Input, Button, Icon } from 'antd'
import { getAllParts } from '../../../services/peca'

import './index.css'

const { Search } = Input;
const { Option } = Select;

class DashPeca extends Component {

  state = {
    searchAvancado: false,
    order: {
      field: 'peca',
      acendent: true,
    },
    global: '',
    peca: '',
    descricao: '',
    precoCusto: '',
    precoVenda: '',
    page: 1,
    total: 25,
    count: 0,
    show: 0,
    rows: [],
  }

  
  getAll = async () => {
    const query = {
      filters: {
        part: {
          global: {
            fields: ['item', 'description'],
            value: this.state.global,
          },
          specific: {
            item: this.state.peca,
            description: this.state.descricao,
            costPrice: this.state.precoCusto,
            salePrice: this.state.precoVenda,
          }
        }
      },
      page: 1,
      total: 25,
      order: this.state.order,
    }

    await getAllParts(query).then(
      resposta => this.setState({
        page: resposta.data.page,
        count: resposta.data.count,
        show: resposta.data.show,
        rows: resposta.data.rows,
      })
    )
  }

  componentDidMount = () => {
    this.getAll()
  }

  buttonAvancado = () => {
    this.setState({
      searchAvancado: !this.state.searchAvancado
    })
  }
  
  buttonLimpar = () => {
    this.setState({
      global: '',
      peca: '',
      descricao: '',
      precoCusto: '',
      precoVenda: '',
    }, () => {
      this.getAll()
    })
  }

  changeTotal = (value) => {
    this.setState({
      total: value
    }, () => {
      this.getAll()
    })
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
    } )

  }


  SearchAdvanced = () => (
    <div className='div-advanced-dashPeca'>

      <div className='div-avancado-peca-dashPeca'>
        <h2 className='gerCmp-div-label'>Peça:</h2>
        <Input
          allowClear
          name='peca'
          className='input-cnpjCompany'
          placeholder="Digite a peça"
          value={this.state.peca}
          onChange={this.onChange} 
        />
      </div>
      <div className='div-avancado-desc-dashPeca'>
        <h2 className='gerCmp-div-label'>Descrição:</h2>
        <Input
          allowClear
          name='descricao'
          className='input-cnpjCompany'
          placeholder="Digite a descrição"
          value={this.state.descricao}
          onChange={this.onChange}
        />
      </div>
      <div className='div-avancado-venda-dashPeca'>
        <h2 className='gerCmp-div-label'>Preço de venda:</h2>
        <Input
          allowClear
          name='precoVenda'
          className='input-cnpjCompany'
          placeholder="R$"
          value={this.state.precoVenda}
          onChange={this.onChange}
        />
      </div>
      <div className='div-avancado-custo-dashPeca'>
        <h2 className='gerCmp-div-label'>Preço de custo:</h2>
        <Input
          allowClear
          name='precoCusto'
          className='input-cnpjCompany'
          placeholder="R$"
          value={this.state.precoCusto}
          onChange={this.onChange}
        />
      </div>
    </div>
  )


  TableCompanies = () => (
    <div className='div-mainHeader-dashPeca'>
      <div className='div-table-information-dashPeca'>
        <div className='div-table-information-total-dashPeca'>
          <label className='label-table-information-dashPeca'>
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
        <div className='div-table-information-count-dashPeca'>
          <label className='label-table-information-dashPeca'>
          Mostrando sla quantos
            {/* {`Mostrando ${this.state.show}/${this.state.count} empresas.`} */}
          </label>
        </div>
      </div>
      <div className='div-table-separeteLineMain-dashPeca' />
      <div className='div-table-header-dashPeca'>
        <div className='div-table-cel-peca-dashPeca'
          onClick={() => this.changeOrder('peca')}
        >
         {this.state.order.field === 'peca' ?
            <div className='div-icon-dashPeca'>
              {this.state.order.acendent ?
                <Icon type="caret-down" /> :
                <Icon type="caret-up" />}
            </div>
            : <div className='div-icon-dashPeca'></div>}
          <h2 className='div-table-label-dashPeca'>Peça</h2>
        </div> 
        <div className='div-table-cel-desc-dashPeca'
          onClick={() => this.changeOrder('descricao')}>
          {this.state.order.field === 'descricao' ?
            <div className='div-icon-dashPeca'>
              {this.state.order.acendent ?
                <Icon type="caret-down" /> :
                <Icon type="caret-up" />}
            </div>
            : <div className='div-icon-dashPeca'></div>}
          <h2 className='div-table-label-dashPeca'>Descrição</h2>
        </div>
        <div className='div-table-cel-precoCusto-dashPeca'
          onClick={() => this.changeOrder('precoCusto')}>
          {this.state.order.field === 'precoCusto' ?
            <div className='div-icon-dashPeca'>
              {this.state.order.acendent ?
                <Icon type="caret-down" /> :
                <Icon type="caret-up" />}
            </div>
            : <div className='div-icon-dashPeca'></div>}
          <h2 className='div-table-label-dashPeca'>Custo</h2>
        </div>
        <div className='div-table-cel-precoVenda-dashPeca'
          onClick={() => this.changeOrder('precoVenda')}>
          {this.state.order.field === 'precoVenda' ?
            <div className='div-icon-dashPeca'>
              {this.state.order.acendent ?
                <Icon type="caret-down" /> :
                <Icon type="caret-up" />}
            </div>
            : <div className='div-icon-dashPeca'></div>}
          <h2 className='div-table-label-dashPeca'>Venda</h2>
        </div>
      </div>
     {/* <div className='div-table-separeteLineMain-dashPeca' /> 
     {
        this.state.rows.map((line) =>
          <div className='gerCmp-div-table-list'>
            <div className='gerCmp-div-tableRow'>
              <div className='div-table-cel-peca-dashPeca'>
                <label className='div-table-label-dashPeca-cel'>
                  {line.peca}
                </label>
              </div>
              <div className='div-table-cel-desc-dashPeca'>
                <label className='div-table-label-dashPeca-cel'>
                  {line.descricao}
                </label>
              </div>
              <div className='div-table-cel-precoCusto-dashPeca'>
                <label className='div-table-label-dashPeca-cel'>
                  {line.precoCusto}
                </label>
              </div>
              <div className='div-table-cel-precoVenda-dashPeca'>
                <label className='div-table-label-dashPeca-cel'>
                  {line.precoVenda}
                </label>
              </div>
            </div>
            <div className='gerCmp-div-table-separeteLinerow' />
          </div>
        )
      } */}
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
          <h1 className='div-comp-title'>Gerenciar peças</h1>
        </div>

        <div className='div-searchMain-dashPeca'>

          <Search className='searchMain-dashPeca'
            placeholder="Digite o que deseja procurar"
            // onSearch={value => console.log(value)}
            size='large'
            name='global'
            value={this.state.global}
            onChange={this.onChange}
          />

          <Button
            type="primary"
            className='buttonAvancado-dashPeca'
            onClick={this.buttonLimpar}
          >
            Limpar
          </Button>

          {this.state.searchAvancado ?
            <Button
              type="primary"
              className='buttonAvancado-dashPeca'
              onClick={this.buttonAvancado}
            >
              Ocultar
          </Button> :
            <Button
              type="primary"
              className='buttonAvancado-dashPeca'
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

export default DashPeca