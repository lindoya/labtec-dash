import React, { Component } from 'react'
import { Input, Button, Select } from 'antd';
import { validators } from './validator'
import { getOneByCnpj } from '../../../services/company'
import { getAllMarkByTypeService, getAllModelByMarkService } from '../../../services/equip'
import './index.css'

const { Option } = Select;

class NewEquip extends Component {

  state = {
    message:{
      razaoSocial: '',
      cnpj: '',
      serialNumber: '',
      leitor: '',
      type: '',
      marksList: '',
      modelsList: '', 
      mark:'',
      model:'',
    },
    fieldFalha:{
      razaoSocial: false,
      cnpj: false,
      serialNumber: false,
      leitor: false,
      type: false,
      marksList: false,
      modelsList: false, 
      mark:false,
      model:false,
    },
    razaoSocial: '',
    cnpj: '',
    serialNumber: '',
    leitor: '',
    type: 'relogio',
    marksList: [],
    modelsList: [], 
    mark:{
      id: '',
      mark:'',
    },
    model:'',
  }

  componentDidMount = () => {
    this.getAllMarkByType()
  }

  getAllMarkByType = async () => {
    const resposta = await getAllMarkByTypeService({ type: this.state.type })

    this.setState({
      marksList: resposta.data
    })
  }

  getModelsByMark = async () => {
    const resposta = await getAllModelByMarkService({ mark: this.state.mark.mark})

    this.setState({
      modelsList: resposta.data,
    })
  }

  selectMark = async (value) => {

    this.setState({
      mark: value
    }, this.getModelsByMark)
  }

  getRazaoSocial = async (e) => {
    const cnpjWithMask= e.target.value
    const cnpj = cnpjWithMask.replace(/\D/g, '')
    try {
      const company = await getOneByCnpj(cnpj)
      this.setState({
        razaoSocial: company.data.razaoSocial
      }, console.log(company))
    } catch (error) {
    }
  }

  onChange = (e) => {
    const { nome, valor, fieldFalha, message } = validators(e.target.name, e.target.value, this.state)
    this.setState({
      [nome]: valor,
      fieldFalha,
      message
    })
  }

 handleChangeType = (value) => {
    this.setState({
      type: `${value}`,
    }, this.getAllMarkByType);
  }

  handleChangeMark = (value) => {
    this.setState({
      mark: `${value}`
    });
  }

  render() {
    console.log(this.state)
    return (
      <div className='div-comp-card'>

        <div className='div-comp-Linha div-comp-header'>
          <h1 className='div-comp-title'>Cadastro de equipamentos</h1>
        </div>

        <div className='div-comp-form'>

          <div className='div-newEquip-Linha'>

            <div className='div-newEquip-cnpj'>
              <h2 className='div-comp-label'>Cnpj:</h2>
              <Input
                className='input-newEquip'
                placeholder='Digite o cnpj'
                name='cnpj'
                value={this.state.cnpj}
                onChange={this.onChange}
                onBlur={this.getRazaoSocial}
                allowClear
              // value={this.props.value.number}
              // onChange={this.props.changeValue}
              />
            </div>

            <div className='div-newEquip-razaoSocial'>
              <h2 className='div-comp-label'>Razão social:</h2>
              <Input
                readOnly
                className='input-newEquip'
                name='razaoSocial'
                value={this.state.razaoSocial === '' ? '-' : this.state.razaoSocial}
              // value={this.props.value.number}
              // onChange={this.props.changeValue}
              />
            </div>
          </div>

          <div className='div-newEquip-Linha'>

            <div className='div-newEquip-serialNumber'>
              <h2 className='div-comp-label'>Número de série:</h2>
              <Input
                className='input-newEquip'
                placeholder='Digite o número'
                value={this.state.serialNumber}
                name='serialNumber'
                onChange={this.onChange}
                allowClear
              // value={this.props.value.number}
              // onChange={this.props.changeValue}
              />
            </div>

            <div className='div-newEquip-type'>
              <h2 className='div-comp-label'>Tipo:</h2>
              <Select
                defaultValue="relogio" 
                style={{ width: '100%' }} 
                onChange={this.handleChangeType}
              >
                <Option value="relogio">Relógio</Option>
                <Option value="catraca">Catraca</Option>
                <Option value="controleAcesso">Controle de Acesso</Option>
                <Option value="peca">Peça</Option>
                <Option value="sirene">Sirene</Option>
              </Select>
            </div>

            <div className='div-newEquip-mark'>
              <h2 className='div-comp-label'>Marca:</h2>
              <Select defaultValue="Não selecionado" style={{ width: '100%' }} onChange={this.handleChangeMark}>
              {this.state.marksList.map(mark => <Option value={mark.id}>{mark.mark}</Option>)}
              </Select>
            </div>
          </div>


          <div className='div-newEquip-Linha'>

           
            <div className='div-newEquip-modelo'>
              <h2 className='div-comp-label'>Modelo:</h2>
              {/* <Select defaultValue="guilherme" style={{ width: '100%' }} onChange={this.handleChange}>
              {this.state.modelsList.map(model => <Option value={model.id}>{model.mark}</Option>)}
              </Select> */}
            </div>


            <div className='div-newEquip-leitor'>
              <h2 className='div-comp-label'>Leitor:</h2>
              <Select defaultValue="NaoSeAplica" style={{ width: '100%' }} onChange={this.handleChange}>
                <Option value="Branco">Branco</Option>
                <Option value="Vermelho">Vermelho</Option>
                <Option value="Azul">Azul</Option>
                <Option value="Verde">Verde</Option>
                <Option value="NaoSeAplica">Não se aplica</Option>
              </Select>
            </div>

          </div>

          <div className='div-comp-button'>
            <Button
              className='comp-button'
              // onClick={this.onSubmit}
              type="primary">Salvar
            </Button>
          </div>

        </div>
      </div>
    )
  }
}

export default NewEquip
