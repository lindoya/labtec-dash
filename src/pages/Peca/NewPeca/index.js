import React, { Component } from 'react'
import './index.css'
import { Input, Button, Card } from 'antd'


const Search = Input.Search;

class NewPeca extends Component {


  render() {
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
                name='peca'
                // value={this.state.cnpj}
                // onChange={this.onChange}
                // onBlur={this.getRazaoSocial}
                allowClear
              // value={this.props.value.number}
              // onChange={this.props.changeValue}
              />
            </div>

            <div className='div-custo-peca'>
              <h2 className='div-comp-label'>Custo:</h2>
              <Input
                className='input-newEquip'
                placeholder='R$'
                name='custo'
                // value={this.state.cnpj}
                // onChange={this.onChange}
                // onBlur={this.getRazaoSocial}
                allowClear
              // value={this.props.value.number}
              // onChange={this.props.changeValue}
              />
            </div>

            <div className='div-venda-peca'>
              <h2 className='div-comp-label'>Venda:</h2>
              <Input
                className='input-newEquip'
                placeholder='R$'
                name='venda'
                // value={this.state.cnpj}
                // onChange={this.onChange}
                // onBlur={this.getRazaoSocial}
                allowClear
              // value={this.props.value.number}
              // onChange={this.props.changeValue}
              />
            </div>
          </div>

          <div className='div-linha-peca'>

            <div className='div-desc-peca'>
              <h2 className='div-comp-label'>Descrição:</h2>
              <Input
                className='input-newEquip'
                placeholder='Digite a descrição da peça'
                name='desc'
                // value={this.state.cnpj}
                // onChange={this.onChange}
                // onBlur={this.getRazaoSocial}
                allowClear
              // value={this.props.value.number}
              // onChange={this.props.changeValue}
              />
            </div>

          </div>

          <div className='div-linha-peca'>

            <div className='div-relacionar-peca'>
              <h2 className='div-comp-label'>Relacionar peça com um equipamento:</h2>
              <Card className='card-peca'>
                <div className='div-searchCard-peca'>
                  <Search
                    placeholder="input search text"
                    onSearch={value => console.log(value)}
                    style={{ width: '98%' }}
                  />
                </div>
                <div className='div-allCard-peca'>
                <div className='div-tipos-card-pecas'>
                  <h2 className='div-comp-label'>Tipos:</h2>
                  <div className='div-insideCard-pecas'>
                    <p>Relógio</p>
                    <p>Catraca</p>
                    <p>Controle de acesso</p>
                    <p>Peça</p>
                    <p>Sirene</p>
                  </div>
                </div>

                <div className='div-marcas-card-pecas'>
                  <h2 className='div-comp-label'>Marcas:</h2>
                  <div className='div-insideCard-pecas'>
                    <p>Relógio</p>
                    <p>Catraca</p>
                    <p>Controle de acesso</p>
                    <p>Peça</p>
                    <p>Sirene</p>
                  </div>
                </div>

                <div className='div-modelos-card-pecas'>
                  <h2 className='div-comp-label'>Modelos:</h2>
                  <div className='div-insideCard-pecas'>
                    <p>Relógio</p>
                    <p>Catraca</p>
                    <p>Controle de acesso</p>
                    <p>Peça</p>
                    <p>Sirene</p>
                  </div>
                </div>
              </div>
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