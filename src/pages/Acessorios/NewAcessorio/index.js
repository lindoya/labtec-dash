import React, { Component } from 'react'
import './index.css'

import { Input, Card, Button, message, Spin } from 'antd';
import { newAcessorio, getAllAccessories } from '../../../services/acessorio';



class NewAcessorio extends Component {

  state = {
    loading: false,
    messageError: false,
    messageSuccess: false,
    inputAcessorio: '',
    searchAccessories: '',
    acessoriosList: [
      {

      }
    ],
    rows: [],
  }

  onChangeInputAcessorio = (e) => {
    this.setState({
      inputAcessorio: e.target.value
    })
  }

  success = () => {
    message.success('Empresa cadastrada com sucesso');
  };

  error = () => {
    message.error('O cadastro está inválido.');
  };

  saveTargetNewAcessorio = async () => {
    const values = {
      accessories: this.state.inputAcessorio
    }

    const resposta = await newAcessorio(values)

    console.log(resposta)

    if (resposta.status === 422) {

      this.setState({
        messageError: true,
      })
      await this.error()
      this.setState({
        messageError: false
      })
    } if (resposta.status === 200) {

      this.setState({
        inputAcessorio: '',
        messageSuccess: true,
      })
      await this.success()
      this.setState({
        messageSuccess: false
      })
    }
  }

  getAll = async () => {
    this.setState({
      loading: true,
    })

    await getAllAccessories().then(
      resposta => this.setState({
        rows: resposta.data.rows,
      })
    )

    this.setState({
      loading:false,
    })
  }

  componentDidMount = () => {
    this.getAll()
  }

  render() {
    return (
      <div className='card-bg-newAcessorio'>

        <div className='div-comp-Linha div-comp-header'>
          <h1 className='div-comp-title'>Acessórios</h1>
        </div>

        <div className='form-newAcessorio'>

          <div className='div-acessorio-newAcessorio'>
            <h2 className='div-comp-label'>Novo acessório:</h2>
            <Input
              className='input-cnpj'
              name='numeroSerie'
              placeholder='Digite o nome do acessório'
              value={this.state.inputAcessorio}
              onChange={this.onChangeInputAcessorio}
            />
          </div>

          <div className='div-card-newAcessorio'>
            <h2 className='div-comp-label'>Acessórios cadastrados:</h2>
            <Card className='card-newAcessorio' key='card-accessories'>
              {this.state.loading ? <div className='div-spin-accessories'><Spin spinning={this.state.loading} /></div> : null}
              {this.state.rows.map((line) => <p className='p-newAcessorio'>{line.accessories}</p>)}             
            </Card>
          </div>

          <div className='div-button-newAcessorio'>
            <Button type='primary' onClick={this.saveTargetNewAcessorio}>Salvar</Button>
          </div>

        </div>

      </div>
    )
  }
}

export default NewAcessorio