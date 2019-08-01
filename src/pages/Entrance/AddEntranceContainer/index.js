import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Input, Modal, Button, Select, Radio, Card, Icon, message, Checkbox } from 'antd';

import * as R from 'ramda'

import { validators, masks } from './validator'
import { getAddressByZipCode } from '../../../services/company'

import { getOneBySerialNumber } from '../../../services/equip'
import { add } from '../../../services/entrance'

import './index.css'
import { getAllAccessories } from '../../../services/acessorio';


const { Option } = Select;
const { TextArea } = Input;

class NewEntrance extends Component {

  state = {
    loading: false,
    messageSuccess: false,
    messageError: false,
    numeroSerie: '',
    tipoCracha: '',
    equipId: '',
    corLeitor: '',
    type: '',
    mark: '',
    model: '',
    cnpj: '',
    razaoSocial: '',
    defeito: '',
    descricao: '',
    nameCliente: '',
    rg: '',
    cpf: '',
    devEmbalado: '',
    nameRemetente: '',
    cep: '',
    state: '',
    city: '',
    neighborhood: '',
    street: '',
    number: '',
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
    garantia: 'semGarantia',
    acessorios: [],
    acessoriosCarrinho: [],
    acessoriosBack: [
      // 'FONTE EXTERNA S/ NOBREAK',
      // 'FONTE EXTERNA C/ NOBREAK',
      // 'CHAVES',
      // 'PINO DE CONFIRMACAO H PLUS/FORTE',
      // 'PINO DA BOBINA',
      // 'BOBINA',
      // 'FITA',
      // 'BATERIA',
      // 'MODRP'
    ],
    problems: {
      violado: false,
      mauUso: false,
      humidade: false,
      sinaisQueda: false,
    },
    message: {
      tipoCracha: '',
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
      rg: '',
      cpf: '',
      devEmbalado: '',
      nameRemetente: '',
      cep: '',
      state: '',
      city: '',
      neighborhood: '',
      street: '',
      number: '',
      nameMotoboy: '',
      nameResponsavel: '',
    },
    fieldFalha: {
      tipoCracha: false,
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
      rg: false,
      cpf: false,
      devEmbalado: false,
      nameRemetente: false,
      cep: false,
      state: false,
      city: false,
      neighborhood: false,
      street: false,
      number: false,
      nameMotoboy: false,
      nameResponsavel: false,
    },
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
      [nome]: valor,
      fieldFalha,
    })
  }

  onChangeProblems = (e) => {
    this.setState({
      problems: {
        ...this.state.problems,
        [e.target.name]: e.target.checked
      }
    })
  }

  success = () => {
    message.success('A entrada foi cadastrada');
  };

  error = () => {
    message.error('A entrada não foi cadastrada');
  };


  getAccessories = async () => {

    await getAllAccessories().then(
      resposta => this.setState({
        acessoriosBack: resposta.data.rows.map((item) => item.accessories),
      })
    )
  }

  onBlurValidator = (e) => {
    const {
      nome,
      valor,
      fieldFalha,
      message,
    } = validators(e.target.name, e.target.value, this.state)

    this.setState({
      [nome]: valor,
      fieldFalha,
      message
    })
  }

  getSerialNumber = async (e) => {
    const serialNumberWithMask = e.target.value
    const serialNumber = serialNumberWithMask.replace(/\D/g, '')
    try {
      const { fieldFalha } = this.state

      fieldFalha.corLeitor = false
      fieldFalha.tipo = false
      fieldFalha.marca = false
      fieldFalha.modelo = false
      fieldFalha.cnpj = false
      fieldFalha.razaoSocial = false

      const equipament = await getOneBySerialNumber(serialNumber)
      this.setState({
        fieldFalha,
        equipId: equipament.data.id,
        corLeitor: equipament.data.readerColor,
        razaoSocial: equipament.data.company.razaoSocial,
        cnpj: equipament.data.company.cnpj,
        model: equipament.data.equipModel.model,
        mark: equipament.data.equipModel.equipMark.mark,
        type: equipament.data.equipModel.equipMark.equipType.type,
      }, console.log(equipament))


    } catch (error) {
      const { fieldFalha, message } = this.state

      fieldFalha.serialNumber = true
      message.serialNumber = 'Número de série inválido.'

      this.setState({
        fieldFalha,
        message,
        corLeitor: '',
        razaoSocial: '',
        cnpj: '',
        model: '',
      })
    }
  }

  success = () => {
    message.success('A entrada foi cadastrada');
  };

  error = () => {
    message.error('A entrada não foi cadastrada');
  };

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

      if (R.has('erro', address.data)) {
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

  changeModal = async () => {
    await this.getAccessories()

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
      radio: true
    })
  }

  changeRadioNao = () => {
    const { fieldFalha, message } = this.state

    fieldFalha.danos = false
    message.danos = ''
    this.setState({
      fieldFalha,
      message,
      radio: 'nao',
      danos: ''
    })

    this.setState({
      radio: false,
      danos: ''
    })
  }

  changeEmbaladoSim = () => {
    this.setState({
      embalado: true,
      devEmbalado: ''
    })
  }

  changeEmbaladoNao = () => {
    const { fieldFalha, message } = this.state

    fieldFalha.devEmbalado = false
    message.devEmbalado = ''
    this.setState({
      embalado: false,
    })
  }

  handleChange = (value) => {
    const { fieldFalha, message } = this.state

    fieldFalha.nameCliente = false
    fieldFalha.rg = false
    fieldFalha.cpf = false
    fieldFalha.devEmbalado = false
    fieldFalha.nameRemetente = false
    fieldFalha.cep = false
    fieldFalha.state = false
    fieldFalha.city = false
    fieldFalha.neighborhood = false
    fieldFalha.street = false
    fieldFalha.nameMotoboy = false
    fieldFalha.nameResponsavel = false
    fieldFalha.number = false

    message.nameCliente = ''
    message.rg = ''
    message.cpf = ''
    message.devEmbalado = ''
    message.nameRemetente = ''
    message.cep = ''
    message.state = ''
    message.city = ''
    message.neighborhood = ''
    message.street = ''
    message.nameMotoboy = ''
    message.nameResponsavel = ''
    message.number = ''

    this.setState({
      fieldFalha,
      message,
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

  saveTargetEntrance = async () => {
    
    this.setState({
      loading: true
    })

    const values = {
      serialNumber: this.state.numeroSerie,
      equipId: this.state.equipId,
      defect: this.state.defeito,
      externalDamage: this.state.radio,
      details: this.state.danos,
      observation: this.state.descricao,
      delivery: this.state.selected,
      clientName: this.state.nameCliente,
      RG: this.state.rg,
      Cpf: this.state.cpf,
      senderName: this.state.nameRemetente,
      properlyPacked: this.state.embalado,
      packingDetails: this.state.devEmbalado,
      zipCode: this.state.cep,
      state: this.state.state,
      city: this.state.city,
      neighborhood: this.state.neighborhood,
      street: this.state.street,
      number: this.state.number,
      motoboyName: this.state.nameMotoboy,
      responsibleName: this.state.nameResponsavel,
      technicianName: this.state.nameExterno,
      accessories: this.state.acessorios,
      garantia: this.state.garantia,
      conditionType: this.state.conditionType,
      brokenSeal: this.state.problems.violado,
      misuse: this.state.problems.mauUso,
      humidity: this.state.problems.humidade,
      fall: this.state.problems.sinaisQueda,
      responsibleUser: this.props.username,
    }

    console.log(values)
    const resposta = await add(values)

    console.log(resposta)

    if (resposta.status === 422) {

      this.setState({
        loading: false,
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
        numeroSerie: '',
        embalado: '',
        acessorios: [],
        defeito: '',
        descricao: '',
        danos: '',
        radio: '',
        selected: 'cliente',
        nameCliente: '',
        corLeitor: '',
        type: '',
        mark: '',
        model: '',
        cnpj: '',
        razaoSocial: '',
        rg: '',
        cpf: '',
        nameRemetente: '',
        devEmbalado: '',
        referencePoint: '',
        cep: '',
        state: '',
        city: '',
        neighborhood: '',
        street: '',
        number: '',
        nameMotoboy: '',
        nameResponsavel: '',
        equipId: '',
        nameExterno: '',
        conditionType: 'avulso',
        garantia: 'semGarantia',
        messageSuccess: true,
        problems: {
          violado: false,
          mauUso: false,
          humidade: false,
          sinaisQueda: false,
        },
      })
      await this.success()
      this.setState({
        loading: false,
        messageSuccess: false
      })
    }
  }

  render() {
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
              onBlur={this.getSerialNumber}
              onFocus={this.onChange}
            />
            {this.state.fieldFalha.numeroSerie ?
              <p className='div-comp-feedbackError'>
                {this.state.message.numeroSerie}
              </p> : null}
          </div>
          <div className='div-entrance-condition'>
            <h2 className='div-comp-label'>Tipo de serviço:</h2>
            <Select value={this.state.conditionType} style={{ width: '100%' }} onChange={this.handleChangeCondition}>
              <Option value="avulso">Avulso</Option>
              <Option value="contrato">Contrato</Option>
              <Option value="emprestimo">Empréstimo</Option>
            </Select>
          </div>
          <div className='div-entrance-garantia'>
            <h2 className='div-comp-label'>Garantia:</h2>
            <Select value={this.state.garantia} style={{ width: '100%' }} onChange={this.handleChangeGalantia}>
              <Option value="externo">Serviço externo</Option>
              <Option value="laboratorio">Laboratório</Option>
              <Option value="venda">Venda</Option>
              <Option value="semGarantia">Sem garantia</Option>
            </Select>
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
              readOnly
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
          </div>
        <div className='div-entrance-linha1'>
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
              readOnly
              name='tipo'
              value={this.state.type}
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
              readOnly
              name='marca'
              value={this.state.mark}
              onChange={this.onChange}
              onBlur={this.onBlurValidator}
              onFocus={this.onChange}
            />
            {this.state.fieldFalha.marca ?
              <p className='div-comp-feedbackError'>
                {this.state.message.marca}
              </p> : null}
          </div>
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
              readOnly
              name='modelo'
              value={this.state.model}
              onChange={this.onChange}
              onBlur={this.onBlurValidator}
              onFocus={this.onChange}
            />
            {this.state.fieldFalha.modelo ?
              <p className='div-comp-feedbackError'>
                {this.state.message.modelo}
              </p> : null}
          </div>
          <div className='div-entrance-cracha'>
            <h2 className={
              this.state.fieldFalha.tipoCracha ?
                'div-comp-labelError' :
                'div-comp-label'
            }>Tipo crachá:</h2>
            <Input
              className={
                this.state.fieldFalha.tipoCracha ?
                  'div-comp-inputError' :
                  ''}
              // placeholder='Digite a cor'
              readOnly
              name='tipoCracha'
              value={this.state.tipoCracha}
              onChange={this.onChange}
              // onBlur={this.onBlurValidator}
              onFocus={this.onChange}
            />
            {this.state.fieldFalha.tipoCracha ?
              <p className='div-comp-feedbackError'>
                {this.state.message.tipoCracha}
              </p> : null}
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
              readOnly
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
              readOnly
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
              <Radio.Group name="radiogroup" value={this.state.radio}>
                <Radio value={true} onChange={this.changeRadioSim}>Sim</Radio>
                <Radio value={false} onChange={this.changeRadioNao}>Não</Radio>
              </Radio.Group>
            </div>
            <div className='div-entrance-inputDanos'>
              {this.state.radio === true ? <Input
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
              {this.state.radio === true ?
                <p className='div-comp-feedbackError'>
                  {this.state.message.danos}
                </p> : null}
            </div>
          </div>
        </div>
        <div className='div-entrance-linha1'>
          <div className='div-entrance-acessorio'>
          <div className='div-checklist-acessorio'>
        <h2 className='div-comp-label'>Checklist:</h2>
          <Card className='card-checkbox-acessorio'>
                <div className='div-linha-analise'>
                  <div className='div-checkbox-analise'>
                    <Checkbox onChange={this.onChangeProblems} checked={this.state.problems.violado} name='violado'>Violado</Checkbox>
                    <Checkbox onChange={this.onChangeProblems} checked={this.state.problems.mauUso} name='mauUso'>Mau uso</Checkbox>
                    <Checkbox onChange={this.onChangeProblems} checked={this.state.problems.humidade} name='humidade'>Humidade</Checkbox>
                    <Checkbox onChange={this.onChangeProblems} checked={this.state.problems.sinaisQueda} name='sinaisQueda'>Sinais de queda</Checkbox>
                  </div>
                </div>
              </Card>
              </div>
          <div className='div-checklist-acessorio'>
            <h2 className='div-comp-label'>Acessórios:</h2>
            <Card size="small" title="Acessórios selecionados" style={{ width: '95%' }}>
              {this.state.acessorios.length === 0 ? <p>Nenhum item selecionado</p> :
                this.state.acessorios.map(item => <p>{item}</p>)}
            </Card>
            </div>
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
              <TextArea
                name='descricao'
                className='div-dashPeca-inputModal'
                placeholder="Digite as observações"
                autosize={{ minRows: 3, maxRows: 6 }}
                value={this.state.descricao}
                onChange={this.onChange}
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
            <Select value={this.state.selected} style={{ width: 180 }} onChange={this.handleChange}>
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
                this.state.fieldFalha.rg ?
                  'div-comp-labelError' :
                  'div-comp-label'
              }>RG:</h2>
              <Input
                className={
                  this.state.fieldFalha.rg ?
                    'div-comp-inputError' :
                    ''}
                placeholder='Digite o RG'
                name='rg'
                value={this.state.rg}
                onChange={this.onChange}
                onBlur={this.onBlurValidator}
                onFocus={this.onChange}
              />
              {this.state.fieldFalha.rg ?
                <p className='div-comp-feedbackError'>
                  {this.state.message.rg}
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
                <Radio value={true} onChange={this.changeEmbaladoSim}>Sim</Radio>
                <Radio value={false} onChange={this.changeEmbaladoNao}>Não</Radio>
              </Radio.Group>
            </div>
            <div className='div-entrance-inputEmbalagem'>
              {this.state.embalado === false ? <Input
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
              {this.state.embalado === 'nao' ?
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
                  <Radio value={true} onChange={this.changeEmbaladoSim}>Sim</Radio>
                  <Radio value={false} onChange={this.changeEmbaladoNao}>Não</Radio>
                </Radio.Group>
              </div>
              <div className='div-entrance-inputEmbalagem'>
                {this.state.embalado === false ? <Input
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
                {this.state.embalado === 'nao' ?
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
                name='rg'
                value={this.state.rg}
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
                  <Radio value={true} nameRadio='sim' onChange={this.changeEmbaladoSim}>Sim</Radio>
                  <Radio value={false} nameRadio='nao' onChange={this.changeEmbaladoNao}>Não</Radio>
                </Radio.Group>
              </div>
              <div className='div-entrance-inputEmbalagem'>
                {this.state.embalado === false ? <Input
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
                {this.state.embalado === 'nao' ?
                  <p className='div-comp-feedbackError'>
                    {this.state.message.devEmbalado}
                  </p> : null}
              </div>
            </div>
          </div>
        </div> : null}

        <div className='div-button-entrance'>
          <Button className='button-entrance' onClick={this.saveTargetEntrance} loading={this.state.loading}>Salvar</Button>
        </div>

      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    username: state.auth.username,
  }
}


export default connect(mapStateToProps)(NewEntrance)