import React, { Component } from 'react'
import { Menu, Icon } from 'antd';
import './index.css'
import { Redirect } from 'react-router-dom'

const SubMenu = Menu.SubMenu;

class Sider extends Component {

  state = {
    current: '0',
    redirect: false,
    open: 'Entrada',
  };

  handleClick = e => {
    console.log(e)
    this.setState({
      current: e.key,
      redirect: true,
      open: e.keyPath[1]
    })
  }

  changeRedirectState = () => {
    this.setState({
      redirect: false
    })
  }

  render() {
    if (this.state.redirect) {
      this.changeRedirectState()
      switch (this.state.current) {
        case 'entrada_add':
          return <Redirect to='/logged/entrance/add' />
        case 'entrada_dash':
          return <Redirect to='/logged/entrance/dash' />
        case 'company_add':
          return <Redirect to='/logged/company/add' />
        case 'company_dash':
          return <Redirect to='/logged/company/dash' />
        case 'equip_add':
          return <Redirect to='/logged/equip/add' />
        case 'equip_addType':
          return <Redirect to='/logged/equip/addType' />
        case 'peca_add':
          return <Redirect to='/logged/peca/add' />
        case 'peca_dash':
          return <Redirect to='/logged/peca/dash' />
        default:
          return <Redirect to='/logged/dash' />
      }
    }
    return (
      <div>
        <Menu
          className='menu'
          theme='dark'
          onClick={this.handleClick}
          defaultOpenKeys={[this.state.open]}
          selectedKeys={[this.state.current]}
          mode="inline"
        >
          <SubMenu
            key="Entrada"
            title={
              <span>
                <Icon type="form" />
                <span>Entrada</span>
              </span>
            }
          >
            <Menu.Item key="entrada_add"><Icon type="form" />Nova entrada</Menu.Item>
            <Menu.Item key="entrada_dash"><Icon type="edit" />Gerenciar</Menu.Item>
          </SubMenu>

          <SubMenu
            key="Empresas"
            title={
              <span>
                <Icon type="bank" />
                <span>Empresas</span>
              </span>
            }
          >
            <Menu.Item key="company_add"><Icon type="form" />Cadastrar</Menu.Item>
            <Menu.Item key="company_dash"><Icon type="edit" />Gerenciar</Menu.Item>
          </SubMenu>
          <SubMenu
            key="Equipamento"
            title={
              <span>
                <Icon type="printer" />
                <span>Equipamento</span>
              </span>
            }
          >
            <Menu.Item key="equip_add"><Icon type="form" /> Cadastrar</Menu.Item>
            <Menu.Item key="equip_dash"><Icon type="edit" /> Gerenciar</Menu.Item>

            <Menu.Item key="equip_addType"><Icon type="edit" /> Gerenciar marcas</Menu.Item>
          </SubMenu>

          <SubMenu
            key="Peca"
            title={
              <span>
                <Icon type="setting" />
                <span>Peça</span>
              </span>
            }
          >
            <Menu.Item key="peca_add"><Icon type="form" />Nova peça</Menu.Item>
            <Menu.Item key="peca_dash"><Icon type="edit" />Gerenciar</Menu.Item>
          </SubMenu>
        </Menu>
      </div>
    );
  }
}


export default Sider