import React, { Component } from 'react'
import { Select, Input, Button } from 'antd'
// import { getAllParts } from '../../../services/peca'

import './index.css'

const { Search } = Input;
const { Option } = Select;

class DashPeca extends Component {

  state = {
    searchAvancado: false,
    global: '',
    cnpj: '',
    razaoSocial: '',
    nameContact: '',
    telphone: '',
    teste: '',
    
  }

  // getAllPecas = async () => {
  //   const resposta = await getAllParts({ })

  //   this.setState({
  //     modelsList: resposta.data,
  //   })
  // }

  buttonAvancado = () => {
    this.setState({
      searchAvancado: !this.state.searchAvancado
    })
  }
  
  buttonLimpar = () => {
    this.setState({
      global: '',
      cnpj: '',
      razaoSocial: '',
      nameContact: '',
      telphone: '',
      teste: '',
    })
  }

  onChange = (e) => {
    const evento = e.target

    this.setState({
      [evento.name]: evento.value,
    })
  }


  SearchAdvanced = () => (
    <div className='div-advanced-dashPeca'>

      <div className='div-left-dashPeca'>
        <h2 className='gerCmp-div-label'>Peça:</h2>
        <Input
          allowClear
          name='cnpj'
          className='input-cnpjCompany'
          placeholder="teste"
          value={this.state.cnpj}
          onChange={this.onChange} 
        />
      </div>
      <div className='div-left-dashPeca'>
        <h2 className='gerCmp-div-label'>Descrição:</h2>
        <Input
          allowClear
          name='razaoSocial'
          className='input-cnpjCompany'
          placeholder="teste"
          value={this.state.razaoSocial}
          onChange={this.onChange}
        />
      </div>
      <div className='div-left-dashPeca'>
        <h2 className='gerCmp-div-label'>Preço de venda:</h2>
        <Input
          allowClear
          name='teste'
          className='input-cnpjCompany'
          placeholder="teste"
          value={this.state.teste}
          onChange={this.onChange}
        />
      </div>
      <div className='div-left-dashPeca'>
        <h2 className='gerCmp-div-label'>Preço de custo:</h2>
        <Input
          allowClear
          name='nameContact'
          className='input-cnpjCompany'
          placeholder="teste"
          value={this.state.nameContact}
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
            // onChange={this.changeTotal}
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
        <div className='div-table-cel-cnpj-dashPeca'
          // onClick={() => this.changeOrder('cnpj')}
        >
          {/* {this.state.order.field === 'cnpj' ?
            <div className='div-icon-dashPeca'>
              {this.state.order.acendent ?
                <Icon type="caret-down" /> :
                <Icon type="caret-up" />}
            </div>
            : <div className='div-icon-dashPeca'></div>}
          <h2 className='div-table-label-dashPeca'>Cnpj</h2>
        </div>
        <div className='div-table-cel-rs-dashPeca'
          onClick={() => this.changeOrder('razaoSocial')}>
          {this.state.order.field === 'razaoSocial' ?
            <div className='div-icon-dashPeca'>
              {this.state.order.acendent ?
                <Icon type="caret-down" /> :
                <Icon type="caret-up" />}
            </div>
            : <div className='div-icon-dashPeca'></div>}
          <h2 className='div-table-label-dashPeca'>Razão Social</h2>
        </div>
        <div className='div-table-cel-nameContact-dashPeca'
          onClick={() => this.changeOrder('nameContact')}>
          {this.state.order.field === 'nameContact' ?
            <div className='div-icon-dashPeca'>
              {this.state.order.acendent ?
                <Icon type="caret-down" /> :
                <Icon type="caret-up" />}
            </div>
            : <div className='div-icon-dashPeca'></div>}
          <h2 className='div-table-label-dashPeca'>Nome Contato</h2>
        </div>
        <div className='div-table-cel-tel-dashPeca'
          onClick={() => this.changeOrder('telphone')}>
          {this.state.order.field === 'telphone' ?
            <div className='div-icon-dashPeca'>
              {this.state.order.acendent ?
                <Icon type="caret-down" /> :
                <Icon type="caret-up" />}
            </div>
            : <div className='div-icon-dashPeca'></div>} */}
          {/* <h2 className='div-table-label-dashPeca'>Telefone</h2> */}
        </div>
      </div>
      {/* <div className='div-table-separeteLineMain-dashPeca' /> */}
      {/* {
        this.state.rows.map((line) =>
          <div className='gerCmp-div-table-list'>
            <div className='gerCmp-div-tableRow'>
              <div className='gerCmp-div-table-cel-cnpj'>
                <label className='div-table-label-dashPeca-cel'>
                  {line.cnpj}
                </label>
              </div>
              <div className='gerCmp-div-table-cel-rs'>
                <label className='div-table-label-dashPeca-cel'>
                  {line.razaoSocial}
                </label>
              </div>
              <div className='gerCmp-div-table-cel-nameContact'>
                <label className='div-table-label-dashPeca-cel'>
                  {line.nameContact}
                </label>
              </div>
              <div className='gerCmp-div-table-cel-tel'>
                <label className='div-table-label-dashPeca-cel'>
                  {line.telphone}
                </label>
              </div>
              <div className='gerCmp-div-table-cel-createdAt'>
                <label className='div-table-label-dashPeca-cel'>
                  {line.createdAt}
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