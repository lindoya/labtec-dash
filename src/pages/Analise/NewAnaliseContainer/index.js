import React, { Component } from 'react'
import './index.css'

import { Button, Input, Card, Checkbox, Modal } from 'antd';

const { TextArea } = Input;

class NewAnalise extends Component {

  state = {
    modal: false,
    checkList: {

    },
    carrinho: [],
    listaPecas: [{
      id: 'peca',
      peca: 'peca'
    }]
  }

  showModal = () => {
    this.setState({
      modal: true,
    });
  };

  handleOk = () => {
    this.setState({
      modal: false,
    });
  };

  handleCancel = () => {
    this.setState({
      modal: false,
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
          <Button type="primary">Pausar</Button>
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

                  {this.state.listaPecas.length === 0 ? <p className='p-nao'>Nenhuma peça selecionada</p> : this.state.listaPecas.map(pecas => <div className='p-selecionados' onClick={() => this.clickPeca({ id: pecas.id, peca: pecas.peca })}>{pecas.peca}</div>)}

                  <Modal
                    title="Troca de peça"
                    visible={this.state.modal}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                  >
                    <p>TESTEEEE</p>
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
              placeholder="Digite a observação"
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