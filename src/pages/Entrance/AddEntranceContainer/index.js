import React, { Component } from 'react'
import { Input, Modal, Button, Select, Radio, Card, Icon} from 'antd';

import * as R from 'ramda'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { changeValueCompany, onSubmit } from '../EntranceRedux/action'
import './index.css'


const { Option } = Select;

class NewEntrance extends Component {

  state = {
    radio: '',
    selected: 'cliente',
    embalado: '',
    visible: false,
    quantAcessorios: '',
    input: '',
    acessorios:[],
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
    ]
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
    if(this.state.input !== ''){
      const acessorio = `${this.state.quantAcessorios} - ${this.state.input}`

      return(
        this.setState({
          acessoriosCarrinho: [
            ...this.state.acessoriosCarrinho,
            acessorio
          ],
          input:'',
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
      radio: 'nao'
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
    console.log(this.state.acessorios)
    return (
      <div className='div-entrance-card'>
        <div className='div-comp-Linha div-comp-header'>
          <h1 className='div-comp-title'>Nova entrada</h1>
        </div>

        <div className='div-entrance-linha1'>
          <div className='div-entrance-ns'>
            <h2 className='div-comp-label'>Número de série:</h2>
            <Input
              className='input-cnpj'
              placeholder='Digite o número'
              name='numeroSerie'
              allowClear
            // value={this.props.value.cnpj}
            // onChange={this.props.changeValueCompany}
            />
          </div>
          <div className='div-entrance-cor'>
            <h2 className='div-comp-label'>Cor do leitor:</h2>
            <Input
              readOnly
              className='input-cnpj'
              name='corLeitor'
              allowClear
            // value={this.props.value.cnpj}
            // onChange={this.props.changeValueCompany}
            />
          </div>
          <div className='div-entrance-tipo'>
            <h2 className='div-comp-label'>Tipo:</h2>
            <Input
              readOnly
              className='input-cnpj'
              name='acessorio'
              allowClear
            // value={this.props.value.cnpj}
            // onChange={this.props.changeValueCompany}
            />
          </div>
          <div className='div-entrance-marca'>
            <h2 className='div-comp-label'>Marca:</h2>
            <Input
              readOnly
              className='input-cnpj'
              name='acessorio'
              allowClear
            // value={this.props.value.cnpj}
            // onChange={this.props.changeValueCompany}
            />
          </div>
          <div className='div-entrance-modelo'>
            <h2 className='div-comp-label'>Modelo:</h2>
            <Input
              readOnly
              className='input-cnpj'
              name='acessorio'
              allowClear
            // value={this.props.value.cnpj}
            // onChange={this.props.changeValueCompany}
            />
          </div>
        </div>
        <div className='div-entrance-linha1'>
          <div className='div-entrance-cnpj'>
            <h2 className='div-comp-label'>Cnpj:</h2>
            <Input
              readOnly
              className='input-cnpj'
              name='cnpj'
              allowClear
            // value={this.props.value.cnpj}
            // onChange={this.props.changeValueCompany}
            />
          </div>
          <div className='div-entrance-rs'>
            <h2 className='div-comp-label'>Empresa:</h2>
            <Input
              readOnly
              className='input-cnpj'
              name='razaoSocial'
              allowClear
            // value={this.props.value.cnpj}
            // onChange={this.props.changeValueCompany}
            />
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
              {this.state.radio === 'sim' ? <Input placeholder='Digite os danos no equipamento' /> : null}
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
                <Icon style={{color: 'gray'}} type="close-circle" theme="filled" />
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
            <h2 className='div-comp-label'>Defeito apresentado:</h2>
            <Input
              className='input-cnpj'
              placeholder='Digite o defeito'
              name='acessorio'
              allowClear
            // value={this.props.value.cnpj}
            // onChange={this.props.changeValueCompany}
            />
          </div>
        </div>

        <div className='div-entrance-linha1'>
          <div className='div-entrance-desc'>
            <h2 className='div-comp-label'>Observação (opcional):</h2>
            <Input
              className='input-cnpj'
              placeholder='Digite a observação'
              name='descricao'
              allowClear
            // value={this.props.value.cnpj}
            // onChange={this.props.changeValueCompany}
            />
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
              <h2 className='div-comp-label'>Nome do cliente:</h2>
              <Input
                allowClear
                className='input-cnpj'
                placeholder='Digite o nome do cliente'
                name='nameCliente'
              // value={this.props.value.cnpj}
              // onChange={this.props.changeValueCompany}
              />
            </div>
            <div className='div-entrance-rg'>
              <h2 className='div-comp-label'>RG:</h2>
              <Input
                className='input-cnpj'
                placeholder='Digite o RG'
                name='RG'
                allowClear
              // value={this.props.value.cnpj}
              // onChange={this.props.changeValueCompany}
              />
            </div>
            <div className='div-entrance-cpf'>
              <h2 className='div-comp-label'>Cpf:</h2>
              <Input
                className='input-cnpj'
                placeholder='Digite o cpf'
                name='cpf'
                allowClear
              // value={this.props.value.cnpj}
              // onChange={this.props.changeValueCompany}
              />
            </div> </div> : null}
        </div>
        {this.state.selected === 'externo' ? <div className='div-entrance-selectInputs'>
          <div className='div-entrance-externo'>
            <h2 className='div-comp-label'>Nome do técnico externo:</h2>
            <Input
              allowClear
              className='input-cnpj'
              placeholder='Digite o nome do técnico'
              name='nameExterno'
            // value={this.props.value.cnpj}
            // onChange={this.props.changeValueCompany}
            />
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
              {this.state.embalado === 'nao' ? <Input placeholder='Digite o motivo' /> : null}
            </div>
          </div>
        </div> : null}
        {this.state.selected === 'sedex' ? <div className='div-entrance-linha1'>
          <div className='div-entrance-linha1Motoboy'>
            <div className='div-entrance-nomeRemetente'>
              <h2 className='div-comp-label'>Nome do remetente:</h2>
              <Input
                className='input-cnpj'
                placeholder='Digite o nome do remetente'
                name='nameRemetente'
                allowClear
              // value={this.props.value.cnpj}
              // onChange={this.props.changeValueCompany}
              />
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
                {this.state.embalado === 'nao' ? <Input placeholder='Digite o motivo' /> : null}
              </div>
            </div>
          </div>
          <div className='div-entrance-linha2Sedex'>
            <div className='div-entrance-cep'>
              <h2 className='div-comp-label'>Cep:</h2>
              <Input
                allowClear
                className='input-cnpj'
                placeholder='Digite o cep'
                name='cep'
              // value={this.props.value.cnpj}
              // onChange={this.props.changeValueCompany}
              />
            </div>
            <div className='div-entrance-uf'>
              <h2 className='div-comp-label'>Estado:</h2>
              <Input
                allowClear
                className='input-cnpj'
                placeholder='EX'
                name='state'
              // value={this.props.value.cnpj}
              // onChange={this.props.changeValueCompany}
              />
            </div>
            <div className='div-entrance-city'>
              <h2 className='div-comp-label'>Cidade:</h2>
              <Input
                allowClear
                className='input-cnpj'
                placeholder='Digite a cidade'
                name='city'
              // value={this.props.value.cnpj}
              // onChange={this.props.changeValueCompany}
              />
            </div>
            <div className='div-entrance-bairro'>
              <h2 className='div-comp-label'>Bairro:</h2>
              <Input
                allowClear
                className='input-cnpj'
                placeholder='Digite o bairro'
                name='neighborhood'
              // value={this.props.value.cnpj}
              // onChange={this.props.changeValueCompany}
              />
            </div>
          </div>
          <div className='div-entrance-linha2Sedex'>
            <div className='div-entrance-rua'>
              <h2 className='div-comp-label'>Rua:</h2>
              <Input
                allowClear
                className='input-cnpj'
                placeholder='Digite a rua'
                name='street'
              // value={this.props.value.cnpj}
              // onChange={this.props.changeValueCompany}
              />
            </div>
            <div className='div-entrance-numero'>
              <h2 className='div-comp-label'>Número:</h2>
              <Input
                allowClear
                className='input-cnpj'
                placeholder='123567891011121'
                name='number'
              // value={this.props.value.cnpj}
              // onChange={this.props.changeValueCompany}
              />
            </div>
          </div>
          <div className='div-entrance-linha3Sedex'>
            <div className='div-entrance-comp'>
              <h2 className='div-comp-label'>Complemento:</h2>
              <Input
                allowClear
                className='input-cnpj'
                placeholder='Ex: Torre 3, Bloco 7'
                name='complement'
              // value={this.props.value.cnpj}
              // onChange={this.props.changeValueCompany}
              />
            </div>
            <div className='div-entrance-ref'>
              <h2 className='div-comp-label'>Ponto de referência:</h2>
              <Input
                allowClear
                className='input-cnpj'
                placeholder='Digite o ponto de referência'
                name='referencePoint'
              // value={this.props.value.cnpj}
              // onChange={this.props.changeValueCompany}
              />
            </div>
          </div>
        </div> : null}
        {this.state.selected === 'motoboy' ? <div className='div-entrance-selectInputs2lines'>
          <div className='div-entrance-linha1Motoboy'>
            <div className='div-entrance-nomeMotoboy'>
              <h2 className='div-comp-label'>Nome do motoboy:</h2>
              <Input
                className='input-cnpj'
                placeholder='Digite o nome do motoboy'
                name='nameMotoboy'
                allowClear
              // value={this.props.value.cnpj}
              // onChange={this.props.changeValueCompany}
              />
            </div>
            <div className='div-entrance-rg'>
              <h2 className='div-comp-label'>RG:</h2>
              <Input
                className='input-cnpj'
                placeholder='Digite o RG do motoboy'
                name='RG'
                allowClear
              // value={this.props.value.cnpj}
              // onChange={this.props.changeValueCompany}
              />
            </div>
            <div className='div-entrance-cpf'>
              <h2 className='div-comp-label'>Cpf:</h2>
              <Input
                className='input-cnpj'
                placeholder='Digite o cpf do motoboy'
                name='cpfMotoboy'
                allowClear
              // value={this.props.value.cnpj}
              // onChange={this.props.changeValueCompany}
              />
            </div>
          </div>
          <div className='div-entrance-linha2Motoboy'>
            <div className='div-entrance-nomeReponsa'>
              <h2 className='div-comp-label'>Nome do responsável:</h2>
              <Input
                className='input-cnpj'
                placeholder='Digite o nome do responsável'
                name='nameResponsavel'
                allowClear
              // value={this.props.value.cnpj}
              // onChange={this.props.changeValueCompany}
              />
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
                {this.state.embalado === 'nao' ? <Input placeholder='Digite o motivo' /> : null}
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
