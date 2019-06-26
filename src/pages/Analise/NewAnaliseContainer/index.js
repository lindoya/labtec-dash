import React, { Component } from 'react'
import './index.css'
import * as moment from 'moment'

import { Button, Input, Card, Checkbox, Modal, TimePicker } from 'antd';

const { TextArea } = Input;
const format = 'HH:mm';

class NewAnalise extends Component {

  state = {
    modal: false,
    checkList: {

    },
    peca: {
      id: '',
      peca: '',
      motivoTroca: '',
      tempoTroca: '',
    },
    carrinho: [],
    listaPecas: [{
      id: 'bobina',
      peca: 'Bobina',
    }],
    observções: '',
    modalPausa: false,
    motivoPausa: ''
  }

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

  handleOkPausa = () => {
    this.setState({
      openModalPausa: false,
      motivoPausa: ''
    })
  }

  handleCancelPausa = () => {
    this.setState({
      openModalPausa: false,
      motivoPausa: ''
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

  onChangeTempo = (e) => {
    moment.locale('pt-br')
    const hora = moment(e).format('HH:mm')

    this.setState({
      peca: { ...this.state.peca, tempoTroca: hora }
    })
  }

  showModal = (selecionados) => {
    this.setState({
      modal: true,
      peca: {
        id: selecionados.id,
        peca: selecionados.peca,
        motivoTroca: '',
        tempoTroca: ''
      }
    });
  };

  handleOk = () => {
    this.setState({
      modal: false,
      carrinho: [...this.state.carrinho, this.state.peca]
    });

    this.setState({
      peca: {
        id: '',
        peca: '',
        motivoTroca: '',
        tempoTroca: ''
      }
    })
  };

  handleCancel = () => {
    this.setState({
      modal: false,
      peca: {
        id: '',
        peca: '',
        motivoTroca: '',
        tempoTroca: ''
      }
    });
  };

  clickPeca = (selecionados) => {
    const notExist = this.state.carrinho
      .filter((valor) => valor.id === selecionados.id).length === 0

    if (notExist) {
      this.setState({
        carrinho: [
          ...this.state.carrinho,
          selecionados
        ]
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

  onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
  }

  // onChange = (value) => {
  //   this.setState({
  //     checkList:{
  //       value
  //     }
  //   })
  // }


  render() {
    console.log(this.state)

    return (
      <div className='div-card-analise'>

        <div className='div-comp-Linha div-comp-header'>
          <h1 className='div-comp-title'>Análise</h1>
        </div>

        <div className='div-nosEservico-analise'>
          <div className='div-nos-analise'>1132</div>
          <div className='div-servico-analise'>Avulso Garantia</div>
        </div>

        <div className='div-linha-analise'>
          <div className='div-tempo-analise'>01:30:27</div>
          <Button type="primary" onClick={this.openModalPausa}>Pausar</Button>

          <Modal
            visible={this.state.openModalPausa}
            onOk={this.handleOkPausa}
            okText='Pausar'
            onCancel={this.handleCancelPausa}
          >
            <div className='div-motivoModal-analise'>
              <h2 className='div-comp-label'>Motivo da pausa:</h2>
              <TextArea
                value={this.state.motivoPausa}
                className='textArea-motivoPausa-analise'
                placeholder="Digite o motivo da pausa"
                autosize={{ minRows: 3, maxRows: 10 }}
                onChange={this.onChangeMotivoPausa}
              />
            </div>

          </Modal>
        </div>

        <div className='div-dadosDoEquipamento-analise'>Dados do equipamento</div>

        <div className='div-linha-analise'>

          <div className='div-serialNumber-analise'>
            <h2 className='div-comp-label'>Número de série:</h2>
            <Input
              readOnly
              className='input-cnpj'
              name='numeroSerie'
            // value={this.props.value.cnpj}
            // onChange={this.props.changeValueCompany}
            />
          </div>

          <div className='div-razaoSocial-analise'>
            <h2 className='div-comp-label'>Razão social:</h2>
            <Input
              readOnly
              className='input-cnpj'
              name='razaoSocial'
            // value={this.props.value.cnpj}
            // onChange={this.props.changeValueCompany}
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
            // value={this.props.value.cnpj}
            // onChange={this.props.changeValueCompany}
            />
          </div>

          <div className='div-mark-analise'>
            <h2 className='div-comp-label'>Marca:</h2>
            <Input
              readOnly
              className='input-cnpj'
              name='mark'
            // value={this.props.value.cnpj}
            // onChange={this.props.changeValueCompany}
            />
          </div>

          <div className='div-model-analise'>
            <h2 className='div-comp-label'>Modelo:</h2>
            <Input
              readOnly
              className='input-cnpj'
              name='model'
            // value={this.props.value.cnpj}
            // onChange={this.props.changeValueCompany}
            />
          </div>

          <div className='div-leitor-analise'>
            <h2 className='div-comp-label'>Leitor:</h2>
            <Input
              readOnly
              className='input-cnpj'
              name='leitor'
            // value={this.props.value.cnpj}
            // onChange={this.props.changeValueCompany}
            />
          </div>

        </div>

        <div className='div-historico-analise'>Histórico do equipamento</div>

        <Card className='card-analise'>

          <div className='div-linha-analise'>



          </div>

        </Card>

        <div className='div-defeito-analise'>Defeitos</div>

        <Card className='card-analise'>

          <div className='div-linha-analise'>



          </div>

        </Card>

        <div className='div-linhaSpace-analise'>

          <div className='div-allCheckbox-analise'>

            <div className='div-checkboxText-analise'>Checklist</div>

            <Card className='card-checkbox-analise'>

              <div className='div-linha-analise'>

                <div className='div-checkbox-analise'>

                  <Checkbox onChange={this.onChange} value='Violado'>Violado</Checkbox>
                  <Checkbox onChange={this.onChange} value='MauUso'>Mau uso</Checkbox>
                  <Checkbox onChange={this.onChange} value='Humidade'>Humidade</Checkbox>
                  <Checkbox onChange={this.onChange} value='SinaisDeQueda'>Sinais de queda</Checkbox>

                </div>

              </div>

            </Card>

            <div className='div-historico-analise'>Carrinho</div>

            <Card className='card-analise'>

              {this.state.carrinho.length === 0 ? <p className='p-nao'>Não há nenhuma peça selecionada</p> : this.state.carrinho.map(pecasList =>
                <div className='div-pai-newPeca' onClick={() => this.removePecas(pecasList)}>{pecasList.peca}</div>)}

            </Card>

          </div>

          <div className='div-allListaPecas-analise'>

            <div className='div-listaText-analise'>Lista de peças</div>

            <Card className='card-listaPecas-analise'>

              <div className='div-linha-analise'>

                <div className='div-listaDasPecas-analise'>

                  {this.state.listaPecas.length === 0 ? <p className='p-nao'>Nenhuma peça selecionada</p> : this.state.listaPecas.map(pecas => <div className='p-selecionados' onClick={() => this.showModal({ id: pecas.id, peca: pecas.peca })}>{pecas.peca}</div>)}

                  <Modal
                    title="Troca de peça"
                    visible={this.state.modal}
                    onOk={this.handleOk}
                    okText='Salvar'
                    onCancel={this.handleCancel}
                  >
                    <div className='div-pecaModal-analise'>
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

                    <div className='div-motivoModal-analise'>
                      <h2 className='div-comp-label'>Tempo para troca:</h2>
                      <TimePicker
                        className='time-analise'
                        onChange={this.onChangeTempo}
                        format={format} />
                    </div>
                  </Modal>
                </div>

              </div>

            </Card>

          </div>

        </div>

        <div className='div-historico-analise'>Observções</div>

        <div className='div-linha-analise'>

          <TextArea
            className='textArea-analise'
            placeholder="Digite o motivo"
            onChange={this.onChangeObservacao}
            autosize={{ minRows: 5, maxRows: 10 }}
          />

        </div>

        <div className='div-linhaButton-analise'>

          <Button
            type="primary"
          >
            Salvar
         </Button>

        </div>

      </div >

    )
  }
}

export default NewAnalise