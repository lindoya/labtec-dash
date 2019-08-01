import * as R from 'ramda'

import React, { Component } from 'react'
import './index.css'
import { DatePicker, Input, Button, Spin } from 'antd'

import { getUsers } from '../../../services/newUser'
import { getAllProcessToControl } from '../../../services/process'

const Search = Input.Search;

class DashScreenControl extends Component {

  state = {
    loading: false,
    order: 'Os',
    avancado: false,
    search: {
      global: '',
      usuario: '',
      status: '',
    },
    users: [],
    table: {},
    array: [],
    statusUserArray: {},
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


  getAll = async () => {

    this.setState({
      loading: true
    })

    const query = {
      filters: {
        typeAccount: {
          specific: {
            typeName: 'TecnicoLab',
          },
        },
      },
    }

    await getUsers(query).then(
      resposta => this.setState({
        users: resposta.data,
        loading: false
      })
    )

    const status = ['orcamento', 'analise', 'manutencao', 'fabricaIda', 'fabricaVolta', 'estoque', 'semConserto', 'revisao1', 'revisao2']

    let queryProcess = null

    await status.map(async (status) => {

      await this.state.users.map(async (item) => {


        const responsibleUser = item.username

        queryProcess = {
          filters: {
            process: {
              specific: {
                status,
              },
            },
            analyze: {
              specific: {
                responsibleUser,
              },
            },
          },
        }

        await getAllProcessToControl(queryProcess).then(
          resposta => this.setState({
            table: {
              ...this.state.table,
              [status]: {
                ...this.state.table[status],
                [responsibleUser]: {
                  count: resposta.data.count,
                  rows: resposta.data.rows,
                }
              }
            }
          })
        )
        this.test()
      })
    })

  }

  componentDidMount = async () => {
    await this.getAll()
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

  test = () => {

    const state = this.state
    const status = R.keys(state.table)
    let statusUserArray = {}


    if (status !== []) {
      const arrayTable = []

      // eslint-disable-next-line array-callback-return
      status.map(key => {
        arrayTable.push({ [key]: state.table[key] })
      })
      // eslint-disable-next-line array-callback-return
      status.map(key => {
        statusUserArray = {
          ...statusUserArray,
          [key]: [],
        }
        if (state.table[key]) {
          const user = R.keys(state.table[key])
          user.sort()

          // eslint-disable-next-line array-callback-return
          user.map(item => {
            const count = R.keys(state.table[key][item])
            if (count) {
              if (count.length !== 0) {

                statusUserArray[key].push(state.table[key][item].count)
              }
            }
          })
        }
      })
    }

    this.setState({
      statusUserArray,
    })
  }


  lineTable(statusView, statusBack) {
    if (!this.state.statusUserArray) {
      return
    } else if (!this.state.statusUserArray[statusBack]) {
      return
    } else if (this.state.statusUserArray[statusBack].length === 0) {
      return
    }

    return (
      <div className='div-table-cel-control'>
      <div className='div-linha-control'>
        <div className='div-table-cel-status-control'>
          <label className='div-table-label-cel-username-control'>
            {statusView}
          </label>
        </div>
        {this.state.statusUserArray[statusBack].map(count =>
          <div className='div-table-cel-nomes-control'>
            <label className='div-table-label-cel-username-control'>
              {count}
            </label>
          </div>
        )}
      </div>
      <div className='div-table-separeteLinerow-control' />
      </div>
    )
  }

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
            {
              this.state.users.map((line) =>
                <div className='div-table-cel-nomes-control'>
                  <h2 className='div-table-label-control'>{line.username}</h2>
                </div>
              )
            }
          </div>
          {this.state.loading ? <div className='spin-control'><Spin spinning={this.state.loading} /></div> : null}
          {this.lineTable('Aguardando', 'orcamento')}
          {this.lineTable('Analise', 'analise')}
          {this.lineTable('Fabricante ida', 'fabricaIda')}
          {this.lineTable('Fabricante volta', 'fabricaVolta')}
          {this.lineTable('Liberado estoque', 'estoque')}
          {/* {this.lineTable('Liberado sem concerto', 'semConserto')} */}
          {this.lineTable('Revisão 1', 'revisao1')}
          {this.lineTable('Revisão 2', 'revisao2')}
        <div className='div-table-footer-control'>
        </div>
        </div>
      </div>
    )
  }
}

export default DashScreenControl