import React, { Component } from 'react'
import { connect } from 'react-redux'
import './index.css'
import { getAllParts } from '../../../services/peca'

import { Button, Input, Card, Checkbox, Modal, Select } from 'antd';

const { TextArea } = Input;
const { Option } = Select;

const date = Date.now()
class NewAnalise extends Component {

  state = {
    analiseSelected:{
      Os: '',
      contrato: '',
      garantia: '',
      serialNumber: '',
      razaoSocial: '',
      type: '',
      mark: '',
      model: '',
      OsRetorno: '',
      dataFabrica: '',
    },
    modal: false,
    status: 'prontoParaOrcamento',
    problems:{
      violado: false,
      mauUso: false,
      humidade: false,
      sinaisQueda: false,
    },
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
    observções: '',
    modalPausa: false,
    motivoPausa: '',
    rows: [],
    conditionType: this.props.analyze.conditionType.slice(0,1).toUpperCase() + this.props.analyze.conditionType.slice(1,15),
    garantia: this.props.analyze.garantia.slice(0,1).toUpperCase() + this.props.analyze.garantia.slice(1,15),
    currentTime: 0,
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
            model: this.props.analyze.model,
          },
        },
        equipMark: {
          specific: {
            mark: this.props.analyze.mark,
          },
        },
        equipType: {
          specific: {
            type: this.props.analyze.type,
          },
        },
      },
    }

    await getAllParts(query).then(
      resposta => this.setState({
        rows: resposta.data.rows,
      })
    )
  }

  componentDidMount = async () => {
    await this.getAll()
  }

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
      }
    })
  };

  componentDidMount = () => {
    this.getProps()

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

  onChangeProblems = (e) => {
    this.setState({
      problems:{
        ...this.state.problems,
        [e.target.name]: e.target.checked 
      }
    })
  }

  changeSelect = (value) => {
    this.setState({
      status: value
    })
  }

  tick(){

    var ms = (Date.now()- date);
			var diff = {};

			for ( diff.years = 0; ms>=31536000000; diff.years++, ms -= 31536000000);
			for ( diff.months = 0; ms>=2628000000; diff.months++, ms -= 2628000000);
			for ( diff.days = 0; ms>=86400000; diff.days++, ms -= 86400000);
			for ( diff.hours = 0; ms>=3600000; diff.hours++, ms -= 3600000);
			for ( diff.minutes = 0; ms>=60000; diff.minutes++, ms -= 60000);
			for ( diff.seconds = 0; ms>=1000; diff.seconds++, ms -= 1000);
      diff.milliseconds = ms;

      if (diff.seconds < 10) diff.seconds = `0${diff.seconds}`
      if (diff.minutes < 10) diff.minutes = `0${diff.minutes}`
      if (diff.hours < 10) diff.hours = `0${diff.hours}`
      

    this.setState((prevState, props) => ({

      currentTime: `${diff.hours}:${diff.minutes}:${diff.seconds}:${diff.milliseconds}`,
    }));
  }

  // onChange = (value) => {
  //   this.setState({
  //     checkList:{
  //       value
  //     }
  //   })
  // }



  render() {
    // console.log(this.props.analyze)

    return (
      <div className='div-card-analise'>

        <div className='div-comp-Linha div-comp-header'>
          <h1 className='div-comp-title'>Análise</h1>
        </div>

        <div className='div-nosEservico-analise'>
          <div className='div-nos-analise'>{this.props.analyze.os}</div>
          <div className='div-servico-analise'>{`${this.state.conditionType} - ${this.state.garantia}`}</div>
        </div>

        <div className='div-linha-analise'>
          {/* <div className='div-tempo-analise'>{`${this.state.horas}:${this.state.minutos}:${this.state.segundos}`}</div> */}
          <div className='div-tempo-analise'>{this.state.currentTime}</div>
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

          <div className='div-linha-analise'>
          {this.props.analyze.defect}
          </div>

        </Card>

        <div className='div-linhaSpace-analise'>

          <div className='div-allCheckbox-analise'>

            <div className='div-checkboxText-analise'>Checklist</div>

            <Card className='card-checkbox-analise'>

              <div className='div-linha-analise'>

                <div className='div-checkbox-analise'>

                  <Checkbox onChange={this.onChangeProblems} checked={this.state.problems.violado} name='violado'>Violado</Checkbox>
                  <Checkbox onChange={this.onChangeProblems} checked={this.state.problems.mauUso} name='mauUso'>Mau uso</Checkbox>
                  <Checkbox onChange={this.onChangeProblems} checked={this.state.problems.humidade} name='humidade'>Humidade</Checkbox>
                  <Checkbox onChange={this.onChangeProblems} checked={this.state.problems.sinaisQueda} name='sinaisQueda'>Sinais de queda</Checkbox>

                </div>

              </div>

            </Card>

            <div className='div-historico-analise'>Carrinho</div>

            <Card className='card-carrinho-analise'>

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

        <Select defaultValue={this.state.status} onChange={this.changeSelect} className='select-analise'>
          <Option value="irParaFabrica">Ir para fábrica</Option>
          <Option value="irParaTestes">Ir para testes</Option>
          <Option value="prontoParaOrcamento">Pronto para orçamento</Option>
        </Select>

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

function mapStateToProps (state) {
  return {
    analyze: state.analyze
  }
}

export default connect (mapStateToProps)(NewAnalise)