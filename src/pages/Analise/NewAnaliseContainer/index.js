import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Redirect } from 'react-router-dom'
import { Button, Input, Card, Modal, Select, message } from 'antd';

import './index.css'
import { getAllParts } from '../../../services/peca'
import { updateProcess } from '../../../services/process'
import { newAnalyze } from '../../../services/analyze';

import { validators } from './validator'

import { setCrono } from '../AnaliseRedux/actions'
import { redirectAnalyze } from '../../Tecnico/TecnicoRedux/action'


const { TextArea } = Input;
const { Option } = Select;


class NewAnalise extends Component {

  garantia() {
    if (this.props.analyze.garantia.length > 1) {
      return this.props.analyze.garantia.slice(0, 1).toUpperCase() + this.props.analyze.garantia.slice(1, 15)
    }
    return ''
  }

  conditionType() {
    if (this.props.analyze.conditionType.length > 1) {
      return this.props.analyze.conditionType.slice(0, 1).toUpperCase() + this.props.analyze.conditionType.slice(1, 15)
    }
    return ''
  }

  state = {
    redirect: false,
    messageError: false,
    messageSuccess: false,
    // analiseSelected: {
    //   Os: '',
    //   contrato: '',
    //   garantia: '',
    //   serialNumber: '',
    //   razaoSocial: '',
    //   type: '',
    //   mark: '',
    //   model: '',
    //   OsRetorno: '',
    //   dataFabrica: '',
    // },
    modal: false,
    status: 'revisao1',
    peca: {
      id: '',
      peca: '',
      motivoTroca: '',
    },
    carrinho: [],
    listaPecas: [{
      id: 'bobina',
      peca: 'Bobina',
    }],
    fieldFalha: {
      motivoPausa: false,
    },
    message: {
      motivoPausa: '',
    },
    observções: '',
    modalPausa: false,
    rows: [],
    conditionType: this.conditionType(),
    garantia: this.garantia(),
    currenMilliseconds: this.props.crono.currenMilliseconds,
    time: 0,
    motivoPausa: '',
    motivoPausaList: [],
    inicio: [this.props.crono.initDate],
    final: [],
  }

  success = () => {
    message.success('Análise efetuada com sucesso');
  };

  error = () => {
    message.error('Erro ao efetuar a análise');
  };

  onChangeMotivo = (e) => {
    this.setState({
      peca: { ...this.state.peca, motivoTroca: e.target.value }
    })
  }

  onChangeMotivoPausa = (e) => {
    this.setState({
      motivoPausa: e.target.value
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

  onFocusMotivo = (e) => {
    this.setState({
      fieldFalha: {
        motivoPausa: false,
      },
      message: {
        motivoPausa: '',
      },
    })
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/logged/tecnico/dash'/>
    }
  }


  handleOkPausa = () => {

    if (this.state.motivoPausa) {

      this.state.final.push(new Date())
      this.state.motivoPausaList.push(this.state.motivoPausa)

      this.setState({
        openModalPausa: false,
        time: this.state.currenMilliseconds,
        motivoPausa: '',
      })

      const value = {
        currenMilliseconds: this.state.currenMilliseconds,
        pausa: true,
      }

      this.props.setCrono(value)

    } else {
      this.setState({
        message: {
          ...this.state.message,
          motivoPausa: 'É obrigatório.',
        },
        fieldFalha: {
          motivoPausa: true,
        }
      })
    }

  }

  handleCancelPausa = () => {
    this.setState({
      openModalPausa: false,
      motivoPausa: ''
    })
  }

  handleOkVoltar = () => {

    // date = Date.now()
    this.state.inicio.push(new Date())

    this.props.setCrono({
      date: Date.now(),
      pausa: false
    })
  }

  openModalPausa = () => {
    this.setState({
      openModalPausa: true
    })
  }

  onChangeObservacao = (e) => {
    this.setState({
      observções: e.target.value
    })
  }

  showModal = (selecionados) => {
    this.setState({
      modal: true,
      peca: {
        id: selecionados.id,
        peca: selecionados.peca,
        motivoTroca: '',
      }
    });
  };

  getAll = async () => {

    const query = {
      filters: {
        equipModel: {
          specific: {
            // model: this.props.analyze.model,
            id: this.props.analyze.equipModelId
          },
        },
      },
    }

    await getAllParts(query).then(
      resposta => {
        if (resposta.data.rows) {
          this.setState({
            rows: resposta.data.rows,
          })
        } else {
          this.setState({
          rows: [],
        })
      }
    })
  }

  saveTargetNewAnaly = async () => {
    const  pause = []

    for (let i = 0; i < this.state.final.length; i++) {
      pause.push({
        inicio: this.state.inicio[i + 1],
        final: this.state.final[i],
        motivoPausa: this.state.motivoPausaList[i],
      })
    }

    const values = {
      // humidity: this.state.problems.humidade,
      // misuse: this.state.problems.mauUso,
      // brokenSeal: this.state.problems.violado,
      // fall: this.state.problems.sinaisQueda,
      analysisPart: this.state.carrinho,
      processId: this.props.analyze.os,
      pause,
    }

    const resposta = await newAnalyze(values)

    console.log(resposta)

    if (resposta.status === 422) {

      this.setState({
        messageError: true,
      })
      await this.error()
      this.setState({
        messageError: false
      })
    } if (resposta.status === 200) {
      const value = {
        id: this.props.analyze.os,
        updateProcessMock: {
          status: this.state.status,
        },
      }

      const response = await updateProcess(value)

      if (response.status === 422) {

        this.setState({
          messageError: true,
        })
        await this.error()
        this.setState({
          messageError: false
        })
      } else if (resposta.status === 200) {
        this.setState({
          redirect: true,
          carrinho: [],
          messageSuccess: true,
        })

        const INICIAL_STATE_REDIRECT = {
          os: '',
          serialNumber: '',
          razaoSocial: '',
          type: '',
          mark: '',
          model: '',
          leitor: '',
          defect: '',
          garantia: '',
          conditionType: '',
          equipModelId: '',
          analysisCompleted: true,
        }

        await this.props.redirectAnalyze(INICIAL_STATE_REDIRECT)

        const valueCrono = {
          currenMilliseconds: 0,
          pausa: true,
          date: Date.now(),
          initDate: new Date(),
        }

        await this.props.setCrono(valueCrono)

        await this.success()
        this.setState({
          messageSuccess: false,
          garantia: '',
          conditionType: '',
          currenMilliseconds: 0,
          redirect: false
        })
      }
    }
  }

  componentDidMount = () => {
    this.getAll()

    this.timerID = setInterval(
      (prevState, props) => this.tick(),
      1
    );

  }

  handleCancel = () => {
    this.setState({
      modal: false,
      peca: {
        id: '',
        peca: '',
        motivoTroca: '',
      }
    });
  };

  clickPeca = (selecionados) => {
    const notExist = this.state.carrinho.filter((valor) => valor.id === selecionados.valor)

    console.log(notExist)
    if (notExist.length === 0) {
      this.setState({
        modal: false,
        carrinho: [...this.state.carrinho,
        {
          partId: this.state.peca.id,
          description: this.state.peca.motivoTroca,
        }
        ]
      });

      this.setState({
        peca: {
          id: '',
          peca: '',
          motivoTroca: '',
        }
      })
    } else {
      this.setState({
        modal: false
      })
    }
  }

  removePecas = (value) => {
    const oldPecasList = this.state.carrinho
    const newPecasList = oldPecasList.filter(pecasList => pecasList !== value)

    this.setState({
      carrinho: newPecasList
    })
  }

  changeSelect = (value) => {
    this.setState({
      status: value
    })
  }

  tick() {

    if (!this.props.crono.pausa) {

      this.setState((prevState, props) => ({
        currenMilliseconds: Date.now() - this.props.crono.date + this.props.crono.currenMilliseconds,
      }));
    }
  }

  formatedCrono = (milliseconds) => {
    const cronoMilliseconds = milliseconds % 1000
    let cronoSeconds = Math.trunc(milliseconds / 1000) % 60
    let cronoMinutes = Math.trunc(milliseconds / 60000) % 60
    let cronoHours = Math.trunc(milliseconds / 3600000)

    if (cronoHours < 10) cronoHours = `0${cronoHours}`
    if (cronoMinutes < 10) cronoMinutes = `0${cronoMinutes}`
    if (cronoSeconds < 10) cronoSeconds = `0${cronoSeconds}`


    return `${cronoHours}:${cronoMinutes}:${cronoSeconds}:${cronoMilliseconds}`
  }

  render() {
    return (
      <div className='div-card-analise'>
      {this.renderRedirect()}
        <div className='div-comp-Linha div-comp-header'>
          <h1 className='div-comp-title'>Análise</h1>
        </div>

        <div className='div-nosEservico-analise'>
          <div className='div-nos-analise'>{this.props.analyze.os}</div>
          <div className='div-servico-analise'>{`${this.state.conditionType} - ${this.state.garantia}`}</div>
        </div>

        <div className='div-linha-analise'>
          {/* <div className='div-tempo-analise'>{`${this.state.horas}:${this.state.minutos}:${this.state.segundos}`}</div> */}
          {this.props.analyze.serialNumber? <div className='div-tempo-analise'>{this.formatedCrono(this.state.currenMilliseconds)}</div> : null}

          {this.props.analyze.serialNumber? <div>
          {this.props.crono.pausa ? <Button type="primary" onClick={this.handleOkVoltar}>Retomar</Button>
            : <Button type="primary" onClick={this.openModalPausa}>Pausar</Button>}
          </div> : null}

          {this.props.analyze.serialNumber? <Modal
            visible={this.state.openModalPausa}
            onOk={this.handleOkPausa}
            okText='Pausar'
            onCancel={this.handleCancelPausa}
          >
            <div className='div-motivoModal-analise'>
              <h2 className='div-comp-label'>Motivo da pausa:</h2>
              <TextArea
                value={this.state.motivoPausa}
                name='motivoPausa'
                className={
                  this.state.fieldFalha.motivoPausa ?
                    'textArea-motivoPausa-analise-inputError' :
                    'textArea-motivoPausa-analise'}
                placeholder="Digite o motivo da pausa"
                autosize={{ minRows: 3, maxRows: 10 }}
                onChange={this.onChangeMotivoPausa}
                onBlur={this.onBlurValidator}
                onFocus={this.onFocusMotivo}
              />
              {this.state.fieldFalha.motivoPausa ?
                <p className='div-analise-feedbackError'>
                  {this.state.message.motivoPausa}
                </p> : null}
            </div>

          </Modal> : null}
        </div>
        {this.props.crono.pausa === false ? <div className='div-condicao-analise'>
          <div className='div-dadosDoEquipamento-analise'>Dados do equipamento</div>

          <div className='div-linha-analise'>

            <div className='div-serialNumber-analise'>
              <h2 className='div-comp-label'>Número de série:</h2>
              <Input
                readOnly
                className='input-cnpj'
                name='numeroSerie'
                value={this.props.analyze.serialNumber}
              />
            </div>

            <div className='div-razaoSocial-analise'>
              <h2 className='div-comp-label'>Razão social:</h2>
              <Input
                readOnly
                className='input-cnpj'
                name='razaoSocial'
                value={this.props.analyze.razaoSocial}
              />
            </div>

          </div>

          <div className='div-linha-analise'>

            <div className='div-type-analise'>
              <h2 className='div-comp-label'>Tipo:</h2>
              <Input
                readOnly
                className='input-cnpj'
                name='type'
                value={this.props.analyze.type}
              />
            </div>

            <div className='div-mark-analise'>
              <h2 className='div-comp-label'>Marca:</h2>
              <Input
                readOnly
                className='input-cnpj'
                name='mark'
                value={this.props.analyze.mark}
              />
            </div>

            <div className='div-model-analise'>
              <h2 className='div-comp-label'>Modelo:</h2>
              <Input
                readOnly
                className='input-cnpj'
                name='model'
                value={this.props.analyze.model}
              />
            </div>

            <div className='div-leitor-analise'>
              <h2 className='div-comp-label'>Leitor:</h2>
              <Input
                readOnly
                className='input-cnpj'
                name='leitor'
                value={this.props.analyze.leitor}
              />
            </div>

          </div>

          <div className='div-historico-analise'>Histórico do equipamento</div>

          <Card className='card-analise'>

            <div className='div-linha-analise'>



            </div>

          </Card>

          <div className='div-defeito-analise' >Defeitos</div>

          <Card className='card-analise'>

            <div className='div-linhaDefeitos-analise'>
              {this.props.analyze.defect}
            </div>

          </Card>

          <div className='div-linhaSpace-analise'>

            <div className='div-allListaPecas-analise'>

              <div className='div-listaText-analise'>Lista de peças</div>

              <Card className='card-listaPecas-analise'>

                <div className='div-linha-analise'>

                  <div className='div-listaDasPecas-analise'>
                  {this.state.rows.length === 0 ? <p className='p-nao'>Nenhuma peça cadastrada</p> : this.state.rows.map(pecas => <div className='p-selecionados' onClick={() => this.showModal({ id: pecas.id, peca: pecas.item }, console.log(pecas))}>{pecas.item}</div>)}
                    <Modal
                      title="Troca de peça"
                      visible={this.state.modal}
                      onOk={() => this.clickPeca({ valor: this.state.peca.id })}
                      okText='Salvar'
                      onCancel={this.handleCancel}
                    >
                      <div className='div-pecaModal-analise'>
                        <h2 className='div-comp-label'>Peça:</h2>
                        <h2 className='div-label-analise'>{this.state.peca.peca}</h2>
                      </div>

                      <div className='div-motivoModal-analise'>
                        <h2 className='div-comp-label'>Motivo da troca:</h2>
                        <TextArea
                          value={this.state.peca.motivoTroca}
                          className='textArea-motivoTroca-analise'
                          placeholder="Digite a observação"
                          autosize={{ minRows: 2, maxRows: 10 }}
                          onChange={this.onChangeMotivo}
                        />
                      </div>

                    </Modal>
                  </div>

                </div>

              </Card>

            </div>

            <div className='div-allCheckbox-analise'>

              <div className='div-historico-analise'>Carrinho</div>

              <Card className='card-carrinho-analise'>

                {this.state.carrinho.length === 0 ? <p className='p-nao'>Não há nenhuma peça selecionada</p> : this.state.carrinho.map(pecasList =>
                  <div className='div-pai-newPeca' onClick={() => this.removePecas(pecasList)}>{pecasList.peca}</div>)}

              </Card>

            </div>

          </div>

          <div className='div-historico-analise'>Observções</div>

          <div className='div-linha-analise'>

            <TextArea
              className='textArea-analise'
              placeholder="Digite a observação"
              onChange={this.onChangeObservacao}
              autosize={{ minRows: 5, maxRows: 10 }}
            />

          </div>

          <div className='div-linhaButton-analise'>

            <Select defaultValue={this.state.status} onChange={this.changeSelect} className='select-analise'>
              <Option value="fabrica">Ir para fábrica</Option>
              <Option value="revisao1">Ir para testes</Option>
              <Option value="orcamento">Pronto para orçamento</Option>
              <Option value="pendente">Pendente</Option>
            </Select>
            <Button
              type="primary"
              onClick={this.saveTargetNewCompany}
            >
              Salvar
            </Button>

          </div>
        </div> : <div className='div-condicao-analise'>
          <div className='div-dadosDoEquipamento-analise'>Dados do equipamento</div>

            <div className='div-linha-analise'>

              <div className='div-serialNumber-analise'>
                <h2 className='div-comp-label'>Número de série:</h2>
                <Input
                  readOnly
                  className='input-cnpj'
                  name='numeroSerie'
                  value={this.props.analyze.serialNumber}
                />
              </div>

              <div className='div-razaoSocial-analise'>
                <h2 className='div-comp-label'>Razão social:</h2>
                <Input
                  readOnly
                  className='input-cnpj'
                  name='razaoSocial'
                  value={this.props.analyze.razaoSocial}
                />
              </div>

            </div>

            <div className='div-linha-analise'>

              <div className='div-type-analise'>
                <h2 className='div-comp-label'>Tipo:</h2>
                <Input
                  readOnly
                  className='input-cnpj'
                  name='type'
                  value={this.props.analyze.type}
                />
              </div>

              <div className='div-mark-analise'>
                <h2 className='div-comp-label'>Marca:</h2>
                <Input
                  readOnly
                  className='input-cnpj'
                  name='mark'
                  value={this.props.analyze.mark}
                />
              </div>

              <div className='div-model-analise'>
                <h2 className='div-comp-label'>Modelo:</h2>
                <Input
                  readOnly
                  className='input-cnpj'
                  name='model'
                  value={this.props.analyze.model}
                />
              </div>

              <div className='div-leitor-analise'>
                <h2 className='div-comp-label'>Leitor:</h2>
                <Input
                  readOnly
                  className='input-cnpj'
                  name='leitor'
                  value={this.props.analyze.leitor}
                />
              </div>

            </div> </div>}

      </div >

    )
  }
}

function mapStateToProps(state) {
  return {
    analyze: state.analyze,
    crono: state.crono,
  }
}

function mapDispacthToProps(dispach) {
  return bindActionCreators({ setCrono, redirectAnalyze }, dispach)
}


export default connect(mapStateToProps, mapDispacthToProps)(NewAnalise)