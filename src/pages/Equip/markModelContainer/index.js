import React, { Component } from 'react'
import { Input, Modal, Button } from 'antd';
import { Select } from 'antd';


import * as R from 'ramda'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { changeValue, onSubmit } from '../EquipRedux/action'
import './index.css'

const Option = Select.Option;

class NewCompany extends Component {
  onSubmit = () => {
    const body = R.omit(['sucess'], this.props.value)
    this.props.onSubmit(body)
  }

  render() {
    console.log(this.props.value.sucess)
    if (this.props.value.sucess) {
      Modal.success({
        title: 'Sucesso',
        content: `O tipo de equipamento foi cadastrado com sucesso`,
      })
    }

    return (
      <div className='div-equipType-card'>

        <div className='div-equipType-Linha div-equipType-header'>
          <h1 className='div-equipType-title'>Cadastro Tipo de Equipamento</h1>
        </div>

        <div className='div-equipType-form'>

          <div className='div-equipType-Linha'>

            <div className='div-equipType-group'>
              <h2 className='div-equipType-label'>Tipo:</h2>
                <Select defaultValue="relogio" className='input-equipType-tipo'>
                  <Option value="relogio">Relógio</Option>
                  <Option value="catraca">Catraca</Option>
                  <Option value="controleAcesso">Controle de Acesso</Option>
                  <Option value="peca">Peça</Option>
                  <Option value="sirene">Sirene</Option>
                </Select>

              {/* <Input
                className='input-cnpj'
                placeholder='Digite o numero de Série'
                name='number'
                value={this.props.value.number}
                onChange={this.props.changeValue}
              /> */}
            </div>

            <div className='div-comp-rs'>
              <h2 className='div-comp-label'>Razão Social:</h2>
              <Input
                className='input-rs'
                placeholder='Digite a razão social'
                name='razaoSocial'
                value={this.props.value.razaoSocial}
                onChange={this.props.changeValue}
              />
            </div>
          </div>

        </div>
  
      </div>
    )
  }
}

function mapDispacthToProps(dispach) {
  return bindActionCreators({ changeValue, onSubmit }, dispach)
}

function mapStateToProps(state) {
  return {
    value: state.newCompany,
  }
}

export default connect(mapStateToProps, mapDispacthToProps)(NewCompany)
