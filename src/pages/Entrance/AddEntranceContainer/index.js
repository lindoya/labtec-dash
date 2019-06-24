import React, { Component } from 'react'
import { Input, Modal, Button, Select, Radio, Card, Icon, message } from 'antd';

import * as R from 'ramda'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { changeValueCompany, onSubmit } from '../EntranceRedux/action'
import { validators, masks }from './validator'
import { getAddressByZipCode } from '../../../services/company'


import './index.css'


const { Option } = Select;

class NewEntrance extends Component {

  state = {
    numeroSerie: '',
    corLeitor: '',
    tipo: '',
    marca: '',
    modelo: '',
    cnpj: '',
    razaoSocial: '',
    defeito: '',
    descricao: '',
    nameCliente: '',
    RG: '',
    cpf: '',
    devEmbalado: '',
    nameRemetente: '',
    cep: '',
    state: '',
    city: '',
    neighborhood: '',
    street: '',
    number:'',
    complement: '',
    referencePoint: '',
    nameMotoboy: '',
    nameResponsavel: '',

    radio: '',
    selected: 'cliente',
    embalado: '',
    visible: false,
    quantAcessorios: '',
    input: '',
    conditionType: 'avulso',
    garantia: 'none',
    acessorios: [],
    acessoriosCarrinho: [],
    acessoriosBack: [
      'FONTE EXTERNA S/ NOBREAK',
      'FONTE EXTERNA C/ NOBREAK',
      'CHAVES',
      'PINO DE CONFIRMACAO H PLUS/FORTE',
      'PINO DA BOBINA',
      'BOBINA',
      'FITA',
      'BATERIA',
      'MODRP'
    ],
    message: {
      numeroSerie: '',
      corLeitor: '',
      tipo: '',
      marca: '',
      modelo: '',
      cnpj: '',
      razaoSocial: '',
      defeito: '',
      descricao: '',
      danos: '',
      nameCliente: '',
      RG: '',
      cpf: '',
      devEmbalado: '',
      nameRemetente: '',
      cep: '',
      state: '',
      city: '',
      neighborhood: '',
      street: '',
      number:'',
      nameMotoboy: '',
       nameResponsavel: '',
    },
    fieldFalha: {
      numeroSerie: false,
      corLeitor: false,
      tipo: false,
      marca: false,
      modelo: false,
      cnpj: false,
      razaoSocial: false,
      defeito: false,
      descricao: false,
      danos: false,
      nameCliente: false,
      RG: false,
      cpf: false,
      devEmbalado: false,
      nameRemetente: false,
      cep: false,
      state: false,
      city: false,
      neighborhood: false,
      street: false,
      number:false,
      nameMotoboy: false,
      nameResponsavel: false,
    },
    messageError: false,
    messageSuccess: false
  }

  onChange = (e) => {
    const { nome,
      valor,
    } = masks(e.target.name, e.target.value)

    const { fieldFalha } = this.state

    if (nome === 'numeroSerie') fieldFalha.numeroSerie = false
    if (nome === 'corLeitor') fieldFalha.corLeitor = false
    if (nome === 'tipo') fieldFalha.tipo = false
    if (nome === 'marca') fieldFalha.marca = false
    if (nome === 'modelo') fieldFalha.modelo = false
    if (nome === 'cnpj') fieldFalha.cnpj = false
    if (nome === 'razaoSocial') fieldFalha.razaoSocial = false
    if (nome === 'defeito') fieldFalha.defeito = false
    if (nome === 'descricao') fieldFalha.descricao = false


    this.setState({
      [ nome ]: valor,
      fieldFalha,
    })
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

  getAddress = async (e) => { 
    const cep = e.target.value
    try {
      const { fieldFalha } = this.state
      
      fieldFalha.cep = false
      fieldFalha.state = false
      fieldFalha.city = false
      fieldFalha.neighborhood = false
      fieldFalha.street = false
      const address = await getAddressByZipCode(cep)

      if (R.has('erro', address.data)){
        fieldFalha.cep = true
        message.cep = 'Cep inválido.'
      }

      this.setState({ 
        street: address.data.logradouro,
        city: address.data.localidade,
        neighborhood: address.data.bairro,
        state: address.data.uf,
        fieldFalha,
      })

    } catch (error) {
      const { fieldFalha, message } = this.state
      
      fieldFalha.cep = true
      message.cep = 'Cep inválido.'
        
      this.setState({
        fieldFalha,
        message
      })
    }
  }

  selected = (acessorio) => {
    this.inputQuant.focus()

    this.setState({
      input: acessorio,
      quantAcessorios: 1
    })
  }

  changeValue = (e) => {
    this.setState({
      input: e.target.value
    })
  }

  changeQuant = (e) => {
    this.setState({
      quantAcessorios: e.target.value
    })
  }

  removeAcessorio = (value) => {
    const oldAcessorios = this.state.acessoriosCarrinho
    const newAcessorios = oldAcessorios.filter(item => item !== value)

    this.setState({
      acessoriosCarrinho: newAcessorios
    })
  }

  addArray = () => {
    if (this.state.input !== '') {
      const acessorio = `${this.state.quantAcessorios} - ${this.state.input}`

      return (
        this.setState({
          acessoriosCarrinho: [
            ...this.state.acessoriosCarrinho,
            acessorio
          ],
          input: '',
          quantAcessorios: '',
        })
      )
    }
  }

  changeModal = () => {
    this.setState({
      visible: true,
      acessoriosCarrinho: this.state.acessorios
    })
  }

  handleOk = () => {
    this.setState({
      visible: false,
      acessorios: this.state.acessoriosCarrinho,
      acessoriosCarrinho: []
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false,
      acessoriosCarrinho: []
    });
  };

  changeRadioSim = () => {
    this.setState({
      radio: 'sim'
    })
  }

  changeRadioNao = () => {
    this.setState({
      radio: 'nao',
    })
  }

  changeEmbaladoSim = () => {
    this.setState({
      embalado: 'sim'
    })
  }

  changeEmbaladoNao = () => {
    this.setState({
      embalado: 'nao'
    })
  }

  handleChange = (value) => {
    this.setState({
      selected: value
    })
  }

  handleChangeCondition = (value) => {
    this.setState({
      conditionType: `${value}`,
    });
  }

  handleChangeGalantia = (value) => {
    this.setState({
      garantia: `${value}`,
    });
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
    console.log(this.state)
    return (
      <div className='div-entrance-card'>
        <div className='div-comp-Linha div-comp-header'>
          <h1 className='div-comp-title'>Nova entrada</h1>
        </div>

        <div className='div-entrance-linha1'>
          <div className='div-entrance-ns'>
          <h2 className={
                this.state.fieldFalha.numeroSerie ?
                  'div-comp-labelError' :
                  'div-comp-label'
              }>Número de série:</h2>
            <Input
                className={
                  this.state.fieldFalha.numeroSerie ?
                    'div-comp-inputError' :
                    ''}
                placeholder='Digite o número'
                name='numeroSerie'
                value={this.state.numeroSerie}
                onChange={this.onChange}
                onBlur={this.onBlurValidator}
                onFocus={this.onChange}
              />
              {this.state.fieldFalha.numeroSerie ?
                <p className='div-comp-feedbackError'>
                  {this.state.message.numeroSerie}
                </p> : null}
          </div>
          <div className='div-entrance-cor'>
          <h2 className={
                this.state.fieldFalha.corLeitor ?
                  'div-comp-labelError' :
                  'div-comp-label'
              }>Cor do leitor:</h2>
            <Input
                className={
                  this.state.fieldFalha.corLeitor ?
                    'div-comp-inputError' :
                    ''}
                // placeholder='Digite a cor'
                name='corLeitor'
                value={this.state.corLeitor}
                onChange={this.onChange}
                onBlur={this.onBlurValidator}
                onFocus={this.onChange}
              />
              {this.state.fieldFalha.corLeitor ?
                <p className='div-comp-feedbackError'>
                  {this.state.message.corLeitor}
                </p> : null}
          </div>
          <div className='div-entrance-tipo'>
          <h2 className={
                this.state.fieldFalha.tipo ?
                  'div-comp-labelError' :
                  'div-comp-label'
              }>Tipo:</h2>
            <Input
                className={
                  this.state.fieldFalha.tipo ?
                    'div-comp-inputError' :
                    ''}
                // placeholder='Digite o '
                name='tipo'
                value={this.state.tipo}
                onChange={this.onChange}
                onBlur={this.onBlurValidator}
                onFocus={this.onChange}
              />
              {this.state.fieldFalha.tipo ?
                <p className='div-comp-feedbackError'>
                  {this.state.message.tipo}
                </p> : null}
          </div>
          <div className='div-entrance-marca'>
          <h2 className={
                this.state.fieldFalha.marca ?
                  'div-comp-labelError' :
                  'div-comp-label'
              }>Marca:</h2>
            <Input
                className={
                  this.state.fieldFalha.marca ?
                    'div-comp-inputError' :
                    ''}
                // placeholder='Digite a razão social'
                name='marca'
                value={this.state.marca}
                onChange={this.onChange}
                onBlur={this.onBlurValidator}
                onFocus={this.onChange}
              />
              {this.state.fieldFalha.marca ?
                <p className='div-comp-feedbackError'>
                  {this.state.message.marca}
                </p> : null}
          </div>
        </div>
        <div className='div-entrance-linha1'>
          <div className='div-entrance-modelo'>
          <h2 className={
                this.state.fieldFalha.modelo ?
                  'div-comp-labelError' :
                  'div-comp-label'
              }>Modelo:</h2>
            <Input
                className={
                  this.state.fieldFalha.modelo ?
                    'div-comp-inputError' :
                    ''}
                // placeholder='Digite a razão social'
                name='modelo'
                value={this.state.modelo}
                onChange={this.onChange}
                onBlur={this.onBlurValidator}
                onFocus={this.onChange}
              />
              {this.state.fieldFalha.modelo ?
                <p className='div-comp-feedbackError'>
                  {this.state.message.modelo}
                </p> : null}
          </div>
          <div className='div-entrance-condition'>
          <h2 className='div-comp-label'>Tipo de serviço:</h2>
          <Select defaultValue='avulso' style={{ width: '100%' }} onChange={this.handleChangeType}>
            <Option value="avulso">Avulso</Option>
            <Option value="contrato">Contrato</Option>
            <Option value="emprestimo">Empréstimo</Option>
          </Select>
          </div>
          <div className='div-entrance-garantia'>
          <h2 className='div-comp-label'>Garantia:</h2>
          <Select defaultValue='none' style={{ width: '100%' }} onChange={this.handleChangeType}>
            <Option value="externo">Serviço externo</Option>
            <Option value="laboratorio">Venda</Option>
            <Option value="venda">Laboratório</Option>
            <Option value="none">Sem garantia</Option>
          </Select>
          </div>
        </div>
        <div className='div-entrance-linha1'>
          <div className='div-entrance-cnpj'>
          <h2 className={
                this.state.fieldFalha.cnpj ?
                  'div-comp-labelError' :
                  'div-comp-label'
              }>Cnpj</h2>
            <Input
                className={
                  this.state.fieldFalha.cnpj ?
                    'div-comp-inputError' :
                    ''}
                placeholder='Digite o Cnpj'
                name='cnpj'
                value={this.state.cnpj}
                onChange={this.onChange}
                onBlur={this.onBlurValidator}
                onFocus={this.onChange}
              />
              {this.state.fieldFalha.cnpj ?
                <p className='div-comp-feedbackError'>
                  {this.state.message.cnpj}
                </p> : null}
          </div>
          <div className='div-entrance-rs'>
            <h2 className={
                this.state.fieldFalha.razaoSocial ?
                  'div-comp-labelError' :
                  'div-comp-label'
              }>Empresa</h2>
            <Input
                className={
                  this.state.fieldFalha.razaoSocial ?
                    'div-comp-inputError' :
                    ''}
                // placeholder='Digite a razão social'
                name='razaoSocial'
                value={this.state.razaoSocial}
                onChange={this.onChange}
                onBlur={this.onBlurValidator}
                onFocus={this.onChange}
              />
              {this.state.fieldFalha.razaoSocial ?
                <p className='div-comp-feedbackError'>
                  {this.state.message.razaoSocial}
                </p> : null}
          </div>
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
              {this.state.radio === 'sim' ? <Input 
              className={
                this.state.fieldFalha.danos ?
                  'div-comp-inputError' :
                  ''}
              placeholder='Digite os danos no equipamento'
              name='danos'
              value={this.state.danos}
              onChange={this.onChange}
              onBlur={this.onBlurValidator}
              onFocus={this.onChange}
              />
              : null}
            {this.state.radio === 'sim'?
              <p className='div-comp-feedbackError'>
                {this.state.message.danos}
              </p> : null}
            </div>
          </div>
        </div>
        <div className='div-entrance-linha1'>
          <div className='div-entrance-acessorio'>
            <h2 className='div-comp-label'>Acessórios:</h2>
            <Card size="small" title="Acessórios selecionados" style={{ width: '100%' }}>
              {this.state.acessorios.length === 0 ? <p>Nenhum item selecionado</p> :
                this.state.acessorios.map(item => <p>{item}</p>)}
            </Card>
          </div>
        </div>
        <div className='div-button-entrance'>
          <Button type="primary" className='button-entrance' onClick={this.changeModal}>
            Gerenciar
        </Button>
          <Modal
            className='modal'
            title="Lista de acessórios"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            okText='Salvar'
            cancelText='Cancelar'
          >
            <div className='card-modal'>
              <Card size="small" title="Carrinho 🛒" style={{ width: '45%' }}>
                {this.state.acessoriosCarrinho.map((item) =>
                  <div className='p-carrinho-entrance-carrinho' onClick={() => {
                    this.removeAcessorio(item)
                  }}>
                    {item}
                    <Icon style={{ color: 'gray' }} type="close-circle" theme="filled" />
                  </div>
                )}
              </Card>
              <Card size="small" title="Itens" style={{ width: '45%' }}>
                {this.state.acessoriosBack.map(item => <div className='p-carrinho-entrance-item' onClick={() => {
                  this.selected(item)
                }}>{item}</div>)}
              </Card>
            </div>
            <div className='input-modal'>
              <h2 className='div-comp-label'>ADICIONAR AO CARRINHO:</h2>
              <div className='div-modal-input'>
                <div className='div-modal-input-quant'>
                  <h2 className='div-comp-label'>Qntd:</h2>
                  <Input
                    size="default"
                    className='div-quant-entrance-modal'
                    onChange={this.changeQuant}
                    value={this.state.quantAcessorios}
                    ref={(input) => { this.inputQuant = input; }}
                  />
                </div>
                <div className='div-modal-input-normal'>
                  <h2 className='div-comp-label'>Item selecionado:</h2>
                  <Input
                    value={this.state.input}
                    onChange={this.changeValue}
                    className='input-addCarrinho-modal'
                    name='adicionar'
                    placeholder='Digite o item a ser adicionado no carrinho'
                    allowClear
                  // value={this.props.value.cnpj}
                  // onChange={this.props.changeValueCompany}
                  />
                </div>
              </div>
              <div className='div-button-modal'>
                <Button
                  className='button-entrance'
                  onClick={this.addArray}>
                  Adicionar
                </Button>
              </div>
            </div>
          </Modal>
        </div>
        <div className='div-entrance-linha1'>
          <div className='div-entrance-defeito'>
          <h2 className={
                this.state.fieldFalha.defeito ?
                  'div-comp-labelError' :
                  'div-comp-label'
              }>Defeito apresentado:</h2>
            <Input
                className={
                  this.state.fieldFalha.defeito ?
                    'div-comp-inputError' :
                    ''}
                placeholder='Digite o defeito apresentado'
                name='defeito'
                value={this.state.defeito}
                onChange={this.onChange}
                onBlur={this.onBlurValidator}
                onFocus={this.onChange}
              />
              {this.state.fieldFalha.defeito ?
                <p className='div-comp-feedbackError'>
                  {this.state.message.defeito}
                </p> : null}
          </div>
        </div>

        <div className='div-entrance-linha1'>
          <div className='div-entrance-desc'>
          <h2 className={
                this.state.fieldFalha.descricao ?
                  'div-comp-labelError' :
                  'div-comp-label'
              }>Observação (opcional):</h2>
            <Input
                className={
                  this.state.fieldFalha.descricao ?
                    'div-comp-inputError' :
                    ''}
                placeholder='Observações'
                name='descricao'
                value={this.state.descricao}
                onChange={this.onChange}
                onBlur={this.onBlurValidator}
                onFocus={this.onChange}
              />
              {this.state.fieldFalha.descricao ?
                <p className='div-comp-feedbackError'>
                  {this.state.message.descricao}
                </p> : null}
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
          {this.state.selected === 'cliente' ? <div className='div-entrance-selectInputs'>
            <div className='div-entrance-cliente'>
            <h2 className={
                this.state.fieldFalha.nameCliente ?
                  'div-comp-labelError' :
                  'div-comp-label'
              }>Nome do cliente:</h2>
            <Input
                className={
                  this.state.fieldFalha.nameCliente ?
                    'div-comp-inputError' :
                    ''}
                placeholder='Digite o nome do cliente'
                name='nameCliente'
                value={this.state.nameCliente}
                onChange={this.onChange}
                onBlur={this.onBlurValidator}
                onFocus={this.onChange}
              />
              {this.state.fieldFalha.nameCliente ?
                <p className='div-comp-feedbackError'>
                  {this.state.message.nameCliente}
                </p> : null}
            </div>
            <div className='div-entrance-rg'>
            <h2 className={
                this.state.fieldFalha.RG ?
                  'div-comp-labelError' :
                  'div-comp-label'
              }>RG:</h2>
            <Input
                className={
                  this.state.fieldFalha.RG ?
                    'div-comp-inputError' :
                    ''}
                placeholder='Digite o RG'
                name='RG'
                value={this.state.RG}
                onChange={this.onChange}
                onBlur={this.onBlurValidator}
                onFocus={this.onChange}
              />
              {this.state.fieldFalha.RG ?
                <p className='div-comp-feedbackError'>
                  {this.state.message.RG}
                </p> : null}
            </div>
            <div className='div-entrance-cpf'>
            <h2 className={
                this.state.fieldFalha.cpf ?
                  'div-comp-labelError' :
                  'div-comp-label'
              }>Cpf:</h2>
            <Input
                className={
                  this.state.fieldFalha.cpf ?
                    'div-comp-inputError' :
                    ''}
                placeholder='Digite o cpf'
                name='cpf'
                value={this.state.cpf}
                onChange={this.onChange}
                onBlur={this.onBlurValidator}
                onFocus={this.onChange}
              />
              {this.state.fieldFalha.cpf ?
                <p className='div-comp-feedbackError'>
                  {this.state.message.cpf}
                </p> : null}
            </div> 
            </div> : null}
        </div>
        {this.state.selected === 'externo' ? <div className='div-entrance-selectInputs'>
          <div className='div-entrance-externo'>
          <h2 className={
                this.state.fieldFalha.nameExterno ?
                  'div-comp-labelError' :
                  'div-comp-label'
              }>Nome do técnico externo:</h2>
            <Input
                className={
                  this.state.fieldFalha.nameExterno ?
                    'div-comp-inputError' :
                    ''}
                placeholder='Digite o nome do técnico'
                name='nameExterno'
                value={this.state.nameExterno}
                onChange={this.onChange}
                onBlur={this.onBlurValidator}
                onFocus={this.onChange}
              />
              {this.state.fieldFalha.nameExterno ?
                <p className='div-comp-feedbackError'>
                  {this.state.message.nameExterno}
                </p> : null}
          </div>
          <div className='div-embaladoExterno'>
            <div className='div-entrance-embaladoExterno'>
              <h2 className='div-comp-label'>Devidamente embalado:</h2>
              <Radio.Group name="radiogroup">
                <Radio value={'sim'} nameRadio='sim' onChange={this.changeEmbaladoSim}>Sim</Radio>
                <Radio value={'nao'} nameRadio='nao' onChange={this.changeEmbaladoNao}>Não</Radio>
              </Radio.Group>
            </div>
            <div className='div-entrance-inputEmbalagem'>
              {this.state.embalado === 'nao' ?<Input
                className={
                  this.state.fieldFalha.devEmbalado ?
                    'div-comp-inputError' :
                    ''}
                placeholder='Digite o motivo'     
                name='devEmbalado'
                value={this.state.devEmbalado}
                onChange={this.onChange}
                onBlur={this.onBlurValidator}
                onFocus={this.onChange}
                />
                : null}
              {this.state.embalado === 'nao'?
              <p className='div-comp-feedbackError'>
                {this.state.message.devEmbalado}
              </p> : null}
              </div>
          </div>
        </div> : null}
        {this.state.selected === 'sedex' ? <div className='div-entrance-linha1'>
          <div className='div-entrance-linha1Motoboy'>
            <div className='div-entrance-nomeRemetente'>
            <h2 className={
                this.state.fieldFalha.nameRemetente ?
                  'div-comp-labelError' :
                  'div-comp-label'
              }>Nome do remetente:</h2>
            <Input
                className={
                  this.state.fieldFalha.nameRemetente ?
                    'div-comp-inputError' :
                    ''}
                placeholder='Digite o nome do remetente'
                name='nameRemetente'
                value={this.state.nameRemetente}
                onChange={this.onChange}
                onBlur={this.onBlurValidator}
                onFocus={this.onChange}
              />
              {this.state.fieldFalha.nameRemetente ?
                <p className='div-comp-feedbackError'>
                  {this.state.message.nameRemetente}
                </p> : null}
            </div>
            <div className='div-embaladoSedex'>
              <div className='div-entrance-embaladoMotoboy'>
                <h2 className='div-comp-label'>Devidamente embalado:</h2>
                <Radio.Group name="radiogroup">
                  <Radio value={'sim'} nameRadio='sim' onChange={this.changeEmbaladoSim}>Sim</Radio>
                  <Radio value={'nao'} nameRadio='nao' onChange={this.changeEmbaladoNao}>Não</Radio>
                </Radio.Group>
              </div>
              <div className='div-entrance-inputEmbalagem'>
                {this.state.embalado === 'nao' ?<Input
                className={
                  this.state.fieldFalha.devEmbalado ?
                    'div-comp-inputError' :
                    ''}
                placeholder='Digite o motivo'     
                name='devEmbalado'
                value={this.state.devEmbalado}
                onChange={this.onChange}
                onBlur={this.onBlurValidator}
                onFocus={this.onChange}
                />
                : null}
                {this.state.embalado === 'nao'?
                <p className='div-comp-feedbackError'>
                {this.state.message.devEmbalado}
                </p> : null}
              </div>
            </div>
          </div>
          <div className='div-entrance-linha2Sedex'>
            <div className='div-entrance-cep'>
            <h2 className={
                this.state.fieldFalha.cep ?
                  'div-comp-labelError' :
                  'div-comp-label'
              }>Cep:</h2>
            <Input
                className={
                  this.state.fieldFalha.cep ?
                    'div-comp-inputError' :
                    ''}
                placeholder='Digite o cep'
                name='cep'
                value={this.state.cep}
                onChange={this.onChange}
                onBlur={this.getAddress}
                onFocus={this.onChange}
              />
              {this.state.fieldFalha.cep ?
                <p className='div-comp-feedbackError'>
                  {this.state.message.cep}
                </p> : null}
            </div>
            <div className='div-entrance-uf'>
            <h2 className={
                this.state.fieldFalha.state ?
                  'div-comp-labelError' :
                  'div-comp-label'
              }>Estado:</h2>
            <Input
                className={
                  this.state.fieldFalha.state ?
                    'div-comp-inputError' :
                    ''}
                placeholder='UF'
                name='state'
                value={this.state.state}
                onChange={this.onChange}
                onBlur={this.onBlurValidator}
                onFocus={this.onChange}
              />
              {this.state.fieldFalha.state ?
                <p className='div-comp-feedbackError'>
                  {this.state.message.state}
                </p> : null}
            </div>
            <div className='div-entrance-city'>
            <h2 className={
                this.state.fieldFalha.city ?
                  'div-comp-labelError' :
                  'div-comp-label'
              }>Cidade:</h2>
            <Input
                className={
                  this.state.fieldFalha.city ?
                    'div-comp-inputError' :
                    ''}
                placeholder='Digite a cidade'
                name='city'
                value={this.state.city}
                onChange={this.onChange}
                onBlur={this.onBlurValidator}
                onFocus={this.onChange}
              />
              {this.state.fieldFalha.city ?
                <p className='div-comp-feedbackError'>
                  {this.state.message.city}
                </p> : null}
            </div>
            <div className='div-entrance-bairro'>
            <h2 className={
                this.state.fieldFalha.neighborhood ?
                  'div-comp-labelError' :
                  'div-comp-label'
              }>Bairro:</h2>
            <Input
                className={
                  this.state.fieldFalha.neighborhood ?
                    'div-comp-inputError' :
                    ''}
                placeholder='Digite o bairro'
                name='neighborhood'
                value={this.state.neighborhood}
                onChange={this.onChange}
                onBlur={this.onBlurValidator}
                onFocus={this.onChange}
              />
              {this.state.fieldFalha.neighborhood ?
                <p className='div-comp-feedbackError'>
                  {this.state.message.neighborhood}
                </p> : null}
            </div>
          </div>
          <div className='div-entrance-linha2Sedex'>
            <div className='div-entrance-rua'>
            <h2 className={
                this.state.fieldFalha.street ?
                  'div-comp-labelError' :
                  'div-comp-label'
              }>Rua:</h2>
            <Input
                className={
                  this.state.fieldFalha.street ?
                    'div-comp-inputError' :
                    ''}
                placeholder='Digite a rua'
                name='street'
                value={this.state.street}
                onChange={this.onChange}
                onBlur={this.onBlurValidator}
                onFocus={this.onChange}
              />
              {this.state.fieldFalha.street ?
                <p className='div-comp-feedbackError'>
                  {this.state.message.street}
                </p> : null}
            </div>
            <div className='div-entrance-numero'>
            <h2 className={
                this.state.fieldFalha.number ?
                  'div-comp-labelError' :
                  'div-comp-label'
              }>Número:</h2>
            <Input
                className={
                  this.state.fieldFalha.number ?
                    'div-comp-inputError' :
                    ''}
                placeholder='1235'
                name='number'
                value={this.state.number}
                onChange={this.onChange}
                onBlur={this.onBlurValidator}
                onFocus={this.onChange}
              />
              {this.state.fieldFalha.number ?
                <p className='div-comp-feedbackError'>
                  {this.state.message.number}
                </p> : null}
            </div>
          </div>
          <div className='div-entrance-linha3Sedex'>
            <div className='div-entrance-comp'>
            <h2 className='div-comp-label'>Complemento:</h2>
            <Input
                className=''
                placeholder='Ex: Torre 3, Bloco 7'
                name='complement'
                value={this.state.complement}
                onChange={this.onChange}
                onFocus={this.onChange}
              />
              {this.state.fieldFalha.complement ?
                <p className='div-comp-feedbackError'>
                  {this.state.message.complement}
                </p> : null}
            </div>
            <div className='div-entrance-ref'>
            <h2 className='div-comp-label'>Ponto de referência:</h2>
            <Input
                className=''
                placeholder='Digite o ponto de referência'
                name='referencePoint'
                value={this.state.referencePoint}
                onChange={this.onChange}
                onFocus={this.onChange}
              />
            </div>
          </div>
        </div> : null}
        {this.state.selected === 'motoboy' ? <div className='div-entrance-selectInputs2lines'>
          <div className='div-entrance-linha1Motoboy'>
            <div className='div-entrance-nomeMotoboy'>
            <h2 className={
                this.state.fieldFalha.nameMotoboy ?
                  'div-comp-labelError' :
                  'div-comp-label'
              }>Nome do motoboy:</h2>
            <Input
                className={
                  this.state.fieldFalha.nameMotoboy ?
                    'div-comp-inputError' :
                    ''}
                placeholder='Digite o nome do motoboy'
                name='nameMotoboy'
                value={this.state.nameMotoboy}
                onChange={this.onChange}
                onBlur={this.onBlurValidator}
                onFocus={this.onChange}
              />
              {this.state.fieldFalha.nameMotoboy ?
                <p className='div-comp-feedbackError'>
                  {this.state.message.nameMotoboy}
                </p> : null}
            </div>
            <div className='div-entrance-rg'>
              <h2 className={
                this.state.fieldFalha.RG ?
                  'div-comp-labelError' :
                  'div-comp-label'
              }>RG:</h2>
            <Input
                className={
                  this.state.fieldFalha.RG ?
                    'div-comp-inputError' :
                    ''}
                placeholder='Digite o RG'
                name='RG'
                value={this.state.RG}
                onChange={this.onChange}
                onBlur={this.onBlurValidator}
                onFocus={this.onChange}
              />
              {this.state.fieldFalha.RG ?
                <p className='div-comp-feedbackError'>
                  {this.state.message.RG}
                </p> : null}
            </div>
            <div className='div-entrance-cpf'>
            <h2 className={
                this.state.fieldFalha.cpf ?
                  'div-comp-labelError' :
                  'div-comp-label'
              }>Cpf:</h2>
            <Input
                className={
                  this.state.fieldFalha.cpf ?
                    'div-comp-inputError' :
                    ''}
                placeholder='Digite o cpf'
                name='cpf'
                value={this.state.cpf}
                onChange={this.onChange}
                onBlur={this.onBlurValidator}
                onFocus={this.onChange}
              />
              {this.state.fieldFalha.cpf ?
                <p className='div-comp-feedbackError'>
                  {this.state.message.cpf}
                </p> : null}
            </div>
          </div>
          <div className='div-entrance-linha2Motoboy'>
            <div className='div-entrance-nomeReponsa'>
            <h2 className={
                this.state.fieldFalha.nameResponsavel ?
                  'div-comp-labelError' :
                  'div-comp-label'
              }>Nome do responsável:</h2>
            <Input
                className={
                  this.state.fieldFalha.nameResponsavel ?
                    'div-comp-inputError' :
                    ''}
                placeholder='Digite o nome do responsável'
                name='nameResponsavel'
                value={this.state.nameResponsavel}
                onChange={this.onChange}
                onBlur={this.onBlurValidator}
                onFocus={this.onChange}
              />
              {this.state.fieldFalha.nameResponsavel ?
                <p className='div-comp-feedbackError'>
                  {this.state.message.nameResponsavel}
                </p> : null}
            </div>
            <div className='div-embalado'>
              <div className='div-entrance-embaladoMotoboy'>
              <h2 className='div-comp-label'>Devidamente embalado:</h2>
                <Radio.Group name="radiogroup">
                  <Radio value={'sim'} nameRadio='sim' onChange={this.changeEmbaladoSim}>Sim</Radio>
                  <Radio value={'nao'} nameRadio='nao' onChange={this.changeEmbaladoNao}>Não</Radio>
                </Radio.Group>
              </div>
              <div className='div-entrance-inputEmbalagem'>
                {this.state.embalado === 'nao' ?<Input
                className={
                  this.state.fieldFalha.devEmbalado ?
                    'div-comp-inputError' :
                    ''}
                placeholder='Digite o motivo'     
                name='devEmbalado'
                value={this.state.devEmbalado}
                onChange={this.onChange}
                onBlur={this.onBlurValidator}
                onFocus={this.onChange}
                />
                : null}
                {this.state.embalado === 'nao'?
                <p className='div-comp-feedbackError'>
                {this.state.message.devEmbalado}
                </p> : null}
              </div>
            </div>
          </div>
        </div> : null}

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
