import React, { Component } from 'react'
import './index.css'
import { DatePicker, Input, Button } from 'antd'



const Search = Input.Search;

class DashScreenControl extends Component {

  state = {
    order: 'Os',
    avancado: false,
    search: {
      global: '',
      usuario: '',
      status: '',
    },
  }

  buttonLimpar = () => {
    this.setState({
      search: {
        global: '',
        usuario: '',
        status: '',
      }
    })
  }

  onChange = (e) => {
    this.setState({
      search: {
        ...this.state.search,
        [e.target.name]: e.target.value
      }
    })
  }

  avancado = () => {
    this.setState({
      avancado: !this.state.avancado
    })
  }

  // Pages = () => (

  //   <div className='gerCmp-div-table-footer'>
  //     {Math.ceil(this.state.count / this.state.total) >= 5 && Math.ceil(this.state.count / this.state.total) - this.state.page < 1 ? <Button type="primary" onClick={() => this.changePages(this.state.page - 4)}>{this.state.page - 4}</Button> : ''}
  //     {Math.ceil(this.state.count / this.state.total) >= 4 && Math.ceil(this.state.count / this.state.total) - this.state.page < 2 && this.state.page > 3 ? <Button type="primary" onClick={() => this.changePages(this.state.page - 3)}>{this.state.page - 3}</Button> : ''}
  //     {this.state.page >= 3 ? <Button type="primary" onClick={() => this.changePages(this.state.page - 2)}>{this.state.page - 2}</Button> : ''}
  //     {this.state.page >= 2 ? <Button type="primary" onClick={() => this.changePages(this.state.page - 1)}>{this.state.page - 1}</Button> : ''}
  //     <div className='div-buttonSelected-dashComp' type="primary">{this.state.page}</div>
  //     {this.state.page < (this.state.count / this.state.total) ? <Button type="primary" onClick={() => this.changePages(this.state.page + 1)}>{this.state.page + 1}</Button> : ''}
  //     {this.state.page + 1 < (this.state.count / this.state.total) ? <Button type="primary" onClick={() => this.changePages(this.state.page + 2)}>{this.state.page + 2}</Button> : ''}
  //     {this.state.page + 2 < (this.state.count / this.state.total) && this.state.page < 3 ? <Button type="primary" onClick={() => this.changePages(this.state.page + 3)}>{this.state.page + 3}</Button> : ''}
  //     {this.state.page + 3 < (this.state.count / this.state.total) && this.state.page < 2 ? <Button type="primary" onClick={() => this.changePages(this.state.page + 4)}>{this.state.page + 4}</Button> : ''}
  //   </div>
  // )  

  SearchAdvanced = () => (
    <div className='gerCmp-div-advanced'>

      <div className='div-avancado-control'>
        <h2 className='gerCmp-div-label'>Usuário:</h2>
        <Input
          allowClear
          name='usuario'
          className='input-cnpjCompany'
          placeholder="Digite o usuário"
          value={this.state.search.usuario}
          onChange={this.onChange}
        />
      </div>
      <div className='div-avancado-control'>
        <h2 className='gerCmp-div-label'>Status:</h2>
        <Input
          allowClear
          name='status'
          className='input-cnpjCompany'
          placeholder="Digite o status"
          value={this.state.search.status}
          onChange={this.onChange}
        />
      </div>
      <div className='div-avancadoData-control'>
        <h2 className='gerCmp-div-label'>Data:</h2>
        <DatePicker.RangePicker
          placeholder='Digite a data'
          format='DD/MM/YYYY'
          dropdownClassName='poucas'
        />
      </div>
    </div>
  )

  render() {
    return (
      <div className='div-card-control'>
        <div className='div-comp-Linha div-comp-header'>
          <h1 className='div-comp-title'>Controle geral</h1>
        </div>

        <div className='gerCmp-div-buttonAndSearch'>

          <Search className='gerCmp-search'
            placeholder="Digite o que deseja procurar"
            onSearch={value => console.log(value)}
            size='large'
            name='global'
            value={this.state.search.global}
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
              onClick={this.avancado}
              className='gerCmp-button-dashCompany'
              type='primary'
            >Ocultar
          </Button> :
            <Button
              onClick={this.avancado}
              className='gerCmp-button-dashCompany'
              type='primary'
            >Avançado
          </Button>}
        </div>
        {this.state.avancado ? <this.SearchAdvanced /> : null}

        <div className='div-mainHeader-control'>
          <div className='div-table-separeteLineMain-control' />
          <div className='div-table-header-control'>
            <div className='div-table-cel-status-control'>
              <h2 className='div-table-label-control'>Status</h2>
            </div>
            <div className='div-table-cel-nomes-control'>
              <h2 className='div-table-label-control'>Alvaro</h2>
            </div>
            <div className='div-table-cel-nomes-control'>
              <h2 className='div-table-label-control'>Teste</h2>
            </div>
            <div className='div-table-cel-nomes-control'>
              <h2 className='div-table-label-control'>Teste</h2>
            </div>
            <div className='div-table-cel-nomes-control'>
              <h2 className='div-table-label-control'>Teste</h2>
            </div>
            <div className='div-table-cel-nomes-control'>
              <h2 className='div-table-label-control'>Teste</h2>
            </div>
          </div>
          <div className='div-table-separeteLineMain-control' />
          {/* {this.state.loading ? <div className='spin-dashPeca'><Spin spinning={this.state.loading} /></div> : null}
          {this.state.rows === undefined ? 'Não há entradas cadastrada' : this.state.rows.map((line) =>
            <div className='div-table-list-dashTec'>
              {this.renderRedirect()}
              <div className={this.props.className} onClick={() => this.redirectToAnalise(line)}>
                <div className='div-table-cel-Os-dashTec'>
                  <label className='div-table-label-cel-dashTec'>
                    dadwa
                  </label>
                </div>
                <div className='div-table-cel-contrato-dashTec'>
                  <label className='div-table-label-cel-dashTec'>
                    {line.conditionType}
                  </label>
                </div>
                <div className='div-table-cel-garantia-dashTec'>
                  <label className='div-table-label-cel-dashTec'>
                    {line.garantia}
                  </label>
                </div>
                <div className='div-table-cel-serialNumber-dashTec'>
                  <label className='div-table-label-cel-dashTec'>
                    {line.serialNumber}
                  </label>
                </div>
                <div className='div-table-cel-razaoSocial-dashTec'>
                  <label className='div-table-label-cel-dashTec'>
                    {line.razaoSocial}
                  </label>
                </div>
                <div className='div-table-cel-modelo-dashTec'>
                  <label className='div-table-label-cel-dashTec'>
                    {`${line.type} - ${line.mark} - ${line.model}`}
                  </label>
                </div>
              </div>
              <div className='div-table-separeteLinerow-dashTec' />
            </div> */}
          {/* <div className='gerCmp-div-table-footer'>
          <this.Pages />
        </div> */}
         <div className='teste' >
          <div className='div-table-list-control'>
            <div className='div-table-cel-status-control'>
              <label className='div-table-label-cel-control'>
                dadwa
              </label>
            </div>
            <div className='div-table-cel-nomes-control'>
              <label className='div-table-label-cel-control'>
                0
              </label>
            </div>
            <div className='div-table-cel-nomes-control'>
              <label className='div-table-label-cel-control'>
                0
              </label>
            </div>
            <div className='div-table-cel-nomes-control'>
              <label className='div-table-label-cel-control'>
                0
              </label>
            </div>
            <div className='div-table-cel-nomes-control'>
              <label className='div-table-label-cel-control'>
                0
              </label>
            </div>
            <div className='div-table-cel-nomes-control'>
              <label className='div-table-label-cel-control'>
                0
              </label>
            </div>
          </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DashScreenControl