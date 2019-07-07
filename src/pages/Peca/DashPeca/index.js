import React, { Component } from 'react'
import { Select, Input, Button, Icon } from 'antd'
import { getAllParts } from '../../../services/peca'
// import { masks } from '../NewPeca/validator'

import './index.css'

const { Search } = Input;
const { Option } = Select;

class DashPeca extends Component {

  state = {
    searchAvancado: false,
    order: {
      field: 'item',
      acendent: true,
    },
    global: '',
    item: '',
    description: '',
    costPrice: '',
    salePrice: '',
    page: 1,
    total: 25,
    count: 0,
    show: 0,
    rows: [],
    // numberPages:(rows.length/total)
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
            item: this.state.item,
            description: this.state.description,
            costPrice: this.state.costPrice,
            salePrice: this.state.salePrice,
          }
        }
      },
      page: 1,
      total: this.state.total,
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
      item: '',
      description: '',
      costPrice: '',
      salePrice: '',
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

  // onChange = (e) => {
  //   const { nome,
  //     valor,
  //   } = masks(e.target.name, e.target.value)

  //   this.setState({
  //     [ nome ]: valor,
  //   }, () => {
  //     this.getAll()
  //   })
  // }

  onChange = (e) => {
    const evento = e.target

    if (evento.name === 'cost' || evento.name === 'sale'){
      this.setState({
        [`${evento.name}Price`]: evento.value.replace(/\D/ig, ''),
      }, () => {
        this.getAll()
      })
    } else {
      this.setState({
        [evento.name]: evento.value,
      }, () => {
        this.getAll()
      })
    }
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


  changePages = (pages) => {
    this.setState({
      page: pages
    })
  }


  masks = (valor) => {
    let value = valor
    value = value.replace(/\D/ig, '')
    value = value.slice(0, 9)

    if (value.length <= 2) {
      value = value.replace(/(\d{2}?)/, '$1')
    } else if (value.length > 2 && value.length <= 5) {
      value = value.replace(/(\d{1,3})(\d{2})/, '$1,$2')
    }else if (value.length > 5 && value.length <= 8) {
      value = value.replace(/(\d{1,3})(\d{3})(\d{2})/, '$1.$2,$3')
    }else if (value.length > 8) {
      value = value.replace(/(\d{1})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3,$4')
    }

    return value
    
  }



  SearchAdvanced = () => (
    <div className='div-advanced-dashPeca'>

      <div className='div-avancado-peca-dashPeca'>
        <h2 className='gerCmp-div-label'>Peça:</h2>
        <Input
          allowClear
          name='item'
          className='input-cnpjCompany'
          placeholder="Digite a peça"
          value={this.state.item}
          onChange={this.onChange} 
        />
      </div>
      <div className='div-avancado-desc-dashPeca'>
        <h2 className='gerCmp-div-label'>Descrição:</h2>
        <Input
          allowClear
          name='description'
          className='input-cnpjCompany'
          placeholder="Digite a descrição"
          value={this.state.description}
          onChange={this.onChange}
        />
      </div>
      <div className='div-avancado-venda-dashPeca'>
        {/* <h2 className='gerCmp-div-label'>Preço de venda:</h2>
        <Input
          allowClear
          name='sale'
          className='input-cnpjCompany'
          placeholder="R$"
          value={this.masks(this.state.salePrice)}
          onChange={this.onChange}
        /> */}
      </div>
      <div className='div-avancado-custo-dashPeca'>
        {/* <h2 className='gerCmp-div-label'>Preço de custo:</h2>
        <Input
          allowClear
          name='cost'
          className='input-cnpjCompany'
          placeholder="R$"
          value={this.masks(this.state.costPrice)}
          onChange={this.onChange}
        /> */}
      </div>
    </div>
  )


  TableParts = () => (
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
          onClick={() => this.changeOrder('item')}
        >
         {this.state.order.field === 'item' ?
            <div className='div-icon-dashPeca'>
              {this.state.order.acendent ?
                <Icon type="caret-down" /> :
                <Icon type="caret-up" />}
            </div>
            : <div className='div-icon-dashPeca'></div>}
          <h2 className='div-table-label-dashPeca'>Peça</h2>
        </div> 
        <div className='div-table-cel-desc-dashPeca'
          onClick={() => this.changeOrder('description')}>
          {this.state.order.field === 'description' ?
            <div className='div-icon-dashPeca'>
              {this.state.order.acendent ?
                <Icon type="caret-down" /> :
                <Icon type="caret-up" />}
            </div>
            : <div className='div-icon-dashPeca'></div>}
          <h2 className='div-table-label-dashPeca'>Descrição</h2>
        </div>
        <div className='div-table-cel-precoCusto-dashPeca'
          onClick={() => this.changeOrder('costPrice')}>
          {this.state.order.field === 'costPrice' ?
            <div className='div-icon-dashPeca'>
              {this.state.order.acendent ?
                <Icon type="caret-down" /> :
                <Icon type="caret-up" />}
            </div>
            : <div className='div-icon-dashPeca'></div>}
          <h2 className='div-table-label-dashPeca'>Custo</h2>
        </div>
        <div className='div-table-cel-precoVenda-dashPeca'
          onClick={() => this.changeOrder('salePrice')}>
          {this.state.order.field === 'salePrice' ?
            <div className='div-icon-dashPeca'>
              {this.state.order.acendent ?
                <Icon type="caret-down" /> :
                <Icon type="caret-up" />}
            </div>
            : <div className='div-icon-dashPeca'></div>}
          <h2 className='div-table-label-dashPeca'>Venda</h2>
        </div>
      </div>
     <div className='div-table-separeteLineMain-dashPeca' /> 
     {
        this.state.rows.map((line) =>
          <div className='gerCmp-div-table-list'>
            <div className='gerCmp-div-tableRow'>
              <div className='div-table-cel-peca-dashPeca'>
                <label className='div-table-label-dashPeca-cel'>
                  {line.item}
                </label>
              </div>
              <div className='div-table-cel-desc-dashPeca'>
                <label className='div-table-label-dashPeca-cel'>
                  {line.description}
                </label>
              </div>
              <div className='div-table-cel-precoVenda-dashPeca'>
                <label className='div-table-label-dashPeca-cel'>
                  {this.masks(line.salePrice)}
                </label>
              </div>
              <div className='div-table-cel-precoCusto-dashPeca'>
                <label className='div-table-label-dashPeca-cel'>
                  {this.masks(line.costPrice)}
                </label>
              </div>
            </div>
            <div className='gerCmp-div-table-separeteLinerow' />
          </div>
        )
      }
      <div className='div-table-footer-dashPeca'>
    {this.state.page >= 3? <button className='table-buttonFooter-dashPeca'>Anterior</button>:''}
    {this.state.page >= 3? <div className='table-spaceFooter-dashPeca'>. . .</div>:''}
    {this.state.page !== 1? <button className='table-buttonFooter-dashPeca' onClick={() => this.changePages(this.state.page-1)}>{this.state.page-1}</button>:''}
    

        <button className='table-buttonFooter-dashPeca' value={this.state.page} >{this.state.page}</button>
        <button className='table-buttonFooter-dashPeca' onClick={() => this.changePages(this.state.page+1)}>{this.state.page+1}</button>
    {this.state.page === 1?  <button className='table-buttonFooter-dashPeca' onClick={() => this.changePages(this.state.page+2)}>{this.state.page+2}</button>:''}
        <div className='table-spaceFooter-dashPeca'>. . .</div>
        <button className='table-buttonFooter-dashPeca'>Seguinte</button>
        
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
          <this.TableParts />

      </div>
    )
  }
}

export default DashPeca