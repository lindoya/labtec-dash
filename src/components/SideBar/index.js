import React, { Component } from 'react'
import { Menu, Icon } from 'antd';
import './index.css'
import { Redirect } from 'react-router-dom'

const SubMenu = Menu.SubMenu;

class Sider extends Component {

  state = {
    current: '0',
    redirect: false
  };

  handleClick = e => {
    this.setState({
      current: e.key,
      redirect: true
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
        case '1':
          return <Redirect to='/logged/company/dash' />
        case '2':
          return <Redirect to='/logged/company/add' />
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
          defaultOpenKeys={['Empresas']}
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
            <Menu.Item key="1">Gerenciar</Menu.Item>
            <Menu.Item key="2">Cadastrar</Menu.Item>
          </SubMenu>
        </Menu>
      </div>
    );
  }
}


export default Sider