import React, { Component } from 'react'
import './index.css'
import { Card, Icon, Button, Spin } from 'antd';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'


// import { getAllEntrance } from '../../../services/entrance'
import { getAllProcess } from '../../../services/process'
import { redirectTest } from '../TecnicoRedux/action'

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

  redirectToAnalise = async (lineSelected) => {
    const value = {
      serialNumber: lineSelected.serialNumber,
      razaoSocial: lineSelected.razaoSocial,
      type: lineSelected.type,
      mark: lineSelected.mark,
      model: lineSelected.model,
      leitor: lineSelected.readerColor,
      defect: lineSelected.defect,
    }
    await this.props.redirectTest(value)

    this.setState({
      analiseSelected: lineSelected,
      redirect: true
    })
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/logged/analise/add' />
    }
  }

  componentDidMount = () => {
    this.getAll()
  }

  getAll = async () => {
    this.setState({
      loading: true,
    })
    const query = {
      page: 1,
      total: 25,
      order: this.state.order,
    }

    await getAllProcess(query).then(
      resposta => this.setState({
        loading: false,
        page: resposta.data.page,
        count: resposta.data.count,
        show: resposta.data.show,
        rows: resposta.data.rows,
      })
    )
  }


  TableAgAnalise = () => (
    <div className='div-mainHeader-dashTec'>
      <div className='div-table-separeteLineMain-dashTec' />
      <div className='div-table-header-dashTec'>
        <div className='div-table-cel-Os-dashTec'
          onClick={() => this.changeOrder('Os')}
        >
          {this.state.order.field === 'Os' ?
            <div className='div-icon-dashTec'>
              {this.state.order.acendent ?
                <Icon type="caret-down" /> :
                <Icon type="caret-up" />}
            </div>
            : <div className='div-icon-dashTec'></div>}
          <h2 className='div-table-label-dashTec'>OS</h2>
        </div>
        <div className='div-table-cel-contrato-dashTec'
          onClick={() => this.changeOrder('contrato')}>
          {this.state.order.field === 'contrato' ?
            <div className='div-icon-dashTec'>
              {this.state.order.acendent ?
                <Icon type="caret-down" /> :
                <Icon type="caret-up" />}
            </div>
            : <div className='div-icon-dashTec'></div>}
          <h2 className='div-table-label-dashTec'>Contrato</h2>
        </div>
        <div className='div-table-cel-garantia-dashTec'
          onClick={() => this.changeOrder('garantia')}>
          {this.state.order.field === 'garantia' ?
            <div className='div-icon-dashTec'>
              {this.state.order.acendent ?
                <Icon type="caret-down" /> :
                <Icon type="caret-up" />}
            </div>
            : <div className='div-icon-dashTec'></div>}
          <h2 className='div-table-label-dashTec'>Garantia</h2>
        </div>
        <div className='div-table-cel-serialNumber-dashTec'
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
        <div className='div-table-cel-razaoSocial-dashTec'
          onClick={() => this.changeOrder('razaoSocial')}>
          {this.state.order.field === 'razaoSocial' ?
            <div className='div-icon-dashTec'>
              {this.state.order.acendent ?
                <Icon type="caret-down" /> :
                <Icon type="caret-up" />}
            </div>
            : <div className='div-icon-dashTec'></div>}
          <h2 className='div-table-label-dashTec'>Razão social</h2>
        </div>
        <div className='div-table-cel-tipoMarcaModelo-dashTec'
          onClick={() => this.changeOrder('type')}>
          {this.state.order.field === 'type' ?
            <div className='div-icon-dashTec'>
              {this.state.order.acendent ?
                <Icon type="caret-down" /> :
                <Icon type="caret-up" />}
            </div>
            : <div className='div-icon-dashTec'></div>}
          <h2 className='div-table-label-dashTec'>Tipo - Marca - Modelo</h2>
        </div>
      </div>
     <div className='div-table-separeteLineMain-dashTec' /> 
     {this.state.loading ? <div className='spin-dashPeca'><Spin spinning={this.state.loading}/></div> : null}
       {this.state.rows === undefined ? 'Não há entradas cadastrada' : this.state.rows.map((line) =>
          <div className='div-table-list-dashTec'>
          {this.renderRedirect()}
            <div className='div-tableRow-dashTec' onClick={() => this.redirectToAnalise(line)}>
              <div className='div-table-cel-serialNumber-dashTec'>
                <label className='div-table-label-cel-dashTec'>
                  {line.externalDamage}
                </label>
              </div>
              <div className='div-table-cel-cnpj-dashTec'>
                <label className='div-table-label-cel-dashTec'>
                  {line.serialNumber}
                </label>
              </div>
              <div className='div-table-cel-modelo-dashTec'>
                <label className='div-table-label-cel-dashTec'>
                  {line.model}
                </label>
              </div>
              <div className='div-table-cel-modelo-dashTec'>
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
        <Button type='primary'>1</Button>
        <Button type='primary'>2</Button>
        <Button type='primary'>3</Button>
        <Button type='primary'>4</Button>
        <Button type='primary'>5</Button>
      </div>
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
       {this.state.rows === undefined ? 'Não há entradas cadastrada' :
         this.state.rows.map((line) =>
          <div className='div-table-list-dashTec'>
            <div className='div-tableRow-dashTec'>
              <div className='div-table-cel-serialNumber-dashTec'>
                <label className='div-table-label-cel-dashTec'>
                  {line.externalDamage}
                </label>
              </div>
              <div className='div-table-cel-cnpj-dashTec'>
                <label className='div-table-label-cel-dashTec'>
                  {line.serialNumber}
                </label>
              </div>
              <div className='div-table-cel-modelo-dashTec'>
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
        <Button type='primary'>1</Button>
        <Button type='primary'>2</Button>
        <Button type='primary'>3</Button>
        <Button type='primary'>4</Button>
        <Button type='primary'>5</Button>
      </div>
    </div>
  )


  render() {
    return (
      <div className='card-bg-dashTec'>

        <div className='div-comp-Linha div-comp-header'>
          <h1 className='div-comp-title'>Tela técnica</h1>
        </div>

        <div className='div-bemVindo-dashTec'>Bem-vindo Guilherme</div> 
        
        <div className='div-linha-cardsInfo-dashTec'>

        <Card className='card-info-dashTec'>
          <div className='div-card-agAnalise-dashTec'>Aguardando análise</div>
          <div className='div-card-numero-dashTec'>{this.state.count === undefined ? 0 : this.state.count}</div>
        </Card>

        <Card className='card-info-dashTec'>
          <div className='div-card-agAnalise-dashTec'>Aguardando retorno</div>
          <div className='div-card-numero-dashTec'>15</div>
        </Card>

        <Card className='card-info-dashTec'>
          <div className='div-card-agAnalise-dashTec'>Revisão testes</div>
          <div className='div-card-numero-dashTec'>7</div>
        </Card>

        <Card className='card-info-dashTec'>
          <div className='div-card-agAnalise-dashTec'>Aguardando aprov.</div>
          <div className='div-card-numero-dashTec'>6</div>
        </Card>

        <Card className='card-info-dashTec'>
          <div className='div-card-agAnalise-dashTec'>Revisão final</div>
          <div className='div-card-numero-dashTec'>13</div>
        </Card>

        </div>

        <div className='div-linha-dashTec'>
          
          <div className='text-info-dashTec'>Aguardando análise</div>
          <this.TableAgAnalise  name='preAnalise'/>
        
        </div>

        <div className='div-linha-dashTec'>
          
          <div className='text-info-dashTec'>Aguardando retorno da fábrica</div>
          <this.TableAgRetornoFabrica />
        
        </div>

        <div className='div-linha-dashTec'>
          
          <div className='text-info-dashTec'>Revisão testes</div>
          <this.TableAgAnalise />
        
        </div>

        <div className='div-linha-dashTec'>
          
          <div className='text-info-dashTec'>Aguardando aprovação</div>
          <this.TableAgAnalise />
        
        </div>

        <div className='div-linha-dashTec'>
          
          <div className='text-info-dashTec'>Revisão testes finais</div>
          <this.TableAgAnalise />
        
        </div>

      </div>
    )
  }
}

// export default DashTecnico

function mapDispacthToProps(dispach) {
  return bindActionCreators ({ redirectTest, }, dispach)
}

function mapStateToProps (state) {
  return {
    value: state.teste,
  }
}

export default connect (mapStateToProps, mapDispacthToProps)(DashTecnico)