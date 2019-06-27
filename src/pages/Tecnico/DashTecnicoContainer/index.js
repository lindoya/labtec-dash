import React, { Component } from 'react'
import './index.css'
import { Card, Icon } from 'antd';


class DashTecnico extends Component {

  state={
    order: {
      field: 'peca',
      acendent: true,
    },
    Os: '',
    contrato: '',
    garantia: '',
    serialNumber: '',
    razaoSocial: '',
    type: '',
    mark: '',
    model: ''
  }


  changeOrder = (field) => {
    this.setState({
      order: {
        field,
        acendent: !this.state.order.acendent,
      }
    })
  }

  TableCompanies = () => (
    <div className='div-mainHeader-dashEquip'>
      <div className='div-table-separeteLineMain-dashEquip' />
      <div className='div-table-header-dashEquip'>
        <div className='div-table-cel-Os-dashEquip'
          onClick={() => this.changeOrder('Os')}
        >
          {this.state.order.field === 'Os' ?
            <div className='div-icon-dashEquip'>
              {this.state.order.acendent ?
                <Icon type="caret-down" /> :
                <Icon type="caret-up" />}
            </div>
            : <div className='div-icon-dashEquip'></div>}
          <h2 className='div-table-label-dashEquip'>OS</h2>
        </div>
        <div className='div-table-cel-contrato-dashEquip'
          onClick={() => this.changeOrder('contrato')}>
          {this.state.order.field === 'contrato' ?
            <div className='div-icon-dashEquip'>
              {this.state.order.acendent ?
                <Icon type="caret-down" /> :
                <Icon type="caret-up" />}
            </div>
            : <div className='div-icon-dashEquip'></div>}
          <h2 className='div-table-label-dashEquip'>Contrato</h2>
        </div>
        <div className='div-table-cel-garantia-dashEquip'
          onClick={() => this.changeOrder('garantia')}>
          {this.state.order.field === 'garantia' ?
            <div className='div-icon-dashEquip'>
              {this.state.order.acendent ?
                <Icon type="caret-down" /> :
                <Icon type="caret-up" />}
            </div>
            : <div className='div-icon-dashEquip'></div>}
          <h2 className='div-table-label-dashEquip'>Garantia</h2>
        </div>
        <div className='div-table-cel-serialNumber-dashEquip'
          onClick={() => this.changeOrder('serialNumber')}>
          {this.state.order.field === 'serialNumber' ?
            <div className='div-icon-dashEquip'>
              {this.state.order.acendent ?
                <Icon type="caret-down" /> :
                <Icon type="caret-up" />}
            </div>
            : <div className='div-icon-dashEquip'></div>}
          <h2 className='div-table-label-dashEquip'>Número de série</h2>
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
          <h2 className='div-table-label-dashEquip'>Razão social</h2>
        </div>
        <div className='div-table-cel-type-dashEquip'
          onClick={() => this.changeOrder('type')}>
          {this.state.order.field === 'type' ?
            <div className='div-icon-dashEquip'>
              {this.state.order.acendent ?
                <Icon type="caret-down" /> :
                <Icon type="caret-up" />}
            </div>
            : <div className='div-icon-dashEquip'></div>}
          <h2 className='div-table-label-dashEquip'>Tipo</h2>
        </div>
        <div className='div-table-cel-mark-dashEquip'
          onClick={() => this.changeOrder('mark')}>
          {this.state.order.field === 'mark' ?
            <div className='div-icon-dashEquip'>
              {this.state.order.acendent ?
                <Icon type="caret-down" /> :
                <Icon type="caret-up" />}
            </div>
            : <div className='div-icon-dashEquip'></div>}
          <h2 className='div-table-label-dashEquip'>Marca</h2>
        </div>
        <div className='div-table-cel-model-dashEquip'
          onClick={() => this.changeOrder('model')}>
          {this.state.order.field === 'model' ?
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
       {/* {
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
      <div className='card-bg-dashTec'>

        <div className='div-comp-Linha div-comp-header'>
          <h1 className='div-comp-title'>Tela técnica</h1>
        </div>

        <div className='div-bemVindo-dashTec'>Bem-vindo Guilherme</div> 
        
        <div className='div-linha-cardsInfo-dashTec'>

        <Card className='card-info-dashTec'>
          <div className='div-card-agAnalise-dashTec'>Aguardando análise</div>
          <div className='div-card-numero-dashTec'>13</div>
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
        
          <this.TableCompanies />
        
        </div>


      </div>
    )
  }
}

export default DashTecnico