import React, { Component } from 'react'
import './index.css'
import { Input, Card, Checkbox, Button, message } from 'antd';
import { addTypeAccount } from '../../../services/typeAccount'


class DashTypeAccount extends Component {
  
  state = {
    messageError: false,
    messageSuccess: false,
    input:'',
    permission : {
      addCompany: false,
      addPart: false,
      addAnalyze: false,
      addEquip: false,
      addEntry: false,
    },
  }

  success = () => {
    message.success('Tipo de conta salvo com sucesso');
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
      permission:{
        ...this.state.permission,
        [e.target.name]: e.target.checked
      }
    })
  }

  saveTargetTypeAccount = async () => {
 
    const values = {
      typeName: this.state.input,
      addCompany: this.state.permission.addCompany,
      addPart: this.state.permission.addPart,
      addAnalyze: this.state.permission.addAnalyze,
      addEquip: this.state.permission.addEquip,
      addEntry: this.state.permission.addEntry,
    }

    const resposta = await addTypeAccount (values)

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
        input: '',
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


  render() {
    console.log(this.state)
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
              </div>
            </Card>
          </div>

          <div className='div-linhaButton-dashTypeAccount'>
            <Button type="primary" onClick={this.saveTargetTypeAccount}>Salvar</Button>
          </div>

        </div>

      </div>
    )
  }
}

export default DashTypeAccount