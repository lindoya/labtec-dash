import React, { Component } from 'react'
import './index.css'
import { Input, Button, Card, Select } from 'antd'
import { getAllMarkByTypeService, getAllModelByMarkService } from '../../../services/equip'
// import { add } from '../../../services/peca'

const { Option } = Select;

class NewPeca extends Component {

  state = {
    type: 'relogio',
    mark: 'Nao selecionado',
    marksList: [],
    modelsList: [],
    modelListCard: [],
    modelListRelacionados: {
      id: '',
      model: '',
    },
    newPeca: {
      item: '',
      description: '',
      costPrice: '',
      salePrice: '',
      equipModels: [],
    }
  }

  // saveTargetToBack = async () => {
  //   const partMock = {
  //     type: this.state.type,
  //     mark: this.state.mark,
  //     : this.state,
  //     modelListRelacionados: {
  //       id: '',
  //       model: '',
  //     },
  //     newPeca: {
  //       item: '',
  //       description: '',
  //       costPrice: '',
  //       salePrice: '',
  //       equipModels: [],
  //     }
  //   }

  //   await add(partMock)
  //   this.setState({
  //     newMark: '' ,
  //     ModalVisibleMarca: false,
  //   }, this.getAllMarkByType)
  // }

  clickModel = (selecionados) => {
    const notExist = this.state.modelListCard
      .filter((valor) => valor.id === selecionados.id).length === 0

    if (notExist) {
      this.setState({
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

  onChangePeca = (e) => {
    this.setState({
      newPeca: {
        ...this.state.newPeca,
        [e.target.name]: e.target.value
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
    if (this.state.mark !== 'Nao selecionado') {
      const resposta = await getAllModelByMarkService({ mark: this.state.mark })

      this.setState({
        modelsList: resposta.data,
      })
    }
  }

  handleChangeType = (value) => {
    this.setState({
      type: `${value}`,
    }, this.getAllMarkByType);
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

  render() {
    console.log(this.state.modelListCard)
    return (
      <div className='div-newPeca-card'>

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
                <Select defaultValue={this.state.type} style={{ width: '100%' }} onChange={this.changeTypeSelected}>
                  <Option value="relogio">Relógio</Option>
                  <Option value="catraca">Catraca</Option>
                  <Option value="controleAcesso">Controle de Acesso</Option>
                  <Option value="peca">Peça</Option>
                  <Option value="sirene">Sirene</Option>
                </Select>
              </div>

              <div className='div-marca-peca'>
                <h2 className='div-comp-label'>Marca:</h2>
                <Select style={{ width: '100%' }} defaultValue={this.state.mark} value={this.state.mark} onChange={(mark) => this.handleChangeMark(mark)}>
                  {this.state.marksList.map(mark => <Option key={mark.mark} value={mark.mark}>{mark.mark}</Option>)}
                </Select>
              </div>
            </div>

            <div className='div-modelo-peca'>
              <h2 className='div-comp-label'>Modelos:</h2>
              <Card className='card-modelo-peca'>
                <div className='div-dataCard-peca'>
                  {this.state.modelsList.length === 0 ? this.state.mark === 'Nao selecionado' ? <p className='p-nao'>Nenhuma marca selecionada</p> : <p className='p'>Nenhum modelo cadastrado</p> :
                    this.state.modelsList.map(model => <div className='p-selecionados' onClick={() => this.clickModel({ id: model.id, model: model.model, mark: this.state.mark, type: this.state.type })}>{model.model}</div>)}</div>
              </Card>
            </div>

          </div>

          <div className='div-linha-peca'>

            <div className='div-relacionados-peca'>
              <h2 className='div-comp-label'>Modelos relacionados:</h2>
              <Card className='card-relacionados-peca'>
              <div className='cabecalho-newPeca-card'>
                  <div className='type-newPeca-cabecalho'>Tipo</div>
                  <div className='mark-newPeca-cabecalho'>Marca</div>
                  <div className='model-newPeca-cabecalho'>Modelo</div>
                </div>
                {this.state.modelListCard.length === 0 ? <p className='p-nao'>Não há nenhum modelo relacionado</p> : this.state.modelListCard.map(modelList => 
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