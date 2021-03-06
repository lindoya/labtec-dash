import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Input, Modal, Button, Card, Icon, Spin, message } from 'antd';
import { Select } from 'antd';
import { getAllMarkByTypeService, getAllModelByMarkService, addMark, addModel } from '../../../services/equip'


import * as R from 'ramda'

import './index.css'

const Option = Select.Option;

class NewTypeEquip extends Component {

  state = {
    messageError: false,
    messageSuccess: false,
    loadingButton: false,
    loading: {
      modelo: false,
      marca: false,
    },
    ModalVisibleMarca: false,
    ModalVisibleModelo: false,
    type: 'relogio',
    typeFormat: 'Relógio',
    marksList: [],
    modelsList: [],
    mark: {
      id: '',
      mark: '',
    },
    newMark: '',
    newModel: '',
    description: '',
    disable: true
  }

  success = () => {
    message.success('Sucesso ao cadastrar');
  };

  error = () => {
    message.error('Ocorreu um erro ao fazer o cadastro');
  };

  getModelsByMark = async () => {

    this.setState({
      loading: {
        modelo: true,
      },
    })

    const resposta = await getAllModelByMarkService({ mark: this.state.mark.mark, type: this.state.type })

    this.setState({
      modelsList: resposta.data,
      loading: {
        modelo: false,
      },
    })
  }

  selectMark = async (value) => {

    this.setState({
      disable: false,
      mark: {
        id: value.id,
        mark: value.mark,
      }
    }, this.getModelsByMark)
  }

  onChangeMarca = (e) => {
    this.setState({
      newMark: e.target.value
    })
  }

  onChangeModelo = (e) => {
    this.setState({
      newModel: e.target.value,
    })
  }

  onChangeDescricao = (e) => {
    this.setState({
      description: e.target.value,
    })
  }

  onChangeDisable = () => {
    this.setState({
      disable: false
    })
  }

  saveTargetMark = async () => {

    this.setState({
      loadingButton: true
    })

    const marca = {
      type: this.state.type,
      mark: this.state.newMark,
      responsibleUser: this.props.username,
    }

    const resposta = await addMark(marca)

    if (resposta.status === 422) {

      this.setState({
        messageError: true,
      })
      await this.error()
      this.setState({
        loadingButton: false,
        messageError: false
      })
    } if (resposta.status === 200) {

      this.setState({
        newMark: '',
        ModalVisibleMarca: false,
      }, this.getAllMarkByType)
      await this.success()
      this.setState({
        loadingButton: false,
        messageSuccess: false
      })
    }
  }

  saveTargetModel = async () => {

    this.setState({
      loadingButton: true
    })

    const modelo = {
      equipMarkId: this.state.mark.id,
      model: this.state.newModel,
      description: this.state.description,
      responsibleUser: this.props.username,
    }

    const resposta = await addModel(modelo)

    if (resposta.status === 422) {

      this.setState({
        messageError: true,
      })
      await this.error()
      this.setState({
        loadingButton: false,
        messageError: false
      })
    } if (resposta.status === 200) {

    this.setState({
      newModel: '',
      description: '',
      ModalVisibleModelo: false,
    }, this.getModelsByMark)
    await this.success()
      this.setState({
        loadingButton: false,
        messageSuccess: false
      })
    }
  }

  componentDidMount = () => {
    this.getAllMarkByType()
  }

  getAllMarkByType = async () => {

    this.setState({
      loading: {
        marca: true,
      },
    })

    const resposta = await getAllMarkByTypeService({ type: this.state.type })

    this.setState({
      marksList: resposta.data,
      loading: {
        marca: false,
      },
    })
  }

  changeTypeSelected = (valueSelected) => {
    let typeFormated = valueSelected
    switch (valueSelected) {
      case 'relogio':
        typeFormated = 'Relógio'
        break
      case 'controleAcesso':
        typeFormated = 'Controle de Acesso'
        break
      case 'catraca':
        typeFormated = 'Catraca'
        break
      case 'peca':
        typeFormated = 'Peça'
        break
      case 'sirene':
        typeFormated = 'Sirene'
        break
      default:
        typeFormated = 'Relógio'
    }

    this.setState({
      disable: true,
      type: valueSelected,
      typeFormat: typeFormated,
      modelsList: [],
      mark: {
        id: '',
        mark: '',
      }
    }, this.getAllMarkByType)
  }


  onSubmit = (value) => {
    const body = R.omit(['sucess'], this.props.value)
    this.props.onSubmit(body)
  }

  openModalMarca = () => {
    this.setState({
      ModalVisibleMarca: true
    })
  }

  openModalModelo = () => {
    this.setState({
      ModalVisibleModelo: true
    })
  }

  closeModal = () => {
    this.setState({
      ModalVisibleMarca: false,
      ModalVisibleModelo: false
    })
  }

  render() {
    // if (this.props.value.sucess) {
    //   Modal.success({
    //     title: 'Sucesso',
    //     content: `O tipo de equipamento foi cadastrado com sucesso`,
    //   })
    // }
    return (
      <div className='card-bg-newEquipType'>

        <div className='div-equipType-Linha div-equipType-header'>
          <h1 className='div-equipType-title'>Cadastro tipo de equipamento</h1>
        </div>

        <div className='div-equipType-form'>

          <div className='div-equipType-Linha'>

            <div className='div-type-group'>
              <h2 className='div-equipType-label'>Tipo do equipamento:</h2>
              <Select
                defaultValue="relogio"
                className='input-type-tipo'
                name='type'
                onChange={this.changeTypeSelected}
              >

                <Option value="relogio">Relógio</Option>
                <Option value="catraca">Catraca</Option>
                <Option value="controleAcesso">Controle de Acesso</Option>
                <Option value="peca">Peça</Option>
                <Option value="sirene">Sirene</Option>
              </Select>
            </div>
          </div>

          <div className='div-equipType-Linha-card'>
            <div className='div-equipType-cardMarca'>
              <Card size="small" title="Marcas" style={{ width: '100%' }}>
                {this.state.loading.marca ? <div className='div-spin-accessories'><Spin spinning={this.state.loading.marca} /></div> : null}
                {this.state.marksList.length === 0 ? <p>Nenhuma marca cadastrada</p> :
                  this.state.marksList.map(mark => <div key={mark.mark} className={this.state.mark.mark === mark.mark ? 'markList-equipType-selecionado' : 'markList-equipType'}
                    onClick={() => this.selectMark(mark)}>
                    {mark.mark}
                  </div>
                  )}
              </Card>
              <div className='div-equipType-buttonModelo'>
                <Button
                  className='equipType-button'
                  onClick={this.openModalMarca}
                  type="primary">Adicionar
            </Button>
                <Modal
                  title="Adicionar marca"
                  visible={this.state.ModalVisibleMarca}
                  onOk={this.saveTargetMark}
                  onCancel={this.closeModal}
                  okText='Salvar'
                  cancelText='Cancelar'
                >
                  <div className='div-type'>
                    <h2 className='h2-type'>Tipo do equipamento:</h2>
                    <Input
                      className='input-type-equipType'
                      readOnly
                      name='type'
                      value={this.state.typeFormat}
                    // value={this.props.value.cnpj}
                    // onChange={this.props.changeValueCompany}
                    />
                  </div>
                  <div className='div-type'>
                    <h2 className='div-equipType-label'>Marca:</h2>
                    <Input
                      className='input-marca-equipType'
                      name='marca'
                      placeholder='Digite a marca'
                      onChange={this.onChangeMarca}
                      value={this.state.newMark}
                      allowClear
                    />
                  </div>
                </Modal>
              </div>
            </div>
            <div className='iconArrow-equipType'>
              <Icon type="arrow-right" />
            </div>
            <div className='div-equipType-cardModelo'>
              <Card size="small" title="Modelos" style={{ width: '100%' }}>
                {this.state.loading.modelo ? <div className='div-spin-accessories'><Spin spinning={this.state.loading.modelo} /></div> : null}
                {this.state.modelsList.length === 0 ? this.state.mark.mark === '' ? <p>Nenhuma marca selecionada</p> : <p>Nenhum modelo cadastrado</p> :
                  this.state.modelsList.map(model => <div>{model.model}</div>)}
              </Card>
              <div className='div-equipType-buttonModelo'>
                <Button
                  className='equipType-button'
                  onClick={this.openModalModelo}
                  loading={this.state.loadingButton}
                  type="primary">Adicionar
                </Button>
                <Modal
                  title="Adicionar modelo"
                  visible={this.state.ModalVisibleModelo}
                  onOk={this.saveTargetModel}
                  onCancel={this.closeModal}
                  okText='Salvar'
                  cancelText='Cancelar'
                >
                  <div className='div-type'>
                    <h2 className='h2-type'>Tipo do equipamento:</h2>
                    <Input
                      className='input-type-equipType'
                      readOnly
                      name='type'
                      value={this.state.typeFormat}
                    // value={this.props.value.cnpj}
                    // onChange={this.props.changeValueCompany}
                    />
                  </div>
                  <div className='div-type'>
                    <h2 className='div-equipType-label'>Marca:</h2>
                    <Input
                      readOnly
                      className='input-marca-equipType'
                      name='marca'
                      value={this.state.mark.mark === '' ? 'Nenhuma marca selecionada' : this.state.mark.mark}
                    // value={this.props.value.cnpj}
                    // onChange={this.props.changeValueCompany}
                    />
                  </div>
                  <div className='div-type'>
                    <h2 className='div-equipType-label'>Modelo:</h2>
                    {this.state.disable === false ? <Input
                      className='input-marca-equipType'
                      name='modelo'
                      placeholder='Digite o modelo'
                      value={this.state.newModel}
                      onChange={this.onChangeModelo}
                      allowClear
                    /> : <Input
                        disabled
                        className='input-marca-equipType'
                        name='modelo'
                        placeholder='Digite o modelo'
                        value={this.state.newModel}
                        onChange={this.onChangeModelo}
                        allowClear
                      />}

                  </div>
                  <div className='div-type'>
                    <h2 className='div-equipType-label'>Descrição:</h2>
                    <Input
                      className='input-desc-equipType'
                      name='modelo'
                      placeholder='Digite a descrição do modelo'
                      value={this.state.description}
                      onChange={this.onChangeDescricao}
                      allowClear
                    />
                  </div>
                </Modal>
              </div>
            </div>
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


export default connect(mapStateToProps)(NewTypeEquip)