import React, { Component } from 'react'
import { Menu, Icon } from 'antd';
import './index.css'
import { Redirect } from 'react-router-dom'

const SubMenu = Menu.SubMenu;

class Sider extends Component {

  state = {
    current: '0',
    redirect: false,
    open: 'Empresas',
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
        case 'company_add':
          return <Redirect to='/logged/company/add' />
        case 'company_dash':
          return <Redirect to='/logged/company/dash' />
        case 'equip_addType':
          return <Redirect to='/logged/equip/addType' />
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
            key="Empresas"
            title={
              <span>
                <Icon type="bank" />
                <span>Empresas</span>
              </span>
            }
          >
            <Menu.Item key="company_add">Cadastrar</Menu.Item>
            <Menu.Item key="company_dash">Gerenciar</Menu.Item>
          </SubMenu>
          <SubMenu
            key="Equipamento"
            title={
              <span>
                <Icon type="bank" />
                <span>Equipamento</span>
              </span>
            }
          >
            <Menu.Item key="equip_add"><Icon type="bank"/> Cadastrar</Menu.Item>
            <Menu.Item key="equip_dash"><Icon type="bank"/> Gerenciar</Menu.Item>

            <Menu.Item key="equip_addType"><Icon type="bank"/> Cadastrar Tipos</Menu.Item>
            <Menu.Item key="equip_dashType"><Icon type="bank"/> Gerenciar Tipos</Menu.Item>

          </SubMenu>
        </Menu>
      </div>
    );
  }
}


export default Sider