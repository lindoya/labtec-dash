import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Select, Input, Button, Icon, Modal, Spin, message } from 'antd'
import { getAllEquip, updateEquip } from '../../../services/equip'
import { validators, masks } from '../NewEquipContainer/validator'
import { getAllMarkByTypeService, getAllModelByMarkService } from '../../../services/equip'


import './index.css'
import { from } from 'rxjs';

const { Search } = Input;
const { Option } = Select;


class DashEquip extends Component {

  state = {
    loading: false,
    editar: false,
    modalDetalhes: false,
    searchAvancado: false,
    order: {
      field: 'serialNumber',
      acendent: true,
    },
    equipSelected: {
      razaoSocial: '',
      cnpj: '',
      street: '',
      number: '',
      city: '',
      state: '',
      neighborhood: '',
      referencePoint: '',
      zipCode: '',
      telphone: '',
      email: '',
      nameContact: '',
      type: '',
      mark: '',
      model: '',
      description: '',
      serialNumber: '',
      readerColor: '',
      details: '',
    },
    equipSelectedUpdate: {
      type: '',
      mark: '',
      model: '',
      serialNumber: '',
      readerColor: '',
    },
    message:{
      serialNumber: '',
      leitor: '',
      type: '',
      mark:'',
      model:'',
    },
    fieldFalha:{
      serialNumber: false,
      leitor: false,
      type: false,
      mark:false,
      model:false,
    },
    marksList: [],
    modelsList: [],
    global: '',
    serialNumber: '',
    cnpj: '',
    razaoSocial: '',
    typeSearch: '',
    type: 'Escolha o tipo',
    mark: '',
    model: '',
    leitor: 'Escolha o leitor',
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
    let leitor = null
    let typeSearch = null

    if (this.state.leitor === 'Todos' || this.state.leitor === 'Escolha o leitor' ) {
      leitor = ''
    } else {
      leitor = this.state.leitor
    }

    if (this.state.typeSearch === 'Escolha o tipo') {
      typeSearch = ''
    } else {
      typeSearch = this.state.typeSearch
    }

    const query = {
      filters: {
        equip: {
          global: {
            fields: ['serialNumber'],
            value: this.state.global,
          },
          specific: {
            serialNumber: this.state.serialNumber,
            readerColor: leitor,
          },
        },
        company: {
          // global: {
          //   fields: ['cnpj'],
          //   value: this.state.global,
          // },
          specific: {
            cnpj: this.state.cnpj,
            razaoSocial: this.state.razaoSocial,
          },
        },
        equipModel: {
          specific: {
            model: this.state.model,
          },
        },
        equipMark: {
          specific: {
            mark: this.state.mark,
          },
        },
        equipType: {
          specific: {
            type: typeSearch,
          },
        },
      },
      page: this.state.page,
      total: this.state.total,
      order: this.state.order,
    }

    await getAllEquip(query).then(
      resposta => this.setState({
        loading: false,
        page: resposta.data.page,
        count: resposta.data.count,
        show: resposta.data.show,
        rows: resposta.data.rows,
      })
    )
  }

  getAllMarkByType = async () => {
    const type = this.state.equipSelectedUpdate.type

    if (type !== 'catraca'
      &&  type !== 'relogio'
      &&  type !== 'controleAcesso'
      &&  type !== 'peca'
      &&  type !== 'sirene'){
        this.setState({
          marksList: []
        })
        return
    }

    const resposta = await getAllMarkByTypeService({ type })

    this.setState({
      marksList: resposta.data
    })
  }

  getAllModelByMark = async () => {
    const mark = this.state.equipSelectedUpdate.mark
    const type = this.state.equipSelectedUpdate.type

    if (this.state.fieldFalha.mark) {
        this.setState({
          modelsList: []
        })
        return
    }

    const resposta = await getAllModelByMarkService({ mark, type })
    this.setState({
      modelsList: resposta.data
    })
  }

  onBlurValidator = async(e) => {
    const { 
      nome,
      valor,
      fieldFalha,
      message,
    } = validators(e.target.name, e.target.value, this.state)
    
    await this.setState({
      [ nome ]: valor,
      fieldFalha,
      message
    })
    this.getAllMarkByType()
    this.getAllModelByMark()

  }

  // onBlurModalMarl = async(e) => {
  //   const { 
  //     nome,
  //     valor,
  //     fieldFalha,
  //     message,
  //   } = validators(e.target.name, e.target.value, this.state)
    
  //   this.setState({
  //     [ nome ]: valor,
  //     fieldFalha,
  //     message
  //   }, this.getAllMarkByType)

  // }

  success = () => {
    message.success('Dados alterados com sucesso');
  };
  
  error = () => {
    message.error('Seus dados não foram alterados');
  };

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
      serialNumber: '',
      cnpj: '',
      razaoSocial: '',
      type: 'Escolha o tipo',
      mark: '',
      model: '',
      leitor: 'Escolha o leitor',
    }, () => {
      this.getAll()
    })
  }

  changeTotal = (value) => {
    this.setState({
      total: value,
      page: 1,
    }, () => {
      this.getAll()
    })
  }

  onChange = (e) => {
    const evento = e.target

    this.setState({
      [evento.name]: evento.value,
    }, () => {
      this.getAll()
    })
  }
  
  editarAble = () => {
    this.setState({
      editar: !this.state.editar
    })
  }

  validatorsType = (valor) => {
    let value = valor

    value = value.toLowerCase()
    value = value.replace(/de/gi, '')
    value = value.replace(/\s/gi, '')
    value = value.replace(/[é]/gi, 'e')
    value = value.replace(/[ó]/gi, 'o')
    value = value.replace(/[ç]/gi, 'c')

    if (value === 'controleacesso') value = 'controleAcesso'

    return value
  }

  onChangeEditar = (e) => {
    const  { nome,
      valor,
    } = masks(e.target.name, e.target.value)

    let value

    if (nome === 'type') {
      value = this.validatorsType(valor)
    } else {
      value = valor
    } 

    this.setState({
      equipSelected:{
        ...this.state.equipSelected,
        [ nome ]: valor
      },
      equipSelectedUpdate:{
        ...this.state.equipSelectedUpdate,
        [ nome ]: value,
      },
    })

    // this.setState({
    //   equipSelected:{
    //     ...this.state.equipSelected,
    //     [e.target.name]: e.target.value
    //   }
    // })
  }

  handleChangeLeitor= (value) => {
    this.setState({
      equipSelected:{
        ...this.state.equipSelected,
        readerColor: value,
      },
      equipSelectedUpdate:{
        ...this.state.equipSelectedUpdate,
        readerColor: value,
      },
    });
  }


  changePages = (pages) => {
    this.setState({
      page: pages
    }, () => {
      this.getAll()
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

  onChangeTipo = (valueSelected) => {

    if (valueSelected === "Escolha o tipo" || valueSelected === "Todos" ) {
      this.setState({
        typeSearch: '',
      })
    } else {
      this.setState({
        typeSearch: valueSelected.toLowerCase(),
      })
    }


    this.setState({
      type: valueSelected
    }, () => {
      this.getAll()
    })
  }

  onChangeLeitor = (value) => {
    this.setState({
      leitor: value
    }, () => {
      this.getAll()
    })
  }

  openModalDetalhes = async(equipamento) => {
    await this.setState({
      modalDetalhes: true,
      equipSelected: equipamento,
      equipSelectedUpdate: {
        type: equipamento.type,
        mark: equipamento.mark,
        model: equipamento.model,
        serialNumber: equipamento.serialNumber,
        readerColor: equipamento.readerColor,
      },
    })
    this.getAllMarkByType()
    this.getAllModelByMark()
  }

  okModalDetalhes = () => {
    this.setState({
      modalDetalhes: false,
      editar: false
    })
  }

  cancelModalDetalhes = () => {
    this.setState({
      equipSelectedUpdate: {
        type: '',
        mark: '',
        model: '',
        serialNumber: '',
        readerColor: '',
      },
      marksList:[],
      modelsList:[],
      modalDetalhes: false,
      editar: false,
      fieldFalha:{
        serialNumber: false,
        leitor: false,
        type: false,
        mark:false,
        model:false,
      },
    })
  }

  handleOk = () => {
    this.setState({
      modalDetalhes: !this.state.modalDetalhes,
      editar: false,
      fieldFalha:{
        serialNumber: false,
        leitor: false,
        type: false,
        mark:false,
        model:false,
      },
    })
  }

  buttonEditar = () => {
    this.setState({
      editar: !this.state.editar
    })
  }

  
  onFocusModel = (e) => {
    const { nome,
      valor,
    } = masks(e.target.name, e.target.value)

    const { fieldFalha } = this.state

    if (nome === 'serialNumber') fieldFalha.serialNumber = false
    if (nome === 'type') fieldFalha.type = false
    if (nome === 'mark') fieldFalha.mark = false
    if (nome === 'model') fieldFalha.model = false
    if (nome === 'readerColor') fieldFalha.readerColor = false

    this.setState({
      equipSelectedUpdate: {
        ...this.state.equipSelectedUpdate,
        [ nome ]: valor,
      },
      equipSelected: {
        ...this.state.equipSelected,
        [ nome ]: valor,
      },
      fieldFalha,
    })
  }

  saveTargetUpdateEquip = async () => {
    this.setState({
      loading:true

    })
    const values = {
      id: this.state.equipSelected.id,
      serialNumber: this.state.equipSelected.serialNumber,
      readerColor: this.state.equipSelected.readerColor,
      type: this.state.equipSelected.type,
      mark: this.state.equipSelected.mark,
      model: this.state.equipSelected.model,
    }

    // console.log(this.state.fieldFalha)
    if(this.state.fieldFalha.serialNumber 
      || this.state.fieldFalha.leitor
      || this.state.fieldFalha.type
      || this.state.fieldFalha.mark
      || this.state.fieldFalha.model) {
        this.setState({
          loading: false,
          messageError: true,
        })
        return
      }

    const resposta = await updateEquip(values)

    // console.log(

    if (resposta.status === 422) {

      this.setState({
        loading: false,
        messageError: true,
        fieldFalha: resposta.data.fields[0].field,
        message: resposta.data.fields[0].message,
      })
      await this.error()
      this.setState({
        loading: false,
        messageError: false
      })
    } if (resposta.status === 200) {

      this.setState({
        equipSelected: {
          razaoSocial: '',
          cnpj: '',
          street: '',
          number: '',
          city: '',
          state: '',
          neighborhood: '',
          referencePoint: '',
          zipCode: '',
          telphone: '',
          email: '',
          nameContact: '',
          type: '',
          mark: '',
          model: '',
          description: '',
          serialNumber: '',
          readerColor: '',
          details: '',
        },
        messageSuccess: true,
        editar: !this.state.editar,
        modalDetalhes: false
      })
      
      await this.success()
      this.setState({
        messageSuccess: false,
        loading:false,
      })
      await this.getAll()
    }
  }

  Pages = () => (

    <div className='gerCmp-div-table-footer'>
      {Math.ceil(this.state.count/this.state.total) >= 5 && Math.ceil(this.state.count/this.state.total)-this.state.page < 1? <Button type="primary" onClick={() => this.changePages(this.state.page-4)}>{this.state.page-4}</Button> : ''}
      {Math.ceil(this.state.count/this.state.total) >= 4 && Math.ceil(this.state.count/this.state.total)-this.state.page < 2 && this.state.page >3? <Button type="primary" onClick={() => this.changePages(this.state.page-3)}>{this.state.page-3}</Button> : ''}
      {this.state.page >= 3? <Button type="primary" onClick={() => this.changePages(this.state.page-2)}>{this.state.page-2}</Button> : ''}
      {this.state.page >= 2? <Button type="primary" onClick={() => this.changePages(this.state.page-1)}>{this.state.page-1}</Button> :''}
      <div className='div-buttonSelected-dashEquip' type="primary">{this.state.page}</div>
      {this.state.page < (this.state.count/this.state.total)? <Button type="primary" onClick={() => this.changePages(this.state.page+1)}>{this.state.page+1}</Button> :''}
      {this.state.page+1 < (this.state.count/this.state.total)? <Button type="primary" onClick={() => this.changePages(this.state.page+2)}>{this.state.page+2}</Button> :''}
      {this.state.page+2 < (this.state.count/this.state.total) && this.state.page < 3? <Button type="primary" onClick={() => this.changePages(this.state.page+3)}>{this.state.page+3}</Button> : ''}
      {this.state.page+3 < (this.state.count/this.state.total) && this.state.page < 2? <Button type="primary" onClick={() => this.changePages(this.state.page+4)}>{this.state.page+4}</Button> : ''}
    </div>
  )

  SearchAdvanced = () => (
    <div className='div-searchAdvanced-dashEquip'>
      <div className='div-advanced-dashEquip'>

        <div className='div-avancado-serialNumber-dashEquip'>
          <h2 className='gerCmp-div-label'>Número de série:</h2>
          <Input
            allowClear
            name='serialNumber'
            // className='input-cnpjCompany'
            placeholder="Digite o número"
            value={this.state.serialNumber}
            onChange={this.onChange}
          />
        </div>
        <div className='div-avancado-cnpj-dashEquip'>
          <h2 className='gerCmp-div-label'>Cnpj:</h2>
          <Input
            allowClear
            name='cnpj'
            className='input-cnpjCompany'
            placeholder="Digite o cnpj"
            value={this.state.cnpj}
            onChange={this.onChange}
          />
        </div>
        <div className='div-avancado-razaoSocial-dashEquip'>
          <h2 className='gerCmp-div-label'>Razão social:</h2>
          <Input
            allowClear
            name='razaoSocial'
            className='input-cnpjCompany'
            placeholder="Digite a razão social"
            value={this.state.razaoSocial}
            onChange={this.onChange}
          />
        </div>
      </div>
      <div className='div-advanced-dashEquip'>
        <div className='div-avancado-tipo-dashEquip'>
          <h2 className='gerCmp-div-label'>Tipo:</h2>
          <Select
            defaultValue={this.state.type}
            value={this.state.type}
            style={{ width: '100%' }}
            onChange={this.onChangeTipo}
          >
            <Option value="Todos">Todos</Option>
            <Option value="Relogio">Relógio</Option>
            <Option value="Catraca">Catraca</Option>
            <Option value="ControleAcesso">Controle de Acesso</Option>
            <Option value="Peca">Peça</Option>
            <Option value="Sirene">Sirene</Option>
          </Select>
        </div>
        <div className='div-avancado-marca-dashEquip'>
          <h2 className='gerCmp-div-label'>Marca:</h2>
          <Input
            allowClear
            name='mark'
            className='input-cnpjCompany'
            placeholder="Digite a marca"
            value={this.state.mark}
            onChange={this.onChange}
          />
        </div>

        <div className='div-avancado-modelo-dashEquip'>
          <h2 className='gerCmp-div-label'>Modelo:</h2>
          <Input
            allowClear
            name='model'
            className='input-cnpjCompany'
            placeholder="Digite o modelo"
            value={this.state.model}
            onChange={this.onChange}
          />
        </div>
        <div className='div-avancado-leitor-dashEquip'>
          <h2 className='gerCmp-div-label'>Leitor:</h2>
          <Select defaultValue={this.state.leitor} style={{ width: '100%' }} value={this.state.leitor} onChange={(value) => this.onChangeLeitor(value)}>
            <Option value="Todos">Todos</Option>
            <Option value="Branco">Branco</Option>
            <Option value="Vermelho">Vermelho</Option>
            <Option value="Azul">Azul</Option>
            <Option value="Verde">Verde</Option>
            <Option value="DedoVivo">Dedo vivo</Option>
            <Option value="BioLFD">BioLFD</Option>
            <Option value="BioLC">BioLC</Option>
            <Option value="NaoSeAplica">Não se aplica</Option>
          </Select>
        </div>
      </div>
    </div>
  )

  ModalDetalhes = () => (
    // <Modal
    //   title="Detalhes do equipamento"
    //   visible={this.state.modalDetalhes}
    //   onOk={this.okModalDetalhes}      
    //   onCancel={this.cancelModalDetalhes}
    // >

    <Modal
      title="Detalhes do equipamento"
      visible={this.state.modalDetalhes}
      onCancel={this.cancelModalDetalhes}
      footer={this.props.auth.addEquip ? (
          <div className='gercomp-div-button-modal'>
            {this.state.editar === false ?  
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
                onClick={this.saveTargetUpdateEquip}
                loading={this.state.loading}
              >
                Salvar
                <Icon type="check" />
              </Button>
            </div>
            }          
        </div>
       )
       :null}
    >


      <div className='div-form-modal-dashEquip'>
        <h3 className='h3-modal-dashEquip'>Dados do equipamento</h3>
        <div className='div-linhaModal-dashEquip'>
          <div className='div-textSerialNumber-modal-dashEquip'>
            Número de série
            {this.state.editar === false ? <p className='gercomp-p'>{this.state.equipSelected.serialNumber}</p> : <Input
              name='serialNumber'
              // className='gerComp-inputModal'
              className={
                this.state.fieldFalha.serialNumber ?
                  'div-dashEquip-inputModal-inputError' :
                  'div-dashEquip-inputModal'}
              value={this.state.equipSelected.serialNumber}
              onChange={this.onChangeEditar}
              onBlur={this.onBlurValidator}
              onFocus={this.onFocusModel}
            />}
            {this.state.fieldFalha.serialNumber ?
                <p className='div-comp-feedbackError'>
                  {this.state.message.serialNumber}
                </p> : null}
          </div>
          <div className='div-textType-modal-dashEquip'>
            Tipo
            {this.state.editar === false ? <p className='gercomp-p'>{this.state.equipSelected.type}</p> : <Input
              name='type'
              className={
                this.state.fieldFalha.type ?
                  'div-dashEquip-inputModal-inputError' :
                  'div-dashEquip-inputModal'}
              value={this.state.equipSelected.type}
              onChange={this.onChangeEditar}
              onBlur={this.onBlurValidator}
              onFocus={this.onFocusModel}
            />}
            {this.state.fieldFalha.type ?
                <p className='div-comp-feedbackError'>
                  {this.state.message.type}
                </p> : null}
          </div>
          <div className='div-textMark-modal-dashEquip'>
            Marca
            {this.state.editar === false ? <p className='gercomp-p'>{this.state.equipSelected.mark}</p> : <Input
              name='mark'
              className={
                this.state.fieldFalha.mark ?
                  'div-dashEquip-inputModal-inputError' :
                  'div-dashEquip-inputModal'}
              value={this.state.equipSelected.mark}
              onChange={this.onChangeEditar}
              onBlur={this.onBlurValidator}
              onFocus={this.onFocusModel}
            />}
            {this.state.fieldFalha.mark ?
                <p className='div-comp-feedbackError'>
                  {this.state.message.mark}
                </p> : null}
          </div>
        </div>
        <div className='div-linhaModal2-dashEquip'>
          <div className='div-textModel-modal-dashEquip'>
            Modelo
            {this.state.editar === false ? <p className='gercomp-p'>{this.state.equipSelected.model}</p> : <Input
              name='model'
              className={
                this.state.fieldFalha.model ?
                  'div-dashEquip-inputModal-inputError' :
                  'div-dashEquip-inputModal'}
              value={this.state.equipSelected.model}
              onChange={this.onChangeEditar}
              onBlur={this.onBlurValidator}
              onFocus={this.onFocusModel}
            />}
            {this.state.fieldFalha.model ?
                <p className='div-comp-feedbackError'>
                  {this.state.message.model}
                </p> : null}
          </div>
          <div className='div-textLeitor-modal-dashEquip'>
            Leitor
            {this.state.editar === false ? <p className='gercomp-p'>{this.state.equipSelected.readerColor}</p> : 
            // <Input
            //   name='readerColor'
            //   className={
            //     this.state.fieldFalha.readerColor ?
            //       'div-dashEquip-inputModal-inputError' :
            //       'div-dashEquip-inputModal'}
            //   value={this.state.equipSelected.readerColor}
            //   onChange={this.onChangeEditar}
            //   onBlur={this.onBlurValidator}
            //   onFocus={this.onFocusModel}
            // />
            <Select value={this.state.equipSelected.readerColor} style={{ width: '100%' }} onChange={(value) => this.handleChangeLeitor(value)}>
                <Option value="Branco">Branco</Option>
                <Option value="Vermelho">Vermelho</Option>
                <Option value="Azul">Azul</Option>
                <Option value="Verde">Verde</Option>
                <Option value="DedoVivo">Dedo vivo</Option>
                <Option value="BioLFD">BioLFD</Option>
                <Option value="BioLC">BioLC</Option>
                <Option value="NaoSeAplica">Não se aplica</Option>
              </Select>
            }
            {this.state.fieldFalha.readerColor ?
                <p className='div-comp-feedbackError'>
                  {this.state.message.readerColor}
                </p> : null}
          </div>
        </div>
        <h3 className='h3-modal-dashEquip'>Dados da empresa</h3>
        <div className='div-linhaModal2-dashEquip'>
          <div className='div-textCnpj-modal-dashEquip'>
            Cnpj
        <p className='p-dashEquip'>{this.state.equipSelected.cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5')}</p>
          </div>
          <div className='div-textRazaoSocial-modal-dashEquip'>
            Razão social
        <p className='p-dashEquip'>{this.state.equipSelected.razaoSocial}</p>
          </div>
        </div>
        <div className='div-linhaModal-dashEquip'>
          <div className='div-textCep-modal-dashEquip'>
            Cep
        <p className='p-dashEquip'>{this.state.equipSelected.zipCode.replace(/(\d{5})(\d{3})?/, '$1-$2')}</p>
          </div>
          <div className='div-textRua-modal-dashEquip'>
            Rua
        <p className='p-dashEquip'>{this.state.equipSelected.street}</p>
          </div>
          <div className='div-textNumero-modal-dashEquip'>
            Número
        <p className='p-dashEquip'>{this.state.equipSelected.number}</p>
          </div>
          <div className='div-textBairro-modal-dashEquip'>
            Bairro
        <p className='p-dashEquip'>{this.state.equipSelected.neighborhood}</p>
          </div>
        </div>
        <div className='div-linhaModal-dashEquip'>
          <div className='div-textCity-modal-dashEquip'>
            Cidade
        <p className='p-dashEquip'>{this.state.equipSelected.city}</p>
          </div>
          <div className='div-textState-modal-dashEquip'>
            Estado
        <p className='p-dashEquip'>{this.state.equipSelected.state}</p>
          </div>
          <div className='div-textRef-modal-dashEquip'>
            Ponto de referência
        <p className='p-dashEquip'>{this.state.equipSelected.referencePoint === null ? '-' : this.state.equipSelected.referencePoint}</p>
          </div>
        </div>
        <h3 className='h3-modal-dashEquip'>Dados do cliente</h3>
        <div className='div-linhaModal-dashEquip'>
          <div className='div-textNome-modal-dashEquip'>
            Nome
        <p className='p-dashEquip'>{this.state.equipSelected.nameContact}</p>
          </div>
          <div className='div-textEmail-modal-dashEquip'>
            Email
        <p className='p-dashEquip'>{this.state.equipSelected.email}</p>
          </div>
          <div className='div-textTel-modal-dashEquip'>
            Telefone
        <p className='p-dashEquip'>{this.state.equipSelected.telphone.lenth === 10 ? this.state.equipSelected.telphone.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3') : this.state.equipSelected.telphone.replace(/(\d{2})(\d{5})(\d{1,4})/, '($1) $2-$3')}</p>
          </div>
        </div>
      </div>
    </Modal>
  )


  TableEquips = () => (
    <div className='div-mainHeader-dashEquip'>
      <div className='div-table-information-dashEquip'>
        <div className='div-table-information-total-dashEquip'>
          <label className='label-table-information-dashEquip'>
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
        <div className='div-table-information-count-dashEquip'>
          <label className='label-table-information-dashEquip'>
            Mostrando sla quantos
            {/* {`Mostrando ${this.state.show}/${this.state.count} empresas.`} */}
          </label>
        </div>
      </div>
      <div className='div-table-separeteLineMain-dashEquip' />
      <div className='div-table-header-dashEquip'>
        <div className='div-table-cel-serialNumber-dashEquip'
          onClick={() => this.changeOrder('serialNumber')}
        >
          {this.state.order.field === 'serialNumber' ?
            <div className='div-icon-dashEquip'>
              {this.state.order.acendent ?
                <Icon type="caret-down" /> :
                <Icon type="caret-up" />}
            </div>
            : <div className='div-icon-dashEquip'></div>}
          <h2 className='div-table-label-dashEquip'>Número de série</h2>
        </div>
        <div className='div-table-cel-cnpj-dashEquip'
          onClick={() => this.changeOrder('cnpj')}>
          {this.state.order.field === 'cnpj' ?
            <div className='div-icon-dashEquip'>
              {this.state.order.acendent ?
                <Icon type="caret-down" /> :
                <Icon type="caret-up" />}
            </div>
            : <div className='div-icon-dashEquip'></div>}
          <h2 className='div-table-label-dashEquip'>Cnpj</h2>
        </div>
        <div className='div-table-cel-razaoSocial-dashEquip'
          onClick={() => this.changeOrder('razaoSocial')}>
          {this.state.order.field === 'razaoSocial' ?
            <div className='div-icon-dashEquip'>
              {this.state.order.acendent ?
                <Icon type="caret-down" /> :
                <Icon type="caret-up" />}
            </div>
            : <div className='div-icon-dashEquip'></div>}
          <h2 className='div-table-label-dashEquip'>Razao social</h2>
        </div>
        <div className='div-table-cel-tipo-dashEquip'
          onClick={() => this.changeOrder('tipo')}>
          {this.state.order.field === 'tipo' ?
            <div className='div-icon-dashEquip'>
              {this.state.order.acendent ?
                <Icon type="caret-down" /> :
                <Icon type="caret-up" />}
            </div>
            : <div className='div-icon-dashEquip'></div>}
          <h2 className='div-table-label-dashEquip'>Tipo</h2>
        </div>
        <div className='div-table-cel-marca-dashEquip'
          onClick={() => this.changeOrder('marca')}>
          {this.state.order.field === 'marca' ?
            <div className='div-icon-dashEquip'>
              {this.state.order.acendent ?
                <Icon type="caret-down" /> :
                <Icon type="caret-up" />}
            </div>
            : <div className='div-icon-dashEquip'></div>}
          <h2 className='div-table-label-dashEquip'>Marca</h2>
        </div>
        <div className='div-table-cel-modelo-dashEquip'
          onClick={() => this.changeOrder('modelo')}>
          {this.state.order.field === 'modelo' ?
            <div className='div-icon-dashEquip'>
              {this.state.order.acendent ?
                <Icon type="caret-down" /> :
                <Icon type="caret-up" />}
            </div>
            : <div className='div-icon-dashEquip'></div>}
          <h2 className='div-table-label-dashEquip'>Modelo</h2>
        </div>
      </div>
      <div className='div-table-separeteLineMain-dashEquip' />
      {this.state.loading ? <div className='spin-dashEquip'><Spin spinning={this.state.loading}/></div> : null}
      {this.state.rows?
        this.state.rows.map((line) =>
          <div className='div-table-list-dashEquip'>
            <div className='div-tableRow-dashEquip' onClick={() => this.openModalDetalhes(line)}>

              <div className='div-table-cel-serialNumber-dashEquip'>
                <label className='div-table-label-cel-dashEquip'>
                  {line.serialNumber}
                </label>
              </div>
              <div className='div-table-cel-cnpj-dashEquip'>
                <label className='div-table-label-cel-dashEquip'>
                  {line.cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5')}
                </label>
              </div>
              <div className='div-table-cel-razaoSocial-dashEquip'>
                <label className='div-table-label-cel-dashEquip'>
                  {line.razaoSocial}
                </label>
              </div>
              <div className='div-table-cel-tipo-dashEquip'>
                <label className='div-table-label-cel-dashEquip'>
                  {line.type}
                </label>
              </div>
              <div className='div-table-cel-marca-dashEquip'>
                <label className='div-table-label-cel-dashEquip'>
                  {line.mark}
                </label>
              </div>
              <div className='div-table-cel-modelo-dashEquip'>
                <label className='div-table-label-cel-dashEquip'>
                  {line.model}
                </label>
              </div>
            </div>
            <div className='div-table-separeteLinerow-dashEquip' />
          </div>
        )
        : ''
      }
      <div className='gerCmp-div-table-footer'>
       <this.Pages/>
      </div>
    </div>
  )


  render() {
    console.log(this.state)
    return (
      <div className='div-comp-card'>
        <this.ModalDetalhes />

        <div className='div-comp-Linha div-comp-header'>
          <h1 className='div-comp-title'>Gerenciar equipamentos</h1>
        </div>

        <div className='div-searchMain-dashEquip'>

          <Search className='searchMain-dashEquip'
            placeholder="Digite o que deseja procurar"
            // onSearch={value => console.log(value)}
            size='large'
            name='global'
            value={this.state.global}
            onChange={this.onChange}
          />

          <Button
            type="primary"
            className='buttonAvancado-dashEquip'
            onClick={this.buttonLimpar}
          >
            Limpar
          </Button>

          {this.state.searchAvancado ?
            <Button
              type="primary"
              className='buttonAvancado-dashEquip'
              onClick={this.buttonAvancado}
            >
              Ocultar
          </Button> :
            <Button
              type="primary"
              className='buttonAvancado-dashEquip'
              onClick={this.buttonAvancado}
            >
              Avançado
          </Button>}
        </div>
        {this.state.searchAvancado ? <this.SearchAdvanced /> : null}
        <this.TableEquips />

      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    auth: state.auth,
  }
}

export default connect (mapStateToProps)(DashEquip)