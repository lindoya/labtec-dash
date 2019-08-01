import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Input, Button, Select, message, Checkbox } from 'antd';
import { validators, masks } from './validator'
import { getOneByCnpj } from '../../../services/company'
import { getAllMarkByTypeService, getAllModelByMarkService, newEquip } from '../../../services/equip'
import './index.css'

const { Option } = Select;

class NewEquip extends Component {

  state = {
    loading: false,
    leitor: {
      proximidade: false,
      bio: false,
      barras: false,
      cartografico: false,
    },
    message: {
      razaoSocial: '',
      cnpj: '',
      serialNumber: '',
      leitor: '',
      type: '',
      marksList: '',
      modelsList: '',
      mark: '',
      model: '',
    },
    fieldFalha: {
      razaoSocial: false,
      cnpj: false,
      serialNumber: false,
      leitor: false,
      type: false,
      marksList: false,
      modelsList: false,
      mark: false,
      model: false,
    },
    razaoSocial: '',
    cnpj: '',
    serialNumber: '',
    type: 'relogio',
    marksList: [],
    modelsList: [],
    mark: 'Não selecionado',
    model: 'Não selecionado',
    companyId: '',
    equipModelId: '',
    messageError: false,
    messageSuccess: false,
    corLeitor: 'Não se aplica',
    crachas: 'Não se aplica',
    proximidade: [
      'Hid',
      'Mifare',
      'Wiegand',
      'Abatrack',
      'Serial'
    ],
    bio: [
      'Branco',
      'Azul',
      'Verde',
      'Vermelho'
    ],
    cracha: [],
    corLeitores: [],
  }

  saveTargetNewEquip = async () => {

    this.setState({
      loading: true
    })

    const values = {
      serialNumber: this.state.serialNumber,
      readerColor: this.state.leitor,
      companyId: this.state.companyId,
      equipModelId: this.state.equipModelId,
      responsibleUser: this.props.username,
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
        loading: false,
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
        mark: 'Não selecionado',
        model: 'Não selecionado',
        messageSuccess: true,
        companyId: '',
        equipModelId: '',
      }, this.getAllMarkByType)
      await this.success()
      this.setState({
        loading: false,
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
      const resposta = await getAllModelByMarkService({ mark: this.state.mark, type: this.state.type })

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
    const cnpjWithMask = e.target.value
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

  onChangeTypeLeitor = async (e) => {
    await this.setState({
      leitor: {
        ...this.state.leitor,
        [e.target.name]: e.target.checked
      }
    })

    let crachas = []
    let leitores = []

    if (this.state.leitor.proximidade && !this.state.leitor.bio) {
      Array.prototype.push.apply(crachas, this.state.proximidade)
    } else if (!this.state.leitor.proximidade && this.state.leitor.bio) {
      Array.prototype.push.apply(leitores, this.state.bio)
    } else if(this.state.leitor.proximidade && this.state.leitor.bio) {
      Array.prototype.push.apply(crachas, this.state.proximidade)
      Array.prototype.push.apply(leitores, this.state.bio)
    }

    
    await this.setState({
      corLeitores: leitores,
      cracha: crachas
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
      [nome]: valor,
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
      [nome]: valor,
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

  changeCorLeitor = (corLeitor) => {

    this.setState({
      corLeitor,
    });
  }

  changeTypeCracha = (tipoCracha) => {

    this.setState({
      crachas: tipoCracha,
    });
  }

  handleChangeLeitor = (value) => {
    this.setState({
      leitor: value,
    });
  }

  render() {
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
                    'div-comp-selectError' :
                    'div-comp-label'}
                defaultValue="Não selecionado" style={{ width: '100%' }} value={this.state.model} onChange={(model) => this.handleChangeModel(model)}>
                {this.state.modelsList.length === 0 ? null : this.state.modelsList.map(model => <Option key={model.id} value={model.id}>{model.model}</Option>)}
              </Select>
              {this.state.fieldFalha.equipModelId ?
                <p className='div-comp-feedbackError'>
                  {this.state.message.equipModelId}
                </p> : null}
            </div>

          </div>
          <div className='div-newEquip-Linha'>

            <div className='div-newEquip-leitor'>
              <h2 className='div-comp-label'>Tipo do leitor:</h2>
              <div className='div-newEquip-checkbox'>
                <Checkbox onChange={this.onChangeTypeLeitor} value={this.state.leitor.proximidade} checked={this.state.leitor.proximidade} name='proximidade'>Proximidade</Checkbox>
                <Checkbox onChange={this.onChangeTypeLeitor} value={this.state.leitor.bio} checked={this.state.leitor.bio} name='bio'>Bio</Checkbox>
                <Checkbox onChange={this.onChangeTypeLeitor} value={this.state.leitor.barras} checked={this.state.leitor.barras} name='barras'>Barras</Checkbox>
                <Checkbox onChange={this.onChangeTypeLeitor} value={this.state.leitor.cartografico} checked={this.state.leitor.cartografico} name='cartografico'>Cartográfico</Checkbox>
              </div>
            </div>

            <div className='div-newEquip-corLeitor'>
              <h2 className='div-comp-label'>Tipo do crachá (prox):</h2>
              {this.state.cracha.length !== 0 ? <Select value={this.state.crachas} style={{ width: '[100%' }} onChange={(tipoCracha) => this.changeTypeCracha(tipoCracha)}><Option value='naoSeAplica'>Não se aplica</Option>{this.state.cracha.map(teste => <Option value={teste}>{teste}</Option>)}
              </Select> : <Select value='Não se aplica' style={{ width: '100%' }} onChange={(tipoCracha) => this.changeTypeCracha(tipoCracha)}>
              </Select>}
            </div>

            <div className='div-newEquip-corLeitor'>
              <h2 className='div-comp-label'>Cor do leitor (bio):</h2>
              {this.state.corLeitores.length !== 0 ? <Select value={this.state.corLeitor} style={{ width: '[100%' }} onChange={(corLeitor) => this.changeCorLeitor(corLeitor)}><Option value='naoSeAplica'>Não se aplica</Option>{this.state.corLeitores.map(teste => <Option value={teste}>{teste}</Option>)}
              </Select> : <Select value='Não se aplica' style={{ width: '100%' }} onChange={(corLeitor) => this.changeCorLeitor(corLeitor)}>
              </Select>}
            </div>


          </div>

          <div className='div-comp-button'>
            <Button
              className='comp-button'
              loading={this.state.loading}
              onClick={this.saveTargetNewEquip}
              type="primary">Salvar
            </Button>
          </div>

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


export default connect(mapStateToProps)(NewEquip)