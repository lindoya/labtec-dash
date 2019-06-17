import React, { Component } from 'react'
import './index.css'
import { Input, Button, Card, Select } from 'antd'
import { getAllMarkByTypeService, getAllModelByMarkService } from '../../../services/equip'
import { add } from '../../../services/peca'

const { Option } = Select;

class NewPeca extends Component {

  state = {
    type: 'relogio',
    mark: {
      id: '',
      mark: ''
    },
    marksList: [],
    modelList: [],
    modelListRelacionados: [],
    newPeca: {
      item: '',
      description: '',
      costPrice: '',
      salePrice: '',
      equipModels: [],
    }
  }

  saveTargetModel = async () => {
    const partMock = {
      item: this.state.newPeca.item,
      description: this.state.newPeca.description,
      costPrice: this.state.newPeca.costPrice,
      salePrice: this.state.newPeca.salePrice,
      equipModels: this.state.modelListRelacionados.id
    }

    await add(partMock)
    this.setState({
      newModel: '',
      description: '',
      ModalVisibleModelo: false,
    }, this.getModelsByMark)
  }

  componentDidMount = () => {
    this.getAllMarkByType()
  }

  onChangePeca = (e) => {
    this.setState({
      newPeca: {
        ...this.state.newPeca,
        [e.target.name]: e.target.value,
      }
    })
  }

  getAllMarkByType = async () => {
    const resposta = await getAllMarkByTypeService({ type: this.state.type })

    this.setState({
      marksList: resposta.data
    })
  }

  getModelsByMark = async () => {
    const resposta = await getAllModelByMarkService({ mark: this.state.mark.mark })

    this.setState({
      modelsList: resposta.data,
    })
  }

  handleChangeType = (value) => {
    this.setState({
      type: `${value}`,
      mark: ''
    }, this.getAllMarkByType);
  }

  handleChangeMark = (value) => {
    this.setState({
      mark: `${value}`
    });
  }

  selectMark = async (value) => {

    this.setState({
      mark: {
        id: value.id,
        mark: value.mark,
      }
    }, this.getModelsByMark)
  }


  render() {
    console.log(this.state)
    return (
      <div className='div-comp-card'>

        <div className='div-comp-Linha div-comp-header'>
          <h1 className='div-comp-title'>Cadastro de peças</h1>
        </div>
        <div className='div-formAdd-peca'>

          <div className='div-linha-peca'>
            <div className='div-peca-peca'>
              <h2 className='div-comp-label'>Peça:</h2>
              <Input
                className='input-newEquip'
                placeholder='Digite o nome da peça'
                name='item'
                // value={this.state.cnpj}
                onChange={this.onChangePeca}
                // onBlur={this.getRazaoSocial}
                allowClear
              />
            </div>

            <div className='div-custo-peca'>
              <h2 className='div-comp-label'>Custo:</h2>
              <Input
                className='input-newEquip'
                placeholder='R$'
                name='costPrice'
                // value={this.state.cnpj}
                onChange={this.onChangePeca}
                // onBlur={this.getRazaoSocial}
                allowClear
              />
            </div>

            <div className='div-venda-peca'>
              <h2 className='div-comp-label'>Venda:</h2>
              <Input
                className='input-newEquip'
                placeholder='R$'
                name='salePrice'
                // value={this.state.cnpj}
                onChange={this.onChangePeca}
                // onBlur={this.getRazaoSocial}
                allowClear
              />
            </div>
          </div>

          <div className='div-linha-peca'>

            <div className='div-desc-peca'>
              <h2 className='div-comp-label'>Descrição:</h2>
              <Input
                className='input-newEquip'
                placeholder='Digite a descrição da peça'
                name='description'
                // value={this.state.cnpj}
                onChange={this.onChangePeca}
                // onBlur={this.getRazaoSocial}
                allowClear
              />
            </div>

          </div>

          <div className='div-linha-peca'>

            <div className='div-typeAndMark-peca'>
              <div className='div-type-peca'>
                <h2 className='div-comp-label'>Tipo:</h2>
                <Select defaultValue={this.state.type} style={{ width: '100%' }} onChange={this.handleChangeType}>
                  <Option value="relogio">Relógio</Option>
                  <Option value="catraca">Catraca</Option>
                  <Option value="controleAcesso">Controle de Acesso</Option>
                  <Option value="peca">Peça</Option>
                  <Option value="sirene">Sirene</Option>
                </Select>
              </div>

              <div className='div-marca-peca'>
                <h2 className='div-comp-label'>Marca:</h2>
                <Select defaultValue='Não selecionado' style={{ width: '100%' }} onChange={this.handleChangeMark}>
                  {this.state.marksList.map(mark => <Option value={mark.id}>{mark.mark}</Option>)}
                </Select>
              </div>
            </div>

            <div className='div-modelo-peca'>
              <h2 className='div-comp-label'>Modelos:</h2>
              <Card className='card-modelo-peca'>
                <div className='div-dataCard-peca'>
                  <p className='p'>Card content</p>
                  <p className='p'>Card content</p>
                  <p className='p'>Card content</p>
                </div>
              </Card>
            </div>

          </div>

          <div className='div-linha-peca'>

            <div className='div-relacionados-peca'>
              <h2 className='div-comp-label'>Modelos relacionados:</h2>
              <Card className='card-relacionados-peca'>
                <p className='p'>Nenhum modelo relacionado</p>
              </Card>
            </div>

          </div>

          <div className='div-linhaBottom-peca'>

            <Button
              className='comp-button'
              // onClick={this.saveTargetNewCompany}
              type="primary">Salvar
            </Button>

          </div>
        </div>
      </div>
    )
  }
}

export default NewPeca