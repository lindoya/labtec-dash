import React, { Component } from 'react'
import { Input, Button, Select, message } from 'antd';
import { validators, masks } from './validator'
import { getOneByCnpj } from '../../../services/company'
import { getAllMarkByTypeService, getAllModelByMarkService, newEquip } from '../../../services/equip'
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
    leitor: 'NaoSeAplica',
    type: 'relogio',
    marksList: [],
    modelsList: [], 
    mark:'Não selecionado',
    model:'Não selecionado',
    companyId: '',
    equipModelId: '',
    messageError: false,
    messageSuccess: false
  }

  saveTargetNewEquip = async () => {
    const values = {
      serialNumber: this.state.serialNumber,
      readerColor: this.state.leitor,
      companyId: this.state.companyId,
      equipModelId: this.state.equipModelId,
    }

    const resposta = await newEquip(values)

    if (resposta.status === 422) {

      this.setState({
        messageError: true,
        fieldFalha: resposta.data.fields[0].field,
        message: resposta.data.fields[0].message,
      })
      await this.error()
      this.setState({
        messageError: false
      })
    } if (resposta.status === 200) {

      this.setState({
        razaoSocial: '',
        cnpj: '',
        serialNumber: '',
        leitor: 'NaoSeAplica',
        type: 'relogio',
        marksList: [],
        modelsList: [], 
        mark:'Não selecionado',
        model:'Não selecionado',
        messageSuccess: true,
      }, this.getAllMarkByType)
      await this.success()
      this.setState({
        messageSuccess: false
      })
    }
  }

  success = () => {
    message.success('Equipamento cadastrada com sucesso');
  };

  error = () => {
    message.error('Erro ao cadastrar equipamento');
  };

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
    if (this.state.mark !== 'Nao selecionado') {
      const resposta = await getAllModelByMarkService({ mark: this.state.mark })

      this.setState({
        modelsList: resposta.data,
      })
    }
  }

  changeTypeSelected = (valueSelected) => {
    this.setState({
      type: valueSelected,
      modelsList: [],
      model: 'Não selecionado',
      mark: 'Não selecionado',
    }, this.getAllMarkByType)
  }

  getRazaoSocial = async (e) => {
    const cnpjWithMask= e.target.value
    const cnpj = cnpjWithMask.replace(/\D/g, '')
    try {
      const company = await getOneByCnpj(cnpj)

      this.setState({
        razaoSocial: company.data.razaoSocial,
        companyId: company.data.id,
      })
    } catch (error) {
      const { fieldFalha, message } = this.state
      
      fieldFalha.cnpj = true
      message.cnpj = 'Cnpj inválido.'
        
      this.setState({
        fieldFalha,
        message,
        razaoSocial: '',
      })
    }
  }

  onBlurValidator = (e) => {
    const { 
      nome,
      valor,
      fieldFalha,
      message,
    } = validators(e.target.name, e.target.value, this.state)
    
    this.setState({
      [ nome ]: valor,
      fieldFalha,
      message
    })
  }

  onChange = (e) => {
    const { nome,
      valor,
    } = masks(e.target.name, e.target.value)

    const { fieldFalha } = this.state

    if (nome === 'cnpj') fieldFalha.cnpj = false
    if (nome === 'serialNumber') fieldFalha.serialNumber = false

    this.setState({
      [ nome ]: valor,
      fieldFalha,
    })
  }

  handleChangeMark = (mark) => {
    this.setState({
      mark,
    }, this.getModelsByMark);
  }

  handleChangeModel = (model) => {
    const { fieldFalha } = this.state

    fieldFalha.equipModelId = false

    this.setState({
      fieldFalha,
      model: model,
      equipModelId: model,
    });
  }

  handleChangeLeitor= (value) => {
    this.setState({
      leitor: value,
    });
  }

  render() {
    console.log(this.state)
    return (
      <div className='card-bg-newEquip'>

        <div className='div-comp-Linha div-comp-header'>
          <h1 className='div-comp-title'>Cadastro de equipamentos</h1>
        </div>

        <div className='div-comp-form'>

          <div className='div-newEquip-Linha'>

            <div className='div-newEquip-cnpj'>
              <h2 className={
                this.state.fieldFalha.cnpj ?
                  'div-comp-labelError' :
                  'div-comp-label'
              }>Cnpj:</h2>
              <Input
                className={
                  this.state.fieldFalha.cnpj ?
                    'div-comp-inputError' :
                    ''}
                placeholder='Digite o cnpj'
                name='cnpj'
                value={this.state.cnpj}
                onChange={this.onChange}
                onBlur={this.getRazaoSocial}
                onFocus={this.onChange}
              />
              {this.state.fieldFalha.cnpj ?
                <p className='div-comp-feedbackError'>
                  {this.state.message.cnpj}
                </p> : null}
            </div>

            <div className='div-newEquip-razaoSocial'>
              <h2 className='div-comp-label'>Razão social:</h2>
              <Input
                readOnly
                className='input-newEquip'
                name='razaoSocial'
                value={this.state.razaoSocial === '' ? '-' : this.state.razaoSocial}
              />
            </div>
          </div>

          <div className='div-newEquip-Linha'>

            <div className='div-newEquip-serialNumber'>
              <h2 className={
                this.state.fieldFalha.serialNumber ?
                  'div-comp-labelError' :
                  'div-comp-label'
              }>Número de série:</h2>
              <Input
                className={
                this.state.fieldFalha.serialNumber ?
                  'div-comp-inputError' :
                  'input-newEquip'}
                placeholder='Digite o número'
                value={this.state.serialNumber}
                name='serialNumber'
                onChange={this.onChange}
                onBlur={this.onBlurValidator}
                onFocus={this.onChange}
              />
              {this.state.fieldFalha.serialNumber ?
                <p className='div-comp-feedbackError'>
                  {this.state.message.serialNumber}
                </p> : null}
            </div>

            <div className='div-newEquip-type'>
              <h2 className='div-comp-label'>Tipo:</h2>
              <Select
                value={this.state.type}
                style={{ width: '100%' }} 
                onChange={this.changeTypeSelected}
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
              <Select value={this.state.mark} style={{ width: '100%' }} onChange={(mark) => this.handleChangeMark(mark)}>
              {this.state.marksList.map(mark => <Option key={mark.mark} value={mark.mark}>{mark.mark}</Option>)}
              </Select>
            </div>
          </div>


          <div className='div-newEquip-Linha'>

           
            <div className='div-newEquip-modelo'>
              <h2 className={
                this.state.fieldFalha.equipModelId ?
                  'div-comp-labelError' :
                  'div-comp-label'
              }>Modelo:</h2>
              <Select 
              className={
                this.state.fieldFalha.equipModelId ?
                  'div-comp-inputError' :
                  ''}
              defaultValue="Não selecionado" style={{ width: '100%' }} value={this.state.model} onChange={(model) => this.handleChangeModel(model)}>
              {this.state.modelsList.length === 0 ? null : this.state.modelsList.map(model => <Option key={model.id} value={model.id}>{model.model}</Option>)}
              </Select>
              {this.state.fieldFalha.equipModelId ?
                <p className='div-comp-feedbackError'>
                  {this.state.message.equipModelId}
                </p> : null}
            </div>


            <div className='div-newEquip-leitor'>
              <h2 className='div-comp-label'>Leitor:</h2>
              <Select value={this.state.leitor} style={{ width: '100%' }} onChange={(value) => this.handleChangeLeitor(value)}>
                <Option value="Branco">Branco</Option>
                <Option value="Vermelho">Vermelho</Option>
                <Option value="Azul">Azul</Option>
                <Option value="Verde">Verde</Option>
                <Option value="DedoVivo">Dedo vivo</Option>
                <Option value="BioLFD">BioLFD</Option>
                <Option value="BioLC">BioLC</Option>
                <Option value="NaoSeAplica">Não se aplica</Option>
              </Select>
            </div>

          </div>

          <div className='div-comp-button'>
            <Button
              className='comp-button'
              onClick={this.saveTargetNewEquip}
              type="primary">Salvar
            </Button>
          </div>

        </div>
      </div>
    )
  }
}

export default NewEquip
