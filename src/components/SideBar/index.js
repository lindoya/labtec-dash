import React, { Component } from 'react'
import { Menu, Icon, Tooltip } from 'antd';
import './index.css'
import { Redirect } from 'react-router-dom'
import { Logout } from './actions'
import { logout } from '../../services/auth'

const SubMenu = Menu.SubMenu;

class Sider extends Component {

  state = {
    current: '0',
    redirect: false,
    open: ['LabTec'],
  };

  // onSubmit = async (e) => {
  //   if(e.which === 13 || e.keyCode === 13) {
  //   await this.props.onSubmit(this.props.value)
  //   }
  // }

  tooltipHandleClick = async () => {
    const token = localStorage.getItem('token')
    token.replace(/"/ig, '')
    
    console.log(token)
    // await Logout(token)    //aqui não apaga no banco de dados
    await logout(token) // aqui apaga

    await localStorage.clear()

    this.setState({
      current: 'logout',
      redirect: true,
    })
  }

  handleClick = e => {
    
    this.setState({
      current: e.key,
      redirect: true,
      open: [
        e.keyPath[1]
      ]
    })
  }

  changeRedirectState = () => {
    this.setState({
      redirect: false
    })
  }

  render() {
    // console.log(this.state)
    if (this.state.redirect) {
      this.changeRedirectState()
      switch (this.state.current) {
        case 'entrada_add':
          return <Redirect to='/logged/entrance/add' />
        case 'analise_add':
          return <Redirect to='/logged/analise/add' />
        case 'tecnico_dash':
          return <Redirect to='/logged/tecnico/dash' />
        case 'company_add':
          return <Redirect to='/logged/company/add' />
        case 'company_dash':
          return <Redirect to='/logged/company/dash' />
        case 'equip_dash':
          return <Redirect to='/logged/equip/dash' />
        case 'equip_add':
          return <Redirect to='/logged/equip/add' />
        case 'equip_addType':
          return <Redirect to='/logged/equip/addType' />
        case 'peca_add':
          return <Redirect to='/logged/peca/add' />
        case 'peca_dash':
          return <Redirect to='/logged/peca/dash' />
        case 'logout':
        //   // return <Redirect to='/logged/company/add' />
          return <Redirect to='/login' />
        default:
          return <Redirect to='/logged/dash' />
      }
    }
    return (
      <div>
        <div className='menuIcon'>

          <Tooltip placement="bottom" title={'Logout'}>
            <Icon key='logout' className='menuIcon-icon' type="logout" 
            onClick={this.tooltipHandleClick}
            />
          </Tooltip>

          <Tooltip placement="bottom" title={'Minha Conta'}>
            <Icon className='menuIcon-icon' type="user" />
          </Tooltip>

          <Tooltip placement="bottom" title={'MinhaTela1'}>
            <Icon className='menuIcon-icon' type="dashboard" />
          </Tooltip>

          <Tooltip placement="bottom" title={'MinhaTela2'}>
            <Icon className='menuIcon-icon' type="eye" />
          </Tooltip>
 
          <Tooltip placement="bottom" title={'MinhaTela3'}>
            <Icon className='menuIcon-icon' type="fire" />
          </Tooltip>

        </div>

        <Menu
          className='menu'
          theme='dark'
          onClick={this.handleClick}
          defaultOpenKeys={this.state.open}
          selectedKeys={[this.state.current]}
          mode="inline"
        >
          
          <SubMenu
            key="LabTec"
            title={
              <span>
                <Icon type="form" />
                <span>LabTec</span>
              </span>
            }
          >
            <Menu.Item key="entrada_add"><Icon type="form" />Nova entrada</Menu.Item>
            <Menu.Item key="analise_add"><Icon type="line-chart" />Análise</Menu.Item>
            <Menu.Item key="tecnico_dash"><Icon type="user" />Técnico</Menu.Item>

            <SubMenu
            key="Pecas"
            title={
              <span>
                <Icon type="setting" />
                <span>Peças</span>
              </span>
            }
          >
            <Menu.Item key="peca_add"><Icon type="form" />Nova peça</Menu.Item>
            <Menu.Item key="peca_dash"><Icon type="edit" />Gerenciar</Menu.Item>
          </SubMenu>
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

          {/* <SubMenu
            key="Modulo"
            title={
              <span>
                <Icon type="printer" />
                <span>Módulos</span>
              </span>
            }
          >
            <Menu.Item key="equip_add"><Icon type="form" /> Cadastrar</Menu.Item>
            <Menu.Item key="equip_dash"><Icon type="edit" /> Gerenciar</Menu.Item>

            <Menu.Item key="equip_addType"><Icon type="edit" /> Gerenciar marcas</Menu.Item>
          </SubMenu> */}
  
        </Menu>
      </div>
    );
  }
}


export default Sider