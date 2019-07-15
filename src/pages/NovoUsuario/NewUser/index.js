import React, { Component } from 'react'
import './index.css'
import { Input, Select, Card, Checkbox, Button, message } from 'antd';
import { getAllTypeAccount, getPermission } from '../../../services/typeAccount'
import { newUser } from '../../../services/newUser';


const { Option } = Select;

class NewUser extends Component {

  state = {
    messageError: false,
    messageSuccess: true,
    checkboxAble: false,
    change: false,
    inputNewUser: '',
    select: 'Selecione um tipo',
    permission: {
      addCompany: false,
      addPart: false,
      addAnalyze: false,
      addEquip: false,
      addEntry: false,
    },
    rows: []
  }

  handleChange = (typeSelected) => {
    this.setState({
      select: typeSelected
    }, this.getPermissionByTypeAccount)
  }

  onChangeInputNewUser = (e) => {
    this.setState({
      inputNewUser: e.target.value
    })
  }

  onChangePermission = (e) => {

    this.setState({
      permission: {
        ...this.state.permission,
        [e.target.name]: e.target.checked
      }
    })
  }

  ableCheckbox = () => {
    this.setState({
      checkboxAble: !this.state.checkboxAble
    })
  }

  getAllType = async () => {
    await getAllTypeAccount().then(
      resposta => this.setState({
        rows: resposta.data.rows,
      })
    )
  }

  getPermissionByTypeAccount = async () => {
    const resposta = await getPermission({ typeName: this.state.select })

    this.setState({
      permission: resposta.data
    }, console.log(resposta))
  }

  success = () => {
    message.success('Usuário cadastrado com sucesso');
  };

  error = () => {
    message.error('O usuário não foi cadastrado.');
  };


  saveTargetNewUser = async () => {

    const values = {
      username: this.state.inputNewUser,
      typeName: this.state.select,
      customized: this.state.checkboxAble,
      addCompany: this.state.permission.addCompany,
      addPart: this.state.permission.addPart,
      addAnalyze: this.state.permission.addAnalyze,
      addEquip: this.state.permission.addEquip,
      addEntry: this.state.permission.addEntry,
    }

    const resposta = await newUser (values)

    console.log(resposta)

    if (resposta.status === 422 || resposta.status === 409) {

      this.setState({
        messageError: true,
      })
      await this.error()
      this.setState({
        messageError: false
      })
    } if (resposta.status === 200) {

      this.setState({
        messageSuccess: true,
        select: 'Selecione um tipo',
        inputNewUser: '',
        checkboxAble: false,
        permission: {
          addCompany: false,
          addPart: false,
          addAnalyze: false,
          addEquip: false,
          addEntry: false,
        },
      })
      await this.success()
      this.setState({
        messageSuccess: false
      })
    }
  }

  componentDidMount = () => {
    this.getAllType()
  }


  render() {
    console.log(this.state)
    return (
      <div className='card-bg-newUser'>
        
        <div className='div-comp-Linha div-comp-header'>
          <h1 className='div-comp-title'>Novo usuário</h1>
        </div>

        <div className='div-form-newUser'>

          <div className='div-linha-newUser'>

            <div className='div-input-newUser'>

              <h2 className='div-comp-label'>Novo usuário:</h2>

              <Input
                value={this.state.inputNewUser}
                placeholder="Digite o nome do usuário"
                onChange={this.onChangeInputNewUser}
              />

            </div>

            <div className='div-select-newUser'>

              <h2 className='div-comp-label'>Tipo de conta:</h2>

              <Select value={this.state.select} className='select-newUser' onChange={this.handleChange}>
                {this.state.rows.map((type) => <Option value={type.typeName}>{type.typeName}</Option>)}
              </Select>

            </div>

          </div>

          <div className='div-linhaCheckbox-newUser'>
            <div className='div-h3-newUser'>
              <h3 className='h3-newUser'>{this.state.checkboxAble ? 'Permissões customizadas' : 'Permissões padrão'}</h3>
            </div>
            <div className='div-habilitarCustom-newUser'>
              <Checkbox onChange={this.ableCheckbox} checked={this.state.checkboxAble}>Habilitar customização</Checkbox>
            </div>
            <Card className='card-checkbox-newUser'>
              {this.state.checkboxAble === false ? <div className='div-insideCard-newUser'><Checkbox className='checkbox-newUser' onChange={this.onChangePermission} checked={this.state.permission.addEntry} name='addEntry' disabled>Adicionar entrada</Checkbox>
                <Checkbox className='checkbox-newUser' onChange={this.onChangePermission} checked={this.state.permission.addPart} name='addPart' disabled>Adicionar peça</Checkbox>
                <Checkbox className='checkbox-newUser' onChange={this.onChangePermission} checked={this.state.permission.addCompany} name='addCompany' disabled>Adicionar empresa</Checkbox>
                <Checkbox className='checkbox-newUser' onChange={this.onChangePermission} checked={this.state.permission.addAnalyze} name='addAnalyze' disabled>Adicionar analise</Checkbox>
                <Checkbox className='checkbox-newUser' onChange={this.onChangePermission} checked={this.state.permission.addEquip} name='addEquip' disabled>Adicionar equipamento</Checkbox> </div> : <div className='div-insideCard-newUser'>
                <Checkbox className='checkbox-newUser' onChange={this.onChangePermission} checked={this.state.permission.addEntry} name='addEntry'>Adicionar entrada</Checkbox>
                <Checkbox className='checkbox-newUser' onChange={this.onChangePermission} checked={this.state.permission.addPart} name='addPart'>Adicionar peça</Checkbox>
                <Checkbox className='checkbox-newUser' onChange={this.onChangePermission} checked={this.state.permission.addCompany} name='addCompany'>Adicionar empresa</Checkbox>
                <Checkbox className='checkbox-newUser' onChange={this.onChangePermission} checked={this.state.permission.addAnalyze} name='addAnalyze'>Adicionar analise</Checkbox>
                <Checkbox className='checkbox-newUser' onChange={this.onChangePermission} checked={this.state.permission.addEquip} name='addEquip'>Adicionar equipamento</Checkbox> </div>}
            </Card>
          </div>

          <div className='div-linhaButton-newUser'>
            <Button type="primary" onClick={this.saveTargetNewUser}>Salvar</Button>
          </div>

        </div>

      </div>
    )
  }
}

export default NewUser