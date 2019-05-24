import React, { Component } from 'react'
import { Table, Input, Button } from 'antd';
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
    razaoSocial: 'Teste Teste TETTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT',
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
  render() {
    return (
      <div className='div-card-newCompany'>
        <div className='div-search-newCompany'>
          <Search className='search-newCompany' placeholder="Digite o que deseja" onSearch={value => console.log(value)} enterButton size='large' />
          <Button
            type='primary'>
            Avançado
          </Button>
        </div>
        <div className='div-table-newCompany'>
          <Table columns={columns} dataSource={data} size="middle" />
        </div>
      </div>
    )
  }
}

export default NewCompany