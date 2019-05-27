import React, { Component } from 'react'
import { Table, Input, Button, DatePicker } from 'antd';
import 'antd/dist/antd.css';
import './index.css'


const Search = Input.Search;

const columns = [
  {
    title: 'Cnpj',
    dataIndex: 'cnpj',
  },
  {
    title: 'Razão social',
    dataIndex: 'razaoSocial',
  },
  {
    title: 'Criado em',
    dataIndex: 'createdAt',
  },
  {
    title: 'Nome contato',
    dataIndex: 'contactName',
  },
  {
    title: 'Telefone',
    dataIndex: 'telphone',
  },
];
const data = [
  {
    key: '1',
    cnpj: '56.237.000/0001-64',
    razaoSocial: 'Teste Teste TETTTTTTTTT TTTTTTTTTTTT TTTTTTTTTT YYYYYYYYYYY YYYYYYY YYYYY',
    createdAt: '20-11-2001',
    contactName: 'Guilherme',
    telphone: '(11)99999-9999'
  },
  {
    key: '2',
    cnpj: '56.237.000/0001-64',
    razaoSocial: 'Teste Teste',
    createdAt: '20-11-2001',
    contactName: 'Guilherme',
    telphone: '(11)99999-9999'
  },
  {
    key: '3',
    cnpj: '56.237.000/0001-64',
    razaoSocial: 'Teste Teste',
    createdAt: '20-11-2001',
    contactName: 'Guilherme',
    telphone: '(11)99999-9999'
  },
];

class NewCompany extends Component {

  state={
    avancado: false,
  }

  buttonAvancado = () => {
    this.setState({
      avancado: !this.state.avancado
    })
  }

  render() {
    if(this.state.avancado === true){
    return (
      <div className='div-card-newCompany'>
       <div className='div-comp-Linha div-comp-header'>
          <h1 className='div-comp-title'>Gerenciar Empresas</h1>
        </div>
        <div className='div-search-newCompany'>
          <div className='div-buttonAndSearch'>
          <Search className='search-newCompany' 
            placeholder="Digite o que deseja procurar" 
            onSearch={value => console.log(value)} 
            size='large' 
          />
          <Button
            onClick={this.buttonAvancado}
            className='button-dashCompany'
            type='primary'>
            Ocultar
          </Button>
        </div>
        <div className='div-linha1'>
        <div className='div-cnpj-linha1'>
        <h2 className='div-comp-label'>Cnpj:</h2>
        <Input
          allowClear
          className='input-cnpjCompany'
          placeholder="Digite o cnpj"
        />
        </div>  
        <div className='div-rs-linha1'>
        <h2 className='div-comp-label'>Razão social:</h2>
        <Input
          allowClear
          className='input-cnpjCompany'
          placeholder="Digite a razão social"
        />
        </div>
        <div className='div-createdAt-linha1'>
        <h2 className='div-comp-label'>Criado em:</h2>
        <DatePicker 
          placeholder='Digite a data'
          format='DD/MM/YYYY'
          dropdownClassName='poucas'
        />
        </div>
        </div>
        <div className='div-linha2'>
        <div className='div-nome-linha1'>
        <h2 className='div-comp-label'>Nome contato:</h2>
        <Input
          allowClear
          className='input-cnpjCompany'
          placeholder="Digite o nome"
        />
        </div>
        <div className='div-tel-linha1'>
        <h2 className='div-comp-label'>Telefone:</h2>
        <Input
          allowClear
          className='input-cnpjCompany'
          placeholder="Digite o tel"
        />
        </div>
        </div>      
        </div>
        <div className='div-table-newCompany'>
          <Table columns={columns} dataSource={data} size="middle" />
        </div>
      </div>
    )
    }else{
      return(
        <div className='div-card-newCompany'>
        <div className='div-comp-Linha div-comp-header'>
           <h1 className='div-comp-title'>Gerenciar Empresas</h1>
         </div>
         <div className='div-searchNormal-newCompany'>
           <div className='div-buttonAndSearch'>
           <Search className='search-newCompany' 
             placeholder="Digite o que deseja procurar" 
             onSearch={value => console.log(value)} 
             size='large' 
           />
           <Button
              onClick={this.buttonAvancado}
              className='button-dashCompany'
              type='primary'>
              Avançado
           </Button>
         </div>
         </div>
         <div className='div-tableNormal-newCompany'>
           <Table columns={columns} dataSource={data} size="middle" />
         </div>
       </div>
      )
    }
  }
}

export default NewCompany