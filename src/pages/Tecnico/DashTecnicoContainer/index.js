import React, { Component } from 'react'
import './index.css'
import { Card, Icon, Button, Spin } from 'antd';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'


// import { getAllEntrance } from '../../../services/entrance'
import { getAllProcess } from '../../../services/process'
import { redirectAnalyze } from '../TecnicoRedux/action'
import TableAgAnalise from './components'

class DashTecnico extends Component {
constructor(props){
  super(props)

  this.state={
    loading: false,
    order: {
      field: 'createdAt',
      acendent: true,
    },
    analiseSelected: {
      Os: '',
      contrato: '',
      garantia: '',
      serialNumber: '',
      razaoSocial: '',
      type: '',
      mark: '',
      model: '',
      OsRetorno: '',
      dataFabrica: '',
    },
    TableAgRetornoFabrica: {
      page: 1,
      total: 25,
      count: 0,
      show: 0,
      rows: [],
    },
    redirect: false,
    page: 1,
    total: 25,
    count: 0,
    show: 0,
    rows: [],
  }
}


  changeOrder = (field) => {
    this.setState({
      order: {
        field,
        acendent: !this.state.order.acendent,
      }
    })
  }

  // redirectToAnalise = async (lineSelected) => {
  //   const value = {
  //     os: lineSelected.id,
  //     serialNumber: lineSelected.serialNumber,
  //     razaoSocial: lineSelected.razaoSocial,
  //     type: lineSelected.type,
  //     mark: lineSelected.mark,
  //     model: lineSelected.model,
  //     leitor: lineSelected.readerColor,
  //     defect: lineSelected.defect,
  //     garantia: lineSelected.garantia,
  //     conditionType: lineSelected.conditionType,
  //   }
  //   await this.props.redirectAnalyze(value)

  //   this.setState({
  //     analiseSelected: lineSelected,
  //     redirect: true
  //   })
  // }

  // renderRedirect = () => {
  //   if (this.state.redirect) {
  //     return <Redirect to='/logged/analise/add' />
  //   }
  // }

  componentDidMount = () => {
    this.getAll()
  }

  getAll = async () => {
    this.setState({
      loading: true,
    })

    const  query = {
      page: this.state.page,
      total: this.state.total,
      order: this.state.order,
    }

    await getAllProcess(query).then(
      resposta => this.setState({
        // loading: false,
        page: resposta.data.page,
        count: resposta.data.count,
        show: resposta.data.show,
        rows: resposta.data.rows,
      })
    )

    const queryFabrica = {
      filters: {
        process: {
          specific: {
            status: 'fabrica',
          },
        },
      },
      page: this.state.page,
      total: this.state.total,
      order: this.state.order,
    }

    await getAllProcess(queryFabrica).then(
      resposta => this.setState({
        loading: false,
        TableAgRetornoFabrica: {
          page: resposta.data.page,
          count: resposta.data.count,
          show: resposta.data.show,
          rows: resposta.data.rows,
        }
      })
    )
  }

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

  TableAgRetornoFabrica = () => (
    <div className='div-mainHeader-dashTec'>
      <div className='div-table-separeteLineMain-dashTec' />
      <div className='div-table-header-dashTec'>
        <div className='div-table-cel-Os-retornoFabrica-dashTec'
          onClick={() => this.changeOrder('OsRetorno')}
        >
          {this.state.order.field === 'OsRetorno' ?
            <div className='div-icon-dashTec'>
              {this.state.order.acendent ?
                <Icon type="caret-down" /> :
                <Icon type="caret-up" />}
            </div>
            : <div className='div-icon-dashTec'></div>}
          <h2 className='div-table-label-dashTec'>OS</h2>
        </div>
        <div className='div-table-cel-serialNumber-retornoFabrica-dashTec'
          onClick={() => this.changeOrder('serialNumber')}>
          {this.state.order.field === 'serialNumber' ?
            <div className='div-icon-dashTec'>
              {this.state.order.acendent ?
                <Icon type="caret-down" /> :
                <Icon type="caret-up" />}
            </div>
            : <div className='div-icon-dashTec'></div>}
          <h2 className='div-table-label-dashTec'>Número de série</h2>
        </div>
        <div className='div-table-cel-dataIdaFabrica-retornoFabrica-dashTec'
          onClick={() => this.changeOrder('dataFabrica')}>
          {this.state.order.field === 'dataFabrica' ?
            <div className='div-icon-dashTec'>
              {this.state.order.acendent ?
                <Icon type="caret-down" /> :
                <Icon type="caret-up" />}
            </div>
            : <div className='div-icon-dashTec'></div>}
          <h2 className='div-table-label-dashTec'>Data de ida para fábrica</h2>
        </div>
      </div>
     <div className='div-table-separeteLineMain-dashTec' /> 
     {this.state.loading ? <div className='spin-dashPeca'><Spin spinning={this.state.loading}/></div> : null}
       {this.state.TableAgRetornoFabrica.rows === undefined ? 'Não há entradas cadastrada' :
         this.state.TableAgRetornoFabrica.rows.map((line) =>
          <div className='div-table-list-dashTec'>
            <div className='div-tableRow-dashTec'>
              <div className='div-table-cel-Os-retornoFabrica-dashTec'>
                <label className='div-table-label-cel-dashTec'>
                  {line.id}
                </label>
              </div>
              <div className='div-table-cel-cnpj-dashTec'>
                <label className='div-table-cel-serialNumber-retornoFabrica-dashTec'>
                  {line.serialNumber}
                </label>
              </div>
              <div className='div-table-cel-dataIdaFabrica-retornoFabrica-dashTec'>
                <label className='div-table-label-cel-dashTec'>
                  {line.status}
                </label>
              </div>
            </div>
            <div className='div-table-separeteLinerow-dashTec' />
          </div>
        )
      }
      <div className='gerCmp-div-table-footer'>
        <this.Pages />
      </div>
    </div>
  )


  render() {
    // console.log(this.props)
    return (
      <div className='card-bg-dashTec'>

        <div className='div-comp-Linha div-comp-header'>
          <h1 className='div-comp-title'>Tela técnica</h1>
        </div>

        <div className='div-bemVindo-dashTec'>Bem-vindo Guilherme</div> 
        
        <div className='div-linha-cardsInfo-dashTec'>

        <Card className='card-info-dashTec'>
          <div className='div-card-agAnalise-dashTec'>Aguardando análise</div>
          <div className='div-card-numero-dashTec'>{this.props.count.analise === undefined ? 0 : this.props.count.analise}</div>
        </Card>

        <Card className='card-info-dashTec'>
          <div className='div-card-agAnalise-dashTec'>Aguardando retorno</div>
          <div className='div-card-numero-dashTec'>{this.state.TableAgRetornoFabrica.count === undefined ? 0 : this.state.TableAgRetornoFabrica.count}</div>
        </Card>

        <Card className='card-info-dashTec'>
          <div className='div-card-agAnalise-dashTec'>Revisão testes</div>
          <div className='div-card-numero-dashTec'>{this.props.count.revisao === undefined ? 0 : this.props.count.revisao}</div>
        </Card>

        <Card className='card-info-dashTec'>
          <div className='div-card-agAnalise-dashTec'>Aguardando aprov.</div>
          <div className='div-card-numero-dashTec'>{this.props.count.aprovacao === undefined ? 0 : this.props.count.aprovacao}</div>
        </Card>

        <Card className='card-info-dashTec'>
          <div className='div-card-agAnalise-dashTec'>Revisão final</div>
          <div className='div-card-numero-dashTec'>{this.props.count.revisaoFinal === undefined ? 0 : this.props.count.revisaoFinal}</div>
        </Card>

        </div>

        <div className='div-linha-dashTec'>
          
          <div className='text-info-dashTec'>Aguardando análise</div>
          <TableAgAnalise  status='preAnalise'  name='analise'/>
        
        </div>

        <div className='div-linha-dashTec'>
          
          <div className='text-info-dashTec'>Aguardando retorno da fábrica</div>
          <this.TableAgRetornoFabrica />
        
        </div>

        <div className='div-linha-dashTec'>
          
          <div className='text-info-dashTec'>Revisão testes</div>
          <TableAgAnalise  status='revisao1' name='revisao'/>
        </div>

        <div className='div-linha-dashTec'>
          
          <div className='text-info-dashTec'>Aguardando aprovação</div>
          <TableAgAnalise  status='orcamento'  name='aprovacao'/>
        
        </div>

        <div className='div-linha-dashTec'>
          
          <div className='text-info-dashTec'>Revisão testes finais</div>
          <TableAgAnalise  status='revisaoFinal'  name='revisaoFinal'/>
        
        </div>

      </div>
    )
  }
}

// export default DashTecnico

function mapDispacthToProps(dispach) {
  return bindActionCreators ({ redirectAnalyze, }, dispach)
}

function mapStateToProps (state) {
  return {
    count: state.count,
  }
}

export default connect (mapStateToProps, mapDispacthToProps)(DashTecnico)