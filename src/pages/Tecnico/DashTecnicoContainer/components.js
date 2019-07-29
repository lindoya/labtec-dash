import React, { Component } from 'react'
import './index.css'
import { Icon, Button, Spin } from 'antd';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'


// import { getAllEntrance } from '../../../services/entrance'
import { getAllProcess } from '../../../services/process'
import { redirectAnalyze, count } from '../TecnicoRedux/action'
import { setCrono } from '../../Analise/AnaliseRedux/actions'

class TableAgAnalise extends Component {
  constructor(props) {
    super(props)

    this.state = {
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
    console.log(lineSelected)
    const value = {
      analyze: lineSelected.analyze,
      os: lineSelected.id,
      serialNumber: lineSelected.serialNumber,
      razaoSocial: lineSelected.razaoSocial,
      type: lineSelected.type,
      mark: lineSelected.mark,
      model: lineSelected.model,
      leitor: lineSelected.readerColor,
      defect: lineSelected.defect,
      garantia: lineSelected.garantia,
      conditionType: lineSelected.conditionType,
      equipModelId: lineSelected.equipModelId,
      analysisCompleted: false,
    }

    const valueCrono = {
      currenMilliseconds: 0,
      pausa: false,
      date: Date.now(),
      initDate: new Date(),
    }

    await this.props.setCrono(valueCrono)

    await this.props.redirectAnalyze(value)

    this.setState({
      analiseSelected: lineSelected,
      redirect: true
    })
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/logged/analise/add'/>
    }
  }

  componentDidMount = () => {
    this.getAll()
  }

  getAll = async () => {
    this.setState({
      loading: true,
    })

    const queryAnalyze = {
      filters: {
        process: {
          specific: {
            status: this.props.status,
          },
        },
      },
      page: this.state.page,
      total: this.state.total,
      order: this.state.order,
    }

    await getAllProcess(queryAnalyze).then(
      resposta => this.setState({
        loading: false,
        page: resposta.data.page,
        count: resposta.data.count,
        show: resposta.data.show,
        rows: resposta.data.rows,
      })
    )

    await this.props.count({ [this.props.name]: this.state.count })
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

  render() {
    return (
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
        {this.state.loading ? <div className='spin-dashPeca'><Spin spinning={this.state.loading} /></div> : null}
        {this.state.rows === undefined ? this.props.text : this.state.rows.map((line) =>
          <div className='div-table-list-dashTec'>
            {this.renderRedirect()}
            <div className={this.props.className} onClick={() => this.redirectToAnalise(line)}>
              <div className='div-table-cel-Os-dashTec'>
                <label className='div-table-label-cel-dashTec'>
                  {line.id}
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
              {/* <div className='div-table-cel-modelo-dashTec'>
                    <label className='div-table-label-cel-dashTec'>
                      {line.status}
                    </label>
                  </div> */}
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
  }
}

// export default DashTecnico

function mapDispacthToProps(dispach) {
  return bindActionCreators({ redirectAnalyze, count, setCrono }, dispach)
}

function mapStateToProps(state) {
  return {
    // value: state.teste,
  }
}

export default connect(mapStateToProps, mapDispacthToProps)(TableAgAnalise)