import React, { Component } from 'react'
import './index.css'
import { Input, Button, Card, Select, message, Spin } from 'antd'
import { getAllMarkByTypeService, getAllModelByMarkService } from '../../../services/equip'
import { validators, masks } from './validator'
import { add } from '../../../services/peca'

const { Option } = Select;

class NewPeca extends Component {

  state = {
    loading: false,
    type: 'relogio',
    mark: 'Nao selecionado',
    marksList: [],
    modelsList: [],
    modelListCard: [],
    newPeca: {
      item: '',
      description: '',
      costPrice: '',
      salePrice: '',
      equipModels: [],
    },
    message: {
      item: '',
      description: '',
      costPrice: '',
      salePrice: '',
      modelListCard: '',
    },
    fieldFalha: {
      item: false,
      description: false,
      costPrice: false,
      salePrice: false,
      modelListCard: false,
    },
    messageError: false,
    messageSuccess: false
  }

  saveTargetNewCompany = async () => {
    const values = {
      item: this.state.item,
      description: this.state.description,
      costPrice: this.state.costPrice,
      salePrice: this.state.salePrice,
      type: this.state.type,
      mark: this.state.mark,
      equipModels: this.state.modelListCard,
    }

    const resposta = await add(values)

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
        type: 'relogio',
        mark: 'Nao selecionado',
        marksList: [],
        modelsList: [],
        modelListCard: [],
        modelListRelacionados: {
          id: '',
          model: '',
        },
        item: '',
        description: '',
        costPrice: '',
        salePrice: '',
      })
      await this.success()
      this.setState({
        messageSuccess: false
      })
    }
    // const partMock = {
    //   type: this.state.type,
    //   mark: this.state.mark,
    //   // : this.state,
    //   modelListRelacionados: {
    //     id: '',
    //     model: '',
    //   },
    //   newPeca: {
    //     item: '',
    //     description: '',
    //     costPrice: '',
    //     salePrice: '',
    //     equipModels: [],
    //   },
    // }

    // await add(partMock)
    // this.setState({
    //   newMark: '' ,
    //   ModalVisibleMarca: false,
    // }, this.getAllMarkByType)
  }

  success = () => {
    message.success('Peça cadastrada com sucesso');
  };

  error = () => {
    message.error('Erro ao cadastrar peça');
  };

  clickModel = (selecionados) => {
    const notExist = this.state.modelListCard
      .filter((valor) => valor.id === selecionados.id).length === 0

    const { fieldFalha } = this.state

    fieldFalha.modelListCard = false

    if (notExist) {
      this.setState({
        fieldFalha,
        modelListCard: [
          ...this.state.modelListCard,
          selecionados
        ]
      })
    }
  }

  removeAcessorio = (value) => {
    const oldModelsList = this.state.modelListCard
    const newModelsList = oldModelsList.filter(modelList => modelList !== value)

    this.setState({
      modelListCard: newModelsList
    })
  }

  componentDidMount = () => {
    this.getAllMarkByType()
  }

  // onChangePeca = (e) => {
  //   this.setState({
  //     newPeca: {
  //       ...this.state.newPeca,
  //       [e.target.name]: e.target.value
  //     }
  //   })
  // }


  onChangePeca = (e) => {
    const { nome,
      valor,
    } = masks(e.target.name, e.target.value)

    const { fieldFalha } = this.state

    if (nome === 'item') fieldFalha.item = false
    if (nome === 'description') fieldFalha.description = false
    if (nome === 'costPrice') fieldFalha.costPrice = false
    if (nome === 'salePrice') fieldFalha.salePrice = false


    this.setState({
      [nome]: valor,
      fieldFalha,
    })
  }

  getAllMarkByType = async () => {
    const resposta = await getAllMarkByTypeService({ type: this.state.type })

    this.setState({
      marksList: resposta.data
    })
  }

  getModelsByMark = async () => {

    this.setState({
      loading: true,
    })

    if (this.state.mark !== 'Nao selecionado') {
      const resposta = await getAllModelByMarkService({ mark: this.state.mark, type: this.state.type })

      this.setState({
        modelsList: resposta.data,
        loading: false,
      })
    }
  }

  handleChangeMark = (mark) => {
    this.setState({
      mark,
    }, this.getModelsByMark);
  }

  changeTypeSelected = (valueSelected) => {
    this.setState({
      type: valueSelected,
      modelsList: [],
      mark: 'Nao selecionado',
    }, this.getAllMarkByType)
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

  render() {
    return (
      <div className='div-newPeca-card'>

        <div className='div-comp-Linha div-comp-header'>
          <h1 className='div-comp-title'>Cadastro de peças</h1>
        </div>
        <div className='div-formAdd-peca'>

          <div className='div-linha-peca'>
            <div className='div-peca-peca'>
              <h2 className={this.state.fieldFalha.item ?
                'div-comp-labelError' :
                'div-comp-label'}
              >Peça:</h2>
              <Input
                className={
                  this.state.fieldFalha.item ?
                    'div-comp-inputError' :
                    // 'input-newEquip'
                    ''}
                placeholder='Digite o nome da peça'
                name='item'
                value={this.state.item}
                onChange={this.onChangePeca}
                onBlur={this.onBlurValidator}
              // allowClear
              />
              {this.state.fieldFalha.item ?
                <p className='div-comp-feedbackError'>
                  {this.state.message.item}
                </p> : null}
            </div>

            <div className='div-custo-peca'>
              <h2 className={this.state.fieldFalha.costPrice ?
                'div-comp-labelError' :
                'div-comp-label'}>Custo:</h2>
              <Input
                className={
                  this.state.fieldFalha.costPrice ?
                    'div-comp-inputError' :
                    // 'input-newEquip'
                    ''}
                placeholder='R$'
                name='costPrice'
                value={this.state.costPrice}
                onChange={this.onChangePeca}
                onBlur={this.onBlurValidator}
              // allowClear
              />
              {this.state.fieldFalha.costPrice ?
                <p className='div-comp-feedbackError'>
                  {this.state.message.costPrice}
                </p> : null}
            </div>

            <div className='div-venda-peca'>
              <h2 className={this.state.fieldFalha.salePrice ?
                'div-comp-labelError' :
                'div-comp-label'}>Venda:</h2>
              <Input
                className={
                  this.state.fieldFalha.salePrice ?
                    'div-comp-inputError' :
                    // 'input-newEquip'
                    ''}
                placeholder='R$'
                name='salePrice'
                value={this.state.salePrice}
                onChange={this.onChangePeca}
                onBlur={this.onBlurValidator}
              // allowClear
              />
              {this.state.fieldFalha.salePrice ?
                <p className='div-comp-feedbackError'>
                  {this.state.message.salePrice}
                </p> : null}
            </div>
          </div>

          <div className='div-linha-peca'>

            <div className='div-desc-peca'>
              <h2 className={this.state.fieldFalha.description ?
                'div-comp-labelError' :
                'div-comp-label'}>Descrição:</h2>
              <Input
                className={
                  this.state.fieldFalha.description ?
                    'div-comp-inputError' :
                    // 'input-newEquip'
                    ''}
                placeholder='Digite a descrição da peça'
                name='description'
                value={this.state.description}
                onChange={this.onChangePeca}
                onBlur={this.onBlurValidator}
              // allowClear
              />
              {this.state.fieldFalha.description ?
                <p className='div-comp-feedbackError'>
                  {this.state.message.description}
                </p> : null}
            </div>

          </div>

          <div className='div-linha-peca'>

            <div className='div-typeAndMark-peca'>
              <div className='div-type-peca'>
                <h2 className='div-comp-label'>Tipo:</h2>
                <Select value={this.state.type} style={{ width: '100%' }} onChange={this.changeTypeSelected}>
                  <Option value="relogio" >Relógio</Option>
                  <Option value="catraca">Catraca</Option>
                  <Option value="controleAcesso">Controle de Acesso</Option>
                  <Option value="peca">Peça</Option>
                  <Option value="sirene">Sirene</Option>
                </Select>
              </div>

              <div className='div-marca-peca'>
                <h2 className='div-comp-label'>Marca:</h2>
                <Select style={{ width: '100%' }} value={this.state.mark} onChange={(mark) => this.handleChangeMark(mark)}>
                  {this.state.marksList.map(mark => <Option key={mark.mark} value={mark.mark}>{mark.mark}</Option>)}
                </Select>
              </div>
            </div>

            <div className='div-modelo-peca'>
              <h2 className='div-comp-label'>Modelos:</h2>
              <Card className='card-modelo-peca'>
                <div className='div-dataCard-peca'>
                  {this.state.loading ? <div className='div-spin-accessories'><Spin spinning={this.state.loading} /></div> : null}
                  {this.state.modelsList.length === 0 ? this.state.mark === 'Nao selecionado' ? <p className='p-nao'>Nenhuma marca selecionada</p> : <p className='p'>Nenhum modelo cadastrado</p> :
                    this.state.modelsList.map(model => <div className='p-selecionados' onClick={() => this.clickModel({ id: model.id, model: model.model, mark: this.state.mark, type: this.state.type })}>{model.model}</div>)}</div>
              </Card>
            </div>

          </div>

          <div className='div-linha-peca'>

            <div className='div-relacionados-peca'>
              <h2 className={this.state.fieldFalha.modelListCard ?
                'div-comp-labelError' :
                'div-comp-label'}>Modelos relacionados:</h2>
              <Card className='card-relacionados-peca'>
                <div className='cabecalho-newPeca-card'>
                  <div className='type-newPeca-cabecalho'>Tipo</div>
                  <div className='mark-newPeca-cabecalho'>Marca</div>
                  <div className='model-newPeca-cabecalho'>Modelo</div>
                </div>
                {this.state.modelListCard.length === 0 ? <p
                  className={
                    this.state.fieldFalha.modelListCard ?
                      'p-nao-error' :
                      'p-nao'}
                >Não há nenhum modelo relacionado</p> : this.state.modelListCard.map(modelList =>
                  <div className='div-pai-newPeca' onClick={() => this.removeAcessorio(modelList)}>
                    <div className='div-filha-newPeca-type'>
                      <p className='p'>{`${modelList.type}`}</p>
                    </div>
                    <div className='div-filha-newPeca-mark'>
                      <p className='p'>{`${modelList.mark}`}</p>
                    </div>
                    <div className='div-filha-newPeca-model'>
                      <p className='p'>{`${modelList.model}`}</p>
                    </div>
                  </div>)}
                {this.state.fieldFalha.modelListCard ?
                  <p className='div-comp-feedbackError'>
                    {this.state.message.modelListCard}
                  </p> : null}
              </Card>
            </div>

          </div>

          <div className='div-linhaBottom-peca'>

            <Button
              className='comp-button'
              onClick={this.saveTargetNewCompany}
              type="primary">Salvar
            </Button>

          </div>
        </div>
      </div>
    )
  }
}

export default NewPeca