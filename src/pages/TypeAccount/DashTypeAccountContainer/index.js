import React, { Component } from 'react'
import { connect } from 'react-redux'
import './index.css'
import { Input, Card, Checkbox, Button, message } from 'antd';
import { addTypeAccount } from '../../../services/typeAccount'


class DashTypeAccount extends Component {

  state = {
    loading: false,
    messageError: false,
    messageSuccess: false,
    input: '',
    permission: {
      addCompany: false,
      addPart: false,
      addAnalyze: false,
      addEquip: false,
      addEntry: false,
      addEquipType: false,
      tecnico: false,
      addAccessories: false,
      addUser: false,
      addTypeAccount: false,
    },
  }

  success = () => {
    message.success('Tipo de conta cadastrado com sucesso');
  };

  error = () => {
    message.error('Houve uma falha, tente novamente.');
  };

  onChangeInput = (e) => {
    this.setState({
      input: e.target.value
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

  saveTargetTypeAccount = async () => {

    this.setState({
      loading: true,
    })

    const values = {
      typeName: this.state.input,
      addCompany: this.state.permission.addCompany,
      addPart: this.state.permission.addPart,
      addAnalyze: this.state.permission.addAnalyze,
      addEquip: this.state.permission.addEquip,
      addEntry: this.state.permission.addEntry,
      addAccessories: this.state.permission.addAccessories,
      addEquipType: this.state.permission.addEquipType,
      addUser: this.state.permission.addUser,
      addTypeAccount: this.state.permission.addTypeAccount,
      tecnico: this.state.permission.tecnico,
      responsibleUser: this.props.username,
    }

    const resposta = await addTypeAccount(values)

    if (resposta.status === 422 || resposta.status === 409) {

      this.setState({
        messageError: true,
      })
      await this.error()
      this.setState({
        loading: false,
        messageError: false
      })
    } if (resposta.status === 200) {

      this.setState({
        messageSuccess: true,
        input: '',
        permission: {
          addCompany: false,
          addPart: false,
          addAnalyze: false,
          addEquip: false,
          addEntry: false,
          addEquipType: false,
          tecnico: false,
          addAccessories: false,
          addUser: false,
          addTypeAccount: false,
        },
      })
      await this.success()
      this.setState({
        loading: false,
        messageSuccess: false
      })
    }
  }


  render() {
    return (
      <div className='card-bg-dashTypeAccount'>

        <div className='div-comp-Linha div-comp-header'>
          <h1 className='div-comp-title'>Tipo de conta</h1>
        </div>


        <div className='div-form-dashTypeAccount'>

          <div className='div-linhaInput-dashTypeAccount'>
            <h2 className='div-comp-label'>Tipo de conta:</h2>
            <Input
              placeholder="Digite o tipo de conta"
              onChange={this.onChangeInput}
              value={this.state.input}
            />
          </div>

          <div className='div-linhaCheckbox-dashTypeAccount'>
            <h3 className='h3-dashTypeAccount'>Permissões</h3>
            <Card className='card-checkbox-dashTypeAccount'>
              <div className='div-insideCard-dashTypeAccount'>
                <Checkbox className='checkbox-dashTypeAccount' onChange={this.onChangePermission} checked={this.state.permission.addEntry} name='addEntry'>Adicionar entrada</Checkbox>
                <Checkbox className='checkbox-dashTypeAccount' onChange={this.onChangePermission} checked={this.state.permission.addPart} name='addPart'>Adicionar peça</Checkbox>
                <Checkbox className='checkbox-dashTypeAccount' onChange={this.onChangePermission} checked={this.state.permission.addCompany} name='addCompany'>Adicionar empresa</Checkbox>
                <Checkbox className='checkbox-dashTypeAccount' onChange={this.onChangePermission} checked={this.state.permission.addAnalyze} name='addAnalyze'>Adicionar analise</Checkbox>
                <Checkbox className='checkbox-dashTypeAccount' onChange={this.onChangePermission} checked={this.state.permission.addEquip} name='addEquip'>Adicionar equipamento</Checkbox>
                <Checkbox className='checkbox-dashTypeAccount' onChange={this.onChangePermission} checked={this.state.permission.addAccessories} name='addAccessories'>Adicionar acessórios</Checkbox>
                <Checkbox className='checkbox-dashTypeAccount' onChange={this.onChangePermission} checked={this.state.permission.addTypeAccount} name='addTypeAccount'>Adicionar tipo de conta</Checkbox>
                <Checkbox className='checkbox-dashTypeAccount' onChange={this.onChangePermission} checked={this.state.permission.addUser} name='addUser'>Adicionar usuário</Checkbox>
                <Checkbox className='checkbox-dashTypeAccount' onChange={this.onChangePermission} checked={this.state.permission.addEquipType} name='addEquipType'>Adicionar tipo de equipamento</Checkbox>
                <Checkbox className='checkbox-dashTypeAccount' onChange={this.onChangePermission} checked={this.state.permission.tecnico} name='tecnico'>Acesso a tela técnico</Checkbox>
              </div>
            </Card>
          </div>

          <div className='div-linhaButton-dashTypeAccount'>
            <Button type="primary" onClick={this.saveTargetTypeAccount} loading={this.state.loading}>Salvar</Button>
          </div>

        </div>

      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    username: state.auth.username,
  }
}


export default connect(mapStateToProps)(DashTypeAccount)