import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Select, Input, Button, Icon, Spin, Modal } from 'antd'
import { getAllParts } from '../../../services/peca'
import { validators, masks } from '../DashPeca/validator'

import './index.css'

const { Search } = Input;
const { Option } = Select;
const { TextArea } = Input;

class DashPeca extends Component {

  state = {
    loading: false,
    searchAvancado: false,
    modal: false,
    editar: false,
    pecaSelected: {
      costPrice: '',
      description: '',
      item: '',
      salePrice: '',
    },
    message: {
      costPrice: '',
      description: '',
      item: '',
      salePrice: '',
    },
    fieldFalha: {
      costPrice: false,
      description: false,
      item: false,
      salePrice: false,
    },
    order: {
      field: 'item',
      acendent: true,
    },
    global: '',
    item: '',
    description: '',
    costPrice: '',
    salePrice: '',
    page: 1,
    total: 25,
    count: 0,
    show: 0,
    rows: [],
  }


  getAll = async () => {

    this.setState({
      loading: true,
    })

    const query = {
      filters: {
        part: {
          global: {
            fields: ['item', 'description'],
            value: this.state.global,
          },
          specific: {
            item: this.state.item,
            description: this.state.description,
            costPrice: this.state.costPrice,
            salePrice: this.state.salePrice,
          }
        },
        equipMark: {
          specific: {
            mark: 'Lindóya',
          }
        },
        equipType: {
          specific: {
            type: 'catraca',
          }
        },
      },
      page: this.state.page,
      total: this.state.total,
      order: this.state.order,
    }

    await getAllParts(query).then(
      resposta => this.setState({
        loading: false,
        page: resposta.data.page,
        count: resposta.data.count,
        show: resposta.data.show,
        rows: resposta.data.rows,
      })
    )
  }

  componentDidMount = () => {
    this.getAll()
  }

  buttonAvancado = () => {
    this.setState({
      searchAvancado: !this.state.searchAvancado
    })
  }

  buttonLimpar = () => {
    this.setState({
      global: '',
      item: '',
      description: '',
      costPrice: '',
      salePrice: '',
    }, () => {
      this.getAll()
    })
  }

  handleOk = () => {
    this.setState({
      modal: !this.state.modal,
      editar: false,
      fieldFalha: {
        costPrice: false,
        description: false,
        item: false,
        salePrice: false,
      },
    })
  }

  handleCancel = () => {
    this.setState({
      modal: !this.state.modal,
      editar: false,
      fieldFalha: {
        costPrice: false,
        description: false,
        item: false,
        salePrice: false,
      },
    })
  }

  changeTotal = (value) => {
    this.setState({
      page: 1,
      total: value
    }, () => {
      this.getAll()
    })
  }

  onChange = (e) => {
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

  openModalDetalhes = async (peca) => {    
    await this.setState({
      modal: true,
      pecaSelected: peca,
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

  buttonEditar = () => {
    this.setState({
      editar: !this.state.editar
    })
  }


  changeOrder = (field) => {
    this.setState({
      order: {
        field,
        acendent: !this.state.order.acendent,
      }
    }, () => {
      this.getAll()
    })
  }

  changePages = (pages) => {
    this.setState({
      page: pages
    }, () => {
      this.getAll()
    })
  }

  onChangeEditar = (e) => {
    
    const { nome,
      valor,
    } = masks(e.target.name, e.target.value)

    this.setState({
      pecaSelected: {
        ...this.state.pecaSelected,
        [nome]: valor
      },
    })
  }


  masks = (valor) => {
    let value = valor
    value = value.replace(/\D/ig, '')
    value = value.slice(0, 9)

    if (value.length <= 2) {
      value = value.replace(/(\d{2}?)/, '$1')
    } else if (value.length > 2 && value.length <= 5) {
      value = value.replace(/(\d{1,3})(\d{2})/, '$1,$2')
    } else if (value.length > 5 && value.length <= 8) {
      value = value.replace(/(\d{1,3})(\d{3})(\d{2})/, '$1.$2,$3')
    } else if (value.length > 8) {
      value = value.replace(/(\d{1})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3,$4')
    }

    return value
  }


  ModalDetalhes = () => (
    <Modal
      title="Detalhes da peça"
      visible={this.state.modal}
      onOk={this.handleOk}
      onCancel={this.handleCancel}
      footer={this.props.auth.addPart ? (
        <div className='gercomp-div-button-modal'>
          {!this.state.editar ?
            <div className='gercomp-div-button-editFalse-modal'>
              <Button
                type="primary"
                onClick={this.buttonEditar}
              >
                Editar
                  <Icon type="edit" />
              </Button>
              <Button key="submit" type="primary" onClick={this.handleOk}>
                OK
            </Button>
            </div>
            :
            <div className='gercomp-div-button-editTrue-modal'>
              <Button onClick={this.handleOk}>
                Cancelar
              </Button>
              <Button
                type="primary"
                // onClick={this.saveTargetUpdateEquip}
                loading={this.state.loading}
              >
                Salvar
                <Icon type="check" />
              </Button>
            </div>
          }
        </div>
      )
        : null}
    >
      <div className='div-form-modal-dashPeca'>
        <h3 className='h3-modal-dashPeca'>Dados da peca</h3>
        <div className='div-linhaModal-dashPeca'>
          <div className='div-textPeca-modal-dashPeca'>
            Peça
            {!this.state.editar ? <p className='gercomp-p'>{this.state.pecaSelected.item}</p> : <Input
              onBlur={this.onBlurValidator}
              name='item'
              className={this.state.fieldFalha.item ?
              'div-comp-inputError' :
              'div-dashPeca-inputModal'}
              value={this.state.pecaSelected.item}
              onChange={this.onChangeEditar}
            />}
            {this.state.fieldFalha.item ?
              <p className='div-comp-feedbackError'>
                {this.state.message.item}
              </p> : null}
          </div>
          <div className='div-textCusto-modal-dashPeca'>
            Preço de custo
            {!this.state.editar ? <p className='gercomp-p'>{this.masks(this.state.pecaSelected.costPrice)}</p> : <Input
              onBlur={this.onBlurValidator}
              name='costPrice'
              className={this.state.fieldFalha.costPrice ?
                'div-comp-inputError' :
                'div-dashPeca-inputModal'}
              value={this.masks(this.state.pecaSelected.costPrice)}
              onChange={this.onChangeEditar}
            />}
            {this.state.fieldFalha.costPrice ?
              <p className='div-comp-feedbackError'>
                {this.state.message.costPrice}
              </p> : null}
          </div>
          <div className='div-textVenda-modal-dashPeca'>
            Preço de venda
            {!this.state.editar ? <p className='gercomp-p'>{this.masks(this.state.pecaSelected.salePrice)}</p> : <Input
              onBlur={this.onBlurValidator}
              name='salePrice'
              className={this.state.fieldFalha.salePrice ?
                'div-comp-inputError' :
                'div-dashPeca-inputModal'}
              value={this.masks(this.state.pecaSelected.salePrice)}
              onChange={this.onChangeEditar}
            />}
            {this.state.fieldFalha.salePrice ?
              <p className='div-comp-feedbackError'>
                {this.state.message.salePrice}
              </p> : null}
          </div>
        </div>
        <div className='div-linhaModal-dashPeca'>
          <div className='div-textDescricao-modal-dashPeca'>
            Descrição
            {!this.state.editar ? <p className='gercomp-p'>{this.state.pecaSelected.description === '' ? '-' : this.state.pecaSelected.description}</p> :
              <TextArea
                name='description'
                className='div-dashPeca-inputModal'
                placeholder="Digite a descrição"
                autosize={{ minRows: 3, maxRows: 6 }}
                value={this.state.pecaSelected.description}
                onChange={this.onChangeEditar}
              />}
            {this.state.fieldFalha.description ?
              <p className='div-comp-feedbackError'>
                {this.state.message.description}
              </p> : null}
          </div>
        </div>
      </div>
    </Modal>
  )

  SearchAdvanced = () => (
    <div className='div-advanced-dashPeca'>

      <div className='div-avancado-peca-dashPeca'>
        <h2 className='gerCmp-div-label'>Peça:</h2>
        <Input
          allowClear
          name='item'
          className='input-cnpjCompany'
          placeholder="Digite a peça"
          value={this.state.item}
          onChange={this.onChange}
        />
      </div>
      <div className='div-avancado-desc-dashPeca'>
        <h2 className='gerCmp-div-label'>Descrição:</h2>
        <Input
          allowClear
          name='description'
          className='input-cnpjCompany'
          placeholder="Digite a descrição"
          value={this.state.description}
          onChange={this.onChange}
        />
      </div>
      <div className='div-avancado-venda-dashPeca'>
        {/* <h2 className='gerCmp-div-label'>Preço de venda:</h2>
        <Input
          allowClear
          name='sale'
          className='input-cnpjCompany'
          placeholder="R$"
          value={this.masks(this.state.salePrice)}
          onChange={this.onChange}
        /> */}
      </div>
      <div className='div-avancado-custo-dashPeca'>
        {/* <h2 className='gerCmp-div-label'>Preço de custo:</h2>
        <Input
          allowClear
          name='cost'
          className='input-cnpjCompany'
          placeholder="R$"
          value={this.masks(this.state.costPrice)}
          onChange={this.onChange}
        /> */}
      </div>
    </div>
  )

  Pages = () => (

    <div className='gerCmp-div-table-footer'>
      {Math.ceil(this.state.count / this.state.total) >= 5 && Math.ceil(this.state.count / this.state.total) - this.state.page < 1 ? <Button type="primary" onClick={() => this.changePages(this.state.page - 4)}>{this.state.page - 4}</Button> : ''}
      {Math.ceil(this.state.count / this.state.total) >= 4 && Math.ceil(this.state.count / this.state.total) - this.state.page < 2 && this.state.page > 3 ? <Button type="primary" onClick={() => this.changePages(this.state.page - 3)}>{this.state.page - 3}</Button> : ''}
      {this.state.page >= 3 ? <Button type="primary" onClick={() => this.changePages(this.state.page - 2)}>{this.state.page - 2}</Button> : ''}
      {this.state.page >= 2 ? <Button type="primary" onClick={() => this.changePages(this.state.page - 1)}>{this.state.page - 1}</Button> : ''}
      <div className='div-buttonSelected-dashPeca' type="primary">{this.state.page}</div>
      {this.state.page < (this.state.count / this.state.total) ? <Button type="primary" onClick={() => this.changePages(this.state.page + 1)}>{this.state.page + 1}</Button> : ''}
      {this.state.page + 1 < (this.state.count / this.state.total) ? <Button type="primary" onClick={() => this.changePages(this.state.page + 2)}>{this.state.page + 2}</Button> : ''}
      {this.state.page + 2 < (this.state.count / this.state.total) && this.state.page < 3 ? <Button type="primary" onClick={() => this.changePages(this.state.page + 3)}>{this.state.page + 3}</Button> : ''}
      {this.state.page + 3 < (this.state.count / this.state.total) && this.state.page < 2 ? <Button type="primary" onClick={() => this.changePages(this.state.page + 4)}>{this.state.page + 4}</Button> : ''}
    </div>
  )

  TableParts = () => (
    <div className='div-mainHeader-dashPeca'>
      <div className='div-table-information-dashPeca'>
        <div className='div-table-information-total-dashPeca'>
          <label className='label-table-information-dashPeca'>
            Quantidade por página:
          </label>
          <Select
            defaultValue="25"
            onChange={this.changeTotal}
            size='small'
          >
            <Option value="10">10</Option>
            <Option value="25">25</Option>
            <Option value="50">50</Option>
            <Option value="100">100</Option>
          </Select>
        </div>
        <div className='div-table-information-count-dashPeca'>
          <label className='label-table-information-dashPeca'>
            Mostrando sla quantos
            {/* {`Mostrando ${this.state.show}/${this.state.count} empresas.`} */}
          </label>
        </div>
      </div>
      <div className='div-table-separeteLineMain-dashPeca' />
      <div className='div-table-header-dashPeca'>
        <div className='div-table-cel-peca-dashPeca'
          onClick={() => this.changeOrder('item')}
        >
          {this.state.order.field === 'item' ?
            <div className='div-icon-dashPeca'>
              {this.state.order.acendent ?
                <Icon type="caret-down" /> :
                <Icon type="caret-up" />}
            </div>
            : <div className='div-icon-dashPeca'></div>}
          <h2 className='div-table-label-dashPeca'>Peça</h2>
        </div>
        <div className='div-table-cel-desc-dashPeca'
          onClick={() => this.changeOrder('description')}>
          {this.state.order.field === 'description' ?
            <div className='div-icon-dashPeca'>
              {this.state.order.acendent ?
                <Icon type="caret-down" /> :
                <Icon type="caret-up" />}
            </div>
            : <div className='div-icon-dashPeca'></div>}
          <h2 className='div-table-label-dashPeca'>Descrição</h2>
        </div>
        <div className='div-table-cel-precoCusto-dashPeca'
          onClick={() => this.changeOrder('costPrice')}>
          {this.state.order.field === 'costPrice' ?
            <div className='div-icon-dashPeca'>
              {this.state.order.acendent ?
                <Icon type="caret-down" /> :
                <Icon type="caret-up" />}
            </div>
            : <div className='div-icon-dashPeca'></div>}
          <h2 className='div-table-label-dashPeca'>Custo</h2>
        </div>
        <div className='div-table-cel-precoVenda-dashPeca'
          onClick={() => this.changeOrder('salePrice')}>
          {this.state.order.field === 'salePrice' ?
            <div className='div-icon-dashPeca'>
              {this.state.order.acendent ?
                <Icon type="caret-down" /> :
                <Icon type="caret-up" />}
            </div>
            : <div className='div-icon-dashPeca'></div>}
          <h2 className='div-table-label-dashPeca'>Venda</h2>
        </div>
      </div>
      <div className='div-table-separeteLineMain-dashPeca' />
      {this.state.loading ? <div className='spin-dashPeca'><Spin spinning={this.state.loading} /></div> : null}
      {
        this.state.rows === undefined ? '' : this.state.rows.map((line) =>
          <div className='gerCmp-div-table-list'>
            <div className='gerCmp-div-tableRow' onClick={() => this.openModalDetalhes(line)}>
              <div className='div-table-cel-peca-dashPeca'>
                <label className='div-table-label-dashPeca-cel'>
                  {line.item}
                </label>
              </div>
              <div className='div-table-cel-desc-dashPeca'>
                <label className='div-table-label-dashPeca-cel'>
                  {line.description === '' ? '-' : line.description}
                </label>
              </div>
              <div className='div-table-cel-precoVenda-dashPeca'>
                <label className='div-table-label-dashPeca-cel'>
                  {this.masks(line.salePrice)}
                </label>
              </div>
              <div className='div-table-cel-precoCusto-dashPeca'>
                <label className='div-table-label-dashPeca-cel'>
                  {this.masks(line.costPrice)}
                </label>
              </div>
            </div>
            <div className='gerCmp-div-table-separeteLinerow' />
          </div>
        )
      }
      <div className='div-table-footer-dashPeca'>
        <this.Pages />
      </div>
    </div>
  )


  render() {
    return (
      <div className='div-card-dashPeca'>
        <this.ModalDetalhes />

        <div className='div-comp-Linha div-comp-header'>
          <h1 className='div-comp-title'>Gerenciar peças</h1>
        </div>

        <div className='div-searchMain-dashPeca'>

          <Search className='searchMain-dashPeca'
            placeholder="Digite o que deseja procurar"
            // onSearch={value => console.log(value)}
            size='large'
            name='global'
            value={this.state.global}
            onChange={this.onChange}
          />

          <Button
            type="primary"
            className='buttonAvancado-dashPeca'
            onClick={this.buttonLimpar}
          >
            Limpar
          </Button>

          {this.state.searchAvancado ?
            <Button
              type="primary"
              className='buttonAvancado-dashPeca'
              onClick={this.buttonAvancado}
            >
              Ocultar
          </Button> :
            <Button
              type="primary"
              className='buttonAvancado-dashPeca'
              onClick={this.buttonAvancado}
            >
              Avançado
          </Button>}
        </div>
        {this.state.searchAvancado ? <this.SearchAdvanced /> : null}
        <this.TableParts />

      </div>
    )
  }
}


function mapStateToProps(state) {
  return {
    auth: state.auth,
  }
}

export default connect(mapStateToProps)(DashPeca)