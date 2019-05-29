import React, { Component } from 'react'
import { Input, Modal, Button, Select, Radio } from 'antd';

import * as R from 'ramda'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { changeValueCompany, onSubmit } from '../EntranceRedux/action'
import './index.css'


const { Option } = Select;

class NewEntrance extends Component {

  state = {
    radio: ''
  }

  changeRadioSim = () => {
    this.setState({
      radio: 'sim'
    })
  }

  changeRadioNao = () => {
    this.setState({
      radio: 'nao'
    })
  }

  handleChange(value) {
    console.log(`selected ${value}`);
  }

  onSubmit = () => {
    const body = R.omit(['sucess'], this.props.value)
    this.props.onSubmit(body)
  }

  render() {
    if (this.props.value.sucess) {
      Modal.success({
        title: 'Sucesso',
        content: `Entrada feita com sucesso`,
      })
    }
    return (
      <div className='div-comp-card'>
        <div className='div-comp-Linha div-comp-header'>
          <h1 className='div-comp-title'>Nova entrada</h1>
        </div>

        <div className='div-entrance-linha1'>
          <div className='div-entrance-cnpj'>
            <h2 className='div-comp-label'>Cnpj:</h2>
            <Input
              className='input-cnpj'
              placeholder='Digite o cnpj'
              name='cnpj'
              allowClear
            // value={this.props.value.cnpj}
            // onChange={this.props.changeValueCompany}
            />
          </div>
          <div className='div-entrance-rs'>
            <h2 className='div-comp-label'>Empresa:</h2>
            <Input
              className='input-cnpj'
              placeholder='Digite a razão social'
              name='razaoSocial'
              allowClear
            // value={this.props.value.cnpj}
            // onChange={this.props.changeValueCompany}
            />
          </div>
        </div>
        <div className='div-entrance-linha1'>
          <div className='div-entrance-ns'>
            <h2 className='div-comp-label'>Número de série:</h2>
            <Input
              className='input-cnpj'
              placeholder='Digite o número'
              name='numeroSerie'
              allowClear
            // value={this.props.value.cnpj}
            // onChange={this.props.changeValueCompany}
            />
          </div>
          <div className='div-entrance-cor'>
            <h2 className='div-comp-label'>Cor do leitor:</h2>
            <Input
              className='input-cnpj'
              placeholder='Digite a cor'
              name='corLeitor'
              allowClear
            // value={this.props.value.cnpj}
            // onChange={this.props.changeValueCompany}
            />
          </div>
          <div className='div-entrance-type'>
            <h2 className='div-comp-label'>Tipo:</h2>
            <Select defaultValue="Tipo" style={{ width: 180 }} onChange={this.handleChange}>
              <Option value="relogio">Relógio</Option>
              <Option value="catraca">Catraca</Option>
              <Option value="controle">Controle de Acesso</Option>
              <Option value="peca">Peça</Option>
              <Option value="sirene">Sirene</Option>
            </Select>
            <Select defaultValue="Marca" style={{ width: 120 }} onChange={this.handleChange}>
              <Option value="Teste1">Teste1</Option>
              <Option value="Teste2">Teste2</Option>
              <Option value="Teste3">Teste3</Option>
            </Select>
            <Select defaultValue="Modelo" style={{ width: 120 }} onChange={this.handleChange}>
              <Option value="Teste1">Teste1</Option>
              <Option value="Teste2">Teste2</Option>
              <Option value="Teste3">Teste3</Option>
            </Select>
          </div>
        </div>

        <div className='div-entrance-linha1'>
          <div className='div-entrance-desc'>
            <h2 className='div-comp-label'>Descrição (opicional):</h2>
            <Input
              className='input-cnpj'
              placeholder='Digite a descrição'
              name='descricao'
              allowClear
            // value={this.props.value.cnpj}
            // onChange={this.props.changeValueCompany}
            />
          </div>
        </div>
        <div className='div-entrance-linha1'>
          <div className='div-entrance-como'>
            <h2 className='div-comp-label'>Como chegou:</h2>
            <Select defaultValue="Cliente" style={{ width: 180 }} onChange={this.handleChange}>
              <Option value="cliente">Cliente</Option>
              <Option value="sedex">Sedex</Option>
              <Option value="motoboy">Motoboy</Option>
              <Option value="externo">Técnico externo</Option>
            </Select>
          </div>
          {/* <div className='div-entrance-contato'>
            <h2 className='div-comp-label'>Contato:</h2>
            <Input
              className='input-cnpj'
              placeholder=''
              name='how'
              allowClear
            // value={this.props.value.cnpj}
            // onChange={this.props.changeValueCompany}
            />
          </div> */}
        </div>
        <div className='div-entrance-linha1'>
          <div className='div-danos'>
            <div className='div-entrance-danos'>
              <h2 className='div-comp-label'>Danos externos:</h2>
              <Radio.Group name="radiogroup">
                <Radio value={'sim'} nameRadio='sim' onChange={this.changeRadioSim}>Sim</Radio>
                <Radio value={'nao'} nameRadio='nao' onChange={this.changeRadioNao}>Não</Radio>
              </Radio.Group>
            </div>
            <div className='div-entrance-inputDanos'>
              {this.state.radio === 'sim' ? <Input placeholder='Digite os danos no equipamento' /> : <p className='ponto'>.</p>}
            </div>
          </div>
        </div>
        <div className='div-entrance-linha1'>
          <div className='div-entrance-acessorio'>
              <h2 className='div-comp-label'>Acessórios:</h2>
              <Input
              className='input-cnpj'
              placeholder='Digite os acessórios'
              name='acessorio'
              allowClear
            // value={this.props.value.cnpj}
            // onChange={this.props.changeValueCompany}
            />
            </div>
        </div>
        <div className='div-entrance-linha1'>
          <div className='div-entrance-defeito'>
              <h2 className='div-comp-label'>Defeito apresentado:</h2>
              <Input
              className='input-cnpj'
              placeholder='Digite o defeito'
              name='acessorio'
              allowClear
            // value={this.props.value.cnpj}
            // onChange={this.props.changeValueCompany}
            />
            </div>
        </div>
        <div className='div-button-entrance'>
          <Button className='button-entrance'>Salvar</Button>
        </div>
      </div>
    )
  }
}

function mapDispacthToProps(dispach) {
  return bindActionCreators({ changeValueCompany, onSubmit }, dispach)
}

function mapStateToProps(state) {
  return {
    value: state.newCompany,
  }
}

export default connect(mapStateToProps, mapDispacthToProps)(NewEntrance)
